---
id: shared-links
title: Sharing Files
sidebar_label: Sharing Files
slug: /use/mobile/shared-links
description: Create a public or password-protected link to a Hippius file or folder, choose how long it lasts or the day it ends, set its rules, see who opened it, get notified of new views, and revoke it when you are done.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

A shared link lets you send a **file or a folder** to someone who does not have a Hippius account. They open the link in a browser and download what you shared. Nothing else in your Drive is reachable from it.

<Unordered>
  <li><strong>A file link</strong> shares that one file. The app makes a separately encrypted copy of it for the link, so your own copy and your key are never exposed.</li>
  <li><strong>A folder link</strong> shows a live listing of that folder. Anyone with it can browse and download everything in the folder, and it always shows what is in there now, including files you add later, until the link expires or you revoke it.</li>
</Unordered>

## Sharing a file or folder

<Ordered>
  <li>Press and hold the item and choose <strong>Share via Link</strong>. When a file is open full screen, you can also tap the <strong>share</strong> button at the bottom.</li>
  <li>Under <strong>Secure link</strong>, choose when it <strong>Expires</strong>: <strong>24 hours</strong>, <strong>7 days</strong> (the default), <strong>30 days</strong>, or <strong>Never</strong>. A link that never expires stays reachable until you revoke it. For a file, <strong>Pick a date</strong> opens a calendar instead: the link then works until the end of the day you pick, on your phone's clock, from later today up to a year ahead. You can change any of this later.</li>
  <li>Optionally turn on <strong>Require a password</strong>. The app fills in a strong password for you, which you can change. It needs at least 8 characters. Tap <strong>Copy password</strong> and keep it somewhere, because it is not stored anywhere and can't be shown again once the sheet closes.</li>
  <li>Tap <BgStyledText>Create link</BgStyledText>. For a file, the app shows its progress while it encrypts and uploads the copy, which can take a moment for a large file. A folder link is ready straight away.</li>
  <li>Tap <BgStyledText>Copy link</BgStyledText>, or <BgStyledText>Share</BgStyledText> to send it straight from your phone's share sheet.</li>
</Ordered>

<Screenshot src="/img/mobile/share-link.png" alt="Share link options: expiry and optional password" dark raw phone />

The finished sheet reminds you who can open the link and when it expires. If you set a password, it is shown once more under **Password, shown once**. Send it to the recipient separately from the link, for example in a different app.

:::warning
Anyone with the link (and the password, if you set one) can open what you shared. Treat the link like the file itself and only send it to people you mean to.
:::

Items you have shared from this phone show a small **link** badge. Tap the badge, or choose **Share via Link** again, to get back to the same link and copy it again, instead of making a new one.

