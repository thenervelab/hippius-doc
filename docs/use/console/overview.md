---
id: overview
title: Overview
sidebar_label: Overview
slug: /use/console/overview
description: 3
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

The **Overview** is your console home page. Every time you sign in, this is where you land. It shows the plan behind each product, how full each one is, your balance, and your latest files, so you can see at a glance whether anything needs attention.

You can switch between **Normal** and **Pro** view at any time from [Settings](/use/console/settings).

<Screenshot src="/img/console/overview/overview.png" alt="Overview page" dark />

## Normal View

Normal is a clean, focused home base. It shows you the essentials at a glance without overwhelming you.

Two shortcut buttons sit in the top right: <BgStyledText>+ Top up</BgStyledText>, which opens [Billing](/use/console/billing), and <BgStyledText>+ New File</BgStyledText>, which starts an upload.

Three panels sit across the top of the page:

<Unordered>
  <li><strong>Last Uploads</strong>: your most recently uploaded files with their file type and upload time.</li>
  <li><strong>Available Credits</strong>: your current credit balance. Click the graph icon to expand your credit usage chart and see how your spending has changed over time.</li>
  <li><strong>Storage Usage</strong>: how much Drive storage you're using. Click the graph icon to expand your usage chart over time.</li>
</Unordered>

Below the panels, the **Files** section shows all your Drive folders in a searchable table. Your total storage size and file count are shown at the top of the section.

<Screenshot src="/img/console/overview/normal.png" alt="Normal view" dark />

## Pro View

Pro turns the Overview into a control center for every product: one row for your plans, one for your storage, then each product with its own figures and a table of what is in it.

{/* Screenshot needed: the current Pro view (header plan cells, Drive and S3
    storage cards, Hub and VM row). Replace /img/console/overview/pro.png and
    pro-dark.png, which show the retired credits chart. */}
<Screenshot src="/img/console/overview/pro.png" alt="Pro view" dark />

### Your plans and balance

The row at the top has one cell per product and one for your balance:

| Cell        | What it shows                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------- |
| **Drive**   | Your Drive plan and its storage, for example **Starter · 500 GB**.                                             |
| **S3**      | Your S3 plan, or **Pay as you go** if you pay for S3 by the hour.                                              |
| **Hub**     | Your Hub plan and its storage, for example **Free · 25 GB**.                                                   |
| **Balance** | Your credit balance in dollars, with a <BgStyledText>+ Top up</BgStyledText> button that opens [Billing](/use/console/billing). |

A cell shows an <BgStyledText>Upgrade</BgStyledText> button when there is a better plan to move to, such as when you are on a free plan or paying for S3 by the hour. Click any cell to open that product's plans.

### Storage cards

Below the plans, **Drive storage** and **S3 storage** each get a card that answers three questions: how full it is, against what, and what to do about it.

<Unordered>
  <li><strong>How much you have stored</strong>, and the size of your plan, for example <strong>266.08 GB of 500 GB used</strong>.</li>
  <li>A <strong>bar</strong> and a <strong>percentage</strong>. The bar turns amber at 80% and red at 95%. S3 on pay as you go has no ceiling, so it shows only what you have used, with an <strong>Hourly, no commitment</strong> tag.</li>
  <li>Your <strong>plan name</strong> and how much space is <strong>free</strong>.</li>
  <li>One button, which changes with your situation:</li>
</Unordered>

| Button                           | When you see it                                                                                   |
| -------------------------------- | ------------------------------------------------------------------------------------------------- |
| <BgStyledText>Subscribe</BgStyledText> | You have no plan for this product.                                                           |
| <BgStyledText>Upgrade</BgStyledText>   | You are 80% full or more, on S3 pay as you go, or a cheaper plan per TB exists.              |
| <BgStyledText>Manage</BgStyledText>    | Your plan has room and there is nothing better to move to.                                   |

When upgrading would save you money, the S3 button carries a green badge with the saving, such as **Save 22%**. That figure compares what you pay per TB today with the cheapest plan per TB. See [Billing](/use/console/billing#s3-plans-and-pay-as-you-go).

:::warning No Drive plan means no uploads
Without a Drive plan the Drive card reads **You don't have a subscription plan**. Nothing new can be uploaded, and files already in your Drive are permanently deleted after **30 days** without a plan. The card shows how much you have uploaded and a <BgStyledText>Subscribe</BgStyledText> button. See [Billing](/use/console/billing#drive-plans).
:::

Drive storage counts only your own Drive. Storage in a shared drive someone else owns is paid for by its owner, so it never fills your bar.

### Storage Overview

The **Storage Overview** shows your Drive and S3 Buckets side by side:

<Unordered>
  <li><strong>Drive</strong>: your storage used and file count, a table of your folders, and <BgStyledText>+ New Folder</BgStyledText> and <BgStyledText>+ New File</BgStyledText> buttons.</li>
  <li><strong>S3 Buckets</strong>: your storage used and object count, a table of your buckets, and a <BgStyledText>+ Create Bucket</BgStyledText> button.</li>
</Unordered>

Use the search bar and the **Global / Drive / S3 / VMs** switch above it to search across everything or one product.

### Hub and Virtual Machines

The last row gives Hub and Virtual Machines the same treatment:

<Unordered>
  <li><strong>Hub</strong>: your <strong>Storage Used</strong> and number of <strong>Repositories</strong>, and your most recent repositories. Before you have a namespace it shows <BgStyledText>Set up Hub</BgStyledText>. See <a href="/use/console/hub">Hub</a>.</li>
  <li><strong>Virtual Machines</strong>: how many <strong>VMs</strong> you have and how many are <strong>Running</strong>. Virtual machines are not generally available yet, so for most accounts this reads <strong>0</strong> and says they are coming soon.</li>
</Unordered>

Both show **0** rather than disappearing when you have nothing there yet.

## Service Status Banners

When one of our products is degraded or undergoing maintenance, a banner appears at the top of that product's own page rather than across the whole console. Drive problems show on Drive, S3 problems on S3, and so on, and the banner follows into that product's sub-pages.

This means the absence of a banner on a page is itself information: that product is fine, even if another one is not.

A banner can be dismissed once you have read it. It comes back if the situation changes.

<Screenshot src="/img/console/overview/service-status-banner.png" alt="A service status banner on a product page" dark />

## Where to next

<Unordered>
  <li><a href="/use/console/drive">Drive</a>: upload and manage your personal encrypted files.</li>
  <li><a href="/use/console/s3">S3 Buckets</a>: manage your S3 compatible buckets and access tokens.</li>
  <li><a href="/use/console/hub">Hub</a>: your container images and AI models.</li>
  <li><a href="/use/console/wallet">Wallet</a>: check your hAlpha balance, send and receive tokens.</li>
  <li><a href="/use/console/staking">Staking</a>: stake hAlpha to earn rewards.</li>
  <li><a href="/use/console/billing">Billing</a>: your plans, your balance, and how to top it up.</li>
  <li><a href="/use/console/referrals">Referrals</a>: invite people to Hippius and earn commission on what they spend.</li>
  <li><a href="/use/console/settings">Settings</a>: switch between Normal and Pro view.</li>
</Unordered>
