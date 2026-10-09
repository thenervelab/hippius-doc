---
id: vm-backups
title: VM Backups
sidebar_label: Backups
slug: /use/compute/vm-backups
description: Scheduled, encrypted backups of a Hippius VM's disk. Turn them on, choose how often they run, understand what a reboot does to them, restore a VM in place, and what they cost.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';

VM backups take encrypted copies of a VM's disk on a schedule, so you can put the VM back to an earlier point if something goes wrong: a bad upgrade, a deleted file, a broken configuration. Hippius stores and manages them for you.

## How VM backups work

<Unordered>
  <li><strong>The first backup is a full copy</strong> of the disk, taken while the VM runs. It can take several minutes. Later backups copy only what changed.</li>
  <li><strong>The interval is how much data you can expect to lose.</strong> With a 1-hour interval and backups that succeed, a restore loses at most about the last hour of changes. If backups are failing or out of date, the latest restore point is older: watch the panel's state.</li>
  <li><strong>Backups are crash-consistent</strong>: like pulling the power cord at that moment. Databases and journaled file systems recover from that, but an application in the middle of writing a file may need to repair it.</li>
  <li><strong>Backups are kept 7 days.</strong> You can't change this.</li>
</Unordered>

:::warning A reboot starts a new chain
Every reboot, including a stop and start, starts a new chain: a new full backup follows the boot. Until it completes, the VM has no restorable backup from its current boot, and the panel shows **Out of date**. Backups from before the reboot can only be restored as a [rollback to an earlier boot](#restore-points-from-an-earlier-boot), which needs a VM created from a recent image. Avoid rebooting just before you might need to restore.
:::

## Turn on backups

**When you create a VM**, tick **Automatic backups** in the **Add-ons** step and choose how often they run. They turn on by themselves once the VM is running.

**On an existing VM:**

<Ordered>
  <li>Open the VM's page. The VM must be running and powered on.</li>
  <li>In the <strong>Backups</strong> panel, turn on <strong>Scheduled backups</strong>.</li>
  <li>Choose <strong>Back up every</strong>: 24 hours, 6 hours, 1 hour or 15 minutes.</li>
</Ordered>

You can change the interval the same way later. Backups are available for VMs launched from one of the standard images.

## Check your backups

The **Backups** panel shows the state of your backups, the **Last restorable backup**, how much is **Stored**, and the **Price**.

| State | Meaning |
|---|---|
| **First backup running** | The first full copy of the disk is in progress. |
| **Up to date** | A recent restorable backup exists. |
| **Out of date** | No recent restorable backup, usually after a reboot, until the next full backup completes. |
| **Failing** | The latest backup attempt failed. The panel shows when and why. |
| **Off** | No backups are taken. |

The **Restore points** table lists each backup with when it was **Taken**, its **Kind** (**Full** or **Incremental**), its **Size** and its **Status**. Restore points are listed while the VM is running.

## Restore a VM

A restore puts the VM's disk back to a restore point. It happens in place: the VM keeps its id, its IP addresses and its billing.

<Ordered>
  <li>In <strong>Restore points</strong>, click <BgStyledText>Restore</BgStyledText> on the backup you want.</li>
  <li>Read the confirmation, then type the VM's name to confirm.</li>
  <li>Click <BgStyledText>Restore</BgStyledText>.</li>
</Ordered>

What happens next:

<Unordered>
  <li>The backup is downloaded while the VM keeps running.</li>
  <li>The VM is then stopped for a few minutes while its disk is swapped. The dialog tells you if it will take longer.</li>
  <li>The VM boots on the restored disk and returns to the power state it was in, running or stopped.</li>
</Unordered>

:::danger Everything written after the restore point is lost
The disk goes back to the time of the backup. Copy anything newer that you need off the VM before you restore.
:::

Your current disk is kept until the restored VM is running. If the restore fails before then, the VM is left as it was, and the panel says **Restore failed — your VM was left unchanged**. If it says **Restore failed — contact support**, [contact support](/use/console/support).

Only one restore can run on a VM at a time, and you can't restore while the VM is being resized.

### Restore points from an earlier boot

Backups taken before the VM's last reboot are marked **Earlier boot**. Restoring them rolls the VM back across a reboot, which needs a VM created from a recent image. The console tells you if your VM can't do it. When it can, the dialog asks you to confirm the rollback, and you get an email when it is done. A VM can be rolled back at most once every 30 minutes.

## Failover

If the server running your VM dies, the VM can be restarted on another server in the same region from its newest backup of the current boot, manually by support or automatically if you turn on **Automatically restart on another server if this server goes down** in the **Backups** panel. Data written after that backup is lost, and a VM without backups can't be failed over. See [VM failover and high availability](/use/compute/vm-failover).

## Turn off backups

Turn off **Scheduled backups** and confirm with **Turn off**. No new backups are taken. The existing ones are kept for 7 days, then deleted.

## What backups cost

Backup storage costs **$6 per TB-month**, billed on what your backups actually store (all the full and incremental copies still kept), not on the size of the disk. Storage is measured every few minutes and billed by the hour. The current price is always in the [live price list](https://console.hippius.com/dashboard/billing/compute#prices), and the **Backups** panel shows it too.

Backups that are kept after you turn them off are billed until they are deleted. When you create a VM with backups, the [24-hour balance requirement](/use/compute/billing#the-24-hour-balance-requirement) counts one full copy of its disk.

## Why turning on backups can be refused

| Message | What to do |
|---|---|
| The VM must be running to turn backups on. | Start the VM, then try again. |
| Backups are available only for VMs launched from one of our standard images. | Backups can't be turned on for this VM. |
| This VM's disk is too large to be backed up for now. | Backups can't be turned on for this VM yet. |
| Backups are not available right now. | Try again later. |
