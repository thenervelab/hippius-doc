---
id: runners
title: GitHub Actions Runners
sidebar_label: GitHub Actions runners
slug: /use/compute/runners
description: Run your GitHub Actions jobs on single-use confidential Hippius VMs. Install the Hippius Runners GitHub App, link it to your account, use the hippius-small, hippius-medium and hippius-large labels (or their cheaper -ssd versions), configure limits, follow what your runners cost against GitHub-hosted runners, and understand job statuses and billing.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';

Hippius runners run your GitHub Actions jobs on your Hippius account. Each job gets a fresh confidential VM that is destroyed when the job ends, so nothing is shared between jobs or accounts. Use them for builds that need more room than a hosted runner, or that you'd rather run on confidential hardware.

Open them from the sidebar: **Confidential Computing** → **Runners**.

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

From the command line, `hipc compute runners connect` prints the install URL and how many seconds it stays valid (`expires_in`). Open it in a browser and finish on GitHub: the console completes the link, which hipc can't do. `hipc compute runners installations list` then shows the installation.

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

There are three sizes. A runner has the vCPUs and memory of the VM size with the same name, and a smaller disk, which is enough for a CI job and boots faster:

| Label | Resources | Price |
|---|---|---|
| `hippius-small` | 1 vCPU, 4 GB memory, 20 GB disk | $30 a month ($0.0411 an hour) |
| `hippius-medium` | 2 vCPU, 8 GB memory, 20 GB disk | $58 a month ($0.0795 an hour) |
| `hippius-large` | 4 vCPU, 16 GB memory, 30 GB disk | $115 a month ($0.1575 an hour) |

The Runners page shows the current sizes and prices.

### Economy runners on SSD

Add `-ssd` to the size for a cheaper runner on an SSD disk instead of NVMe. It runs the same jobs, but its VM takes several minutes longer to start.

| Label | Resources | Price |
|---|---|---|
| `hippius-small-ssd` | 1 vCPU, 4 GB memory, 20 GB disk | $26.40 a month ($0.0362 an hour) |
| `hippius-medium-ssd` | 2 vCPU, 8 GB memory, 20 GB disk | $51.60 a month ($0.0707 an hour) |
| `hippius-large-ssd` | 4 vCPU, 16 GB memory, 30 GB disk | $102.60 a month ($0.1405 an hour) |

An `-ssd` job only ever runs on SSD: when no server has SSD room, it waits rather than taking an NVMe runner. A job can't ask for both tiers: labels mixing `hippius-medium` and `hippius-medium-ssd` are refused.

To pin the region, add a two-letter country code at the end: `hippius-medium-fr` and `hippius-medium-ssd-fr` run only on servers in France. Without one, your **Default region** setting applies, or any region if it is empty.

:::warning Check the label
Labels are matched without regard to case. A label that starts with `hippius` but isn't one of the three sizes, with an optional `-ssd` and an optional two-letter country, is refused: the Runners page shows **Unknown runner label** with the labels it accepts. A label that doesn't start with `hippius` never reaches Hippius at all: the job waits on GitHub until GitHub gives up on it, after about 24 hours. Check the label if a job sits in **Queued** and nothing appears in the console.
:::

### What's on the runner

<Unordered>
  <li>Ubuntu 24.04, x64, with the GitHub Actions runner.</li>
  <li><code>git</code>, <code>curl</code>, <code>jq</code>, <code>python3</code>, <code>unzip</code> and Docker. Docker's data is on the VM's data disk.</li>
  <li>The job runs as a <code>runner</code> user that can use <code>sudo</code> without a password.</li>
</Unordered>

It isn't a copy of GitHub's hosted runner image: language toolchains aren't preinstalled. Use the `actions/setup-*` actions (`actions/setup-node`, `actions/setup-python`, …) or Docker images.

The runner VM has internet access, but no public IP address and no SSH access, and it is never added to your private network, so a workflow can't reach your other Hippius machines.

### Move jobs from GitHub-hosted runners

Change the job's `runs-on` to the Hippius label with the same number of vCPUs:

| GitHub-hosted (Linux x64) | Hippius |
|---|---|
| Linux 1-core (`ubuntu-slim`) | `hippius-small` (4 GB memory; `hippius-medium` for a job that needs more) |
| Linux 2-core (`ubuntu-latest` on a private repository) | `hippius-medium` |
| Linux 4-core (`ubuntu-latest` on a public repository) | `hippius-large` |

Some jobs have to stay on GitHub:

<Unordered>
  <li>macOS and Windows jobs, and Linux arm64 jobs: Hippius runners are Linux x64 only.</li>
  <li>Jobs that need a GPU.</li>
  <li>Jobs that rely on a tool preinstalled in GitHub's image, unless you add a <code>setup-*</code> action or a container for it.</li>
</Unordered>

Each job also waits 3 to 5 minutes for its VM to boot, so very short jobs take longer than on GitHub.

## Settings

The **Settings** card applies to every installation you have linked. Click <BgStyledText>Save settings</BgStyledText> after a change.

