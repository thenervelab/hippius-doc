#!/usr/bin/env bash
# Run all Python examples against Hippius S3
#
# Expects a .env file in examples/ with HIPPIUS_ACCESS_KEY and HIPPIUS_SECRET_KEY.
# CI creates this from GitHub secrets. Locally, copy .env.example and fill in your keys.
#
# The upload/list/presigned/download examples share one throwaway bucket, and
# public_bucket.py gets its own; both are deleted on exit, pass or fail.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
EXAMPLES_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PY="$EXAMPLES_ROOT/python"
HELPER="$SCRIPT_DIR/bucket_helper.py"

if [ ! -f "$EXAMPLES_ROOT/.env" ]; then
  echo "No .env file found at $EXAMPLES_ROOT/.env"
  echo "Copy .env.example to .env and fill in your credentials."
  exit 1
fi

RUN_ID="$(date +%s)-$RANDOM"
export HIPPIUS_BUCKET="hippius-test-py-$RUN_ID"
export HIPPIUS_PUBLIC_BUCKET="hippius-test-pypub-$RUN_ID"
WORK="$(mktemp -d)"

cleanup() {
  python3 "$HELPER" delete "$HIPPIUS_BUCKET" || true
  python3 "$HELPER" delete "$HIPPIUS_PUBLIC_BUCKET" || true
  rm -rf "$WORK"
}
trap cleanup EXIT

echo "=== Running Python examples ==="

cd "$EXAMPLES_ROOT"

echo "connect.py..."
python3 python/connect.py

echo "connect_minio.py..."
python3 python/connect_minio.py

echo "full_example.py..."
python3 python/full_example.py

echo ""
echo "--- File examples (bucket $HIPPIUS_BUCKET) ---"
python3 "$HELPER" create "$HIPPIUS_BUCKET"
cd "$WORK"
echo "Hello from the example tests" > local-file.txt
cp local-file.txt expected.txt

echo "upload_file.py..."
python3 "$PY/upload_file.py"

echo "list_objects.py..."
listing="$(python3 "$PY/list_objects.py")"
echo "$listing"
grep -q "remote-name.txt" <<<"$listing"
grep -q "hello.txt" <<<"$listing"

echo "presigned_url.py..."
url="$(python3 "$PY/presigned_url.py" | sed -n 's/^Presigned URL: //p')"
test "$(curl -s "$url")" = "Hello from Hippius!"
echo "Presigned URL returns the object"

echo "download_file.py..."
rm local-file.txt
python3 "$PY/download_file.py" | tee download.out
cmp local-file.txt expected.txt
grep -q "Content: Hello from Hippius!" download.out

echo ""
echo "--- Public bucket example (bucket $HIPPIUS_PUBLIC_BUCKET) ---"
echo "public_bucket.py..."
python3 "$PY/public_bucket.py"
python3 "$HELPER" check-public "$HIPPIUS_PUBLIC_BUCKET" demo.txt

echo ""
echo "All Python examples passed."
