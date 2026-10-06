---
id: kubernetes
title: Managed Kubernetes
sidebar_label: Clusters
slug: /use/compute/kubernetes
description: Create a managed Kubernetes cluster on Hippius with three confidential control-plane nodes. Understand the cluster key file, download your kubeconfig, restrict API access, and know what is and isn't included.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';

Hippius managed Kubernetes gives you an RKE2 cluster whose control plane runs on three confidential VMs. Its admin credentials are sealed to a key generated in your browser, so Hippius never holds them in the clear. This page explains how the cluster is built, the key file you must keep, and how to create a cluster and reach its API.

Open it from the sidebar: **Confidential Computing** → **Kubernetes**.

## How a cluster is built

<Unordered>
  <li><strong>Three masters.</strong> Every cluster has three control-plane nodes ("masters") running RKE2 with embedded etcd, each on its own confidential VM. There is no single-master option. Each master has its own public IPv4 address for the Kubernetes API, on port 6443.</li>
  <li><strong>One region.</strong> All three masters run in the country you choose. etcd commits every write on a majority of the masters, so they have to be close to each other.</li>
  <li><strong>Kubernetes version.</strong> New clusters run RKE2 <code>v1.34.3+rke2r1</code>.</li>
  <li><strong>Networking.</strong> The nodes talk to each other over your private network, with the Canal network plugin.</li>
</Unordered>

### Compact or standard

| Mode | Masters | Your workloads run on |
|---|---|---|
| **Compact** (default) | Schedulable | The three masters. Add worker pools later if you need more. |
| **Standard** | Control plane only (tainted `NoSchedule`) | Worker pools. Pods stay Pending until a pool has nodes. |

### Master sizes

| Size | Each master is a VM of size |
|---|---|
| **Small** (default) | Medium |
| **Medium** | Large |
| **Large** | X-Large |

The create form shows each size's vCPUs, memory, disk and price per master.

### What isn't included yet

:::warning Plan for these before you move a workload
<Unordered>
  <li><strong>No load balancers and no ingress controller.</strong> <code>Service type=LoadBalancer</code> isn't supported, no ingress controller is installed, and worker nodes have no public IP. There is no built-in way yet to publish a workload to the internet.</li>
  <li><strong>No default storage class.</strong> Bring your own storage manager, such as Longhorn, on the nodes' local disks. <code>/var/lib/longhorn</code> is already on each node's encrypted data disk. Larger nodes give better storage performance.</li>
  <li><strong>No upgrades yet.</strong> A cluster stays on the version it was created with, and the kubeconfig can't be reissued.</li>
  <li><strong>API access ranges are set at creation.</strong> They can't be changed afterwards.</li>
</Unordered>
:::

## The cluster key file

When you create a cluster, the console generates a key file in your browser: `hippius-cluster-NAME.key`. Hippius only ever receives its public half.

You need the key file to:

<Unordered>
  <li>get the cluster's kubeconfig and server token, which the masters seal to your key;</li>
  <li>open the cluster's backups (etcd snapshots and the Velero backup keys);</li>
  <li>sign worker pool and node operations. The masters refuse a node you didn't sign.</li>
</Unordered>

:::danger A lost key file can't be recovered
Nobody, Hippius included, can recover or reset it. If you lose it, the cluster keeps running and a kubeconfig you already downloaded keeps working. But the sealed secrets and backups can never be opened again, and you can't add or replace nodes. You can still remove nodes, unless a node holds local data: accepting that loss needs a signature from your key.
:::

Keep the key file somewhere safe and backed up, for example in a password manager. Keep the server token with it.

## Create a cluster

Click <BgStyledText>New cluster</BgStyledText>. The form is one page in five steps, with a **Summary** panel on the side.

<Ordered>
  <li><strong>Name and region.</strong> A name of lowercase letters, digits and hyphens, up to 40 characters, for example <code>prod-eu</code>. It names the key file too. Then pick the country all three masters run in. The form tells you if no server there can take a master of the size you chose.</li>
  <li><strong>Control plane.</strong> Choose <strong>Compact</strong> or <strong>Standard</strong>, and the <strong>Master size</strong>. Prices are for the three masters and their three public IPv4 addresses.</li>
  <li><strong>API access.</strong> Add the IPv4 ranges allowed to reach the Kubernetes API. See <a href="#restrict-api-access">Restrict API access</a>.</li>
  <li><strong>Cluster key.</strong> Click <BgStyledText>Download hippius-cluster-NAME.key</BgStyledText>, store the file, and tick the box to confirm you stored it.</li>
  <li><strong>Add-ons.</strong> Leave <strong>Automatic backups to your Hippius S3</strong> on, unless you have your own backups. Backups can only be turned on at creation. They need an S3 account; see <a href="/use/compute/kubernetes-backups">Kubernetes backups</a>.</li>
</Ordered>

