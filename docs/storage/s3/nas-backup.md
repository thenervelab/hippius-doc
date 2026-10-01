---
id: nas-backup
title: "Back up a NAS to Hippius S3"
sidebar_label: NAS backup
slug: /storage/s3/nas-backup
description: Send an off-site copy of your Synology, QNAP or TrueNAS to Hippius S3 Storage with the backup tool built into the NAS, or with rclone. Endpoint, region, path-style, bucket and key, nightly schedule.
---

import Unordered from '@site/src/components/Unordered';
import Ordered from '@site/src/components/Ordered';

# Back up a NAS to Hippius S3

A NAS already speaks S3. Synology Hyper Backup, QNAP Hybrid Backup Sync and TrueNAS Cloud Sync can all send a copy of your shares to any S3-compatible service, and so can rclone on any box with a shell. Point them at Hippius S3 Storage and you get an off-site copy at $6 per TB per month, charged hourly, with no fee when you need to download it back.

Use **S3 Storage** for this, not Drive. Drive is end-to-end encrypted and needs one of the Hippius apps or the [Python SDK](/use/drive/python-sdk) on the machine to hold the key; a NAS runs neither. S3 Storage works with the tools already on the box.

:::note Draft, not yet tested against a real NAS
The Hippius settings on this page (endpoint, region, path-style, bucket, key) are the same ones every S3 client uses and are verified. The menu names for Synology, QNAP and TrueNAS follow each vendor's current documentation and have not yet been walked through against s3.hippius.com by the Hippius team. If a screen differs from what is written here, the connection table below is what matters; tell us at support and we will fix the page.
:::

## What every tool needs

