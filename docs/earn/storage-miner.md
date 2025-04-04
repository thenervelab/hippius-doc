# Hippius Storage Miner Ansible Deployment

This Ansible project provides a professional-grade deployment for Hippius storage miner nodes with IPFS storage, optimized with ZFS for performance and reliability.

## Overview

The deployment configures:
- IPFS node with optional ZFS storage pool
- Hippius blockchain node configured as a storage miner
- Proper system configuration and security settings

## Structure

```
.
├── inventory/           # Host inventory files  
├── roles/               # Role-based tasks
│   ├── common/          # System updates and firewall
│   ├── ipfs/            # IPFS node with ZFS setup
│   └── hippius/         # Hippius storage miner setup
├── group_vars/          # Variables for all groups
├── site.yml             # Main playbook
├── hippius.yml          # Hippius-only playbook
├── update_hippius.yml   # Binary update playbook  
└── README.md            # This file
```

## Requirements

- Ansible 2.9+
- Target hosts running Ubuntu 24.04
- SSH access to target hosts
- Root or sudo access on target hosts

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
- **System Disk**: 
  - SSD with 100GB+ for OS and applications

- **ZFS Pool for IPFS**:
  - **Minimum**: 2TB usable space
  - **Recommended**: 4TB+ usable space
  - **Disk Type**: NVMe SSDs or enterprise SSDs preferred for performance
  - **Configuration**: At least 2 disks for basic redundancy (mirror)
  - **ZFS ARC Cache**: Benefits greatly from additional RAM

- **Blockchain Data**: 
  - **Initial**: 100GB reserved, SSD-based storage
  - **Growth**: Plan for 50-100GB+ annual growth

#### Network
- **Bandwidth**: 1Gbps minimum, with at least 100Mbps sustained throughput
- **Monthly Traffic**: Plan for 5-10TB+ of monthly traffic (especially for IPFS)
- **Public IP**: Static public IP address recommended

#### Example Server Configurations

##### Mid-range Configuration
- 8 vCPUs
- 32GB RAM
- 100GB SSD for system
- 2x 2TB NVMe SSDs in ZFS mirror configuration (2TB usable)
- 1Gbps network connection

##### High-performance Configuration
- 16+ vCPUs
- 64GB RAM
- 200GB SSD for system
- 4x 2TB NVMe SSDs in RAID-Z/RAID10 configuration (6TB+ usable)
- 10Gbps network connection

## Components

### IPFS Node
- Runs as dedicated IPFS user
- ZFS storage pool for optimal performance
- Configurable API and gateway ports
- Systemd service for automatic startup

### Hippius Node
- Runs as root user
- Configured with off-chain worker support
- Default substrate ports (configurable)
- Systemd service for automatic startup
- Automatic ED25519 key management:
  - Uses provided key if specified in `hippius_key`
  - Generates a secure ED25519 key if none provided
  - Stores key in the network directory with proper permissions

## Usage

### Basic Deployment

1. Configure your inventory in `inventory/production/hosts.yml`:
   ```
   [ipfs_nodes]
   your-server-ip-or-hostname
   ```

2. Review and adjust variables in `group_vars/all.yml`:
   - IPFS configuration and ZFS settings
   - Hippius binary location and ports

3. Run the playbook:
   ```bash
   ansible-playbook -i inventory/production/hosts.yml site.yml -e "hippius_hotkey_mnemonic='YOUR SEED WORDS'"

   ```

### ZFS Configuration

To use ZFS for IPFS storage, specify the available disks:

```bash
ansible-playbook -i inventory/production/hosts.yml site.yml -e "hippius_hotkey_mnemonic='YOUR SEED WORDS'" -e "zfs_disks=['sdb','sdc']"
```

This creates a ZFS pool named "ipfs" using the specified disks.

### Running Only Hippius Role

To deploy or update only the Hippius node:

