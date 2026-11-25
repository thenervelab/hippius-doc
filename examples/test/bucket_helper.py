"""Create or remove a throwaway test bucket for the example tests.

Usage:
    python3 examples/test/bucket_helper.py create <bucket>
    python3 examples/test/bucket_helper.py delete <bucket>
    python3 examples/test/bucket_helper.py check-public <bucket> <key>

`delete` empties the bucket (objects, versions, delete markers, policy) and
removes it; it succeeds if the bucket is already gone, so it is safe in a trap.
`check-public` fetches the object without credentials and fails unless it
returns 200.
"""

import os
import sys
import urllib.error
import urllib.request

import boto3
from botocore.config import Config
from botocore.exceptions import ClientError
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

ENDPOINT = "https://s3.hippius.com"

s3 = boto3.client(
    "s3",
    endpoint_url=ENDPOINT,
    aws_access_key_id=os.environ["HIPPIUS_ACCESS_KEY"],
    aws_secret_access_key=os.environ["HIPPIUS_SECRET_KEY"],
    region_name="decentralized",
    config=Config(signature_version="s3v4", s3={"addressing_style": "path"}),
)


def delete(bucket):
    try:
        s3.delete_bucket_policy(Bucket=bucket)
    except ClientError:
        pass
    try:
        pages = s3.get_paginator("list_object_versions").paginate(Bucket=bucket)
        for page in pages:
            for item in page.get("Versions", []) + page.get("DeleteMarkers", []):
                s3.delete_object(Bucket=bucket, Key=item["Key"], VersionId=item["VersionId"])
        for page in s3.get_paginator("list_objects_v2").paginate(Bucket=bucket):
            for item in page.get("Contents", []):
                s3.delete_object(Bucket=bucket, Key=item["Key"])
        s3.delete_bucket(Bucket=bucket)
        print(f"Deleted test bucket {bucket}")
    except ClientError as e:
        if e.response["Error"]["Code"] != "NoSuchBucket":
            raise


def check_public(bucket, key):
    url = f"{ENDPOINT}/{bucket}/{key}"
    try:
        with urllib.request.urlopen(url, timeout=30) as resp:
            status = resp.status
    except urllib.error.HTTPError as e:
        status = e.code
    if status != 200:
        sys.exit(f"Anonymous GET {url} returned {status}, expected 200")
    print(f"Anonymous GET {url} -> 200")


if __name__ == "__main__":
    action, bucket = sys.argv[1], sys.argv[2]
    if action == "create":
        s3.create_bucket(Bucket=bucket)
        print(f"Created test bucket {bucket}")
    elif action == "delete":
        delete(bucket)
    elif action == "check-public":
        check_public(bucket, sys.argv[3])
    else:
        sys.exit(f"unknown action {action}")
