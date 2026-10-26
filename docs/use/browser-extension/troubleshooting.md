---
id: troubleshooting
title: Troubleshooting the Extension
sidebar_label: Troubleshooting
slug: /use/browser-extension/troubleshooting
description: Fixes for common problems with the Hippius extension for Chrome and Edge, from a turned-off extension and silent shortcuts to camera permissions, macOS screen recording, ended sessions and accounts with no plan.
---

import BgStyledText from '@site/src/components/BgStyledText';

Most problems come down to a permission your browser or computer hasn't given yet, or a connection that has ended. Find what you're seeing below.

## The extension and its button

### Chrome turned Hippius off after an update

When an update needs a new permission, your browser keeps the extension off until you approve it. Open the puzzle piece menu or <code>chrome://extensions</code> (<code>edge://extensions</code> in Edge), find Hippius, and accept the new permission to turn it back on. For example, switching on insights, comments and reactions for your links needed one more Hippius Drive address, <code>eu-central-1-arion.hippius.com</code>.

### The Hippius button shows a "!"

A shortcut couldn't run. Point at the button to see why, or open the popup, which says it too. The usual reasons are a page no extension may capture (your browser's own pages and the extension store), or the Free plan's 25 recordings being used up.

### I can't find the Hippius button

It's probably not pinned. Click the puzzle piece at the top right of your browser and click the pin next to Hippius. See [Pin it to your toolbar](/use/browser-extension/get-started#pin-it-to-your-toolbar).

### A shortcut does nothing

It may have no keys, or another extension may use them. Open the keyboard panel in the popup and use <BgStyledText>Set</BgStyledText>, or see [Change a shortcut](/use/browser-extension/shortcuts#change-a-shortcut).

## Recording and the camera

### The camera or microphone shows Allow again

Your browser no longer lets Hippius use them, for example because they were allowed only once, or taken back in the browser's settings. Click <BgStyledText>Allow</BgStyledText> and allow them for Hippius again.

### The sharing dialog lists no screens or windows (Mac)

macOS needs to allow your browser to record the screen. Open **System Settings**, then **Privacy & Security**, then **Screen & System Audio Recording** (**Screen Recording** on older versions of macOS), turn your browser on, and restart it.

### My camera disappeared from a tab recording

A tab recording films the camera bubble drawn in that tab. If the tab goes to another website, your browser stops Hippius from drawing there until you click Hippius on the new page. On that tab, open the popup and use <BgStyledText>Put my camera back</BgStyledText>.

### Record says it couldn't count your recordings

On the Free plan, Hippius checks how many recordings you have before starting. When it can't (you're offline, or the Drive didn't answer), it doesn't start, so it never records something it can't save. Check your connection and press <BgStyledText>Retry</BgStyledText>.

## Your account and saving

### Your session ended

The connection to your account lasts until you close the browser, disconnect, or sign out of the console. The popup says so and offers <BgStyledText>Connect again</BgStyledText>, which takes a few seconds. To switch to another Hippius account instead, choose <BgStyledText>Use a different account</BgStyledText>. Anything you captured in the meantime saves once you're connected.

### The console keeps asking for my password when I connect

The console needs your unlock password to hand the extension the key to your captures drive (see [Why the console asks for your password](/use/browser-extension/get-started#why-the-console-asks-for-your-password)). It's the same password that opens your files in the console, not the password of your Google, GitHub or Apple account. If you've forgotten it, see [If you forget your password](/use/console/unlock-password#if-you-forget-your-password).

### A capture says Not saved yet

It couldn't be uploaded straight away, for example because you were offline or your Drive is full. It's safe in your browser, and the popup says what to do. See [Not saved yet](/use/browser-extension/captures#not-saved-yet).

### The popup says No plan

Your account signs in with an access key and has no Drive plan, so there's nowhere to save captures. Choose a plan with <BgStyledText>See plans</BgStyledText>; anything kept in the meantime saves with Retry. See [No plan](/use/browser-extension/plans#no-plan).

## Something else

Open the help button at the top of the popup and choose <BgStyledText>Copy diagnostics</BgStyledText>. It copies a short report of what Hippius did recently, with no account details, links or keys, which you can paste when you [contact support](/use/help-support).
