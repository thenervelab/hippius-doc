---
id: billing
title: Billing
sidebar_label: Billing
slug: /use/console/billing
description: How paying for Hippius works. Add money to your balance by card, Bitcoin, USDC, TAO or Hippius tokens (hAlpha), choose a plan for Drive, S3 and Hub, and keep track of what you are charged.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Screenshot from '@site/src/components/Screenshot';

## How paying for Hippius works

There are two things to know about: your **balance** and your **plans**.

Your balance is money you keep on your account, in dollars. A plan is what gives a product its storage. Drive, S3 and Hub each have their own plan, so you can be on a free Drive plan, pay for a large S3 plan and never touch Hub at all.

Your balance pays for your plans when they renew each month, and for anything you use by the hour, such as S3 on pay as you go and [Compute](/use/compute/billing). Topping up on its own does not give you more space. It keeps your plans paid.

You'll find all of this under <BgStyledIconWithText text="Billing" icon="Billing" /> in the sidebar.

<Screenshot src="/img/console/billing/overview.png" alt="Billing page with balance, services and plans" dark raw />

## Add money to your balance

You can top up by card, with Bitcoin, with USDC, with TAO, or with Hippius tokens (hAlpha). Whichever you pick, the money lands on your balance and stays there until a plan, S3 usage or compute usage draws on it.

### By card

Open Billing and click <BgStyledText>+ Top up</BgStyledText>. You can add money once, anywhere from $10 to $10,000, or choose **Auto reload** to add a fixed amount every month. Payment goes through Stripe, so we never see your card details. If you close the Stripe page without paying, nothing is charged.

Auto reload is the easiest way to make sure your plans never lapse. You can change or stop it at any time from the same dialog, through Stripe. Anything it has already added stays on your balance.

### With Bitcoin

In the same Top up dialog, choose <BgStyledText>Bitcoin</BgStyledText>. You can pay on-chain or over Lightning, from $20 to $10,000. The invoice is priced in dollars and opens on pay.hippius.com. Lightning is credited in seconds. An on-chain payment is credited after one confirmation, usually 10 to 60 minutes.

<Screenshot src="/img/console/billing/bitcoin.png" alt="Top up with Bitcoin" dark raw />

### With USDC

Choose <BgStyledText>USDC</BgStyledText> to pay with USDC on Base from a browser wallet, from $5 to $10,000. One USDC adds one dollar to your balance. You sign one authorization for that amount, and the network fee is paid for you. MetaMask, Rabby, Coinbase Wallet, and other browser wallets work. The balance updates once the payment is on Base, usually within a minute or two.

<Screenshot src="/img/console/billing/usdc.png" alt="Top up with USDC on Base" dark raw />

### With TAO

If you hold TAO, you can pay with it in two ways:

<Unordered>
  <li><strong>From a browser wallet.</strong> If your TAO is in Talisman or Polkadot.js, pick the wallet in the Top up dialog, enter an amount in dollars and approve the transfer. The dialog shows how much TAO that is at today's price.</li>
  <li><strong>By sending it yourself.</strong> If your TAO is on an exchange or in another wallet, copy your deposit address from the <strong>Manually</strong> tab and send TAO to it. We add it to your balance in dollars at the market rate once the transfer confirms.</li>
</Unordered>

Either way, your balance usually updates within a few minutes.

<Screenshot src="/img/console/billing/tao-wallet.png" alt="Top up with a Bittensor wallet" dark />

:::warning The minimum is $20 of TAO, and transfers cannot be undone
Anything under $20 is not added to your balance and cannot be refunded. Double check the address before you send: TAO transfers are final, and we have no way to recover funds sent to the wrong place.
:::

### With Hippius tokens (hAlpha)

If you hold hAlpha, the Hippius network's token, choose the <BgStyledText>Hippius</BgStyledText> tab to convert it into balance. The conversion happens on the Hippius chain, at the chain's hAlpha price: you get the amount of hAlpha times that price, in dollars.

The tab shows the live price (**Price**, in dollars per hAlpha), what you receive (**You receive**), and the smallest amount you can convert (**Min**). The price is read again every few seconds while the tab is open. You can get hAlpha from Alpha on Bittensor with the [bridge](/use/console/bridge).

