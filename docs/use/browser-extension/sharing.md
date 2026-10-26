---
id: sharing
title: Share Captures and See Who Watched
sidebar_label: Share and See Who Watched
slug: /use/browser-extension/sharing
description: How share links from the Hippius extension work, who can open them, how long they last, how to copy a link again or make a new one, and how to see who viewed and commented on a capture.
---

import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

Every capture comes with a link, so sharing is a paste away. This page explains what that link is, who can open it, and how to find out whether anyone did.

## The card after a capture

When you stop a recording or take a screenshot, a small card opens in the corner of your screen. It encrypts the capture, saves it to your captures drive, and copies its share link to your clipboard. By the time the card says the link is copied, you can paste it into a chat, an email or a ticket.

<Screenshot src="/img/extension/capture-card.png" alt="The capture card after a screenshot: Uploaded, Public link copied, with Copy link, Open and Edit" dark raw />

The card has <BgStyledText>Copy link</BgStyledText> and <BgStyledText>Open</BgStyledText>, plus <BgStyledText>Edit</BgStyledText> for a screenshot, which opens it in the console's [editor](/use/captures/edit). Its menu has Download and Discard. Once everything is saved, the card closes by itself after a few seconds; point at it to keep it open.

After a recording, the link also opens in a new tab so you can check it. In [Settings](/use/browser-extension/captures#settings) you can choose whether the link is copied, and whether it opens after recordings and after screenshots.

## What a share link is like

<Unordered>
  <li><strong>It's public.</strong> Anyone with the link can view the capture in their browser, without a Hippius account or anything to install. Treat the link like the capture itself, and send it only to people you'd show the capture to.</li>
  <li><strong>It doesn't expire.</strong> The link keeps working until you turn it off, in the console under <a href="/use/console/shared-links">Shared Links</a>. From then on, nobody can open it.</li>
  <li><strong>It carries its own key.</strong> The part after the <code>#</code> is what unlocks the capture. Browsers never send that part to a server, so Hippius never sees it. If someone gets only the part before the <code>#</code>, they can't open the capture.</li>
</Unordered>

Need a link that expires, or one with a password? Make it from the console instead. [Share links for captures](/use/captures/share-links) explains how.

## Copy a link again

Point at a capture in the popup's list and click <BgStyledText>Copy link</BgStyledText>. If this browser made the link, you get the same link again, for as long as it's on. A capture with no link gets a new one.

A link made somewhere else, such as in the console, the desktop app or another browser, can't be copied from here, because its key stays where it was made. Rather than quietly adding a second link, the popup tells you and offers two ways forward:

<Unordered>
  <li><BgStyledText>Create a new link</BgStyledText> makes a fresh link for the capture. The old one keeps working.</li>
  <li><BgStyledText>Open Shared Links</BgStyledText> takes you to the console, where you can copy the existing link.</li>
</Unordered>

Files over 300 MB are linked and downloaded from the console instead.

## See who watched

On a paid plan, every link the extension makes comes with **insights, comments and reactions** switched on. You can see how many people opened the link and how much of a recording they watched, and the people you send it to can leave comments and react right under the video or screenshot. On the Free plan, these start switched off.

To look, find the capture in the popup. A capture with a link shows its **views, reactions and comments** at the end of its row, and the views turn blue when there's something new. Open the row's menu (the three dots) and choose <BgStyledText>View insights</BgStyledText>. The console opens the link's Insights: who watched, for how long, and their comments and reactions.

<Screenshot src="/img/extension/popup-row-menu.png" alt="A capture's menu in the popup, with View in Hippius, View insights, Copy link, Download and Delete from Drive" dark raw />

View insights works for any capture with a live link, wherever the link was made. When the extension has the link's key, it hands it to the console along with the page, so the comments open without asking for your password again. On the Free plan, Insights shows what upgrading adds.

Comments are end-to-end encrypted with the link's key, so only people with the link can read them, and Hippius can't. Reactions and view counts aren't encrypted, because Hippius has to count them. To switch insights, comments or reactions on or off for a link, open it in the console. [Share links for captures](/use/captures/share-links) has more on how capture links work.

## Turn a link off

If a link reaches someone it shouldn't, turn it off in the console under [Shared Links](/use/console/shared-links). Deleting a capture from the popup also turns off the links this browser made for it (see [Delete a capture](/use/browser-extension/captures#delete-a-capture)).
