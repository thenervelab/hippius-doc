---
id: shared-drives
title: Shared Drives
sidebar_label: Shared Drives
slug: /use/mobile/shared-drives
description: Share a drive or a single folder from the Hippius mobile app, invite people by email or with a link, join drives shared with you, and manage who has access.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';

## Introduction

A shared drive lets a group of people work in the same encrypted files, each signed in to their own Hippius account. A family can keep its photos together, a team can keep a project in one place, and nobody has to send files back and forth.

Every drive belongs to one person, its owner, who decides who gets in and what each person can do. In the app, each drive under **Drive** → **My drives** is a drive you can share, as a whole or one folder at a time.

Everything stays end-to-end encrypted. The people you invite get the key to the drive, and we never see it.

If you only want to send a file or folder to someone without a Hippius account, a [shared link](/use/mobile/shared-links) is the simpler choice.

## Who can do what

When you let someone into a whole drive, you give them one of three roles:

| Role | What they can do |
|---|---|
| **Viewer** | Open and download files. |
| **Editor** | Open, download, upload, rename and delete files. |
| **Manager** | Everything an Editor can do, plus invite people, change their roles, remove them and revoke links. |

A single folder can be shared as **Viewer** or **Editor**. The drive's owner and its Managers look after who has it.

## Sharing a drive

<Ordered>
  <li>In <strong>Drive</strong>, open the <strong>Shared</strong> tab and tap <BgStyledText>Share a drive</BgStyledText>.</li>
  <li>Pick one of your drives. To share something new, tap <strong>New drive</strong>, type a <strong>Drive name</strong> and tap <BgStyledText>Create drive</BgStyledText>.</li>
  <li>The <strong>People</strong> screen opens for that drive. Tap <BgStyledText>Invite</BgStyledText> to let someone in. See <a href="#inviting-people">Inviting people</a>.</li>
</Ordered>

You can also press and hold a drive in **My drives** and choose **Share drive**, or open the drive and choose **People** in its **…** menu.

## Sharing a single folder

To let someone into one folder without giving them the rest of the drive, open the folder's **…** menu, or press and hold it, and choose **Share with people**. Then tap <BgStyledText>Share folder</BgStyledText>. They can open that folder and everything inside it, and nothing else.

## Inviting people {#inviting-people}

The invite sheet offers two ways to let someone in:

<Unordered>
  <li><strong>Email</strong> sends an invite to their address. Type it in, choose their access, and tap <BgStyledText>Send invite</BgStyledText>.</li>
  <li><strong>Link</strong> makes an invite link you send however you like. Choose the access and tap <BgStyledText>Create link</BgStyledText>. On <strong>Link ready</strong>, tap <BgStyledText>Copy link</BgStyledText> or <BgStyledText>Share</BgStyledText>.</li>
</Unordered>

Under **Access**, a drive starts on **Editor** and a folder on **Viewer**. **Manager** is offered only for invite links to a whole drive.

Under **Expires**, choose how long the invite works: **1 day**, **7 days** (the default), **30 days** or **Never**. Some invites have a shorter limit, so the app only offers what is allowed:

| Invite | Longest it can last |
|---|---|
| Email invite | 30 days |
| Invite link to a single folder | 30 days |
| Invite link with the Manager role | 1 day |

Treat an invite link like a key to the drive: anyone who has it can join with the access you chose until it expires or you revoke it.

When someone accepts an email invite, they also need the drive's key. Any of your Hippius apps that is open and signed in delivers it for them, including this one, so there is nothing for you to approve.

## Managing who has access {#managing-access}

The **People** screen lists everyone who can get in. Open it from **Manage** beside a drive on the **Shared** tab, or with **People** in the drive's **…** menu. It has three parts:

<Unordered>
  <li><strong>People</strong>: everyone in the drive, with the owner first.</li>
  <li><strong>Invited</strong>: email invites that haven't been accepted yet.</li>
  <li><strong>Links</strong>: invite links that still work.</li>
</Unordered>

Tap a row to act on it. If you own the drive or are one of its Managers, you can:

