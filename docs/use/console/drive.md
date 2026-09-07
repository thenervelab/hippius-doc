---
id: drive
title: Drive
sidebar_label: Drive
slug: /use/console/drive
description: Browse, upload, preview, and download your end-to-end encrypted Drive files from the Hippius Console, and manage them in bulk.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

**Drive** is your personal encrypted file storage on the Hippius network. Every file you upload is encrypted in your browser before it leaves your device. Only you can decrypt and read it.

Reach Drive from the sidebar at <BgStyledIconWithText text="Storage" icon="SidebarStorage" /> → <BgStyledIconWithText text="Drive" icon="FolderOpen" />.

<Screenshot src="/img/console/drive/overview.png" alt="Drive page overview" dark />

## Your Unlock Password

Drive encrypts every file using a key tied to your **unlock password**. The console will ask for this password the first time you upload, preview, or download a file in each session. After you enter it, the key stays in memory until you close the tab. You won't be asked again during the same session.

**Setting up for the first time?** The console sets your unlock password up for you the first time you upload a file or create a folder. You do not need the desktop app for it. See [Unlock Password](/use/console/unlock-password) for the full flow, including how to restore access with your recovery seed. If you already set one in the [Hippius Desktop App](/use/desktop/getting-started), the same password works here.

:::danger Your unlock password cannot be recovered
If you forget it, you'll need your 12-word recovery phrase to restore access to your encrypted files. Keep both somewhere safe. We cannot recover either for you.
:::

<Screenshot src="/img/console/drive/unlock-password.png" alt="Unlock password prompt" dark />

## Browsing Your Files

Your files are organised into folders. The Drive root lists every folder on your account. Click a folder to open it and see its contents.

The **breadcrumb** at the top of the file browser shows where you are: for example _My Drive › Documents › Receipts_. Click any part of the breadcrumb to jump back up, or click the home icon to return to the root.

Files are displayed in a table showing the name, size, type, and upload date.

<Screenshot src="/img/console/drive/browse.png" alt="Browsing files in Drive" dark />

### Creating a Folder

Click <BgStyledText>+ New Folder</BgStyledText> in the page header to create a folder. If you are already inside a folder, the new one is created there; from the Drive root it is created at the top level.

Folder names must be unique among their siblings, so the dialog will tell you if the name is already taken before you create it.

<Screenshot src="/img/console/drive/create-folder.png" alt="Create folder dialog" dark />

### Renaming Files and Folders

Open the action menu (three dots) on any row and choose <BgStyledText>Rename</BgStyledText> for a file, or <BgStyledText>Rename Folder</BgStyledText> for a folder. The name changes in place; nothing is re-uploaded and no link you have already shared is affected.

### Sorting

Click any column header to sort by that column. Click it again to reverse the order.

### Searching and Filtering

The **search box** in the page header filters the current folder by file name as you type. On mobile the search input is in the toolbar instead.

The **filter pills** in the toolbar let you narrow files by type, size, or date:

| Filter | Options |
|---|---|
| **File Extension** | Pick from common types (PDF, JPG, PNG, MP4, ZIP, …). |
| **File Size** | Pre set ranges from < 1 MB to > 500 MB. |
| **Date Range** | A date range picker for the upload date. |

Active filters show as chips above the table. Click the X on a chip to remove it, or use <BgStyledText>Clear all</BgStyledText> to remove them all at once.


## Uploading Files

Click <BgStyledText>+ New File</BgStyledText> in the page header to open the upload dialog.

The first time you upload in a session, the console will ask for your **unlock password** to encrypt the file. After that, the key is cached for the rest of the session.

Two important things to know before uploading:

<Ordered>
  <li><strong>The destination is the folder you're currently in.</strong> If you're at the Drive root with no folder selected, the upload dialog will ask you to pick a destination folder first.</li>
  <li><strong>Each file must be under 100 MB.</strong> Files larger than 100 MB will be flagged and cannot be uploaded via the console browser. To upload larger files, use the <a href="/use/desktop/getting-started">Hippius Desktop App</a>.</li>
</Ordered>

You can also drag files from your desktop directly onto the Drive page. A full page drop zone appears and the dialog opens with your files pre loaded.

For a complete reference of the upload queue, progress widget, and error handling, see [Console Uploads](/use/console/uploads).

<Screenshot src="/img/console/drive/upload.png" alt="Upload dialog" dark />

## Previewing Files

Click any file name or the eye icon in its row to preview it directly in the browser. The first time you preview in a session, the console asks for your unlock password to decrypt the file.

Everything below is decrypted and rendered on your own device. The file is never sent anywhere in readable form, and no outside viewing service is involved.

