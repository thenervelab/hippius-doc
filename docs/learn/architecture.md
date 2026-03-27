---
sidebar_position: 6
description: Comprehensive overview of the Hippius system architecture and component interactions.
---

# System Architecture

This page provides a comprehensive overview of the Hippius system architecture, showing how different components interact within the ecosystem to provide decentralized storage and compute.

## Overview

Hippius operates as a decentralized network that connects clients needing storage and compute resources with miners providing those services. The architecture ensures secure, reliable, and verifiable service delivery through a combination of cryptographic proofs, distributed storage algorithms, and blockchain-based coordination.

## Component Map

The core infrastructure relies on several specialized node types working together:

```text
Client Application (S3 API / Dashboard)
 │
 ▼
Gateway                  ← Handles HTTP ingress, authentication, and request routing
 │
 ▼
Validator                ← Orchestrates data placement, erasure coding, and task assignment
 │
 ├──► Miner A            ← Stores data shards or executes compute tasks
 ├──► Miner B            ← Stores data shards or executes compute tasks
 ├──► Miner C            ← Stores data shards or executes compute tasks
 │    ...
 └──► Miner N            ← Stores data shards or executes compute tasks

Warden                   ← Audits miners with cryptographic proof-of-storage challenges
Chain Submitter          ← Publishes cluster maps and state to the blockchain
```

### Key Roles

- **Gateway**: The entry point for client requests, providing standard APIs (like S3 compatibility) and handling authentication.
- **Validator**: The orchestrator that processes data (e.g., Reed-Solomon encoding), determines placement using the CRUSH algorithm, and assigns tasks to miners.
- **Miner**: The resource providers in the network. Storage miners store encrypted data shards, while compute miners provide virtual machine environments.
- **Warden**: Responsible for verifying that miners are actually providing the services they claim, using zero-knowledge proofs (Plonky3 ZK circuits).
- **Chain Submitter**: Bridges the off-chain activities with the on-chain state, ensuring verifiable records of the network topology and storage proofs.

## Data Flow

### Uploading Data
1. A client sends a file via the Gateway using standard protocols (e.g., S3 API).
2. The Gateway authenticates the request and passes the data to a Validator.
3. The Validator encrypts the data and splits it into multiple shards (e.g., 10 data + 20 parity) using Reed-Solomon erasure coding.
4. The Validator uses the CRUSH algorithm to determine the optimal, deterministic placement of these shards across available Miners.
5. Shards are securely transferred to the assigned Miners over the network.

### Downloading Data
1. A client requests a file through the Gateway.
2. The Validator uses the CRUSH algorithm to locate the Miners holding the file's shards.
3. The Validator retrieves the necessary minimum number of shards (e.g., any 10 out of 30) from the Miners.
4. The Validator reconstructs the original file, decrypts it, and streams it back to the client via the Gateway.

## Network Layer

Communication between nodes (Validators, Miners, Wardens) happens over **QUIC** connections using **Iroh**. This provides:
- **Security**: Connections are encrypted and authenticated by default, using Ed25519 public keys as node identities.
- **Performance**: Multiplexed transfers allow multiple data shards to be sent in parallel over a single connection.
- **Connectivity**: Direct UDP paths with hole-punching capabilities and fallback relays ensure reliable peer-to-peer communication even across complex network topologies.

## Blockchain Layer

Hippius utilizes a dual-blockchain approach to manage state, identity, and economics:

- **Hippius Blockchain**: A Substrate-based chain that maintains the network state, manages the native currency (Alpha), and records cluster maps published by Chain Submitters.
- **Bittensor Network**: Hippius connects to Bittensor as a subnet. Validators report miner performance (weights) to Bittensor, integrating with its broader decentralized intelligence and incentive mechanisms.
- **Bridge**: A cross-chain bridge facilitates the seamless transfer of value (Alpha/TAO) between the Hippius and Bittensor ecosystems.

This layered architecture ensures that Hippius remains decentralized, fault-tolerant, and economically aligned across all participants.
