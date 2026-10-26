---
id: get-started
title: Install and Connect the Extension
sidebar_label: Install and Connect
slug: /use/browser-extension/get-started
description: Install the Hippius extension from the Chrome Web Store, pin it, make a free Hippius account, set your unlock password, connect the extension, and take your first capture.
---

import Ordered from '@site/src/components/Ordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

Five minutes from now you can have your first link on your clipboard. You'll install the extension, pin it where you can reach it, and connect it to a Hippius account, which is where your captures are kept. If you don't have an account yet, you'll make a free one along the way.

## Install the extension

The extension is for Chrome and Microsoft Edge on a computer, version 116 or later. Both install it from the Chrome Web Store.

<Ordered>
  <li>Open <a href="https://chromewebstore.google.com/detail/hippius/ndpfdlfaechmhnffnmkbfgddhneehgld">Hippius on the Chrome Web Store</a> and click <BgStyledText>Add to Chrome</BgStyledText>. In Edge, the store first asks whether to allow extensions from other stores. Allow it, then click the button again.</li>
  <li>Your browser lists what the extension may do. Confirm with <BgStyledText>Add extension</BgStyledText>. Wondering why it asks for each one? <a href="/use/browser-extension/privacy#why-it-asks-for-each-permission">Privacy and Permissions</a> explains.</li>
  <li>A <strong>Welcome to Hippius</strong> tab opens.</li>
</Ordered>

The welcome tab has four short steps: pin Hippius, connect your account, allow your camera and microphone, and take your first capture. Each one ticks itself off when it's done, and you can skip any of them. The sections below follow the same order. To see the welcome tab again later, click the help button at the top of the popup and choose <BgStyledText>Getting started</BgStyledText>.

<Screenshot src="/img/extension/welcome.png" alt="The Welcome to Hippius tab with its four setup steps, three of them done" dark raw />

## Pin it to your toolbar

New extensions hide behind the puzzle piece at the top right of your browser. Pin Hippius so it sits in your toolbar on every page. That button is where you'll start most captures, stop a recording and find your captures.

<Ordered>
  <li>Click the puzzle piece (<strong>Extensions</strong>) at the top right of your browser.</li>
  <li>Click the pin next to <strong>Hippius</strong>.</li>
</Ordered>

Once it's pinned, the button also tells you what's happening: it shows <strong>REC</strong> while you record and <strong>II</strong> while you're paused.

## Create a free account

