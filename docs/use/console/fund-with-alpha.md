---
id: fund-with-alpha
title: Fund Your Account with Alpha
sidebar_label: Fund with Alpha
slug: /use/console/fund-with-alpha
description: Turn Bittensor subnet 75 Alpha into Hippius balance. Which network and address to send to, the bridge steps, the minimums, how long it takes, how to check a deposit, and the contract and call details for scripts.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';

## Introduction

If you hold Alpha on Bittensor subnet 75 and want to pay for Hippius with it, this page is the whole route. You bridge the Alpha to **hAlpha** on the Hippius network, then convert the hAlpha into balance on the [Billing](/use/console/billing) page.

There is one mistake on this route that costs you the funds you sent, and it is easy to make: sending to the right address on the wrong network. Read the next section before you move anything.

## Send hAlpha on the Hippius network, nothing else

Your Hippius account address is a standard SS58 address, and the same address is valid on both Bittensor and the Hippius network. Whatever you send lands on the network you sent it on.

Your balance only ever sees **hAlpha on the Hippius network**. So:

<Unordered>
  <li><strong>hAlpha, on the Hippius network, to your Hippius account address</strong>: this is the only thing that can be converted into balance.</li>
  <li><strong>Alpha on Bittensor</strong>: has to go through the <a href="/use/console/bridge">bridge</a> first. The bridge turns it into hAlpha on the Hippius network.</li>
</Unordered>

:::danger Do not send Alpha or TAO to your Hippius address on Bittensor
Alpha sent to your Hippius address on Bittensor stays on Bittensor. It arrives as stake held against whatever hotkey the sender chose, and the account usually has no TAO to pay the fees to move it. It never reaches your Hippius balance.

TAO sent there stays on Bittensor too. To pay with TAO, use the TAO deposit address on the Top up dialog's **$TAO** tab instead. See [Billing](/use/console/billing).
:::

## The route at a glance

| Step | Network | What happens |
|---|---|---|
| **1. Hold Alpha as stake on subnet 75** | Bittensor | The Alpha sits in a Bittensor wallet (a coldkey) that you can sign with. |
| **2. Bridge Alpha to hAlpha** | Bittensor | You sign 3 transactions, or 4 if your Alpha has to be moved onto the Hippius validator first. You pay the fees in TAO. |
| **3. Guardians mint hAlpha** | Hippius | Three Hippius guardians confirm the deposit and mint the same amount of hAlpha, to the **same address** that signed on Bittensor. |
| **4. Convert hAlpha to balance** | Hippius | On the Top up dialog's **Hippius** tab, the hAlpha buys balance at the chain's hAlpha price. |

## Before you bridge

<Unordered>
  <li><strong>Your Alpha must be staked on subnet 75.</strong> Any hotkey works. The bridge only takes Alpha that sits on the Hippius validator hotkey, so if yours is elsewhere, the console adds a <strong>Move Stake to Validator</strong> step and moves it for you. Your Alpha stays staked throughout.</li>
  <li><strong>The same wallet needs free TAO on Bittensor.</strong> Staked Alpha cannot pay fees. The bridge briefly adds the escrow contract as a proxy on your account, which reserves a deposit of 0.093 TAO until the proxy is removed again at the end of the bridge, plus a small fee for each transaction. The console checks your free TAO before you sign anything and tells you exactly how much is missing.</li>
  <li><strong>The hAlpha goes to the address that signs.</strong> Guardians mint it to the same SS58 address on the Hippius network. You cannot send it to a different address from the bridge.</li>
</Unordered>

## Which address ends up with the hAlpha

That depends on how you sign in to the console.

**With an access key or a wallet.** Your Hippius address is the address of your own key. Bridge from that same key and the hAlpha lands straight on your account. Then open **Billing**, click <BgStyledText>+ Top up</BgStyledText>, choose the **Hippius** tab and click <BgStyledText>Sign and buy</BgStyledText>.

**With Google, GitHub or Apple.** Hippius manages your Hippius address for you, so you cannot sign on Bittensor with it. Bridge from a Bittensor wallet of your own, then move the hAlpha to your Hippius address and convert it:

<Ordered>
  <li>Bridge the Alpha from your own wallet. The hAlpha arrives at your wallet's address on the Hippius network.</li>
  <li>Open <strong>Billing</strong>, click <BgStyledText>+ Top up</BgStyledText> and choose the <strong>Hippius</strong> tab.</li>
  <li>On <strong>Send from my wallet</strong>, pick that wallet and send the hAlpha to your Hippius account. This is a transfer on the Hippius network.</li>
  <li>On <strong>Convert balance</strong>, click <BgStyledText>Convert to credits</BgStyledText>. About 0.01 hAlpha stays on the address to pay the conversion's fee.</li>
