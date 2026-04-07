# Hippius S3 — Complete end-to-end example with boto3
# Docs: /storage/s3/python

import os
from dotenv import load_dotenv
import boto3
from botocore.config import Config

load_dotenv()

# 1. Connect to Hippius S3
s3 = boto3.client(
    "s3",
    endpoint_url="https://s3.hippius.com",
    aws_access_key_id=os.environ["HIPPIUS_ACCESS_KEY"],
    aws_secret_access_key=os.environ["HIPPIUS_SECRET_KEY"],
    region_name="decentralized",
    config=Config(
        signature_version="s3v4",
        s3={"addressing_style": "path"},
    ),
)

import time
bucket_name = f"hippius-demo-py-{int(time.time())}"
file_key = "greeting.txt"

# 2. Create bucket
print(f"Creating bucket: {bucket_name}")
s3.create_bucket(Bucket=bucket_name)

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
    print(f"  {obj['Key']} ({obj['Size']} bytes)")

# 5. Download file
print("Downloading file:")
response = s3.get_object(Bucket=bucket_name, Key=file_key)
content = response["Body"].read().decode("utf-8")
print(f"  Content: {content}")

# 6. Generate presigned URL
print("Generating presigned URL:")
url = s3.generate_presigned_url(
    "get_object",
    Params={"Bucket": bucket_name, "Key": file_key},
    ExpiresIn=3600,
)
print(f"  URL: {url}")
