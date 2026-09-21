---
id: rclone
title: Using rclone with Hippius S3
sidebar_label: rclone
slug: /storage/s3/rclone
---

import Unordered from '@site/src/components/Unordered';

# Using rclone with Hippius S3

[rclone](https://rclone.org/) is a command-line tool for managing files across cloud storage. Use it to sync folders, copy files, or mount Hippius S3 as a local drive.

## Prerequisites

<Unordered>
  <li>rclone installed: <code>brew install rclone</code> / <code>apt install rclone</code> / <a href="https://rclone.org/install">rclone.org/install</a></li>
  <li>Hippius S3 credentials from <a href="https://console.hippius.com">console.hippius.com</a></li>
</Unordered>

## Configuration

Run `rclone config` and create a new remote, or add this directly to your `~/.config/rclone/rclone.conf`:

```ini
[hippius]
type = s3
provider = Other
access_key_id = YOUR_ACCESS_KEY
secret_access_key = YOUR_SECRET_KEY
endpoint = https://s3.hippius.com
region = decentralized
acl = private
force_path_style = true
```

Verify it works:

```bash
rclone ls hippius:
```

Connection details: [Getting Started](/use/quickstart#connection-details). Always use `https://s3.hippius.com`.

## Common operations

### List buckets

```bash
rclone lsd hippius:
```

### List files in a bucket

```bash
rclone ls hippius:my-bucket
```

### Upload a file

```bash
rclone copy ./local-file.txt hippius:my-bucket/
```

### Upload a folder

```bash
rclone copy ./my-folder hippius:my-bucket/my-folder
```

### Sync a folder (local → Hippius)

```bash
rclone sync ./my-folder hippius:my-bucket/my-folder
```

`sync` mirrors the source to the destination — files deleted locally are deleted remotely too. Use `copy` if you want to keep remote files.

### Download a file

```bash
rclone copy hippius:my-bucket/file.txt ./downloads/
```

### Download a folder

```bash
rclone copy hippius:my-bucket/my-folder ./local-folder
```

## Mount as a local drive

Mount Hippius S3 as a local filesystem (macOS/Linux):

```bash
mkdir -p ~/hippius-mount
rclone mount hippius:my-bucket ~/hippius-mount --daemon
```

Files appear at `~/hippius-mount`. Unmount with:

```bash
fusermount -u ~/hippius-mount   # Linux
umount ~/hippius-mount          # macOS
```

:::info FUSE Required
Mount requires FUSE. On macOS: `brew install --cask macfuse`. On Linux: `apt install fuse`.
:::

## Speed tips

<Unordered>
  <li>Use <code>--transfers 8</code> to run 8 parallel transfers</li>
  <li>Use <code>--s3-upload-concurrency 8</code> for faster large file uploads</li>
  <li>Use <code>--progress</code> to see transfer progress</li>
</Unordered>

```bash
rclone copy ./large-folder hippius:my-bucket --transfers 8 --progress
```
