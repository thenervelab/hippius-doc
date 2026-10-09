---
id: virtual-machines
title: Virtual Machines
sidebar_label: Create and connect
slug: /use/virtual-machines
description: Create a confidential virtual machine on Hippius, add your SSH keys, connect over SSH or from the browser, and start, stop, reboot or delete it.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';

A Hippius virtual machine is a Linux server that runs inside an AMD SEV-SNP enclave, so the host can't read its memory or its disk. This guide takes you from an SSH key to a running VM you are logged in to. It takes about ten minutes, most of it waiting for the VM to boot.

Open VMs from the sidebar: **Confidential Computing** → <BgStyledIconWithText text="Virtual Machines" icon="SidebarVm" />. The page has three tabs: **Instances** (your VMs), **Templates** (the sizes you can launch) and **SSH Keys** (the public keys saved to your account).

:::info Before you start
<Unordered>
  <li>Your balance must cover 24 hours of your compute, including the new VM. The create form tells you if it doesn't. See <a href="/use/compute/billing#the-24-hour-balance-requirement">the 24-hour balance requirement</a>.</li>
  <li>You need an SSH key pair. If you don't have one, generate it first (next section).</li>
</Unordered>
:::

## Generate an SSH key pair with ssh-keygen

Your VM has no password login: you sign in with an SSH key. The key pair has two halves. The **private key** stays on your computer, and you give Hippius the **public key**.

On macOS, Linux or Windows (PowerShell), run:

```bash
ssh-keygen -t ed25519
```

Press Enter to accept the default location (`~/.ssh/id_ed25519`, or `C:\Users\YOUR_NAME\.ssh\id_ed25519` on Windows). You can set a passphrase to protect the private key.

Then print the public key and copy the whole line:

```bash
cat ~/.ssh/id_ed25519.pub
```

On Windows PowerShell, use `type $env:USERPROFILE\.ssh\id_ed25519.pub` instead. The line starts with `ssh-ed25519`.

:::warning Use an ed25519 or RSA key
Saved keys must be OpenSSH public keys of type `ssh-ed25519`, `ssh-rsa`, `ecdsa-sha2-nistp256` (or `-nistp384`, `-nistp521`), or a security key (`sk-ssh-ed25519@openssh.com`, `sk-ecdsa-sha2-nistp256@openssh.com`). Never paste your private key anywhere: it is the only way into your VM, and nobody, Hippius included, can recover or reissue it.
:::

## Create a virtual machine

On the **Instances** tab, click <BgStyledText>+ New VM</BgStyledText>. The create page is one form in numbered steps, with a **Summary** panel that keeps the price, your quota and your balance up to date as you choose.

### 1. Choose an image

Pick what the VM starts from. Use the switch at the top of the step to choose between:

<Unordered>
  <li><strong>Distributions</strong>: a plain Linux distribution, such as Ubuntu, Debian or Fedora. The list comes from the images available right now. <strong>Size default</strong> boots the image the chosen size uses by default.</li>
  <li><strong>Applications</strong>: software that is installed and configured for you on first boot, such as WordPress. An application picks its own image, and may need a minimum size. When you select one, its settings appear below it.</li>
</Unordered>

Some applications are **managed services**: Hippius administers the machine, so it has no shell and takes no SSH key. The form tells you when that is the case.

### 2. Choose a region

Leave **Automatic (any region)** to let the network place the VM on any verified server, or pick a country to pin it there. Only countries with a verified server that has room right now are listed.

Under the list, the form tells you whether your choice can launch now. If a region is tight, launching may take longer. If no server in the region can take the size you chose, pick another region or a smaller size.

### 3. Choose a size

Each size card shows its vCPUs, memory (RAM), disk and its price per hour and per month. The **Templates** tab lists the same sizes. Select a size to see its price broken down into vCPU, memory and disk.

A size can be greyed out. **Coming soon** means it isn't available yet. **Too small for** an application means the application needs a bigger size. The region message means no server in that region can take it right now.

