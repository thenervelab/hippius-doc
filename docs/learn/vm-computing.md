---
sidebar_position: 5
description: How Hippius virtual machines work. Confidential VMs on miner-operated AMD EPYC servers, placement, access, the private network, disk encryption, lifecycle and billing.
---

import Unordered from '@site/src/components/Unordered';

# VM Computing

Hippius virtual machines are Linux VMs that run on servers operated by compute miners, not in a Hippius data centre. Every one of them is a confidential VM: its memory and disk are encrypted, so the miner hosting it can't read it. This page explains how a VM is run. To create one, follow [Virtual machines](/use/virtual-machines). For the security model in depth, see [Confidential Computing](confidential-computing).

---

## Key characteristics

| Feature | Description |
|---|---|
| **Confidential by default** | Every VM is an AMD SEV-SNP confidential VM on an AMD EPYC server. There is no non-confidential option. |
| **Encrypted disks** | Each VM's disk is encrypted inside the VM, with a key released only to that VM after attestation. |
| **Private network** | Your VMs and managed services share a private network, encrypted with WireGuard. |
| **Per-second billing** | Paid from your account balance and charged hour by hour on the Hippius chain. |
| **Managed services on top** | Managed PostgreSQL, managed Kubernetes and GitHub Actions runners all run on the same confidential VMs. |

---

## How a VM runs

<Unordered>
  <li><strong>Miners provide the servers.</strong> A compute miner runs AMD EPYC servers with SEV-SNP enabled and hosts VMs on them. The miner has root on the machine, but only ever handles encrypted memory and encrypted disk.</li>
  <li><strong>Hippius places the VM.</strong> Hippius's control plane picks a verified server with room for it, in the country you chose or in any region. See <a href="/use/compute#regions">Regions</a>.</li>
  <li><strong>The VM boots a Hippius-built image.</strong> You choose a Linux distribution or a ready-made application. The processor measures what boots, and Hippius's key broker (KBS) checks that measurement before it releases the VM's keys.</li>
  <li><strong>The VM sets itself up at first boot.</strong> Your SSH public keys and its private network enrolment are delivered by the KBS straight into the VM's encrypted memory.</li>
</Unordered>

---

## Access and networking

<Unordered>
  <li><strong>SSH keys.</strong> Login is by SSH key only. You give Hippius the public half.</li>
  <li><strong>Browser terminal.</strong> The VM page's <strong>Console</strong> tab opens a shell without any public address. The SSH handshake runs in your browser.</li>
  <li><strong>Private network.</strong> Every VM joins your account's private network, built on NetBird with WireGuard encryption, at first boot. Your VMs, databases and Kubernetes nodes reach each other there.</li>
  <li><strong>Public IPv4.</strong> An optional, dedicated address for one VM, on a Hippius edge serving its region, protected by your firewall rules.</li>
  <li><strong>Published ports.</strong> An HTTPS address on a Hippius domain for one web service, without a public address.</li>
</Unordered>

See [Public IPv4 and firewall](/use/compute/networking) for the details, and what the edge can see.

---

## Disk encryption

Every VM's disk is encrypted, with nothing to configure.

<Unordered>
  <li>The VM encrypts its writable disk itself, with LUKS2, at first boot. The miner only ever stores encrypted bytes.</li>
  <li>Each VM has its own disk key. At every boot, the VM proves what it is to the KBS with a report signed by the processor, and the KBS releases the key encrypted to that VM alone.</li>
  <li>Deleting a VM destroys its key, so once the VM has stopped, its disk and backups can no longer be decrypted.</li>
</Unordered>

For how keys are released and what Hippius itself can do, see [Disk encryption and key delivery](confidential-computing#disk-encryption-and-key-delivery).

---

## Lifecycle

<Unordered>
  <li><strong>Create</strong> from the console, with a size, an image, a region and your SSH key.</li>
  <li><strong>Stop, start and reboot.</strong> A stopped VM keeps its server capacity and is still billed.</li>
  <li><strong><a href="/use/compute/resize">Resize</a></strong> its vCPUs and memory.</li>
  <li><strong><a href="/use/compute/vm-backups">Back it up</a></strong> on a schedule, and restore it.</li>
  <li><strong>Delete</strong> it to stop paying. Its disk is crypto-erased.</li>
</Unordered>

---

## Billing

VMs are metered per second, from the first time they run until you ask to delete them, and paid from your account balance. Each hour is charged on the Hippius chain shortly after it ends, with a hash of its usage you can check yourself. See [Hippius Compute](/use/compute) for prices and [Billing and quotas](/use/compute/billing) for the details.

---

## Getting started

<Unordered>
  <li><a href="/use/virtual-machines">Create your first virtual machine</a> and connect to it over SSH.</li>
  <li><a href="/use/compute/networking">Give it a public IPv4</a> or publish a web service.</li>
  <li><a href="confidential-computing">Read how confidential computing protects it</a>, and its limits.</li>
</Unordered>
