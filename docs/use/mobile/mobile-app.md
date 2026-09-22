---
id: mobile-app
title: Hippius Mobile App
sidebar_label: Getting Started
slug: /use/mobile/getting-started
description: Sign in to the Hippius mobile app, understand your unlock password, and reach your encrypted files from your phone.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

Your Hippius Drive, on your phone. Browse everything you have stored, upload from your camera roll, share a file or folder with a link, and let your photos back themselves up while you get on with your day.

It is the same account and the same files you see in the console and the desktop app. Anything you add on one shows up on the others.

Everything is encrypted on your phone before it leaves it, so what travels to the network and what sits on it is unreadable without your key.

## Installing the app

Hippius is on the **App Store** and on **Google Play**. Search for Hippius in your phone's store, or open [hippius.com](https://hippius.com) on your phone and use the download links there.

## Signing in

You do not need an account before you start. Signing in with Google, Github, or Apple creates one for you if you do not have one already.

If you have used Hippius before, sign in with the same details you use everywhere else and your files are there waiting.

<Ordered>
  <li>Open the app and swipe through the short introduction (two slides).</li>
  <li>Choose how you want to continue: <strong>Google</strong>, <strong>Github</strong>, <strong>Apple</strong>, or your <strong>access key</strong>.</li>
  <li>Google, Github, and Apple open a browser sheet where you approve the sign-in and come straight back to the app.</li>
  <li>Your access key is the 12-word recovery phrase from an existing Hippius account. Use this if you already have one.</li>
</Ordered>

<Screenshot src="/img/mobile/sign-in.png" alt="Choosing how to sign in to the Hippius mobile app" dark raw />

:::warning
Your access key is the key to your files, not just a password. Anyone who has it can read everything you have stored. Keep it somewhere only you can reach, and never send it to anyone, including us.
:::

## Your unlock password

An **unlock password** protects an encrypted copy of your mnemonic seed that we store for your account. It is the same password used in the console and the desktop app. It is not your Google, Apple, or Github password.

When you are asked for it depends on the situation:

<Unordered>
  <li><strong>New account, first upload.</strong> The app asks you to create an unlock password (and, for Google / Github / Apple sign-in, shows your recovery phrase to back up) before that first upload is encrypted.</li>
  <li><strong>Existing unlock password, new phone.</strong> After you sign in, the app asks you to enter the password once so it can open your seed on this device.</li>
  <li><strong>Any time from Settings.</strong> You can set, change, or restore the password under <a href="/use/mobile/settings#unlock-password">Settings → Security</a>.</li>
</Unordered>

:::warning
We cannot reset your unlock password or recover it for you. If you forget it, your mnemonic seed can restore access and set a new one. See [Restore Access](/use/mobile/settings#restore-access).
:::

## Coming back

After the first sign-in the app remembers you. Open it and you land on Overview, with no account password to type. You stay signed in until you sign out yourself.

If you turn on **Biometric lock** in Settings, the app asks for your fingerprint or face before it opens. That lock is only on this phone, separate from your unlock password.

## What you can do

<Unordered>
  <li><strong>Overview</strong> is your home screen: recent files, how much storage you are using, which plan you are on, and a Camera Uploads promo until you set that up.</li>
  <li><strong>Drive</strong> is your files. Browse, search, upload, preview, download, and organise them into folders. See <a href="/use/mobile/drive">Your Files</a>.</li>
  <li><strong>Camera Uploads</strong> backs up your photos and videos on its own. See <a href="/use/mobile/camera-uploads">Camera Uploads</a>.</li>
  <li><strong>Shared links</strong> let you send a file or folder to someone who does not have Hippius. See <a href="/use/mobile/shared-links">Sharing Files</a>.</li>
</Unordered>

## Your plan

The app shows which Drive plan you are on and how much storage it gives you (Overview plan card, and Account). **Managing subscriptions is not available in the mobile app.** Buy or change a plan from the [Hippius Console](https://console.hippius.com) in a browser, signed in with the same account.

You need an active storage entitlement to upload, create folders, or turn on Camera Uploads. Without one the app still signs you in and still shows everything you have already stored, but those actions stop with a storage-unavailable message.

Once you subscribe on the console, the app picks the plan up on its own. Nothing to enter twice.

<Screenshot src="/img/mobile/plan-card.png" alt="The plan card on the Overview screen" dark raw />

## Where to next

<Unordered>
  <li><a href="/use/mobile/drive">Your Files</a>: upload, preview, download and organise.</li>
  <li><a href="/use/mobile/camera-uploads">Camera Uploads</a>: back up your photos automatically.</li>
  <li><a href="/use/mobile/settings">Settings</a>: security, biometric lock, Wi-Fi only uploads, appearance, account.</li>
</Unordered>
