---
id: dedicated-disks
title: Dedicated disks
sidebar_label: Dedicated disks
slug: /use/compute/dedicated-disks
description: Attach whole physical disks to a Hippius VM, build your own redundancy, and know what a pinned VM gives up.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';

A dedicated disk is a whole physical disk of a Hippius server, passed through to your VM. You get the full disk, encrypted, and you build what you need on it: a single volume, mdadm, ZFS or btrfs. Use dedicated disks for bulk storage at a fraction of the OS disk price, when you can manage redundancy and backups yourself.

## Prices

| Tier | Price |
|---|---|
| **HDD** | $2.50 per TiB-month |
| **SSD** | $5 per TiB-month |
| **NVMe** | $8 per TiB-month |

A disk is billed per GiB-hour of its size class (see below). For example, an HDD in the 3,700 GiB size class costs about $9.03 a month. Monthly prices are estimates over 730 hours. The **Prices** section of <a href="https://console.hippius.com/dashboard/billing/compute#prices">Compute Usage</a> is always current.

## What you choose

<Unordered>
  <li><strong>Tier:</strong> HDD, SSD or NVMe. You get exactly this tier, never a faster or slower one, and you are billed at that tier. The console shows how many disks of each tier and size are free in the region you pick: a tier marked <strong>none available</strong> can't be placed there right now.</li>
  <li><strong>Size:</strong> at least 1,000 GiB. Each disk is sold at its size class, its real size rounded down to 100 GiB. The size you pick is a minimum: you may get a larger disk, billed at its own size class.</li>
  <li><strong>Count:</strong> 1 to 8 disks, all on the same server. The console offers up to the number free on a single server.</li>
</Unordered>

Dedicated disks are offered on plain VMs only, not with an application.

## Add dedicated disks to a VM

Dedicated disks are chosen when you [create the VM](/use/virtual-machines#create-a-virtual-machine). They can't be added to an existing VM.

<Ordered>
  <li>In the <strong>Add-ons</strong> step, turn on <strong>Dedicated disks</strong>.</li>
  <li>Pick a tier, a disk size and the number of disks. The form shows the monthly price of each disk and of the total.</li>
  <li>Read the warning and tick the acknowledgement below it. Automatic backups and failover are turned off: a VM with dedicated disks can't have them.</li>
</Ordered>

The VM's page then marks it **Pinned to host**, and lists each disk with its slot, size, tier and state.

## A VM with dedicated disks is pinned

Your VM stays on the server that holds its disks:

<Unordered>
  <li>it is never migrated, never failed over and never backed up, neither its OS disk nor its dedicated disks;</li>
  <li>if that server is lost, the data on it is lost;</li>
  <li>redundancy (mdadm, ZFS) and backups are yours to set up;</li>
  <li>if the server's operator leaves the network, the VM is decommissioned after a 30-day notice.</li>
</Unordered>

You confirm this when you create the VM.

## Confidential, not tamper-evident

Each disk is encrypted with AES-XTS, and the key exists only inside your VM, so the server's operator can't read your data. The encryption is not tamper-evident, though: someone with access to the server could corrupt blocks or put back older ciphertext without the encryption detecting it.

:::warning Use a checksumming filesystem if you need integrity
Use ZFS or btrfs checksums (or dm-integrity) to detect corruption, or replicate the data yourself.
:::

## Billing

Each disk is billed per GiB-hour of its size class, from the moment the VM is billed. A disk is billed while the VM is stopped too, since it stays reserved for you. Billing for a disk stops when you delete the VM, or as soon as the server reports the disk failed or swapped. Dedicated disks show as their own lines in Compute Usage.

## Quota

Dedicated disks have their own quota, in GiB, separate from the disk quota of your VMs. Each VM counts its number of disks times the size you asked for, until you delete it. If your account has no dedicated-disk quota, the console doesn't offer the add-on: [open a ticket](/use/console/support) to ask for one. See [Quotas](/use/compute/billing#quotas).

## Why a launch with dedicated disks can fail

| Message | What to do |
|---|---|
| No server has that many free dedicated disks of that size right now. | Ask for fewer or smaller disks, pick another tier or region, or try again later. |
| The dedicated disks you asked for are free only on servers that cannot also take this VM size. | Pick a smaller size or fewer disks, or try again later. |
| This image cannot open dedicated disks yet. | Pick another image. |
| Dedicated disks are not offered to this account. | [Contact support](/use/console/support). |
| Dedicated disks would exceed your quota. | Ask for fewer or smaller disks, delete a VM that holds some, or ask support for more. |
