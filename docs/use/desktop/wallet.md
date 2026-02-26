---
id: wallet
title: Wallet
sidebar_label: Wallet
slug: /use/desktop/wallet
---

import Ordered from '@site/src/components/Ordered';
import UnOrdered from '@site/src/components/UnOrdered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Icon from '@site/src/components/Icon';

## Introduction

The Hippius Desktop Wallet provides complete control over your hAlpha tokens with local wallet management. Unlike the web version, the desktop app stores encrypted wallet data locally on your device, providing enhanced security and offline access to your wallet addresses.

You can create new wallets, import existing ones via mnemonic phrases or backup files, send and receive tokens, view your balance and transaction history, and manage an address book — all secured with your personal password.

## Getting Started

When you first launch Hippius Desktop, you'll be guided through wallet setup. You have three options:

- **Enter an existing mnemonic** to use a wallet you already have
- **Create a new wallet** with a fresh mnemonic phrase
- **Import a wallet** from a backup file

### Creating a New Wallet

<Ordered>
  <li>When you first open the wallet page, a unique 12-word mnemonic phrase is automatically generated and displayed on screen.</li>
  <li><strong>Write down this phrase and store it securely</strong> — this is the only way to recover your wallet if you lose access.</li>
  <li>Click <BgStyledText>I've Saved My Mnemonic</BgStyledText> to continue.</li>
  <li>Enter a name for your wallet (e.g., "Main Wallet").</li>
  <li>Create a strong password to encrypt your wallet.</li>
  <li>Confirm your password and click <BgStyledText>Create Wallet</BgStyledText>.</li>
</Ordered>

![Create New Wallet](/img/desktop/wallet/create-wallet.png)

:::warning Important
Your mnemonic phrase is the master key to your wallet. Anyone with access to it can control your funds. Never share it, never store it digitally in plain text, and never enter it on websites or apps you don't trust.
:::

### Importing a Wallet with Mnemonic

If you have an existing mnemonic phrase from another wallet:

<Ordered>
  <li>On the Welcome screen, click on <BgStyledText>Add Existing Wallet</BgStyledText> and enter your mnemonic phrase in the input field.</li>
  <li>Click <BgStyledText>Next</BgStyledText>.</li>
  <li>Enter the password you want to use for this wallet in Hippius Desktop.</li>
  <li>Click <BgStyledText>Access Wallet</BgStyledText>.</li>
</Ordered>

Alternatively, you can click <BgStyledText>Import Wallet</BgStyledText> to import from a backup file:

<Ordered>
  <li>Click <BgStyledText>Import Wallet</BgStyledText> on the Welcome screen.</li>
  <li>Click <BgStyledText>Select Backup File</BgStyledText> and choose your `.zip` backup file.</li>
  <li>Enter the password that was used when the backup was created.</li>
  <li>Click <BgStyledText>Import Wallet</BgStyledText>.</li>
</Ordered>

![Import Wallet](/img/desktop/wallet/import-wallet.png)

## How Transaction Signing Works

Hippius Desktop uses a secure password-based signing model:

<UnOrdered>
<li> Your mnemonic phrase is **encrypted** with your password and stored locally</li>
<li> When you perform any transaction (send, stake, unstake, bridge), you're prompted to enter your password</li>
<li> The password **temporarily decrypts** your mnemonic to sign the transaction</li>
<li> After signing, the decrypted mnemonic is immediately cleared from memory</li>
</UnOrdered>

This means you don't need to "unlock" your wallet upfront — your wallet is effectively locked at all times, and you authenticate each transaction individually.

:::tip
This design provides enhanced security: even if someone gains access to your device, they cannot make transactions without knowing your password.
:::

## Wallet Overview

The Wallet page displays three widget cards at a glance:

| Widget | What It Shows |
|---|---|
| **Native Balance** | Your current hALPHA balance with Send and Receive buttons |
| **Stake hAlpha** | Your staked amount, locked balance, unbonding status, redeemable funds, and quick actions |
| **Bridge Tokens** | A shortcut to bridge tokens between Alpha and hAlpha |

Below the widgets you'll find a **Balance Overview** chart and tabs for **Transaction History** and **Address Book**.

![Wallet Overview](/img/desktop/wallet/wallet-overview.png)

## Managing Multiple Wallets

Hippius Desktop supports multiple local wallets. You can switch between them, add new ones, or remove wallets you no longer need.

### Switching Wallets

<Ordered>
  <li>Click the <BgStyledText>Active Wallet</BgStyledText> dropdown in the top-right corner of the Wallet page.</li>
  <li>Your local wallets are listed with their names and truncated addresses.</li>
  <li>Click <BgStyledText>Switch Wallet</BgStyledText> next to the wallet you want to use.</li>
</Ordered>

Your selection is remembered across sessions. When you make a transaction, you'll be prompted for the password of the currently active wallet.

![Switch Wallet](/img/desktop/wallet/switch-wallet.png)

### Adding a New Wallet

You can add additional wallets at any time:

<Ordered>
  <li>Click the <BgStyledText>Active Wallet</BgStyledText> dropdown.</li>
  <li>Click <BgStyledText>Add Wallet</BgStyledText>.</li>
  <li>Choose to create a new wallet or import an existing one.</li>
  <li>Follow the same steps as initial wallet setup.</li>
</Ordered>

## Wallet Settings

