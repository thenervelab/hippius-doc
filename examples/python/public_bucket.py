# Hippius S3 — Create and use a public bucket with boto3
# Docs: /storage/s3/advanced#make-a-bucket-or-object-public
#
# New buckets block public access (all four Block Public Access flags on), so a
# public policy is refused with 403 AccessDenied until the two policy flags are
# off. boto3 is used because the MinIO client has no Public Access Block call.

import os
import json
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

bucket_name = "my-public-bucket"

# Create bucket
s3.create_bucket(Bucket=bucket_name)
print(f"Created bucket: {bucket_name}")

# Allow public policies; public ACLs stay blocked
s3.put_public_access_block(
    Bucket=bucket_name,
    PublicAccessBlockConfiguration={
        "BlockPublicAcls": True,
        "IgnorePublicAcls": True,
        "BlockPublicPolicy": False,
        "RestrictPublicBuckets": False,
    },
)

# Set public read policy
policy = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": ["s3:GetObject"],
            "Resource": [f"arn:aws:s3:::{bucket_name}/*"],
        }
    ],
}
s3.put_bucket_policy(Bucket=bucket_name, Policy=json.dumps(policy))
print(f"Bucket '{bucket_name}' is now public")

# Upload a file
object_name = "demo.txt"
s3.put_object(
    Bucket=bucket_name,
    Key=object_name,
    Body=b"This is publicly accessible!",
    ContentType="text/plain",
)

public_url = f"https://s3.hippius.com/{bucket_name}/{object_name}"
print(f"Public URL: {public_url}")