Every capture is saved to your own Hippius Drive, so the extension needs an account to save to. [Your Account and Password](/use/browser-extension/account#why-you-need-a-hippius-account) explains why that's a good thing.

If you already use Hippius (the console, the desktop app or the mobile app), you already have an account. Skip to [Connect the extension](#connect-the-extension).

<Ordered>
  <li>Go to <a href="https://console.hippius.com">console.hippius.com</a>. This is the Hippius console, the website where you manage your account and your files.</li>
  <li>Choose <strong>Continue with Google</strong>, <strong>GitHub</strong> or <strong>Apple</strong>. There's no separate sign-up form: the first time you sign in, your Hippius account is made.</li>
  <li>The console asks how you'd like the dashboard laid out. Either choice is fine for the extension, and you can change it later.</li>
</Ordered>

<Screenshot src="/img/extension/console-sign-in.png" alt="The Log In to Hippius page in the console, with Continue with Google, GitHub, Apple and Access Key" dark raw phone />

Accounts made with Google, GitHub or Apple start on the Free plan, with no card needed: 10 GB of encrypted storage, unlimited screenshots and share links, and 25 recordings of up to 5 minutes, with a small Hippius watermark. [Plans and Limits](/use/browser-extension/plans) explains what paid plans add.

:::note Signing in with an access key
The console also offers <strong>Continue with Access Key</strong>, a 12-word key instead of Google, GitHub or Apple. An account made that way has no free storage, so it needs a paid plan before the extension can save anything. The [console's Getting Started guide](/use/console/getting-started#signing-in) explains each way to sign in.
:::

## Set your unlock password

Signing in with Google proves who you are. Your files are protected by something else: an unlock password that only you know, which Hippius never sees. Connecting the extension asks for it, so if your account is brand new, set it first.

<Ordered>
  <li>In the console, click your account at the top right and choose <strong>Settings</strong>.</li>
  <li>Find <strong>Unlock Password</strong> and click <BgStyledText>Set Password</BgStyledText>. If the button says <BgStyledText>Change Password</BgStyledText>, you already have one, and you can skip to the next section.</li>
  <li>The console shows you 12 words, your recovery phrase. Write them down somewhere safe and offline.</li>
  <li>Choose a password of at least 10 characters. The meter has to read <strong>Strong</strong> before you can save it.</li>
</Ordered>

:::warning Keep your 12 words safe
The 12 words are the only way back into your files if you forget your unlock password. We don't keep a copy, and nobody can reset the password for you.
:::

[Settings](/use/console/settings#unlock-password) and [Unlock Password](/use/console/unlock-password) in the console guide have more on both.

## Connect the extension

Connecting lets the extension save to your captures drive and make links for what you capture. It never gets your password or your 12 words, and it can't open the rest of your Drive. [Privacy and Permissions](/use/browser-extension/privacy#what-the-extension-gets-when-you-connect) lists exactly what it receives.

<Screenshot src="/img/extension/popup-signed-out.png" alt="The Hippius popup before connecting, with Connect account and Capture without saving" dark raw />

<Ordered>
  <li>Click the Hippius button in your toolbar, then <BgStyledText>Connect account</BgStyledText>.</li>
  <li>The console opens its <strong>Connect the Hippius extension</strong> page in a new tab. Sign in if it asks you to.</li>
  <li>Click <BgStyledText>Connect</BgStyledText>.</li>
  <li>The <strong>Connect Extension</strong> dialog asks for your password. Enter your unlock password, the one you set in Settings, not your Google, GitHub or Apple password. Then click <BgStyledText>Connect</BgStyledText>.</li>
  <li>The page says <strong>The extension is connected</strong>. You can close the tab.</li>
</Ordered>

<Screenshot src="/img/extension/console-connect-page.png" alt="The console's Connect the Hippius extension page, explaining what the extension gets, with a Connect button" dark raw phone />

<Screenshot src="/img/extension/console-connect-password.png" alt="The Connect Extension dialog asking for your unlock password, with Connect and Forgot your password?" dark raw phone />

If you've already entered your unlock password in this console tab, the dialog doesn't appear and the page connects straight away.

<Screenshot src="/img/extension/console-connected.png" alt="The console saying The extension is connected" dark raw />

The connection lasts until you close your browser, so you'll connect again after a restart. It takes a few seconds. [Staying connected](/use/browser-extension/account#staying-connected) explains why.

## Allow your camera and microphone

The welcome tab's third step asks your browser to let Hippius use your camera and microphone. You allow them once, on a Hippius page, and the websites you record never get access to them. You still choose for every recording whether to turn them on. If you only want screenshots, skip this step and allow them when you first record.

## Take your first capture

Go to any web page and press <BgStyledText>Alt Shift S</BgStyledText> (<BgStyledText>Option Shift S</BgStyledText> on a Mac). A small card appears in the corner while Hippius encrypts and saves the screenshot, and a moment later its link is on your clipboard. Paste it into a new tab: that's exactly what the people you share with will see.

Prefer clicking? Click the Hippius button, then <BgStyledText>Screenshot</BgStyledText> or <BgStyledText>Record</BgStyledText>. If a shortcut does nothing, see [A shortcut does nothing](/use/browser-extension/troubleshooting#a-shortcut-does-nothing).

## What's next

Now that the link is on your clipboard, [Take a Screenshot](/use/browser-extension/screenshots) shows the other ways to capture, and [Record Your Screen](/use/browser-extension/recording) walks you through your first video. Curious how your password and the connection work? Read [Your Account and Password](/use/browser-extension/account).
