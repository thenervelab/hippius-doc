---
id: overview
title: Hippius Compute
sidebar_label: Overview
slug: /use/compute
description: What Hippius Compute is, what it costs, and how quotas, the 24-hour balance requirement and per-second billing work for virtual machines, managed PostgreSQL, managed Kubernetes and GitHub Actions runners.
---

import Unordered from '@site/src/components/Unordered';

Hippius Compute runs your workloads on confidential virtual machines: their memory is encrypted by the processor, so the server they run on cannot read it. This page explains what you can run and how it is paid for. Read it before you launch your first machine.

:::info Open to every account
Virtual machines, managed databases, Kubernetes and GitHub Actions runners are open to every Hippius account. Billing is hourly, from your balance, and [quotas](/use/compute/billing#quotas) apply.
:::

## What you can run

Everything lives in the console under **Confidential Computing** in the sidebar.

| Product | What it is | Guide |
|---|---|---|
| **Virtual Machines** | Linux VMs you reach over SSH, from a list of distributions or ready-made applications. | [Virtual machines](/use/virtual-machines) |
| **Databases** | Managed PostgreSQL 16, 17 or 18, on one or three instances, backed up to your own S3. | [Managed PostgreSQL](/use/compute/databases) |
| **Kubernetes** | Managed Kubernetes (RKE2) with three confidential control-plane nodes and worker pools. | [Managed Kubernetes](/use/compute/kubernetes) |
| **Runners** | Single-use VMs for your GitHub Actions jobs. | [GitHub Actions runners](/use/compute/runners) |
| **Compute Usage** | What your compute costs, hour by hour, and the current price list. | [Billing and quotas](/use/compute/billing) |

## What makes a VM confidential

Every VM runs inside an AMD SEV-SNP enclave. The processor encrypts the VM's memory with a key the host operating system never sees.

Before the VM's disk is unlocked, the VM proves what it is to a key service with a signed hardware report (attestation). The disk key is released only to a VM that passes that check, so the host can't read your disk either. Each VM's page has a **Confidential Computing** panel that shows the attestation result and, when it was recorded, the raw AMD SEV-SNP report.

When you delete a VM, its encrypted disk is crypto-erased: the key is destroyed, and the data can't be recovered.

Some secrets are generated for you and handed over once, so that only you hold them:

<Unordered>
  <li><strong>SSH keys.</strong> You only give us the public half. The browser terminal runs the SSH handshake in your browser, so your private key never reaches us.</li>
  <li><strong>Database credentials.</strong> The password, TLS certificates and backup key are shown once, at creation. We can't show them again or reset them.</li>
  <li><strong>The Kubernetes cluster key.</strong> It is generated in your browser, and we only ever see its public half. It is the only way to open your kubeconfig and your backups.</li>
</Unordered>

:::warning "Not recorded" is not "not confidential"
The attestation panel can say **Attestation evidence not recorded**. That only means no record is left to show. It doesn't mean the VM failed attestation: a VM that can't prove it runs on confidential hardware is refused at launch.
:::

## Regions

You can pin a VM to a country, or leave it on **Automatic (any region)** and let the network place it on any verified server. The region list in the create form shows only countries where a verified server has room right now, so it changes over time.

Each region is a two-letter country code (ISO 3166-1), such as `FR`. A Kubernetes cluster has to be pinned to one country, because its three control-plane nodes must be close to each other.

## Before you launch: quotas and your balance

Two checks run every time you launch something. You see both in the create form before you click.

**Quotas** cap how much your account can run at once: VMs, databases, clusters, vCPUs, memory, disk, public IPv4 addresses and runners. If a launch would go over a limit, it is refused. See [Quotas](/use/compute/billing#quotas) for the limits and how to raise them.

**The 24-hour balance requirement.** Your balance must cover 24 hours of everything you already run, plus what you are launching. This check applies to new VMs, databases, clusters and worker nodes, to public IPv4 addresses, to resizes that make a VM bigger, and to runner jobs. It stops a new account from running up usage it can't pay for. See [The 24-hour balance requirement](/use/compute/billing#the-24-hour-balance-requirement).

## How billing works

<Unordered>
  <li><strong>Per second.</strong> Usage is metered per second at the price in force, with a minimum of one minute for each VM.</li>
  <li><strong>From your balance.</strong> Compute is paid from your account balance in dollars. You top up on <a href="/use/console/billing">Billing</a>, and there is no monthly plan to buy.</li>
  <li><strong>From running to deletion.</strong> A VM is billed from the first time it runs until you ask to delete it. <strong>A stopped VM is still billed at its full price</strong>, because its server capacity stays reserved for it. Delete a VM to stop paying for it.</li>
  <li><strong>Charged hour by hour.</strong> Each hour of usage is charged from your balance on the Hippius chain, shortly after the hour ends.</li>
</Unordered>

| What | Price |
|---|---|
| VM | $18 per vCPU, $2.50 per GB of memory and $0.10 per GB of disk, per month. A Small VM (1 vCPU, 4 GB, 40 GB) is $32 a month, $0.0438 an hour. |
| Public IPv4 | $0.005 an hour, about $3.65 a month, while attached. |
| VM backups | $6 per TB-month stored. |
| Public bandwidth | Free for now. |
| Managed database | Its VMs plus 25%. |
| Managed Kubernetes | Its VMs plus $15 per cluster per month. |

Monthly figures are estimates over 730 hours. Prices can change: the **Prices** section of <a href="https://console.hippius.com/dashboard/billing/compute#prices">Compute Usage</a> is always current, and every create form shows the hourly and monthly price before you launch.

The details, including examples and what happens if your balance runs out, are in [Billing and quotas](/use/compute/billing).

**Working as a team.** You can invite people to run compute in your account, each with their own access per product. What they run is billed to your account. See [Shared accounts](/use/console/team).

## Where to next

<Unordered>
  <li><a href="/use/virtual-machines">Create your first virtual machine</a> and connect to it over SSH.</li>
  <li><a href="/use/compute/databases">Launch a managed PostgreSQL database</a>.</li>
  <li><a href="/use/compute/kubernetes">Create a Kubernetes cluster</a>.</li>
  <li><a href="/use/compute/troubleshooting">Troubleshooting</a>: what each refusal means and what to do.</li>
</Unordered>
