#!/usr/bin/env bash
# Run all Python examples against Hippius S3
#
# Expects a .env file in examples/ with HIPPIUS_ACCESS_KEY and HIPPIUS_SECRET_KEY.
# CI creates this from GitHub secrets. Locally, copy .env.example and fill in your keys.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
EXAMPLES_ROOT="$SCRIPT_DIR/.."

if [ ! -f "$EXAMPLES_ROOT/.env" ]; then
  echo "No .env file found at $EXAMPLES_ROOT/.env"
  echo "Copy .env.example to .env and fill in your credentials."
  exit 1
fi

echo "=== Running Python examples ==="

cd "$EXAMPLES_ROOT"

echo "connect.py..."
python3 python/connect.py

echo "connect_minio.py..."
python3 python/connect_minio.py

echo "full_example.py..."
python3 python/full_example.py

echo ""
echo "All Python examples passed."
