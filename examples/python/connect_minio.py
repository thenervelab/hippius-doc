# Hippius S3 — Connect with MinIO SDK
# Docs: /storage/s3/python
#
# Create a .env file (see .env.example):
#   HIPPIUS_ACCESS_KEY=hip_...
#   HIPPIUS_SECRET_KEY=...

import os
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

buckets = client.list_buckets()
print(f"Connected. {len(buckets)} bucket(s) found.")
