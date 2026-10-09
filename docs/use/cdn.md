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
  <li><strong>Regions.</strong> Cache nodes serve from France (FR) and Australia (AU). Visitors in Oceania are sent to AU (or to FR if AU has no node up), everyone else to FR. The <strong>shield region</strong> of a zone is the cache the other regions fill from: pick the one nearest the bucket. FR is the default.</li>
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

## What visitors receive

<Unordered>
  <li><strong>HTTPS.</strong> Plain HTTP requests are redirected to HTTPS (301), unless you turn that off in the zone's settings.</li>
  <li><strong>GET and HEAD only.</strong> Other methods get 405. Range requests work.</li>
  <li><strong>Content type.</strong> Each object is served with the <code>Content-Type</code> stored in S3. Only when it has none, or a generic one (<code>application/octet-stream</code>), is it guessed from the extension, and only for images, audio, video, fonts, CSS, JavaScript, JSON, WebAssembly and plain text. HTML, SVG and XML are never guessed: upload them with an explicit `Content-Type`. <code>X-Content-Type-Options: nosniff</code> is always sent.</li>
  <li><strong>HTML on the default hostname is sandboxed.</strong> On <code>ZONE_ID.c.hipcdn.net</code>, HTML, SVG and other XML get <code>Content-Security-Policy: sandbox allow-scripts</code>. On your own domains they don't, so serve a website from a custom domain.</li>
  <li><strong>Headers passed through</strong> from the object: <code>Content-Type</code>, <code>Content-Length</code>, <code>Content-Range</code>, <code>Content-Encoding</code>, <code>Content-Language</code>, <code>Content-Disposition</code>, <code>ETag</code>, <code>Last-Modified</code> and <code>Accept-Ranges</code>.</li>
</Unordered>

:::note Uploading from the console
Objects uploaded from the console keep the file's type, so they are served with it, HTML included. See [Uploading objects](/use/console/s3#uploading-objects).
:::

## Use your own domain

On the zone's **Hostnames** tab, click <BgStyledText>Add domain</BgStyledText> and enter the name. The examples below use `social.example.com` on a zone whose default hostname is `ZONE_ID.c.hipcdn.net`. The console shows the exact values for your domain, ready to copy.

### The three records

| Record | Value | What it does |
|---|---|---|
| `CNAME social.example.com` | `ZONE_ID.c.hipcdn.net` | Sends visitors to the CDN, and proves you own the name. Creating it switches live traffic to Hippius. |
| `TXT _hippius-cdn.social.example.com` | `hippius-cdn-…` (your token) | Proves you own the name. Optional for a subdomain (the CNAME proves it too), but it lets you prove ownership, and get the certificate, before you move the CNAME. Required for a bare domain. |

Either the hostname CNAME or the TXT is enough to prove ownership. Once it is proven and the certificate is issued, the domain is **Active** and billed, whether or not its traffic reaches Hippius yet.
| `CNAME _acme-challenge.social.example.com` | `….dcv.c.hipcdn.net` | **Required** for the HTTPS certificate: it lets Hippius complete the certificate authority's DNS check for your name. |

A name can hold a CNAME and nothing else. If `social.example.com` already has an A, AAAA or CNAME record (for example a CNAME to CloudFront), edit or delete it rather than adding a second one. The same goes for an old `_acme-challenge` TXT record left by another certificate tool.

<Unordered>
  <li><strong>A bare domain</strong> (<code>example.com</code>) needs an ALIAS, ANAME or flattened CNAME record at your DNS provider, and the TXT record. Route 53 can't alias to another provider's name: serve the CDN on <code>www</code> and redirect the bare domain to it.</li>
  <li><strong>CAA records.</strong> Certificates come from Let's Encrypt or Google Trust Services. If your domain or a parent domain has CAA records, they must allow both <code>letsencrypt.org</code> and <code>pki.goog</code>, or no certificate can be issued. Without CAA records, there is nothing to do.</li>
  <li><strong>Wildcard domains</strong> (<code>*.example.com</code>) aren't supported.</li>
</Unordered>

### Name fields: the part before your domain

Most DNS editors add your domain to whatever you type in the name field. For `social.example.com`, type only the part before `example.com`:

| Record | Type in the name field |
|---|---|
| Hostname CNAME | `social` |
| TXT | `_hippius-cdn.social` |
| Certificate CNAME | `_acme-challenge.social` |

Typing the full name in such an editor creates `social.example.com.example.com`, which never works. The console reads your domain's nameservers to find the zone your provider hosts, and shows the exact name to type next to each record.

### Instructions by DNS provider

The console detects your DNS provider from your domain's nameservers and shows its tips. In short:

