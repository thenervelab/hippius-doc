# Hippius S3 — Connect with boto3
# Docs: /storage/s3/python
#
# Create a .env file (see .env.example):
#   HIPPIUS_ACCESS_KEY=hip_...
#   HIPPIUS_SECRET_KEY=...

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

buckets = s3.list_buckets()
print(f"Connected. {len(buckets['Buckets'])} bucket(s) found.")
