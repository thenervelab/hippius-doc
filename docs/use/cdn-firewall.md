---
id: cdn-firewall
title: CDN firewall (WAF)
sidebar_label: CDN firewall
slug: /use/cdn/firewall
unlisted: true
description: Draft. Block, allow or rate-limit requests to a Hippius CDN zone with firewall rules evaluated on the cache nodes, before the cache and your bucket.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';

:::warning Not available yet
The CDN firewall isn't available yet. This page describes it as it is being built, and details can change before release. Nothing here applies to your zones today.
:::

The CDN firewall (WAF) decides, on each cache node, which requests to a [CDN zone](/use/cdn) are served. Use it to block scrapers or whole countries, keep an admin path to your office's addresses, or slow down a client that hammers the zone. It runs before the cache and the bucket, so a blocked request never reaches either.

## How it works

The firewall is an add-on per zone, on the zone's **Security** tab. It has three modes:

| Mode | What happens |
|---|---|
| **Off** | Nothing is evaluated, and the add-on isn't billed. |
| **Log only** | Every rule is evaluated and its matches are counted, but no request is refused. Use it to try new rules on real traffic. |
| **On** | Rules are enforced: matching requests are blocked, allowed or logged. |

Every save publishes a new **version** of the zone's firewall. The **Overview** shows on how many live cache nodes it is deployed, usually within 10 seconds.

Requests the firewall blocks or rate-limits are never billed.

## Custom rules

A custom rule is an **expression** and an **action**. Rules are checked top to bottom:

<Unordered>
  <li><strong>Block</strong>: the request gets the block page, and no later rule runs.</li>
  <li><strong>Allow</strong>: the request skips the later custom rules. Rate limits still apply.</li>
  <li><strong>Log</strong>: the match is counted, and the next rules run.</li>
</Unordered>

Each rule has a description and can be turned off without deleting it. Move a rule up or down with its arrows to change the order, then click <BgStyledText>Save and publish</BgStyledText>.

### Writing expressions

Expressions use a subset of Cloudflare's rule language:

```text
http.request.uri.path starts_with "/admin" and not ip.src in $office
ip.src.country in {"CN" "RU"} or http.user_agent contains "curl"
lower(http.request.headers["x-env"]) eq "staging"
```

| Field | Holds |
|---|---|
| `ip.src` | The visitor's IP address. Compare it with `eq`, or test it against addresses and networks with `in`. |
| `ip.src.country` | The visitor's country, two capital letters (`FR`). `XX` when unknown. |
| `ip.src.asn` | The visitor's network (AS number). `0` when unknown. |
| `http.host` | The hostname requested, lowercase, without the port. |
| `http.request.method` | `GET`, `HEAD` or `OPTIONS`. |
| `http.request.uri.path` | The path, decoded, without the query string. |
| `http.request.uri.query` | The query string as sent, without the `?`. |
| `http.request.headers["name"]` | A request header, name in lowercase. A missing header is `""`. |
| `http.user_agent`, `http.referer` | The `User-Agent` and `Referer` headers. |
| `http.request.version` | `HTTP/1.0`, `HTTP/1.1`, `HTTP/2` or `HTTP/3`. |
| `ssl` | True for HTTPS requests. |

<Unordered>
  <li><strong>Operators</strong>: <code>eq</code> <code>ne</code> <code>lt</code> <code>le</code> <code>gt</code> <code>ge</code> (or <code>==</code> <code>!=</code> <code>&lt;</code> <code>&lt;=</code> <code>&gt;</code> <code>&gt;=</code>), <code>contains</code>, <code>starts_with</code>, <code>ends_with</code>, <code>in {"{...}"}</code> and <code>in $list</code>. Combine them with <code>and</code>, <code>or</code>, <code>not</code> and parentheses.</li>
  <li><strong>Case.</strong> Text comparisons are exact and case-sensitive. Wrap a field in <code>lower()</code> to compare it in lowercase.</li>
  <li><strong>Regular expressions</strong> (<code>matches</code>, or <code>~</code>) need the Advanced tier. They search the first 4 KB of the field.</li>
  <li><strong>Limits per expression</strong>: 4 KB of text, 32 comparisons, 8 levels of nesting, 3 regular expressions, 64 values in a set.</li>
