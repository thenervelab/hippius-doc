---
sidebar_position: 5
description: Understanding Hippius Virtual Machines - decentralized compute infrastructure
---

# VM Computing

Hippius Virtual Machines provide decentralized compute infrastructure that integrates seamlessly with blockchain technology and distributed storage systems.

## What is VM Computing on Hippius?

Hippius VM Computing enables users to deploy and manage virtual machines on a decentralized network of compute miners. Unlike traditional cloud providers where resources are concentrated in centralized data centers, Hippius distributes compute workloads across a global mesh of independent miners.

### Key Characteristics

| Feature                          | Description                                          |
| -------------------------------- | ---------------------------------------------------- |
| **Decentralized Infrastructure** | VMs run on a distributed network of compute miners   |
| **Blockchain Integration**       | All VM operations are recorded and verified on-chain |
| **Credit-Based Billing**         | Pay-as-you-go model using Hippius credits            |
| **Secure Access**                | SSH key authentication for secure instance access    |
| **Storage Integration**          | Native integration with Arion and S3 storage systems |

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

1. **Validators**: Assign VM tasks to appropriate compute miners
2. **Compute Miners**: Host and run virtual machine instances
3. **Offchain Workers**: Handle VM provisioning and management
4. **Ranking Pallet**: Distribute rewards based on compute provision

---

<br/>
## Integration with Storage

### Native Storage Access

VMs have seamless access to Hippius storage systems:

#### Arion Distributed Storage

- **High-Speed Access**: Grid Streaming for fast file retrieval
- **Data Durability**: Reed-Solomon erasure coding (10+20) protection
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
│   │  Arion Storage   │  │   S3 Storage     │                 │
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

### Data Protection

VM data is protected through:

- **Encrypted Storage**: Data at rest encryption
- **Secure Transit**: TLS encryption for all network traffic
- **Backup Options**: Regular snapshots and backups available

---

## Getting Started

### Prerequisites

Before creating a VM, ensure you have:

1. **Hippius Account**: Registered and logged in
2. **Credits**: Minimum 10 credits in your account
3. **SSH Key**: Generated and added to your account

<br/>
### Quick Start

1. Navigate to **Virtual Machines** in the dashboard
2. Click **Create VM**
3. Select a configuration model
4. Configure OS, image, and SSH key
5. Review and create the instance
6. Connect via SSH using the Nebula IP

For detailed instructions, see the [Virtual Machines User Guide](/use/virtual-machines).

---

## Summary

Hippius VM Computing brings the benefits of decentralization to compute infrastructure:

| Benefit           | Description                                    |
| ----------------- | ---------------------------------------------- |
| **Decentralized** | No single point of failure or control          |
| **Integrated**    | Native blockchain and storage integration      |
| **Secure**        | Multiple layers of security and isolation      |
| **Flexible**      | Various configurations for different workloads |
| **Economical**    | Credit-based pay-as-you-go billing             |

By combining decentralized compute with Arion storage and blockchain coordination, Hippius provides a complete platform for building and running applications without relying on centralized cloud providers.
