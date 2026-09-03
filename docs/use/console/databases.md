---
id: databases
title: Databases
sidebar_label: Databases
slug: /use/console/databases
description: Launch and manage a hosted database from the console.
draft: true
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

A managed database is its own product, reached from <BgStyledText>Confidential Computing</BgStyledText> → <BgStyledText>Databases</BgStyledText> in the sidebar.

It has its own page rather than sitting inside Virtual Machines on purpose. Reaching a database by launching a VM, then picking an app, then choosing a flavour asked you for an SSH key the guest does not accept, which is how those launches used to fail.

## Creating a Database

<Ordered>
  <li>Go to <BgStyledText>Databases</BgStyledText> and click <BgStyledText>Create Database</BgStyledText>.</li>
  <li>Choose the database type and size.</li>
  <li>Confirm. The database is provisioned for you.</li>
</Ordered>

<Screenshot src="/img/console/databases/create.png" alt="Creating a database" dark />

## Connecting

Once the database is running, open it to see its connection credentials. Copy them into your application's configuration.

<Screenshot src="/img/console/databases/credentials.png" alt="Database connection credentials" dark />

:::warning Credentials are secrets
Treat the connection string like a password. Anyone holding it can read and write your database.
:::

## Where to next

<Unordered>
  <li><a href="/use/console/virtual-machines">Virtual Machines</a>: for workloads you assemble yourself.</li>
  <li><a href="/use/console/billing">Billing</a>: how usage is charged.</li>
</Unordered>
