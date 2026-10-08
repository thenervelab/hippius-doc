---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
slug: /use/console/getting-started
description: Sign in to the Hippius Console with Google, GitHub, Apple or an access key, choose your mode, and find Drive, S3, Hub and Billing in the sidebar.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

The **Hippius Console** is the web dashboard for the Hippius distributed network. Open it at [console.hippius.com](https://console.hippius.com) in any modern desktop browser. From one place you can:

<Unordered>
  <li>Store, browse, and manage personal encrypted files with <strong>Drive</strong>.</li>
  <li>Create S3 compatible <strong>buckets</strong> and connect any S3 client.</li>
  <li>Push container images and AI models to your <strong>Hub</strong>.</li>
  <li>Choose a <strong>plan</strong> for each product, and top up your <strong>balance</strong> by card, Bitcoin, USDC, or TAO.</li>
</Unordered>

## Signing In

Go to [console.hippius.com](https://console.hippius.com) and choose how you want to sign in:

<Unordered>
  <li><strong>Google, GitHub, or Apple</strong>: click the button and you'll be taken to that provider's login page, then brought back to the console automatically.</li>
  <li><strong>Access Key</strong>: enter your <strong>12-word recovery phrase</strong> and click <BgStyledText>Log In</BgStyledText>. Use the eye icon to show or hide the words as you type. This creates a wallet-only account. It has no real email address, so it gets no lifecycle mail. Drive has no free plan on that account: subscribe before the first upload. S3 and Hub work the same as on any other account.</li>
</Unordered>

If this is your first time signing in, your account is created automatically. There is no separate sign up step.

:::info Already using the Hippius Desktop App?
Your console account and desktop app account are the same. Sign in with the same credentials and your Drive files will be there waiting for you.
:::

<Screenshot src="/img/console/getting-started/login.png" alt="Console login screen" dark />

## Choose Your Mode

The first time you sign in, a screen titled **Choose your mode** asks you to pick one of two cards. Settings calls them Normal and Pro.

**I just want the basics.** (Normal) gives you a clean, focused dashboard. You'll see your most recent file uploads, your current balance, and your storage usage. It's ideal if you're just getting started or mainly use Hippius for personal file storage.

**I'm a pro.** (Pro) expands the dashboard to show your Drive and S3 sections side by side, along with detailed storage and balance charts. It's the better choice if you're actively managing multiple services and want everything at a glance.

You can switch between Normal and Pro at any time from [Settings](/use/console/settings).

<Screenshot src="/img/console/getting-started/choose-mode.png" alt="Choose mode screen" dark />

## Getting Around

The **sidebar on the left** is how you move between sections. It's organised into groups:

<Unordered>
  <li><strong>Drive</strong>: My Drives (your encrypted files) and Shared Drives.</li>
  <li><strong>S3</strong>: S3 Buckets and S3 Migrations.</li>
  <li><strong>Confidential Compute</strong>: Virtual Machines, Databases, Kubernetes and Runners.</li>
  <li><strong>Hub</strong>: your container images and AI models.</li>
  <li><strong>Account</strong>: Billing, Wallet and Referrals.</li>
  <li><strong>Support</strong>: Documentation and Help & Support, to open a ticket with our team.</li>
</Unordered>


## Theme

The console automatically follows your system's dark or light mode. If you'd prefer a different theme, you can override it at any time from [Settings](/use/console/settings).

<Screenshot src="/img/console/getting-started/theme.png" alt="Theme setting" dark />

## Where to next

<Unordered>
  <li><a href="/use/console/overview">Overview</a>: a tour of your dashboard home page.</li>
  <li><a href="/use/console/billing">Billing</a>: pick a plan and top up your balance. Accounts signed in with an access key need a Drive plan before they can upload.</li>
  <li><a href="/use/console/drive">Drive</a>: upload and manage your personal encrypted files.</li>
  <li><a href="/use/console/s3">S3 Buckets</a>: set up S3 compatible storage and manage access tokens.</li>
</Unordered>
