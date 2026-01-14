---
sidebar_position: 6
description: 3
---

import ArchitectureDiagram from '@site/src/components/ArchitectureDiagram';

# System Architecture

This page provides a comprehensive overview of the Hippius system architecture, showing how different components interact within the ecosystem.

## Architecture Diagram

The following diagram illustrates the flow of data, transactions, and rewards within the Hippius network:

<ArchitectureDiagram />
<br/>

## Key Components

### Client Interaction

- Clients can purchase storage and compute services using FIAT, Alpha, or TAO
- Payments are processed through the dashboard interface
- Credits are created in the marketplace with corresponding alpha deposits

### Blockchain Infrastructure

- **Bittensor Blockchain**: The parent blockchain that Hippius connects to as a subnet
- **Hippius Blockchain**: Powered by Substrate with its native currency (alpha)
- **Bridge**: Allows alpha to move between Hippius and Bittensor blockchains
- **Validators**: Produce blocks, assign tasks to miners, and report weights to Bittensor

### Marketplace

- Central hub for service requests
- Manages credit system and payment processing
- Submits requests to validators for miner assignment

### Miners

1. **S3 Storage Miners**:

   - Provide volume-based storage with authentication services
   - Run offchain workers to interact with the blockchain

2. **Arion Storage Miners**:

   - Provide deterministic distributed storage using the CRUSH algorithm
   - Store encrypted data shards as part of the Reed-Solomon erasure coding scheme (10+20)
   - Emit signed heartbeats every 30 seconds for health monitoring
   - Content-addressed by BLAKE3 hash for data integrity verification
   - Run offchain workers to interact with the Substrate blockchain
   - Participate in Grid Streaming for parallel data retrieval via QUIC protocol

3. **Compute Miners**:
   - Provide virtual machine environments for computation
   - Support smart contract execution
   - Run offchain workers to interact with the blockchain

<br/>
### Arion Miner ↔ Blockchain Interaction

Arion miners interact with the Substrate blockchain through several key mechanisms:

| Component               | Blockchain Interaction                                                                                |
| ----------------------- | ----------------------------------------------------------------------------------------------------- |
| **Cluster Map**         | Published to the blockchain; miners register their storage capacity and receive placement assignments |
| **Heartbeats**          | Miners emit signed heartbeats; Validators monitor liveness and update on-chain status                 |
| **Placement Groups**    | Blockchain maintains PG-to-Miner mappings calculated via `CRUSH(PG_ID, Cluster_Map)`                  |
| **Reputation Scoring**  | On-chain metrics track age, uptime, and integrity audit results                                       |
| **Reward Distribution** | Blockchain distributes Alpha rewards based on storage provision and successful audits                 |

### Arion Miner Node Architecture

Each Arion miner node operates as part of a decentralized mesh network with the following internal architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                    ARION MINER NODE                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌──────────────────────────────────────────────────────┐  │
│   │                 BLOCKCHAIN LAYER                     │  │
│   │  • Substrate Client (Hippius Full Node)              │  │
│   │  • Offchain Worker for task coordination             │  │
│   │  • Signed Heartbeat Emission (every 30s)             │  │
│   └──────────────────────────────────────────────────────┘  │
│                           │                                 │
│                           ▼                                 │
│   ┌──────────────────────────────────────────────────────┐  │
│   │                  STORAGE ENGINE                      │  │
│   │  • CRUSH Placement Calculator                        │  │
│   │  • Placement Group (PG) Manager                      │  │
│   │  • Reed-Solomon Shard Storage (10+20 scheme)         │  │
│   │  • BLAKE3 Content Addressing & Integrity             │  │
│   └──────────────────────────────────────────────────────┘  │
│                           │                                 │
│                           ▼                                 │
│   ┌──────────────────────────────────────────────────────┐  │
│   │                  NETWORK LAYER                       │  │
│   │  • QUIC Protocol (RFC 9000) for Grid Streaming       │  │
│   │  • TLS 1.3 Encryption with Key Rotation              │  │
│   │  • Ed25519 Node Identity                             │  │
│   │  • DERP Relay for NAT Traversal                      │  │
│   └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Key Components

| Component            | Description                                                                   |
| -------------------- | ----------------------------------------------------------------------------- |
| **Substrate Client** | Connects to the Hippius blockchain for coordination and state synchronization |
| **Offchain Worker**  | Handles storage tasks, responds to validator assignments, submits proofs      |
| **CRUSH Calculator** | Locally computes placement group assignments using the cluster map            |
| **Shard Storage**    | Stores encrypted data shards with Reed-Solomon erasure coding                 |
| **BLAKE3 Hasher**    | Provides content-addressing and integrity verification for all shards         |
| **QUIC Transport**   | Enables multiplexed, low-latency data streaming to Gateways and users         |

#### Miner Lifecycle

1. **Registration**: Miner registers on-chain with storage capacity and stake
2. **Map Sync**: Downloads the Cluster Map from the blockchain
3. **Heartbeat Loop**: Emits signed heartbeats every 30 seconds to prove liveness
4. **Shard Reception**: Receives and stores shards based on CRUSH placement assignments
5. **Grid Streaming**: Serves shard requests via parallel QUIC streams
6. **Audit Response**: Responds to Validator integrity challenges with shard proofs
7. **Reward Collection**: Receives Alpha rewards based on Ranking Pallet scores

For detailed technical information about Arion, see [Arion Storage Architecture](/learn/arion-storage-architecture).

### Reward Distribution

- Marketplace revenue is distributed based on service usage:
  - 60% to miners providing the resources
  - 30% to validators and stakers securing the network
  - 10% to treasury for ongoing development
- All rewards are distributed in Alpha, which can be bridged to Bittensor

## Workflow

1. Clients purchase services through the dashboard
2. The marketplace creates credits and deposits the alpha equivalent
3. When clients consume services, requests are submitted to validators
4. Validators assign appropriate miners to fulfill the request
5. Miners provide the requested service (storage or compute)
6. Rewards are distributed according to the allocation formula
7. Validators evaluate miner performance and report weights to Bittensor

This architecture ensures a decentralized, efficient, and economically sustainable ecosystem for storage and compute services.
