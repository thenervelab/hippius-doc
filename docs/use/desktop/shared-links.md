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

After sharing, all your active links are tracked on the **Shared Links** page. Open it with the <BgStyledText>Shared Links</BgStyledText> button in the top right of the <BgStyledIconWithText text="Drive" icon="Category" /> view header. From there you can copy a link again, change when it expires, revoke it, and see a history of ended shares.

Screenshots and recordings get a link automatically, and those links show up here too. See [Share links for captures](/use/captures/share-links).

:::tip Two ways to share
You can share from the **Drive view** inside the app, or, on macOS, right from **Finder**. Just right click any file or folder and choose **Share with Hippius**. See [Share from Finder](/use/desktop/share-from-finder).
:::

<Screenshot src="/img/desktop/shared-links-overview.png" alt="Shared Links page overview" dark />

:::tip Links or a shared drive?
A share link is a read only copy for anyone, no account needed. If you want people to sign in and keep working in the same files with you, with Viewer, Editor or Manager access, that is a Hippius shared drive. See [Shared Drives](/use/desktop/shared-drives).
:::

## How Sharing Works

### Every file on Hippius is encrypted

All your files are encrypted end to end on your device before they are uploaded to the Hippius network. Nobody else can read what's in them, because nobody else has your key. A share link does keep a few details in plain text so its page can show them: the file's name, type and size, plus a small preview picture when [chat previews](/use/captures/share-links#a-preview-when-you-paste-the-link-in-a-chat) are on.

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

The server stores the encrypted copy and returns a share token. It never learns the decryption key, so it can't read the file, though it does see the file's name, type and size.

A file that isn't on this computer, such as one in a drive you haven't synced here, can be shared too. The app downloads and decrypts it first, then follows the same steps.

<Screenshot src="/img/desktop/shared-links-create.png" alt="Share creation dialog" dark />

:::info Why is sharing fast on desktop?
The desktop reads your local file directly with no download required. For most files this means the entire share process is as fast as your upload connection allows, with no extra round trip to fetch the file first.
:::

### What this means in practice

<Unordered>
  <li>Your original folder key stays private. Only the share key is used for the share upload.</li>
  <li>Revoking a share deletes the encrypted copy and frees the storage.</li>
  <li>Sharing the same file twice creates two independent copies, each with its own key.</li>
  <li>Deleting a file does not end the links made from it. Each link is its own encrypted copy, so it keeps working until you revoke it or it expires. The delete confirmation reminds you of this.</li>
  <li>The server can never read the file's contents, even while serving it to recipients. Only the name, type and size are stored in plain text.</li>
</Unordered>

## Before You Share

<Unordered>
  <li><strong>The file doesn't have to be synced here.</strong> You can share any file in your drives, including one that only lives on Hippius. For files outside your drives, use <a href="/use/desktop/share-from-finder">Share from Finder</a> on macOS.</li>
  <li><strong>You need room in your storage.</strong> Sharing a file uploads a new encrypted copy of it, and that copy counts toward your storage. The app checks before the upload starts, and if you're at your plan's limit it tells you instead of creating the link. Free up some space or upgrade, then try again.</li>
</Unordered>

## Creating a Share

<Ordered>
  <li>In the <BgStyledIconWithText text="Drive" icon="Category" /> view, find the file you want to share.</li>
  <li>Right click the file (or click the <BgStyledText>⋮</BgStyledText> menu on its row) and choose <BgStyledText>Share via link</BgStyledText>.</li>
  <li>Choose who can open it (<strong>Anyone with the link</strong> or <strong>Password protected</strong>) and when the link should expire. Both are described below.</li>
  <li>The share dialog runs the encrypt and upload steps automatically, showing <em>Encrypting and uploading…</em> while it works. You can press <BgStyledText>Cancel</BgStyledText> to stop before it finishes.</li>
  <li>When complete, the share URL is shown in the modal and copied to your clipboard automatically, along with when the link expires.</li>
  <li>Use the copy icon next to the URL to copy it again, <BgStyledText>Open in browser</BgStyledText> to preview the recipient page, or <BgStyledText>Revoke share</BgStyledText> to cancel the link right away. Click <BgStyledText>Done</BgStyledText> to close the dialog.</li>
</Ordered>

The link is live immediately. Anyone you send it to can download the file right away.

### Choosing an expiry

A link you create yourself gets an expiry, chosen before you create it:

| Option | The link stops working |
|---|---|
| **24 hours** | One day after you create it. |
| **7 days** | One week after you create it. |
| **30 days** | One month after you create it. |
| **Until I revoke it** | Never on its own. It stays live until you revoke it. |

:::info Links made for screenshots and recordings
A [screenshot or screen recording](/use/captures) gets its share link automatically, the moment it is saved. That link is public and keeps working until you turn it off, so it is ready to paste straight away. It is listed in Shared Links with your other links, and you revoke it the same way. You can stop these links being made by turning off **Copy a share link after capture** in [Settings](/use/desktop/settings#screenshots--recording). See [Share links for captures](/use/captures/share-links).
:::

### Requiring a password

Pick <BgStyledText>Password protected</BgStyledText> instead of **Anyone with the link** to lock the link. The app fills in a strong password for you, which you can change. Recipients are asked for it before they see anything, and it must be at least 8 characters. A password link never gets a chat preview, since the preview would show what the password protects.

:::warning Send the password separately
Send it through a different channel to the link itself. It cannot be recovered or changed later. If you lose it, revoke the share and create a new one.
:::

The same choices appear when you [share from Finder](/use/desktop/share-from-finder) on macOS.

### Sharing a folder

Right click a **folder** instead of a file and choose <BgStyledText>Share via link</BgStyledText> to share the whole thing. Expiry and password work the same way.

:::info A folder link is live, not a snapshot
Recipients always see the folder's **current** contents, so anything you add later becomes visible to everyone holding the link. Share files individually if you want a fixed set.
:::

:::warning Replace old folder links
Folder links made now open only the folder you shared. Older ones carry your drive's key, and anyone who has the link holds that key, even after it stops working. On the Shared Links page they have an **Old link** badge. Choose <BgStyledText>Reshare with a safer link</BgStyledText> from the row's menu: the app makes a new link to the same folder and turns the old one off. Send the new link instead.
:::

Recipients can browse subfolders, search by name, preview files, download any single file, or download the whole folder as a zip. They do not need a Hippius account.

To share a file that isn't in a synced folder, use [Share from Finder](/use/desktop/share-from-finder) on macOS.

## Active Shares

The Active Shares table shows every share currently live on your account, refreshed from the server every few seconds. It includes shares created from any device or the console, not just this desktop install.

Every row shows the file's real name, wherever the link was made. A folder link shows the folder's name, with the part of the drive it opens underneath.

### Copy link

Click <BgStyledText>Copy link</BgStyledText> from the row's action menu to copy the full recipient URL to your clipboard.

The share URL includes the encryption key. The app keeps the keys of links made on this computer, and fetches the keys of file links you made elsewhere (another computer or the console) from your account, so you can usually copy any file link from here. A link it can't rebuild, such as some older links, or a folder link made on another device, has Copy link greyed out with a note saying so. For a password link, the copied link still needs the password you set when you made it.

### Change the expiry

A live link's menu offers <BgStyledText>Expire in 24 hours</BgStyledText>, <BgStyledText>Expire in 7 days</BgStyledText>, <BgStyledText>Expire in 30 days</BgStyledText> and <BgStyledText>Never expire</BgStyledText>. Pick one and the new expiry applies straight away. The link itself stays the same, so there's nothing to send again. A password can't be changed: to use a different one, revoke the link and create a new one.

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

Links you made on another computer or in the console are listed here too, by name. You can revoke them and change their expiry from this computer, and copy most file links (see [Copy link](#copy-link)).

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
  <li><strong>Documents</strong> preview inline too: Word documents (DOCX), presentations (PPTX), spreadsheets (XLSX, CSV), HTML, plain text, JSON, and Markdown.</li>
  <li>Everything else, and any file too large to preview, shows a download card with the filename, size, and a <strong>Download</strong> button. Shared folders arrive as a <code>.zip</code>, so they always download rather than preview.</li>
</Unordered>

{/* TODO screenshot: the recipient share page previewing a file inline (an image or PDF) with the Download button.
    Add static/img/desktop/shared-links-preview.png AND shared-links-preview-dark.png, then uncomment:
    <Screenshot src="/img/desktop/shared-links-preview.png" alt="Recipient preview page with Download button" dark /> */}

A **Download** option is always available. The file is decrypted directly in the recipient's browser: on modern browsers (Chrome, Edge, Firefox) the download streams straight to disk with no size limit; on older browsers it's buffered in memory up to 500 MB. The decryption key never reaches our servers.

If the link has expired or been revoked, recipients see: _"This link has expired or been revoked."_ We don't say which, so no one can guess whether a token was ever valid.

## Views, Comments and Reactions

You can see how many people opened a link, and let people comment and react under it. The **Share via link** dialog has **Insights**, **Comments** and **Reactions** switches for each file you share, next to **Show a preview in chats** for pictures and videos. On a paid Drive plan they start on for screenshots and recordings and off for other files; on the Free plan they start off and turning one on shows an upgrade prompt.

<Screenshot src="/img/desktop/captures/share-dialog.png" alt="The desktop Share via link dialog with Show a preview in chats, Insights, Comments and Reactions switches" dark raw />

Open a link's **Insights** from its row in Shared Links, or from Captures, to see how many people watched and read what they said. They open in a panel on the right, with Comments, Viewers and Reactions tabs, and the link's switches behind the gear at the top. In Captures every screenshot and recording offers Insights, and one without a link yet can get one there with **Create link**. A comment that tags you with `@` says **Mentioned you**, and the **Mentions you** filter shows only those. See [Insights, comments and reactions](/use/captures/insights).

## Storage Usage

Every active share stores a separate encrypted copy of your file on Hippius:

<Unordered>
  <li><strong>Costs nothing extra while the file is still in your Drive.</strong> Your storage already counts that file, so the link adds nothing on top. If you delete the file and keep the link, the link's copy counts against your storage quota from then on, until you revoke the link or it expires.</li>
  <li><strong>Is independent of your sync copy</strong>, using a different key and living in a different location on the network. Deleting or replacing the original leaves the link showing the file as it was when you shared it.</li>
  <li><strong>Is deleted when you revoke or when it expires</strong>, so storage is freed automatically.</li>
</Unordered>

Sharing the same file multiple times creates multiple separate copies. While the file is in your Drive, none of them adds to your storage.

:::tip Revoke shares you no longer need
A link whose file you've deleted uses storage quota. Revoke temporary shares when you're done with them.
:::

## Desktop vs Console

| Feature                      | Desktop App                                          | Console                                                      |
| ---------------------------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| **Create a share**           | ✅ Yes                                               | ✅ Yes                                                       |
| **Share a folder**           | ✅ Yes                                               | ✅ Yes                                                       |
| **Share from Finder**        | ✅ macOS only                                        | ❌ Not available                                            |
| **Choose an expiry**         | ✅ 24h, 7d, 30d, or until revoked                    | ✅ Same options                                              |
| **Password-protected link**  | ✅ In the app and from Finder                        | ✅ Yes                                                       |
| **How it reads the file**    | The file on this computer, or downloads it if needed | Downloads and decrypts the Drive copy                        |
| **Copy link (same session)** | ✅ Yes                                               | ✅ Yes                                                       |
| **Copy link later**          | ✅ Yes, the app keeps or fetches the key             | ✅ Yes, after you unlock (some older links: no)              |
| **Change expiry**            | ✅ File and folder links, link stays the same        | ✅ Folder links only                                         |
| **Revoke**                   | ✅ Any device                                        | ✅ Any device                                                |
| **History**                  | ✅ Yes                                               | ✅ Yes                                                       |

## Where to next

<Unordered>
  <li><a href="/use/desktop/drive">Drive</a>: manage your sync folders and uploads.</li>
  <li><a href="/use/desktop/shared-drives">Shared Drives</a>: invite people with a Hippius account into a drive or a folder, with a role.</li>
  <li><a href="/use/console/shared-links">Console Shared Links</a>: the console version, where you can create shares from the web interface.</li>
  <li><a href="/use/desktop/billing">Billing</a>: manage credits before sharing large files.</li>
</Unordered>
