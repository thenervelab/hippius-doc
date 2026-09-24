---
id: permissions
title: Permissions and Background Backups
sidebar_label: Permissions and Backups
slug: /use/mobile/permissions
description: What the Hippius mobile app asks your phone for and why, and what to allow so Camera Uploads keeps running when you are not using the app.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

Phones are strict about two things: what an app may see, and when it may run. Both matter for Hippius, because Camera Uploads needs to read your photos and keep working while the app is closed. This page covers both: the permissions the app asks for, and what to allow so backups keep going on their own.

The app asks for each permission when it first needs it, rather than all at once. It never asks for your location or your contacts.

## Android permissions {#android}

### What the app asks for {#what-the-app-asks-for}

| Permission            | When it is asked                                                    | What it is for                                                  | If you say no                                                           |
| --------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Photos and videos** | When you set up Camera Uploads                                      | Finding the photos and videos to back up                        | Camera Uploads can't run. Picking photos to upload by hand still works. |
| **Camera**            | When you choose **Take photo or video**                             | Taking a photo or video to upload straight away                 | Upload photos you have already taken instead.                           |
| **Notifications**     | After you first sign in, and again when you turn on Camera Uploads | Showing backup progress, and telling you when a backup finishes | Backups still run. You just don't see them in your notifications.       |

**Biometric lock** uses the fingerprint or face unlock already set up on your phone, so Android doesn't ask a separate question for it.

### Photos and videos {#android-photos}

When you set up Camera Uploads, Android asks whether Hippius may access your photos and videos. On Android 14 and later there are three answers:

<Unordered>
  <li><strong>Allow all</strong> lets Hippius see your whole library. Choose this for Camera Uploads.</li>
  <li><strong>Select photos and videos</strong> lets Hippius see only the items you pick. Camera Uploads then backs up only those, and never sees new photos you take. The <strong>Upload from</strong> sheet says so and offers <strong>Change selection</strong>. When you turn backup on, the app warns you again with <strong>Limited photo access</strong>, and offers <strong>Select Photos…</strong> or <strong>Allow Full Access</strong>.</li>
  <li><strong>Don't allow</strong> gives no access. Camera Uploads can't be turned on.</li>
</Unordered>

On Android 13 and earlier, the choice is simply **Allow** or **Don't allow**.

To change it later:

<Ordered>
  <li>Open your phone's <strong>Settings</strong> → <strong>Apps</strong> → <strong>Hippius</strong>.</li>
  <li>Tap <strong>Permissions</strong>, then <strong>Photos and videos</strong>.</li>
  <li>Choose <strong>Allow all</strong>.</li>
</Ordered>

The app can take you there: on the **Upload from** sheet, tap **Manage in settings**, then <BgStyledText>Open settings</BgStyledText>.

### Notifications {#notifications}

On Android 13 and later, apps need your permission to show notifications. Hippius asks after you first sign in, and again when you turn on Camera Uploads if you haven't allowed it yet.

Allow it. While a backup runs in the background, Android requires a visible notification for it, and without the permission you can't see it. Backups still run if you say no, and you can turn notifications on later under **Settings → Apps → Hippius → Notifications**.

The **Backup notifications** switch in the app's own Settings decides whether you are told when a backup finishes. See [Settings](/use/mobile/settings#backup-notifications).

## Keeping backups running on Android {#android-keep-running}

Once Camera Uploads is on, it keeps working in the background. Android limits what apps can do there, so these settings decide whether backups keep going while you use your phone for other things.

### Battery optimization {#battery-optimization}

To save battery, Android limits what apps can do while they are not on screen. With battery optimization on, Android may stop a backup that is running in the background, and delay or skip the regular checks that pick up new photos. Camera Uploads then only catches up the next time you open the app.

Turning off battery optimization for Hippius lets backups keep going in the background. The app asks in three places:

<Unordered>
  <li><strong>The first time you open your backup folder</strong>, a dialog says <strong>Camera uploads may stop syncing</strong>. Tap <BgStyledText>Stop optimising</BgStyledText>.</li>
  <li><strong>Settings → Camera Uploads → Continuous camera uploads</strong> shows <strong>Off</strong> while optimization is on. Tap it, then <BgStyledText>Stop optimizing battery</BgStyledText>.</li>
  <li><strong>A warning triangle</strong> appears in your backup folder's header while something still needs your attention. Tap it to see what is left.</li>
</Unordered>

Each of them opens Android's own prompt, which asks whether to let Hippius always run in the background. Tap <BgStyledText>Allow</BgStyledText>. **Continuous camera uploads** then reads **On**.

<Screenshot src="/img/mobile/permissions/battery-optimization.png" alt="The Camera uploads may stop syncing dialog" dark raw phone />

