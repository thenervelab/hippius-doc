---
id: shared-drives
title: Shared Drives
sidebar_label: Shared Drives
slug: /use/desktop/shared-drives
description: Share a drive from the Hippius desktop app, invite people by email or with a link, let the app deliver keys for you, and open or sync drives other people have shared with you.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

A Hippius shared drive lets a group of people work in the same encrypted files, each signed in to their own Hippius account. You can share a drive straight from the desktop app, and drives other people share with you can be opened, or synced to your computer like any other folder.

Every drive belongs to one person, its owner. The owner pays for its storage and decides who gets in and what each person can do. Each folder you sync with the app is a drive you can share.

Shared drives work the same way in the desktop app and in the [Hippius Console](/use/console/shared-drives), and you can use both. A drive you share from the app can be managed from the console, and the other way round.

## Who Can Do What

When you let someone into a drive, you give them one of three roles:

| Role | What they can do |
|---|---|
| **Viewer** | Open and download files. |
| **Editor** | Open, download, upload and delete files. |
| **Manager** | Everything an Editor can do, plus invite people, change other people's roles, remove people, revoke links and approve email invites. |

A Manager helps you run the drive, but it stays yours. Nobody can change their own role (a member leaves instead), and nobody can change or remove the owner.

## Sharing a Drive

<Ordered>
  <li>Open <BgStyledIconWithText text="Drive" icon="Category" /> and find the drive in your list of folders.</li>
  <li>Open its menu (three dots) and choose <BgStyledText>Share drive…</BgStyledText>.</li>
  <li>In the Share dialog, add people by email, or create an invite link and send it yourself.</li>
  <li>Press <BgStyledText>Done</BgStyledText> when you're finished. Everything you did has already taken effect.</li>
</Ordered>

<Screenshot src="/img/desktop/shared-drives/share-drive-menu.png" alt="A drive's menu in the desktop app, with Share drive" dark raw />

The Share dialog has three parts, the same as in the console. **Invite people** sends someone their own invite by email. **People with access** lists everyone who can get in, and is where you change a role or remove someone. **General access** creates an invite link.

<Screenshot src="/img/desktop/shared-drives/share-dialog.png" alt="The Share dialog in the desktop app" dark raw />

Once people have joined, the drive's row shows **Shared with** and the number of people, with a <BgStyledText>Manage access</BgStyledText> button beside it.

"Share drive" is different from **Share via link** on files and folders. A share link hands out a read only copy to anyone, no account needed. See [Shared Links](/use/desktop/shared-links) for that.

### Inviting people by email

Type an address under **Invite people**, pick **Viewer** or **Editor**, and press <BgStyledText>Send invite</BgStyledText>. The invite is for that one person, works once and lasts 7 days. The email carries no key, so a forwarded invite is useless to anyone else.

