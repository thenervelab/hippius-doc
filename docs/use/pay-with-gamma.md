---
id: pay-with-gamma
title: Pay with Gamma (Subnet 75)
sidebar_label: Pay with Gamma
slug: /use/pay-with-gamma
description: Pay Hippius with Bittensor subnet 75 gamma from a hotkey, read the hotkey's balance, and call the Hippius API with requests signed by that hotkey (btauth/1). No browser, email or API token needed.
---

# Pay with Gamma (Subnet 75)

[Gamma](https://www.bittensor.com/docs/guides/gamma) is a subnet's prepaid credit on Bittensor. It is minted by burning that subnet's alpha, and **one gamma is worth one US dollar**. Hippius accepts the gamma of subnet 75, following Bittensor's Gamma Integration Standard V1.3:

1. Your coldkey mints subnet 75 gamma into a deposit at one of your hotkeys.
2. That hotkey spends the gamma at the Hippius service hotkey. The spend is free of fees.
3. Hippius reads the chain and adds one US dollar per gamma to the hotkey's Hippius account, within about 10 finalized blocks (about two minutes).
4. The hotkey signs its requests to the [Hippius API](/use/api) (btauth/1) and acts as that account. Each signed request costs a small fee from the balance.

An agent that holds only a hotkey can do all of this: no browser, no sign-up, no email, no API token, no account linking. The hotkey is the account: its first credited spend opens it, and its signatures are the only credential. A hotkey we have never seen that signs a paid request with no balance gets `402 insufficient_balance`, not a sign-in error.

The Hippius service hotkey on subnet 75 is:

```
5G1Qj93Fy22grpiGKq6BEvqqmS2HVRs3jaEdMhq9absQzs6g
```

The machine-readable description of the service, the one the chain points to, is [`https://api.hippius.com/api/billing/gamma/service.json`](https://api.hippius.com/api/billing/gamma/service.json). It lists the service hotkey (`publishers`); the API's OpenAPI spec, covering every route (`services`, type `openapi`: `https://api.hippius.com/openapi.json`, OpenAPI 3.0, with the `btauth` security scheme) and its base URL; the balance URL, the signature scheme and how the balance is read (`payments`); and the machine-readable price list (`pricing`: [`https://api.hippius.com/api/billing/gamma/pricing`](https://api.hippius.com/api/billing/gamma/pricing), which links each product's price and catalog routes). An agent that knows only netuid 75 finds everything from there.

## The hotkey is the account

Each hotkey that spends gamma at Hippius has one Hippius account, named by the hotkey's address. It is the same account a 12-word access-key sign-in reaches for that same address. The account is opened the first time the hotkey's spend is credited or the hotkey signs a request.

Use a hotkey of its own for this: anyone who holds its words can spend its gamma and act as its account. Never use a staking hotkey, and never give anyone your **coldkey** words: Hippius never needs them.

If you linked a hotkey to an existing Hippius account in the earlier version of gamma payments, its spends are credited to that linked account. Such a hotkey cannot sign API requests for that account: sign in to it with its token or its usual login.

## 1. Mint gamma into a deposit at your hotkey

Mint with `btcli`, from the coldkey that owns the hotkey (`pip install "bittensor>=11.3.5"`). The chain's own guide explains minting and deposits: [Gamma](https://www.bittensor.com/docs/guides/gamma).

```bash
btcli gamma mint --netuid 75 --hotkey <YOUR_HOTKEY> --amount-tao 0.02 -w <YOUR_COLDKEY>
```

## 2. Spend it at Hippius

The hotkey spends from its own deposit at the Hippius service hotkey:

```bash
btcli gamma spend --netuid 75 \
  --service-hotkey 5G1Qj93Fy22grpiGKq6BEvqqmS2HVRs3jaEdMhq9absQzs6g \
  --amount-gamma 5 -w <YOUR_COLDKEY> -H <YOUR_HOTKEY>
```

A spend is at least 0.1 gamma, unless it empties the deposit. The chain burns the gamma and adds it to the total your hotkey has spent at Hippius. Hippius credits what that total grew by, once, at a finalized block: one US dollar per gamma, within about 10 finalized blocks. The credit is a payment like a card or USDC top-up: it is added to the account's balance and appears on its invoices.

## 3. Read the balance

Anyone can read a hotkey's balance. No token or signature is needed; the total spendable balance needs a request signed by the hotkey (the document's `balance_auth` says so):

```bash
curl -s "https://api.hippius.com/api/billing/gamma/balance?hotkey=<YOUR_HOTKEY>"
```

```json
{"hotkey": "5F…", "credited_usd": "5.000000000", "used_usd": "1.250000000", "remaining_usd": "3.750000000"}
```

| Field | Meaning |
|---|---|
| `credited_usd` | Every gamma payment the hotkey's account has received |
| `remaining_usd` | Signed by the hotkey: the account's available balance, however it was funded (gamma, card, USDC, …). Unsigned: the gamma credited less what signed requests used |
| `used_usd` | `credited_usd` minus `remaining_usd`, never below 0 |

The amounts are US dollars, as decimal strings. A spend shows here as soon as its block is finalized: the balance request credits it first. A hotkey that has never spent at Hippius answers zeros; a total below 0.1 gamma is credited once it reaches 0.1. An address that is not an SS58 address is a `400 invalid_hotkey`. The route allows 30 requests a minute per client address, and a few reads a minute per hotkey (`429 gamma_balance_rate_limited`, with `Retry-After`).

Unsigned, the answer shows the gamma alone, for every account: `remaining_usd` is the gamma credited less what the account's signed requests were charged, and `used_usd` is that charge. It never shows what the account holds from other payments. Sign the balance request with the hotkey (step 4) to see the full figures of its own account.

## 4. Sign requests with your hotkey (btauth/1) {#sign-requests}

A request signed by the hotkey acts as the hotkey's account on every route of the Hippius REST API (`https://api.hippius.com`). It gets exactly what that account gets with an API token: the same permissions, limits and product prices. The scheme is Bittensor's signed requests, btauth/1 ([signed-requests guide](https://www.bittensor.com/docs/guides/signed-requests)).

### What it covers

btauth/1 is accepted by the REST API only. It is one more way to sign in, next to the API token, OAuth and the 12-word access key, and it replaces none of them:

- **Object Storage (S3):** the S3 endpoint keeps using S3 access keys. An agent creates its access key through the REST API, signed with btauth/1 (`POST https://api.hippius.com/api/objectstore/master-tokens/` with `{"name": "my-agent"}`; the secret is shown once). It then uses that key with `https://s3.hippius.com` as usual.
- **Drive, Hub robot logins, service tokens, OAuth and API tokens** work as they did.
- The per-request fee below applies to REST API calls signed with btauth/1 only. S3, Drive and other traffic is billed as usual.

### The headers

| Header | Value |
|---|---|
| `X-Bittensor-Version` | `1` |
| `X-Bittensor-Hotkey` | your hotkey, SS58 |
| `X-Bittensor-Receiver` | `5G1Qj93Fy22grpiGKq6BEvqqmS2HVRs3jaEdMhq9absQzs6g` (the Hippius service hotkey) |
| `X-Bittensor-Nonce` | the current Unix time in nanoseconds, as a decimal string |
| `X-Bittensor-Crypto` | absent for an sr25519 hotkey (the usual one); `ed25519` for an ed25519 hotkey |
| `X-Bittensor-Signature` | `0x` and the signature as lowercase hex |

Send no `Authorization` header with them.

### The signed message

The signature covers the UTF-8 bytes of these eight lines joined by `\n`, with no newline at the end:

```
btauth/1
sr25519
GET
/api/billing/credits/balance/?x=1
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
1763827200000000000
<your hotkey>
5G1Qj93Fy22grpiGKq6BEvqqmS2HVRs3jaEdMhq9absQzs6g
```

In order: `btauth/1`; the scheme (`sr25519` or `ed25519`); the HTTP method in capitals; the path and query exactly as sent, percent-encoded; the SHA-256 of the exact body bytes, as lowercase hex (the hash of an empty body above); the nonce; your hotkey; the receiver. An sr25519 signature uses the substrate signing context, as chain transactions do.

Sign a fresh nonce for every request, retries included. A nonce more than 10 seconds old or 2 seconds ahead is refused, and each nonce works once.

The `Host` header is not part of the signed message, as in Bittensor's scheme: the receiver hotkey is what binds a signature to Hippius. Send requests to `https://api.hippius.com` only, so that they are not readable by anyone in between.

### With the Bittensor SDK

```python
import bittensor as bt
import requests

API = "https://api.hippius.com"
SERVICE_HOTKEY = "5G1Qj93Fy22grpiGKq6BEvqqmS2HVRs3jaEdMhq9absQzs6g"
wallet = bt.Wallet(name="my_coldkey", hotkey="my_hotkey")

path = "/api/billing/credits/balance/"
headers = bt.http_auth.sign(wallet, method="GET", path=path, body=b"", receiver_ss58=SERVICE_HOTKEY)
print(requests.get(API + path, headers=headers).json())
```

For a request with a body, sign the exact bytes you send:

```python
import json

path = "/api/objectstore/master-tokens/"
body = json.dumps({"name": "my-agent"}).encode()
headers = bt.http_auth.sign(wallet, method="POST", path=path, body=body, receiver_ss58=SERVICE_HOTKEY)
r = requests.post(API + path, data=body, headers={**headers, "Content-Type": "application/json"})
```

### Without the SDK

Only `hashlib` and `substrate-interface` are needed:

```python
import hashlib
import time

import requests
from substrateinterface import Keypair

API = "https://api.hippius.com"
SERVICE_HOTKEY = "5G1Qj93Fy22grpiGKq6BEvqqmS2HVRs3jaEdMhq9absQzs6g"
hotkey = Keypair.create_from_mnemonic("<your hotkey's 12 words>")


def signed(method: str, target: str, body: bytes = b"") -> dict:
    nonce = str(time.time_ns())
    message = "\n".join([
        "btauth/1", "sr25519", method.upper(), target, hashlib.sha256(body).hexdigest(),
        nonce, hotkey.ss58_address, SERVICE_HOTKEY,
    ]).encode()
    return {
        "X-Bittensor-Version": "1",
        "X-Bittensor-Hotkey": hotkey.ss58_address,
        "X-Bittensor-Receiver": SERVICE_HOTKEY,
        "X-Bittensor-Nonce": nonce,
        "X-Bittensor-Signature": "0x" + hotkey.sign(message).hex(),
    }


target = "/api/billing/credits/balance/"
print(requests.get(API + target, headers=signed("GET", target)).json())
```

`target` must be exactly what goes on the wire: put the query in it (`/api/x/?page=2`) and percent-encode it yourself, so that the HTTP client sends it unchanged.

## 5. What a signed request costs

Each signed request costs **0.001 US dollar**, taken from the account's balance before the request runs. Hippius may change this price; the current one is `signed_request.price_usd` in the [price list](https://api.hippius.com/api/billing/gamma/pricing), which also lists the free reads and links each product's prices. What the request does is billed as usual on top (a VM's hours, storage, …).

These are free, and never refused for the balance: reading the balance, the service document, the price list, the account's credit balance (`GET /api/billing/credits/balance/`), its transactions (`GET /api/billing/transactions/`), its profile (`GET /api/user-profile/`), the gamma overview, and `OPTIONS`.

When the balance cannot cover a request, Hippius first credits any gamma your hotkey has just spent, then answers:

```
HTTP/1.1 402 Payment Required

{"error": "insufficient_balance", "detail": "…"}
```

The request did nothing. Spend more gamma (step 2) and send it again with a fresh nonce.

## Error codes

A signed request that is refused answers `{"error": "<code>", "detail": "<what to fix>"}`. A `401` also carries `WWW-Authenticate: btauth/1`.

| HTTP | Code | What to do |
|---|---|---|
| 400 | `btauth_ambiguous_credentials` | Send the btauth/1 headers or an `Authorization` header, not both |
| 401 | `btauth_unknown_version` | Send `X-Bittensor-Version: 1` |
| 401 | `btauth_missing_header` | Send every header in the table above |
| 401 | `btauth_bad_header` | Fix the header named in `detail`: an SS58 hotkey, a nanosecond nonce, `0x` and 128 lowercase hex digits |
| 401 | `btauth_unsupported_scheme` | Sign with an sr25519 hotkey (no `X-Bittensor-Crypto`) or an ed25519 one; `hashed` hotkeys are not accepted |
| 401 | `btauth_wrong_receiver` | Name the Hippius service hotkey in `X-Bittensor-Receiver` |
| 401 | `btauth_stale_nonce` | Sign again with the current time; check your clock |
| 401 | `btauth_bad_signature` | Sign the method, the path and query exactly as sent, and the SHA-256 of the exact body bytes |
| 401 | `btauth_replayed_nonce` | Sign every request, retries included, with a new nonce |
| 401 | `btauth_protected_sender` | This hotkey is a hashed account on chain; its sr25519/ed25519 signatures are not accepted |
| 401 | `btauth_chain_unavailable` | The chain could not be read to check the sender; retry shortly |
| 401 | `btauth_account_unavailable` | This hotkey pays an existing Hippius account (sign in to that account another way), or it cannot be a Hippius account (for example, a Hippius-generated address or a provider's key); use another hotkey |
| 429 | `btauth_rate_limited` | Too many new signers from your address or for this hotkey; wait for `Retry-After` |
| 401 | `btauth_not_accepted_here` | This route does not take signed requests (staff and session routes); use an API token |
| 402 | `insufficient_balance` | Spend gamma at Hippius, then retry |
| 413 | `btauth_body_too_large` | The body is too large to be signed; send a smaller one |
| 429 | `btauth_too_many_failures` | Too many bad signatures from your address; wait for `Retry-After` |
| 429 | `new_account_limit` | Too many new accounts from your address today; retry later |

The balance route answers `400 invalid_hotkey` for an address that is not SS58.

## Risks

- **Gamma cannot be refunded or redeemed.** Once spent at Hippius it is gone; what you get is balance on the hotkey's account.
- **If subnet 75 were dissolved, the chain would destroy all its gamma.** Gamma you have not spent would be lost. Spend what you mean to use.
- **The hotkey is the account.** Keep its words as private as any other key.
