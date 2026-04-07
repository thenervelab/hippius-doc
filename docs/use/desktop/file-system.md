---
id: file-system
title: File System
sidebar_label: File System
slug: /use/desktop/file-system
description: 5
---

import Ordered from '@site/src/components/Ordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Icon from '@site/src/components/Icon';

## Introduction

The Hippius File System is one of our core innovations, offering a unique, decentralized approach to storage. Designed to be efficient and accessible, it was built with a strong focus on security and privacy. All files are encrypted on your device before syncing to the Hippius network, so only you can read them.

The desktop app supports **multi-folder sync**, allowing you to sync multiple folders from your device simultaneously. Each folder syncs independently and can be managed, paused, or removed individually.

## Uploading Files

Files uploaded to Hippius are automatically added to your sync folder and encrypted for security. This ensures your data remains private and protected.

<Ordered>
  <li>Click on <BgStyledIconWithText text="Files" icon="DocumentText" /> in the sidebar.</li>
  <li>Click the <BgStyledText>Upload File</BgStyledText> button.</li>
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
  <li>Click on <BgStyledIconWithText text="Files" icon="DocumentText" /> in the sidebar.</li>
  <li>Click the <BgStyledText>Add Folder</BgStyledText> button.</li>
  <li>If you have multiple sync folders, select the destination folder from the dropdown.</li>
  <li>Select the folder you want to upload from your device.</li>
  <li>Click <BgStyledText>Upload Folder</BgStyledText> in the modal to start the upload process.</li>
</Ordered>

A toast notification will confirm: **"Folder added. Your sync will start soon."**

## Browsing Files

The Files page shows all your synced files and folders. You can navigate through your folder structure by clicking on folders.

### Folder Tabs

When you have **two or more sync folders**, a tab bar appears at the top of the Files page:

- **All**: Displays files from every synced folder
- **Individual folder tabs**: Shows files from that specific folder only

![Files page with folder tabs](/img/desktop/sync-folder-tabs.png)

### File Actions (Context Menu)

Right click any file or folder (or click the <BgStyledIconWithText icon="More" paddingClassName="px-1 py-1" /> menu) to access the full set of actions:

| Action | Applies To | Description |
|---|---|---|
| **Open** | Folders | Navigate into the folder |
| **Download** | Files | Download the file to your local device |
| **View** | Images, Videos, PDFs | Open in the built-in media viewer |
| **Reveal in Finder / Explorer** | Files & Folders | Show the item in your operating system's file manager |
| **File Details / Folder Details** | Files & Folders | View detailed metadata (size, type, modified date, sync status) |
| **View on Explorer** | Uploaded files | Open the file's Arion Hash tracker on hipstats.com |
| **Delete** | Files & Folders | Remove the item (disabled while actively syncing) |

![File context menu](/img/desktop/file-context-menu.png)

:::tip
Pictures, videos, and PDFs open directly in the desktop app's built-in viewer. Other file types will open in your default system application.
:::

### View Modes

The Files page supports two display layouts:

- **List View**: A traditional table format showing file name, size, modified date, and sync status in columns
- **Card View**: A grid layout with file thumbnails for quick visual browsing

Toggle between views using the view mode buttons at the top of the Files page. Your selection is remembered across sessions.

![File view modes](/img/desktop/file-view-modes.png)

### Creating Folders

You can create new folders directly within your sync folders:

<Ordered>
  <li>Navigate to the location where you want to create a folder.</li>
  <li>Click the <BgStyledText>Create Folder</BgStyledText> button.</li>
  <li>Enter a name for the new folder.</li>
  <li>Click <BgStyledText>Create</BgStyledText> to confirm.</li>
</Ordered>

The new folder appears immediately and will be synced to the Hippius network on the next sync cycle.

## Sync Progress

Whenever files are syncing, a **progress widget** appears in the bottom-right corner of the app. It provides real-time feedback on sync operations.

### Collapsed View

The widget shows a compact circular progress indicator with the current sync percentage and a status icon:

- **Spinner**: Files are actively syncing
- **Checkmark**: Sync completed successfully
- **Error icon**: Some files failed to sync
- **X icon**: Disconnected from sync network

![Sync widget collapsed](/img/desktop/sync-widget-collapsed.png)

### Expanded View

Click the widget to expand it and see detailed information:

- **Status banner**: Summary like "5 synced, 2 deleted" or "3 files failed to sync"
- **Overall progress bar**: With byte counters showing uploaded/total
- **File list**: Up to 20 files showing individual status and progress

![Sync widget expanded](/img/desktop/sync-widget-expanded.png)

The widget auto-dismisses when sync completes. If there are errors, you can close it manually after reviewing the results.

## Conflict Resolution

When the same file has been modified on multiple devices or both locally and remotely, **sync conflicts** may arise. Hippius detects these automatically and gives you full control over how to resolve them.

### Conflict Detection

When conflicts are detected during a sync cycle, a **conflict banner** appears at the top of the Files page:

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

| Resolution | What It Does |
|---|---|
| **Keep Local** | Use your local version of the file |
| **Accept Remote** | Replace your local file with the remote version |
| **Keep Both** | Create a renamed copy of your local file (e.g., `file_conflict_...`) and accept the remote version |
| **Skip** | Do nothing, leave the file unresolved for now |


You can use the <BgStyledText>Apply All</BgStyledText> buttons to apply the same resolution to all conflicts at once. The <BgStyledText>Sync Now</BgStyledText> button remains disabled until every conflict has a resolution selected.

### Conflict Types

Hippius identifies the following conflict scenarios:

| Conflict Type | Description |
|---|---|
| **Both modified** | The file was changed on both your device and another device |
| **Modified locally, deleted remotely** | You edited the file, but it was deleted on another device |
| **Deleted locally, modified remotely** | You deleted the file, but it was changed on another device |
| **Both created** | The same file was created independently on multiple devices |

## Stop and Resume Syncing

You can stop syncing for individual folders at any time. When syncing is stopped:

- Files in the folder will **not** be uploaded or downloaded
- Your local files remain on your device untouched
- A **"Syncing is stopped"** alert appears on the Dashboard and Files pages when all sync folders are stopped
- You will see an **alert dialog** if you try to add files to a folder with stopped sync

### Stopping Sync

<Ordered>
  <li>Go to <BgStyledIconWithText text="Settings" icon="Settings" /> in the sidebar.</li>
  <li>In the <strong>Sync & Storage</strong> section, find the folder you want to stop.</li>
  <li>Click <BgStyledText>Stop Syncing</BgStyledText> (or select <strong>Pause Sync</strong> from the folder menu).</li>
  <li>Confirm in the dialog that appears.</li>
</Ordered>

![Stop sync dialog](/img/desktop/stop-sync-dialog.png)

### Resuming Sync

<Ordered>
  <li>Go to <BgStyledIconWithText text="Settings" icon="Settings" /> in the sidebar.</li>
  <li>Click <BgStyledText>Start Syncing</BgStyledText> next to the stopped folder.</li>
  <li>Syncing will resume and your files will be synchronized again.</li>
</Ordered>

:::tip
If the sync stopped alert appears on the Dashboard or Files page, click the <BgStyledText>Start Syncing</BgStyledText> button in the alert to resume quickly.
:::

## Connectivity Status

The app monitors your connection to the Hippius sync network and displays alerts when connectivity changes:

- **Connected**: Sync is operating normally
- **Reconnecting**: Temporarily lost connection, attempting to reconnect
- **Disconnected**: Unable to reach the sync network. Files will sync when connection is restored

