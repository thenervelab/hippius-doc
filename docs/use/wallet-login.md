---
id: wallet-login
title: Sign In with an Access Key from Your App
sidebar_label: Access Key Sign-In API
slug: /use/wallet-login
description: The challenge and signature flow behind "Continue with Access Key", for apps that sign users in to Hippius with their 12-word key.
---

import Unordered from '@site/src/components/Unordered';

# Sign In with an Access Key from Your App

This page is for developers building an app that signs a user in to Hippius with their 12-word access key, the way the console's **Continue with Access Key** does. The key never leaves the device: your app derives two keys from it, signs a server challenge with both, and gets back an API token.

:::warning Raw Substrate signatures only
Since 2026-10-27 the Substrate signature must be over the challenge's raw bytes. A signature over the `<Bytes>...</Bytes>` wrapping that the polkadot.js browser extension's `signRaw` adds is refused with `401 substrate_signature_invalid`. Sign with the key itself, as below, not through a browser extension.
:::

## What Your App Derives from the Key

From the same 12 words, your app needs two key pairs:

| Key | Derivation | Used for |
|-----|-----------|----------|
| Ethereum | BIP-44 path `m/44'/60'/0'/0/0` (viem `mnemonicToAccount`, ethers `Wallet.fromPhrase`) | `address` and `signature` |
| Substrate | sr25519, no derivation path (polkadot.js `Keyring({ type: "sr25519" }).addFromMnemonic`) | `substrate_address` (SS58, prefix 42, starts with `5`) and `substrate_signature` |

The account is named by the Substrate address. Using another derivation gives a different, empty account.

## Step 1: Request a Challenge

```bash
curl -s -X POST https://api.hippius.com/api/auth/mnemonic/ \
  -H "Content-Type: application/json" \
  -d '{"address": "0xYOUR_ETH_ADDRESS", "substrate_address": "5YOUR_SUBSTRATE_ADDRESS"}'
```

```json
{
  "challenge": "3f9c...e21a",
  "message": "Please sign this message to verify your ownership: 3f9c...e21a",
  "expires_in": 300
}
```

Sign `message` exactly as returned. Don't build it yourself: the server rebuilds it from what it stored and may change its format. The challenge is valid for 300 seconds and works once.

## Step 2: Sign and Verify

Sign `message` twice, then send both signatures with the `challenge` to `POST /api/auth/verify/`:

```typescript title="wallet-login.ts"
import { Keyring } from "@polkadot/keyring";
import { stringToU8a, u8aToHex } from "@polkadot/util";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import { mnemonicToAccount } from "viem/accounts";

const API = "https://api.hippius.com/api";

export async function walletLogin(mnemonic: string): Promise<string> {
  await cryptoWaitReady();
  const substrate = new Keyring({ type: "sr25519" }).addFromMnemonic(mnemonic);
  const eth = mnemonicToAccount(mnemonic);

  const challengeRes = await fetch(`${API}/auth/mnemonic/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address: eth.address, substrate_address: substrate.address }),
  });
  if (!challengeRes.ok) throw new Error(`challenge: ${challengeRes.status} ${await challengeRes.text()}`);
  const { challenge, message } = (await challengeRes.json()) as { challenge: string; message: string };

  // EIP-191 personal_sign over the message
  const signature = await eth.signMessage({ message });
  // sr25519 over the raw message bytes: no <Bytes> wrapping
  const substrateSignature = u8aToHex(substrate.sign(stringToU8a(message)));

  const verifyRes = await fetch(`${API}/auth/verify/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      address: eth.address,
      substrate_address: substrate.address,
      challenge,
      signature,
      substrate_signature: substrateSignature,
    }),
  });
  if (!verifyRes.ok) throw new Error(`verify: ${verifyRes.status} ${await verifyRes.text()}`);
  const { token } = (await verifyRes.json()) as { token: string };
  return token;
}
```

A successful verify returns:

```json
{
  "token": "YOUR_TOKEN",
  "user_id": 123,
  "username": "user_5...",
  "substrate_address": "5...",
  "is_new": false
}
```

Send the token as `Authorization: Token YOUR_TOKEN` on the [Management API](/use/api). The first verify for a new Substrate address creates the account (`is_new: true`). An account made this way is wallet-only: it has no free Drive plan.

:::tip Always send substrate_signature
The server needs `substrate_signature` to open an account, and on every login until the account has given one once. It is also how an account moves to another Ethereum key. Sending it on every login, as the Hippius apps do, avoids all three refusals.
:::

## Errors

| Status | Body | Meaning |
|--------|------|---------|
| `400` | `"error": "Both Ethereum and Substrate addresses are required"` | Step 1 is missing a field. A Substrate address not starting with `5` (SS58 prefix 42) is also a `400` |
| `400` | `"error": "Invalid or expired challenge"` | The challenge is unknown, older than 300 s, already used, or was replaced by a newer request for the same address. Request a new one |
| `400` | `"error": "Invalid substrate address"` | `substrate_address` differs from the one sent in step 1 |
| `401` | `"error": "Invalid signature"` | The Ethereum signature does not match `address` |
| `401` | `"code": "substrate_signature_invalid"` | `substrate_signature` is malformed, from another key, or over the `<Bytes>` wrapping |
| `401` | `"code": "substrate_signature_required"` | A new account, or one that never gave a Substrate signature: send `substrate_signature` |
| `401` | `"code": "evm_key_mismatch"` | Another Ethereum key than the one on the account. A valid `substrate_signature` moves the account to the new key, and revokes everything issued before: API tokens, S3 keys, SSH keys, linked Google/GitHub/Apple sign-ins |
| `401` | `"code": "substrate_address_not_a_login"` | The Substrate key already belongs to another account or a provider account |
| `401` | `"code": "substrate_address_invalid"` | The Substrate address cannot be decoded, or is another spelling of an existing account's |
| `401` | `"code": "account_inactive"` | The account is disabled |
| `429` | `Retry-After` header | Too many requests from your address, see below |

Each client address may request 30 challenges and 10 verifies per minute. Ten failed verifies of one wallet from one address lock that wallet out from that address for 15 minutes. New accounts are limited per address per day.

## Related

<Unordered>
  <li><a href="/use/api">Hippius Management API</a>: what to do with the token</li>
  <li><a href="/use/console/getting-started#signing-in">Console sign-in</a>: the ways users sign in</li>
  <li><a href="/learn/mnemonic-auth">Access key authentication</a>: how the access key works for users</li>
</Unordered>
