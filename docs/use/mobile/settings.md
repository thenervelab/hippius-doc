---
id: settings
title: Settings
sidebar_label: Settings
slug: /use/mobile/settings
description: Back up your mnemonic seed, set or change your unlock password, lock the app behind your fingerprint, control when uploads run, switch between light and dark, and delete your account.
---

import Unordered from '@site/src/components/Unordered';
import Ordered from '@site/src/components/Ordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

Everything you can change about how the app behaves on this phone.

<Screenshot src="/img/mobile/settings.png" alt="The Settings screen" dark raw />

## Biometric lock

**Biometric lock** asks for your fingerprint or face before the app opens. It protects the app on this phone, which is worth having if other people handle it.

## Security

Open <BgStyledText>Settings</BgStyledText> → <BgStyledText>Security</BgStyledText> to manage the two things that keep your files yours:

<Unordered>
  <li>Your <strong>mnemonic seed</strong>, the 12-word key that encrypts your files.</li>
  <li>Your <strong>unlock password</strong>, which lets you open your files on a new phone without typing the seed.</li>
</Unordered>

<Screenshot src="/img/mobile/settings/security.png" alt="The Security screen" dark raw />

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

<Screenshot src="/img/mobile/settings/mnemonic-backup-tips.png" alt="Secure Your Mnemonic Seed step with handling tips" dark raw />

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

<Screenshot src="/img/mobile/unlock-your-account.png" alt="Unlock Your Account sheet" dark raw />

#### Changing Your Unlock Password {#changing-your-unlock-password}

<Ordered>
  <li>Open <BgStyledText>Settings</BgStyledText> → <BgStyledText>Security</BgStyledText> and tap <BgStyledText>Change Unlock Password</BgStyledText>.</li>
  <li>Enter your <strong>Current Password</strong>.</li>
  <li>Enter a <strong>New Password</strong> that meets the strength requirement and differs from the current one, then repeat it under <strong>Confirm New Password</strong>.</li>
  <li>Tap <BgStyledText>Change Password</BgStyledText>.</li>
</Ordered>

<Screenshot src="/img/mobile/settings/change-unlock-password.png" alt="Change Unlock Password sheet" dark raw />

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

<Screenshot src="/img/mobile/restore-access.png" alt="Restore Access sheet" dark raw />

The app checks that the seed belongs to the account you are signed in to before anything is replaced. A seed for a different account is rejected and your existing backup is not touched. If it matches, the app creates a new encrypted copy of the same seed, protected by your new password. Your files are not re-encrypted, and the seed never leaves your phone.

**If this phone already holds your seed**, for example because you signed in with an access key, the sheet skips the seed field and only asks for the new password. The message reads "Choose a new unlock password. This device already has your mnemonic seed, so the current password is not required."

:::warning Lost both?
Hippius never sees the password or the seed, so neither can be recovered for you. If you lose both, your encrypted files cannot be decrypted. Back up your seed while you still have it.
:::

## Uploads

<Unordered>
  <li><strong>Upload on Wi-Fi only</strong> pauses uploads and Camera Uploads on mobile data.</li>
  <li><strong>Backup notifications</strong> tells you when a camera backup finishes.</li>
  <li><strong>Confirm before deleting</strong> asks every time before a file goes. On by default, since deleting is permanent.</li>
</Unordered>

## Appearance

Open <BgStyledText>Settings</BgStyledText> → <BgStyledText>Appearance</BgStyledText> to follow your phone's theme, or pin the app to light or dark.

## Storage

From Overview, tap the **Storage** card (or open Storage from navigation) to see what is using your space, broken down by kind of file, against what your plan gives you. A quick way to see whether it is photos or videos filling it up.

## Your account

Open **Account** from the Overview plan card (or the account entry in the app). It shows the email or identity you signed in with, your account address, and your current plan (read-only).

Your mnemonic seed is not shown here. It lives in your phone's secure storage, and the only place the app reveals it is the deliberate backup flow under [Security](#mnemonic-seed).

Signing out clears the session from this phone. Your files are untouched, and signing back in brings everything back.

:::info
Managing subscriptions is not available in the mobile app. Buy or change a plan on the [console](https://console.hippius.com). The app shows which plan you are on and picks up changes on its own.
:::

Also under Settings: **Check for Updates**, contact support, Terms, Privacy, and **Clear cache**.

## Delete account

At the bottom of the **Account** screen, below **Log out**, is **Delete my account**. It deletes your whole Hippius account — not just the app on this phone — and everything in it.

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
