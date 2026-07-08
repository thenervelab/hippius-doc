---
id: shared-links
title: Shared Links
sidebar_label: Shared Links
slug: /use/desktop/shared-links
description: Share any file as a public or password-protected link from the Hippius desktop app, including straight from macOS Finder, then manage your active links and history from the Shared Links page.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

With Hippius you can share a file as a link that anyone can open in a browser, with no Hippius account needed. Depending on the file, they can preview it right on the page or download it to their device. Your links can be **public** (anyone with the link) or **password-protected**.

To share a file, right click it in the desktop app and choose **Share via link**. We create a secure encrypted copy and generate a shareable URL, then copy it to your clipboard for you. On macOS you can also share straight from Finder: just right click any file or folder and choose **Share with Hippius**.

After sharing, all your active links are tracked on the **Shared Links** page. Open it with the <BgStyledText>Shared Links</BgStyledText> button in the top right of the <BgStyledIconWithText text="Drive" icon="Category" /> view header. From there you can copy a link again, revoke access, reshare a file, and see a history of ended shares.

:::tip Two ways to share
You can share from the **Drive view** inside the app, or, on macOS, right from **Finder**. Just right click any file or folder and choose **Share with Hippius**. See [Share from Finder](/use/desktop/share-from-finder).
:::

<Screenshot src="/img/desktop/shared-links-overview.png" alt="Shared Links page overview" dark />

## How Sharing Works

### Every file on Hippius is encrypted

All your files are encrypted end to end on your device before they are uploaded to the Hippius network. The Hippius network stores ciphertext only. Nobody else can read your files because nobody else has your key.

### How the desktop creates a share

The desktop app has a key advantage over the console when it comes to sharing: your synced files are already stored as plaintext on your local device. The sync engine encrypts them on the way up to Hippius, but on disk you have the originals. This means the desktop can create a share without needing to download and decrypt anything first.

When you right click a file and choose **Share via link**, the desktop:

<Ordered>
  <li><strong>Reads the local plaintext file</strong> from your sync folder directly. No download or decryption step needed.</li>
  <li><strong>Generates a fresh share key</strong>, a random 32-byte key unique to this one share. This key is completely independent from your folder key.</li>
  <li><strong>Encrypts the file with the share key</strong> using XChaCha20-Poly1305, then uploads the newly encrypted copy to Hippius as a separate object. This is independent of your regular sync copy.</li>
  <li><strong>Builds the recipient URL</strong>: <code>https://console.hippius.com/share/&lt;token&gt;#k=&lt;share_key&gt;</code>. The key is in the <code>#</code> fragment, and browsers never transmit fragments to servers, so we never see the key.</li>
  <li><strong>Shows the link in a modal</strong> and copies it to your clipboard automatically. The modal also shows when the link expires (for example, <em>Expires in 1d</em>). The link is live immediately.</li>
</Ordered>

The server stores the encrypted copy and returns a share token. It never learns the decryption key.

<Screenshot src="/img/desktop/shared-links-create.png" alt="Share creation dialog" dark />

:::info Why is sharing fast on desktop?
The desktop reads your local file directly with no download required. For most files this means the entire share process is as fast as your upload connection allows, with no extra round trip to fetch the file first.
:::

### What this means in practice

<Unordered>
  <li>Your original folder key stays private. Only the share key is used for the share upload.</li>
  <li>Revoking a share deletes the encrypted copy and frees the storage.</li>
  <li>Sharing the same file twice creates two independent copies, each with its own key.</li>
  <li>The server can never read the file, even while serving it to recipients. It only ever holds ciphertext.</li>
</Unordered>

## Before You Share

<Unordered>
  <li><strong>The file must be in a synced folder.</strong> Shared Links only works for files in one of your Hippius sync folders.</li>
  <li><strong>You need enough credits.</strong> Sharing uploads a new encrypted copy, which costs storage. The app checks your balance before starting. If you don't have enough, you'll see a credit error before the upload begins.</li>
</Unordered>

## Creating a Share

