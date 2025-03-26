# Registering in the Hippius Blockchain

After setting up your validator or storage miner node, you need to register it in the Hippius blockchain to start participating in the network and earning rewards. This guide walks you through the registration process using Polkadot.js Apps, which is currently the only available method for node registration.

## Prerequisites

Before registering, ensure you have:

- A running validator or storage miner node
- HIPS key properly configured (see [Installing Validator](installing-validator.md) or [Storage Miner](storage-miner.md) guides)
- Access to Polkadot.js Apps and the Polkadot.js browser extension
- Alpha tokens for registration fees and staking

## Registration via Polkadot.js Apps

### Step 1: Access Polkadot.js Apps

1. Go to the [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.hippius.network#/extrinsics) https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.hippius.network#/extrinsics connected to the Hippius network
2. Ensure you're connected to the Hippius network endpoint: `wss://rpc.hippius.network`
3. Connect your wallet using the Polkadot.js extension

### Step 2: Navigate to Extrinsics

1. From the top navigation menu, select "Developer"
2. Click on "Extrinsics"
3. In the extrinsics submission form, you'll see options to select an account and the extrinsic to submit

### Step 3: Configure the Registration Extrinsic

1. From the "submit the following extrinsic" dropdown, select `registration` → `registerNodeWithColdKey(nodeType, nodeId, payInCredits, ipfsNodeId)`

2. Configure the parameters:
   - **nodeType**: Select the appropriate type:
     - `StorageMiner` for IPFS or S3 storage miners
     - `Validator` for validator nodes
     - `ComputeMiner` for compute nodes

   - **nodeId**: Enter your node's ID in byte format (0x prefixed hex)
     - This is the ID of your Hippius node generated during node setup
     - Format should be like: `1......` (not the hexadecimal format)
     - You can also use the file upload option to select a key file

   - **payInCredits**: Boolean indicating whether to pay in credits (default: false to pay in Alpha)
   
   - **ipfsNodeId**: Your IPFS node ID 

### Step 4: Submit the Transaction

1. Review all entries for accuracy
2. Click "Submit Transaction"
3. Review the transaction details in the confirmation window
4. Sign the transaction with your account

### Step 5: Confirm Registration

1. Check that the transaction is included in a block
2. Verify your node registration was successful by navigating to "Network" → "Explorer" 
3. Look for your extrinsic in recent transactions

## Node Type Details

Different node types serve different functions in the Hippius network:

- **Validator Node**: For block production and validation
- **Storage Miner (IPFS)**: For decentralized IPFS storage
- **Storage Miner (S3)**: For S3-compatible storage
- **Compute Miner**: For computation resources (future)


## Verifying Registration

After registration, verify your node appears on the network:

1. In Polkadot.js Apps, go to "Developer" → "Chain state"
2. Query the registration pallet to verify your node ID is registered


## Next Steps

After successful registration:

1. Monitor your node's status
2. Set up additional monitoring tools
3. Optimize performance for better rewards
4. Stay updated with network upgrades and changes

Remember that your node must remain online and in good standing to earn rewards and maintain its registration status. 