The person opens the link in the email and signs in to the console with the address it was sent to. Then the app takes it from there: see [Keys are delivered for you](#keys-are-delivered-for-you).

To add a **Manager**, invite them as an Editor, then change their role once they have joined. Email invites can't make someone a Manager.

### Sharing with an invite link

Under **General access**, pick the role the link gives and how long it lasts, then press <BgStyledText>Create link</BgStyledText>. Press <BgStyledText>Copy</BgStyledText> and send the link yourself.

| Link | Who it lets in | How long it lasts |
|---|---|---|
| **Viewer or Editor link** | Up to 50 people | 24 hours, 7 days, 30 days, or never expires (it works until you revoke it) |
| **Manager link** | One person | 24 hours |

If you want several Managers, invite them as Editors and change their role afterwards.

:::warning Treat an invite link like a password
Anyone holding the full link can join. The part after the `#` carries the drive's key, and the app hides it on screen, but <strong>Copy</strong> copies the whole link. Send it only to the people it is meant for, and revoke it when you no longer need it.
:::

## Keys Are Delivered for You {#keys-are-delivered-for-you}

When someone opens an email invite and signs in with the right address, they still need the drive's key. You don't have to do anything for that: while you're signed in to the desktop app and it is unlocked, it delivers the key in the background, and the person joins shortly after. The app lets you know with a message such as "priya@example.com can join Team Files."

Your Managers' apps do the same, and so does the console while it is open and unlocked. Whoever gets there first lets them in.

If nobody on your side has the app or the console open, the invite waits. You can let them in yourself: find the invite under **People with access** or in **Manage access** and press <BgStyledText>Approve</BgStyledText>. The invite shows as **Opened** while it waits for you.

## Sharing a Single Folder

You can share one folder inside a drive you own, so someone sees that folder and nothing else.

<Ordered>
  <li>Open the drive and find the folder.</li>
  <li>Open the folder's menu and choose <BgStyledText>Share folder</BgStyledText>.</li>
  <li>Under <strong>General access</strong>, choose how long the link lasts (24 hours, 7 days or 30 days) and press <BgStyledText>Create link</BgStyledText>.</li>
  <li>Copy the link and send it to the one person it is for.</li>
</Ordered>

<Screenshot src="/img/desktop/shared-drives/share-folder-dialog.png" alt="Sharing a single folder from the desktop app" dark raw />

In the desktop app, a folder link gives **Viewer** access and works once, for the first person who opens it. For anything more, use the [console](/use/console/shared-drives#sharing-a-single-folder), where you can also give someone **Editor** access to a single folder.

A folder shared on its own shows its own **Shared with** mark and its own <BgStyledText>Manage access</BgStyledText>, which lists only the people who have that folder. To change what someone can do in a folder, remove them and invite them again.

## Managing Who Has Access

Press <BgStyledText>Manage access</BgStyledText> beside a shared drive, or open it from the Share dialog. The panel lists the people in the drive, invites still waiting, and the links that are still active.

<Screenshot src="/img/desktop/shared-drives/manage-access.png" alt="The Manage access panel in the desktop app" dark raw />

If you own the drive or are one of its Managers, you can:

<Unordered>
  <li><strong>Change someone's role</strong> from the menu beside their name. Changes apply right away.</li>
  <li><strong>Remove someone</strong> with <BgStyledText>Remove access</BgStyledText> in the same menu. They lose access at once.</li>
  <li><strong>Cancel an invite</strong> that hasn't been accepted, or <strong>approve</strong> one that is waiting for its key.</li>
  <li><strong>Copy or revoke a link.</strong> A revoked link lets nobody new in, and people who already joined keep their access.</li>
  <li><strong>Invite more people</strong> with <BgStyledText>Share</BgStyledText>.</li>
</Unordered>

Removing someone, cancelling an invite, revoking a link and lowering someone's role each ask you to confirm right there in the row. When you move a Manager to another role, the invite links they created stop working too, so a spare link can't give them their old access back.

Viewers and Editors see a <BgStyledText>Who has access</BgStyledText> button instead. It shows the same list, without anything to change.

:::tip Links locked?
The app needs your unlock password to show invite links. If the panel says the links are locked, enter your unlock password to show and copy them.
:::

## Joining a Drive Someone Shared With You

Invites are accepted in the browser. Open the invite link, or the link in your invite email, and it takes you to the Hippius Console, where you sign in and press <BgStyledText>Join drive</BgStyledText>. [Joining a shared drive](/use/console/shared-drives#joining-a-shared-drive) in the console guide walks through it, including email invites.

Joining is free on every plan, because the owner pays for the storage. Once you've joined, the drive shows up in the desktop app too.

## Drives Shared With You

Drives you've joined are listed under **Shared with Me**, below your own drives on the Drive page and in <BgStyledIconWithText text="Settings" icon="Settings" /> → **Sync & Storage**. The section appears once you have joined something.

<Screenshot src="/img/desktop/shared-drives/shared-with-me.png" alt="Shared with Me in the desktop app" dark raw />

Each row shows the drive's name, your role, who shared it and how big it is. From there you can:

<Unordered>
  <li><strong>Open it.</strong> Click the row to browse the drive straight from the network. Nothing is downloaded to your computer until you download a file.</li>
  <li><strong>Sync it.</strong> Choose <BgStyledText>Sync to this computer</BgStyledText> in the row's menu and pick a folder on your computer. From then on it syncs like your own folders, and the row shows <strong>Synced here</strong>.</li>
</Unordered>

What you can change depends on your role. A Viewer who tries to add files is told they have Viewer access and can ask for Editor access. Anything you upload counts towards the owner's storage, not yours.

If the owner's account runs into a billing limit, the drive is marked **Frozen**. You can still open and download files, but nobody can change anything until the owner sorts out their billing.

A single folder that someone shared with you on its own isn't listed in the desktop app. Open it from **Shared Drives** in the [console](/use/console/shared-drives#working-in-a-shared-drive).

## Leaving a Shared Drive

<Unordered>
  <li>In <strong>Shared with Me</strong>, open the drive's menu and choose <BgStyledText>Leave drive</BgStyledText>.</li>
  <li>If you sync the drive, you can also choose <BgStyledText>Leave shared drive</BgStyledText> from its menu in your drive list.</li>
</Unordered>

You lose access to its files and the drive stops syncing. Anything already on your computer stays there, and the owner can invite you again. You can also leave from the bottom of the <strong>Manage access</strong> or <strong>Who has access</strong> panel.

## Sharing and Your Plan

Sharing a drive, sending email invites, creating invite links and approving email invites are included with the **Plus**, **Max** and **Scale** Drive plans. See [Billing](/use/desktop/billing).

On **Free** and **Starter**, the Share dialog still opens, but an upgrade prompt stands in for the controls that add people. Anyone who already has access keeps it, and you can still see and remove them. <BgStyledText>Upgrade plan</BgStyledText> takes you to the plans in Settings.

{/* TODO screenshot: the Share dialog on a Starter plan, with the "Sharing is available on Plus, Max and Scale plans." card and its Upgrade plan button.
    Add static/img/desktop/shared-drives/upgrade-card.png AND upgrade-card-dark.png, then uncomment:
    <Screenshot src="/img/desktop/shared-drives/upgrade-card.png" alt="The sharing upgrade prompt in the desktop app" dark raw /> */}

On a drive you manage for someone else, the owner's plan is the one that counts, not yours.

## Where to next

<Unordered>
  <li><a href="/use/console/shared-drives">Shared Drives in the console</a>: join invites, share single folders as Editor, and manage access from the browser.</li>
  <li><a href="/use/desktop/drive">Drive</a>: your sync folders and files.</li>
  <li><a href="/use/desktop/shared-links">Shared Links</a>: share a file or folder with someone who has no Hippius account.</li>
  <li><a href="/use/desktop/billing">Billing</a>: the Drive plans that include sharing.</li>
</Unordered>