| Setting | Default | What it does |
|---|---|---|
| **Run jobs on Hippius** | On | Off: new `hippius-*` jobs are refused and stay queued on GitHub. |
| **Runners at once** | Your runners quota, at most 5 | How many jobs run at the same time. More jobs wait for a free slot. Your runners [quota](/use/compute/billing#quotas) caps it, so it is 3 on a new account. |
| **Allowed sizes** | All three | A job asking for another size is refused. |
| **Default region** | Any | The country used when a label has none. A label with a country wins over it. |
| **Allow public repositories** | Off | Whether jobs from public repositories run. |

:::danger Think before you allow public repositories
Anyone can open a pull request on a public repository, and the workflow run for it would launch a VM billed to your account. That is why public repositories are off by default. Before you turn it on, require approval for workflow runs from outside collaborators on GitHub: in the repository, **Settings** → **Actions** → **General**.
:::

From the command line, `hipc compute runners settings get` reads the settings, and `hipc compute runners settings update` changes the ones you pass:

```bash
hipc compute runners settings update --max-concurrent 2 --allowed-size small --allowed-size medium --dry-run
hipc compute runners settings update --max-concurrent 2 --allowed-size small --allowed-size medium --yes
```

`--allowed-size` replaces the whole list. A change that can only spend less, such as a lower `--max-concurrent`, needs no `--yes`.

## Spend limit

A monthly spend limit for runners isn't enabled yet: `hipc compute runners limit get` answers 404, and so does an update. Until it is, bound what runners can cost with the settings above:

<Unordered>
  <li><strong>Runners at once</strong> caps how many run together, and <strong>Allowed sizes</strong> caps how big each one is.</li>
  <li>The most they can cost in a month is runners at once × the hourly price of the largest allowed size × 730 hours. With 2 runners on <code>hippius-medium</code>, that is 2 × $0.0795 × 730 ≈ $116, if both run all month.</li>
  <li>A <a href="/use/compute/billing#limit-what-compute-can-cost">project budget</a> emails you as the month's spend reaches the shares you choose.</li>
</Unordered>

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

**Boot time.** Expect about 3 to 5 minutes from queued to the job starting: each runner is a fresh confidential VM that boots, then installs Docker and the GitHub runner. An `-ssd` runner takes several minutes longer.

**6-hour limit.** A job can run for 6 hours. A job still running after that is stopped within a few minutes, marked **Timed out**, and its VM destroyed.

**"Ran on another runner".** A single-use runner can take any queued job with matching labels on the same repository, not only the one it was launched for. When that happens, one row ends **Cancelled** with that reason while another job ran. This is normal.

A job that waits 24 hours without getting a slot is cancelled.

From the command line: `hipc compute runners jobs` lists the jobs, and `hipc compute runners usage` the spend.

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
| Unknown runner label | The label starts with `hippius` but isn't a size we serve. Fix the label in your workflow. |
| Runner tier not offered | The `-ssd` tier isn't sold right now. Use the label without `-ssd`. |
| Conflicting labels | The job asks for both an NVMe and an SSD runner. Keep one. |
| Over your compute quota | Runners count against your compute quotas. Free some resources, or contact support. |
| Balance too low for the runway | Top up: your balance must cover 24 hours of your compute, including the runner. |
| Unpaid compute usage | Top up to settle what your account owes. |
| Runners are turned off on Hippius | Runners are paused on our side. Try again later. |
| No access to runners on this account | Your access on a shared account doesn't include runners. Ask the owner. |
| Runners need hourly compute billing | Contact support. |
| Your account is being deleted | Nothing runs on an account being deleted. |

## Billing

A runner VM is billed per second at the price of its label (size and tier) while the VM is billed, like any VM, with a minimum of one minute. That runs from one minute before the job starts (never before the VM was created) until the VM is torn down. Most of the boot is not billed, and a runner VM that never ran a job (cancelled while booting, or its job taken by another runner) costs nothing. The **Est. cost** column shows each job's billed time at today's price; the **Spend** card shows what was billed (see [What your runners cost](#what-your-runners-cost)).

Runner VMs don't appear in your VM list. They count against your **GitHub Actions runners** quota (3 at once on a new account) and against your vCPU, memory and disk quotas. The [24-hour balance requirement](/use/compute/billing#the-24-hour-balance-requirement) is checked for each job.

## What your runners cost

The **Spend** card shows what your runners cost over a period: **This month** (the default), **Last month**, **7 days**, **30 days**, or a **Custom** range of up to 366 days. Days are UTC days.

<Unordered>
  <li>The total in credits (1 credit = $1), the runner-minutes billed and the number of jobs billed.</li>
  <li>For the current month, a projection of the month's total. It's linear: the month so far, scaled to the whole month. It appears once the month's first day has passed.</li>
  <li>A bar chart of the credits spent each day. Click <BgStyledText>Show as table</BgStyledText> to read the same numbers as a table.</li>
  <li>The spend by repository, by runner size and tier, and by workflow.</li>
</Unordered>

These amounts come from your hourly compute bill: each closed hour, the lines for your runner VMs (their time and their bandwidth). The hour that is not closed yet, usually the current one, is estimated from the runners' billed time at today's prices, and the card says so. It becomes the billed amount once the hour closes, a few minutes after it ends.

**Compared to GitHub-hosted runners.** The card also says how much you saved against GitHub-hosted runners at GitHub's list prices, this month and since Hippius started billing by the hour (late September 2026). For each job, it takes the job's run time inside the period, rounded up to the whole minute as GitHub bills it, at the per-minute price of the GitHub Linux runner with the same vCPU and memory: `hippius-medium` against Linux 2-core, `hippius-large` against Linux 4-core, and `hippius-small` against Linux 1-core (ubuntu-slim), the cheapest GitHub runner. It then subtracts everything your runners were billed in the same period, including startup minutes, bandwidth and jobs still running. To stay on the safe side, it leaves out jobs from public repositories on the small and medium sizes (GitHub runs those free) and doesn't count the free minutes your GitHub plan may include. The info icon next to it lists the prices used and the date they were read from GitHub's pricing page. The line is hidden when GitHub would not have cost more.

In a project, the card shows the project's runners only.

## Disconnect GitHub

Click **Disconnect** on an installation and confirm, or run `hipc compute runners installations delete INSTALLATION_ID --yes`. Jobs still waiting are cancelled and runners that haven't taken a job yet are stopped. Running jobs finish. The App stays installed on GitHub: to remove it, uninstall it there (**Manage on GitHub**).
