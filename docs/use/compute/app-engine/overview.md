---
id: overview
title: App engine (beta)
sidebar_label: Overview
slug: /use/compute/app-engine
unlisted: true
displayed_sidebar: docsSidebar
description: Deploy a docker compose file into an AMD SEV-SNP confidential VM, and let anyone verify that the VM runs exactly that compose. Integrity of what runs, rooted in AMD. Beta.
---

import Unordered from '@site/src/components/Unordered';

The app engine runs a `docker-compose.yaml` you give it inside an AMD SEV-SNP confidential VM. The SHA-256 of your compose file becomes part of the VM's launch measurement, which the AMD processor signs. Anyone, whether you, your users or an auditor, can then check that this VM booted the published Hippius app image with exactly your compose file, byte for byte, and that its containers are the ones running.

What the app engine gives you is **"integrity of what runs, rooted in AMD"**.

:::warning Beta: integrity, not confidentiality from Hippius
The app engine is in beta. It proves **what runs**, not who can read it. In this phase **Hippius can still read your app's secrets and its volumes**. Don't put anything in an app that must stay hidden from Hippius.

The checks still leave a few things open, listed as [residuals](/use/compute/app-engine/verify#residuals) in every verdict. Until the first two are closed there is no public "verifiable" claim: treat a verdict as a strong signal, not a guarantee.
:::

## Who can use it

The beta is open to the accounts taking part in it. If your account is one of them, the console shows **Apps** under **Confidential Computing** in the sidebar. If you don't see it, the app engine isn't available on your account yet.

An app is a [compute VM](/use/compute) like any other. It is billed like a VM of the same size, plus its public IPv4 if it has one: there is no separate price. [Quotas](/use/compute/billing#quotas) and the [24-hour balance requirement](/use/compute/billing#the-24-hour-balance-requirement) apply as for any VM.

## How it works

<Unordered>
  <li><strong>You write a compose file.</strong> It follows a strict subset of the compose format: images pinned by digest, double-quoted values, no variables. See <a href="/use/compute/app-engine/deploy#compose-requirements">compose requirements</a>.</li>
  <li><strong>Hippius launches a sealed VM</strong> from the published app image. The compose file's SHA-256 is written into the VM's measured boot parameters, so changing one byte of the file changes the measurement.</li>
  <li><strong>The runner inside the VM checks the file</strong> against that measured hash before it starts anything, pulls each image by its digest, and starts your services. It never starts part of an app: if a check fails, nothing runs, and the VM reports why.</li>
  <li><strong>The VM serves signed evidence</strong> on TCP port 9080: a report signed by the AMD chip, bound to a fresh value the caller chooses, plus the runner's observation of which containers run.</li>
  <li><strong>Anyone verifies</strong> that evidence with <code>hippius-app-verify</code>, against AMD's root keys, the published app image and their own copy of the compose. No Hippius account and no trust in Hippius or in the server's owner are needed for that check. See <a href="/use/compute/app-engine/verify">Verifying an app</a>.</li>
</Unordered>

## What a verdict proves, and what it doesn't

| Proven | Not proven in this phase |
|---|---|
| The VM runs on a genuine AMD SEV-SNP processor, with firmware at or above a minimum security level. | That Hippius can't read the app's secrets or volumes. Hippius can. |
| The VM booted the published Hippius app image, launched with exactly your compose file. | The history of the data in the volumes. The verifier sees what runs, not what the volumes hold or who wrote it. |
| The runner observed your compose's containers running, with the image digests the compose names, and no other container, when the report was made. | What your containers do at runtime. Code an image downloads, or loads from its volumes, is your app's own behaviour. |
| The report is fresh: it answers the value the verifier just sent. | That the TCP connection you used reaches that VM. A relay could pass on a genuine VM's report. This is why a verdict reads **running — not bound to this connection**. |

## App VMs are sealed

An app VM has no SSH key, no browser terminal and no serial console. Nobody logs in to it, you included. You change what runs only by [updating the compose](/use/compute/app-engine/deploy#update-an-app), which relaunches the VM.

Power operations, resize and backups work as for other VMs. A reboot, a stop and start, or a resize boots the app again with the same compose: the runner checks the file, pulls the images again and starts the services. After a stop and start or a resize the measurement changes; the compose hash doesn't. [Backups](/use/compute/vm-backups) cover the app's volumes only.

## Next steps

<Unordered>
  <li><a href="/use/compute/app-engine/deploy">Deploying an app</a>: the compose requirements, secrets, the public IP, updates and status.</li>
  <li><a href="/use/compute/app-engine/verify">Verifying an app</a>: the verifier, its verdicts and the residuals.</li>
  <li><a href="/use/compute/app-engine/compose-rules">Compose rules reference</a>: every refusal code and what it means.</li>
</Unordered>
