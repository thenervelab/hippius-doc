---
sidebar_position: 5
description: Understanding Hippius Virtual Machines - decentralized compute infrastructure
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';

# VM Computing

Hippius Virtual Machines provide decentralized compute infrastructure that integrates seamlessly with blockchain technology and distributed storage systems.

## What is VM Computing on Hippius?

Hippius VM Computing enables users to deploy and manage virtual machines on a decentralized network of compute miners. Unlike traditional cloud providers where resources are concentrated in centralized data centers, Hippius distributes compute workloads across a global mesh of independent miners.

### Key Characteristics

| Feature                          | Description                                          |
| -------------------------------- | ---------------------------------------------------- |
| **Decentralized Infrastructure** | VMs run on a distributed network of compute miners   |
| **Blockchain Integration**       | All VM operations are recorded and verified on-chain |
| **Encrypted Disks**              | LUKS2 full disk encryption with secure key delivery  |
| **Credit-Based Billing**         | Pay-as-you-go model using Hippius credits            |
| **Secure Access**                | SSH key authentication for secure instance access    |
| **Storage Integration**          | Native integration with IPFS and S3 storage systems  |

---

## Virtual Machine Capabilities

### Supported Configurations

Hippius offers flexible VM configurations to match your workload requirements:

- **Operating Systems**: Linux distributions (Ubuntu, Debian, CentOS, and more)
- **Pre-installed Applications**: Docker, development tools, and other common software
- **Scalable Resources**: Various CPU, memory, and storage configurations
- **Network Connectivity**: Nebula mesh networking for secure inter-VM communication

### Instance Management

Users can perform full lifecycle management of their VMs:

```
┌──────────────────────────────────────────────────────────────┐
│                  VM LIFECYCLE MANAGEMENT                     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌──────────┐     ┌──────────┐     ┌──────────┐             │
│   │  Create  │────▶│ Running  │────▶│  Stop    │             │
│   └──────────┘     └────┬─────┘     └────┬─────┘             │
│                         │                 │                  │
│                         │    ┌────────────┘                  │
│                         │    │                               │
│                         ▼    ▼                               │
│                    ┌──────────┐                              │
│                    │  Reboot  │                              │
│                    └──────────┘                              │
│                         │                                    │
│                         ▼                                    │
│                    ┌─────────────┐                           │
│                    │  Terminate  │                           │
│                    └─────────────┘                           │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Secure Access

All VM access is secured through SSH key authentication:

- **OpenSSH Support**: Compatible with `ssh-rsa` and `ssh-ed25519` keys
- **Key Management**: Create, store, and manage multiple SSH keys
- **No Password Authentication**: Enhanced security through key-only access

---

## Use Cases for Distributed Computing

### 1. Development and Testing Environments

Spin up isolated development environments on-demand:

- **CI/CD Pipelines**: Run automated builds and tests
- **Staging Environments**: Test deployments before production
- **Sandbox Testing**: Experiment with new technologies safely

### 2. Web Application Hosting

Deploy web applications with decentralized infrastructure:

- **Web Servers**: Host websites and web applications
- **API Services**: Run backend services and APIs
- **Microservices**: Deploy containerized applications with Docker

### 3. Data Processing

Leverage distributed compute for data-intensive workloads:

- **Batch Processing**: Process large datasets across multiple VMs
- **ETL Pipelines**: Extract, transform, and load data workflows
- **Analytics**: Run analytics jobs on distributed infrastructure

### 4. Decentralized Applications (dApps)

Build and run blockchain-integrated applications:

- **Node Operations**: Run blockchain nodes and validators
- **Smart Contract Development**: Develop and test smart contracts
- **Backend Services**: Host dApp backend infrastructure

### 5. AI/ML Workloads

Train and deploy machine learning models:

- **Model Training**: Train ML models on distributed compute
- **Inference Services**: Deploy models for real-time inference
- **Data Preparation**: Prepare and preprocess training data

---

## Integration with Blockchain

### On-Chain Operations

VM operations are integrated with the Hippius blockchain:

```
┌──────────────────────────────────────────────────────────────┐
│                BLOCKCHAIN INTEGRATION                        │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────────┐         ┌─────────────────┐                │
│   │    User     │────────▶│   Marketplace   │                │
│   │  Dashboard  │         │     Pallet      │                │
│   └─────────────┘         └────────┬────────┘                │
│                                    │                         │
│                           Credit Deduction                   │
│                                    │                         │
│                                    ▼                         │
│                           ┌─────────────────┐                │
│                           │    Hippius      │                │
│                           │   Blockchain    │                │
│                           └────────┬────────┘                │
│                                    │                         │
│                           Task Assignment                    │
│                                    │                         │
│                                    ▼                         │
│                           ┌─────────────────┐                │
│                           │  Compute Miner  │                │
│                           │   (VM Host)     │                │
│                           └─────────────────┘                │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Credit System

