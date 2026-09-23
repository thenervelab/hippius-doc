---
id: hub
title: Hub
sidebar_label: Hub
slug: /use/console/hub
description: Set up your Hub namespace in the Hippius Console, browse the container images and AI models you have pushed, manage docker credentials and access level, and pick a Hub plan.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

**Hub** is where your private container images and AI models live. You push to it with `docker push` or the `hippius-hub` CLI, and the console shows you what is there, how much of your quota it uses, who can pull it, and which plan pays for it.

Reach it from the sidebar at <BgStyledIconWithText text="Hub" icon="Box" />, under **Infrastructure**.

:::info Hub used to be called the Container Registry
The console renamed the Container Registry to **Hub**. Nothing about how you push or pull changed: the endpoint is still `registry.hippius.com`, and the CLI commands still start with `hippius-hub registry`. Only the name in the console did.
:::

This page covers the console side. For pushing and pulling from your terminal, see the [Hub Quickstart](/registry), [Push](/registry/push) and [Pull](/registry/pull).

<Screenshot src="/img/console/hub/overview.png" alt="The Hub page in the Hippius Console" dark raw />

## Set up your Hub

Every account starts on the **free Hub plan**, so there is nothing to buy first. What a new account does not have yet is a **namespace**: the name every image you push is filed under, as in `registry.hippius.com/<namespace>/my-app:v1`.

The first time you open Hub, the console asks you to pick one.

<Ordered>
  <li>Open <strong>Hub</strong> from the sidebar. You'll see <strong>Get started with the Hub</strong>.</li>
  <li>Type a name in <strong>Namespace name</strong>. As you type, the console checks whether it is free and shows a preview such as <code>registry.hippius.com/myns/qwen-7b:v1</code>.</li>
  <li>Click <BgStyledText>Create namespace</BgStyledText>.</li>
  <li>We reserve the namespace and issue your docker credentials. This usually takes a few seconds, and a <strong>Setting up your Hub</strong> banner keeps you posted if it takes longer.</li>
</Ordered>

A namespace name must be **lowercase letters, digits and dashes**, **1 to 63 characters**, and cannot start or end with a dash. Names are unique across Hippius.

:::warning Pick the name carefully
A namespace cannot be renamed or deleted from the console. It becomes the first part of every image path you push, so choose one you are happy to keep.
:::

If the console says a name is taken and you think it is yours (for example, you created it from the CLI), submit it anyway. Setting up is safe to repeat and resyncs the console with the namespace you already own.

