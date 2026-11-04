---
sidebar_position: 8
description: How Hippius confidential computing works today. AMD SEV-SNP virtual machines, attestation and the key broker, disk encryption, what the server owner and Hippius can see, networking, verifiable billing, and the limits of the model.
---

import Unordered from '@site/src/components/Unordered';

# Confidential Computing

Hippius Compute runs your workloads on servers operated by miners, not by Hippius. Confidential computing is what lets you do that without trusting them: every workload runs in an AMD SEV-SNP confidential VM, and the keys to its disk are released only to a VM that proves, with a report signed by the processor, that it runs software Hippius approved.

This page explains how that works, what it protects, from whom, and what it doesn't protect yet. It is written for anyone who has to decide whether Hippius Compute is safe enough for their data. To launch something, start with [Hippius Compute](/use/compute).

---

## Who sees what

Three parties are involved in running your VM: the **server owner** (the miner, with root on the physical machine), the **network** between the machines, and **Hippius**, which runs the control plane, the key broker, the private network and the regional edges.

| | Server owner | Network | Hippius |
|---|---|---|---|
| **VM memory** | Encrypted by the processor | n/a | Not directly |
| **VM disk** | Encrypted bytes only | n/a | Holds the disk key, wrapped, in its key vault ([details](#disk-encryption-and-key-delivery)) |
| **Boot configuration** (your SSH public keys, the private network enrolment key) | Encrypted to the VM | Encrypted to the VM | Yes: Hippius writes it |
| **Your private network traffic** | Encrypted (WireGuard) | Encrypted (WireGuard) | Not directly |
| **Traffic metadata** (addresses, sizes, timing) | Yes | Yes | Yes, for traffic through its edges |
| **That your VM runs, its size, CPU and disk activity** | Yes | Activity, inferred from traffic | Yes |

The server owner can stop your VM and watch how busy it is, but can't read it.

Hippius can't read your VM by simply looking, but it is still part of what you trust: it decides which software may receive keys, and it writes each VM's boot configuration. A malicious or compromised Hippius could run its own code inside your VM. [Trust model and limits](#trust-model-and-limits) lists exactly what you trust.

---

## Confidential VMs

Every VM, database instance, Kubernetes node and runner is an AMD SEV-SNP confidential VM on an AMD EPYC server.

<Unordered>
  <li><strong>Memory is encrypted by the processor</strong>, with a key held in the processor's security co-processor (the AMD Secure Processor). The host operating system, the hypervisor and other VMs on the same server only ever read ciphertext. A memory dump taken by the server owner is unreadable.</li>
  <li><strong>Debugging and migration helpers are disabled.</strong> Both would let the host read the VM's memory. A VM whose launch policy allows either is refused its keys.</li>
  <li><strong>The VM boots a Hippius-built image.</strong> Firmware, kernel, initramfs and kernel command line are loaded directly and measured by the processor. The operating system's base files are read-only and checked block by block against a hash (dm-verity) that is written in the measured command line. Your changes go to a separate encrypted disk.</li>
</Unordered>

---

## Attestation

Attestation is how a VM proves what it is. A VM gets its disk key and its boot configuration only after it passes.

### What is measured

When a VM starts, the AMD Secure Processor computes a **launch measurement**, a 48-byte digest of the firmware, kernel, initramfs and kernel command line it loaded, and of the launch configuration (such as the number of vCPUs). The command line includes the hash of the read-only base system and a value unique to the VM, so each VM has its own measurement.

Changing any of the measured parts changes the measurement. Tampering with the read-only base system stops the boot. What you write to your encrypted disk isn't measured.

The processor signs a report containing that measurement, the launch policy, the chip's identity and 64 bytes chosen by the VM. The signature chains up to AMD's root key (chip key, then AMD's signing key, then AMD's root key), so only a genuine AMD processor can produce it.

### How keys are released

Hippius runs a key broker service (KBS) that releases a VM's secrets at boot. First, the VM generates a fresh key pair in its encrypted memory and asks the processor for a report that includes the public half. The KBS then checks:

<Unordered>
  <li>that the report is signed by a genuine AMD processor;</li>
  <li>that the measurement is on an allowlist signed by Hippius, so only software Hippius approved can get keys;</li>
  <li>that the launch policy is allowed: no debugging, no migration helper;</li>
  <li>that the report comes from the chip the VM was placed on, and matches a signed launch order for this VM and a fresh, single-use challenge;</li>
  <li>that the VM's boot counter has moved forward, so an old copy of the disk can't be booted. The only exception is a one-time rollback the KBS authorizes when you restore a backup from an earlier boot.</li>
</Unordered>

Only then does the KBS encrypt the disk key and the boot configuration to the public key from the report (HPKE, RFC 9180) and send them. Only the VM that made that key can decrypt them, so the server owner, which relays the traffic, sees nothing useful. A VM that fails these checks can't unlock its disk, so it doesn't finish booting.

The KBS itself runs in an SEV-SNP confidential VM, and it has to attest to Hippius's key vault for every release.

### Keepalive while the VM runs

VMs on the current system image send a keepalive every 5 minutes, with a fresh processor report bound to a single-use challenge. The KBS verifies it and records the result. This shows that the VM that received the disk key is still the one running. It doesn't revoke anything: a VM that misses keepalives keeps its keys. Older VMs may have no keepalive record.

### Check a VM's attestation

Each VM's page has a **Confidential Computing** panel with the result. The same data is in the API:

```bash
curl -H "Authorization: Token $TOKEN" \
  https://api.hippius.com/api/compute/vms/VM_ID/attestation/
```

| `verdict` | Meaning |
|---|---|
| `attested` | Hippius holds a KBS-signed proof for the VM's current launch: a recent keepalive, or the evidence of the disk key release. |
| `unknown` | No proof is on record. This is **not** a failure: a VM that fails attestation never gets its disk key. Evidence of the release at boot, for example, isn't kept after a KBS restart. |
| `unavailable` | No recent live proof, and the KBS couldn't be reached. Try again later. |

`attestation_state` gives the detail (`attested-live`, `attested-at-boot`, `stale`, `unavailable`, `unproven`). When the release evidence is still held, `kbs_evidence` contains the raw AMD SEV-SNP report and the AMD certificate chain, so you can check the processor's signature offline. Hippius doesn't provide a verification tool yet.

:::warning What you can't verify yourself yet
You can check that a report is genuine AMD SEV-SNP, with debugging disabled, and that it carries the measurement Hippius recorded. You can't yet check that this measurement is the software you expect: Hippius doesn't publish its reference measurements or reproducible image builds yet, and the API doesn't take a challenge of your own. Today you rely on Hippius's allowlist for that part.
:::

---

## Disk encryption and key delivery

<Unordered>
  <li><strong>Your writable disk is encrypted inside the VM</strong> with LUKS2 (AES-XTS). The VM formats it at first boot and unlocks it at every boot. The server owner only ever stores encrypted bytes: reads and writes leave the VM already encrypted.</li>
  <li><strong>Each VM has its own disk key.</strong> It is generated in Hippius's key vault and stored only wrapped under a vault key for that VM alone. It is unwrapped only inside the KBS, at the moment it is encrypted to an attested VM.</li>
  <li><strong>Deleting a VM crypto-erases it.</strong> Its vault key is destroyed, so its stored disk and every backup of it can no longer be decrypted. The VM is then cut off and stopped: until it stops, its unlocked disk key is still in its own memory.</li>
  <li><strong>Boot configuration travels the same way.</strong> Your SSH public keys and the VM's private network enrolment key are released by the KBS to the attested VM, and never reach the server's disk in clear.</li>
</Unordered>

This means Hippius's KBS and key vault can produce your disk key. Disk keys held by the customer, so that Hippius couldn't open a disk either, are being built and are not available yet.

---

## Product coverage

Every compute product runs on confidential VMs. What changes is who holds which secret.

| Product | What is confidential | What you hold |
|---|---|---|
| [**Virtual machines**](/use/virtual-machines) | Memory and disk, as above. | Your SSH private key. The browser terminal runs SSH in your browser. |
| [**Managed PostgreSQL**](/use/compute/databases) | One or three confidential instances, with no shell on them. | The password, TLS certificates and backup key, shown once at creation. Hippius can't show them again, but it keeps encrypted copies of the password (in the instances' boot configuration) and of the backup key, to recover instances and run restores. |
| [**Managed Kubernetes**](/use/compute/kubernetes) | Three confidential masters run the whole control plane. There is no Hippius-hosted control plane. | The cluster key, generated in your browser. The masters seal the kubeconfig to it and refuse to add a node it didn't sign. |
| [**GitHub Actions runners**](/use/compute/runners) | Each job gets a fresh confidential VM, destroyed when the job ends. It is never on your private network. | Nothing: the VM doesn't outlive the job. |

**Backups.**

<Unordered>
  <li><a href="/use/compute/vm-backups">VM backups</a> are copies of the VM's encrypted disk, stored by Hippius. Only that VM's disk key opens them.</li>
  <li><a href="/use/compute/databases#backups">Database backups</a> are encrypted inside the database, with the backup key, before they reach a bucket in your own Hippius S3 account.</li>
  <li><a href="/use/compute/kubernetes-backups">Kubernetes backups</a> are encrypted inside the cluster, with keys sealed to your cluster key, before they reach your Hippius S3 account.</li>
</Unordered>

### Managed CDN

The [Hippius CDN](/use/cdn) is open to every account and serves from France and Australia. Only Hippius S3 buckets, public or private, can be origins. It is built so that:

<Unordered>
  <li>cache nodes are SEV-SNP confidential VMs, so a miner can't read cached content or certificate keys;</li>
  <li>the fleet's key is held by the KBS and released only into an attested cache node;</li>
  <li>the credentials for reading a private bucket, and the private keys of certificates for your own domains, are stored only sealed to that fleet key;</li>
  <li>TLS ends inside the cache node, and Hippius's edges forward traffic to it without decrypting it. The edge still sees client addresses, the requested host name, sizes and timing.</li>
</Unordered>

Other HTTP(S) origins will come later.

---

## Networking

<Unordered>
  <li><strong>Private network.</strong> Your machines join a private network built on NetBird, which encrypts traffic between them with WireGuard. Hippius runs the network's coordination server: it decides which machines can reach each other and sees their addresses, but not the traffic.</li>
  <li><strong>Public IPv4.</strong> A public address lives on a Hippius edge serving the VM's region (the French edge also serves the Netherlands). The edge forwards packets to the VM over the private network, filters them with your firewall rules, and doesn't decrypt anything. See <a href="/use/compute/networking">Public IPv4 and firewall</a>.</li>
  <li><strong>Published ports.</strong> The edge terminates HTTPS for you, so it can read that traffic. Use a public IPv4 with your own TLS for anything only you should read.</li>
  <li><strong>Outbound traffic.</strong> A VM with a public IPv4 goes out through its edge. Other VMs go out through the server they run on.</li>
  <li><strong>Outbound SMTP (port 25) is blocked by default</strong>, for every VM, with or without a public IPv4. To send mail, <a href="/use/console/support">open a support ticket</a> to have it allowed on a public IPv4 address.</li>
</Unordered>

Each VM's bandwidth is capped by its size, in both directions: 100 Mbit/s for Small, 250 Mbit/s for Medium, 500 Mbit/s for Large and above. A public IPv4 is also capped at 250 Mbit/s. A shared outbound address on the edge, for VMs without a public IPv4, isn't in use yet.

:::warning Encrypt your own traffic end to end
Whoever carries a packet sees its addresses, size and timing: the edge, and for traffic that leaves through a server, the server owner. Anything you send without TLS can also be read on the way. Use TLS (or SSH) for everything that leaves your private network.
:::

---

## Billing you can check

Hippius, not the miner, meters your usage. Each UTC hour is closed shortly after it ends and frozen. Hippius can still correct an hour explicitly before it is sent to the chain. Once it has been sent, it can't be changed.

<Unordered>
  <li>Each hour gets a <strong>usage hash</strong>: the SHA-256 of a canonical document listing every priced line of that hour.</li>
  <li>The amount and the hash are submitted to the Hippius chain (<code>Marketplace.submit_compute_usage</code>), which charges your balance. The chain keeps one record per hour and account, and refuses a second, different hash for the same hour.</li>
  <li>Each charged hour is checked against the chain's record.</li>
</Unordered>

To check an hour yourself, fetch the month from the API and recompute each hash from the lines it returns:

```python
import hashlib, json, requests

TOKEN = "your API token"
r = requests.get("https://api.hippius.com/api/compute/usage/",
                 params={"month": "2026-10"},
                 headers={"Authorization": f"Token {TOKEN}"})
for hour in r.json()["hours"]:
    doc = {"version": 1, "period": hour["period"],
           "total": hour["total"], "lines": hour["lines"]}
    body = json.dumps(doc, sort_keys=True, separators=(",", ":"), ensure_ascii=True)
    assert hashlib.sha256(body.encode()).hexdigest() == hour["usage_hash"]
```

This shows the lines you see are exactly the ones hashed. To check what you were charged, compare the hour's `total` and `usage_hash` with the chain's record: the `Marketplace.ComputeUsageCharged` storage, keyed by `period` (the hour's number since the Unix epoch, start time ÷ 3600) and your account.

The hash proves what was charged and that it wasn't changed afterwards. It doesn't prove the metering itself, which Hippius measures. Prices and statuses are explained in [Billing and quotas](/use/compute/billing).

---

## Trust model and limits

**What you trust:**

<Unordered>
  <li><strong>AMD</strong>: the processor, its security firmware and its signing keys.</li>
  <li><strong>Hippius</strong>: the images it builds and allowlists, the KBS and key vault that hold your disk key, the boot configuration it gives your VMs, the private network's coordination server, the edges, and the console code that runs in your browser.</li>
</Unordered>

**What you don't have to trust:**

<Unordered>
  <li><strong>The server owner</strong>: its operating system, hypervisor, disks and administrators.</li>
  <li><strong>Other tenants</strong> on the same server.</li>
  <li><strong>The network</strong> between servers, edges and Hippius.</li>
</Unordered>

**What confidential computing doesn't protect against:**

<Unordered>
  <li><strong>A malicious or compromised Hippius</strong>, for the reasons above.</li>
  <li><strong>Availability.</strong> A server owner can always stop or slow down your VM, or switch the machine off.</li>
  <li><strong>Metadata.</strong> That your VM runs, its size, how busy it is, and where its traffic goes.</li>
  <li><strong>Side channels</strong> on the processor, which are an active research area.</li>
  <li><strong>Bugs in your own software</strong>, and data you send unencrypted.</li>
</Unordered>

**Not available yet:**

<Unordered>
  <li>Disk keys held by the customer, which would take Hippius out of the disk key path.</li>
  <li>Published reference measurements and reproducible image builds, so you could check the measurement yourself.</li>
  <li>Attestation against a challenge of your own, through the API.</li>
  <li>A minimum processor firmware version. The KBS refuses a firmware downgrade below what a VM launched with, but doesn't enforce an absolute floor.</li>
</Unordered>

To report a weakness in any of this, write to `infos@hippius.com`.
