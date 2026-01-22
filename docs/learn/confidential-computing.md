---
sidebar_position: 8
description: Confidential computing on Hippius using AMD SEV-SNP, TPM attestation, and encrypted VMs.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';

# Confidential Computing

Hippius Confidential Compute (HCC) enables you to run workloads inside hardware-encrypted virtual machines using AMD SEV-SNP technology. Every VM runs with encrypted memory that even the host system cannot read, verified through continuous TPM attestation and integrity measurements.

If you are looking for general VM provisioning and lifecycle guidance, see [VM Computing](vm-computing).

---

## Key Characteristics

| Feature                        | Description                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------- |
| **Hardware Memory Encryption** | AMD SEV-SNP encrypts VM memory at the hardware level - the host cannot read it  |
| **Continuous Attestation**     | HCCAM agent continuously proves VM integrity via TPM quotes and SEV-SNP reports |
| **Binary Integrity**           | TPM + IMA (Integrity Measurement Architecture) detects any binary tampering     |
| **Encrypted Storage**          | LUKS2 disk encryption with keys delivered securely via vsock                    |
| **Secure Networking**          | Nebula mesh VPN (100.64.0.0/10) for encrypted overlay communication             |
| **Miner Reputation**           | On-chain scoring system tracks miner reliability with rewards and penalties     |

---

## Goals and Non-Goals

### Goals

<Unordered>
  <li>Confidentiality and integrity for workloads running on untrusted miner hardware</li>
  <li>Continuous attestation proving VMs run unmodified on genuine SEV-SNP hardware</li>
  <li>Encrypted disk storage with secure key delivery to VMs</li>
  <li>Tamper detection for miner binaries via TPM/IMA measurements</li>
  <li>Reputation-based miner selection and reward distribution</li>
</Unordered>

### Non-Goals

<Unordered>
  <li>General bare-metal attestation (VMs only, using libvirt/QEMU)</li>
  <li>The host/miner never sees plaintext VM memory or encryption keys</li>
  <li>No dependency on centralized cloud infrastructure</li>
</Unordered>

---

## Glossary

| Term        | Definition                                                                                          |
| ----------- | --------------------------------------------------------------------------------------------------- |
| **SEV-SNP** | Secure Encrypted Virtualization with Secure Nested Paging - AMD's hardware VM encryption            |
| **TPM**     | Trusted Platform Module - hardware security chip for attestation and measurements                   |
| **IMA**     | Integrity Measurement Architecture - Linux kernel feature measuring binary hashes at execution time |
| **HCCAM**   | Hippius Confidential Computing Attestation Module - agent running inside each VM                    |
| **vsock**   | Virtual socket for direct guest-host communication without a network stack                          |
| **LUKS**    | Linux Unified Key Setup - standard Linux disk encryption                                            |
| **TCB**     | Trusted Computing Base - the firmware/software versions verified during attestation                 |
| **VCEK**    | Versioned Chip Endorsement Key - AMD certificate proving genuine SEV-SNP hardware                   |
| **PCR**     | Platform Configuration Register - TPM registers extended with integrity measurements                |

---

## Trust Model

HCC establishes a clear trust boundary:

**Trusted:**

<Unordered>
  <li>AMD SEV-SNP hardware and vendor certificate chain (ARK → ASK → VCEK)</li>
  <li>Hippius validator and Nebula CA running on secure infrastructure</li>
  <li>The guest VM after successful attestation</li>
</Unordered>

**Untrusted:**

<Unordered>
  <li>Miner host operating systems and hypervisors</li>
  <li>Storage systems (data is encrypted)</li>
  <li>Network between miners and Hippius (protected by Nebula VPN)</li>
</Unordered>

---

## Core Components

The Hippius Confidential Computing Stack (HCCS) consists of specialized components working together:

| Component          | Role                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------- |
| **hcc-validator**  | Central orchestrator for miner registration, VM lifecycle, and attestation verification |
| **hcc-miner**      | Host-side VM manager that spawns SEV-SNP encrypted VMs using QEMU/KVM                   |
| **hccam**          | Guest attestation agent verifying SEV-SNP environment and reporting to validators       |
| **hcc-nebula-ca**  | Certificate authority for the Nebula mesh VPN overlay network                           |
| **hcc-vm-courier** | VM agent handling firewall rules and certificate management inside user VMs             |