You can also create a namespace from your terminal with `hippius-hub registry provision <namespace> --docker-login`. See [Push](/registry/push#provision-a-namespace).

{/* Screenshot needed: static/img/console/hub/setup.png (+ setup-dark.png).
    Capture the "Get started with the Hub" screen with a name typed and "is available." showing
    on an account that has no namespace yet.
<Screenshot src="/img/console/hub/setup.png" alt="Setting up a Hub namespace" dark raw />
*/}

## The Hub page

Once your namespace exists, the Hub page shows it by name at the top, with a status badge beside it: **Hub healthy**, or **Hub degraded** when pushes and pulls may fail. When the Hub is degraded a red banner explains what is affected, and the console keeps checking every 30 seconds.

<BgStyledText>Browse Models</BgStyledText> opens [hub.hippius.com](https://hub.hippius.com), the public catalogue of models and containers, in a new tab.

### Overview cards

| Card             | What it shows                                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------------------------- |
| **Quota Used**   | How much you have pushed against your plan's storage, with a bar that turns amber at 80% and red at 90%.        |
| **Access Level** | **Public** (anyone can pull without logging in) or **Private** (pulls need docker credentials).                  |
| **Current Plan** | Your Hub plan, its monthly price, and its private and public storage. Click <BgStyledText>View plans</BgStyledText> to change it. |

:::note Quota is counted in binary units
**Quota Used** counts in KiB, MiB and GiB (powers of 1024), the same way Docker and most registries do. A plan sold as "100 GB" shows as "100 GiB" here. It is the same amount of storage.
:::

### Repositories

The **Repositories** table lists every repository in your namespace, with its number of **artifacts**, its **pulls**, and when it was **created** and **last modified**. Repositories appear on their own after your first push. There is nothing to create in the console first.

Click a repository to see its artifacts. Each row is one pushed image or model version, with its **tags**, **size**, **labels**, and when it was last **pushed** and **pulled**. Click an artifact for its full detail: digest, media type, every tag that points at it, and any annotations it was pushed with, such as its source, version or licence.

An artifact with no tags is still there. It can only be reached by its digest (`@sha256:…`).

### Deleting a repository or an artifact

<Ordered>
  <li>Click the <strong>three dots</strong> at the end of the row.</li>
  <li>Choose <BgStyledText>Delete Repository</BgStyledText> or <BgStyledText>Delete Artifact</BgStyledText>.</li>
  <li>Confirm. Deleting a repository removes every artifact in it.</li>
</Ordered>

:::danger Deletion is permanent
A deleted repository or artifact cannot be restored. Anything that pulls it by name or digest will start failing.
:::

## Manage your Hub

Click <BgStyledText>Manage</BgStyledText> beside the Repositories table to open **Manage Hub**. It has four sections.

<Screenshot src="/img/console/hub/manage.png" alt="Manage Hub" dark raw />

### Subscription plan

Your current plan, its price, its storage, and how many projects it allows, with a <BgStyledText>View plans</BgStyledText> button. See [Hub plans](#hub-plans) below.

### Access level

Choose who can pull from your namespace.

| Level       | Who can pull                                               |
| ----------- | ---------------------------------------------------------- |
| **Public**  | Anyone, with no login. New namespaces start public.        |
| **Private** | Only clients logged in with your docker credentials.       |

Click <BgStyledText>Make Private</BgStyledText> or <BgStyledText>Make Public</BgStyledText> and confirm. Pushing always needs your credentials, whichever you pick.

:::info Changing the access level changes your quota
Each Hub plan has two storage allowances, one for private namespaces and one for public ones. Switching between public and private moves you onto the other allowance, so your quota changes size. Check both figures on the plan before you switch, especially if you are close to full.
:::

### Docker credentials

The **Docker credentials** section shows the **Username** of your robot account, the login `docker` and `oras` use to push to your namespace.

To get a secret for it, click <BgStyledText>Rotate token</BgStyledText>:

<Ordered>
  <li>Click <BgStyledText>Rotate token</BgStyledText> and confirm.</li>
  <li>The console shows your <strong>new docker secret</strong>. Copy it now. It is not shown again.</li>
  <li>Run <code>docker login registry.hippius.com -u '&lt;your username&gt;'</code> and paste the secret when asked.</li>
  <li>Click <BgStyledText>I've saved it</BgStyledText>.</li>
</Ordered>

:::warning Rotating revokes the old secret immediately
Anything still using the old secret, such as CI pipelines, servers or scripts, stops being able to push until you log it in again with the new one.
:::

The CLI does the same thing, and logs Docker in for you: `hippius-hub registry rotate-token --docker-login`.

### Push instructions

The last section shows the exact commands to push your first image, filled in with your namespace, in two tabs:

<Unordered>
  <li><strong>hippius-hub (recommended)</strong>: install the CLI, save your console API token, issue credentials, then tag and push. It also shows how to upload model files directly with <code>hippius-hub upload</code>.</li>
  <li><strong>docker</strong>: log in with your robot username and secret, then tag and push.</li>
</Unordered>

Your console API token is on the [Settings](/use/console/settings) page. The same commands appear under the Repositories table until you push something.

## Hub plans

Your Hub plan decides how much you can store. Open **Plans** from <BgStyledText>View plans</BgStyledText> on the Hub page, from **Manage Hub**, or from the **Hub** card on the [Billing](/use/console/billing) page.

Each plan card shows:

<Unordered>
  <li>The plan name and its monthly price. <strong>Builder</strong> is marked <strong>Most popular</strong>, and your plan is marked <strong>Current</strong>.</li>
  <li>Its <strong>Private</strong> and <strong>Public</strong> storage.</li>
  <li>What the plan includes. Anything marked <strong>Soon</strong> is not available yet.</li>
</Unordered>

Plans are loaded live, so the names, sizes and prices in the console are always the current ones. Pricing is also listed at [hippius.com/hippius-hub](https://hippius.com/hippius-hub).

<Screenshot src="/img/console/hub/plans.png" alt="Hub plans" dark raw />

### Subscribing

Hub plans are paid from your **account balance** (your credits, where 1 credit = $1) and renew monthly until you cancel.

<Ordered>
  <li>Click <BgStyledText>Subscribe</BgStyledText> on the plan you want.</li>
  <li>Check the plan and price, and that <strong>Account balance</strong> is selected under <strong>Pay with</strong>. Your available balance is shown beside it.</li>
  <li>Click <BgStyledText>Make Payment</BgStyledText>.</li>
  <li>The subscription is confirmed on chain, which usually takes a few seconds. When it is done you'll see <strong>You're subscribed to</strong> with your new storage. Click <BgStyledText>Continue</BgStyledText>.</li>
</Ordered>

Your namespace, robot account and credentials are unchanged, so there is nothing to log in again.

:::note Card payments are coming soon for Hub
The **Card** option is shown but not available for Hub plans yet. If your balance does not cover the plan, the dialog says so and links to [Billing](/use/console/billing) to top up.
:::

If confirming takes longer than a minute, the console tells you it is still processing. Your subscription appears on its own once it lands, so refresh rather than subscribing again.

### Changing plans

There is no one-step upgrade or downgrade for Hub yet. If you subscribe to a second plan while you have a paid one, **both stay active and you are charged for both**. The console warns you before you confirm.

To switch, cancel your current plan first, then subscribe to the new one.

### Cancelling

<Ordered>
  <li>On the Plans page, click <BgStyledText>Cancel plan</BgStyledText> on your current plan.</li>
  <li>Read the confirmation and click <BgStyledText>Cancel subscription</BgStyledText>.</li>
</Ordered>

Your namespace stays active for a **30 day grace period**. Subscribe again within that window to keep everything.

:::danger After 30 days your images are deleted
When the grace period ends, the namespace and every artifact in it are permanently deleted. While a namespace is in its grace period, a banner on the Hub page shows the exact deletion date and links to the plans.
:::

## Hub on the Overview

The console's [Overview](/use/console/overview) shows Hub in two places:

<Unordered>
  <li>The <strong>Hub</strong> cell in the page header shows your plan and its private storage, with an <BgStyledText>Upgrade</BgStyledText> button while you are on the free plan.</li>
  <li>The <strong>Hub</strong> card lower down shows <strong>Storage Used</strong>, your number of <strong>Repositories</strong>, and your five most recent repositories. Before you have a namespace it shows <BgStyledText>Set up Hub</BgStyledText> instead.</li>
</Unordered>

## Where to next

<Unordered>
  <li><a href="/registry">Hub Quickstart</a>: the five minute path from zero to your first push or pull.</li>
  <li><a href="/registry/push">Push</a>: push images and models, and manage credentials from the CLI.</li>
  <li><a href="/registry/pull">Pull</a>: pull from Python, the CLI, or Docker.</li>
  <li><a href="/use/console/billing">Billing</a>: top up your balance and see every plan you pay for.</li>
</Unordered>
