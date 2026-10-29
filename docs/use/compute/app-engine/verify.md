---
id: verify
title: Verifying an app
sidebar_label: Verifying an app
slug: /use/compute/app-engine/verify
unlisted: true
displayed_sidebar: docsSidebar
description: Check, with hippius-app-verify, that a Hippius app engine VM runs exactly a given docker compose, from a report signed by the AMD chip. Verdicts and residuals. Beta.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import Screenshot from '@site/src/components/Screenshot';

Anyone can check what an [app engine](/use/compute/app-engine) VM runs: the app's owner, its users or an auditor. The check needs no Hippius account, and doesn't trust Hippius or the server's owner. It relies on the AMD root keys, the published Hippius app image, and the compose file you expect.

:::warning Beta
A verdict proves **integrity of what runs, rooted in AMD**. It doesn't prove that Hippius can't read the app's secrets or volumes: in this phase Hippius can. Every verdict also lists its [residuals](#residuals), the attacks the checks don't close yet.
:::

## What you need

<Unordered>
  <li><strong>The app's evidence address</strong>, <code>http://&lt;public IP&gt;:9080</code>. The app's owner finds it on the app's <strong>Verify</strong> tab in the console. An app without a public IP can't be verified publicly.</li>
  <li><strong>The compose file you expect</strong>, the exact bytes. If the app sets <code>publish_compose: true</code>, the evidence also carries the file, and you can read it from there.</li>
  <li><strong>The verifier</strong>, <code>hippius-app-verify</code>.</li>
</Unordered>

## Install the verifier

:::info Available with the beta
`hippius-app-verify` is published with the app engine beta. This section will then give the download links, the checksums and the source repository to build it from.
:::

<!--
TODO(app-engine verifier release):
- download links per platform, SHA-256 checksums, signature check
- source repository and reproducible build instructions
- the published app image manifests and the pin files, and the flags to pin them
- confirm the flag names (--compose, --allow-unknown-kernel) and the exit codes against the released binary
-->

## Run it

From the folder that holds your copy of the compose file:

```bash
hippius-app-verify http://203.0.113.7:9080 --compose docker-compose.yaml
```

The console shows this exact command, with the app's IP, on the app's **Verify** tab.

<Screenshot src="/img/console/app-engine/verify-tab.png" alt="The app's Verify tab: the hippius-app-verify command, the two verdicts and the three residuals" dark raw />

The verifier:

<Ordered>
  <li>Asks the VM for its evidence, with a fresh random value (a nonce) that the report must answer, so an old report can't be replayed.</li>
  <li>Checks that the report is signed by a genuine AMD SEV-SNP processor, up to AMD's root key, which is built into the verifier.</li>
  <li>Checks the processor's firmware against a minimum security level, and that the VM can't be debugged.</li>
  <li>Recomputes the VM's launch measurement from the published Hippius app image and the VM's measured boot parameters, and requires it to equal the signed one.</li>
  <li>Requires the compose hash in that measurement to equal the SHA-256 of your file, and checks your file against the <a href="/use/compute/app-engine/compose-rules">compose rules</a>.</li>
  <li>Checks the runner's signed observation: which containers run, with which image digests.</li>
</Ordered>

It then prints the verdict with the facts it checked: the processor, its firmware level, the app image, the VM, the compose hash, the services, images and published ports, and the residuals.

When the verifier shows the compose's values, `$$` stands for one literal `$`: `PRICE: "$$5"` reaches the container as `$5`.

## Verdicts

| Verdict | Meaning |
|---|---|
| `launched` | A report signed by the AMD chip says this VM booted the published app image with exactly your compose, byte for byte, and answered your nonce just now. |
| `running — not bound to this connection` | Everything in `launched`, and the measured runner's signed observation says your compose's containers were running, with its image digests and nothing else, when the report was made. |
| Anything else | The verifier names the first check that failed. Don't trust the app then. |

**Why "not bound to this connection".** The check proves that *some* VM runs your compose and answered your nonce. It doesn't bind the TCP connection you used: a relay could pass your request to a genuine VM and serve you something else. Binding the connection to the attested VM is planned for a later phase. Until then, every phase-1 `running` reads **running — not bound to this connection**.

`launched` without `running` usually means the runner refused to start the compose, or hasn't finished. The app's owner sees the reason as the runner's state in the console: see [Deployment status and runtime status](/use/compute/app-engine/deploy#deployment-status-and-runtime-status).

## Residuals

Every verdict lists its residuals: what it still leaves open. This is a beta, and there is no public "verifiable" claim until the first two are closed.

| Residual | Meaning |
|---|---|
| `host-acpi` | The host supplies the VM's ACPI tables (hardware description the kernel reads at boot), and they aren't measured yet. Until the VM's firmware generates them itself, every verdict carries this. |
| `interrupt-injection` | A malicious host can inject interrupts into the VM. Kernel fixes reduce this, but no kernel version is shown to cover every known vector, so every verdict carries it. |
| `kernel-unverified` | Appears only if you allowed a kernel the verifier doesn't know (`--allow-unknown-kernel`). The VM's kernel then wasn't matched against the verifier's table of known distribution kernels. Without that option, an unknown kernel is refused. |

## Not covered in this phase

<Unordered>
  <li><strong>Confidentiality from Hippius.</strong> Hippius can read the app's secrets and volumes.</li>
  <li><strong>The history of the volume data.</strong> A verdict covers what runs, not what the volumes hold or who wrote it.</li>
  <li><strong>What the containers do at runtime.</strong> Code an image downloads, or loads from its volumes, is the app's own behaviour. Read the compose and its images to judge that.</li>
  <li><strong>The connection.</strong> See <a href="#verdicts">why "not bound to this connection"</a>.</li>
</Unordered>

## Look at the evidence yourself

The VM serves two public endpoints on port 9080, over plain HTTP:

| Endpoint | What it returns |
|---|---|
| `/.well-known/hippius/app-evidence?nonce=<64 hex>` | The signed evidence document, JSON. Every request needs a fresh nonce of 32 random bytes in hex. |
| `/status` | The runner's state, each service's container state, image digests and restart counts. No secrets. |

```bash
curl "http://203.0.113.7:9080/.well-known/hippius/app-evidence?nonce=$(openssl rand -hex 32)"
curl http://203.0.113.7:9080/status
```

Reading the evidence by hand checks nothing: only a verifier does. The endpoint is rate-limited per VM.

The console's **App runtime** panel shows the same data, fetched by Hippius and labelled *not verified by Hippius*. A verifier that runs in the browser, on the app's Verify tab, is planned for a later phase.