Create these two things in the [console](https://console.hippius.com) first. The NAS tools do not create buckets for you.

<Ordered>
  <li>A <strong>bucket</strong>, under <strong>S3 Buckets</strong>. Bucket names are unique across Hippius, so pick something like <code>home-nas-backup-yourname</code>.</li>
  <li>An <strong>access key</strong>: a master token, or better a <a href="/use/console/s3#sub-tokens">sub token</a> limited to that one bucket with read and write. The secret is shown once; copy it before closing the page.</li>
</Ordered>

Then, in the tool:

| Setting | Value |
|---|---|
| **Service type** | S3-compatible / Custom S3 / "Other" |
| **Endpoint / server address** | `s3.hippius.com` (with `https://` if the field wants a URL) |
| **Region** | `decentralized` |
| **Addressing** | Path-style (also called "legacy" or "path" in some tools). Virtual-host style is not supported. |
| **Access key / Secret key** | From the token you created |
| **Bucket** | The bucket you created |
| **TLS / HTTPS** | On, port 443 |

Connection details are also on the [quickstart](/use/quickstart#connection-details).

## Synology: Hyper Backup

<Ordered>
  <li>Open <strong>Hyper Backup</strong>, press <strong>+</strong>, <strong>Data backup task</strong>.</li>
  <li>Choose <strong>S3 Storage</strong> as the destination (under "File server" / "Cloud service", the generic S3 entry, not Amazon).</li>
  <li>Server type <strong>Custom Server URL</strong>, server address <code>s3.hippius.com</code>, signature version v4, enter the access key and secret, pick the bucket, choose a directory name for this task.</li>
  <li>Select the shared folders and applications to back up.</li>
  <li>Set a schedule, for example every night at 02:00, and turn on <strong>Client-side encryption</strong> if you want a copy that only your Synology password can open (see below).</li>
  <li>Run the task once by hand and check the bucket in the console: the task's folder and its first chunks should be there.</li>
</Ordered>

Hyper Backup writes its own container format (many small `.bucket` files), so you restore through Hyper Backup, not by downloading single files. That is normal.

## QNAP: Hybrid Backup Sync (HBS 3)

<Ordered>
  <li>Open <strong>HBS 3</strong>, <strong>Storage Spaces</strong>, <strong>Create</strong>, pick <strong>S3 Compatible</strong>.</li>
  <li>Service URL <code>https://s3.hippius.com</code>, region <code>decentralized</code> (type it if the list does not have it), access key, secret. If there is a "Use path-style" or "Virtual host style" switch, choose path-style.</li>
  <li>Back in HBS 3, create a <strong>Backup job</strong> (versions, restore through HBS) or a <strong>Sync job</strong> (plain copies of your files, readable from any S3 tool). Pick the storage space you just made and the bucket.</li>
  <li>Schedule it nightly and run it once to check.</li>
</Ordered>

## TrueNAS: Cloud Sync

<Ordered>
  <li><strong>Credentials</strong>, <strong>Backup Credentials</strong>, <strong>Cloud Credentials</strong>, <strong>Add</strong>. Provider <strong>Amazon S3</strong>; fill in the access key and secret, then open <strong>Advanced Settings</strong> and set <strong>Endpoint URL</strong> to <code>https://s3.hippius.com</code> and <strong>Region</strong> to <code>decentralized</code>. Leave signature v4 on. Save and <strong>Verify Credential</strong>.</li>
  <li><strong>Data Protection</strong>, <strong>Cloud Sync Tasks</strong>, <strong>Add</strong>. Direction <strong>Push</strong>, transfer mode <strong>Sync</strong> (mirror) or <strong>Copy</strong> (never deletes remotely). Pick the dataset, the credential and the bucket, give the remote folder a name.</li>
  <li>Set the schedule and run it. TrueNAS uses rclone underneath, so anything that works for rclone works here, including <strong>Remote encryption</strong> on the task for a client-side encrypted copy.</li>
</Ordered>

## rclone, on any NAS or server

If your NAS has a shell, or you back up from a Linux box, rclone is the simplest route. Full page: [rclone with Hippius S3](/storage/s3/rclone).

```ini
# ~/.config/rclone/rclone.conf
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

```bash
rclone lsd hippius:                                  # should list your bucket
rclone sync /volume1/photos hippius:home-nas-backup-yourname/photos --transfers 8
```

`sync` mirrors: a file deleted on the NAS is deleted in the bucket on the next run. Use `copy` if you want the bucket to keep everything. Schedule it with cron, for example nightly at 02:00:

```
0 2 * * * rclone sync /volume1/photos hippius:home-nas-backup-yourname/photos --log-file /var/log/rclone-hippius.log
```

## Encryption

Everything you send is **encrypted at rest** on Hippius: every chunk under its own key, with the keys held in a key management service, and decrypted by the gateway when you download. See [how Arion stores your data](/learn/storage-systems).

If you want a copy that Hippius cannot read either, encrypt on the NAS before it leaves:

<Unordered>
  <li>Hyper Backup: <strong>Client-side encryption</strong> on the task. Keep the password and the exported key file; without them the backup cannot be opened.</li>
  <li>HBS 3: <strong>Client-side encryption</strong> on a backup job.</li>
  <li>TrueNAS Cloud Sync: <strong>Remote encryption</strong> on the task.</li>
  <li>rclone: wrap the remote with <a href="https://rclone.org/crypt/">rclone crypt</a>, then sync to <code>hippius-crypt:</code> instead of <code>hippius:</code>.</li>
</Unordered>

In all four cases the key stays with you. Lose it and nobody, including Hippius, can open the backup.

## Paying for it

S3 Storage is pay as you go: $6 per TB per month, charged hourly from your balance, no commitment, and no egress or request fees. Above a few terabytes a [plan](/use/console/billing#s3-plans-and-pay-as-you-go) costs less per TB. Top up by card, Bitcoin, USDC or TAO.

If the balance runs dry, S3 becomes read-only after 7 days, suspended after 14, and the data is deleted after 37, with a notice a week before. Turn on low balance alerts or auto reload so a backup never lapses. Details on the [billing page](/use/console/billing#if-your-balance-runs-out).

## Checking a backup

<Unordered>
  <li>Open <strong>S3 Buckets</strong> in the console and browse the bucket: the folders and files (or the backup tool's container files) should be there with today's date.</li>
  <li>Do a test restore of one folder from the tool once a quarter. A backup you have never restored is a guess.</li>
</Unordered>

## Where to next

<Unordered>
  <li><a href="/storage/s3/rclone">rclone</a>: every rclone option, including mounting the bucket as a drive.</li>
  <li><a href="/storage/s3/examples/duplicati">Duplicati</a>: another backup tool that works the same way.</li>
  <li><a href="/use/console/s3">S3 Buckets in the console</a>: buckets, tokens, browsing.</li>
  <li><a href="/storage/s3/object-lock">Object Lock</a>: make backup versions undeletable for a retention period.</li>
</Unordered>
