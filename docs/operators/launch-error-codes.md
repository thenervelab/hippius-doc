---
id: launch-error-codes
title: Launch error codes
sidebar_label: Launch error codes
slug: /operators/launch-error-codes
description: What the launch error codes on a compute node's page in the provider dashboard mean, and how to fix the host so VMs start again.
---

# Launch error codes

When a VM launch fails on one of your compute nodes, the network records why. You see it on [provider.hippius.com](https://provider.hippius.com):

- **My fleet**: a red **Launches failing (N)** badge on the node's row. N counts the failed attempts since the node last accepted a launch. Hover over the badge to see the latest error.
- **The node page**: a **Launch errors** card. It shows the latest error with what to do about it, the commands to run, and its raw code, stage, time and order id. Below it, the card lists the 5 most recent failures.

Once a launch is accepted again, the badge goes away and the card says **Recovered**. The earlier failures stay listed as history. Launch errors are information only: they never change whether the network places VMs on your node.

Each error has a **code**: the step that failed, as your node's agent reported it. Look it up below. If the dashboard shows a code that isn't listed here, read [Other codes](#other-codes).

The commands run on the node itself, except the Ansible ones, which run from the machine you deploy the miner play from. Replace the parts in angle brackets (`<hostname>`, `<data_disk_root>`, `<directory>`) before running them.

Two commands come up often:

```sh
# The agent's journal: every launch failure is logged there in full.
sudo journalctl -u hippius-miner-agent --since "2 hours ago"

# The miner play's launch preflight: checks the libvirt default network,
# QEMU's access to the disk roots and direct I/O, then starts a small test VM.
ansible-playbook -i inventory.yml playbooks/06-miner-bootstrap.yml --limit <hostname> --tags launch_preflight
```

Codes in square brackets, such as `[LIBVIRT_DEFAULT_NET_INACTIVE]`, are the ones the play's preflight prints for the same problem.

## libvirt could not start the VM

### `libvirt-driver/create:network-inactive` {#network-inactive}

**libvirt's default network is not running.** Every VM's network card attaches to libvirt's `default` network, so no VM can start while it is down.

Start it, and enable it at boot:

```sh
sudo virsh net-start default && sudo virsh net-autostart default
```

The latest play does this for you. Its preflight reports the problem as `[LIBVIRT_DEFAULT_NET_INACTIVE]`.

### `libvirt-driver/create:disk-permission` {#disk-permission}

**QEMU cannot reach the VM disk directory.** QEMU's user (`libvirt-qemu`) can't enter a directory on the path to `data_disk_root`. libvirt hands QEMU each disk file, never its parent directories, so every parent must be traversable.

List the permissions along the path, then give others execute permission on each parent directory that lacks it:

```sh
namei -l <data_disk_root>
sudo chmod o+x <directory>
```

`sudo setfacl -m u:libvirt-qemu:x <directory>` works too. The play doesn't change directories it didn't create. Preflight code: `[QEMU_CANNOT_TRAVERSE_DATA_ROOT]`.

### `libvirt-driver/create:disk-odirect` {#disk-odirect}

**The VM disk filesystem does not support direct I/O.** VM disks are opened with `O_DIRECT`, which this filesystem refuses.

Check which filesystem holds the data root:

```sh
findmnt -T <data_disk_root>
```

Put `data_disk_root` on ext4 or xfs. tmpfs, overlayfs, and network or FUSE filesystems without direct I/O don't work. Then rerun the play. Preflight code: `[DATA_ROOT_NO_ODIRECT]`.

### `libvirt-driver/create:sev` {#sev}

**The host could not start a confidential (SEV-SNP) VM.** libvirt failed while setting up SEV-SNP for the VM.

Check that SEV-SNP is enabled in the BIOS and in the kernel, and that the host still runs the kernel and firmware the play installed:

```sh
sudo dmesg | grep -i -E 'sev|snp'
```

libvirt's exact error is in the agent's journal.

### `libvirt-driver/create:unknown` {#libvirt-create-unknown}

**libvirt could not start the VM**, for a reason the agent couldn't classify. Run the play's launch preflight, then read libvirt's error in the agent's journal (both commands are at the top of this page). Any other `libvirt-driver/create:` code means the same.

### `libvirt-driver/define` {#libvirt-define}

**libvirt rejected the VM definition** before starting it. This usually means the host runs a libvirt or QEMU version the play doesn't install. Rerun the play to bring the host back to the supported versions, and read libvirt's error in the agent's journal.

### Other `libvirt-driver/` codes {#libvirt-driver}

**A libvirt step failed.** Run the play's launch preflight and read libvirt's error in the agent's journal.

## The pre-launch check failed

### `tenant-preflight/ovmf-missing` {#ovmf-missing}

**The VM firmware (OVMF) is missing or wrong.** The tenant firmware is missing, or doesn't have the expected digest. Rerun the miner play: play 02 installs the firmware and checks it.

```sh
ansible-playbook -i inventory.yml playbooks/06-miner-bootstrap.yml --limit <hostname>
```

### Other `tenant-preflight/` codes {#tenant-preflight}

**The host failed the check that runs before the VM starts** (artifact staging and measurement). Rerun the play. If the check fails again, read the agent's journal.

## The VM did not come up

### `cvm-launch-failed/timeout` {#launch-timeout}

**The VM did not come up in time.** It started, but didn't report ready before the deadline. Check the host's load and the agent's journal. If it keeps happening, run the play's launch preflight.

### Other `cvm-launch-failed/` codes {#cvm-launch-failed}

**The VM failed to start.** The agent's journal has the reason, at the time the dashboard shows.

### `cvm-launch-input/<check>` {#cvm-launch-input}

**The agent rejected the launch order.** It refused one of the order's parameters; the part after the slash names the check. This usually means the agent isn't the version the network expects. Rerun the play to update it.

### `ticket-delivery/connect-timeout` {#ticket-timeout}

**The new VM never got ready for its boot ticket.** The VM was started, but its boot never got far enough to accept the ticket the agent hands it over vsock. On an SEV-SNP host, this usually means the guest couldn't run at all.

1. Check that SEV-SNP is enabled (`sudo dmesg | grep -i -E 'sev|snp'`).
2. Run the play's launch preflight, which starts a test VM.
3. Read the agent's journal.

If it keeps happening, [contact support](/use/console/support) with the code.

### Other `ticket-delivery/` codes {#ticket-delivery}

**The agent could not hand the VM its boot ticket.** This is usually not a fault of your host. Read the agent's journal at the time shown, and [contact support](/use/console/support) with the code if it repeats.

## The VM's disks could not be prepared

The agent prepares up to three disks for each VM: a small state disk (`state-disk/`), the VM's writable overlay (`overlay-disk/`) and its data disk (`data-disk/`). The three share their step codes.

### `…/mkdir`, `…/create`, `…/statvfs` {#agent-sandbox}

**The agent cannot create the VM's disk files.** The agent couldn't create a directory or file under a storage root, or read the filesystem there. Usually its systemd sandbox can't write a root that the agent's config names.

1. Set `miner_data_disk_root` and `miner_state_disk_root` in the host's `host_vars`.
2. Rerun the play. It renders both the agent's config and its unit. Don't edit `config.toml` by hand.
3. If it still fails, check that the root is a writable mount with free space, and that no drop-in narrows the sandbox:

```sh
findmnt -T <data_disk_root>
df -h <data_disk_root>
ls /etc/systemd/system/hippius-miner-agent.service.d/
```

Preflight code: `[AGENT_SANDBOX_CANNOT_WRITE]`.

### `…/insufficient-space`, `…/truncate` {#disk-space}

**Not enough disk space for the VM's disks.** The filesystem under the storage root doesn't have room for the VM's disks. Free space there, or move the root to a larger filesystem and rerun the play.

```sh
df -h <data_disk_root>
```

### `state-disk/mkfs-spawn` {#mkfs-missing}

**mkfs.ext4 is missing on the host.** The agent formats each VM's small state disk with `mkfs.ext4`, which isn't installed. Install it, or rerun the play:

```sh
sudo apt-get install -y e2fsprogs
```

### Other disk codes {#disk-other}

**The agent could not prepare the VM's disks**, for a reason that is usually not your host's: a concurrent launch, or an invalid size in the order. Read the agent's journal at the time shown, and [contact support](/use/console/support) with the code if it repeats.

## The network could not reach the node

### `miner-unreachable` {#miner-unreachable}

**The network could not reach this node.** The Hippius gateway got no answer from your agent. Either the agent is stopped, or the host's NetBird connection is down. Check both:

```sh
sudo systemctl status hippius-miner-agent
netbird status
```

Then watch the next launch.

## Generic codes

### `unclassified` {#unclassified}

**The node refused the launch without a reason.** The agent answered with an error but no code. The reason is in the agent's journal, at the time the dashboard shows.

### `invalid` {#invalid}

**The node sent an unreadable error code.** The code wasn't in the expected format. This usually means an outdated or modified agent. Rerun the play to install the current agent, and read the agent's journal.

### Other codes {#other-codes}

The list of codes grows with the agent. The dashboard always shows the raw code, even one this page doesn't describe yet:

1. Read the agent's journal at the time shown.
2. If launches keep failing, [contact support](/use/console/support) with the code, the time and the order id from the node page.
