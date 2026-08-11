---
id: wallet
title: Wallet
sidebar_label: Wallet
slug: /use/console/wallet
description: Manage your hAlpha balance in the Hippius Console. Connect a wallet extension, send and receive tokens, review your transaction history, and save addresses.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';

## Introduction

The **Wallet** page is where you manage your **hAlpha**, the native token of the Hippius network. From here you can check your balance, send and receive tokens, and keep a record of everything that has moved in or out of your account.

Every action on this page is signed on chain by your connected wallet extension. **We never hold or move your funds.**

Reach Wallet from the sidebar at <BgStyledIconWithText text="Wallet" icon="WalletMinimal" />.

![Wallet page overview](/img/console/wallet/overview.png)

Staking and bridging live on this same page but have their own guides, because there is more to explain than fits here:

<Unordered>
  <li><a href="/use/console/staking">Staking</a>: stake hAlpha, unstake it, and withdraw once it unlocks.</li>
  <li><a href="/use/console/bridge">Bridge</a>: move tokens between Hippius and Bittensor.</li>
</Unordered>

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

:::note What "spendable" excludes
Your transferable balance leaves out anything staking is holding: staked, unstaking, and redeemable amounts. See [Staking](/use/console/staking) for what those states mean.
:::

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
The **MAX** button subtracts the estimated gas fee so the transaction won't fail.
:::

### Receiving hAlpha

<Ordered>
  <li>Click <BgStyledText>Receive</BgStyledText> below the balance chart.</li>
  <li>The dialog shows your deposit address as a QR code and plain text.</li>
  <li>Share the QR code with the sender, or click the copy icon to grab the address.</li>
  <li>The new balance appears within a block or two after the transfer confirms.</li>
</Ordered>

![Receive dialog](/img/console/wallet/receive.png)

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

Bridge operations are not listed here. They have their own **Bridge Transactions** tab, covered in the [Bridge guide](/use/console/bridge).

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

:::warning Stored in this browser only
The address book lives in your local browser storage. It is not synced across devices, and clearing your browser data removes it.
:::

### Using a Saved Address When Sending

When you open the Send dialog, click <BgStyledText>Address Book</BgStyledText> in the recipient field to open a quick pick list of your saved contacts. Click one to fill the address in automatically.

## Where to next

<Unordered>
  <li><a href="/use/console/staking">Staking</a>: put your hAlpha to work and earn rewards.</li>
  <li><a href="/use/console/bridge">Bridge</a>: move tokens between Hippius and Bittensor.</li>
  <li><a href="/use/console/billing">Billing</a>: convert hAlpha or fiat into platform credits.</li>
</Unordered>
