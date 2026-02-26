---
id: bridge
title: Bridge
sidebar_label: Bridge
slug: /use/desktop/bridge
---

import Ordered from '@site/src/components/Ordered';
import UnOrdered from '@site/src/components/UnOrdered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Icon from '@site/src/components/Icon';

## Introduction

The Hippius Bridge allows you to transfer tokens between the Bittensor network (Alpha) and the Hippius network (hAlpha). You can bridge in either direction:

<UnOrdered>
<li>**Alpha → hAlpha**: Lock your Alpha tokens on Bittensor and receive hAlpha on Hippius</li>
<li>**hAlpha → Alpha**: Burn your hAlpha tokens on Hippius and receive Alpha on Bittensor</li>
</UnOrdered>
Bridging is processed by a decentralized network of Hippius guardians and typically completes within a few minutes.

## Accessing the Bridge

<Ordered>
  <li>Open the Wallet page.</li>
  <li>Click <BgStyledText>Bridge Tokens</BgStyledText> on the Bridge widget.</li>
  <li>Ensure the correct wallet is active.</li>
</Ordered>

![Bridge Page](/img/desktop/wallet/bridge-page.png)

## Bridging Alpha → hAlpha

This direction locks your Alpha tokens on the Bittensor network. Hippius guardians detect the lock and mint equivalent hAlpha on the Hippius network.

<Ordered>
  <li>On the Bridge page, ensure the direction shows <strong>Alpha → hAlpha</strong>. If not, click the swap direction button (↕️).</li>
  <li>Your source Alpha balance is displayed at the top.</li>
  <li>Enter the amount to bridge. The estimated receive amount is shown below.</li>
  <li>Click <BgStyledText>Bridge Now</BgStyledText>.</li>
  <li>Review the confirmation dialog, which explains the wallet signatures required: <strong>Add Proxy</strong> (grants the bridge contract temporary permission), <strong>Lock Alpha</strong> (locks your tokens in the bridge contract), and <strong>Remove Proxy</strong> (revokes the temporary permission).</li>
  <li>Click <BgStyledText>Confirm Bridge</BgStyledText>.</li>
  <li>Enter your wallet password when prompted to sign each transaction.</li>
</Ordered>

![Bridge Alpha to hAlpha](/img/desktop/wallet/bridge-alpha-halpha.png)

:::note
A minimum bridge amount applies. The gas fee is shown before you confirm. The bridge process typically takes 1–3 minutes depending on network conditions.
:::

## Bridging hAlpha → Alpha

This direction burns your hAlpha tokens on Hippius. Guardians detect the burn and release equivalent Alpha to your staked balance on Bittensor.

<Ordered>
  <li>On the Bridge page, ensure the direction shows <strong>hAlpha → Alpha</strong>. If not, click the swap direction button (↕️).</li>
  <li>Your hAlpha balance is displayed at the top.</li>
  <li>Enter the amount to bridge.</li>
  <li>Click <BgStyledText>Bridge Now</BgStyledText>.</li>
  <li>Review the confirmation dialog — your hAlpha will be burned and Alpha released on Bittensor.</li>
  <li>Click <BgStyledText>Confirm Bridge</BgStyledText>.</li>
  <li>Enter your wallet password to sign the transaction.</li>
</Ordered>

![Bridge hAlpha to Alpha](/img/desktop/wallet/bridge-halpha-alpha.png)

## Bridge Transactions Widget

The **Bridge Transactions** widget appears in the bottom-left corner during and after bridge operations. It provides real-time tracking of all your bridge transactions.

### Widget Header

The header shows the overall status:
<UnOrdered>
<li>**Spinner icon** — A bridge operation is in progress</li>
<li>**Checkmark icon** — All transactions completed successfully</li>
<li>**Warning icon** — There was an issue loading bridge data</li>
<li>**X icon** — A transaction failed</li>
</UnOrdered>

Click the header to expand or collapse the transaction details.

![Bridge Widget Header](/img/desktop/wallet/bridge-widget-header.png)

### Bridge Progress Steps

When you initiate a bridge, the widget shows step-by-step progress:

| Step | Description |
|---|---|
| **Add Proxy** | Granting temporary bridge contract permission |
| **Lock/Burn Tokens** | Your tokens are being locked (Alpha→hAlpha) or burned (hAlpha→Alpha) |
| **Remove Proxy** | Revoking temporary permission (Alpha→hAlpha only) |
| **Processing** | Guardians are processing your transaction |
| **Complete** | Tokens have been delivered |

Each step shows:
<UnOrdered>
<li>A status icon (loading spinner, checkmark, or error)</li>
<li>The step name</li>
<li>Additional details when available</li>
</UnOrdered>

{/* ![Bridge Progress](/img/desktop/wallet/bridge-progress.png) */}

### Transaction Status Icons

