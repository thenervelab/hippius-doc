---
id: credentials
title: Get Your Hippius Credentials
sidebar_label: Hippius Credentials
slug: /use/wordpress-plugin/credentials
description: Create a Hippius account, top up your account balance, create S3 access keys and a uniquely named bucket, and make the bucket public so your WordPress site can serve media from it.
---

import Ordered from '@site/src/components/Ordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

Before you set up the plugin, you'll need a Hippius account, a pair of S3 access keys and a bucket for your media. Everything here happens in the Hippius Console and takes a few minutes.

## Step 1: Create your Hippius account

<Ordered>
  <li>Head to <a href="https://console.hippius.com">console.hippius.com</a>.</li>
  <li>Sign in with Google, GitHub or Apple.</li>
</Ordered>

The plugin's settings page also has a <BgStyledText>Create Account</BgStyledText> link that takes you to the same place.

:::note
No wallet, no seed phrase, no browser extension.
:::

<Screenshot src="/img/console/getting-started/login.png" alt="Hippius console sign-in page" dark />

## Step 2: Add funds to your account balance

Your storage is paid from your account balance, or with an S3 plan. Downloads are free, only storage is billed, so visitors loading your images never add to the bill.

<Ordered>
  <li>Open <BgStyledText>Billing</BgStyledText> in the console.</li>
  <li>Click <BgStyledText>+ Top up</BgStyledText>.</li>
  <li>Top up your account balance by card, TAO, Bitcoin or USDC. A card payment runs through Stripe. The other three land on your account balance once the payment confirms.</li>
</Ordered>

<Screenshot src="/img/console/billing/overview.png" alt="Billing page, to top up your account balance" dark raw />

Storing several terabytes? A monthly S3 plan costs less than pay as you go. See [S3 plans](/use/console/billing#s3-plans-and-pay-as-you-go), and [Console Billing](/use/console/billing) for the full walkthrough.

## Step 3: Create your S3 access keys

The plugin uses a pair of S3 access keys to upload your media, the same kind any S3 tool uses.

<Ordered>
  <li>In the console, open <BgStyledText>S3</BgStyledText> → <BgStyledText>S3 Buckets</BgStyledText>.</li>
  <li>Click <BgStyledText>+ Create Master Token</BgStyledText>.</li>
  <li>Give the token a name you'll recognise later, such as <em>WordPress</em>, and pick how long it lasts.</li>
  <li>Click <BgStyledText>Create Master Token</BgStyledText>, then save your <strong>Access Key ID</strong> (it starts with <code>hip_</code>) and your <strong>Secret Key</strong> somewhere safe.</li>
</Ordered>

Your website uses these keys every time it uploads, so a short expiry means uploads stop when the token runs out. Choose **1 year** or a custom date, and set yourself a reminder: when the time comes, create a new token in the console and save its keys in the plugin.

:::danger Your Secret Key is shown only once
Copy it into a password manager right away. There's no way to recover it later, so if you lose it you'll have to generate a new key pair.
:::

<Screenshot src="/img/console/s3/create-master-token.png" alt="Create master token dialog in the Hippius console" dark />

If you want a fuller walkthrough of tokens and scopes, see [S3 Token Management](/use/s3-token-management).

## Step 4: Create your bucket

The plugin doesn't create a bucket for you yet, so create your bucket in the console first.

Bucket names on Hippius are **globally unique**, like on AWS: once anyone has taken a name, nobody else can use it. The settings page suggests `wordpress-media`, but that name is almost certainly taken, so pick your own. Including your site's name works well, for example `myshop-wordpress-media`.

<Ordered>
  <li>In <BgStyledText>S3 Buckets</BgStyledText>, click <BgStyledText>+ Create Bucket</BgStyledText>.</li>
  <li>Enter your bucket name. Use lowercase letters, numbers and dashes, 3 to 63 characters, starting and ending with a letter or number.</li>
  <li>Click <BgStyledText>Create Bucket</BgStyledText>, and note the exact name for the plugin settings.</li>
</Ordered>

<Screenshot src="/img/console/s3/create-bucket.png" alt="Create bucket dialog in the Hippius console" dark />

## Step 5: Make your bucket public

Buckets created in the Hippius Console are always **private**, and the console doesn't offer a public option. For a WordPress site, that matters: your pages load each image straight from its public Hippius URL, and your visitors' browsers can't sign in to a private bucket. So for your media to show up on your site, the bucket needs to be public.

It's your choice, and there are two ways to do it:

<Ordered>
  <li><strong>From the plugin (easiest).</strong> Once you've entered your keys and bucket, the plugin checks whether the bucket is public. If it isn't, click <BgStyledText>Make Bucket Public</BgStyledText> and the plugin applies the public-read policy for you. You'll do this on the next page.</li>
  <li><strong>With any S3 client.</strong> Set a public-read ACL (PutBucketAcl) or the public-read bucket policy (PutBucketPolicy). For example, with the AWS CLI:</li>
</Ordered>

```bash
aws s3api put-bucket-acl --bucket your-bucket-name --acl public-read \
  --endpoint-url https://s3.hippius.com
```

See [Make a bucket or object public](/storage/s3/advanced#make-a-bucket-or-object-public) for the policy version and how to make a bucket private again.

:::info Public means readable, not unencrypted
A public bucket lets anyone with a file's URL download it, which is exactly what a website needs. The files are still encrypted at rest on Hippius. Keep anything private out of this bucket.
:::

## Step 6: Copy your API token (optional)

If you'd like the plugin to show your account balance inside the WordPress dashboard, add your API token. The plugin works fine without it: the token is optional, only needed to show your account balance in the dashboard.

<Ordered>
  <li>In the Hippius console, open <BgStyledText>Settings</BgStyledText> and find the <strong>API Token</strong> section.</li>
  <li>Click the eye icon to reveal the token, then the copy icon to copy it.</li>
</Ordered>

The API Token section is shown when you signed in with Google, GitHub or Apple. Treat the token like a password: anyone who has it can act on your account. See [Console Settings](/use/console/settings#api-token) for more.

Once you've got your Access Key ID, Secret Access Key, bucket name and (optionally) an API token, head to [Configure the plugin](/use/wordpress-plugin/configure).
