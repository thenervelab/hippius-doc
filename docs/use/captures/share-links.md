---
id: share-links
title: Share Links for Captures
sidebar_label: Share Links
slug: /use/captures/share-links
description: Every Hippius screenshot and recording gets a public share link that never expires by default. Learn who can open it, how chat previews, views, comments and reactions work, how to turn a link off, and why deleting a capture does not end its link.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

The point of a capture is usually to show it to someone, so Hippius makes the link for you. As soon as a screenshot or recording is saved, its share link is created and copied to your clipboard. Paste it anywhere.

## What a capture link is like

<Unordered>
  <li><strong>Anyone with the link can view.</strong> The people you send it to don't need a Hippius account. They open the link in a browser and see the screenshot or play the video right on the page, with a button to download it.</li>
  <li><strong>It never expires by default.</strong> The link keeps working until you turn it off. The card after a capture says so: <em>Anyone with the link can view. Never expires.</em></li>
  <li><strong>The file is end-to-end encrypted.</strong> The key that opens the capture is in the link itself, after the <code>#</code>, and never reaches Hippius. See <a href="/use/captures#privacy-and-encryption">Privacy and encryption</a>.</li>
  <li><strong>The page shows nothing about you.</strong> No email address or account address appears on it, only the file.</li>
</Unordered>

<Screenshot src="/img/console/captures/share-page.png" alt="A capture link opened in a browser, showing the screenshot with a Download button" dark raw />

Sharing is unlimited on every plan, including Free.

A capture link is an ordinary [share link](/use/console/shared-links), so it shows up in **Shared Links** next to the links you made by hand, and you manage it there the same way. The only difference is how it starts: a link you make yourself asks you for an expiry first, and a capture link starts out public with no expiry, so it's ready the moment you need it.

## A preview when you paste the link in a chat

Paste a screenshot's link into Slack, Discord, WhatsApp or most other chat apps and the chat shows the screenshot itself, instead of a plain grey card. A recording's link shows its first frame with a play button and how long it is.

To make that possible, Hippius uploads a small preview picture along with the link. Chat apps can't decrypt anything, so **the preview picture and the file name are not encrypted**. Everything else, including the full-size file, stays end-to-end encrypted. Keep that in mind for a screenshot with something private on it: edit it first, or turn the preview off.

<Unordered>
  <li><strong>For captures</strong>, previews are on unless you turn them off: in the desktop app with <strong>Show a preview in chats</strong> in the capture bar's <BgStyledText>Options</BgStyledText> or in <a href="/use/desktop/settings#screenshots--recording">Settings, under Screenshots &amp; Recording</a>, and in the console with <strong>Show a preview in chats</strong> in the capture bar's <BgStyledText>Options</BgStyledText>.</li>
  <li><strong>For other pictures and videos</strong>, the share dialog has the same switch, off to begin with.</li>
  <li><strong>A link with a password never gets a preview</strong>, since the preview would show what the password protects.</li>
</Unordered>

## Views, comments and reactions

A capture link can tell you who watched, and let people reply. **Insights** count views and, for a recording, how much each person watched and where they stopped. **Comments** and **reactions** let people answer right under the video or screenshot. Comments are end-to-end encrypted with the link's key, so only people with the link can read them; reactions and view counts are not encrypted.

Each link has its own Insights, Comments and Reactions switches, in the share dialog and in the link's Insights. On paid Drive plans they start on for screenshots and recordings.

<Screenshot src="/img/desktop/captures/share-dialog.png" alt="The Share via link dialog in the desktop app with Show a preview in chats, Insights, Comments and Reactions switches" dark raw />

How views are counted, what the Free plan shows, emails about your links and the privacy details are all in [Insights, comments and reactions](/use/captures/insights).

## Turn a link off

When you no longer want people to open a capture, turn its link off:

<Ordered>
  <li>Open <strong>Shared Links</strong>. After a capture, <strong>Manage link</strong> on its card takes you straight to it. In the desktop app it's in the card's More menu.</li>
  <li>Open the link's menu and choose <BgStyledText>Revoke</BgStyledText>, then confirm.</li>
</Ordered>

The link stops working at once for everyone who has it, and its encrypted copy is deleted. You can revoke a link from any device, in the console or the desktop app, whichever one made it. The desktop app's capture card also has <strong>Revoke link</strong> in its More menu while it's on screen.

## Deleting a capture doesn't end its link

This one surprises people, so it's worth spelling out. A share link is **its own encrypted copy** of the file, made when the link was created. Deleting the capture from your Drive removes your copy, but the link's copy stays, and the link keeps working.

The delete confirmation reminds you of this. If you want a capture gone for everyone, revoke its link in Shared Links as well as deleting the file. The order doesn't matter.

<Screenshot src="/img/console/captures/delete-dialog.png" alt="The Delete File dialog noting that share links made from the file keep working" dark raw />

The same goes for edits. If you [edit a screenshot](/use/captures/edit) and replace the original, a link made before the edit keeps showing the old picture.

## A link with an expiry or a password

If you'd rather a capture link ended on its own, or needed a password, make one the usual way:

<Ordered>
  <li>Find the capture in <strong>Captures</strong>, open its row menu and choose <BgStyledText>Share via link</BgStyledText>.</li>
  <li>Choose when the link should expire. For a password, pick <strong>Password protected</strong> in the desktop app, or turn on <strong>Require a password</strong> in the console.</li>
  <li>Send that link, and revoke the automatic one in Shared Links.</li>
</Ordered>

In the desktop app you can stop links being made automatically. Turn off **Copy a share link after capture** in the capture bar's <BgStyledText>Options</BgStyledText>, or in [Settings, under Screenshots &amp; Recording](/use/desktop/settings#screenshots--recording). Your captures are then only saved to your drive, and you share the ones you choose, when you choose. In the console every capture gets its link.

## Storage

Like every share link, a capture link keeps its own encrypted copy of the file on Hippius. While the capture is still in your Drive, the link adds nothing to your storage. If you delete the capture and keep the link, the link's copy counts toward your storage until you revoke it. See [Storage usage](/use/console/shared-links#storage-usage) for the details.

## Where to go next

<Unordered>
  <li><a href="/use/captures/insights">Insights, comments and reactions</a>: who watched, what they said, and what each link collects.</li>
  <li><a href="/use/console/shared-links">Shared Links in the console</a> and <a href="/use/desktop/shared-links">in the desktop app</a>: everything about managing links.</li>
  <li><a href="/use/captures/edit">Edit a screenshot</a> before you share it.</li>
  <li><a href="/use/captures/troubleshooting">Troubleshooting &amp; FAQ</a>, including custom domains for links.</li>
</Unordered>
