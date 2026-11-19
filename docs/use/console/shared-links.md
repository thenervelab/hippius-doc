---
id: shared-links
title: Shared Links
sidebar_label: Shared Links
slug: /use/console/shared-links
description: Share a Drive file or folder as a link, make it view only or ask people to accept an NDA, see who opened it and how far they read, and manage your links from the Shared Links page.
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

You decide how long each link lasts, whether it needs a password, whether people can download the file or only view it, and whether they must accept an NDA first. With Insights on, you can see who opened it and how far they read.

After sharing, all your active links are tracked on the **Shared Links** page, reached from the <BgStyledText>Shared Links</BgStyledText> button in the Drive header (<BgStyledText>My Drives</BgStyledText>, under <BgStyledIconWithText text="Drive" icon="FolderOpen" /> in the sidebar). From there you can copy a link again, change when it expires, revoke access, and see a history of ended shares.

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
  <li>Revoking a share deletes the encrypted copy, and its storage comes back within a few minutes.</li>
  <li>Each share is independent. Revoking one share of a file doesn't affect any other share of the same file.</li>
  <li>Deleting a file does not end the links made from it. Each link is its own encrypted copy, so it keeps working until you revoke it here or it expires. The delete confirmation reminds you of this.</li>
  <li>Moving a file doesn't affect its links either, within a drive or to another drive. A folder link follows its folder when you move it within the same drive, but is turned off when the folder moves to another drive. See <a href="/use/console/drive#moving-files-and-folders">Moving Files and Folders</a>.</li>
</Unordered>

## Before You Share

A few things need to be in place before you can create a share:

<Unordered>
  <li><strong>Your session must be unlocked.</strong> Sharing requires your folder key, which is only available after you've entered your unlock password in the current session. If the console asks for your password, enter it and then retry.</li>
  <li><strong>You need room in your Drive plan.</strong> Creating a share uploads a new encrypted copy of the file, and that copy counts toward your storage. If you're at your plan's limit, the link isn't created.</li>
  <li><strong>The file must be in Drive.</strong> Shared Links only works for files stored in your Hippius Drive.</li>
</Unordered>

## Creating a Share

You create share links from within the Drive file browser, not from the Shared Links page itself.

<Ordered>
  <li>Go to <a href="/use/console/drive">Drive</a> and navigate to the file you want to share.</li>
  <li>Click the three dot action menu on the file row and choose <BgStyledText>Share via link</BgStyledText>.</li>
  <li>Under <strong>Secure link</strong>, choose when the link should expire, and optionally require a password. Both are described below. You can also turn on <strong>Email me when it's opened</strong> to hear when someone first opens it.</li>
  <li>Click <BgStyledText>Create share link</BgStyledText>. The share dialog runs the download, decrypt, encrypt, and upload steps automatically. A progress bar shows the current step.</li>
  <li>When complete, the share URL is shown and copied to your clipboard automatically. This is also where you decide what people can do with the link: see <a href="#control-what-people-can-do">Control What People Can Do</a>.</li>
  <li>Click <BgStyledText>Copy link</BgStyledText> if you need to copy it again, then click <BgStyledText>Done</BgStyledText>.</li>
</Ordered>

The link is live immediately. Anyone you send it to can open it right away.

### When a file already has a link

Choose **Share via link** on a file or folder that already has a live link, and the dialog shows that link first, so you don't end up with several links without meaning to. From there you can copy it, open **Manage in Shared Links**, or **View insights**. If you do want a second, separate link (say, one with a different expiry for a different person), click <BgStyledText>Create a new link</BgStyledText>. The first link keeps working.

### Choosing an expiry

A link you create yourself gets an expiry, chosen before you create it:

| Option | The link stops working |
|---|---|
| **24 hours** | One day after you create it. |
| **7 days** | One week after you create it. |
| **30 days** | One month after you create it. |
| **Until I revoke it** | Never on its own. It stays live until you revoke it. |

