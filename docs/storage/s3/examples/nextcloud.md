---
title: "Example: Nextcloud with Hippius S3"
sidebar_label: Nextcloud
slug: /storage/s3/examples/nextcloud
---

# Nextcloud with Hippius S3

Use Hippius S3 as the primary storage backend for [Nextcloud](https://nextcloud.com/).

:::tip Pick the closest region for best performance
Swap `s3.hippius.com` for `eu-central-1.hippius.com` (Europe) or `us-central-1.hippius.com` (US) to use the regional cache closest to you. See the [S3 API Reference](/storage/s3/integration) for details.
:::

## Prerequisites

Create the bucket before starting Nextcloud:

```bash
aws s3 mb s3://nextcloud-data --endpoint-url https://s3.hippius.com
```

## Docker Compose

```yaml title="docker-compose.yml"
services:
  nextcloud:
    image: nextcloud:latest
    ports:
      - "8080:80"
    volumes:
      - nextcloud_data:/var/www/html
    environment:
      - OBJECTSTORE_S3_BUCKET=nextcloud-data
      - OBJECTSTORE_S3_KEY=YOUR_ACCESS_KEY
      - OBJECTSTORE_S3_SECRET=YOUR_SECRET_KEY
      - OBJECTSTORE_S3_HOST=s3.hippius.com
      - OBJECTSTORE_S3_REGION=decentralized
      - OBJECTSTORE_S3_PORT=443
      - OBJECTSTORE_S3_SSL=true
      - OBJECTSTORE_S3_USEPATH_STYLE=true

volumes:
  nextcloud_data:
```

Start it up:

```bash
docker compose up -d
```

Then open `http://localhost:8080`, create an admin account, and select SQLite as the database. Nextcloud will automatically use Hippius S3 for all file storage.

:::warning use_path_style is required
Hippius S3 does not support virtual-hosted style addressing. `OBJECTSTORE_S3_USEPATH_STYLE=true` must be set or Nextcloud will fail to connect.
:::

## Verify

Upload a file through the Nextcloud UI, then confirm it landed in the bucket:

```bash
aws s3 ls s3://nextcloud-data/ --recursive --endpoint-url https://s3.hippius.com
```

Nextcloud stores objects with `urn:oid:` prefixes rather than original filenames — this is normal.

## Other Self-Hosted Apps

The same pattern works with any self-hosted app that supports S3-compatible storage. Change the endpoint to `s3.hippius.com`, set `path_style = true`, and use your Hippius credentials.

Examples:
- **[Mastodon](https://docs.joinmastodon.org/admin/config/#cdn)** — media attachments via S3
- **[GitLab](https://docs.gitlab.com/administration/object_storage/)** — LFS objects, artifacts, uploads
- **[Mattermost](https://docs.mattermost.com/configure/file-storage-configuration-settings.html)** — file attachments

## References

- [Nextcloud S3 Primary Storage docs](https://docs.nextcloud.com/server/latest/admin_manual/configuration_files/primary_storage.html)
