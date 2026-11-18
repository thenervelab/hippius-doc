---
id: advanced
title: Advanced Usage
sidebar_label: Advanced Usage
slug: /storage/s3/advanced
description: Presigned URLs, public buckets, ACLs, sub-tokens, and multipart uploads for Hippius Object Storage.
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

Public objects are readable at:

```
https://s3.hippius.com/{bucket}/{key}
```

New buckets start locked down, with the same defaults as AWS:

<Unordered>
  <li><strong>Block Public Access</strong> is on: all four flags (<code>BlockPublicAcls</code>, <code>IgnorePublicAcls</code>, <code>BlockPublicPolicy</code>, <code>RestrictPublicBuckets</code>) are <code>true</code>.</li>
  <li><strong>Object Ownership</strong> is <code>BucketOwnerEnforced</code>, so ACLs are disabled.</li>
</Unordered>

So on a new bucket:

<Unordered>
  <li>A public bucket policy returns <code>403 AccessDenied</code> while <code>BlockPublicPolicy</code> is on. The policy is checked first, so a malformed one returns <code>400 MalformedPolicy</code> instead. With <code>BlockPublicPolicy</code> off but <code>RestrictPublicBuckets</code> on, the policy is stored but anonymous reads still return <code>403</code>.</li>
  <li>Any ACL other than <code>bucket-owner-full-control</code> (<code>put-bucket-acl</code>, <code>put-object-acl</code>, or <code>x-amz-acl</code> on an upload) returns <code>400 AccessControlListNotSupported</code>. Once ACLs are enabled, a public ACL returns <code>403 AccessDenied</code> while <code>BlockPublicAcls</code> is on, and is stored but ignored while <code>IgnorePublicAcls</code> is on.</li>
</Unordered>

A master key gets the same errors: these are settings on the bucket, not permissions on the key. Change them first, as below.

Check a bucket's current settings:

```bash
aws s3api get-public-access-block --bucket my-bucket --endpoint-url https://s3.hippius.com
aws s3api get-bucket-ownership-controls --bucket my-bucket --endpoint-url https://s3.hippius.com
```

An error means the setting is not stored. `NoSuchPublicAccessBlockConfiguration` means nothing is blocked; `OwnershipControlsNotFoundError` means ACLs are enabled (`ObjectWriter`). Buckets created on older versions of the service can be in that state.

**Whole bucket (policy, recommended):** turn off the two policy flags, then set the policy. The ACL flags stay on.

```bash
aws s3api put-public-access-block --bucket my-bucket \
  --public-access-block-configuration \
  BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=false,RestrictPublicBuckets=false \
  --endpoint-url https://s3.hippius.com

aws s3api put-bucket-policy --bucket my-bucket --endpoint-url https://s3.hippius.com \
  --policy '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":"*","Action":"s3:GetObject","Resource":"arn:aws:s3:::my-bucket/*"}]}'
```

This policy publishes anonymous `GET` and `HEAD` of every object, but not the bucket listing. Add a statement allowing `s3:ListBucket` on `arn:aws:s3:::my-bucket` to publish the listing too.

:::warning Bucket already public through an ACL
If `get-public-access-block` reports no configuration and the bucket is public through a `public-read` ACL, `IgnorePublicAcls=true` hides that ACL the moment you set it. Set the policy first, with `BlockPublicPolicy=false,RestrictPublicBuckets=false` and the two ACL flags `false`, then turn the ACL flags on once the policy serves your objects. The ACL also published the listing; the policy above does not.
:::

**One folder (prefix) only:** use `arn:aws:s3:::my-bucket/public/*` as the `Resource`. Only objects under `public/` become readable; the rest of the bucket stays private.

Policies follow the AWS bucket policy language: `Allow` and `Deny`, principals, S3 actions, and conditions. A policy is at most 20 KB. An invalid one returns `400 MalformedPolicy`. `GetBucketPolicyStatus` reports whether the stored policy is public.

**Whole bucket or one object (ACL):** ACLs need two changes first: enable them with Object Ownership, and turn off the two ACL flags of Block Public Access. The policy flags stay on.

