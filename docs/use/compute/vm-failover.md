---
id: vm-failover
title: VM Failover and High Availability
sidebar_label: Failover and high availability
slug: /use/compute/vm-failover
description: What happens to a Hippius VM when its server goes down. Failover from the latest backup, manual or automatic, what is kept and lost, and how to build high availability with several VMs and placement groups.
---

import Unordered from '@site/src/components/Unordered';

A VM's disk lives on the server that runs it, encrypted inside the confidential VM. If that server dies, the VM can be restarted on another server in the same region from its latest [backup](/use/compute/vm-backups). This is called a **failover**. It brings the VM back, but it is not high availability: the VM is down for several minutes and loses what it wrote since that backup.

## How failover works

<Unordered>
  <li><strong>The VM is restored from its newest backup</strong> of the current boot, on another server in the same region.</li>
  <li><strong>Data written after that backup is lost.</strong> The most you can lose (the recovery point objective, or RPO) is the backup interval you chose: 24 hours, 6 hours, 1 hour or 15 minutes. If backups were failing or out of date, the newest backup is older and you lose more.</li>
  <li><strong>No backups, no failover.</strong> A VM without a restorable backup can't be failed over. Turn on <a href="/use/compute/vm-backups#turn-on-backups">scheduled backups</a> on any VM you want to be able to recover.</li>
  <li><strong>It takes a few minutes.</strong> A failover typically takes about 5 to 10 minutes for a 40 GiB disk.</li>
</Unordered>

:::warning After a reboot, wait for the first backup
A [reboot starts a new backup chain](/use/compute/vm-backups#how-vm-backups-work). Until its first full backup completes, the VM has no backup of its current boot, so it can't be failed over.
:::

### What is kept

<Unordered>
  <li>The same VM, with the same ID.</li>
  <li>The same size and the same region.</li>
  <li>Its public IPv4 address, if it has one.</li>
  <li>Its address on your private network (NetBird).</li>
</Unordered>

The VM's encryption keys are released to the new server only after it passes attestation, as at every boot. The old instance is permanently fenced: even if its server comes back, it can never run alongside the new one.

## Manual and automatic failover

There are two modes:

<Unordered>
  <li><strong>Manual</strong>, the default. When the server running your VM is confirmed dead, Hippius support can fail your VM over, for example after you <a href="/use/console/support">open a ticket</a>.</li>
  <li><strong>Automatic</strong>, opt-in, per VM. Once the server has been proven dead for 15 minutes, the VM is restarted on another server in the same region from its latest backup.</li>
</Unordered>

### Turn on automatic failover

On the VM's page, in the **Backups** panel, the **Failover** section sits between **Scheduled backups** and **Restore points**. Turn on **Automatically restart on another server if this server goes down**. The section is hidden when failover isn't offered for the VM.

Automatic failover needs at least one complete backup, and it may not be offered in every region. When it can't be turned on, the toggle is disabled and the console says why:

| Message | What to do |
|---|---|
| Turn on backups to use automatic failover. | [Turn on scheduled backups](/use/compute/vm-backups#turn-on-backups). |
| Available once the first backup is complete. | Wait for the first full backup to finish. |
| Not offered in this VM's region yet. | Automatic failover isn't available in this region. Support can still fail the VM over manually. |
| Not available yet. | Automatic failover isn't available yet. |

If the toggle is already on and one of these becomes true, for example after a reboot or when you turn off backups, it stays on but shows a warning such as **On, but not effective until the next backup completes.** The VM can't be failed over automatically until the cause is gone.

### During and after a failover

While a failover runs, a banner at the top of the VM's page says **Restarting on another server**, from which backup, and whether it was started automatically or by Hippius support. If no server in the region has room for the VM, the banner says **Waiting for a server with capacity**: the failover waits and retries until one does. The VM's status shows each step, for example **Restarting on another server · Preparing**. You can't restore the VM from a backup or resize it until the failover is done.

Once it is done, the banner says **Restarted on another server**, with the backup used, for 7 days. The **Failover history** table in the **Backups** panel lists every failover of the VM: when it started, its type (**Automatic** or **By support**), its status, the backup used and how long it took.

Whichever the mode, you get an email whenever your VM is failed over, saying when, why, and which backup was used.

## What failover costs

A failover doesn't change what you pay for the VM. It is billed once, continuously: the old server stops at the cutover, and the new one takes over. Backup storage is billed as usual; see [What backups cost](/use/compute/vm-backups#what-backups-cost).

## High availability

High availability is your responsibility. A single VM runs on one server, and a failover means minutes of downtime plus data lost back to the last backup. To keep a service up when a server dies, run it on several VMs, with your own load balancing and data replication between them, as on any cloud provider.

### Placement groups

A placement group keeps your VMs on different servers. Two VMs of the same account in the same placement group are never placed on the same server.

<Unordered>
  <li>Set it when you create a VM: in the <strong>Finalize details</strong> step, open <strong>Advanced options</strong> and fill in <strong>Placement group (optional)</strong>. Through the API, it is the optional <code>placement_group</code> field. A name is 1 to 64 lowercase letters, digits and hyphens, for example <code>web-tier</code>.</li>
  <li>It is fixed at creation. You can't add a VM to a group, or move it to another, later.</li>
  <li>The form suggests the groups you already use, with how many VMs each has. When placement groups aren't available, the form has no <strong>Advanced options</strong>, and a launch that sets one is refused with <strong>Placement groups can't be used right now</strong>: launch without a placement group, or try again later.</li>
  <li>If no server can take the VM apart from the other VMs of its group, the launch fails with <code>placement-anti-affinity-unsatisfiable</code>. Launch it in another group, or without one.</li>
</Unordered>

:::note A different server is not a different datacenter
A placement group only guarantees different servers. Two servers can be in the same datacenter, and a datacenter outage can take both down.
:::
