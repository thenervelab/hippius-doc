---
id: launch-error-codes
title: Launch error codes
sidebar_label: Launch error codes
slug: /operators/launch-error-codes
description: What the launch error codes on a compute node's page in the provider dashboard mean, whose action they need, and how to fix the host so VMs start again.
---

# Launch error codes

When a VM launch fails on one of your compute nodes, the network records why. You see it on [provider.hippius.com](https://provider.hippius.com):

- **My fleet**: a red **Launches failing (N)** badge on the node's row. N counts the failed attempts since the node last accepted a launch. Hover over the badge to see the latest error.
- **The node page**: a **Launch errors** card. It shows the latest error, whose action it needs, what to do and the commands to run, then its raw code, stage, time and order id. Below it, the card lists the 5 most recent failures.

Once a launch is accepted again, the badge goes away and the card says **Recovered**. The earlier failures stay listed as history. Launch errors are information only: they never change whether the network places VMs on your node.

## Whose action it needs

Every code says who has to act:

- **Needs your action**: something on your host, its BIOS or its play needs fixing.
- **Hippius side: nothing to do**: the order we sent was at fault, or the failure is on our side. We're notified.
- **Usually temporary**: the network places the VM elsewhere or retries. Act only if it keeps coming back.

## Check your host with play 09 {#play-09}

Many launch errors have a counterpart in play 09, the launch preflight of the miner play. It checks everything a tenant VM needs (libvirt's default network and its filter, QEMU's access to the disk roots, direct I/O, the agent's sandbox), starts a small test VM, and reports every failure at once with its fix. Run it from the machine you deploy the play from:

```sh
ansible-playbook -i inventory.yml playbooks/06-miner-bootstrap.yml --limit <hostname> --tags launch_preflight
```

Play 09 and the detailed error codes ship in **hippius-cvm v2026.10.21 or later**: update your checkout of the play if it lacks play 09. If your agent is older than that release (it reports only coarse codes such as `dispatch-failed`), update it with:

```sh
ansible-playbook -i inventory.yml playbooks/06-miner-bootstrap.yml --limit <hostname> -e miner_agent_version=v2026.10.21
```

Each play 09 code and its fix is described in the guide's [Launch preflight codes (play 09)](https://github.com/thenervelab/hippius-cvm/blob/main/docs/operator/external-miner-guide.md#launch-preflight-codes-play-09).

## Reading a code

Look the code up below. Some codes end with a value, such as a pool name in `cvm-pool-unavailable:<pool>`: the dashboard shows that value next to the code. A code that isn't listed is explained by its family (the part before the first `/`), and the dashboard always shows the raw code.

Most commands run on the node itself. The `ansible-playbook` ones run from the machine you deploy the play from. Replace the parts in angle brackets (`<hostname>`, `<data_disk_root>`, `<state_disk_root>`, `<storage_root>`, `<directory>`, `<pool>`) before running them. Every launch failure is also in the agent's journal:

```sh
sudo journalctl -u hippius-miner-agent --since "2 hours ago"
```

## All codes

| Code | Whose action | What it means |
|---|---|---|
| [`miner-unreachable`](#miner-unreachable) | Needs your action | The network could not reach this node |
| [`libvirt-driver/create:network-inactive`](#network-inactive) | Needs your action | libvirt's default network is not running |
| [`libvirt-driver/create:disk-open-permission`](#disk-open-permission) | Needs your action | QEMU cannot reach the VM disk directory |
| [`libvirt-driver/create:disk-open-invalid`](#disk-open-invalid) | Needs your action | The VM disk filesystem does not support direct I/O |
| [`libvirt-driver/create:disk-missing`](#disk-missing) | Needs your action | A VM disk file is missing |
| [`libvirt-driver/create:nwfilter-missing`](#nwfilter-missing) | Needs your action | libvirt's clean-traffic network filter is missing |
| [`libvirt-driver/create:sev-busy`](#sev-busy) | Needs your action | The SEV firmware is busy |
| [`libvirt-driver/create:sev-asid-exhausted`](#sev-asid-exhausted) | Needs your action | No SEV slot (ASID) is free on the host |
| [`libvirt-driver/create:sev-device-permission`](#sev-device-permission) | Needs your action | QEMU cannot open the SEV device |
| [`libvirt-driver/create:sev-unavailable`](#sev-unavailable) | Needs your action | SEV-SNP is not enabled on the host |
| [`libvirt-driver/create:sev-init`, `libvirt-driver/create:sev-…`](#sev) | Needs your action | The host could not start a confidential (SEV-SNP) VM |
| [`libvirt-driver/create:kvm-unavailable`](#kvm-unavailable) | Needs your action | KVM is not available on the host |
| [`libvirt-driver/create:permission-denied`](#permission-denied) | Needs your action | QEMU was denied access to a VM file |
| [`libvirt-driver/create:out-of-memory`](#out-of-memory) | Needs your action | The host ran out of memory starting the VM |
| [`libvirt-driver/create:qemu-exited`](#qemu-exited) | Needs your action | QEMU exited while starting the VM |
| [`libvirt-driver/create`, `libvirt-driver/create:<other>`](#libvirt-create) | Needs your action | libvirt could not start the VM |
| [`libvirt-driver/define`](#libvirt-define) | Needs your action | libvirt rejected the VM definition |
| [`libvirt-driver/virsh-spawn`](#virsh-spawn) | Needs your action | virsh could not be run |
| [`libvirt-driver/unreachable`](#libvirt-unreachable) | Needs your action | libvirtd is not answering |
| [`libvirt-driver/destroy`, `…/domstate`, `…/dumpxml`, `…/undefine`, `…/state-parse`, `…/name-parse`](#libvirt-driver) | Needs your action | A libvirt step failed |
| [`cvm-launch-failed/timeout`](#launch-timeout) | Needs your action | The VM did not come up in time |
| [`cvm-launch-failed/domain-error`](#domain-error) | Needs your action | The VM crashed while booting |
| [`cvm-launch-failed/handle-lost`, `cvm-launch-failed/teardown`](#handle-lost) | Usually temporary | The agent lost track of the VM during launch |
| [`cvm-launch-failed/rng`](#rng) | Needs your action | The agent could not read the host's random source |
| [`cvm-launch-failed/adopt-mkdir`, `…/adopt-rename`, `…/adopt-write`](#adopt-write) | Needs your action | The agent could not save the VM's record |
| [`cvm-launch-failed/adopt-serialize`](#adopt-serialize) | Hippius side: nothing to do | The agent could not encode the VM's record |
| [`cvm-launch-failed/<other>`](#cvm-launch-failed) | Needs your action | The VM failed to start |
| [`ticket-delivery/connect-timeout`](#ticket-timeout) | Usually temporary | The VM booted but never took its boot ticket |
| [`ticket-delivery/write-failed`, `…/cid-not-owned`, `…/no-cid`, `…/empty`, `…/oversize`, `ticket-delivery-failed`](#ticket-delivery) | Usually temporary | The agent could not hand the VM its boot ticket |
| [`tenant-preflight/ovmf-missing`](#ovmf-missing) | Needs your action | The VM firmware (OVMF) is missing or wrong |
| [`tenant-preflight/staging-mkdir`, `…/stage-mkdir`, `…/stage-create`, `…/stage-write`, `…/stage-sync`, `…/stage-rename`](#stage-write) | Needs your action | The agent could not stage the VM's boot files |
| [`tenant-preflight/fetch-client`, `…/fetch-network`, `…/fetch-http-status`, `…/fetch-body`, `…/sha256-mismatch`](#fetch) | Usually temporary | The agent could not download the VM's boot files |
| [`tenant-preflight/base-in-use`](#base-in-use) | Usually temporary | The VM's base image was busy |
| [`tenant-preflight/cpu-count-zero`, `…/bad-sha256-hex`, `…/json-encode`, `…/golden-missing-rootfs-hash`, `tenant-preflight/<other>`](#tenant-preflight) | Hippius side: nothing to do | The check before the VM starts refused the order |
| [`cvm-launch-digest/vcpu-generation`](#vcpu-generation) | Needs your action | The host's CPU generation is not supported or not recognised |
| [`cvm-launch-digest/recipe-artifact-read`](#recipe-artifact-read) | Needs your action | The agent could not read the VM's boot files |
| [`cvm-launch-digest/feature-disabled`, `…/sev-compute`, `…/digest-shape`, `…/recipe-artifact-mismatch`, `…/recipe-vcpu-type`](#cvm-launch-digest) | Hippius side: nothing to do | The VM's launch measurement could not be computed |
| [`cvm-launch-input/<check>`, `launch-input`](#cvm-launch-input) | Hippius side: nothing to do | The agent rejected the launch order |
| [`cvm-insufficient-resources`, `insufficient-resources`](#insufficient-resources) | Usually temporary | The host had no room for the VM |
| [`cvm-insufficient-disk[:<pool>]`, `insufficient-disk[:<pool>]`](#insufficient-disk) | Usually temporary | The disk budget is used up |
| [`cvm-pool-unavailable:<pool>`, `pool-unavailable:<pool>`](#pool-unavailable) | Needs your action | A storage pool is unavailable |
| [`cvm-vsock-cid/…`, `vsock-cid-exhausted`](#vsock-cid) | Usually temporary | No VM channel id was free |
| [`cvm-busy`](#cvm-busy) | Usually temporary | The VM was busy with another operation |
| [`state-disk/mkdir`, `…/create`, `…/truncate`](#agent-sandbox) | Needs your action | The agent cannot create the VM's disk files |
| [`…-disk/insufficient-space`](#disk-space) | Needs your action | Not enough disk space for the VM's disks |
| [`…-disk/io`, `…-disk/statvfs`](#disk-io) | Needs your action | The storage filesystem could not be read |
| [`state-disk/mkfs-spawn`](#mkfs-missing) | Needs your action | mkfs.ext4 is missing on the host |
| [`…-disk/race`, `…/size-zero`, `…/size-overflow`, `…/no-parent`, `…/mkfs-failed`, `…-disk/<other>`](#disk-other) | Hippius side: nothing to do | The agent could not prepare the VM's disks |
| [`relaunch-disks-missing/…[:<pool>]`, `relaunch-disks-missing`](#relaunch-disks-missing) | Needs your action | A restarted VM's disks are not on this host |
| [`relaunch-disks-unreadable/…`, `relaunch-disks-unreadable`](#relaunch-disks-unreadable) | Needs your action | A restarted VM's disks could not be checked |
| [`vm-pool-record-unwritable`](#vm-pool-record-unwritable) | Needs your action | The agent cannot save which pool holds the VM's disks |
| [`vm-pool-record-missing`, `vm-pool-record-unreadable`, `vm-pool-record`](#vm-pool-record) | Hippius side: nothing to do | The VM's pool record is missing or unreadable |
| [`dispatch-failed`](#dispatch-failed) | Needs your action | The agent could not start the VM |
| [`power-policy-store/read`, `…/mkdir`, `…/write`, `…/sync`, `…/rename`, `…/remove`](#agent-state) | Needs your action | The agent could not save the VM's power policy |
| [`power-policy-store/parse`, `power-policy-store/encode`](#power-policy-record) | Hippius side: nothing to do | The VM's power policy record is unreadable |
| [`power-policy-store`, `power-policy-store/<other>`](#power-policy-store) | Needs your action | The agent could not store the VM's power policy |
| [`lock-poisoned`, `dispatch-panic`, `idempotency-store`, `power-policy-store/lock`](#agent-internal) | Needs your action | The agent hit an internal error |
| [`snp-probe/…`](#snp-probe) | Needs your action | The agent's SEV-SNP check failed |
| [`net-policy-not-loaded`](#net-policy-not-loaded) | Needs your action | The VM network rules are not loaded on the host |
| [`not-yet-wired`](#not-yet-wired) | Hippius side: nothing to do | The order needs a feature the agent doesn't have yet |
| [`migration-failed`](#migration-failed) | Hippius side: nothing to do | A VM migration step failed |
| [`order-stale`](#order-stale) | Usually temporary | The order expired before it arrived |
| [`bad-signature`, `malformed-sig`, `signed-order-decode`, `order-body-decode`, `order-domain`, `order-kind-mismatch`, `order-id-invalid`, `order-wrong-miner`](#order-refused) | Hippius side: nothing to do | The agent refused the order |
| [`unclassified`](#unclassified) | Needs your action | The node refused the launch without a reason |
| [`invalid`](#invalid) | Needs your action | The node sent an unreadable error code |
| [`any other code`](#other-codes) | Needs your action | A launch failed on this node |

## Reaching the node

### `miner-unreachable` {#miner-unreachable}

**The network could not reach this node.** *Needs your action.*

The Hippius gateway got no answer from the agent: it is stopped, or the host's NetBird connection is down. Check both, then watch the next launch.

```sh
sudo systemctl status hippius-miner-agent
netbird status
```

## libvirt could not start the VM

### `libvirt-driver/create:network-inactive` {#network-inactive}

**libvirt's default network is not running.** *Needs your action.*

Every VM's network card attaches to libvirt's default network, so no VM can start while it is down or missing. Start it and enable it at boot; play 03 also does this for you.

```sh
sudo virsh net-start default && sudo virsh net-autostart default
```

Play 09 reports this as [`LIBVIRT_DEFAULT_NET_INACTIVE`](https://github.com/thenervelab/hippius-cvm/blob/main/docs/operator/external-miner-guide.md#launch-preflight-codes-play-09). Run it to check your host (see [Check your host with play 09](#play-09)).

### `libvirt-driver/create:disk-open-permission` {#disk-open-permission}

**QEMU cannot reach the VM disk directory.** *Needs your action.*

QEMU's user (libvirt-qemu) cannot enter a directory on the path to a storage root. List the path's permissions, then give others execute permission on each parent directory that lacks it (or setfacl -m u:libvirt-qemu:x `<directory>`).

```sh
namei -l <data_disk_root>
sudo chmod o+x <directory>
```

Play 09 reports this as [`QEMU_CANNOT_TRAVERSE_DATA_ROOT`](https://github.com/thenervelab/hippius-cvm/blob/main/docs/operator/external-miner-guide.md#launch-preflight-codes-play-09). Run it to check your host (see [Check your host with play 09](#play-09)).

### `libvirt-driver/create:disk-open-invalid` {#disk-open-invalid}

**The VM disk filesystem does not support direct I/O.** *Needs your action.*

VM disks are opened with O_DIRECT, which this filesystem refuses. Put the storage roots on ext4, xfs or btrfs (not tmpfs, overlayfs, or a network or FUSE filesystem), then rerun the play.

```sh
findmnt -T <data_disk_root>
```

Play 09 reports this as [`DATA_ROOT_NO_ODIRECT`](https://github.com/thenervelab/hippius-cvm/blob/main/docs/operator/external-miner-guide.md#launch-preflight-codes-play-09). Run it to check your host (see [Check your host with play 09](#play-09)).

### `libvirt-driver/create:disk-missing` {#disk-missing}

**A VM disk file is missing.** *Needs your action.*

libvirt could not find a disk file of the VM. Check that the storage roots and pools are mounted where the agent expects them. Never delete or move files under them.

```sh
findmnt -T <data_disk_root>
sudo journalctl -u hippius-miner-agent --since "2 hours ago"
```

### `libvirt-driver/create:nwfilter-missing` {#nwfilter-missing}

**libvirt's clean-traffic network filter is missing.** *Needs your action.*

Every VM's network card references libvirt's clean-traffic filter. Reinstall the package that ships it, then restart libvirtd (running VMs keep running).

```sh
sudo apt install --reinstall libvirt-daemon-config-nwfilter && sudo systemctl restart libvirtd
```

Play 09 reports this as [`LIBVIRT_NWFILTER_MISSING`](https://github.com/thenervelab/hippius-cvm/blob/main/docs/operator/external-miner-guide.md#launch-preflight-codes-play-09). Run it to check your host (see [Check your host with play 09](#play-09)).

### `libvirt-driver/create:sev-busy` {#sev-busy}

**The SEV firmware is busy.** *Needs your action.*

The processor's SEV firmware answered busy (EBUSY). Reboot the host. If it comes back, make sure no CPU is taken offline at runtime: no nosmt, maxcpus= or nr_cpus= on the kernel command line, and nothing writing /sys/devices/system/cpu/smt/control. SMT may stay on; to turn it off, use the BIOS only.

```sh
cat /proc/cmdline
cat /sys/devices/system/cpu/offline
sudo dmesg | grep -i -E 'sev|snp'
```

### `libvirt-driver/create:sev-asid-exhausted` {#sev-asid-exhausted}

**No SEV slot (ASID) is free on the host.** *Needs your action.*

Every SEV address-space id is in use, or freed ones are never recycled. Reboot the host. The usual cause is CPUs taken offline at runtime (nosmt, maxcpus= or nr_cpus= on the kernel command line, or a write to /sys/devices/system/cpu/smt/control): remove that. SMT may stay on; to turn it off, use the BIOS only.

```sh
cat /proc/cmdline
cat /sys/devices/system/cpu/offline
sudo dmesg | grep -i -E 'sev|snp|asid'
```

### `libvirt-driver/create:sev-device-permission` {#sev-device-permission}

**QEMU cannot open the SEV device.** *Needs your action.*

QEMU has no access to /dev/sev. Rerun the play, which sets the device's permissions; check that nothing else (a udev rule, AppArmor) overrides them.

```sh
ls -l /dev/sev
ansible-playbook -i inventory.yml playbooks/06-miner-bootstrap.yml --limit <hostname>
```

### `libvirt-driver/create:sev-unavailable` {#sev-unavailable}

**SEV-SNP is not enabled on the host.** *Needs your action.*

The kernel reports no SEV-SNP support, which almost always means it is off in the BIOS. Enable SEV-SNP (with SMEE and the IOMMU) in the BIOS, then reboot.

```sh
sudo dmesg | grep -i -E 'sev|snp'
```

### `libvirt-driver/create:sev-init`, `libvirt-driver/create:sev-…` {#sev}

**The host could not start a confidential (SEV-SNP) VM.** *Needs your action.*

Setting up SEV-SNP for the VM failed. Check that SEV-SNP is enabled in the BIOS and the kernel, and that the host runs the kernel and firmware the play installed. libvirt's error is in the agent journal.

```sh
sudo dmesg | grep -i -E 'sev|snp'
sudo journalctl -u hippius-miner-agent --since "2 hours ago"
```

### `libvirt-driver/create:kvm-unavailable` {#kvm-unavailable}

**KVM is not available on the host.** *Needs your action.*

/dev/kvm is missing or unusable: virtualization (SVM) is off in the BIOS, or the kvm_amd module is not loaded. Enable it and reboot.

```sh
ls -l /dev/kvm
lsmod | grep kvm
```

### `libvirt-driver/create:permission-denied` {#permission-denied}

**QEMU was denied access to a VM file.** *Needs your action.*

QEMU's user was refused a file it needs: AppArmor, an ACL, a mount option (NFS root-squash) or file ownership. Look for the denial in the kernel log.

```sh
sudo journalctl -k | grep -i denied
getfacl <data_disk_root>
```

Play 09 reports this as [`QEMU_CANNOT_OPEN_DATA_ROOT`](https://github.com/thenervelab/hippius-cvm/blob/main/docs/operator/external-miner-guide.md#launch-preflight-codes-play-09). Run it to check your host (see [Check your host with play 09](#play-09)).

### `libvirt-driver/create:out-of-memory` {#out-of-memory}

**The host ran out of memory starting the VM.** *Needs your action.*

QEMU could not allocate the VM's memory. Something else on the host uses RAM the node reports as free: stop other workloads, or reserve less for VMs.

```sh
free -g
```

### `libvirt-driver/create:qemu-exited` {#qemu-exited}

**QEMU exited while starting the VM.** *Needs your action.*

QEMU quit during start-up. Its reason is in the VM's QEMU log and the agent journal.

```sh
sudo ls -t /var/log/libvirt/qemu/ | head
sudo journalctl -u hippius-miner-agent --since "2 hours ago"
```

Play 09 reports this as [`LAUNCH_SMOKE_FAILED`](https://github.com/thenervelab/hippius-cvm/blob/main/docs/operator/external-miner-guide.md#launch-preflight-codes-play-09). Run it to check your host (see [Check your host with play 09](#play-09)).

### `libvirt-driver/create`, `libvirt-driver/create:<other>` {#libvirt-create}

**libvirt could not start the VM.** *Needs your action.*

libvirt refused to start the VM for a reason the agent could not classify. libvirt's own error is in the agent journal.

```sh
sudo journalctl -u hippius-miner-agent --since "2 hours ago"
```

Play 09 reports this as [`LAUNCH_SMOKE_FAILED`](https://github.com/thenervelab/hippius-cvm/blob/main/docs/operator/external-miner-guide.md#launch-preflight-codes-play-09). Run it to check your host (see [Check your host with play 09](#play-09)).

### `libvirt-driver/define` {#libvirt-define}

**libvirt rejected the VM definition.** *Needs your action.*

libvirt refused the VM's definition before starting it, usually because the host runs a libvirt or QEMU the play does not install. Rerun the play, and read libvirt's error in the agent journal.

```sh
ansible-playbook -i inventory.yml playbooks/06-miner-bootstrap.yml --limit <hostname>
sudo journalctl -u hippius-miner-agent --since "2 hours ago"
```

### `libvirt-driver/virsh-spawn` {#virsh-spawn}

**virsh could not be run.** *Needs your action.*

The agent could not run virsh: libvirt's client is not installed. Rerun the play, which installs it.

```sh
which virsh
ansible-playbook -i inventory.yml playbooks/06-miner-bootstrap.yml --limit <hostname>
```

Play 09 reports this as [`LIBVIRT_NOT_INSTALLED`](https://github.com/thenervelab/hippius-cvm/blob/main/docs/operator/external-miner-guide.md#launch-preflight-codes-play-09). Run it to check your host (see [Check your host with play 09](#play-09)).

### `libvirt-driver/unreachable` {#libvirt-unreachable}

**libvirtd is not answering.** *Needs your action.*

The agent could not talk to libvirtd. Check that it runs, and restart it (running VMs keep running).

```sh
sudo systemctl status libvirtd
sudo systemctl restart libvirtd
```

### `libvirt-driver/destroy`, `…/domstate`, `…/dumpxml`, `…/undefine`, `…/state-parse`, `…/name-parse` {#libvirt-driver}

**A libvirt step failed.** *Needs your action.*

The agent's call to libvirt failed while managing the VM. Check that libvirtd runs, and read libvirt's error in the agent journal.

```sh
sudo systemctl status libvirtd
sudo journalctl -u hippius-miner-agent --since "2 hours ago"
```

## The VM did not come up

### `cvm-launch-failed/timeout` {#launch-timeout}

**The VM did not come up in time.** *Needs your action.*

The VM was started but did not report ready before the deadline. Check the host's load and the agent journal.

```sh
sudo journalctl -u hippius-miner-agent --since "2 hours ago"
```

Play 09 reports this as [`LAUNCH_SMOKE_FAILED`](https://github.com/thenervelab/hippius-cvm/blob/main/docs/operator/external-miner-guide.md#launch-preflight-codes-play-09). Run it to check your host (see [Check your host with play 09](#play-09)).

### `cvm-launch-failed/domain-error` {#domain-error}

**The VM crashed while booting.** *Needs your action.*

libvirt reported the domain in an error state during boot. The reason is in the VM's QEMU log and the agent journal.

```sh
sudo ls -t /var/log/libvirt/qemu/ | head
sudo journalctl -u hippius-miner-agent --since "2 hours ago"
```

Play 09 reports this as [`LAUNCH_SMOKE_FAILED`](https://github.com/thenervelab/hippius-cvm/blob/main/docs/operator/external-miner-guide.md#launch-preflight-codes-play-09). Run it to check your host (see [Check your host with play 09](#play-09)).

### `cvm-launch-failed/handle-lost`, `cvm-launch-failed/teardown` {#handle-lost}

**The agent lost track of the VM during launch.** *Usually temporary.*

The launch was interrupted (for example by an agent restart) or its clean-up failed. The network retries elsewhere. If it repeats, look for a leftover VM with virsh and read the agent journal.

```sh
sudo virsh list --all
sudo journalctl -u hippius-miner-agent --since "2 hours ago"
```

### `cvm-launch-failed/rng` {#rng}

**The agent could not read the host's random source.** *Needs your action.*

The host's random number source was not available to the agent. Check the agent journal and the kernel log.

```sh
sudo journalctl -u hippius-miner-agent --since "2 hours ago"
```

### `cvm-launch-failed/adopt-mkdir`, `…/adopt-rename`, `…/adopt-write` {#adopt-write}

**The agent could not save the VM's record.** *Needs your action.*

The agent could not write the VM's record under its state root. The agent's systemd sandbox cannot write a storage root its config names, or the root is not a writable mount. Set miner_data_disk_root and miner_state_disk_root in host_vars and rerun the play, which renders both the config and the unit (don't edit config.toml by hand). Check the root is mounted, writable and not full, and that no drop-in narrows the sandbox.

```sh
findmnt -T <storage_root>
df -h <storage_root>
ls /etc/systemd/system/hippius-miner-agent.service.d/
ansible-playbook -i inventory.yml playbooks/06-miner-bootstrap.yml --limit <hostname>
```

Play 09 reports this as [`AGENT_SANDBOX_CANNOT_WRITE`](https://github.com/thenervelab/hippius-cvm/blob/main/docs/operator/external-miner-guide.md#launch-preflight-codes-play-09). Run it to check your host (see [Check your host with play 09](#play-09)).

### `cvm-launch-failed/adopt-serialize` {#adopt-serialize}

**The agent could not encode the VM's record.** *Hippius side: nothing to do.*

An internal agent failure, not your host's. We're notified; there is nothing for you to do.

### `cvm-launch-failed/<other>` {#cvm-launch-failed}

**The VM failed to start.** *Needs your action.*

The agent could not bring the VM up. The reason is in the agent journal at the time shown; contact support with the code if it repeats.

```sh
sudo journalctl -u hippius-miner-agent --since "2 hours ago"
```

### `ticket-delivery/connect-timeout` {#ticket-timeout}

**The VM booted but never took its boot ticket.** *Usually temporary.*

The guest booted but never opened the listener the agent hands its boot ticket to. The network retries elsewhere. If every launch fails this way, check that SEV-SNP works and run play 09, which starts a test VM.

```sh
sudo dmesg | grep -i -E 'sev|snp'
sudo journalctl -u hippius-miner-agent --since "2 hours ago"
```

Play 09 reports this as [`LAUNCH_SMOKE_FAILED`](https://github.com/thenervelab/hippius-cvm/blob/main/docs/operator/external-miner-guide.md#launch-preflight-codes-play-09). Run it to check your host (see [Check your host with play 09](#play-09)).

### `ticket-delivery/write-failed`, `…/cid-not-owned`, `…/no-cid`, `…/empty`, `…/oversize`, `ticket-delivery-failed` {#ticket-delivery}

**The agent could not hand the VM its boot ticket.** *Usually temporary.*

Delivering the boot ticket to the new VM failed, usually not because of your host. The network retries elsewhere; contact support with the code if it repeats.

```sh
sudo journalctl -u hippius-miner-agent --since "2 hours ago"
```

## Before the VM starts

### `tenant-preflight/ovmf-missing` {#ovmf-missing}

**The VM firmware (OVMF) is missing or wrong.** *Needs your action.*

The tenant firmware is missing or does not have the expected digest. Rerun the play: play 02 installs it and checks it.

```sh
ansible-playbook -i inventory.yml playbooks/06-miner-bootstrap.yml --limit <hostname>
```

### `tenant-preflight/staging-mkdir`, `…/stage-mkdir`, `…/stage-create`, `…/stage-write`, `…/stage-sync`, `…/stage-rename` {#stage-write}

**The agent could not stage the VM's boot files.** *Needs your action.*

The agent could not write the VM's boot artifacts to its staging directory. The agent's systemd sandbox cannot write a storage root its config names, or the root is not a writable mount. Set miner_data_disk_root and miner_state_disk_root in host_vars and rerun the play, which renders both the config and the unit (don't edit config.toml by hand). Check the root is mounted, writable and not full, and that no drop-in narrows the sandbox.

```sh
findmnt -T <storage_root>
df -h <storage_root>
ls /etc/systemd/system/hippius-miner-agent.service.d/
ansible-playbook -i inventory.yml playbooks/06-miner-bootstrap.yml --limit <hostname>
```

Play 09 reports this as [`AGENT_SANDBOX_CANNOT_WRITE`](https://github.com/thenervelab/hippius-cvm/blob/main/docs/operator/external-miner-guide.md#launch-preflight-codes-play-09). Run it to check your host (see [Check your host with play 09](#play-09)).

### `tenant-preflight/fetch-client`, `…/fetch-network`, `…/fetch-http-status`, `…/fetch-body`, `…/sha256-mismatch` {#fetch}

**The agent could not download the VM's boot files.** *Usually temporary.*

Downloading a boot artifact failed or came back corrupted. The network retries. If it repeats, check that the host reaches the internet over HTTPS and that no proxy rewrites downloads.

```sh
curl -sSI https://github.com | head -1
sudo journalctl -u hippius-miner-agent --since "2 hours ago"
```

### `tenant-preflight/base-in-use` {#base-in-use}

**The VM's base image was busy.** *Usually temporary.*

Another operation was using the VM's base image. The network retries; nothing to do unless it repeats.

```sh
sudo journalctl -u hippius-miner-agent --since "2 hours ago"
```

### `tenant-preflight/cpu-count-zero`, `…/bad-sha256-hex`, `…/json-encode`, `…/golden-missing-rootfs-hash`, `tenant-preflight/<other>` {#tenant-preflight}

**The check before the VM starts refused the order.** *Hippius side: nothing to do.*

This is about the order Hippius sent, not about your host. We're notified; there is nothing for you to do.

### `cvm-launch-digest/vcpu-generation` {#vcpu-generation}

**The host's CPU generation is not supported or not recognised.** *Needs your action.*

The agent could not identify the host processor as an AMD EPYC Milan, Genoa or Turin from its CPUID, so it cannot measure the VM. Compute nodes must run on one of those, on bare metal (not inside another VM). If the host is one of them, contact support with the code.

```sh
lscpu | grep 'Model name'
```

### `cvm-launch-digest/recipe-artifact-read` {#recipe-artifact-read}

**The agent could not read the VM's boot files.** *Needs your action.*

A staged boot artifact could not be read back. Rerun the play, and check the storage root is healthy.

```sh
ansible-playbook -i inventory.yml playbooks/06-miner-bootstrap.yml --limit <hostname>
sudo journalctl -u hippius-miner-agent --since "2 hours ago"
```

### `cvm-launch-digest/feature-disabled`, `…/sev-compute`, `…/digest-shape`, `…/recipe-artifact-mismatch`, `…/recipe-vcpu-type` {#cvm-launch-digest}

**The VM's launch measurement could not be computed.** *Hippius side: nothing to do.*

This is about the order Hippius sent, not about your host. We're notified; there is nothing for you to do.

### `cvm-launch-input/<check>`, `launch-input` {#cvm-launch-input}

**The agent rejected the launch order.** *Hippius side: nothing to do.*

Not your fault: the order failed one of the agent's checks (named after the slash). This is about the order Hippius sent, not about your host. We're notified; there is nothing for you to do.

## Capacity

### `cvm-insufficient-resources`, `insufficient-resources` {#insufficient-resources}

**The host had no room for the VM.** *Usually temporary.*

The host lacked free CPU or memory for the VM when it arrived. The network places it elsewhere. If it happens while the dashboard shows free capacity, check for other workloads on the host.

```sh
free -g
```

### `cvm-insufficient-disk[:<pool>]`, `insufficient-disk[:<pool>]` {#insufficient-disk}

**The disk budget is used up.** *Usually temporary.*

The node's disk budget (or the named pool's) has no room for the VM's disks. This is a capacity event, not a fault: the network places the VM elsewhere. Add space or raise the budget in Storage configuration if you expected room.

```sh
df -h <data_disk_root>
```

### `cvm-pool-unavailable:<pool>`, `pool-unavailable:<pool>` {#pool-unavailable}

**A storage pool is unavailable.** *Needs your action.*

The named pool is draining, closed to OS disks, or not on its filesystem. Check it in the node's Storage configuration panel and remount it if it is off its filesystem.

```sh
findmnt /var/lib/hippius-miner/pools/<pool>
```

### `cvm-vsock-cid/…`, `vsock-cid-exhausted` {#vsock-cid}

**No VM channel id was free.** *Usually temporary.*

The agent had no free vsock id for the VM. The network retries; contact support if it repeats.

```sh
sudo journalctl -u hippius-miner-agent --since "2 hours ago"
```

### `cvm-busy` {#cvm-busy}

**The VM was busy with another operation.** *Usually temporary.*

Another operation on the same VM was in progress. It is retried; nothing to do.

## The VM's disks

### `state-disk/mkdir`, `…/create`, `…/truncate`, (same for data-disk/ and overlay-disk/) {#agent-sandbox}

**The agent cannot create the VM's disk files.** *Needs your action.*

The agent could not create a disk file under a storage root (state-disk: state_disk_root; data-disk and overlay-disk: data_disk_root). The agent's systemd sandbox cannot write a storage root its config names, or the root is not a writable mount. Set miner_data_disk_root and miner_state_disk_root in host_vars and rerun the play, which renders both the config and the unit (don't edit config.toml by hand). Check the root is mounted, writable and not full, and that no drop-in narrows the sandbox.

```sh
findmnt -T <storage_root>
df -h <storage_root>
ls /etc/systemd/system/hippius-miner-agent.service.d/
ansible-playbook -i inventory.yml playbooks/06-miner-bootstrap.yml --limit <hostname>
```

Play 09 reports this as [`AGENT_SANDBOX_CANNOT_WRITE`](https://github.com/thenervelab/hippius-cvm/blob/main/docs/operator/external-miner-guide.md#launch-preflight-codes-play-09). Run it to check your host (see [Check your host with play 09](#play-09)).

### `…-disk/insufficient-space` {#disk-space}

**Not enough disk space for the VM's disks.** *Needs your action.*

The filesystem under the storage root has no room for the VM's disks. Free space there, or move the root to a larger filesystem and rerun the play.

```sh
df -h <storage_root>
```

### `…-disk/io`, `…-disk/statvfs` {#disk-io}

**The storage filesystem could not be read.** *Needs your action.*

An I/O error hit a VM disk, or the filesystem under the storage root could not be measured. Check that the root is mounted and healthy, and look for disk errors in the kernel log.

```sh
findmnt -T <storage_root>
df -h <storage_root>
sudo dmesg | grep -i -E 'i/o error|blk_update'
```

### `state-disk/mkfs-spawn` {#mkfs-missing}

**mkfs.ext4 is missing on the host.** *Needs your action.*

The agent formats each VM's small state disk with mkfs.ext4, which is not installed. Install e2fsprogs, or rerun the play.

```sh
sudo apt-get install -y e2fsprogs
```

### `…-disk/race`, `…/size-zero`, `…/size-overflow`, `…/no-parent`, `…/mkfs-failed`, `…-disk/<other>` {#disk-other}

**The agent could not prepare the VM's disks.** *Hippius side: nothing to do.*

Preparing the VM's disks failed for a reason that is not your host's (a concurrent launch, an invalid size in the order). We're notified; contact support with the code if it repeats.

```sh
sudo journalctl -u hippius-miner-agent --since "2 hours ago"
```

### `relaunch-disks-missing/…[:<pool>]`, `relaunch-disks-missing` {#relaunch-disks-missing}

**A restarted VM's disks are not on this host.** *Needs your action.*

The VM was relaunched here but one of its disks (named after the slash, with its pool) is missing, so the agent refused rather than create a blank one. Check that every storage root and pool is mounted. Never recreate or delete VM disk files; contact support.

```sh
findmnt -T <data_disk_root>
findmnt -T <state_disk_root>
```

### `relaunch-disks-unreadable/…`, `relaunch-disks-unreadable` {#relaunch-disks-unreadable}

**A restarted VM's disks could not be checked.** *Needs your action.*

The agent could not tell whether the VM's disks are present (an I/O or permission error, or a storage mount not up). Check the mounts and the kernel log.

```sh
findmnt -T <data_disk_root>
sudo dmesg | tail -50
```

### `vm-pool-record-unwritable` {#vm-pool-record-unwritable}

**The agent cannot save which pool holds the VM's disks.** *Needs your action.*

The agent could not write the VM's pool record under its state root. The agent's systemd sandbox cannot write a storage root its config names, or the root is not a writable mount. Set miner_data_disk_root and miner_state_disk_root in host_vars and rerun the play, which renders both the config and the unit (don't edit config.toml by hand). Check the root is mounted, writable and not full, and that no drop-in narrows the sandbox.

```sh
findmnt -T <storage_root>
df -h <storage_root>
ls /etc/systemd/system/hippius-miner-agent.service.d/
ansible-playbook -i inventory.yml playbooks/06-miner-bootstrap.yml --limit <hostname>
```

Play 09 reports this as [`AGENT_SANDBOX_CANNOT_WRITE`](https://github.com/thenervelab/hippius-cvm/blob/main/docs/operator/external-miner-guide.md#launch-preflight-codes-play-09). Run it to check your host (see [Check your host with play 09](#play-09)).

### `vm-pool-record-missing`, `vm-pool-record-unreadable`, `vm-pool-record` {#vm-pool-record}

**The VM's pool record is missing or unreadable.** *Hippius side: nothing to do.*

The agent refused rather than create a blank disk. Contact support with the code; never delete files under vm-pool/.

## The agent

### `dispatch-failed` {#dispatch-failed}

**The agent could not start the VM.** *Needs your action.*

Your agent predates the detailed error codes, so this is all it reports. Update it to v2026.10.21 to see the exact step, run play 09 to check the host, and read the agent journal.

```sh
ansible-playbook -i inventory.yml playbooks/06-miner-bootstrap.yml --limit <hostname> -e miner_agent_version=v2026.10.21
ansible-playbook -i inventory.yml playbooks/06-miner-bootstrap.yml --limit <hostname> --tags launch_preflight
sudo journalctl -u hippius-miner-agent --since "2 hours ago"
```

### `power-policy-store/read`, `…/mkdir`, `…/write`, `…/sync`, `…/rename`, `…/remove` {#agent-state}

**The agent could not save the VM's power policy.** *Needs your action.*

The agent could not read or write the VM's power policy file under its state root. The agent's systemd sandbox cannot write a storage root its config names, or the root is not a writable mount. Set miner_data_disk_root and miner_state_disk_root in host_vars and rerun the play, which renders both the config and the unit (don't edit config.toml by hand). Check the root is mounted, writable and not full, and that no drop-in narrows the sandbox.

```sh
findmnt -T <storage_root>
df -h <storage_root>
ls /etc/systemd/system/hippius-miner-agent.service.d/
ansible-playbook -i inventory.yml playbooks/06-miner-bootstrap.yml --limit <hostname>
```

Play 09 reports this as [`AGENT_SANDBOX_CANNOT_WRITE`](https://github.com/thenervelab/hippius-cvm/blob/main/docs/operator/external-miner-guide.md#launch-preflight-codes-play-09). Run it to check your host (see [Check your host with play 09](#play-09)).

### `power-policy-store/parse`, `power-policy-store/encode` {#power-policy-record}

**The VM's power policy record is unreadable.** *Hippius side: nothing to do.*

The agent could not decode or encode the VM's power policy record. We're notified; contact support with the code, and don't edit or delete the file.

### `power-policy-store`, `power-policy-store/<other>` {#power-policy-store}

**The agent could not store the VM's power policy.** *Needs your action.*

The agent journal names the failing step. If it is a file read or write, the agent's state root is not writable or full (see the sandbox entry); otherwise contact support with the code.

```sh
sudo journalctl -u hippius-miner-agent --since "2 hours ago"
```

### `lock-poisoned`, `dispatch-panic`, `idempotency-store`, `power-policy-store/lock` {#agent-internal}

**The agent hit an internal error.** *Needs your action.*

The agent failed internally; we're notified. Restart it to clear the state, and keep it up to date.

```sh
sudo systemctl restart hippius-miner-agent
sudo journalctl -u hippius-miner-agent --since "2 hours ago"
```

### `snp-probe/…` {#snp-probe}

**The agent's SEV-SNP check failed.** *Needs your action.*

The agent could not confirm SEV-SNP works on the host. Check that it is enabled in the BIOS and the kernel.

```sh
sudo dmesg | grep -i -E 'sev|snp'
```

### `net-policy-not-loaded` {#net-policy-not-loaded}

**The VM network rules are not loaded on the host.** *Needs your action.*

The agent has a saved network policy for its VMs, but its nftables rules are not loaded, so it refuses new VMs. Restart the agent, which loads them again, and check that nftables accepts the ruleset.

```sh
sudo systemctl restart hippius-miner-agent
sudo nft list ruleset | head
sudo journalctl -u hippius-miner-agent --since "2 hours ago"
```

### `not-yet-wired` {#not-yet-wired}

**The order needs a feature the agent doesn't have yet.** *Hippius side: nothing to do.*

This is about the order Hippius sent, not about your host. We're notified; there is nothing for you to do. Keep the agent up to date.

### `migration-failed` {#migration-failed}

**A VM migration step failed.** *Hippius side: nothing to do.*

Hippius handles failed migrations; we're notified. There is nothing for you to do.

### `order-stale` {#order-stale}

**The order expired before it arrived.** *Usually temporary.*

The order was too old when the agent got it. It is retried. If it repeats, check that the host's clock is synchronised.

```sh
timedatectl
```

### `bad-signature`, `malformed-sig`, `signed-order-decode`, `order-body-decode`, `order-domain`, `order-kind-mismatch`, `order-id-invalid`, `order-wrong-miner` {#order-refused}

**The agent refused the order.** *Hippius side: nothing to do.*

This is about the order Hippius sent, not about your host. We're notified; there is nothing for you to do.

### `unclassified` {#unclassified}

**The node refused the launch without a reason.** *Needs your action.*

The agent answered with an error but no code. The reason is in the agent journal at the time shown.

```sh
sudo journalctl -u hippius-miner-agent --since "2 hours ago"
```

### `invalid` {#invalid}

**The node sent an unreadable error code.** *Needs your action.*

The agent's error code was not in the expected format: an outdated or modified agent. Update it to v2026.10.21.

```sh
ansible-playbook -i inventory.yml playbooks/06-miner-bootstrap.yml --limit <hostname> -e miner_agent_version=v2026.10.21
sudo journalctl -u hippius-miner-agent --since "2 hours ago"
```

## Other codes

### `any other code` {#other-codes}

**A launch failed on this node.** *Needs your action.*

This code is not described here yet. Read the agent journal at the time shown; if launches keep failing, contact support with the code.

```sh
sudo journalctl -u hippius-miner-agent --since "2 hours ago"
```

To reach support, see [Support](/use/console/support).
