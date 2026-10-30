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
import Screenshot from '@site/src/components/Screenshot';

## Introduction

Hippius lets you share any file from your Drive as a public link. Recipients don't need a Hippius account. They open it in any browser and see the file right there, or download it. Pictures, videos, PDFs and many documents preview on the page (see [What Recipients See](#what-recipients-see)).

Screenshots and recordings get a link automatically, and those links show up here too. See [Share links for captures](/use/captures/share-links).

To share a file, go to **Drive**, open the menu on any file, and choose **Share via link**. Hippius creates a secure encrypted copy in your browser and generates a shareable URL. On a whole drive in **My Drives**, the same item is called **Share via public link**, to set it apart from **Share drive**, which invites people with an account (see [Shared Drives](/use/console/shared-drives)).

After sharing, all your active links are tracked on the **Shared Links** page, reached from the <BgStyledText>Shared Links</BgStyledText> button in the Drive header (<BgStyledText>My Drives</BgStyledText>, under <BgStyledIconWithText text="Drive" icon="FolderOpen" /> in the sidebar). From there you can copy a link again, revoke access, and see a history of ended shares.

<Screenshot src="/img/console/drive/shared-links-overview.png" alt="Shared Links page overview" dark />

:::tip Links or a shared drive?
A shared link is a read only copy for anyone, no account needed. If you want people to sign in and keep working in the same files with you, with Viewer, Editor or Manager access, that is a Hippius shared drive. See [Shared Drives](/use/console/shared-drives).
:::

## How Sharing Works

Understanding the sharing process will help explain a few things you'll notice, like why sharing takes a moment and why copying a link later asks you to unlock first.

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

<Screenshot src="/img/console/drive/shared-links-create-progress.png" alt="Share creation progress dialog" dark />

:::info Why does sharing take a few seconds?
The download, decrypt, encrypt, and upload steps run each time you create a share. For larger files this takes longer. A progress indicator in the share dialog shows you which step is running.
:::

### What this means in practice

<Unordered>
  <li>The server holds an encrypted copy. It cannot read the file and does not know the key.</li>
  <li>The recipient's browser decrypts the file locally. Nothing is decrypted on the server.</li>
  <li>Revoking a share deletes the encrypted copy and frees the storage immediately.</li>
  <li>Each share is independent. Revoking one share of a file doesn't affect any other share of the same file.</li>
  <li>Deleting a file does not end the links made from it. Each link is its own encrypted copy, so it keeps working until you revoke it here or it expires. The delete confirmation reminds you of this.</li>
</Unordered>

## Before You Share

A few things need to be in place before you can create a share:

<Unordered>
  <li><strong>Your session must be unlocked.</strong> Sharing requires your folder key, which is only available after you've entered your unlock password in the current session. If the console asks for your password, enter it and then retry.</li>
  <li><strong>You need room in your Drive plan.</strong> Creating a share uploads a new encrypted copy of the file, so it needs storage like any other upload.</li>
  <li><strong>The file must be in Drive.</strong> Shared Links only works for files stored in your Hippius Drive.</li>
</Unordered>

## Creating a Share

You create share links from within the Drive file browser, not from the Shared Links page itself.

<Ordered>
  <li>Go to <a href="/use/console/drive">Drive</a> and navigate to the file you want to share.</li>
  <li>Click the three dot action menu on the file row and choose <BgStyledText>Share via link</BgStyledText>.</li>
  <li>Choose when the link should expire, and optionally require a password. Both are described below.</li>
  <li>The share dialog runs the download, decrypt, encrypt, and upload steps automatically. A progress bar shows the current step.</li>
  <li>When complete, the share URL is shown and copied to your clipboard automatically.</li>
  <li>Click <BgStyledText>Copy link</BgStyledText> if you need to copy it again, then close the dialog.</li>
</Ordered>

The link is live immediately. Anyone you send it to can open it right away.

### Choosing an expiry

A link you create yourself gets an expiry, chosen before you create it:

| Option | The link stops working |
|---|---|
| **24 hours** | One day after you create it. |
| **7 days** | One week after you create it. |
| **30 days** | One month after you create it. |
| **Until I revoke it** | Never on its own. It stays live until you revoke it. |

The dialog starts on **24 hours**, so if the link should last longer, pick another option before you create it.

:::info Links made for screenshots and recordings
A [screenshot or screen recording](/use/captures) gets its share link automatically, the moment it is saved. That link is public and keeps working until you turn it off, so it is ready to paste straight away. It is listed here with your other links, and you revoke it the same way. See [Share links for captures](/use/captures/share-links).
:::

### Requiring a password

Tick <BgStyledText>Require a password</BgStyledText> to lock the link. Recipients are asked for the password before they see anything, and it must be at least 8 characters.

The password is shown in plain text while you set it, on purpose. It is a password you have to read off the screen and pass on, not one you are typing in, so hiding it would only make it harder to do the one thing it is for.

:::warning Send the password separately
Send it through a different channel to the link itself. It cannot be recovered or changed later. If you lose it, revoke the share and create a new one.
:::

