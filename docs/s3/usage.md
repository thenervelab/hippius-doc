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
- A Hippius blockchain wallet with sub-accounts
- Sub-accounts with appropriate permissions (Upload and/or Delete)
- Your sub-account seed phrase (encoded as Base64 for the access key)
- An s3 compatible client in your programming language of choice (tested with Minio, but any should do the job)

**Creating Sub-Accounts (API Keys)**: If you don't have sub-accounts yet, follow our guide to create them: https://docs.hippius.com/pallets/subAccount#1-adding-sub-accounts

### Authentication

Hippius S3 uses a unique authentication method, instead of the regular AWS access key and secret, we use your sub-account id's seed phrase for as both
- **Access Key**: Your sub-account seed phrase encoded in Base64 (aka your API key)
- **Secret Key**: Your sub-account seed phrase (plain text, used locally to sign)

## Python Setup

### Installation

```bash
pip install minio
```

### Client Configuration

```python
import base64
from minio import Minio

# Your sub-account seed phrase
seed_phrase = "your_subaccount_seed_phrase_here"

# Encode seed phrase for access key
access_key = base64.b64encode(seed_phrase.encode("utf-8")).decode("utf-8")

# Create client
client = Minio(
    "s3.hippius.com",
    access_key=access_key,
    secret_key=seed_phrase,
    secure=True,  # Use HTTPS in production
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
const Minio = require('minio');

// Your sub-account seed phrase
const seedPhrase = 'your_subaccount_seed_phrase_here';

// Encode seed phrase for access key
const accessKey = Buffer.from(seedPhrase, 'utf8').toString('base64');

// Create client
const minioClient = new Minio.Client({
    endPoint: 's3.hippius.com',
    port: 443,
    useSSL: true,  // Use HTTPS in production
    accessKey: accessKey,
    secretKey: seedPhrase,
    region: 'decentralized'
});
```

### Create a Bucket

```javascript
// Generate unique bucket name
const bucketName = `my-bucket-${Date.now()}`;

// Create bucket
async function createBucket() {
    try {
        await minioClient.makeBucket(bucketName, 'decentralized');
        console.log(`Bucket '${bucketName}' created successfully!`);
    } catch (err) {
        console.log('Error creating bucket:', err);
    }
}

createBucket();
```

### Upload an Object

```javascript
// File upload
async function uploadFile() {
    const filePath = './my_file.pdf';
    const fileName = 'documents/my_file.pdf';
    
    try {
        await minioClient.fPutObject(bucketName, fileName, filePath, {
            'Content-Type': 'application/pdf'
        });
        console.log('File uploaded successfully!');
    } catch (err) {
        console.log('Error uploading file:', err);
    }
}

uploadFile();
```

### Download an Object

```javascript
// Download to file
async function downloadToFile() {
    try {
        await minioClient.fGetObject(bucketName, 'documents/my_file.pdf', './downloaded_file.pdf');
        console.log('File downloaded successfully!');
    } catch (err) {
        console.log('Error downloading file:', err);
    }
}

downloadToFile();
```

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

*This guide covers the essential operations for using Hippius S3. For advanced features and specific use cases, refer to the standard S3 documentation, as our API is fully compatible with S3 clients.*