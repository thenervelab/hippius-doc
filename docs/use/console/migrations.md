---
id: migrations
title: S3 Migrations
sidebar_label: S3 Migrations
slug: /use/console/migrations
description: Move your existing object storage into Hippius S3 from Storj, Amazon S3, Google Cloud Storage, Cloudflare R2, Backblaze B2, DigitalOcean Spaces, Wasabi, or any S3-compatible provider.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

If your files already live with another storage provider, you do not have to download them and upload them again. Point Hippius at your existing bucket and we copy it across for you, however large it is, while you carry on with something else.

We can read from Storj, Amazon S3, Google Cloud Storage, Cloudflare R2, Backblaze B2, DigitalOcean Spaces, Wasabi, and anything else that speaks S3.

Find it in the sidebar at <BgStyledIconWithText text="S3 Migrations" icon="Global" />.

:::info
Your files are only ever read from the source. Nothing is moved, renamed or deleted there, so the originals stay exactly as they are and you can run the same migration again if you want to.
:::

## Before you start

You need two things from your current provider: an **access key** and its **secret**.

Make them **read-only** if your provider offers the choice. We only ever read from the source, so a read-only key does everything a migration needs and limits what the key could do if it ever leaked.

:::warning
Most providers show the secret **once**, when the key is created. Copy it somewhere safe before closing the page, or you will have to create another key.
:::

Depending on where you are coming from, you may be asked for one more detail:

<Unordered>
  <li><strong>Amazon S3:</strong> the region your bucket is in, such as <code>us-east-1</code>.</li>
  <li><strong>Cloudflare R2:</strong> your account ID.</li>
  <li><strong>Backblaze B2, DigitalOcean Spaces, Wasabi:</strong> the region, chosen from a list.</li>
  <li><strong>Any S3-compatible:</strong> the endpoint URL, such as <code>https://s3.example.com</code>.</li>
  <li><strong>Storj and Google Cloud Storage:</strong> nothing extra, we already know where to connect. For Google Cloud Storage the key and secret are an <strong>HMAC key</strong>, created under interoperability settings rather than a service account file.</li>
</Unordered>

If you are not sure where your provider keeps its keys, each one has a **How to get your credentials** panel in the migration window that tells you which screen to look on.

## Migrating your files

<Screenshot src="/img/console/migrations/providers.png" alt="The S3 Migrations page, showing every provider you can copy from" dark />

<Ordered>
  <li>Open <strong>S3 Migrations</strong> and choose the provider you are moving from. Pick <strong>Any S3-compatible</strong> if yours is not on the list.</li>
  <li>Enter your access key and secret, plus the region, account ID or endpoint if you are asked for one.</li>
  <li>Choose which buckets to bring across, and what each one should be called in Hippius. Take the suggested name or type your own.</li>
  <li>Start the migration. You can close the window and come back to it. Nothing stops when you navigate away.</li>
</Ordered>

<Screenshot src="/img/console/migrations/buckets.png" alt="Choosing which buckets to copy and what to call them in Hippius" dark />

A bucket that does not exist in Hippius yet is created for you, so there is nothing to set up first.

:::tip
Bucket names have to be unique across Hippius, so if the name you want is taken, add something of your own to it. The suggestion in the box is usually free.
:::

:::warning
Migrated buckets start **private**, and we copy object data rather than permissions. Access rules, ACLs and public settings do not come across, so anything that was public at your old provider needs setting up again here.
:::

## Watching it run

Once a migration starts you get a progress view showing how far along it is and how many objects have been copied.

Large buckets take a while. You do not have to sit and watch, and you do not have to keep the window open. Come back to **S3 Migrations** whenever you like and the current state is waiting for you.

Two things are worth understanding when it finishes:

<Unordered>
  <li><strong>Skipped</strong> objects were already present in the destination with the same content, so there was nothing to copy. This is what makes it safe to run a migration a second time: the parts that already arrived are not fetched again.</li>
  <li><strong>Failed</strong> objects could not be read or written, usually because the key lost access partway through or the object was removed at the source while we were copying. Everything else still completes, and you can run the migration again to pick up what failed.</li>
</Unordered>

## After the migration

Starting a migration creates a dedicated S3 token so we can write into your account, and it expires by itself after 30 days. Once everything has arrived you can revoke it under **S3 tokens** rather than waiting.

Your files are now ordinary Hippius S3 objects. Use them with the same tools and access keys as anything else you store with us, and browse them under **S3 Buckets**.

Your original provider is untouched, so keep it or close the account in your own time once you are happy everything arrived.

## Where to next

<Unordered>
  <li><a href="/use/console/s3">S3 Buckets</a>: browse your buckets and manage access keys.</li>
  <li><a href="/storage/s3/integration">Connect to Hippius S3</a>: endpoints, SDKs and code examples.</li>
</Unordered>
