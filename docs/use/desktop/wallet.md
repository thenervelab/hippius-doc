---
id: wallet
title: Wallet
sidebar_label: Wallet
slug: /use/desktop/wallet
description: Create and manage local wallets, send and receive hAlpha, stake and unstake, bridge between Alpha and hAlpha, and track transactions from the Hippius desktop Wallet page.
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
import Icon from '@site/src/components/Icon';

## Introduction

The Hippius desktop **Wallet** gives you full control over your hAlpha tokens with local wallet management. Unlike the web console, the desktop app stores your encrypted wallet data **on your device**, so your keys never leave your machine.

From the Wallet page you can:

<Unordered>
  <li>Send and receive hAlpha.</li>
  <li>Stake and unstake your tokens.</li>
  <li>Bridge between Alpha (Bittensor) and hAlpha (Hippius).</li>
  <li>Keep an address book of frequent recipients.</li>
  <li>Review your transaction history.</li>
</Unordered>

Everything is secured by a password you choose.

Reach the Wallet from the sidebar at <BgStyledIconWithText text="Wallet" icon="Wallet" />.

## How Wallets Work on Desktop

### Your access key

Each wallet is built from a **12-word access key** (sometimes called a recovery phrase elsewhere). This key is the master credential for your wallet:

<Unordered>
  <li>It is generated on your device when you create a wallet, and shown to you once.</li>
  <li>Anyone who has it can control your funds and files. Treat it like the keys to a safe.</li>
  <li><strong>We cannot recover it for you.</strong> If you lose it, your funds and files are permanently inaccessible.</li>
</Unordered>

### Your password and per-transaction signing

When you set up a wallet you also choose a **password**. The desktop app uses a password-based signing model:

<Unordered>
  <li>Your access key is <strong>encrypted with your password</strong> and stored locally. It is never sent off your device.</li>
  <li>Each time you sign something (send, stake, unstake, withdraw, bridge), you enter your password.</li>
  <li>The password <strong>momentarily decrypts</strong> the access key to sign the transaction, then it's cleared from memory.</li>
</Unordered>

This means there's no separate "unlock" step. Your wallet is effectively locked at all times, and you authorize each transaction individually.

:::tip
Even if someone gets access to your device, they can't move your funds without your password. And even with your password, they'd still need your access key to recover the wallet elsewhere.
:::

## Setting Up Your Wallet

The first time you open the Wallet page (or whenever you have no wallet yet) you'll land on the **Welcome to Hippius Wallet** screen. From here you can take one of three paths, and you can cross-navigate between them with the links at the bottom of each screen.

### Create a New Wallet

<Ordered>
  <li>From the Welcome screen, click <BgStyledText>Create New Wallet</BgStyledText>.</li>
  <li>A fresh <strong>12-word access key</strong> is generated and shown on screen under <strong>Your Access Key</strong>. Use the copy icon to copy it, then store it somewhere safe. Note the <strong>IMPORTANT</strong> reminders: store this key in a secure password manager, never share it with anyone, and Hippius <strong>cannot</strong> help you recover your account if you lose it.</li>
  <li>Enter a name for your wallet in <strong>Wallet Name</strong> (for example, "Main Wallet").</li>
  <li>Click <BgStyledText>Continue</BgStyledText>.</li>
  <li>On the next screen, set a <strong>Password</strong> and re-enter it under <strong>Confirm Password</strong>, then click <BgStyledText>Create Wallet</BgStyledText>.</li>
  <li>Review the <strong>Save Your Password &amp; Access Key</strong> dialog and click <BgStyledText>I Understand, Create Wallet</BgStyledText> to finish.</li>
</Ordered>

![Create New Wallet](/img/desktop/wallet/create-wallet.png)

:::warning Your access key is the master key
Your 12-word access key provides full access to your wallet. Never share it, never store it digitally in plain text, and never enter it on sites or apps you don't trust.
:::

Your password must be at least **8 characters** and include:

<Unordered>
  <li>A lowercase letter</li>
  <li>An uppercase letter</li>
  <li>A number</li>
  <li>A special character</li>
