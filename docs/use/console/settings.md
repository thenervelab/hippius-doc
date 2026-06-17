---
id: settings
title: Settings
sidebar_label: Settings
slug: /use/console/settings
description: 4
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

The **Settings** page is where you personalise the console and manage your account preferences. You can grab your API token, control which emails Hippius sends you, switch between light and dark mode, change your dashboard layout, adjust table density, and manage your subscription plan.

To reach Settings, click the **Hippius** dropdown in the top left of the sidebar, then click **Settings** from the menu that appears.

All changes save automatically. There is no save button anywhere on this page.

<Screenshot src="/img/console/settings/overview.png" alt="Settings page" dark />

## API Token

Your **API Token** lets you make direct API calls to Hippius on your behalf, for example in a script or integration.

The token is hidden by default. Click the **eye** icon to reveal it, then the **copy** icon to copy it to your clipboard. Click the eye again to hide it.

```http
Authorization: Bearer <your-token>
```

See [Hippius API](/use/api) for available endpoints.

:::warning Keep this token private
Anyone with this token has full access to your account. Never paste it into public documents, repositories, screenshots, or chat messages. If you believe it has been compromised, contact our support team immediately.
:::


## Email Notifications

Control which emails Hippius sends you. There's a master on/off switch at the top, and four individual toggles below it.

When the master switch is **off**, no emails are sent regardless of the individual settings. When it's **on**, each toggle controls its specific notification type:

| Notification | What it sends |
|---|---|
| **File processing status updates** | Emails when your uploads finish processing through the Hippius pipeline. |
| **Low credit balance alerts** | An email when your balance drops below a set threshold. |
| **Zero balance alerts** | An email when you run out of credits and uploads are paused. |
| **Marketing emails & newsletter** | Product updates, announcements, and occasional offers. |

Click any toggle to flip it. The change saves immediately.


## Theme

Pick **Light** or **Dark**. The change applies instantly and persists across all your sessions and devices.


## Home View

Choose between two dashboard layouts:

**Normal** gives you a focused overview: your recent uploads, credit balance, and storage usage. Best if you're mainly using Hippius for personal file storage.

**Pro** expands the dashboard with your Drive and S3 sections side by side, detailed storage and credit charts, and recent uploads. Best if you actively manage multiple services.

The change takes effect the next time you load the Overview page (or immediately if you're already on it).


## Table Text Size

Choose how rows look across all tables in the console. Drive, S3, and Billing tabs all follow this setting.

| Option | Best for |
|---|---|
| **Compact** | Seeing more rows at once on large monitors or dense data sets. |
| **Comfortable** *(default)* | Balanced spacing for everyday use. |
| **Spacious** | Easier reading during long sessions or on smaller screens. |

A preview row at the top of this section updates live as you switch options, so you can see the difference before committing.


## Current Plan

If you have an active subscription, this section shows your plan name, monthly credit allocation, next billing date, and an action menu (three dots) with options to **Change Plan** or **Cancel Subscription**.

If you don't have a plan yet, a shortcut card points you to the Billing page where you can subscribe.

You can also cancel directly from the Billing page by finding your active plan card and clicking **Cancel Subscription** there. For a full comparison of plans and instructions for switching or cancelling, see [Billing → Subscription Plans](/use/console/billing#subscription-plans).


## Where to next

<Unordered>
  <li><a href="/use/console/billing">Billing</a>: manage credits and subscriptions in detail.</li>
  <li><a href="/use/console/support">Help & Support</a>: open a ticket if something isn't working as expected.</li>
  <li><a href="/use/console/getting-started">Getting Started</a>: a refresher on signing in and navigating the console.</li>
</Unordered>
