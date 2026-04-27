---
id: rclone
title: Using rclone with Hippius S3
sidebar_label: rclone
slug: /storage/s3/rclone
---

# Using rclone with Hippius S3

[rclone](https://rclone.org/) is a command-line tool for managing files across cloud storage. Use it to sync folders, copy files, or mount Hippius S3 as a local drive.

## Prerequisites

- rclone installed: `brew install rclone` / `apt install rclone` / [rclone.org/install](https://rclone.org/install/)
- Hippius S3 credentials from [console.hippius.com](https://console.hippius.com)

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

:::tip Pick the closest region for best performance
Hippius S3 is served through regional caches. For lower latency, set `endpoint` to the region closest to you:
- **Europe:** `https://eu-central-1.hippius.com` (the default `https://s3.hippius.com` also resolves here)
- **US:** `https://us-east-1.hippius.com`

All regions serve the same data.
:::

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

## Bandwidth and speed tips

- Use `--transfers 8` to run 8 parallel transfers
- Use `--s3-upload-concurrency 8` for faster large file uploads
- Use `--progress` to see transfer progress

```bash
rclone copy ./large-folder hippius:my-bucket --transfers 8 --progress
```