All components are written in Rust for security and performance.

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         HCCS Network                            │
│                                                                 │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
│  │ hcc-nebula-ca│    │hcc-validator │    │  Lighthouses │       │
│  │ (100.64.0.100)    │ (100.64.0.5) │    │ (100.64.0.1-3)       │
│  │              │    │              │    │              │       │
│  │ Issues       │    │ Orchestrator │    │ Nebula       │       │
│  │ Nebula certs │    │ Attestation  │    │ Discovery    │       │
│  └──────────────┘    └──────────────┘    └──────────────┘       │
│         │                    │                    │             │
│         └────────────────────┼────────────────────┘             │
│                              │ Nebula VPN (encrypted)           │
│         ┌────────────────────┼────────────────────┐             │
│         │                    │                    │             │
│  ┌──────▼──────┐      ┌─────▼──────┐      ┌─────▼──────┐        │
│  │  hcc-miner  │      │ hcc-miner  │      │ hcc-miner  │        │
│  │  (AMD EPYC) │      │ (AMD EPYC) │      │ (AMD EPYC) │        │
│  │             │      │            │      │            │        │
│  │ ┌─────────┐ │      │ ┌────────┐ │      │ ┌────────┐ │        │
│  │ │ HCCAM VM│ │      │ │User VMs│ │      │ │User VMs│ │        │
│  │ │(attest) │ │      │ │(SEV-SNP│ │      │ │(SEV-SNP│ │        │
│  │ └─────────┘ │      │ └────────┘ │      │ └────────┘ │        │
│  └─────────────┘      └────────────┘      └────────────┘        │
└─────────────────────────────────────────────────────────────────┘
```

---

## How Attestation Works

HCC uses a multi-layer attestation model that verifies both the hardware and software integrity:

### Attestation Flow

<Ordered>
  <li>**HCCAM requests system info** from the host miner via vsock (no network required).</li>
  <li>**Miner generates a TPM quote** containing IMA measurements of all executed binaries.</li>
  <li>**HCCAM verifies the TPM signature** and checks that the miner binary hash matches expected values.</li>
  <li>**HCCAM generates an SEV-SNP attestation report** proving it runs on genuine AMD hardware.</li>
  <li>**HCCAM sends the combined attestation** to the validator via the miner (over Nebula VPN).</li>
  <li>**Validator verifies everything** and updates the miner's reputation score.</li>
</Ordered>

```
┌─────────────────────────────────────────────────────────────────┐
│                    ATTESTATION FLOW                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐                                           │
│  │   HCCAM (Guest)  │ ──1──▶ Request system info via vsock      │
│  │   Inside SEV-SNP │                                           │
│  │   Encrypted VM   │ ◀──2── Receive TPM quote + IMA + system   │
│  │                  │                                           │
│  │  ┌─────────────┐ │                                           │
│  │  │ Verify TPM  │ │ ──3──▶ Verify TPM signature + IMA hashes  │
│  │  │ signature   │ │                                           │
│  │  └─────────────┘ │                                           │
│  │                  │                                           │
│  │  ┌─────────────┐ │                                           │
│  │  │ Generate    │ │ ──4──▶ Create SEV-SNP attestation report  │
│  │  │ SNP report  │ │                                           │
│  │  └─────────────┘ │                                           │
│  └────────┬─────────┘                                           │
│           │                                                     │
│           │ vsock + Nebula VPN                                  │
│           ▼                                                     │
│  ┌──────────────────┐        ┌──────────────────┐               │
│  │  Miner (Host)    │ ─────▶ │    Validator     │               │
│  │  Relays to       │        │  Verifies:       │               │
│  │  Validator       │        │  - SEV-SNP report│               │
│  └──────────────────┘        │  - TPM chain     │               │
│                              │  - IMA hashes    │               │
│                              │  - Binary match  │               │
│                              └────────┬─────────┘               │
│                                       │                         │
│                              Updates reputation                 │
│                              Returns next interval              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### What Gets Verified

| Check                | Purpose                                                        |
| -------------------- | -------------------------------------------------------------- |
| **SEV-SNP Report**   | Proves VM runs on genuine AMD SEV-SNP hardware                 |
| **VCEK Certificate** | Validates AMD certificate chain (ARK → ASK → VCEK)             |
| **TPM Quote**        | Proves miner binary has not been modified                      |
| **IMA Measurements** | Verifies hashes of all executed binaries match expected values |
| **TCB Versions**     | Ensures firmware meets minimum security requirements           |

---

## Security Model

### Threat Protection

| Threat                  | Mitigation                                                      |
| ----------------------- | --------------------------------------------------------------- |
| **Compromised Host OS** | SEV-SNP encrypts VM memory at hardware level - host cannot read |
| **Modified Miner**      | TPM/IMA attestation detects any binary tampering                |
| **VM Downgrade**        | Measurement verification fails if VM is modified                |
| **Malicious Miner**     | Reputation system tracks reliability with slashing penalties    |
| **Network MITM**        | Nebula mesh VPN encrypts all communication                      |
| **Data Exfiltration**   | Per-VM firewall rules restrict network access                   |

### HCCAM Security Guarantees

The HCCAM agent enforces strict security at startup:

<Unordered>
  <li>**Refuses to start** if `/dev/sev-guest` is missing (not running on SEV-SNP)</li>
  <li>**Panics on failure** if SEV-SNP attestation report generation fails</li>
  <li>**Rejects** if VCEK certificate chain validation fails</li>
  <li>**Aborts** if measurements don't match expected values</li>
</Unordered>

This "fail-secure" design ensures no workload runs in an insecure environment.

---

## Disk Encryption and Key Delivery

Disk encryption is a critical component of confidential computing - it ensures data at rest is protected even when running on untrusted miner hardware. This section covers the technical implementation details.

:::info
For a quick overview of what disk encryption means for your VMs, see [VM Computing - Disk Encryption](vm-computing#disk-encryption).
:::

### Encryption Specifications

| Feature            | Specification                                    |
| ------------------ | ------------------------------------------------ |
| **Format**         | LUKS2 (Linux Unified Key Setup)                  |
| **Cipher**         | AES-256-XTS                                      |
| **Key Derivation** | Argon2id (memory-hard, resistant to GPU attacks) |
| **Key Length**     | 512-bit encryption keys                          |
| **Per-VM Keys**    | Each VM has a unique encryption key              |

### How Keys Are Delivered

VMs use LUKS2 disk encryption with keys delivered securely:

<Ordered>
  <li>**Key Generation**: Validator generates a unique 512-bit LUKS key for each VM.</li>
  <li>**Image Creation**: VM disk image is encrypted with LUKS2 during build.</li>
  <li>**Boot Request**: VM initramfs requests the LUKS key via Nebula VPN.</li>
  <li>**Secure Relay**: Miner forwards the request to the validator (never sees the key).</li>
  <li>**Direct Delivery**: Key is delivered directly into the VM's encrypted memory (SEV-SNP protected).</li>
  <li>**Disk Unlock**: VM decrypts its root filesystem and boots normally.</li>
</Ordered>

The miner host **never** sees plaintext encryption keys - they are delivered directly to the encrypted VM memory.

### Key Delivery Flow

```
┌──────────────────────────────────────────────────────────────┐
│                  LUKS KEY DELIVERY FLOW                      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────────────┐                                        │
│   │   Validator     │  Generates and stores unique           │
│   │   (Trusted)     │  LUKS key per VM                       │
│   └────────┬────────┘                                        │
│            │                                                 │
│            │ Key delivered via Nebula VPN                    │
│            │ (encrypted overlay network)                     │
│            │                                                 │
│            ▼                                                 │
│   ┌─────────────────────────────────────────────┐            │
│   │              MINER HOST                     │            │
│   │   ┌─────────────────────────────────────┐   │            │
│   │   │     SEV-SNP Encrypted VM            │   │            │
│   │   │  ┌──────────────────────────────┐   │   │            │
│   │   │  │  Initramfs fetches key       │   │   │            │
│   │   │  │  directly into encrypted     │   │   │            │
│   │   │  │  memory at boot              │   │   │            │
│   │   │  └──────────────────────────────┘   │   │            │
│   │   │         │                           │   │            │
│   │   │         ▼                           │   │            │
│   │   │  ┌──────────────────────────────┐   │   │            │
│   │   │  │  LUKS decrypts root disk     │   │   │            │
│   │   │  │  VM boots normally           │   │   │            │
│   │   │  └──────────────────────────────┘   │   │            │
│   │   └─────────────────────────────────────┘   │            │
│   │                                             │            │
│   │   Miner host CANNOT see:                    │            │
│   │   - Encryption keys (in VM memory)          │            │
│   │   - Decrypted disk contents                 │            │
│   │   - VM memory (SEV-SNP encrypted)           │            │
│   └─────────────────────────────────────────────┘            │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Security Guarantees

| Benefit                  | Description                                                   |
| ------------------------ | ------------------------------------------------------------- |
| **Data Confidentiality** | Even if miner hardware is seized, your data remains encrypted |
| **No Key Exposure**      | Miner host never sees plaintext keys or data                  |
| **Unique Keys Per VM**   | Compromise of one VM doesn't affect others                    |
| **Hardware-Backed**      | Combined with SEV-SNP, keys exist only in encrypted VM memory |
| **Automatic**            | Encryption is enabled by default - no configuration needed    |

### Disk Operations Security

Even operations like disk resize maintain security:

<Unordered>
  <li>**Miner-side resize**: Only expands the QCOW2 image and GPT partition</li>
  <li>**LUKS resize**: Happens inside the VM where the key is available</li>
  <li>**No key transmission**: The miner never receives the LUKS key during resize</li>
</Unordered>

---

## Networking

### Nebula Mesh VPN

All HCC communication uses the Nebula overlay network:

<Unordered>
  <li>**IP Range**: 100.64.0.0/10 (private overlay network)</li>
  <li>**Protocol**: WireGuard-based encryption</li>
  <li>**Certificate Authority**: hcc-nebula-ca issues certificates to all nodes</li>
  <li>**Discovery**: Lighthouse nodes enable peer discovery</li>
</Unordered>

### Network Isolation

| Component              | Network Access                                  |
| ---------------------- | ----------------------------------------------- |
| **VMs**                | Isolated per-VM bridges with NAT                |
| **Miner-to-Validator** | Nebula overlay only (no public IP required)     |
| **User VMs**           | Configurable egress via hcc-vm-courier firewall |

---

## Miner Reputation System

Validators track miner reliability through a reputation system:

### Scoring Factors

| Factor                     | Impact                                     |
| -------------------------- | ------------------------------------------ |
| **Successful Attestation** | Increases reputation                       |
| **Failed Attestation**     | Decreases reputation significantly         |
| **TPM Failure**            | Major penalty - potential slashing         |
| **IMA Hash Mismatch**      | Severe penalty - binary tampering detected |
| **Uptime**                 | Consistent availability improves score     |
| **Resource Usage**         | Actual usage vs. claimed capacity          |

### Attestation Intervals

Higher-reputation miners attest less frequently (10–30 minutes), while new or low-reputation miners attest more often. Failed attestations trigger immediate re-checks.

---

## Economic Model

HCC aligns with Hippius's usage-based emission model:

<Unordered>
  <li>**Rewards match real work**: Miners earn based on actual CPU hours and storage consumed</li>
  <li>**Excess α burned**: Unused emissions are burned to reduce supply</li>
  <li>**Oracle pricing**: α/USD exchange rates set via on-chain oracles</li>
  <li>**Pay-per-use**: Each VM pays miners for resources actually consumed</li>
</Unordered>

This ensures fair compensation for confidential compute without overpayment for idle capacity.

---

## Hardware Requirements

### For Miners Running HCC

| Requirement       | Specification                                  |
| ----------------- | ---------------------------------------------- |
| **CPU**           | AMD EPYC 7003+ with SEV-SNP support            |
| **TPM**           | TPM 2.0 module (hardware)                      |
| **BIOS Settings** | AMD Memory Encryption enabled, SEV-SNP enabled |
| **Kernel**        | Linux 5.19+ with SEV-SNP and IMA support       |
| **Hypervisor**    | QEMU with SEV-SNP support, libvirt             |

### Verifying SEV-SNP Availability

```bash
# Check SEV-SNP is enabled in kernel
cat /sys/module/kvm_amd/parameters/sev_snp
# Should output: Y

# Verify TPM is accessible
sudo tpm2_getrandom --hex 16
```

---

## Quantum-Safe Encryption

Hippius is preparing for the post-quantum era:

<Unordered>
  <li>**New uploads** use quantum-safe encryption by default</li>
  <li>**Existing files** are upgraded automatically over time</li>
  <li>**No workflow changes** - encryption happens transparently</li>
  <li>**Key protection** uses quantum-resistant algorithms</li>
</Unordered>

This ensures your data stays confidential even when quantum computers mature.

---

## Why Confidential Computing Matters

Traditional cloud computing requires trusting the infrastructure provider with your data. With HCC:

<Unordered>
  <li>**Data stays encrypted** in memory, at rest, and in transit</li>
  <li>**Miners cannot read** your workload or data</li>
  <li>**Attestation proves** VMs run unmodified on genuine hardware</li>
  <li>**Reputation systems** ensure reliable miners are rewarded</li>
  <li>**No central trust** - cryptographic proofs replace blind faith</li>
</Unordered>

This enables sensitive workloads (financial data, healthcare, AI training) to run on decentralized infrastructure without compromising confidentiality.

---

## Continue with VMs

For VM creation, sizing, and access, follow [Virtual Machines](/use/virtual-machines). For compute architecture and how VMs integrate with Hippius, see [VM Computing](vm-computing).
