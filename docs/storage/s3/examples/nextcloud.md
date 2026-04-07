---
title: "Example: Nextcloud with Hippius S3"
sidebar_label: Nextcloud
slug: /storage/s3/examples/nextcloud
---

# Nextcloud with Hippius S3

Use Hippius S3 as the storage backend for [Nextcloud](https://nextcloud.com/), giving your self-hosted cloud drive decentralized storage.

There are two approaches:

| Approach | What it does | Best for |
|----------|-------------|----------|
| **Primary storage** | All Nextcloud data stored in S3 | New installations |
| **External storage** | Mount S3 as an additional folder | Existing installations |

## Option 1: Primary Storage

Configure Nextcloud to store all user files in Hippius S3 instead of the local filesystem. This must be done **before first login** — changing primary storage later requires data migration.

Edit your `config/config.php`:

```php title="config/config.php"
'objectstore' => [
    'class' => '\\OC\\Files\\ObjectStore\\S3',
    'arguments' => [
        'bucket'     => 'nextcloud-data',
        'key'        => 'YOUR_ACCESS_KEY',
        'secret'     => 'YOUR_SECRET_KEY',
        'hostname'   => 's3.hippius.com',
        'region'     => 'decentralized',
        'port'       => 443,
        'use_ssl'    => true,
        'use_path_style' => true,  // Required for Hippius S3
        // 'autocreate' => true,   // Uncomment to auto-create the bucket
    ],
],
```

:::warning use_path_style is required
Hippius S3 does not support virtual-hosted style addressing. You **must** set `'use_path_style' => true` or Nextcloud will fail to connect.
:::

Create the bucket before starting Nextcloud (or enable `autocreate`):

```bash
aws s3 mb s3://nextcloud-data \
  --profile hippius --endpoint-url https://s3.hippius.com
```

### Docker Compose Example

```yaml title="docker-compose.yml"
services:
  nextcloud:
    image: nextcloud:latest
    ports:
      - "8080:80"
    volumes:
      - ./config:/var/www/html/config
    environment:
      - OBJECTSTORE_S3_BUCKET=nextcloud-data
      - OBJECTSTORE_S3_KEY=YOUR_ACCESS_KEY
      - OBJECTSTORE_S3_SECRET=YOUR_SECRET_KEY
      - OBJECTSTORE_S3_HOST=s3.hippius.com
      - OBJECTSTORE_S3_REGION=decentralized
      - OBJECTSTORE_S3_PORT=443
      - OBJECTSTORE_S3_SSL=true
      - OBJECTSTORE_S3_USEPATH_STYLE=true
```

## Option 2: External Storage

Mount Hippius S3 as an additional folder in Nextcloud. Works with existing installations — no migration needed.

1. Enable the **External storage support** app in Nextcloud (Settings → Apps)
2. Go to **Settings → External storage**
3. Add a new storage:

| Field | Value |
|-------|-------|
| **Folder name** | `Hippius S3` (or whatever you want) |
| **External storage** | Amazon S3 |
| **Bucket** | your bucket name |
| **Hostname** | `s3.hippius.com` |
| **Port** | `443` |
| **Region** | `decentralized` |
| **Enable SSL** | ✅ |
| **Enable path style** | ✅ |
| **Access key** | your access key |
| **Secret key** | your secret key |

:::info
The "Amazon S3" storage type works with any S3-compatible provider. Nextcloud doesn't require actual AWS credentials.
:::

## Verify It Works

After configuring either option:

1. Log into Nextcloud
2. Upload a test file
3. Verify it appears in your Hippius S3 bucket:

```bash
aws s3 ls s3://nextcloud-data/ --recursive \
  --profile hippius --endpoint-url https://s3.hippius.com
```

## Other Self-Hosted Apps

The same pattern works with any self-hosted app that supports S3-compatible storage. Change the endpoint to `s3.hippius.com`, set `path_style = true`, and use your Hippius credentials.

Examples:
- **Mastodon** — media attachments via S3
- **GitLab** — LFS objects, artifacts, uploads
- **Mattermost** — file attachments
- **Minio Client (mc)** — general-purpose S3 CLI

## References

- [Nextcloud S3 Primary Storage docs](https://docs.nextcloud.com/server/latest/admin_manual/configuration_files/primary_storage.html)
- [Nextcloud External Storage docs](https://docs.nextcloud.com/server/latest/admin_manual/configuration_files/external_storage/amazons3.html)
