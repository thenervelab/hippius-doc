---
id: shared-links
title: Shared Links
sidebar_label: Shared Links
slug: /use/console/shared-links
description: Share any Drive file as a public download link from the Drive page, then manage active links and history from the Shared Links page.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';

## Introduction

Hippius lets you share any file from your Drive as a public download link. Recipients don't need a Hippius account. They just open the link in any browser and the file downloads directly to their device.

To share a file, go to **Drive**, open the menu on any file, and choose **Share via link**. Hippius creates a secure encrypted copy in your browser and generates a shareable URL.

After sharing, all your active links are tracked on the **Shared Links** page, reached from the Drive header breadcrumb or from the sidebar at <BgStyledIconWithText text="Storage" icon="SidebarStorage" /> → <BgStyledIconWithText text="Drive" icon="FolderOpen" /> → **Shared Links**. From there you can copy a link again, revoke access, and see a history of ended shares.

![Shared Links page overview](/img/console/drive/shared-links-overview.png)

## How Sharing Works

Understanding the sharing process will help explain a few things you'll notice, like why sharing takes a moment and why you can only copy a link on the device where you created it.

### Your files are encrypted with a key only you hold

Every file in your Drive is end to end encrypted. The Hippius network only ever stores an encrypted version of your data. It cannot read your files, and neither can anyone else. Only you can decrypt them, because only you have the key.

### Sharing requires creating a fresh encrypted copy

Here's the challenge: your folder key is private to you. If you just handed someone a link to your encrypted file, they would have no way to decrypt it. They don't have your key.

So instead, when you share a file, the console runs a three step process entirely inside your browser:

<Ordered>
  <li><strong>Download and Decrypt:</strong> Your browser fetches the encrypted file from Drive and decrypts it using your folder key. This happens entirely on your device and is never sent to any server in plaintext.</li>
  <li><strong>Encrypt with a fresh key:</strong> A brand new random key is generated, unique to this one share. Your browser encrypts the file again using that new share key. Your original folder key stays private and is never exposed.</li>
  <li><strong>Upload:</strong> The newly encrypted copy is uploaded to Hippius as a separate object. This is the copy that recipients will download.</li>
</Ordered>

The share key is embedded in the recipient URL after the `#` symbol. Browsers never send the `#` part of a URL to servers, so it stays entirely in the recipient's browser. Hippius servers store the encrypted file but never see the key that decrypts it.

![Share creation progress dialog](/img/console/drive/shared-links-create-progress.png)

:::info Why does sharing take a few seconds?
The download, decrypt, encrypt, and upload steps run each time you create a share. For larger files this takes longer. A progress indicator in the share dialog shows you which step is running.
:::

### What this means in practice

<Unordered>
  <li>The server holds an encrypted copy. It cannot read the file and does not know the key.</li>
  <li>The recipient's browser decrypts the file locally. Nothing is decrypted on the server.</li>
  <li>Revoking a share deletes the encrypted copy and frees the storage immediately.</li>
  <li>Each share is independent. Revoking one share of a file doesn't affect any other share of the same file.</li>
</Unordered>

## Before You Share

A few things need to be in place before you can create a share:

<Unordered>
  <li><strong>Your session must be unlocked.</strong> Sharing requires your folder key, which is only available after you've entered your unlock password in the current session. If the console asks for your password, enter it and then retry.</li>
  <li><strong>You need enough credits.</strong> Creating a share uploads a new encrypted copy, which costs storage. The console checks your balance before starting and shows an <strong>Insufficient Credits</strong> dialog if you need to top up first.</li>
  <li><strong>The file must be in Drive.</strong> Shared Links only works for files stored in your Hippius Drive.</li>
</Unordered>

## Creating a Share

You create share links from within the Drive file browser, not from the Shared Links page itself.

<Ordered>
  <li>Go to <a href="/use/console/drive">Drive</a> and navigate to the file you want to share.</li>
  <li>Click the three dot action menu on the file row and choose <BgStyledText>Share via link</BgStyledText>.</li>
  <li>The share dialog opens and runs the download, decrypt, encrypt, and upload steps automatically. A progress bar shows the current step.</li>
  <li>When complete, the share URL is shown and copied to your clipboard automatically.</li>
  <li>Click <BgStyledText>Copy link</BgStyledText> if you need to copy it again, then close the dialog.</li>
</Ordered>

The link is live immediately. Anyone you send it to can download the file right away.

![Share dialog with URL ready](/img/console/drive/shared-links-dialog.png)

## Active Shares

The Active Shares table shows every share currently live on your account. It refreshes automatically every 30 seconds.

The table includes shares created from any device or the desktop app, not just this browser. This means you might see shares here that you created elsewhere.


If a share was created on a different device or browser, the filename shows as `<created on another device>`, as the share key needed to decrypt it isn't available here.

### Copy link

Click the three dot menu on any row and choose <BgStyledText>Copy link</BgStyledText> to copy the full share URL to your clipboard.

**The link can only be copied on the device where you created it.** The share URL includes the encryption key in the `#` fragment. That key lives only in memory in the browser session where you created the share. If you close the tab, reload the page, or switch to a different device, the key is gone, so Copy link will be disabled for that row.

