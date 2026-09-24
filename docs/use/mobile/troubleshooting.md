---
id: troubleshooting
title: Troubleshooting
sidebar_label: Troubleshooting
slug: /use/mobile/troubleshooting
description: Fixes for the most common problems in the Hippius mobile app, above all Camera Uploads backups that stop, stall or never start.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';

## Introduction

Most problems in the app come down to one of a few things: a permission your phone has not granted, your phone pausing the app in the background, a Wi-Fi setting, or storage running out. Start with the problem that matches what you see.

## Backups {#backups}

### Camera Uploads stopped when I left the app {#backup-stops-in-background}

Whatever the cause, opening the app picks the backup up again from where it stopped. Photos that were already backed up are not uploaded again.

#### On Android {#backup-stops-android}

Android can stop apps in the background to save battery, and Camera Uploads with them. Check these, in order:

<Ordered>
  <li>Open <BgStyledText>Settings</BgStyledText> → <BgStyledText>Camera Uploads</BgStyledText>. If <strong>Continuous camera uploads</strong> reads <strong>Off</strong>, tap it, then <BgStyledText>Stop optimizing battery</BgStyledText>, and allow Hippius to run in the background. See <a href="/use/mobile/permissions#battery-optimization">Battery optimization</a>.</li>
  <li>Open your backup folder in Drive. If there is a <strong>warning triangle</strong> in its header, tap it and complete what it lists.</li>
  <li>Check your phone's own battery settings for Hippius, such as <strong>Unrestricted</strong>, <strong>Autostart</strong> or <strong>Allow background activity</strong>. The names differ from one phone maker to the next. See <a href="/use/mobile/permissions#phone-battery-managers">When your phone stops backups anyway</a>.</li>
  <li>Don't use <strong>Force stop</strong> on Hippius. It stops backups until you open the app again.</li>
</Ordered>

Even with all of this done, **some Android phones still close Hippius in the background**, often within about 15 minutes of leaving it. The phone maker's own battery manager does this, whatever you have allowed, and the app can't prevent it. You can tell it has happened when the **Hippius Camera Uploads** notification disappears before the backup is finished. Open Hippius to carry on. For a big backup, keep your phone on Wi-Fi and plugged in, and open the app now and then.

{/* iOS START: hidden until the App Store release. To show it again, close this comment at the end of this line and reopen it at the start of the iOS END line.

#### On iPhone {#backup-stops-iphone}

iOS pauses backups shortly after you leave the app, and runs them in the background only when it chooses, often hours later. Check these:

<Unordered>
  <li><strong>Background App Refresh</strong> is on for Hippius, under <strong>Settings → General → Background App Refresh</strong>.</li>
  <li><strong>Low Power Mode</strong> is off. It turns Background App Refresh off for every app.</li>
  <li>You haven't swiped Hippius away in the app switcher. iOS doesn't run it in the background again until you open it yourself.</li>
</Unordered>

For a big backup, keep the app open on screen, on Wi-Fi and plugged in. See [How iOS runs backups in the background](/use/mobile/permissions#ios-background).

iOS END */}

### Camera Uploads stopped after a long time without opening the app (Android) {#backup-stopped-after-months}

