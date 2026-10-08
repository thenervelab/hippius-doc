---
id: migrate
title: Migrate Your Media
sidebar_label: Migrate Media
slug: /use/wordpress-plugin/migrate
description: Move your existing WordPress media to Hippius with bulk migration, stop and resume it at any time, offload new uploads automatically, and check your storage.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

There are two ways to get your media onto Hippius: **bulk migration** for the files you already have, and **auto migration** for new uploads. Most sites use both: one bulk run to move the library, then auto migration so nothing new piles up locally.

## Bulk migration for existing files

If your media library is already full of files, bulk migration moves them to Hippius in one run.

<Ordered>
  <li>Go to <BgStyledText>Hippius Media</BgStyledText> → <BgStyledText>Bulk Migration</BgStyledText>.</li>
  <li>Click <BgStyledText>Start Migration</BgStyledText>.</li>
  <li>Keep the page open and watch the progress bar. The plugin works through your files in batches and updates in real time.</li>
</Ordered>

<Screenshot src="/img/wordpress/migrate-bulk.png" alt="Bulk migration of your existing media, with live progress." />

*Bulk migration of your existing media, with live progress.*

:::warning Keep the page open
Bulk migration runs through your WordPress admin session. If you close the tab, it stops. That's safe: open Bulk Migration again and start it, and it carries on with what's left.
:::

### Stopping and resuming a migration

You can stop a migration at any time with <BgStyledText>Stop Migration</BgStyledText>, and it stops right away. When you click <BgStyledText>Start Migration</BgStyledText> again, it resumes: the plugin only picks up files that aren't migrated yet, and nothing already uploaded is sent again.

The progress counter starts over for the files that remain, so after a resume you'll see a smaller total than the first time. That's expected.

### What happens during migration

<Unordered>
  <li>Each file is uploaded to your Hippius bucket over the S3-compatible API.</li>
  <li>Your media is served from Hippius URLs, including responsive sizes, and visitors never notice.</li>
  <li>If <strong>Keep Local Files</strong> is unchecked, the local copy is removed once the upload succeeds.</li>
</Unordered>

## Auto migration for new uploads

Once auto migration is on, there's nothing else for you to do. Every new file you (or anyone else on your site) uploads to the Media Library is offloaded to Hippius as it is uploaded.

To turn it on:

<Ordered>
  <li>Go to <BgStyledText>Hippius Media</BgStyledText> → <BgStyledText>Settings</BgStyledText>.</li>
  <li>Check <BgStyledText>Auto-Migrate New Uploads</BgStyledText>.</li>
  <li>Save.</li>
</Ordered>

## Check your migration and storage

The plugin dashboard gives you a live picture of what's migrated and how much you're storing.

<Screenshot src="/img/wordpress/monitor-stats.png" alt="Statistics and usage once your media is on Hippius." />

*Statistics and usage once your media is on Hippius.*

### Statistics

<Unordered>
  <li><strong>Total Media Files</strong> is how many files are in your WordPress media library.</li>
  <li><strong>Migrated Files</strong> is how many are safely on Hippius.</li>
  <li><strong>Not Migrated Files</strong> is what's still only local.</li>
</Unordered>

### Usage

<Unordered>
  <li><strong>Total Hippius Storage</strong> is how much data you've stored on Hippius.</li>
  <li><strong>Local Storage Used</strong> is how much local disk your media still takes up.</li>
  <li><strong>Potential Savings</strong> is what you'd get back locally if you turned off <strong>Keep Local Files</strong>.</li>
  <li><strong>Migration Progress</strong> is the share of your library that's been migrated.</li>
</Unordered>

If you added an API token, the dashboard also shows your **Account balance**. Click <BgStyledText>Check balance</BgStyledText> to refresh it.

### Confirm a file is really on Hippius

To double-check a specific file:

<Ordered>
  <li>Open the WordPress Media Library and edit the file.</li>
  <li>Look at the file URL. It should point to your Hippius bucket, not to <code>wp-content/uploads</code>.</li>
  <li>Open that URL in a private browser window. If it loads, your visitors can see it too.</li>
  <li>You can also check the <strong>Debug Log</strong> in the plugin for the upload-confirmation entry.</li>
</Ordered>

If a file didn't migrate or isn't showing up on your site, see [Troubleshooting](/use/wordpress-plugin/troubleshooting).
