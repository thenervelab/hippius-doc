---
id: billing
title: Compute Billing and Quotas
sidebar_label: Billing and quotas
slug: /use/compute/billing
description: How Hippius Compute is metered and charged, where to find the live prices, the quotas on your account, the 24-hour balance requirement for launches, and what happens if your balance runs out.
---

import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';

Compute is paid from your account balance, per second of use. This page explains what is billed and when, where the current prices are, the limits on what your account can run, and what happens if your balance can't cover your usage.

Your compute costs are on **Confidential Computing** → <BgStyledText>Compute Usage</BgStyledText> in the console. To add money to your balance, see [Billing](/use/console/billing).

## Prices

Prices can change, so they aren't listed in this documentation. Always check:

<Unordered>
  <li>the <strong>Prices</strong> section of <a href="https://console.hippius.com/dashboard/billing/compute#prices">Compute Usage</a>, the live price list;</li>
  <li>the create form, which shows the hourly and monthly price of what you are about to launch.</li>
</Unordered>

Monthly prices are estimates over 730 hours. Amounts are in dollars, taken from your balance.

## What is billed

| What | How it is billed |
|---|---|
| **Virtual machines** | Per second, by size: its vCPUs, memory and disk. From the first time the VM runs until you ask to delete it, **including while it is stopped**. |
| **Public IPv4** | Per second while the address is attached. The console shows **Free of charge** when an address is free on your account. |
| **Public bandwidth** | Per GB, at the price in the price list. |
| **VM backups** | Per GB of backup storage per hour, $6 per TB-month. See [VM backups](/use/compute/vm-backups#what-backups-cost). |
| **Databases and Kubernetes** | The VMs they run on, like any VM. There is no extra fee for the service. |
| **Database and Kubernetes backups** | As S3 storage in your account, at your S3 price. |
| **GitHub Actions runners** | Per second of each runner VM's life, like any VM. |

**One-minute minimum.** Each VM, and each public IPv4 address, is billed for at least one minute.

**Stopped VMs.** A stopped VM keeps its server capacity reserved, so it is billed at its full price. Delete a VM to stop paying for it. A VM whose boot stalled, shown as failed, isn't billed for its compute time.

**Deleting.** Billing stops when you ask to delete a VM, database or cluster, not when the teardown finishes.

## How usage is charged

Usage is metered in whole seconds, at the price in force at each moment, and grouped by hour (UTC). Each hour is closed shortly after it ends, then charged from your balance in one transaction, normally within 20 minutes. A closed hour is never repriced.

Compute was free during the first months of the beta. We announced that compute becomes paid on **5 October 2026**, and charging is switched on account by account. While your account's usage is metered but not charged, Compute Usage says **Not charged yet**. Hours metered while your account wasn't charged are never charged later.

Compute Usage shows the cost of what you run now, every hour of the month with its lines, and the month's total split by status:

| Status | Meaning |
|---|---|
| **Charged** | Paid from your balance. |
| **To be charged** | Closed, waiting for the next charge. |
| **Unpaid** | Your balance couldn't cover it. It is collected automatically after you top up. |
| **Metered, not charged** | Measured while your account wasn't charged. It will never be charged. |
| **Under review** | Something on our side needs checking. Nothing for you to do. |

Click **Download CSV** to export a month, hour by hour. Invoices are issued for each top-up, when money comes in, not for each hour of usage.

## Quotas

Quotas cap what your account can run at the same time. They count everything you have, whether running or stopped.

| Quota | Default limit |
|---|---|
| Virtual machines | 5 |
| Databases | 2 |
| Kubernetes clusters | 1 |
| vCPUs | 32 |
| Memory | 128 GB |
| Disk | 1024 GB |
| Public IPv4 | 6 |
| GitHub Actions runners (at once) | 5 |

A few things to know:

<Unordered>
  <li>The vCPU, memory and disk quotas include the instances of your databases, your Kubernetes nodes and your runners. The <strong>Virtual machines</strong> quota only counts the VMs you create yourself.</li>
  <li>A High availability database counts three instances. A Kubernetes cluster counts three masters and their three public IPv4 addresses.</li>
  <li>Only what you add is checked. If your account is above a limit, you keep everything, but you can't add more until you are back under it.</li>
</Unordered>

The **Limits** section of Compute Usage shows each quota, how much you use, and your profile. If you need more, click **Need more? Contact support**, or [open a ticket](/use/console/support).

When a launch would go over a quota, it is refused with **This launch is over your compute quota**, followed by the limits it would break. Delete resources you no longer need, or ask support to raise your limits.

## The 24-hour balance requirement

To launch something, your balance must cover **24 hours** of:

<Unordered>
  <li>everything you already run, at its current hourly price, including stopped VMs, public IPv4 addresses and backup storage;</li>
  <li>everything that is still starting;</li>
  <li>what you are launching now.</li>
</Unordered>

It is checked when you create a VM, database or cluster, add or replace a Kubernetes worker, restore a database, attach a public IPv4, make a VM bigger, and for each runner job. Starting or rebooting a VM you already have isn't checked, and making a VM smaller is never refused.

The create forms show what your current compute needs for 24 hours, and what the launch adds. If your balance falls short, the launch is refused with **Not enough balance for this launch** and the amount to add. Top up, then launch again.

If the console says **Your balance could not be read just now**, nothing was launched. Try again in a moment.

## If your balance runs out

If an hour of usage can't be paid from your balance, it is recorded as **Unpaid**, and your account owes it. Compute Usage shows a banner with the amount and since when.

<Unordered>
  <li><strong>You are emailed</strong> when your account first owes compute usage, and reminded if it stays unpaid.</li>
  <li><strong>Top up to settle it.</strong> What you owe is collected automatically within about 10 minutes of a top-up that covers it. The banner can take up to an hour to clear.</li>
</Unordered>

If the amount stays unpaid, Hippius may stop your services:

<Unordered>
  <li><strong>You always get an email at least 24 hours before anything is stopped.</strong> When this applies to your account, the banner shows the earliest date.</li>
  <li><strong>Running VMs are stopped, and their disks kept.</strong> Their public IPv4 addresses are released and their published ports withdrawn.</li>
  <li><strong>Databases and Kubernetes clusters are suspended as a whole.</strong> Their instances are powered off and their public endpoints withdrawn. A cluster's masters keep their public addresses.</li>
  <li><strong>While services are stopped</strong>, starting a VM and launching anything new are refused until you pay.</li>
</Unordered>

Once you pay, everything that was stopped for the unpaid balance starts again by itself, within about an hour, and you get an email. VMs get a public IPv4 back, which may be a different address. VMs you had stopped yourself stay stopped.

Services are never deleted for an unpaid balance without an email that names the date, sent at least 24 hours before. If a database is deleted, its backups in your S3 account are kept.

## Where to next

<Unordered>
  <li><a href="/use/console/billing">Billing</a>: add money to your balance by card, Bitcoin, USDC or TAO.</li>
  <li><a href="/use/compute/troubleshooting">Troubleshooting</a>: what each refusal means.</li>
</Unordered>
