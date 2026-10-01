---
sidebar_position: 5
title: How Arion stores your data
description: How Hippius stores your data on Arion, its distributed storage network. Erasure coding, CRUSH placement, proof of storage, repair, and what is encrypted where.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';

# How Arion stores your data

Drive, S3 Storage and Hub are what you see. Underneath, your data lives on **Arion** — a storage network built for it — and Confidential Computing (coming soon) keeps its encrypted backups there too. This page explains how a file is split, placed, checked and repaired across the network, and what is encrypted at each step.

## The short version

When you upload a file:

<Ordered>
  <li>It is split into <strong>30 pieces</strong> (10 data + 20 parity) with Reed-Solomon erasure coding</li>
  <li>Each piece is placed on a different miner by the <strong>CRUSH algorithm</strong></li>
  <li>To download, only <strong>10 of the 30 pieces</strong> are needed — the other 20 are redundancy</li>
</Ordered>

Up to 20 miners can fail at the same time and your file is still fully recoverable.

## Architecture

```
You
 │ HTTPS
 ▼
Gateway          ← HTTP ingress, handles auth and chunking
 │ P2P
 ▼
Validator (:3002)        ← encodes with Reed-Solomon, runs CRUSH placement
 │ QUIC (Iroh)
 ├──► Miner A  ← piece 1
 ├──► Miner B  ← piece 2
 ├──► Miner C  ← piece 3
 │    ...
 └──► Miner N  ← piece 30

Warden           ← audits miners with proof-of-storage challenges
Chain Submitter  ← publishes cluster maps to the Hippius chain
```

## Reed-Solomon erasure coding

Files are encoded with Reed-Solomon, **k=10, m=20**, in 2 MiB stripes:

<Unordered>
  <li>10 data pieces carry the original content</li>
  <li>20 parity pieces allow reconstruction when data pieces are lost</li>
  <li>Any 10 of the 30 pieces rebuild the original file</li>
  <li>Tolerates up to <strong>20 miners failing at once</strong></li>
</Unordered>

## CRUSH placement

Instead of a central index that answers "which miner has piece 7?", CRUSH computes the answer from a cluster map. This means:

<Unordered>
  <li><strong>No central lookup</strong> — any node can compute where a piece lives on its own</li>
  <li><strong>Deterministic</strong> — the same input always gives the same placement</li>
  <li><strong>Topology-aware</strong> — pieces are spread across different miners to reduce correlated failures</li>
</Unordered>

The cluster map is published to the Hippius chain by the chain submitter, so placement is verifiable and tamper-resistant.

## Network layer (Iroh and QUIC)

Pieces travel over **QUIC** connections using [Iroh](https://iroh.computer/):

<Unordered>
  <li>Encrypted and authenticated by default</li>
  <li>Multiplexed — several pieces transfer in parallel over one connection</li>
  <li>Direct UDP paths between nodes with hole-punching, relay fallback when needed</li>
  <li>Each miner's identity is its Ed25519 public key</li>
</Unordered>

## Proof of storage

A miner does not just claim to hold your pieces; it has to prove it, continuously.

<Ordered>
  <li>When a piece is stored, it is split into chunks, each chunk is hashed, and the hashes form a Merkle tree. The root of that tree is the piece's commitment.</li>
  <li>The <strong>Warden</strong> picks pieces to audit and, every 30 seconds, challenges miners on 4 random chunks of a piece.</li>
  <li>The miner answers with a zero-knowledge proof, built with Plonky3, that it holds exactly those chunks. It has 60 seconds.</li>
  <li>The Warden verifies the proof against the commitment. A failed proof or a timeout counts against the miner's reputation, which feeds its on-chain score and rewards.</li>
</Ordered>

The audited set is re-sampled every hour, so a miner cannot predict which pieces will be checked.

## Automatic repair

The **Validator** runs a rebuild agent that:

<Ordered>
  <li>Monitors miner health through heartbeats</li>
  <li>Detects when a miner goes offline</li>
  <li>Fetches 10 pieces from the remaining miners</li>
  <li>Reconstructs the missing pieces</li>
  <li>Places them on new miners with CRUSH</li>
</Ordered>

## What is encrypted, and where

Arion moves and stores bytes; it does not decide what they mean. Encryption happens in the product above it, before anything reaches the network:

<Unordered>
  <li><strong>Drive</strong> encrypts on your device. Only you hold the key, and the recovery seed restores it. Nobody at Hippius can read your files.</li>
  <li><strong>S3 Storage</strong> encrypts at rest with AES-256-GCM, every chunk under its own key, and those keys are wrapped by a key management service. The S3 gateway decrypts when you download.</li>
  <li><strong>Confidential Computing</strong> (coming soon): a virtual machine's disk lives on the miner's own machine, encrypted with a key held only inside the VM — the host cannot read it. Its backups are encrypted before they reach Hippius S3.</li>
</Unordered>

In both cases, miners only ever hold encrypted pieces. A miner cannot read your data, and a single miner never holds enough pieces to rebuild a file.

## Using it

You never talk to Arion directly. Drive does it for you in the console and the apps, and S3 Storage does it behind a standard S3 API: `aws s3 cp`, boto3, rclone all work as they do anywhere.

- [Store your first file in Drive](/use/drive)
- [Create your first S3 bucket](/use/quickstart)
- [Run a storage miner](/earn/storage-miner)