How you convert depends on how you sign in.

**With Google, GitHub or Apple.** Your account has a Hippius address that Hippius manages for you. Converting takes two steps:

<Ordered>
  <li><strong>Send from my wallet.</strong> Pick an account from a Polkadot wallet extension (Talisman, polkadot.js, SubWallet or the Taostats Wallet), enter an amount and click <BgStyledText>Send to my Hippius account</BgStyledText>. This only moves hAlpha to your Hippius address: nothing is bought yet. You can also send hAlpha from anywhere else to the address shown under <strong>Convert balance</strong>, with <strong>Copy Hippius address</strong> or the QR code.</li>
  <li><strong>Convert balance.</strong> Enter the amount, or click <strong>Max</strong>, and click <BgStyledText>Convert to credits</BgStyledText>. We sign the purchase from your Hippius address, and the network fee is paid in hAlpha. About 0.01 hAlpha stays on the address for fees.</li>
</Ordered>

**With an access key or a wallet.** You hold your own key, so you sign the purchase yourself. Under **Sign with**, pick this session (your 12-word access key) or the wallet extension account that is your Hippius account, enter the amount and click <BgStyledText>Sign and buy</BgStyledText>. With a wallet extension, your wallet asks you to confirm one transaction.

Either way, the conversion is protected against price moves. **Slippage tolerance** is 1% by default; you can choose 0.5%, 1% or 3%. **At least** is the smallest amount you accept. If the price moves past it before the purchase lands, the conversion is refused and your hAlpha isn't converted. If the chain refused it, the network fee is still charged.

Your balance updates once the purchase is final on chain, usually within a minute or two. The conversion shows in **Transaction history** as **Hippius tokens**. No invoice is issued for it.

:::warning Conversions are final
A conversion is an on-chain transaction. Once it is final it can't be reversed, and the hAlpha can't be refunded.
:::

If the Top up dialog has no **Hippius** tab, buying with hAlpha is paused for now. The other ways to pay still work.

## Choose a plan

Each product has its own plans page. You can get there from the product's card on Billing, or from the Upgrade and Subscribe buttons around the console.

When you subscribe, you choose how to pay:

<Unordered>
  <li><strong>Card.</strong> You pay through Stripe. The payment goes onto your balance and the plan is paid from there. Stripe keeps your card on file so it can top you up before each renewal.</li>
  <li><strong>Account balance.</strong> The plan is paid straight from what you already have. If it is not enough, the console tells you and offers a top up.</li>
</Unordered>

All plans are monthly. Hub plans are paid from your balance; paying them by card is marked coming soon.

### Drive plans

A Drive plan sets how much encrypted storage your Drive has. These are the plans at the time of writing. The console always shows the current ones.

| Plan                | Storage | Price       |
| ------------------- | ------- | ----------- |
| **Free Drive Plan** | 10 GB   | Free        |
| **Starter**         | 500 GB  | $4 / month  |
| **Plus**            | 2 TB    | $7 / month  |
| **Max**             | 10 TB   | $22 / month |
| **Scale**           | 25 TB   | $50 / month |

<Screenshot src="/img/console/billing/drive-plans.png" alt="Drive storage plans" dark raw />

**Who gets the free plan.** If you sign in with Google, GitHub, or Apple, your account comes with the Free Drive Plan, and you fall back to it if you ever cancel a paid plan. An **access key** creates a wallet-only account. It has no real email address, so it gets no lifecycle mail, and it does not include free storage, so you'll need to pick a Drive plan before your first upload. S3 and Hub work the same as on any other account.

**Subscribing** takes a minute. Pick a plan, choose how to pay and confirm. After a card payment the console shows the plan activating. That usually finishes in under a minute, and you can leave the page while it does. In the rare case a card payment goes through but the plan does not activate, the money stays on your balance and you can subscribe from there.

**Moving to a bigger or smaller plan** is paid from your balance and takes effect straight away. You can't move to a plan smaller than what you already store, so free up some space first.

**Shared drives.** Plus, Max and Scale can share a drive with other people. Anyone on any plan, including Free, can be invited.

**Cancelling** puts you back on the Free Drive Plan, or, for access key accounts, leaves you with no storage at all.

