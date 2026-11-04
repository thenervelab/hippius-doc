---
id: cdn-firewall
title: WAF (Web Application Firewall)
sidebar_label: WAF
slug: /use/cdn/firewall
description: Block, allow or rate-limit requests to a Hippius CDN zone with firewall rules evaluated on the cache nodes, before the cache and your bucket. Custom rules, rate limits, IP/ASN/country lists, log mode, versions, analytics, prices and API.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';

The WAF decides on each cache node which requests to a [CDN zone](/use/cdn) are served. Use it to block scrapers or whole countries, restrict an admin path to your office's addresses, or slow down a client that hammers the zone. It runs before CORS, the HTTPS redirect, the cache and the bucket, so a blocked request never reaches any of them, and it is never billed.

The WAF is available on every CDN zone, from the zone's **Security** tab.

## How it works

The WAF is an add-on per zone, on the zone's **Security** tab. It has three modes:

| Mode | What happens |
|---|---|
| **Off** | Nothing is evaluated, and the add-on isn't billed. |
| **Log only** | Every rule is evaluated and its matches are counted, but no request is refused. Use it to try rules on real traffic. |
| **On** | Rules are enforced: matching requests are blocked, allowed or logged. |

Each save publishes a new **version** of the zone's WAF. The **Overview** shows on how many live cache nodes the version is deployed, usually within 10 seconds. A zone can publish once every 5 seconds and 200 times a day.

Custom rules run first, then rate limits.

## Custom rules

A custom rule is an **expression** and an **action**. Rules are checked top to bottom:

<Unordered>
  <li><strong>Block</strong>: the request gets the <a href="#block-page">block page</a>, and no later rule runs.</li>
  <li><strong>Allow</strong>: the request skips the later custom rules. Rate limits still apply.</li>
  <li><strong>Log</strong>: the match is counted, and the next rules run.</li>
</Unordered>

Each rule has an optional description (up to 256 characters) and can be turned off without deleting it. Move rules up or down with their arrows, then click <BgStyledText>Save and publish</BgStyledText>.

### Expressions

Expressions use a subset of Cloudflare's rule language (wirefilter):

```text
http.request.uri.path starts_with "/admin" and not ip.src in $office
ip.src.country in {"CN" "RU"} or http.user_agent contains "curl"
lower(http.request.headers["x-env"]) eq "staging"
```

| Field | Type | Holds |
|---|---|---|
| `ip.src` | IP | The visitor's IP address. IPv4-mapped IPv6 addresses read as IPv4. |
| `ip.src.country` | Text | The visitor's country, two capital letters (`FR`), `XX` when unknown. |
| `ip.src.asn` | Number | The visitor's network (AS number), `0` when unknown. |
| `http.host` | Text | The hostname requested, lowercase, without the port. |
| `http.request.method` | Text | `GET`, `HEAD`, or `OPTIONS` for a CORS preflight. |
| `http.request.uri.path` | Text | The path, decoded once, without the query string. |
| `http.request.uri.query` | Text | The query string as sent, without the `?`. |
| `http.request.headers["name"]` | Text | A request header, name in lowercase. A missing header is `""`. |
| `http.user_agent`, `http.referer` | Text | The `User-Agent` and `Referer` headers. |
| `http.request.version` | Text | `HTTP/1.0`, `HTTP/1.1`, `HTTP/2` or `HTTP/3`. |
| `ssl` | Boolean | True for HTTPS. Use it alone: `ssl` or `not ssl`. |

