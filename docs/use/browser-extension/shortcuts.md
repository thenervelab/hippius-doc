---
id: shortcuts
title: Keyboard Shortcuts
sidebar_label: Keyboard Shortcuts
slug: /use/browser-extension/shortcuts
description: The Hippius extension's keyboard shortcuts for recording, pausing and screenshots, the Mac equivalents, and how to set or change them in Chrome and Edge.
---

import Ordered from '@site/src/components/Ordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

Once you capture often, shortcuts save you a trip to the popup. Four of them cover everything: start and stop a recording, pause it, and take two kinds of screenshot.

## The shortcuts

They're the same on every computer. On a Mac, use Option instead of Alt.

| Shortcut | On a Mac | What it does |
|---|---|---|
| <BgStyledText>Alt Shift M</BgStyledText> | <BgStyledText>Option Shift M</BgStyledText> | Start recording with your last setup; press again to stop. The first time, it opens the capture bar so you can choose what to record. |
| <BgStyledText>Alt Shift K</BgStyledText> | <BgStyledText>Option Shift K</BgStyledText> | Pause or resume the recording |
| <BgStyledText>Alt Shift S</BgStyledText> | <BgStyledText>Option Shift S</BgStyledText> | Screenshot of the visible page |
| <BgStyledText>Alt Shift D</BgStyledText> | <BgStyledText>Option Shift D</BgStyledText> | Screenshot of an area you drag out |

To check which keys each one has right now, open the keyboard button at the top of the popup.

<Screenshot src="/img/extension/popup-shortcuts.png" alt="The Keyboard shortcuts panel in the popup, listing all four shortcuts and Change shortcuts" dark raw />

:::note Used an earlier version?
Earlier versions used Alt Shift R, P and A. Chrome keeps those keys for itself on Windows and Linux, so they never reached Hippius there. When the extension updates, it moves to the keys above, unless you had set your own, which stay as they are.
:::

## When a shortcut has no keys

Your browser, not Hippius, decides which keys an extension gets. It hands them out when the extension is installed, and it skips any key that another extension already uses, so a shortcut can arrive with no keys at all. Wherever Hippius lists its shortcuts, one without keys has a <BgStyledText>Set</BgStyledText> button that takes you to the page below.

## Change a shortcut

<Ordered>
  <li>Open <BgStyledText>Change shortcuts</BgStyledText> from the keyboard panel in the popup, or type <code>chrome://extensions/shortcuts</code> into the address bar (<code>edge://extensions/shortcuts</code> in Edge).</li>
  <li>Find <strong>Hippius</strong> and click the pencil next to the shortcut.</li>
  <li>Press the keys you want. They need Ctrl or Alt (Command or Option on a Mac).</li>
</Ordered>

<Screenshot src="/img/extension/chrome-shortcuts.png" alt="The browser's Keyboard shortcuts page with Hippius's four shortcuts and their keys" dark raw />

The same page lets you add a key to **Activate the extension**, which opens the Hippius popup, and choose whether each shortcut works only in the browser or everywhere on your computer.
