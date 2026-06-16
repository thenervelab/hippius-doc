---
id: virtual-machines
title: Virtual Machines
sidebar_label: Virtual Machines
slug: /use/console/virtual-machines
description: 5
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';

## Coming soon

Virtual Machines on the Hippius Console are **coming soon**. This page will be updated with the full guide once the feature is live.

{/*
  ───────────────────────────────────────────────────────────────────────
  ORIGINAL DOCUMENTATION — preserved for future release.
  To publish: delete the "Coming soon" section above and this comment
  wrapper (the opening line and the closing line at the very bottom).
  The image lines below were un-commented so this block stays valid; comment
  them back out if the matching screenshots are not yet available.
  ───────────────────────────────────────────────────────────────────────

## Introduction

The **Virtual Machines** page is where you create and manage compute instances on Hippius. Every VM runs inside an **AMD SEV-SNP enclave**, a hardware encrypted memory boundary that keeps your workloads private even from the host infrastructure.

From this page you can launch new VMs, start, stop, reboot, and delete existing ones, connect via SSH, and manage the SSH keys tied to your account.

Reach Virtual Machines from the sidebar at <BgStyledIconWithText text="Confidential Computing" icon="SidebarVm" /> → <BgStyledIconWithText text="Virtual Machines" icon="SidebarVm" />.

:::note Beta Access Required
Virtual Machines is currently only available to beta users. To request access, contact our team. If your account doesn't have access yet, the page shows a waiting list state instead of the create flow.
:::

For the technical details on how AMD SEV-SNP enclaves work, see [Confidential Computing](/learn/confidential-computing).

![Virtual Machines page](/img/console/vm/overview.png)

## Navigating the Page

The page has three tabs:

- **Instances**: all the VMs you've created, with their status, Nebula IP, and actions.
- **Templates**: a read only grid of available VM sizes and their per hour credit costs. Browse this to choose a size before creating a VM.
- **SSH Keys**: the public keys registered to your account. You'll need at least one before you can create a VM.

## Choosing a VM Size

Before creating a VM, check the **Templates** tab to find the size that fits your workload. Templates are grouped into tiers:

| Tier | Templates |
|---|---|
| **Starter** | Spark, Pulse |
| **Standard** | Cipher, Vault |
| **High capacity** | Fortress, Titan, Sovereign |

Each template card shows CPU cores, RAM, storage, and the hourly credit cost.

![Templates tab](/img/console/vm/templates.png)

## Creating a VM

:::warning Minimum credit balance required
You need at least **10 credits** in your account before you can launch a VM. Top up from [Billing](/use/console/billing) if needed.
:::

<Ordered>
  <li>Click <BgStyledText>+ New VM</BgStyledText> in the top right corner.</li>
  <li>Click <BgStyledText>Set Up Virtual Machine</BgStyledText> on the template card you want, or browse the Templates tab first and pick one from there.</li>
</Ordered>

### Step 1: Configure

<Ordered>
  <li>Enter a <strong>name</strong> for your instance.</li>
  <li>Select an <strong>Operating System</strong>.</li>
  <li>Select an <strong>Image</strong> for the OS you picked.</li>
  <li>(Optional) Pick an <strong>Application</strong> to pre install, such as Docker.</li>
  <li>Select an <strong>SSH Key</strong> for access. If you don't have one yet, click <BgStyledText>Create New SSH Key</BgStyledText> (see <a href="#managing-ssh-keys">Managing SSH Keys</a> below).</li>
  <li>Click <BgStyledText>Next</BgStyledText>.</li>
</Ordered>

![Create VM step 1](/img/console/vm/create-step-1.png)

### Step 2: Review and Launch

Confirm the template, OS, image, application, and the hourly cost. Click <BgStyledText>Create Virtual Machine</BgStyledText> to launch, or <BgStyledText>Go Back</BgStyledText> to adjust anything.

The VM appears in the **Instances** tab in the **Pending** state and transitions through **Starting** → **Running** over the next minute or two. Click the refresh icon to check for status updates.

![Create VM step 2](/img/console/vm/create-step-2.png)

## Managing Instances

Each VM row in the Instances tab has an action menu (three dots):

<Unordered>
  <li><strong>Start</strong>: available when the instance is stopped. The VM begins booting.</li>
  <li><strong>Stop</strong>: gracefully shuts down the VM. Stopped VMs don't accrue runtime charges, but storage charges still apply.</li>
  <li><strong>Reboot</strong>: restarts the VM without deleting it.</li>
  <li><strong>Delete</strong>: permanently removes the VM and all its data. This cannot be undone.</li>
</Unordered>

Each action opens a confirmation dialog before doing anything.

:::note Access Console
Direct in browser console access is coming soon. For now, use SSH to connect to your VM.
:::

![Instance options](/img/console/vm/instance-actions.png)

## Connecting via SSH

Once your VM status shows **Running**, you can connect from your terminal.

Find the **Nebula IP** in the Instances table. That's the address you SSH into. The default username for every Hippius VM is `hippius`.

**macOS / Linux:**

```bash
ssh hippius@nebula_ip
```

**Windows (PowerShell):**

```powershell
ssh hippius@nebula_ip
```

If your SSH key is in a non default location, add the `-i` flag:

```bash
ssh -i ~/.ssh/id_ed25519 hippius@nebula_ip
```

### SSH Troubleshooting

**Permission denied (publickey):** Check that you added the correct _public_ key to Hippius and that you're connecting with the matching private key. Ensure private key permissions are tight: `chmod 600 ~/.ssh/id_ed25519`.

**Connection timeout:** Verify the VM status is **Running** and the Nebula IP is copied directly from the instance row. Check that your firewall isn't blocking outbound port 22.

**Wrong username:** The default user is `hippius`, not `root`, `ubuntu`, or your own username.

![SSH connection terminal](/img/console/vm/ssh.png)

## Managing SSH Keys

SSH keys are managed in the **SSH Keys** tab. You need at least one registered key before you can create a VM.

:::note
Only OpenSSH public keys are accepted (`ssh-rsa`, `ssh-ed25519`, etc.). Never paste your private key.
:::

### Adding a Key

<Ordered>
  <li>Open the <BgStyledText>SSH Keys</BgStyledText> tab.</li>
  <li>Click <BgStyledText>+ New SSH Key</BgStyledText>.</li>
  <li>Enter a <strong>Key Name</strong> and paste your OpenSSH <strong>public key</strong>.</li>
  <li>Click <BgStyledText>Create Key</BgStyledText>.</li>
</Ordered>

![Create SSH key dialog](/img/console/vm/create-ssh-key.png)

### Generating a New Key Pair

If you don't have an SSH key yet, generate one on your computer:

**macOS / Linux:** open Terminal and run:

```bash
ssh-keygen
```

Accept the default file location (`~/.ssh/id_ed25519`) and optionally set a passphrase. To see your public key afterwards:

```bash
cat ~/.ssh/id_ed25519.pub
```

**Windows:** open PowerShell and run:

```powershell
ssh-keygen
```

Accept the default location (`C:\Users\username\.ssh\id_ed25519`). To see your public key:

```powershell
type C:\Users\username\.ssh\id_ed25519.pub
```

Copy the entire output. That's what you paste into Hippius.

### Deleting a Key

Open the action menu on any key row and select <BgStyledText>Delete SSH Key</BgStyledText>, then confirm. You cannot delete a key that is currently attached to a running VM.

![Delete SSH key](/img/console/vm/delete-ssh-key.png)

## Where to next

<Unordered>
  <li><a href="/use/console/billing">Billing</a>: top up credits to launch and run VMs.</li>
  <li><a href="/learn/confidential-computing">Confidential Computing</a>: how AMD SEV-SNP enclaves work.</li>
</Unordered>

  ───────────────────────────────────────────────────────────────────────
*/}
