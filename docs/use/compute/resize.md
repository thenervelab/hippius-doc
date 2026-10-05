---
id: resize
title: Resize a Virtual Machine
sidebar_label: Resize
slug: /use/compute/resize
description: Change the vCPUs and memory of a Hippius VM. What is kept, how much downtime to expect, when the new price starts, and why a resize can be refused.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';

Resizing moves a VM to another size: more or fewer vCPUs and more or less memory. Your disk and everything on it are kept. Use it when a VM outgrows its size, or to save money when it is bigger than it needs to be.

## What changes and what doesn't

<Unordered>
  <li><strong>vCPUs and memory change</strong> to those of the new size.</li>
  <li><strong>The disk keeps its size and its data.</strong> It can't grow or shrink, because it is encrypted with integrity protection. A VM launched with a 40 GB disk keeps 40 GB at any size, and a VM you make smaller keeps its bigger disk.</li>
</Unordered>

:::note Need a bigger disk?
Launch a new VM at a size with a bigger disk, and move your data across.
:::

The price of a resized VM is worked out from what it actually has: the new size's vCPUs and memory, plus its own disk. So a resized VM whose disk is smaller than the new size's usual disk costs less than a new VM of that size. The resize dialog shows the exact new price.

## Resize a VM

<Ordered>
  <li>Open the VM's page. In the <strong>VM Controls</strong> card, click <BgStyledText>Resize</BgStyledText>.</li>
  <li>Pick a new size. Each card shows its vCPUs, memory, <strong>Disk: N GB (kept)</strong>, its price per hour and per month, and the difference from what you pay now. Open <strong>Price details</strong> to compare <strong>Now</strong> and <strong>After</strong> line by line. Click <BgStyledText>Continue</BgStyledText>.</li>
  <li>Read the confirmation: it tells you how much downtime to expect. Click <BgStyledText>Resize and reboot</BgStyledText> (or <BgStyledText>Resize</BgStyledText> for a stopped VM).</li>
</Ordered>

A progress view follows the resize step by step. It carries on if you close the window: click **View resize progress** in **VM Controls** to open it again. While a resize runs, the VM can't be powered, deleted, restored or reached from the browser terminal.

A size can be greyed out with the reason next to it, for example when no server can take it right now. A card that says **Moves to another server first** means the VM has to move before it can grow, which takes longer.

## Downtime

<Unordered>
  <li><strong>A running VM reboots.</strong> Expect about 1 to 3 minutes of downtime. Save your work first. If it has to move to another server first, the downtime can be several minutes.</li>
  <li><strong>A stopped VM stays stopped.</strong> It starts with the new size the next time you start it.</li>
</Unordered>

## When the new price starts

<Unordered>
  <li><strong>Running VM:</strong> the new price applies once the VM has restarted at the new size, not when you click.</li>
  <li><strong>Stopped VM:</strong> the new price applies once the resize is done, because a stopped VM is still billed for its size.</li>
</Unordered>

When the resize is over, the progress view says **Billed as** the new size **since** the time it took effect.

## If a resize fails

If the resize fails and the dialog says **your VM is back as it was**, nothing changed and nothing was charged at the new size. Click **Pick another size** to try again straight away.

If it says **The resize did not complete**, [contact support](/use/console/support) with the VM id and the resize id the dialog shows.

## Why a resize can be refused

| Message | What to do |
|---|---|
| Only a running VM can be resized. | Wait until the VM has finished provisioning. A stopped VM can be resized. |
| This VM is starting or stopping. | Try again in a minute. |
| Another operation is running on this VM. | Wait for it (for example a restore) to finish. |
| This VM was resized a moment ago. | You can resize again 10 minutes after the last resize. The dialog shows when. |
| This VM was already resized while stopped. | Start it once, then resize again. |
| A stopped VM can only get more (or less) of both vCPU and memory. | To trade one for the other, for example more vCPUs and less memory, start the VM first. |
| No server can take this size right now. | Try again later, or pick another size. |
| This VM is paid by a monthly plan; its size cannot be changed. | Launch a new VM at the size you need. |
| This service is managed. | Managed services can't be resized from here. |
| Your balance does not cover 24 h at the new price. | Top up. Only a bigger size is checked: making a VM smaller is never refused for your balance or quota. |
| Over your compute quota. | A bigger size needs room in your vCPU and memory quotas. See [Quotas](/use/compute/billing#quotas). |

For other refusals, see [Troubleshooting](/use/compute/troubleshooting).
