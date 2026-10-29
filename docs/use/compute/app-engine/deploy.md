---
id: deploy
title: Deploying an app
sidebar_label: Deploying an app
slug: /use/compute/app-engine/deploy
unlisted: true
displayed_sidebar: docsSidebar
description: Deploy a docker compose file with the Hippius app engine (beta). Compose requirements, secrets, the public IP, updates and volume lineage, and the difference between deployment status and runtime status.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

This page covers deploying and updating an app in the console. Read the [App engine overview](/use/compute/app-engine) first for what the app engine proves, and what it doesn't.

:::warning Beta: Hippius can read your secrets and volumes
Secret values and volume contents are not confidential from Hippius in this phase. The app engine proves what runs, not who can read it.
:::

## Compose requirements

The app engine accepts a strict subset of the compose format, called grammar v1. It is strict so that a person reviewing the file, Hippius's checks and `docker compose` all read the same thing. The console checks the file as you type, and every refusal names a [rule](/use/compute/app-engine/compose-rules).

<Unordered>
  <li><strong>Images pinned by digest.</strong> Every <code>image</code> is <code>&lt;registry&gt;/&lt;path&gt;@sha256:&lt;64 hex&gt;</code>, with no tag. Get the digest with <code>docker buildx imagetools inspect &lt;image&gt;</code> or from your registry. The VM pulls the <code>linux/amd64</code> image, and every layer is checked against the digest.</li>
  <li><strong>Public registries only.</strong> Images are pulled without credentials, from a registry with a public DNS name (<code>docker.io</code>, <code>ghcr.io</code>, <code>quay.io</code>, ...). An IP address, <code>localhost</code>, a single-label name or a private suffix such as <code>.local</code> or <code>.internal</code> is refused. Private registries aren't supported in this phase.</li>
  <li><strong>TCP only.</strong> Ports are <code>"&lt;host&gt;:&lt;container&gt;"</code> or <code>"&lt;host&gt;:&lt;container&gt;/tcp"</code>, without a host IP or range. UDP is not supported in this phase. Host ports 9080, 9443 and 51820 are reserved. At most 64 published ports.</li>
  <li><strong>At most 64 services.</strong> The file is at most 64 KiB.</li>
  <li><strong>Every string value is double-quoted</strong>, in <code>environment</code> and <code>labels</code> too: <code>NODE_ENV: "production"</code>, not <code>NODE_ENV: production</code>. Only integers (<code>1</code>, <code>8080</code>) and <code>true</code> / <code>false</code> may stay unquoted. Single quotes are refused.</li>
  <li><strong>Block style only.</strong> No <code>[a, b]</code> or <code>{"{"}a: b{"}"}</code>, no <code>|</code> or <code>&gt;</code> multi-line strings, no anchors, aliases or merge keys, no tabs. UTF-8 with LF line endings, no byte-order mark.</li>
  <li><strong>No variables.</strong> <code>${"{"}VAR{"}"}</code> and <code>$VAR</code> are refused anywhere in the file, comments included, because an environment or <code>.env</code> file would change the app without changing its hash. <strong><code>$$</code> stands for one literal <code>$</code></strong>: <code>PRICE: "$$5"</code> reaches the container as <code>$5</code>. The file, and its hash, keep <code>$$</code>.</li>
  <li><strong>Long-form volumes.</strong> A mount is <code>type: "volume"</code> with a <code>source</code> declared under the top-level <code>volumes</code>, or <code>type: "tmpfs"</code>. Bind mounts, the short <code>src:dst</code> form and volume options are refused.</li>
  <li><strong>List-form commands.</strong> <code>command</code>, <code>entrypoint</code> and <code>healthcheck.test</code> are lists of strings, not shell strings.</li>
  <li><strong>No privileges.</strong> <code>build</code>, <code>privileged</code>, <code>devices</code>, <code>cap_add</code>, <code>network_mode</code>, <code>pid</code>, <code>security_opt</code>, <code>env_file</code>, <code>extends</code>, <code>sysctls</code>, <code>logging</code> and every other key outside the allowed list are refused. Labels under <code>com.docker.</code> or <code>io.hippius.</code> are reserved.</li>
  <li><strong>An <code>x-hippius</code> block</strong> at the top level, described below.</li>
</Unordered>

The [compose rules reference](/use/compute/app-engine/compose-rules) lists every rule.

### The `x-hippius` block

`x-hippius` is part of the file, so it is measured with the rest: a verifier sees it too.