</Unordered>

### Access an Existing Wallet

If you already have a 12-word access key and want to add the wallet to this device:

<Ordered>
  <li>On the Welcome screen, enter a <strong>Wallet Name</strong> and paste your key into the <strong>Access Key</strong> field.</li>
  <li>Click <BgStyledText>Continue</BgStyledText>. The app verifies the key.</li>
  <li>On the next screen, enter a <strong>Password</strong> to protect this wallet on this device, then continue.</li>
  <li>Confirm the <strong>Save Your Password &amp; Access Key</strong> dialog by clicking <BgStyledText>I Understand, Continue</BgStyledText>.</li>
</Ordered>

The password you set here is local to this device. The same wallet on another device can have a different password.

### Import a Wallet from Backup

If you have an encrypted backup file exported from Hippius:

<Ordered>
  <li>On the Welcome screen, click <BgStyledText>Import Your Wallet</BgStyledText>.</li>
  <li>Under <strong>Upload File</strong>, drag and drop your backup or click to browse. Backups are <code>.zip</code> files (older <code>.json</code> backups are also accepted).</li>
  <li>Enter the <strong>Password</strong> that was set when the backup was created. This is needed to decrypt it.</li>
  <li>Click <BgStyledText>Import Wallet</BgStyledText>, then confirm the <strong>Save Your Password &amp; Access Key</strong> dialog with <BgStyledText>I Understand, Import</BgStyledText>.</li>
</Ordered>

![Import Wallet](/img/desktop/wallet/import-wallet.png)

### Save Your Password & Access Key

All three setup paths end with the **Save Your Password & Access Key** confirmation. It's a final reminder that:

<Unordered>
  <li>We cannot recover your password if you lose it. It is never sent off this device.</li>
  <li>We cannot recover your access key either. Without it your funds and files are permanently inaccessible.</li>
  <li>You should store both in a password manager or somewhere offline that only you can reach.</li>
</Unordered>

## The Wallet Page

Once a wallet is active, the Wallet page shows three cards across the top, a balance chart, and a set of tabs.

![Wallet Overview](/img/desktop/wallet/wallet-overview.png)

| Card | What it shows |
|---|---|
| **My Balance** | Your transferable hAlpha balance, a "Last updated" time with a refresh button, and <BgStyledText>Receive</BgStyledText> / <BgStyledText>Send</BgStyledText> buttons. |
| **Stake hAlpha** | Your staked balance, plus redeemable and unstaking amounts when present, with <BgStyledText>Stake Now</BgStyledText>, <BgStyledText>Unstake hAlpha</BgStyledText>, and (when funds are ready) a <BgStyledText>Withdraw</BgStyledText> action. |
| **Bridge Tokens** | A shortcut to bridge tokens between Alpha and hAlpha. Click <BgStyledText>Bridge Tokens</BgStyledText> to open the bridge. |

Below the cards, the **Transaction Overview** chart plots your balance over time. Use the time-range selector (**This Week**, **Last 30 Days**, **Last 60 Days**, **1 Year**, **Max**) to change the window, and the refresh button to re-fetch. Below the chart are three tabs: **Transaction History**, **Bridge Transactions**, and **Address Book**.

## Managing Multiple Wallets

The desktop app supports multiple local wallets. The **Active Wallet** selector in the top-right corner of the Wallet page is where you switch between them and add more.

![Switch Wallet](/img/desktop/wallet/switch-wallet.png)

<Unordered>
  <li>Click the <strong>Active Wallet</strong> pill to open the <strong>Your Wallets</strong> popover.</li>
  <li>Each wallet row shows its name and truncated address, with a copy button, an <strong>export backup</strong> icon, and an <strong>open in explorer</strong> icon (which opens the address on hipstats.com).</li>
  <li>The active wallet shows an <strong>Active wallet</strong> badge; click <BgStyledText>Switch wallet</BgStyledText> on any other wallet to make it active.</li>
  <li>Click <BgStyledText>Add another wallet</BgStyledText> to start the create flow, or the gear icon to open <strong>Wallet Settings</strong>.</li>
