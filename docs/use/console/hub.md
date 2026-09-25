---
id: hub
title: Hub
sidebar_label: Hub
slug: /use/console/hub
description: Store your container images and AI models on Hippius. Create your namespace, push your first image, control who can pull it, and choose a Hub plan.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Screenshot from '@site/src/components/Screenshot';

## What Hub is for

Hub is where you keep your container images and AI models on Hippius. If you've used Docker Hub or the Hugging Face Hub, it works the same way: you push an image or a model from your machine, and pull it wherever you need it, whether that's a server, a CI pipeline or a teammate's laptop.

You push and pull from your terminal. The console is where you set Hub up, see what you've stored, decide who can pull it, and manage your plan. Find it under <BgStyledIconWithText text="Hub" icon="Box" /> in the sidebar.

<Screenshot src="/img/console/hub/overview.png" alt="The Hub page in the Hippius Console" dark raw />

:::info Hub used to be called Container Registry
Only the name changed. The address is still `registry.hippius.com` and the CLI commands still start with `hippius-hub registry`, so nothing in your scripts needs updating.
:::

## Create your namespace

Before you can push anything, you need a **namespace**. It's your own space on Hub, and its name becomes the first part of every image you push:

```
registry.hippius.com/<your-namespace>/my-app:v1
```

The first time you open Hub, the console asks you to choose one. Type a name, and as you type it tells you whether the name is free. Then click <BgStyledText>Create namespace</BgStyledText>. We set it up and create your login for pushing, which usually takes a few seconds.

<Screenshot src="/img/console/hub/setup.png" alt="Setting up a Hub namespace" dark raw />

A name can use lowercase letters, numbers and dashes, up to 63 characters, and can't start or end with a dash. Names are unique across Hippius, so someone else may already have the one you want.

:::warning Choose a name you're happy to keep
You can't rename or delete a namespace from the console, and it appears in every image path you push.
:::

Every account starts on the free Hub plan, so you do not subscribe before creating the first namespace. Creating it still requires at least **10 credits** on the account (`REGISTRY_MIN_CREDITS`, a spam check). A zero balance is refused. Top up on [Billing](/use/console/billing) first.

If you already created a namespace from the CLI and the console says the name is taken, submit it anyway. The console recognises that it's yours and picks it up.

## Push your first image

Once your namespace exists, the console shows the exact commands for your account, with your namespace already filled in. You can copy them from the Hub page, or follow the short version here.

The quickest route is the `hippius-hub` CLI, which sets up Docker for you:

```bash
pip install hippius_hub
hippius-hub login --hippius-token <your-api-token>
hippius-hub registry provision <your-namespace> --docker-login

docker tag my-app:v1 registry.hippius.com/<your-namespace>/my-app:v1
docker push registry.hippius.com/<your-namespace>/my-app:v1
```

Your API token is on the [Settings](/use/console/settings) page. For AI models, `hippius-hub upload` sends model files straight to your namespace without Docker.

The [Hub Quickstart](/registry), [Push](/registry/push) and [Pull](/registry/pull) guides go through every option in more detail.

## See what you've pushed

Everything you push shows up on the Hub page, grouped by repository. Repositories appear on their own the first time you push to them, so there's nothing to create in the console first.

Open a repository to see each version you've pushed, with its tags, size, and when it was last pushed and pulled. Open a version for the technical detail: its digest, every tag that points at it, and any labels it was pushed with.

A version with no tags hasn't gone anywhere. You can still pull it by its digest, as in `my-app@sha256:…`.

To delete a repository or a single version, use the three dots at the end of its row.

:::danger Deleting is permanent
We can't restore a deleted repository or version, and anything that pulls it will start failing.
:::

:::note Why the sizes look slightly different
Hub counts storage in binary units (GiB), the same way Docker does. A plan sold as 100 GB appears as 100 GiB here. It's the same amount of space.
:::

## Public or private

Your namespace is either public or private, and you can switch at any time from <BgStyledText>Manage</BgStyledText>.

<Unordered>
  <li><strong>Public</strong> means anyone can pull your images, without logging in. New namespaces start public.</li>
  <li><strong>Private</strong> means only people or machines logged in with your credentials can pull.</li>
</Unordered>

Pushing always needs your credentials, whichever you choose.

<Screenshot src="/img/console/hub/manage.png" alt="Manage Hub" dark raw />

:::info Switching changes how much you can store
Each Hub plan has one storage allowance for private namespaces and a larger one for public ones. When you switch, you move to the other allowance. If you're close to full, check both figures on your plan before switching to private.
:::

## Your login for pushing

Hub gives your namespace its own login, separate from your Hippius account, so you can use it in scripts and CI without sharing your account. You'll find the username under <BgStyledText>Manage</BgStyledText>.

To get a new password for it, click <BgStyledText>Rotate token</BgStyledText>. The console shows the new password once, so copy it straight away, then log Docker in with it:

```bash
docker login registry.hippius.com -u '<your-username>'
```

Or let the CLI do both steps for you:

```bash
hippius-hub registry rotate-token --docker-login
```

:::warning Rotating stops the old password working straight away
Anything still using it, such as a CI pipeline or a server, can't push until you log it in again with the new one.
:::

## Hub plans

Your plan sets how much you can store and how many projects you can have. These are the plans at the time of writing. The console always shows the current ones.

| Plan        | Private storage | Public storage | Projects | Price       |
| ----------- | --------------- | -------------- | -------- | ----------- |
| **Free**    | 25 GB           | 100 GB         | 1        | Free        |
| **Builder** | 75 GB           | 200 GB         | 1        | $5 / month  |
| **Pro**     | 250 GB          | 500 GB         | 3        | $19 / month |
| **Team**    | 2 TB            | 5 TB           | 20       | $99 / month |

<Screenshot src="/img/console/hub/plans.png" alt="Hub plans" dark raw />

**Paying.** Hub plans are paid from your [account balance](/use/console/billing) and renew monthly. Card payments aren't available for Hub yet, so top up first if your balance is short. Subscribing takes a few seconds to confirm. If it takes longer, give it a moment and refresh rather than subscribing again. Your namespace and login stay exactly as they were.

**Switching plans.** Hub doesn't have a one-step upgrade or downgrade yet. If you subscribe to a second plan while you're still on a paid one, **both stay active and you're charged for both**. To switch, cancel your current plan first, then subscribe to the new one.

**Cancelling.** When you cancel, your namespace stays available for a **30 day grace period**, and the Hub page shows the exact date it will be deleted. Subscribe again within that time and everything stays as it was.

:::danger After 30 days, your images are deleted
When the grace period ends, your namespace and everything in it are permanently deleted.
:::

## Where to next

<Unordered>
  <li><a href="/registry">Hub Quickstart</a>: from nothing to your first push or pull in five minutes.</li>
  <li><a href="/registry/push">Push</a>: images, models and credentials from the CLI.</li>
  <li><a href="/registry/pull">Pull</a>: from Python, the CLI or Docker.</li>
  <li><a href="/use/console/billing">Billing</a>: top up your balance and see everything you pay for.</li>
</Unordered>