<Screenshot src="/img/console/drive/shared-links-dialog.png" alt="Share dialog with URL ready" dark />

## Sharing a Folder

You can share an entire folder, not just one file. Open the action menu on a **folder** row and choose <BgStyledText>Share via link</BgStyledText>. The expiry and password options are the same as for a file.

A folder share behaves differently to a file share in one important way:

:::info A folder link is live, not a snapshot
Recipients always see the folder's **current** contents. Add a file to the folder tomorrow and everyone holding the link can see it. Remove one and it disappears for them too. If you want to share a fixed set of files, share them individually instead.
:::

:::warning Replace old folder links
Folder links made now open only the folder you shared. Older ones carry your drive's key, and anyone who has the link holds that key, even after it stops working. On the Shared Links page they have an **Old link** badge. Choose <BgStyledText>Reshare without the drive key</BgStyledText> from the row's menu, pick an expiry (and a password, if you like) and send the new link. The old link is turned off once the new one exists. If you still use an old folder link, reshare it.
:::

### What the recipient gets

Someone opening a folder link can:

<Unordered>
  <li>Browse the folder and its subfolders, with a breadcrumb to move back up.</li>
  <li>Search the folder by file name.</li>
  <li>Preview individual files, with the same formats listed on the <a href="/use/console/drive">Drive</a> page.</li>
  <li>Download any single file.</li>
  <li>Download the whole folder as a zip, using <BgStyledText>Download folder</BgStyledText>.</li>
</Unordered>

The zip is built in the recipient's own browser, so nothing is assembled on our servers. It can be cancelled while it runs, and browsing stays usable while it packs.

They do not need a Hippius account for any of this.

<Screenshot src="/img/console/drive/folder-share-recipient.png" alt="Recipient view of a shared folder" dark />

## Active Shares

The Active Shares table shows every share currently live on your account. It refreshes automatically every 30 seconds.

The table includes shares created from any device or the desktop app, not just this browser. This means you might see shares here that you created elsewhere.


Every row shows the file's real name, wherever the link was made. Only an old entry in History can show `<created on another device>` instead.

### Copy link

Click the three dot menu on any row and choose <BgStyledText>Copy link</BgStyledText> to copy the full share URL to your clipboard.

**You can copy a link on any device, after you unlock.** The share URL includes the encryption key in the `#` fragment, and that key is kept in your account locked under your password. After a reload, or on another computer, the row shows <BgStyledText>Unlock to copy link</BgStyledText>: enter your [unlock password](/use/console/unlock-password) and the console rebuilds the same link. That works for links you made in the console, the desktop app or anywhere else.

Some older links keep the old limit and can only be copied in the browser session that created them. Their row reads **Not available in this session**. To share one of those again, revoke it and create a new share.

### Revoke

Click the three dot menu on any row and choose <BgStyledText>Revoke</BgStyledText> to permanently invalidate a share link.

A confirmation dialog will ask you to confirm before anything happens. When you revoke:

<Unordered>
  <li>The link stops working for anyone immediately, with no grace period.</li>
  <li>The encrypted copy stored on Hippius is deleted, freeing the storage.</li>
  <li>A file link moves to the History section with a "Revoked" status. A folder link stays in the table for a while, marked **Revoked**, before it's cleared away.</li>
  <li>This cannot be undone. If you want to share the file again, create a new share.</li>
</Unordered>

:::warning Revoking is immediate and permanent
Anyone holding the link loses access the moment you confirm. There is no way to restore a revoked link.
:::

<Screenshot src="/img/console/drive/shared-links-revoke.png" alt="Revoke confirmation dialog" dark />

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

When someone opens your share link, they land on a simple page in their browser and no account is needed. What they see depends on the file:

<Unordered>
  <li><strong>Images, videos, and PDFs</strong> up to 100 MB preview inline, full-page, so the recipient can view the file without downloading it.</li>
  <li><strong>Documents</strong> preview inline too, each up to its own size: presentations (PPTX) up to 40 MB, Word documents (DOCX) and HTML up to 25 MB, spreadsheets (XLSX, CSV) up to 20 MB, plain text and JSON up to 2 MB, and Markdown up to 1 MB.</li>
  <li>Everything else, and any file too large to preview, shows a download card with the filename, the file size, and how much time is left before the link expires.</li>
</Unordered>

{/* TODO screenshot: the recipient share page previewing a file inline (an image or PDF) with the Download button.
    Add static/img/console/drive/shared-links-preview.png AND shared-links-preview-dark.png, then uncomment:
    <Screenshot src="/img/console/drive/shared-links-preview.png" alt="Recipient preview page with Download button" dark /> */}

A **Download** option is always available. The file is streamed directly to the recipient's device, decrypted entirely in their browser. We never see the file in plaintext on the recipient's end either.

When you've turned on comments or reactions for a link, recipients also see the comments in a panel beside the file (below it on a phone) and a row of reaction chips under it, where one tap adds a reaction and another takes it back. Commenters can tag you, or each other, by typing `@`. See [Views, Comments and Reactions](#views-comments-and-reactions).

If the link has been revoked or has expired, recipients see: _"This link has expired or been revoked."_ The page deliberately does not say which, which prevents anyone from guessing whether a link was ever valid.

