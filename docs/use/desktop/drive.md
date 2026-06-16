---
id: drive
title: Drive
sidebar_label: Drive
slug: /use/desktop/drive
description: Manage your Drive in Hippius Desktop — sync folders across your devices, upload and browse files, search your whole account, and keep everything end-to-end encrypted.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Icon from '@site/src/components/Icon';

## Introduction

Your **Drive** is where your files live in Hippius Desktop. It is powered by the Hippius File System, a distributed approach to storage built with a strong focus on security and privacy. All files are encrypted on your device before syncing to the Hippius network, so only you can read them.

The desktop app supports **multi-folder sync**, allowing you to sync multiple folders from your device simultaneously. Each folder syncs independently and can be managed, paused, or removed individually.

## Encryption {#encryption}

Hippius uses end-to-end encryption to protect your files. Every file is encrypted on your device before it leaves your machine, so the Hippius network only ever stores ciphertext that no one else can read.

### How It Works

When you sign in for the first time, the app prompts you to set an **unlock password**. This password is used to derive a cryptographic key from your mnemonic seed. That key encrypts and decrypts every file in your sync folders.

<Ordered>
  <li>Files are encrypted <strong>locally</strong> on your device before upload.</li>
  <li>Files are decrypted <strong>locally</strong> on your device after download.</li>
  <li>The Hippius network and servers never see your plaintext data.</li>
</Ordered>

You do not need to set a separate encryption password. Your unlock password handles both file encryption and account recovery automatically.

:::danger Important
Your unlock password cannot be recovered. If you forget it, you will need your mnemonic seed to restore access to your files. Store both your password and mnemonic seed safely.
:::

### What the Unlock Password Does

Your unlock password serves multiple purposes:

