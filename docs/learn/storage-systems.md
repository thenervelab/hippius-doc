---
sidebar_position: 5
description: How Hippius stores your data across a decentralized network using Arion, Reed-Solomon erasure coding, and the CRUSH algorithm.
---

# How Storage Works

Hippius stores data on **Arion** — a purpose-built distributed storage engine. This page explains the architecture: how files are split, placed, and recovered across the network.

## The short version

When you upload a file:

1. It's split into **30 shards** (10 data + 20 parity) using Reed-Solomon erasure coding
2. Each shard is placed on a different miner using the **CRUSH algorithm**
3. To download, only **10 of 30 shards** are needed — the other 20 are redundancy

This means up to 20 miners can fail simultaneously and your file is still fully recoverable.

## Architecture

```
You
 │ HTTPS
 ▼
Gateway (:3000)          ← HTTP ingress, handles auth + chunking
 │ P2P
 ▼
Validator (:3002)        ← encodes with Reed-Solomon, runs CRUSH placement
 │ QUIC (Iroh)
 ├──► Miner A  ← shard 1
 ├──► Miner B  ← shard 2
 ├──► Miner C  ← shard 3
 │    ...
 └──► Miner N  ← shard 30

Warden (:3003)           ← audits miners with proof-of-storage challenges
Chain Submitter (:3004)  ← publishes cluster maps to the blockchain
```

## Reed-Solomon erasure coding

Files are encoded using Reed-Solomon with **k=10, m=20** (2 MiB stripes):

- 10 data shards contain the original content
- 20 parity shards allow reconstruction if any data shards are lost
- Any 10 of the 30 shards reconstruct the original file
- Tolerates up to **20 simultaneous miner failures**

This is the same technique used in RAID storage and data center infrastructure.

## CRUSH placement

Instead of a central index ("which miner has shard 7?"), CRUSH computes the answer mathematically from a cluster map. This means:

- **No central lookup** — any node can compute shard locations independently
- **Deterministic** — same input always produces the same placement
- **Topology-aware** — shards spread across different miners/regions to reduce correlated failures

The cluster map is published to the Hippius blockchain by the chain submitter, making it verifiable and tamper-resistant.

## Network layer (Iroh + QUIC)

Shard transfers happen over **QUIC** connections using [Iroh](https://iroh.computer/):

- Encrypted and authenticated by default
- Multiplexed — multiple shards transfer in parallel over a single connection
- Direct UDP paths between nodes (hole-punching), relay fallback when needed
- Each miner's identity is its Ed25519 public key (node ID)

## Automatic repair

The **Validator** runs a rebuild agent that:

1. Monitors miner health via heartbeats
2. Detects when a miner goes offline
3. Fetches k=10 shards from remaining miners
4. Reconstructs the missing shards
5. Places them on new miners using CRUSH

The **Warden** audits miners with cryptographic proof-of-storage challenges (Plonky3 ZK circuits) to verify they're actually storing the data they claim to store.

## Encryption

Objects are encrypted with per-object NaCl keys before storage. Key management uses envelope encryption (KMS in production). Miners store only encrypted bytes — they cannot read your data.

## S3 compatibility

All of this happens transparently behind a standard S3 API. You use `aws s3 cp`, boto3, rclone — Arion handles the rest.

See the [Quickstart guide](/use/quickstart) or pick a [client guide](/storage/s3/python) to get started.

## Storage economics

| Recipient | Share | Role |
|---|---|---|
| Miners | 60% | Store and serve shards |
| Validators | 30% | Encode, place, audit, repair |
| Treasury | 10% | Protocol development |
