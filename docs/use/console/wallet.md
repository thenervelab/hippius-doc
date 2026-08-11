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

We want to be clear about one thing up front: every action on this page is signed on chain by your own wallet extension. **We never hold or move your funds.** We cannot reverse a transaction for you, and we cannot recover tokens sent to the wrong address.

Reach Wallet from the sidebar at <BgStyledIconWithText text="Wallet" icon="WalletMinimal" />. The page header reads **Your Balance**, with your active account on the right.

![Wallet page overview](/img/console/wallet/overview.png)

Staking and bridging live on this same page, but we have given them their own guides because there is more to explain than fits here:

<Unordered>
  <li><a href="/use/console/staking">Staking</a>: stake hAlpha, unstake it, and withdraw once it unlocks.</li>
  <li><a href="/use/console/bridge">Bridge</a>: move tokens between Hippius and Bittensor.</li>
</Unordered>

## Connecting Your Wallet

You need a browser extension wallet before you can send, stake, bridge, or sign anything. We support four:

| Extension | Notes |
|---|---|
| **Taostats Wallet** | Built for Bittensor. This is the one we recommend, and we list it first. |
| **Polkadot.js** | The official Polkadot extension, minimal and reliable. |
| **Talisman** | Feature rich, supports both Polkadot and Ethereum. |
| **SubWallet** | Multi chain, with a mobile companion app. |

:::tip We read every extension you have installed
You are not limited to one. We aggregate accounts from every extension we detect and remove duplicates, so an account held in two extensions appears once. The recommended extension only decides the ordering and which one signs by default.
:::

### Installing a Wallet Extension

If we cannot detect an extension, the button in the top right shows <BgStyledText>Install Extension</BgStyledText>. Click it to open a panel with install links.

<Ordered>
  <li>Click the install link for the extension you want. The provider's website opens in a new tab.</li>
  <li>Install it, then create or import an account.</li>
  <li>Come back to the console and click <BgStyledText>Refresh</BgStyledText> so we pick up the newly installed extension.</li>
  <li>Approve the connection request when the extension asks.</li>
  <li>Your accounts now appear in the wallet dropdown.</li>
</Ordered>

![Install extension panel](/img/console/wallet/install-extension.png)

### Selecting Your Active Wallet

The selector in the top right shows your connected account. Click it to open the list of every account we found.

<Ordered>
  <li>Find the account you want to use.</li>
  <li>Click <BgStyledText>Select Wallet</BgStyledText> next to it.</li>
</Ordered>

Hover a truncated address to see it in full. Click the copy icon to copy it, or the link icon to open it on [hipstats.com](https://hipstats.com). We remember your choice across sessions.

![Active wallet dropdown](/img/console/wallet/active-wallet.png)

### Disconnecting

Open the wallet dropdown and click the **logout** icon at the top of the list. We clear the active wallet from the console. Your funds stay in your extension, untouched.

### Hiding Your Balances

If you are sharing your screen or working somewhere public, click the eye icon next to a panel heading to hide sensitive wallet information. Your balances are masked until you toggle it back. This only changes what is displayed, nothing else.

## Your Balance

The **My Balance** panel on the left shows your spendable hAlpha with a chart of your balance over time.

Use the range selector (**THIS WEEK / LAST 30 DAYS / LAST 60 DAYS / 1 YEAR / MAX**) to change the window. Hover any point on the chart to see the exact balance at that moment.

:::note What spendable leaves out
Your spendable balance excludes anything staking is holding: staked, unstaking, and redeemable amounts. See [Staking](/use/console/staking) for what each of those states means.
:::

### Receiving hAlpha

<Ordered>
  <li>Click <BgStyledText>Receive</BgStyledText> below the balance chart.</li>
  <li>We show your deposit address as a QR code and as plain text.</li>
  <li>Share the QR code with the sender, or click the copy icon to grab the address.</li>
  <li>The new balance appears within a block or two of the transfer confirming.</li>
</Ordered>

![Receive dialog](/img/console/wallet/receive.png)

### Sending hAlpha

<Ordered>
  <li>Click <BgStyledText>Send</BgStyledText> below the balance chart.</li>
  <li>Enter the recipient address, or pick a saved contact from your address book.</li>
  <li>Enter the amount. We validate it against your available balance as you type.</li>
  <li>Review the summary: amount, estimated fee, and recipient.</li>
  <li>Click <BgStyledText>Send hALPHA</BgStyledText>. Your extension opens for approval.</li>
  <li>Approve it. We confirm with a toast once the transaction finalizes, including a link to the explorer.</li>
</Ordered>

![Send dialog](/img/console/wallet/send.png)

We block a few things before they reach the chain, so you may see one of these:

<Unordered>
  <li><em>"Invalid address format"</em>: the address is not a valid Substrate address.</li>
  <li><em>"Cannot send to your own address"</em>: pick a different recipient.</li>
  <li><em>"Amount exceeds your available balance"</em>: remember that staked and unstaking hAlpha is not spendable.</li>
</Unordered>

## Transaction History

The **Transaction History** tab shows every incoming and outgoing hAlpha transfer for your active wallet.

| Column | What it shows |
|---|---|
| **BLOCK** | The block number. Click to open it on hipstats. |
| **AMOUNT (hALPHA)** | The transfer amount. |
| **FROM / TO** | Sender and recipient addresses, truncated, with copy icons. |
| **TRANSACTION TYPE** | Sent or Received, relative to your active wallet. |
| **TRANSACTION DATE** | Timestamp in your local time. |

Use the search box to filter by address, click a column header to sort, and page through with the pagination controls.

![Transaction history tab](/img/console/wallet/tx-history.png)

Bridge operations are not listed here. We keep those in their own **Bridge Transactions** tab, covered in the [Bridge guide](/use/console/bridge).

## Address Book

The **Address Book** tab lets you save addresses under friendly names, so you can pick one from a list when sending instead of pasting a long address every time.

The table lists **NAME**, **WALLET ADDRESS** and **DATE ADDED**.

### Adding an Address

<Ordered>
  <li>Click <BgStyledText>+ New Address</BgStyledText>.</li>
  <li>Enter a name (for example <em>"Alice's wallet"</em>) and the wallet address.</li>
  <li>Click <BgStyledText>Save</BgStyledText>. We validate the address format before saving it.</li>
</Ordered>

![Add new address dialog](/img/console/wallet/add-address.png)

### Editing or Removing

Click the action menu on any row to **Edit** the entry or **Delete** it. We ask you to confirm before deleting.

:::warning We store this in your browser, not on our servers
Your address book lives in local browser storage. We do not sync it across devices, and clearing your browser data removes it. Keep your own copy of any address you cannot afford to lose.
:::

### Using a Saved Address When Sending

In the Send dialog, open the address book from the recipient field to see your saved contacts. Click one and we fill the address in for you.

## Where to next

<Unordered>
  <li><a href="/use/console/staking">Staking</a>: put your hAlpha to work and earn rewards.</li>
  <li><a href="/use/console/bridge">Bridge</a>: move tokens between Hippius and Bittensor.</li>
  <li><a href="/use/console/billing">Billing</a>: convert hAlpha or fiat into platform credits.</li>
</Unordered>