A tooltip on the disabled action explains: _"Link is only available on the device where the share was created."_

This is by design. If you need to share a link again from a different device, you can revoke the existing share and create a new one.

:::tip Save your link before closing the tab
After creating a share, copy the URL straight away and save it somewhere you can access it. Once you close or reload the tab, you won't be able to copy the link again from this browser.
:::

### Revoke

Click the three dot menu on any row and choose <BgStyledText>Revoke</BgStyledText> to permanently invalidate a share link.

A confirmation dialog will ask you to confirm before anything happens. When you revoke:

<Unordered>
  <li>The link stops working for anyone immediately, with no grace period.</li>
  <li>The encrypted copy stored on Hippius is deleted, freeing the storage.</li>
  <li>The row moves to the History section with a "Revoked" status.</li>
  <li>This cannot be undone. If you want to share the file again, create a new share.</li>
</Unordered>

:::warning Revoking is immediate and permanent
Anyone holding the link loses access the moment you confirm. There is no way to restore a revoked link.
:::

![Revoke confirmation dialog](/img/console/drive/shared-links-revoke.png)

## Share History

The History section appears below the Active Shares table once there is at least one ended share recorded on this device.

### What gets recorded

Every time the active shares list refreshes, the console compares the new list against what was there before. Any share that disappeared gets added to history with a reason:

| How it ended | What gets recorded |
|---|---|
| Its expiry time passed | Added as **Expired** |
| It disappeared while still in date | Added as **Revoked elsewhere** (another device or the desktop app revoked it) |
| You clicked Revoke on this device | Added as **Revoked** immediately, before the next poll |

### Status badges

| Badge | Meaning |
|---|---|
| **Revoked** | You pressed Revoke on this device. |
| **Revoked elsewhere** | The share was revoked from another device or the desktop app. |
| **Expired** | The server's expiry time elapsed. |

### Removing individual entries

Click the three dot menu on any history row and choose <BgStyledText>Remove from history</BgStyledText> to delete that entry from your local history. This only affects what you see here, the share is already ended so nothing changes on the server.

### Clear all history

Click <BgStyledText>Clear all history</BgStyledText> at the top of the History section to remove all entries at once. A confirmation dialog appears first.

## What Recipients See

When someone opens your share link, they land on a simple download page and no account is needed.

The page shows the filename, the file size, and how much time is left before the link expires. They click **Download** and the file is streamed directly to their device, decrypted entirely in their browser. We never see the file in plaintext on the recipient's end either.

If the link has been revoked or has expired, recipients see: _"This link has expired or been revoked."_ The page deliberately does not say which, which prevents anyone from guessing whether a link was ever valid.

## Storage Usage

Every active share stores a separate encrypted copy of your file on the Hippius network. This copy:

<Unordered>
  <li><strong>Counts against your storage quota</strong> for as long as the share is active.</li>
  <li><strong>Is independent of your Drive copy</strong>, using a different key and living in a different location on the network, unaffected by any changes to your original file.</li>
  <li><strong>Is freed automatically</strong> when you revoke it or when it expires.</li>
</Unordered>

If you share the same file multiple times, each share is a separate encrypted copy with its own key and its own storage cost.

:::tip Revoke shares you no longer need
Each active share consumes storage quota. If you shared a file temporarily, say to send to a colleague, revoke it when you're done to reclaim the space.
:::

## Console vs Desktop App

The desktop app also has a Shared Links page with a few extra capabilities:

| Feature | Console | Desktop App |
|---|---|---|
| **Create a share** | ✅ Yes | ✅ Yes |
| **How it reads the file** | Downloads and decrypts the Drive copy | Reads the local plaintext file directly from disk |
| **Copy link (same session)** | ✅ Yes | ✅ Yes |
| **Copy link after reload** | ❌ No, key is lost when you close or reload the tab | ✅ Yes, key is saved to a local database |
| **Reshare (extend expiry)** | ❌ Not available | ✅ Available on the creating device |
| **Revoke** | ✅ Works from any device | ✅ Works from any device |
| **History** | ✅ Yes | ✅ Yes |

**Why the desktop app can copy links after a reload:** The desktop app saves each share's key to a local SQLite database. The console holds the key only in memory, so when you close or reload the tab it's gone.

**What is Reshare?** There is currently no way to extend the expiry of an existing share since the server doesn't support it. The desktop app works around this by revoking the old share and immediately creating a fresh one for the same file, with a new key and a fresh expiry. The new link is copied automatically. This is only possible on the device that created the original share, because the desktop needs access to the original local file to read and encrypt it again. The console does not support Reshare.

## Limits

| Limit | Value |
|---|---|
| **Max shareable file size** | 5 GB |
| **Link expiry** | Set by the server, shown in the share dialog after creation |
| **History** | ✅ Yes |

## Where to next

<Unordered>
  <li><a href="/use/console/drive">Drive</a>: browse, upload, and manage your encrypted files. This is where you create share links.</li>
  <li><a href="/use/desktop/shared-links">Desktop Shared Links</a>: the desktop version with reshare support and persistent link copying.</li>
  <li><a href="/use/console/billing">Billing</a>: manage your storage credits and top up before sharing large files.</li>
</Unordered>
