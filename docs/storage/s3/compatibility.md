---
id: compatibility
title: S3 Compatibility Matrix
sidebar_label: S3 Compatibility
slug: /storage/s3/compatibility
---

import Unordered from '@site/src/components/Unordered';

# S3 Compatibility Matrix

Hippius S3 is a drop-in replacement for Amazon S3 with a focused feature set. If you already have code that works with AWS S3, you only need to change three things: **endpoint URL**, **region**, and **credentials**. Everything else stays the same.

This page lists every S3 API operation and whether we support it.

## Connection Parameters

| Parameter | Value |
|-----------|-------|
| **Endpoint** | `https://s3.hippius.com` |
| **Region** | `decentralized` |
| **Signature** | AWS Signature V4 |
| **Addressing** | Path-style (`s3.hippius.com/bucket/key`) |

Same values as [Getting Started](/use/quickstart#connection-details). Always use `https://s3.hippius.com`.

## Bucket Operations

| Operation | Status | Notes |
|-----------|--------|-------|
| `CreateBucket` | ✅ Supported | |
| `DeleteBucket` | ✅ Supported | Must be empty |
| `HeadBucket` | ✅ Supported | |
| `ListBuckets` | ✅ Supported | |
| `GetBucketLocation` | ✅ Supported | Returns `decentralized` |
| `PutBucketAcl` | ✅ Supported | `private`, `public-read`, `public-read-write`, `authenticated-read` |
| `GetBucketAcl` | ✅ Supported | |
| `PutBucketPolicy` | ✅ Supported | JSON IAM-style policies |
| `GetBucketPolicy` | ✅ Supported | |
| `DeleteBucketPolicy` | ✅ Supported | |
| `PutBucketTagging` | ✅ Supported | |
| `GetBucketTagging` | ✅ Supported | |
| `DeleteBucketTagging` | ✅ Supported | |
| `PutBucketLifecycleConfiguration` | ⚠️ Partial | Basic expiration rules only |
| `GetBucketLifecycleConfiguration` | ⚠️ Partial | |
| `PutBucketVersioning` | ⚠️ Partial | `Enabled` only — `Suspended` returns 501 |
| `GetBucketVersioning` | ✅ Supported | Omits `Status` when versioning was never enabled |
| `PutObjectLockConfiguration` | ✅ Supported | Bucket default retention, `Days` or `Years`. Requires versioning — see [Object Lock](/storage/s3/object-lock) |
| `GetObjectLockConfiguration` | ✅ Supported | `404 ObjectLockConfigurationNotFoundError` when unset |
| `PutBucketCors` | ❌ Not supported | CORS is handled at the gateway level |
| `PutBucketNotificationConfiguration` | ❌ Not supported | |
| `PutBucketReplication` | ❌ Not supported | Data is replicated by the network automatically |
| `PutBucketLogging` | ❌ Not supported | |

## Object Operations

| Operation | Status | Notes |
|-----------|--------|-------|
| `PutObject` | ✅ Supported | Up to ~5 TiB via multipart |
| `GetObject` | ✅ Supported | [Range requests](https://docs.aws.amazon.com/AmazonS3/latest/userguide/GettingObjectsUsingAPIs.html) supported (video streaming) |
| `HeadObject` | ✅ Supported | |
| `DeleteObject` | ✅ Supported | |
| `DeleteObjects` | ✅ Supported | Bulk delete |
| `CopyObject` | ✅ Supported | |
| `ListObjectsV2` | ✅ Supported | Pagination, prefix, delimiter |
| `ListObjects` | ✅ Supported | V1 — prefer `ListObjectsV2` |
| `PutObjectAcl` | ✅ Supported | Per-object ACLs |
| `GetObjectAcl` | ✅ Supported | |
| `PutObjectTagging` | ✅ Supported | |
| `GetObjectTagging` | ✅ Supported | |
| `DeleteObjectTagging` | ✅ Supported | |
| `ListObjectVersions` | ✅ Supported | Versions and delete markers; prefix, delimiter, paging |
| `PutObjectRetention` | ✅ Supported | Per version. Extend allowed, shorten refused — see [Object Lock](/storage/s3/object-lock) |
| `GetObjectRetention` | ✅ Supported | |
| `PutObjectLegalHold` | ✅ Supported | Indefinite lock, independent of retention |
| `GetObjectLegalHold` | ✅ Supported | |
| `SelectObjectContent` | ❌ Not supported | S3 Select |
| `PostObject` | ❌ Not supported | Browser form uploads — use a presigned `PutObject` |

## Versioning and Object Lock

Both are supported. Object Lock gives you write-once-read-many (WORM) retention with `GOVERNANCE` and `COMPLIANCE` modes, legal holds, and bucket-wide default retention — enforced below the API, so a locked version cannot be permanently deleted by anyone until it expires.

| Capability | Status | Notes |
|------------|--------|-------|
| Bucket versioning | ✅ Supported | `Enabled` only; `Suspended` returns 501 |
| Object Lock — `GOVERNANCE` | ✅ Supported | Bucket owner can bypass with an explicit header |
| Object Lock — `COMPLIANCE` | ✅ Supported | Cannot be shortened, cleared, or bypassed by anyone |
| Legal holds | ✅ Supported | Indefinite; independent of retention |
| Bucket default retention | ✅ Supported | `Days` or `Years`; applies to PUT, multipart and copy |
| Enable Object Lock on an existing bucket | ✅ Supported | Requires versioning first; no `x-amz-bucket-object-lock-token` needed |
| Lock headers on `CompleteMultipartUpload` | ❌ Not supported | Set them on `CreateMultipartUpload` instead |
| Lock headers on `GetObject` responses | ❌ Not supported | Use `HeadObject` |
| S3 Batch Operations | ❌ Not supported | Apply locks per object |
| Replicating lock state | ❌ Not supported | Set the lock on the destination |

**→ Full guide with examples: [Object Lock (WORM)](/storage/s3/object-lock)**

## Multipart Upload

| Operation | Status | Notes |
|-----------|--------|-------|
| `CreateMultipartUpload` | ✅ Supported | Accepts `x-amz-object-lock-*` headers |
| `UploadPart` | ✅ Supported | |
| `CompleteMultipartUpload` | ✅ Supported | |
| `AbortMultipartUpload` | ✅ Supported | |
| `ListMultipartUploads` | ✅ Supported | |
| `ListParts` | ✅ Supported | |

## Presigned URLs

| Operation | Status | Notes |
|-----------|--------|-------|
| Presigned GET | ✅ Supported | Max expiry: 7 days |
| Presigned PUT | ✅ Supported | Max expiry: 7 days |
| Presigned DELETE | ✅ Supported | |

## What's Different from AWS S3

Hippius S3 is S3-compatible but not an AWS clone. Here's what to keep in mind:

<Unordered>
  <li><strong>Path-style only.</strong> Virtual-hosted style (<code>bucket.s3.hippius.com</code>) is not supported. Always use <code>forcePathStyle: true</code> or <code>addressing_style: "path"</code>.</li>
  <li><strong>Single region.</strong> There's no multi-region setup. The region is always <code>decentralized</code>.</li>
  <li><strong>Versioning cannot be suspended.</strong> You can enable it, but <code>Suspended</code> returns 501. Enable it deliberately — on a bucket with Object Lock, AWS does not allow suspending it either.</li>
  <li><strong>Object Lock bypass is owner-only.</strong> AWS gates <code>BypassGovernanceRetention</code> on IAM; Hippius has no IAM, so the bucket owner is the only identity that can bypass a GOVERNANCE retention.</li>
  <li><strong>No S3 Select.</strong> You can't query inside objects. Download the object and process it locally.</li>
  <li><strong>No event notifications.</strong> There's no equivalent of S3 Event Notifications or Lambda triggers.</li>
  <li><strong>Replication is automatic.</strong> The Hippius network handles data replication across miners. You don't need to configure cross-region replication.</li>
</Unordered>

## Tested Clients

These S3 clients are tested and confirmed to work with Hippius S3:

| Client | Language | Guide |
|--------|----------|-------|
| boto3 | Python | [Python guide](/storage/s3/python) |
| minio-py | Python | [Python guide](/storage/s3/python) |
| @aws-sdk/client-s3 | JavaScript | [JavaScript guide](/storage/s3/javascript) |
| minio-js | JavaScript | [JavaScript guide](/storage/s3/javascript) |
| AWS CLI | CLI | [AWS CLI guide](/storage/s3/aws-cli) |
| rclone | CLI | [rclone guide](/storage/s3/rclone) |

## Further Reading

<Unordered>
  <li><a href="/use/quickstart">Getting Started</a> — first upload</li>
  <li><a href="/storage/s3/advanced">Advanced Usage</a> — presigned URLs, ACLs, public buckets, sub-tokens</li>
  <li><a href="/storage/s3/object-lock">Object Lock (WORM)</a> — retention and legal holds</li>
  <li><a href="https://s3.hippius.com/veggies/s3/benchmark.html">Hippius S3 Benchmarks</a> — live performance benchmarks</li>
  <li><a href="https://github.com/thenervelab/hippius-s3/blob/main/docs/comparison.md">AWS S3 vs Cloudflare R2 vs Hippius S3</a> — features, pricing, trade-offs</li>
  <li><a href="https://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html">AWS S3 API Documentation</a> — any operation marked "Supported" above works identically</li>
  <li><a href="https://github.com/thenervelab/hippius-s3">hippius-s3 on GitHub</a> — report issues or request features</li>
  <li><a href="https://docs.hippius.com/llms.txt">llms.txt</a> — machine-readable docs for AI agents</li>
</Unordered>