| Type | Formats | What you see |
|---|---|---|
| **Images** | JPG, PNG, GIF, WebP, AVIF, BMP, ICO, HEIC/HEIF, SVG | Inline image viewer. |
| **Hippius Live photos** | HEIC + motion | The still image, with the motion clip playable in place. |
| **Videos** | MP4, WebM, MOV | Inline player with playback controls. |
| **PDFs** | PDF | Multi page reader with page navigation. |
| **Word documents** | DOCX | Page by page document reader. |
| **Spreadsheets** | XLSX, CSV | Spreadsheet grid with a tab for each sheet. |
| **Presentations** | PPTX | Slide viewer with a thumbnail strip and slide navigation. |
| **Markdown** | MD, MARKDOWN | Rendered Markdown. Raw HTML inside the file is shown as text, not rendered. |
| **HTML** | HTML, HTM | The rendered page, shown in an isolated frame. |
| **Plain text** | TXT | Monospaced text. |
| **JSON** | JSON | Pretty printed with syntax highlighting. |

Very large files can't be previewed. The console shows a toast asking you to download the file instead. Older Office formats (DOC, XLS, PPT) don't preview either. Save them as DOCX, XLSX, or PPTX to make them previewable.

Larger files fall back to a download rather than opening slowly, and the viewer says why. The cut-off depends on how much work the format takes to render:

| Format | Previews up to |
|---|---|
| PowerPoint | 40 MB |
| Word, HTML | 25 MB |
| Excel, CSV | 20 MB |
| JSON | 2 MB |
| Markdown, plain text | 1 MB |

For any file type not listed above, use the action menu to **Download** it and open it locally.

The preview toolbar has buttons to **Download** or **Close** the preview, plus **Share** and **Delete** when those actions are available for the file.

<Screenshot src="/img/console/drive/preview-image.png" alt="Image preview" dark />

## File Details

Click the action menu (three dots) on any file row and choose <BgStyledText>Details</BgStyledText> to see full metadata without opening a preview. The details panel shows the file name, path, size, MIME type, upload date, IPFS CID, and Hippius file hash, each with a copy icon.

<Screenshot src="/img/console/drive/details-panel.png" alt="File details panel" dark />

## Downloading Files

To download a file:

<Unordered>
  <li>Open the action menu on the row and choose <BgStyledText>Download</BgStyledText>.</li>
  <li>Or open the file preview and click the download icon in the toolbar.</li>
  <li>Or open File Details and click the download button.</li>
</Unordered>

Hippius decrypts the file in your browser and saves it to your local downloads folder. A toast confirms when it's ready.


## Selecting and Deleting Multiple Files

Tick the checkbox at the start of any row to enter selection mode. The header checkbox selects everything on the current page.

A **Selection Action Bar** appears at the bottom of the page with a live count of selected files, a **Delete** button, and a cancel (X) button.

Deletes run in parallel. Each file is removed independently and a per file toast streams the result as it completes. A confirmation dialog appears before anything is deleted.

:::warning Deletes are permanent
Deleted files cannot be recovered through the console. If a file was also synced from the desktop app, it will be removed there too on the next sync.
:::

<Screenshot src="/img/console/drive/selection-bar.png" alt="Selection action bar" dark />

## Storage Stats

The toolbar shows your total **storage used** and **file count** next to the breadcrumb. These update automatically after every upload or delete.

## Refreshing

The file list refreshes automatically after uploads and deletes. To manually refresh, for example after another device has synced new files, click the **refresh** icon in the page header.

## Insufficient Credits

If your credit balance can't cover a planned upload, an **Insufficient Credits** dialog appears before anything starts. It shows your current balance, the estimated cost, and a <BgStyledText>Top Up</BgStyledText> shortcut to the Billing page.

After topping up, start the upload again from the same dialog or click <BgStyledText>+ New File</BgStyledText> again.


## Limits

| Limit | Value |
|---|---|
| **Max file size (via console)** | **100 MB** |
| **Max files per upload batch** | 1000 |
| **Folder depth** | Unlimited |

For files larger than 100 MB, use the [Hippius Desktop App](/use/desktop/getting-started), which syncs files incrementally without a browser size cap.

## Where to next

<Unordered>
  <li><a href="/use/console/shared-links">Shared Links</a>: share any Drive file as a public download link — no account required for recipients.</li>
  <li><a href="/use/console/uploads">Console Uploads</a>: full reference for the upload queue, progress widget, and error handling.</li>
  <li><a href="/use/console/s3">S3 Buckets</a>: S3 compatible storage for use with any S3 client.</li>
  <li><a href="/use/desktop/getting-started">Hippius Desktop App</a>: real time folder sync and uploads beyond the 100 MB cap.</li>
</Unordered>
