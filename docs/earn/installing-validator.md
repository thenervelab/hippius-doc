---
description: 6
---

# Installing a Validator Node

A validator node is a crucial component of the Hippius network that helps secure the network, validate transactions, and participate in consensus. This guide will walk you through the process of setting up and running a validator node using our professional-grade Ansible deployment.

## Prerequisites

- Target host running Ubuntu 24.04
- SSH access to target host
- Ansible 2.9+ installed on your control machine
- Docker and docker-compose installed on control machine
- Minimum system requirements:
  - 12 CPU cores
  - 128GB RAM
  - 2TB NVME storage
  - Stable internet connection
- Alpha tokens for tx fees

## Installation Steps

### 1. Clone the Deployment Repository

```bash
git clone https://github.com/thenervelab/hippius-validator
cd hippius-validator
```

### 2. Configure Your Inventory

Create or modify the inventory file at `inventory/production/hosts.yml`:

```yaml
all:
  children:
    ipfs_nodes:
      hosts: YOUR_VALIDATOR_IP # Replace with your server's IP address
      vars:
        ansible_user: ubuntu
        ansible_become: yes
        ansible_python_interpreter: /usr/bin/python3
```

For example, if your validator's IP address is `123.45.67.89`, your `hosts.yml` would look like:

```yaml
all:
  children:
    ipfs_nodes:
      hosts: 123.45.67.89
      vars:
        ansible_user: ubuntu
        ansible_become: yes
        ansible_python_interpreter: /usr/bin/python3
```

Make sure to:

- Replace `YOUR_VALIDATOR_IP` with your actual server IP address
- Ensure the `ubuntu` user has sudo privileges on the target machine
- Verify Python 3 is installed on the target machine

### 3. Review Configuration (Optional)

The default configuration in `group_vars/all.yml` includes:

```yaml
# Hippius Configuration
hippius_binary_url: "https://download.hippius.com/hippius"
hippius_node_name: "hippius-validator"
hippius_ports:
  rpc: 9944
  p2p: 30333
  ws: 9933

# Subtensor Configuration
subtensor_ports:
  rpc: 9945
  p2p: 30334
  ws: 9934

# IPFS Configuration
ipfs_version: "v0.26.0"
ipfs_api_address: "/ip4/127.0.0.1/tcp/5001"
ipfs_gateway_address: "/ip4/127.0.0.1/tcp/8080"
```

You can modify these values if needed, but the defaults are recommended for most users.

### 4. Deploy the Validator

Run the Ansible playbook:

```bash
ansible-playbook -i inventory/production/hosts.yml site.yml
```

This will:

- Install and configure IPFS node
- Set up Subtensor node (mainnet-lite)
- Deploy Hippius validator
- Configure firewall rules
- Set up systemd services

### 5. Configure Validator Keys

After the deployment completes, you need to configure your validator keys. This is a crucial step for participating in consensus.

1. First, stop the Hippius service:

```bash
sudo systemctl stop hippius
```

2. Start Hippius temporarily in non-validator mode:

```bash
/opt/hippius/bin/hippius \
    --base-path /opt/hippius/data \
    --port 30333 \
    --rpc-cors all \
    --database paritydb \
    --name hippius-validator \
    --telemetry-url "wss://telemetry.hippius.com/submit/ 0" \
    --chain hippius \
    --node-key-file /opt/hippius/data/chains/hippius_mainnet/network/secret_ed25519
```

3. In a new terminal, inject your validator keys. Replace `SEED_PHRASE_HOTKEY` with your actual seed phrase and `pubkey_in_hex_format` with your public key:

```bash
# Inject IMON key
curl -H "Content-Type: application/json" -d '{ "jsonrpc":"2.0", "id":1, "method":"author_insertKey", "params": [ "imon", "SEED_PHRASE_HOTKEY", "pubkey_in_hex_format" ] }' http://localhost:9944/

# Inject BABE key
curl -H "Content-Type: application/json" -d '{ "jsonrpc":"2.0", "id":1, "method":"author_insertKey", "params": [ "babe", "SEED_PHRASE_HOTKEY", "pubkey_in_hex_format" ] }' http://localhost:9944/

# Inject ROLE key
curl -H "Content-Type: application/json" -d '{ "jsonrpc":"2.0", "id":1, "method":"author_insertKey", "params": [ "role", "SEED_PHRASE_HOTKEY", "pubkey_in_hex_format" ] }' http://localhost:9944/

# Inject ACCO key
curl -H "Content-Type: application/json" -d '{ "jsonrpc":"2.0", "id":1, "method":"author_insertKey", "params": [ "acco", "SEED_PHRASE_HOTKEY", "pubkey_in_hex_format" ] }' http://localhost:9944/

# Inject GRAN key
curl -H "Content-Type: application/json" -d '{ "jsonrpc":"2.0", "id":1, "method":"author_insertKey", "params": [ "gran", "SEED_PHRASE_HOTKEY", "pubkey_in_hex_format" ] }' http://localhost:9944/

# Inject HIPS key
curl -H "Content-Type: application/json" -d '{ "jsonrpc":"2.0", "id":1, "method":"author_insertKey", "params": [ "hips", "SEED_PHRASE_HOTKEY", "pubkey_in_hex_format" ] }' http://localhost:9944/
```

