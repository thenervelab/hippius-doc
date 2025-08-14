---
sidebar_position: 6
---

import ArchitectureDiagram from '@site/src/components/ArchitectureDiagram';

# System Architecture

This page provides a comprehensive overview of the Hippius system architecture, showing how different components interact within the ecosystem.

## Architecture Diagram

The following diagram illustrates the flow of data, transactions, and rewards within the Hippius network:

<ArchitectureDiagram />

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

2. **IPFS Storage Miners**:
   - Provide content-addressed storage through IPFS
   - Run offchain workers to interact with the blockchain

3. **Compute Miners**:
   - Provide virtual machine environments for computation
   - Support smart contract execution
   - Run offchain workers to interact with the blockchain

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