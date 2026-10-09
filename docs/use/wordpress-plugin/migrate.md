---
id: migrate
title: Migrate Your Media
sidebar_label: Migrate Media
slug: /use/wordpress-plugin/migrate
description: Move your existing WordPress media to Hippius with bulk migration, stop and resume it at any time, offload new uploads automatically, retry single files, and check your storage.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

There are two ways to get your media onto Hippius: **bulk migration** for the files you already have, and **auto migration** for new uploads. Most sites use both: one bulk run to move the library, then auto migration so nothing new piles up locally.

## Bulk migration for existing files

If your media library is already full of files, bulk migration moves them to Hippius in one run. It lives in the **Bulk Migration** panel on the <BgStyledText>Hippius Media</BgStyledText> page, next to your settings.

<Ordered>
  <li>Open <BgStyledText>Hippius Media</BgStyledText> from your WordPress admin sidebar and scroll to the <strong>Bulk Migration</strong> panel.</li>
  <li>Click <BgStyledText>Start Migration</BgStyledText>, then confirm. The plugin checks your keys and bucket first, so a setup problem shows up straight away instead of on every file.</li>
  <li>Keep the page open and watch the progress bar. The plugin uploads your files a few at a time and updates the count as it goes.</li>
</Ordered>

The button stays greyed out until you've saved an Access Key ID and Secret Access Key in the settings.

<Screenshot src="/img/wordpress/migrate-bulk.png" alt="Bulk migration of your existing media, with live progress." raw />

*Bulk migration of your existing media, with live progress.*

:::warning Keep the page open while it runs
Bulk migration doesn't run in the background. Your browser tab drives it, asking WordPress to upload the next few files each time the last ones finish. If you close the tab or navigate away, the migration pauses.

That's safe, and nothing is lost. Come back to <BgStyledText>Hippius Media</BgStyledText> within the hour and it picks up where it left off on its own. After that, just click <BgStyledText>Start Migration</BgStyledText> again: it only picks up the files that aren't on Hippius yet.
:::

### Stopping and resuming a migration

You can stop a migration at any time with <BgStyledText>Stop Migration</BgStyledText>. It finishes the file it's on and stops there, and everything already uploaded stays in your bucket. When you click <BgStyledText>Start Migration</BgStyledText> again, it resumes: the plugin only picks up files that aren't migrated yet, and nothing already uploaded is sent again.

The progress counter starts over for the files that remain, so after a resume you'll see a smaller total than the first time. That's expected.

### What happens during migration

<Unordered>
  <li>Each file, and for images every generated size, is uploaded to your Hippius bucket over the S3-compatible API.</li>
  <li>If an upload fails because of a brief network hiccup or a temporary server error, the plugin retries it automatically.</li>
  <li>WordPress starts serving the file from its Hippius URL, including every image size and <code>srcset</code>, and your visitors never notice the switch.</li>
  <li>If <strong>Keep Local Files</strong> is unchecked, the local copy is removed once the upload succeeds.</li>
  <li>Anything that still fails is listed in the <strong>Error Log</strong> with the reason, and the rest of the migration carries on.</li>
</Unordered>

## Auto migration for new uploads

Once auto migration is on, there's nothing else for you to do. Every new file you (or anyone else on your site) uploads to the Media Library is offloaded to Hippius in the background, a few seconds after the upload finishes. You don't need to keep any page open for this.

To turn it on:

<Ordered>
  <li>Open <BgStyledText>Hippius Media</BgStyledText> and find the <strong>Migration Options</strong> panel.</li>
  <li>Check <BgStyledText>Auto-Migrate New Uploads</BgStyledText>.</li>
  <li>Click <BgStyledText>Save Settings</BgStyledText>.</li>
</Ordered>

Auto migration uses WordPress's built-in scheduler, which runs when your site gets visits. On a very quiet site, or one where WordPress's scheduler is switched off, new files can take a little longer to move.

## Migrate or retry a single file

You don't have to run a whole bulk migration to move one file. In the WordPress <BgStyledText>Media</BgStyledText> library, switch to the list view:

<Unordered>
  <li>The <strong>Hippius Status</strong> column shows whether each file is <strong>Migrated</strong>, still <strong>Local</strong>, or <strong>Unsupported</strong>.</li>
  <li>The filter above the list lets you show only files that are <strong>Migrated to Hippius</strong> or <strong>Local Only</strong>, which is the quickest way to find what's left.</li>
  <li>Hover over a local file and click <BgStyledText>Migrate to Hippius</BgStyledText> to upload just that one. This is also the easiest way to retry a file that failed.</li>
  <li>On a migrated file, <BgStyledText>View on Hippius</BgStyledText> opens it straight from your bucket.</li>
</Unordered>

## Check your migration and storage

The <BgStyledText>Hippius Media</BgStyledText> page gives you a live picture of what's migrated and how much you're storing.

<Screenshot src="/img/wordpress/monitor-stats.png" alt="Statistics and usage once your media is on Hippius." raw />

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
  <li><strong>Local Storage</strong> is how much local disk your media still takes up.</li>
  <li><strong>Potential Savings</strong> is what you'd get back locally if you turned off <strong>Keep Local Files</strong>.</li>
  <li><strong>Migration Progress</strong> is the share of your library that's been migrated.</li>
</Unordered>

Below these, **File Type Info** breaks your storage down by type. <BgStyledText>Refresh</BgStyledText> recounts everything, and <BgStyledText>Export Storage Report</BgStyledText> downloads a CSV of your migrated files.

If you added an API token, the **Account Information** panel also shows your **Account balance**. Click <BgStyledText>Check balance</BgStyledText> to refresh it.

### Confirm a file is really on Hippius

To double-check a specific file:

<Ordered>
  <li>Open the WordPress Media Library and edit the file.</li>
  <li>Look at the file URL. It should point to your Hippius bucket, not to <code>wp-content/uploads</code>.</li>
  <li>Open that URL in a private browser window. If it loads, your visitors can see it too.</li>
  <li>You can also check the <strong>Debug Log</strong> on the plugin page for the upload confirmation, which includes the file's Arion hash, the identifier Hippius gave it.</li>
</Ordered>

If a file didn't migrate or isn't showing up on your site, see [Troubleshooting](/use/wordpress-plugin/troubleshooting).