| Purpose                 | Description                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------- |
| **File encryption**     | Encrypts and decrypts files on your device during sync                                |
| **Multi-device access** | Lets you access your files when you log in on a new device                            |
| **Console access**      | Lets you preview and download files on [Hippius Console](https://console.hippius.com) |

The app sets up encryption automatically using your unlock password, so you only need to remember one password for everything.

:::info When is the unlock password required?

<Unordered>
  <li><strong>First login</strong>: The app prompts you to set your unlock password right after signing in for the first time.</li>
  <li><strong>New device</strong>: The app asks for your unlock password to decrypt your files on the new device.</li>
  <li><strong>Hippius Console</strong>: Enter your unlock password to preview or download files from the web.</li>
</Unordered>
:::

## Unlock Password {#unlock-password}

The unlock password is the single password that protects your encrypted files, both on your device and across all other devices and [Hippius Console](https://console.hippius.com).

### How It Works

When you set your unlock password, the app uses it to encrypt your files locally and also creates an encrypted backup of your account key on the server. This backup can only be decrypted with your unlock password, so no one else can access it.

When you log in on a new device, the app asks for your unlock password to decrypt this backup and set up your files. On Hippius Console, the same password lets you preview and download your files directly from the web. Without the password, the encrypted backup remains locked and your files stay inaccessible.

### Setting Your Unlock Password

The app prompts you to set your unlock password on your first sign-in. This is required before you can use the app.

![Set unlock password dialog](/img/desktop/settings/set-unlock-password-dialog.png)

<Ordered>
  <li>Enter a strong password (minimum 8 characters).</li>
  <li>Confirm the password.</li>
  <li>Click <BgStyledText>Save password</BgStyledText>.</li>
</Ordered>

Once set, file encryption is configured automatically. You can start adding sync folders right away without any additional setup.

### Changing Your Unlock Password

You can change your unlock password at any time from Settings.

![Change unlock password dialog](/img/desktop/change-unlock-password-dialog.png)

<Ordered>
  <li>Go to <BgStyledIconWithText text="Settings" icon="Settings" /> → <BgStyledIconWithText text="Security" icon="SecuritySafe" />.</li>
  <li>Click <BgStyledText>Change Unlock Password</BgStyledText>.</li>
  <li>Enter your current password.</li>
  <li>Choose a new password and confirm it.</li>
  <li>Click <BgStyledText>Change password</BgStyledText>.</li>
</Ordered>

Changing the password re-encrypts the sealed backup on the server. Your mnemonic seed and encrypted files are not affected. Your desktop app access continues to work normally regardless of this change.

## Uploading Files

Files uploaded to Hippius are automatically added to your sync folder and encrypted for security. This ensures your data remains private and protected.

<Ordered>
  <li>Click on <BgStyledIconWithText text="Drive" icon="Category" /> in the sidebar.</li>
  <li>Click the <BgStyledText>+ New File</BgStyledText> button.</li>
  <li>If you have multiple sync folders, select the destination folder from the <strong>Upload to folder</strong> dropdown.</li>
  <li>Drag and drop or click to select one or more files to upload.</li>
  <li>Click the <BgStyledText>Upload File</BgStyledText> button in the modal to start the upload process.</li>
</Ordered>

![Upload file modal](/img/desktop/upload-file-with-folder-select.png)

:::info Private & Encrypted
All files uploaded are stored privately and encrypted. Files are added to your sync folder and secured automatically.
:::

:::warning Sync Must Be Active
If syncing is stopped for a folder, you will be prompted to resume syncing from **Settings → Sync & Storage** before you can upload files. An alert will appear if you try to add files to a stopped folder.
:::

## Uploading Folders

You can upload entire folders to Hippius. Like individual files, folders are encrypted and synced securely.

<Ordered>
  <li>Click on <BgStyledIconWithText text="Drive" icon="Category" /> in the sidebar.</li>
  <li>Click the <BgStyledText>+ New Folder</BgStyledText> button.</li>
  <li>If you have multiple sync folders, select the destination folder from the dropdown.</li>
  <li>Click <BgStyledText>Select Folder</BgStyledText> and choose the folder you want to upload from your device.</li>
  <li>Click <BgStyledText>Upload Folder</BgStyledText> in the modal to start the upload process.</li>
</Ordered>

A toast notification will confirm: **"Folder added. Your sync will start soon."**

## Browsing Files

The Drive page shows the files and folders in your active sync folder. You can navigate through your folder structure by clicking on folders, and the breadcrumb at the top of the page tracks your location.

### Switching Between Sync Folders

Hippius Desktop shows one sync folder at a time. The folder you are currently viewing appears in the breadcrumb (for example, **Local › my-folder**), and your selection is remembered the next time you open the app.

When you have more than one sync folder, switch between them from the **Local** view:

<Ordered>
  <li>Click <BgStyledText>Local</BgStyledText> in the breadcrumb to open the Local view.</li>
  <li>Under <strong>Local Sync Folders</strong>, click the folder you want to view.</li>
  <li>The Drive page opens that folder, and the breadcrumb updates to show your location.</li>
</Ordered>

![The Local view showing the synced folder cards used to switch between folders](/img/desktop/switching-between-sync-folders.png)

### File Actions (Context Menu)

Right click any file or folder (or click the <BgStyledIconWithText icon="More" paddingClassName="px-1 py-1" /> menu) to access the full set of actions:

| Action                            | Applies To           | Description                                                     |
| --------------------------------- | -------------------- | --------------------------------------------------------------- |
| **Open**                          | Folders              | Navigate into the folder                                        |
| **Download**                      | Files & Folders      | Download the item to your local device                          |
| **View**                          | Images, Videos, PDFs | Open in the built-in media viewer                               |
| **Retry sync**                    | Failed files         | Re-attempt syncing a file that failed to sync                   |
| **Reveal in Finder**              | Files & Folders      | Show the item in your operating system's file manager           |
| **File Details / Folder Details** | Files & Folders      | View detailed metadata (size, type, modified date, sync status) |
| **View on Explorer**              | Uploaded files       | Open the file's Arion Hash tracker on hipstats.com              |
| **Share via link**                | Synced files         | Create a shareable link to the file                             |
| **Rename**                        | Files & Folders      | Rename the item on this device; the change syncs to the network |
| **Delete**                        | Files & Folders      | Remove the item (disabled while syncing)                        |

![File context menu](/img/desktop/file-context-menu.png)

:::tip
Pictures, videos, and PDFs open directly in the desktop app's built-in viewer. Other file types will open in your default system application.
:::

### Renaming Files and Folders

You can rename any file or folder that is fully synced on this device. Renaming happens on disk and the change is propagated to the Hippius network as a true rename on the next sync cycle, so the item keeps its place across all your devices.

<Ordered>
  <li>Right click the file or folder (or open the <BgStyledIconWithText icon="More" paddingClassName="px-1 py-1" /> menu) and select <BgStyledText>Rename</BgStyledText>.</li>
  <li>In the <strong>Rename File</strong> (or <strong>Rename Folder</strong>) dialog, edit the name. The field is prefilled with the current name, and for files the extension is left out of the selection so typing replaces only the name part.</li>
  <li>Click <BgStyledText>Rename</BgStyledText> to confirm.</li>
</Ordered>

![Rename file dialog](/img/desktop/rename-file-dialog.png)

The name is validated as you type. A name cannot be empty, contain `/`, `\`, or `:`, end with a `.`, use an operating-system reserved name, or exceed 255 bytes. If you change a file's extension, the dialog warns that the file may open in a different app.

:::info When can I rename an item?
The <strong>Rename</strong> action is only available for items that are synced and present on this device. It is disabled while a file is uploading, downloading, or failed, and for cloud-only items that exist on another device but are not synced here. Wait for sync to finish and try again.
:::

### View Modes

The Drive page supports two display layouts:

<Unordered>
  <li><strong>List View</strong>: A traditional table format showing file name, size, modified date, and sync status in columns.</li>
  <li><strong>Card View</strong>: A grid layout with file thumbnails for quick visual browsing.</li>
</Unordered>

Toggle between views using the view mode buttons at the top of the Drive page. Your selection is remembered across sessions.

![File view modes](/img/desktop/file-view-modes.png)

### Creating Folders

To add a folder to a sync folder, you can:

<Unordered>
  <li>Upload an existing folder with <BgStyledText>+ New Folder</BgStyledText> (see <a href="#uploading-folders">Uploading Folders</a> above).</li>
  <li>Create the folder inside your synced folder using your operating system's file manager, then add files to it — they sync to the Hippius network automatically on the next sync cycle.</li>
</Unordered>

## Searching Your Files

Hippius Desktop offers two ways to find files, depending on whether you want to search the folder you're in or your entire account.

### Search within a folder

The **Search file** box at the top of the Drive page searches the sync folder you are currently viewing, including all of its nested subfolders — not just the rows currently on screen.

<Ordered>
  <li>Open the sync folder you want to search.</li>
  <li>Type in the <BgStyledText>Search file</BgStyledText> box at the top-right of the file list.</li>
  <li>Results update as you type. Combine it with the <strong>File Type</strong>, <strong>Size</strong>, and <strong>Date Range</strong> filters to narrow down further.</li>
</Ordered>

![In-folder search on the Drive page](/img/desktop/drive-search-folder.png)

### Search across everything

The **Search Files** box at the top of the sidebar opens a global search palette that queries the Hippius server directly. It searches your **entire account** — every sync folder and files uploaded from any device — so it can find files even when they aren't synced to this computer.

<Ordered>
  <li>Click <BgStyledText>Search Files</BgStyledText> in the sidebar, or press <strong>Ctrl + F</strong> (<strong>⌘ + F</strong> on macOS) from anywhere in the app.</li>
  <li>With the box empty, the palette shows your <strong>Last uploads</strong> for quick access.</li>
  <li>Start typing to search your whole account. Use <strong>↑</strong> / <strong>↓</strong> to move between results and <strong>Enter</strong> to open the highlighted file; press <strong>Esc</strong> to close.</li>
</Ordered>

![Global search palette opened from the sidebar](/img/desktop/drive-search-global.png)

:::tip
Use the in-folder **Search file** box when you know which folder a file lives in, and the global **Search Files** palette (Ctrl / ⌘ + F) to find a file anywhere in your account — including files uploaded from your other devices.
:::

## Sync Progress

Whenever files are syncing, the **Sync Queue** widget appears in the **sidebar footer**, at the bottom-left of the app. It provides real-time feedback on sync operations.

The widget header always shows the **overall progress** — a percentage and progress bar with a live status, such as the current transfer speed while syncing or **Complete** when finished. By default the widget is collapsed, showing only this header. Hover the progress bar for more detail, including the estimated time remaining and a count of files synced.

### Expanded View

Click the **Sync Queue** header (or the chevron) to reveal the file list. Each row shows:

<Unordered>
  <li><strong>File name and icon</strong></li>
  <li><strong>Size or transfer progress</strong> — for example, <code>1.2 MB / 4.5 MB</code> while a file is transferring</li>
  <li><strong>Status badge</strong> — <strong>Pending</strong>, <strong>Encrypting</strong>, a live percentage, <strong>Synced</strong>, <strong>Downloaded</strong>, <strong>Deleted</strong>, or <strong>Error</strong></li>
</Unordered>

![Sync Queue widget expanded](/img/desktop/syncing-progress-widget.png)

### Minified View

Click the **✕** to shrink the widget into a compact circular progress ring that keeps tracking progress:

<Unordered>
  <li><strong>Percentage arc</strong>: Files are actively syncing</li>
  <li><strong>Checkmark</strong>: Sync completed successfully</li>
  <li><strong>Red ring</strong>: Some files failed to sync</li>
</Unordered>

Click the ring to restore the full widget. The ring also appears whenever the sidebar is collapsed.

![Sync Queue minified progress ring](/img/desktop/sync-progress-minified.png)

:::tip
Dismissing the widget with **✕** does not stop syncing — it only minimizes the widget to the progress ring. The full card reopens automatically when a new sync starts.
:::

## Conflict Resolution

When the same file has been modified on multiple devices or both locally and remotely, **sync conflicts** may arise. Hippius detects these automatically and gives you full control over how to resolve them.

### Conflict Detection

When conflicts are detected during a sync cycle, a **conflict banner** appears at the top of the Drive page:

> **"X file conflict(s) detected during sync."**

Click <BgStyledText>Review & Resolve</BgStyledText> to open the Staged Changes dialog, or click the dismiss icon to skip the review and let sync continue with default behavior.

### Reviewing Staged Changes

The **Staged Changes** dialog organizes pending sync operations into clear sections:

<Ordered>
  <li><strong>Upload</strong> — Files that will be uploaded to the server</li>
  <li><strong>Download</strong> — Files that will be downloaded from the server</li>
  <li><strong>Delete Locally</strong> — Files that will be removed from your device</li>
  <li><strong>Delete from Server</strong> — Files that will be removed remotely</li>
  <li><strong>Conflicts</strong> — Files with conflicting changes that require your decision</li>
</Ordered>

### Resolving Conflicts

For each conflicting file, choose a resolution from the dropdown:

| Resolution        | What It Does                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| **Keep Local**    | Use your local version of the file                                                                 |
| **Accept Remote** | Replace your local file with the remote version                                                    |
| **Keep Both**     | Create a renamed copy of your local file (e.g., `file_conflict_...`) and accept the remote version |
| **Skip**          | Do nothing, leave the file unresolved for now                                                      |

You can use the <BgStyledText>Apply to all</BgStyledText> buttons to apply the same resolution to all conflicts at once. The <BgStyledText>Sync Now</BgStyledText> button remains disabled until every conflict has a resolution selected.

### Conflict Types

Hippius identifies the following conflict scenarios:

| Conflict Type                          | Description                                                 |
| -------------------------------------- | ----------------------------------------------------------- |
| **Both modified**                      | The file was changed on both your device and another device |
| **Modified locally, deleted remotely** | You edited the file, but it was deleted on another device   |
| **Deleted locally, modified remotely** | You deleted the file, but it was changed on another device  |
| **Both created**                       | The same file was created independently on multiple devices |

## Pause and Resume Syncing

You can pause syncing for individual folders at any time. When a folder's sync is paused:

<Unordered>
  <li>Files in the folder are <strong>not</strong> uploaded or downloaded.</li>
  <li>Your local files remain on your device untouched.</li>
  <li>The folder shows a <strong>Paused</strong> status on its card.</li>
  <li>You can resume syncing at any time.</li>
</Unordered>

You can manage this from either the **Drive** page's **Local** view or **Settings → Sync & Storage** — both surfaces list your sync folders and share the same actions.

### Pausing Sync

<Ordered>
  <li>Open the <strong>Local</strong> view (click <BgStyledText>Local</BgStyledText> in the breadcrumb on the Drive page) or go to <BgStyledIconWithText text="Settings" icon="Settings" /> → <strong>Sync & Storage</strong>.</li>
  <li>Find the folder you want to pause under <strong>Local Sync Folders</strong>.</li>
  <li>Select <BgStyledText>Pause Sync</BgStyledText> from the folder's menu.</li>
  <li>Confirm in the <strong>Pause Sync</strong> dialog that appears.</li>
</Ordered>

![Pause sync dialog](/img/desktop/pause-sync-dialog.png)

### Resuming Sync

<Ordered>
  <li>Open the <strong>Local</strong> view or go to <BgStyledIconWithText text="Settings" icon="Settings" /> → <strong>Sync & Storage</strong>.</li>
  <li>Find the paused folder and select <BgStyledText>Resume Sync</BgStyledText>.</li>
  <li>Syncing resumes and your files are synchronized again.</li>
</Ordered>

:::tip
The **Pause Sync** and **Resume Sync** actions are available on both the **Drive** page's **Local** view and the **Settings → Sync & Storage** page, so you can manage syncing wherever is convenient.
:::

## Connectivity Status

The app monitors your connection to the Hippius sync network and displays alerts when connectivity changes:

<Unordered>
  <li><strong>Connected</strong>: Sync is operating normally.</li>
  <li><strong>Reconnecting</strong>: Temporarily lost connection, attempting to reconnect.</li>
  <li><strong>Disconnected</strong>: Unable to reach the sync network. Files will sync when connection is restored.</li>
</Unordered>
