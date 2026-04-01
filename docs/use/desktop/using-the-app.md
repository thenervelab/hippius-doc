---
id: using-the-app
title: Using the App
sidebar_label: Using the App
slug: /use/desktop/using-the-app
---

import Ordered from '@site/src/components/Ordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Icon from '@site/src/components/Icon';

## Get Started with the App

<Ordered>
  <li>Click the <Icon /> icon to open the app.</li>
  <li>On the login screen, choose one of the available login methods: <BgStyledText>Continue with Google</BgStyledText>, <BgStyledText>Continue with GitHub</BgStyledText>, <BgStyledText>Continue with Apple</BgStyledText>, or <BgStyledText>Continue with Access Key</BgStyledText>.</li>
  <li>For <strong>Google</strong>, <strong>GitHub</strong>, or <strong>Apple</strong>, you will be redirected to the provider's login page in your browser. Once authenticated, you will be returned to the app automatically.</li>
  <li>For <strong>Access Key</strong>, enter your 12-word recovery phrase and click <BgStyledText>Log In</BgStyledText>.</li>
</Ordered>


![Google, Continue with GitHub, Continue with Apple, and Continue with Access Key Login Screen](/img/desktop/login-screen.png)

:::tip
If you are a new user, your account will be created automatically when you sign in for the first time. No separate sign up step is required.
:::

## Onboarding

After signing in for the first time, you will be guided through a **3-step onboarding wizard** that introduces the key features of Hippius Desktop:

<Ordered>
  <li><strong>Welcome to Hippius</strong>: Overview of the platform's core capabilities including fast sync, encryption, multi-folder sync, conflict resolution, and the modern interface.</li>
  <li><strong>Multi-Folder Sync</strong>: Learn how to sync multiple folders at once with automatic encryption, sync from other devices, and custom device naming.</li>
  <li><strong>Recovery Phrase</strong>: Understand the importance of your recovery phrase and how to back it up securely. Tips include writing it on paper, storing it safely, never sharing it, and keeping copies in multiple places.</li>
</Ordered>

You can click <BgStyledText>Skip</BgStyledText> at any time to bypass the remaining onboarding steps. Use the <BgStyledText>Previous</BgStyledText> and <BgStyledText>Next</BgStyledText> buttons to navigate between steps. On the final step, click <BgStyledText>Continue</BgStyledText> to enter the app.

![The onboarding wizard showing the "Get Started" screen with bullet points and the left panel illustration](/img/desktop/onboarding-welcome.png)

## Set Up Your First Sync Folder

When you first navigate to the **Files** page, you will see the sync setup screen. This screen lets you add local folders to sync and also shows any folders already synced from your other devices.

<Ordered>
  <li>Click the <BgStyledText>Add Folder</BgStyledText> button under <strong>Local Sync Folders</strong>.</li>
  <li>Select any folder from your device using the file picker.</li>
  <li>On first setup, the <strong>Encryption Password</strong> dialog will appear. Enter a strong password (minimum 8 characters) and confirm it.</li>
  <li>Once confirmed, your folder is added and syncing begins automatically.</li>
</Ordered>

![The FilesOnboarding screen showing the Local Sync Folders section with the Add Folder button and Sync from Other Devices section](/img/desktop/files-onboarding.png)

![The HcfsSetupDialog showing password and confirm password fields with the warning message](/img/desktop/hcfs-setup-dialog.png)

:::danger Important
Your encryption password cannot be recovered. If you forget it, you will need your recovery phrase (mnemonic) to restore access to your files. Keep both your password and recovery phrase stored safely.
:::

Any files you add to this folder will be encrypted on your device and synced to the Hippius network. You can also skip this step and set up sync later from Settings.

## Adding More Sync Folders

Hippius supports syncing **multiple folders** simultaneously. You can add additional folders from the Settings page at any time.

<Ordered>
  <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" /> in the sidebar.</li>
  <li>In the <strong>Sync & Storage</strong> section, click the <BgStyledText>Add Folder</BgStyledText> button.</li>
  <li>Select the folder you want to sync from your device.</li>
  <li>Click <BgStyledText>Add Folder</BgStyledText> to confirm. Syncing starts automatically.</li>
