---
id: projects
title: Projects and Billing Accounts
sidebar_label: Projects & Billing Accounts
slug: /use/console/projects
description: Organise your Hippius compute, S3 and CDN into projects, pay for them from separate billing accounts, give team members access per project, follow costs per project, set budgets and quotas, and transfer a project to another account.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';

:::caution Beta, rolling out
Projects and billing accounts are in beta. They are being turned on for a pilot group first, then for every account. Until they are on for your account, the console does not show them, and everything works as described in the rest of the documentation.
:::

## Introduction

Projects let you split your account into separate spaces, and billing accounts let you choose which wallet pays for each one.

<Unordered>
  <li>A <strong>project</strong> holds resources: virtual machines, managed databases, Kubernetes clusters, public IPv4 addresses, GitHub Actions runners, S3 buckets and access keys, and CDN zones.</li>
  <li>A <strong>billing account</strong> is a wallet with its own credits, payments, invoices and billing profile (company, address, tax id, billing email). Each project is paid from one billing account, and several projects can share one.</li>
</Unordered>

Your account itself is the **Default project** and the **Default billing account**. Everything you had before stays there, unchanged, and you don't have to create anything to keep working as before.

Projects work with [shared accounts](/use/console/team): team members can be given access to the whole account, or to one project only.

Where things are in the console:

<Unordered>
  <li>The <strong>project switcher</strong> is the button showing the current project's name, at the top right next to your account card. Its menu lists your projects, with <strong>Create project</strong>, <strong>Archive</strong> for the current project, and <strong>Manage projects</strong>.</li>
  <li>The <strong>Projects</strong> page is in the sidebar, under <strong>Team</strong>.</li>
  <li>The <strong>Billing Accounts</strong> page is in the sidebar, under <strong>Account</strong>, next to <strong>Billing</strong>.</li>
</Unordered>

## Projects

Create a project with **Create project**, in the project switcher or at the top of the **Projects** page. Give it a name and, optionally, a billing account to pay for it. Without one, it is paid from your Default billing account.

Pick a project in the project switcher, or choose **Open** next to it on the **Projects** page, to work in it. VMs, databases, clusters, runners, buckets, S3 keys and CDN zones are listed and created in the selected project. Switching projects is like switching accounts: each one has its own resources.

<Unordered>
  <li><strong>Rename</strong> a project, or <strong>move it to another billing account</strong>, with <strong>Rename</strong> or <strong>Billing</strong> next to it on the <strong>Projects</strong> page (<strong>Billing</strong> opens the <strong>Change billing account</strong> dialog).</li>
  <li><strong>Archive</strong> a project once it is empty, with <strong>Archive</strong> on the <strong>Projects</strong> page or in the project switcher. A project that still owns anything (a VM, a database, a cluster, a public IP, a runner, an S3 bucket or key, a CDN zone) cannot be archived: delete its resources first. The dialog lists what it still owns.</li>
</Unordered>

## S3 and the CDN in projects

Buckets, S3 access keys and CDN zones belong to the project they are created in, so you see and manage them per project, and team members can be given S3 or CDN access for one project only.

<Unordered>
  <li><strong>S3 storage is paid at the account level.</strong> The bytes of every project add up under your account: your account's S3 plan covers them first, then pay-as-you-go from your Default billing account. A project's billing account never pays for its S3, and S3 plans are bought, changed and cancelled by the account owner only.</li>
  <li><strong>CDN traffic follows the project.</strong> A zone's traffic and custom domains are charged to the project's billing account, hour by hour, like its compute.</li>
  <li><strong>Access keys in a project are object keys.</strong> A project has no master key. Its access keys work on named buckets of the project only: a key for every bucket, or one that can list or manage all buckets, is refused. Your own account-level keys (from the Default project) still see every project's buckets.</li>
  <li><strong>A CDN zone serves a bucket of its own project.</strong> A bucket that a CDN zone serves cannot be deleted: delete the zone first.</li>
  <li><strong>S3 migrations</strong> stay at the account level, as before.</li>
</Unordered>

In a project other than the Default one, the S3 page says that the project's storage is covered by the account's S3 plan and billed on the Default billing account, and the migrations page says that migrations import into the Default project's S3. A team member with S3 access to the project can see the account's S3 plan there. Uploads and deletions you start in a project stay in that project, even if you switch projects before they finish.

## Billing accounts

Create a billing account with **Create billing account** on the **Billing Accounts** page. It gets a wallet of its own, separate from your Default one. Choose **Open** next to a billing account to see its balance, the projects it pays for, and its **Costs**, **Invoices**, **Billing details** and **Members** tabs.

<Unordered>
  <li><strong>Top up</strong> a billing account with a card (one-off or recurring) or with Bitcoin, the same way you top up your account, with <strong>Top up</strong> on its page.</li>
  <li>Its <strong>billing profile</strong>, edited in the <strong>Billing details</strong> tab, is printed on its invoices, which are mailed to its billing email, or to you when it has none.</li>
  <li>Its <strong>balance</strong> pays for every project linked to it. The launch check, the runway and the low-credit alerts look at that balance against what all those projects burn.</li>
</Unordered>

### Moving a project to another billing account

The change applies from the **next hour**, for everything the project already runs. The current hour is paid by the billing account the project leaves.

A move is refused while either billing account has unpaid compute usage (settle it first), and while the project runs VMs on an old monthly plan.

### Unpaid usage

If a billing account cannot pay its hourly charge, the usual [arrears steps](/use/compute/billing) apply to every project it pays for: a notice, then the project's VMs are stopped after the grace period, and started again once the balance is topped up.

