---
id: privacy
title: Privacy and Permissions
sidebar_label: Privacy and Permissions
slug: /use/browser-extension/privacy
description: How the Hippius extension protects your screenshots and recordings, what is and isn't encrypted, what it sends and to where, what the console hands it when you connect, and why it asks for each browser permission.
---

import Unordered from '@site/src/components/Unordered';

A screen recorder sees a lot: your tabs, your screen, your camera. Here's what happens to all of it.

The short answer: the extension talks only to Hippius, and only to save and share your captures. It has no analytics, ads or trackers, and it never sells or hands your data to anyone else.

## How your captures are protected

Your screenshots and recordings are encrypted in your browser, with your captures drive's key, before they're stored or uploaded, so they're never kept unencrypted, on your computer or with us. The one exception is a capture you take while the extension isn't connected to your account: before your first connect, or after you restart your browser and before you connect again. There's no key to encrypt it with yet, so it waits on your computer unencrypted, and the popup and the capture card tell you so. As soon as you connect, it's encrypted on your computer, then uploaded. [Captures you take while you're not connected](/use/browser-extension/account#captures-you-take-while-youre-not-connected) has more.

The key that opens a shared capture is in its link, after the `#`. Browsers never send that part of an address to a server, so it never reaches us.

The extension doesn't watch your browsing. It reads a page only when you click the Hippius button or press a shortcut there, and only to capture it. Your camera and microphone are opened only by Hippius's own pages. The websites you record never get access to them, and the camera picture doesn't leave your computer except as part of your recording.

## What's encrypted, and what isn't

| | Encrypted so Hippius can't read it? |
|---|---|
| Your screenshots and recordings | Yes |
| Comments on your share links, and the names people comment under | Yes, with the link's key, so only people who have the link can read them |
| Reactions on your share links | No. Hippius can see which emoji were chosen, because it has to count them |
| View counts and watch time | No. Hippius has to count them |
| A capture's file name, size and type | No. The automatic names only say when a capture was taken, such as <code>Screenshot 2026-10-22 at 15.46.24.png</code> |

## What the extension sends, and where

<Unordered>
  <li>Your captures, encrypted, to your own Drive, with your account ID so they land in the right place.</li>
  <li>The sign-in token the console handed over when you connected, so we know the uploads are yours. It's kept only while the browser is open.</li>
  <li>A question about your plan, to apply the Free plan's rules: whether you're on Free or paid, never any payment details.</li>
  <li>For each new link, its starting settings for insights, comments and reactions, and a copy of the link's key sealed for your account, so Insights in the console can read the comments and you can copy the link again from Shared Links.</li>
</Unordered>

## What the extension gets when you connect

When you click Connect, the console hands the extension:

<Unordered>
  <li>Your account's name and email, so the popup can show which account is connected.</li>
  <li>A sign-in token, so it can save to your account.</li>
  <li>The key to your captures drive, so it can encrypt your captures and make their links. It opens that one drive and none of your others.</li>
  <li>A signing key, which signs each upload so your Drive can tell it really came from your account.</li>
  <li>A key for your share links. With it, the extension seals each new link's key for your account, which is what lets you see comments and viewer names on the links it makes. The same key can open files you've already shared by link from any Hippius app, so their insights can show too. It can't open anything you haven't shared.</li>
</Unordered>

Your unlock password, your 12-word recovery phrase and the master key they protect never leave the console. The connection, and everything in it, is kept only while your browser is open.

## Why it asks for each permission

When you install the extension, your browser lists what it may do, in its own words. Here's what each permission is for:

<Unordered>
  <li><strong>Your data on Hippius's sites</strong>: <code>api.hippius.com</code>, <code>arion.hippius.com</code> and <code>eu-central-1-arion.hippius.com</code>, the only sites it can reach. The first tells it your plan. The other two are the Hippius Drive server and its EU address, where your captures are saved and shared.</li>
  <li><strong>Capturing your screen</strong>, to take a screenshot or record a screen or window. You always pick it yourself, in your browser's own sharing dialog, and the extension gets only what you pick.</li>
  <li><strong>Recording a tab</strong>, when you choose This tab.</li>
  <li><strong>The tab you're on</strong>, only when you click the Hippius button or press a shortcut, to show the capture bar and take a screenshot of that page. It doesn't read other sites, and nothing runs on a page by itself.</li>
  <li><strong>Downloads</strong>, to save a copy when you click Download.</li>
  <li><strong>Storage</strong>, to remember your settings, keep a recording safe while it records and until it's saved, and hold your connection while the browser is open.</li>
</Unordered>

Your camera and microphone aren't in that list. You allow them once, for Hippius, on its own page, and choose for each recording whether to use them.

If an update ever needs a new permission, your browser turns the extension off until you approve it. [Troubleshooting](/use/browser-extension/troubleshooting#chrome-turned-hippius-off-after-an-update) explains how to turn it back on.

## Next

Still have a question? [Questions and Answers](/use/browser-extension/faq) covers the common ones, and [Troubleshooting](/use/browser-extension/troubleshooting) has fixes when something doesn't work.
