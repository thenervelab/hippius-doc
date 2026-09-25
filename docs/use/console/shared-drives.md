---
id: shared-drives
title: Shared Drives
sidebar_label: Shared Drives
slug: /use/console/shared-drives
description: Join a drive or folder someone has shared with you, work in it from the Hippius Console, and manage who has access to a drive you own or manage.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

A shared drive lets a group of people work in the same encrypted files. The drive belongs to one person, its owner. They pay for its storage, and they decide who else gets in and what each person can do. Everyone else is invited, either to the whole drive or to a single folder of it.

Here is what the console does with shared drives today:

<Unordered>
  <li><strong>Joining and working in shared drives is live.</strong> Anyone with a Hippius account can accept an invite, on any plan, including Free.</li>
  <li><strong>Managing access is live</strong> for drives that are already shared: their owners, and the people they made Managers, can invite more people, change roles, remove people and revoke links.</li>
  <li><strong>Starting to share a drive or a folder from the console is coming soon.</strong> Until then, a drive's first invite comes from the Hippius desktop app on the beta channel. See <a href="#starting-a-shared-drive">Starting a shared drive</a>.</li>
</Unordered>

{/* Screenshot placeholder: the Shared Drives list with a whole drive and a "Folder in a drive" row.
    Add static/img/console/shared-drives/list.png AND list-dark.png, then uncomment:
    <Screenshot src="/img/console/shared-drives/list.png" alt="The Shared Drives page" dark /> */}

## Who Can Do What

When you invite someone to a whole drive, you give them one of three roles:

| Role | What they can do |
|---|---|
| **Viewer** | Open and download files. |
| **Editor** | Everything a Viewer can do, plus upload, rename and delete files. |
| **Manager** | Everything an Editor can do, plus invite people, change other people's roles, remove people, revoke links and approve email invites. |

A Manager helps you run the drive, but it stays yours. A Manager can't change their own role (they can leave instead), and can't change or remove the owner.

A single folder can be shared as **Viewer** or **Editor** only. Nobody manages a folder except the drive's owner and its Managers.

## Joining a Shared Drive

An invite reaches you in one of two ways, and they work a little differently.

### From an invite link

Someone copies an invite link and sends it to you. Open it, sign in to Hippius (or create an account, which is free), and you join straight away.

Your files in Hippius are encrypted with your unlock password, and joining seals your access to the drive under it. If your account doesn't have an unlock password yet, the console asks you to set one first. See [Unlock Password](/use/console/unlock-password).

:::warning Treat an invite link like a password
Anyone holding the full link can join, until it expires or is used up. The part after the `#` carries the drive's key. Your browser never sends that part to any server, and we remove it from the address bar as soon as the page loads. Send the link only to the people it is meant for.
:::

### From an email invite

An email invite is addressed to one person. The link in the email carries no key, so a forwarded email is useless to anyone else.

<Ordered>
  <li>Open the link in the email.</li>
  <li>Sign in with the <strong>same email address the invite was sent to</strong>. If you sign in with a different one, the console tells you the invite was sent to a different address, and the invite stays waiting for the right account.</li>
  <li>Wait for the key. The owner's (or a Manager's) console delivers it automatically while it is open and unlocked on their side. Keep the page open and you join as soon as it arrives, or come back to the same link later.</li>
</Ordered>

If nobody on the other side has the console open, the invite waits. They can also approve it by hand from their **Manage access** panel.

:::note Signed in with an access key?
Accounts that sign in with an access key have no email address on file, so they can't accept an email invite. Ask the person who invited you for an invite link instead.
:::

## Finding Your Shared Drives

Drives and folders shared with you live under **Drive** → **Shared Drives** in the sidebar. The entry only appears once you have joined something, so if nobody has shared with you yet, you won't see it.

Each row shows who shared it and what you can do in it. Two people can both have a drive called "Design", so the owner is part of how you tell drives apart.

Open a shared drive and you get the same file browser as your own Drive, with search, previews and downloads. Uploads, renames and deletes are there if your role allows them. The breadcrumb starts at **Shared Drives**, so going up takes you back to the list.

Anything you upload to a shared drive is stored in the owner's drive and counts towards their storage, not yours.

:::info When the owner's billing pauses a drive
If the owner's billing limits the drive, it becomes read only for everyone, the owner included. You can still open and download files, but nobody can upload until the owner sorts out their billing.
:::

{/* Screenshot placeholder: browsing inside a shared drive, showing the Shared Drives breadcrumb and the role chip.
    Add static/img/console/shared-drives/inside-drive.png AND inside-drive-dark.png, then uncomment:
    <Screenshot src="/img/console/shared-drives/inside-drive.png" alt="Browsing inside a shared drive" dark /> */}

## Folders Shared With You

Sometimes an owner shares one folder rather than the whole drive. That folder shows up on its own in your Shared Drives list, marked **Folder in a drive**. You see that folder and everything inside it, and nothing else. You don't see the rest of the drive, or even the drive's name.

A folder can be shared with you as a Viewer or an Editor. Editor access for a single folder is coming soon, so for now you can open and download files in a shared folder, but not change them.

