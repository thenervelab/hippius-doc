---
id: cdn
title: Hippius CDN
sidebar_label: CDN
slug: /use/cdn
description: Put the Hippius CDN in front of an S3 bucket. Create a zone, serve it on its default hostname or your own domain, host a static site or single-page app, set cache rules, purge, and understand CDN prices, billing regions and the monthly spend cap.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';

The Hippius CDN serves the objects of one of your S3 buckets from cache nodes close to your visitors. It is open to every account, in the console under **CDN** in the sidebar.

## How it works

A **zone** is a CDN in front of one bucket, or one folder (prefix) of it. As soon as you create it, the zone is served over HTTPS on its default hostname, `ZONE_ID.c.hipcdn.net`. You can add your own domains to it.

<Unordered>
  <li><strong>Origins.</strong> Hippius S3 buckets, public or private. Other web servers (HTTP(S) origins) aren't supported yet.</li>
  <li><strong>Regions.</strong> Cache nodes serve from France (FR) and Australia (AU). Visitors in Oceania are sent to AU (or to FR if AU has no node up), everyone else to FR. The <strong>shield region</strong> of a zone is the cache the other regions fill from: pick the one nearest the bucket. FR is the default.</li>
  <li><strong>Limits.</strong> 10 zones per account and 20 custom domains per zone.</li>
</Unordered>

## Create a zone

<Ordered>
  <li>Open <strong>CDN</strong> in the sidebar and click <BgStyledText>New zone</BgStyledText>.</li>
  <li>Pick the <strong>Bucket</strong>. Optionally enter a <strong>prefix</strong>, a folder such as <code>public/</code>, to serve only the objects under it.</li>
  <li>Give the zone a name, choose the shield region and the <strong>monthly spend cap</strong> ($20 by default, from $1 to $100,000).</li>
  <li>Create it. The default hostname serves within a few seconds.</li>
</Ordered>

A zone in front of a private bucket creates a read-only key on that bucket for the cache nodes, so creating one needs admin access to S3 as well as to CDN on a [shared account](/use/console/team).

:::warning A zone makes a private bucket public
With a private bucket, every object under `<bucket>/<prefix>` becomes publicly readable through the zone. Use a prefix that holds only what you want to publish.
:::

## What visitors receive

<Unordered>
  <li><strong>HTTPS.</strong> Plain HTTP requests are redirected to HTTPS (301), unless you turn that off in the zone's settings.</li>
  <li><strong>GET and HEAD only.</strong> Other methods get 405. Range requests work.</li>
  <li><strong>Content type.</strong> Each object is served with the <code>Content-Type</code> stored in S3. Only when it has none, or a generic one (<code>application/octet-stream</code>), is it guessed from the extension, and only for images, audio, video, fonts, CSS, JavaScript, JSON, WebAssembly and plain text. HTML, SVG and XML are never guessed: upload them with an explicit `Content-Type`. <code>X-Content-Type-Options: nosniff</code> is always sent.</li>
  <li><strong>HTML on the default hostname is sandboxed.</strong> On <code>ZONE_ID.c.hipcdn.net</code>, HTML, SVG and other XML get <code>Content-Security-Policy: sandbox allow-scripts</code>. On your own domains they don't, so serve a website from a custom domain.</li>
  <li><strong>No CORS headers.</strong> The CDN adds no <code>Access-Control-*</code> headers yet, so a page served from another origin can't read the zone's files with <code>fetch</code> or XHR, or load web fonts from it. Serve the page and the files from the same custom domain of the zone. On the default hostname, HTML is sandboxed, so even same-host requests count as cross-origin.</li>
  <li><strong>Headers passed through</strong> from the object: <code>Content-Type</code>, <code>Content-Length</code>, <code>Content-Range</code>, <code>Content-Encoding</code>, <code>Content-Language</code>, <code>Content-Disposition</code>, <code>ETag</code>, <code>Last-Modified</code> and <code>Accept-Ranges</code>.</li>