Access wallet management options through the Wallet Settings:

<Ordered>
  <li>Click the <BgStyledText>Settings</BgStyledText> menu item or alernatively you can click on the <BgStyledText>Settings</BgStyledText> icon in wallet selection dialog.</li>
  <li>Navigate to the <BgStyledText>Wallet Settings</BgStyledText> tab.</li>
</Ordered>

### Wallet Table

The Wallet Settings tab displays a table of all your local wallets with:

| Column | Description |
|---|---|
| **Wallet** | Name and truncated address (click to copy) |
| **Date** | When the wallet was added |
| **Status** | Active indicator |
| **Actions** | Three-dot menu with Edit, Export, and Delete options |

![Wallet Settings](/img/desktop/wallet/wallet-settings.png)

### Editing a Wallet Name

<Ordered>
  <li>Click the three-dot menu (⋮) in the Actions column next to the wallet you want to edit.</li>
  <li>Select <BgStyledText>Edit</BgStyledText> from the dropdown.</li>
  <li>Enter a new name.</li>
  <li>Click <BgStyledText>Save</BgStyledText>.</li>
</Ordered>

### Exporting a Wallet Backup

Export your wallet as an encrypted backup file to restore it later or transfer to another device:

<Ordered>
  <li>Click the three-dot menu (⋮) in the Actions column next to the wallet you want to export.</li>
  <li>Select <BgStyledText>Export</BgStyledText> from the dropdown.</li>
  <li>Choose where to save the <code>.zip</code> backup file.</li>
  <li>The backup contains your encrypted wallet data — you'll need your original password to import it later.</li>
</Ordered>

:::note
The exported backup is encrypted with your wallet password. Keep both the backup file and your password safe.
:::

### Deleting a Wallet

<Ordered>
  <li>Click the three-dot menu (⋮) in the Actions column next to the wallet you want to delete.</li>
  <li>Select <BgStyledText>Delete</BgStyledText> from the dropdown.</li>
  <li>Review the warning — this action cannot be undone unless you have a backup or your mnemonic phrase.</li>
  <li>Click <BgStyledText>Confirm Delete</BgStyledText>.</li>
</Ordered>

:::warning
Deleting a wallet removes it from Hippius Desktop permanently. Make sure you have your mnemonic phrase saved or a backup file exported before deleting.
:::

## Sending Balance

You can send hAlpha to any wallet on the Hippius blockchain.

<Ordered>
  <li>Open the Wallet page and ensure the correct wallet is active.</li>
  <li>Click <BgStyledText>Send Balance</BgStyledText>.</li>
  <li>Enter the recipient's wallet address, or select one from your Address Book.</li>
  <li>Enter the amount to send. Click <BgStyledText>Max</BgStyledText> to send your full balance minus the transaction fee.</li>
  <li>Click <BgStyledText>Send</BgStyledText>.</li>
  <li>A confirmation dialog appears showing the transaction details (amount, recipient, wallet).</li>
  <li>Enter your wallet password to decrypt your mnemonic and sign the transaction.</li>
  <li>Click <BgStyledText>Confirm</BgStyledText>.</li>
</Ordered>

A loading notification will appear while the transaction is being processed. You'll receive a success notification with the block hash once it's confirmed.

![Send Balance](/img/desktop/wallet/send-balance.png)

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

![Receive Balance](/img/desktop/wallet/receive-balance.png)

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

![Transaction History](/img/desktop/wallet/transaction-history.png)

:::tip
Switching your active wallet will update the transaction history to show transfers for the newly selected account.
:::

## Address Book {#address-book}

The Address Book lets you save wallet addresses you frequently send tokens to.

![Address Book](/img/desktop/wallet/address-book.png)

### Adding a New Address

<Ordered>
  <li>Navigate to the <BgStyledText>Address Book</BgStyledText> tab on the Wallet page.</li>
  <li>Click <BgStyledText>New Address</BgStyledText>.</li>
  <li>Enter a name and wallet address.</li>
  <li>Click <BgStyledText>Save</BgStyledText>.</li>
</Ordered>

### Editing or Deleting an Address

Click the action menu (three dots) on any address entry to **Edit** or **Delete** it.


## Security Best Practices

1. **Never share your mnemonic phrase** — it provides full access to your wallet
2. **Use a strong, unique password** for each wallet
3. **Export backups** of important wallets and store them securely offline
4. **Keep your mnemonic phrase written down** in a secure physical location
5. **Verify addresses** before sending tokens — transactions cannot be reversed

## Frequently Asked Questions

### 1. What happens if I forget my wallet password?

You can re-import your wallet using your mnemonic phrase and set a new password. Your funds are tied to the mnemonic, not the password.

### 2. Can I use the same wallet in multiple devices?

Yes, you can import the same wallet (via mnemonic or backup file) on multiple devices. Each device will have its own password.

### 3. Is my mnemonic stored securely?

Yes, your mnemonic is encrypted with your password and stored locally on your device. It is never sent to any server.

### 4. What is the difference between Send Balance and Bridge Tokens?

Send Balance transfers hAlpha to another address on the Hippius network. Bridge Tokens converts between Alpha (Bittensor) and hAlpha (Hippius) across networks.

### 5. Why do I need to enter my password for every transaction?

This is a security feature. Your mnemonic is encrypted at rest and only decrypted momentarily to sign transactions, then immediately cleared from memory.