To get an email when someone first opens one of your links, turn on **First views** in [Settings, Link emails](/use/mobile/settings#link-emails).

## Managing your links {#seeing-and-revoking-your-links}

Open **Shared Links** with the **link** icon next to **All** on the Drive screen, from the **…** menu inside any folder, or by tapping an item's link badge. It lists your file and folder links that are still active, wherever you made them: on this phone, in the console or in the desktop app. Tap the **copy** button on a row to copy that link again. If it reads **Link not on this device**, this phone can't rebuild that link, so copy it where you made it.

Tap a link to open its details. From there you can:

<Unordered>
  <li><strong>Copy or share it</strong> with <BgStyledText>Copy link</BgStyledText> or <BgStyledText>Share</BgStyledText>.</li>
  <li><strong>Change its rules</strong>, such as when it ends or whether people can download it. See <a href="#link-rules">Set what people can do</a> below.</li>
  <li><strong>See who opened it</strong> with <BgStyledText>View insights</BgStyledText>. See <a href="#insights">Insights</a> below.</li>
  <li><strong>Remove its chat preview</strong>, if it has one. The link keeps working.</li>
  <li><strong>Revoke it</strong> with <BgStyledText>Revoke link</BgStyledText>. Anyone holding it can't open it from then on. This can't be undone, and your file in Drive is untouched.</li>
</Unordered>

An older folder link that carries its drive's key says so in its details, with <BgStyledText>Replace link</BgStyledText> to swap it for a safer one.

Links that have expired or been revoked move to **History** at the bottom of the screen. **Clear all** empties it. That only clears the list on this phone.

<Screenshot src="/img/mobile/shared-links.png" alt="The Shared Links screen" dark raw phone />

## Set what people can do {#link-rules}

Sending something sensitive? A file link can do more than hand over the file. Its rules are listed in the link's details, and in its Insights under **Link settings**. Each one says whether it's on and what it does. Tap one to change it. Changes apply straight away and the link stays the same, so there's nothing to send again.

To change when the link ends, open **Expiry** and choose **24 hours**, **7 days**, **30 days** or **Never**, counted from now. A file link can also **Pick a date**. Folder links have the four choices.

To make a file view only, open **Download** and turn off **Allow download**. People can still open the file in their browser, but can't download it. This discourages copying but can't prevent it.

**Watermark** puts each viewer's email and the date on every page of a shared PDF. It has its own switch, so a PDF can carry it and still be downloadable. Until you change it, it follows downloads: on while downloads are off.

To ask people to agree to your terms first, turn on **NDA**, write or paste your text and tap <BgStyledText>Save</BgStyledText>. Anyone who opens the link then reads it and agrees before the file opens. The NDA templates and the NDAs you've saved to your account are in the console for now.

**Password** shows that the link has one. A password is set when the link is made and can't be changed later.

View only, the watermark and the NDA need a paid Drive plan. On the Free plan, a link's details show its expiry and password, and any of these rules the link already has. You can still remove an NDA. The [console's Shared Links page](/use/console/shared-links) explains each rule in full, including what your viewers see.

## Insights {#insights}

On a paid plan, you can see what happened to a link: how many times it was opened and by how many people, what they said in comments and how they reacted, and for a video, where people stopped watching. Open it with <BgStyledText>View insights</BgStyledText> in the link's details, or from a file's press-and-hold menu.

The **Viewers** tab shows how much each person saw, such as *9 of 12 pages*, and how many visits they made. A viewer who saw at least 80% of the pages (or of the video), or came back for a second visit, is marked **Engaged**. Tap a viewer to see their visits, their total time and their own time on each page. For a document, **Time per page** has a bar for each page showing how long people spent there. Tap a bar to see its page and time.

On a link with an NDA, the **NDA** tab shows your text and everyone who accepted it, with the name they typed where they gave one. <BgStyledText>Export</BgStyledText> shares a CSV of every acceptance, and <BgStyledText>Record</BgStyledText> shares one acceptance as a text file with the full text and its SHA-256 fingerprint. Both are made on your phone and sent through your share sheet.

For a folder link, the **Files** tab shows which files in the folder were opened, and **People** shows who opened what.

The **Link settings** button at the top has the link's rules and its **Insights**, **Comments** and **Reactions** switches. How views are counted, who can comment and the privacy details are in [Insights, comments and reactions](/use/captures/insights).

### Get notified about new views {#link-activity}

On a paid plan, your phone tells you when your links get new views, for example *Deck.pdf, 3 new views*. It's one notification each time a link has news, never one per view. Tap it to see it in the app's notifications, where <BgStyledText>Open Shared Links</BgStyledText> takes you to your links. When you first turn it on, the app only notes where your counts stand, so you're not told about views you've already had.

It's on unless you turn it off: see [Link activity](/use/mobile/settings#link-activity) in Settings.

## Where to next

<Unordered>
  <li><a href="/use/mobile/drive">Your Files</a>: browse, upload and organise.</li>
  <li><a href="/use/console/shared-links#what-recipients-see">What recipients see</a> (console guide): what opening a link looks like on the other end.</li>
</Unordered>