</Unordered>

Your active wallet is remembered across sessions. When you sign a transaction, you're prompted for the active wallet's password. Switching wallets also updates the balance and transaction history to the newly selected account.

If you have no wallet yet, the selector reads **No Active Wallet / Wallet Needed** and offers **Create New Wallet** and **Import Your Wallet** shortcuts.

## Wallet Settings

Detailed wallet management lives under <BgStyledIconWithText text="Settings" icon="Settings" /> → **Wallets** (the gear icon in the Active Wallet popover takes you straight there). The page is titled **Wallets** — "Manage the local wallets stored on this device. Switch between them, rename, export a backup, or remove ones you no longer use."

![Wallet Settings](/img/desktop/wallet/wallet-settings.png)

The table lists every local wallet:

| Column | Description |
|---|---|
| **Wallet** | The wallet name, with an **Active** badge on the active wallet. |
| **Address** | The full SS58 address, with a copy button. |
| **Added** | When the wallet was added to this device. |

Use <BgStyledText>Create wallet</BgStyledText> or <BgStyledText>Import</BgStyledText> in the card header to add more. Each row has a three-dot (⋮) menu (also available by right-clicking the row) with:

| Action | What it does |
|---|---|
| **Set as active** | Makes this the active wallet. (Shows as a disabled **Active wallet** for the current one.) |
| **Copy address** | Copies the wallet's SS58 address. |
| **View on Hipstats** | Opens the address on the hipstats.com explorer. |
| **Export backup** | Saves an encrypted `.zip` backup (named `hippius-wallet-<name>-backup.zip`). |
| **Rename** | Opens the **Rename Wallet** dialog. |
| **Delete** | Opens the **Delete Wallet** confirmation. |

### Renaming a Wallet

Choose **Rename** from the ⋮ menu, enter a new name, and click <BgStyledText>Save</BgStyledText>. As the dialog notes, "The address and access key are unchanged."

### Exporting a Backup

Choose **Export backup** to save an encrypted `.zip` of the wallet. The backup is encrypted with the wallet's password, so keep **both** the file and the password safe. You'll need that password to import it later.

### Deleting a Wallet

Choose **Delete**, then confirm in the **Delete Wallet** dialog. Deleting removes the wallet from this device only.

:::warning Deleting is permanent on this device
"Make sure you have a backup of its access key — without it the wallet cannot be recovered." Export a backup or keep your access key before deleting.
:::

## Sending hAlpha

<Ordered>
  <li>Make sure the correct wallet is active, then click <BgStyledText>Send</BgStyledText> on the <strong>My Balance</strong> card.</li>
  <li>In the <strong>Recipient Address</strong> field, paste an address or pick a saved contact from your address book.</li>
  <li>Enter the <strong>Amount</strong>. Click <BgStyledText>MAX</BgStyledText> to send your full transferable balance minus the network fee. The card shows your <strong>Available</strong> balance for reference.</li>
  <li>Click <BgStyledText>Send</BgStyledText>. A <strong>Confirm Transaction</strong> dialog appears showing the amount and recipient.</li>
  <li>Enter your <strong>wallet password</strong> and click <BgStyledText>Confirm Transfer</BgStyledText>.</li>
</Ordered>

![Send Balance](/img/desktop/wallet/send-balance.png)

A progress toast appears in the corner while the transfer is processed, followed by a success or error notification. A couple of things to note:

<Unordered>
  <li>You can't send to your own address.</li>
  <li>You'll be warned if your balance is too low to cover the network fee.</li>
</Unordered>

## Receiving hAlpha

<Ordered>
  <li>Click <BgStyledText>Receive</BgStyledText> on the <strong>My Balance</strong> card.</li>
  <li>The <strong>Receive Balance</strong> dialog shows a QR code and your <strong>Deposit Address</strong>. Scan the QR code or use the copy button.</li>
  <li>Send hAlpha to this address from any Hippius-compatible wallet.</li>
</Ordered>

![Receive Balance](/img/desktop/wallet/receive-balance.png)

