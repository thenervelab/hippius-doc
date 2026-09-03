---
id: object-lock
title: Object Lock (WORM)
sidebar_label: Object Lock
slug: /storage/s3/object-lock
---

# Object Lock (WORM)

Object Lock makes an object version **immutable for a fixed period**. Once locked, that version cannot be permanently deleted — not by you, not by an administrator, and not by Hippius — until the lock expires. It implements the S3 write-once-read-many (WORM) model and is the mechanism behind retention policies for backups, audit logs, and regulatory compliance.

Hippius S3 implements Object Lock with the same API and semantics as AWS S3, including enforcement below the API: the protection is applied in the storage layer itself, so it holds even against internal cleanup jobs and operational tooling.

:::tip Versioning is a prerequisite
Object Lock protects **versions**, not keys. A bucket must have versioning enabled before it can use Object Lock. Creating a bucket with `--object-lock-enabled-for-bucket` turns versioning on for you automatically.
:::

## Quick start

```bash
# 1. Create a bucket with Object Lock (versioning is enabled automatically)
aws s3api create-bucket --bucket my-vault --object-lock-enabled-for-bucket \
  --endpoint-url https://s3.hippius.com

# 2. Upload an object retained for 30 days
aws s3api put-object --bucket my-vault --key report.pdf --body report.pdf \
  --object-lock-mode GOVERNANCE \
  --object-lock-retain-until-date "$(date -u -d '+30 days' +%Y-%m-%dT%H:%M:%SZ)" \
  --endpoint-url https://s3.hippius.com

# 3. Try to delete that version — it is refused
VID=$(aws s3api list-object-versions --bucket my-vault --prefix report.pdf \
  --query 'Versions[0].VersionId' --output text --endpoint-url https://s3.hippius.com)

aws s3api delete-object --bucket my-vault --key report.pdf --version-id "$VID" \
  --endpoint-url https://s3.hippius.com
# An error occurred (AccessDenied) when calling the DeleteObject operation
```

## The two retention modes

| Mode | Who can remove it early | Use for |
|------|-------------------------|---------|
| **GOVERNANCE** | The bucket owner, with an explicit bypass header | Protecting against accidents while keeping an escape hatch |
| **COMPLIANCE** | **Nobody**, until it expires | Regulatory retention where the guarantee must be absolute |

`COMPLIANCE` is genuinely absolute. A COMPLIANCE retention cannot be shortened, cleared, downgraded to GOVERNANCE, or bypassed by anyone, including the account that created it.

:::warning COMPLIANCE mode cannot be undone
Before using COMPLIANCE in production, test with a short retention window. An object retained for ten years will occupy storage — and bill — for ten years. There is no support path to remove it early.
:::

## Setting retention on an object

Either supply the headers at upload time, or apply them afterwards to an existing version.

```bash
# At upload
aws s3api put-object --bucket my-vault --key q4.csv --body q4.csv \
  --object-lock-mode COMPLIANCE \
  --object-lock-retain-until-date 2027-01-01T00:00:00Z \
  --endpoint-url https://s3.hippius.com

# Afterwards, on a specific version
aws s3api put-object-retention --bucket my-vault --key q4.csv \
  --retention '{"Mode":"COMPLIANCE","RetainUntilDate":"2027-01-01T00:00:00Z"}' \
  --endpoint-url https://s3.hippius.com

# Read it back
aws s3api get-object-retention --bucket my-vault --key q4.csv \
  --endpoint-url https://s3.hippius.com
```

A retention period can always be **extended**. It can never be shortened while it is live:

```bash
# Extending: allowed
aws s3api put-object-retention --bucket my-vault --key q4.csv \
  --retention '{"Mode":"COMPLIANCE","RetainUntilDate":"2030-01-01T00:00:00Z"}' \
  --endpoint-url https://s3.hippius.com

# Shortening: refused with 403 AccessDenied
```

## Legal holds

A legal hold is an **indefinite** lock with no expiry date. It is independent of retention: an object can have both, and either one alone is enough to block deletion. Legal holds are the right tool when you do not know how long the data must be preserved — litigation, an open investigation — and you want to release it explicitly later.

```bash
# Place a hold
aws s3api put-object-legal-hold --bucket my-vault --key evidence.zip \
  --legal-hold Status=ON --endpoint-url https://s3.hippius.com

# Check it
aws s3api get-object-legal-hold --bucket my-vault --key evidence.zip \
  --endpoint-url https://s3.hippius.com

# Release it
aws s3api put-object-legal-hold --bucket my-vault --key evidence.zip \
  --legal-hold Status=OFF --endpoint-url https://s3.hippius.com
```

An object whose retention has expired but which still carries a legal hold remains locked.

## Default retention for a bucket

Rather than setting retention on every upload, configure a bucket-wide default. Every new object version then inherits it automatically. The default is a **duration**, resolved into a concrete date at the moment each version is created.

```bash
aws s3api put-object-lock-configuration --bucket my-vault \
  --object-lock-configuration '{
    "ObjectLockEnabled": "Enabled",
    "Rule": {"DefaultRetention": {"Mode": "GOVERNANCE", "Days": 90}}
  }' --endpoint-url https://s3.hippius.com

# Uploads now inherit 90 days with no extra flags
aws s3api put-object --bucket my-vault --key nightly.tar --body nightly.tar \
  --endpoint-url https://s3.hippius.com

aws s3api head-object --bucket my-vault --key nightly.tar \
  --endpoint-url https://s3.hippius.com
# "ObjectLockMode": "GOVERNANCE", "ObjectLockRetainUntilDate": "..."
```