:::note The disk can't grow later
You can [resize](/use/compute/resize) the vCPUs and memory of a VM later, but its disk keeps the size it was launched with. Pick a size whose disk is big enough.
:::

### 4. Authentication

Select every SSH key that should be able to log in. Each selected key can log in as the VM's default user. Saved keys show their name and fingerprint.

To add a key here, click **Add new key**, give it a name (for example `laptop`), paste the public key and click <BgStyledText>Save and select</BgStyledText>. It is saved to your account for next time.

You can select up to 20 keys per VM. You must select at least one, unless you picked a managed service.

### 5. Add-ons

These are optional. Each one is added to the price in the summary.

<Unordered>
  <li><strong>Automatic backups</strong>: encrypted copies of the disk, kept 7 days, taken at the interval you choose. They turn on once the VM is running. See <a href="/use/compute/vm-backups">VM backups</a>.</li>
  <li><strong>Public IPv4</strong>: a dedicated public address for this VM. Inbound traffic is blocked unless a firewall rule allows it. It is off by default.</li>
  <li><strong>Open SSH (port 22) to the internet</strong>: shown once you tick Public IPv4, and on by default. It creates a firewall rule named <code>SSH (opened at launch)</code> that lets anyone reach port 22. Ping (ICMP) is always allowed. You can restrict or delete that rule later; see <a href="/use/compute/networking#restrict-ssh-to-your-own-address">Restrict SSH to your own address</a>.</li>
</Unordered>

Without a public IPv4, the VM can't be reached from the internet. You can still open a shell from the browser, and you can attach an address later. See [Public IPv4 and firewall](/use/compute/networking).

### 6. Finalize details

Give the VM a **Name** of up to 64 characters, such as `web-1`.

To keep VMs of the same service on different servers, give them the same **placement group** (`placement_group`), set at creation only. See [Placement groups](/use/compute/vm-failover#placement-groups).

### Review and launch

Check the **Summary** panel. It lists the image, region, size, SSH keys, add-ons and the total per hour and per month. Below that it shows your quota after the launch and your balance.

If your balance doesn't cover 24 hours of your compute with this VM, the form says so and holds the button. Top up from the link it shows, then come back. See [the 24-hour balance requirement](/use/compute/billing#the-24-hour-balance-requirement).

Click <BgStyledText>Create VM</BgStyledText>. The console says **Virtual machine launching** and opens the VM's page.

## Follow the boot

The VM's status starts at **Pending**, then moves to **Provisioning** and **Running**. The **Boot Phase** goes from **Booting** to **Disk unsealed** (the VM passed attestation and its encrypted disk was unlocked) and then to **Running**. A first boot usually takes a few minutes.

If the launch fails, the VM's page says why and what to try, for example another region or a smaller size. Nothing is billed for a VM that never ran. See [Troubleshooting](/use/compute/troubleshooting#a-vm-launch-failed).

## Connect to your VM via SSH

There are three ways in:

<Unordered>
  <li><strong>Over SSH, through the VM's public IPv4</strong>, if you added one and port 22 is open.</li>
  <li><strong>From the browser</strong>, with the <strong>Console</strong> tab on the VM's page. This works without a public IP.</li>
  <li><strong>From your private network</strong>, for example from another of your VMs.</li>
</Unordered>

### Find the username

Sign in as the image's default user, **not `root`**. It depends on the distribution:

| Image | Username |
|---|---|
| Ubuntu | `ubuntu` |
| Debian | `debian` |
| Fedora | `fedora` |
| CentOS Stream, RHEL | `cloud-user` |
| Rocky Linux | `rocky` |
| AlmaLinux | `almalinux` |
| openSUSE | `opensuse` |
| Arch Linux | `arch` |

The browser terminal fills the right username in for you. The default user can use `sudo`.

### Connect over the public IPv4

Copy the address from **IP Address** on the VM's page (**Copy Public IP**), then run:

```bash
ssh ubuntu@203.0.113.10
```

Replace `ubuntu` with your image's username and `203.0.113.10` with your VM's address. If your private key is not in the default location, add `-i`:

```bash
ssh -i ~/.ssh/id_ed25519 ubuntu@203.0.113.10
```

### Connect from the browser

Open the VM's page and click the **Console** tab (or **Access Console** in the VM's menu on the Instances tab).