Your deposit address is an SS58-encoded Substrate address, compatible with Polkadot and other Substrate-based chains.

## Staking

The **Stake hAlpha** card is where you stake, unstake, and withdraw. Staking locks hAlpha; unstaking begins an **unbonding** period after which the tokens become **redeemable** and can be withdrawn back to your transferable balance.

![Stake hAlpha](/img/desktop/wallet/stake-halpha.png)

### Stake

<Ordered>
  <li>Click <BgStyledText>Stake Now</BgStyledText>.</li>
  <li>Enter an amount, or use <BgStyledText>MAX</BgStyledText>, <BgStyledText>50%</BgStyledText>, or <BgStyledText>25%</BgStyledText>. The dialog shows how much you have available to stake.</li>
  <li>Click <BgStyledText>Stake</BgStyledText>, then enter your password and click <BgStyledText>Confirm Stake</BgStyledText>.</li>
</Ordered>

### Unstake

<Ordered>
  <li>Click <BgStyledText>Unstake hAlpha</BgStyledText> (enabled only when you have a staked balance).</li>
  <li>Enter an amount or use the quick buttons. The dialog shows your staked balance.</li>
  <li>Click <BgStyledText>Unstake</BgStyledText>, enter your password, and click <BgStyledText>Confirm Unstake</BgStyledText>.</li>
</Ordered>

![Unstake hAlpha](/img/desktop/wallet/unstake-halpha.png)

:::note Unbonding period
After you unstake, the dialog reminds you: "Tokens will be available to withdraw after the unbonding period completes. This transaction cannot be reversed once confirmed." The Stake card shows an **Unstaking** countdown while tokens are unbonding.
:::

### Withdraw

Once unbonded tokens are redeemable, a <BgStyledText>Withdraw</BgStyledText> button appears in the Stake card header.

<Ordered>
  <li>Click <BgStyledText>Withdraw</BgStyledText>. The dialog shows your <strong>Withdrawable</strong> amount.</li>
  <li>Enter your password and click <BgStyledText>Confirm Withdraw</BgStyledText>.</li>
</Ordered>

![Withdraw Tokens](/img/desktop/wallet/withdraw-tokens.png)

The full redeemable balance is transferred back to your wallet immediately after confirmation.

## Bridging Tokens

The bridge moves tokens between **Alpha** on Bittensor and **hAlpha** on Hippius. Click <BgStyledText>Bridge Tokens</BgStyledText> on the Bridge card to open it. Use the swap arrow in the middle to flip direction.

![Bridge Alpha to hAlpha](/img/desktop/wallet/bridge-alpha-halpha.png)

<Ordered>
  <li>Enter the amount to bridge, or use <BgStyledText>MAX</BgStyledText> / <BgStyledText>50%</BgStyledText> / <BgStyledText>25%</BgStyledText>. The dialog shows the <strong>minimum</strong> (for example, "Min: 15.00 ALPHA") and how much you have.</li>
  <li>Review the <strong>Best price</strong> box: an estimated time of about <strong>120 seconds</strong> and gas fees of about <strong>0.1%</strong>.</li>
  <li>Click <BgStyledText>Bridge</BgStyledText> and review the confirmation.</li>
  <li>Enter your password and click <BgStyledText>Confirm Bridge</BgStyledText>.</li>
</Ordered>

The two directions behave differently:

<Unordered>
  <li><strong>Alpha → hAlpha</strong> (Bittensor to Hippius): bridges your <strong>staked Alpha</strong> into hAlpha. This requires <strong>three wallet signatures</strong> on Bittensor (add proxy, deposit Alpha, remove proxy); guardians then mint hAlpha on Hippius.</li>
  <li><strong>hAlpha → Alpha</strong> (Hippius to Bittensor): burns hAlpha on Hippius and releases the equivalent Alpha to your <strong>staked</strong> balance on Bittensor.</li>
</Unordered>

![Bridge hAlpha to Alpha](/img/desktop/wallet/bridge-halpha-alpha.png)

Bridges run in the background. Track progress in the **Bridge Transactions** tab while guardians process the transfer.

## Transaction History

