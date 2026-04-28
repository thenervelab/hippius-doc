---
id: aws-cli
title: Using AWS CLI with Hippius S3
sidebar_label: AWS CLI
slug: /storage/s3/aws-cli
---

# Using AWS CLI with Hippius S3

The AWS CLI works out of the box with Hippius S3. All standard `aws s3` and `aws s3api` commands are supported.

## Prerequisites

- AWS CLI installed: [docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- Hippius S3 credentials from [console.hippius.com](https://console.hippius.com)

## Configuration

Set up a named profile for Hippius:

```bash
aws configure --profile hippius
```

Enter when prompted:
- **AWS Access Key ID**: your access key
- **AWS Secret Access Key**: your secret key
- **Default region**: `decentralized`
- **Default output format**: `json` (or leave blank)

Or set environment variables for one-off commands:

```bash
export AWS_ACCESS_KEY_ID="YOUR_ACCESS_KEY"
export AWS_SECRET_ACCESS_KEY="YOUR_SECRET_KEY"
export AWS_DEFAULT_REGION="decentralized"
```

## The Endpoint URL

:::warning Mandatory for every command
You **must** pass `--endpoint-url https://s3.hippius.com` to every command. Without it, the AWS CLI sends requests to Amazon's servers and they will fail.
:::

:::tip Pick the closest region for best performance
Hippius S3 is served through regional caches. For lower latency, replace `s3.hippius.com` in `--endpoint-url` with the region closest to you:
- **Europe:** `https://eu-central-1.hippius.com` (also `https://s3.hippius.com`)
- **US:** `https://us-east-1.hippius.com`

All regions serve the same data.
:::

:::tip Pro Tip: Create a Shell Alias
Typing the endpoint URL and profile flag every time is tedious. Add these aliases to your `~/.bashrc` or `~/.zshrc`:

```bash
alias hs3='aws s3 --profile hippius --endpoint-url https://s3.hippius.com'
alias hs3api='aws s3api --profile hippius --endpoint-url https://s3.hippius.com'
```

Now you can just type:
`hs3 ls` or `hs3 mb s3://my-bucket`
:::

## Common operations

*The examples below use the full command syntax. If you set up the alias above, you can replace `aws s3 ...` with `hs3 ...`.*

### List buckets

```bash
aws s3 ls --profile hippius --endpoint-url https://s3.hippius.com
```

### Create a bucket

```bash
aws s3 mb s3://my-bucket --profile hippius --endpoint-url https://s3.hippius.com
```

### Upload a file

```bash
aws s3 cp ./file.txt s3://my-bucket/ \
  --profile hippius --endpoint-url https://s3.hippius.com
```

### Upload a folder

```bash
aws s3 cp ./my-folder s3://my-bucket/my-folder --recursive \
  --profile hippius --endpoint-url https://s3.hippius.com
```

### Sync a folder

```bash
aws s3 sync ./my-folder s3://my-bucket/my-folder \
  --profile hippius --endpoint-url https://s3.hippius.com
```

### Download a file

```bash
aws s3 cp s3://my-bucket/file.txt ./downloads/ \
  --profile hippius --endpoint-url https://s3.hippius.com
```

### List objects in a bucket

```bash
aws s3 ls s3://my-bucket/ --profile hippius --endpoint-url https://s3.hippius.com
```

### Delete a file

```bash
aws s3 rm s3://my-bucket/file.txt \
  --profile hippius --endpoint-url https://s3.hippius.com
```

### Delete a bucket (must be empty)

```bash
aws s3 rb s3://my-bucket \
  --profile hippius --endpoint-url https://s3.hippius.com
```

## Presigned URLs

Generate a time-limited download link (no credentials required to use it):

```bash
aws s3 presign s3://my-bucket/file.txt \
  --expires-in 3600 \
  --profile hippius \
  --endpoint-url https://s3.hippius.com
```

Default expiry is 1 hour (3600 seconds). Max is 7 days (604800 seconds).

## Access control

Make a bucket publicly readable:

```bash
aws s3api put-bucket-acl \
  --bucket my-bucket \
  --acl public-read \
  --profile hippius \
  --endpoint-url https://s3.hippius.com
```

See the [S3 API Reference](/storage/s3/integration#access-control-lists-acls) for full ACL options.