# How to Run a Hippius Miner

This guide explains how to set up and run a Hippius storage miner.

:::info Important
Before running a miner, you need to set up and run a **Hippius Blockchain Node**. The blockchain node is required for on-chain registration and network participation.

📖 **Please complete the [Running Blockchain Node](./running-blockchain-node) setup first**, then return to this guide.
:::

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
export VALIDATOR_NODE_ID="c099a3ac8b04f94b56bc15cc8b0d17fdd18dd9038d43b67e3233a9a55dfd33f3"

export WARDEN_NODE_ID="540d87ae8ac3eb861db1cef3f299862d05ae4e7bcf193acb0939e3749b331b27"
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

Before registering a miner, you need to complete three on-chain registrations using Polkadot.js Apps. All extrinsics should be submitted through:

**Polkadot.js Apps URL:** [https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.hippius.network#/extrinsics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.hippius.network#/extrinsics)

**RPC Endpoint:** `wss://rpc.hippius.network`

#### Prerequisite Step 1: Register Coldkey as Storage Miner

Your coldkey (main family account) must be registered in the Registration Pallet before you can register miners.

1. Navigate to [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.hippius.network#/extrinsics)
2. Go to **Developer → Extrinsics**
3. Select your **coldkey account** (main account)
4. Choose pallet: **registration**
5. Choose extrinsic: **registerNodeWithColdkey**
6. Fill in the parameters:
   - `nodeType`: Select **Validator** (for storage miners)
   - `nodeId`: Your node ID (bytes)
   - `payInCredits`: Select **No**
   - `ipfsNodeId`: Leave as **None**
7. Sign and submit the transaction

![Register Coldkey](/img/arion/register-coldkey.png)

#### Prerequisite Step 2: Create and Register Child as Proxy

Create a child account and register it as a proxy of your coldkey. This allows the child account to operate on behalf of the coldkey without accessing its funds.

1. **Create a child account** (use Polkadot.js extension or any wallet)
2. Navigate to [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.hippius.network#/extrinsics)
3. Go to **Developer → Extrinsics**
4. Select your **coldkey account** (main account)
5. Choose pallet: **proxy**
6. Choose extrinsic: **addProxy**
7. Fill in the parameters:
   - `delegate`: Your child account address
   - `proxyType`: Select **Any** (or your preferred proxy type)
   - `delay`: Set to **0** (blocks)
8. Sign and submit the transaction

![Register Proxy](/img/arion/register-proxy.png)

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

#### Step 4: Register Child in Arion Pallet

Now register your miner's child account and node ID in the Arion pallet using the signature generated in Step 3.

1. Navigate to [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.hippius.network#/extrinsics)
2. Go to **Developer → Extrinsics**
3. Select your **coldkey account** (family/main account)
4. Choose pallet: **arion**
5. Choose extrinsic: **registerChild**
6. Fill in the parameters (copy from Step 3 tool output):
   - `family`: Your coldkey account address (AccountId32)
   - `child`: Your child account address (AccountId32)
   - `nodeId`: The `node_id` from tool output (paste the full `0x...` hex string as [u8;32])
   - `nodeSig`: The `node_sig` from tool output (paste the full `0x...` hex string as [u8;64])
7. Sign and submit the transaction

![Register Child in Arion](/img/arion/register-child-arion.png)

:::tip
Make sure to copy the exact `node_id` and `node_sig` values from the `generate_registration_data` tool output. These are cryptographically linked and must match exactly.
:::

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