</Ordered>

You can also send hAlpha on the Hippius network from anywhere else to the address shown under **Convert balance**.

## Minimums

| What | Smallest amount | Notes |
|---|---|---|
| **Bridge Alpha to hAlpha** | 15 Alpha | Smaller deposits can fail, so the console does not accept less |
| **Bridge hAlpha back to Alpha** | 15 hAlpha | The bridge pallet on Hippius (`AlphaBridge.MinWithdrawalAmount`) |
| **Convert hAlpha to balance** | Shown as **Min** on the Hippius tab | Our API sets it. The chain itself refuses anything under 0.01 hAlpha (`Marketplace.MinBuyAlpha`) |

Each form shows its minimum as **Min**. If you script the bridge yourself, keep deposits at 15 Alpha or more.

## How long it takes

A bridge deposit usually turns into hAlpha **3 to 10 minutes** after it lands on Bittensor. It is not instant, because three independent guardians each have to see your deposit on Bittensor and confirm it on Hippius before anything is minted.

Those figures come from the chain, not from a promise. We measured every Alpha to hAlpha deposit still on record when we wrote this, 171 of them between 19 October and 2 November 2026, from the Bittensor block holding the deposit to the Hippius block where the hAlpha was minted:

| | Time |
|---|---|
| **Typical (median)** | 7.5 minutes |
| **19 deposits in 20** | Between 3 and 10 minutes |
| **Fastest** | 2 minutes |
| **Slowest** | About 2 hours 10 minutes. 5 of the 171 took longer than 15 minutes. |

The clock starts once your deposit transaction is in a Bittensor block, so add the time you spend approving the signatures before it.

If nothing has arrived after 15 minutes, check the deposit as described below. A deposit the guardians are still confirming will get there. If there is no record of it at all after an hour, [contact support](/use/console/support) with the deposit transaction's hash.

## Check on a deposit

<Unordered>
  <li><strong>In the console.</strong> After you confirm a bridge, the progress dialog follows the deposit through to the end: sent on Bittensor, confirmed by the guardians (with a count out of three), and minted as hAlpha on Hippius. You can minimize it and keep working. Every bridge also appears in the <strong>Bridge Transactions</strong> tab on the <a href="/use/console/wallet">Wallet</a> page, where the <strong>VOTES</strong> column counts guardian confirmations.</li>
  <li><strong>Your hAlpha balance.</strong> It goes up at the same address on the Hippius network once the deposit is minted.</li>
  <li><strong>On chain.</strong> See <a href="#follow-a-deposit-on-chain">Follow a deposit on chain</a> below.</li>
</Unordered>

## Technical reference

This section is for people scripting the route, or building an agent that funds an account. Everything here is public on chain.

### Networks

| | Bittensor | Hippius |
|---|---|---|
| **Token** | Alpha (subnet 75), 9 decimals | hAlpha, 18 decimals |
| **Fees paid in** | TAO | hAlpha |
| **Public RPC** | `wss://entrypoint-finney.opentensor.ai` | `wss://rpc.hippius.network` |
| **SS58 prefix** | 42 | 42 |
| **Block time** | 12 seconds | 6 seconds |

Because both networks use prefix 42, an address string looks identical on both. That is why the network you send on matters so much.

### The bridge contract

The bridge is an ink! contract on Bittensor (pallet-contracts):

| | |
|---|---|
| **Contract address** | `5CtJ99rm9ze4QA523ieagy3vJ9D1A69tDcEUae3Q7g5RVykh` |
| **Hippius validator hotkey** | `5G1Qj93Fy22grpiGKq6BEvqqmS2HVRs3jaEdMhq9absQzs6g` |
| **Subnet (netuid)** | 75 |
| **Guardians needed** | 3 of 3 |

The messages a funder needs. `Balance` is a `u64` in Alpha's smallest unit (1 Alpha is `1_000_000_000`), and arguments are SCALE encoded after the 4-byte selector:

| Message | Selector | Arguments | Returns |
|---|---|---|---|
| `deposit` | `0x2d10c9bd` | `amount: Balance`, `hotkey: AccountId` | Writes a deposit request |
| `is_paused` | `0xfa7d505b` | none | `bool` |
| `approve_threshold` | `0x8cd59c44` | none | `u16` |
| `next_deposit_nonce` | `0xfd648c34` | none | `u64` |
| `get_deposit_request_id_by_nonce` | `0xa1bb85dc` | `nonce: u64` | `Option<[u8; 32]>` |
| `get_deposit_request` | `0x6370ed0c` | `request_id: [u8; 32]` | `Option<DepositRequest>` |

