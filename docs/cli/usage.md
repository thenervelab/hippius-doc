---
id: usage
title: Miner CLI (miner-cli)
sidebar_label: Miner CLI
slug: /cli/usage
---

# Miner CLI

`miner-cli` is the command-line tool for registering and managing Arion storage miners on the Hippius blockchain. It handles the on-chain lifecycle: registration, deregistration, and claiming unbonded deposits.

:::note
This tool is for **miner operators**. If you're a developer looking to store files, use the [S3 API](/storage/s3/integration) instead.
:::

## Installation

Build from source (requires Rust):

```bash
git clone https://github.com/thenervelab/arion.git
cd arion
cargo build --release --bin miner-cli
# binary at: target/release/miner-cli
```

## Usage

```
miner-cli [OPTIONS] <COMMAND>
```

**Options:**

| Option | Env var | Description |
|---|---|---|
| `--chain-ws-url <URL>` | `CHAIN_WS_URL` | Substrate WebSocket endpoint (e.g. `wss://rpc.hippius.network`) |
| `--family-mnemonic <PHRASE>` | `FAMILY_MNEMONIC` | Mnemonic for the family (coldkey) account |
| `--family-mnemonic-file <PATH>` | `FAMILY_MNEMONIC_FILE` | Path to file containing the mnemonic (more secure) |

:::warning Security
The family mnemonic controls your miner registration and deposit. Use `--family-mnemonic-file` instead of passing it as a CLI argument to avoid it appearing in shell history.
:::

## Commands

### show-node-id

Display your miner's P2P identity (node ID). This is the Ed25519 public key that links your running miner to its on-chain registration.

```bash
miner-cli \
  --chain-ws-url wss://rpc.hippius.network \
  --family-mnemonic-file /secure/mnemonic.txt \
  show-node-id
```

Output:
```
Node ID: 185651f2fb19c919d40c3c58660cf463ebe7ded1c1a326eef4dad28292171cdb
```

---

### register-child

Register a new miner under a family account. The miner's node ID and a cryptographic signature are required — generate them with the `generate_registration_data` tool (see [Miner Setup](/earn/arion/running-miner#6-register-miner-in-arion-pallet)).

```bash
miner-cli \
  --chain-ws-url wss://rpc.hippius.network \
  --family-mnemonic-file /secure/mnemonic.txt \
  register-child \
  --child-ss58 5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty
```

**Registration model:**

```
Family account (coldkey — signs transactions, pays deposit)
    └── Child account (hotkey — receives mining rewards)
            └── NodeId (miner P2P identity)
```

---

### deregister-child

Begin the unbonding process for a registered miner. The miner is immediately removed from the network and stops receiving storage assignments. Your deposit enters an unbonding period.

```bash
miner-cli \
  --chain-ws-url wss://rpc.hippius.network \
  --family-mnemonic-file /secure/mnemonic.txt \
  deregister-child \
  --child-ss58 5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty
```

:::warning
You cannot re-register the same child account until the unbonding/cooldown period expires.
:::

---

### claim-unbonded

After the unbonding period ends, reclaim your deposit back to the family account.

```bash
miner-cli \
  --chain-ws-url wss://rpc.hippius.network \
  --family-mnemonic-file /secure/mnemonic.txt \
  claim-unbonded \
  --child-ss58 5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty
```

To check if the unbonding period has ended, query the chain in [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.hippius.network#/chainstate):
- **Developer → Chain State → arion → childRegistrations(AccountId32)**
- Enter your child account address and check `unbonding_end` block number

---

## Full miner setup

For the complete miner setup guide including hardware requirements, building the miner binary, and the full registration flow, see:

- [Running a Blockchain Node →](/earn/arion/running-blockchain-node)
- [Running a Miner →](/earn/arion/running-miner)