:::tip Some phones add their own battery saver
Turning off battery optimization is enough on many phones, but not all. Some phone makers add a battery manager of their own that can still stop Hippius. See [When your phone stops backups anyway](#phone-battery-managers).
:::

### Pause app activity if unused {#pause-app-activity}

If you don't open an app for a few months, Android can take away its permissions and stop it running, to free up space and protect your privacy. For Hippius that means losing photo access, and Camera Uploads stops.

While this setting is on for Hippius, the app reminds you every time you open the **Upload from** sheet. Tap <BgStyledText>Open settings</BgStyledText> and switch it off. The setting has a different name on each Android version:

| Android version     | What it is called                          | Where it is                              |
| ------------------- | ------------------------------------------ | ---------------------------------------- |
| 15 and later        | **Manage app if unused**                   | App info → Unused app settings           |
| 13 and 14           | **Pause app activity if unused**           | App info                                 |
| 12                  | **Remove permissions and free up space**   | App info                                 |
| 11                  | **Remove permissions if app isn't used**   | App info → Permissions                   |
| 10 and earlier      | **Remove permissions if app isn't used**   | Play Protect → Permissions for Unused Apps |

To find **App info**, open your phone's **Settings → Apps → Hippius**.

<Screenshot src="/img/mobile/permissions/unused-app.png" alt="The dialog asking to turn off Manage app if unused" dark raw phone />

### Keep camera uploads running {#keep-camera-uploads-running}

If both battery optimization and the unused app setting still need changing, the warning triangle in your backup folder opens a sheet called **Keep camera uploads running**. It lists what is left, each with a button that takes you to the right place. As you finish them they disappear, and the sheet says **You're all set** when there is nothing left to do.

<Screenshot src="/img/mobile/permissions/keep-running.png" alt="The Keep camera uploads running sheet" dark raw phone />

### How Android runs backups in the background {#android-background}

<Unordered>
  <li><strong>While a backup is running</strong> and you leave the app, Hippius keeps uploading. A quiet notification, <strong>Hippius Camera Uploads: Backing up your photos in the background</strong>, stays in your notifications while it works, and goes away when the backup is done. Tap it to open the app.</li>
  <li><strong>New photos</strong> are picked up when you open the app, and by a background check that Android runs from time to time. Android decides exactly when, at most about every 15 minutes, and less often when the battery is low or battery saver is on. Each check backs up a batch, and the next one carries on.</li>
  <li><strong>Closing the app</strong> by swiping it away from your recent apps usually doesn't stop a backup that is already running. Some phones stop it anyway. See <a href="#phone-battery-managers">When your phone stops backups anyway</a>.</li>
  <li><strong>Restarting your phone</strong> ends a running backup. The background checks start again after the restart and carry on a batch at a time. Open the app to get the backup going at full speed again.</li>
  <li><strong>Android 15 and later</strong> limit how long an app may upload in the background. On a long backup, Android may stop it after a while. It carries on at the next background check, or as soon as you open the app.</li>
  <li><strong>Force stop</strong> (Settings → Apps → Hippius → Force stop) stops everything, including background checks, until you open the app again.</li>
</Unordered>

A backup that is running in the background can only be started from the open app. That is why opening Hippius is always the quickest way to get a stalled backup moving again.

### When your phone stops backups anyway {#phone-battery-managers}

Even with battery optimization off and every permission allowed, **a backup can still stop in the background on some Android phones**. Many phone makers add a battery manager of their own on top of Android's. It can close apps that are running in the background whatever you have allowed, often within about 15 minutes of leaving them.

When that happens:

<Unordered>
  <li>The <strong>Hippius Camera Uploads</strong> notification disappears, even though the backup hasn't finished.</li>
  <li>Hippius can't restart the backup by itself, because Android only lets the open app start one. Android's background checks may still back up a batch now and then, but many of these phones hold those back too.</li>
  <li>Nothing is lost. The next time you open Hippius, the backup carries on from where it stopped, and photos that were already backed up are not uploaded again.</li>
</Unordered>

To make it happen less often, look through your phone's own battery settings for Hippius. They are usually under **Settings → Apps → Hippius → Battery**, or in the phone's **Battery** settings. The names change from one phone maker and software version to the next, but look for settings like these:

| Phone                     | What to look for                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Samsung**               | Battery set to **Unrestricted**, and Hippius on the list of apps that never sleep, under **Battery → Background usage limits** |
| **Xiaomi, Redmi, POCO**   | **Autostart** turned on, and battery set to **No restrictions**                                                |
| **OnePlus, OPPO, realme** | **Allow background activity** and **Allow auto launch** turned on                                              |
| **vivo**                  | Hippius allowed to use power in the background, under **Battery → Background power consumption management**  |
| **Huawei, Honor**         | Under **Battery → App launch**, **Manage automatically** turned off for Hippius, with **Run in background** on |

Some phones also let you lock an app on the recent apps screen, often with a padlock icon, so that clearing your recent apps doesn't close it. If yours does, lock Hippius.

Even so, some phones still close apps in the background. For a big backup, keep your phone on Wi-Fi and plugged in, and open Hippius now and then to keep it moving.

{/* iOS START: hidden until the App Store release. To show it again, close this comment at the end of this line and reopen it at the start of the iOS END line.

## iPhone permissions {#iphone}

### What the app asks for {#what-the-app-asks-for-iphone}

| Permission        | When it is asked                                                      | What it is for                                                        | If you say no                                                                   |
| ----------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Photos**        | When you set up Camera Uploads, or first choose **Upload Photos**     | Finding the photos and videos to back up, and keeping Live Photos' motion | Camera Uploads can't run. Upload Photos still works, but Live Photos upload as stills. |
| **Add to Photos** | The first time you save a downloaded photo or video                   | Saving downloads to the Photos app                                    | Photos and videos can't be saved to the Photos app.                             |
| **Camera**        | When you choose **Take photo or video**                               | Taking a photo or video to upload straight away                       | Upload photos you have already taken instead.                                   |
| **Microphone**    | The first time you record a video                                     | Recording sound with your video                                       | Videos may be recorded without sound.                                           |
| **Notifications** | After you first sign in                                               | Telling you when a backup finishes                                    | Backups still run. You just aren't told when they finish.                       |
| **Face ID**       | When you turn on **Biometric lock**                                   | Unlocking the app                                                     | The lock can't be turned on.                                                    |

You can change any of these later under **Settings → Hippius** on your iPhone.

### Photos {#iphone-photos}

When you set up Camera Uploads, iOS asks whether Hippius may access your photos:

<Unordered>
  <li><strong>Allow Full Access</strong> lets Hippius see your whole library. Choose this for Camera Uploads.</li>
  <li><strong>Limit Access</strong> lets Hippius see only the photos you pick, so only those are backed up. The app warns you with <strong>Limited photo access</strong> and offers <strong>Select Photos…</strong> to change the selection, or <strong>Allow Full Access</strong>.</li>
  <li><strong>Don't Allow</strong> gives no access. Camera Uploads can't be turned on.</li>
</Unordered>

To change it later, open the iPhone **Settings → Hippius → Photos** and choose **Full Access**.

The first time you choose **Upload Photos**, iOS asks for photo access too. Full access is what lets a Live Photo keep its motion. With limited access, Live Photos upload as stills, and the app tells you that **Live Photos need full photo access**.

When you save a downloaded photo or video, iOS separately asks whether Hippius may add it to your library.

## Keeping backups running on iPhone {#iphone-keep-running}

### Background App Refresh {#background-app-refresh}

iOS only lets Hippius back up in the background when **Background App Refresh** is on. Without it, Camera Uploads only runs while the app is open. To check:

<Ordered>
  <li>Open the iPhone <strong>Settings → General → Background App Refresh</strong>.</li>
  <li>Make sure Background App Refresh is on at the top, then turn it on for <strong>Hippius</strong>.</li>
</Ordered>

**Low Power Mode** turns Background App Refresh off for every app while it is on.

### How iOS runs backups in the background {#ios-background}

iOS gives apps very little time in the background, and it decides when:

<Unordered>
  <li><strong>Leaving the app.</strong> When a backup starts, the app shows <strong>Keep Hippius open while your photos back up. Backup may pause shortly after you leave the app.</strong> A few files that are already on their way keep uploading after you leave, although large videos usually wait. Then the backup pauses until iOS gives Hippius time again.</li>
  <li><strong>Background runs are delayed.</strong> iOS decides when Hippius may run in the background, often when your iPhone is idle and connected to power, such as overnight. It can be hours between runs, and each one only lasts a few minutes, so it backs up a little at a time.</li>
  <li><strong>Force-quitting stops it.</strong> If you swipe Hippius away in the app switcher, iOS doesn't run it in the background again until you open it yourself. Leave it in the app switcher instead.</li>
</Unordered>

The fastest way through a big backup on iPhone is to keep Hippius open on screen, on Wi-Fi and plugged in.

iOS END */}

## Where to next

<Unordered>
  <li><a href="/use/mobile/camera-uploads">Camera Uploads</a>: set up and manage your backup.</li>
  <li><a href="/use/mobile/troubleshooting">Troubleshooting</a>: when a backup stops or doesn't start.</li>
</Unordered>
