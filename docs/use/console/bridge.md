---
id: bridge
title: Bridge
sidebar_label: Bridge
slug: /use/console/bridge
description: Move tokens between Bittensor and Hippius from the console. Covers both bridge directions, the wallet signatures involved, and how to track a bridge in progress.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';

## Introduction

The bridge moves tokens between the **Bittensor** network (Alpha) and the **Hippius** network (hAlpha). The two are pegged 1:1, so bridging changes which network holds your tokens, not how many you have.

You bridge from the **Bridge Tokens** panel at the bottom of the Stake card on the [Wallet](/use/console/wallet) page.

![Bridge dialog](/img/console/wallet/bridge-dialog.png)

## Choosing a Direction

The dialog handles both directions:

<Unordered>
  <li><strong>Bridge Alpha to hAlpha</strong>: brings tokens from Bittensor into Hippius, so you can stake them or pay for storage.</li>
  <li><strong>Bridge hAlpha to Alpha</strong>: sends tokens back out to Bittensor.</li>
</Unordered>

Before you confirm, the dialog shows the estimated time and the gas fees involved.

## Bridging Alpha to hAlpha

This direction is the more involved one, because the work happens on Bittensor and needs several signatures.

<Ordered>
  <li>Click <BgStyledText>Bridge Tokens</BgStyledText> on the Wallet page.</li>
  <li>Choose <strong>Bridge Alpha to hAlpha</strong>.</li>
  <li>Enter the amount to bridge.</li>
  <li>Read the <strong>Before you bridge</strong> panel and tick <BgStyledText>I understand and accept these risks</BgStyledText>.</li>
  <li>Click <BgStyledText>Confirm Bridge</BgStyledText>.</li>
  <li>Approve each signature in your wallet extension as it is requested.</li>
</Ordered>

### The signatures you will be asked for

This is not a single approval. The dialog warns you up front that **multiple wallet confirmations** are required on Bittensor, normally three:

| Step | What it does |
|---|---|
| **Add Proxy** | Authorizes the escrow contract on Bittensor. |
| **Deposit Alpha** | Deposits your staked Alpha into the bridge contract. |
| **Remove Proxy** | Revokes the bridge's access again once the deposit is done. |

If your Alpha is staked with a validator the bridge cannot deposit from, a fourth step, **Move Stake to Validator**, is added at the front and the dialog tells you it needs four signatures instead of three.

:::warning Do not close the tab mid-bridge
Each signature has to be approved in order. If you try to navigate away while a bridge is running, the console asks whether to **Stay on this page** or **Leave anyway**. Staying is almost always the right answer. You can use <BgStyledText>Minimize</BgStyledText> to keep the progress visible while you work elsewhere in the console.
:::

:::warning You need TAO for gas
The Bittensor side of the bridge is paid for in TAO. If you see *"Failed to add escrow proxy. Please ensure you have enough TAO for gas fees"*, top up TAO in your source wallet and try again.
:::

## Bridging hAlpha to Alpha

<Ordered>
  <li>Click <BgStyledText>Bridge Tokens</BgStyledText> and choose <strong>Bridge hAlpha to Alpha</strong>.</li>
  <li>Enter the amount and review the estimated time and fees.</li>
  <li>Click <BgStyledText>Confirm Bridge</BgStyledText> and approve the signature.</li>
  <li>The dialog tracks progress and confirms when the destination chain settles.</li>
</Ordered>

:::note Staked hAlpha cannot be bridged
Only your transferable balance can leave the network. Unstake first, wait out the unbonding period, and withdraw before bridging. See [Staking](/use/console/staking).
:::

## Tracking a Bridge

While a bridge runs, the dialog shows each step as it completes. You can minimize it and keep working.

Once it finishes, every bridge operation is listed in the **Bridge Transactions** tab at the bottom of the Wallet page. Each row shows the direction, amount, status (Pending, Completed or Failed), the source and destination transaction hashes with explorer links, and the date it was started.

![Bridge transactions tab](/img/console/wallet/bridge-tx.png)

Regular hAlpha transfers are not shown here. Those live in the **Transaction History** tab, covered in the [Wallet guide](/use/console/wallet).

## Troubleshooting

**The bridge failed partway through.** The dialog reports which step failed. Because **Add Proxy** and **Remove Proxy** are separate transactions, a failure between them can leave the proxy in place. Retrying the bridge is safe and the flow re-runs from the start.

**Nothing arrived after the estimated time.** Check the **Bridge Transactions** tab for the status and open the source transaction hash in the explorer to confirm it settled on the origin chain.

**"Please enter a valid amount to bridge".** A minimum amount applies. Raise the amount and try again.

## Where to next

<Unordered>
  <li><a href="/use/console/wallet">Wallet</a>: balances, sending, receiving and transaction history.</li>
  <li><a href="/use/console/staking">Staking</a>: put bridged hAlpha to work.</li>
  <li><a href="/use/bridge">Bridge Tokens</a>: how the bridge works underneath, including the guardian network.</li>
</Unordered>