VMs operate on a credit-based billing model:

| Component              | Description                                |
| ---------------------- | ------------------------------------------ |
| **Hourly Billing**     | Credits deducted based on VM configuration |
| **Real-time Tracking** | Monitor credit usage through the dashboard |
| **Auto-Stop**          | VMs can be stopped to preserve credits     |

### Validator and Miner Roles

The compute infrastructure involves multiple blockchain participants:

<Ordered>
  <li>**Validators**: Assign VM tasks to appropriate compute miners</li>
  <li>**Compute Miners**: Host and run virtual machine instances</li>
  <li>**Offchain Workers**: Handle VM provisioning and management</li>
  <li>**Ranking Pallet**: Distribute rewards based on compute provision</li>
</Ordered>

---

<br/>
## Integration with Storage

### Native Storage Access

VMs have seamless access to Hippius storage systems:

#### IPFS Distributed Storage

- **High-Speed Access**: Content-addressed storage for fast file retrieval
- **Data Durability**: Replicated storage across multiple nodes
- **Decentralized**: No single point of failure

#### S3-Compatible Storage

- **Standard Interface**: Use familiar S3 APIs and tools
- **Volume Storage**: Persistent block storage for VM data
- **Backup Support**: Automated backup capabilities

### Storage Architecture with VMs

