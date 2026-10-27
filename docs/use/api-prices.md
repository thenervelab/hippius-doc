---
id: api-prices
title: Public Price API
sidebar_label: Public Price API
slug: /use/api-prices
description: Read Hippius compute, CDN, S3, Drive and Hub prices from the API without an account.
---

import Unordered from '@site/src/components/Unordered';

# Public Price API

Use these endpoints to show Hippius prices in your own app, a cost calculator or a comparison page, without an account or a token. They return the prices in force now, the same ones the console and [hippius.com/pricing](https://hippius.com/pricing) show. Nothing in them depends on who asks.

## Endpoints

All are `GET` on `https://api.hippius.com`, with no authentication.

| Endpoint | What it returns | Amounts in |
|----------|-----------------|------------|
| `/api/compute/public-prices/` | Everything compute sells: VM sizes per disk tier, dedicated disks, public IPv4, backups, managed database and Kubernetes fees, runners, bandwidth | Credits, decimal strings |
| `/api/compute/flavors/` | VM sizes with their monthly price on NVMe | Credits, numbers |
| `/api/cdn/prices/` | CDN egress per region, requests, custom domains | Base units, strings |
| `/api/s3/plans/` | S3 plans and the pay-as-you-go rate | Credits, numbers |
| `/api/drive/plans/` | Drive plans, monthly and annual | Credits, numbers |
| `/api/registry/plans/` | Hub plans, with the `id` that subscribing needs | Credits, numbers |

One credit is one US dollar. The CDN list is in base units: divide by 10<sup>18</sup> to get credits.

## Get the Compute Price List

```bash
curl -s https://api.hippius.com/api/compute/public-prices/
```

A trimmed response (one tier, one size per list):

```json
{
  "currency": "credits",
  "hours_per_month": 730,
  "os_disk_tiers": [
    {
      "tier": "nvme",
      "name": "NVMe",
      "disk_gb": { "hourly": "0.000136986301369863", "monthly": "0.10" },
      "max_flavor": null,
      "flavors": [
        { "code": "small", "name": "Small", "vcpus": 1, "memory_mb": 4096, "disk_gb": 40,
          "available": true, "hourly": "0.043835616438356164", "monthly": "32.00" }
      ]
    }
  ],
  "dedicated_disks": [
    { "tier": "hdd", "name": "HDD", "gib_hourly": "0.000003344392123287",
      "tib_monthly": "2.50", "min_size_gb": 1000, "max_per_vm": 8 }
  ],
  "public_ip": { "price": { "hourly": "0.005", "monthly": "3.65" },
                 "free": false, "free_until": null, "after_free": null },
  "backup_storage": { "free": false, "gb_hourly": "0.000008219178082191",
                      "tb_monthly": "6.00", "max_disk_gb": 0 },
  "managed_database": { "fee_percent": "25", "fee_in_force": true, "ha_instances": 3,
                        "sizes": { "s": "small", "m": "medium", "l": "large", "xl": "xlarge" } },
  "managed_kubernetes": { "cluster_fee": { "hourly": "0.020547945205479452", "monthly": "15.00" },
                          "cluster_fee_in_force": true, "control_plane_nodes": 3,
                          "control_plane_sizes": { "s": "medium", "m": "large", "l": "xlarge" } },
  "runners": [
    { "size": "small", "label": "hippius-small", "vcpus": 1, "memory_mb": 4096, "disk_gb": 20,
      "hourly": "0.041095890410958904", "monthly": "30.00" }
  ],
  "bandwidth_per_gb": "0",
  "bandwidth_by_region": {
    "FR": { "unlimited": true, "included_bytes_per_month": null, "overage_per_gb": "0", "cap_mbps": {} },
    "AU": { "unlimited": false, "included_bytes_per_month": "1000000000000", "overage_per_gb": "0", "cap_mbps": {} }
  }
}
```

### Reading the Fields

<Unordered>
  <li><strong>Amounts</strong> are decimal strings in credits. Parse them with a decimal type, not a float. <code>hourly</code> is exact; <code>monthly</code> is <code>hourly</code> × <code>hours_per_month</code> (730), rounded to the cent.</li>
  <li><strong><code>os_disk_tiers</code></strong> lists the boot-disk tiers you can launch on now (<code>nvme</code>, <code>ssd</code>, <code>hdd</code>), each with its sizes priced on that tier and the disk's own rate per GB (<code>disk_gb</code>). <code>max_flavor</code> is the largest size the tier allows, set on <code>hdd</code> only.</li>
  <li><strong><code>dedicated_disks</code></strong> are extra whole disks attached to a VM, priced per TiB-month, from <code>min_size_gb</code> and up to <code>max_per_vm</code> per VM.</li>
  <li><strong><code>managed_database</code></strong> costs its VMs plus <code>fee_percent</code>; an HA database runs <code>ha_instances</code> VMs. <strong><code>managed_kubernetes</code></strong> costs its VMs plus <code>cluster_fee</code>, with <code>control_plane_nodes</code> control-plane VMs. <code>sizes</code> map each size to the VM size it runs on.</li>
  <li><strong><code>bandwidth_by_region</code></strong> is outbound traffic per region. <code>included_bytes_per_month</code> is a byte count as a string, null when <code>unlimited</code>. Inbound traffic is free.</li>
  <li><strong><code>backup_storage.max_disk_gb</code></strong> is the largest VM disk backups are sold for; <code>0</code> means no limit.</li>
</Unordered>

:::warning null is not free
A price the catalogue does not have yet is `null`, never `0`. `dedicated_disks` is `null` while none are sold. In `public_ip`, `free_until` and `after_free` are `null` outside a free period. Show "not available", not "$0".
:::

## Caching and Rate Limits

The anonymous responses carry `Cache-Control: public` and `Vary: Authorization`. `max-age` is 60 seconds, 300 on `/api/compute/flavors/`. The server rebuilds each list at most once a minute (the Hub plans every five minutes), so polling faster gets you nothing new.

`/api/compute/public-prices/`, `/api/compute/flavors/` and `/api/cdn/prices/` allow 300 anonymous requests per minute per client address. Past that they answer `429` with a `Retry-After` header. `/api/cdn/prices/` answers `503` while the CDN is switched off.

:::note Signed-in callers
The compute price list, the CDN prices, the S3 plans and the Hub plans ignore any `Authorization` header: everyone gets the same body. `/api/compute/flavors/` and `/api/drive/plans/` answer a signed-in caller for that account, without the cache headers: the flavors add `default_image`, and the Free Drive plan shows `available: false` for an account made with an access key.
:::

## Related

<Unordered>
  <li><a href="/use/api">Hippius Management API</a>: tokens, billing and compute with an access token</li>
  <li><a href="/use/compute">Compute</a>: quotas, the balance requirement and how VMs are billed</li>
  <li><a href="/use/cdn">CDN</a>: zones, custom domains and CDN billing</li>
</Unordered>
