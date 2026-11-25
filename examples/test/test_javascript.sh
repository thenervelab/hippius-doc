#!/usr/bin/env bash
# Run all JavaScript examples against Hippius S3
#
# Expects a .env file in examples/ with HIPPIUS_ACCESS_KEY and HIPPIUS_SECRET_KEY.
# CI creates this from GitHub secrets. Locally, copy .env.example to .env and fill in your keys.
#
# The upload/list/presigned/download examples share one throwaway bucket,
# created and deleted (pass or fail) with the Python helper next to this file.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
EXAMPLES_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
JS_DIR="$EXAMPLES_ROOT/javascript"
HELPER="$SCRIPT_DIR/bucket_helper.py"

if [ ! -f "$EXAMPLES_ROOT/.env" ]; then
  echo "No .env file found at $EXAMPLES_ROOT/.env"
  echo "Copy .env.example to .env and fill in your credentials."
  exit 1
fi

export DOTENV_CONFIG_PATH="$EXAMPLES_ROOT/.env"
export HIPPIUS_BUCKET="hippius-test-js-$(date +%s)-$RANDOM"

cleanup() {
  python3 "$HELPER" delete "$HIPPIUS_BUCKET" || true
  rm -f "$JS_DIR/file.txt"
}
trap cleanup EXIT

echo "=== Running JavaScript examples ==="

cd "$JS_DIR"

echo "connect.mjs..."
node connect.mjs

echo "connect-minio.mjs..."
node connect-minio.mjs

echo "full-example.mjs..."
node full-example.mjs

echo ""
echo "--- File examples (bucket $HIPPIUS_BUCKET) ---"
python3 "$HELPER" create "$HIPPIUS_BUCKET"
echo "Hello from the example tests" > file.txt

echo "upload-file.mjs..."
node upload-file.mjs

echo "list-objects.mjs..."
listing="$(node list-objects.mjs)"
echo "$listing"
grep -q "file.txt" <<<"$listing"
grep -q "hello.txt" <<<"$listing"

echo "presigned-url.mjs..."
url="$(node presigned-url.mjs | sed -n 's/^Presigned URL: //p')"
test "$(curl -s "$url")" = "Hello from Hippius!"
echo "Presigned URL returns the object"

echo "download-file.mjs..."
out="$(node download-file.mjs)"
echo "$out"
grep -q "Content: Hello from Hippius!" <<<"$out"

echo ""
echo "All JavaScript examples passed."
