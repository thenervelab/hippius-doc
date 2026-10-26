---
id: dedicated-disks
title: Dedicated disks
sidebar_label: Dedicated disks
slug: /use/compute/dedicated-disks
description: Attach whole physical disks to a Hippius VM, build your own redundancy, and know what a pinned VM gives up.
unlisted: true
---

A dedicated disk is a whole physical disk of a Hippius server, passed through to your VM. You get the full disk, encrypted, and you build what you need on it: a single volume, mdadm, ZFS or btrfs.

## What you choose

- **Tier:** HDD, SSD or NVMe, when offered. The tier is a minimum: you may get a faster disk, billed at the tier you chose.
- **Size:** each disk is sold at its size class, its real size rounded down to 100 GiB. That size class is what you are billed for.
- **Count:** 1 to 8 disks, all on the same server.

Dedicated disks are offered on plain VMs only, not with an app.

## A VM with dedicated disks is pinned

Your VM stays on the server that holds its disks:

- it is never migrated, never failed over and never backed up, neither its OS disk nor its dedicated disks;
- if that server is lost, the data on it is lost;
- redundancy (mdadm, ZFS) and backups are yours to set up;
- if the server's operator leaves the network, the VM is decommissioned after a 30-day notice.

You confirm this when you create the VM.

## Confidential, not tamper-evident

Each disk is encrypted with AES-XTS, and the key exists only inside your VM, so the server's operator can't read your data. The encryption is not tamper-evident, though: someone with access to the server could corrupt blocks or put back older ciphertext without the encryption detecting it.

Confidential, not tamper-evident: use a checksumming filesystem (ZFS/btrfs) or your own replication if you need integrity.

## Billing

Each disk is billed per GiB-hour of its size class, from the moment the VM is billed. A disk is billed while the VM is stopped too, since it stays reserved for you. Billing for a disk stops when you delete the VM, or as soon as the server reports the disk failed or swapped.
