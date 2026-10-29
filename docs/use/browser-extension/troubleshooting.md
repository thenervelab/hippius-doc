---
id: troubleshooting
title: Troubleshooting the Extension
sidebar_label: Troubleshooting
slug: /use/browser-extension/troubleshooting
description: Fixes for common problems with the Hippius extension for Chrome and Edge, from a turned-off extension and silent shortcuts to connecting after a browser restart, the unlock password, a camera missing from a recording, and accounts with no plan.
---

import BgStyledText from '@site/src/components/BgStyledText';

Most problems come down to a permission your browser or computer hasn't given yet, or a connection that has ended. Find what you're seeing below. Nothing you've captured is lost while you sort it out.

## The extension and its button

### Chrome turned Hippius off after an update

When an update needs a new permission, your browser keeps the extension off until you approve it. Open the puzzle piece menu or <code>chrome://extensions</code> (<code>edge://extensions</code> in Edge), find Hippius, and accept the new permission to turn it back on. The last update that did this added insights and comments to your links.

### The Hippius button shows a "!"

A shortcut couldn't run. Hover over the button to see why, or open the popup, which says it too. The usual reasons are a page no extension may capture (your browser's own pages and the extension store), the Free plan's 25 recordings being used up, an account with no plan, or Hippius not being able to count your recordings.

### I can't find the Hippius button

It's probably not pinned. Click the puzzle piece at the top right of your browser and click the pin next to Hippius. See [Pin it to your toolbar](/use/browser-extension/get-started#pin-it-to-your-toolbar).

### A shortcut does nothing

It may have no keys, or another extension may use them. Open Settings in the popup and use <BgStyledText>Set</BgStyledText> under Keyboard shortcuts, or see [Change a shortcut](/use/browser-extension/shortcuts#change-a-shortcut).

## Connecting and your password

### Hippius asks me to connect again

You probably restarted your browser. The connection to your account is kept only while the browser is open, so after a restart the popup shows **Connect your Hippius account** again, as on your first day. Click <BgStyledText>Connect account</BgStyledText>, then <BgStyledText>Connect</BgStyledText> on the console page, and enter your unlock password if the console asks.

If the browser was open the whole time, the connection ended for another reason: you disconnected, signed out of the console, or your sign-in ran out. The popup says your session ended and offers to connect again. To switch to another Hippius account instead, choose <BgStyledText>Use a different account</BgStyledText>.

Anything you captured in the meantime saves once you're connected. Captures taken while you weren't connected wait on your computer unencrypted until then ([why](/use/browser-extension/account#captures-you-take-while-youre-not-connected)).

### The console asks for a password I never made

Your account doesn't have an unlock password yet. That's normal for a brand-new account, but the Connect dialog asks for one anyway. Close the dialog and set one first: click your account at the top right of the console, choose **Settings**, and click <BgStyledText>Set Password</BgStyledText> next to Unlock Password. Write down the 12 words it shows you, choose a password, then go back to the Connect page and click <BgStyledText>Connect</BgStyledText>. [Set your unlock password](/use/browser-extension/get-started#set-your-unlock-password) has the steps.

### The console keeps asking for my password when I connect

The console needs your unlock password to hand the extension the key to your captures drive ([why](/use/browser-extension/account#why-the-console-asks-for-your-password)). It's the same password that opens your files in the console, not the password of your Google, GitHub or Apple account. If you've forgotten it, see [If you forget your password](/use/console/unlock-password#if-you-forget-your-password).

### Connect says the extension didn't answer

The console couldn't reach the extension in this browser. Check that Hippius is installed and turned on at <code>chrome://extensions</code> (<code>edge://extensions</code> in Edge), and that you opened the Connect page from the extension's own <BgStyledText>Connect account</BgStyledText> button in the same browser. Then try again.

### Connect says the extension is connected to a different account

The extension is already connected to another Hippius account. Open the popup, disconnect with the button next to the account at the bottom, then click <BgStyledText>Connect account</BgStyledText> again while you're signed in to the account you want.

## Recording and the camera

### My camera isn't in my recording

Check that you're on version 0.3.0 or later: before it, a window or tab shared with **Screen** left your camera out. Now your camera is in every recording while it's on: drawn in the corner of a window or tab, over the floating window for an entire screen, and wherever you placed it in an area. If it's still missing, make sure you didn't hide it with the camera button in the controls. [Your camera with Screen](/use/browser-extension/recording#your-camera-with-screen) explains.

### My camera disappeared from a tab recording

In a tab recording, your camera bubble is drawn inside the tab. If the tab moves to another website, your browser won't let Hippius draw there until you click the Hippius button on the new page. On that tab, open the popup and click <BgStyledText>Put my camera back</BgStyledText>.

### The camera or microphone shows Allow again

Your browser no longer lets Hippius use them, for example because they were allowed only once, or taken back in the browser's settings. Click <BgStyledText>Allow</BgStyledText> and allow them for Hippius again.

### The sharing dialog lists no screens or windows (Mac)

macOS needs to allow your browser to record the screen, and Hippius tells you when it doesn't. Open **System Settings**, then **Privacy & Security**, then **Screen & System Audio Recording** (**Screen Recording** on older versions of macOS), turn your browser on, and restart it.

### Record says it couldn't count your recordings

On the Free plan, Hippius checks how many recordings you have before starting. When it can't (you're offline, or Hippius couldn't be reached), it doesn't start, so it never records something it can't save. Check your connection and click <BgStyledText>Retry</BgStyledText>.

## Saving

### A capture says Not saved yet

It couldn't be uploaded straight away, for example because you were offline, you weren't connected, or your Drive is full. It waits in your browser. Click <BgStyledText>Retry</BgStyledText> (or <BgStyledText>Save</BgStyledText>) on its row to open its card, which offers the next step. See [If a capture isn't saved yet](/use/browser-extension/captures#if-a-capture-isnt-saved-yet).

### The popup says No storage plan yet

Your account has no free storage, which is usual for accounts that sign in with an access key, so there's nowhere to save captures. Click <BgStyledText>Choose a plan</BgStyledText> to pick one. See [No plan](/use/browser-extension/plans#no-plan).

## Something else

Click the help button at the top of the popup and choose <BgStyledText>Copy diagnostics</BgStyledText>. It copies a short report of what Hippius did recently, with no account details, links or keys, which you can paste when you [contact support](/use/help-support). [Questions and Answers](/use/browser-extension/faq) may also have your answer.
