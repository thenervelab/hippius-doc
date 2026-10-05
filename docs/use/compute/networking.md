---
id: networking
title: Public IPv4 and Firewall
sidebar_label: Public IPv4 and firewall
slug: /use/compute/networking
description: Give a Hippius VM a dedicated public IPv4 address, control inbound traffic with firewall rules, restrict SSH to your own address, publish a web service on an HTTPS address, and use your private network.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';

A new VM is only reachable on your private network. This page shows how to open it to the internet safely: attach a public IPv4 address, allow only the traffic you need with firewall rules, or publish a single web service on an HTTPS address.

Everything here is on the VM's page, on the **Dashboard** tab, in the **Public IP & Firewall** panel.

## How a VM is reached

<Unordered>
  <li><strong>Private network.</strong> Every VM joins your account's private network at first boot. Your VMs and managed services reach each other there.</li>
  <li><strong>Public IPv4.</strong> An optional, dedicated address for one VM. Inbound traffic to it is blocked except what your firewall rules allow.</li>
  <li><strong>Published ports.</strong> An HTTPS address on a Hippius domain that forwards to one port of your VM. Useful for a web service when you don't need a whole public address.</li>
  <li><strong>Browser terminal.</strong> The VM page's <strong>Console</strong> tab gives you a shell without any public address. See <a href="/use/virtual-machines#connect-from-the-browser">Connect from the browser</a>.</li>
</Unordered>

## Attach a public IPv4

You can add a public IPv4 when you create the VM (the **Public IPv4** add-on), or later:

<Ordered>
  <li>Open the VM's page. The VM must be running.</li>
  <li>In <strong>Public IP & Firewall</strong>, click <BgStyledText>Attach public IPv4</BgStyledText>.</li>
  <li>The dialog tells you which firewall rules will apply at once and what the address costs. Click <BgStyledText>Attach</BgStyledText>.</li>
</Ordered>

The address is dedicated to your VM. Inbound and outbound traffic both use it: once it is attached, the VM's outgoing connections leave from this address too. It counts against your **Public IPv4** quota, and the [24-hour balance requirement](/use/compute/billing#the-24-hour-balance-requirement) applies.

If no address is free, the console says so. Try again later, or launch without one.

:::note The address is not on the VM's network interface
You won't see the public address with `ip addr` inside the VM. To print it from inside the VM, run:

```bash
curl http://169.254.169.254/metadata/public-ip
```

Bind your services to `0.0.0.0` (all interfaces), not to a specific address, so they answer traffic that arrives through the public IPv4.
:::

### What a public IPv4 costs

