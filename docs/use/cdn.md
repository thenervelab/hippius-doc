---
id: cdn
title: Hippius CDN
sidebar_label: CDN
slug: /use/cdn
description: Put the Hippius CDN in front of an S3 bucket. Create a zone, serve it on its default hostname or your own domain, set cache rules, purge, and understand CDN prices, billing regions and the monthly spend cap.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';

The Hippius CDN serves the objects of one of your S3 buckets from cache nodes close to your visitors. It is open to every account, in the console under **CDN** in the sidebar.

## How it works

A **zone** is a CDN in front of one bucket, or one folder (prefix) of it. As soon as you create it, the zone is served over HTTPS on its default hostname, `ZONE_ID.c.hipcdn.net`. You can add your own domains to it.

<Unordered>
  <li><strong>Origins.</strong> Hippius S3 buckets, public or private. Other web servers (HTTP(S) origins) aren't supported yet.</li>
  <li><strong>Regions.</strong> Cache nodes serve from France (FR) and Australia (AU). The <strong>shield region</strong> of a zone is the cache the other regions fill from: pick the one nearest the bucket. FR is the default.</li>
  <li><strong>Limits.</strong> 10 zones per account and 20 custom domains per zone.</li>
</Unordered>

## Create a zone

<Ordered>
  <li>Open <strong>CDN</strong> in the sidebar and click <BgStyledText>New zone</BgStyledText>.</li>
  <li>Pick the <strong>Bucket</strong>. Optionally enter a <strong>prefix</strong>, such as <code>public/</code>, to serve only the objects under it.</li>
  <li>Give the zone a name, choose the shield region and the <strong>monthly spend cap</strong> ($20 by default, from $1 to $100,000).</li>
  <li>Create it. The default hostname serves right away.</li>
</Ordered>

A zone in front of a private bucket creates a read-only key on that bucket for the cache nodes, so creating one needs admin access to S3 as well as to CDN on a [shared account](/use/console/team).

:::note Content type comes from the object
The CDN serves each object with the `Content-Type` stored in S3. Upload your files with the right type: objects uploaded from the console keep the file's type, but are marked as attachments, so for a website upload them with an S3 client. See [Uploading objects](/use/console/s3#uploading-objects).
:::

## Use your own domain

On the zone's **Hostnames** tab, click <BgStyledText>Add domain</BgStyledText> and enter the name, for example `www.example.com`. The console then shows the DNS records to create at your DNS provider:

| Record | What it does |
|---|---|
| `CNAME www.example.com` → the zone's default hostname | Sends visitors to the CDN and proves you own the name. |
| `TXT _hippius-cdn.www.example.com` | Optional for a subdomain: proves ownership before you move the CNAME. |
| `CNAME _acme-challenge.www.example.com` | **Required** for the HTTPS certificate. |

The domain is checked every minute for the first hour, every 10 minutes for a day, then hourly for 7 days. **Check now** checks it at once. Once the DNS is proven, the certificate is issued and the domain turns **Active**.

<Unordered>
  <li><strong>A bare domain</strong> (<code>example.com</code>) needs an ALIAS, ANAME or flattened CNAME record at your DNS provider, and the TXT record. Route 53 can't alias to another provider's name: redirect the bare domain to <code>www</code> instead.</li>
  <li><strong>CAA records.</strong> Certificates come from Let's Encrypt or Google Trust Services. If your domain or a parent domain has CAA records, they must allow both <code>letsencrypt.org</code> and <code>pki.goog</code>, or no certificate can be issued. Without CAA records, there is nothing to do.</li>
  <li><strong>Wildcard domains</strong> (<code>*.example.com</code>) aren't supported.</li>
  <li>If a domain's DNS stops pointing at the zone, it stops being served. Fixing the DNS within 7 days restores it.</li>
</Unordered>

## Cache rules and purging

The **Cache rules** tab holds an ordered list of up to 50 rules. Each rule matches a path prefix, a glob or a list of file extensions, and sets how long the cache keeps a file (`edge_ttl`, or the origin's own setting), how long browsers keep it (`browser_ttl`), how query strings are treated, whether to ignore `Set-Cookie`, or bypasses the cache. Click <BgStyledText>Save rules</BgStyledText> to apply the list.

The **Purge** tab invalidates what you name on every cache node: paths, folders (prefixes ending in `/`), or everything. The next request for it is fetched from the origin. You can purge up to 100 times a minute per zone, and everything once a minute.

## Prices

The CDN is billed by the hour from your balance, like [Compute](/use/compute/billing). Nothing is free: billing starts at the first byte.

| What | Price |
|---|---|
| Data billed in FR or NL | $0.010 per GB |
| Data billed in AU | $0.060 per GB |
| Requests | $0.002 per 10,000 |
| Custom domain | $1 per domain per month, from the first one, billed by the hour while the domain and its zone are active |

The default hostname is included. Data is counted in GB of 10<sup>9</sup> bytes, headers included. Requests the CDN refuses itself, such as those of a paused zone, aren't billed.

**Billing region.** Each byte is billed at the cheaper of two regions: the one that served it, and your visitor's. A visitor in Oceania counts as AU, and a visitor anywhere else, or whose country is unknown, is billed at the cheapest region. So a byte served from Australia to a visitor in Europe costs the FR price, and a failover never raises your bill.

Prices can change. The console's CDN pages show the current ones, and the create form has a cost estimate. CDN lines appear in **Compute Usage** with the rest of your hourly usage.

## Monthly spend cap

Each zone has a monthly spend cap, $20 by default. The month's spend is checked every minute.

<Unordered>
  <li>At 80% of the cap, you get an email.</li>
  <li>At the cap, the zone is <strong>paused</strong>: requests get an error, and they aren't billed. Because the spend is checked every minute, it can end slightly above the cap. Raise the cap on the zone's <strong>Settings</strong> tab and it serves again at once. Otherwise it resumes on the 1st of the next month.</li>
</Unordered>

## Emails

The account owner is emailed when a zone reaches 80% of its cap, is paused by its cap or serves again, is suspended or blocked, when a custom domain turns active or needs action (DNS not proven after a day, certificate not issued, DNS moved), when a certificate is about to expire or has expired, and on the 1st of each month with a summary of last month's CDN usage, if there was any.

## Where to next

<Unordered>
  <li><a href="/use/console/s3">S3 Buckets</a>: create the bucket that serves as your origin.</li>
  <li><a href="/use/compute/billing">Billing and quotas</a>: how hourly usage is charged.</li>
  <li><a href="/use/console/team">Shared accounts</a>: give team members access to your CDN.</li>
</Unordered>
