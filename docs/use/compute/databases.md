---
id: databases
title: Managed PostgreSQL
sidebar_label: Managed PostgreSQL
slug: /use/compute/databases
description: Run PostgreSQL 16, 17 or 18 on confidential VMs with Hippius. Choose a tier and size, store the one-time credentials, connect with TLS, publish it on a public hostname, and understand backups, restore and high-availability failover.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';

Hippius runs PostgreSQL for you on confidential VMs: you get a database and its credentials, and we run the machines, the backups and, on the high-availability tier, the failover. There is no shell on the machines. This page covers choosing a plan, storing the credentials you only see once, connecting, backups and restore.

Open it from the sidebar: **Confidential Computing** → **Databases**. Managed databases are part of [Hippius Compute](/use/compute).

## Plans and sizes

| Plan | Instances | Backups |
|---|---|---|
| **Starter** | 1 | Automatic backups. |
| **Production** | 1 | Continuous backup and point-in-time restore. |
| **High availability** | 3 | Continuous backup, and automatic failover to another instance if the leader fails. |

Today all three plans are backed up the same way, described in [Backups](#backups).

Every plan comes in four sizes. On High availability, each of the three instances gets the size you choose, and the price covers all three.

| Size | Usable storage | Max connections |
|---|---|---|
| **Small** | 30 GB | 102 |
| **Medium** | 60 GB | 204 |
| **Large** | 120 GB | 300 |
| **Extra large** | 240 GB | 300 |

The create form shows the vCPUs and memory of each size, with its price. Usable storage is what you can fill: a quarter of the volume is held back for write-ahead logs and maintenance.

You choose **PostgreSQL 18**, **17** or **16** at creation. 18 is the default. A database can't be resized or upgraded to a new major version after it is created, so pick a size with room to grow.

## Create a database

<Ordered>
  <li>Click <BgStyledText>New database</BgStyledText>.</li>
  <li><strong>Choose the engine</strong>: PostgreSQL 18, 17 or 16.</li>
  <li><strong>Choose a plan</strong>: Starter, Production or High availability.</li>
  <li><strong>Choose a size</strong>.</li>
  <li><strong>Name it</strong> (optional, up to 64 characters). If you leave it empty, a name is chosen for you.</li>
  <li><strong>Backups</strong>: nothing to set. The database backs itself up to a new bucket in your Hippius S3 account. If you don't have an S3 account yet, <a href="/use/console/s3">set one up first</a>, or the database runs without backups.</li>
  <li><strong>Your credentials</strong>: tick <strong>I understand: I will download and store the credentials when they are shown</strong>.</li>
  <li>Check the <strong>Summary</strong> and click <BgStyledText>Create database</BgStyledText>.</li>
</Ordered>

The quota and [24-hour balance](/use/compute/billing#the-24-hour-balance-requirement) checks apply. A High availability database counts as three instances for both.

## Store your credentials

Right after you click **Create database**, the console shows the database's credentials. **They are shown once and never again.** Store them before you leave the page.

Click <BgStyledText>Download all</BgStyledText> to save a zip file, `NAME-credentials.zip`, that contains:

| File | What it is |
|---|---|
| `.env` | The connection settings, ready to load in a shell: user, password, database name, TLS mode and the paths to the certificate files. |
| `credentials.json` | The same values as JSON, including the backup key. |
| `ca.crt` | The certificate authority that signed the server's certificate. Your client uses it to check it is talking to your database. |
| `client.crt`, `client.key` | A client certificate and its key. |

The user and the database are both named `app`. The `app` user can create databases and roles, but it isn't a superuser.

:::danger We can't recover or reset any of these
<Unordered>
  <li><strong>Password:</strong> there is no reset. If you lose it, you have to create a new database, or <a href="#restore-a-database">restore</a> into a new one, which comes with a new password.</li>
  <li><strong>Client certificate and CA:</strong> the certificate authority was destroyed after signing your certificate, so no new one can ever be issued, and the CA can't be downloaded again.</li>
  <li><strong>Backup key:</strong> without it, your backups can't be read outside Hippius, by anyone.</li>
</Unordered>
:::

The console only lets you continue once every item has been saved and you tick **I have stored these credentials somewhere safe**.

## Connect from your private network

A new database is only reachable on your private network, on port 5432, for example from one of your [VMs](/use/virtual-machines). Its page shows the private address. Connections must use TLS and the password.

Copy your credentials zip to the VM, then:

```bash
unzip NAME-credentials.zip -d NAME-credentials
cd NAME-credentials
chmod 600 client.key
set -a; . ./.env; set +a
psql "host=PRIVATE_ADDRESS sslmode=verify-ca"
```

Replace `PRIVATE_ADDRESS` with the address on the database's page. The `.env` file sets the user, password, database name and certificate paths.

:::note Why verify-ca on the private network
The server's certificate names the database's public hostname (see the next section), not its private address, so `sslmode=verify-full` fails when you connect by private address. `verify-ca` still checks that the server's certificate was signed by your database's own CA, which signed only your server's certificate and your client certificate. If you prefer `verify-full`, connect with `host=PUBLIC_HOSTNAME hostaddr=PRIVATE_ADDRESS`, using the hostname the **Public edge** panel shows once the database is exposed.
:::

Clients that don't use libpq take the same settings: host, port `5432`, database `app`, user `app`, the password, TLS required, and `ca.crt` as the trusted CA.

## Expose a database on a public hostname

To reach the database from outside your private network, publish it:

<Ordered>
  <li>On the database's page, find the <strong>Public edge</strong> panel.</li>
  <li>Click <BgStyledText>Expose</BgStyledText>. The panel shows a hostname like <code>db-1a2b3c4d.hpcr.io</code>, on port 5432.</li>
</Ordered>

The edge doesn't decrypt anything: it reads the server name from the start of the TLS connection and passes the encrypted traffic through to your database. The server's certificate already names this hostname, so `sslmode=verify-full` works.

Your client has to open TLS directly, which needs **PostgreSQL 17 or newer client libraries** and `sslnegotiation=direct`:

```bash
unzip NAME-credentials.zip -d NAME-credentials
cd NAME-credentials
chmod 600 client.key
set -a; . ./.env; set +a
psql "host=db-1a2b3c4d.hpcr.io port=5432 sslnegotiation=direct"
```

The `.env` file already sets `sslmode=verify-full`, the CA, the user, the password and the database. Older clients are dropped with **server closed the connection unexpectedly**.

:::warning An exposed database is reachable from the whole internet
There is no address allow list on the public edge. The password and TLS protect the database, so use a strong password store and unexpose the database when you no longer need it.
:::

To close it, click <BgStyledText>Unexpose</BgStyledText> and confirm. Clients connected through the hostname lose access immediately. Clients on your private network are not affected.

## Backups

Backups go to a bucket the database creates in your own Hippius S3 account, named `hippius-db-ID-backups`. They are encrypted before they leave the database, with the backup key from your credentials.

<Unordered>
  <li>A full backup every night, starting between 03:00 and 03:30 (UTC).</li>
  <li>A differential backup around 09:00, 15:00 and 21:00 (UTC), so roughly one backup every six hours. Each run starts within 15 minutes of its time.</li>
  <li>Write-ahead logs archived continuously, at least once a minute, for point-in-time restore.</li>
  <li>The last 7 full backups are kept, and older ones are removed automatically.</li>
</Unordered>

The first full backup runs right after the database is created. The database page's **Backups** panel shows the last full and differential backups, the repository size, and how far the write-ahead log is archived.

Backups are billed as S3 storage in your account, at your S3 price. The bucket is managed by the database, so you can't delete it from the console while the database exists.

## Restore a database

A restore creates a **new database** from the backups of an existing one. The original keeps running and is never written to. You can restore to the latest point in the backups, or to a point in time.

Restore isn't in the console yet. It is available through the API, with your account's API token from [Settings](/use/console/settings):

```bash
curl -X POST https://api.hippius.com/api/databases/DATABASE_ID/restore/ \
  -H "Authorization: Token YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"target_time": "2026-10-05T09:30:00Z"}' \
  -o restored-credentials.json
```

`DATABASE_ID` is the number after `id=` in the address of the database's page. Leave out `target_time` to restore to the latest point. You can also pass `"name"` and `"size"` (`s`, `m`, `l` or `xl`). The new database has the same plan and PostgreSQL version, and its own new credentials and backup repository.

:::danger The response holds the new database's one-time credentials
Save the response, as the command above does with `-o`, and store it like any other credentials. It is the only copy of the new password, certificates and backup key.
:::

A restore can take a while for a big database. A High availability database can't be restored yet, and a database that has been deleted can't be restored this way.

## High availability and failover

A High availability database runs on three instances. One is the leader and takes the writes. The other two replicate from it. If the leader fails, one of the replicas is promoted automatically, typically within about 2 minutes. Backups continue from the new leader, and when the old leader comes back, it rejoins as a replica.

What your application sees:

<Unordered>
  <li>Open connections drop. Your application has to reconnect, so make sure it retries.</li>
  <li>Replication is asynchronous, so the last transactions committed on the old leader before it failed can be lost.</li>
  <li>The <strong>public hostname stays the same</strong> and moves to the new leader.</li>
  <li>The <strong>private address changes</strong> to the new leader's. The database's page always shows the current one.</li>
</Unordered>

The **Cluster** panel shows each instance, its role and how far behind it is. The status turns **Degraded** when an instance falls behind, goes silent, or there is no leader.

## Restart and delete

**Restart** restarts PostgreSQL. Open connections are closed; the data is untouched. On High availability, only the leader is restarted, without a failover. The restart begins within a minute.

**Delete** destroys the instances and their data. This can't be undone. If the backup bucket holds backups, it is **kept** in your S3 account, and billed as S3 storage, so that you can still read your data with your backup key.

## Billing

A database is billed for the VMs it runs on, per second at their hourly price, plus a management fee of 25% of that VM price: one instance on Starter and Production, three on High availability. The smallest database, Starter on Small, is $32 + $8 = $40 a month; High availability on Small is $96 + $24 = $120 a month. The create form shows the VMs, the fee and the total. Backups are billed as S3 storage in your account, at your S3 price. See [Management fees](/use/compute/billing#management-fees) and the [live price list](https://console.hippius.com/dashboard/billing/compute#prices).

If your compute usage stays unpaid, see [If your balance runs out](/use/compute/billing#if-your-balance-runs-out).
