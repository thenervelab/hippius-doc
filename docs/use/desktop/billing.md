---
id: billing
title: Billing
sidebar_label: Billing
slug: /use/desktop/billing
description: Manage your credits, TAO deposits, subscription plans, and payment history from the Billing page in the Hippius desktop app.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Icon from '@site/src/components/Icon';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

The **Billing** page gives you a complete overview of your **credits**, the currency Hippius uses for storage and other services. From here you can top up your balance, subscribe to a monthly plan, track your Drive usage over time, and review your payment history, all without leaving the desktop app.

Reach Billing from the sidebar at <BgStyledIconWithText text="Billing" icon="Billing" />.

:::info What are credits used for?
Credits are consumed when you upload files, provision VMs, or use other Hippius services. The info button next to the page title shows the same reminder.
:::

<Screenshot src="/img/desktop/billing-overview.png" alt="Billing screen" dark />

## Billing Dashboard

The top of the Billing page shows three cards side by side:

| Card                    | What it shows                                                                                                                          |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Total Credits**       | Your current credit balance, a refresh button with a "Last updated" timestamp, and an <BgStyledText>Add Credits</BgStyledText> button. |
| **TAO Deposit Address** | Your SS58 Bittensor Chain wallet address for TAO deposits, with a copy button.                                                         |
| **Drive Credit Usage**  | A chart of the credits consumed by your Drive storage over time, with a refresh button and a time-range selector.                      |

## Total Credits

The **Total Credits** card shows your current balance. A fresh or unfunded account reads as `0 Credits`.

<Unordered>
  <li>Click the <strong>refresh</strong> icon to re-fetch your balance. The "Last updated" timestamp shows how recently the number was pulled.</li>
  <li>Click <BgStyledText>Add Credits</BgStyledText> to top up. This opens the Hippius console in your browser, where you can pay with <strong>TAO</strong> or by <strong>credit card</strong> (via Stripe).</li>
</Unordered>

:::info Topping up happens in the console
The desktop app doesn't take payment directly. <BgStyledText>Add Credits</BgStyledText> opens the console's billing page so you can complete the purchase there. Once the transfer confirms, your desktop balance updates the next time it refreshes. See [Console Billing](/use/console/billing) for the full top-up flow.
:::

## TAO Deposit Address

The **TAO Deposit Address** card shows your **SS58 Bittensor Chain** address. Send TAO to this address from any Bittensor wallet or exchange and your credit balance updates automatically at the rate of **$1 = 1 credit** once the transfer confirms on chain.

Click the **copy** button next to the address to copy the full value to your clipboard.

:::warning TAO transfers are irreversible
Once a TAO transaction confirms on the blockchain, it cannot be reversed. Verify the destination address before sending. We cannot recover funds sent to the wrong address.
:::

## Drive Credit Usage

The **Drive Credit Usage** card shows a line chart of the credits consumed by your **Drive storage** over time, with the all-time total shown as a headline figure above the chart.

<Unordered>
  <li>Use the time-range selector to change the window: <strong>This Week</strong>, <strong>Last 30 Days</strong>, <strong>Last 60 Days</strong>, <strong>1 Year</strong>, or <strong>Max</strong>.</li>
  <li>Click the <strong>refresh</strong> button to re-fetch the data. The chart does not poll automatically.</li>
  <li>Hover over any point to see the usage on that day.</li>
</Unordered>

:::note This chart is Drive-only
This card shows credits consumed by **Drive storage** only, the same figure as the home page. Your total credit usage across all Hippius products (S3, VMs, etc.) is shown on the [web console](/use/console/billing).
:::

## Subscription Plans

Below the dashboard cards, the **Subscription Plans** section lets you pay by card (via Stripe) on a monthly basis. Each plan gives you a fixed credit allocation every month. Plans are loaded live from the server, so the names, prices, and allocations always match the latest offering. The four tiers are **Personal**, **Professional**, **Business**, and **Enterprise**.

Each plan card shows:

<Unordered>
  <li>The plan name and price (for example, <code>$15 /month</code>).</li>
  <li>A short description and the effective storage that allocation buys at current rates (for example, "… storage on Hippius").</li>
  <li>A <strong>Features</strong> list, including Automatic Reload.</li>
  <li>A <BgStyledText>Subscribe</BgStyledText> button. Your active plan is highlighted with an <strong>Active Plan</strong> badge and shows a <BgStyledText>Cancel Subscription</BgStyledText> button instead.</li>
</Unordered>

### Subscribing to a Plan

<Ordered>
  <li>Find the plan you want and click <BgStyledText>Subscribe</BgStyledText>. The button shows <em>Processing…</em> while it prepares your checkout.</li>
  <li>A Stripe checkout opens in your browser.</li>
  <li>Enter your card details (or use Apple Pay / Google Pay) and confirm.</li>
  <li>Stripe processes the first month's payment and the plan credits are deposited to your account.</li>
</Ordered>

### Switching Plans

To move to a different tier, find the new plan card and click <BgStyledText>Subscribe</BgStyledText>. Stripe handles the upgrade or downgrade and prorates the change automatically.

### Cancelling

<Ordered>
  <li>On your active plan card, click <BgStyledText>Cancel Subscription</BgStyledText>.</li>
  <li>A <strong>Cancel Subscription?</strong> dialog appears. Click <BgStyledText>Keep Subscription</BgStyledText> to back out, or <BgStyledText>Yes, Cancel</BgStyledText> to continue.</li>
  <li>You're redirected to the Stripe customer portal in your browser, where you complete the cancellation and manage your billing details.</li>
</Ordered>

:::info
Cancelling opens the Stripe customer portal. Your existing credits stay available, and pay-as-you-go top-ups continue to work after cancellation.
:::

## Billing History

The **Billing History** table at the bottom of the page lists your payment transactions:

| Column               | What it shows                                                                                                                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ID**               | The transaction ID. Click the copy icon to copy it.                                                                                                                                                                                   |
| **Amount**           | The payment amount, prefixed with `$` for card payments or the TAO logo for TAO.                                                                                                                                                      |
| **Transaction Type** | A badge showing **Credit Card** or **TAO**.                                                                                                                                                                                           |
| **Status**           | A colour-coded badge: green for success states (Success, Completed, Paid, Confirmed), amber for in-progress states (Pending, Processing), red for failures (Failed, Declined, Cancelled, Expired), and grey for Refunded or Reversed. |
| **Date**             | The date and time of the transaction.                                                                                                                                                                                                 |

You can sort by **Amount** or **Date** by clicking the column header. The table paginates at 10 rows per page, with page controls shown when you have more than one page.

If you haven't made any transactions yet, the table shows a "No billing history yet" message pointing you to subscribe to a plan or top up credits.

<Screenshot src="/img/desktop/billing-history.png" alt="Billing history screen" dark />

## Where to next

<Unordered>
  <li><a href="/use/console/billing">Console Billing</a>: the full top-up flow, including the Pay with $TAO dialog and Stripe subscription checkout.</li>
  <li><a href="/use/desktop/drive">Drive</a>: start uploading once you have credits.</li>
  <li><a href="/use/desktop/shared-links">Shared Links</a>: sharing a file uploads an encrypted copy, which uses credits.</li>
</Unordered>
