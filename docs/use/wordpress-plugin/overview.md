---
id: overview
title: WordPress Media Offloader
sidebar_label: Overview
slug: /use/wordpress-plugin
description: Hippius Media Offloader moves your WordPress media library to Hippius over the S3-compatible API and serves it from there. What it does, what it doesn't, and how your files are stored.
pagination_prev: null
---

import Unordered from '@site/src/components/Unordered';

**Hippius Media Offloader** moves your WordPress media library onto Hippius, a distributed cloud storage platform where every file is encrypted and split across independent machines. Your images, videos and documents stop filling up your hosting disk, and your site serves them straight from Hippius.

Your files live on **Arion**, our own storage engine. Each one is split into 30 pieces (10 data and 20 parity) using Reed-Solomon erasure coding, then spread across the network with the CRUSH algorithm. Even if 20 machines go offline at the same time, your files still rebuild.

The plugin talks to Hippius over the standard **S3-compatible API**, the same one you'd use for AWS S3. There's no code to change, no proprietary SDK to learn, and no IPFS setup to wrangle.

:::info Get the plugin
Install **Hippius Media Offloader** from the WordPress plugin directory at [wordpress.org/plugins/hippius-media-offloader](https://wordpress.org/plugins/hippius-media-offloader/). This guide covers version 1.0.6 or later.
:::

## What this plugin does

<Unordered>
  <li>Migrates your existing WordPress media to Hippius in bulk.</li>
  <li>Offloads new uploads automatically.</li>
  <li>Serves migrated media through Hippius URLs, including image URLs and responsive <code>srcset</code> sizes.</li>
  <li>Shows real-time migration progress, and lets you stop a migration and pick it up again later.</li>
  <li>Lets you keep local copies as backups, or delete them to free up disk space.</li>
  <li>Tracks migration status, errors, storage usage and your account balance from one dashboard.</li>
</Unordered>

## What this plugin doesn't do

<Unordered>
  <li>It isn't a CDN. If you need global content delivery, put a CDN in front of Hippius.</li>
  <li>It doesn't back up your WordPress database, only your media files.</li>
  <li>It doesn't create your storage bucket yet. You create the bucket in the Hippius Console first, then enter its name in the plugin.</li>
  <li>It doesn't encrypt files on your server before upload. Hippius encrypts them at rest, every chunk under its own key, so miners only ever see encrypted bytes. Media served on a website is public by design. For files only you can read, use <a href="/use/drive">Hippius Drive</a>.</li>
</Unordered>

## How Hippius stores your files

Every file you offload ends up on [Arion](/learn/storage-systems), our distributed storage engine:

<Unordered>
  <li><strong>Erasure coding.</strong> Each file is broken into 30 pieces (10 data and 20 parity) with Reed-Solomon.</li>
  <li><strong>CRUSH placement.</strong> Those pieces are spread across independent machines, so up to 20 can fail before your file is ever at risk.</li>
  <li><strong>Encrypted at rest.</strong> Objects are encrypted with AES-256-GCM, every chunk under its own key, so miners only see encrypted bytes.</li>
</Unordered>

Because it's plain S3 underneath, any S3 tool works with Hippius too. The [S3 compatibility matrix](/storage/s3/compatibility) lists every supported operation.

## What it costs

Your storage is paid from your account balance, or with an S3 plan. Downloads are free, only storage is billed. You can top up your account balance by card, TAO, Bitcoin or USDC. See [Console Billing](/use/console/billing) for prices and plans.

## Where to go next

<Unordered>
  <li><a href="/use/wordpress-plugin/installation">Installation</a> gets the plugin onto your site.</li>
  <li><a href="/use/wordpress-plugin/credentials">Get your Hippius credentials</a> walks through your account, account balance, S3 keys and bucket.</li>
  <li><a href="/use/wordpress-plugin/configure">Configure the plugin</a> connects WordPress to your bucket and tests it.</li>
  <li><a href="/use/wordpress-plugin/migrate">Migrate your media</a> covers bulk and automatic offloading.</li>
  <li><a href="/use/wordpress-plugin/troubleshooting">Troubleshooting &amp; FAQ</a> has fixes and quick answers.</li>
</Unordered>
