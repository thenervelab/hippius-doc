---
id: runners
title: GitHub Actions Runners
sidebar_label: GitHub Actions runners
slug: /use/compute/runners
description: Run your GitHub Actions jobs on single-use confidential Hippius VMs. Install the Hippius Runners GitHub App, link it to your account, use the hippius-small, hippius-medium and hippius-large labels, configure limits, and understand job statuses and billing.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';

Hippius runners run your GitHub Actions jobs on your Hippius account. Each job gets a fresh confidential VM that is destroyed when the job ends, so nothing is shared between jobs or accounts. Use them for builds that need more room than a hosted runner, or that you'd rather run on confidential hardware.

Open them from the sidebar: **Confidential Computing** → **Runners**.

:::info Closed beta
Runners have their own closed beta, inside the Compute beta. The **Runners** entry only appears in the sidebar once your account has access. To ask for it, [contact support](/use/console/support).
:::

## Connect GitHub

Runners are picked up through the **Hippius Runners** GitHub App. You install it on a GitHub organisation or on your own user account, and link the installation to your Hippius account.

<Ordered>
  <li>On the Runners page, in the <strong>GitHub</strong> card, click <BgStyledText>Connect GitHub</BgStyledText>.</li>
  <li>On GitHub, choose the organisation or user account, and either all repositories or only the ones you select.</li>
  <li>GitHub asks you to authorise the App too. That is how Hippius checks that you own the account the App was installed on.</li>
  <li>You come back to the console, which says <strong>GitHub connected</strong>. Click <BgStyledText>Go to Runners</BgStyledText>, or wait a moment.</li>
</Ordered>

The connection link works for one hour, for the Hippius account that started it.

**Who can link an installation.** For a user account, the GitHub user who comes back must be that account. For an organisation, they must be one of its **owners**. If you ask to install the App on an organisation you don't own, GitHub sends the request to its owners. Once one approves it, connect GitHub again from the Runners page.

An installation belongs to one Hippius account at a time. Each linked installation is listed in the **GitHub** card, with **Manage on GitHub** and **Disconnect**. Click <BgStyledText>Connect another</BgStyledText> to link more.

### What the App can do

| Permission | Why |
|---|---|
| Administration: write (repositories) | Registers a single-use runner on the repository of each job, and removes one that never ran. |
| Actions: read (repositories) | Lets GitHub tell Hippius when a job asks for a `hippius-*` runner. |
| Metadata: read (repositories) | Required of every GitHub App. |
| Members: read (organisation) | Checks, when you link an organisation, that the GitHub user who installed the App is one of its owners. |

Runners are registered on each job's repository only, never on the whole organisation.

## Run a job on Hippius

Ask for a Hippius runner in the job's `runs-on`:

```yaml title=".github/workflows/build.yml"
on: push

jobs:
  build:
    runs-on: hippius-medium
    steps:
      - uses: actions/checkout@v4
      - run: docker run --rm hello-world
```

There are three sizes. Each one is a VM of the size with the same name; the Runners page shows their current vCPUs, memory, disk and price.

| Label | Runs on a VM of size |
|---|---|
| `hippius-small` | Small |
| `hippius-medium` | Medium |
| `hippius-large` | Large |

To pin the region, add a two-letter country code: `hippius-medium-fr` runs only on servers in France. Without one, your **Default region** setting applies, or any region if it is empty.

:::warning A misspelled label is silently ignored
A job whose label isn't exactly `hippius-small`, `hippius-medium` or `hippius-large`, with an optional two-letter country, never reaches Hippius. It doesn't show on the Runners page, and it waits on GitHub until GitHub gives up on it, after about 24 hours. Check the label if a job sits in **Queued** and nothing appears in the console.
:::

### What's on the runner

<Unordered>
  <li>Ubuntu, x64, with the GitHub Actions runner.</li>
  <li><code>git</code>, <code>curl</code>, <code>jq</code>, <code>python3</code>, <code>unzip</code> and Docker. Docker's data is on the VM's data disk.</li>
  <li>The job runs as a <code>runner</code> user that can use <code>sudo</code> without a password.</li>
</Unordered>

It isn't a copy of GitHub's hosted runner image: language toolchains aren't preinstalled. Use the `actions/setup-*` actions (`actions/setup-node`, `actions/setup-python`, …) or Docker images.

