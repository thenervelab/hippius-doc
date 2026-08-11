---
id: staking
title: Staking
sidebar_label: Staking
slug: /use/console/staking
description: Stake hAlpha from the Hippius Console to earn rewards. Understand the staked, unstaked, unstaking and redeemable states, and how to unstake and withdraw.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';

## Introduction

Staking locks your hAlpha to help secure the Hippius network, and pays you rewards for doing it. hAlpha sitting in your balance earns nothing, so staking is how you put it to work.

You stake from the **Stake hAlpha** panel on the [Wallet](/use/console/wallet) page. Everything here is signed by your wallet extension, and your tokens never leave your account.

:::info You do not pick a validator
The console stakes on your behalf. There is no validator list to choose from, so staking is a single amount-and-confirm step.
:::

## Reading the Stake Panel

The panel leads with the number that matters most, the amount you currently have staked, followed by your total position.

Underneath, a coloured bar shows how much of your hAlpha is actually working. Each state gets a segment sized to its share, and only states you actually hold appear.

| State | Colour | What it means |
|---|---|---|
| **Staked** | Blue | Bonded and earning rewards. |
| **Unstaking** | Amber | In the unbonding period, not yet withdrawable. |
| **Redeemable** | Green | Finished unbonding, ready to withdraw. |
| **Unstaked** | Grey | Held but not put to work. This is what you can stake right now. |

:::tip Unstaked is your headroom
If you have been paid as a miner, your rewards land in your free balance and show up as **Unstaked**. That figure is the same one the Stake dialog offers as **MAX**, so the panel and the dialog can never disagree.
:::

Hover the clock icon next to **Unstaking** to open **Unbonding Details**, which lists each unbonding chunk separately with its own amount and remaining time. That matters if you unstaked on different days, because each chunk unlocks on its own schedule.

### The hAlpha Coefficient

Below the balances, the panel shows the **hAlpha Coef.** as a percentage, followed by *(network average, varies)* and a **View on Hipstats** link.

This is a network-wide average, not a promise about your account. It moves with network activity, so treat it as an indication of what staking is currently returning rather than a fixed rate. Click **View on Hipstats** for the full staking breakdown on [hipstats.com](https://hipstats.com).

## Staking hAlpha

<Ordered>
  <li>Open the <a href="/use/console/wallet">Wallet</a> page and confirm the correct account is selected in <strong>Active Wallet</strong>.</li>
  <li>Click <BgStyledText>Stake hALPHA</BgStyledText> in the top right of the Stake panel.</li>
  <li>Enter the amount to stake, or click <BgStyledText>MAX</BgStyledText> to stake everything available.</li>
  <li>Click <BgStyledText>Stake</BgStyledText> and review the confirmation showing the amount and estimated gas fee.</li>
  <li>Click <BgStyledText>Confirm Staking</BgStyledText> and approve the signature in your extension.</li>
  <li>A success screen confirms once the transaction finalizes.</li>
</Ordered>

![Stake dialog](/img/console/wallet/stake-dialog.png)

:::note MAX leaves room for gas
**MAX** holds back a small amount so you can still pay the transaction fee. Staking your entire balance to the last token would leave you unable to sign anything afterwards, including the unstake.
:::

## Unstaking

The **Unstake** button appears only when you have a staked balance.

<Ordered>
  <li>Click <BgStyledText>Unstake</BgStyledText>.</li>
  <li>Enter the amount to unstake, or click <BgStyledText>MAX</BgStyledText>.</li>
  <li>Click <BgStyledText>Unstake</BgStyledText>, review the confirmation, then click <BgStyledText>Confirm Unstake</BgStyledText>.</li>
  <li>Approve the signature in your extension.</li>
</Ordered>

![Unstake dialog](/img/console/wallet/unstake-dialog.png)

The amount moves into **Unstaking** and stops earning rewards immediately. Once the unbonding period ends it becomes **Redeemable**.

:::warning Unstaking is not instant
Unbonded tokens are locked for the full unbonding period before you can withdraw them. Plan ahead if you need the tokens for something else.
:::

## Withdrawing

The **Withdraw** button appears once you have a redeemable balance. While tokens are still unbonding the button stays disabled, and hovering it tells you roughly how long is left.

<Ordered>
  <li>Click <BgStyledText>Withdraw</BgStyledText>.</li>
  <li>Confirm the amount, which is your full redeemable balance, and click <BgStyledText>Confirm Withdraw</BgStyledText>.</li>
  <li>Approve the signature. The amount moves into your free balance and shows as <strong>Unstaked</strong>.</li>
</Ordered>

![Withdraw dialog](/img/console/wallet/withdraw-dialog.png)

## Troubleshooting

**The panel shows "Couldn't load staking info".** The console could not reach the chain, which usually happens on a fresh page reload before the connection is established. Click retry on the panel.

**My rewards are not showing.** Rewards are paid per era, and a newly bonded stake does not earn for the era already in progress. Give it at least one full era before comparing figures.

**MAX stakes less than my full balance.** That is deliberate, see the note above about leaving room for gas.

## Where to next

<Unordered>
  <li><a href="/use/console/wallet">Wallet</a>: balances, sending, receiving and transaction history.</li>
  <li><a href="/use/console/bridge">Bridge</a>: move tokens between Hippius and Bittensor.</li>
  <li><a href="/learn/substrate-staking">Substrate Staking</a>: how the staking mechanism works at the protocol level.</li>
</Unordered>
