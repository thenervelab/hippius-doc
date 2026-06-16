---
id: wallet
title: Wallet
sidebar_label: Wallet
slug: /use/console/wallet
description: 8
draft: true
---

{/*
  ⚠️ This page is hidden. `draft: true` excludes it from the production
  build (no direct link works) and it is commented out of sidebars.ts.
  The full content below is preserved. To publish: remove `draft: true`
  above and re-enable the sidebar entry in sidebars.ts.
*/}

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';

## Introduction

The **Wallet** page is where you manage your **hAlpha**, the native token of the Hippius network. From here you can check your balance, send and receive tokens, stake to earn rewards, bridge between Hippius and Bittensor, and view your full transaction history.

Every action on this page is signed on chain by your connected wallet extension. **We never hold or move your funds.**

Reach Wallet from the sidebar at <BgStyledIconWithText text="Wallet" icon="WalletMinimal" />.

![Wallet page overview](/img/console/wallet/overview.png)

## Connecting Your Wallet

The console supports four browser extension wallets for signing on chain actions:

<Unordered>
  <li><strong>Polkadot.js Extension</strong>: the official Polkadot extension, minimal and reliable.</li>
  <li><strong>Talisman</strong>: feature rich, supports both Polkadot and Ethereum.</li>
  <li><strong>SubWallet</strong>: multi chain with a mobile companion app.</li>
  <li><strong>Taostats</strong>: built for Bittensor users.</li>
</Unordered>

You need one of these installed and connected before you can send, stake, bridge, or sign any transaction.

### Installing a Wallet Extension

If no extension is detected, the **Active Wallet** button in the top right corner shows <BgStyledText>Install Extension</BgStyledText>. Click it to open a panel with install links for each supported wallet.

<Ordered>
  <li>Click the install link for your preferred extension. The provider's website opens in a new tab.</li>
  <li>Install the extension and create or import an account.</li>
  <li>Return to the Hippius Console and click <BgStyledText>I've Installed an Extension</BgStyledText>.</li>
  <li>Approve the connection request from the extension.</li>
  <li>Your accounts now appear in the Active Wallet dropdown.</li>
</Ordered>

![Install extension panel](/img/console/wallet/install-extension.png)

### Selecting Your Active Wallet

Click the **Active Wallet** button in the top right (it shows a green dot, a truncated address, and a chevron). A dropdown lists every account from your connected extension.

<Ordered>
  <li>Find the account you want to use.</li>
  <li>Click <BgStyledText>Switch Wallet</BgStyledText> next to it.</li>
</Ordered>

