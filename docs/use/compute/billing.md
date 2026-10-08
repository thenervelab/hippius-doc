---
id: billing
title: Compute Billing and Quotas
sidebar_label: Billing and quotas
slug: /use/compute/billing
description: How Hippius Compute is metered and charged by the hour, its prices and management fees, the quotas on your account, the 24-hour balance requirement for launches, and what happens if your balance runs out.
---

import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';

Compute is paid from your account balance, per second of use. This page explains what is billed and when, where the current prices are, the limits on what your account can run, and what happens if your balance can't cover your usage.

Your compute costs are on **Confidential Computing** → <BgStyledText>Compute Usage</BgStyledText> in the console. To add money to your balance, see [Billing](/use/console/billing).

## Prices

These are the prices in force today. Amounts are in dollars, taken from your balance. Monthly prices are estimates over 730 hours.

| Resource | Price |
|---|---|
| vCPU | $18 per vCPU per month |
| Memory | $2.50 per GB per month |
| Disk | $0.10 per GB per month |
| Public IPv4 | $0.005 per hour (about $3.65 a month), while attached |
| VM backups | $6 per TB-month stored |
| Outbound bandwidth | Measured per region; $0 today in France, the Netherlands and Australia (Australia: 1 TB per VM per month included). Inbound traffic is free. |

A VM costs the sum of its vCPUs, memory and disk:

| Size | Resources | Price |
|---|---|---|
| **Small** | 1 vCPU, 4 GB memory, 40 GB disk | $32 a month ($0.0438 an hour) |
| **Medium** | 2 vCPU, 8 GB memory, 80 GB disk | $64 a month ($0.0877 an hour) |
| **Large** | 4 vCPU, 16 GB memory, 160 GB disk | $128 a month ($0.1753 an hour) |
| **X-Large** | 8 vCPU, 32 GB memory, 320 GB disk | $256 a month ($0.3507 an hour) |
| **2X-Large** | 16 vCPU, 64 GB memory, 640 GB disk | $512 a month ($0.7014 an hour) |
| **4X-Large** | 32 vCPU, 128 GB memory, 1280 GB disk | $1024 a month ($1.4027 an hour) |

A VM you have resized keeps its disk, so it is priced on the vCPUs and memory it has now and the disk it was launched with.

Prices can change. The **Prices** section of <a href="https://console.hippius.com/dashboard/billing/compute#prices">Compute Usage</a> is always current, and every create form shows the hourly and monthly price of what you are about to launch.

### Management fees

Managed databases and Kubernetes clusters cost the VMs they run on, plus a fee for running them:

| Service | Fee |
|---|---|
| **Managed database** | 25% of its VMs' price. |
| **Managed Kubernetes** | $15 per cluster per month, whatever its size or number of workers. |

The database fee is a share of the VM price only, not of public addresses or backups. A fee runs while the service's VMs are billed, stopped or not, and stops when you ask to delete the service. It shows as its own line in Compute Usage.

Some examples:

| What | Per month |
|---|---|
| Database, Starter, size Small | $32 for the VM + $8 fee = **$40** |
| Database, High availability, size Small | $96 for 3 Small VMs + $24 fee = **$120** |
| Kubernetes, smallest control plane | $192 for 3 Medium masters + about $11 for their 3 public IPv4 + $15 fee = **about $218**, plus your workers |

## What is billed