## Views, Comments and Reactions

Once a file link exists, the share dialog shows three more switches under **Views, comments and reactions**: **Insights** counts views and watch time, **Comments** lets people comment, and **Reactions** lets them react with an emoji. On a paid Drive plan they start on for screenshots and recordings, and off for other files. On the Free plan they all start off, and turning one on shows an upgrade prompt instead. Recipients see a short note when views are counted, can read comments without an account, and need a Hippius account to post a comment or react. Folder links don't have these switches, so they never count views or take comments.

<Screenshot src="/img/console/captures/share-dialog-switches.png" alt="The console share dialog after the link is made, with Show a preview in chats and the Insights, Comments and Reactions switches" dark raw />

To see what happened to a link, click <BgStyledText>Insights</BgStyledText> on its row in Shared Links or in [Captures](/use/captures), or choose **View insights** from the row menu. Shared Links also shows each link's **Views** and **Comments**, and you can sort by either. Insights open in a panel on the right with the views, a chart of where people stopped watching a video, and Comments, Viewers and Reactions tabs. The link's switches are behind the gear at the top of the panel. A comment that tags you says **Mentioned you**, and the **Mentions you** filter shows only those. Comments, viewer names and who was tagged are end-to-end encrypted with the link's key. Everything about it, including what the Free plan shows, is in [Insights, comments and reactions](/use/captures/insights).

<Screenshot src="/img/console/captures/insights-comments.png" alt="The Comments tab of the console's Insights panel, with comments from Sam, Robin and Jordan at moments in the recording, a reply from the owner, and the reaction totals in the summary" dark raw />

## Storage Usage

Every active share stores a separate encrypted copy of your file on the Hippius network. This copy:

<Unordered>
  <li><strong>Costs nothing extra while the file is still in your Drive.</strong> Your storage already counts that file, so the link adds nothing on top. If you delete the file and keep the link, the link's copy counts against your storage quota from then on, until you revoke the link or it expires.</li>
  <li><strong>Is independent of your Drive copy</strong>, using a different key and living in a different location on the network, unaffected by any changes to your original file. Deleting or replacing the original leaves the link showing the file as it was when you shared it.</li>
  <li><strong>Is freed automatically</strong> when you revoke it or when it expires.</li>
</Unordered>

If you share the same file multiple times, each share is a separate encrypted copy with its own key. While the file is in your Drive, none of them adds to your storage.

:::tip Revoke shares you no longer need
A link whose file you've deleted uses storage quota. If you shared a file temporarily, say to send to a colleague, revoke it when you're done.
:::

## Console vs Desktop App

The desktop app also has a Shared Links page with a few extra capabilities:

| Feature | Console | Desktop App |
|---|---|---|
| **Create a share** | ✅ Yes | ✅ Yes |
| **Share a folder** | ✅ Yes | ✅ Yes |
| **Share from Finder** | ❌ Not available | ✅ macOS only |
| **Choose an expiry** | ✅ 24h, 7d, 30d, or until revoked | ✅ Same options |
| **Password-protected link** | ✅ Yes | ✅ Yes, in the app and from Finder |
| **Change the expiry later** | ✅ Folder links, from any device | ✅ File and folder links, from the row's menu |
| **How it reads the file** | Downloads and decrypts the Drive copy | Reads the local plaintext file directly from disk |
| **Copy link (same session)** | ✅ Yes | ✅ Yes |
| **Copy link after reload** | ✅ Yes, after you unlock (older links: no) | ✅ Yes, key is saved to a local database |
| **Revoke** | ✅ Works from any device | ✅ Works from any device |
| **History** | ✅ Yes | ✅ Yes |

**How each app copies links after a reload:** The desktop app remembers each share's key on your computer. The console rebuilds the link once you unlock with your password.

**Changing an expiry.** For a **folder** link, open its action menu on the Shared Links page and choose <BgStyledText>Change expiry</BgStyledText>. The link keeps its address, so nothing needs to be sent again.

In the console a **file** link's expiry can't be changed. The desktop app can: its Shared Links page offers **Expire in 24 hours**, **Expire in 7 days**, **Expire in 30 days** and **Never expire** in each link's menu, and the link stays the same.

## Limits

| Limit | Value |
|---|---|
| **Max shareable file size** | 5 GB |
| **Link expiry** | Your choice of 24 hours, 7 days, 30 days, or until you revoke it. Links made automatically for screenshots and recordings never expire by default. |
| **Share password** | Optional, at least 8 characters |

## Where to next

<Unordered>
  <li><a href="/use/console/drive">Drive</a>: browse, upload, and manage your encrypted files. This is where you create share links.</li>
  <li><a href="/use/console/shared-drives">Shared Drives</a>: invite people with a Hippius account into a drive or a folder, with a role.</li>
  <li><a href="/use/desktop/shared-links">Desktop Shared Links</a>: the desktop version with reshare support and persistent link copying.</li>
  <li><a href="/use/console/billing">Billing</a>: check your Drive plan has room before sharing large files.</li>
</Unordered>
