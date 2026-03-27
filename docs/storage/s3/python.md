---
id: python
title: Python (boto3 & minio)
sidebar_label: Python
slug: /storage/s3/python
---

# Python

Two libraries work well with Hippius S3: **boto3** (AWS SDK) and **minio** (MinIO SDK). Both are fully supported.

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
    aws_access_key_id="hip_your_access_key_id",
    aws_secret_access_key="your_secret_key",
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
import io
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
    Params={"Bucket": "my-bucket", "Key": "file.txt"},
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
    access_key="hip_your_access_key_id",
    secret_key="your_secret_key",
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
    "my-bucket", "file.txt",
    expires=timedelta(hours=1),
)
print(url)
```

---

## Which library to use?

| | boto3 | minio |
|---|---|---|
| Async support | ✅ via aioboto3 | ✅ via AsyncMinio |
| Presigned URLs | ✅ | ✅ |
| Familiar to AWS users | ✅ | |
| Simpler API | | ✅ |

Both work. If you're already using boto3 elsewhere, stick with it. If you're starting fresh, minio SDK is slightly simpler.
