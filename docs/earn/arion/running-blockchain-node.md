# Running Hippius Blockchain Node

This guide explains how to set up and run a Hippius Substrate-based blockchain node for storage miners. The blockchain node is required for miners to participate in the network and register on-chain.

:::note
This guide is specifically for **miner nodes**. If you're setting up a validator node, please refer to the [validator setup guide](/docs/earn/installing-validator).
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

### Example Server Configurations

#### Mid-range Configuration (Minimum)
- 8 vCPUs
- 32GB RAM
- 100GB SSD for system
- **2x 2TB NVMe SSDs** in ZFS mirror configuration **(2TB usable total)**
- 1Gbps network connection
- **Total Storage: 2.1TB** (meets 2TB minimum requirement)

#### High-performance Configuration
- 16+ vCPUs
- 64GB RAM
- 200GB SSD for system
- **4x 2TB NVMe SSDs** in RAID-Z/RAID10 configuration **(6TB+ usable total)**
- 10Gbps network connection
- **Total Storage: 6.2TB+**

### Components
- **IPFS Node**: Runs as dedicated IPFS user
- **ZFS Storage Pool**: For optimal performance

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

## 2. Prepare Chain Specification

You'll need the `customSpec.json` chain specification file. This should be provided by the network operator or available in the repository.

```bash
# Check if customSpec.json exists
ls -la customSpec.json

# If not present, obtain it from the network operator
# or generate from chain spec in the repository
```

## 3. Run the Miner Node

### Make Binary Executable

```bash
chmod +x ./target/release/hippius
```

### Start the Node

Use the following command with the validator's P2P identity:

```bash
./target/release/hippius \
  --base-path /var/lib/hippius/chain \
  --chain customSpec.json \
  --bootnodes /ip4/57.128.82.161/tcp/30333/p2p/12D3KooWMuNG6ASCMDsyA45sUgYsYs1qHHrhkfhaMx7QNF98aWMZ \
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
  --bootnodes /ip4/57.128.82.161/tcp/30333/p2p/12D3KooWMuNG6ASCMDsyA45sUgYsYs1qHHrhkfhaMx7QNF98aWMZ \
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

Use this method if you're registering a child account node. **Child accounts must be registered as proxies of the main account first.**

##### Prerequisite: Setup Proxy Account

Before registering a child node, the child account must be registered as a proxy of your main account (coldkey).

1. **Create a child account** (use Polkadot.js extension or any wallet)
2. Navigate to [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.hippius.network#/extrinsics)
3. Go to **Developer → Extrinsics**
4. Select your **main account** (coldkey)
5. Choose pallet: **proxy**
6. Choose extrinsic: **addProxy**
7. Fill in the parameters:
   - `delegate`: Your child account address
   - `proxyType`: Select **Any** (or your preferred proxy type)
   - `delay`: Set to **0** (blocks)
8. Sign and submit the transaction

![Register Proxy](/img/arion/register-proxy.png)

:::note
The Registration Pallet verifies that a valid proxy relationship exists between coldkey and child accounts. Without this proxy setup, child node registration will fail.
:::

##### Register Child Node

After setting up the proxy relationship, you need to register the child node in the Arion pallet using a cryptographic signature.

###### Build the Registration Tool

Before generating registration data, you need to build the tools package which contains the `generate_registration_data` binary.

```bash
# Navigate to the hippius-arion repository root
cd /path/to/hippius-arion

# Build the tools package with the registration data generator
cargo build --release -p tools --bin generate_registration_data

# Binary will be at: target/release/generate_registration_data
```

###### Generate Registration Signature

The registration tool generates the cryptographic signature required for on-chain registration.

**Generate the registration data:**

```bash
# Generate registration data
./target/release/generate_registration_data \
  --family <YOUR_FAMILY_ACCOUNT> \
  --child <YOUR_CHILD_ACCOUNT> \
  --miner-id 1 \
  --keypair /var/lib/hippius/chain/chains/*/keystore/<your_keystore_file>

# Example output:
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# MINER-1
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# family:    5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY
# child:     5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty
#
# node_id:   0x540d87ae8ac3eb861db1cef3f299862d05ae4e7bcf193acb0939e3749b331b27
# node_sig:  0x123abc...def (64 bytes)
#
# WARNING: These values are for one-time registration. Do not share publicly.
```

###### Register Child in Arion Pallet

Now register your child account and node ID in the Arion pallet using the signature generated above.

1. Navigate to [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.hippius.network#/extrinsics)
2. Go to **Developer → Extrinsics**
3. Select your **coldkey account** (family/main account)
4. Choose pallet: **arion**
5. Choose extrinsic: **registerChild**
6. Fill in the parameters (copy from tool output):
   - `family`: Your coldkey account address (AccountId32)
   - `child`: Your child account address (AccountId32)
   - `nodeId`: The `node_id` from tool output (paste the full `0x...` hex string as [u8;32])
   - `nodeSig`: The `node_sig` from tool output (paste the full `0x...` hex string as [u8;64])
7. Sign and submit the transaction

![Register Child in Arion](/img/arion/register-child-arion.png)

:::tip
Make sure to copy the exact `node_id` and `node_sig` values from the `generate_registration_data` tool output. These are cryptographically linked and must match exactly. The signing account should be the coldkey (main account).
:::

## 6. Verify Node Operation

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

## Configuration Reference

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

## Troubleshooting

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

### High Memory Usage

- Normal for Substrate nodes with ZFS and IPFS (expect 8-16GB RAM usage)
- Blockchain node: 8-16GB
- ZFS ARC cache: Benefits from additional available RAM
- IPFS: 2-4GB depending on usage
- If experiencing memory pressure with minimum specs (16GB), consider upgrading to 32GB
- Monitor with: `htop`, `free -h`, or `zpool iostat`

### Storage Space Issues

- **Verify 2TB minimum**: Ensure you have at least 2TB total storage capacity
- Ensure ZFS pool has at least 2TB usable space: `zpool list`
- Monitor ZFS pool usage: `zfs list -o name,used,avail,refer`
- Check blockchain data growth: `du -sh /var/lib/hippius/chain`
- Consider expanding storage if approaching capacity limits
- **Important**: Running with less than 2TB will result in registration/participation failure

## Maintenance

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

## Next Steps

After setting up your blockchain node:

1. ✅ Ensure node is fully synced
2. ✅ Verify keys are inserted
3. ✅ Register node on-chain
4. 📍 **Return to [Running Miner Guide](./running-miner)** to complete Arion miner setup
5. 📍 Complete on-chain registration in Arion pallet

## Additional Resources

- **GitHub Repository**: [https://github.com/thenervelab/thebrain](https://github.com/thenervelab/thebrain)
- **Substrate Documentation**: [https://docs.substrate.io](https://docs.substrate.io)
- **Polkadot.js Apps**: [https://polkadot.js.org/apps](https://polkadot.js.org/apps)