| Operators | On |
|---|---|
| `eq` `ne` (`==` `!=`) | Text, IP, numbers |
| `lt` `le` `gt` `ge` (`<` `<=` `>` `>=`) | Numbers |
| `contains`, `starts_with`, `ends_with` | Text. `starts_with(field, "x")` also works. |
| `matches` (`~`), a regular expression | Text, Advanced tier only |
| `in {"a" "b"}` | Text, IP (addresses and networks such as `198.51.100.0/24`), numbers |
| `in $list` | `ip.src`, `ip.src.asn` and `ip.src.country`, with a [list](#lists) of the same kind |
| `and` `or` `not` (`&&` `\|\|` `!`), parentheses | Combine conditions |

<Unordered>
  <li><strong>Case.</strong> Text comparisons are exact and case-sensitive. <code>lower()</code> lowercases a field (ASCII letters only). A value a field can never hold, such as an uppercase host or a lowercase country, is refused.</li>
  <li><strong>Strings</strong> are <code>"..."</code> (escape <code>\"</code> and <code>\\</code>) or raw <code>r"..."</code>.</li>
  <li><strong>Regular expressions</strong> search the first 4 KB of the field, unanchored.</li>
  <li><strong>Limits per expression</strong>: 4 KB of text, 32 conditions, 8 levels of nesting, 3 regular expressions, 64 values in a set, 1 KB per string.</li>
</Unordered>

An expression the cache nodes couldn't run is refused when you save, with the reason.

### Test a rule

The test button next to a rule runs it against a request you describe: client IP, country, AS number, method, host, path, query string, user agent, referer and HTTP version, each at most 2 KB. It says whether the rule matches, or which published rules match. It is evaluated on our side, as the cache nodes would, and nothing is published. Testing needs CDN operator access.

## Rate limits

A rate limit counts the requests that match its expression, and acts once there are too many:

<Unordered>
  <li><strong>Counted per</strong>: client IP, client IP and hostname, or client IP and first path segment (<code>/api/x</code> counts under <code>/api</code>).</li>
  <li><strong>Requests per period</strong>: 1 to 1,000,000 requests per 10 seconds or 1 minute, or 10 minutes on Advanced.</li>
  <li><strong>Ban</strong>: 10 to 3,600 seconds. Once over the limit, the client is refused for that long.</li>
  <li><strong>Action</strong>: <strong>Block</strong> answers <code>429</code> with the block page's body, or <strong>Log</strong> only counts.</li>
</Unordered>

:::note Rate limits are approximate
Each cache node counts on its own, in fixed windows. A client whose requests reach several cache nodes can go above the limit before every node blocks it.
:::

## Lists

A list holds IP addresses and networks (`203.0.113.7`, `198.51.100.0/24`, `2001:db8::/32`), AS numbers (`13335`) or countries (`FR`). Rules use it by name: `ip.src in $office`, `ip.src.asn in $hosting`, `ip.src.country in $blocked`.

<Unordered>
  <li>Lists belong to the account, so every zone can use them: up to 25 lists of up to 10,000 items each. A zone can use as many as its <a href="#tiers-and-prices">tier</a> allows.</li>
  <li>Names are 1 to 32 lowercase letters, digits and underscores. Items are stored in canonical form, merged and sorted.</li>
  <li>Changing a list publishes the WAF of every zone that uses it again.</li>
  <li>A list still used by a rule can't be deleted. An emptied list matches nothing.</li>
</Unordered>

## Block page

A request blocked by a custom rule gets `403 Forbidden` (the default) or `429 Too Many Requests`, as you choose, with a static body of at most 4 KB in plain text (the default), HTML or JSON. Rate-limited requests always get `429`, with the same body. Set it on the **Overview**.

`{ref}` in the body is replaced by the request's reference, the same one the sampled events show, so a visitor can quote it to you.

## Analytics and sampled events

<Unordered>
  <li><strong>Analytics</strong>: matches over the last 24 hours, 7 days or 30 days, grouped by rule, action or country. Counters are kept 35 days.</li>
  <li><strong>Events</strong>: a sample of the requests that matched a rule, with the time, the request's reference, the rule and action, the visitor's IP address, country and AS number, the method, host and path, the names of the query parameters (never their values), the user agent and the HTTP version. Requests that match no rule are never recorded.</li>
  <li>Events are kept 24 hours on Standard and 7 days on Advanced, and are visible to CDN operators and admins only. Turn off <strong>Keep sampled events</strong> on the <strong>Overview</strong> to stop sampling.</li>
</Unordered>

## Versions and rollback

The last 50 published versions are listed on **Versions**. **Roll back** publishes a copy of an older version as the newest one, so the history is never rewritten.

## Tiers and prices

| | Standard | Advanced |
|---|---|---|
| Price | $5 per zone per month | $20 per zone per month |
| Custom rules | 25 | 100 |
| Rate limits | 5, per 10 s or 1 min | 25, per 10 s, 1 min or 10 min |
| Lists a zone uses | 5, up to 1,000 items each | 25, up to 10,000 items each |
| Regular expressions (`matches`) | No | Yes |
| Compiled rules size | 256 KB | 1 MB |
| Sampled events | 2,000 per zone per day, kept 24 hours | 20,000 per zone per day, kept 7 days |

<Unordered>
  <li>The add-on is billed by the hour from your balance, prorated per second (one minute at least), while the mode isn't <strong>Off</strong> and the zone is active. <strong>Log only</strong> is billed like <strong>On</strong>. Changing the tier prorates both.</li>
  <li>Requests the WAF blocks or rate-limits are never billed. Requests it lets through are billed as usual (<a href="/use/cdn#prices">CDN prices</a>).</li>
  <li>The add-on counts toward the zone's <a href="/use/cdn#monthly-spend-cap">monthly spend cap</a>. A zone paused by its cap isn't billed for the WAF either.</li>
</Unordered>

The current prices are also in `GET https://api.hippius.com/api/cdn/prices/`, under `waf` (no token needed).

## Who can change it

On a [shared account](/use/console/team), CDN viewers see the WAF and its analytics, CDN operators can also test rules and read events, and CDN admins can change the mode, tier, rules, lists and block page, and roll back.

## API

The WAF has its own routes under `https://api.hippius.com/api/cdn/`, with the same [authentication](/use/api#authentication) as the rest of the API. `ZONE_ID` is the zone's id, as in the rest of the [CDN API](/use/cdn).

| Method and path | Access | What it does |
|---|---|---|
| `GET /zones/ZONE_ID/waf/` | Viewer | Settings, active version and tier `limits` |
| `PATCH /zones/ZONE_ID/waf/` | Admin | Change `mode`, `tier`, `event_sampling` or `block_response`, and publish |
| `GET`, `PUT /zones/ZONE_ID/waf/rules/` | Viewer, Admin | Read or replace the custom rules, and publish |
| `GET`, `PUT /zones/ZONE_ID/waf/rate-limits/` | Viewer, Admin | Read or replace the rate limits, and publish |
| `GET /zones/ZONE_ID/waf/versions/` | Viewer | The last 50 versions, newest first |
| `GET /zones/ZONE_ID/waf/versions/N/` | Viewer | One version and its source |
| `POST /zones/ZONE_ID/waf/versions/N/rollback/` | Admin | Publish a copy of version `N` |
| `GET /zones/ZONE_ID/waf/status/` | Viewer | Live cache nodes and how many run the active version |
| `POST /zones/ZONE_ID/waf/test/` | Operator | Test an expression or the published rules on a request |
| `GET /zones/ZONE_ID/waf/analytics/` | Viewer | Matches over time: `from`, `to`, `step` (`5m`, `1h`, `1d`), `group_by` (`rule`, `action`, `country`) |
| `GET /zones/ZONE_ID/waf/events/` | Operator | Sampled events: `from`, `to` (at most 7 days), `rule`, `action`, `ip`, `cursor`; 100 per page |
| `GET`, `POST /lists/` | Viewer, Admin | The account's lists; create one with `name`, `kind` (`ip`, `asn`, `country`), `description`, `items` |
| `GET`, `PATCH`, `DELETE /lists/NAME/` | Viewer, Admin, Admin | One list with its items; change `description` or `items`; delete |
| `PUT`, `POST`, `DELETE /lists/NAME/items/` | Admin | Replace, add or remove items |

Settings:

```json
{
  "mode": "on",
  "tier": "standard",
  "event_sampling": true,
  "block_response": {"status": 403, "content_type": "text", "body": "Blocked. Reference: {ref}"}
}
```

`GET` and `PATCH` return those fields plus `client_ip_source` (`remote_addr`, the connection's address), `enabled_since`, `active_version` (`number`, `sha256`, `size`, `note`, `created_at`) and `limits` (`custom_rules`, `rate_limits`, `lists`, `list_items`, `regex`, `bundle_bytes`, `event_retention_hours`).

Custom rules and rate limits are sent as a whole list, in order. A rule keeps its `id` when you send it back:

```json
{"rules": [
  {"description": "Office only", "enabled": true, "action": "block",
   "expression": "http.request.uri.path starts_with \"/admin\" and not ip.src in $office"}
]}
```

A rate limit adds `key` (`ip`, `ip+host` or `ip+path_prefix`), `period` (10, 60 or 600 seconds), `requests` and `timeout` (the ban, in seconds), and its `action` is `block` or `log`. Both answer `{"rules": [...], "version": N}`. Add `?dry_run=1` to check a list without publishing: it answers `{"valid": true, "size": ..., "limit": ...}`.

A test sends `{"expression": "...", "request": {...}}`, or only `request` to test the published rules. The request has exactly the keys `ip`, `country`, `asn`, `host`, `method`, `path`, `query`, `headers` (lowercase names), `version` and `ssl`. It answers `{"match": true}`, or `{"matched": [rule ids], "version": N}`.

List items are JSON (`{"items": ["203.0.113.7", "198.51.100.0/24"]}`) or `text/plain` with one item per line (`#` starts a comment), at most 1 MB.

**Concurrency.** Send `If-Match: N`, the active version number (`0` before the first), with a change: if someone published meanwhile, it is refused with `412` and `waf_conflict`, and nothing changes.

**Errors** are `{"error": "...", "code": "..."}`:

| Status | Code | When |
|---|---|---|
| 400 | `syntax`, `field`, `type`, `value`, `limit`, `regex`, `list`, `rule`, `tier`, `size`, `block_response`, `unsupported`, `invalid_waf` | The change doesn't compile or is over the tier's limits. Nothing changes; `rule_id` names the rule when there is one. |
| 400 | `invalid_list`, `list_limit` | A list body is invalid, or the account already has 25 lists |
| 409 | `list_exists`, `list_in_use` | A list with that name exists, or rules still use it |
| 412 | `waf_conflict` | `If-Match` doesn't name the active version |
| 413 | `too_large` | The body is too big |
| 429 | `waf_throttled` | More than one change every 5 seconds, or 200 a day, on a zone |
| 503 | `waf_unavailable`, `waf_pricing_incomplete` | The WAF is turned off on our side, or the tier has no price yet |

Writes are limited to 60 a minute and 600 a day per account, reads to 120 a minute, and tests to 30 a minute.

## Where to next

<Unordered>
  <li><a href="/use/cdn">Hippius CDN</a>: create a zone and serve it on your own domain.</li>
  <li><a href="/use/console/team">Shared accounts</a>: give team members CDN access.</li>
</Unordered>
