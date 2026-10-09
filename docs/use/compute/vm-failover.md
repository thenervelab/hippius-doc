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
  <li><strong>Automatic</strong>, opt-in, per VM. In the VM's <strong>Backups</strong> panel, turn on <strong>Automatically restart on another server if this server goes down</strong>. Once the server has been proven dead for 15 minutes, the VM is restarted on another server from its latest backup.</li>
</Unordered>

Automatic failover needs at least one complete backup, and it may not be offered in every region. When it isn't available for a VM, the console shows why. If no server in the region has room for the VM, the failover waits and retries.

Whichever the mode, you get an email whenever your VM is failed over, saying when, why, and which backup was used.

## What failover costs

A failover doesn't change what you pay for the VM. It is billed once, continuously: the old server stops at the cutover, and the new one takes over. Backup storage is billed as usual; see [What backups cost](/use/compute/vm-backups#what-backups-cost).

## High availability

High availability is your responsibility. A single VM runs on one server, and a failover means minutes of downtime plus data lost back to the last backup. To keep a service up when a server dies, run it on several VMs, with your own load balancing and data replication between them, as on any cloud provider.

### Placement groups

A placement group keeps your VMs on different servers. Two VMs of the same account in the same placement group are never placed on the same server.

<Unordered>
  <li>Set it with the optional <code>placement_group</code> field when you create a VM: 1 to 64 lowercase letters, digits and hyphens, for example <code>web</code>.</li>
  <li>It is fixed at creation. You can't add a VM to a group, or move it to another, later.</li>
  <li>If no server can take the VM without sharing one with another VM of the group, the launch fails with <code>placement-anti-affinity-unsatisfiable</code>.</li>
</Unordered>

:::note A different server is not a different datacenter
A placement group only guarantees different servers. Two servers can be in the same datacenter, and a datacenter outage can take both down.
:::
