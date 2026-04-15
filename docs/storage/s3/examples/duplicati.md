---
title: "Example: Duplicati with Hippius S3"
sidebar_label: Duplicati
slug: /storage/s3/examples/duplicati
---

# Duplicati with Hippius S3

Use Hippius S3 as the backup destination for [Duplicati](https://github.com/duplicati/duplicati), an open-source backup tool with encryption, compression, and scheduling built in. Unlike file sync tools like rclone, Duplicati creates deduplicated, optionally encrypted backup archives — ideal for automated, set-and-forget backups.

## Prerequisites

Create the bucket before configuring Duplicati:

```bash
aws s3 mb s3://duplicati-backups --endpoint-url https://s3.hippius.com
```

## Docker Compose

```yaml title="docker-compose.yml"
services:
  duplicati:
    image: duplicati/duplicati:latest
    ports:
      - "8200:8200"
    volumes:
      - duplicati_data:/data
      - /path/to/your/files:/source:ro
    environment:
      - SETTINGS_ENCRYPTION_KEY=your-encryption-key-here

volumes:
  duplicati_data:
```

Start it up:

```bash
docker compose up -d
```

Then open `http://localhost:8200` to access the Duplicati web UI.

## Configure a Backup

1. Click **Add backup** and select **Configure a new backup**
2. Give it a name (e.g. "Hippius Backup") and choose your encryption preference
3. On the **Destination** step, select **S3 compatible** and configure:

| Setting | Value |
|---|---|
| Server | Custom server url |
| Custom server url | `s3.hippius.com` |
| Bucket name | `duplicati-backups` |
| AWS Access ID | Your access key from [console.hippius.com](https://console.hippius.com) |
| AWS Access Key | Your secret key |
| Region | `decentralized` |

4. Expand **Advanced options** and set these two options (both are required):

| Option | Value |
|---|---|
| `s3-ext-forcepathstyle` | `true` |
| `s3-disable-chunk-encoding` | `true` |

5. Click **Test connection** to verify, then proceed to configure your **Source Data** and **Schedule**

:::warning Required S3 options
Both `s3-ext-forcepathstyle` and `s3-disable-chunk-encoding` must be set to `true`. Without path style, Duplicati cannot resolve the bucket. Without disabling chunk encoding, uploads will fail with a signature mismatch error.
:::

## Verify

After the first backup runs, confirm the files landed in your bucket:

```bash
aws s3 ls s3://duplicati-backups/ --endpoint-url https://s3.hippius.com
```

You should see `.dblock.zip`, `.dindex.zip`, and `.dlist.zip` files — these are Duplicati's deduplicated backup archives.

## CLI Backup

You can also run Duplicati backups directly from the command line without the web UI:

```bash
docker run --rm \
  --entrypoint="/opt/duplicati/duplicati-cli" \
  -v /path/to/your/files:/source:ro \
  duplicati/duplicati:latest \
  backup \
  "s3://duplicati-backups?s3-server-name=s3.hippius.com&s3-location-constraint=decentralized&use-ssl=true&auth-username=YOUR_ACCESS_KEY&auth-password=YOUR_SECRET_KEY&s3-disable-chunk-encoding=true" \
  /source \
  --s3-ext-forcepathstyle=true \
  --passphrase="your-encryption-passphrase"
```

To skip encryption, replace `--passphrase=...` with `--no-encryption`.

## Restore

To restore files from a backup:

```bash
docker run --rm \
  --entrypoint="/opt/duplicati/duplicati-cli" \
  -v /path/to/restore:/restore \
  duplicati/duplicati:latest \
  restore \
  "s3://duplicati-backups?s3-server-name=s3.hippius.com&s3-location-constraint=decentralized&use-ssl=true&auth-username=YOUR_ACCESS_KEY&auth-password=YOUR_SECRET_KEY&s3-disable-chunk-encoding=true" \
  --restore-path=/restore \
  --s3-ext-forcepathstyle=true \
  --passphrase="your-encryption-passphrase"
```

## References

- [Duplicati S3-compatible destination docs](https://docs.duplicati.com/backup-destinations/standard-based-destinations/s3-compatible-destination)
- [Using Duplicati from Docker](https://docs.duplicati.com/platform-specific-guides/using-duplicati-from-docker)