| Provider | Name field | Notes |
|---|---|---|
| **Cloudflare** | Relative (`_acme-challenge.social`) or the full name: both work | Set the proxy status of **both CNAME records to DNS only (grey cloud)**. A proxied (orange cloud) CNAME hides the CDN behind Cloudflare's addresses: the CNAME can't be checked, and visitors reach Cloudflare instead of Hippius. One-click setup is available (see below). |
| **Amazon Route 53** | Relative: in **Create record**, type the part before your domain in **Record name** (Route 53 shows the domain after it) | A bare domain can't alias to another provider's name: use a `www` hostname and redirect the bare domain. If the name has an alias record (for example an A alias to CloudFront), delete it, or let one-click setup replace it. One-click setup is available. |
| **SiteGround** | Relative: in **Site Tools > Domain > DNS Zone Editor**, pick the record type and type the part before your domain in **Name** (SiteGround shows the domain after it) | If the hostname already has an A or CNAME record (for example to CloudFront, or to the site itself), delete or edit it first. |
| **GoDaddy** | Relative: **DNS Management > Add New Record**, **Name** is the part before your domain | If a record already exists for the name, edit it instead of adding a second one. |
| **OVHcloud** | Relative: **DNS zone > Add an entry**, **Sub-domain** is the part before your domain | End the CNAME targets with a dot (`ZONE_ID.c.hipcdn.net.`): without it, OVHcloud appends your domain to the target. |
| **Gandi** | Relative: **DNS records > Add record**, **Name** is the part before your domain | In text (zone file) mode, end the CNAME targets with a dot. |
| **Namecheap** | Relative: **Advanced DNS > Add new record**, **Host** is the part before your domain | |
| **IONOS** | Relative: **Domains & SSL > DNS > Add record**, **Host name** is the part before your domain | |
| **Google Cloud DNS** | Relative in the console (**Add standard**: the domain is shown after **DNS name**) | With `gcloud`, use the full name with a final dot: `_acme-challenge.social.example.com.` |
| **DigitalOcean** | Relative: **Networking > Domains**, **Hostname** is the part before your domain | |
| **Vercel** | Relative: the domain's **DNS Records**, **Name** is the part before your domain | |
| **Hostinger** | Relative: **DNS / Nameservers > Manage DNS records**, **Name** is the part before your domain | |
| **Porkbun** | Relative: **DNS Records**, **Host** is the part before your domain (empty for the domain itself) | |
| **Other providers** | Usually relative | If your editor shows the full name in the field, type the full name instead. |

### Checking the records

The domain is checked every minute for the first hour, every 10 minutes for a day, then hourly until 7 days after the first check. On the **Hostnames** tab, each of the three records has its own line:

<Unordered>
  <li>✓: the record is in place.</li>
  <li>✗ <strong>missing</strong>: nothing is published at that name yet.</li>
  <li>✗ <strong>wrong</strong>: something else is published there, and the console shows what it found instead, for example a CNAME pointing to <code>d4x3….cloudfront.net</code>, or address (A) records where a CNAME is expected.</li>
  <li>For a bare domain, the ALIAS can't be checked by name (it is flattened into addresses): the TXT record proves it.</li>
</Unordered>

**Check now** checks the domain at once: at most once every 10 seconds per domain, and 30 times a minute per user (it needs CDN operator access on a shared account). Once the DNS is proven, the certificate is issued, provided the `_acme-challenge` CNAME is in place, and the domain turns **Active**.

If a domain stops proving ownership (neither the CNAME nor the TXT points at the zone any more), it stops being served. Fixing the DNS within 7 days restores it. While the TXT stays in place, moving the CNAME elsewhere is not detected: remove the domain from the zone when you stop using it.

### One-click setup (Cloudflare and Route 53)

If your DNS is at Cloudflare or Route 53, <BgStyledText>Set up automatically</BgStyledText> on the **Hostnames** tab writes the records for you with a credential you paste:

<Unordered>
  <li>The credential is used <strong>once</strong>, during that request, to write the records, then dropped. Hippius never stores it, logs it or shows it back.</li>
  <li>Before writing anything, the existing records at those names are read. If one would be replaced, for example the hostname's CNAME still pointing at CloudFront, the console shows what is there and asks you to confirm <strong>Replace</strong>. Replacing the hostname's own record switches its live traffic to Hippius. Nothing is written until you confirm.</li>
  <li><strong>Only the verification records</strong> writes just the TXT and <code>_acme-challenge</code> records and leaves the hostname's record alone, so the certificate is issued while traffic still goes to your current host. The TXT proves ownership, so the domain turns <strong>Active</strong> and is billed from then on, even before you switch the CNAME. No reminder tells you to switch it: do it when you are ready.</li>
  <li>Other TXT records on <code>_hippius-cdn.social.example.com</code> are kept. Old Hippius tokens there (<code>hippius-cdn-…</code>) are replaced without asking. Records that are already right are left as they are.</li>
  <li>It needs the same access as editing the zone (CDN admin on a <a href="/use/console/team">shared account</a>), and is limited to 10 times per hour per user.</li>
