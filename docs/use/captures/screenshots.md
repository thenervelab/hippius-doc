---
id: screenshots
title: Take a Screenshot
sidebar_label: Take a Screenshot
slug: /use/captures/screenshots
description: Take a screenshot of your entire screen, a window or an area in the Hippius desktop app or the console, with a keyboard shortcut, a timer, and a share link copied as soon as it is saved.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';

A Hippius screenshot can be your **entire screen**, **one window**, or an **area** you drag out. Whichever you pick, it is saved to your [Hippius Captures](/use/captures#where-your-captures-go) drive and its link is copied for you. Screenshots are unlimited on every plan.

## In the desktop app

### The quickest way: the shortcut

Press <BgStyledText>⌘ Shift 2</BgStyledText> on a Mac, or <BgStyledText>Ctrl Shift 2</BgStyledText> on Windows and Linux, from any app. The pointer turns into a crosshair:

<Ordered>
  <li>Drag over the part of the screen you want.</li>
  <li>Let go. That's it: the screenshot is saved and its link is copied.</li>
</Ordered>

While you drag, hold <BgStyledText>Space</BgStyledText> to move the whole area, or press <BgStyledText>Esc</BgStyledText> to cancel. You can change the shortcut, or turn it off, in [Settings, under Screenshots &amp; Recording](/use/desktop/settings#screenshots--recording).

### With the capture bar

For a window or the whole screen, or when you want a timer, use the capture bar. You can open it from three places:

<Unordered>
  <li><strong>The menu bar</strong> (the notification area on Windows): click the Hippius icon, then the <BgStyledText>Screenshot</BgStyledText> tile. The small arrow in the tile's corner lets you go straight to an area, a window or the entire screen.</li>
  <li><strong>Drive and Captures</strong>: the <BgStyledText>Screenshot</BgStyledText> button in the page header.</li>
  <li><strong>Inside any drive</strong>, including drives shared with you, from the same button.</li>
</Unordered>

The bar sits at the bottom of your screen. Pick a mode, then:

<Unordered>
  <li><strong>Entire screen</strong>: click the screen you want, or press <BgStyledText>Enter</BgStyledText>.</li>
  <li><strong>Window</strong>: the window under the pointer lights up with its name. Click it to take it. Press <BgStyledText>Space</BgStyledText> to switch to dragging an area instead.</li>
  <li><strong>Area</strong>: drag out the area, adjust it by dragging or with the arrow keys, then double-click or press <BgStyledText>Enter</BgStyledText>.</li>
</Unordered>

<BgStyledText>Options</BgStyledText> on the bar has a **Timer** (none, 5 seconds or 10 seconds) so you can open a menu or hover over something before the picture is taken, and two choices for what happens afterwards: **Copy a share link after capture** and **Open the link in your browser**. Both are on unless you turn them off, and they are also in Settings.

:::info The first time on a Mac
macOS asks you to allow Hippius to record your screen before the first capture. Hippius explains what to do and opens the right page in System Settings. Turn Hippius on there, then relaunch Hippius: macOS only applies the change after a restart.
:::

### On Linux with Wayland

On most recent Linux desktops (GNOME and KDE on Wayland), apps aren't allowed to look at the screen on their own. Hippius hands over to your desktop's own screenshot tool, where you choose what to capture, and takes it from there: the screenshot is saved to Hippius Captures and its link is copied, just as on any other computer.

The keyboard shortcut works there too. On desktops that support it, Hippius asks your desktop to set it up. On others, Settings shows a short command to add in your desktop's own keyboard settings, and the shortcut then works even when Hippius is closed.

## In the console

The console works in Chrome, Edge, Safari and Firefox on a computer. There's nothing to install.

<Ordered>
  <li>Click <BgStyledText>Screenshot</BgStyledText> at the top of the <strong>Drive</strong> page or the <strong>Captures</strong> page. The capture bar opens at the bottom of the page.</li>
  <li>Pick <strong>Entire screen</strong>, <strong>Window</strong> or <strong>Area</strong>, and a timer under <BgStyledText>Options</BgStyledText> if you want one.</li>
  <li>Press <BgStyledText>Capture</BgStyledText> (or <BgStyledText>Enter</BgStyledText>). Your browser asks what you want to share: choose the screen or the window.</li>
  <li>For an area, choose the screen it is on. A still picture of that screen fills the page: drag out the area, then double-click or press <BgStyledText>Enter</BgStyledText>.</li>
</Ordered>

The browser's sharing dialog is the browser's own, and it is the only way a website can see your screen. Hippius uses it for that one picture and stops sharing straight after.

In Chrome and Edge, a small floating window then says **Go to what you want to capture, then click Take screenshot**, so you can bring the right window to the front first. In browsers without that floating window you get a few seconds to switch before the picture is taken.

The first capture after you sign in asks for your [unlock password](/use/console/unlock-password), because the capture is encrypted with your Drive's keys before it is uploaded.

:::note Pop-ups and the new tab
Once the link is ready, the console copies it and also opens it in a new tab so you can see what others will see. If your browser blocks that tab, the card says so. Allow pop-ups for Hippius, or just use <BgStyledText>Open</BgStyledText> on the card.
:::

## When it's done

A small card shows how the upload is going and then says **Link ready**. From there you can:

<Unordered>
  <li><BgStyledText>Copy link</BgStyledText> again, if something else has taken over your clipboard.</li>
  <li><BgStyledText>Open</BgStyledText> the link to see the page the people you send it to will see.</li>
  <li><BgStyledText>Show in folder</BgStyledText> to jump to the screenshot in your Captures.</li>
  <li><strong>Manage link</strong> to open it in Shared Links. See <a href="/use/captures/share-links">Share links for captures</a>. In the desktop app it is in the card's More menu.</li>
  <li><BgStyledText>Edit</BgStyledText>, in the desktop app, to open the screenshot in the editor straight away.</li>
</Unordered>

Want to point at something or hide a password before you send it? Open the screenshot in the [editor](/use/captures/edit).

## Where to go next

<Unordered>
  <li><a href="/use/captures/recording">Record your screen</a></li>
  <li><a href="/use/captures/edit">Edit a screenshot</a></li>
  <li><a href="/use/captures/troubleshooting">Troubleshooting &amp; FAQ</a></li>
</Unordered>