A public IPv4 is billed per second while it is attached, with a minimum of one minute. The **Attach** dialog shows its price, or says **Free of charge** when it is free on your account. The current price is also in the [live price list](https://console.hippius.com/dashboard/billing/compute#prices). Public bandwidth is listed there too, priced per GB.

### Detach an address

Click **Detach** in **Public IP & Firewall** and confirm. The address stops reaching your VM and goes back to the pool: you may not get it back. Outbound traffic leaves from the host's address again.

Your firewall rules are kept. They apply again as soon as you attach a new address. Deleting the VM releases its address too.

## Firewall rules

The firewall protects the VM's public IPv4. It works like this:

<Unordered>
  <li><strong>All inbound traffic is blocked by default.</strong> Each rule allows something. There are no "deny" rules.</li>
  <li><strong>Outbound traffic is open.</strong></li>
  <li><strong>Ping (ICMP) and replies to connections the VM opened always get through.</strong> You don't need a rule for them.</li>
  <li><strong>IPv4 only.</strong> Sources are IPv4 addresses or ranges.</li>
</Unordered>

You can write rules before an address is attached. They are kept, and enforced as soon as one is.

### Add a rule

<Ordered>
  <li>In the <strong>Inbound firewall</strong> section, click <BgStyledText>Add rule</BgStyledText>.</li>
  <li>Choose the <strong>Protocol</strong>: TCP, UDP or ICMP.</li>
  <li>Under <strong>Ports</strong>, type a port (<code>443</code>) or a range (<code>8000-8080</code>) and press Enter. Add as many as you need. Leave it empty to match every port. ICMP rules take no ports.</li>
  <li>Under <strong>Sources</strong>, add the IPv4 addresses or ranges allowed, for example <code>203.0.113.7</code> or <code>203.0.113.0/24</code>. Leave it empty to allow any source.</li>
  <li>Optionally add a <strong>Description</strong>, up to 128 characters.</li>
  <li>Click <BgStyledText>Save rule</BgStyledText>.</li>
</Ordered>

Untick **Enabled** to keep a rule without enforcing it. Each rule can be edited or deleted from the rules table.

A change reaches the network edge within about 15 seconds. The panel shows **Applying to the edge…** and then **Live on the edge** once the change is confirmed.

:::tip Write ranges correctly
A range must start on its network boundary: `203.0.113.0/24` is valid, `203.0.113.7/24` is not. The console suggests the right value when you get it wrong. A single address is saved as `/32`.
:::

### Limits

| Limit | Value |
|---|---|
| Rules per VM | 50 |
| Ports or ranges per rule | 20 |
| Sources per rule | 20 |
| Port numbers | 1 to 65535 |

If someone else changes the rules while you edit them, saving is refused with **The rules changed since you loaded them**. Reload the page and make your change again.

## Restrict SSH to your own address

If you launched the VM with **Open SSH (port 22) to the internet**, it has a rule named `SSH (opened at launch)`: TCP, port 22, from any source. Anyone on the internet can then try to log in. Logins still need your SSH key, but you can close the door to everyone else:

<Ordered>
  <li>Find your public address. Searching "what is my IP" in a browser shows it.</li>
  <li>In <strong>Inbound firewall</strong>, edit the rule <code>SSH (opened at launch)</code>.</li>
  <li>Under <strong>Sources</strong>, add your address, for example <code>203.0.113.7</code>. Add any other addresses you connect from.</li>
  <li>Click <BgStyledText>Save rule</BgStyledText>.</li>
</Ordered>

To close SSH completely, delete the rule, or untick **Enabled**. You can still open a shell from the browser with the **Console** tab.

If you attach an address later, no SSH rule is created for you. Add one yourself, with your own address as the source.

## If inbound traffic doesn't arrive

If the panel says **Inbound traffic to this IP is blocked inside the VM**, a small agent inside the VM that lets public traffic through the VM's own private-network firewall isn't running. VMs created before 24 September 2026 don't have it. Outbound traffic still works.

The panel's **How to fix it** steps tell you what to install, if anything. If the agent is installed but stopped, start it and keep it across reboots:

```bash
sudo systemctl daemon-reload && sudo systemctl enable --now hippius-public-ip-inbound.timer
```

If it still shows after a minute, [contact support](/use/console/support).

## Publish a web service on an HTTPS address

If you want to share one web service without a public IPv4, publish its port:

<Ordered>
  <li>On the VM's page, find <strong>Published ports</strong>.</li>
  <li>Click <BgStyledText>Publish a port</BgStyledText>, enter the port your service listens on inside the VM, for example <code>8080</code>, and click <BgStyledText>Publish</BgStyledText>.</li>
  <li>The panel shows an address like <code>https://NAME.hpcr.io</code> that forwards to that port.</li>
</Ordered>

Your service should speak plain HTTP on that port: the Hippius edge handles HTTPS for you. Port 22 can't be published; use the browser terminal for SSH. To unpublish it, click the remove button next to the address.

:::warning The edge can read published traffic
The Hippius edge terminates TLS for published ports. Traffic is encrypted on every wire (HTTPS to the edge, then your private network to the VM), but it is not end-to-end. Don't publish anything only you should be able to read. Use a public IPv4 with your own TLS for that.
:::

Applications such as WordPress publish their port for you once they are up.

## Your private network

Every VM, database and Kubernetes node joins your account's private network. The **Copy Overlay IP** button on a VM's page gives its address on that network.

Use it to connect your machines to each other without going through the internet, for example an application VM to a [managed PostgreSQL database](/use/compute/databases#connect-from-your-private-network). Traffic between them stays on the encrypted private network.

GitHub Actions runner VMs are never added to your private network, so a workflow can't reach your other machines.