| What | How it is billed |
|---|---|
| **Virtual machines** | Per second, by size: its vCPUs, memory and disk. From the first time the VM runs until you ask to delete it, **including while it is stopped**. |
| **Public IPv4** | Per second while the address is attached. |
| **Bandwidth** | Outbound traffic is measured per VM and per region, and not charged today. Inbound traffic is free. |
| **VM backups** | Per GB of backup storage per hour, $6 per TB-month. See [VM backups](/use/compute/vm-backups#what-backups-cost). |
| **Databases** | Their VMs, like any VM, plus the [management fee](#management-fees). |
| **Kubernetes clusters** | Their masters, workers and the masters' public IPv4, like any VM, plus the [management fee](#management-fees). |
| **Database and Kubernetes backups** | As S3 storage in your account, at your S3 price. |
| **GitHub Actions runners** | Per second while each runner VM is billed, like any VM. See [Runners billing](/use/compute/runners#billing). |

**One-minute minimum.** Each VM, and each public IPv4 address, is billed for at least one minute.

**Stopped VMs.** A stopped VM keeps its server capacity reserved, so it is billed at its full price. Delete a VM to stop paying for it. A VM whose boot stalled, shown as failed, stops being billed when the stall is detected. It still counts against your quotas until you delete it.

**Deleting.** Billing stops when you ask to delete a VM, database or cluster, not when the teardown finishes.

**Shared accounts.** What a team member runs in your account is billed to your account and counts against its quotas. See [Shared accounts](/use/console/team#billing-and-quotas).

## How usage is charged

Compute is charged on the Hippius chain every hour, for every account. Usage is metered in whole seconds, at the price in force at each moment, and grouped by hour (UTC). Each hour is closed shortly after it ends, then charged from your balance in one transaction, normally within 20 minutes. A closed hour is never repriced.

Compute Usage shows the cost of what you run now, every hour of the month with its lines, and the month's total split by status:

| Status | Meaning |
|---|---|
| **Charged** | Paid from your balance. |
| **To be charged** | Closed, waiting for the next charge. |
| **Unpaid** | Your balance couldn't cover it. It is collected automatically after you top up. |
| **Metered, not charged** | Measured while compute was free, before your account was charged. It will never be charged. |
| **Under review** | Something on our side needs checking. Nothing for you to do. |

Click **Download CSV** to export a month, hour by hour. Invoices are issued for each payment, when money comes in, not for each hour of usage. Top-ups with hAlpha aren't invoiced. See [Invoices](/use/console/billing#invoices).

## Quotas

Quotas cap what your account can run at the same time. They count everything you have, whether running or stopped.

Your limits depend on your account's tier. A new account starts on **Starter**:

| Quota | Starter | Standard | Business |
|---|---|---|---|
| Virtual machines | 3 | 10 | 25 |
| Databases | 1 | 3 | 5 |
| Kubernetes clusters | 1 | 2 | 5 |
| vCPUs | 8 | 32 | 96 |
| Memory | 32 GB | 128 GB | 384 GB |
| Disk | 320 GB | 1024 GB | 4096 GB |
| Public IPv4 | 3 | 6 | 15 |
| GitHub Actions runners (at once) | 3 | 10 | 20 |

**Your limits rise on their own.** Once a day, an account moves up one tier when it qualifies:

<Unordered>
  <li><strong>Starter to Standard:</strong> at least $25 charged in Compute Usage (compute and CDN) since you opened the account, and an account at least 7 days old.</li>
  <li><strong>Standard to Business:</strong> at least $250 charged, and an account at least 30 days old.</li>
  <li>In both cases, nothing unpaid: no usage owed, and no failed charge in the last 48 hours.</li>
</Unordered>

Limits never go down on their own.

A few things to know:

<Unordered>
  <li>The vCPU, memory and disk quotas include the instances of your databases, your Kubernetes nodes and your runners. The <strong>Virtual machines</strong> quota only counts the VMs you create yourself.</li>
  <li>A High availability database counts three instances. A Kubernetes cluster counts three masters and their three public IPv4 addresses.</li>
  <li>Only what you add is checked. If your account is above a limit, you keep everything, but you can't add more until you are back under it.</li>
</Unordered>

The **Limits** section of Compute Usage shows each quota, how much you use, and your tier (**custom** once support has changed one of your limits). If you need more before your account moves up, click **Need more? Contact support**, or [open a ticket](/use/console/support).

When a launch would go over a quota, it is refused with **This launch is over your compute quota on the** *tier name* **tier**, followed by the limits it would break. Delete resources you no longer need, wait for your limits to rise, or ask support to raise them sooner.

## The 24-hour balance requirement

To launch something, your balance must cover **24 hours** of:

<Unordered>
  <li>everything you already run, at its current hourly price, including stopped VMs, public IPv4 addresses, backup storage and management fees;</li>
  <li>everything that is still starting;</li>
  <li>what you are launching now.</li>
</Unordered>

It is checked when you create a VM, database or cluster, add or replace a Kubernetes worker, restore a database, attach a public IPv4, make a VM bigger, turn on scheduled backups for a VM, and for each runner job. Starting or rebooting a VM you already have isn't checked, and making a VM smaller is never refused.

The create forms show what your current compute needs for 24 hours, and what the launch adds. If your balance falls short, the launch is refused with **Not enough balance for this launch** and the amount to add. Top up, then launch again.

If the console says **Your balance could not be read just now**, nothing was launched. Try again in a moment.

## If your balance runs out

If an hour of usage can't be paid from your balance, it is recorded as **Unpaid**, and your account owes it. Compute Usage shows a banner with the amount and since when.

<Unordered>
  <li><strong>You are emailed</strong> when your account first owes compute usage, and reminded if it stays unpaid.</li>
  <li><strong>Top up to settle it.</strong> What you owe is collected automatically within about 10 minutes of a top-up that covers it. The banner can take up to an hour to clear.</li>
  <li><strong>New launches still need the 24-hour balance.</strong> Until you top up, your balance is unlikely to cover them.</li>
</Unordered>

Services aren't stopped for an unpaid balance today. If that changes, you will always get an email at least 24 hours before anything of yours is stopped.

## Where to next

<Unordered>
  <li><a href="/use/console/billing">Billing</a>: add money to your balance by card, Bitcoin, USDC, TAO or hAlpha.</li>
  <li><a href="/use/compute/troubleshooting">Troubleshooting</a>: what each refusal means.</li>
</Unordered>
