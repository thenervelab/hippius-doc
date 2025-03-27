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
hipc storage pin <file-hash1> <file-hash2>

```

---

## Features

### Wallet Management
- Create a new hotkey wallet
- List all available wallets
- View wallet balance
- Transfer funds between wallets
  
### Storage Operations
- Pin and unpin files
  - Decentralized file storage management
  - Upload a file to IPFS

### Node Management
- Register different node types:
  - **Validator**
    - Register a Validator node with a hotkey
    - Register a Validator node with a coldkey
  - **Storage Miner**
    - Register a Storage Miner node with a hotkey
    - Register a Storage Miner node with a coldkey
- Swap the owner of a registered node
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
git clone https://github.com/thenervelab/hipc.git
cd hipc

# Build and install
cargo install --path .

# Move the binary to a location in your PATH
cp target/release/hipc /usr/local/bin/
```

---

## Usage Guide

### Wallet Management

- **Create a new hotkey wallet**
```bash
hipc create-hotkey
```

This will:

Generate a new mnemonic
Create a keypair
Save the wallet securely
Register the hotkey with your account

- **List all available wallets**

```bash
hipc list-wallets
```



### Storage Operations
```bash
# Pin files to storage
hipc storage pin <file-hash1> <file-hash2>

# Unpin a file from storage
hipc storage unpin <file-hash>
```

- **Upload a file to IPFS**
```bash
hipc upload-to-ipfs <file-path>
```

### Node Management

- **Register a Validator node with a hotkey**
```bash
hipc register-node-with-hotkey --hips-key <HIPS_KEY> --hotkey-address <HOTKEY_ADDRESS> --node-type Validator --node-id <NODE_ID> --ipfs-node-id <optional-ipfs-node-id>
```

- **Register a Storage Miner node with a hotkey**
```bash
hipc register-node-with-hotkey --hips-key <HIPS_KEY> --hotkey-address <HOTKEY_ADDRESS> --node-type StorageMiner --node-id <NODE_ID> --ipfs-node-id <IPFS_NODE_ID>
```

- **Register a Validator node with a hotkey**
```bash
hipc register-node-with-hotkey --hips-key <HIPS_KEY> --hotkey-address <HOTKEY_ADDRESS> --node-type Validator --node-id <NODE_ID> --ipfs-node-id <IPFS_NODE_ID>
```

- **Register a Storage Miner node with a hotkey**
```bash
hipc register-node-with-hotkey --hips-key <HIPS_KEY> --hotkey-address <HOTKEY_ADDRESS> --node-type StorageMiner --node-id <NODE_ID> --ipfs-node-id <IPFS_NODE_ID>
```

- **Swap the owner of a registered node**
```bash
hipc swap-node-owner <node_id> <new_owner_account_id> <signer_account>
```

- **Get information about your Locally Running registered node**
```bash
hipc get-node-info
```

### Miner Operations
```bash

# Fetch storage-related information
hipc miner storage

# Get storage miner registration requirements
hipc miner register-storage-miner

# Get validator registration requirements
hipc miner register-validator
```

### Account Operations
```bash
# Transfer funds from one account to another
hipc account transfer --account-id <account_id> --amount <amount>

# Stake funds
hipc account stake --amount <amount>

# Unstake funds
hipc account unStake --amount <amount>

# Withdraw funds
hipc account withdraw --amount <amount>
```

### Credits and Financial Operations
```bash
# Check free credits for your account
hipc get-credits

# List locked credits
hipc list-locked-credits

# Get current lock period
hipc get-current-lock-period

# Get minimum lock amount
hipc get-min-lock-amount
```

### Key Management
```bash
# Insert a key to the local node
hipc insert-key --seed-phrase <seed-phrase> --public-key <public-key>

# Generate new keys
hipc generate-keys

# Get HIPS key files
hipc get-hips-key

# Get Ipfs node ID
hipc get-ipfs-node-id

# Get node ID
hipc get-node-id
```

### Image and File Operations
```bash
# List available images
hipc list-images

# List IPFS files
hipc list-ipfs-files

# Bulk upload files
hipc bulk-upload --files <file1> <file2> <file3>
```

### Plan and Ranking Operations
```bash
# List available plans
hipc list-plans

# Get miner rankings
hipc get-rankings
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
Contributions are welcome! Feel free to submit pull requests or open issues on the [GitHub repository](https://github.com/thenervelab/hipc).

---

## License
This project is licensed under the [MIT License](#).

