---
id: compatibility
title: S3 Compatibility Matrix
sidebar_label: S3 Compatibility
slug: /storage/s3/compatibility
---

# S3 Compatibility Matrix

Hippius S3 is a drop-in replacement for Amazon S3 with a focused feature set. If you already have code that works with AWS S3, you only need to change three things: **endpoint URL**, **region**, and **credentials**. Everything else stays the same.

This page lists every S3 API operation and whether Hippius supports it.

## Connection Parameters

| Parameter | Value |
|-----------|-------|
| **Endpoint** | `https://s3.hippius.com` |
| **Region** | `decentralized` |
| **Signature** | AWS Signature V4 |
| **Addressing** | Path-style (`s3.hippius.com/bucket/key`) |

:::tip Pick the closest region for best performance
Hippius S3 is served through regional caches. For lower latency, point your client at the endpoint closest to you:
- **Europe:** `https://eu-central-1.hippius.com` (the default `https://s3.hippius.com` also resolves here)
- **US:** `https://us-east-1.hippius.com`

All regions serve the same data — just swap the endpoint in your client config.
:::

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
| `PutBucketVersioning` | ❌ Not supported | |
| `GetBucketVersioning` | ❌ Not supported | |
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
| `SelectObjectContent` | ❌ Not supported | S3 Select |
| `PutObjectLockConfiguration` | ❌ Not supported | Object Lock / WORM |
| `PutObjectRetention` | ❌ Not supported | |

## Multipart Upload

| Operation | Status | Notes |
|-----------|--------|-------|
| `CreateMultipartUpload` | ✅ Supported | |
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

- **Path-style only.** Virtual-hosted style (`bucket.s3.hippius.com`) is not supported. Always use `forcePathStyle: true` or `addressing_style: "path"`.
- **Single region.** There's no multi-region setup. The region is always `decentralized`.
- **No versioning.** Objects are overwritten in place. If you need version history, manage it in your application.
- **No S3 Select.** You can't query inside objects. Download the object and process it locally.
- **No event notifications.** There's no equivalent of S3 Event Notifications or Lambda triggers.
- **Replication is automatic.** The Hippius network handles data replication across miners. You don't need to configure cross-region replication.

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

- [Hippius S3 Benchmarks](https://s3.hippius.com/veggies/s3/benchmark.html) — Live performance benchmarks for Hippius S3
- [AWS S3 vs Cloudflare R2 vs Hippius S3 — Detailed Comparison](https://github.com/thenervelab/hippius-s3/blob/main/docs/comparison.md) — In-depth analysis of features, pricing, and trade-offs
- [AWS S3 API Documentation](https://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html) — Any operation marked "Supported" above works identically
- [hippius-s3 on GitHub](https://github.com/thenervelab/hippius-s3) — Report issues, request features, or contribute
- [llms.txt](https://docs.hippius.com/llms.txt) — Machine-readable docs for AI agents
