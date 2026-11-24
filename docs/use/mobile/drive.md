---
id: drive
title: Your Files
sidebar_label: Your Files
slug: /use/mobile/drive
description: Browse, search, upload, preview, download, star, rename and delete your encrypted Hippius files from your phone.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

**Drive** is everything you have stored with us. The same files you see in the console and the desktop app, on your phone.

Files are encrypted on your phone before they are uploaded, and decrypted on your phone when you open them. What travels over the network and what sits on it is unreadable to everyone but you.

## The Drive screen {#the-drive-screen}

Tap **Drive** in the bar at the bottom. From top to bottom you'll find:

<Unordered>
  <li><strong>Storage</strong>: a bar showing how your space is split between <strong>Images</strong>, <strong>Videos</strong>, <strong>Docs</strong> and <strong>Others</strong>. Tap a colour for its size and number of files.</li>
  <li>A card to set up <a href="/use/mobile/camera-uploads">Camera Uploads</a>, until you turn it on.</li>
  <li><strong>Recents</strong>: your most recently added files. Swipe sideways to see more.</li>
  <li><strong>Search Files</strong>: search your whole Drive. See <a href="#finding-a-file">Finding a file</a>.</li>
  <li><strong>All</strong>: your folders. The <strong>link</strong> icon opens your <a href="/use/mobile/shared-links#seeing-and-revoking-your-links">Shared Links</a>, and the <strong>···</strong> button has options to select, create a folder, switch view and sort.</li>
</Unordered>

<Screenshot src="/img/mobile/drive.png" alt="The Drive screen listing files and folders" dark raw phone />

If your Drive is empty, it says **Your drive is empty**. Tap <BgStyledText>+ Add content</BgStyledText> to upload something.

### Inside a folder {#inside-a-folder}

Tap a folder to open it. The header shows the folder's name, when it was created and how big it is. While files are uploading into it, that line shows progress instead, for example **Uploading • 3 remaining...**.

On the right of the header, the upload button opens **Your Uploads**, and the **…** button has the folder's options:

<Unordered>
  <li><strong>Rename</strong>, for folders inside another folder.</li>
  <li><strong>Select</strong>, to select several items at once.</li>
  <li><strong>New Folder</strong>, to create a folder inside this one.</li>
  <li><strong>Shared Links</strong>, to see the links you have shared.</li>
  <li><strong>Grid view</strong> or <strong>List view</strong>.</li>
  <li>Sorting and filtering. See <a href="#sorting-and-views">Sorting and views</a>.</li>
</Unordered>

An empty folder says **This folder is empty**. <BgStyledText>+ Add content</BgStyledText> uploads straight into it.

<Screenshot src="/img/mobile/drive/folder.png" alt="Inside a folder in Drive" dark raw phone />

## Finding a file

Tap **Search Files** and type.

<Unordered>
  <li>On the <strong>Drive</strong> screen, the search covers your whole Drive, not just one folder, so you don't have to remember where you put something.</li>
  <li>Inside a folder, the search box covers the top-level folder you are in, including every folder inside it.</li>
</Unordered>

Search finds files by name. If nothing matches, it says **We couldn't find anything**.

### Sorting and views {#sorting-and-views}

Open the **···** menu to change how a list looks. The app remembers your choice.

<Unordered>
  <li><strong>Grid view</strong> shows thumbnails. It is the default. <strong>List view</strong> shows one item per row, with its date and size.</li>
  <li><strong>Alphabetical</strong>, <strong>Size</strong> or <strong>Date</strong> sort the list. Tap the one you are using again to reverse it, for example from <strong>Newest to Oldest</strong> to <strong>Oldest to Newest</strong>. The default is by date, newest first.</li>
</Unordered>

Folders always come before files.

### Filtering by kind {#filtering-by-kind}

Inside a folder, and in search results, the menu also has **Kind**. Tap it to show only certain types of file, such as JPG and PNG, or PDF. Types are grouped under **Video**, **Image**, **Document**, **Spreadsheet**, **Presentation**, **Code** and **Database**, and you can tick as many as you like. Choosing **Alphabetical**, **Size** or **Date** again clears the filter.

## Adding files

Tap <BgStyledText>+</BgStyledText> in the bottom bar and choose what to add:

<Unordered>
  <li><strong>Upload Photos</strong> opens your phone's photo picker. Pick photos and videos, as many as you like.</li>
  <li><strong>Upload files</strong> opens your phone's file browser for anything else, such as documents.</li>
  <li><strong>Create Folder</strong> makes a new folder. See <a href="#creating-a-folder">Creating a folder</a>.</li>
  <li><strong>Take photo or video</strong> opens the camera and uploads what you capture.</li>
