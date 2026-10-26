---
id: sharing
title: Share a Link and See Who Watched
sidebar_label: Share a Link and See Who Watched
slug: /use/browser-extension/sharing
description: How share links from the Hippius extension work, who can open them and for how long, how to copy a link again or make a new one, how to see who viewed and commented on a capture, and how to turn a link off.
---

import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

Every capture comes with a link, so sharing is a paste away. The person on the other end opens it in their browser and sees your screenshot or plays your recording, with no account and nothing to install.

## When your link is ready

When you take a screenshot or stop a recording, a small card opens in the corner of your screen. It shows Hippius encrypting the capture and saving it to your captures drive, and then it tells you the link is on your clipboard. The card calls it a public link, because anyone who has it can open the capture. Paste it into a chat, an email or a ticket.

<Screenshot src="/img/extension/capture-card.png" alt="The capture card after a screenshot: Uploaded, Public link copied, with Copy link, Open and Edit" dark raw />

The card also lets you open the capture, copy the link again, or, for a screenshot, edit it in the console's [editor](/use/captures/edit) before you send it. Download and Discard are in its menu. Once everything is saved, it closes by itself after a few seconds; hover over it to keep it open.

After a recording, the link also opens in a new tab so you can check it. In [Settings](/use/browser-extension/captures#settings) you can choose whether the link is copied, and whether it opens after recordings and after screenshots.

## Who can open a link, and for how long

<Unordered>
  <li><strong>Treat the link like the capture itself.</strong> Anyone with the link can view the capture in their browser, without a Hippius account or anything to install. Send it only to people you'd show the capture to.</li>
  <li><strong>It keeps working until you turn it off.</strong> From then on, nobody can open it. <a href="#turn-a-link-off">Turn a link off</a> shows how.</li>
  <li><strong>It carries its own key.</strong> The part after the <code>#</code> is what unlocks the capture, and it never reaches us. Someone with only the part before the <code>#</code> can't open the capture. <a href="/use/browser-extension/privacy#how-your-captures-are-protected">How your captures are protected</a> explains why.</li>
</Unordered>

Sending something sensitive, or only for this week? Make a second link with an expiry or a password in the console. [Share links for captures](/use/captures/share-links) explains how.

## Copy a link again

Hover over a capture in the popup's list and click <BgStyledText>Copy link</BgStyledText>. If this browser made the link, you get the same link again, for as long as it's on. A capture with no link gets a new one.

A link made somewhere else, such as in the console, the desktop app or another browser, can't be copied from here, because its key stays where it was made. The popup tells you, so you never end up with a second link by accident, and offers two choices:

<Unordered>
  <li><BgStyledText>Create a new link</BgStyledText> makes a fresh link for the capture. The old one keeps working.</li>
  <li><BgStyledText>Open Shared Links</BgStyledText> takes you to the console, where you can copy the existing link.</li>
</Unordered>

For a file over 300 MB, copy or make its link in the console instead.

## See who watched

On a paid plan, every link the extension makes comes with insights, comments and reactions switched on. You can see how many people opened the link and how much of a recording they watched, and the people you send it to can comment and react right under the video or screenshot.

To look, find the capture in the popup. A capture with a link shows its views, reactions and comments at the end of its row, and the views turn blue when there's something new. Choose <BgStyledText>View insights</BgStyledText> from the row's three-dot menu to see who watched, for how long, and what they said. It works for any capture with a live link, wherever the link was made, and the comments usually open straight away, without asking for your password.

<Screenshot src="/img/extension/popup-row-menu.png" alt="A capture's menu in the popup, with View in Hippius, View insights, Copy link, Download and Delete from Drive" dark raw />

Comments are encrypted with the link's key, so only people with the link can read them. We can't. Reactions and view counts aren't encrypted, because Hippius has to count them. On a paid plan, you can switch insights, comments or reactions off, or back on, for any link in the console.

Insights, comments and reactions are part of the paid plans, so links you make on the Free plan start with them off. Opening Insights on the Free plan shows what upgrading adds. [Plans and Limits](/use/browser-extension/plans) compares the plans.

## Turn a link off

If a link reaches someone it shouldn't, turn it off in the console under [Shared Links](/use/console/shared-links) (the button says Revoke). Deleting a capture from the popup also turns off the links this browser made for it (see [Delete a capture](/use/browser-extension/captures#delete-a-capture)).

## Next

All your links live alongside your captures. [Find and Manage Captures](/use/browser-extension/captures) shows how to find one again, download it, or delete it.
