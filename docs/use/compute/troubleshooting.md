---
id: troubleshooting
title: Compute Troubleshooting
sidebar_label: Troubleshooting
slug: /use/compute/troubleshooting
description: What Hippius Compute refusals and errors mean and what to do about them, from beta access, balance and quota refusals to failed launches, unpaid usage and API error codes.
---

import Unordered from '@site/src/components/Unordered';

When the console refuses something, it says why. This page groups the messages you are most likely to meet, what they mean, and what to do. Product-specific refusals are also listed on each product's page.

## I don't see Compute, or it says "Feature Not Available"

Compute is in closed beta. **Feature Not Available** with **VM feature is in beta. Contact support for access.** means your account isn't in the beta yet. Kubernetes and Runners have their own betas: their entries only appear in the sidebar once your account has access.

[Contact support](/use/console/support) to ask for access.

## "Not enough balance for this launch"

Your balance must cover 24 hours of everything you run, plus what you are launching. The message tells you how much to add. Top up from [Billing](/use/console/billing), then launch again. See [the 24-hour balance requirement](/use/compute/billing#the-24-hour-balance-requirement).

If the message says your balance doesn't cover 24 hours of the compute **you already run**, you have to top up before you can launch anything, or delete what you no longer need.

**"Your balance could not be read just now"** means we couldn't check your balance. Nothing was launched. Try again in a moment.

## "This launch is over your compute quota"

The launch would take your account over one of its limits. The message names each limit, how much you use and how much the launch adds. Delete what you no longer need, or ask support to raise your limits. Stopped VMs count too. See [Quotas](/use/compute/billing#quotas).

## "No verified server in this region" or "No server can take this size"

There is no server with room for what you asked, where you asked for it.

<Unordered>
  <li>Pick another region, or <strong>Automatic (any region)</strong> for a VM.</li>
  <li>Pick a smaller size.</li>
  <li>Try again later: capacity changes.</li>
</Unordered>

A Kubernetes cluster always needs a region, because its three masters run in one country.

## "No public IPv4 address is free right now"

All public addresses are in use. Launch without one and attach it later from the VM's page, or try again later. You can still reach the VM from the browser with the **Console** tab.

## A VM launch failed

If a VM ends up **Failed**, its page explains why:

| Explanation | What to do |
|---|---|
| No verified server in this region right now. | Try another region. |
| No compute node can take this VM right now. | This is capacity, not your configuration. Try again shortly, or pick a smaller size. |
| No compute node has room for this size right now. | Try a smaller size, or again shortly. |
| That image is not available on the compute nodes. | Pick another image. |
| The compute node did not answer in time. | Nothing was charged. Try again. |
| The node could not prove it is running confidential hardware. | The launch was refused to protect you. Try again. |

A VM is only billed from the first time it runs. Delete a failed VM to remove it from your list.

## I can't connect over SSH

See [SSH troubleshooting](/use/virtual-machines#ssh-troubleshooting). In short: use the image's username, not `root`; check that the VM has a public IPv4 and a firewall rule allowing port 22 from your address; or use the browser **Console** tab.

## A power action is refused: "only a running VM can be powered"

The VM hasn't finished provisioning, or is being deleted. Wait until it is **Running**. If a resize or a restore is running, wait for it to finish.

## "This VM is being resized; delete it once the resize has finished"

A VM can't be deleted during a resize. Wait for the resize to end, then delete it.

## "Your compute usage is unpaid"

Your account owes compute usage, and some of your services were stopped for it. Starting or launching anything is refused until you pay. Top up: the amount owed is collected automatically, and what was stopped starts again by itself within about an hour. See [If your balance runs out](/use/compute/billing#if-your-balance-runs-out).

## "This service is suspended for unpaid compute"

You have paid, and the database or cluster is waiting to start again. It restarts by itself within the hour. Nothing to do.

## "Your account is being deleted"

New resources can't be created while your account deletion is pending. Cancel the deletion first if you want to keep using Compute.

## Error codes in API responses

If you call the API directly, refusals come with an HTTP status and, for most of them, a machine-readable code. It is in `code`, or in `error` with a sentence in `detail` for the public IPv4, firewall, resize and backup endpoints. The most common:

| Code | HTTP status | Meaning |
|---|---|---|
| `compute_quota` | 409 | Over a quota. The body lists `exceeded`, `limits` and `used`. |
| (no code) | 402 | Balance below 24 hours of compute. The body has `required_credits` and `balance`, in dollars. |
| (no code) | 503 | The balance couldn't be read. Retry. |
| `compute_arrears` | 402 | Unpaid compute usage; services are stopped. Top up. |
| `compute_arrears_suspended` | 409 | Paid; the database or cluster restarts within the hour. |
| `account_deletion_pending` | 409 | The account is being deleted. |
| `no-free-public-ip` | 409 | No public IPv4 is free. |
| `public-ip-unavailable` | 503 | Public IPv4 can't be offered right now. |
| `vm-not-live` | 409 | The VM must be running for this action. |
| `firewall-changed` | 409 | The firewall rules changed since you read them. Read them again. |
| `resize-in-flight` | 409 | The VM is being resized. |
| `resize-cooldown` | 429 | The VM was resized a moment ago. `retry_after_s` says when to retry. |
| `job-in-flight` | 409 | Another operation is running on the VM. |
| `no-operator` | 409 | The cluster can't run node operations. Create a new cluster to use worker pools. |