</Unordered>

**On Android**, **Take photo or video** first asks whether you want to **Take Photo** or **Record Video**, then opens the camera for that.

**On iPhone**, the camera opens straight away. Switch between photo and video in the camera itself.

<Screenshot src="/img/mobile/drive/add-menu.png" alt="The + menu with the ways to add files" dark raw phone />

### Choosing where files go {#choosing-a-folder}

After you pick something, the **Choose a folder** sheet asks where it should go:

<Ordered>
  <li>Check what you are uploading at the top: the file's name, or how many files you picked.</li>
  <li>Pick a folder. <strong>Recent Folder</strong> is where your latest file went. Under <strong>All folders</strong> you can search with <strong>Search Folders</strong>, open a folder to reach the ones inside it, or tap <strong>New folder</strong> to make one. If you started from inside a folder, that folder is already selected.</li>
  <li>Tap <BgStyledText>Upload</BgStyledText>.</li>
</Ordered>

Files always go into a folder, so the button stays greyed out while **Drive** itself is selected. If you don't have any folders yet, the sheet offers **Mobile Uploads**, which is created for you when you upload.

The app then opens the folder, and the new files appear with their progress.

<Screenshot src="/img/mobile/drive/choose-folder.png" alt="The Choose a folder sheet" dark raw phone />

**Renaming before you upload.** When you upload a single file, tap **Rename** at the top of the sheet to change its name first. The extension stays as it is.

### File names {#file-names}

<Unordered>
  <li>Photos and videos from <strong>Upload Photos</strong> or the camera are named after when they were taken, such as <strong>Photo 14-07-2026, 10 28 38.jpg</strong>.</li>
  <li>If the folder already has a file with that name, the new one gets a number, such as <strong>Photo (1).jpg</strong>. Nothing is overwritten.</li>
</Unordered>

### HEIC photos {#heic-photos}

Some phones save photos in a space-saving format called **HEIC**. If any photo you pick is HEIC, the sheet shows **Image preferences**. Tap **Save as JPG** to choose:

<Unordered>
  <li><strong>JPG (Recommended)</strong>, the default. The photo is converted to JPG before it is uploaded, because many apps and services can't display HEIC.</li>
  <li><strong>HEIC</strong> keeps the original file.</li>
</Unordered>

### Live Photos on iPhone {#live-photos}

