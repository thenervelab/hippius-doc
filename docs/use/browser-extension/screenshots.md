---
id: screenshots
title: Take Screenshots with the Extension
sidebar_label: Take Screenshots
slug: /use/browser-extension/screenshots
description: Take a screenshot of the visible page, an area you drag out, or any screen or window with the Hippius extension, with an optional timer, and get a share link for it straight away.
---

import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

A screenshot is the quickest way to show someone what you're looking at. With Hippius, taking one also saves it to your Drive and puts a link to it on your clipboard, so the next thing you do is paste.

Screenshots are unlimited on every plan, including the Free plan.

## Pick what to capture

Click <BgStyledText>Screenshot</BgStyledText> in the popup and choose:

<Unordered>
  <li><strong>Visible page</strong>: everything you can see in the tab, taken straight away.</li>
  <li><strong>Select area</strong>: drag out the part of the page you want, and let go to take it. <BgStyledText>Esc</BgStyledText> cancels.</li>
  <li><strong>Screen or window</strong>: anything on your computer, other apps included. Hippius opens a tab of its own with your browser's sharing dialog; pick the screen or window and click <BgStyledText>Share</BgStyledText>, and you're back on your tab with the screenshot taken.</li>
</Unordered>

<Screenshot src="/img/extension/popup-screenshot-menu.png" alt="The Screenshot menu in the popup: Visible page, Select area, and Screen or window, with their shortcuts" dark raw />

## The fastest way: shortcuts

Two keyboard shortcuts skip the popup altogether:

<Unordered>
  <li><BgStyledText>Alt Shift S</BgStyledText> (<BgStyledText>Option Shift S</BgStyledText> on a Mac) takes the visible page.</li>
  <li><BgStyledText>Alt Shift D</BgStyledText> (<BgStyledText>Option Shift D</BgStyledText> on a Mac) lets you drag out an area. Drag, let go, and it's taken.</li>
</Unordered>

If a shortcut doesn't respond, your browser may not have given it its keys. [Keyboard Shortcuts](/use/browser-extension/shortcuts) explains why and how to set them.

## Use a timer

Sometimes what you want to capture only appears while you hover over it, like a menu or a tooltip. The capture bar has a **timer** for that. Open the bar with <BgStyledText>Record</BgStyledText> in the popup, pick one of the screenshot choices on it (the same three as in the popup), and set the timer under <BgStyledText>Options</BgStyledText> to 5 or 10 seconds. Start the screenshot, get the page the way you want it, and Hippius takes the picture when the time runs out. For a screen or window, the countdown starts once you've shared it and shows on the Hippius button.

## What happens next

A small card opens in the corner of your screen. It encrypts the screenshot, saves it to your captures drive, and copies its share link. Paste the link wherever you need it. The card also has <BgStyledText>Edit</BgStyledText>, which opens the screenshot in the console's editor so you can add arrows, text or a blur before you send it (see [Edit a screenshot](/use/captures/edit)).

[Share and See Who Watched](/use/browser-extension/sharing) covers the card and the link in full.

## Pages you can't capture

Browsers keep some pages off limits to every extension: their own pages (such as settings and the extensions page) and the extension store. If you press a shortcut on one of those, the Hippius button shows a <strong>!</strong> to say it couldn't run there.
