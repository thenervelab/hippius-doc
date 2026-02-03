# Running Hippius Blockchain Node

This guide explains how to set up and run a Hippius Substrate-based blockchain node for storage miners. The blockchain node is required for miners to participate in the network and register on-chain.

:::note
This guide is specifically for **miner nodes**. If you're setting up a validator node, please refer to the [validator setup guide](/docs/earn/installing-validator).
:::

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

Replace `<Node_Identity_of_Validator>` with the actual validator's P2P identity:

```bash
./target/release/hippius \
  --base-path /var/lib/hippius/chain \
  --chain customSpec.json \
  --bootnodes /ip4/57.128.82.161/tcp/30333/p2p/<Node_Identity_of_Validator> \
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
  --bootnodes /ip4/57.128.82.161/tcp/30333/p2p/<Node_Identity_of_Validator> \
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

### Register via Polkadot.js

1. Navigate to [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.hippius.network#/extrinsics)
2. Go to **Developer → Extrinsics**
3. Select your **miner account** (the one with inserted keys)
4. Choose pallet: **registration**
5. Choose extrinsic: **registerNodeWithColdkey** (or appropriate registration extrinsic)
6. Fill in the parameters:
   - **nodeType**: Select **Miner**
   - **nodeId**: Your node identity (from step 4)
   - **ipfsNodeId**: Optional - leave as **None** if not using IPFS
7. Sign and submit the transaction

:::tip
The signing account should be the same account whose keys you inserted via RPC in step 4. This ensures the node can properly sign transactions on-chain.
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

- Normal for Substrate nodes (expect 2-4GB RAM usage)
- Consider adding swap space if needed
- Monitor with: `htop` or `free -h`

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

