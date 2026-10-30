---
id: share-links
title: Share Links for Captures
sidebar_label: Share Links
slug: /use/captures/share-links
description: Every Hippius screenshot and recording gets a public share link that keeps working until you turn it off. Learn who can open it, how chat previews, views, comments and reactions work, how to turn a link off, and why deleting a capture does not end its link.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

The point of a capture is usually to show it to someone, so Hippius makes the link for you. As soon as a screenshot or recording is saved, its share link is created and copied to your clipboard. Paste it anywhere.

## Who can open a capture link

Anyone you send the link to can open it in a browser, with no Hippius account, and see the screenshot or play the video right on the page, with a button to download it. The link keeps working until you turn it off, and the card after a capture says so: *Anyone with the link can view. Never expires.*

The key that unlocks the file is inside the link, after the `#`, so it never reaches us (see [Privacy and encryption](/use/captures#privacy-and-encryption)). The page shows the file and nothing about you: no email address, no account details.

<Screenshot src="/img/console/captures/share-page.png" alt="A capture link opened in a browser, showing the screenshot with a Download button" dark raw />

Sharing is unlimited on every plan, including Free.

A capture link is an ordinary [share link](/use/console/shared-links), so it shows up in **Shared Links** next to the links you made by hand, and you manage it there the same way. The only difference is how it starts. A link you make yourself asks you for an expiry first, while a capture link starts out public with no expiry, so it's ready the moment you need it.

## A preview when you paste the link in a chat

Paste a screenshot's link into Slack, Discord, WhatsApp or most other chat apps and the chat shows the screenshot itself, instead of a plain grey card. A recording's link shows its first frame with a play button and how long it is.

To make that possible, Hippius uploads a small preview picture along with the link. Chat apps can't decrypt anything, so **the preview picture and the file name aren't encrypted**. Everything else, including the full-size file, stays end-to-end encrypted. If a screenshot has something private on it, blur it in the [editor](/use/captures/edit) first, or turn previews off.

Previews are on for captures unless you turn off **Show a preview in chats**, in the capture bar's <BgStyledText>Options</BgStyledText> (desktop app and console) or in desktop [Settings, Screenshots &amp; Recording](/use/desktop/settings#screenshots--recording). For other pictures and videos, the share dialog has the same switch, off to begin with. A link with a password never gets a preview, since the preview would show what the password protects.

## Views, comments and reactions

A capture link can also tell you how many people watched, and let people reply. You see how many people opened it and, on a paid plan, how far into a recording they got. Viewers can comment and react right on the link's page, beside the video or screenshot. Comments are end-to-end encrypted with the link's key, while reactions and view counts aren't.

Each link has its own Insights, Comments and Reactions switches, in the share dialog and in the link's Insights. On paid Drive plans they start on for screenshots and recordings; on the Free plan they start off. People need no account to open the link, and need to sign in to comment or react.

<Screenshot src="/img/desktop/captures/share-dialog.png" alt="The Share via link dialog in the desktop app with Show a preview in chats, Insights, Comments and Reactions switches" dark raw />

How views are counted, what the Free plan shows, emails about your links and the privacy details are all in [Insights, comments and reactions](/use/captures/insights).

## Turn a link off

When you no longer want people to open a capture, turn its link off. The button for it says **Revoke**.

<Ordered>
  <li>Open <strong>Shared Links</strong>. After a capture, <strong>Manage link</strong> on its card takes you straight to it. In the desktop app it's in the card's More menu.</li>
  <li>Open the link's menu and choose <BgStyledText>Revoke</BgStyledText>, then confirm.</li>
</Ordered>

The link stops working at once for everyone who has it, and its encrypted copy is deleted. You can turn a link off from any device, in the console or the desktop app, whichever one made it. While the desktop app's capture card is still on screen, **Revoke link** in its More menu does the same.

Turning a link off also deletes its chat preview picture from Hippius. A chat app that already showed the preview keeps its own copy, though, and we can't reach it. If the preview itself shouldn't be seen, delete the message in the chat as well.

## Deleting a capture doesn't end its link

This one surprises people, so it's worth spelling out. A share link is **its own encrypted copy** of the file, made when the link was created. Deleting the capture from your Drive removes your copy, but the link's copy stays, and the link keeps working.

The delete confirmation reminds you of this. If you want a capture gone for everyone, turn its link off in Shared Links as well as deleting the file. The order doesn't matter.

The [browser extension](/use/browser-extension/captures#delete-a-capture) is the exception: deleting a capture from its popup turns off the capture's links first, wherever they were made, and then deletes the file.

<Screenshot src="/img/console/captures/delete-dialog.png" alt="The Delete File dialog noting that share links made from the file keep working" dark raw />

The same goes for edits. If you [edit a screenshot](/use/captures/edit) and replace the original, a link made before the edit keeps showing the old picture.

## A link with an expiry or a password

Sending something sensitive, or only for this week? Make a second link with an expiry or a password.

<Ordered>
  <li>Find the capture in <strong>Captures</strong>, open its row menu and choose <BgStyledText>Share via link</BgStyledText>.</li>
  <li>Choose when the link should expire. For a password, pick <strong>Password protected</strong> in the desktop app, or turn on <strong>Require a password</strong> in the console.</li>
  <li>Send that link, and turn off the automatic one in Shared Links.</li>
</Ordered>

In the console every capture gets its link. In the desktop app you can stop links being made automatically: turn off **Copy a share link after capture** in the capture bar's <BgStyledText>Options</BgStyledText>, or in [Settings, Screenshots &amp; Recording](/use/desktop/settings#screenshots--recording). Your captures are then only saved to your drive, and you share the ones you choose, when you choose. When you want a link for one, choose <BgStyledText>Share via link</BgStyledText> from its row menu, or open its Insights and click <BgStyledText>Create link</BgStyledText> (see [A capture without a link yet](/use/captures/insights#a-capture-without-a-link-yet)).

## Storage

Like every share link, a capture link keeps its own encrypted copy of the file on Hippius. While the capture is still in your Drive, the link adds nothing to your storage. If you delete the capture and keep the link, the link's copy counts toward your storage until you turn the link off. See [Storage usage](/use/console/shared-links#storage-usage) for the details.

## Where to go next

<Unordered>
  <li><a href="/use/captures/insights">Insights, comments and reactions</a>: how many people watched, what they said, and what each link collects.</li>
  <li><a href="/use/console/shared-links">Shared Links in the console</a> and <a href="/use/desktop/shared-links">in the desktop app</a>: everything about managing links.</li>
  <li><a href="/use/captures/edit">Edit a screenshot</a> before you share it.</li>
  <li><a href="/use/captures/troubleshooting">Troubleshooting &amp; FAQ</a>, including custom domains for links.</li>
</Unordered>
