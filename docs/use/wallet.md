---
id: wallet
title: Wallet
sidebar_label: Wallet
slug: /use/wallet
---

import Ordered from '@site/src/components/Ordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Icon from '@site/src/components/Icon';

## Introduction

The Hippius Wallet gives you full control of your hAlpha tokens. You can send and receive tokens, view your balance and transaction history, manage an address book, and connect browser extension wallets to sign transactions securely.

Your wallet balance is fully accessible and you can transfer funds at any time. Every transaction is recorded on the Hippius blockchain.

## Connecting Your Wallet

Hippius supports browser extension wallets (Polkadot.js, Talisman, SubWallet) for signing transactions. You must connect a wallet extension before you can send, stake, or bridge tokens.

### Installing a Wallet Extension

If no wallet extension is detected, the **Active Wallet** selector will display an **Install Extension** prompt with links to the supported extensions:

- **Polkadot.js Extension**
- **Talisman**
- **SubWallet**

<Ordered>
  <li>Click the <BgStyledText>Active Wallet</BgStyledText> dropdown in the top-right corner.</li>
  <li>Click the install link for your preferred wallet extension.</li>
  <li>Install the extension in your browser and create or import an account.</li>
  <li>Return to Hippius and click <BgStyledText>I've Installed an Extension</BgStyledText>.</li>
  <li>Approve the Hippius connection request in your wallet extension when prompted.</li>
</Ordered>

![Install Extension](/img/wallet/install-extension.png)

### Selecting an Active Wallet

Once connected, all your extension accounts appear in the **Active Wallet** dropdown. The active wallet is the account used for all transactions on the current page.

<Ordered>
  <li>Click the <BgStyledText>Active Wallet</BgStyledText> dropdown (shows a green dot and your current address).</li>
  <li>Browse your available wallets — each entry shows the account name, truncated address, and a copy button.</li>
  <li>Click <BgStyledText>Switch Wallet</BgStyledText> next to the account you want to use.</li>
</Ordered>

Your selection is remembered across sessions. If you close and reopen the app, the same wallet will be active.
![Active Wallets](/img/wallet/active-wallets.png)


:::tip
Hover over a truncated address to see the full wallet address. Click the copy icon to copy it to your clipboard.
:::

### Disconnecting Your Wallet

You can disconnect your wallet extension at any time without losing your funds.

<Ordered>
  <li>Click the <BgStyledText>Active Wallet</BgStyledText> dropdown.</li>
  <li>Click the <BgStyledText>Disconnect</BgStyledText> (logout) icon in the header of the wallet list.</li>
</Ordered>

To reconnect, click <BgStyledText>Connect Wallet</BgStyledText> in the dropdown and approve the connection in your extension.

## Wallet Overview

The Wallet page displays three widget cards at a glance:

| Widget | What It Shows |
|---|---|
| **Native Balance** | Your current hALPHA balance with Send and Receive buttons |
| **Stake hAlpha** | Your staked amount, locked balance, unbonding status, redeemable funds, and quick actions |
| **Bridge Tokens** | A shortcut to bridge tokens between Alpha and hAlpha |

Below the widgets you'll find a **Balance Overview** chart and tabs for **Transaction History** and **Address Book**.

![Wallet Overview](/img/wallet/wallet-overview.png)

## Sending Balance

You can send hAlpha to any wallet on the Hippius blockchain.

<Ordered>
  <li>Open the Wallet page and ensure the correct <BgStyledText>Active Wallet</BgStyledText> is selected.</li>
  <li>Click <BgStyledText>Send Balance</BgStyledText>.</li>
  <li>Enter the recipient's wallet address, or select one from your Address Book.</li>
  <li>Enter the amount to send. Click <BgStyledText>Max</BgStyledText> to send your full balance minus the transaction fee.</li>
  <li>Click <BgStyledText>Send</BgStyledText>.</li>
  <li>Review the confirmation dialog and confirm the transaction.</li>
  <li>If using a browser extension wallet, approve the transaction in your extension when prompted.</li>
</Ordered>

A loading notification will appear while the transaction is being processed. You'll receive a success notification with the block hash once it's confirmed.

![Send balance modal](/img/wallet/send-balance.png)

:::note
The transaction fee is automatically deducted. If your balance is too low to cover the fee, you'll see an error before the dialog opens.
:::

## Receiving Balance

<Ordered>
  <li>Open the Wallet page.</li>
  <li>Click <BgStyledText>Receive Balance</BgStyledText>.</li>
  <li>Scan the QR code with your phone, or click the copy button next to your deposit address.</li>
  <li>Send tokens to this address from any Hippius-compatible wallet.</li>
</Ordered>

![Receive balance modal](/img/wallet/receive-balance.png)

## Balance Overview Chart

The Balance Overview chart tracks your balance over time. Use the time range selector to view:

- **Last 7 Days** (default)
- **Last 30 Days**
- **Last 60 Days**
- **1 Year**
- **MAX** (all time)

Hover over the chart to see the exact balance at any point in time.

## Transaction History

The **Transaction History** tab shows all your incoming and outgoing token transfers:

| Column | Description |
|---|---|
| Block | The blockchain block number |
| Amount | The transfer amount in hALPHA |
| From | The sender's address (click to copy) |
| To | The recipient's address (click to copy) |
| Transaction Type | **Sent** or **Received** (relative to your active wallet) |
| Transaction Date | When the transaction was confirmed |

You can sort by block number, amount, or date. Results are paginated at 10 per page.

![Transaction History](/img/wallet/transaction-history.png)

:::tip
Switching your Active Wallet will update the transaction history to show transfers for the newly selected account.
:::

## Address Book {#address-book}

The Address Book lets you save wallet addresses you frequently send tokens to.

![Add new address modal](/img/wallet/address-book.png)

### Adding a New Address

<Ordered>
  <li>Navigate to the <BgStyledText>Address Book</BgStyledText> tab on the Wallet page.</li>
  <li>Click <BgStyledText>New Address</BgStyledText>.</li>
  <li>Enter a name and wallet address.</li>
  <li>Click <BgStyledText>Save</BgStyledText>.</li>
</Ordered>

### Editing or Deleting an Address

Click the action menu (three dots) on any address entry to **Edit** or **Delete** it.
