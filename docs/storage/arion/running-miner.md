# How to Run a Hippius Miner

This guide explains how to set up and run a Hippius storage miner.

## Prerequisites

- Ubuntu 22.04+ (or similar Linux)
- 8GB+ RAM, 2+ CPU cores
- 2TB+ available storage
- Rust toolchain (for building)
- UDP ports open for Iroh P2P (see your deployment firewall rules; Ansible defaults to `11000:12000/udp`)

## 1. Get the Miner Binary

### Build from Source

```bash
# Clone repository
git clone https://github.com/thenervelab/hippius-arion.git
cd hippius-arion

# Build release binary
cargo build --release --bin miner

# Binary is at: target/release/miner
```

## 2. Get Node IDs

The miner needs the validator's and warden's P2P node IDs:

```bash
# Get validator node ID from K8s (or ask your operator)
kubectl logs -n hippius-arion validator-0 | grep "node_id"
export VALIDATOR_NODE_ID="<validator_node_id>"

# Get warden node ID from K8s (required for PoS audits)
kubectl logs -n hippius-arion warden-0 | grep "node_id"
export WARDEN_NODE_ID="<warden_node_id>"
```

**Important:** Without `WARDEN_NODE_ID`, the miner cannot authorize proof-of-storage challenges from the warden, resulting in failed audits and reputation penalties.

## 3. Configure the Miner

:::note
The miner communicates with the validator via P2P. The `VALIDATOR_NODE_ID` is the only required connection parameter. `VALIDATOR_URL` is legacy and not actively used.
:::

### Option A: Environment Variables

```bash
# Required for P2P communication
export VALIDATOR_NODE_ID="<validator_node_id_from_step_2>"
export WARDEN_NODE_ID="<warden_node_id_from_step_2>"  # Required for PoS audits

# Miner configuration
export PORT=3001
export HOSTNAME=$(hostname -I | awk '{print $1}')
export STORAGE_PATH="/var/lib/hippius/miner/data"
export MAX_STORAGE=2000000000000  # 2TB in bytes
```

### Option B: Config File (`miner.toml`)

```toml
# /var/lib/hippius/miner/miner.toml
port = 3001
hostname = "your.public.ip"
storage_path = "data"
max_storage = <Max_storage_Miners_Provide>
```

## 4. Create Data Directory

```bash
sudo mkdir -p /var/lib/hippius/miner/data
sudo chown -R $USER:$USER /var/lib/hippius/miner
```

## 5. Run the Miner

### Direct Run

```bash
cd /var/lib/hippius/miner
export VALIDATOR_NODE_ID="<validator_node_id>"
export WARDEN_NODE_ID="<warden_node_id>"
export PORT=3001
export HOSTNAME="$(hostname -I | awk '{print $1}')"
export STORAGE_PATH="data"
export MAX_STORAGE=<Max_storage_Miners_Provide> 
./target/release/miner
```

### As Systemd Service (Recommended)

Create `/etc/systemd/system/hippius-miner.service`:

```ini
[Unit]
Description=Hippius Miner
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/var/lib/hippius/miner
# This repo's miner uses env vars for run-mode; see above
ExecStart=/usr/local/bin/hippius/miner run
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo cp miner /usr/local/bin/hippius/
sudo systemctl daemon-reload
sudo systemctl enable hippius-miner
sudo systemctl start hippius-miner
```

:::note
When the miner starts, it will generate a keypair and print the **miner node ID** to the logs. You will need this node ID for on-chain registration in the next step.

Check the logs to find your miner node ID:

```bash
journalctl -u hippius-miner -f | grep "node_id"
```
:::

## 6. Register Miner On-Chain

The miner **must be registered on-chain** in `pallet-arion` before it can join the network. Without registration, you will see:

- `FAMILY_REJECTED:node_id not registered on-chain (...)`

### Prerequisites: Coldkey and Proxy Account Setup

**Before registering a miner on-chain, you MUST:**
1. **Register a Coldkey** in Registration Pallet as StorageMiner
1. **Create a child account** that will be used for the miner
2. **Register this child account as a proxy** of your main coldkey (family) account using `pallet-proxy`
3. The child account will be the proxy account used for all miner operations

This proxy setup allows the child account to register and manage miners on behalf of the coldkey account, without having access to the coldkey account's funds.

