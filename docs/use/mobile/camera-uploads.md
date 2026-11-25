---
id: camera-uploads
title: Camera Uploads
sidebar_label: Camera Uploads
slug: /use/mobile/camera-uploads
description: Back up the photos and videos on your phone to Hippius automatically, encrypted before they leave the device. Set it up, choose what is backed up and where it goes, follow progress, and pause, resume or turn it off.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

Camera Uploads copies the photos and videos on your phone into your Hippius Drive, on its own, encrypted on the device before anything is sent.

Turn it on once and you can stop thinking about it. It starts with the photos already on your phone, then picks up new ones as you take them.

This page covers setting it up and using it. Two more pages help it run smoothly:

<Unordered>
  <li><a href="/use/mobile/permissions">Permissions and Background Backups</a> explains what your phone needs to allow so backups keep going when you are not using the app.</li>
  <li><a href="/use/mobile/troubleshooting">Troubleshooting</a> helps when a backup stops or doesn't start.</li>
</Unordered>

Backed-up photos count toward your storage like any other upload. See [Plans and Storage](/use/mobile/plans).

## Three ways to set it up {#three-ways-to-set-it-up}

Until Camera Uploads is on, the app offers it in three places. They all lead to the same setup.

### 1. The backup card on Overview {#the-backup-card}

Overview shows a card that reads **Keep all your photos and videos backed up**. Tap <BgStyledText>Continue</BgStyledText> to start.

The card stays until you set up Camera Uploads, so it is always there if you skipped setup before.

### 2. The Get started sheet {#the-get-started-sheet}

The first time you open **Drive**, a **Get started** sheet slides up: **Keep your photos backed up**. It offers three choices:

<Unordered>
  <li><BgStyledText>Set up camera uploads</BgStyledText> starts the setup below.</li>
  <li><BgStyledText>Manually select photos</BgStyledText> opens your photos so you can pick a few to upload now, without turning on backup.</li>
  <li><BgStyledText>Skip</BgStyledText>, at the top, closes it.</li>
</Unordered>

The sheet appears only once. Whichever you choose, it doesn't come back. Use the card or Settings to set up Camera Uploads later.

<Screenshot src="/img/mobile/camera-uploads/get-started.png" alt="The one-time Get started sheet for Camera Uploads" dark raw phone />

### 3. Settings {#from-settings}

Open <BgStyledText>Settings</BgStyledText> → <BgStyledText>Camera Uploads</BgStyledText>. The row shows **Off** until backup is on. This opens the Camera Uploads screen, where you can check every option and then tap <BgStyledText>Turn on Camera uploads</BgStyledText>.

When you start from Settings, the app backs up everything on your phone unless you change **Upload from** first.

## Setting it up for the first time {#turning-it-on}

Setting up takes a minute, and your phone asks for photo access along the way.

You need storage available to turn Camera Uploads on. Every account that signs in with Google, GitHub or Apple has the 10 GB Free Drive Plan. See [Plans and Storage](/use/mobile/plans).

