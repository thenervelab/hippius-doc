# What is Hippius?

Hippius is a decentralized cloud storage platform powered by a custom Substrate blockchain, Arion decentralized storage, and S3-compatible endpoints. Learn how it enables transparent, anonymous storage with blockchain trust.

# Chain

Hippius leverages Substrate's architecture to deliver a specialized blockchain optimized for decentralized storage and compute services.

[More](substrate-staking)

# Consensus

Blind Assignment for Blockchain Extension (BABE) is the consensus protocol used by Hippius to determine block production rights.

[More](babe-consensus-mechanism)

# Nominated Proof of Stake

Hippius uses Nominated Proof-of-Stake to secure the network and distribute block rewards efficiently.

[More](nominated-proof-of-stake-npos)

# Security & Authentication

New users authenticate via **OAuth** (Google or GitHub) through the [Hippius Console](https://console.hippius.com). For S3 storage access, you create access keys (`hip_*` tokens) in the console — no wallet or browser extension required.

See the [Quickstart guide](/use/quickstart) to get started.

:::info Legacy Users
If you previously used a mnemonic seed phrase for authentication, it still works but is deprecated. See [Mnemonic Authentication](mnemonic-auth) for details.
:::

# Confidential Computing

Hippius Confidential Compute (HCC) runs your workloads inside AMD SEV-SNP encrypted virtual machines. The host system cannot read VM memory, and continuous TPM attestation proves the environment has not been tampered with.

[More](confidential-computing)

# Storage

Hippius offers two complementary storage systems, each with unique advantages:

1. **Arion Storage**: Purpose-built decentralized storage using the CRUSH algorithm, Reed-Solomon erasure coding, and QUIC-based P2P networking
2. **S3-Compatible Access**: Standard S3 API backed by Arion for seamless integration with existing tools

[More](storage-systems)

# Encryption

The Hippius network provides end-to-end encryption for both messaging and data storage.

[More](encryption)
