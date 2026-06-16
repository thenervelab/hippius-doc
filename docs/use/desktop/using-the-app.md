---
id: using-the-app
title: Using the App
sidebar_label: Using the App
slug: /use/desktop/using-the-app
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
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

After signing in for the first time, you will be guided through a **5-step onboarding wizard** that introduces the key features of Hippius Desktop:

<Ordered>
  <li><strong>Welcome to Hippius</strong>: Overview of your personal cloud, with files encrypted on your device before upload and distributed across a global network of independent nodes.</li>
  <li><strong>Credits &amp; Billing</strong>: Learn how pay-as-you-go billing works, including top-ups via Stripe or TAO, subscription plans, and how sync simply pauses if you run out of credits.</li>
  <li><strong>Files &amp; Actions</strong>: Browse, preview, and manage files from one place, with right-click actions to download, reveal in Finder, view details, rename, or track files on the Hipstats explorer.</li>
  <li><strong>Unlock Password</strong>: Understand how one unlock password encrypts your files locally and gives you access across all your devices and the web console.</li>
  <li><strong>Mnemonic Seed</strong>: Understand the importance of your mnemonic seed and how to back it up securely. Tips include writing it on paper, storing it safely, never sharing it, and keeping copies in multiple places.</li>
</Ordered>

You can click <BgStyledText>Skip</BgStyledText> at any time to bypass the remaining onboarding steps. Use the <BgStyledText>Back</BgStyledText> and <BgStyledText>Next</BgStyledText> buttons to navigate between steps. On the final step, click <BgStyledText>Start Syncing</BgStyledText> to back up your mnemonic seed and enter the app.

![The onboarding wizard showing the "Welcome to Hippius" screen with the feature highlights and the app preview illustration](/img/desktop/onboarding-welcome.png)

## Set Your Unlock Password

After your first sign-in, the app will prompt you to set an **unlock password**. This password protects your account and encrypts your files.

<Ordered>
  <li>Enter a strong password (minimum 8 characters).</li>
  <li>Confirm the password.</li>
  <li>Click <BgStyledText>Save password</BgStyledText>.</li>
</Ordered>