</Unordered>

:::note Uploading from the console
Objects uploaded from the console keep the file's type, so they are served with it, HTML included. See [Uploading objects](/use/console/s3#uploading-objects).
:::

## Host a static site or single-page app

A zone can serve a website built to static files (plain HTML, or a React, Vue or Svelte app) straight from its bucket. Set it up in the **Static website** section of the zone's **Settings** tab:

<Unordered>
  <li><strong>Index document</strong> (<code>index.html</code> by default): <code>/</code> and every path ending in <code>/</code> serve that file from the same folder, so <code>/docs/</code> serves <code>docs/index.html</code>. It is one file name, without <code>/</code>.</li>
  <li><strong>Single-page app: serve the index for unknown paths.</strong> A path with no object behind it answers <code>200</code> with the index document instead of a 404, so your app's router handles <code>/profile/42</code>. Server errors (5xx) are never replaced, and the bucket is never listed.</li>
  <li><strong>Excluded prefixes</strong> (<code>/assets/</code> by default, up to 16): a missing file under them keeps its 404, so a broken script or image link never gets the HTML page back. Add your build's asset folders, such as <code>/static/</code>.</li>
</Unordered>

To publish a site:

<Ordered>
  <li>Upload the build output to a bucket (or a folder of it), keeping each file's <code>Content-Type</code>: HTML is never guessed from the extension (see <a href="#what-visitors-receive">What visitors receive</a>). A public bucket is fine as the origin of a static site.</li>
  <li>Create a zone on it, with the folder as its prefix, such as <code>build/</code>.</li>
  <li>Turn on the index document and, for a single-page app, the fallback.</li>
  <li>Add your own domain: HTML on the default hostname is sandboxed, so serve the site from a custom domain.</li>
  <li>After each deploy, purge what changed, or everything, on the <strong>Purge</strong> tab.</li>
</Ordered>

To publish a new version, purge `/index.html` (or a prefix that contains it, such as `/`), not the path `/` alone. The index document is cached under its object path, so a path purge of `/` leaves the old `/index.html` in the cache. The same goes for folders: purge the path `/docs/index.html`, or the prefix `/docs/`.

Cache rules on a static-site zone match the object path that is served: the home page matches `/index.html`, not `/`.

The zone's **Origin** section on the same tab changes its bucket or prefix, for example to switch to a new build folder. The whole zone is purged at once, so nothing from the previous origin is served again. Moving to a private bucket needs admin access to S3, as at creation.

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

**By default**, a zone caches successful responses (200 and 206) for 1 hour and 404s for 1 minute. Redirects (3xx) and server errors (5xx) aren't cached. Visitors get `Cache-Control: public, max-age=3600`. The origin's own `Cache-Control` and `Expires` are ignored. The query string isn't part of the cache key, and isn't sent to the bucket: a file is cached once per path.

The **Cache rules** tab holds an ordered list of up to 50 rules. Each rule matches a path prefix, a glob or a list of file extensions, and sets one or more actions: how long the cache keeps a file (`edge_ttl`), how long browsers keep it (`browser_ttl`), which query parameters are part of the cache key, whether to bypass the cache, and whether to ignore `Set-Cookie`. Rules are evaluated top to bottom. Click <BgStyledText>Save rules</BgStyledText> to save the list.

The **Purge** tab invalidates what you name on every cache node: paths, folders (prefixes ending in `/`), or everything. The next request for it is fetched from the origin. A purge usually reaches every node in under a minute. You can purge up to 100 times a minute per zone, and everything once a minute.

Through the API, send `POST /api/cdn/zones/ZONE_ID/purge/` with exactly one of `{"paths": [...]}`, `{"prefixes": [...]}` or `{"all": true}`.

## Prices

The CDN is billed by the hour from your balance, like [Compute](/use/compute/billing). Nothing is free: billing starts at the first byte.

| What | Price |
|---|---|
| Data billed in FR | $0.010 per GB |
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
