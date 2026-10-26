---
id: get-started
title: Get Started with the Extension
sidebar_label: Get Started
slug: /use/browser-extension/get-started
description: Install the Hippius extension from the Chrome Web Store, pin it to your toolbar, create a free Hippius account, and connect the extension so your captures are saved and shared.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

Getting set up takes about five minutes: install the extension, pin it where you can reach it, and connect it to a Hippius account. If you don't have an account yet, you'll make a free one along the way.

## Install the extension

The extension is for **Chrome** and **Microsoft Edge** on a computer, version 116 or later. Both install it from the Chrome Web Store.

<Ordered>
  <li>Open <a href="https://chromewebstore.google.com/detail/hippius/ndpfdlfaechmhnffnmkbfgddhneehgld">Hippius on the Chrome Web Store</a> and click <BgStyledText>Add to Chrome</BgStyledText>. In Edge, allow extensions from other stores first when Edge asks.</li>
  <li>Your browser lists what the extension may do. Confirm with <BgStyledText>Add extension</BgStyledText>. (Wondering why it asks for each one? See <a href="/use/browser-extension/privacy#why-it-asks-for-each-permission">Privacy and Permissions</a>.)</li>
  <li>A <strong>Welcome to Hippius</strong> tab opens.</li>
</Ordered>

The welcome tab has four short steps: pin Hippius, connect your account, allow your camera and microphone, and take your first capture. Each one ticks itself off as soon as it's done, and you can skip any of them. The rest of this page explains each step and why it's there. To see the welcome tab again later, open the help button at the top of the popup and choose <BgStyledText>Getting started</BgStyledText>.

<Screenshot src="/img/extension/welcome.png" alt="The Welcome to Hippius tab with its four setup steps, three of them done" dark raw />

## Pin it to your toolbar

New extensions hide behind the puzzle piece at the top right of your browser. Pin Hippius so it sits in your toolbar on every page. That button is where you'll start most captures, where you can stop a recording, and where your captures are listed.

<Ordered>
  <li>Click the puzzle piece (<strong>Extensions</strong>) at the top right of your browser.</li>
  <li>Click the pin next to <strong>Hippius</strong>.</li>
</Ordered>

Until you do, the popup shows a small reminder at the top. While you record, the Hippius button shows <strong>REC</strong> (or <strong>II</strong> while paused), so you can always tell that a recording is running.

## Why you need a Hippius account

The extension doesn't keep your captures itself, and it doesn't send them to a server of its own. Every screenshot and recording is saved to **your own Hippius Drive**, in your captures drive, and its share link is made from there. The extension only ever uploads to the account you connect it to.

That's what lets your captures outlive the extension. Remove it, switch computers or change browsers, and your captures are still in your Drive, where you can open them in the console or in the Hippius apps. It's also what keeps them private: they're encrypted with your account's keys, which Hippius doesn't have.

## Create a free account

If you already use Hippius (the console, the desktop app or the mobile app), you already have an account. Skip to [Connect the extension](#connect-the-extension).

Otherwise, making one takes a minute:

<Ordered>
  <li>Go to <a href="https://console.hippius.com">console.hippius.com</a>. This is the Hippius console, the website where you manage your account and your files.</li>
  <li>Choose <strong>Google</strong>, <strong>GitHub</strong> or <strong>Apple</strong> and sign in with that account. There's no separate sign-up form: the first time you sign in, your Hippius account is created.</li>
  <li>The console asks how you'd like the dashboard laid out. Either choice is fine for the extension, and you can change it later.</li>
</Ordered>

You can also sign in with a 12-word access key instead, but an account made that way has no free storage, so it needs a paid plan before the extension can save anything. The [console's Getting Started guide](/use/console/getting-started#signing-in) explains each way to sign in.

### What the free plan includes

Every account that signs in with Google, GitHub or Apple starts on the Free plan, with no card needed:

<Unordered>
  <li><strong>10 GB</strong> of encrypted storage in Hippius Drive, shared by your captures and any other files you keep there.</li>
  <li><strong>Unlimited screenshots</strong> and unlimited share links.</li>
  <li><strong>25 recordings</strong>, each up to 5 minutes long.</li>
  <li>A small Hippius mark in the corner of each capture.</li>
</Unordered>

Paid plans remove the recording limits and the mark, and add insights and comments on your links. [Plans and Limits](/use/browser-extension/plans) has the details.

## Connect the extension

Connecting gives the extension what it needs to save captures to your account: the key to your captures drive, a key for the share links it makes (so you can see who viewed and commented on them), and a session to upload with. It doesn't get your password, your recovery phrase, or access to the rest of your Drive, and files you haven't shared by link stay out of its reach.

<Ordered>
  <li>Click the Hippius button in your toolbar, then <BgStyledText>Connect account</BgStyledText>.</li>
  <li>The console opens its <strong>Connect the Hippius extension</strong> page in a new tab. Sign in if you need to.</li>
  <li>Press <BgStyledText>Connect</BgStyledText>.</li>
  <li>If the console asks for your password, enter it (see below for why).</li>
  <li>The page says <strong>The extension is connected</strong>. You can close the tab and start capturing.</li>
</Ordered>

<Screenshot src="/img/extension/popup-signed-out.png" alt="The Hippius popup before connecting, with Connect account and Capture without saving" dark raw />

### Why the console asks for your password

The keys that encrypt your files are themselves locked with your [unlock password](/use/console/unlock-password), and only you know it. To hand the extension the key to your captures drive, the console first has to unlock them, so it asks for that password. Your password stays in the console; the extension never sees it.

If you've already unlocked your files in this console tab, it doesn't ask again. If your account has no unlock password yet, as on a brand-new account, the console takes you through setting one up, then finishes connecting. Write down the recovery phrase it shows you: it's the only way back into your files if you forget the password.

### Staying connected

The connection lives in your browser's memory, not on disk. It lasts until you close the browser, disconnect in the extension, or sign out of the console. After that, the popup says **Your session ended** and offers <BgStyledText>Connect again</BgStyledText>, which takes a few seconds. Anything you capture in the meantime waits safely in your browser until you're back.

### Switching to another account

To use a different Hippius account, disconnect first, with the button next to your account at the bottom of the popup or in Settings, then connect again while signed in to the other account. When your session ends, the popup also offers <BgStyledText>Use a different account</BgStyledText>. The extension never switches accounts on its own.

### Capturing before you connect

Need a screenshot right now, before you've made an account? <BgStyledText>Capture without saving</BgStyledText> on the signed-out popup takes it anyway. Those captures stay on your computer, unencrypted (there's no key to encrypt them with yet), until you connect. As soon as you do, they're encrypted and saved to your Drive like any other capture.

## Allow your camera and microphone

The welcome tab's third step asks your browser to let Hippius use your camera and microphone. You allow them once, on Hippius's own page, and the websites you record never get access to them. You still choose for every recording whether to turn them on. You can skip this step if you only want screenshots, and allow them later when you first record.

## What's next

<Unordered>
  <li><a href="/use/browser-extension/screenshots">Take screenshots</a></li>
  <li><a href="/use/browser-extension/recording">Record your screen</a></li>
  <li><a href="/use/browser-extension/sharing">Share and see who watched</a></li>
</Unordered>
