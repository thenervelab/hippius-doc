---
id: mobile-app
title: Hippius Mobile App
sidebar_label: Getting Started
slug: /use/mobile/getting-started
description: Install the Hippius mobile app, sign in, understand your unlock password, and find your way around your encrypted files on your phone.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

Your Hippius Drive, on your phone. Browse everything you have stored, upload from your camera roll, share a file or folder with a link, and let your photos back themselves up while you get on with your day.

It is the same account and the same files you see in the console and the desktop app. Anything you add on one shows up on the others.

Everything is encrypted on your phone before it leaves it, so what travels to the network and what sits on it is unreadable without your key.

## Installing the app

{/* When the App Store version is live, change the next line to name both stores. */}
Hippius is on **Google Play** for Android phones. The iPhone version is coming soon to the **App Store**.

### On Android {#install-android}

<Ordered>
  <li>On your Android phone, open <a href="https://play.google.com/store/apps/details?id=com.hippius.mobile">Hippius on Google Play</a>, or search for <strong>Hippius</strong> in the Play Store.</li>
  <li>Tap <BgStyledText>Install</BgStyledText>.</li>
  <li>Open the app when it has finished installing.</li>
</Ordered>

The app needs Android 7.0 or later.

{/* iOS START: hidden until the App Store release. To show it again, close this comment at the end of this line and reopen it at the start of the iOS END line.

### On iPhone {#install-iphone}

<Ordered>
  <li>On your iPhone, open the <strong>App Store</strong> and search for <strong>Hippius</strong>.</li>
  <li>Tap <BgStyledText>Get</BgStyledText>, and confirm if your iPhone asks.</li>
  <li>Open the app when it has finished installing.</li>
</Ordered>

iOS END */}

## Signing in

You do not need an account before you start. Signing in with Google, Github, or Apple creates one for you if you do not have one already.

If you have used Hippius before, sign in with the same details you use everywhere else and your files are there waiting.

<Ordered>
  <li>Open the app and go through the short introduction. Tap <BgStyledText>Continue</BgStyledText>, then <BgStyledText>Proceed to log in</BgStyledText>.</li>
  <li>On <strong>Log In to Hippius</strong>, choose how you want to continue: <BgStyledText>Continue with Google</BgStyledText>, <BgStyledText>Continue with Github</BgStyledText>, <BgStyledText>Continue with Apple</BgStyledText>, or <BgStyledText>Continue with Access Key</BgStyledText>. All four work on Android.</li>
  <li>Google, Github, and Apple open a browser sheet where you approve the sign-in and come straight back to the app.</li>
  <li>For an access key, type or paste your recovery phrase from an existing Hippius account under <strong>Access Key</strong> and tap <BgStyledText>Log In</BgStyledText>. Use this if you already have one.</li>
</Ordered>

<Screenshot src="/img/mobile/sign-in.png" alt="Choosing how to sign in to the Hippius mobile app" dark raw phone />

:::warning
Your access key is the key to your files, not just a password. Anyone who has it can read everything you have stored. Keep it somewhere only you can reach, and never send it to anyone, including us.
:::

How you sign in also decides whether your account includes free storage. Google, Github and Apple accounts come with the 10 GB **Free Drive Plan**. Access key accounts need a plan before their first upload. See [Plans and Storage](/use/mobile/plans).

## Your unlock password

An **unlock password** protects an encrypted copy of your mnemonic seed that we store for your account. It is the same password used in the console and the desktop app. It is not your Google, Apple, or Github password.

When you are asked for it depends on the situation:

<Unordered>
  <li><strong>New account, first upload.</strong> The app asks you to create an unlock password before that first upload is encrypted. For a Google, Github or Apple account, this is also when your recovery phrase is created. Afterwards, a <strong>Save your recovery phrase</strong> card appears on Overview. Tap <BgStyledText>View phrase</BgStyledText> and <a href="/use/mobile/settings#backing-up-your-mnemonic-seed">write it down</a>.</li>
  <li><strong>Existing unlock password, new phone.</strong> After you sign in, the app asks you to enter the password once so it can open your seed on this device.</li>
  <li><strong>Any time from Settings.</strong> You can set, change, or restore the password under <a href="/use/mobile/settings#unlock-password">Settings → Security</a>.</li>
</Unordered>