<Ordered>
  <li>Paste the private key that matches one of the VM's public keys, or click <strong>Choose key file</strong>.</li>
  <li>Under <strong>Advanced</strong>, check the <strong>Username</strong>, and enter the <strong>Key passphrase</strong> if your key has one.</li>
  <li>Click <BgStyledText>Connect</BgStyledText>.</li>
</Ordered>

The SSH handshake runs in your browser tab. Hippius relays encrypted traffic it can't read, and your key is kept in memory only and discarded when you leave the page. Ed25519, RSA and ECDSA private keys work.

The Console tab is only available once the VM is running and on your private network. It isn't available while the VM is resized, and managed services have no shell.

### Connect from your private network

Every VM joins your account's private network when it first boots. The VM's page shows its address on that network (**Copy Overlay IP**). Your other VMs and services on the same network can reach it there, for example with `ssh ubuntu@<overlay IP>` from another of your VMs.

### SSH troubleshooting

**Permission denied (publickey).** Check the username first: logging in to a Fedora VM as `ubuntu` fails with this same error. Then check that you are using the private key that matches one of the public keys you selected at launch. On macOS and Linux, the private key file must not be readable by others: `chmod 600 ~/.ssh/id_ed25519`.

**Connection timed out.** Check that the VM is **Running**, that it has a public IPv4, and that a firewall rule allows port 22 from your address. See [Public IPv4 and firewall](/use/compute/networking).

**No public IP.** Use the Console tab, or attach a public IPv4 from the VM's page.

## Manage saved SSH keys

The **SSH Keys** tab lists the public keys saved to your account. Click <BgStyledText>+ New SSH Key</BgStyledText> to add one: give it a name, paste the public key and save it. You can save up to 10 keys.

A saved key can't be edited, only deleted. Deleting a key doesn't remove it from VMs that already have it. Changing the keys on a VM is done inside the VM, in the default user's `~/.ssh/authorized_keys` file.

## Start, stop and reboot

Use the **VM Controls** card on the VM's page, or the VM's menu on the Instances tab:

<Unordered>
  <li><strong>Stop</strong> powers the VM off. Its disk and its private network address are kept.</li>
  <li><strong>Start</strong> powers a stopped VM back on.</li>
  <li><strong>Reboot</strong> restarts it.</li>
</Unordered>

These actions are only available on a VM that has finished provisioning. Managed services can't be powered from here.

:::warning A stopped VM is still billed
A stopped VM keeps its server capacity reserved, so it is billed at its full price. The list marks stopped VMs **Billed while stopped**. Delete the VM to stop paying.
:::

## Delete a VM

Open the VM's menu and choose **Delete**, then confirm with <BgStyledText>Delete Instance</BgStyledText>.

Deleting is permanent:

<Unordered>
  <li>The encrypted disk is crypto-erased. The data can't be recovered.</li>
  <li>The VM's public IPv4, if it has one, goes back to the pool. You may not get the same address again.</li>
  <li>Billing stops when you ask to delete, not when the teardown finishes.</li>
</Unordered>

You can't delete a VM while it is being resized. Wait for the resize to finish.

## Where to next

<Unordered>
  <li><a href="/use/compute/networking">Public IPv4 and firewall</a>: open ports, publish a web service, restrict SSH.</li>
  <li><a href="/use/compute/resize">Resize a VM</a>: change its vCPUs and memory.</li>
  <li><a href="/use/compute/vm-backups">VM backups</a>: scheduled backups and restore.</li>
  <li><a href="/use/compute/vm-failover">Failover and high availability</a>: what happens when a VM's server goes down.</li>
  <li><a href="/use/compute/billing">Billing and quotas</a>.</li>
</Unordered>