<Unordered>
  <li><strong>Change someone's role.</strong> The change applies right away.</li>
  <li><strong>Remove someone</strong> with <BgStyledText>Remove access</BgStyledText>. They can't open the drive any more. Files they already downloaded stay with them.</li>
  <li><strong>Cancel an invite</strong> that hasn't been accepted.</li>
  <li><strong>Copy or revoke an invite link.</strong> A revoked link stops working for anyone who has it.</li>
  <li><strong>Replace an old link.</strong> Links marked <strong>Old link</strong> were made the older way, with the drive's key in the address. <BgStyledText>Replace link</BgStyledText> swaps it for a safer one that works the same way, and turns the old one off.</li>
</Unordered>

Nobody can change or remove the owner, and a Manager can't change their own role.

## Joining a drive someone shared with you {#joining-a-drive}

Tap the invite link or the link in the invite email on your phone, and it opens in the app. You see the drive's name, who owns it and the role you'll have. Tap <BgStyledText>Join</BgStyledText>, or <BgStyledText>Not now</BgStyledText> to leave it for later.

<Unordered>
  <li>If you aren't signed in yet, the app keeps the invite and finishes it once you are.</li>
  <li>If your files are locked on this phone, the app asks for your <a href="/use/mobile/settings#unlock-password">unlock password</a> first.</li>
  <li>An email invite may read <strong>Waiting to join</strong> until the drive's key reaches you. You join as soon as one of the owner's or a Manager's Hippius apps is open.</li>
  <li>If it says <strong>This invite has expired</strong> or <strong>This invite link is not valid</strong>, ask whoever sent it for a new one.</li>
</Unordered>

Once you've joined, the drive appears on the **Shared** tab.

## The Shared tab {#the-shared-tab}

**Shared** in Drive lists the drives other people share with you and the drives you share. The chips at the top switch between **All**, **Shared with you** and **Shared by you**.

<Unordered>
  <li>A drive shared with you shows its owner and your role. Tap it to open it.</li>
  <li>A drive you share shows how much it holds and a <BgStyledText>Manage</BgStyledText> button, which opens its People screen.</li>
  <li><strong>Your share links</strong>, at the bottom, opens the <a href="/use/mobile/shared-links#seeing-and-revoking-your-links">Shared Links</a> you made for people without an account.</li>
</Unordered>

If your Drive plan doesn't include sharing, **Share a drive** isn't offered. Drives other people share with you still list and open as usual, on any plan. Which plans include sharing is explained in the [console guide](/use/console/shared-drives).

## Working in a shared drive

A shared drive works much like your own. What you can do depends on your role:

<Unordered>
  <li><strong>Viewers</strong> can browse, preview, star and download files.</li>
  <li><strong>Editors and Managers</strong> can also upload, create folders, rename and delete, and select several items at once. You can send files to a shared drive from other apps too. See <a href="/use/mobile/drive#from-other-apps">From other apps</a>.</li>
</Unordered>

Some things only work in your own drives: moving files, keeping them [available offline](/use/mobile/drive#offline-files), and creating share links. To move files into or out of a shared drive, use [Move to… in the console](/use/console/drive#moving-files-and-folders).

If an upload is refused, the app says why, for example because your role doesn't allow it. A drive can also become **Read-only** for a while because of its owner's account. Everything still opens, but nothing new can be added until the owner sorts it out.

## Leaving a drive or folder

On the **Shared** tab, open the row's **…** menu and choose <BgStyledText>Leave drive</BgStyledText> (or <BgStyledText>Leave folder</BgStyledText>), then confirm. You lose access to everything in it, including anything added later. Files you already downloaded stay on your phone. The owner can invite you again if you change your mind.

The same menu has **Report**, to tell us about a drive that breaks the rules.

## Where to next

<Unordered>
  <li><a href="/use/mobile/drive">Your Files</a>: browse, upload and organise.</li>
  <li><a href="/use/mobile/shared-links">Sharing Files</a>: send a file or folder to someone without a Hippius account.</li>
  <li><a href="/use/console/shared-drives">Shared Drives in the console</a>: the same drives in your browser, with plan details.</li>
  <li><a href="/use/desktop/shared-drives">Shared Drives in the desktop app</a>: share drives and sync the ones shared with you on your computer.</li>
</Unordered>
