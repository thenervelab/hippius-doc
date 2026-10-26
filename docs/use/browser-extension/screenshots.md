---
id: screenshots
title: Take a Screenshot with the Extension
sidebar_label: Take a Screenshot
slug: /use/browser-extension/screenshots
description: Take a screenshot of the visible page, an area you drag out, or any screen or window with the Hippius extension, with an optional timer, and get a share link for it straight away.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

A screenshot is the quickest way to show someone what you're looking at. With Hippius, taking one also saves it to your Drive and puts a link to it on your clipboard, so the next thing you do is paste.

Screenshots are unlimited on every plan, including the Free plan.

## Pick what to capture

Click <BgStyledText>Screenshot</BgStyledText> in the popup and choose one of three:

<Unordered>
  <li><strong>Visible page</strong> when everything you need is on screen. It's taken straight away.</li>
  <li><strong>Select area</strong> to show just part of the page. Drag it out and let go. <BgStyledText>Esc</BgStyledText> cancels.</li>
  <li><strong>Screen or window</strong> for anything outside the browser, other apps included. Hippius opens a tab of its own, where your browser asks which screen or window to share. Pick one, click <BgStyledText>Share</BgStyledText>, and you're back where you were with the screenshot taken.</li>
</Unordered>

<Screenshot src="/img/extension/popup-screenshot-menu.png" alt="The Screenshot menu in the popup: Visible page, Select area, and Screen or window, with their shortcuts" dark raw />

## Skip the popup with a shortcut

<BgStyledText>Alt Shift S</BgStyledText> (<BgStyledText>Option Shift S</BgStyledText> on a Mac) takes the visible page. <BgStyledText>Alt Shift D</BgStyledText> (<BgStyledText>Option Shift D</BgStyledText> on a Mac) lets you drag out an area: drag, let go, and it's taken.

If a shortcut doesn't respond, your browser may not have given it its keys. [Keyboard Shortcuts](/use/browser-extension/shortcuts) explains why and how to set them.

## Capture a menu or tooltip with a timer

Some things only appear while you hover over them, like a menu or a tooltip, and they vanish the moment you reach for a shortcut. The timer gives you time to set the page up. It lives on the capture bar.

<Ordered>
  <li>Click <BgStyledText>Record</BgStyledText> in the popup to open the capture bar.</li>
  <li>Pick one of the screenshot choices on the bar (the same three as in the popup), then set the timer under <BgStyledText>Options</BgStyledText> to 5 or 10 seconds.</li>
  <li>Start the screenshot, open the menu or hover over the tooltip, and wait. Hippius takes the picture when the countdown ends. For a screen or window, the countdown starts once you've shared it and shows on the Hippius button.</li>
</Ordered>

The bar remembers the timer for next time, and you can also change it in [Settings](/use/browser-extension/captures#settings).

## When it's taken

A small card in the corner shows Hippius encrypting and saving the screenshot, then tells you the link is copied. Paste it wherever you need it. If you want to point something out first, click <BgStyledText>Edit</BgStyledText> on the card to add arrows, text or a blur in the console's editor ([Edit a screenshot](/use/captures/edit)). [When your link is ready](/use/browser-extension/sharing#when-your-link-is-ready) has more on the card.

## Pages you can't capture

Browsers keep some pages off limits to every extension: their own pages, such as settings and the extensions page, and the extension store. If you press a shortcut on one of those, the Hippius button shows a <strong>!</strong> instead, and hovering over it tells you why. Open a regular website and try again.

## Next

Once you've got the link, [Share a Link and See Who Watched](/use/browser-extension/sharing) shows what the people you send it to will see. Ready for video? [Record Your Screen](/use/browser-extension/recording).