<Ordered>
  <li>In the <BgStyledIconWithText text="Drive" icon="Category" /> view, find the file you want to share. The file must be fully synced.</li>
  <li>Right click the file (or click the <BgStyledText>⋮</BgStyledText> menu on its row) and choose <BgStyledText>Share via link</BgStyledText>.</li>
  <li>The share dialog opens and runs the encrypt and upload steps automatically, showing <em>Encrypting and uploading…</em> while it works. You can press <BgStyledText>Cancel</BgStyledText> to stop before it finishes.</li>
  <li>When complete, the share URL is shown in the modal and copied to your clipboard automatically, along with when the link expires.</li>
  <li>Use the copy icon next to the URL to copy it again, <BgStyledText>Open in browser</BgStyledText> to preview the recipient page, or <BgStyledText>Revoke share</BgStyledText> to cancel the link right away. Click <BgStyledText>Done</BgStyledText> to close the dialog.</li>
</Ordered>

The link is live immediately. Anyone you send it to can download the file right away.

Sharing from the Drive view creates a **public** link. If you want a **password-protected** link, or you want to share a file that isn't in a synced folder, use [Share from Finder](/use/desktop/share-from-finder) on macOS.

## Active Shares

The Active Shares table shows every share currently live on your account, refreshed from the server every few seconds. It includes shares created from any device or the console, not just this desktop install.

If a share was created on a different device (or on the console), this device doesn't have the share key, so the filename shows as `<unknown>` and some actions are disabled.

### Copy link

Click <BgStyledText>Copy link</BgStyledText> from the row's action menu to copy the full recipient URL to your clipboard.

**Copy link is only available on the device where the share was created.** The share URL includes the encryption key, which is saved in a local database on the creating device. On any other device, the key isn't there and the option is disabled.

### Reshare

Click <BgStyledText>Reshare</BgStyledText> from the row's action menu to create a fresh share for the same file with a new expiry and a new link.

**Reshare is only available on the device that created the original share.** It requires both the share key and the source file's location in your sync folder. See [Reshare Mechanics](#reshare-mechanics) below for the full details.

When reshare completes, the old link is immediately revoked and the new URL is copied to your clipboard automatically.

### Revoke

Click <BgStyledText>Revoke</BgStyledText> from the row's action menu to permanently invalidate a share. Revoke works from any device, even if the share was created elsewhere.

A confirmation dialog appears first. When you confirm:

<Unordered>
  <li>The link stops working immediately for anyone who has it.</li>
  <li>The encrypted copy on Hippius is deleted, freeing the storage.</li>
  <li>The row moves to History as "Revoked."</li>
  <li>This cannot be undone.</li>
</Unordered>

:::warning Revoking is immediate and permanent
There is no grace period. Anyone with the link loses access the moment you confirm the revoke.
:::

### Shares from other devices

If a share was created on a different device or on the console, this device doesn't have the share key. In that case:

| Action        | Available         | Reason                                                                            |
| ------------- | ----------------- | --------------------------------------------------------------------------------- |
| **Name**      | Shows `<unknown>` | Filename is encrypted and decryption requires the key                             |
| **Copy link** | ❌ Disabled       | The URL includes the key fragment and only the creating device can reconstruct it |
| **Reshare**   | ❌ Disabled       | Requires the key and the source file location, both stored on the creating device |
| **Revoke**    | ✅ Available      | Only needs the share token, which the server returns in the list                  |

You can always revoke a share from any device, even if you didn't create it here.

## Reshare Mechanics {#reshare-mechanics}

There is no server endpoint to extend the expiry of an existing share. **Reshare** is the desktop app's workaround: it replaces the old share with a fresh one.

When you click Reshare:

<Ordered>
  <li>The old share token is revoked on the server. The old URL stops working immediately.</li>
  <li>The desktop reads the source file from your local sync folder and creates a completely new share, with a new encrypted copy, a new key, and a fresh expiry.</li>
  <li>The new recipient URL is copied to your clipboard automatically.</li>
</Ordered>

**Why Reshare requires the creating device:** The desktop needs to read the local plaintext file again to create the new encrypted copy. The source file's location (drive label and relative path) is stored in a local database on the device that created the original share. This information is not synced across devices.

If the old token has already expired by the time you click Reshare, the revoke step is skipped and the desktop goes straight to creating the new share.

:::info Reshare is not available on the console
The console doesn't have access to your local files. It would need to download and decrypt the Drive copy to create a new share, which is a heavier operation. The desktop app can do this fast because the file is already on disk. Reshare is a desktop only feature.
:::

## Share History

The History section records shares that have ended, whether expired or revoked.

<Screenshot src="/img/desktop/shared-links-history.png" alt="Share history section" dark />

### How history is captured

Every time the active shares list is fetched, the app compares it against the previous snapshot. Any share token that was present before but is now gone is classified and saved to history:

