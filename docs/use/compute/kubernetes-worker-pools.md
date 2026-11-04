---
id: kubernetes-worker-pools
title: Kubernetes Worker Pools
sidebar_label: Worker pools
slug: /use/compute/kubernetes-worker-pools
description: Add worker pools to a Hippius managed Kubernetes cluster, scale them up and down with operations signed by your cluster key, replace or remove nodes, and handle nodes that hold local data.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';

Worker pools add nodes to your cluster for your workloads. A pool is a group of identical nodes: same size, same labels, same taints. You need at least one pool with nodes on a **standard** cluster, and you can add pools to a **compact** cluster when the masters aren't enough.

Everything here is in the **Node pools** and **Operations** panels on the cluster's page, once the cluster is running. Keep your [cluster key file](/use/compute/kubernetes#the-cluster-key-file) at hand: adding a node needs it.

## Why node operations are signed

Every node you add is signed in your browser with your cluster key. The masters check the signature against the key they were given at launch, and refuse any node you didn't sign. That way, Hippius can't add a machine of its own to your cluster.

A signature covers exactly what you approved: the pool, the node size, the Kubernetes version, the labels and the taints. It is valid for 50 minutes and can only be used once.

Removing nodes and cancelling operations don't open any access, so they don't need the key. The exception is accepting the loss of a node's local data, which is signed (see [Operations, drains and local data](#operations-drains-and-local-data)).

## Add a pool

<Ordered>
  <li>In <strong>Node pools</strong>, click <BgStyledText>Add pool</BgStyledText>.</li>
  <li>Give the pool a <strong>Name</strong> of up to 20 lowercase letters, digits and hyphens, for example <code>workers</code>.</li>
  <li>Choose the <strong>Node size</strong>. Every node in the pool is a VM of this size, billed like any VM.</li>
  <li>Optionally, add labels and taints. Taints take the form <code>key=value:NoSchedule</code>, with the effect <code>NoSchedule</code>, <code>PreferNoSchedule</code> or <code>NoExecute</code>.</li>
  <li>Click <BgStyledText>Create pool</BgStyledText>.</li>
</Ordered>

The pool starts empty. Scale it to add nodes.

:::note Labels and taints are fixed
Labels and taints can't be changed after the pool is created, because every node signs them. Labels under `kubernetes.io/` or `k8s.io/`, or with a prefix containing `hippius`, aren't allowed. A pool can have up to 20 labels and 10 taints.
:::

Worker nodes have no public IP address. They reach the masters and each other over your private network.

## Scale a pool

<Ordered>
  <li>Click <BgStyledText>Scale</BgStyledText> on the pool.</li>
  <li>Set the number of <strong>Nodes</strong>, from 0 to 50.</li>
  <li>To add nodes, load your key file if asked and click <BgStyledText>Sign and add N nodes</BgStyledText>. To remove nodes, click <BgStyledText>Remove N nodes</BgStyledText>.</li>
</Ordered>

**Adding nodes.** Nodes join one after another. If a node hasn't started within the 50 minutes its signature is valid, it is rejected and shown in **Operations**. Scale again to add it.

**Removing nodes.** Adds that are still queued are cancelled first. Then the newest nodes are cordoned, drained and deleted.

The quota and [24-hour balance](/use/compute/billing#the-24-hour-balance-requirement) checks apply to the nodes you add. Worker nodes count against your vCPU, memory and disk quotas, but not your VM count.

To get rid of a pool's nodes, scale it to 0. A pool can't be deleted.

## Replace or remove a node

Each node in a pool has two actions:

<Unordered>
  <li><strong>Replace</strong> adds a new node of the same size to the pool first. Once it is Ready, the old node is drained and removed. Both are billed while they overlap. Click <BgStyledText>Sign and replace</BgStyledText> to confirm.</li>
  <li><strong>Remove</strong> cordons and drains the node, then deletes its VM. The pool shrinks by one.</li>
</Unordered>

The masters can't be replaced or removed yet.

## Operations, drains and local data

Node changes run one at a time per cluster, in order. The **Operations** panel lists them with their state. A queued operation can be cancelled.

Drains are never forced. Two things can make an operation stop and wait for you:

**A disruption budget blocks the drain.** Fix the pods the panel lists: relax the PodDisruptionBudget, scale the workload, or delete unmanaged pods. Then click **Resume** to retry the drain.

**The node holds local data.** Data in `local` or `hostPath` volumes, `emptyDir` and similar is not backed up, and would be lost with the node. The removal stops before anything is lost and waits in **Operations**. You can:

<Unordered>
  <li>click <strong>Cancel</strong> to keep the node and its data, or</li>
  <li>click <strong>Accept data loss</strong>, type the node's name, load your key file, and click <BgStyledText>Sign and destroy the data</BgStyledText>. Accepting the loss is signed with your key, like adding a node.</li>
</Unordered>

:::tip Keep stateful data off a single node
If you run your own storage manager, such as Longhorn, keep at least two replicas of each volume, so that replacing or removing one node never takes your only copy.
:::

## Why a node change can be refused

| Message | What to do |
|---|---|
| The cluster is not running. | Node changes are accepted only while the cluster is running or degraded, and not suspended. |
| A node of this pool is being added or replaced. | Scale down once it has finished. |
| A pool named NAME exists. | Choose another name. |
| The signature has expired, or doesn't verify. | Scale again: the console signs a new operation. Check that you loaded this cluster's key file. |
| This cluster was launched before node operations existed. | Its masters can't run node operations. Create a new cluster to use worker pools. |
| Over your compute quota, or balance too low. | See [Billing and quotas](/use/compute/billing). |
