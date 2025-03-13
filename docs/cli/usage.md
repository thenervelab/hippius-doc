# Hippius CLI

A Rust-based Command-Line Interface (CLI) for Ipfs and s3 storage, referral and node operations on Hippius blockchain.

---

## Overview
The `hipc` tool provides a comprehensive set of commands for interacting with a decentralized infrastructure, including:
- Docker registry management
- Storage operations
- Marketplace interactions
- Node registration and management
- Miner and validator operations

---

## Quick Examples
```bash
# Pin files to storage
hippius-cli storage pin <file-hash1> <file-hash2>

```

---

## Features

### Storage Operations
- Pin and unpin files
- Decentralized file storage management

### Node Management
- Register different node types:
  - Validator
  - Storage Miner
- Query node information
- View node registration requirements

### Miner Operations
- Check miner registration requirements

### Marketplace Interactions
- Discover available resources
- Check account credits

---

## Prerequisites
1. Install Rust ([Rust installation guide](https://www.rust-lang.org/tools/install))
2. Install Docker ([Docker installation guide](https://docs.docker.com/get-docker/))
3. A running Substrate node with required modules
4. Set up environment variables:
   ```
   SUBSTRATE_NODE_URL=ws://127.0.0.1:9944
   SUBSTRATE_SEED_PHRASE=<your-seed-phrase>
   ```

---

## Installation

```bash
# Clone the repository
git clone https://github.com/thenervelab/hippius-cli.git
cd hippius-cli

# Build and install
cargo install --path .

# Move the binary to a location in your PATH
cp target/release/hippius-cli /usr/local/bin/
```

---

## Usage Guide

### Storage Operations
```bash
# Pin files to storage
hippius-cli storage pin <file-hash1> <file-hash2>

# Unpin a file from storage
hippius-cli storage unpin <file-hash>
```

### Node Management
```bash
# Register a Validator node
hippius-cli register-node --node-type Validator --node-id my-validator-node

# Register a Storage Miner node
hippius-cli register-node --node-type StorageMiner --node-id my-storage-node --ipfs-node-id <optional-ipfs-node-id>

# Get information about your registered node
hippius-cli get-node-info
```

### Miner Operations
```bash

# Fetch storage-related information
hippius-cli miner storage

# Get storage miner registration requirements
hippius-cli miner register-storage-miner

# Get validator registration requirements
hippius-cli miner register-validator
```

### Account Operations
```bash
# Transfer funds from one account to another
hippius-cli account transfer --account-id <account_id> --amount <amount>

# Stake funds
hippius-cli account stake --amount <amount>

# Unstake funds
hippius-cli account unStake --amount <amount>

# Withdraw funds
hippius-cli account withdraw --amount <amount>
```

### Credits and Financial Operations
```bash
# Check free credits for your account
hippius-cli get-credits

# List locked credits
hippius-cli list-locked-credits

# Get current lock period
hippius-cli get-current-lock-period

# Get minimum lock amount
hippius-cli get-min-lock-amount
```

### Key Management
```bash
# Insert a key to the local node
hippius-cli insert-key --seed-phrase <seed-phrase> --public-key <public-key>

# Generate new keys
hippius-cli generate-keys
```

### Image and File Operations
```bash
# List available images
hippius-cli list-images

# List IPFS files
hippius-cli list-ipfs-files

# Bulk upload files
hippius-cli bulk-upload --files <file1> <file2> <file3>
```

### Plan and Ranking Operations
```bash
# List available plans
hippius-cli list-plans

# Get miner rankings
hippius-cli get-rankings
```

---

## Configuration

Set up your CLI configuration by creating a `.env` file:
```bash
SUBSTRATE_NODE_URL=ws://your-substrate-node:9944
SUBSTRATE_SEED_PHRASE=your-seed-phrase-here
```

---

## Contributing
Contributions are welcome! Feel free to submit pull requests or open issues on the [GitHub repository](https://github.com/thenervelab/hippius-cli).

---

## License
This project is licensed under the [MIT License](#).