The runner VM has internet access, but no public IP address and no SSH access, and it is never added to your private network, so a workflow can't reach your other Hippius machines.

## Settings

The **Settings** card applies to every installation you have linked. Click <BgStyledText>Save settings</BgStyledText> after a change.

| Setting | Default | What it does |
|---|---|---|
| **Run jobs on Hippius** | On | Off: new `hippius-*` jobs are refused and stay queued on GitHub. |
| **Runners at once** | 5 | How many jobs run at the same time. More jobs wait for a free slot. It can't go above your runners quota. |
| **Allowed sizes** | All three | A job asking for another size is refused. |
| **Default region** | Any | The country used when a label has none. A label with a country wins over it. |
| **Allow public repositories** | Off | Whether jobs from public repositories run. |

:::danger Think before you allow public repositories
Anyone can open a pull request on a public repository, and the workflow run for it would launch a VM billed to your account. That is why public repositories are off by default. Before you turn it on, require approval for workflow runs from outside collaborators on GitHub: in the repository, **Settings** → **Actions** → **General**.
:::

## Follow your jobs

The **Jobs** table lists each job with its repository, workflow, size and region, when it was queued, started and finished, its duration and an estimated cost.

| Status | Meaning |
|---|---|
| **Waiting** | Every runner slot is taken. It launches as soon as one of your runners ends. |
| **Launching** | The VM is booting and the runner is registering with GitHub. |
| **Running** | The job is running on its VM. |
| **Completed** | The runner ran its job and the VM was destroyed. GitHub's result (success, failure, cancelled…) is shown under the status. |
| **Cancelled** | The job was cancelled or ran on another runner, the runner stayed idle 15 minutes, or the installation was unlinked. |
| **Refused** | Not launched. The **Reason** column says why. |
| **Failed** | The launch or the runner failed, and the VM was destroyed. |
| **Timed out** | The job ran over the 6-hour limit, and the VM was destroyed. |

**Boot time.** Expect about 3 to 5 minutes from queued to the job starting: each runner is a fresh confidential VM that boots, then installs Docker and the GitHub runner.

**6-hour limit.** A job can run for 6 hours. A job still running after that is stopped within a few minutes, marked **Timed out**, and its VM destroyed.

**"Ran on another runner".** A single-use runner can take any queued job with matching labels on the same repository, not only the one it was launched for. When that happens, one row ends **Cancelled** with that reason while another job ran. This is normal.

A job that waits 24 hours without getting a slot is cancelled.

## Why a job is refused

Refusals show on the Runners page only. On GitHub, the job just stays queued ("Waiting for a runner") until another runner takes it or you cancel it. Re-running the workflow creates a new job.

| Reason | What to do |
|---|---|
| Waiting for a free runner slot | Not a refusal: the job starts when a slot frees up. Raise **Runners at once** if you need more. |
| Runners are turned off in your settings | Turn on **Run jobs on Hippius**. |
| Size not allowed in your settings | Add the size to **Allowed sizes**. |
| Public repository, not allowed in your settings | See the warning above before you allow public repositories. |
| GitHub installation suspended or unlinked | Unsuspend the App on GitHub (**Manage on GitHub**), or connect it again. |
| Installation linked to another Hippius account | The installation was moved to another account. |
| Over your compute quota | Runners count against your compute quotas. Free some resources, or contact support. |
| Balance too low for the runway | Top up: your balance must cover 24 hours of your compute, including the runner. |
| Unpaid compute usage | Top up to settle what your account owes. |
| No access to runners on this account | Ask support for access to the runners beta. |
| Runners are turned off on Hippius | Runners are paused on our side. Try again later. |

## Billing

A runner VM is billed per second at its size's price, like any VM, with a minimum of one minute. Billing runs from the moment the VM is running until it is torn down, so the runner's setup (installing Docker and the GitHub runner) is billed too, not only the job itself. The **Est. cost** column shows each job's billed time at today's price.

Runner VMs don't appear in your VM list. They count against your **GitHub Actions runners** quota (5 at once by default) and against your vCPU, memory and disk quotas. The [24-hour balance requirement](/use/compute/billing#the-24-hour-balance-requirement) is checked for each job.

## Disconnect GitHub

Click **Disconnect** on an installation and confirm. Jobs still waiting are cancelled and runners that haven't taken a job yet are stopped. Running jobs finish. The App stays installed on GitHub: to remove it, uninstall it there (**Manage on GitHub**).