## Leaving a Drive or Folder

You can leave whenever you like. Open the row's menu on the Shared Drives page and choose <BgStyledText>Leave drive</BgStyledText> (or <BgStyledText>Leave folder</BgStyledText>), then confirm.

You lose access to everything in it, including anything added later. Files you already downloaded stay on your device. Leaving a folder also removes any other folders from the same drive that were shared with you.

The owner or a Manager can also remove you. The drive then disappears from your list, and an old link to it tells you that you no longer have access.

## Managing Who Has Access

If you own a drive that is already shared, or you are a Manager of one, you can look after its people from the console. Open the drive's menu, or the button next to its name, and choose <BgStyledText>Manage access</BgStyledText>.

The panel lists everyone who can get in: the people in the drive, pending invites, and the links that are still active. To let someone new in, press <BgStyledText>Share</BgStyledText>. The Share dialog has three parts, the way you might know from other drive apps:

<Unordered>
  <li><strong>Add people by email</strong> sends someone their own invite.</li>
  <li><strong>People with access</strong> is where you change someone's role or remove them.</li>
  <li><strong>General access</strong> creates an invite link you can send yourself. You pick the role and how long it lasts, then create the link.</li>
</Unordered>

Removing someone, cancelling an invite or revoking a link asks you to confirm right there in the row, and takes effect straight away. Viewers and Editors can open the same panel to see who else is in the drive, but can't change anything.

{/* Screenshot placeholder: the Share dialog on a whole drive, with the email field, People with access and General access.
    Add static/img/console/shared-drives/share-dialog.png AND share-dialog-dark.png, then uncomment:
    <Screenshot src="/img/console/shared-drives/share-dialog.png" alt="The Share dialog for a drive" dark /> */}

### How invite links work

The rules depend on what the link opens:

| Link | Who it lets in | How long it lasts |
|---|---|---|
| **Viewer or Editor link to a drive** | Up to 50 people | 24 hours, 7 days, 30 days, or never expires (it works until you revoke it) |
| **Manager link to a drive** | One person | 24 hours |
| **Link to a single folder** | One person | Up to 30 days |

Manager and folder links are single use on purpose: they give out a lot, so each one is meant for one named person. If you want to make several Managers, invite them as Editors and change their role afterwards.

You can revoke any link from the Manage access panel, and it stops working at once. People who already joined through it keep their access until you remove them.

### How email invites work

An email invite is for one person and works once. An invite sent from the console lasts 7 days.

<Unordered>
  <li>You can invite people by email as a <strong>Viewer</strong> or an <strong>Editor</strong>. To add a Manager, invite them as an Editor, then change their role once they have joined.</li>
  <li>When they open the invite and sign in with the right address, their key is delivered automatically while your console is open and unlocked. Their row reads as waiting until then.</li>
  <li>If you would rather not wait, open the invite in <strong>Manage access</strong> and choose <BgStyledText>Approve</BgStyledText>. You'll need to be unlocked to do it.</li>
  <li>Folder invites can't be sent by email yet. Share a folder with a link instead.</li>
</Unordered>

To keep inboxes safe from floods, you can email the same address about the same drive once every 15 minutes.

### When you remove someone

Removal is final. The person loses access at once, and the invite link they joined with is revoked so it can't let them back in. If you remove a Manager, or change a Manager to another role, any invite links they created stop working as well.

### Folders you've shared on their own

A folder shared on its own shows a **Shared** mark in your Drive and has its own **Manage access**, which lists only the people who have that folder. The drive itself only shows as shared when you have shared the whole drive.

There is no way to change someone's role on a single folder in place. To give them different access, remove them and invite them again.

## Sharing and Your Plan

Adding people to a drive (email invites, invite links, and approving email invites) is included with the **Plus**, **Max** and **Scale** Drive plans. See [Drive plans](/use/console/billing#drive-plans).

On **Free** and **Starter**, the Share dialog shows an upgrade prompt in place of the controls that add people. Anyone who already has access keeps it, and you can still see and remove them, so moving to a smaller plan never locks you out of your own drive.

On a drive you manage for someone else, the owner's plan is the one that counts. If it doesn't include sharing, the console tells you no new invites can be made for now, and it's up to the owner to upgrade.

Joining a shared drive is free on every plan, because the owner pays for the storage.

## Starting a Shared Drive

Sharing a drive or a folder of your own for the first time isn't available in the console yet. We're opening it up soon.

If you'd like to try it now, the [Hippius desktop app on the beta channel](/use/desktop/beta-channel) can already share a drive. Beta builds are still settling, so expect rough edges. Once your drive has its first invite, you can manage it from the console as described above.

## Where to next

<Unordered>
  <li><a href="/use/console/drive">Drive</a>: your own encrypted files.</li>
  <li><a href="/use/console/shared-links">Shared Links</a>: share a single file or folder with someone who has no Hippius account.</li>
  <li><a href="/use/console/unlock-password">Unlock Password</a>: the password that protects your files and your access to shared drives.</li>
  <li><a href="/use/console/billing#drive-plans">Drive plans</a>: which plans include sharing.</li>
</Unordered>