Check the **Summary** and click <BgStyledText>Create cluster</BgStyledText>. Worker pools are added after the cluster is running; see [Worker pools](/use/compute/kubernetes-worker-pools).

The cluster's page shows its progress: **Masters booted**, **Private network joined**, **RKE2 installed**, **Masters found each other**, **Kubernetes API ready**, **Kubeconfig sealed to your key** and **Masters ready**.

The quota and [24-hour balance](/use/compute/billing#the-24-hour-balance-requirement) checks apply to the three masters and their public IPv4 addresses. A cluster uses three of your public IPv4 quota.

## Restrict API access

Only the IPv4 ranges you list can reach the Kubernetes API on port 6443. Everything else is blocked, both at the network edge and on the masters.

<Unordered>
  <li>Add at least one range, and at most 20.</li>
  <li>Add the public address you run <code>kubectl</code> from as a <code>/32</code>, for example <code>203.0.113.7/32</code>. Searching "what is my IP" in a browser shows it.</li>
  <li>Add the addresses of anything else that calls the API, such as your CI.</li>
</Unordered>

You can allow `0.0.0.0/0`, but the console warns you: your API is then open to the whole internet, and only its certificates protect it.

:::note Ranges can't be changed later
The ranges are fixed when the cluster is created. Include every address you'll need, such as a fixed office or VPN address.
:::

## Get your kubeconfig

The masters seal the kubeconfig to your key 5 to 10 minutes after they are up.

<Ordered>
  <li>On the cluster's page, in the <strong>Kubeconfig</strong> panel, click <strong>Load key file</strong> and choose your <code>hippius-cluster-NAME.key</code>. The console checks it belongs to this cluster.</li>
  <li>Click <BgStyledText>Download kubeconfig</BgStyledText>. You get <code>NAME-kubeconfig.yaml</code>.</li>
  <li>Click <BgStyledText>Download server token</BgStyledText> too, and store it with your key file. You need it to restore the cluster from an etcd snapshot.</li>
</Ordered>

The signature is checked and the file is decrypted in your browser. Neither your key nor the kubeconfig is sent anywhere. You can download the kubeconfig again whenever you need it, as long as you have the key file.

Then use it:

```bash
export KUBECONFIG=$PWD/NAME-kubeconfig.yaml
kubectl get nodes
```

The kubeconfig authenticates as the cluster administrator with a client certificate. It has one context per master, `m0`, `m1` and `m2`, and `m0` is selected. If a master is down, switch to another:

```bash
kubectl config use-context m1
```

:::warning Treat the kubeconfig as a root password
It can't be revoked or reissued yet. Anyone who has it, and can reach the API from an allowed address, is cluster administrator.
:::

## Delete a cluster

On the cluster's page, click <BgStyledText>Delete</BgStyledText>, type the cluster's name and click <BgStyledText>Delete cluster</BgStyledText>. The three masters, the workers and everything running on them are destroyed. This can't be undone. Billing stops when you ask to delete.

Backup buckets that hold backups are kept in your S3 account; see [After you delete a cluster](/use/compute/kubernetes-backups#after-you-delete-a-cluster).

## Billing

A cluster costs its VMs, like any VM, plus a management fee of $15 per cluster per month, whatever its size or number of workers. The VMs are the three masters at their size's price, their three public IPv4 addresses at $0.005 an hour each, and each worker at its size's price. The smallest control plane, three Medium masters, comes to $192 + about $11 for the addresses + $15 = about $218 a month, before workers. Backups are billed as S3 storage in your account, at your S3 price. See [Management fees](/use/compute/billing#management-fees) and the [live price list](https://console.hippius.com/dashboard/billing/compute#prices).

If your compute usage stays unpaid, see [If your balance runs out](/use/compute/billing#if-your-balance-runs-out).

In a [shared account](/use/console/team), only the owner can create a cluster and open its kubeconfig and backups: they need the owner's key file.

## What you trust Hippius with

The cluster is designed so that after launch, Hippius has no way in: no readable kubeconfig, no certificate authority, and no way to add a node or open an access without a signature from your key. Some trust remains:

<Unordered>
  <li><strong>The launch.</strong> The public halves of your key are handed to the masters when the cluster is created, and the server token passes through Hippius once at that moment.</li>
  <li><strong>The console code</strong> that generates your key and decrypts your secrets is served by Hippius.</li>
  <li><strong>Adding workers.</strong> Until node attestation ships, a worker's join token passes through Hippius on its way to the new node. The private network limits who could use it, but that network is also operated by Hippius.</li>
  <li><strong>Placement.</strong> The three masters are not yet guaranteed to run on three different servers.</li>
</Unordered>

## Where to next

<Unordered>
  <li><a href="/use/compute/kubernetes-worker-pools">Worker pools</a>: add, scale and replace nodes.</li>
  <li><a href="/use/compute/kubernetes-backups">Kubernetes backups</a>: etcd snapshots and Velero, and how to restore them.</li>
</Unordered>
