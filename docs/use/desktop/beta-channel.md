---
id: beta-channel
title: Beta Channel
sidebar_label: Beta Channel
slug: /use/desktop/beta-channel
description: Opt into the Hippius Desktop beta channel to get new features before they are fully stabilized, and switch back to stable whenever you want.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

Hippius Desktop ships on two channels you can choose between: **Stable** and **Beta**.

Stable is what you get by default. Beta follows the development work, so you see new features first, before they are fully stabilized. You can move between the two whenever you like, and nothing about your account, files or sync folders changes when you do.

## Which channel should I use?

| | Stable | Beta |
|---|---|---|
| **Who it's for** | Everyone, by default | People who want new features early and don't mind rough edges |
| **How often it updates** | Less often | More often |
| **How tested it is** | More thoroughly | Less; features are still settling |
| **Version looks like** | `0.6.0` | `0.6.0-beta.3` |

If you rely on Hippius for work you cannot afford to interrupt, stay on Stable.

## Joining the beta

<Ordered>
  <li>Click your account address at the top of the app to open the address menu.</li>
  <li>Choose <BgStyledText>Explore Beta</BgStyledText>.</li>
  <li>Read what the dialog tells you, then confirm.</li>
</Ordered>

Hippius downloads the beta build and restarts itself. That is the whole process; you do not need to uninstall anything or download a file by hand.

<Screenshot src="/img/desktop/beta-channel/explore-beta-menu.png" alt="Explore Beta in the address menu" dark />

<Screenshot src="/img/desktop/beta-channel/join-beta-dialog.png" alt="Beta channel confirmation dialog" dark />

:::warning Beta builds are not fully stabilized
The dialog says this plainly and it is worth repeating: you are opting into features that are still settling. Expect rough edges and more frequent updates.
:::

## Going back to stable

Two ways, and they do the same thing:

<Unordered>
  <li>Open the address menu again and choose <BgStyledText>Leave Beta</BgStyledText>. The menu item changes to this once you are on the beta channel.</li>
  <li>Or open <BgStyledText>Settings</BgStyledText>, find the release channel section, and switch back from there. It also shows which channel you are currently running.</li>
</Unordered>

Hippius downloads the stable build and restarts, the same way joining did.

<Screenshot src="/img/desktop/beta-channel/leave-beta.png" alt="Leaving the beta channel from Settings" dark />

## What does not change

Switching channels only changes which build of the app you run. It does not touch:

<Unordered>
  <li>Your account or your recovery phrase.</li>
  <li>Your unlock password.</li>
  <li>Your files, or anything already synced.</li>
  <li>Your sync folder settings.</li>
</Unordered>

## Reporting something you find

Finding problems early is the point of the beta. If something looks wrong, send it through [Help &amp; Support](/use/help-support) and say you are on the beta channel, along with the version number shown in Settings. That tells us which build to look at.

## Where to next

<Unordered>
  <li><a href="/use/desktop/settings">Settings</a>: where the current channel is shown and can be switched.</li>
  <li><a href="/use/help-support">Help &amp; Support</a>: how to report a problem.</li>
</Unordered>
