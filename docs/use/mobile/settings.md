---
id: settings
title: Settings
sidebar_label: Settings
slug: /use/mobile/settings
description: Every setting in the Hippius mobile app. Camera Uploads, biometric lock, your mnemonic seed and unlock password, Wi-Fi only uploads, delete confirmation, backup notifications, appearance, updates, cache, your account, and deleting it.
---

import Unordered from '@site/src/components/Unordered';
import Ordered from '@site/src/components/Ordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

Everything you can change about how the app behaves on this phone. Open it with the **gear** button at the top right of Overview or Drive.

<Screenshot src="/img/mobile/settings.png" alt="The Settings screen" dark raw phone />

## What's on the Settings screen {#settings-at-a-glance}

The screen opens with two cards, followed by your preferences, then help and app information, and finally two buttons at the bottom.

| Setting                     | What it does                                                            | Default |
| --------------------------- | ----------------------------------------------------------------------- | ------- |
| **Account** card            | Opens your [Account](#your-account) screen.                             |         |
| **Storage** card            | Opens the [Storage](#storage) breakdown.                                |         |
| **Camera Uploads**          | Opens the Camera Uploads settings. The row shows **On** or **Off**.     | Off     |
| **Biometric lock**          | Asks for your fingerprint or face before the app opens.                 | Off     |
| **Security**                | Back up your mnemonic seed, and set or change your unlock password.     |         |
| **Upload on Wi-Fi only**    | Pauses all uploads, including Camera Uploads, on mobile data.           | Off     |
| **Confirm before deleting** | Asks every time before something is deleted.                            | On      |
| **Backup notifications**    | Tells you when a Camera Uploads backup finishes.                        | On      |
| **Appearance**              | Light, dark, or following your phone. The row shows your choice.        | System  |
| **Contact support**         | Opens Hippius support in the console.                                   |         |
| **App version**             | The version installed on this phone.                                    |         |
| **Check for Updates**       | Checks whether a newer version of the app is available.                 |         |
| **Terms of Service**        | Opens our terms in your browser.                                        |         |
| **Privacy Policy**          | Opens our privacy policy in your browser.                               |         |
| **Clear cache data**        | Frees the space used by files you have opened.                          |         |
| **Logout**                  | Signs you out of this phone.                                            |         |

Settings apply to this phone only. Your files, your plan and your unlock password belong to your account and are the same everywhere you sign in.

## Camera Uploads {#camera-uploads}

The **Camera Uploads** row opens the screen where you choose which photos are backed up, the Drive folder they go to, whether videos are included, and where you turn backup on or off. The row reads **On** or **Off** so you can see at a glance whether backup is running.

Everything on that screen is covered in [Camera Uploads](/use/mobile/camera-uploads#changing-settings-later).

## Biometric lock

**Biometric lock** asks for your fingerprint or face before the app opens. It protects the app on this phone, which is worth having if other people handle it.

<Ordered>
  <li>Turn on <strong>Biometric lock</strong>.</li>
  <li>Your phone asks you to confirm it is you. The lock only turns on once that check passes, so you can't lock yourself out with a sensor that isn't working.</li>
</Ordered>

From then on, the app asks for your fingerprint or face every time it starts. It also locks whenever you leave it: when you come back, it shows **Hippius is locked**. Tap <BgStyledText>Unlock</BgStyledText> and confirm to carry on. Turning the lock off never asks for anything.

Backups and uploads keep going while the app is locked. The lock only covers what is on screen.

The lock is separate from your [unlock password](#unlock-password). It only decides who can open the app on this phone, and it has nothing to do with how your files are encrypted.

### On Android {#biometric-lock-android}

The line under the switch names what your phone uses, usually **Use fingerprint to open Hippius app**. The lock works with the fingerprint or face unlock you have set up in your phone's security settings.

If turning it on doesn't work, the app tells you why:

<Unordered>
  <li><strong>Nothing is set up yet.</strong> Add a fingerprint in your phone's settings first. The message offers <BgStyledText>Open Settings</BgStyledText>.</li>
  <li><strong>Too many failed attempts.</strong> Your phone has locked the sensor for a while. Choose <BgStyledText>Use passcode</BgStyledText> and confirm your phone's PIN, pattern or password to unlock it.</li>
</Unordered>

{/* iOS START: hidden until the App Store release. To show it again, close this comment at the end of this line and reopen it at the start of the iOS END line.

### On iPhone {#biometric-lock-iphone}

The line under the switch reads **Use Face ID to open Hippius app**.

The first time you turn it on, iOS asks whether Hippius may use Face ID. Tap **OK**. If you chose **Don't Allow**, the app says **Face ID unavailable** and offers <BgStyledText>Open Settings</BgStyledText>. Turn on **Face ID** under **Settings → Hippius**, then try again.

After too many failed attempts, iOS locks Face ID for a while. Choose <BgStyledText>Use passcode</BgStyledText> and enter your iPhone passcode to unlock it.

iOS END */}

## Security

Open <BgStyledText>Settings</BgStyledText> → <BgStyledText>Security</BgStyledText> to manage the two things that keep your files yours:

<Unordered>
  <li>Your <strong>mnemonic seed</strong>, the 12-word key that encrypts your files.</li>
  <li>Your <strong>unlock password</strong>, which lets you open your files on a new phone without typing the seed.</li>
</Unordered>

<Screenshot src="/img/mobile/settings/security.png" alt="The Security screen" dark raw phone />

### Mnemonic Seed {#mnemonic-seed}

Every file you upload is encrypted on your phone before it leaves it. The key that does the encrypting is a 12-word **mnemonic seed** that belongs to your account. Hippius never has this seed in a readable form, which is why nobody but you can open your files, and also why nobody at Hippius can get them back for you if the seed is lost.

**If you signed in with Google, Github, or Apple**, the seed was created for you and lives in your phone's secure storage. You should back it up once, so that you can still reach your files if you lose this phone. The <strong>Mnemonic Seed</strong> row on the Security screen is where you do that.

**If you signed in with an access key**, that key is your mnemonic seed. You already have it, so the Security screen does not show the backup row. Keep your access key with the same care described below.

#### Backing up your mnemonic seed

<Ordered>
  <li>Tap <BgStyledText>Backup Mnemonic Seed</BgStyledText>.</li>
  <li>Read the handling tips. Make sure nobody can see your screen, then tap <BgStyledText>I Understand, Show My Mnemonic Seed</BgStyledText>.</li>
  <li>The 12 words are blurred. Tap <BgStyledText>Show</BgStyledText> to reveal them and write them down in order, on paper.</li>
  <li>When you are done, tap <BgStyledText>I Have Written It Down</BgStyledText>.</li>
</Ordered>

<Screenshot src="/img/mobile/settings/mnemonic-backup-tips.png" alt="Secure Your Mnemonic Seed step with handling tips" dark raw phone />

Two more options on the same screen:

<Unordered>
  <li><BgStyledText>Copy</BgStyledText> puts the words on the clipboard for 30 seconds, then clears it. Paste them only into something you trust, such as a password manager.</li>
  <li><BgStyledText>Download Encrypted Backup</BgStyledText> saves the seed as a password-protected zip file named <code>hippius-recovery-backup-YYYY-MM-DD.zip</code>. Choose a password of at least 8 characters, confirm it, and tap <BgStyledText>Encrypt &amp; Save</BgStyledText>. The phone then asks where to save the file or which app to send it to. The zip uses standard AES-256 encryption and opens in most archive apps with the password you chose. That password is not stored anywhere, so keep it as safely as the seed.</li>
</Unordered>

:::danger Anyone with these words has your files
Never share your seed with anyone, including support staff. Never store it in email, chat, cloud notes, or screenshots. If you lose the seed and forget your unlock password, your encrypted files cannot be opened again.
:::

### Unlock Password {#unlock-password}

Your files are encrypted with your mnemonic seed, not with a password. The **unlock password** does not replace the seed. It protects an encrypted copy of your seed that Hippius stores for your account, so that you can open your files on another phone by typing a password instead of the 12 words.

When you enter your unlock password, the app downloads that encrypted copy, unlocks it on your phone, and keeps the seed in the phone's secure storage. Files are encrypted and decrypted on the phone. The seed and the password are never sent to Hippius.

The same unlock password works everywhere you use Hippius. If you also use the Hippius desktop app or the web console, you are asked for it there too, and a password set or changed in one place applies to all of them.

:::danger Your unlock password cannot be recovered
Hippius never sees your unlock password, so it cannot be reset for you. If you forget it, the only way back in is your mnemonic seed. Keep both somewhere safe. See [Forgot Your Password? Restore Access](#restore-access).
:::

When you are asked for it:

| Situation | What happens |
|---|---|
| First upload on a new account | The app asks you to create an unlock password before the file is encrypted. |
| Signing in on a new phone | The app asks for your unlock password once, right after sign-in, and then remembers you until you sign out. |
| Web console | Asked whenever you preview, download, or upload a file. |
| Desktop app | Asked when you sign in on a new computer. |

:::tip Camera Uploads doesn't wait for it
Camera Uploads backs up your photos without asking for an unlock password. Set one anyway, so you can open those photos in the web console and the desktop app too.
:::

#### Setting Your Unlock Password {#setting-your-unlock-password}

If your account has no unlock password yet, the app asks you to create one the first time you upload a file. You can also do it any time from Security, where the row reads <BgStyledText>Set Unlock Password</BgStyledText>.

<Ordered>
  <li>Tap <BgStyledText>Set Unlock Password</BgStyledText>. The <strong>Protect Your Account</strong> sheet opens.</li>
  <li>Under <strong>Create Unlock Password</strong>, enter a password of at least 8 characters. The strength meter must read <strong>OK</strong> or <strong>Strong</strong>. A phrase of several unrelated words works well.</li>
  <li>Repeat it under <strong>Confirm Password</strong>.</li>
  <li>Tap <BgStyledText>Create Password</BgStyledText>.</li>
</Ordered>

Before saving, the app checks whether your account already has an unlock password, for example one you set in the desktop app or the console. If it does, nothing is replaced and the row switches to <BgStyledText>Change Unlock Password</BgStyledText>.

#### Unlocking on a New Phone {#unlocking}

After you sign in on a phone that has not seen your account before, the app shows <strong>Unlock Your Account</strong>. Enter your unlock password and tap <BgStyledText>Unlock</BgStyledText>. The app fetches your encrypted seed copy, opens it, and you land on your files. You are not asked again on this phone until you sign out.

<Screenshot src="/img/mobile/unlock-your-account.png" alt="Unlock Your Account sheet" dark raw phone />

#### Changing Your Unlock Password {#changing-your-unlock-password}

<Ordered>
  <li>Open <BgStyledText>Settings</BgStyledText> → <BgStyledText>Security</BgStyledText> and tap <BgStyledText>Change Unlock Password</BgStyledText>.</li>
  <li>Enter your <strong>Current Password</strong>.</li>
  <li>Enter a <strong>New Password</strong> that meets the strength requirement and differs from the current one, then repeat it under <strong>Confirm New Password</strong>.</li>
  <li>Tap <BgStyledText>Change Password</BgStyledText>.</li>
</Ordered>

<Screenshot src="/img/mobile/settings/change-unlock-password.png" alt="Change Unlock Password sheet" dark raw phone />

The app opens your encrypted seed copy with the current password, re-encrypts the same seed with the new password, and replaces the copy. Your seed does not change and your files are not re-encrypted, so nothing is re-uploaded. Use the new password from now on, on every device.

If the current password is wrong, the sheet shows **Incorrect current password.** If you no longer know it, tap **Forgot current password?** to open [Restore Access](#restore-access).

#### Forgot Your Password? Restore Access {#restore-access}

If you forget your unlock password, you can set a new one with your mnemonic seed. Open the flow from either place:

<Unordered>
  <li>On the <strong>Unlock Your Account</strong> sheet, tap <strong>Forgot your password?</strong>, then <strong>Use your mnemonic seed</strong>.</li>
  <li>On the <strong>Change Unlock Password</strong> sheet, tap <strong>Forgot current password?</strong>.</li>
</Unordered>

The <strong>Restore Access</strong> sheet asks for your seed and a new password:

<Ordered>
  <li>Under <strong>Mnemonic Seed</strong>, enter or paste your 12-word seed phrase.</li>
  <li>Enter a <strong>New Unlock Password</strong> and repeat it under <strong>Confirm Password</strong>.</li>
  <li>Tap <BgStyledText>Restore and Set Password</BgStyledText>.</li>
</Ordered>

<Screenshot src="/img/mobile/restore-access.png" alt="Restore Access sheet" dark raw phone />

The app checks that the seed belongs to the account you are signed in to before anything is replaced. A seed for a different account is rejected and your existing backup is not touched. If it matches, the app creates a new encrypted copy of the same seed, protected by your new password. Your files are not re-encrypted, and the seed never leaves your phone.

**If this phone already holds your seed**, for example because you signed in with an access key, the sheet skips the seed field and only asks for the new password. The message reads "Choose a new unlock password. This device already has your mnemonic seed, so the current password is not required."

:::warning Lost both?
Hippius never sees the password or the seed, so neither can be recovered for you. If you lose both, your encrypted files cannot be decrypted. Back up your seed while you still have it.
:::

## Uploads

Three switches control how uploads and deletes behave on this phone.

### Upload on Wi-Fi only {#wi-fi-only}

Off by default, so uploads use Wi-Fi or mobile data, whichever you are on.

Turn it on and everything that uploads waits for Wi-Fi: files you upload yourself and Camera Uploads. On mobile data they pause, and they carry on by themselves once you are back on Wi-Fi.

If you try to upload, turn on Camera Uploads, resume or retry while you are on mobile data, the app stops and tells you why, for example **Uploads need Wi-Fi** or **Camera Backup needs Wi-Fi**. Connect to Wi-Fi, or tap <BgStyledText>Open Settings</BgStyledText> and turn the switch off.

### Confirm before deleting {#confirm-before-deleting}

On by default. Before anything is deleted, the app asks, for example, **Are you sure you want to delete "Holiday.jpg"?**, and reminds you that it can't be undone. Tap <BgStyledText>Delete</BgStyledText> to go ahead or <BgStyledText>Cancel</BgStyledText> to keep it.

Turn it off if you would rather delete without the extra step. Deleting is permanent either way. There is no bin to restore from.

### Backup notifications {#backup-notifications}

On by default. When a Camera Uploads backup finishes, the app tells you, both in the app's notifications and on your phone. Turn it off if you would rather check on backups yourself.

This switch doesn't affect the quiet notification Android shows while a backup is running in the background. That one is required by Android and goes away when the backup is done.

Your phone also has to allow Hippius to send notifications. The app asks after you first sign in, and on Android asks again when you turn on Camera Uploads if you haven't allowed it yet. See [Permissions](/use/mobile/permissions#notifications).

## Appearance

Open <BgStyledText>Settings</BgStyledText> → <BgStyledText>Appearance</BgStyledText> and choose a **Theme**:

<Unordered>
  <li><strong>System</strong> follows your phone's light or dark setting. This is the default.</li>
  <li><strong>Light</strong> keeps the app light.</li>
  <li><strong>Dark</strong> keeps the app dark.</li>
</Unordered>

The change applies straight away, and the Appearance row shows which one you picked.

## Help and app information {#help-and-app-information}

<Unordered>
  <li><strong>Contact support</strong> opens Hippius support in the console, in your browser. Sign in there with the same account to open a ticket. See <a href="/use/console/support">Help &amp; Support</a>.</li>
  <li><strong>App version</strong> shows the version installed on this phone. Support may ask you for it.</li>
  <li><strong>Check for Updates</strong> checks for a newer version straight away. If there is one, you can install it from there. Otherwise it says <strong>You're up to date</strong>. The app also checks by itself when it opens, but only this button tells you when you are already on the latest version. See <a href="/use/mobile/getting-started#updates">Keeping the app up to date</a>.</li>
  <li><strong>Terms of Service</strong> and <strong>Privacy Policy</strong> open in your browser.</li>
</Unordered>

## Clearing the cache {#clear-cache}

When you open a photo, video or PDF, the app keeps a decrypted copy on your phone so it opens instantly next time. The <BgStyledText>Clear cache data</BgStyledText> button at the bottom of Settings shows how much space those copies use.

Tap it, then <BgStyledText>Clear</BgStyledText> to confirm. This frees the space on your phone. Your files in Drive are not touched, and anything you open again is simply downloaded again. Uploads in progress are not affected.

## Storage

From Overview, tap the **Storage** card, or the same card at the top of Settings, to see what is using your space. The **Storage** screen shows:

<Unordered>
  <li>How much you have used out of your plan's total.</li>
  <li>How much of it goes to <strong>Videos</strong>, <strong>Images</strong>, <strong>Files</strong> and <strong>Others</strong>. Tap a row to highlight it in the chart.</li>
  <li><strong>Upload sources</strong>: how many of your files were added from the <strong>Desktop</strong> app, the <strong>Console</strong> and <strong>Mobile</strong>.</li>
  <li>A <strong>Notice</strong> once you pass 80% of your storage, with how much space is left.</li>
</Unordered>

## Your account

Open **Account** from the **Account** card at the top of Settings, or from the **Plan** card on Overview. It shows:

<Unordered>
  <li><strong>Who you are signed in as.</strong> If you signed in with Google, Github or Apple, you see your name and email. Your <strong>wallet address</strong> is shown too, with a button to copy it.</li>
  <li><strong>Your current plan</strong> and how much storage it gives you. This is read only.</li>
</Unordered>

Your mnemonic seed is not shown here. It lives in your phone's secure storage, and the only place the app reveals it is the deliberate backup flow under [Security](#mnemonic-seed).

:::info
Managing subscriptions isn't available in the Hippius mobile app. The Account screen only shows which plan you are on.
:::

### Logging out {#logging-out}

Tap <BgStyledText>Logout</BgStyledText> on the Account screen or at the bottom of Settings, then confirm. Logging out removes your session and your seed from this phone. Your files are untouched, and signing back in brings everything back.

Before you log out, make sure you can sign back in: with the same Google, Github or Apple account, or with your access key. If this phone was the only place your seed lived, [back it up](#backing-up-your-mnemonic-seed) first.

## Delete account

At the bottom of the **Account** screen, below **Logout**, is **Delete my account**. It deletes your whole Hippius account — not just the app on this phone — and everything in it.

Deleting is not instant. Your account is **locked the moment you confirm**, and permanently deleted **7 days later**. Those 7 days are a grace period: until the deletion runs you can still stop it and get everything back.

:::danger This deletes everything
Your files, buckets, container images, subscriptions and remaining credits all go, on every device and on the console too. After the 7 days there is nothing left to restore, and no copy on our side to restore it from.
:::

### What gets deleted

The first step is not a warning, it is an **inventory**. The app reads your account live and lists what is actually there, in six groups: **Storage**, **Compute**, **Registry and network**, **Subscriptions**, **Credits**, and **Access and account**.

Only groups that hold something get a checkbox to tick. A group that is empty collapses to a single grey line, so you are only asked to confirm what you actually have. The app has no virtual machines or databases of its own, so unless you run them from the console, **Compute** will simply read "No VMs or databases".

If you do have a **running** VM or managed database, that blocks the request until it is decommissioned from the console.

### The steps

Tap <BgStyledText>Delete my account</BgStyledText> to open the sheet. Everyone finishes by typing the confirmation phrase; the only thing that differs is whether there is an email step before it:

| How you sign in                                   | Steps                                   |
| ------------------------------------------------- | --------------------------------------- |
| **Email or social login** (Google, GitHub, Apple) | **3** — inventory, emailed code, phrase |
| **Recovery seed or access key**                   | **2** — inventory, phrase               |

A wallet-only account is deleted in exactly the same way, on exactly the same 7 day schedule. It simply has no mailbox to send a code to, so that one step does not exist and the counter reads "OF 2" instead of "OF 3".

<Ordered>
  <li><strong>What will be deleted.</strong> Read the inventory and tick each group's checkbox. <strong>Continue</strong> stays disabled until every group that holds something is ticked.</li>
  <li><strong>Prove it's you.</strong> Email and social logins only. A <strong>6-digit code</strong> is sent the moment this step opens, so you never have to ask for it. It expires in 15 minutes, and <strong>Resend</strong> becomes available again 60 seconds after each send.</li>
  <li><strong>Type to confirm.</strong> Type <BgStyledText>delete my account</BgStyledText> exactly, then tap the red <strong>Delete my account</strong> button.</li>
</Ordered>

### After you confirm

The app does not throw you out. The sheet turns into a final step headed **Your account is locked**, which gives the exact date your account will be deleted and says how to keep it before then.

That step has no close button. The only way out is <BgStyledText>Sign out</BgStyledText>, and that is deliberate: confirming revokes every session token, including this phone's, so the session behind the screen is already dead. Read the date, then sign out.

### Changing your mind

You have the whole grace period to stop the deletion. How you do it depends on how you sign in.

**If your account has an email address**, use the **cancel link in the email** sent when the deletion is scheduled. It works without signing in, which matters, because your sessions were revoked when you confirmed.

**If you sign in with a recovery seed or an access key** there is no email, so the cancel link doesn't apply. Instead:

<Ordered>
  <li>Sign in again on this phone. A locked account can still sign in.</li>
  <li>Open the <strong>Account</strong> screen.</li>
  <li>Where <strong>Delete my account</strong> used to be, it now reads <strong>Scheduled for deletion on …</strong>. Tap <BgStyledText>Cancel deletion</BgStyledText>.</li>
</Ordered>

Either way the result is the same: your account is active again, the lock is lifted, and nothing was deleted.

:::warning Signing back in does not cancel anything by itself
While a deletion is scheduled the app still opens, but the account stays locked and most screens will be empty or show an error. That is expected. Until you actually tap **Cancel deletion**, the countdown is still running.
:::

Some deletions are final from the moment they are confirmed. When that is the case the sheet says so in amber before you commit, and the Account screen afterwards reads **This deletion cannot be cancelled** with no button beside it.

:::info One account, two places
The app and the [console](https://console.hippius.com) act on the same account. A deletion started on your phone can be cancelled from the console, and one started on the console shows up here.
:::

## Where to next

<Unordered>
  <li><a href="/use/mobile/camera-uploads">Camera Uploads</a>: back up your photos automatically.</li>
  <li><a href="/use/mobile/permissions">Permissions and Background Backups</a>: what the app asks your phone for, and why.</li>
  <li><a href="/use/mobile/troubleshooting">Troubleshooting</a>: fixes for the most common problems.</li>
</Unordered>
