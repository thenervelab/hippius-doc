---
id: shared-drives
title: Shared Drives
sidebar_label: Shared Drives
slug: /use/console/shared-drives
description: Share a drive or a single folder from the Hippius Console, invite people by email or with a link, join drives shared with you, and manage who has access.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

A Hippius shared drive lets a group of people work in the same encrypted files, each signed in to their own Hippius account. Your team can keep a project in one place, a family can keep its photos together, and nobody has to email files back and forth.

Every drive belongs to one person, its owner. The owner pays for its storage and decides who gets in and what each person can do. You can let someone into a whole drive, or into just one folder of it.

Each top level folder under **Drive** → **My Drives** is a drive you can share. Everything stays end-to-end encrypted: the people you invite get the key to the drive, and we never see it.

## Who Can Do What

When you let someone into a whole drive, you give them one of three roles:

| Role | What they can do |
|---|---|
| **Viewer** | Open and download files. |
| **Editor** | Open, download, upload and delete files. |
| **Manager** | Everything an Editor can do, plus invite people, change other people's roles, remove people, revoke links and approve email invites. |

A Manager helps you run the drive, but it stays yours. A Manager can't change their own role (they can leave instead), and nobody can change or remove the owner.

A single folder can be shared as **Viewer** or **Editor**. Nobody manages a folder on its own: the drive's owner and its Managers look after who has it.

## Sharing a Drive

<Ordered>
  <li>Go to <strong>Drive</strong> → <strong>My Drives</strong>.</li>
  <li>Open the menu (three dots) on the drive's row and choose <BgStyledText>Share drive</BgStyledText>.</li>
  <li>In the Share dialog, add people by email, or create an invite link and send it yourself. You can do both, as often as you like.</li>
  <li>Press <BgStyledText>Done</BgStyledText> when you're finished. Everything you did has already taken effect.</li>
</Ordered>

<Screenshot src="/img/console/shared-drives/owner-share-drive-menu.png" alt="The row menu of a drive in My Drives, with Share drive" dark raw />

The Share dialog works the way you might know from other drive apps. **Invite people** sends someone their own invite by email. **People with access** lists everyone who can get in, and is where you change a role or remove someone. **General access** creates an invite link.

<Screenshot src="/img/console/shared-drives/share-dialog.png" alt="The Share dialog for a drive, with people, a pending email invite and the invite link controls" dark raw />

"Share drive" is different from **Share via public link** in the same menu. A public link hands out a read only copy to anyone, with no account needed. See [Shared Links](/use/console/shared-links) for that.

Once someone has joined, the drive shows a **Shared** mark in My Drives (for example "Shared with 3"), and a <BgStyledText>Manage access</BgStyledText> button beside it.

## Sharing a Single Folder

Sometimes you only want someone to see one folder, like the files for one client. You can share any folder inside a drive on its own.

<Ordered>
  <li>Open the drive and find the folder.</li>
  <li>Open the folder's menu and choose <BgStyledText>Share folder</BgStyledText>.</li>
  <li>Under <strong>General access</strong>, pick <strong>Viewer</strong> or <strong>Editor</strong> and how long the link lasts, then press <BgStyledText>Create link</BgStyledText>.</li>
  <li>Send the link to the one person it is for.</li>
</Ordered>

<Screenshot src="/img/console/shared-drives/share-folder-dialog.png" alt="The Share dialog for a single folder, offering Viewer and Editor" dark raw />

The person you invite sees that folder and everything inside it, and nothing else. They don't see the rest of the drive, or even its name. An Editor can upload, rename and delete files inside the folder, but can't touch anything outside it.

A few things work differently for a folder:

<Unordered>
  <li><strong>A folder is shared by link, not by email.</strong> Our server doesn't send email invites for a single folder yet, so create a link and send it yourself.</li>
  <li><strong>Each folder link is for one person.</strong> It works once, for the first person who opens it, and lasts up to 30 days. Make one link per person.</li>
  <li><strong>People who have the whole drive can open the folder too.</strong> They appear in the folder's list, but you manage their access on the drive.</li>
</Unordered>

A folder shared on its own gets its own **Shared** mark and its own <BgStyledText>Manage access</BgStyledText>, which lists only the people who have that folder. The drive itself only shows as shared once you share the whole drive.

