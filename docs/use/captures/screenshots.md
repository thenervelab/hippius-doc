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
import Screenshot from '@site/src/components/Screenshot';

Grab your whole screen, one window, or just the part you drag over. The screenshot is saved to your [captures drive](/use/captures#where-your-captures-go) and its link is copied for you, ready to paste. Screenshots are unlimited on every plan.

You can take them in the desktop app, in the console, or with the Hippius browser extension. Not sure which? See [Pick your app](/use/captures#where-you-can-use-it).

## In the desktop app

### The quickest way: the shortcut

Press <BgStyledText>Command Shift 2</BgStyledText> on a Mac, or <BgStyledText>Ctrl Shift 2</BgStyledText> on Windows and Linux, from any app. The pointer turns into a crosshair.

<Ordered>
  <li>Drag over the part of the screen you want.</li>
  <li>Let go, and that's it. The screenshot is saved and its link is on your clipboard.</li>
</Ordered>

While you drag, hold <BgStyledText>Space</BgStyledText> to move the whole area, or press <BgStyledText>Esc</BgStyledText> to cancel. You can change the shortcut, or turn it off, in [Settings, Screenshots &amp; Recording](/use/desktop/settings#screenshots--recording).

### With the capture bar

For a window or the whole screen, or when you want a timer, use the capture bar. Open it from the Hippius icon in your menu bar (the system tray on Windows and Linux) with the <BgStyledText>Screenshot</BgStyledText> tile, or with the <BgStyledText>Screenshot</BgStyledText> button at the top of Drive, of Captures, or of any drive you open, shared ones too. The small arrow on the tile, and the button's menu, go straight to an area, a window or the entire screen if you already know what you want.

The bar sits at the bottom of the screen your pointer is on. Pick a mode, then:

<Unordered>
  <li><strong>Entire screen</strong>: click the screen you want, or press <BgStyledText>Enter</BgStyledText>.</li>
  <li><strong>Window</strong>: the window under the pointer lights up with its name. Click it to take it. Press <BgStyledText>Space</BgStyledText> to switch to dragging an area instead.</li>
  <li><strong>Area</strong>: drag out the area, adjust it by dragging or with the arrow keys, then double-click or press <BgStyledText>Enter</BgStyledText>.</li>
</Unordered>

Under <BgStyledText>Options</BgStyledText> you can set a timer of 5 or 10 seconds, handy when you need to open a menu or hover over something first. You can also choose what happens after the shot. By default the link is copied, opened in your browser so you can check it, and given a [preview picture for chats](/use/captures/share-links#a-preview-when-you-paste-the-link-in-a-chat). Each of these is a switch you can turn off here or in [Settings](/use/desktop/settings#screenshots--recording).

:::info The first time on a Mac
macOS asks you to allow Hippius to record your screen before the first capture. Hippius explains what to do and opens the right page in System Settings. Turn Hippius on there, then relaunch Hippius: macOS only applies the change after a restart.
:::

### On Linux with Wayland

On most recent Linux desktops (GNOME and KDE on Wayland), apps aren't allowed to look at the screen on their own. Not sure which you have? If you're on a recent Ubuntu or Fedora, you're probably on Wayland. Hippius hands over to your desktop's own screenshot tool, where you choose an area, a window or a whole screen, and takes it from there. The screenshot is saved to your captures drive and its link is copied, just as on any other computer.

The keyboard shortcut works there too. Settings shows a short command to add as a custom shortcut in your desktop's own keyboard settings, and the shortcut then works even when Hippius is closed: Hippius starts and takes the screenshot as soon as you're signed in.

:::tip On the beta channel
On the [beta channel](/use/desktop/beta-channel), Hippius can ask desktops that support it to set up the screenshot shortcut for you.
:::

## In the console

The console works in Chrome, Edge, Safari and Firefox on a computer. There's nothing to install.

<Ordered>
  <li>Click <BgStyledText>Screenshot</BgStyledText> at the top of the <strong>Drive</strong> page or the <strong>Captures</strong> page, next to Record. The capture bar opens at the bottom of the page.</li>
  <li>Pick <strong>Entire screen</strong>, <strong>Window</strong> or <strong>Area</strong>, and a timer under <BgStyledText>Options</BgStyledText> if you want one.</li>
  <li>Click <BgStyledText>Capture</BgStyledText> (or press <BgStyledText>Enter</BgStyledText>). Your browser asks what you want to share. Choose the screen or the window.</li>
  <li>For an area, choose the screen it's on. A still picture of that screen fills the page. Drag out the area, then double-click or press <BgStyledText>Enter</BgStyledText>.</li>
</Ordered>

<Screenshot src="/img/console/captures/capture-bar.png" alt="The console's capture bar with Record and Capture modes, camera and microphone switches, and the free plan note" dark raw />

The browser's sharing dialog is the browser's own, and it is the only way a website can see your screen. Hippius uses it for that one picture and stops sharing straight after.

In Chrome and Edge, a small floating window then says **Go to what you want to capture, then click Take screenshot**, so you can bring the right window to the front first. In browsers without that floating window you get a few seconds to switch before the picture is taken.

The first capture after you sign in asks for your [unlock password](/use/console/unlock-password), because the capture is encrypted with your Drive's keys before it is uploaded.

:::note Pop-ups and the new tab
Once the link is ready, the console copies it and also opens it in a new tab so you can see what others will see. If your browser blocks that tab, the card says so. Allow pop-ups for Hippius, or just use <BgStyledText>Open</BgStyledText> on the card.
:::

## When it's done

A small card in the corner shows how the upload is going, then says the link is ready and copied, and who can open it. From the card you can copy the link again if something else has taken over your clipboard, jump to the screenshot in your Captures, or see what the people you send it to will see (<BgStyledText>Open</BgStyledText> in the console). Want to point at something or hide a password first? Open it in the [editor](/use/captures/edit). In the desktop app, just click the picture on the card.

The less common actions, like managing the link, its [Insights](/use/captures/insights) or turning it off, are under the card's **More** menu in the desktop app, next to Show in Finder (Show in Explorer on Windows). In the console, **View insights** is right on the card. See [Share links for captures](/use/captures/share-links) for everything you can do with the link.

<Screenshot src="/img/desktop/captures/capture-card.png" alt="The desktop app's card after a recording, saying Public link copied and Never expires, with its More menu open on Show in Finder, Manage link, Insights and Revoke link" raw />

The card slides away on its own once the upload and link are done. Hover over it to keep it open.

## Where to go next

<Unordered>
  <li><a href="/use/captures/recording">Record your screen</a></li>
  <li><a href="/use/captures/edit">Edit a screenshot</a></li>
  <li><a href="/use/browser-extension/screenshots">Take screenshots with the browser extension</a></li>
  <li><a href="/use/captures/troubleshooting">Troubleshooting &amp; FAQ</a></li>
</Unordered>
