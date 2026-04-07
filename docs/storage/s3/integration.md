---
description: 10
---

# S3 API Reference

Hippius S3 is a drop-in replacement for Amazon S3. If you already have code that talks to AWS S3, change three things — **endpoint**, **region**, and **credentials** — and everything else works.

## Connection Parameters

| Parameter | Value |
|-----------|-------|
| **Endpoint** | `https://s3.hippius.com` |
| **Region** | `decentralized` |
| **Signature** | AWS Signature V4 |
| **Path style** | Required (`forcePathStyle: true`) |

Get your credentials at [console.hippius.com](https://console.hippius.com). See the [Quickstart](/use/quickstart) to go from zero to first upload in 5 minutes.

## Client Guides

| Language | Guide |
|----------|-------|
| Python (boto3 & MinIO) | [Python guide](/storage/s3/python) |
| JavaScript / Node.js | [JavaScript guide](/storage/s3/javascript) |
| AWS CLI | [AWS CLI guide](/storage/s3/aws-cli) |
| rclone | [rclone guide](/storage/s3/rclone) |

For the full list of supported and unsupported S3 operations, see the [S3 Compatibility Matrix](/storage/s3/compatibility).

## Public Buckets

By default, all buckets are **private** and require authentication to access. Public buckets allow anyone to read objects without credentials, similar to AWS S3 public buckets.

### Making Buckets Public

You can make buckets public using either ACLs or bucket policies.

#### Option 1: Using ACLs (Simple)

```bash
# Make entire bucket public using AWS CLI
aws s3api put-bucket-acl --bucket mybucket --acl public-read \
  --endpoint-url https://s3.hippius.com
```

#### Option 2: Using Bucket Policies (Recommended)

```python
import json
from minio import Minio

client = Minio(
    "s3.hippius.com",
    access_key="YOUR_ACCESS_KEY",
    secret_key="YOUR_SECRET_KEY",
    secure=True,
    region="decentralized"
)

bucket_name = "my-public-bucket"

# Create bucket
client.make_bucket(bucket_name)

# Set public read policy
policy = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": ["s3:GetObject"],
            "Resource": [f"arn:aws:s3:::{bucket_name}/*"]
        }
    ]
}

client.set_bucket_policy(bucket_name, json.dumps(policy))
print(f"Bucket '{bucket_name}' is now public")
```

### Accessing Public Files

Public objects are accessible via path-style URLs — no authentication required:

```
https://s3.hippius.com/{bucket-name}/{object-key}
```

Examples:
```
https://s3.hippius.com/my-public-bucket/document.pdf
https://s3.hippius.com/my-public-bucket/images/photo.jpg
```

### Making Individual Objects Public

Keep your bucket private but make specific objects public:

```bash
aws s3api put-object-acl --bucket mybucket --key document.pdf \
  --acl public-read --endpoint-url https://s3.hippius.com
```

### Private vs Public

| Feature | Private Buckets | Public Buckets |
|---------|----------------|----------------|
| **Encryption** | ✅ Encrypted with per-bucket keys | ✅ Encrypted with per-bucket keys |
| **Access** | 🔒 Requires authentication | 🌍 Accessible via `https://s3.hippius.com/bucket/key` |
| **Use Cases** | Sensitive data, private files | Public content, websites, shared files |
| **Creation** | Standard `make_bucket()` | `make_bucket()` + ACL/bucket policy |

## Access Control Lists (ACLs)

ACLs let you control who can access your buckets and objects. Use ACLs to share data with other Hippius accounts, grant access to specific [access keys](https://console.hippius.com/dashboard/settings), or make content public.

### Permission Types

- **READ**: List bucket contents / Download objects
- **WRITE**: Upload/delete objects in bucket
- **READ_ACP**: View ACL permissions
- **WRITE_ACP**: Modify ACL permissions
- **FULL_CONTROL**: All permissions

### Grant Types

- **Canonical User ID**: Grant to another Hippius account (all their keys get access)
- **Access Key**: Grant to specific [access key](https://console.hippius.com/dashboard/settings) (fine-grained control)
- **Groups**: Grant to `AllUsers` (public) or `AuthenticatedUsers` (any logged-in user)

### Getting Your Canonical User ID

```bash
export AWS_ACCESS_KEY_ID="YOUR_ACCESS_KEY"
export AWS_SECRET_ACCESS_KEY="YOUR_SECRET_KEY"
export AWS_DEFAULT_REGION=decentralized

aws s3api list-buckets --endpoint-url https://s3.hippius.com \
  --query 'Owner.ID' --output text
```

### Common ACL Operations

#### Share Bucket with Another Account

```bash
aws s3api put-bucket-acl --bucket mybucket \
  --grant-read 'id="their_canonical_id_here"' \
  --grant-full-control 'id="your_canonical_id_here"' \
  --endpoint-url https://s3.hippius.com
```

:::warning
Always include `--grant-full-control` for yourself to maintain access!
:::

#### Grant to Specific Access Key

```bash
aws s3api put-bucket-acl --bucket mybucket \
  --grant-read 'accessKey="YOUR_ACCESS_KEY"' \
  --grant-full-control 'id="your_canonical_id"' \
  --endpoint-url https://s3.hippius.com
```

`accessKey=` is a Hippius extension for fine-grained access control.

#### Check Current Permissions

```bash
# View bucket ACL
aws s3api get-bucket-acl --bucket mybucket \
  --endpoint-url https://s3.hippius.com

# View object ACL
aws s3api get-object-acl --bucket mybucket --key file.pdf \
  --endpoint-url https://s3.hippius.com
```

#### Revoke All Access

```bash
aws s3api put-bucket-acl --bucket mybucket --acl private \
  --endpoint-url https://s3.hippius.com
```

### Supported Canned ACLs

- `private` — Owner only (default)
- `public-read` — Owner full control + public read access
- `public-read-write` — Owner full control + public read/write
- `authenticated-read` — Owner full control + any authenticated user read

### Access Keys and ACLs

Hippius supports two types of [access keys](https://console.hippius.com/dashboard/settings):

- **Main keys**: Automatically have full access to your buckets (bypass ACLs)
- **Sub keys**: Require explicit ACL grants for access

### Quick Reference

| Task | Command |
|------|---------|
| Make public | `aws s3api put-bucket-acl --bucket B --acl public-read --endpoint-url https://s3.hippius.com` |
| Share with user | `--grant-read 'id="THEIR_ID"' --grant-full-control 'id="YOUR_ID"'` |
| Grant to access key | `--grant-read 'accessKey="hip_KEY"' --grant-full-control 'id="YOUR_ID"'` |
| Check ACL | `aws s3api get-bucket-acl --bucket B --endpoint-url https://s3.hippius.com` |

## Advanced Features

### Bucket & Object Tagging

```python
from minio.commonconfig import Tags

# Bucket tags
tags = Tags.new_bucket_tags()
tags["Project"] = "MyProject"
tags["Environment"] = "Production"
client.set_bucket_tags(bucket_name, tags)

# Object tags
obj_tags = Tags.new_object_tags()
obj_tags["Type"] = "Document"
obj_tags["Status"] = "Final"
client.set_object_tags(bucket_name, "hello.txt", obj_tags)
```

### Large File Uploads (Multipart)

For files larger than 5MB, the MinIO SDK automatically uses multipart uploads. You can configure part size and parallelism:

```python
with open("large_file.zip", "rb") as file_data:
    file_size = file_data.seek(0, 2)
    file_data.seek(0)

    client.put_object(
        bucket_name,
        "large_file.zip",
        file_data,
        file_size,
        content_type="application/zip",
        part_size=10 * 1024 * 1024,  # 10MB parts
        num_parallel_uploads=3       # 3 parallel uploads
    )
```

## Best Practices

1. **Bucket Naming**: Use lowercase letters, numbers, and hyphens only
2. **Object Keys**: Can include forward slashes to simulate folders
3. **Large Files**: Use multipart uploads for files > 5MB
4. **Connection Management**: Close responses and release connections after downloads
5. **Security**: Never expose your secret key in client-side code — use [presigned URLs](/storage/s3/python#presigned-url) for browser access

## Rate Limits

- 100 requests per minute per account
- Large file uploads may take longer due to network processing
- Parallel uploads are supported for better performance

## More Resources

- [S3 Compatibility Matrix](/storage/s3/compatibility) — Full list of supported operations
- [AWS S3 vs Cloudflare R2 vs Hippius S3](https://github.com/thenervelab/hippius-s3/blob/main/docs/comparison.md) — Detailed comparison
- [Troubleshooting](/use/troubleshooting) — Common errors and fixes
- [Token Management](/use/s3-token-management) — Create sub-tokens, manage access levels
- [Pricing](https://hippius.com/pricing) — Storage and bandwidth costs
- [Hippius Management API](/use/api) — Automate token management and billing
- [hippius-s3 on GitHub](https://github.com/thenervelab/hippius-s3) — Report issues, request features, or contribute
- [llms.txt](https://docs.hippius.com/llms.txt) — Machine-readable docs for AI agents and LLMs
