---
id: team
title: Shared Accounts
sidebar_label: Shared Accounts
slug: /use/console/team
description: Share your Hippius account's compute, S3 and CDN with team members. Invite people by email, give each one Viewer, Operator or Admin access per product, switch between accounts, read the audit trail, and use the X-Hippius-Account header from the API.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';

## Introduction

A shared account lets other people work in your Hippius account, each signed in with their own login. You invite them by email and choose, product by product, what each one may do: your virtual machines, databases, Kubernetes clusters, GitHub Actions runners, S3 and CDN.

The account stays yours. Everything a member creates belongs to your account and is paid from your balance, and the compute they launch counts against your [compute quotas](/use/compute/billing#quotas). Members keep their own account next to yours, and switch between the two from the profile menu.

Open it from the sidebar: **Team** → **Members**.

:::info Drive isn't part of a shared account
A shared account covers compute, S3 and CDN only. To work on files together, use [Shared Drives](/use/console/shared-drives): they have their own invitations and roles. In another account, Drive, Hub, Wallet and Referrals are hidden.
:::

## What a member can do

Each member gets a level per product. A higher level includes the lower ones.

| Level | What it allows |
|---|---|
| **Viewer** | Read only: see the resources, their status and their settings. |
| **Operator** | Act on what exists: start, stop and reboot VMs, open the browser terminal, turn VM backups on or off, restart a database, cancel or resume a Kubernetes operation, upload and delete S3 objects. |
| **Admin** | Create, delete and resize, restore from a backup, firewall rules, public IPv4 and published ports, Kubernetes worker pools and nodes, S3 buckets, bucket access and access keys, runner settings and the GitHub link. |

The products you can grant are **Virtual Machines**, **Databases**, **Kubernetes**, **Runners**, **S3** and **CDN**. Two groups set several at once:

<Unordered>
  <li><strong>All compute</strong>: Virtual Machines, Databases, Kubernetes and Runners.</li>
  <li><strong>All storage</strong>: S3.</li>
</Unordered>

The CDN is in neither group: grant it on its own. A CDN operator can purge the cache and re-check a domain's DNS. A CDN admin can create, edit and delete zones, custom domains, rules and spend caps. A zone in front of a private bucket also needs S3 admin, because it creates a read key on the bucket.

When a group and a product both apply, the higher level wins. A product left at **No access** is hidden from the member's sidebar.

Two permissions sit next to the levels:

| Permission | What it allows |
|---|---|
| **Manage the team** | Invite, change and remove members, revoke invitations, and read the audit trail. A manager can only give access they hold themselves, can't change their own access, and can't change or remove anyone whose access goes beyond theirs. |
| **Billing** | Read the account's balance, invoices, compute usage and billing summary, and S3 plan history. Payments stay with the owner. |

### What only the owner can do

Some actions stay with the owner, whatever a member's level:

<Unordered>
  <li><strong>Create a Kubernetes cluster.</strong> A cluster is bound to its creator's key file, so one created by a member couldn't be opened by the owner.</li>
  <li><strong>Open a cluster's kubeconfig and backups</strong>, and the node operations signed with the cluster's key file: adding or replacing nodes and accepting data loss. A Kubernetes admin can still scale a pool down, remove a node, cancel an operation and delete the cluster.</li>
  <li><strong>Add money to the balance.</strong> A member is told to ask the owner.</li>
  <li><strong>Buy, change or cancel an S3 or Drive plan.</strong></li>
  <li><strong>Manage the team</strong>, unless the owner gives that permission to a member. Nobody can remove the owner or change the owner's access.</li>
</Unordered>

:::note Database credentials
A database's password, certificates and backup key are shown once, to whoever creates or restores it. If a member with Databases **Admin** creates a database, the member gets the credentials, not the owner. Store them where the team can find them.
:::

## Invite a member

<Ordered>
  <li>Go to <strong>Team</strong> → <strong>Members</strong> and click <BgStyledText>Invite member</BgStyledText>.</li>
  <li>Enter the person's email.</li>
  <li>Pick a level for each product or group, and tick <strong>Manage the team</strong> or <strong>Billing</strong> if they need it. The line at the bottom of the dialog sums up the access.</li>
  <li>Click <BgStyledText>Send invitation</BgStyledText>.</li>
</Ordered>

The person gets an email with a link. The invitation:

<Unordered>
  <li>is valid for <strong>7 days</strong>;</li>
  <li>works <strong>once</strong>;</li>
  <li>is replaced if you invite the same address again: the earlier link stops working.</li>
</Unordered>

If the email couldn't be sent, the console says so: revoke the invitation and try again later.

Pending invitations are listed under **Pending invitations**, with their access and expiry date. Click **Revoke** to cancel one. By default, an account can have up to 50 members and pending invitations together.

## Accept an invitation

Open the link in the email. The page shows who invited you, to which account, and the access you would get. Sign in if you aren't, then click <BgStyledText>Accept invitation</BgStyledText>.

The invitation is for one address. Accepting it checks that this address is one of the **verified** email addresses of the account you are signed in with. Signing in with Google, GitHub or Apple verifies the email address of that login.

<Unordered>
  <li><strong>The address doesn't match.</strong> The page says the invitation was sent to another address. Click <strong>Sign in with another account</strong> and use the one it was sent to.</li>
  <li><strong>Your account has no verified email</strong>, for example a 12-word access key login. The page asks you to confirm that the invitation was meant for you. Click <strong>Accept anyway</strong> only if it was. The audit trail records that it was accepted without an email.</li>
</Unordered>

Once you have joined, choose **Open this account** to switch to it now, or **Stay in your own account**.

A link that was already used, withdrawn or older than 7 days no longer works. Ask the person who invited you for a new one.

## Switch accounts

Open the profile menu. Under **Accounts**, **Your account** comes first, then each account you belong to, with your product access in it. A check mark shows where you are.

While you work in another account:

<Unordered>
  <li>the profile card says <strong>In</strong> followed by the account's name;</li>
  <li>the Overview page lists what you may do in that account, with <strong>Back to your account</strong>;</li>
  <li>the sidebar only shows the products you have access to, and <strong>Billing</strong> and <strong>Compute Usage</strong> only with the Billing permission;</li>
  <li>everything you open, create and change is the account's, and each change is recorded in its audit trail.</li>
</Unordered>

A page that belongs to your own account, such as Drive, says **Not part of this account**. Switch back from the profile menu to open it.

When you launch a VM in another account with Virtual Machines **Admin**, you can pick your own SSH keys or the owner's, listed as **Keys of** the account.

## Change or remove a member

On **Team** → **Members**, each member is listed with their access and who added them.

<Unordered>
  <li>Click <strong>Edit</strong> to change their access, then <BgStyledText>Save access</BgStyledText>.</li>
  <li>Click <strong>Remove</strong> to take every access away. They are moved back to their own account.</li>
</Unordered>

Removing a member doesn't delete anything they created: it belongs to the account.

## Leave an account

A member can leave at any time:

<Unordered>
  <li>in the account, on <strong>Team</strong> → <strong>Members</strong>, click <strong>Leave this account</strong>;</li>
  <li>or, from your own account, under <strong>Accounts you belong to</strong>, click <strong>Leave</strong>.</li>
</Unordered>

Only a new invitation can bring your access back.

## Audit trail

The **Audit trail** section of **Team** → **Members** lists, newest first, every change a member makes in the account and every team change, with the date, who did it, the action and, when there is one, what it was done to and the IP address. The owner and members with **Manage the team** can read it.

It records:

<Unordered>
  <li>each successful change a member makes, such as stopping a VM or creating a bucket. What was sent is never recorded;</li>
  <li>a member opening a VM's browser terminal;</li>
  <li>a member creating an S3 upload link;</li>
  <li>invitations created and revoked, members joining, changed, removed or leaving.</li>
</Unordered>

The owner's own product actions aren't recorded here.

## Billing and quotas

<Unordered>
  <li><strong>The owner pays.</strong> What a member launches is billed to the account, by the hour, from the owner's balance. See <a href="/use/compute/billing">Compute billing</a>.</li>
  <li><strong>The owner's quotas apply.</strong> A member's launches count against the account's quotas and its <a href="/use/compute/billing#the-24-hour-balance-requirement">24-hour balance requirement</a>, not the member's own.</li>
  <li><strong>Alerts go to the owner.</strong> Low balance, unpaid usage and VM emails are sent to the owner only.</li>
</Unordered>

## For developers: the API

The account API acts on your own account by default. To act in an account you are a member of, send its id in the `X-Hippius-Account` header, with your own token:

```bash
curl https://api.hippius.com/api/compute/vms/ \
  -H "Authorization: Token YOUR_TOKEN" \
  -H "X-Hippius-Account: acct_0a1b2c3d4e5f60718293"
```

<Unordered>
  <li><strong>Account ids.</strong> <code>GET /api/accounts/</code> lists your own account first, then each account you belong to, with its <code>id</code> (<code>acct_</code> followed by 20 hex characters) and your access in it (<code>effective</code>, the level per product). This route ignores the header.</li>
  <li><strong>No header, or your own id</strong>: you act as yourself, exactly as before.</li>
  <li><strong>Routes that can't be used in another account</strong> refuse the header with <code>account_scope_unsupported</code>. This includes Drive and top-ups. Personal routes, such as <code>/api/ssh-keys/</code>, ignore it.</li>
  <li><strong>The VM terminal WebSocket</strong> takes the account as an <code>account=</code> query parameter next to <code>token=</code>. A refusal closes the socket with code <code>4003</code>.</li>
  <li><strong>Switching accounts</strong> changes what the same URLs return. Clear any cached responses.</li>
</Unordered>

A refusal is a `403` with a sentence in `error` and a code in `code`:

| `code` | Meaning |
|---|---|
| `not_a_member` | You aren't (or are no longer) a member of that account, or it doesn't exist. Drop the header. |
| `account_scope_unsupported` | This route can't be used in another account. Don't send the header to it. |
| `owner_only` | Only the owner can do this. |
| `insufficient_grant` | Your level is too low. `scope` and `level` say what is needed. |
| `team_management_required` | Needs the **Manage the team** permission. |
| `billing_required` | Needs the **Billing** permission. |

The team itself is managed under `/api/accounts/`: `members/`, `invites/` and `audit/`. The routes and their fields are in the [interactive API docs](/use/api).

## Where to next

<Unordered>
  <li><a href="/use/compute">Compute</a>: what members can run in the account.</li>
  <li><a href="/use/compute/billing">Compute billing and quotas</a>: what the account pays for.</li>
  <li><a href="/use/console/shared-drives">Shared Drives</a>: share files in Drive.</li>
</Unordered>
