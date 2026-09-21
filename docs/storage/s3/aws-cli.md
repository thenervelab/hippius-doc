---
id: aws-cli
title: Using AWS CLI with Hippius S3
sidebar_label: AWS CLI
slug: /storage/s3/aws-cli
---

import Unordered from '@site/src/components/Unordered';

# Using AWS CLI with Hippius S3

The AWS CLI works out of the box with Hippius S3. All standard `aws s3` and `aws s3api` commands are supported.

## Prerequisites

<Unordered>
  <li>AWS CLI installed: <a href="https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html">docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html</a></li>
  <li>Hippius S3 credentials from <a href="https://console.hippius.com">console.hippius.com</a></li>
</Unordered>

## Configuration

Set up a named profile for Hippius:

```bash
aws configure --profile hippius
```

Enter when prompted:

<Unordered>
  <li><strong>AWS Access Key ID</strong>: your access key</li>
  <li><strong>AWS Secret Access Key</strong>: your secret key</li>
  <li><strong>Default region</strong>: <code>decentralized</code></li>
  <li><strong>Default output format</strong>: <code>json</code> (or leave blank)</li>
</Unordered>

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

Connection details: [Getting Started](/use/quickstart#connection-details). Always use `https://s3.hippius.com`. ACLs and presigned URLs: [Advanced Usage](/storage/s3/advanced).

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

See [Advanced Usage](/storage/s3/advanced#make-a-bucket-or-object-public) for full ACL options. Presigned URLs, sub-tokens, and public buckets are on that page too.