</Unordered>

An expression the nodes couldn't run is refused when you save, with the reason.

### Test a rule before publishing

The test button next to a rule, or the test panel, runs a rule, an expression or the published rules against a request you describe: client IP, country, AS number, method, host, path, query string, user agent, referer and HTTP version, each at most 2 KB. It tells you whether the rule matches. Nothing is published.

## Rate limits

A rate limit counts the requests that match its expression, and acts once there are too many:

<Unordered>
  <li><strong>Counted per</strong>: client IP, client IP and hostname, or client IP and first path segment (<code>/api/x</code> counts under <code>/api</code>).</li>
  <li><strong>Requests per period</strong>: up to 1,000,000, per 10 seconds or 1 minute (10 minutes on Advanced).</li>
  <li><strong>Ban</strong>: from 10 to 3,600 seconds. Over the limit, the client is refused for that long.</li>
  <li><strong>Action</strong>: <strong>Block</strong> answers <code>429</code>, or <strong>Log</strong> only counts.</li>
</Unordered>

:::note Limits are approximate
Each cache node counts on its own, in fixed windows. A client whose requests reach several nodes can go above the limit before every node blocks it.
:::

## Lists

A list holds IP addresses and networks (`203.0.113.7`, `198.51.100.0/24`, `2001:db8::/32`), AS numbers (`13335`) or countries (`FR`). Rules use it by name, such as `ip.src in $office` or `ip.src.country in $blocked_countries`.

<Unordered>
  <li>Lists belong to the account, so every zone can use them. Names are up to 32 lowercase letters, digits and underscores.</li>
  <li>Changing a list publishes the firewall of every zone that uses it again.</li>
  <li>A list still used by a rule can't be deleted. An emptied list matches nothing.</li>
</Unordered>

## Block page

A request blocked by a custom rule gets `403 Forbidden` or `429 Too Many Requests`, as you choose, with a static body of at most 4 KB in HTML, JSON or plain text. `{ref}` in the body is replaced by the request's reference, the same one sampled events show, so a visitor can quote it to you. Rate-limited requests always get `429`.

## Analytics, events and versions

<Unordered>
  <li><strong>Analytics</strong>: matches over 24 hours, 7 days or 30 days, grouped by rule, action or country.</li>
  <li><strong>Events</strong>: a sample of the requests that matched a rule, with the visitor's IP address, country and network, the method, host and path (without query values), the user agent and the rule. Requests that match no rule are never recorded. Events are kept 24 hours on Standard and 7 days on Advanced, are visible to CDN operators and admins only, and can be turned off with <strong>Keep sampled events</strong>.</li>
  <li><strong>Versions</strong>: every published version is kept. <strong>Roll back</strong> publishes a copy of an older version as the newest one.</li>
</Unordered>

## Tiers and limits

| | Standard | Advanced |
|---|---|---|
| Custom rules | 25 | 100 |
| Rate limits | 5, per 10 s or 1 min | 25, up to 10 min |
| Lists used by a zone | 5, up to 1,000 items each | 25, up to 10,000 items each |
| Regular expressions (`matches`) | No | Yes |
| Sampled events | 2,000 per zone per day, kept 24 hours | 20,000 per zone per day, kept 7 days |

The add-on is billed per second, at the tier's monthly price, while the mode isn't **Off** and the zone is active. Prices will be shown in the console before release. Its cost counts toward the zone's [monthly spend cap](/use/cdn#monthly-spend-cap).

## Who can change it

On a [shared account](/use/console/team), CDN viewers see the firewall, CDN operators can also test rules and read events, and CDN admins can change the mode, rules, lists and block page, and roll back.

## Where to next

<Unordered>
  <li><a href="/use/cdn">Hippius CDN</a>: create a zone and serve it on your own domain.</li>
  <li><a href="/use/console/team">Shared accounts</a>: give team members CDN access.</li>
</Unordered>