| Status | Icon | Color | Meaning |
|---|---|---|---|
| **Pending** | Clock | Amber | Transaction submitted, awaiting confirmation |
| **Processing** | Spinner | Blue | Transaction being processed by guardians |
| **Completed** | Checkmark | Green | Bridge complete — tokens delivered |
| **Failed** | X | Red | Transaction failed — check error details |
| **Timed Out** | Clock | Red | Transaction took too long and expired |

### Filtering Transactions

Use the filter tabs to view specific transaction types:

<UnOrdered>
<li>**All** — Shows all bridge transactions</li>
<li>**Deposits** — Alpha → hAlpha transactions only</li>
<li>**Withdrawals** — hAlpha → Alpha transactions only</li>
</UnOrdered>

The count badge shows how many pending transactions exist in each category.

![Bridge Filters](/img/desktop/wallet/bridge-widget-header.png)

### Transaction Cards

Each transaction is displayed as a card showing:

| Field | Description |
|---|---|
| **Request ID** | Unique identifier for the bridge request |
| **Amount** | Tokens being bridged |
| **Status** | Current transaction status with colored badge |
| **Direction** | Source and destination chains |
| **Votes** | Guardian confirmation progress (when processing) |

Click a transaction card to expand and see additional details:
<UnOrdered>
<li>Full request ID</li>
<li>Block numbers</li>
<li>Timestamps</li>
<li>Guardian vote count and threshold</li>
</UnOrdered>

{/* ![Transaction Card](/img/desktop/wallet/transaction-card.png) */}

### Dismissing the Widget
<UnOrdered>
<li>**Auto-dismiss**: Successfully completed transactions automatically clear after a few seconds</li>
<li>**Manual dismiss**: Click the **Dismiss** button when a transaction completes or fails</li>
<li>The widget hides completely when there are no transactions to display</li>
</UnOrdered>

### Error Handling

If a bridge transaction fails, the widget shows:
<UnOrdered>
<li>A red error indicator</li>
<li>A user-friendly error message explaining what went wrong</li>
<li>A **Dismiss** button to clear the failed transaction</li>
</UnOrdered>

Common errors include:
<UnOrdered>
<li>**Insufficient balance** — Not enough tokens or gas fees</li>
<li>**Proxy error** — Failed to add/remove the bridge proxy</li>
<li>**Network timeout** — Transaction took too long to confirm</li>
</UnOrdered>


:::tip
If a bridge fails, check your balance and try again. Most errors are due to insufficient funds for gas fees.
:::

## How the Bridge Works

### Alpha → hAlpha Flow

```
1. You add a temporary proxy to the bridge contract
2. Your Alpha tokens are locked in the bridge contract
3. The proxy is removed
4. Guardian nodes detect the lock event
5. Guardians vote to confirm the lock
6. Once threshold is reached, hAlpha is minted to your Hippius address
```

### hAlpha → Alpha Flow

```
1. Your hAlpha tokens are burned on Hippius (via AlphaBridge.withdraw)
2. Guardian nodes detect the burn event
3. Guardians vote to confirm the burn
4. Once threshold is reached, Alpha is released to your Bittensor staked balance
```

## Bridge Security

The bridge is secured by multiple layers:

1. **Guardian Network** — Decentralized validators confirm transactions
2. **Threshold Voting** — Multiple guardians must agree before tokens are released
3. **Proxy Pattern** — Temporary permissions minimize security exposure
4. **Local Signing** — Your private keys never leave your device

## Frequently Asked Questions

### 1. How long does bridging take?

Most bridges complete within 1–3 minutes. The exact time depends on network congestion, guardian availability, and the number of confirmations required.

### 2. What are the fees?

Bridge fees include gas fees (network transaction costs on both chains) and a bridge fee (a small percentage taken by the protocol). Fees are displayed before you confirm the bridge.

### 3. Why do I need to sign multiple transactions for Alpha → hAlpha?

The Alpha → hAlpha direction requires three signatures: (1) Add proxy to authorize the bridge, (2) Lock tokens in the bridge contract, and (3) Remove proxy to revoke authorization. This pattern ensures maximum security.

### 4. What happens if my bridge fails?

If a bridge fails, your original tokens remain in your wallet (not lost). Check the error message for details, ensure you have enough balance for gas fees, and try again after a few minutes.

### 5. Can I bridge back and forth?

Yes, you can bridge in either direction as many times as needed. Each direction has its own minimum amount and fee structure displayed on the Bridge form.

### 6. Where do my Alpha tokens go after bridging hAlpha → Alpha?

When bridging hAlpha → Alpha, your Alpha tokens are released to your staked balance on Bittensor, not your transferable balance. This is by design for the Bittensor subnet architecture.

### 7. Is there a minimum bridge amount?

Yes, both directions have minimum amounts to ensure transactions are economically viable. The minimum is displayed on the Bridge form.

