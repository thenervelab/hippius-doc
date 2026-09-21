---
id: object-lock
title: Object Lock (WORM)
sidebar_label: Object Lock
slug: /storage/s3/object-lock
---

import Unordered from '@site/src/components/Unordered';

# Object Lock (WORM)

Object Lock makes a **version** immutable until a date, or until you release a legal hold. Nobody can permanently delete it before then — not you, not an admin, not Hippius. Use it for backups, audit logs, and compliance (S3 WORM).

The API matches AWS. Enforcement is in the storage layer, so it holds against internal cleanup too.

:::tip Versioning is required
Object Lock protects versions, not keys. `--object-lock-enabled-for-bucket` turns versioning on for you.
:::

## Quick start

```bash
aws s3api create-bucket --bucket my-vault --object-lock-enabled-for-bucket \
  --endpoint-url https://s3.hippius.com

aws s3api put-object --bucket my-vault --key report.pdf --body report.pdf \
  --object-lock-mode GOVERNANCE \
  --object-lock-retain-until-date "$(date -u -d '+30 days' +%Y-%m-%dT%H:%M:%SZ)" \
  --endpoint-url https://s3.hippius.com
```

A versioned delete of that object returns `AccessDenied` until the date.

## Retention modes

| Mode | Who can remove it early | Use for |
|------|-------------------------|---------|
| **GOVERNANCE** | Bucket owner, with `--bypass-governance-retention` | Accidents, with an escape hatch |
| **COMPLIANCE** | **Nobody**, until it expires | Absolute regulatory retention |

You can always **extend** a retention. You cannot shorten a live one.

:::warning COMPLIANCE cannot be undone
A ten-year COMPLIANCE object occupies storage — and bills — for ten years. There is no support path to remove it early. Test with a short window first. Prefer GOVERNANCE unless a regulator requires otherwise.
:::

## Set retention

At upload, or later on a version:

```bash
aws s3api put-object --bucket my-vault --key q4.csv --body q4.csv \
  --object-lock-mode COMPLIANCE \
  --object-lock-retain-until-date 2027-01-01T00:00:00Z \
  --endpoint-url https://s3.hippius.com

aws s3api put-object-retention --bucket my-vault --key q4.csv \
  --retention '{"Mode":"COMPLIANCE","RetainUntilDate":"2027-01-01T00:00:00Z"}' \
  --endpoint-url https://s3.hippius.com

aws s3api get-object-retention --bucket my-vault --key q4.csv \
  --endpoint-url https://s3.hippius.com
```

Retain-until dates beyond 10 years (3650 days) are rejected.

## Legal holds

An indefinite lock with no expiry. Independent of retention — either one blocks deletion.

```bash
aws s3api put-object-legal-hold --bucket my-vault --key evidence.zip \
  --legal-hold Status=ON --endpoint-url https://s3.hippius.com

aws s3api put-object-legal-hold --bucket my-vault --key evidence.zip \
  --legal-hold Status=OFF --endpoint-url https://s3.hippius.com
```

## Bucket default

Every new version inherits a duration, resolved to a date at write time. Applies to PUT, multipart, and copy. Per-object headers override it. `Years` works too.

```bash
aws s3api put-object-lock-configuration --bucket my-vault \
  --object-lock-configuration '{
    "ObjectLockEnabled": "Enabled",
    "Rule": {"DefaultRetention": {"Mode": "GOVERNANCE", "Days": 90}}
  }' --endpoint-url https://s3.hippius.com
```

## How deletes behave

| Request | On a locked version |
|---------|---------------------|
| `DELETE key?versionId=…` | **403 AccessDenied** |
| `DELETE key` (no version) | Succeeds — writes a delete marker; the locked version stays |

Overwrite is allowed: it creates a new version. Bulk `DeleteObjects` is per-key — a locked key returns `AccessDenied` and the rest of the batch continues.

## Bypass GOVERNANCE

Owner **and** `--bypass-governance-retention`. Either alone is not enough. No effect on COMPLIANCE or a legal hold.

```bash
aws s3api delete-object --bucket my-vault --key report.pdf --version-id "$VID" \
  --bypass-governance-retention \
  --endpoint-url https://s3.hippius.com
```

AWS gates this on IAM. Hippius has no IAM, so only the bucket owner can bypass.

## Enable on an existing bucket

Versioning first, then Object Lock. No `x-amz-bucket-object-lock-token` required. Future versions only — existing objects are not locked retroactively.

```bash
aws s3api put-bucket-versioning --bucket existing-bucket \
  --versioning-configuration Status=Enabled --endpoint-url https://s3.hippius.com

aws s3api put-object-lock-configuration --bucket existing-bucket \
  --object-lock-configuration '{"ObjectLockEnabled":"Enabled"}' \
  --endpoint-url https://s3.hippius.com
```

Without versioning this returns `409 InvalidBucketState`.

Set lock headers on `CreateMultipartUpload`, not `CompleteMultipartUpload`. Read them back with `HeadObject` (`GetObject` does not return them). Sending lock headers to a bucket without Object Lock returns `400 InvalidRequest`, not a silent drop.

## Not supported

| Not supported | Workaround |
|---------------|------------|
| Lock headers on `CompleteMultipartUpload` | Set them on `CreateMultipartUpload` |
| Lock headers on `GetObject` responses | Use `HeadObject` |
| Suspending versioning on a lock-enabled bucket | Not possible in AWS either |
| S3 Batch Operations | Apply per object |
| Replicating lock state | Set the lock on the destination |
| `POST Object` | Presigned `PutObject` |

## Further reading

<Unordered>
  <li><a href="/storage/s3/advanced">Advanced Usage</a></li>
  <li><a href="/storage/s3/compatibility">S3 Compatibility Matrix</a></li>
  <li><a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html">AWS Object Lock documentation</a></li>
</Unordered>