| What happened                      | Recorded as                                                      |
| ---------------------------------- | ---------------------------------------------------------------- |
| Its expiry time had passed         | **Expired**                                                      |
| It disappeared while still in date | **Revoked elsewhere** (another device or the console revoked it) |
| You clicked Revoke on this device  | **Revoked**, recorded immediately at the moment you confirm      |

### Status badges

| Badge                 | Meaning                                                   |
| --------------------- | --------------------------------------------------------- |
| **Revoked**           | You pressed Revoke on this device.                        |
| **Revoked elsewhere** | The share was revoked from another device or the console. |
| **Expired**           | The server's TTL elapsed.                                 |

### Removing entries

Click the three dot menu on any history row and choose <BgStyledText>Remove from history</BgStyledText> to delete that entry from local history. No confirmation is shown, the share is already ended and this only affects what you see here.

### Clear all history

Click <BgStyledText>Clear all history</BgStyledText> at the top of the History section to remove all local history entries at once. A confirmation dialog appears first. This does not affect any active shares.

## What Recipients See

When someone opens your share link, they land on a simple page in their browser. No Hippius account is needed. What they see depends on the link type and the file.

**Password-protected links** ask for the password first. The recipient types in the password you sent them and the page unlocks. Without it, the file can't be opened, and we can't recover it for them either.

**Preview.** For common file types, the file is shown right on the page so the recipient can view it without downloading:

<Unordered>
  <li><strong>Images, videos, and PDFs</strong> up to 100 MB preview inline, full-page.</li>
  <li>Everything else, and any file over 100 MB, shows a download card with the filename, size, and a <strong>Download</strong> button. Shared folders arrive as a <code>.zip</code>, so they always download rather than preview.</li>
</Unordered>

{/* TODO screenshot: the recipient share page previewing a file inline (an image or PDF) with the Download button.
    Add static/img/desktop/shared-links-preview.png AND shared-links-preview-dark.png, then uncomment:
    <Screenshot src="/img/desktop/shared-links-preview.png" alt="Recipient preview page with Download button" dark /> */}

A **Download** option is always available. The file is decrypted directly in the recipient's browser: on modern browsers (Chrome, Edge, Firefox) the download streams straight to disk with no size limit; on older browsers it's buffered in memory up to 500 MB. The decryption key never reaches our servers.

If the link has expired or been revoked, recipients see: _"This link has expired or been revoked."_ We don't say which, so no one can guess whether a token was ever valid.

## Storage Usage

Every active share stores a separate encrypted copy of your file on Hippius:

<Unordered>
  <li><strong>Counts against your storage quota</strong> for as long as the share is active.</li>
  <li><strong>Is independent of your sync copy</strong>, using a different key and living in a different location on the network.</li>
  <li><strong>Is deleted when you revoke or when it expires</strong>, so storage is freed automatically.</li>
</Unordered>

Sharing the same file multiple times creates multiple separate copies, each with its own cost.

:::tip Revoke shares you no longer need
Each active share uses storage quota. Revoke temporary shares when you're done with them to free up space.
:::

## Desktop vs Console

| Feature                      | Desktop App                                          | Console                                                      |
| ---------------------------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| **Create a share**           | ✅ Yes                                               | ✅ Yes                                                       |
| **Share from Finder**        | ✅ macOS only                                        | ❌ Not available                                            |
| **Password-protected link**  | ✅ From Finder                                       | ❌ Public links only                                        |
| **How it reads the file**    | Local plaintext from sync folder, no download needed | Downloads and decrypts the Drive copy                        |
| **Copy link (same session)** | ✅ Yes                                               | ✅ Yes                                                       |
| **Copy link after restart**  | ✅ Yes, key saved in local database                  | ❌ No, key is in memory only and lost on tab close or reload |
| **Reshare**                  | ✅ On creating device                                | ❌ Not available                                             |
| **Revoke**                   | ✅ Any device                                        | ✅ Any device                                                |
| **History**                  | ✅ Yes                                               | ✅ Yes                                                       |

## Where to next

<Unordered>
  <li><a href="/use/desktop/drive">Drive</a>: manage your sync folders and uploads.</li>
  <li><a href="/use/console/shared-links">Console Shared Links</a>: the console version, where you can create shares from the web interface.</li>
  <li><a href="/use/desktop/billing">Billing</a>: manage credits before sharing large files.</li>
</Unordered>