Once set, the app handles file encryption automatically. You can start adding sync folders without any additional setup. See [Unlock Password](/use/desktop/drive#unlock-password) for more details.

## Set Up Your First Sync Folder

When you first open the **Drive** page, you will see the sync setup screen, known as the **Local** view. It is organized into two sections:

<Unordered>
  <li><strong>Local Sync Folders</strong>: Folders on this device that sync to the Hippius network. This is where you add your first folder.</li>
  <li><strong>Sync from Other Devices</strong>: Folders already synced from your other devices, which you can download and keep in sync on this device.</li>
</Unordered>

To add your first folder:

<Ordered>
  <li>Click the <BgStyledText>Add Folder</BgStyledText> button under <strong>Local Sync Folders</strong>.</li>
  <li>Select any folder from your device using the file picker.</li>
  <li>Your folder is added and syncing begins automatically.</li>
</Ordered>

![The FilesOnboarding screen showing the Local Sync Folders section with the Add Folder button and Sync from Other Devices section](/img/desktop/set-up-your-first-sync-folder.png)

Any files you add to this folder will be encrypted on your device and synced to the Hippius network. Setting up sync here is optional — you can add folders later from Settings or by returning to this screen at any time.

:::info Encryption is automatic
Your unlock password was set during first login, so file encryption is configured automatically. No additional password setup is needed when adding a sync folder.
:::

Once a folder begins syncing, the **Drive** page opens directly into that folder's contents. To return to the sync setup screen, click **Local** in the breadcrumb at the top of the page.

![Folder Contents](/img/desktop/folder-contents.png)

From the **Local** view you can add more sync folders, sync folders from your other devices, and manage existing ones — the same actions available under **Settings → Sync & Storage**. You can therefore manage syncing in whichever way is more convenient: directly from the Drive page, or from Settings.

## Adding More Sync Folders

We support syncing **multiple folders** simultaneously. You can add additional folders at any time from either the **Drive** page or the **Settings** page — both open the same **Add Local Folder** dialog:

<Unordered>
  <li><strong>From the Drive page</strong>: click <BgStyledText>Local</BgStyledText> in the breadcrumb to open the Local view, then click <BgStyledText>Add Folder</BgStyledText> under <strong>Local Sync Folders</strong>.</li>
  <li><strong>From Settings</strong>: click <BgStyledIconWithText text="Settings" icon="Settings" /> in the sidebar, then click <BgStyledText>Add Folder</BgStyledText> in the <strong>Sync & Storage</strong> section.</li>
</Unordered>

In the **Add Local Folder** dialog:

<Ordered>
  <li>Click <BgStyledText>Select Folder</BgStyledText> and choose the folder you want to sync from your device.</li>
  <li>Click <BgStyledText>Add Folder</BgStyledText> to confirm. Syncing starts automatically.</li>
</Ordered>

![Add More Folders ](/img/desktop/add-local-folder.png)

Each folder syncs independently and shows its own status (**Syncing**, **Paused**, or **Error**).

:::tip
You can manage all your synced folders from either the **Drive** page (via the **Local** breadcrumb) or the **Settings → Sync & Storage** page. See the [App Settings](settings) guide for full details on pausing, resuming, removing folders, and syncing from other devices.
:::

## Uploading Files

<Ordered>
  <li>Click the <Icon /> icon to open the app.</li>
  <li>Click on <BgStyledIconWithText text="Drive" icon="Category" /> in the sidebar.</li>
  <li>Click the <BgStyledText>+ New File</BgStyledText> button.</li>
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
  <li>Click on <BgStyledIconWithText text="Drive" icon="Category" /> in the sidebar.</li>
  <li>Click the <BgStyledText>+ New Folder</BgStyledText> button.</li>
  <li>If you have multiple sync folders, select the destination folder from the dropdown.</li>
  <li>Click <BgStyledText>Select Folder</BgStyledText> and choose the folder you want to upload from your device.</li>
  <li>Click <BgStyledText>Upload Folder</BgStyledText> in the modal to start the upload.</li>
</Ordered>

## Monitoring Sync Progress

The **Sync Queue** widget lives in the **sidebar footer**, at the bottom-left of the app. It appears automatically whenever files are being synced and shows real-time progress.

Its header always displays the **overall progress** — a percentage and progress bar with a live status, such as the current transfer speed while syncing or **Complete** when finished. Hover the progress bar for more detail, including the estimated time remaining and a count of files synced.

The widget has three forms:

<Unordered>
  <li><strong>Collapsed</strong> (default): Shows only the <strong>Sync Queue</strong> header with the overall progress bar and status.</li>
  <li><strong>Expanded</strong>: Click the header (or the chevron) to reveal the full file list. Each row shows the file name, its size or byte-level transfer progress, and a status badge such as <strong>Pending</strong>, <strong>Encrypting</strong>, a live percentage, <strong>Synced</strong>, <strong>Downloaded</strong>, or <strong>Error</strong>.</li>
  <li><strong>Minified</strong>: Click the <strong>✕</strong> to shrink the widget into a compact circular progress ring. The ring keeps tracking progress and shows a checkmark when complete; click it to restore the full widget.</li>
</Unordered>

![The Sync Queue widget expanded, showing the per-file list with status badges](/img/desktop/syncing-progress-widget.png)

:::tip
Dismissing the widget with **✕** does not stop syncing — it only minimizes the widget to the progress ring. The ring also appears whenever the sidebar is collapsed, and the full card reopens automatically when a new sync starts.
:::

## Drag and Drop

You can drag and drop files directly onto the **Drive** page to upload them. This works both in the root folder and inside subfolders.

<Ordered>
  <li>Navigate to the folder where you want to upload files.</li>
  <li>Drag files from your file manager (Finder on macOS, Explorer on Windows) onto the file list area.</li>
  <li>A drop zone overlay appears. Release to start the upload.</li>
  <li>If you have multiple sync folders, you will be prompted to select the destination folder.</li>
</Ordered>

## Zoom Controls

Hippius Desktop supports keyboard-driven zoom to adjust the interface size. The entire UI scales proportionally, including text, buttons, charts, and spacing.

| Shortcut                    | Action                     |
| --------------------------- | -------------------------- |
| **Cmd/Ctrl + =** (or **+**) | Zoom in (increase by 10%)  |
| **Cmd/Ctrl + -**            | Zoom out (decrease by 10%) |
| **Cmd/Ctrl + 0**            | Reset to 100%              |

The zoom range is **50% to 200%**. Your zoom preference is saved and restored across sessions. A brief percentage indicator appears on screen when you change the zoom level.

:::tip
If the app feels too large or too small for your display, use zoom controls to find your ideal size. The layout adapts gracefully at any zoom level.
:::

## Switching Between Sync Folders

Hippius Desktop shows one sync folder at a time. The folder you are currently viewing appears in the breadcrumb at the top of the **Drive** page (for example, **Local › my-folder**), and your selection is remembered the next time you open the app.

When you have more than one sync folder, switch between them from the **Local** view:

<Ordered>
  <li>Click <BgStyledText>Local</BgStyledText> in the breadcrumb to open the Local view.</li>
  <li>Under <strong>Local Sync Folders</strong>, click the folder you want to view.</li>
  <li>The Drive page opens that folder, and the breadcrumb updates to show your location.</li>
</Ordered>

![The Local view showing the synced folder cards used to switch between folders](/img/desktop/switching-between-sync-folders.png)

:::tip
To narrow down the files within the folder you are viewing, use the **File Type**, **Size**, and **Date Range** filters or the search box at the top of the Drive page.
:::

## Menu Bar Window

Hippius Desktop keeps a compact **menu bar window** in your system tray (the menu bar on macOS, the notification area on Windows). Click the Hippius tray icon to open it for a quick glance at your account without bringing the full app to the front.


![The Hippius menu bar window showing credits, the notification bell, file search, and recent uploads](/img/desktop/menu-bar-window.png)

The window has four parts:

<Unordered>
  <li><strong>Credits</strong>: your current credit balance, shown in the top left so you can keep an eye on it at any time.</li>
  <li><strong>Notification bell</strong>: in the top right, with a badge for the number of unread notifications.</li>
  <li><strong>Search Files</strong>: a search box with the <BgStyledText>⌘F</BgStyledText> shortcut.</li>
  <li><strong>Your Uploads</strong>: your most recently uploaded files, grouped by when they were added (for example <strong>Today</strong>, <strong>Yesterday</strong>, <strong>Last 7 Days</strong>, and <strong>Older</strong>). Each row shows the file name, size, and upload date.</li>
</Unordered>

Each control is a shortcut into the full app:

<Unordered>
  <li>Click the <strong>Search Files</strong> box to open Hippius Desktop with the search bar focused, ready for you to find a file.</li>
  <li>Click the <strong>notification bell</strong> to open your <a href="/use/desktop/notifications">Notifications</a> in the app.</li>
  <li>Click <BgStyledText>Open Hippius →</BgStyledText> at the bottom to bring the full Hippius Desktop window to the front.</li>
</Unordered>
