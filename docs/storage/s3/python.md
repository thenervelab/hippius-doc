---
id: python
title: Python (boto3 & minio)
sidebar_label: Python
slug: /storage/s3/python
---

# Python

Two libraries work well with Hippius S3: **boto3** (AWS SDK) and **minio** (MinIO SDK). Both are fully supported.

:::tip Pick the closest region for best performance
Hippius S3 is served through regional caches. For lower latency, point your client at the endpoint closest to you:
- **Europe:** `https://eu-central-1.hippius.com` (the default `https://s3.hippius.com` also resolves here)
- **US:** `https://us-east-1.hippius.com`

All regions serve the same data — just swap the `endpoint_url` / host in the snippets below.
:::

## boto3

### Install

```bash
pip install boto3
```

### Connect

```python
import boto3
from botocore.config import Config

s3 = boto3.client(
    "s3",
    endpoint_url="https://s3.hippius.com",
    aws_access_key_id="YOUR_ACCESS_KEY",
    aws_secret_access_key="YOUR_SECRET_KEY",
    region_name="decentralized",
    config=Config(
        signature_version="s3v4",
        s3={"addressing_style": "path"},
    ),
)
```

### Create a bucket

```python
s3.create_bucket(Bucket="my-bucket")
```

### Upload a file

```python
# Upload from disk
s3.upload_file("local-file.txt", "my-bucket", "remote-name.txt")

# Upload from memory
s3.put_object(
    Bucket="my-bucket",
    Key="hello.txt",
    Body=b"Hello from Hippius!",
)
```

### Download a file

```python
# Download to disk
s3.download_file("my-bucket", "remote-name.txt", "local-file.txt")

# Download to memory
response = s3.get_object(Bucket="my-bucket", Key="hello.txt")
content = response["Body"].read()
print(content.decode())
```

### List objects

```python
response = s3.list_objects_v2(Bucket="my-bucket")
for obj in response.get("Contents", []):
    print(obj["Key"], obj["Size"])
```

### Delete an object

```python
s3.delete_object(Bucket="my-bucket", Key="hello.txt")
```

### Presigned URL

```python
url = s3.generate_presigned_url(
    "get_object",
    Params={"Bucket": "my-bucket", "Key": "hello.txt"},
    ExpiresIn=3600,  # 1 hour
)
print(url)
```

---

## minio SDK

### Install

```bash
pip install minio
```

### Connect

```python
from minio import Minio

client = Minio(
    "s3.hippius.com",
    access_key="YOUR_ACCESS_KEY",
    secret_key="YOUR_SECRET_KEY",
    secure=True,
    region="decentralized",
)
```

### Create a bucket

```python
client.make_bucket("my-bucket")
```

### Upload a file

```python
# From disk
client.fput_object("my-bucket", "remote-name.txt", "local-file.txt")

# From memory
from io import BytesIO

data = b"Hello from Hippius!"
client.put_object(
    "my-bucket", "hello.txt",
    BytesIO(data), len(data),
    content_type="text/plain",
)
```

### Download a file

```python
# To disk
client.fget_object("my-bucket", "remote-name.txt", "local-file.txt")

# To memory
response = client.get_object("my-bucket", "hello.txt")
print(response.read().decode())
response.close()
response.release_conn()
```

### List objects

```python
for obj in client.list_objects("my-bucket", recursive=True):
    print(obj.object_name, obj.size)
```

### Presigned URL

```python
from datetime import timedelta

url = client.presigned_get_object(
    "my-bucket", "hello.txt",
    expires=timedelta(hours=1),
)
print(url)
```

---

## Complete Working Example (boto3)

Save this script as `hippius_s3.py` and run it with your credentials:

```python
import boto3
from botocore.config import Config

# 1. Connect to Hippius S3
s3 = boto3.client(
    "s3",
    endpoint_url="https://s3.hippius.com",
    aws_access_key_id="YOUR_ACCESS_KEY",
    aws_secret_access_key="YOUR_SECRET_KEY",
    region_name="decentralized",
    config=Config(
        signature_version="s3v4",
        s3={"addressing_style": "path"},
    ),
)

bucket_name = "hippius-demo-bucket"
file_key = "greeting.txt"

# 2. Create bucket
print(f"Creating bucket: {bucket_name}")
try:
    s3.create_bucket(Bucket=bucket_name)
except s3.exceptions.BucketAlreadyOwnedByYou:
    print("Bucket already exists.")

# 3. Upload string
print(f"Uploading file: {file_key}")
s3.put_object(
    Bucket=bucket_name,
    Key=file_key,
    Body=b"Welcome to Hippius S3 Storage!",
)

# 4. List objects
print("Listing objects:")
response = s3.list_objects_v2(Bucket=bucket_name)
for obj in response.get("Contents", []):
    print(f" - {obj['Key']} ({obj['Size']} bytes)")

# 5. Download file
print("Downloading file:")
response = s3.get_object(Bucket=bucket_name, Key=file_key)
content = response["Body"].read().decode("utf-8")
print(f" File content: {content}")

# 6. Generate presigned URL
print("Generating presigned URL:")
url = s3.generate_presigned_url(
    "get_object",
    Params={"Bucket": bucket_name, "Key": file_key},
    ExpiresIn=3600,
)
print(f" URL: {url}")
```