| Key | Required | What it does |
|---|---|---|
| `version` | yes | The grammar version. Always `1`. |
| `secrets` | no | The names of the [secrets](#secrets) the app receives. Each is `[A-Z][A-Z0-9_]{0,63}`, for example `"DB_PASSWORD"`. |
| `logs` | no | `"none"` (the default) or `"public"`. With `"public"`, the evidence port serves the last part of each service's logs to anyone. |
| `publish_compose` | no | `true` makes the evidence carry the compose file, so a verifier can read it without getting it from you. |
| `upgrade_from` | no | The SHA-256 hashes of earlier composes whose volumes this compose may open. See [Updates and lineage](#updates-and-lineage). Leave the key out when there are none: an empty list is refused. |

### Example

A web service and a PostgreSQL database with a persistent volume and one secret:

```yaml title="docker-compose.yaml"
services:
  web:
    image: "ghcr.io/acme/web@sha256:4c4c4c4c4c4c4c4c4c4c4c4c4c4c4c4c4c4c4c4c4c4c4c4c4c4c4c4c4c4c4c4c"
    ports:
      - "8080:80"
    environment:
      DATABASE_HOST: "db"
      PLAN_PRICE: "$$5 a month"
    depends_on:
      - "db"
    restart: "unless-stopped"
  db:
    image: "docker.io/library/postgres@sha256:7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e"
    environment:
      POSTGRES_PASSWORD_FILE: "/run/secrets/DB_PASSWORD"
    volumes:
      - type: "volume"
        source: "pgdata"
        target: "/var/lib/postgresql/data"
    secrets:
      - "DB_PASSWORD"
    restart: "unless-stopped"
volumes:
  pgdata:
x-hippius:
  version: 1
  secrets:
    - "DB_PASSWORD"
  logs: "none"
  publish_compose: true
```

The container sees `PLAN_PRICE` as `$5 a month`. Replace the example digests with your images' real digests.

## Deploy an app in the console

<Ordered>
  <li>In the console, open <strong>Confidential Computing</strong> → <strong>Apps</strong> and click <BgStyledText>Deploy an app</BgStyledText>.</li>
  <li><strong>Your compose.</strong> Paste the file or click <BgStyledText>Upload a file</BgStyledText>. The console checks it with grammar v1 and shows its SHA-256, services, published ports, secrets, logs mode, the composes whose volumes it accepts, and whether the compose is published. Compare the SHA-256 with <code>sha256sum docker-compose.yaml</code> on your machine: they must match, or the file changed on the way (line endings, encoding).</li>
  <li><strong>Secrets.</strong> Enter a value for each name in <code>x-hippius.secrets</code>.</li>
  <li><strong>Region</strong> and <strong>size</strong>, as for a <a href="/use/virtual-machines">virtual machine</a>. The size must leave room to pull your images: they are pulled again at every boot.</li>
  <li><strong>Public access.</strong> Keep <strong>Public IPv4</strong> on to make the app reachable and verifiable. See <a href="#public-ip-and-firewall">Public IP and firewall</a>.</li>
  <li>Optionally name the app, then click <BgStyledText>Deploy app</BgStyledText>.</li>
</Ordered>

<Screenshot src="/img/console/app-engine/deploy.png" alt="The Deploy an app form: the compose passes grammar v1 and shows its SHA-256, services, published port and secret, with a summary of size, public IPv4 and price" dark raw />

The app then appears in the list as **Launching** while the VM boots. The containers start once the runner has pulled the images: watch the [app runtime](#deployment-status-and-runtime-status) for that.

## Secrets

Never put a secret in `environment`: environment values are part of the measured file, and anyone who verifies the app can read them.

A secret is a name in `x-hippius.secrets` with a value you enter in the console. The value is not part of the file, so it doesn't change the hash, and a verifier learns the name only, never the value.

<Unordered>
  <li>A service receives a secret by listing its name under its own <code>secrets</code>. It reads it from the file <code>/run/secrets/&lt;NAME&gt;</code>. Most images take a <code>*_FILE</code> variable for this, such as <code>POSTGRES_PASSWORD_FILE</code>.</li>
  <li>Every declared name needs a value. A value is at most 64 KiB, and the compose plus all secrets at most 256 KiB.</li>
  <li>Values are write-only: no page or API shows them again. Hippius stores them encrypted and sends them only to the control plane, inside your VM's launch bundle.</li>
  <li><strong>Hippius operators can still read them.</strong> This beta doesn't keep secrets confidential from Hippius.</li>
</Unordered>

## Public IP and firewall

**Public IPv4** is on by default. It is what lets anyone reach and verify the app today, and it costs the same as a [public IPv4 on any VM](/use/compute/networking#what-a-public-ipv4-costs).

The VM's firewall gets two rules, open to any source, over TCP only: one for the compose's published ports, and one for port 9080, the evidence port. Their descriptions start with `App engine:`. An update rewrites those two rules and leaves any rule you added alone. No SSH rule is opened: app VMs are sealed.

Without a public IP, the app's evidence is reachable only from your [private network](/use/compute/networking#your-private-network), so the app can't be verified publicly. The console says so on the app's page.

## Deployment status and runtime status

The app's **Overview** shows two separate statuses. They come from different places, and an app needs both to be healthy.

<Screenshot src="/img/console/app-engine/overview.png" alt="The app Overview: Deployment shows Running and Revision #1 applied, App runtime shows the runner reports running, followed by the compose SHA-256, services, ports and public evidence URLs" dark raw />

| | Deployment | App runtime |
|---|---|---|
| **Source** | The control plane, which launches the VM. | The runner inside the VM, read from its evidence endpoint. |
| **Says** | The VM's state (**Launching**, **Running**, **Stopped**, ...) and the revision: **applied** means the VM was launched with that compose's hash in its measurement. | What the runner did with the compose: `running`, `starting`, or a failure code. |
| **Doesn't say** | Whether your containers are up. | Nothing is verified by Hippius: it is the VM's own report, relayed. |

So **applied is not running**. A revision can be applied while the runner reports, for example:

| Runner reports | Meaning |
|---|---|
| `running` | The containers are up. |
| `starting` | The runner is pulling images or starting services. |
| `pull-failed:<image>` | An image couldn't be pulled: wrong digest, registry down, or not enough disk on this size. The runner retries. |
| `secret-missing:<NAME>` | A declared secret had no value. Nothing started. |
| `lineage-refused` | The volumes were written by a compose that this one doesn't list in `upgrade_from`. Nothing started. See [Updates and lineage](#updates-and-lineage). |
| `volume-unsafe:<name>` | A volume's directory on disk isn't a plain directory. Nothing started. |
| `disk-full` | The VM's data disk is full. |
| `compose-invalid:<rule>` | The runner refused the file. See the [rules reference](/use/compute/app-engine/compose-rules). |

The runtime panel is labelled *As reported by the VM, not verified by Hippius*, and is cached for 15 seconds. For a verified answer, [verify the app](/use/compute/app-engine/verify).

## Updates and lineage

### Update an app

Open the app's **Compose** tab, paste or upload the new file, change secrets if needed, and click <BgStyledText>Update and relaunch</BgStyledText>.

An update is a **relaunch**: the VM stops, then starts with the new compose. Volumes are kept, and the measurement changes. Expect downtime of about a reboot plus the image pulls. The app must be running to be updated, and only one update runs at a time.

Secrets are merged: a value you enter replaces the stored one, an empty field keeps it, and a name the new compose no longer declares is dropped. To rotate a secret without changing the compose, enter only the new value and update.

### Lineage: keeping your volumes

The VM records which compose last opened its volumes. A new compose may open them only if it lists that compose's SHA-256 under `x-hippius.upgrade_from`:

```yaml
x-hippius:
  version: 1
  upgrade_from:
    - "e8efa8618f72c4464a652454568c34cb18bf22f1d1e3597018b824f17cc7197d"
```

The **Compose** tab shows the hash running now. If the new file doesn't list it, the console refuses the update (`app-lineage-missing`) and shows the lines to add.

<Screenshot src="/img/console/app-engine/update-lineage-missing.png" alt="The Compose tab refusing an update: the new compose doesn't list the running compose in x-hippius.upgrade_from, with the block to add" dark raw />

`upgrade_from` is measured, so a verifier also sees which earlier composes' data the app accepts. It protects against an accident on your side, such as opening a database volume with an unrelated app. It doesn't protect volumes against Hippius, which can read and change them in this phase.

### Starting fresh

There is no volume reset. To run a compose that doesn't list the current one, **delete the app and create a new one**. Deleting an app destroys its VM and its volumes for good.

### When an update fails

The **Revisions** tab lists every launch and update with its status:

| Status | Meaning |
|---|---|
| **pending** | Recorded, and being sent to the control plane. |
| **applying** | Accepted. The VM is relaunching. |
| **applied** | The VM was launched with this compose. It is the app's current compose. |
| **refused** | The control plane refused it, with the reason. Nothing changed. |
| **failed** | The relaunch failed. With `app-update-rolled-back`, the app was rolled back and still runs the previous compose. With `app-update-failed`, there was no rollback: check the app runtime and verify the app. |
| **superseded** | An earlier applied compose, replaced by a newer one. |

<Screenshot src="/img/console/app-engine/update-rolled-back.png" alt="An app whose update #2 failed and was rolled back: the app still runs its previous compose" dark raw />

## Limits

| Limit | Value |
|---|---|
| Compose file | 64 KiB |
| Services | 64 |
| Published ports | 64, TCP only |
| Reserved host ports | 9080, 9443 (TCP), 51820 (UDP) |
| Secret names | `[A-Z][A-Z0-9_]{0,63}` |
| One secret value | 64 KiB |
| Compose and secrets together | 256 KiB |
| Images | Public registries, pinned by digest, pulled for `linux/amd64` at every boot |
| Not supported in this phase | UDP, private registries, `build`, GPUs, SSH or a terminal on the VM |
