---
id: drive
title: Drive
sidebar_label: Drive
slug: /use/console/drive
description: Browse, upload, preview, and download your end-to-end encrypted Drive files and folders from the Hippius Console, and manage them in bulk.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

**Drive** is your personal encrypted file storage on the Hippius network. Every file you upload is encrypted in your browser before it leaves your device. Only you can decrypt and read it.

Reach Drive from the sidebar at <BgStyledIconWithText text="Drive" icon="FolderOpen" /> → <BgStyledText>My Drives</BgStyledText>.

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

Click <BgStyledText>Upload File</BgStyledText> in the page header to open the upload dialog. To save space the button reads **File**, next to an upload arrow. <BgStyledText>Upload Folder</BgStyledText> beside it uploads a whole folder, and <BgStyledText>New Folder</BgStyledText> creates one.

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

Click the action menu (three dots) on any file row and choose <BgStyledText>Details</BgStyledText> to see the file's metadata without opening a preview. The details panel shows the file name, file type, date uploaded, file size and Arion hash. The hash has a copy button and a link to the file tracker on hipstats.com.

<Screenshot src="/img/console/drive/details-panel.png" alt="File details panel" dark />

## Downloading Files

To download a file:

<Unordered>
  <li>Open the action menu on the row and choose <BgStyledText>Download</BgStyledText>.</li>
  <li>Or open the file preview and click the download icon in the toolbar.</li>
  <li>Or open File Details and click the download button.</li>
</Unordered>

Hippius decrypts the file in your browser and saves it to your local downloads folder. A toast confirms when it's ready.


## Downloading a Folder

You can download a whole folder at once. Hippius fetches every file inside it, decrypts each one in your browser, and packs them into a single **.zip** archive.

Open the action menu (three dots) on any folder row and choose <BgStyledText>Download Folder</BgStyledText>. The option is on every folder row in Drive: a top level drive at the root, a folder you've opened, and a subfolder expanded inline.

The archive keeps the folder structure. A folder containing `report.pdf` and `images/logo.png` unzips to exactly those two paths, relative to the folder you downloaded. Nested subfolders are included, however deep they go.

### Watching the Progress

A folder of a few thousand files takes minutes, so a **floating progress card** appears in the bottom right corner of the screen, stacked with the upload widget. It stays visible no matter which page you navigate to.

The heading on the card tells you which stage the download is in:

| Stage | What's happening |
|---|---|
| **Preparing folder** | Listing the files inside the folder. |
| **Downloading folder** | Fetching and decrypting the file bodies. This is the long phase. |
| **Zipping folder** | Closing the archive and handing it to your browser. |

Below the heading you'll see a live count, for example _3 of 120 files_, and a percentage ring. Click <BgStyledText>Cancel</BgStyledText> to stop the download. The card stays up and reads **Cancelling** until the browser has actually stopped writing, then disappears.

The file is written straight to your downloads folder as the archive is packed, so your browser never has to hold the whole thing in memory. A toast confirms when it's done.

### Things to Know

<Unordered>
  <li><strong>One folder at a time.</strong> While a folder download is running, the <BgStyledText>Download Folder</BgStyledText> option on other rows is greyed out with a tooltip explaining why. Wait for it to finish, or cancel it.</li>
  <li><strong>Your session must be unlocked.</strong> The files are decrypted with your folder key, so the console asks for your unlock password if you haven't entered it yet this session.</li>
  <li><strong>Empty folders can't be downloaded.</strong> If a folder has no files in it, the console says so instead of producing an empty archive.</li>
  <li><strong>Files deleted mid download are skipped.</strong> If a file disappears between the listing and the packing, it's left out of the archive rather than failing the whole download.</li>
  <li><strong>Duplicate names are made unique.</strong> If two files would land on the same name inside the archive, the second becomes <code>name (2).ext</code>, so nothing is silently overwritten when you unzip.</li>
</Unordered>

:::warning Keep the tab open
The archive is packed by your browser, not on a server. Closing the tab or navigating away from the console cancels a folder download in progress.
:::

:::info If your browser can't stream the download
On a first visit, before the console's background worker has started, your browser may not be able to write the archive as it's packed. In that case the whole archive has to be held in memory, and folders over **500 MB** are refused with a "too large to download as a zip in this browser" message. Reload the page and try again, which lets the worker take over and removes the limit.
:::

## Moving Files and Folders {#moving-files-and-folders}

Tidying up a project, or handing finished work over to your team's shared drive? You can move files and folders to another folder in the same drive, or to a different drive altogether.