:::warning Without a plan, or over your cap, uploads stop
If your Drive has no plan, or holds more than its plan allows, you get a notice, a reminder after 7 days, and after 14 days Drive becomes **read only**: you can still open, download and delete, but nothing new can be uploaded. Nothing is deleted. Subscribing to a plan, or getting back under your cap, lifts it at the next daily check.
:::

When your Drive is full, uploads stop and the console offers a bigger plan. You can also delete something and try again.

### S3 plans {#s3-plans-and-pay-as-you-go}

S3 can be paid for in two ways.

**Pay as you go** is where everyone starts. You pay **$6 per TB per month** for what you actually store, charged by the hour from your balance, with no cap and no commitment. There is nothing to sign up for.

**A plan** gives you a block of storage for a flat monthly price, and works out cheaper once you store a few terabytes:

| Plan              | Storage | Price        | Per TB | Saving vs pay as you go |
| ----------------- | ------- | ------------ | ------ | ----------------------- |
| **S3 Pro**        | 10 TB   | $53 / month  | $5.30  | 12%                     |
| **S3 Business**   | 50 TB   | $245 / month | $4.90  | 18%                     |
| **S3 Enterprise** | 100 TB  | $465 / month | $4.65  | 22%                     |

<Screenshot src="/img/console/billing/s3-plans.png" alt="S3 storage plans and pay as you go" dark raw />

The plans page works out what you'd save based on what you store today.

Switching to a plan doesn't touch your buckets or access keys, so there's nothing to reconfigure. When you change plans, the difference is prorated. You can cancel at any time, and you go back to pay as you go automatically. The same happens if a plan ends or can't renew.

**A plan is a ceiling, not a meter.** You are never charged more than the plan price. As you get close to the limit, the console warns you. Once you reach it, new uploads pause until you upgrade or free up space.

### Hub plans

Hub plans set how much you can store in your Hub namespace. Everyone starts on the free plan (25 GB private, 100 GB public), and paid plans start at $5 a month. Hub works a little differently from Drive and S3 when you switch or cancel, so the full details are on the [Hub page](/use/console/hub#hub-plans).

## Keep track of what you pay

Billing shows every product side by side, with the plan you're on, what it costs and when it renews. Two tabs underneath give you the detail:

<Unordered>
  <li><strong>Active subscriptions</strong> lists every paid plan with its next charge. Anything past due or about to end is flagged.</li>
  <li><strong>Transaction history</strong> lists every top up, plan charge and renewal, and how each one was paid.</li>
</Unordered>

<Screenshot src="/img/console/billing/tx-history.png" alt="Billing transaction history" dark raw />

## If your balance runs out

Your balance pays for renewals and for S3 pay as you go, so running dry affects both:

<Unordered>
  <li>A plan that can't renew is marked <strong>past due</strong>, and the console asks you to top up.</li>
  <li>S3 on pay as you go becomes <strong>read only</strong> after 7 days. You can still download, but nothing new can be written. 7 days later S3 is <strong>suspended</strong> and your buckets can't be reached. 23 days after that, 37 days from the start, the data is <strong>deleted</strong>, with a final notice a week before. Any top up that covers your usage puts everything back.</li>
</Unordered>

Topping up puts everything back. To avoid it altogether, turn on **Low balance alerts** in [Settings](/use/console/settings), or set up [auto reload](#by-card).

## Older subscriptions

Before plans existed, we sold monthly subscriptions called Personal, Professional, Business and Enterprise that added a fixed amount to your balance. They are no longer on sale. If you still have one, it keeps adding to your balance every month and shows on Billing as **Your top-up subscription**. You can cancel it through Stripe, and doing so doesn't affect any of your plans.

## Where to next

<Unordered>
  <li><a href="/use/console/drive">Drive</a>: start uploading once you have a plan.</li>
  <li><a href="/use/console/s3">S3 Buckets</a>: create buckets and access keys.</li>
  <li><a href="/use/console/hub">Hub</a>: your container images and AI models.</li>
  <li><a href="/use/console/settings">Settings</a>: low balance alerts.</li>
  <li><a href="/use/compute/billing">Compute billing</a>: what VMs, databases and clusters cost by the hour.</li>
</Unordered>