The dialog starts on **24 hours**, so if the link should last longer, pick another option before you create it. You can change it later from Shared Links (see [Change the expiry](#change-the-expiry)).

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

## Control What People Can Do {#control-what-people-can-do}

A file link can do more than hand over a file. You can let people look without taking a copy, or ask them to agree to your terms before they see anything. Both are useful when you send something sensitive, such as a contract, a pitch deck or a draft that isn't final.

You'll find these switches in two places:

<Unordered>
  <li>In the share dialog, right after the link is made.</li>
  <li>Later, in the link's Insights: click <BgStyledText>Insights</BgStyledText> on its row in Shared Links, then the gear at the top of the panel (<strong>Link settings</strong>).</li>
</Unordered>

Changes apply straight away and the link stays the same, so there's nothing to send again. These switches are for file links. Folder links don't have them.

### Make a link view only

Turn off **Allow download** and the people you send the link to can still open the file in their browser, but the Download buttons are gone. A file that can't be previewed shows *Downloads are off for this link.* instead.

A shared PDF also gets a faint watermark across every page: the viewer's email and the date when they're signed in to Hippius in that browser, or *Viewed* and the date when they aren't. It's drawn into the page itself, so a screenshot carries it too.

:::info View only discourages copying, it can't prevent it
To show the file, the viewer's browser has to hold all of it, and anyone can take a screenshot. Treat view only as a clear signal and a deterrent, not a lock. If someone must never have a copy, don't send them the file.
:::

### Ask people to accept an NDA

Turn on **Ask to accept an NDA**, type or paste your terms, and click <BgStyledText>Save</BgStyledText>. From then on, anyone who opens the link sees your text first, with an <strong>Accept</strong> button. The file only opens once they accept.

<Ordered>
  <li>Make the link as usual, or open an existing one's Link settings.</li>
  <li>Turn on <strong>Ask to accept an NDA</strong>.</li>
  <li>Write your terms in the box. Plain text works best, and line breaks are kept.</li>
  <li>Click <BgStyledText>Save</BgStyledText>.</li>
</Ordered>

To see who accepted, open the link's Insights and choose the **NDA** tab. It shows your text and everyone who accepted it, newest first, with the date and time. If you change the text later, an acceptance of the earlier version says so. Turn the switch off to remove the NDA. People can then open the file straight away.

A few things worth knowing:

<Unordered>
  <li><strong>Your text is end-to-end encrypted</strong> with the link's key, like comments, so Hippius can't read it. To see or change it in the console, your Drive needs to be unlocked.</li>
  <li><strong>Accepting doesn't need an account.</strong> An acceptance tells you that someone with the link accepted your text at that time. They show by the name they commented under in the same browser, or as an anonymous viewer, so it's not proof of who they are.</li>
  <li><strong>Password links.</strong> The console can't add an NDA to a link that has a password, because it never keeps the password.</li>
  <li>The text can be up to 64 KB, which is many pages.</li>
</Unordered>

### Which plans include what

| | Free plan | Paid Drive plans (Starter, Plus, Max, Scale) |
|---|---|---|
| Make file and folder links, with expiry and password | Yes | Yes |
| Change a link's expiry | Yes | Yes |
| Make a link view only (turn off **Allow download**) | No | Yes |
| Ask to accept an NDA | No | Yes |
| Insights, comments and reactions | No | Yes |
| Insights for folder links | No | Yes |
| Emails about your links | Yes | Yes |

On the Free plan these switches carry a **Paid** label, and turning one on shows an upgrade prompt instead. Turning things off always works on any plan, so a link never gets stuck. One thing to watch: on the Free plan, a switch you turn back to its free setting can't be changed again without upgrading. The console warns you under the switch before you do it.

If you move from a paid plan to the Free plan, your links keep working, but they stop counting views, taking comments and reactions, and hiding the download button. What a link already collected stays in its Insights. An NDA you set stays in place, and you can still see who accepted it or remove it.

## Active Shares

The Active Shares table shows every share currently live on your account. It refreshes automatically every 30 seconds.

The table includes shares created from any device or the desktop app, not just this browser. This means you might see shares here that you created elsewhere.


Every row shows the file's real name, wherever the link was made. Only an old entry in History can show `<created on another device>` instead.

### Copy link

Click the three dot menu on any row and choose <BgStyledText>Copy link</BgStyledText> to copy the full share URL to your clipboard.

**You can copy a link on any device, after you unlock.** The share URL includes the encryption key in the `#` fragment, and that key is kept in your account locked under your password. After a reload, or on another computer, the row shows <BgStyledText>Unlock to copy link</BgStyledText>: enter your [unlock password](/use/console/unlock-password) and the console rebuilds the same link. That works for links you made in the console, the desktop app or anywhere else.

Some older links keep the old limit and can only be copied in the browser session that created them. Their row reads **Not available in this session**. To share one of those again, revoke it and create a new share.

### Change the expiry {#change-the-expiry}

Need a link to last longer, or to stop sooner? Open its row menu, choose <BgStyledText>Change expiry</BgStyledText>, pick **24 hours**, **7 days**, **30 days** or **Until I revoke it**, and click <BgStyledText>Update expiry</BgStyledText>. The new time counts from now, it applies to everyone holding the link straight away, and the link itself doesn't change. This works for file and folder links.

A file link that has already expired can't be brought back, because its copy is gone. Its menu offers <BgStyledText>Reshare</BgStyledText> instead: the console finds the file in your Drive by its name and opens the share dialog on it, so you can make a fresh link. If the file was renamed or deleted, or more than one file has that name, it says so, and you can share it again from Drive.

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

### Remove chat preview

If a link has a [chat preview](/use/captures/share-links#a-preview-when-you-paste-the-link-in-a-chat) you'd rather not have out there, choose <BgStyledText>Remove chat preview</BgStyledText> from its menu. The preview picture is deleted from Hippius and the link keeps working. Chat apps that look the link up from then on show a plain card, but a chat that already showed the preview keeps its own copy.

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

A **Download** option is there too, unless you've [made the link view only](#make-a-link-view-only). The file is streamed directly to the recipient's device, decrypted entirely in their browser. We never see the file in plaintext on the recipient's end either.

If you've [asked for an NDA](#ask-people-to-accept-an-nda), recipients see your text first and must click **Accept** before the file opens.

When you've turned on comments or reactions for a link, recipients also see the comments in a panel beside the file (below it on a phone) and a row of reaction chips under it, where one tap adds a reaction and another takes it back. Commenters can tag you, or each other, by typing `@`. See [Views, Comments and Reactions](#views-comments-and-reactions).

If the link has been revoked or has expired, recipients see: _"This link has expired or been revoked."_ The page deliberately does not say which, which prevents anyone from guessing whether a link was ever valid.

## Views, Comments and Reactions

You sent a proposal. Did they open it? Did they read past page two? Insights answer that. Once a file link exists, the share dialog shows its switches under **Views, comments and reactions**: **Insights** counts views and watch time, **Comments** lets people comment, and **Reactions** lets them react with an emoji (**Allow download** sits with them, see [Make a link view only](#make-a-link-view-only)).

Where they start depends on the file and your plan:

| | Paid Drive plan | Free plan |
|---|---|---|
| Screenshots and recordings | Insights, Comments and Reactions on | All off |
| PDF, Word (DOCX) and PowerPoint (PPTX) files | Insights on, Comments and Reactions off | All off |
| Any other file | All off | All off |

Recipients see a short note when views are counted, can read comments without an account, and need a Hippius account to post a comment or react.

<Screenshot src="/img/console/captures/share-dialog-switches.png" alt="The console share dialog after the link is made, with Show a preview in chats and the Insights, Comments and Reactions switches" dark raw />

To see what happened to a link, click <BgStyledText>Insights</BgStyledText> on its row in Shared Links or in [Captures](/use/captures), or choose **View insights** from the row menu (in Drive, every file's menu has it too). Shared Links also shows each link's **Views** and **Comments**, and you can sort by either. Insights open in a panel on the right with the headline numbers first, then **Comments**, **Viewers** and **Reactions** tabs, and an **NDA** tab when the link asks for one. The link's switches are behind the gear at the top of the panel. A comment that tags you says **Mentioned you**, and the **Mentions you** filter shows only those. Comments, viewer names and who was tagged are end-to-end encrypted with the link's key. Everything about comments, reactions and privacy is in [Insights, comments and reactions](/use/captures/insights).

### See how far people read a document

For a PDF, Word document or PowerPoint presentation that people read in the browser, Insights follow them page by page. You see where people stopped (how many viewers reached each page) and the time spent on each page, so you can tell whether they reached the pricing on page 9 or gave up after the summary. Each viewer's row shows how many pages they saw, for example **9 of 12 pages**. Pages are counted while people read in the share page's viewer, not in a copy they download.

### Insights for folder links

A folder link can count views too. It tells you which files in the folder were opened, how often and by how many people, and for documents, how far people read and how long they spent. The **People** tab turns that around and shows who opened what.

Folder links start with Insights off. To turn them on:

<Ordered>
  <li>In Shared Links, click <BgStyledText>Insights</BgStyledText> on the folder link's row, or choose <strong>View insights</strong> from its menu.</li>
  <li>Click the gear at the top of the panel and turn on <strong>Insights</strong>.</li>
</Ordered>

From then on, the people who open the folder see a short note: *The owner can see how many people viewed*. Folder links don't take comments or reactions, and have no NDA or Allow download switch.

### Export to a spreadsheet

Want the numbers in your own report? Once a link has viewers listed, click <BgStyledText>Export CSV</BgStyledText> at the top of its Insights. You get one row per viewer for a file link, or one row per viewer and file for a folder link, with their visits, when they last viewed, how much of a video they watched, and the pages they saw. The file is built in your browser, so viewer names never pass through our servers, and it opens in Excel, Numbers or Google Sheets.

<Screenshot src="/img/console/captures/insights-comments.png" alt="The Comments tab of the console's Insights panel, with comments from Sam, Robin and Jordan at moments in the recording, a reply from the owner, and the reaction totals in the summary" dark raw />

## Storage Usage

Every file link stores a separate encrypted copy of your file on the Hippius network. This copy:

<Unordered>
  <li><strong>Counts toward your storage</strong>, on top of the file in your Drive. It's new data, encrypted with its own key, so it's never treated as a duplicate of the original. Sharing a 1 GB file uses another 1 GB while the link is live.</li>
  <li><strong>Is independent of your Drive copy</strong>, using a different key and living in a different location on the network, unaffected by any changes to your original file. Deleting or replacing the original leaves the link showing the file as it was when you shared it.</li>
  <li><strong>Is deleted when you revoke the link or it expires</strong>, and the space comes back within a few minutes. A link set to never expire keeps using space until you revoke it.</li>
</Unordered>

The chat preview picture doesn't count toward your storage.

Before a link's copy is uploaded, Hippius checks that you have room. If you're at your plan's limit (10 GB on the Free plan), the link isn't created: free up some space or upgrade, then try again.

If you share the same file several times, each link is a separate copy, and each one counts.

**Folder links are different.** A link to a folder in your Drive doesn't upload anything: the people you send it to open the folder's own encrypted files, so it uses no extra storage. A folder shared from outside your drives (from Finder in the desktop app) is uploaded as a copy, and that copy counts like a file link's.

:::tip Revoke links you no longer need
Every live file link uses storage. If you shared a file temporarily, say to send to a colleague, revoke it when you're done.
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
| **Change the expiry later** | ✅ File and folder links, from the row's menu | ✅ File and folder links, from the row's menu |
| **How it reads the file** | Downloads and decrypts the Drive copy | Reads the local plaintext file directly from disk |
| **Copy link (same session)** | ✅ Yes | ✅ Yes |
| **Copy link after reload** | ✅ Yes, after you unlock (older links: no) | ✅ Yes, key is saved to a local database |
| **Revoke** | ✅ Works from any device | ✅ Works from any device |
| **History** | ✅ Yes | ✅ Yes |

**How each app copies links after a reload:** The desktop app remembers each share's key on your computer. The console rebuilds the link once you unlock with your password.

**Changing an expiry.** Both apps change a live link's expiry without changing the link. The console asks in a small dialog (see [Change the expiry](#change-the-expiry)). The desktop app offers **Expire in 24 hours**, **Expire in 7 days**, **Expire in 30 days** and **Never expire** right in each link's menu.

## Limits

| Limit | Value |
|---|---|
| **Max shareable file size** | 5 GB |
| **Link expiry** | Your choice of 24 hours, 7 days, 30 days, or until you revoke it. Links made automatically for screenshots and recordings never expire by default. |
| **Share password** | Optional, at least 8 characters |
| **NDA text** | Up to 64 KB, file links only |

## Where to next

<Unordered>
  <li><a href="/use/console/drive">Drive</a>: browse, upload, and manage your encrypted files. This is where you create share links.</li>
  <li><a href="/use/console/shared-drives">Shared Drives</a>: invite people with a Hippius account into a drive or a folder, with a role.</li>
  <li><a href="/use/desktop/shared-links">Desktop Shared Links</a>: the desktop version with reshare support and persistent link copying.</li>
  <li><a href="/use/console/billing">Billing</a>: check your Drive plan has room before sharing large files.</li>
</Unordered>