</Ordered>

![The AddLocalFolderDialog showing folder selection and the Add Folder button ](/img/desktop/add-local-folder-dialog.png)

Each folder syncs independently and shows its own status (**Syncing**, **Paused**, or **Error**).

:::tip
You can manage all your synced folders from the **Settings → Sync & Storage** page. See the [App Settings](settings) guide for full details on pausing, resuming, removing folders, and syncing from other devices.
:::

## Uploading Files

<Ordered>
  <li>Click the <Icon /> icon to open the app.</li>
  <li>Click on <BgStyledIconWithText text="Files" icon="DocumentText" /> in the sidebar.</li>
  <li>Click the <BgStyledText>Upload File</BgStyledText> button.</li>
  <li>If you have multiple sync folders, select the destination folder from the dropdown.</li>
  <li>Drag and drop or click to select one or more files to upload.</li>
  <li>Click <BgStyledText>Upload File</BgStyledText> in the modal to start the upload.</li>
</Ordered>

![The upload dialog showing the folder selector dropdown (visible when 2+ folders exist ](/img/desktop/upload-file-with-folder-select.png)

:::info
If syncing is stopped for a folder, you will see an alert prompting you to resume syncing before files can be uploaded.
:::

## Uploading Folders

<Ordered>
  <li>Click on <BgStyledIconWithText text="Files" icon="DocumentText" /> in the sidebar.</li>
  <li>Click the <BgStyledText>Add Folder</BgStyledText> button.</li>
  <li>If you have multiple sync folders, select the destination folder from the dropdown.</li>
  <li>Select the folder you want to upload from your device.</li>
  <li>Click <BgStyledText>Upload Folder</BgStyledText> in the modal to start the upload.</li>
</Ordered>

## Monitoring Sync Progress

A **sync progress widget** appears in the bottom-right corner of the app whenever files are being synced. It shows real-time progress including:

- Overall sync percentage and progress bar
- Individual file status (uploading, downloading, completed, failed)
- Byte-level progress counters
- Summary of synced and deleted files

![The SyncStatusDialog widget in both collapsed (showing percentage) and expanded (showing file list) states](/img/desktop/sync-progress-widget.png)

Click on the widget to expand it and see the full file list. The widget automatically closes when sync completes, or you can dismiss it manually.

## Drag and Drop

You can drag and drop files directly onto the Files page to upload them. This works both in the root folder and inside subfolders.

<Ordered>
  <li>Navigate to the folder where you want to upload files.</li>
  <li>Drag files from your file manager (Finder on macOS, Explorer on Windows) onto the Files area.</li>
  <li>A drop zone overlay appears. Release to start the upload.</li>
  <li>If you have multiple sync folders, you will be prompted to select the destination folder.</li>
</Ordered>

## Zoom Controls

Hippius Desktop supports keyboard-driven zoom to adjust the interface size. The entire UI scales proportionally, including text, buttons, charts, and spacing.

| Shortcut | Action |
|---|---|
| **Cmd/Ctrl + =** (or **+**) | Zoom in (increase by 10%) |
| **Cmd/Ctrl + -** | Zoom out (decrease by 10%) |
| **Cmd/Ctrl + 0** | Reset to 100% |

The zoom range is **50% to 200%**. Your zoom preference is saved and restored across sessions. A brief percentage indicator appears on screen when you change the zoom level.

:::tip
If the app feels too large or too small for your display, use zoom controls to find your ideal size. The layout adapts gracefully at any zoom level.
:::

## Filtering Files by Folder

When you have two or more sync folders, a **tab bar** appears at the top of the Files page allowing you to filter files by folder.

- **All**: Shows files from all synced folders
- **Individual folder tabs**: Shows files from that specific folder only

![The SyncFolderTabs bar showing the All tab and individual folder tabs](/img/desktop/sync-folder-tabs.png)