:::warning
We cannot reset your unlock password or recover it for you. If you forget it, your mnemonic seed can restore access and set a new one. See [Restore Access](/use/mobile/settings#restore-access).
:::

## Finding your way around {#finding-your-way-around}

The app has two main screens, **Overview** and **Drive**. Switch between them with the bar at the bottom of the screen.

<Screenshot src="/img/mobile/plan-card.png" alt="The Overview screen with its header, cards and bottom bar" dark raw phone />

**At the top** of both screens:

<Unordered>
  <li><strong>Your account</strong>: your picture and your email, Github name or wallet address. Under it, a line shows what is uploading, such as <strong>Backing up 120 of 340</strong>, or <strong>Upload activity</strong> when nothing is. Tap the line to open your uploads.</li>
  <li>The <strong>upload</strong> button opens <strong>Your Uploads</strong>, where you can follow, pause or cancel anything that is uploading or backing up. Its icon shows a progress ring while something is uploading.</li>
  <li>The <strong>bell</strong> opens your <a href="#notifications">notifications</a>. A badge counts the ones you have not read.</li>
  <li>The <strong>gear</strong> opens <a href="/use/mobile/settings">Settings</a>.</li>
</Unordered>

**At the bottom**:

<Unordered>
  <li><strong>Overview</strong> is your home screen. See below.</li>
  <li><strong>Drive</strong> is your files. Browse, search, upload, preview, download, and organise them into folders. See <a href="/use/mobile/drive">Your Files</a>.</li>
  <li>The <BgStyledText>+</BgStyledText> button adds something: <strong>Upload Photos</strong>, <strong>Upload files</strong>, <strong>Create Folder</strong>, or <strong>Take photo or video</strong>. See <a href="/use/mobile/drive#adding-files">Adding files</a>.</li>
</Unordered>

### Overview {#overview}

Overview shows, from top to bottom:

<Unordered>
  <li><strong>Recents</strong>: the files you added most recently. Tap the arrow to go to Drive.</li>
  <li>The <strong>Storage</strong> and <strong>Plan</strong> cards: how full your Drive is, and which plan you are on. See <a href="/use/mobile/plans#what-the-app-shows">Plans and Storage</a>.</li>
  <li><strong>Save your recovery phrase</strong>, only for a new Google, Github or Apple account after its first upload. Tap <BgStyledText>View phrase</BgStyledText> to back the phrase up. <BgStyledText>Later</BgStyledText> hides the card for good, so only tap it once the phrase is safe.</li>
  <li>A card to set up <a href="/use/mobile/camera-uploads">Camera Uploads</a>. Once you have set it up, it is replaced by <strong>Storage Distribution</strong>, a breakdown of what is using your storage.</li>
</Unordered>

## Notifications {#notifications}

Tap the **bell** to see your notifications. The app sends three kinds:

<Unordered>
  <li><strong>Welcome</strong>, once, when you first sign in.</li>
  <li><strong>App updated</strong>, after the app updates to a new version.</li>
  <li><strong>Backup finished</strong>, when Camera Uploads has backed up your photos, for example <strong>Backed up 12 new photos</strong>. If some could not be backed up, it says how many need attention. Its <strong>Open</strong> button, such as <BgStyledText>Open Camera Uploads</BgStyledText>, takes you to your backup folder. You can turn these off with <a href="/use/mobile/settings#backup-notifications">Backup notifications</a>.</li>
</Unordered>

Backup notifications also appear on your phone, so you know without opening the app. Tapping one opens the app on that notification.

In the list, tap a notification to read it, or press and hold it to mark it as read or unread, or delete it. **Mark all as read** clears the unread badge.

## Home screen widgets {#home-screen-widgets}

Widgets put Hippius on your home screen, so you can start an upload or check on a backup without opening the app.

### On Android {#android-widgets}

To add one, press and hold an empty spot on your home screen, tap **Widgets**, find **Hippius**, and drag the widget you want into place. You can resize them.

There are four:

| Widget               | What it shows                                                                                    | Tap it to                      |
| -------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------ |
| **Upload & Backup**  | The progress of your uploads and your Camera Uploads backup, as it happens. See below.           | Open Your Uploads              |
| **Quick Actions**    | Four buttons: **Create Folder**, **Upload files**, **Upload Photos** and **Take photo or video** | Jump straight into that action |
| **Storage**          | How full your Drive is                                                                           | Open the Storage screen        |
| **Storage Overview** | How full your Drive is, with the space used by videos, images, docs and others                   | Open the Storage screen        |

A new **Storage** widget reads **Open to refresh** until the app has filled it in. All the widgets are cleared when you log out.

#### The Upload & Backup widget {#upload-backup-widget}

This widget shows your upload activity on your home screen, so you can follow a backup or a big upload without opening the app. It shows the same progress as the line under your name in the app:

<Unordered>
  <li><strong>While something is uploading</strong>, what is happening, such as <strong>Backing up 120 of 340</strong> or <strong>Uploading 4 of 12</strong>, with a percentage and a progress bar. It reads <strong>Scanning backup…</strong> while the app is still counting your photos.</li>
  <li><strong>While it is paused</strong>, <strong>Backup paused</strong> or <strong>Uploads paused</strong>. This includes while <strong>Upload on Wi-Fi only</strong> is holding uploads on mobile data.</li>
  <li><strong>When something failed</strong>, how many items need you, such as <strong>3 backup items failed</strong>.</li>
  <li><strong>When it is done</strong>, how it went, such as <strong>Backed up 340 photos</strong> or <strong>Uploaded 5 files</strong>. Once you clear it in Your Uploads, it reads <strong>Up to date</strong>. With nothing to report, it reads <strong>No active uploads</strong> and <strong>All caught up</strong>.</li>
</Unordered>

It keeps updating while Camera Uploads runs in the background. Tap it to open **Your Uploads**, where you can pause, resume, retry or skip. See [Following the backup](/use/mobile/camera-uploads#following-the-backup).

<Screenshot src="/img/mobile/widgets/android.png" dark="/img/mobile/widgets/android.png" alt="The Upload & Backup, Storage and Quick Actions widgets on an Android home screen" raw phone />

{/* iOS START: hidden until the App Store release. To show it again, close this comment at the end of this line and reopen it at the start of the iOS END line.

### On iPhone {#iphone-widgets}

To add one, press and hold an empty spot on your Home Screen until the apps jiggle, tap **Edit**, then **Add Widget**. Search for **Hippius**, pick a widget and tap **Add Widget**.

iPhone widgets are shortcuts. Each one opens the app straight into an action:

| Widget               | Size   | Tap it to                                   |
| -------------------- | ------ | ------------------------------------------- |
| **Create Folder**    | Small  | Create a new folder                         |
| **Upload Photos**    | Small  | Pick photos or videos to upload             |
| **Upload Files**     | Small  | Pick files to upload                        |
| **Take Photo/Video** | Small  | Open the camera and upload what you capture |
| **Quick Actions**    | Medium | All four actions in one widget              |

There is no upload progress or storage widget on iPhone. To follow a backup, open the app and tap the upload button at the top.

iOS END */}

## Keeping the app up to date {#updates}

The app checks for a new version by itself shortly after it opens. If there is one, it tells you and offers to update. Tap <BgStyledText>Not now</BgStyledText> to be reminded a day later.

You can check yourself any time with <a href="/use/mobile/settings#help-and-app-information">Settings → Check for Updates</a>, which also tells you when you are already on the latest version.

Small updates install inside the app. Tap <BgStyledText>Update now</BgStyledText>, wait a few seconds for the download, then tap <BgStyledText>Restart now</BgStyledText>. Uploads that were in progress carry on after the restart.

### On Android {#updates-android}

Bigger updates come from Google Play. Tap <BgStyledText>Update now</BgStyledText> and Google Play installs the new version for you without leaving the app. If it can't, the button reads <BgStyledText>Open Play Store</BgStyledText> instead. It takes you to Hippius on Google Play, where you tap **Update**.

{/* iOS START: hidden until the App Store release. To show it again, close this comment at the end of this line and reopen it at the start of the iOS END line.

### On iPhone {#updates-iphone}

Bigger updates come from the App Store. Tap <BgStyledText>Open App Store</BgStyledText>, then tap **Update** on the Hippius page.

iOS END */}

## What you can do

<Unordered>
  <li><strong>Your files.</strong> Upload, preview, download, rename and delete. See <a href="/use/mobile/drive">Your Files</a>.</li>
  <li><strong>Camera Uploads.</strong> Back up your photos and videos on their own. See <a href="/use/mobile/camera-uploads">Camera Uploads</a>.</li>
  <li><strong>Shared links.</strong> Send a file or folder to someone who does not have Hippius. See <a href="/use/mobile/shared-links">Sharing Files</a>.</li>
  <li><strong>Your plan and storage.</strong> See how much space you have and what is using it. See <a href="/use/mobile/plans">Plans and Storage</a>.</li>
</Unordered>

## Coming back

After the first sign-in the app remembers you. Open it and you land on Overview, with no account password to type. You stay signed in until you sign out yourself.

If you turn on **Biometric lock** in Settings, the app asks for your fingerprint or face before it opens. That lock is only on this phone, separate from your unlock password.

## Your plan

The app shows which Drive plan you are on and how much storage it gives you, on the Overview **Plan** card and on your **Account** screen. **Managing subscriptions is not available in the mobile app.** You subscribe, change or cancel a plan in the [Hippius Console](https://console.hippius.com) in a browser, signed in with the same account.

Once you subscribe in the console, the app picks the plan up on its own. There is nothing to enter twice. [Plans and Storage](/use/mobile/plans) walks through it step by step, and shows what the app looks like before and after.

## Where to next

<Unordered>
  <li><a href="/use/mobile/drive">Your Files</a>: upload, preview, download and organise.</li>
  <li><a href="/use/mobile/camera-uploads">Camera Uploads</a>: back up your photos automatically.</li>
  <li><a href="/use/mobile/plans">Plans and Storage</a>: your plan, your storage, and subscribing in the console.</li>
  <li><a href="/use/mobile/settings">Settings</a>: security, biometric lock, Wi-Fi only uploads, appearance, account.</li>
</Unordered>