```bash
# Using Polkadot.js or similar:
# family_account.proxy.addProxy(child_account, proxy_type, delay)
```

:::note
The `arion-pallet` verifies both that the coldkey is registered AND that a valid proxy relationship exists between coldkey and child accounts. Without this proxy setup, child registration will fail with `ProxyVerificationFailed`.
:::

### Registration Steps

#### Step 1: Get the Miner Node ID

Get the **miner node ID** from the logs (printed when miner started):

```bash
journalctl -u hippius-miner -f | grep "node_id"
# Copy the node_id value from the output
```

#### Step 2: Build the Registration Tool

Before generating registration data, you need to build the tools package which contains the `generate_registration_data` binary.

```bash
# Navigate to the hippius-arion repository root
cd /path/to/hippius-arion

# Build the tools package with the registration data generator
cargo build --release -p tools --bin generate_registration_data

# Binary will be at: target/release/generate_registration_data
```

#### Step 3: Generate Registration Signature

The registration tool reads your miner's keypair and generates the cryptographic signature required for on-chain registration.

**First, ensure your keypair has secure permissions:**

```bash
# Check current permissions
ls -la /var/lib/hippius/miner/data/keypair.bin

# Set secure permissions (owner read/write only)
chmod 600 /var/lib/hippius/miner/data/keypair.bin
```

**Generate the registration data:**

```bash
# Generate registration data
./target/release/generate_registration_data \
  --family <YOUR_FAMILY_ACCOUNT> \
  --child <YOUR_CHILD_ACCOUNT> \
  --miner-id 1 \
  --keypair /var/lib/hippius/miner/data/keypair.bin

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

#### Step 4: Register On-Chain via Polkadot.js

1. Navigate to your chain's Polkadot.js Apps interface
2. Go to **Developer → Extrinsics**
3. Select your **family account** (main account)
4. Choose pallet: **arion**
5. Choose extrinsic: **registerChild**
6. Fill in the parameters (copy from tool output):
   - `family`: Your family account address
   - `child`: Your child account address (the proxy account)
   - `nodeId`: The `node_id` from tool output (paste the full `0x...` hex string)
   - `nodeSig`: The `node_sig` from tool output (paste the full `0x...` hex string)
7. Sign and submit the transaction

#### Step 5: Wait for Chain Registry Update

Wait for the validator's `chain-registry-cache` to refresh (default poll is every 30s) and re-check miner logs.

## 7. Verify Registration

Check miner logs:

```bash
journalctl -u hippius-miner -f
```

Look for:

```
✅ Registered with validator via P2P
```

## 8. Monitor Health

```bash
# Check service status
sudo systemctl status hippius-miner

# View recent logs
journalctl -u hippius-miner --since "5 minutes ago"

# Check blob storage
ls -la /var/lib/hippius/miner/data/blobs/
```

## Configuration Options

| Option | Env Var | Description | Default |
|--------|---------|-------------|---------|
| `--validator-node-id` | `VALIDATOR_NODE_ID` | Validator P2P node ID | Required |
| - | `WARDEN_NODE_ID` | Warden P2P node ID (for PoS audits) | Required |
| `--port` | `PORT` | HTTP listen port | 3001 |
| `--hostname` | `HOSTNAME` | Public IP/hostname | Required |
| `--storage-path` | `STORAGE_PATH` | Data directory | `data` |
| `--max-storage` | `MAX_STORAGE` | Max storage bytes | Required |
| `--family-id` | `FAMILY_ID` | Miner family group | `default` |
| `--relay-url` | `RELAY_URL` | Custom relay (optional) | Iroh public |

## Troubleshooting

### "Connection refused" to Validator

- Check firewall: validator P2P UDP port must be open (validator is typically reachable via relay too)
- Verify validator is running: `curl http://<validator>:3002/map`

### "Rate limited" on registration

- Normal when retrying too quickly; the miner backs off and retries automatically.

### Miner not receiving shards

- Verify P2P port 4433 is open and accessible
- Check that hostname resolves to correct public IP

## Backup & Recovery

```bash
# Backup keypair (important!)
cp /var/lib/hippius/miner/data/keypair.bin ~/miner-keypair-backup.bin

# Restore on new machine
cp ~/miner-keypair-backup.bin /var/lib/hippius/miner/data/keypair.bin
```

The keypair determines your miner's node ID - losing it means re-registering as a new miner.

