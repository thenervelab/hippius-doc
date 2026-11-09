---
id: pay-with-gamma
title: Pay with Gamma (Subnet 75)
sidebar_label: Pay with Gamma
slug: /use/pay-with-gamma
description: Turn Bittensor subnet 75 gamma into Hippius balance with the API or the hipc CLI. Link a hotkey, convert gamma into credits, check the status, and the limits and risks.
---

# Pay with Gamma (Subnet 75)

:::info Coming soon
Paying with gamma is **available once gamma is enabled on subnet 75**. Until then, minting subnet 75 gamma is not possible on Bittensor and the routes below answer `404`.
:::

[Gamma](https://www.bittensor.com/docs/guides/gamma) is a subnet's prepaid credit on Bittensor. You mint it by burning that subnet's alpha, and **one gamma is worth one US dollar**. Hippius accepts the gamma of subnet 75: we burn gamma from a deposit you hold and add the same number of dollars to your Hippius balance.

There is no console page for gamma. You use the [Hippius API](/use/api) or the `hipc` command line. A conversion counts as a payment like a card or USDC top-up: it is added to your balance as credits and appears on your invoices.

## Before you start

You need:

- A Hippius API token, from [Settings](https://console.hippius.com/dashboard/settings). Every request sends `Authorization: Token YOUR_TOKEN`.
- A Bittensor coldkey with TAO or subnet 75 stake, and `btcli`.
- A **fresh hotkey** for the deposit. It does not need to be registered or funded. Never use a staking hotkey or your coldkey.

## 1. Mint gamma into a deposit that names Hippius

Gamma sits in a deposit keyed by a hotkey and owned by your coldkey. Each deposit names the one account allowed to spend it, the **spender**. For Hippius to spend your gamma, the deposit must name our spender. Read it from the API:

```bash
curl -s https://api.hippius.com/api/billing/gamma/ \
  -H "Authorization: Token YOUR_TOKEN"
```

The answer's `spender` is the account a deposit must name (written `<HIPPIUS_SPENDER>` below). Then mint subnet 75 gamma into your fresh hotkey:

```bash
btcli gamma mint --netuid 75 --hotkey <YOUR_GAMMA_HOTKEY> --amount-tao 10 --service-hotkey <HIPPIUS_SERVICE_HOTKEY>
```

`--service-hotkey` names our published service, whose spender is `<HIPPIUS_SPENDER>`. If you already hold a deposit, set its spender with `set_gamma_deposit_spender` instead. A daily spend cap on the deposit is respected: we can only spend what the cap allows at that moment.

## 2. Link the hotkey to your account (once)

A hotkey pays for one Hippius account. You prove you hold it by signing a challenge with it.

**With hipc**, put the hotkey's 12 words in a file only you can read (mode `0600`), or pass them on stdin:

```bash
hipc billing gamma hotkeys create --hotkey-file hotkey.txt
```

`hipc` asks for the challenge, checks that it is a link of that hotkey, signs it with the hotkey's key and sends the signature. The words never leave your machine.

**With the API**, ask for a challenge, sign its `message` with the hotkey, and send the signature:

```bash
curl -s -X POST https://api.hippius.com/api/billing/gamma/hotkeys/challenge/ \
  -H "Authorization: Token YOUR_TOKEN" -H "Content-Type: application/json" \
  -d '{"hotkey": "<YOUR_GAMMA_HOTKEY>"}'
# {"nonce": "4f1c…", "message": "Hippius: pay with the gamma of 5FHn… for … nonce 4f1c…", "expires_at": "…"}

curl -s -X POST https://api.hippius.com/api/billing/gamma/hotkeys/ \
  -H "Authorization: Token YOUR_TOKEN" -H "Content-Type: application/json" \
  -d '{"nonce": "4f1c…", "signature": "0x…"}'
```

Sign the exact bytes of `message` (UTF-8) with the hotkey's sr25519 key, and send the 64-byte signature as `0x` and 128 hex digits. In Python:

```python
from substrateinterface import Keypair
hotkey = Keypair.create_from_mnemonic(HOTKEY_WORDS)
signature = "0x" + hotkey.sign(challenge["message"]).hex()
```

A challenge is valid for 5 minutes and works once, even if the link fails. An account can link up to 10 hotkeys. `hipc billing gamma hotkeys delete <hotkey>` or `DELETE /api/billing/gamma/hotkeys/<hotkey>/` unlinks one; its gamma stays in the deposit.

## 3. Check the deposit

```bash
hipc billing gamma get
```

Each linked hotkey shows its deposit: `balance`, `spendable` (the balance as the daily cap limits it now), and `names_hippius`. If `names_hippius` is `false`, the deposit names another spender and we cannot spend it. `deposit` is `null` when the hotkey has no gamma on subnet 75.

## 4. Convert gamma into credits

```bash
hipc billing gamma conversions create --hotkey <YOUR_GAMMA_HOTKEY> --amount 10 --yes
```

Or with the API:

```bash
curl -s -X POST https://api.hippius.com/api/billing/gamma/conversions/ \
  -H "Authorization: Token YOUR_TOKEN" -H "Content-Type: application/json" \
  -d '{"hotkey": "<YOUR_GAMMA_HOTKEY>", "amount": "10"}'
# 202 {"id": "6f0b…", "status": "pending", "amount": "10.000000000", "reference": "0x9a…", …}
```

`amount` is gamma, with at most 9 decimals. We add the same amount in US dollars to your balance. Only one conversion of yours can be in flight at a time.

## 5. Check the status

```bash
hipc billing gamma conversions get <id>
hipc billing gamma conversions list
```

Or `GET /api/billing/gamma/conversions/<id>/` and `GET /api/billing/gamma/conversions/` (newest first, up to 50). Check every few seconds; a conversion normally settles within a minute or two.

| Status | What it means |
|---|---|
| `pending` | Accepted, not yet sent to the chain |
| `submitting`, `submitted` | The spend is sent; waiting for a finalized block |
| `spent` | The spend is final and your balance has the credits. `transaction_id` is the payment |
| `skipped` | The chain skipped the spend, for example because the gamma was moved away (`skip_reason`). Nothing was spent or credited |
| `failed` | Never spent. Nothing was credited |

You are credited only once the spend is in a finalized block, and never twice. The conversion's `reference` is repeated in the chain's `GammaSpent` event, so you can match the spend on chain.

## Limits

- The minimum conversion is **0.1 gamma**.
- There is a daily limit per account and a global daily limit. `daily_cap` answers with what is `remaining` today.
- Before spending, we check that the chain's TAO/USD price, the one gamma is minted at, is fresh and close to ours. If it is not, the conversion is refused with `oracle_deviation` or `oracle_unavailable`: try again later.
- Credits are US dollars, like the rest of your balance.

## Risks

- **Gamma cannot be refunded or redeemed.** It cannot be sent to another coldkey or turned back into alpha or TAO. Once spent, it is gone. A refund, if any, is in credits.
- **If subnet 75 were dissolved, the chain would destroy all its gamma.** Gamma you have not converted would be lost. Convert what you mean to spend.
- If you move your gamma away before the spend, the chain skips it and nothing is charged.

## Error codes

Errors answer `{"code": "…", "detail": "…"}`.

| HTTP | Code | What to do |
|---|---|---|
| 400 | `invalid_amount`, `amount_too_low`, `amount_too_high` | Fix the amount: at least 0.1, at most 9 decimals |
| 400 | `no_deposit`, `wrong_spender`, `insufficient_gamma` | Mint into the hotkey, name our spender, or convert less (`spendable` says how much) |
| 403 | `hotkey_not_linked` | Link the hotkey first (step 2) |
| 409 | `hotkey_linked_elsewhere` | Another account holds this hotkey; unlink it there first |
| 409 | `conversion_in_flight` | Wait for the previous conversion to finish |
| 429 | `daily_cap`, `global_daily_cap` | Try again tomorrow, or convert less |
| 503 | `oracle_deviation`, `oracle_unavailable`, `price_unavailable`, `chain_unavailable`, `unavailable` | Try again later |
| 404 | (any route) | Gamma payments are not enabled yet |
