---
id: quickstart
title: "Quickstart: Store Your First File in Drive"
sidebar_label: Quickstart
slug: /use/drive
description: Get your first file into Hippius Drive in about five minutes. Sign in to the console, set your unlock password, create a folder, upload, open and share a file, then add your computer and phone.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Screenshot from '@site/src/components/Screenshot';

Drive is your private, end-to-end encrypted file storage. This guide gets your first file into it using the [Hippius Console](https://console.hippius.com) in your browser, with nothing to install. It takes about five minutes.

:::tip Looking for S3?
Drive is for your own files. To connect apps, scripts or backup tools over the S3 API, follow the [S3 Quickstart](/use/quickstart) instead.
:::

## 1. Sign in

<Ordered>
  <li>Go to <a href="https://console.hippius.com">console.hippius.com</a>.</li>
  <li>Click <BgStyledText>Continue with Google</BgStyledText>, <BgStyledText>Continue with GitHub</BgStyledText> or <BgStyledText>Continue with Apple</BgStyledText>, and approve the sign-in.</li>
  <li>If the console asks you to choose a view, pick either one. You can switch later in Settings.</li>
</Ordered>

<Screenshot src="/img/console/getting-started/login.png" alt="The console login screen" dark />

Your account is created the first time you sign in, and it comes with the **Free Drive Plan**: 10 GB of encrypted storage, with no payment details needed.

:::info Signing in with an access key?
Access key accounts don't include free storage. [Pick a Drive plan](/use/console/billing#drive-plans) before step 3. In step 3 you won't get a new recovery seed, because your access key already is one. The console may ask you to confirm it instead.
:::

## 2. Open Drive

In the sidebar, click <BgStyledIconWithText text="Storage" icon="SidebarStorage" /> → <BgStyledIconWithText text="Drive" icon="FolderOpen" />. On a new account, Drive is empty.

<Screenshot src="/img/console/drive/overview.png" alt="The Drive page in the console" dark />

## 3. Create a folder and set your unlock password

Files in Drive live in folders, so start with one. The first time, the console also sets up your encryption.

<Ordered>
  <li>Click <BgStyledText>+ New Folder</BgStyledText>.</li>
  <li>In <strong>Protect Your Account</strong>, choose an <strong>unlock password</strong> and type it again to confirm. It needs at least 10 characters, and <BgStyledText>Save Password</BgStyledText> only turns on once the meter reads <strong>Strong</strong>.</li>
  <li>In <strong>Save Your Recovery Seed</strong>, write the 12 words down on paper, in order. Tick <strong>I saved my recovery seed safely</strong> and click <BgStyledText>Continue to Drive</BgStyledText>.</li>
  <li>In <strong>Create New Folder</strong>, type a name such as <em>Documents</em> and click <BgStyledText>Create Folder</BgStyledText>.</li>
</Ordered>

<Screenshot src="/img/console/unlock-password/setup.png" alt="Setting an unlock password in Protect Your Account" dark />

Your unlock password is not your Google, GitHub or Apple password. It opens the key that encrypts your files, and the same password works in the desktop and mobile apps.

:::danger The recovery seed is shown once
Those 12 words are the only way back into your files if you forget your unlock password. We don't keep a copy and can't recover either one for you.
:::

Already set an unlock password in the desktop or mobile app? The console skips the setup. Enter that password when it asks for it.

## 4. Upload a file

<Ordered>
  <li>Click your new folder to open it.</li>
  <li>Click <BgStyledText>+ New File</BgStyledText>, or drag files from your computer onto the page.</li>
  <li>In <strong>Upload Files</strong>, drop your files or click to pick them. <strong>Upload to folder</strong> shows where they will go.</li>
  <li>Click <BgStyledText>Upload File</BgStyledText>.</li>
</Ordered>

<Screenshot src="/img/console/drive/upload.png" alt="The Upload Files dialog" dark />

Each file is encrypted in your browser before it is sent. A progress widget follows the upload in the corner of the screen, whichever page you are on. The console takes files of up to 100 MB each. For bigger files, use the [desktop app](/use/desktop/getting-started).

## 5. Open your file

Click the file's name. It opens in a preview, decrypted in your browser. Click the download icon in the preview's toolbar to save a copy.

<Screenshot src="/img/console/drive/preview-image.png" alt="Previewing an image in Drive" dark />

Photos, videos, PDFs, Word, Excel and PowerPoint files, and text files all open this way. See [Previewing Files](/use/console/drive#previewing-files) for the full list.

## 6. Share it

<Ordered>
  <li>Click the three dots on the file's row and choose <BgStyledText>Share via link</BgStyledText>.</li>
  <li>Under <strong>Link expires</strong>, choose how long the link should work. To lock it, tick <strong>Require a password</strong> and set one.</li>
  <li>Click <BgStyledText>Create share link</BgStyledText>. When it's ready, the link is copied to your clipboard.</li>
</Ordered>

<Screenshot src="/img/console/drive/shared-links-dialog.png" alt="The share dialog with a link ready" dark />

The person you send it to doesn't need a Hippius account. You can see and revoke your links later on the [Shared Links](/use/console/shared-links) page.

## 7. Add your computer and phone

Sign in to the apps with the **same** Google, GitHub or Apple account, enter your unlock password when asked, and your files are already there.

<Unordered>
  <li><strong>Desktop App</strong> for Windows, macOS and Linux: <a href="/use/desktop/getting-started#installing-the-desktop-app">install it</a> and sign in. Then click <BgStyledText>Add Folder</BgStyledText> to keep a folder on your computer in sync with Drive. See <a href="/use/desktop/using-the-app#set-up-your-first-sync-folder">Set Up Your First Sync Folder</a>.</li>
  <li><strong>Mobile App</strong> for Android: <a href="/use/mobile/getting-started#install-android">install Hippius from Google Play</a> and sign in. Turn on <a href="/use/mobile/camera-uploads">Camera Uploads</a> to back up your photos and videos automatically.</li>
</Unordered>

## Where to next

<Unordered>
  <li><a href="/use/drive/apps">Choose Your App</a>: what the console, desktop app and mobile app are each best at, with links to their guides.</li>
  <li><a href="/use/console/drive">Drive in the Console</a>: everything you can do with your files in the browser.</li>
  <li><a href="/use/console/billing#drive-plans">Drive plans</a>: when you need more than 10 GB.</li>
</Unordered>
