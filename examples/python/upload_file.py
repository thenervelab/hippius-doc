# Hippius S3 — Upload files with boto3
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

# Upload from disk
s3.upload_file("local-file.txt", bucket_name, "remote-name.txt")
print("Uploaded local-file.txt")

# Upload from memory
s3.put_object(
    Bucket=bucket_name,
    Key="hello.txt",
    Body=b"Hello from Hippius!",
)
print("Uploaded hello.txt from memory")