```
┌──────────────────────────────────────────────────────────────┐
│                 VM + STORAGE INTEGRATION                     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────────────────────────────────────────┐            │
│   │              COMPUTE MINER                  │            │
│   │  ┌─────────────────────────────────────┐    │            │
│   │  │           Virtual Machine           │    │            │
│   │  │  ┌─────────┐    ┌─────────────────┐ │    │            │
│   │  │  │   App   │    │   Local Disk    │ │    │            │
│   │  │  └────┬────┘    └────────┬────────┘ │    │            │
│   │  └───────┼──────────────────┼──────────┘    │            │
│   └──────────┼──────────────────┼───────────────┘            │
│              │                  │                            │
│              ▼                  ▼                            │
│   ┌──────────────────┐  ┌──────────────────┐                 │
│   │  IPFS Storage    │  │   S3 Storage     │                 │
│   │  (Distributed)   │  │   (Volumes)      │                 │
│   └──────────────────┘  └──────────────────┘                 │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Compute Miner Architecture

### How Compute Miners Work

Compute miners are specialized nodes that host virtual machines:

| Component             | Function                                             |
| --------------------- | ---------------------------------------------------- |
| **Blockchain Node**   | Connects to Hippius blockchain for task coordination |
| **Offchain Worker**   | Handles VM lifecycle operations                      |
| **VM Agent**          | Manages virtual machine instances                    |
| **Hypervisor**        | libvirt/KVM for VM isolation and resource allocation |
| **Container Runtime** | Docker support for containerized workloads           |

### Miner Requirements

Compute miners must meet specific requirements:

- **Hardware**: Sufficient CPU, RAM, and storage for VM hosting
- **Network**: Stable connection with adequate bandwidth
- **Software**: Compatible hypervisor and management tools
- **Registration**: On-chain registration with stake

### Reward Distribution

Compute miners earn rewards for providing resources:

```
Marketplace Revenue Distribution:
├── 60% → Compute Miners (via Ranking Pallet)
├── 30% → Validators & Stakers
└── 10% → Treasury
```

---

## Security Model

### Instance Isolation

Each VM is isolated from other instances:

- **Hardware Virtualization**: KVM/libvirt provides strong isolation
- **AMD SEV-SNP**: Hardware memory encryption on supported miners
- **Network Segmentation**: Nebula mesh networking for secure communication
- **Resource Limits**: CPU, memory, and I/O quotas enforced

### Access Control

Multiple layers of access security:

| Layer               | Protection                             |
| ------------------- | -------------------------------------- |
| **SSH Keys**        | Cryptographic key-based authentication |
| **Nebula Network**  | Encrypted mesh networking              |
| **Firewall**        | Instance-level network rules           |
| **Blockchain Auth** | Wallet-based ownership verification    |
| **Disk Encryption** | LUKS2 with per-VM unique keys          |

### Data Protection

VM data is protected through multiple layers of encryption and secure key management.

---

## Disk Encryption

All Hippius VMs use **full disk encryption by default**. Your data is automatically encrypted at rest using LUKS2 with AES-256-XTS - you don't need to configure anything.

### What This Means for You

| Protection                 | Benefit                                                |
| -------------------------- | ------------------------------------------------------ |
| **Automatic Encryption**   | Every VM disk is encrypted without any setup required  |
| **Per-VM Unique Keys**     | Each VM has its own encryption key                     |
| **Miner Cannot Read Data** | Even the hardware host cannot access your files        |
| **Seizure Protection**     | Data remains encrypted even if hardware is compromised |

### How It Works (Summary)

<Ordered>
  <li>When you create a VM, a unique encryption key is generated</li>
  <li>Your VM's disk is encrypted during image creation</li>
  <li>At boot, the key is delivered securely via encrypted network</li>
  <li>The key exists only in your VM's protected memory - never on the miner's storage</li>
</Ordered>

:::tip
For the full technical details on disk encryption, key delivery, and how it integrates with hardware security (AMD SEV-SNP), see [Confidential Computing](confidential-computing#disk-encryption-and-key-delivery).
:::

For more details on hardware-level encryption and attestation, see [Confidential Computing](confidential-computing).

---

## Getting Started

### Prerequisites

Before creating a VM, ensure you have:

<Ordered>
  <li>**Hippius Account**: Registered and logged in</li>
  <li>**Credits**: Minimum 10 credits in your account</li>
  <li>**SSH Key**: Generated and added to your account</li>
</Ordered>

<br/>
### Quick Start

<Ordered>
  <li>Navigate to **Virtual Machines** in the dashboard</li>
  <li>Click **Create VM**</li>
  <li>Select a configuration model</li>
  <li>Configure OS, image, and SSH key</li>
  <li>Review and create the instance</li>
  <li>Connect via SSH using the Nebula IP</li>
</Ordered>

For detailed instructions, see the [Virtual Machines User Guide](/use/virtual-machines).

---

## Summary

Hippius VM Computing brings the benefits of decentralization to compute infrastructure:

| Benefit           | Description                                    |
| ----------------- | ---------------------------------------------- |
| **Decentralized** | No single point of failure or control          |
| **Integrated**    | Native blockchain and storage integration      |
| **Encrypted**     | LUKS2 disk encryption with secure key delivery |
| **Secure**        | Multiple layers of security and isolation      |
| **Flexible**      | Various configurations for different workloads |
| **Economical**    | Credit-based pay-as-you-go billing             |

By combining decentralized compute with IPFS storage and blockchain coordination, Hippius provides a complete platform for building and running applications without relying on centralized cloud providers.