Android removes permissions from apps you haven't opened for a few months, and photo access goes with them. Open the app. If **Upload from** on the Camera Uploads screen reads **Not allowed**, allow photo access again. Then switch off **Pause app activity if unused** for Hippius so it doesn't happen again. See [Pause app activity if unused](/use/mobile/permissions#pause-app-activity).

### The backup is paused {#backup-paused}

The header reads **Backup paused**, and the progress in **Your Uploads** is grey. There are two reasons:

<Unordered>
  <li><strong>Someone tapped Pause.</strong> A pause lasts until you resume, even across restarts. Open <strong>Your Uploads</strong> and tap the resume button (▶).</li>
  <li><strong>Upload on Wi-Fi only is on and you are on mobile data.</strong> The backup carries on by itself once you are on Wi-Fi. If you tap resume, the app says <strong>Wi-Fi required to resume</strong>. See <a href="#nothing-uploads-on-mobile-data">Nothing uploads on mobile data</a>.</li>
</Unordered>

### Camera Uploads stopped after I restarted my phone (Android) {#after-restart}

Restarting your phone ends a running backup. Android's background checks carry on a batch at a time after the restart, but the quickest fix is to open Hippius once. The backup picks up where it left off.

### Nothing uploads on mobile data {#nothing-uploads-on-mobile-data}

**Upload on Wi-Fi only** is on. Uploads and backups wait for Wi-Fi, and carry on by themselves once you are connected. To use mobile data as well, turn off <BgStyledText>Settings</BgStyledText> → <BgStyledText>Upload on Wi-Fi only</BgStyledText>.

This is also why you may see **Camera Backup needs Wi-Fi**, **Uploads need Wi-Fi**, **Wi-Fi required to resume** or **Wi-Fi required to retry**.

### Only some of my photos are backed up {#only-some-photos}

Check each of these:

<Unordered>
  <li><strong>Videos.</strong> Videos are only backed up with <strong>Include videos</strong> turned on.</li>
  <li><strong>Still going.</strong> A first backup of a big library takes hours. Open <strong>Your Uploads</strong> to see how many are left.</li>
</Unordered>

#### On Android {#only-some-photos-android}

<Unordered>
  <li><strong>Photo access.</strong> If you chose <strong>Select photos and videos</strong> when Android asked, Hippius only sees those photos. The <strong>Upload from</strong> row reads <strong>Limited access</strong>. Switch to <strong>Allow all</strong>. See <a href="/use/mobile/camera-uploads#photo-access">Photo access</a>.</li>
  <li><strong>Upload from.</strong> If you picked folders rather than <strong>All Photos</strong>, only those folders are backed up. Photos in other folders, such as Screenshots or WhatsApp Images, are left out.</li>
</Unordered>

{/* iOS START: hidden until the App Store release. To show it again, close this comment at the end of this line and reopen it at the start of the iOS END line.

#### On iPhone {#only-some-photos-iphone}

<Unordered>
  <li><strong>Photo access.</strong> If you chose <strong>Limit Access</strong> when iOS asked, Hippius only sees the photos you picked. The <strong>Upload from</strong> row reads <strong>Limited access</strong>. Switch to <strong>Full Access</strong> under <strong>Settings → Hippius → Photos</strong>. See <a href="/use/mobile/camera-uploads#photo-access-on-iphone">Photo access on iPhone</a>.</li>
  <li><strong>Upload from.</strong> If you picked smart albums rather than <strong>Camera Roll</strong>, only what is in those albums is backed up. Albums you made yourself can't be picked, so choose <strong>Camera Roll</strong> to include everything.</li>
</Unordered>

iOS END */}

### I can't turn on Camera Uploads {#cant-turn-on}

The Camera Uploads screen shows the reason under its options:

<Unordered>
  <li><strong>Allow photo access to turn on Camera Uploads.</strong> Photo access is off. Allow it in your phone's settings.</li>
  <li><strong>Select at least one photo or video to turn on Camera Uploads.</strong> You gave access to selected photos only, and none are selected. Give Hippius access to all your photos instead.</li>
  <li><strong>Camera Backup needs Wi-Fi.</strong> <strong>Upload on Wi-Fi only</strong> is on and you are on mobile data.</li>
</Unordered>

**On Android**, photo access is under **Settings → Apps → Hippius → Permissions → Photos and videos**. Choose **Allow all**.

{/* iOS START: hidden until the App Store release. To show it again, close this comment at the end of this line and reopen it at the start of the iOS END line.

**On iPhone**, photo access is under **Settings → Hippius → Photos**. Choose **Full Access**.

iOS END */}

### Some items failed {#failed-items}

The header says how many, for example **3 backup items failed**. Open **Your Uploads** and tap a failed item to see why. Then:

<Unordered>
  <li>Tap <BgStyledText>Retry</BgStyledText> to try it again.</li>
  <li>Tap <BgStyledText>Skip</BgStyledText> to leave that item out, so the rest of the backup can finish. You can upload it by hand later.</li>
</Unordered>

The app has already retried each of these a few times by itself. If many items fail at once, check your connection, and check whether your storage is full.

If the reason says your phone needs more free space, free some up and retry. Files are encrypted on your phone before they are uploaded, and a large video needs room for its encrypted copy.

### I never got the "backup finished" notification {#no-finished-notification}

<Unordered>
  <li>Check that <BgStyledText>Settings</BgStyledText> → <BgStyledText>Backup notifications</BgStyledText> is on.</li>
  <li>Check that your phone allows notifications from Hippius. On Android, that is under <strong>Settings → Apps → Hippius → Notifications</strong>.</li>
  <li>Open <strong>Your Uploads</strong>. A backup with failed items that are waiting for you doesn't count as finished. Retry or skip them, and the notification follows.</li>
</Unordered>

{/* iOS START: hidden until the App Store release. To show it again, close this comment at the end of this line and reopen it at the start of the iOS END line.

**On iPhone**, notifications for Hippius are under **Settings → Notifications → Hippius**.

iOS END */}

### I see the same photos twice {#duplicates}

After you reinstall the app, or set up Camera Uploads on a new phone, it starts from scratch and backs up every photo again as new copies, next to the old ones in the same folder. Their names end in a different code. Delete the copies you don't need. See [Good to know](/use/mobile/camera-uploads#good-to-know).

### I edited a photo but Hippius still has the old one {#edited-photo}

Camera Uploads backs each photo up once, and doesn't upload it again when you edit it. Upload the edited version by hand from **Upload Photos**, or save your edit as a copy in your editing app so it is backed up as a new photo.

### My storage is full {#storage-full}

When your Drive is full, uploads and backups stop. Delete files you no longer need, or move to a bigger plan in the console, then retry what failed. See [When your storage is full](/use/mobile/plans#when-your-storage-is-full).

## Plans and storage {#plans-and-storage}

### I subscribed in the console but the app still shows my old plan {#old-plan-showing}

<Unordered>
  <li>Switch away from the app and back again. It checks your plan whenever it comes back to the screen.</li>
  <li>Make sure you subscribed on the <strong>same account</strong> you use in the app: the same Google, Github or Apple account, or the same access key. A different one is a different Hippius account.</li>
  <li>After a card payment the plan can take up to a minute to activate. Check that it shows as active on <strong>Billing</strong> in the console.</li>
</Unordered>

### Uploads fail on an access key account {#access-key-no-plan}

Accounts that sign in with an access key don't include the free 10 GB, so their uploads and backups are refused until the account has a plan. Subscribe to one in the console. See [Subscribing to a plan](/use/mobile/plans#subscribing-to-a-plan).

## Signing in and unlocking {#signing-in-and-unlocking}

### I forgot my unlock password {#forgot-unlock-password}

Your mnemonic seed can set a new one. See [Restore Access](/use/mobile/settings#restore-access). Hippius can't reset the password for you, because we never see it.

### My files are gone after signing in {#files-gone}

You are probably signed in to a different account. Signing in with a different Google, Github or Apple account, or with a different access key, opens a different Hippius account. Log out and sign in exactly the way you did before.

## Still stuck? {#still-stuck}

Open <BgStyledText>Settings</BgStyledText> → <BgStyledText>Contact support</BgStyledText> to reach our team. It helps to tell us your phone model, its software version, and the **App version** shown in Settings.