When you pick a Live Photo, **Image preferences** also has a **Live on** chip. Keep **Live Photo** to upload the image and its motion together, or choose **Still image** to upload just the photo. Live Photos take up more storage. Keeping the motion needs full photo access. See [Permissions and Background Backups](/use/mobile/permissions#iphone-photos).

### Your first upload {#your-first-upload}

The first time you upload on a new account, the app asks you to create an **unlock password** before the file is encrypted. It lets you open your files on other devices and in the console. If you close the sheet instead, the upload is cancelled. See [Setting Your Unlock Password](/use/mobile/settings#setting-your-unlock-password).

### While files upload {#while-files-upload}

<Unordered>
  <li>Follow progress in the folder, where each new file shows its percentage and time left, or in <strong>Your Uploads</strong>, which you open from the header. There you can pause, resume or cancel. See <a href="/use/mobile/camera-uploads#following-the-backup">Following the backup</a>, which works the same way for uploads.</li>
  <li>A file that fails to upload stays in <strong>Your Uploads</strong>. Tap it to see why, then <BgStyledText>Retry</BgStyledText> or <BgStyledText>Skip</BgStyledText>.</li>
  <li>Keep the app open until your uploads finish. Uploads you start yourself may pause when you leave the app, and they stop if it is closed. When you come back, check <strong>Your Uploads</strong> and upload again anything that didn't finish.</li>
</Unordered>

:::tip Wi-Fi only
With **Upload on Wi-Fi only** turned on in Settings, the app won't start an upload over mobile data. It says **Uploads need Wi-Fi**. Uploads that were already running pause on mobile data and continue on Wi-Fi. See [Settings](/use/mobile/settings#wi-fi-only).
:::

:::info Space on your phone
Files are encrypted on your phone before they are sent, so a large file needs some free space on your phone for its encrypted copy while it uploads. If there isn't enough, the app tells you how much to free up.
:::

### Creating a folder {#creating-a-folder}

<Ordered>
  <li>Tap <BgStyledText>+</BgStyledText> → <strong>Create Folder</strong>, or <strong>New Folder</strong> in a <strong>···</strong> menu.</li>
  <li>Type a <strong>Folder Name</strong>.</li>
  <li>Pick where it goes. Select <strong>Drive</strong> for a new top-level folder, or pick a folder to create it inside. If you started from inside a folder, that one is selected.</li>
  <li>Tap <BgStyledText>Create folder</BgStyledText>. The app opens your new folder.</li>
</Ordered>

The button stays greyed out while the name breaks one of the [naming rules](#renaming).

## Opening a file

Tap any file to open it full screen. The app downloads and decrypts it on your phone first, which is why a large file can take a moment. You'll see **Downloading…** with a percentage, then **Decrypting…**.

<Unordered>
  <li><strong>Swipe</strong> left or right to move between the files in the list you opened it from. A counter shows where you are, such as <strong>3 of 10</strong>.</li>
  <li><strong>Pinch</strong> to zoom into a photo. Tap once to hide or show the buttons.</li>
  <li>Presentations have buttons for the previous and next slide.</li>
  <li>The <strong>…</strong> menu at the top has <strong>Get info</strong>, <strong>Rename</strong>, <strong>Download</strong>, <strong>Share via Link</strong> and <strong>Delete File</strong>. The three buttons at the bottom delete, download and share the file.</li>
</Unordered>

These file types open in the app:

| Kind           | File types                                         |
| -------------- | -------------------------------------------------- |
| Photos         | JPG, PNG, GIF, WebP, BMP, ICO, AVIF, HEIC and SVG |
| Videos         | MP4, MOV, WebM, MKV, AVI, FLV and WMV              |
| Documents      | PDF and Word (DOCX)                                |
| Spreadsheets   | XLSX, XLSM, CSV and TSV                            |
| Presentations  | PowerPoint (PPTX)                                  |
| Text           | Plain text, logs, Markdown, HTML and JSON          |

Older Office files (DOC, XLS and PPT), audio and code files don't preview, and neither do very large files. Tapping one of those tells you it can't be previewed. Download it to open it in another app.

**On iPhone**, older Word files (DOC) preview as well, and a Live Photo shows a **LIVE** button. Tap it to play the motion.

<Screenshot src="/img/mobile/drive/preview.png" alt="A photo open in the full-screen preview" dark raw phone />

## Saving a file to your phone

Open a file and tap the **download** button at the bottom, or press and hold it in a list and choose **Download**. The app downloads the file, decrypts it on your phone and saves it. A progress window shows **Downloading…**, **Decrypting…** and **Saving…**, and you can cancel at any time. When it is done, the app says **Saved**.

Files are downloaded one at a time, and folders can't be downloaded in the app. Very large files can't be downloaded on mobile yet. The app tells you if a file is too large, and you can download it from the [console](/use/console/drive) or the desktop app instead.

Where the file goes depends on your phone and the kind of file.

### On Android {#saving-on-android}

<Unordered>
  <li><strong>Photos and videos</strong> go straight into your phone's gallery.</li>
  <li><strong>Everything else</strong>: Android asks which folder to save it in, for example <strong>Documents</strong>. Choose a folder, tap <strong>Use this folder</strong>, then <strong>Allow</strong>.</li>
</Unordered>

### On iPhone {#saving-on-iphone}

<Unordered>
  <li><strong>Photos and videos</strong> are saved to the <strong>Photos</strong> app. The first time, iOS asks whether Hippius may add to your photos. A Live Photo is saved as a Live Photo.</li>
  <li><strong>Everything else</strong> opens the share sheet. Tap <strong>Save to Files</strong> to keep it on your iPhone, or send it to another app.</li>
</Unordered>

## File details {#file-details}

Press and hold a file or folder and choose **Get info**. The **Info** sheet shows:

<Unordered>
  <li><strong>File type</strong> and <strong>Size</strong>.</li>
  <li><strong>Date Uploaded</strong> for a file, or <strong>Date Created</strong> for a folder.</li>
  <li><strong>Date Taken</strong>, for photos and videos you uploaded from this phone, and <strong>Modified</strong> when the phone recorded a change.</li>
  <li><strong>Camera</strong>: the camera or phone that took a photo, when the photo recorded it.</li>
  <li><strong>Saved in</strong>: the folder it is in, such as <strong>Drive / Camera Uploads</strong>.</li>
  <li><strong>On this phone</strong>: where the original is on this phone, such as <strong>DCIM / Camera / IMG_0001.jpg</strong>, for photos and videos uploaded from here that are still in your gallery. Tap it to open the original in your gallery.</li>
</Unordered>

<Screenshot src="/img/mobile/drive/info.png" alt="The Info sheet for a photo" dark raw phone />

## Starred {#starred}

Star the files, folders and drives you come back to, and find them all in one place.

<Unordered>
  <li>Press and hold a file or folder and choose <strong>Star</strong>.</li>
  <li>For the folder you are in, choose <strong>Star</strong> in the <strong>…</strong> menu.</li>
  <li>For a whole drive, choose <strong>Star</strong> in its menu on the Drive screen. A drive someone shared with you is starred from inside it, with the <strong>…</strong> menu.</li>
  <li>In the preview, it is in the same menu as Download.</li>
</Unordered>

A starred item shows a small star beside its name. Choose **Unstar** to take it off again. Your stars belong to your account, so they are the same in the mobile app, the [desktop app](/use/desktop/drive#starred) and the [Hippius Console](/use/console/drive#starred). In a drive someone shared with you, your stars are your own: the other members don't see them.

**Starred** on [Overview](/use/mobile/getting-started#overview) shows the items you starred. Tap its arrow to open the **Starred** screen, which lists them all:

<Unordered>
  <li><strong>Search</strong> finds items by name.</li>
  <li>The <strong>…</strong> menu switches between grid and list view and changes the sort, the same way as in Drive.</li>
  <li>Pull down to refresh.</li>
  <li>Tap a folder or drive to open it, or a file to preview it. Press and hold for the same options as in Drive, or choose <strong>Select</strong> in the <strong>…</strong> menu to act on several at once.</li>
  <li>An item in a drive someone shared with you offers <strong>Open</strong>, <strong>Get info</strong> and <strong>Unstar</strong>.</li>
</Unordered>

<Screenshot src="/img/mobile/drive/starred.png" alt="The Starred screen with starred folders and files" dark raw phone />

You can star up to 1,000 items. Deleting a starred item takes it off the list.

## Offline files {#offline-files}

Keep files and folders on this phone so they open without a connection, such as on a plane or wherever the signal drops.

<Ordered>
  <li>Press and hold a file or folder.</li>
  <li>Switch on <strong>Available offline</strong>.</li>
</Ordered>

<Screenshot src="/img/mobile/drive/offline-menu.png" alt="The press-and-hold menu with Available offline switched on" dark raw phone />

The switch is also in the preview's menu. For several items at once, choose **Select** in the **…** menu, tap the items, then choose **Available offline** under **⋯** in the bar at the bottom.

The download starts straight away, on Wi-Fi or mobile data. While it downloads, the item shows its progress. Once it is on this phone, it shows a small green arrow.

<Unordered>
  <li><strong>A folder</strong> brings everything in it, and files added to it later are downloaded too. An item inside a kept folder shows its switch on but greyed out, with <strong>Kept with</strong> and the folder's name. Switch the folder off to remove it.</li>
  <li><strong>Only your own drives</strong> can be kept offline. Items in a drive someone shared with you don't offer the switch.</li>
  <li><strong>Copies stay encrypted</strong> on this phone, as they are in your Drive, and are only unlocked when you open them in the app. They aren't included in your phone's backups.</li>
</Unordered>

### Keeping them up to date {#offline-updates}

When a kept file changes in your Drive, the copy on this phone is updated by itself, on Wi-Fi. To update on mobile data too, turn on [Use cellular data](/use/mobile/settings#offline-files).

A yellow **!** on an item means its copy is out of date, or didn't finish downloading. Tap the **!**, or choose **Update offline copy** in the item's menu.

If a kept file is renamed or deleted somewhere else, it is taken off this phone. To keep a renamed file, switch it on again under its new name.

### The Offline screen {#the-offline-screen}

**Offline** is the last section on [Overview](/use/mobile/getting-started#overview). Tap its arrow to see everything kept on this phone, with the space it takes and whether it is **Up to date**:

<Unordered>
  <li>Tap a folder to browse it, or a file to open it.</li>
  <li>The <strong>…</strong> menu switches between grid and list view and changes the sort.</li>
  <li>Press and hold an item for its options, such as switching <strong>Available offline</strong> off.</li>
</Unordered>

<Screenshot src="/img/mobile/drive/offline.png" alt="The Offline screen with the space used and the files kept on this phone" dark raw phone />

Before you keep anything, the section offers **Show me how**, a short animation of the steps.

### With no connection {#no-connection}

A **No internet connection** banner shows under the header. Tap it to go to your offline files. Drive and search show the files you kept, and they open as usual.

A file that isn't kept on this phone, and that you haven't opened recently, can't open until you are back online. Next time, make it available offline before you go.

### Removing offline files {#removing-offline-files}

Switch **Available offline** off on an item to remove its copy from this phone. To remove them all at once, use [Remove all offline files](/use/mobile/settings#offline-files) in Settings. Either way, your files stay in your Drive.

When you log out, your offline files stay on this phone but are locked. They open again when you sign back in with the same account. If this phone is [unlinked](/use/mobile/settings#devices), they are deleted from it.

## Organising

Press and hold any file or folder for its options:

<Unordered>
  <li><strong>Open</strong> for a file, or <strong>Browse Files</strong> for a folder.</li>
  <li><strong>Get info</strong>. See <a href="#file-details">File details</a>.</li>
  <li><strong>Rename</strong>. See <a href="#renaming">Renaming</a>.</li>
  <li><strong>Move to…</strong>, to put it in another folder.</li>
  <li><strong>Download</strong>, for files. See <a href="#saving-a-file-to-your-phone">Saving a file to your phone</a>.</li>
  <li><strong>Star</strong> or <strong>Unstar</strong>. See <a href="#starred">Starred</a>.</li>
  <li><strong>Available offline</strong>, and <strong>Update offline copy</strong> when a kept copy is out of date. See <a href="#offline-files">Offline files</a>.</li>
  <li><strong>Share via Link</strong>. See <a href="/use/mobile/shared-links">Sharing Files</a>.</li>
  <li><strong>Delete File</strong> or <strong>Delete Folder</strong>. See <a href="#deleting">Deleting</a>.</li>
</Unordered>

Files that are still uploading have no options until they finish. Items you have shared from this phone show a small **link** badge. Tap it to see or revoke that link.

<Screenshot src="/img/mobile/drive/item-menu.png" alt="The press-and-hold menu on a file" dark raw phone />

### Renaming {#renaming}

<Ordered>
  <li>Press and hold the item and choose <strong>Rename</strong>. For the folder you are in, use <strong>Rename</strong> in the <strong>…</strong> menu.</li>
  <li>Type the new name. The part before the extension is already selected.</li>
  <li>Tap <BgStyledText>Rename</BgStyledText>.</li>
</Ordered>

If you change a file's extension, the app warns that it may open in a different app.

A name can't:

<Unordered>
  <li>be empty, or be just <code>.</code> or <code>..</code></li>
  <li>start with a dot</li>
  <li>contain <code>/</code>, <code>{'\\'}</code> or <code>:</code>, or end with a dot</li>
  <li>be a name your computer reserves for itself, such as CON, PRN, AUX, NUL, COM1 to COM9 or LPT1 to LPT9</li>
  <li>be longer than 255 bytes</li>
</Unordered>

**Top-level folders can't be renamed** on mobile. Folders inside them, and files, can. If the app says **Renaming isn't available for this login**, unlock your account with your [unlock password](/use/mobile/settings#unlocking) first.

### Selecting several items {#selecting-several-items}

<Ordered>
  <li>Open the <strong>···</strong> menu and choose <strong>Select</strong>.</li>
  <li>Tap the items you want. The bar at the bottom counts them, such as <strong>3 Items</strong>.</li>
  <li>Use the bar at the bottom: <strong>Move</strong>, <strong>Share</strong>, or the red <strong>trash</strong> button to delete them. Under <strong>⋯</strong> are <strong>Download</strong>, <strong>Star</strong> and <strong>Available offline</strong>.</li>
  <li>Tap the <strong>X</strong> to stop selecting.</li>
</Ordered>

### Deleting {#deleting}

Press and hold an item and choose **Delete File** or **Delete Folder**, or select several and tap the trash button. The app asks you to confirm, for example **Are you sure you want to delete "Holiday.jpg"?**, then shows its progress, such as **Deleting 2/5…**.

:::warning Deletes are permanent
There is no bin. A deleted file can't be recovered, and deleting a folder deletes everything in it. You can turn the confirmation off with [Confirm before deleting](/use/mobile/settings#confirm-before-deleting), but deleting stays permanent either way.
:::

## Where to next

<Unordered>
  <li><a href="/use/mobile/shared-links">Sharing Files</a>: send a file or folder to someone without a Hippius account.</li>
  <li><a href="/use/mobile/camera-uploads">Camera Uploads</a>: back up your photos automatically.</li>
  <li><a href="/use/mobile/plans">Plans and Storage</a>: how much space you have, and how to get more.</li>
</Unordered>
