# Running Hippius Blockchain Node

This guide explains how to set up and run a Hippius Substrate-based blockchain node for storage miners. The blockchain node is required for miners to participate in the network and register on-chain.

:::note
This guide is specifically for **miner nodes**. If you're setting up a validator node, please refer to the [validator setup guide](/docs/earn/installing-validator).
:::

:::info Complete Miner Setup
To run a complete Hippius storage miner, you need **three components running**:

1. ✅ **Hippius Blockchain Node** (this guide) - For on-chain registration and network participation
2. ✅ **IPFS Node** (covered in this guide) - For distributed storage
3. ✅ **Arion Miner** - The actual mining software

After completing this guide, proceed to the [**Arion Miner Setup**](./running-miner) to run the mining software.
:::

## Server Requirements

### Ideal Server Specifications

To run both the Hippius blockchain node and IPFS with a ZFS pool efficiently, these are the recommended server specifications:

#### CPU
- **Minimum**: 4 dedicated cores (8 vCPUs)
- **Recommended**: 8+ dedicated cores (16+ vCPUs)
- **Reasoning**: The blockchain node needs consistent CPU performance for validation and processing. ZFS benefits from additional cores for checksumming and compression operations.

#### Memory (RAM)
- **Minimum**: 16GB
- **Recommended**: 32GB or more
- **Reasoning**:
  - Blockchain nodes typically require 8-16GB RAM for optimal performance
  - ZFS is memory-hungry and benefits significantly from extra RAM for the ARC cache
  - IPFS can use substantial memory when handling many concurrent operations

#### Storage

:::warning Minimum Storage Requirement
Miners must provide **at least 2TB of total storage capacity**. This is a mandatory requirement to participate in the network.
:::

**Total Storage Breakdown:**

**System Disk:**
- 100GB+ SSD for OS and applications

**ZFS Pool for IPFS (Primary Storage):**
- **Minimum**: 2TB usable space **(required)**
- **Recommended**: 4TB+ usable space
- **Disk Type**: NVMe SSDs or enterprise SSDs preferred for performance
- **Configuration**: At least 2 disks for basic redundancy (mirror)
- **ZFS ARC Cache**: Benefits greatly from additional RAM

**Blockchain Data:**
- **Initial**: 100GB reserved, SSD-based storage
- **Growth**: Plan for 50-100GB+ annual growth

**Minimum Total:** 2TB+ (primarily for IPFS storage pool)

#### Network
- **Bandwidth**: 1Gbps minimum, with at least 100Mbps sustained throughput
- **Monthly Traffic**: Plan for 5-10TB+ of monthly traffic (especially for IPFS)
- **Public IP**: Static public IP address recommended

## Prerequisites

Before starting, ensure you have the following installed:

1. **Rust Toolchain**
   - Install Rust via [rustup](https://rustup.rs/): `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
   - Install nightly toolchain: `rustup install nightly`
   - Update Rust: `rustup update`

2. **Git**
   - Install Git from [git-scm.com](https://git-scm.com/)
   - Ubuntu/Debian: `sudo apt install git`

3. **Build Dependencies**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install -y build-essential clang curl libssl-dev llvm libudev-dev make protobuf-compiler
   ```

4. **Key Pair**
   - You'll need a mnemonic phrase or seed for your miner account
   - This should be the same account used in the Arion miner registration

## 1. Clone and Build the Node

### Clone the Repository

```bash
# Clone the Hippius brain repository
git clone https://github.com/thenervelab/thebrain.git
cd thebrain

# Ensure you're on the latest version
git pull origin main
```

### Build the Node

```bash
# Build the release binary (this may take 15-30 minutes)
cargo build --release

# The binary will be at: target/release/hippius
```

### Verify Build

```bash
# Check the binary works
./target/release/hippius --version
```

## 2. Install and Run IPFS Node

The Arion miner requires a running IPFS node for distributed storage operations. You need to install, configure, and run IPFS in the background.

:::info
IPFS must be running continuously alongside your Arion miner. The miner uses IPFS to store and retrieve data shards.
:::

### Install IPFS

```bash
# Download IPFS (Kubo) - latest version
wget https://dist.ipfs.tech/kubo/v0.25.0/kubo_v0.25.0_linux-amd64.tar.gz

# Extract the archive
tar -xvzf kubo_v0.25.0_linux-amd64.tar.gz

# Install IPFS binary
cd kubo
sudo bash install.sh

# Verify installation
ipfs --version
```

### Initialize IPFS

```bash
# Initialize IPFS repository (creates ~/.ipfs)
ipfs init

# Optional: Configure IPFS for server profile (recommended for miners)
ipfs config profile apply server
```

### Configure IPFS for Storage Mining

```bash
# Set storage limits (adjust based on your available storage)
ipfs config Datastore.StorageMax "2TB"

# Enable garbage collection
ipfs config --json Datastore.GCPeriod '"1h"'

# Optional: Configure API and gateway ports
ipfs config Addresses.API /ip4/127.0.0.1/tcp/5001
ipfs config Addresses.Gateway /ip4/127.0.0.1/tcp/8080
```

### Run IPFS as Systemd Service (Recommended)

Create `/etc/systemd/system/ipfs.service`:

```ini
[Unit]
Description=IPFS Daemon
After=network.target

[Service]
Type=simple
User=ubuntu
Environment="IPFS_PATH=/home/ubuntu/.ipfs"
ExecStart=/usr/local/bin/ipfs daemon
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start the IPFS service:

```bash
# Start the IPFS service
sudo systemctl daemon-reload
sudo systemctl enable ipfs
sudo systemctl start ipfs

# Check status
sudo systemctl status ipfs

# View logs
journalctl -u ipfs -f
```

### Verify IPFS is Running

```bash
# Check IPFS daemon status
ipfs swarm peers

# Check IPFS ID (your node's identity)
ipfs id

# Test IPFS storage
echo "Hello IPFS" | ipfs add
```

:::tip
Keep the IPFS daemon running at all times. The Arion miner depends on IPFS for distributed storage operations. Without IPFS running, the miner cannot store or retrieve data shards.
:::

## 3. Run the Blockchain Node

### Make Binary Executable

```bash
chmod +x ./target/release/hippius
```

### Start the Node

Use the following command with the validator's P2P identity:

```bash
./target/release/hippius \
  --base-path /var/lib/hippius/chain \
  --chain mainnet \
  --bootnodes /ip4/198.244.165.236/tcp/30333/ws/p2p/12D3KooWAXNTAcp2d8rFG6iW43nYhkciWepUFJxr8yzZbELyYByb \
  --offchain-worker Always \
  --name "My Miner Node" \
  --rpc-cors all \
  --rpc-methods Unsafe \
  --rpc-external \
  --ws-external
```

#### Important Parameters:

| Parameter | Description | Required |
|-----------|-------------|----------|
| `--base-path` | Directory for blockchain data | Yes |
| `--chain` | Chain specification file | Yes |
| `--bootnodes` | Validator node(s) to connect to | Yes |
| `--offchain-worker` | Enable offchain worker (required for miners) | Yes |
| `--name` | Human-readable node name | Optional |
| `--rpc-cors` | CORS settings for RPC | Optional |
| `--rpc-methods` | RPC methods to expose | Optional |
| `--ws-external` | Allow external WebSocket connections | Optional |

### Run as Systemd Service (Recommended)

Create `/etc/systemd/system/hippius-node.service`:

```ini
[Unit]
Description=Hippius Blockchain Node
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/thebrain
ExecStart=/usr/local/bin/hippius \
  --base-path /var/lib/hippius/chain \
  --chain /home/ubuntu/thebrain/customSpec.json \
  --bootnodes /ip4/198.244.165.236/tcp/30333/ws/p2p/12D3KooWAXNTAcp2d8rFG6iW43nYhkciWepUFJxr8yzZbELyYByb \
  --offchain-worker Always \
  --name "Miner Node" \
  --rpc-cors all \
  --rpc-methods Unsafe \
  --rpc-external \
  --ws-external
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
# Copy binary to system location
sudo cp target/release/hippius /usr/local/bin/

# Create data directory
sudo mkdir -p /var/lib/hippius/chain
sudo chown -R $USER:$USER /var/lib/hippius

# Start the service
sudo systemctl daemon-reload
sudo systemctl enable hippius-node
sudo systemctl start hippius-node

# Check status
sudo systemctl status hippius-node

# View logs
journalctl -u hippius-node -f
```

## 4. Insert Keys via RPC

After the node is running, you need to insert your miner keys. This allows the node to sign transactions on behalf of your miner account.

### Get Your Node Identity

When the node starts, it will log its Node Identity. Look for a line like:

```
🏷  Local node identity is: 12D3KooWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### Insert Keys Using RPC

The key type ID for miners is `hips`:

#### Option A: Using curl

```bash
curl -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "author_insertKey",
    "params": [
      "hips",
      "<your_mnemonic_phrase>",
      "<your_public_key>"
    ],
    "id": 1
  }' \
  http://localhost:9944
```

#### Option B: Using Polkadot.js Apps

1. Navigate to [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2Flocalhost%3A9944#/rpc)
2. Connect to your local node: `ws://localhost:9944`
3. Go to **Developer → RPC Calls**
4. Select `author` → `insertKey`
5. Fill in the parameters:
   - **keyType**: `hips`
   - **suri**: Your mnemonic phrase or seed
   - **publicKey**: Your account's public key (hex format)
6. Submit the call

### Verify Key Insertion

Check the logs for a success message:

```bash
journalctl -u hippius-node -f | grep "Inserted key"
```

## 5. Register Your Node On-Chain

After inserting keys, you need to register your node in the Registration Pallet. This step connects your blockchain node identity with your miner registration.

### Get Required Information

1. **Node Identity**: Found in node logs (step 4 above)
2. **IPFS Node ID**: If running IPFS services (optional for basic mining)
3. **Account**: The account whose keys you inserted

### Choose Registration Method

There are two registration methods depending on whether you're registering a **main node** (coldkey) or a **child node** (hotkey):

#### Option A: Register Main Node (Coldkey)

Use this method if you're registering your primary/main account node.

1. Navigate to [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.hippius.network#/extrinsics)
2. Go to **Developer → Extrinsics**
3. Select your **main account** (coldkey)
4. Choose pallet: **registration**
5. Choose extrinsic: **coldkeyNodeRegistration** 
6. Fill in the parameters:
   - **nodeType**: Select **StorageMiner**
   - **nodeId**: Your node identity (from step 4)
   - **ipfsNodeId**: Optional - leave as **None** if not using IPFS
   - **payInCredits**: Select **No**
7. Sign and submit the transaction

![Register Coldkey](/img/arion/register-coldkey.png)

:::tip
The signing account should be the same account whose keys you inserted via RPC in step 4. This ensures the node can properly sign transactions on-chain.
:::

#### Option B: Register Child Node (Hotkey)

To register a hotkey (child node), please follow the hotkey registration guide in the Arion Miner documentation:

📖 **[Follow the Hotkey Registration Guide in Arion Miner Setup](./running-miner#register-miner-in-arion-pallet)**

This guide will walk you through:
1. Setting up a proxy relationship between your coldkey and hotkey
2. Generating the required cryptographic signatures
3. Registering your hotkey in the Arion pallet

After completing the hotkey registration, return here to continue with the miner setup.

## 6. Setup and Run Arion Miner

:::warning Critical Next Step
After setting up your blockchain node and IPFS, you **must** set up and run the **Arion Miner** to actually perform storage mining operations and earn rewards.

The blockchain node and IPFS are prerequisites that run in the background. The **Arion Miner is the actual mining software** that:
- Connects to the validator via P2P
- Stores and retrieves data shards using IPFS
- Participates in proof-of-storage challenges
- Earns mining rewards

🚀 **[Proceed to Arion Miner Setup Guide](./running-miner)** to complete your miner setup.
:::

## 7. Verify Node Operation

### Check Sync Status

```bash
# View logs
journalctl -u hippius-node -f

# Look for sync progress:
# ⚙️  Syncing 1234 bps, target=#56789 (12 peers)
```

### Check RPC Connectivity

```bash
# Test RPC endpoint
curl -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"system_health","params":[],"id":1}' \
  http://localhost:9944

# Expected response:
# {"jsonrpc":"2.0","result":{"peers":3,"isSyncing":false,"shouldHavePeers":true},"id":1}
```

### Monitor Node Health

```bash
# Check process status
sudo systemctl status hippius-node

# Check recent logs
journalctl -u hippius-node --since "10 minutes ago"

# Check disk usage
df -h /var/lib/hippius/chain
```

### Verify IPFS is Running

```bash
# Check IPFS status
sudo systemctl status ipfs

# View IPFS logs
journalctl -u ipfs -f
```

## 8. Configuration Reference

### Network Ports

| Port | Protocol | Purpose | Required |
|------|----------|---------|----------|
| 30333 | TCP | P2P communication | Yes |
| 9944 | TCP | WebSocket RPC | Optional |
| 9933 | TCP | HTTP RPC | Optional |

### Firewall Configuration

```bash
# Allow P2P port
sudo ufw allow 30333/tcp

# Allow RPC ports (if exposing externally - use with caution)
sudo ufw allow 9944/tcp
sudo ufw allow 9933/tcp
```

## 9. Troubleshooting

### "Failed to connect to bootnode"

- Verify the bootnode address is correct
- Check network connectivity: `ping 57.128.82.161`
- Ensure port 30333 is not blocked by firewall

### "RPC call failed"

- Ensure node is running: `sudo systemctl status hippius-node`
- Check RPC is enabled with `--rpc-external` and `--ws-external`
- Verify RPC port is accessible: `netstat -tlnp | grep 9944`

### "Key insertion failed"

- Ensure the mnemonic phrase is correct
- Verify the public key matches the mnemonic
- Check that RPC methods are enabled with `--rpc-methods Unsafe`

### Node Won't Sync

- Verify bootnode is reachable
- Check system time is synchronized: `timedatectl`
- Ensure sufficient disk space: `df -h`


## 10. Maintenance

### Update Node

```bash
cd ~/thebrain
git pull origin main
cargo build --release
sudo systemctl restart hippius-node
```

### Backup Node Data

```bash
# Backup keystore (important!)
sudo tar -czf hippius-keystore-backup.tar.gz /var/lib/hippius/chain/chains/*/keystore/

# Store securely - this contains your node's identity
```

### Clean Old Chain Data

```bash
# Stop node
sudo systemctl stop hippius-node

# Remove chain data (keeps keystore)
sudo rm -rf /var/lib/hippius/chain/chains/*/db

# Restart to resync
sudo systemctl start hippius-node
```

## 11. Next Steps

After setting up your blockchain node and IPFS:

1. ✅ Ensure blockchain node is fully synced
2. ✅ Verify IPFS daemon is running
3. ✅ Verify keys are inserted in blockchain node
4. ✅ Register node on-chain (coldkey or child node)
5. 🚀 **[Set up and run Arion Miner](./running-miner)** - Required to start mining!

:::warning Important
The blockchain node and IPFS must remain running in the background. The **Arion Miner** is what actually performs storage mining operations. You need all three components (blockchain node, IPFS, and Arion miner) running to earn rewards.
:::