```bash
ansible-playbook -i inventory/production/hosts.yml site.yml --tags hippius
```

Or use the dedicated playbook:

```bash
ansible-playbook -i inventory/production/hosts.yml hippius.yml
```

### Updating Hippius Binary

To update just the Hippius binary without changing configuration:

```bash
ansible-playbook -i inventory/production/hosts.yml update_hippius.yml
```

## Configuration

### Important Variables

```yaml
# ZFS Configuration for IPFS
zfs_disks: []  # Default empty, specify disk names like ['sdb','sdc']

# IPFS Configuration
ipfs_version: "v0.33.2"
ipfs_user: ipfs
ipfs_group: ipfs
ipfs_home: /zfs/ipfs    # ZFS dataset mountpoint
ipfs_data_dir: "{{ ipfs_home }}/data"
ipfs_api_address: "/ip4/127.0.0.1/tcp/5001"
ipfs_gateway_address: "/ip4/127.0.0.1/tcp/8080"

# Hippius Configuration
hippius_binary_url: "https://download.hippius.com/hippius"
hippius_home: /opt/hippius
hippius_data_dir: "{{ hippius_home }}/data"
hippius_key: ""  # Optional: Provide ED25519 key in hex format
hippius_ports:
  rpc: 9944
  p2p: 30333
  ws: 9933
hippius_node_name: "hippius-storage-miner"
```

## Security Notes

- IPFS runs as a dedicated system user
- Hippius validator runs as root (as required)
- Firewall rules are automatically configured for all required ports

## Maintenance

### Service Management

```bash
# IPFS
systemctl status ipfs
systemctl restart ipfs

# Hippius
systemctl status hippius
systemctl restart hippius
```

### ZFS Pool Management

```bash
# Check ZFS pool status
zpool status ipfs

# Check ZFS dataset space usage
zfs list

# Scrub ZFS pool (recommended monthly)
zpool scrub ipfs
```

## Troubleshooting

### Check service logs:
```bash
# IPFS logs
journalctl -u ipfs -f

# Hippius logs
journalctl -u hippius -f
```

### Common Issues

#### IPFS Not Starting
- Check permissions: `ls -la /zfs/ipfs`
- Verify ZFS mounts: `zfs list`
- Check IPFS config: `cat /zfs/ipfs/data/config`

#### Hippius Not Connecting to Network
- Check bootnodes configuration
- Verify firewall settings: `ufw status`
- Check Hippius logs for specific errors

## Final Setup: Configure HIPS Key

After the deployment completes, you need to configure your HIPS key. This is required for your storage miner to participate in the network.

1. First, ensure your Hippius node is running:
```bash
systemctl status hippius
```

2. If it's not running, start it:
```bash
systemctl start hippius
```

3. Insert your HIPS key using the RPC API. Replace `YOUR HOTKEY MNEMONIC` with your actual seed phrase and `YOUR_HOTKEY_PUBLIC_HEX` with your public key in hexadecimal format:

```bash
curl -H "Content-Type: application/json" -d '{ "jsonrpc":"2.0", "id":1, "method":"author_insertKey", "params": [ "hips", "YOUR HOTKEY MNEMONIC", "YOUR_HOTKEY_PUBLIC_HEX" ] }' http://localhost:9944/
```

4. Verify your HIPS key was inserted successfully by checking the logs:
```bash
journalctl -u hippius -f | grep -i key
```

5. Restart Hippius to ensure the key is properly loaded:
```bash
systemctl restart hippius
```

> **Important**: Your hotkey mnemonic is a sensitive secret. Never share it with anyone, and make sure to back it up securely.

## Next Steps

After successfully setting up your storage miner and configuring your HIPS key:

1. Register your miner on the Hippius network
2. Monitor your performance and rewards
3. Set up regular maintenance tasks
4. Stay updated with network upgrades and changes

Remember to keep your system up to date and regularly check for any security or performance issues.



