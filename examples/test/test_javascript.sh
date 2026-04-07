#!/usr/bin/env bash
# Run all JavaScript examples against Hippius S3
#
# Expects a .env file in examples/ with HIPPIUS_ACCESS_KEY and HIPPIUS_SECRET_KEY.
# CI creates this from GitHub secrets. Locally, copy .env.example to .env and fill in your keys.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
EXAMPLES_ROOT="$SCRIPT_DIR/.."
JS_DIR="$EXAMPLES_ROOT/javascript"

if [ ! -f "$EXAMPLES_ROOT/.env" ]; then
  echo "No .env file found at $EXAMPLES_ROOT/.env"
  echo "Copy .env.example to .env and fill in your credentials."
  exit 1
fi

export DOTENV_CONFIG_PATH="$EXAMPLES_ROOT/.env"

echo "=== Running JavaScript examples ==="

cd "$JS_DIR"

echo "connect.mjs..."
node connect.mjs

echo "connect-minio.mjs..."
node connect-minio.mjs

echo "full-example.mjs..."
node full-example.mjs

echo ""
echo "All JavaScript examples passed."