</Unordered>

**Cloudflare.** Create an API token (**My Profile > API Tokens > Create Token**) with the permission **Zone > DNS > Edit**, limited to your domain's zone. Either add **Zone > Zone > Read** so Hippius can find the zone, or paste the zone's **Zone ID** (shown on its overview page). The CNAME records are written DNS only. Delete the token once the domain is set up.

**Route 53.** Prefer a short-lived credential: create a role with the policy below, run `aws sts assume-role --role-arn ROLE_ARN --role-session-name hippius-cdn --duration-seconds 900`, and paste the access key ID, secret access key and session token it returns. Optionally paste the hosted zone ID. The minimal policy, for `social.example.com` in hosted zone `HOSTED_ZONE_ID`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {"Effect": "Allow", "Action": "route53:ListHostedZones", "Resource": "*"},
    {"Effect": "Allow", "Action": "route53:ListResourceRecordSets",
     "Resource": "arn:aws:route53:::hostedzone/HOSTED_ZONE_ID"},
    {"Effect": "Allow", "Action": "route53:ChangeResourceRecordSets",
     "Resource": "arn:aws:route53:::hostedzone/HOSTED_ZONE_ID",
     "Condition": {"ForAllValues:StringEquals": {
       "route53:ChangeResourceRecordSetsNormalizedRecordNames": [
         "social.example.com", "_hippius-cdn.social.example.com", "_acme-challenge.social.example.com"],
       "route53:ChangeResourceRecordSetsRecordTypes": ["CNAME", "TXT", "A", "AAAA"]}}}
  ]
}
```

`route53:ListHostedZones` can be dropped if you paste the hosted zone ID. `A` and `AAAA` are only needed to replace an existing alias or address record at the hostname. All the changes are applied as one batch. On Route 53, a bare domain can only get the verification records.

### Reminder emails

While a domain's DNS isn't proven, the account owner gets:

| When | Email |
|---|---|
| 1 day after the first check | **Action needed**: the records, and what the last check found for each one. |
| 3 days after | **Reminder**: the same, as last checked. |
| 6 days after | **Last reminder**: "we stop checking on DATE", 7 days after the first check. |

Each email lists the records not confirmed correct (missing, wrong, or a failed lookup), with what was found instead, and your DNS provider's tips when it was detected. The emails stop as soon as the DNS is proven.

At 7 days the domain turns **Failed**: it isn't checked automatically any more, isn't served and isn't billed. No email is sent after 8 days. Fix the records and press **Check now**: it checks at once, and if the DNS still doesn't prove the domain, starts a new week of checks and reminders. Or remove the domain from the zone.

The two reminders respect the email notifications switch in your account settings; the first email is always sent.

## Cache rules and purging

**By default**, a zone caches successful responses (200 and 206) for 1 hour and 404s for 1 minute. Redirects (3xx) and server errors (5xx) aren't cached. Visitors get `Cache-Control: public, max-age=3600`. The origin's own `Cache-Control` and `Expires` are ignored. The query string isn't part of the cache key, and isn't sent to the bucket: a file is cached once per path.

The **Cache rules** tab holds an ordered list of up to 50 rules. Each rule matches a path prefix, a glob or a list of file extensions, and sets one or more actions: how long the cache keeps a file (`edge_ttl`), how long browsers keep it (`browser_ttl`), which query parameters are part of the cache key, whether to bypass the cache, and whether to ignore `Set-Cookie`. Rules are evaluated top to bottom. Click <BgStyledText>Save rules</BgStyledText> to save the list.

:::info Rules are being switched on
Cache nodes don't apply cache rules yet: until they do, every zone uses the defaults above, and the console shows a banner. Rules you save now take effect once they are switched on.
:::

The **Purge** tab invalidates what you name on every cache node: paths, folders (prefixes ending in `/`), or everything. The next request for it is fetched from the origin. A purge usually reaches every node in under 30 seconds. You can purge up to 100 times a minute per zone, and everything once a minute.

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

The account owner is emailed when a zone reaches 80% of its cap, is paused by its cap or serves again, is suspended or blocked, when a custom domain turns active or needs action (DNS not proven after 1, 3 and 6 days: see [Reminder emails](#reminder-emails); certificate not issued; DNS moved), when a certificate is about to expire or has expired, and on the 1st of each month with a summary of last month's CDN usage, if there was any. The monthly summary and the two DNS reminders respect the email notifications switch in your account settings; the others are always sent.

## Where to next

<Unordered>
  <li><a href="/use/console/s3">S3 Buckets</a>: create the bucket that serves as your origin.</li>
  <li><a href="/use/compute/billing">Billing and quotas</a>: how hourly usage is charged.</li>
  <li><a href="/use/console/team">Shared accounts</a>: give team members access to your CDN.</li>
</Unordered>
