---
sidebar_position: 5
description: 4
---

# Decentralized Storage Systems

Learn about Hippius's storage architecture that combines reliability with decentralization.

## Arion Storage

Arion is Hippius's purpose-built decentralized storage engine. It replaces search-based content discovery with mathematical data placement: instead of asking "who has this file?", Arion computes exactly where each shard lives using the CRUSH algorithm and a blockchain-published cluster map.

### Key Features

- **Deterministic Placement**: The CRUSH algorithm maps data shards to miners without a central lookup service
- **Reed-Solomon Erasure Coding**: Files are split into 10 data shards and 20 parity shards, tolerating up to 20 simultaneous miner failures
- **QUIC-based P2P Networking**: Built on Iroh for fast, parallel shard retrieval over encrypted QUIC connections
- **Active Health Monitoring**: Validators continuously verify shard integrity and automatically reconstruct missing data
- **Auto-Repair**: If a miner goes offline, the network reconstructs and redistributes affected shards to maintain redundancy

### How It Works

1. When a file is stored, it is split into data and parity shards via Reed-Solomon erasure coding
2. The CRUSH algorithm deterministically assigns each shard to independent miners across the network
3. Shards are streamed to miners in parallel over QUIC connections
4. Validators monitor shard health and trigger auto-repair when miners leave or fail
5. On retrieval, shards are fetched in parallel and reassembled — only 10 of 30 shards are needed to reconstruct the original data

## S3-Compatible Access

Users interact with Arion storage through a standard S3-compatible API. Any tool or library that speaks S3 (AWS CLI, boto3, MinIO SDK) works with Hippius out of the box.

The S3 gateway handles authentication, encryption, chunking, and backend coordination — Arion is the storage engine underneath.

See the [Quickstart guide](/use/quickstart) to get started.

## Storage Economics

Both storage and compute systems are integrated into Hippius's economic model:

- Miners earn 60% of storage fees for maintaining data
- Validators earn a portion of the 30% allocated to network security for overseeing storage integrity
- The 10% treasury allocation helps fund ongoing development of storage systems

## Choosing the Right Access Method

- **S3 API**: For applications, automation, and programmatic access — use any S3-compatible client
- **Desktop App**: For a graphical interface to manage files and folders
- **Console**: For account management, billing, and credential creation at [console.hippius.com](https://console.hippius.com)
