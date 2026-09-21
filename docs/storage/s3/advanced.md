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

**Whole bucket (policy, recommended):**

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

Master keys bypass ACLs. Sub-tokens need an explicit grant unless you created them with access to that bucket in the console.

## Give an app scoped credentials {#give-an-app-scoped-credentials}

Do not hand a master token to a backup script, a CDN, or a contractor. Create a **sub-token**:

| Why | Example |
|---|---|
| One bucket | A backup job that should never see production media |
| Read only | A CDN that must not overwrite or delete |
| Time limited | Vendor access that expires in a week |
| Easy revoke | Kill that integration without rotating the master |

Create them in the console: [S3 Buckets → Sub Tokens](/use/console/s3#sub-tokens). Pick the buckets, **Get / List** or **Get / List / Put / Delete**, and an expiry (7 days, 30 days, 1 year, or a date). The secret is shown once.

Rotate keeps the same Access Key ID and issues a new secret. Revoke is immediate and cannot be undone.

Programmatic create / list / rotate / revoke: [Management API](/use/api).

## Upload large files {#upload-large-files}

The console caps a single upload at **100 MB**. For anything larger, use a client that speaks multipart — AWS CLI, boto3, and the AWS SDK all do this automatically.

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

Objects can go up to ~5 TiB via multipart. See [Troubleshooting](/use/troubleshooting) if transfers are slow.

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

Make the bucket public, then upload. Files are served from the path-style URL — no extra web server.

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

For a private video, inject a [presigned GET](#share-a-time-limited-download) into the `src`. There is no custom-domain support yet.

## Stop a version being deleted {#stop-a-version-being-deleted}

Object Lock makes a version immutable for a retention window (GOVERNANCE or COMPLIANCE) or until you release a legal hold. COMPLIANCE cannot be shortened or bypassed by anyone, and the object still bills for the whole period.

Full guide: [Object Lock (WORM)](/storage/s3/object-lock).

## More

<Unordered>
  <li><a href="/storage/s3/compatibility">Compatibility matrix</a> — every operation and its status</li>
  <li><a href="/use/troubleshooting">Troubleshooting</a> — auth, endpoint, and upload errors</li>
  <li><a href="/storage/s3/examples/nextcloud">Nextcloud</a> and <a href="/storage/s3/examples/duplicati">Duplicati</a> — product-specific setups</li>
  <li><a href="/use/console/s3">Console S3 Buckets</a> — manage buckets and tokens in the browser</li>
  <li><a href="/use/console/migrations">S3 Migrations</a> — copy from AWS, R2, Storj, and others</li>
  <li><a href="/use/api">Management API</a> — tokens and billing from your backend</li>
</Unordered>