Money mails (low credits, unpaid usage, receipts, budget alerts) about a billing account go to you, to the team members who are billing admins of it, and to its billing email.

## Access for team members

In a shared account, a member's access can be limited to one project or one billing account.

<Unordered>
  <li>Access given <strong>for the whole account</strong> works as before, in every project.</li>
  <li>Access given <strong>for one project</strong> works in that project only, never in another one or in the Default project.</li>
  <li>The <strong>Billing</strong> role has two levels: <strong>Viewer</strong> reads balances, invoices and costs; <strong>Admin</strong> can also top up, edit the billing profile, create billing accounts and move projects onto a billing account. It can be given for the whole account or for one billing account.</li>
</Unordered>

A team manager can only give access they hold themselves, project by project. When a project is archived or transferred, the access limited to it is removed.

## Costs

Each billing account has a **Costs** tab on its page (also reachable with **Costs** next to it on the **Billing Accounts** page, the Default billing account included): what it paid, per project, per kind of usage (VM time, public IP, bandwidth, backup storage, database and Kubernetes management fees, CDN traffic, requests and custom domains) and per day, for any period up to a year. Choose the days with **From** and **To**, the breakdown with **Split by** (**Project**, **Kind**, **Day**), and download it with **Download CSV** for your own reporting.

Costs show the hours charged or about to be charged. A project that moved to another billing account appears on each billing account for the hours that one paid. Each project's S3 storage is shown for information: it is paid at the account level (see above).

## Budgets

Set a **monthly budget** on a project, in credits, with **Budget** next to it on the **Projects** page: **Monthly limit (USD)**, **Alert at (% of the limit)**, and **Refuse new launches over the limit**. A billing viewer can also open a project's budget from the projects listed on its billing account's page.

<Unordered>
  <li>You get an email when the project's spending for the month reaches each threshold you choose (by default 50%, 90% and 100% of the budget), once per threshold and month.</li>
  <li>Optionally, <strong>stop new launches</strong> once the budget is reached: until the next month, or until you raise the budget, nothing new that costs money can be launched in the project. What already runs keeps running and is billed.</li>
</Unordered>

## Quotas

Your account's [compute quotas](/use/compute/billing#quotas) apply to all your projects together. You can also give a project its **own limits** (number of VMs, vCPUs, memory, disk, databases, clusters, public IPs, runners), within the account's, with **Quota** next to it on the **Projects** page. A launch past a project's limit is refused, even when the account still has room.

## Transferring a project

You can hand a project, with everything it runs, to another Hippius account.

<Ordered>
  <li>On the <strong>Projects</strong> page, choose <strong>Transfer</strong> next to the project. In the <strong>Transfer project</strong> dialog, enter the other account's id and choose <strong>Offer transfer</strong>. The other owner finds their account's id in the <strong>Transfers</strong> section of their <strong>Projects</strong> page.</li>
  <li>The owner of that account sees the offer in the <strong>Transfers</strong> section of their <strong>Projects</strong> page and chooses <strong>Accept</strong> (or <strong>Decline</strong>), choosing which of their billing accounts will pay for the project. The offer is valid for 7 days, and you can cancel it with <strong>Cancel</strong> in your <strong>Transfers</strong> section until it is accepted.</li>
  <li>Once accepted, the project and its resources belong to the other account. Nothing is copied or restarted.</li>
</Ordered>

From the transfer:

<Unordered>
  <li>The project is paid by the other account from the <strong>next hour</strong>. The current hour stays with your billing account.</li>
  <li>The access your team members had to the project, and its budget and quota, are removed.</li>
  <li>A transfer is refused while a billing account involved has unpaid usage, while a billing change of the project is about to take effect, while the project runs VMs on an old monthly plan, and while it owns S3 buckets, S3 keys or CDN zones (their storage lives under your account: move or delete them first).</li>
</Unordered>

## Known limitations

<Unordered>
  <li>Backups of a database or cluster in a project are kept in your account's S3.</li>
  <li>A project that only has CDN zones (and no VMs) is not stopped for unpaid usage of its billing account.</li>
  <li><strong>Native-token and x402 top-ups</strong> are not available on a billing account. Use a card or Bitcoin.</li>
  <li>Drive is not part of projects or shared accounts.</li>
</Unordered>

## For developers: the API

Select a project or a billing account with a header, next to `X-Hippius-Account` for a shared account:

```bash
# list the VMs of a project
curl -H "Authorization: Token $TOKEN" -H "X-Hippius-Project: proj_0a1b2c3d4e5f60718293" \
     https://api.hippius.com/api/compute/vms/

# read the balance of a billing account
curl -H "Authorization: Token $TOKEN" -H "X-Hippius-Billing: bill_9f8e7d6c5b4a39281706" \
     https://api.hippius.com/api/billing/credits/balance/
```

Without these headers, requests act on the Default project and the Default billing account, exactly as before. A route that does not take a project or a billing account refuses the header (`403`, code `project_scope_unsupported` or `billing_scope_unsupported`).

Projects, billing accounts, costs (`?export=csv`), budgets, quotas and transfers are managed under `/api/accounts/`. `GET /api/accounts/` says whether projects are on (`projects_enabled`) and whether you can create them (`projects_available`).

## Where to next

<Unordered>
  <li><a href="/use/console/team">Shared accounts</a>: invite team members and give them access.</li>
  <li><a href="/use/compute/billing">Compute billing</a>: hourly charges, runway, quotas and unpaid usage.</li>
  <li><a href="/use/console/billing">Billing</a>: top-ups, invoices and the billing profile.</li>
</Unordered>
