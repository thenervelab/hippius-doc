---
id: billing
title: Billing
sidebar_label: Billing
slug: /use/desktop/billing
---

import Ordered from '@site/src/components/Ordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Icon from '@site/src/components/Icon';

## Introduction

The Billing page gives you a complete overview of your credits, subscription plan, and payment history, all within the desktop app. You can add credits, manage subscriptions, and view transaction history without leaving the app.

## Billing Dashboard

The Billing page displays three widget cards at the top:

| Widget | What It Shows |
|---|---|
| **Total Credits** | Your current credit balance with a refresh button and <BgStyledText>Add Credits</BgStyledText> action |
| **Your Subscription** | Current plan name, pricing, auto-renewal countdown, and upgrade/cancel options |
| **TAO Deposit Address** | Your SS58 Bittensor wallet address for TAO deposits, with a copy button |

{/* 📸 SCREENSHOT NEEDED: billing-dashboard.png — The Billing page showing the three top cards (Total Credits, Your Subscription, TAO Deposit Address) */}

## Adding Credits

<Ordered>
  <li>Click on <BgStyledIconWithText text="Billing" icon="Billing" /> in the sidebar.</li>
  <li>Click the <BgStyledText>Add Credits</BgStyledText> button on the Total Credits card.</li>
  <li>You will be directed to the Hippius console where you can choose to pay with <strong>TAO</strong> or <strong>Credit Card</strong> (via Stripe).</li>
</Ordered>

## Subscription Plans

### Subscribing to a Plan

<Ordered>
  <li>Click on <BgStyledIconWithText text="Billing" icon="Billing" /> in the sidebar.</li>
  <li>Click <BgStyledText>Subscribe to a Plan</BgStyledText> on the Your Subscription card.</li>
  <li>Choose from the available plans (3 Credits, 15 Credits, 150 Credits, or 450 Credits per month).</li>
  <li>Complete payment through Stripe.</li>
</Ordered>

### Managing Your Subscription

If you have an active subscription:
- The card shows your current plan name, monthly price, and days until auto-renewal
- Click <BgStyledText>Upgrade Plan</BgStyledText> to switch to a higher tier
- Click the three-dot menu (⋮) and select **Cancel Subscription** to cancel

:::info
Cancelling a subscription opens the Stripe customer portal where you can manage your billing details.
:::

## Credits Overview Chart

Below the dashboard cards, a **Credits Overview** chart shows your credit balance trends over time. You can filter by time range (7 days, 30 days, or 90 days) to see how your credits have changed.

{/* 📸 SCREENSHOT NEEDED: billing-credits-chart.png — The Credits Overview chart showing credit trends over time with the time range selector */}

## Billing History

The billing history table shows all your payment transactions with the following columns:

| Column | Description |
|---|---|
| **ID** | Transaction ID (click to copy) |
| **Amount** | Payment amount with currency indicator ($ for credit card, TAO logo for TAO) |
| **Transaction Type** | Badge showing "Credit Card" or "TAO" |
| **Status** | Badge showing "Success", "Completed", "Pending", or "Failed" |
| **Transaction Date** | Date and time of the transaction |

The table supports sorting by ID, amount, or date. Column widths are resizable and your preferences are saved across sessions.

![Billing history screen](/img/desktop/billing-history.png)
