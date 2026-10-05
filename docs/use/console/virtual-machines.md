---
id: virtual-machines
title: Virtual Machines
sidebar_label: Virtual Machines
slug: /use/console/virtual-machines
description: Virtual machines, managed PostgreSQL, managed Kubernetes and GitHub Actions runners in the Hippius Console. The full guides are in the Compute section.
---

import Unordered from '@site/src/components/Unordered';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';

Virtual machines and the other Compute products live in the console under **Confidential Computing** → <BgStyledIconWithText text="Virtual Machines" icon="SidebarVm" />. Every VM runs inside an AMD SEV-SNP enclave, so the host can't read its memory or its disk.

Compute is in closed beta. The full guides are in the [Compute](/use/compute) section:

<Unordered>
  <li><a href="/use/compute">Compute overview</a>: beta access, quotas, the 24-hour balance requirement and billing.</li>
  <li><a href="/use/virtual-machines">Create and connect to a virtual machine</a>.</li>
  <li><a href="/use/compute/networking">Public IPv4 and firewall</a>.</li>
  <li><a href="/use/compute/databases">Managed PostgreSQL</a>.</li>
  <li><a href="/use/compute/kubernetes">Managed Kubernetes</a>.</li>
  <li><a href="/use/compute/runners">GitHub Actions runners</a>.</li>
  <li><a href="/use/compute/billing">Compute billing and quotas</a>.</li>
</Unordered>
