---
id: installation
title: Installation
sidebar_label: Installation
slug: /use/wordpress-plugin/installation
description: Install Hippius Media Offloader on your WordPress site, from the plugin directory or as a zip, and check what you need from Hippius before you start.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

Installing the plugin takes a minute. Before you do, it helps to check your site meets the requirements and to know which Hippius details you'll be asked for, so the setup goes in one pass.

## Before you start

### System requirements

<Unordered>
  <li>WordPress 5.0 or higher.</li>
  <li>PHP 7.4 or higher.</li>
  <li>The cURL PHP extension enabled.</li>
  <li>HTTPS on your WordPress site (strongly recommended).</li>
</Unordered>

### What you'll need from Hippius

<Unordered>
  <li>A Hippius account (free to create at <a href="https://console.hippius.com">console.hippius.com</a>).</li>
  <li>Money on your account balance to cover storage. You can top up your account balance by card, TAO, Bitcoin or USDC.</li>
  <li>An S3 Access Key ID (it starts with <code>hip_</code>) and its S3 Secret Access Key.</li>
  <li>A bucket with a name of your own, created in the Hippius Console.</li>
  <li>A Hippius API token. This one is optional, only needed to show your account balance in the dashboard.</li>
</Unordered>

:::warning Keep your Secret Access Key safe
You only see it once, at creation, and it can't be retrieved later. If you lose it, you'll have to generate a new key pair.
:::

The next page, [Get your Hippius credentials](/use/wordpress-plugin/credentials), walks through creating all of these.

## Install the plugin

There are two ways to install Hippius Media Offloader. The plugin directory is the easiest, and it keeps the plugin updated for you.

### Option A: from the WordPress plugin directory (recommended)

<Ordered>
  <li>Log in to your WordPress admin dashboard.</li>
  <li>Go to <BgStyledText>Plugins</BgStyledText> → <BgStyledText>Add New</BgStyledText>.</li>
  <li>Search for <strong>Hippius Media Offloader</strong>.</li>
  <li>Click <BgStyledText>Install Now</BgStyledText>, then <BgStyledText>Activate</BgStyledText>.</li>
</Ordered>

<Screenshot src="/img/wordpress/install-plugin-search.png" alt="Find Hippius Media Offloader in the WordPress plugin directory." raw />

*Find Hippius Media Offloader in the WordPress plugin directory.*

### Option B: manual upload

Use this if your site can't install from the directory, for example on a locked-down host.

<Ordered>
  <li>Download the plugin zip from <a href="https://wordpress.org/plugins/hippius-media-offloader/">wordpress.org/plugins/hippius-media-offloader</a>.</li>
  <li>In WordPress admin, go to <BgStyledText>Plugins</BgStyledText> → <BgStyledText>Add New</BgStyledText> → <BgStyledText>Upload Plugin</BgStyledText>.</li>
  <li>Pick the zip file and click <BgStyledText>Install Now</BgStyledText>.</li>
  <li>Activate the plugin from the <BgStyledText>Plugins</BgStyledText> screen.</li>
</Ordered>

## After activation

A new <BgStyledText>Hippius Media</BgStyledText> item shows up in your WordPress admin sidebar. That's the plugin's home. It has two entries:

<Unordered>
  <li><BgStyledText>Hippius Media</BgStyledText> is the one page where everything happens. Your account balance, settings, bucket status, logs, bulk migration and storage usage all sit on it as separate panels, so there's no hunting through submenus.</li>
  <li><BgStyledText>Overview</BgStyledText> is a short tour of how the plugin and Hippius storage work, if you want the background.</li>
</Unordered>

<Screenshot src="/img/wordpress/install-menu-item.png" alt="Hippius Media in the WordPress admin menu." raw />

*Hippius Media in the WordPress admin menu.*

Next up: [get your Hippius credentials](/use/wordpress-plugin/credentials).