<Screenshot src="/img/console/shared-drives/folder-shared-row.png" alt="A folder shared on its own, with its Shared mark, Manage access button and row menu" dark raw />

There is no way to change someone's role on a single folder in place. To give them different access, remove them and invite them again.

## Inviting People by Email

An email invite is for one person and works once. It lasts 7 days when you send it from the console. Type an address under **Invite people**, pick **Viewer** or **Editor**, and press <BgStyledText>Send invite</BgStyledText>.

The email carries no key, so a forwarded invite is useless to anyone else. Here is what happens next:

<Ordered>
  <li>They open the link in the email and sign in with the <strong>same address the invite was sent to</strong>.</li>
  <li>Their row in your Share dialog changes to <strong>Opened</strong>.</li>
  <li>While your console is open and unlocked, it delivers the drive key for you, and they join a few seconds later. The <a href="/use/desktop/shared-drives">Hippius desktop app</a> does the same while you're signed in to it. A Manager's console or app can deliver it too.</li>
</Ordered>

If nobody on your side has the console or the desktop app open, the invite waits. You can also let them in straight away: open the invite in the Share dialog or in **Manage access** and press <BgStyledText>Approve</BgStyledText>. You'll need to be unlocked to do it.

To add a **Manager**, invite them as an Editor, then change their role once they have joined. Email invites can't make someone a Manager.

If you send a lot of invites in a short time, the console asks you to wait a few minutes before sending more.

## Sharing With an Invite Link

An invite link lets in whoever opens it, until it expires or is used up. When you press <BgStyledText>Create link</BgStyledText>, the console copies the link for you. You can copy it again from the dialog, or from **Manage access** later on.

| Link | Who it lets in | How long it lasts |
|---|---|---|
| **Viewer or Editor link to a drive** | Up to 50 people | 24 hours, 7 days, 30 days, or never expires (it works until you revoke it) |
| **Manager link to a drive** | One person | 24 hours |
| **Link to a single folder** | One person | 24 hours, 7 days or 30 days |

Manager and folder links are single use on purpose: they give a lot away, so each one is meant for one named person. If you want several Managers, invite them as Editors and change their role afterwards.

:::warning Treat an invite link like a password
Anyone holding the full link can join. The part after the `#` carries the drive's key. Your browser never sends that part to any server, and the console removes it from the address bar as soon as the page loads. Send the link only to the people it is meant for, and revoke it when you no longer need it.
:::

You can revoke any link from **Manage access**, and it stops working at once. People who already joined through it keep their access until you remove them.

## Joining a Shared Drive

Joining is free on every plan, including Free, because the owner pays for the storage. You need a Hippius account, and creating one is free too.

### From an invite link

Open the link, sign in to Hippius (or create an account), and press <BgStyledText>Join drive</BgStyledText> (or <BgStyledText>Join folder</BgStyledText>). You land inside the drive straight away.

<Screenshot src="/img/console/shared-drives/invite-join.png" alt="An invite to a drive, ready to join" dark raw />

Your files in Hippius are protected by your unlock password, and joining keeps your access to the drive under it too. If your account doesn't have an unlock password yet, the console asks you to set one first. See [Unlock Password](/use/console/unlock-password).

### From an email invite

Open the link in the email and sign in with the address it was sent to. If you sign in with a different one, the console tells you the invite was sent to a different address, and the invite stays waiting for the right account.

<Screenshot src="/img/console/shared-drives/invite-waiting.png" alt="An email invite waiting for the drive key" dark raw />

The page then says **Waiting to join**. Keep it open and you join as soon as the owner's (or a Manager's) console or desktop app delivers the drive key. You can also close it and come back to the same link later.

:::note Signed in with an access key?
Accounts that sign in with an access key have no email address on file, so they can't accept an email invite. Ask the person who invited you for an invite link instead.
:::

## Working in a Shared Drive

Drives and folders shared with you live under **Drive** → **Shared Drives** in the sidebar. The entry appears once you have joined something, so if nobody has shared with you yet, you won't see it.

<Screenshot src="/img/console/shared-drives/list.png" alt="The Shared Drives page, with two whole drives and a folder shared on its own" dark raw />