```bash
aws s3api put-bucket-ownership-controls --bucket my-bucket \
  --ownership-controls 'Rules=[{ObjectOwnership=BucketOwnerPreferred}]' \
  --endpoint-url https://s3.hippius.com

aws s3api put-public-access-block --bucket my-bucket \
  --public-access-block-configuration \
  BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=true,RestrictPublicBuckets=true \
  --endpoint-url https://s3.hippius.com

# Whole bucket (also publishes the listing)
aws s3api put-bucket-acl --bucket my-bucket --acl public-read \
  --endpoint-url https://s3.hippius.com

# One object, bucket stays private
aws s3api put-object-acl --bucket my-bucket --key document.pdf \
  --acl public-read --endpoint-url https://s3.hippius.com
```

Canned ACLs: `private` (default), `public-read`, `public-read-write`, `authenticated-read`, `bucket-owner-full-control`. `public-read`, `public-read-write` and `authenticated-read` count as public, so Block Public Access applies to all three.

**Make it private again:** remove the policy (or set the ACL back to `private`), then turn every Block Public Access flag back on.

```bash
aws s3api delete-bucket-policy --bucket my-bucket --endpoint-url https://s3.hippius.com

aws s3api put-public-access-block --bucket my-bucket \
  --public-access-block-configuration \
  BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true \
  --endpoint-url https://s3.hippius.com
```

On a bucket with ACLs disabled, `put-bucket-acl --acl private` returns `400 AccessControlListNotSupported`: remove the policy instead.

Public objects are still encrypted at rest with per-bucket keys. Use this for websites, images, and videos you intend anyone to fetch. Keep private data on a private bucket and share with a [presigned URL](#share-a-time-limited-download) instead.

## Share with another Hippius account {#share-with-another-account}

Grant by canonical user ID (every key on that account gets access). ACL grants need ACLs enabled on the bucket first (Object Ownership `BucketOwnerPreferred` or `ObjectWriter`, see [above](#make-a-bucket-or-object-public)); new buckets have them disabled and answer `400 AccessControlListNotSupported`.

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

ACL grants name accounts (`id=`) or groups (`uri=`), as on AWS. The older `accessKey="hip_..."` grant is no longer accepted and returns `400 InvalidArgument`. To give one key access to one bucket, create a [sub-token](#give-an-app-scoped-credentials) scoped to that bucket: it needs no ACL grant.

Block Public Access and Object Ownership apply to master keys too: they are settings on the bucket, not permissions on a key.

## Give an app scoped credentials {#give-an-app-scoped-credentials}

Do not hand a master token to a backup script, a CDN, or a contractor. Create a **sub-token**:

| Why | Example |
|---|---|
| One bucket | A backup job that should never see production media |
| Read only | A CDN that must not overwrite or delete |
| Time limited | Vendor access that expires in a week |
| Easy revoke | Kill that integration without rotating the master |

Create them in the console: [Object Storage → Sub Tokens](/use/console/s3#sub-tokens). Pick **Object Read Only** or **Object Read & Write**, all buckets or specific ones, and a lifespan (Forever, 7 days, 30 days, 1 year, or a custom date). The secret is shown once.

Rotate issues a new Access Key ID and secret with the same permissions, and revokes the old pair. Revoke is immediate and cannot be undone.

Programmatic create / list / rotate / revoke: [Management API](/use/api).

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
aws s3api put-public-access-block --bucket my-site \
  --public-access-block-configuration \
  BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=false,RestrictPublicBuckets=false \
  --endpoint-url https://s3.hippius.com

aws s3api put-bucket-policy --bucket my-site --endpoint-url https://s3.hippius.com \
  --policy '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":"*","Action":"s3:GetObject","Resource":"arn:aws:s3:::my-site/*"}]}'

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
  <li><a href="/use/console/s3">Console Object Storage</a> — manage buckets and tokens in the browser</li>
  <li><a href="/use/console/migrations">S3 Migrations</a>: copy from any S3-compatible provider</li>
  <li><a href="/use/api">Management API</a> — tokens and billing from your backend</li>
</Unordered>
