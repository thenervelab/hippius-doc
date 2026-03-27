---
description: Arion Storage Miner Overview
---

# Storage Miner Overview

A storage miner in the Hippius network is a node that provides decentralized storage capacity. Miners participate in the Arion network by storing shards of encrypted user data and proving their storage continuously to the blockchain. In return, they earn rewards for their contribution to the network.

## What a Miner Does

- **Stores Data Shards**: Receives and stores encrypted fragments (shards) of user files using Reed-Solomon erasure coding.
- **Proves Storage**: Continuously answers cryptographic challenges to prove they are storing the exact data they claim to hold.
- **Participates in Consensus**: Runs a Substrate blockchain node to sync network state, register their presence, and receive instructions.
- **Earns Rewards**: Gets compensated based on the amount of data stored and their reliability in answering challenges.

## System Requirements

To run a storage miner effectively, you must meet the following minimum requirements:

- **OS**: Ubuntu 22.04+ (or equivalent modern Linux distribution)
- **CPU**: 4+ dedicated cores (8+ vCPUs recommended)
- **RAM**: 16GB minimum (32GB+ recommended for ZFS)
- **Storage (Blockchain)**: 100GB+ SSD
- **Storage (Arion Data)**: **2TB+ minimum usable space** (NVMe/Enterprise SSDs preferred)
- **Network**: 1Gbps connection with a **static public IP address**

## Getting Started

Setting up a storage miner involves two main steps:

1. **[Running a Blockchain Node](./arion/running-blockchain-node.md)**: First, you need to set up and sync the Hippius Substrate node to connect to the network.
2. **[Running the Arion Miner](./arion/running-miner.md)**: Once your node is synced, you configure and start the Arion miner service to begin accepting storage and earning rewards.