A successful `deposit` emits `DepositRequestCreated { deposit_nonce, sender, amount, deposit_request_id }`. The `deposit_request_id` is the key you follow on Hippius.

### The bridge, as extrinsics

All on Bittensor, all signed by the coldkey that holds the Alpha:

<Ordered>
  <li><strong>Only if needed</strong>: <code>SubtensorModule.move_stake(origin_hotkey, destination_hotkey, origin_netuid, destination_netuid, alpha_amount)</code>, with the Hippius validator hotkey as the destination and 75 as both netuids. Needed when less than the amount you are bridging sits on the validator hotkey.</li>
  <li><code>Proxy.add_proxy(delegate, proxy_type, delay)</code>, with the contract address as the delegate, <code>Any</code> and <code>0</code>.</li>
  <li><code>Contracts.call(dest, value, gas_limit, storage_deposit_limit, data)</code>, with the contract as <code>dest</code>, a value of 0, and <code>data</code> set to <code>0x2d10c9bd</code> followed by the amount as a little-endian <code>u64</code> and the validator hotkey's 32-byte public key. Dry-run it first through the <code>ContractsApi_call</code> runtime API to get the gas it needs.</li>
  <li><code>Proxy.remove_proxy(delegate, proxy_type, delay)</code>, with the same arguments as step 2. This returns the proxy deposit.</li>
</Ordered>

The contract draws the Alpha from your stake on the validator hotkey through the proxy, which is why step 2 comes first. If the deposit reverts (bridge paused, not enough stake on the validator hotkey), the transaction fails, only its fee is spent, and your Alpha does not move.

### Follow a deposit on chain

On the Hippius network, read `AlphaBridge.Deposits(deposit_request_id)`:

<Unordered>
  <li><strong>No entry yet</strong>: the guardians have not picked the deposit up.</li>
  <li><strong><code>status: Pending</code></strong>: guardians are confirming. <code>votes</code> lists the ones that have; minting happens at <code>AlphaBridge.ApproveThreshold</code> (3).</li>
  <li><strong><code>status: Completed</code></strong>: the hAlpha was minted to <code>recipient</code>, in block <code>finalized_at_block</code>.</li>
  <li><strong><code>status: Cancelled</code></strong>: the deposit was not minted. <a href="/use/console/support">Contact support</a> with the deposit id.</li>
</Unordered>

Records are cleaned up after `AlphaBridge.CleanupTTLBlocks` blocks, so an old deposit can be missing even though it was minted. Check the balance in that case.

### Converting: `Marketplace.buy_credits`

On the Hippius network, hAlpha becomes balance through `Marketplace.buy_credits(alpha_amount, min_credits, code)`:

| Argument | Type | Meaning |
|---|---|---|
| `alpha_amount` | `u128` | hAlpha to spend, 18 decimals. |
| `min_credits` | `u128` | The least balance you accept, 18 decimals (one credit is one dollar). The call fails rather than credit less. |
| `code` | `Option<Bytes>` | An optional referral code. Pass none. An invalid code fails the call. |

You receive `alpha_amount × Credits.AlphaPrice / 10^18` credits. The console sets `min_credits` to that figure less your slippage tolerance (1% by default, or 0.5% or 3%).

The call is refused while `Marketplace.BuyCreditsEnabled` is false, or when `Credits.AlphaPrice` was last updated more than `Credits.MaxAlphaPriceAge` blocks ago (28,800 blocks, about 48 hours). It keeps the signer's account alive, so leave a little hAlpha for the fee.

Who signs depends on the account. An access-key or wallet account signs `buy_credits` itself, from its own address. For a Google, GitHub or Apple account, Hippius holds the key: send hAlpha to the account's address, then ask our API to convert it. The console reads `GET https://api.hippius.com/api/billing/native/quote/` for the price, the account address, whether it is managed (`custodial`) and the smallest amount (`min_alpha`), and converts with `POST https://api.hippius.com/api/billing/native/buy/` and a body of `{"alpha_amount": "...", "min_credits": "..."}`, both as 18-decimal integer strings.

## Where to next

<Unordered>
  <li><a href="/use/console/bridge">Bridge</a>: the bridge dialog, step by step.</li>
  <li><a href="/use/console/billing">Billing</a>: every way to add money to your balance.</li>
  <li><a href="/use/console/wallet">Wallet</a>: your hAlpha balance and transaction history.</li>
</Unordered>
