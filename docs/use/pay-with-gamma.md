---
id: pay-with-gamma
title: Pay with Gamma (Subnet 75)
sidebar_label: Pay with Gamma
slug: /use/pay-with-gamma
description: Coming soon. How Bittensor subnet 75 gamma will turn into Hippius balance through the API or the hipc CLI. Link a hotkey, convert gamma into credits, check the status, and the limits and risks.
---

# Pay with Gamma (Subnet 75)

:::caution Not live yet
Paying with gamma is **not available today**. It becomes available once gamma is enabled on subnet 75 and Hippius announces the launch. Until then, subnet 75 gamma cannot be minted on Bittensor, and every route below answers `404`. Do not mint gamma for Hippius before the announcement.
:::

[Gamma](https://www.bittensor.com/docs/guides/gamma) is a subnet's prepaid credit on Bittensor. It is minted by burning that subnet's alpha, and **one gamma is worth one US dollar**. Once live, Hippius will accept the gamma of subnet 75: we burn gamma from a deposit you hold and add the same number of dollars to your Hippius balance.

There is no console page for gamma. You use the [Hippius API](/use/api) or the `hipc` command line. A conversion counts as a payment like a card or USDC top-up: it is added to your balance as credits and appears on your invoices.

## Before you start

You need:

- A Hippius API token, from [Settings](https://console.hippius.com/dashboard/settings). Every request sends `Authorization: Token YOUR_TOKEN`.
- A Bittensor coldkey with TAO or subnet 75 stake, and `btcli`.
- A **fresh hotkey** used only for this deposit. It does not need to be registered or funded. Never use a staking hotkey, and never give anyone, `hipc` included, your **coldkey** words: Hippius never needs them.

## 1. Mint gamma into a deposit that names Hippius

Gamma sits in a deposit keyed by a hotkey and owned by your coldkey. Each deposit names the one account allowed to spend it, the **spender**. For Hippius to spend your gamma, the deposit must name our spender. Read it from the API:

```bash
curl -s https://api.hippius.com/api/billing/gamma/ \
  -H "Authorization: Token YOUR_TOKEN"
```

The answer's `spender` is the account a deposit must name (written `<HIPPIUS_SPENDER>` below). It also says whether the feature is on (`enabled`) and ready to convert (`available`). Then mint subnet 75 gamma into your fresh hotkey, naming `<HIPPIUS_SPENDER>` as the deposit's spender. With `btcli`, that goes through our published service:

```bash
btcli gamma mint --netuid 75 --hotkey <YOUR_GAMMA_HOTKEY> --amount-tao 10 --service-hotkey <HIPPIUS_SERVICE_HOTKEY>
```

`<HIPPIUS_SERVICE_HOTKEY>` will be published on this page at launch. A script can call `mint_gamma` directly and pass `<HIPPIUS_SPENDER>` as its `spender`. If you already hold a deposit, set its spender with `set_gamma_deposit_spender` instead. A daily spend cap on the deposit is respected: we can only spend what the cap allows at that moment.

## 2. Link the hotkey to your account (once)

A hotkey pays for one Hippius account. You prove you hold it by signing a challenge with it.

**With hipc**, pass the hotkey's words on stdin, best straight from your password manager's command line:

```bash
<your password manager prints the hotkey words> | hipc billing gamma hotkeys create --hotkey-file -
```

`--hotkey-file <path>` reads a file instead, which must be yours with mode `0600`. A file is not encrypted: delete it once the hotkey is linked. `hipc` asks for the challenge, checks that it is a link of that hotkey, signs it with the hotkey's key and sends only the signature. The words never leave your machine.

Anyone who holds the hotkey's words can link it to their own account, so keep them as private as any other key, and keep nothing but this deposit on that hotkey.

**With the API**, ask for a challenge, sign its `message` with the hotkey, and send the signature:

```bash
curl -s -X POST https://api.hippius.com/api/billing/gamma/hotkeys/challenge/ \
  -H "Authorization: Token YOUR_TOKEN" -H "Content-Type: application/json" \
  -d '{"hotkey": "<YOUR_GAMMA_HOTKEY>"}'
# 201 {"nonce": "4f1c…", "hotkey": "5FHn…", "message": "Hippius: pay with the gamma of 5FHn… for … nonce 4f1c…", "expires_at": "…"}

curl -s -X POST https://api.hippius.com/api/billing/gamma/hotkeys/ \
  -H "Authorization: Token YOUR_TOKEN" -H "Content-Type: application/json" \
  -d '{"nonce": "4f1c…", "signature": "0x…"}'
# 201 {"hotkey": "5FHn…", "linked_at": "…"}
```

Sign the exact bytes of `message` (UTF-8) with the hotkey's sr25519 key, and send the 64-byte signature as `0x` and 128 hex digits. A polkadot.js signature of the `<Bytes>…</Bytes>` wrapping of the same message is accepted too. In Python:

```python
from substrateinterface import Keypair
hotkey = Keypair.create_from_mnemonic(HOTKEY_WORDS)
signature = "0x" + hotkey.sign(challenge["message"]).hex()
```

A challenge is valid for 5 minutes and works once, even if the link fails. An account can link up to 10 hotkeys. `hipc billing gamma hotkeys delete <hotkey>` or `DELETE /api/billing/gamma/hotkeys/<hotkey>/` unlinks one (`204`, or `404` when it is not linked to your account); its gamma stays in the deposit.

## 3. Check the deposit

```bash
hipc billing gamma get
```

Each linked hotkey shows its deposit: `balance`, `spendable` (the balance as the daily cap limits it now), and `names_hippius`. If `names_hippius` is `false`, the deposit names another spender and we cannot spend it. `deposit` is `null` when the hotkey has no gamma on subnet 75, or when the chain could not be read: then the top-level `chain` is `unavailable`, so check again later.

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

Or `GET /api/billing/gamma/conversions/<id>/` and `GET /api/billing/gamma/conversions/`, which answers `{"results": [...]}`, newest first, up to 50. Check every few seconds; a conversion normally settles within a minute or two.

| Status | What it means |
|---|---|
| `pending` | Accepted, not yet sent to the chain |
| `submitting`, `submitted` | The spend is signed and being sent, or sent; waiting for a finalized block. A new conversion is refused while this one is in flight |
| `spent` | The spend is final and your balance has the credits. `transaction_id` is the payment |
| `skipped` | The chain skipped the spend, for example because the gamma was moved away (`skip_reason`). Nothing was spent or credited |
| `failed` | Never spent. Nothing was credited |

You are credited only once the spend is in a finalized block, and never twice. The conversion's `reference` is repeated in the chain's `GammaSpent` event, so you can match the spend on chain.

## Limits

- A conversion is at least **0.1 gamma** and at most **10,000 gamma**.
- Each account can convert up to **10,000 gamma in any 24 hours**, and all accounts together up to 50,000. The window is the last 24 hours, not a calendar day: `daily_cap` answers with what is `remaining` in it.
- Before spending, we check that the chain's TAO/USD price, the one gamma is minted at, is fresh and within **10 %** of ours. If it is not, the conversion is refused with `oracle_deviation` or `oracle_unavailable`: try again later.
- Credits are US dollars, like the rest of your balance.

## Risks

- **Gamma cannot be refunded or redeemed.** It cannot be sent to another coldkey or turned back into alpha or TAO. Once spent, it is gone. A refund, if any, is in credits.
- **If subnet 75 were dissolved, the chain would destroy all its gamma.** Gamma you have not converted would be lost. Convert what you mean to spend.
- If you move your gamma away before the spend, the chain skips it and nothing is charged.

## Error codes

Errors answer `{"code": "…", "detail": "…"}`, except the plain `404` at the end.

| HTTP | Code | What to do |
|---|---|---|
| 400 | `invalid_amount` | Send a positive number of gamma with at most 9 decimals |
| 400 | `amount_too_low`, `amount_too_high` | Convert at least 0.1 and at most 10,000 gamma |
| 400 | `invalid_hotkey` | Send the hotkey as an SS58 address |
| 400 | `invalid_challenge`, `challenge_expired` | Ask for a new challenge; each works once, for 5 minutes |
| 400 | `invalid_signature` | Sign the exact `message` with the hotkey's sr25519 key, as `0x` and 128 hex digits |
| 400 | `no_deposit`, `wrong_spender`, `insufficient_gamma` | Mint into the hotkey, name our spender, or convert less (`spendable` says how much) |
| 403 | `hotkey_not_linked` | Link the hotkey first (step 2) |
| 409 | `hotkey_linked_elsewhere` | Another account holds this hotkey; unlink it there first |
| 409 | `too_many_hotkeys` | Unlink a hotkey: an account links up to 10 |
| 409 | `conversion_in_flight` | Wait for the previous conversion to finish |
| 429 | `daily_cap`, `global_daily_cap` | Convert less, or wait for older conversions to leave the 24-hour window |
| 503 | `oracle_deviation`, `oracle_unavailable`, `price_unavailable`, `chain_unavailable`, `unavailable` | Try again later |
| 404 | (no body) | Gamma payments are not enabled yet, or the hotkey or conversion is not your account's |
