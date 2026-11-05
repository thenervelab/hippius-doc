---
id: advanced
title: Advanced Usage
sidebar_label: Advanced Usage
slug: /storage/s3/advanced
description: Presigned URLs, public buckets, ACLs, sub-tokens, and multipart uploads for Hippius S3.
---

import Unordered from '@site/src/components/Unordered';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Advanced Usage

You already have a bucket and a file. This page covers sharing, public access, scoped credentials, large uploads, and hosting.

Connection details (endpoint `https://s3.hippius.com`, region `decentralized`, path-style) live in [Getting Started](/use/quickstart#connection-details). For the full operation list, see the [Compatibility matrix](/storage/s3/compatibility).

## Share a time-limited download {#share-a-time-limited-download}

Generate a URL that works without credentials and expires on its own. Max expiry is 7 days (604800 seconds).

<Tabs>
<TabItem value="python" label="Python">

```python
url = s3.generate_presigned_url(
    "get_object",
    Params={"Bucket": "my-bucket", "Key": "hello.txt"},
    ExpiresIn=86400,  # 24 hours
)
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";

const url = await getSignedUrl(
  s3,
  new GetObjectCommand({ Bucket: "my-bucket", Key: "hello.txt" }),
  { expiresIn: 86400 },
);
```

</TabItem>
<TabItem value="cli" label="AWS CLI">

```bash
aws s3 presign s3://my-bucket/hello.txt \
  --expires-in 86400 \
  --endpoint-url https://s3.hippius.com
```

</TabItem>
</Tabs>

Anyone with the link can download until it expires. No cleanup job needed.

Client setup: [Python](/storage/s3/python), [JavaScript](/storage/s3/javascript), [AWS CLI](/storage/s3/aws-cli).

## Let a browser upload without keys {#let-a-browser-upload-without-keys}

Never put your secret key in client-side code. Generate a presigned `PUT` on your server and have the browser upload to that URL.

**Server (Node.js):**

```javascript
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const uploadUrl = await getSignedUrl(
  s3,
  new PutObjectCommand({ Bucket: "my-bucket", Key: "user-upload.jpg" }),
  { expiresIn: 300 },
);
```

**Browser:**

```javascript
await fetch(uploadUrl, {
  method: "PUT",
  body: file,
  headers: { "Content-Type": file.type },
});
```

Do not append extra query parameters to a presigned URL — they invalidate the signature.

## Make a bucket or object public {#make-a-bucket-or-object-public}

Buckets are private by default. Public objects are readable at:

```
https://s3.hippius.com/{bucket}/{key}
```

**Whole bucket (ACL):**

```bash
aws s3api put-bucket-acl --bucket my-bucket --acl public-read \
  --endpoint-url https://s3.hippius.com
```

**Whole bucket (policy):**

```python
import json

policy = {
    "Version": "2012-10-17",
    "Statement": [{
        "Effect": "Allow",
        "Principal": "*",
        "Action": ["s3:GetObject"],
        "Resource": ["arn:aws:s3:::my-bucket/*"],
    }],
}
s3.put_bucket_policy(Bucket="my-bucket", Policy=json.dumps(policy))
```

This policy publishes anonymous `GET` and `HEAD` of every object, but not the bucket listing. The `public-read` ACL above publishes the listing too.

**One folder (prefix) only:** aim the same statement at `arn:aws:s3:::my-bucket/public/*`. Only objects under `public/` become readable; the rest of the bucket stays private. A policy can list up to 32 prefixes, but it can't mix a prefix with the whole bucket.

```python
policy["Statement"][0]["Resource"] = ["arn:aws:s3:::my-bucket/public/*"]
s3.put_bucket_policy(Bucket="my-bucket", Policy=json.dumps(policy))
```

Only these `Allow`, `Principal: "*"`, `s3:GetObject` statements are accepted. Anything else (another action, a `Deny`, a condition, a specific principal) is rejected with `400 InvalidPolicyDocument`. A prefix policy on a bucket that is already public returns `409 PolicyAlreadyExists`.

`DeleteBucketPolicy` removes the policy. On a bucket made public with the ACL it returns `409 InvalidBucketState`: set the ACL back to `private` instead.

**One object, bucket stays private:**

```bash
aws s3api put-object-acl --bucket my-bucket --key document.pdf \
  --acl public-read --endpoint-url https://s3.hippius.com
```

Public objects are still encrypted at rest with per-bucket keys. Use this for websites, images, and videos you intend anyone to fetch. Keep private data on a private bucket and share with a [presigned URL](#share-a-time-limited-download) instead.

Canned ACLs: `private` (default), `public-read`, `public-read-write`, `authenticated-read`.

## Share with another Hippius account {#share-with-another-account}

Grant by canonical user ID (every key on that account gets access):

```bash
aws s3api list-buckets --endpoint-url https://s3.hippius.com \
  --query 'Owner.ID' --output text

aws s3api put-bucket-acl --bucket my-bucket \
  --grant-read 'id="their_canonical_id_here"' \
  --grant-full-control 'id="your_canonical_id_here"' \
  --endpoint-url https://s3.hippius.com
```

:::warning
Always include `--grant-full-control` for yourself, or you can lock yourself out.
:::

Permission types: `READ`, `WRITE`, `READ_ACP`, `WRITE_ACP`, `FULL_CONTROL`.

To undo grants:

```bash
aws s3api put-bucket-acl --bucket my-bucket --acl private \
  --endpoint-url https://s3.hippius.com
```

## Grant one access key {#grant-one-access-key}

`accessKey=` is a Hippius extension. Use it when you want one key, not a whole account.

```bash
aws s3api put-bucket-acl --bucket my-bucket \
  --grant-read 'accessKey="YOUR_ACCESS_KEY"' \
  --grant-full-control 'id="your_canonical_id"' \
  --endpoint-url https://s3.hippius.com
```

Master keys bypass ACLs. A sub-token needs an explicit grant unless it was scoped to that bucket when it was created, in the console, with `hipc s3 tokens create --bucket`, or through the API.

## Give an app scoped credentials {#give-an-app-scoped-credentials}

Do not hand a master token to a backup script, a CDN, or a contractor. Create a **sub-token**:

| Why | Example |
|---|---|
| One bucket | A backup job that should never see production media |
| Read only | A CDN that must not overwrite or delete |
| Time limited | Vendor access that expires in a week |
| Easy revoke | Kill that integration without rotating the master |

Create them in the console: [S3 Buckets → Sub Tokens](/use/console/s3#sub-tokens). Pick **Object Read Only** or **Object Read & Write**, all buckets or specific ones, and a lifespan (Forever, 7 days, 30 days, 1 year, or a custom date). The secret is shown once.

Rotate issues a new Access Key ID and secret with the same permissions, and revokes the old pair. Revoke is immediate and cannot be undone.

Programmatic create / list / rotate / revoke: [Management API](/use/api).

### From the command line

With [hipc](/cli), create a sub-token for one bucket and turn it into an AWS CLI profile. The answer holds the secret, so it goes straight to a private file, which you delete once the profile is written:

```bash
(umask 077; hipc --json s3 tokens create --kind sub --name backup-job \
  --scope-type single-bucket --bucket my-bucket --action read --action write \
  --expires-at 2027-01-01T00:00:00Z --reveal --yes > token.json)
hipc s3 configure --from-token-file token.json --aws-profile backup-job
rm token.json
```

Run it with `--dry-run` in place of `--yes` first to see the request. Leave out `--action write` for a read-only token, and `--expires-at` for one that never expires. `hipc s3 tokens list` shows your tokens, and `hipc s3 tokens revoke --kind sub TOKEN_ID --yes` revokes one. To rotate one, send the new pair to a private file and rewrite the profile, which still holds the old pair (`--yes` because the profile exists):

```bash
(umask 077; hipc --json s3 tokens rotate --kind sub TOKEN_ID --reveal --yes > token.json)
hipc s3 configure --from-token-file token.json --aws-profile backup-job --yes
rm token.json
```

 Create the bucket before the token. To change a token's buckets, create a new token and revoke the old one.

## Separate production and staging {#separate-production-and-staging}

Give each environment its own bucket and its own sub-token, so a staging bug can never touch production data:

```bash
hipc s3 buckets create app-prod --yes
hipc s3 buckets create app-staging --yes
(umask 077; hipc --json s3 tokens create --kind sub --name app-prod --scope-type single-bucket --bucket app-prod --action read --action write --reveal --yes > app-prod.json)
(umask 077; hipc --json s3 tokens create --kind sub --name app-staging --scope-type single-bucket --bucket app-staging --action read --action write --reveal --yes > app-staging.json)
hipc s3 configure --from-token-file app-prod.json --aws-profile app-prod
hipc s3 configure --from-token-file app-staging.json --aws-profile app-staging
rm app-prod.json app-staging.json
```

Then check the isolation. The staging key must be refused on the production bucket:

```bash
echo test > hello.txt
aws s3 cp hello.txt s3://app-staging/hello.txt --profile app-staging   # works
aws s3 cp hello.txt s3://app-prod/hello.txt --profile app-staging      # must fail: Access Denied
```

Each application server signs its [presigned URLs](#share-a-time-limited-download) with its own environment's key, so a browser never sees either secret. Older AWS CLI versions ignore the profile's `endpoint_url`: see [AWS CLI](/storage/s3/aws-cli#shortcut-hipc-s3-configure).

## Share a bucket with many clients {#share-a-bucket-with-many-clients}

When many machines write to or read from one bucket, such as the nodes of a network publishing datasets:

<Unordered>
  <li><strong>One sub-token per writer</strong>, scoped to the bucket with <code>--action read --action write</code>. Revoking one writer then leaves the others working.</li>
  <li><strong>Readers</strong> share one read-only sub-token (<code>--action read</code>), or, for data anyone may read, the bucket is <a href="#make-a-bucket-or-object-public">made public</a> and they need no key at all.</li>
  <li><strong>Changing a shared key without a gap.</strong> Rotate revokes the old key at once, so every client using it fails until it has the new one. To move many clients, create a second token, hand it out, then revoke the first.</li>
  <li><strong>Load.</strong> There is no fixed request limit per account. Under load the gateway answers <code>503 SlowDown</code>, sometimes with <code>Retry-After</code>: retry with backoff, as the AWS SDKs do.</li>
</Unordered>

## Upload large files {#upload-large-files}

The console caps a single upload at **100 MB**. For anything larger, use a client that speaks multipart. The AWS CLI, boto3, and the AWS SDK all do this automatically.

```python
s3.upload_file("large_file.zip", "my-bucket", "large_file.zip")
```

MinIO lets you set part size and parallelism:

```python
client.fput_object(
    "my-bucket",
    "large_file.zip",
    "large_file.zip",
    part_size=10 * 1024 * 1024,
    num_parallel_uploads=3,
)
```

A part can be up to 512 MiB, and an upload up to 10,000 parts, so objects can go up to ~5 TiB via multipart. See [Troubleshooting](/use/troubleshooting) if transfers are slow.

## Tag buckets and objects {#tag-buckets-and-objects}

```python
s3.put_bucket_tagging(
    Bucket="my-bucket",
    Tagging={"TagSet": [
        {"Key": "Project", "Value": "MyProject"},
        {"Key": "Environment", "Value": "Production"},
    ]},
)

s3.put_object_tagging(
    Bucket="my-bucket",
    Key="hello.txt",
    Tagging={"TagSet": [{"Key": "Type", "Value": "Document"}]},
)
```

## Host a static site or stream video {#host-a-static-site-or-stream-video}

Make the bucket public, then upload. Files are served from the path-style URL, with no extra web server.

```bash
aws s3api put-bucket-acl --bucket my-site --acl public-read \
  --endpoint-url https://s3.hippius.com

aws s3 sync ./dist s3://my-site/ --endpoint-url https://s3.hippius.com
```

Site: `https://s3.hippius.com/my-site/index.html`

Video tags work the same way. Hippius supports HTTP range requests, so browsers can seek without downloading the whole file:

```html
<video controls>
  <source src="https://s3.hippius.com/my-videos/my-video.mp4" type="video/mp4">
</video>
```

For a private video, inject a [presigned GET](#share-a-time-limited-download) into the `src`. To serve a bucket on your own domain, put the [Hippius CDN](/use/cdn) in front of it.

## Stop a version being deleted {#stop-a-version-being-deleted}

Object Lock makes a version immutable for a retention window (GOVERNANCE or COMPLIANCE) or until you release a legal hold. COMPLIANCE cannot be shortened or bypassed by anyone, and the object still bills for the whole period.

Full guide: [Object Lock (WORM)](/storage/s3/object-lock).

## More

<Unordered>
  <li><a href="/storage/s3/compatibility">Compatibility matrix</a> — every operation and its status</li>
  <li><a href="/use/troubleshooting">Troubleshooting</a> — auth, endpoint, and upload errors</li>
  <li><a href="/storage/s3/examples/nextcloud">Nextcloud</a> and <a href="/storage/s3/examples/duplicati">Duplicati</a> — product-specific setups</li>
  <li><a href="/use/console/s3">Console S3 Buckets</a> — manage buckets and tokens in the browser</li>
  <li><a href="/use/console/migrations">S3 Migrations</a>: copy from any S3-compatible provider</li>
  <li><a href="/use/api">Management API</a> — tokens and billing from your backend</li>
</Unordered>
