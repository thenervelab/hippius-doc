---
sidebar_position: 5
description: 4
---

# Decentralized Storage Systems

Learn about Hippius's storage solutions that combine reliability with decentralization.

## Storage Options Overview

Hippius offers two complementary storage systems, each with unique advantages:

1. **Arion Distributed Storage**: Deterministic, content-addressed storage with self-healing and parallel retrieval
2. **Hybrid S3 Storage**: S3-compatible object storage backed by decentralized storage volumes

These systems provide different approaches to data storage, allowing users to choose the right solution for their specific needs.

## Arion Distributed Storage

Arion is Hippius's deterministic distributed storage layer designed for low latency and high durability.

### Key Features

- **Deterministic Placement**: Clients calculate where data lives using CRUSH, eliminating discovery delays
- **Erasure Coding**: Data is split into shards with redundancy for efficient durability
- **Active Self-Healing**: Validators detect missing shards and repair data automatically
- **Parallel Retrieval**: Gateways stream shards concurrently for higher throughput

### How It Works

1. Data is chunked and erasure-coded into shards
2. The network map and CRUSH algorithm compute shard locations
3. Gateways fetch shards in parallel and reconstruct files
4. Validators monitor health and rebuild shards if miners go offline

<br />

## Hybrid S3 Storage

Hippius's S3-compatible storage uses a hybrid architecture that combines coordinated services with decentralized storage volumes.

### Architecture

- **Coordination Layer**:

  - Metadata management: Tracks file locations and manages object metadata
  - Access control: Handles authentication and user permissions
  - Resource allocation: Manages storage distribution and retrieval

- **Storage Layer**:
  - Distributed volumes: Storage capacity spread across independent miners
  - Redundancy mechanisms: Uses erasure coding and replication for reliability

### Key Features

- **S3 API Compatibility**: Works with existing S3 tools and libraries
- **Erasure Coding**: Data is split into fragments with redundancy for reliability
- **Volume-Based Storage**: Storage capacity is provided by independent miners
- **Horizontal Scaling**: System capacity grows with the number of miners
- **Miner Selection**: System chooses miners based on performance and availability metrics

### How It Works

1. Storage miners register their volumes on the network
2. When data is stored, the coordination layer:
   - Applies erasure coding to split data into fragments
   - Distributes fragments across multiple miner volumes
   - Records metadata about fragment locations
3. When data is retrieved:
   - The system locates the necessary fragments
   - Reconstructs the original data even if some fragments are unavailable
   - Delivers the data through the S3-compatible API
4. If miners go offline, the system can reconstruct data from remaining fragments and redistribute to new miners

<br />

## Storage Economics

Both storage systems are integrated into Hippius's economic model:

- Miners earn 60% of storage fees for maintaining data
- Validators earn a portion of the 30% allocated to network security for overseeing storage integrity
- The 10% treasury allocation helps fund ongoing development of storage systems

## Choosing the Right Storage

- **Use Arion when:**

  - You need deterministic retrieval with low latency
  - You want self-healing durability with erasure coding
  - Your data is content-addressed or mostly immutable
  - You want parallel downloads for higher throughput

- **Use S3 when**:
  - You need compatibility with existing S3 workflows
  - Data needs to be frequently updated
  - You require bucket-based organization
  - Private access control is needed
  - Performance and scalability are priorities