`Years` works too (`{"Mode": "COMPLIANCE", "Years": 7}`). Explicit per-object headers always override the bucket default.

The default applies to **every** write path — simple uploads, multipart uploads, and server-side copies alike — so a large file does not quietly land unprotected.

## How deletes behave

This is the part implementations most often get wrong, so it is worth stating plainly. There are two different deletes and they behave differently:

| Request | On a locked version | Why |
|---------|--------------------|-----|
| `DELETE key?versionId=…` | **403 AccessDenied** | A permanent delete of protected data |
| `DELETE key` (no version) | **Succeeds**, writes a delete marker | The locked version survives underneath, untouched |

```bash
# The object "disappears" from listings, but the locked version is still there
aws s3api delete-object --bucket my-vault --key report.pdf \
  --endpoint-url https://s3.hippius.com   # -> DeleteMarker: true

aws s3api list-object-versions --bucket my-vault --prefix report.pdf \
  --endpoint-url https://s3.hippius.com   # -> the locked version is still listed
```

This is deliberate and matches AWS: ordinary tools that delete objects keep working against a locked bucket, and nothing protected is actually destroyed. Overwriting a locked key is also allowed — it creates a new version, and the locked one is retained.

Bulk `DeleteObjects` follows the same rule per key. A locked key comes back under `<Error>` with `AccessDenied` while its unlocked neighbours are deleted normally; one protected object does not fail the whole batch.

## Bypassing GOVERNANCE

A GOVERNANCE retention can be overridden by the **bucket owner**, and only with an explicit header confirming intent:

```bash
aws s3api delete-object --bucket my-vault --key report.pdf --version-id "$VID" \
  --bypass-governance-retention \
  --endpoint-url https://s3.hippius.com
```

Both halves are required — being the owner is not enough on its own, and the header alone does nothing for anyone else. The bypass has no effect on COMPLIANCE retention or on a legal hold.

:::info How this differs from AWS
AWS gates the bypass on the `s3:BypassGovernanceRetention` IAM action. Hippius has no IAM, so we restrict it to the bucket owner. The nearest ACL permission we could have used (`WRITE_ACP`) is grantable to other accounts, which would have meant "may administer ACLs" silently implied "may destroy retained data" — precisely the authority Object Lock exists to withhold.
:::

## Enabling Object Lock on an existing bucket

Supported, provided the bucket already has versioning enabled:

```bash
aws s3api put-bucket-versioning --bucket existing-bucket \
  --versioning-configuration Status=Enabled --endpoint-url https://s3.hippius.com

aws s3api put-object-lock-configuration --bucket existing-bucket \
  --object-lock-configuration '{"ObjectLockEnabled":"Enabled"}' \
  --endpoint-url https://s3.hippius.com
```

Attempting this on a bucket without versioning returns `409 InvalidBucketState`. Unlike AWS, we do not require the `x-amz-bucket-object-lock-token` header.

Enabling Object Lock affects **future** versions. Existing objects are not retroactively locked; apply retention to them individually if needed.

## Also supported

Smaller pieces of the specification that work as AWS documents them, without needing their own example:

- **`Years` as well as `Days`** in a bucket default retention rule.
- **Retention and legal holds on multipart uploads.** Set the headers on `CreateMultipartUpload`; the lock is fixed at that point and applies to the completed object.
- **Retention and legal holds on `CopyObject`**, from explicit headers or the destination bucket's default.
- **`x-amz-object-lock-*` response headers on `HeadObject`**, so a client can confirm what protection an object carries.
- **Per-version locks.** Two versions of one key can hold different modes and different expiry dates.
- **Independent retention and legal hold.** Either alone locks the version; a lapsed retention with a live hold is still locked.
- **A retention cap.** Retain-until dates beyond 10 years (3650 days) are rejected, which stops a typo in a date field creating effectively permanent storage.

## What we do not support

| Not supported | What happens | Workaround |
|---------------|--------------|------------|
| Lock headers on `CompleteMultipartUpload` | `501 NotImplemented` | Set them on `CreateMultipartUpload` instead — the lock is fixed at initiate |
| `x-amz-object-lock-*` headers on `GetObject` responses | Headers are absent | Use `HeadObject`, or `GetObjectRetention` / `GetObjectLegalHold` |
| Suspending versioning on a lock-enabled bucket | `501 NotImplemented` | Not possible in AWS either once Object Lock is on |
| S3 Batch Operations | Not implemented | Apply retention or legal holds per object; script the loop client-side |
| Replicating lock state to another bucket | Not implemented | Set the lock explicitly on the destination |
| `POST Object` (browser form uploads) | Not implemented | Use `PutObject` with a presigned URL |
| IAM-based bypass permissions | Not implemented | Bypass is restricted to the bucket owner (see above) |

Two further points worth knowing:

- **Lock headers are refused, not ignored, on a bucket without Object Lock enabled.** Sending `x-amz-object-lock-mode` to an ordinary bucket returns `400 InvalidRequest` rather than silently dropping it. A quietly discarded retention header is worse than an error: you would believe an object is protected when it is not.
- **Cache eviction is not deletion.** Locked objects may still be evicted from the regional read caches. That removes a cached copy, not the object, and does not weaken the retention guarantee.

## Cost

A locked object cannot be deleted, so it continues to consume storage — and to bill — for the whole retention period. A ten-year COMPLIANCE retention is a ten-year commitment.

Plan retention windows against what you are actually required to keep, and prefer GOVERNANCE unless a regulator requires otherwise. Test with short windows first.

## Further reading

- [S3 Compatibility Matrix](/storage/s3/compatibility) — every operation and its status
- [AWS Object Lock documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html) — the model Hippius implements
