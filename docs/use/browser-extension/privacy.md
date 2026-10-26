---
id: privacy
title: Privacy and Permissions
sidebar_label: Privacy and Permissions
slug: /use/browser-extension/privacy
description: How the Hippius extension protects your screenshots and recordings, what it sends and to where, what is and isn't encrypted, and why it asks for each browser permission.
---

import Unordered from '@site/src/components/Unordered';

A screen recorder sees a lot: your tabs, your screen, your camera. It's fair to want to know what happens to all of that. This page explains what the extension keeps private, what it sends and where, and why your browser asks you to approve each permission.

## How your captures are protected

<Unordered>
  <li><strong>Encrypted in your browser.</strong> A capture is encrypted with your captures drive's key before it's stored or uploaded, so it never sits on your computer, or with Hippius, in the clear. The one exception is a capture taken before you connect an account, which waits on your computer unencrypted until you do, because there's no key to encrypt it with yet.</li>
  <li><strong>The link carries its own key.</strong> The key that opens a shared capture sits after the <code>#</code> in its link. Browsers never send that part of an address to a server, so it never reaches Hippius.</li>
  <li><strong>What the server can see.</strong> A capture's file name, size and type, never what's in it. The automatic names only say when a capture was taken, such as <code>Screenshot 2026-10-22 at 15.46.24.png</code>.</li>
  <li><strong>Your camera stays yours.</strong> The camera and microphone are opened only by Hippius's own pages. The websites you record never get access to them, and the camera picture doesn't leave your computer except as part of your recording.</li>
  <li><strong>Only what you ask for.</strong> The extension doesn't watch your browsing. It reads a page only when you click the Hippius button or press a shortcut on it, and only to capture it.</li>
</Unordered>

## What's encrypted, and what isn't

| | Encrypted so Hippius can't read it? |
|---|---|
| Your screenshots and recordings | Yes |
| Comments on your share links, and the names people comment under | Yes, with the link's key, so only people who have the link can read them |
| Reactions on your share links | No. Hippius can see which emoji were chosen, because it has to count them |
| View counts and watch time | No. They're counted anonymously, with no account or IP address attached |
| A capture's file name, size and type | No |

## What the extension sends, and where

The extension talks only to Hippius, and only to save and share your captures. It has no analytics, ads or trackers, and it never sells or hands your data to anyone else.

<Unordered>
  <li><strong>Your captures</strong>, encrypted, to your own Drive, along with your account's address so they land in the right place.</li>
  <li><strong>Your session</strong>, which the console handed over when you connected, so Hippius knows the uploads are yours. It's kept in your browser's memory and cleared when the browser closes.</li>
  <li><strong>A question about your plan</strong>, to apply the Free plan's rules: whether you're on Free or paid, never any payment details.</li>
</Unordered>

When you connect, the console gives the extension the key to your captures drive, a key for the share links it makes, and a session to upload with. Your password and your recovery phrase stay in the console, and the extension can't open your other drives or any file you haven't shared by link.

## Why it asks for each permission

When you install the extension, your browser lists what it may do. Here's what each item is for:

<Unordered>
  <li><strong>The tab you're on</strong>, only when you click the Hippius button or press a shortcut, to show the capture bar and take a screenshot of that page. It doesn't read other sites, and nothing runs on a page by itself.</li>
  <li><strong>Recording a tab and your screen</strong>, to record what you choose. A screen or window is always picked by you, in your browser's own sharing dialog, and the extension gets only what you pick.</li>
  <li><strong>Storage</strong>, to remember your settings, to keep a recording safe while it records and until it's saved, and to hold your connection while the browser is open.</li>
  <li><strong>Downloads</strong>, to save a copy when you press Download.</li>
  <li><strong>Hippius's servers</strong>: <code>api.hippius.com</code>, to read your plan, and the Drive at <code>arion.hippius.com</code> and its EU address <code>eu-central-1-arion.hippius.com</code>, where your captures are saved and shared.</li>
</Unordered>

Your camera and microphone aren't in that list. You allow them once, for Hippius, on its own page, and choose for each recording whether to use them.

If an update ever needs a new permission, your browser turns the extension off until you approve it. [Troubleshooting](/use/browser-extension/troubleshooting#chrome-turned-hippius-off-after-an-update) explains how to turn it back on.
