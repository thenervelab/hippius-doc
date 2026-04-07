# Hippius S3 — Create and use public buckets with MinIO SDK
# Docs: /storage/s3/integration

import os
import json
from io import BytesIO
from dotenv import load_dotenv
from minio import Minio

load_dotenv()

client = Minio(
    "s3.hippius.com",
    access_key=os.environ["HIPPIUS_ACCESS_KEY"],
    secret_key=os.environ["HIPPIUS_SECRET_KEY"],
    secure=True,
    region="decentralized",
)

bucket_name = "my-public-bucket"

# Create bucket
client.make_bucket(bucket_name)
print(f"Created bucket: {bucket_name}")

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
client.set_bucket_policy(bucket_name, json.dumps(policy))
print(f"Bucket '{bucket_name}' is now public")

# Upload a file
content = b"This is publicly accessible!"
object_name = "demo.txt"
client.put_object(
    bucket_name,
    object_name,
    BytesIO(content),
    length=len(content),
    content_type="text/plain",
)

public_url = f"https://s3.hippius.com/{bucket_name}/{object_name}"
print(f"Public URL: {public_url}")
