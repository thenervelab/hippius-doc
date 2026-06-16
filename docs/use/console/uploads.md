---
id: uploads
title: Uploads
sidebar_label: Uploads
slug: /use/console/uploads
description: 6
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';

## Introduction

Whether you're uploading to **Drive** or an **S3 bucket**, all uploads in the Hippius Console go through the same system: a shared queue, a floating progress widget that stays visible no matter which page you're on, and a live progress toast that updates as your files upload.

This page explains the full upload flow from start to finish.

## File Size Limit

:::warning 100 MB per file
The **maximum file size for a single upload via the console is 100 MB**, for both Drive and S3.

If you need to upload larger files:

<Unordered>
  <li><strong>Drive</strong>: install the <a href="/use/desktop/getting-started">Hippius Desktop App</a>, which uses incremental sync with no browser size cap.</li>
  <li><strong>S3</strong>: use any S3 client that supports multipart uploads (the AWS CLI and every official SDK do). See <a href="/use/quickstart">S3 Quickstart</a>.</li>
</Unordered>
:::

## Starting an Upload

| Where you are | How to open the upload dialog |
|---|---|
| **Drive** | Click <BgStyledText>+ New File</BgStyledText> in the page header. |
| **Inside an S3 bucket** | Click <BgStyledText>+ Upload</BgStyledText> in the bucket toolbar. |

You can also drag files from your file manager (Finder, Explorer) directly onto the Drive page or inside an open S3 bucket. A full page drop zone appears and the dialog opens with your files already loaded.

### The Drive Upload Dialog

<Ordered>
  <li><strong>Destination folder</strong>: the folder you're currently in is pre selected. If you're at the Drive root with no folder open, you'll need to pick one from the dropdown first.</li>
  <li><strong>Drop zone</strong>: drag files onto it or click to open your file picker.</li>
  <li><strong>File list</strong>: every picked file appears with its name and size. Files over 100 MB are flagged and excluded from the upload.</li>
  <li>Click <BgStyledText>Upload</BgStyledText> to start.</li>
</Ordered>

![Drive upload dialog](/img/console/uploads/drive-dialog.png)

### The S3 Upload Dialog

<Ordered>
  <li><strong>Folder location</strong>: pre filled with the folder you navigated to inside the bucket. Click to pick a different sub folder.</li>
  <li><strong>Drop zone</strong>: drag or click to pick files.</li>
  <li><strong>File list</strong>: same as Drive, with a 100 MB warning for oversized files.</li>
  <li>Click <BgStyledText>Upload</BgStyledText> to start.</li>
</Ordered>

![S3 upload dialog](/img/console/uploads/s3-dialog.png)

## Upload Security

### Drive

Every Drive upload is encrypted in your browser **before any bytes leave your device**:

<Ordered>
  <li>You enter your <strong>unlock password</strong> the first time you upload in a session. It's held only in memory, never sent to Hippius.</li>
  <li>A symmetric key is derived from your password and your account's key material.</li>
  <li>Each file is encrypted in your browser with that key using a streaming cipher.</li>
  <li>Only the resulting ciphertext is uploaded. Hippius nodes never see your files in plaintext.</li>
</Ordered>

### S3

Your S3 buckets are **private by default**. Files are only accessible using your master or sub tokens, so nobody else can read, list, or download your objects. Use sub tokens to grant scoped, time limited access to specific buckets without sharing your master credentials. See [S3 Buckets → Sub Tokens](/use/console/s3#sub-tokens).

## Watching Your Upload Progress

As soon as you click <BgStyledText>Upload</BgStyledText>, the dialog closes and a **floating progress widget** appears in the bottom right corner of the screen. It stays there regardless of which page you navigate to, so you can browse the console while uploads run in the background.

The widget shows:

<Unordered>
  <li>An overall summary like <em>"1/3 files — 23% complete"</em> showing how many files have finished and the total percentage across the batch.</li>
  <li>The name and percentage of the file currently uploading.</li>
</Unordered>

Files upload **one at a time** to avoid saturating your connection or the in-browser encryption pipeline. Each file starts automatically as the previous one finishes.

Progress is based on **actual bytes uploaded** via `XMLHttpRequest` progress events, not an estimate or a timer.

![Upload progress widget — expanded](/img/console/uploads/upload-widget.png)

Once every file in the batch finishes, the widget collapses to a small pill you can dismiss. While any file is still in flight, you can collapse the widget but not close it.

:::tip Closing the browser tab cancels any uploads still in progress.
:::



## When a File Fails

If a file fails to upload:

<Unordered>
  <li>Its row in the widget turns red with the error reason.</li>
  <li>The rest of the files in the batch keep going. One failure doesn't stop the others.</li>
</Unordered>

To retry a failed file, open the upload dialog again and add the file. There is no in place retry button in the widget.


Common failure reasons:

| Reason | What to do |
|---|---|
| **Network error** | Check your connection and add the file again. |
| **413 Too Large** (Drive) | The file is over 100 MB. Use the desktop app. |
| **Auth error** (S3) | Your master or sub token has expired or been revoked. Generate a new one. |
| **Insufficient credits** | The dialog catches this before the upload starts (see below). |

## Insufficient Credits

If your balance can't cover the upload, an **Insufficient Credits** dialog appears before the queue starts. It shows your current balance, the estimated cost, and a <BgStyledText>Top Up</BgStyledText> button that takes you to Billing.

After topping up, start the upload again.

## Limits

| Limit | Drive | S3 |
|---|---|---|
| **Max file size via console** | 100 MB | 100 MB |
| **Max files per batch** | 1000 | 1000 |
| **Concurrent uploads** | 1 (queue runs one at a time) | 1 (queue runs one at a time) |
| **Folder depth** | Unlimited | Unlimited |

## Where to next

<Unordered>
  <li><a href="/use/console/drive">Drive</a>: your personal encrypted file storage.</li>
  <li><a href="/use/console/s3">S3 Buckets</a>: S3 compatible bucket storage.</li>
  <li><a href="/use/desktop/getting-started">Hippius Desktop App</a>: uploads beyond the 100 MB console limit.</li>
  <li><a href="/use/console/billing">Billing</a>: top up credits to keep uploading.</li>
</Unordered>
