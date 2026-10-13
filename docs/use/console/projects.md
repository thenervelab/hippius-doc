---
id: projects
title: Projects and Billing Accounts
sidebar_label: Projects & Billing Accounts
slug: /use/console/projects
description: Organise your Hippius compute into projects, pay for them from separate billing accounts, give team members access per project, follow costs per project, set budgets and quotas, and transfer a project to another account.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';

:::caution Beta, rolling out
Projects and billing accounts are in beta. They are being turned on for a pilot group first, then for every account. Until they are on for your account, the console does not show them, and everything works as described in the rest of the documentation.
:::

## Introduction

Projects let you split your account into separate spaces, and billing accounts let you choose which wallet pays for each one.

<Unordered>
  <li>A <strong>project</strong> holds compute resources: virtual machines, managed databases, Kubernetes clusters, public IPv4 addresses and GitHub Actions runners.</li>
  <li>A <strong>billing account</strong> is a wallet with its own credits, payments, invoices and billing profile (company, address, tax id, billing email). Each project is paid from one billing account, and several projects can share one.</li>
</Unordered>

Your account itself is the **Default project** and the **Default billing account**. Everything you had before stays there, unchanged, and you don't have to create anything to keep working as before.

Projects work with [shared accounts](/use/console/team): team members can be given access to the whole account, or to one project only.

## Projects

Create a project from the project selector, give it a name and, optionally, a billing account to pay for it. Without one, it is paid from your Default billing account.

Select a project in the console to work in it. VMs, databases, clusters and runners are listed and launched in the selected project. Switching projects is like switching accounts: each one has its own resources.

<Unordered>
  <li><strong>Rename</strong> a project, or <strong>move it to another billing account</strong>, from its settings.</li>
  <li><strong>Archive</strong> a project once it is empty. A project that still owns anything (a VM, a database, a cluster, a public IP, a runner, an S3 bucket or key) cannot be archived: delete its resources first.</li>
</Unordered>

## Billing accounts

Create a billing account from the billing pages. It gets a wallet of its own, separate from your Default one.

<Unordered>
  <li><strong>Top up</strong> a billing account with a card (one-off or recurring) or with Bitcoin, the same way you top up your account.</li>
  <li>Its <strong>billing profile</strong> is printed on its invoices, which are mailed to its billing email, or to you when it has none.</li>
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

Each billing account has a **costs** page: what it paid, per project, per kind of usage (VM time, public IP, bandwidth, backup storage, database and Kubernetes management fees) and per day, for any period up to a year. Download it as **CSV** for your own reporting.

Costs show the hours charged or about to be charged. A project that moved to another billing account appears on each billing account for the hours that one paid.

## Budgets

Set a **monthly budget** on a project, in credits.

<Unordered>
  <li>You get an email when the project's spending for the month reaches each threshold you choose (by default 50%, 90% and 100% of the budget), once per threshold and month.</li>
  <li>Optionally, <strong>stop new launches</strong> once the budget is reached: until the next month, or until you raise the budget, nothing new that costs money can be launched in the project. What already runs keeps running and is billed.</li>
</Unordered>

## Quotas

Your account's [compute quotas](/use/compute/billing#quotas) apply to all your projects together. You can also give a project its **own limits** (number of VMs, vCPUs, memory, disk, databases, clusters, public IPs, runners), within the account's. A launch past a project's limit is refused, even when the account still has room.

## Transferring a project

You can hand a project, with everything it runs, to another Hippius account.

<Ordered>
  <li>From the project's settings, choose <strong>Transfer</strong> and enter the other account's id.</li>
  <li>The owner of that account sees the offer and accepts it, choosing which of their billing accounts will pay for the project. The offer is valid for 7 days, and you can cancel it until it is accepted.</li>
  <li>Once accepted, the project and its resources belong to the other account. Nothing is copied or restarted.</li>
</Ordered>

From the transfer:

<Unordered>
  <li>The project is paid by the other account from the <strong>next hour</strong>. The current hour stays with your billing account.</li>
  <li>The access your team members had to the project, and its budget and quota, are removed.</li>
  <li>A transfer is refused while a billing account involved has unpaid usage, while a billing change of the project is about to take effect, and while the project runs VMs on an old monthly plan.</li>
</Unordered>

## Known limitations

<Unordered>
  <li><strong>S3 and the CDN are not in projects.</strong> Buckets, S3 keys and CDN zones stay at the account level, paid from the Default billing account. Backups of a database or cluster in a project are kept in your account's S3.</li>
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
