# Registering in the Hippius Blockchain

After setting up your validator or storage miner node, you need to register it in the Hippius blockchain to start participating in the network and earning rewards. This guide walks you through the updated registration process using the new Hippius CLI Python tool, which is now the primary method for node registration. The old Polkadot.js Apps method is still available but has been deprecated in favor of this streamlined CLI approach.

## Prerequisites

Before registering, ensure you have:

- A running validator or storage miner node
- Node keys properly configured (see [Installing Validator](installing-validator.md) or [Storage Miner](storage-miner.md) guides)
- Python 3.7+ installed on your system
- Access to the Hippius CLI Python package (`hippius` version `0.2.49` or later)
- Alpha tokens for registration fees and staking
- IPFS node set up and configured (if applicable)

---

## Updated Registration Process Using Hippius CLI (Python)

###  1: Create and Activate Python Virtual Environment

It is recommended to create a clean Python environment for the Hippius CLI tool.

python3 -m venv hippius-env
source hippius-env/bin/activate # Linux/macOS

On Windows use:
hippius-env\Scripts\activate
text

###  2: Install Hippius CLI Package

pip install hippius==0.2.49

text

###  3: Preparing Node Information

- Get your substrate node key info by inspecting or generating keys:

Inspect existing node key
./hippius key inspect-node-key --file <node-key-path>

Or generate a new node key
./hippius key generate-node-key

text

- Obtain IPFS node ID and private key in base64 format from your IPFS config:

sudo cat ~/.ipfs/config

text

---

###  4: Register Coldkey Node

Use the following command to register your coldkey node (coldkeys control staking and governance keys):

hippius miner register-coldkey
--node-id <substrate-node-id>
--node-priv-hex <substrate-node-private-hex>
--node-type StorageMiner
--ipfs-peer-id <ipfs-node-id>
--ipfs-priv-b64 "<ipfs-private-key-base64>"
--block-width <u64>

text

Replace the parameters accordingly:

- `--node-id`: Your substrate node ID (not hex)
- `--node-priv-hex`: Your substrate private key in hex format
- `--node-type`: One of `StorageMiner`, `Validator`, `ComputeMiner`
- `--ipfs-peer-id`: Your IPFS node ID as string
- `--ipfs-priv-b64`: Your IPFS private key in base64
- `--block-width`: Block width parameter (u64 integer, usually depends on network config)

---

###  5: Register Hotkey Node

The hotkey is used for operational actions like block signing. Register it with:

hippius miner register-hotkey
--node-id <substrate-node-id>
--node-priv-hex <substrate-node-private-hex>
--node-type <node-type>
--ipfs-peer-id <ipfs-node-id>
--ipfs-priv-b64 "<ipfs-private-key-base64>"
--block-width <u64>
--coldkey <coldkey-address>

text

- Include the `--coldkey` parameter with the coldkey address registered as Coldkey.

---

###  6: Verify Registered Hotkey Node

Verify your hotkey node registration by running:

hippius miner verify-node
--node-id <node-id>
--node-priv-hex <node-private-hex>
--ipfs-peer-id <ipfs-node-id>
--ipfs-priv-b64 "<ipfs-private-key-base64>"
--node-type <node-type>
--block-width <u64>

text

---

###  7: Verify Registered Coldkey Node

Similarly, verify the coldkey node registration:

hippius miner verify-coldkey-node
--node-id <node-id>
--node-priv-hex <node-private-hex>
--ipfs-peer-id <ipfs-node-id>
--ipfs-priv-b64 "<ipfs-private-key-base64>"
--node-type <node-type>
--block-width <u64>

text

---

## Optional: Previous Registration Method Using Polkadot.js Apps

The previous Polkadot.js Apps method is still available but deprecated. For reference:

1. Visit [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.hippius.network#/extrinsics)
2. Connect to `wss://rpc.hippius.network`
3. Navigate to **Developer** → **Extrinsics**
4. Select the extrinsic: `registration` → `registerNodeWithColdKey(nodeType, nodeId, payInCredits, ipfsNodeId)`
5. Enter parameters accordingly
6. Submit and sign the transaction
7. Verify registration on chain explorer

---

## Node Type Descriptions

- **Validator**: For block production and validation
- **StorageMiner**: For decentralized IPFS or S3 storage
- **ComputeMiner**: For compute resource nodes (future functionality)

---

## Verifying Registration on Chain

After registration, confirm your node is recognized:

1. In Polkadot.js Apps, go to **Developer** → **Chain state**
2. Query the registration pallet for your node ID

---

## Next Steps

- Continuously monitor your node's health and status.
- Set up monitoring tools for uptime and performance.
- Optimize configuration to maximize rewards.
- Stay updated with Hippius network upgrades and documentation.

**Note:** Your node must remain online and in good standing to keep earning rewards and maintain registration status.
