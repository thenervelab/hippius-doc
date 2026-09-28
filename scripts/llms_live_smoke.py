#!/usr/bin/env python3
"""Put, read, and delete one object, and optionally call Hub /me.

Uses the same HIPPIUS_ACCESS_KEY and HIPPIUS_SECRET_KEY as the doc examples.
HIPPIUS_S3_BUCKET must name an existing bucket owned by that key. This script
does not create a bucket and does not create a Hub namespace.

HIPPIUS_HUB_API_TOKEN, when set, calls GET /api/registry/me/. A zero-balance
account that has never provisioned still answers this route; a bad token does not.
"""

import os
import subprocess
import uuid


def s3_roundtrip() -> None:
    key_id = os.environ.get("HIPPIUS_ACCESS_KEY", "")
    secret = os.environ.get("HIPPIUS_SECRET_KEY", "")
    bucket = os.environ.get("HIPPIUS_S3_BUCKET", "")
    if not key_id or not secret or not bucket:
        print("WARNING: S3 smoke skipped. Set HIPPIUS_ACCESS_KEY, HIPPIUS_SECRET_KEY, and HIPPIUS_S3_BUCKET.")
        return
    import boto3
    from botocore.config import Config

    client = boto3.client(
        "s3",
        endpoint_url="https://s3.hippius.com",
        aws_access_key_id=key_id,
        aws_secret_access_key=secret,
        region_name="decentralized",
        config=Config(signature_version="s3v4", s3={"addressing_style": "path"}),
    )
    key = f"llms-smoke/{uuid.uuid4().hex}.txt"
    body = b"hippius llms smoke"
    client.put_object(Bucket=bucket, Key=key, Body=body)
    got = client.get_object(Bucket=bucket, Key=key)["Body"].read()
    client.delete_object(Bucket=bucket, Key=key)
    if got != body:
        raise SystemExit("S3 get did not return the bytes that were put")
    print(f"ok s3 put/get/delete s3://{bucket}/{key}")


def hub_me() -> None:
    token = os.environ.get("HIPPIUS_HUB_API_TOKEN", "")
    if not token:
        print("WARNING: Hub smoke skipped. Set HIPPIUS_HUB_API_TOKEN to call /api/registry/me/.")
        return
    proc = subprocess.run(
        [
            "curl", "-sS", "--max-time", "30",
            "-o", "/tmp/hippius-hub-me.json",
            "-w", "%{http_code}",
            "-H", f"Authorization: Token {token}",
            "-H", "Accept: application/json",
            "https://api.hippius.com/api/registry/me/",
        ],
        capture_output=True, text=True, check=False,
    )
    if proc.returncode != 0:
        raise SystemExit(proc.stderr.strip())
    code = proc.stdout.strip()
    if code != "200":
        detail = open("/tmp/hippius-hub-me.json").read()[:500]
        raise SystemExit(f"Hub /api/registry/me/ returned {code}: {detail}")
    print("ok hub GET /api/registry/me/")


def main() -> None:
    s3_roundtrip()
    hub_me()


if __name__ == "__main__":
    main()