4. After successfully injecting all keys, stop the temporary node (Ctrl+C in the terminal running Hippius)

5. Restart Hippius in validator mode:

```bash
sudo systemctl start hippius
```

6. Verify the service is running:

```bash
sudo systemctl status hippius
```

> **Important**: Keep your seed phrase and keys secure. Never share them with anyone. Make sure to back them up safely.

### 6. Generate and Register Session Keys

In addition to the keys above, you need to generate session keys and register them in the blockchain:

1. With your Hippius node running, execute the following command on your validator server:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "author_rotateKeys", "params":[]}' http://localhost:9944
```

2. The response will contain a session key in the format:

```json
{
  "jsonrpc": "2.0",
  "result": "0x...",
  "id": 1
}
```

3. Save the value from the "result" field (starting with "0x"). This is your session key that will be used when staking.

## Staking and Bonding Your Validator

To complete the validator setup, you need to register and bond your account in Polkadot.js Apps:

1. Go to [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.hippius.network) connected to the Hippius network
2. Navigate to "Network" → "Staking" → "Account actions"
3. Click on "Stash" button
4. In the bonding preferences:
   - Select the same account for both Stash and Controller accounts
   - Enter the amount you wish to bond
   - Set your payment destination
5. Click "Bond" and sign the transaction
6. Once bonded, click on "Validate" button
7. In the validate form:
   - Enter the session key you generated earlier
   - Set your commission rate and other preferences
8. Click "Validate" and sign the transaction

> **Important**: Make sure to use the same key for both your stash and controller accounts to simplify management.

If you need help during any part of this process, join the [Hippius Discord community](https://discord.hippius.com) where you can get assistance from the team and other validators.

## Components Installed

### IPFS Node

- Runs as dedicated IPFS user
- API port: 5001
- Gateway port: 8080
- Managed via systemd

### Subtensor Node

- Runs via Docker
- External ports:
  - RPC: 9945
  - P2P: 30334
  - WebSocket: 9934
- Uses warp sync for faster synchronization

### Hippius Validator

- Runs with off-chain worker support
- Default ports:
  - RPC: 9944
  - P2P: 30333
  - WebSocket: 9933
- Automatic ED25519 key management

## Monitoring Your Validator

### Check Service Status

```bash
# Check IPFS status
systemctl status ipfs

# Check Subtensor status
docker-compose -f /opt/subtensor/docker-compose.yml ps

# Check Hippius validator status
systemctl status hippius
```

### View Logs

```bash
# IPFS logs
journalctl -u ipfs -f

# Subtensor logs
docker-compose -f /opt/subtensor/docker-compose.yml logs -f

# Hippius validator logs
journalctl -u hippius -f
```

## Staking and Validation

1. Go to the Hippius Network Dashboard
2. Connect your wallet
3. Navigate to Network → Staking
4. Click "Start Validating"
5. Bond your Alpha tokens
6. Submit your session keys
7. Wait for the next era to begin validation

## Security Considerations

The Ansible deployment automatically implements several security best practices:

- IPFS runs as a dedicated system user
- Subtensor runs in a Docker container with resource limits
- Firewall rules are automatically configured
- Secure key management for the validator
- Regular system updates

## Troubleshooting

### Common Issues

1. Deployment fails

   - Check SSH connectivity
   - Verify Ansible version
   - Ensure target host meets requirements
   - Check network connectivity

2. Services not starting

   - Check system resources
   - Verify port availability
   - Review service logs

3. Node not syncing
   - Check network connectivity
   - Verify chain spec
   - Review Subtensor and Hippius logs

### Getting Help

- Join our Discord community
- Check the validator documentation
- Contact support team
- Review the [GitHub repository](https://github.com/thenervelab/hippius-validator)

## Best Practices

- Regularly monitor system resources
- Keep the host system updated
- Back up validator keys
- Monitor validator performance
- Set up alerting for service issues

Remember to maintain your validator node regularly and stay updated with network upgrades. The Ansible deployment makes maintenance easier by providing a consistent and automated setup process.
