---
description: 10
---

# Hippius S3 API - User Guide

Welcome to the Hippius S3 API! This guide will help you get started with storing and retrieving your files using our S3-compatible storage service powered by IPFS.

## Overview

Hippius S3 provides a fully S3-compatible API that stores your data on the decentralized IPFS network. You can use any standard S3 client library to interact with our service.

**Key Features:**

- Full S3 API compatibility
- Decentralized storage via IPFS
- Secure authentication using blockchain wallet credentials
- Multi-part uploads for large files
- Bucket and object tagging

## Getting Started

### Prerequisites

You'll need:

- A Hippius account (create one at https://console.hippius.com)
- Access keys for authentication (create at https://console.hippius.com/dashboard/settings)
- An S3-compatible client in your programming language of choice (tested with Minio and AWS CLI, but any should work)

**Creating Access Keys**: Visit https://console.hippius.com/dashboard/settings to generate your access key ID and secret key. You can create:
- **Main keys**: Full access to all your buckets (recommended for personal use)
- **Sub keys**: Require explicit ACL grants (recommended for applications/services)

### Authentication

Hippius S3 uses standard S3-compatible authentication with access keys:

- **Access Key ID**: Your access key starting with `hip_` (e.g., `hip_abc123...`)
- **Secret Key**: Your access key secret (keep this secure!)

Get your credentials at: https://console.hippius.com/dashboard/settings

**Legacy Subaccount Authentication**: If you're using subaccount seed phrases for authentication, they still work but are deprecated. We encourage switching to access keys for better security and management. Access keys provide:
- Revocable credentials (seed phrases are permanent)
- Fine-grained access control via ACLs
- Separate keys for different applications
- No need for Base64 encoding

## Python Setup

### Installation

```bash
pip install minio
```

### Client Configuration

```python
from minio import Minio

# Your access key credentials from https://console.hippius.com/dashboard/settings
access_key_id = "hip_your_access_key_id_here"
secret_key = "your_secret_key_here"

# Create client
client = Minio(
    "s3.hippius.com",
    access_key=access_key_id,
    secret_key=secret_key,
    secure=True,  # Use HTTPS in production
    region="decentralized"
)
```

**Legacy Subaccount Setup** (deprecated):
```python
import base64
from minio import Minio

# For existing subaccount users only - switch to access keys recommended
seed_phrase = "your_subaccount_seed_phrase_here"
access_key = base64.b64encode(seed_phrase.encode("utf-8")).decode("utf-8")

client = Minio(
    "s3.hippius.com",
    access_key=access_key,
    secret_key=seed_phrase,
    secure=True,
    region="decentralized"
)
```

### Create a Bucket

```python
import time

# Generate unique bucket name
bucket_name = f"my-bucket-{int(time.time())}"

# Create bucket
client.make_bucket(bucket_name)
print(f"Bucket '{bucket_name}' created successfully!")
```

### Upload an Object

```python
# File upload
with open("my_file.pdf", "rb") as file_data:
    file_size = file_data.seek(0, 2)  # Get file size
    file_data.seek(0)  # Reset to beginning

    client.put_object(
        bucket_name,
        "documents/my_file.pdf",
        file_data,
        file_size,
        content_type="application/pdf"
    )
print("File uploaded successfully!")
```

### Download an Object

```python
# Download to file
response = client.get_object(bucket_name, "documents/my_file.pdf")
with open("downloaded_file.pdf", "wb") as file:
    for data in response.stream(1024):
        file.write(data)
response.close()
response.release_conn()
print("File downloaded successfully!")
```

## JavaScript Setup

### Installation

```bash
npm install minio
```

### Client Configuration

```javascript
const Minio = require("minio");

// Your access key credentials from https://console.hippius.com/dashboard/settings
const accessKeyId = "hip_your_access_key_id_here";
const secretKey = "your_secret_key_here";

// Create client
const minioClient = new Minio.Client({
  endPoint: "s3.hippius.com",
  port: 443,
  useSSL: true, // Use HTTPS in production
  accessKey: accessKeyId,
  secretKey: secretKey,
  region: "decentralized",
});
```

**Legacy Subaccount Setup** (deprecated):
```javascript
const Minio = require("minio");

// For existing subaccount users only - switch to access keys recommended
const seedPhrase = "your_subaccount_seed_phrase_here";
const accessKey = Buffer.from(seedPhrase, "utf8").toString("base64");

const minioClient = new Minio.Client({
  endPoint: "s3.hippius.com",
  port: 443,
  useSSL: true,
  accessKey: accessKey,
  secretKey: seedPhrase,
  region: "decentralized",
});
```

### Create a Bucket

```javascript
// Generate unique bucket name
const bucketName = `my-bucket-${Date.now()}`;

// Create bucket
async function createBucket() {
  try {
    await minioClient.makeBucket(bucketName, "decentralized");
    console.log(`Bucket '${bucketName}' created successfully!`);
  } catch (err) {
    console.log("Error creating bucket:", err);
  }
}

createBucket();
```

### Upload an Object

```javascript
// File upload
async function uploadFile() {
  const filePath = "./my_file.pdf";
  const fileName = "documents/my_file.pdf";

  try {
    await minioClient.fPutObject(bucketName, fileName, filePath, {
      "Content-Type": "application/pdf",
    });
    console.log("File uploaded successfully!");
  } catch (err) {
    console.log("Error uploading file:", err);
  }
}

uploadFile();
```

### Download an Object

```javascript
// Download to file
async function downloadToFile() {
  try {
    await minioClient.fGetObject(
      bucketName,
      "documents/my_file.pdf",
      "./downloaded_file.pdf"
    );
    console.log("File downloaded successfully!");
  } catch (err) {
    console.log("Error downloading file:", err);
  }
}

downloadToFile();
```

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

# Get credentials from https://console.hippius.com/dashboard/settings
client = Minio(
    "s3.hippius.com",
    access_key="hip_your_access_key_id_here",
    secret_key="your_secret_key_here",
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
print(f"✓ Bucket '{bucket_name}' is now public")
```

### Uploading to Public Buckets

Upload files normally - they become publicly accessible automatically:

#### Python Example

```python
from minio import Minio
from io import BytesIO

# Setup client
client = Minio(
    "s3.hippius.com",
    access_key="hip_your_access_key_id_here",
    secret_key="your_secret_key_here",
    secure=True,
    region="decentralized"
)

# Upload file to public bucket
file_content = b"Hello! This file is publicly accessible."
bucket_name = "my-public-bucket"
object_name = "documents/public-file.txt"

client.put_object(
    bucket_name,
    object_name,
    BytesIO(file_content),
    length=len(file_content),
    content_type="text/plain"
)

print(f"✓ File uploaded!")
print(f"Public URL: https://s3.hippius.com/{bucket_name}/{object_name}")
```

#### JavaScript Example

```javascript
// Upload file to public bucket
const fileContent = Buffer.from("Hello! This file is publicly accessible.");
const bucketName = "my-public-bucket";
const objectName = "documents/public-file.txt";

await minioClient.putObject(bucketName, objectName, fileContent, {
  "Content-Type": "text/plain",
});

console.log(`✓ File uploaded!`);
console.log(`Public URL: https://s3.hippius.com/${bucketName}/${objectName}`);
```

### Accessing Public Files

Public objects are accessible via standard S3 path-style URLs - no authentication required:

```bash
# Direct browser access or curl
https://s3.hippius.com/{bucket-name}/{object-key}

# Examples:
https://s3.hippius.com/my-public-bucket/document.pdf
https://s3.hippius.com/my-public-bucket/images/photo.jpg
https://s3.hippius.com/my-public-bucket/documents/public-file.txt
```

### Making Individual Objects Public

Keep your bucket private but make specific objects public:

```bash
# Using AWS CLI
aws s3api put-object-acl --bucket mybucket --key document.pdf \
  --acl public-read --endpoint-url https://s3.hippius.com
```

```python
# Using Minio Python client
from minio import Minio

client = Minio(
    "s3.hippius.com",
    access_key="hip_your_access_key_id_here",
    secret_key="your_secret_key_here",
    secure=True,
    region="decentralized"
)

# Upload with public-read ACL
client.fput_object(
    "my-private-bucket",
    "public-document.pdf",
    "local-file.pdf",
    metadata={"x-amz-acl": "public-read"}
)

print("Public URL: https://s3.hippius.com/my-private-bucket/public-document.pdf")
```

### Complete Public Bucket Example

```python
import json
from minio import Minio
from io import BytesIO

def create_and_use_public_bucket():
    # Get credentials from https://console.hippius.com/dashboard/settings
    client = Minio(
        "s3.hippius.com",
        access_key="hip_your_access_key_id_here",
        secret_key="your_secret_key_here",
        secure=True,
        region="decentralized"
    )

    bucket_name = "my-demo-public-bucket"

    # Step 1: Create bucket
    print("1. Creating bucket...")
    client.make_bucket(bucket_name)

    # Step 2: Make it public with bucket policy
    print("2. Setting public read policy...")
    policy = {
        "Version": "2012-10-17",
        "Statement": [{
            "Effect": "Allow",
            "Principal": "*",
            "Action": ["s3:GetObject"],
            "Resource": [f"arn:aws:s3:::{bucket_name}/*"]
        }]
    }
    client.set_bucket_policy(bucket_name, json.dumps(policy))

    # Step 3: Upload a file
    print("3. Uploading file...")
    file_content = b"This is a publicly accessible file!"
    object_name = "demo.txt"

    client.put_object(
        bucket_name,
        object_name,
        BytesIO(file_content),
        length=len(file_content),
        content_type="text/plain"
    )

    # Step 4: Access publicly
    public_url = f"https://s3.hippius.com/{bucket_name}/{object_name}"
    print(f"✓ Success! File is publicly accessible at:")
    print(f"  {public_url}")
    print(f"\nTry it: curl {public_url}")

create_and_use_public_bucket()
```

### Key Differences: Private vs Public

| Feature        | Private Buckets                   | Public Buckets                                   |
| -------------- | --------------------------------- | ------------------------------------------------ |
| **Encryption** | ✅ Encrypted with per-bucket keys | ✅ Encrypted with per-bucket keys                 |
| **Access**     | 🔒 Requires authentication        | 🌍 Publicly accessible via `https://s3.hippius.com/bucket/key` |
| **Use Cases**  | Sensitive data, private files     | Public content, websites, shared files           |
| **Creation**   | Standard `make_bucket()`          | `make_bucket()` + ACL/bucket policy              |

## Access Control Lists (ACLs)

ACLs let you control who can access your buckets and objects. Use ACLs to share data with other Hippius accounts, grant access to specific [access keys](https://console.hippius.com/dashboard/settings), or make content public.

### What ACLs Support

**Permission Types:**
- **READ**: List bucket contents / Download objects
- **WRITE**: Upload/delete objects in bucket
- **READ_ACP**: View ACL permissions
- **WRITE_ACP**: Modify ACL permissions
- **FULL_CONTROL**: All permissions

**Grant Types:**
- **Canonical User ID**: Grant to another Hippius account (all their keys get access)
- **Access Key**: Grant to specific [access key](https://console.hippius.com/dashboard/settings) (fine-grained control)
- **Groups**: Grant to `AllUsers` (public) or `AuthenticatedUsers` (any logged-in user)

### Getting Your Canonical User ID

Before sharing with others, you need canonical user IDs:

```bash
# Using AWS CLI with access keys from https://console.hippius.com/dashboard/settings
export AWS_ACCESS_KEY_ID="hip_your_access_key_id_here"
export AWS_SECRET_ACCESS_KEY="your_secret_key_here"
export AWS_DEFAULT_REGION=decentralized

aws s3api list-buckets --endpoint-url https://s3.hippius.com \
  --query 'Owner.ID' --output text
```

**Legacy subaccount method** (deprecated):
```bash
export AWS_ACCESS_KEY_ID="$(echo -n 'your seed phrase' | base64)"
export AWS_SECRET_ACCESS_KEY="your seed phrase"
export AWS_DEFAULT_REGION=decentralized
```

Output will be your Substrate address (e.g., `5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty`)

### Common ACL Operations

#### Make Bucket Public (Canned ACL)

```bash
# Simple public-read ACL
aws s3api put-bucket-acl --bucket mybucket --acl public-read \
  --endpoint-url https://s3.hippius.com
```

#### Share Bucket with Another Account

```bash
# Grant READ to another account's canonical ID
aws s3api put-bucket-acl --bucket mybucket \
  --grant-read 'id="their_canonical_id_here"' \
  --grant-full-control 'id="your_canonical_id_here"' \
  --endpoint-url https://s3.hippius.com
```

**Important**: Always include `--grant-full-control` for yourself to maintain access!

#### Grant to Specific Access Key

If you created [access keys](https://console.hippius.com/dashboard/settings) for your applications, grant them specific permissions:

```bash
# Grant READ to a specific access key
aws s3api put-bucket-acl --bucket mybucket \
  --grant-read 'accessKey="hip_your_access_key_id"' \
  --grant-full-control 'id="your_canonical_id"' \
  --endpoint-url https://s3.hippius.com
```

**Note**: `accessKey=` is a Hippius extension for fine-grained access control.

#### Make Single Object Public

```bash
# Keep bucket private, make one object public
aws s3api put-object-acl --bucket mybucket --key document.pdf \
  --acl public-read --endpoint-url https://s3.hippius.com
```

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
# Reset to private (owner only)
aws s3api put-bucket-acl --bucket mybucket --acl private \
  --endpoint-url https://s3.hippius.com
```

### Supported Canned ACLs

- `private` - Owner only (default)
- `public-read` - Owner full control + public read access
- `public-read-write` - Owner full control + public read/write
- `authenticated-read` - Owner full control + any authenticated user read

### Access Keys and ACLs

Hippius supports two types of [access keys](https://console.hippius.com/dashboard/settings):

- **Main keys**: Automatically have full access to your buckets (bypass ACLs)
- **Sub keys**: Require explicit ACL grants for access

Create and manage access keys at: https://console.hippius.com/dashboard/settings

### Quick Reference

| Task | Command |
|------|---------|
| Make public | `aws s3api put-bucket-acl --bucket B --acl public-read --endpoint-url https://s3.hippius.com` |
| Share with user | `aws s3api put-bucket-acl --bucket B --grant-read 'id="THEIR_ID"' --grant-full-control 'id="YOUR_ID"' --endpoint-url https://s3.hippius.com` |
| Grant to access key | `aws s3api put-bucket-acl --bucket B --grant-read 'accessKey="hip_KEY"' --grant-full-control 'id="YOUR_ID"' --endpoint-url https://s3.hippius.com` |
| Check ACL | `aws s3api get-bucket-acl --bucket B --endpoint-url https://s3.hippius.com` |

For more detailed ACL documentation including cross-account sharing examples and troubleshooting, see `acl-release.md` or `acl-quickstart.md`.

## Advanced Features

### Bucket Operations

```python
# List all buckets
buckets = client.list_buckets()
for bucket in buckets:
    print(f"Bucket: {bucket.name}, Created: {bucket.creation_date}")

# Check if bucket exists
exists = client.bucket_exists(bucket_name)
print(f"Bucket exists: {exists}")

# Set bucket tags
from minio.commonconfig import Tags
tags = Tags.new_bucket_tags()
tags["Project"] = "MyProject"
tags["Environment"] = "Production"
client.set_bucket_tags(bucket_name, tags)
```

### Object Operations

```python
# List objects in bucket
objects = client.list_objects(bucket_name, recursive=True)
for obj in objects:
    print(f"Object: {obj.object_name}, Size: {obj.size}")

# List objects with prefix
objects = client.list_objects(bucket_name, prefix="documents/")
for obj in objects:
    print(f"Document: {obj.object_name}")

# Get object metadata
stat = client.stat_object(bucket_name, "hello.txt")
print(f"Size: {stat.size}, Modified: {stat.last_modified}")

# Set object tags
from minio.commonconfig import Tags
obj_tags = Tags.new_object_tags()
obj_tags["Type"] = "Document"
obj_tags["Status"] = "Final"
client.set_object_tags(bucket_name, "hello.txt", obj_tags)
```

### Large File Uploads

For files larger than 5MB, use multipart uploads:

```python
# Upload large file with multipart
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
4. **Error Handling**: Always wrap operations in try-catch blocks
5. **Connection Management**: Close responses and release connections
6. **Security**: Never expose your seed phrase in client-side code

## Troubleshooting

### Common Issues

**Authentication Errors**

- Verify your seed phrase is correct
- Ensure Base64 encoding is properly applied to the access key
- Check that your sub-account has the required permissions

**Upload Failures**

- Verify your account has sufficient credits
- Check that bucket names are valid (lowercase, no special characters)
- Ensure your sub-account has Upload permissions

**Permission Denied**

- Check sub-account permissions (Upload/Delete roles)
- Verify you're accessing buckets owned by your main account
- Ensure your account has active credits

### Getting Help

If you encounter issues or need support:

🐛 **Report bugs**: https://discord.com/channels/1298001698874327131/1298155996128084038

Our support team monitors this channel and will help you resolve any issues quickly.

## Rate Limits

- 100 requests per minute per account
- Large file uploads may take longer due to IPFS processing
- Parallel uploads are supported for better performance

## Supported Operations

✅ **Supported**

- Bucket operations (create, delete, list, tags)
- Object operations (upload, download, delete, list, metadata)
- Multipart uploads
- Object and bucket tagging
- Lifecycle policies

⚠️ **Limited Support**

- Range requests (partial support)
- S3 Select (limited functionality)

❌ **Not Supported**

- Bucket versioning
- Cross-region replication
- Server-side encryption configuration

---

_This guide covers the essential operations for using Hippius S3. For advanced features and specific use cases, refer to the standard S3 documentation, as our API is fully compatible with S3 clients._