The **Transaction History** tab lists your incoming and outgoing hAlpha transfers:

| Column | Description |
|---|---|
| **Block** | The blockchain block number. |
| **Amount (hALPHA)** | The transfer amount. |
| **From** | The sender's address (copyable). |
| **To** | The recipient's address (copyable). |
| **Transaction Type** | A **Sent** or **Received** badge, relative to your active wallet. |
| **Transaction Date** | When the transaction was confirmed. |

You can sort by block, amount, or date. Results are paginated at 10 per page. When there's nothing yet, the tab reads "No transactions yet — When you send or receive hALPHA on this wallet, the transfers will show up here."

![Transaction History](/img/desktop/wallet/transaction-history.png)

## Bridge Transactions

The **Bridge Transactions** tab tracks cross-chain bridge activity, with a filter for **All**, **Deposit**, and **Withdrawal**:

| Column | Description |
|---|---|
| **Extrinsic Hash** | The transaction hash (copyable, and links to the hipstats.com explorer). |
| **Amount** | The bridged amount (hALPHA for deposits, ALPHA for withdrawals). |
| **Bittensor Chain** | Status on the Bittensor side. |
| **Bittensor Block** | Block number on Bittensor. |
| **Votes** | Guardian votes collected versus the threshold (for example, 3/3). |
| **Hippius Chain** | Status on the Hippius side. |
| **Hippius Block** | Block number on Hippius. |

In-progress bridges are highlighted and pinned to the top. Results paginate at 10 per page.

## Address Book {#address-book}

The **Address Book** tab saves addresses you send to often, so you don't have to paste an SS58 every time. When sending, the recipient field lets you type an address or pick a saved contact directly.

![Address Book](/img/desktop/wallet/address-book.png)

The table shows **Name**, **Wallet Address** (copyable), and **Date Added**, sortable by name or date and paginated at 10 per page.

### Adding an Address

<Ordered>
  <li>On the <strong>Address Book</strong> tab, click <BgStyledText>New Address</BgStyledText>.</li>
  <li>Enter a <strong>Name</strong> and the <strong>Address</strong>.</li>
  <li>Click <BgStyledText>Save Address</BgStyledText>.</li>
</Ordered>

### Editing or Deleting an Address

Use the three-dot menu on any row:

<Unordered>
  <li><strong>Edit</strong> opens the <strong>Edit Address</strong> dialog where you can update the name or address, then click <BgStyledText>Update Address</BgStyledText>.</li>
  <li><strong>Delete</strong> asks you to confirm before removing the contact. This can't be undone.</li>
</Unordered>

## Security Best Practices

<Ordered>
  <li><strong>Never share your access key.</strong> It provides full access to your wallet.</li>
  <li><strong>Use a strong, unique password</strong> for each wallet.</li>
  <li><strong>Export backups</strong> of important wallets and store them securely offline.</li>
  <li><strong>Keep your access key written down</strong> in a secure physical location, or in a password manager.</li>
  <li><strong>Verify addresses before sending.</strong> Transactions cannot be reversed.</li>
</Ordered>

## Frequently Asked Questions

### What happens if I forget my wallet password?

Re-add your wallet using its 12-word access key and set a new password. Your funds are tied to the access key, not the password.

### Can I use the same wallet on multiple devices?

Yes. Add the same wallet (via its access key or a backup file) on each device. Each device has its own local password.

### Is my access key stored securely?

Yes. Your access key is encrypted with your password and stored locally on your device. It is never sent to any server.

### What's the difference between Send and Bridge?

**Send** transfers hAlpha to another address on the Hippius network. **Bridge** converts between Alpha (Bittensor) and hAlpha (Hippius) across networks.

### Why do I enter my password for every transaction?

It's a security feature. Your access key is encrypted at rest and only decrypted momentarily to sign each transaction, then immediately cleared from memory.

## Where to next

<Unordered>
  <li><a href="/use/desktop/billing">Billing</a>: manage credits, the currency used for storage and compute.</li>
  <li><a href="/use/desktop/drive">Drive</a>: store and sync your files.</li>
</Unordered>
