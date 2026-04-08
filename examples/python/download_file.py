# Hippius S3 — Download files with boto3
# Docs: /storage/s3/python

import os
from dotenv import load_dotenv
import boto3
from botocore.config import Config

load_dotenv()

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

bucket_name = "my-bucket"

# Download to disk
s3.download_file(bucket_name, "remote-name.txt", "local-file.txt")
print("Downloaded to local-file.txt")

# Download to memory
response = s3.get_object(Bucket=bucket_name, Key="hello.txt")
content = response["Body"].read()
print(f"Content: {content.decode()}")