Each row shows who owns it and your role there. Two people can both have a drive called "Design", so the owner is part of how you tell them apart. Your role is shown on the drive, not on every folder inside it, because it covers the whole drive.

A folder shared with you on its own shows up in the same list, marked **Folder in a drive**. You see that folder and what's inside it, and nothing else.

Open a shared drive and you get the same file browser as your own Drive, with search, previews and downloads. Uploads, renames and deletes are there if your role allows them. The breadcrumb starts at **Shared Drives**, so going up takes you back to the list.

<Screenshot src="/img/console/shared-drives/inside-drive.png" alt="Browsing inside a shared drive as a Manager" dark raw />

Anything you upload to a shared drive is stored in the owner's drive and counts towards their storage, not yours.

:::info When the owner's billing pauses a drive
If the owner's account runs into a billing limit, the drive becomes read only for everyone, the owner included. You can still open and download files, but nobody can upload until the owner sorts out their billing.
:::

## Managing Who Has Access

Open <BgStyledText>Manage access</BgStyledText> from the button beside a shared drive's name, from its row menu, or from the Share dialog. It lists everyone who can get in: the people in the drive, invites still waiting, and the links that are still active.

<Screenshot src="/img/console/shared-drives/manage-access.png" alt="The Manage access panel for a drive, seen by a Manager" dark raw />

If you own the drive or are one of its Managers, you can:

<Unordered>
  <li><strong>Change someone's role</strong> with the menu beside their name. A change applies right away.</li>
  <li><strong>Remove someone.</strong> They lose access at once, and the drive disappears from their list.</li>
  <li><strong>Cancel an invite</strong> that hasn't been accepted, or <strong>approve</strong> one that is waiting for its key.</li>
  <li><strong>Revoke a link</strong> so nobody new can join with it.</li>
  <li><strong>Invite more people</strong> with <BgStyledText>Share</BgStyledText>.</li>
</Unordered>

Removing someone, cancelling an invite and revoking a link each ask you to confirm right there in the row, so you never lose your place.

When you lower someone's role, any invite link that let them in with more access than their new role is revoked too. If you move a Manager to another role, the invite links they created stop working as well, so a spare link can't give them their old access back.

Viewers and Editors can open the same panel to see who else is in the drive, but can't change anything.

## Leaving a Drive or Folder

You can leave whenever you like. On the Shared Drives page, open the row's menu and choose <BgStyledText>Leave drive</BgStyledText> (or <BgStyledText>Leave folder</BgStyledText>), then confirm.

You lose access to everything in it, including anything added later. Files you already downloaded stay on your device. The owner can invite you again if you change your mind.

If the owner or a Manager removes you, the drive disappears from your Shared Drives list, just as if you had left.

## Sharing and Your Plan

Sharing a drive or a folder, sending email invites, creating invite links and approving email invites are included with the **Plus**, **Max** and **Scale** Drive plans. See [Drive plans](/use/console/billing#drive-plans).

On **Free** and **Starter**, the Share dialog shows an upgrade prompt in place of the controls that add people. Anyone who already has access keeps it, and you can still see and remove them, so moving to a smaller plan never locks you out of your own drive.

<Screenshot src="/img/console/shared-drives/upgrade-card.png" alt="The upgrade prompt in the Share dialog on a plan without sharing" dark raw />

On a drive you manage for someone else, the owner's plan is the one that counts, not yours. If theirs doesn't include sharing, the console tells you no new invites can be made for now, and it's up to the owner to upgrade.

## Where to next

<Unordered>
  <li><a href="/use/console/drive">Drive</a>: your own encrypted files.</li>
  <li><a href="/use/desktop/shared-drives">Shared Drives in the desktop app</a>: share drives and deliver keys from your computer, and sync drives shared with you.</li>
  <li><a href="/use/console/shared-links">Shared Links</a>: share a single file or folder with someone who has no Hippius account.</li>
  <li><a href="/use/console/unlock-password">Unlock Password</a>: the password that protects your files and your access to shared drives.</li>
  <li><a href="/use/console/billing#drive-plans">Drive plans</a>: which plans include sharing.</li>
</Unordered>