Your photos are encrypted on your phone before they upload, so the app needs your encryption set up first. On a new account, turning Camera Uploads on asks you to create your [unlock password](/use/mobile/settings#setting-your-unlock-password), the same step as your first manual upload. If your account already has one, enter it to unlock this phone. Close that step and Camera Uploads stays off, with **Camera Uploads needs your account protected first.**

:::info The first backup takes a while
Camera Uploads starts with everything already on your phone, oldest first, so the first run can take hours if you have years of photos. After that it is only new ones, which is quick. Leaving the app open, on Wi-Fi and plugged in, is the fastest way through a big first backup. On iPhone, [Fast backup](#fast-backup) does exactly that for you.
:::

### On Android {#turning-it-on-android}

<Ordered>
  <li>Tap <BgStyledText>Continue</BgStyledText> on the card, or <BgStyledText>Set up camera uploads</BgStyledText> on the Get started sheet.</li>
  <li><strong>Allow photo access.</strong> Android asks whether Hippius may access your photos and videos. Choose <strong>Allow all</strong> so the whole library can be backed up. See <a href="#photo-access">Photo access</a> if you pick only some.</li>
  <li><strong>Choose what to back up.</strong> The <strong>Upload from</strong> sheet opens with <strong>All Photos</strong> selected. Keep it, or pick individual folders. Tap <BgStyledText>Save selection</BgStyledText>.<br />If Android's <strong>Pause app activity if unused</strong> is on for Hippius, a dialog asks you to turn it off first. Tap <BgStyledText>Open settings</BgStyledText>, switch it off and come back. See <a href="/use/mobile/permissions#pause-app-activity">Pause app activity if unused</a>.</li>
  <li><strong>Check the options.</strong> The <strong>Camera Uploads</strong> screen opens. Check where backups go (<strong>Back up to</strong>), whether to <strong>Include videos</strong>, and <strong>Continuous camera uploads</strong>. Each is explained below.</li>
  <li>Tap <BgStyledText>Turn on Camera uploads</BgStyledText>.</li>
  <li>If Android asks whether Hippius may send notifications, choose <strong>Allow</strong>, so you can see backup progress while you are not in the app.</li>
  <li>The app opens your backup folder in Drive and starts. The header reads <strong>Preparing backup…</strong> while it counts your photos, then <strong>Backing up • 340 remaining...</strong> as it goes.</li>
</Ordered>

The first time you open that folder, Android may warn that **Camera uploads may stop syncing**. Tap <BgStyledText>Stop optimising</BgStyledText> and allow Hippius to run in the background. It is the single most useful thing you can do to keep backups going. See [Battery optimization](/use/mobile/permissions#battery-optimization).

### On iPhone {#turning-it-on-iphone}

<Ordered>
  <li>Tap <BgStyledText>Continue</BgStyledText> on the card, or <BgStyledText>Set up camera uploads</BgStyledText> on the Get started sheet.</li>
  <li><strong>Allow photo access.</strong> iOS asks whether Hippius may access your photos. Choose <strong>Allow Full Access</strong> so the whole library can be backed up. See <a href="#photo-access-on-iphone">Photo access on iPhone</a> if you limit it.</li>
  <li><strong>Choose what to back up.</strong> The <strong>Upload from</strong> sheet opens with <strong>Camera Roll</strong> selected, which is everything. Keep it, or pick smart albums. Tap <BgStyledText>Save selection</BgStyledText>. With Limited Access, the sheet lists <strong>Selected photos</strong> instead.</li>
  <li><strong>Check the options.</strong> The <strong>Camera Uploads</strong> screen opens. Check where backups go (<strong>Back up to</strong>), whether to <strong>Include videos</strong>, and how <a href="#heic-and-live-photos">HEIC and Live Photos</a> are uploaded.</li>
  <li>Tap <BgStyledText>Turn on Camera uploads</BgStyledText>.</li>
  <li>If iOS asks whether Hippius may send notifications, choose <strong>Allow</strong>, so you are told when a backup finishes.</li>
  <li>The app opens your backup folder in Drive and starts.</li>
</Ordered>

On iOS 26 and later, the backup you just started keeps going after you leave the app, and iOS shows its progress in a card of its own, such as **Backing up photos, 12 of 340**. The notice at the bottom of the screen then reads **Backup keeps going after you leave Hippius.** On earlier versions it reads **Keep Hippius open while your photos back up. Backup may pause shortly after you leave the app.** See [Keeping it running on iPhone](#keeping-it-running-iphone).

If **Background App Refresh** is off for Hippius, the app tells you once, with **Background App Refresh is off**. Turn it on so Camera Uploads can pick up new photos by itself later. See [Background App Refresh](/use/mobile/permissions#background-app-refresh).

## Choosing what to back up {#upload-from}

**Upload from** decides which photos and videos are backed up. Later, the **Upload from** row on the Camera Uploads screen shows what you picked. What the sheet lists depends on your phone.

### On Android {#upload-from-android}

<Unordered>
  <li><strong>All Photos</strong> backs up everything on your phone. It is the default, and the simplest choice.</li>
  <li><strong>Folders</strong> lists the folders on your phone that hold photos or videos, each with how many items it has. <strong>Camera</strong> is where your camera saves, and you will usually also see folders such as Screenshots, Download or WhatsApp Images. Photos that are not in any folder are grouped under your phone's model name.</li>
</Unordered>

Choosing a folder switches **All Photos** off, and you can pick as many folders as you like. Choosing **All Photos** again clears the folder picks. Tap <BgStyledText>Save selection</BgStyledText> when you are done. The row then reads, for example, **All Photos** or **3 Folders**.

<Screenshot src="/img/mobile/camera-uploads/upload-from.png" alt="The Upload from sheet listing All Photos and your phone's folders" dark raw />

#### Photo access {#photo-access}

Camera Uploads can only back up what Android lets Hippius see.

<Unordered>
  <li><strong>Allow all</strong>: Hippius sees your whole library. This is what Camera Uploads needs.</li>
  <li><strong>Select photos and videos</strong> (Android 14 and later): Hippius sees only the items you picked, so only those are backed up. The Upload from sheet says <strong>Only selected photos are visible</strong>, or <strong>No photos selected</strong> if you picked none. Tap <strong>Change selection</strong> to pick different ones, or <strong>Manage in settings</strong> to switch to Allow all.</li>
  <li><strong>Don't allow</strong>: Hippius sees nothing, the sheet says <strong>Photo access is off</strong>, and Camera Uploads can't be turned on.</li>
</Unordered>

To change it later, open your phone's **Settings → Apps → Hippius Drive → Permissions → Photos and videos**. [Permissions and Background Backups](/use/mobile/permissions#android-photos) has the details.

### On iPhone {#upload-from-iphone}

<Unordered>
  <li><strong>Camera Roll</strong> backs up everything on your iPhone. It is the default, and the simplest choice.</li>
  <li><strong>Smart Albums</strong> are the albums your iPhone makes for you, such as Recents, Favorites, Selfies, Screenshots and Videos. Picking one backs up what is in it. Albums you made yourself are not listed.</li>
</Unordered>

Tap <BgStyledText>Save selection</BgStyledText> when you are done. The row then reads, for example, **Camera Roll** or **2 Smart Collections**.

<Screenshot src="/img/mobile/camera-uploads.png" alt="The Upload from sheet on iPhone, with Camera Roll and Smart Albums" dark raw phone />

#### Photo access on iPhone {#photo-access-on-iphone}

Camera Uploads can only back up what iOS lets Hippius see.

<Unordered>
  <li><strong>Full Access</strong>: Hippius sees your whole library. This is what Camera Uploads needs.</li>
  <li><strong>Limited Access</strong>: Hippius sees only the photos you picked, so only those are backed up. The Upload from sheet says <strong>Only selected photos are visible</strong>, or <strong>No photos selected</strong> if you picked none, and lists <strong>Selected photos</strong> in place of Camera Roll. Smart albums aren't listed, because iOS keeps albums hidden under Limited Access. Tap <strong>Change selection</strong> to pick different photos, or <strong>Manage in settings</strong> to switch to Full Access.</li>
  <li><strong>None</strong>: Hippius sees nothing, the sheet says <strong>Photo access is off</strong>, and Camera Uploads can't be turned on.</li>
</Unordered>

If you had picked smart albums before limiting access, the app remembers them and backs up your selected photos for now. If you later allow all photos, Camera Uploads doesn't widen the backup by itself. The Camera Uploads screen shows **You now allow all photos**, with <BgStyledText>Back up all photos</BgStyledText> or <BgStyledText>Choose albums</BgStyledText>.

To change it later, open the iPhone **Settings → Hippius Drive → Photos**. [Permissions and Background Backups](/use/mobile/permissions#iphone-photos) has the details.

## Choosing where backups go {#back-up-to}

Backups go into a folder in your Drive. By default it is a folder called **Camera Uploads** at the top level of your Drive. The app creates it the first time you back up if you don't have one.

To use a different folder:

<Ordered>
  <li>On the Camera Uploads screen, tap <strong>Back up to</strong>.</li>
  <li>Pick any folder, including one inside another folder. Backups need a folder, so <strong>Drive</strong> itself can't be chosen. Or tap <strong>New folder</strong>, name it, and tap <BgStyledText>Create</BgStyledText>.</li>
  <li>Tap <BgStyledText>Use this folder</BgStyledText>.</li>
</Ordered>

The **Back up to** row shows the folder's name. New photos and videos back up to the new folder from then on, including the rest of a backup that is running now. Anything already backed up stays where it is.

If the backup folder is deleted, in the app or anywhere else, Camera Uploads goes back to the default **Camera Uploads** folder, makes it again if needed, and carries on there.

<Screenshot src="/img/mobile/camera-uploads/settings.png" alt="The Camera Uploads screen with its options" dark raw phone />

## Videos {#include-videos}

**Include videos** is off by default, so only photos are backed up. Turn it on to back up videos too.

Videos are much bigger than photos. They take longer, use more of your storage, and use more mobile data if you are not on Wi-Fi. Consider turning on [Upload on Wi-Fi only](#choosing-when-it-uploads) as well.

## Choosing when it uploads {#choosing-when-it-uploads}

Two switches in the main Settings screen shape how Camera Uploads behaves:

<Unordered>
  <li><strong>Upload on Wi-Fi only</strong> pauses Camera Uploads, and every other upload, while you are on mobile data. They pick up again by themselves when you are back on Wi-Fi. It is off by default, so backups use mobile data too.</li>
  <li><strong>Backup notifications</strong> tells you when a backup finishes, so you are not checking on it. It is on by default.</li>
</Unordered>

If **Upload on Wi-Fi only** is on and you try to turn on Camera Uploads over mobile data, the app says **Camera Backup needs Wi-Fi**. Connect to Wi-Fi, or turn the switch off.

## Continuous camera uploads (Android) {#continuous-camera-uploads}

This row appears on Android only. It shows whether Android's battery optimization can pause Hippius while you are not using it:

<Unordered>
  <li><strong>Off</strong>: battery optimization is on for Hippius, so Android may pause Camera Uploads when the app is in the background. Tap the row, then <BgStyledText>Stop optimizing battery</BgStyledText>, and allow Hippius to run in the background.</li>
  <li><strong>On</strong>: Hippius is exempt, so backups can keep going while you are not using the app.</li>
</Unordered>

See [Battery optimization](/use/mobile/permissions#battery-optimization) for why this matters.

## HEIC and Live Photos (iPhone) {#heic-and-live-photos}

iPhones save photos in a format called **HEIC**, and can save **Live Photos**, a still with a few seconds of motion. On iPhone, the Camera Uploads screen has two extra rows for them. They do not appear on Android.

**Upload HEIC photos as**

<Unordered>
  <li><strong>JPG (Recommended)</strong>, the default. HEIC photos are converted to JPG before they are uploaded. JPG opens in more apps and on more computers.</li>
  <li><strong>HEIC</strong> keeps the original file, which may use less storage.</li>
</Unordered>

**Upload Live Photos as**

<Unordered>
  <li><strong>Live Photo</strong>, the default. The image and its motion are kept together in one file, which uses more storage. The Hippius app plays the motion when you open the photo. Other viewers show the still.</li>
  <li><strong>Still photo</strong> uploads the image only.</li>
</Unordered>

A change applies to photos backed up from then on. Photos already in your Drive stay as they are.

## Following the backup {#following-the-backup}

You can check on a backup from several places:

<Unordered>
  <li><strong>The header.</strong> On Overview and Drive, the line under your name shows progress, such as <strong>Backing up 120 of 340</strong>, with a progress ring on the upload button. It reads <strong>Scanning backup…</strong> while the app is still counting your photos. Once the first backup is done, new photos are counted on their own, for example <strong>Backing up 2 of 3 new items</strong>. Tap the line or the button to open <strong>Your Uploads</strong>.</li>
  <li><strong>Your Uploads.</strong> Shows how many items are done out of the total, the percentage, how much has been uploaded and the speed. Below that are the files that are uploading now, each with its own progress and roughly how long it has left, then those waiting and those that finished recently.</li>
  <li><strong>The backup folder.</strong> Open it in Drive to see photos arriving. Its header shows how many are left, for example <strong>Backing up • 220 remaining...</strong>.</li>
  <li><strong>The home screen widget</strong> (Android). The <a href="/use/mobile/getting-started#upload-backup-widget">Upload &amp; Backup widget</a> shows the same progress on your home screen, and keeps updating while the backup runs in the background.</li>
  <li><strong>Notifications.</strong> With <strong>Backup notifications</strong> on, you are told when the backup finishes.</li>
</Unordered>

When everything is done, Your Uploads shows **Backup Complete**, and later runs are listed under **Earlier**.

<Screenshot src="/img/mobile/camera-uploads/your-uploads.png" alt="Your Uploads showing backup progress with the pause and cancel buttons" dark raw phone />

### If an item fails {#if-an-item-fails}

When an upload fails, the app tries it again by itself a few times. While a retry is still to come, the item reads **Retrying shortly**, or **Retrying in about 5 min**, in grey rather than red. Nothing needs you yet.

If it still fails, it stops and waits for you. The header then reads, for example, **2 backup items failed**, and the item shows a red mark in **Your Uploads**. Tap it to see why, then choose:

<Unordered>
  <li><BgStyledText>Retry</BgStyledText> to try it again.</li>
  <li><BgStyledText>Skip</BgStyledText> to leave that one out for good, so the rest of the backup can finish. You can still upload it by hand later.</li>
</Unordered>

With two or more failed, **Your Uploads** also has <BgStyledText>Retry all</BgStyledText>, which tries every one of them again. Tapping a failed photo in the backup folder offers the same, as **Retry all failed**.

A backup doesn't count as finished while an item is waiting for you, so the notification that the backup is done only arrives once you have retried or skipped it.

### If it waits for encryption {#waiting-for-encryption}

If Camera Uploads is on but your phone doesn't have your encryption key yet, for example because it was turned on in an older version of the app, the backup waits instead of failing. A card reads **Protect your account to back up photos**, on Overview, Drive, the backup folder and the Camera Uploads screen. Tap <BgStyledText>Set up</BgStyledText> and create or enter your unlock password. The app then says **Encryption ready** and backs up the photos that were waiting.

## Pausing, resuming and cancelling {#pausing-and-resuming}

Open **Your Uploads** from the header. While something is uploading, two buttons sit under the progress bar:

<Unordered>
  <li><strong>Pause</strong> (⏸) stops uploads and backups where they are. The progress turns grey and the header reads <strong>Backup paused</strong>. Tap the same button, now <strong>Resume</strong> (▶), to carry on from where it stopped. Photos that were already backed up are not uploaded again.</li>
  <li><strong>Cancel</strong> (✕) stops the backup and turns Camera Uploads off. The app asks first: <strong>Cancel backup?</strong> Photos already backed up stay in your Drive. Tap <BgStyledText>Cancel backup</BgStyledText> to confirm, or <BgStyledText>Keep backing up</BgStyledText>. Turn Camera Uploads back on later to back up the rest.</li>
</Unordered>

Pause is the one to use when you only need a break, for example on a slow connection. It stays paused until you resume, even if you close the app. Cancel is for when you don't want the rest backed up.

**Backup paused** also shows while [Upload on Wi-Fi only](#choosing-when-it-uploads) is holding the backup on mobile data. That one carries on by itself once you are on Wi-Fi.

## Changing settings later {#changing-settings-later}

Open <BgStyledText>Settings</BgStyledText> → <BgStyledText>Camera Uploads</BgStyledText>. The screen has:

| Row                           | What it does                                                                 |
| ----------------------------- | ---------------------------------------------------------------------------- |
| **Upload from**               | What is backed up: **All Photos** or the folders you picked.                  |
| **Back up to**                | The Drive folder backups go into.                                            |
| **Include videos**            | Whether videos are backed up as well as photos.                              |
| **Continuous camera uploads** | Whether Android lets backups run in the background. Android only.            |

**On iPhone**, the screen has **Upload HEIC photos as** and **Upload Live Photos as** in place of **Continuous camera uploads**. See [HEIC and Live Photos](#heic-and-live-photos). While a backup has photos left, it also has **Fast backup**. See [Fast backup](#fast-backup).

The **Upload from** row also shows when your phone limits what Hippius can see. It reads **Selected photos**, **No photos selected** or **Not allowed** instead of your selection. Tap it to change it.

Changing **Upload from** or **Include videos** makes the app look through your photos again for anything the new choice adds. Photos already backed up are not uploaded twice.

## Turning it off {#turning-it-off}

<Ordered>
  <li>Open <BgStyledText>Settings</BgStyledText> → <BgStyledText>Camera Uploads</BgStyledText>.</li>
  <li>Tap <BgStyledText>Turn off Camera uploads</BgStyledText>.</li>
  <li>Confirm with <BgStyledText>Turn off</BgStyledText>.</li>
</Ordered>

New photos and videos are not backed up until you turn it back on. Everything already uploaded stays in your Drive.

## What happens to the photos

They land in the Drive folder you chose, like anything else you upload. Browse them on your phone, in the console, or in the desktop app, and download them anywhere you are signed in.

<Unordered>
  <li><strong>Names.</strong> Each file keeps the name your phone gave it, with a short code added so names never clash, for example <strong>IMG_1234-3fa9c0b1d2.jpg</strong>.</li>
  <li><strong>One folder.</strong> Everything goes straight into the backup folder. There are no subfolders by date or album.</li>
  <li><strong>HEIC photos.</strong> If your Android phone saves photos in the HEIC format, Camera Uploads converts them to JPG, which opens everywhere.</li>
  <li><strong>Each photo once.</strong> A photo that is in several of the folders you picked is still backed up only once.</li>
</Unordered>

**On iPhone**, HEIC photos and Live Photos are uploaded the way you chose under [HEIC and Live Photos](#heic-and-live-photos). A photo that is in several smart albums is still backed up only once.

### Good to know {#good-to-know}

<Unordered>
  <li><strong>Backing up never removes anything from your phone.</strong> Deleting a photo from your phone afterwards leaves the copy in Hippius alone.</li>
  <li><strong>Deleting a backed-up photo from Drive</strong> doesn't bring it back. It isn't backed up again.</li>
  <li><strong>Edits aren't backed up again.</strong> If you edit a photo after it was backed up, Hippius keeps the version it already has. If your editing app saves the edit as a new photo, that new photo is backed up.</li>
  <li><strong>Logging out and back in</strong> on the same phone picks up where it left off, with the same settings. Photos already backed up are skipped.</li>
  <li><strong>Reinstalling the app</strong> on the same phone continues its backup. Photos already backed up are skipped. See <a href="#reinstalling-the-app">Reinstalling the app</a>.</li>
  <li><strong>Moving to a new phone</strong> starts Camera Uploads from scratch. It backs up every photo on the new phone, as new copies next to the old ones in the same folder. Delete the copies you don't need, or pick only the folders you want before you turn it on.</li>
</Unordered>

## Reinstalling the app {#reinstalling-the-app}

If you delete the app and install it again on the same phone, Camera Uploads continues this phone's backup instead of starting over.

<Ordered>
  <li>Sign in with the same account.</li>
  <li>Set up Camera Uploads again. <a href="#back-up-to">Where backups go</a> and <a href="#include-videos">Videos</a> are filled in as they were. Choose what to back up under <a href="#upload-from">Upload from</a> again, then turn it on.</li>
</Ordered>

The backup starts straight away. While it runs, the app checks each photo against what this phone backed up before. A photo the backup already holds is counted as backed up and isn't uploaded again, even if you moved it to another folder since. Photos with no capture date, which some Android phones don't record, are recognised too, and photos found this way aren't listed in the folder as new uploads.

<Unordered>
  <li><strong>Photos backed up by an app version older than 1.5.0</strong> aren't recognised. Camera Uploads backs them up again, as new copies next to the old ones.</li>
  <li><strong>A phone that was erased or reset to factory settings</strong> counts as a new phone, and starts from scratch.</li>
</Unordered>

### On Android {#reinstalling-the-app-android}

<Unordered>
  <li>The app recognises the phone by itself: Android tells it that this is the same phone.</li>
  <li>The count picks up where it left off. The app reads your photo library quickly, so shortly after you turn Camera Uploads on, a backup that had reached 260 of 1,000 photos shows <strong>260 of 1,000</strong> again and carries on from there.</li>
</Unordered>

### On iPhone {#reinstalling-the-app-iphone}

<Unordered>
  <li>The app recognises the iPhone by itself: its device ID is kept in the iPhone's keychain, which stays when you delete the app.</li>
  <li>If it can't tell, and your account already backs up an iPhone of the same model, it asks once, with the model's name, for example <strong>Is this your iPhone 15 Pro?</strong> The question shows on Overview, in the Camera Uploads settings, in the backup folder and in <a href="/use/mobile/settings#devices">Settings → Devices</a>. If there is more than one such iPhone, pick yours by when it was last active. Tap <BgStyledText>Continue its backup</BgStyledText> if it is that phone, or <BgStyledText>Set up as a new iPhone</BgStyledText> if it isn't. Camera Uploads waits until you answer.</li>
  <li>The count climbs in steps instead of starting where it left off. The app reads your photo library 100 photos at a time, which takes a few minutes on a large library, and checks each batch against your backup as it finds it. So a backup that had reached 260 of 1,000 photos climbs back to 260 while the app works through the library, rather than showing it at once. Nothing is uploaded twice.</li>
</Unordered>

## Keeping it running

Backing up happens in the background, and phones are strict about what they let run there. [Permissions and Background Backups](/use/mobile/permissions) explains what to allow so backups keep going on their own. If a backup has stopped, see [Troubleshooting](/use/mobile/troubleshooting#backups).

Whatever stopped a backup, opening Hippius picks it up again from where it stopped. Photos that were already backed up are not uploaded again.

### On Android {#keeping-it-running-android}

<Unordered>
  <li><strong>Turn off battery optimization</strong> for Hippius, so Android lets it keep uploading after you leave the app. <strong>Continuous camera uploads</strong> then reads <strong>On</strong>. See <a href="/use/mobile/permissions#battery-optimization">Battery optimization</a>.</li>
  <li><strong>Turn off Pause app activity if unused</strong>, so Android doesn't take photo access away if you don't open Hippius for a few months. See <a href="/use/mobile/permissions#pause-app-activity">Pause app activity if unused</a>.</li>
</Unordered>

:::warning Backups can still stop on some phones
Even with both of these done, some Android phones stop Hippius in the background anyway, often within about 15 minutes of leaving the app. Many phone makers add a battery manager of their own on top of Android's, and it can close apps whatever you have allowed. The backup may then wait until you open Hippius again. Your phone's own battery settings can help. See [When your phone stops backups anyway](/use/mobile/permissions#phone-battery-managers).
:::

### On iPhone {#keeping-it-running-iphone}

iOS is strict about what apps do once you leave them. How far a backup gets without you depends on your iOS version:

<Unordered>
  <li><strong>iOS 26 and later.</strong> A backup you start yourself keeps going after you leave the app, with iOS's own progress card and a button to stop it. That covers turning Camera Uploads on, <strong>Retry all</strong>, resuming, and <strong>Continue in background</strong>. Photos you take afterwards wait for the next time iOS lets Hippius run. If iOS ends the task early, the backup shows as <strong>Paused</strong>, not failed, and a <strong>Backup paused</strong> notification asks you to open Hippius to carry on.</li>
  <li><strong>Any iOS version.</strong> While the app is open, a few small photos that are ready to send are handed to iOS to upload, and they keep going even after you lock your iPhone. This doesn't happen with <a href="#choosing-when-it-uploads">Upload on Wi-Fi only</a> turned on.</li>
</Unordered>

When there are photos left and nothing is carrying the backup, a card on Overview, Drive and the Camera Uploads screen reads **Keep backing up in the background**. Tap <BgStyledText>Continue in background</BgStyledText> to start it again. This card needs iOS 26 or later.

Keep **Background App Refresh** on for Hippius, keep **Low Power Mode** off, and don't swipe Hippius away in the app switcher. See [How iOS runs backups in the background](/use/mobile/permissions#ios-background).

If you use **Optimize iPhone Storage**, many of your photos live in iCloud, and the app downloads each one from iCloud before it can back it up. That makes an iPhone backup slower than an Android one, but it keeps moving and shows its progress.

### Fast backup (iPhone) {#fast-backup}

Uploading is much quicker while Hippius is open on screen than in the background. **Fast backup** keeps the screen on and shows a simple **Backing up photos** screen, with how many are left, roughly how many photos a minute are going, and how long it has to go. Leave your iPhone on Wi-Fi and plugged in, for example overnight, and tap <BgStyledText>Done</BgStyledText> when you want your phone back. The screen only stays on while the backup is moving.

Start it from **Fast backup** on the Camera Uploads screen. On iOS 26 and later, with 500 or more photos left, the card on Overview and Drive becomes **Back up faster** and leads with <BgStyledText>Fast backup</BgStyledText>, with **Continue in background** next to it.

## Where to next

<Unordered>
  <li><a href="/use/mobile/permissions">Permissions and Background Backups</a>: keep backups running when you are not using the app.</li>
  <li><a href="/use/mobile/troubleshooting">Troubleshooting</a>: when a backup stops or doesn't start.</li>
  <li><a href="/use/mobile/drive">Your Files</a>: browse, share and download what you have backed up.</li>
</Unordered>