Hover over any truncated address to see it in full. Click the copy icon to copy it, or the link icon to open it on [hipstats.com](https://hipstats.com). Your selection is remembered across sessions.

![Active wallet dropdown](/img/console/wallet/active-wallet.png)

### Disconnecting

Open the Active Wallet dropdown and click the **logout** icon at the top of the list. Your active wallet is cleared from the console. Your funds stay in your extension wallet, untouched.

## Your Balance

The **My Balance** panel on the left shows your current spendable hAlpha balance with a line chart of your balance over time.

Use the time range selector (**THIS WEEK / LAST 30 DAYS / LAST 60 DAYS / 1 YEAR / MAX**) to change the chart window. Hover over any point on the chart to see the exact balance at that moment.

### Sending hAlpha

<Ordered>
  <li>Click <BgStyledText>Send</BgStyledText> below the balance chart.</li>
  <li>Enter the <strong>recipient address</strong>, or click <BgStyledText>Address Book</BgStyledText> to pick a saved contact.</li>
  <li>Enter the <strong>amount</strong>. Click <BgStyledText>MAX</BgStyledText> to send your full transferable balance minus the gas fee.</li>
  <li>Review the summary: amount, estimated fee, and recipient.</li>
  <li>Click <BgStyledText>Send</BgStyledText>. Your wallet extension opens for signature approval.</li>
  <li>Approve in the extension. A toast confirms when the transaction is finalized, with a link to the block explorer.</li>
</Ordered>

![Send dialog](/img/console/wallet/send.png)

:::note
The **Max** button subtracts the estimated gas fee so the transaction won't fail. Your transferable balance excludes any staked, unstaking, or redeemable amounts.
:::

### Receiving hAlpha

<Ordered>
  <li>Click <BgStyledText>Receive</BgStyledText> below the balance chart.</li>
  <li>The dialog shows your deposit address as a QR code and plain text.</li>
  <li>Share the QR code with the sender, or click the copy icon to grab the address.</li>
  <li>The new balance appears within a block or two after the transfer confirms.</li>
</Ordered>

![Receive dialog](/img/console/wallet/receive.png)

## Staking hAlpha

The **Stake hAlpha** panel shows your current staking position. Depending on what's active, you'll see up to three entries:

| Entry | What it means |
|---|---|
| **Staked** | Bonded to validators. Earns staking rewards. |
| **Redeemable** | Unbonded and ready to withdraw to your free balance. |
| **Unstaking** | In the unbonding period. The clock icon shows the time remaining. |

When all three entries are showing at once, the values use a smaller font to keep everything on one line.


### Staking

<Ordered>
  <li>Click <BgStyledText>Stake hALPHA</BgStyledText> in the top right of the Stake panel.</li>
  <li>Enter the amount to stake (or click <BgStyledText>MAX</BgStyledText>).</li>
  <li>Click <BgStyledText>Stake</BgStyledText>, then review the confirmation screen showing the amount and estimated gas fee.</li>
  <li>Click <BgStyledText>Confirm Staking</BgStyledText> and approve the signature in your extension.</li>
  <li>A success screen confirms once the transaction finalizes.</li>
</Ordered>

![Stake dialog](/img/console/wallet/stake-dialog.png)

### Unstaking

The Unstake button appears only when you have a staked balance.

<Ordered>
  <li>Click <BgStyledText>Unstake</BgStyledText>.</li>
  <li>Enter the amount to unstake (or click <BgStyledText>MAX</BgStyledText>).</li>
  <li>Click <BgStyledText>Unstake</BgStyledText>, review the confirmation, then click <BgStyledText>Confirm Unstake</BgStyledText>.</li>
  <li>Approve the signature in your extension.</li>
</Ordered>

The unstaked amount enters the **Unstaking** state. After the unbonding period ends (shown by the clock icon), it moves to **Redeemable**.

![Unstake dialog](/img/console/wallet/unstake-dialog.png)

### Withdrawing

The Withdraw button appears only when you have a redeemable balance.

<Ordered>
  <li>Click <BgStyledText>Withdraw</BgStyledText>.</li>
  <li>Confirm the amount (your full redeemable balance) and click <BgStyledText>Confirm Withdraw</BgStyledText>.</li>
  <li>Approve the signature. The amount moves into your free balance.</li>
</Ordered>

![Withdraw dialog](/img/console/wallet/withdraw-dialog.png)

:::tip Hover the clock icon
The clock next to <em>Unstaking</em> shows a tooltip with each unbonding chunk listed separately, including the remaining time and amount for each. Useful if you've unstaked at different times and the chunks have different unlock dates.
:::

## Bridging Tokens

The **Bridge Tokens** button lets you move tokens between the **Hippius** and **Bittensor** networks. hAlpha and Bittensor Alpha are pegged 1:1.

<Ordered>
  <li>Click <BgStyledText>Bridge Tokens</BgStyledText> in the Stake panel.</li>
  <li>Choose the direction: <strong>Bridge Alpha to hAlpha</strong> or <strong>Bridge hAlpha to Alpha</strong>.</li>
  <li>Enter the amount to bridge.</li>
  <li>Review the estimated time, bridge fee, and destination address.</li>
  <li>Click <BgStyledText>Bridge</BgStyledText>, then <BgStyledText>Confirm Bridge</BgStyledText> on the confirmation screen.</li>
  <li>Approve the signature in your extension.</li>
  <li>The dialog tracks progress and shows a success screen when the destination chain confirms.</li>
</Ordered>

![Bridge dialog](/img/console/wallet/bridge-dialog.png)

You can track in flight bridge operations in the **Bridge Transactions** tab at the bottom of the page.

:::warning Gas fees for Alpha → hAlpha
You need a small amount of TAO on the source side to cover gas. If you see <em>"Failed to add escrow proxy. Please ensure you have enough TAO for gas fees"</em>, top up TAO in your source wallet and try again.
:::

For more on the bridge, see [Bridge Tokens](/use/bridge).

## Transaction History

The **Transaction History** tab shows every incoming and outgoing hAlpha transfer for your active wallet.

| Column | What it shows |
|---|---|
| **Block** | The block number. Click to open it on hipstats. |
| **Amount (hALPHA)** | The transfer amount. |
| **From / To** | Sender and recipient addresses (truncated, with copy icons). |
| **Transaction Type** | Sent or Received, relative to your active wallet. |
| **Date** | Local time timestamp. |

Use the search box to filter by address, click any column header to sort, and use pagination to move between pages.

![Transaction history tab](/img/console/wallet/tx-history.png)

## Bridge Transactions

The **Bridge Transactions** tab lists every bridge operation. Each row shows the direction, amount, status (Pending / Completed / Failed), source and destination transaction hashes with explorer links, and the date the bridge was initiated.

![Bridge transactions tab](/img/console/wallet/bridge-tx.png)

## Address Book

The **Address Book** tab lets you save frequently used wallet addresses with friendly names, so you can pick them from a list when sending instead of pasting long addresses every time.

### Adding an Address

<Ordered>
  <li>Click <BgStyledText>+ New Address</BgStyledText>.</li>
  <li>Enter a <strong>name</strong> (e.g. <em>"Alice's wallet"</em>) and the <strong>wallet address</strong>.</li>
  <li>Click <BgStyledText>Save</BgStyledText>. The dialog validates the address format before saving.</li>
</Ordered>

![Add new address dialog](/img/console/wallet/add-address.png)

### Editing or Removing

Click the action menu on any address row to **Edit** the details or **Delete** the entry (with a confirmation dialog).

The address book is stored in your local browser. It is not synced across devices.

### Using a Saved Address When Sending

When you open the Send dialog, click <BgStyledText>Address Book</BgStyledText> in the recipient field to open a quick pick list of your saved contacts. Click one to fill the address in automatically.

## Where to next

<Unordered>
  <li><a href="/use/console/billing">Billing</a>: convert hAlpha or fiat into platform credits.</li>
  <li><a href="/use/bridge">Bridge Tokens</a>: full bridge guide with troubleshooting.</li>
  <li><a href="/learn/substrate-staking">Substrate Staking</a>: how the staking mechanism works at the protocol level.</li>
</Unordered>