### Move with Move to…

<Ordered>
  <li>Open the menu (three dots) on a file or folder and choose <BgStyledText>Move to…</BgStyledText>. To move several items at once, tick them first and use <BgStyledText>Move to…</BgStyledText> in the selection bar.</li>
  <li>The picker opens at the folder the items are in. Click into folders to find the destination, or use the breadcrumb to go back up. <BgStyledText>New folder</BgStyledText> makes a folder right there if you need one.</li>
  <li>To move to another drive, pick it from the drive list at the top of the picker.</li>
  <li>Click <BgStyledText>Move to</BgStyledText> followed by the folder's name.</li>
</Ordered>

The drive list shows your own drives and the [shared drives](/use/console/shared-drives) where you're an Editor or a Manager. A folder someone shared with you for editing opens at that folder. Drives you can only view aren't listed, because you can't add anything to them.

### Drag and drop

With a mouse or trackpad, you can also drag files and folders straight onto a folder. Drop onto any row inside an open folder and the items go into that folder, the way Finder works. The folder you'd drop into lights up, and the label reads **Move to** and its name. Hold over a closed folder for a moment and it opens, so you can go deeper.

On **My Drives**, open a drive, then drag items onto another drive, or onto a folder inside it, to move them between drives. If a drop isn't allowed, the label says why, for example when you can only view a drive. Press Escape to cancel a drag.

### Moving to another drive

Every drive has its own encryption key, so moving to another drive isn't just a rename. Your browser opens each file, encrypts it again for the new drive and uploads it there. Only when every file has arrived does Hippius switch them all over in one step. Until then, nothing changes in either drive.

That has a few consequences worth knowing:

<Unordered>
  <li><strong>It takes as long as an upload.</strong> A progress card in the bottom corner shows what is moving and where, and how many files are ready, for example <em>Preparing 1,240 of 8,300 files</em>. It keeps going if you close the picker or open another page, but keep the tab open.</li>
  <li><strong>It's all or nothing.</strong> Click <BgStyledText>Cancel</BgStyledText> on the card at any point, and both drives stay exactly as they were. The same is true if anything fails, or if you close the tab before it finishes.</li>
  <li><strong>A move holds room in the destination</strong> while it runs, so the files are sure to fit. If the tab closed or crashed partway, the console lets go of that room the next time you open Drive in the same browser. A move started somewhere else is never touched, and anything left over is freed on its own within a day.</li>
  <li><strong>The console asks for your unlock password once</strong>, as the move starts, and won't stop to ask again even if it locks while you're away.</li>
  <li><strong>There's no Undo.</strong> To put things back, move them again.</li>
  <li><strong>Storage moves with the files.</strong> A file you move into someone else's drive counts toward the owner's storage, not yours. If their plan is full, the move says so.</li>
</Unordered>

When it finishes, a message tells you where things went, for example *Moved to Reports in Team*.

### What happens to links and access

<Unordered>
  <li><strong>File links keep working</strong>, wherever the file goes. Each one is its own encrypted copy, so a move doesn't touch it.</li>
  <li><strong>Within one drive</strong>, a folder keeps its folder links and the people it's shared with.</li>
  <li><strong>To another drive</strong>, a folder can't take its sharing along, because its links and invites belong to the old drive's key and members. Before you move a shared folder, the console asks <strong>Move shared folder?</strong> and says what will be turned off, for example <em>Moving turns off 2 share links and access for 1 person.</em> The count takes in every live link on the folder and the folders inside it, including links other Managers made, so nothing stops working without warning. After the move, make new links or share the folder again in its new drive if you need to.</li>
  <li>Only the drive's owner or a Manager can move a folder that other people can open to another drive.</li>
</Unordered>

### When a name is already taken

If something with the same name is already in the destination, the console asks what to do: **Keep both** (the moved item gets a new name such as *Report (1).pdf*), **Replace** (a file over a file), or **Skip**. With several clashes, **Do this for all** answers them in one go. Between drives only Keep both and Skip are offered, so nothing is deleted before the move is safely done.

### If a move fails

Nothing is lost when a move fails: both drives stay as they were, and the message says what stopped it. The most common ones:

| Message says | What to do |
|---|---|
| A file **can't be opened with this drive's key** | That one file was saved with a different key, or is damaged. The message names it. Move it somewhere else in the same drive, then move the folder again. |
| **An item with this name is already there** | Rename one of them, or pick another folder. |
| **A shared folder or link already uses this name there** | The destination folder is shared on its own. Pick another folder. |
| **An upload into this folder is still running** | Wait for the upload to finish, then try again. |
| **Some files in this drive need to sync from the desktop app first** | Open the desktop app so it can finish syncing, then try again. |
| **The recordings would go over the free plan's limit there** | The destination's owner is on the Free plan, which holds 25 recordings. |
| **It changed while moving** | Someone edited a file while it moved. Try again. |
| **A folder changed or is no longer there** | Someone renamed, moved or deleted a folder in the move while it ran. Refresh the page and try again. |

### Limits

| Limit | Value |
|---|---|
| **Files in one move between drives** | 2,000 |
| **Folders in one move between drives** | 100 |
| **Largest file you can move between drives in the browser** | 500 MB |
| **Empty folders** | Move like any other folder, even a folder that holds only empty folders. |
| **Moves within a drive** | No file or size limit. Nothing is uploaded again, so even a big folder moves quickly. |

For a bigger move, split it into several smaller ones.

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

## Storage Plans and Upload Limits

How much you can upload depends on your **Drive plan**, not on your balance.

<Unordered>
  <li>If an upload would go over your plan, <strong>You're out of storage</strong> appears. Click <BgStyledText>View plans</BgStyledText> to move to a bigger plan, or free up space and try again.</li>
  <li>On <strong>Max</strong> and <strong>Scale</strong>, uploads keep going past the plan's storage, billed by the hour, until they reach your <a href="/use/console/billing#drive-storage-cap">storage cap</a>.</li>
  <li>If your account has no plan at all, <BgStyledText>Upload File</BgStyledText> asks you to pick one first, and a banner says that nothing new can be uploaded until you subscribe.</li>
</Unordered>

See [Billing → Drive plans](/use/console/billing#drive-plans) for the plans and what happens without one.


## Screenshots and Recordings

Want to show someone what's on your screen? Click <BgStyledText>Screenshot</BgStyledText> or <BgStyledText>Record</BgStyledText> at the top of the Drive page, and Hippius saves the capture to your captures drive and copies a link to it, ready to paste. Everything you capture, here or in the desktop app, is listed in **Captures**, under Drive in the sidebar. See [Screenshots and Recording](/use/captures).

## Sharing With Other People

There are two ways to give someone your files, and they suit different jobs:

<Unordered>
  <li><strong>A public link</strong> hands one file or folder to anyone, with no Hippius account needed. It is read only. See <a href="/use/console/shared-links">Shared Links</a>.</li>
  <li><strong>A Hippius shared drive</strong> invites people into a drive with their own Hippius account and a role, so they can keep working in it with you. Choose <BgStyledText>Share drive</BgStyledText> in a drive's menu, or <BgStyledText>Share folder</BgStyledText> on a folder inside it to share just that folder. See <a href="/use/console/shared-drives">Shared Drives</a>.</li>
</Unordered>

A drive or folder of yours that other people can get into shows a **Shared** mark beside its name, with <BgStyledText>Manage access</BgStyledText> next to it. Drives other people have shared with you are under **Shared Drives**, not here, and they don't use up your storage.

## Limits

| Limit | Value |
|---|---|
| **Max file size (via console)** | **100 MB** |
| **Max files per upload batch** | 1000 |
| **Folder depth** | Unlimited |
| **Max files in a folder download** | 65,535 |
| **Max size of any one file in a folder download** | 4 GB |

For files larger than 100 MB, use the [Hippius Desktop App](/use/desktop/getting-started), which syncs files incrementally without a browser size cap.

The two folder download limits come from the zip format itself, not from Hippius. They only matter for drives synced from the desktop app, since nothing uploaded through the console can exceed 100 MB.

## Where to next

<Unordered>
  <li><a href="/use/console/shared-links">Shared Links</a>: share any Drive file as a public link, with no account needed to open it.</li>
  <li><a href="/use/console/shared-drives">Shared Drives</a>: share a drive or a folder with people who have a Hippius account, and work in drives shared with you.</li>
  <li><a href="/use/captures">Screenshots and Recording</a>: capture your screen and share it with a link.</li>
  <li><a href="/use/console/uploads">Console Uploads</a>: full reference for the upload queue, progress widget, and error handling.</li>
  <li><a href="/use/console/s3">Object Storage</a>: S3 compatible storage for use with any S3 client.</li>
  <li><a href="/use/desktop/getting-started">Hippius Desktop App</a>: real time folder sync and uploads beyond the 100 MB cap.</li>
</Unordered>
