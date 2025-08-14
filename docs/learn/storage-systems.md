---
sidebar_position: 5
---

# Decentralized Storage Systems

Learn about Hippius's storage solutions that combine reliability with decentralization.

## Storage Options Overview

Hippius offers two complementary storage systems, each with unique advantages:

1. **IPFS (InterPlanetary File System)**: Fully decentralized, content-addressed storage with blockchain-managed pinning
2. **Hybrid S3**: S3-compatible object storage with decentralized storage volumes

These systems provide different approaches to data storage, allowing users to choose the right solution for their specific needs.

## IPFS Storage

Hippius implements a fully decentralized, blockchain-managed IPFS pinning system that provides reliable content persistence with built-in redundancy.

### Key Features

- **Content Addressing**: Files are identified by their content hash, ensuring data integrity
- **Triple Redundancy**: All content is pinned to at least three different miners
- **Validator Oversight**: Validators monitor pinning status and reassign content if needed
- **Automatic Recovery**: If a miner goes offline, validators automatically reassign content to maintain redundancy
- **Verifiable Storage**: Blockchain-based verification ensures miners are actually storing the data

### How It Works

1. When content is uploaded to IPFS, the Hippius blockchain selects three miners to pin the content
2. Validators continuously monitor the pinning status of all content
3. If a miner goes offline or fails to maintain the pin, validators select a replacement miner
4. The new miner retrieves and pins the content, maintaining the triple redundancy

This system ensures that content remains available even if individual miners leave the network or experience downtime.

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

## Storage Economics

Both storage systems are integrated into Hippius's economic model:

- Miners earn 60% of storage fees for maintaining data
- Validators earn a portion of the 30% allocated to network security for overseeing storage integrity
- The 10% treasury allocation helps fund ongoing development of storage systems

## Choosing the Right Storage

- **Use IPFS when**:
  - Content needs to be publicly accessible
  - Full decentralization is required
  - Data integrity is critical
  - Content is immutable

- **Use S3 when**:
  - You need compatibility with existing S3 workflows
  - Data needs to be frequently updated
  - You require bucket-based organization
  - Private access control is needed
  - Performance and scalability are priorities 