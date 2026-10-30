---
id: verify
title: Verifying an app
sidebar_label: Verifying an app
slug: /use/compute/app-engine/verify
unlisted: true
displayed_sidebar: docsSidebar
description: Check that a Hippius app engine VM runs exactly a given docker compose, from a report signed by the AMD chip. Three ways (in the browser, with the hippius-app-verify CLI, with the raw API and curl), verdicts, residuals, and a procedure for AI agents. Beta.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import Screenshot from '@site/src/components/Screenshot';

Anyone can check what an [app engine](/use/compute/app-engine) VM runs: the app's owner, its users or an auditor. The check rests on the AMD root keys, the published Hippius app image and the compose file you expect. It doesn't rest on Hippius's word or on the word of the server's owner.

:::warning Beta
A verdict proves **integrity of what runs, rooted in AMD**. It doesn't prove that Hippius can't read the app's secrets or volumes: in this phase Hippius can. Every verdict also lists its [residuals](#residuals), the attacks the checks don't close yet.
:::

## Three ways to verify

| Way | For | Needs | Independent of Hippius |
|---|---|---|---|
| [In the browser](#in-the-browser) | The app's owner, on the console | A console login on the app's account | The checks run in your browser, but the page itself comes from Hippius |
| [The CLI, `hippius-app-verify`](#with-the-cli) | Anyone: owner, users, auditors, CI | The verifier, the app's public IP, the compose you expect | Yes, apart from the release key you pin and, until the manifests are public, the manifest you fetch through the relay. With `--manifest` the CLI trusts that file by its SHA-256; with `--trust-index` it checks it against the release key |
| [The raw API, with curl](#with-the-raw-api) | Scripts and AI agents that collect the inputs | An API token on the app's account | Collects inputs only: a verdict still needs a verifier |

Hippius never computes a verdict. Anything the API or the console fetches for you from the VM is labelled **not verified by Hippius**. Only a verifier, in the browser or on the command line, turns those documents into a verdict.

## What a verifier checks

All three ways end in the same verifier core: the CLI is written in Rust, and the browser runs the same core compiled to WebAssembly. Given the VM's evidence for a nonce it chose, it:

<Ordered>
  <li>Asks the VM for its evidence, with a fresh random value (a nonce) that the report must answer, so an old report can't be replayed.</li>
  <li>Checks that the report is signed by a genuine AMD SEV-SNP processor: the chip's VCEK certificate, up to AMD's root key, which is built into the verifier.</li>
  <li>Checks the processor's firmware against a minimum security level (TCB), and that the VM can't be debugged.</li>
  <li>Finds the app image manifest the VM booted, among the manifests you trust, and recomputes the VM's launch measurement from that image's firmware, kernel, initrd and measured boot parameters. It must equal the signed one.</li>
  <li>Requires the compose hash in that measurement to equal the SHA-256 of your file, and checks your file against the <a href="/use/compute/app-engine/compose-rules">compose rules</a>.</li>
  <li>Checks that the report binds your nonce, the VM's id, the compose hash and the runner's observation.</li>
  <li>Reads the runner's signed observation: which containers run, with which image digests, and that nothing else runs.</li>
</Ordered>

## In the browser

On the console, open the app, then its **Verify** tab, and click **Verify in your browser**.

<Screenshot src="/img/console/app-engine/verify-tab.png" alt="The app's Verify tab: the hippius-app-verify command, the verdicts and the residuals" dark raw />

The page runs the verifier, compiled to WebAssembly, in your browser. It shows each step as it goes:

<Ordered>
  <li>Load the verifier and check its file: the WebAssembly file's SHA-256 must equal the one pinned in the page, or it doesn't run.</li>
  <li>Ask the VM for evidence on a fresh nonce, drawn in your browser.</li>
  <li>Check the image index against the pinned release key: the index of published app images must be signed by the Hippius release key pinned in the page, and must list the manifest the VM names.</li>
  <li>Fetch the image manifest the VM booted, and check that its bytes hash to the SHA-256 the VM named.</li>
  <li>Fetch the firmware image the manifest names, and check its SHA-256.</li>
  <li>Fetch the AMD certificates the report needs.</li>
  <li>Verify the report in the browser, and show the verdict.</li>
</Ordered>

By default the page checks against the compose Hippius stored. For a check that doesn't take Hippius's copy of the compose, click **Use my own file** and drop in your own copy.

Your browser can't reach the VM or AMD directly, so Hippius relays the documents: the evidence, the AMD certificates, the image index, the manifests and the firmware. The relays are **unverified**. The verifier checks every document against AMD's keys, the pinned release key or the SHA-256 that names it, so a relay that changed a document would make the check fail. One gap: the browser doesn't check revocation yet (below), so a relay could serve an older signed index that still lists a since-withdrawn image.

What the browser check doesn't remove: the page, its pins and the WebAssembly file are served by Hippius. A check that trusts nothing from Hippius runs the [CLI](#with-the-cli) on your own machine.

The browser can't open a raw TLS connection to the VM, so a browser verdict is never bound to your connection. The signed index head, which lists withdrawn manifests, isn't published yet: the browser doesn't check revocation.

If the panel says **Coming in phase 2**, the browser verifier isn't switched on for your account yet. Use the CLI.

## With the CLI

`hippius-app-verify` is a command-line verifier, written in Rust. It has AMD's root keys built in, needs no Hippius account, and talks to the VM's evidence port directly.

### Install

:::info Available at launch
`hippius-app-verify` and its source are published at the app engine launch, in the public `thenervelab/hippius-cvm` repository. Three forms are planned:

<Unordered>
  <li>Static binaries (Linux x86_64, possibly aarch64) on a GitHub release of that repository, with SHA-256 checksums and a cosign signature.</li>
  <li><code>cargo install</code> from that repository, to build it yourself.</li>
  <li>The npm package <code>@hippius/app-verify</code>: the same verifier compiled to WebAssembly, for browsers and Node.js.</li>
</Unordered>
:::

### The release key

Hippius signs the index of published app images with an Ed25519 release key. The verifier has no built-in release key: you pin it yourself. Pin this key:

| | |
|---|---|
| Name | `v1` |
| Raw Ed25519 public key (hex) | `06f598500e78f0241737184c7fb12516b38b55d2259d1a02c98371b99e53b128` |
| `key_id` (SHA-256 of the raw key) | `59c8cc9dc60ab55578a7f03b4373f167b8cc42aecd02eb874abe7d691115eafe` |

Check the `key_id` yourself:

```bash
echo -n 06f598500e78f0241737184c7fb12516b38b55d2259d1a02c98371b99e53b128 | xxd -r -p | sha256sum
```

The console pins the same key in the browser verifier.

### Run it

From the folder that holds your copy of the compose file:

```bash
hippius-app-verify http://203.0.113.7:9080 \
  --compose docker-compose.yaml \
  --manifest app-manifest.json
```

The console shows this command without `--manifest`, with the app's IP, on the app's **Verify** tab. The API gives it as `evidence.verify_command` on [the app](#2-get-the-app). Add the manifests you trust, as below: without them no manifest matches and the check fails.

The verifier prints the verdict as JSON on standard output, and a summary for a human on standard error. Add `--quiet` to drop the summary.

### Choose the manifests you trust

A verdict uses only the app image manifests you trust. There are two ways:

| Flag | Trust | Notes |
|---|---|---|
| `--manifest <sha256 or file>` | Exactly the manifests you pin | Repeatable. A file is pinned by the SHA-256 of its bytes. The stronger choice. |
| `--pin-file <file>` | The SHA-256 hashes in a file, one per line | `#` starts a comment. |
| `--manifests <dir or url>` | Nothing on its own | Where pinned manifests are found: a folder of files, or a base URL serving `<sha256>.json`. |
| `--trust-index <url or file>` with `--release-key <hex or file>` | Every manifest in the published index whose entry is signed by a release key you name | Weaker than pinning: any manifest Hippius signed and hasn't withdrawn is accepted. The summary names the one that matched, and how to pin it. If several match, the check fails and asks you to pin one. Needs the signed index head (`--index-head`). With an index file rather than a URL, give the manifests with `--manifests <dir>`. Works once the manifests, the index and its head are public. |

`--trust-index` works once the manifests, the index and its head are public; you then pass the [release key](#the-release-key)'s hex with `--release-key`. Until then, the app's owner gets the manifests through the [manifest relay](#5-get-the-app-image-manifest), and gives the file to `--manifest`. The firmware image the manifest names is then given with `--ovmf <file>`, from the [artefact relay](#6-get-the-firmware-image).

### Other flags

| Flag | What it does |
|---|---|
| `--compose <file>` | The compose you expect, exact bytes. |
| `--compose-sha256 <hex>` | Only the SHA-256 of the compose you expect. |
| `--compose-from-evidence` | Shows whichever compose the VM measured (the app must set `x-hippius.publish_compose: true`). Proves which compose runs, not that it's one you chose. |
| `--evidence <file> --nonce <hex>` | Verifies a recorded evidence document instead of asking the VM. Freshness is then whoever chose the nonce: the verdict says `nonce_source: "caller"`. |
| `--ovmf <file>` | The firmware image, instead of fetching it from the manifest's URL. |
| `--kds-url <url>` | AMD's certificate service, `https://kdsintf.amd.com` by default. |
| `--offline` | Fetches nothing but the evidence. Manifests, firmware and certificates must be local or cached. |
| `--cache-dir <dir>` | Cache for firmware images and certificates. Cached bytes are checked again. |
| `--allow-unknown-kernel` | Accepts a kernel absent from the verifier's table, with the `kernel-unverified` residual. A kernel below the floor is still refused. |
| `--quiet` | No summary on standard error. |

`--anchor` checks the image index against a record on the Hippius chain. That record isn't live: leave it at its default, `off`.

### Exit codes

| Code | Meaning |
|---|---|
| `0` | `running` |
| `1` | `launched`, not running |
| `2` | A check failed: don't trust the app |
| `3` | The verification couldn't run: a flag, a file, the network, a refused index |

Codes `5` and `6` come only from the chain anchor check, `--anchor`, which isn't live.

### Read the output

The summary, on standard error:

```text
verdict: RUNNING — not bound to this connection (phase 1)
  AMD Genoa chip <chip id>
  manifest <manifest sha256> (guest release <n>, runner <version>)
  kernel <kernel release> (verifier-table)
  compose sha256 <compose sha256>
  2 measured launch VMSAs (vCPUs at launch; the host can add or drop CPUs later)
  service web ghcr.io/acme/web@sha256:<digest> 8080:80/tcp
  residuals: host-acpi, interrupt-injection, network-operator-controlled
  nonce: fresh (drawn for this request)
  caveat: tcb-floor-provisional: ...
  caveat: kernel-floor-provisional: ...
```

The verdict, on standard output (shortened):

```json
{
  "format": "hippius.app-verdict.v1",
  "level": "running",
  "residuals": ["host-acpi", "interrupt-injection", "network-operator-controlled"],
  "notes": ["tcb-floor-provisional: ...", "kernel-floor-provisional: ..."],
  "facts": {
    "nonce_hex": "<the nonce>",
    "nonce_source": "fresh",
    "product": "Genoa",
    "signer": "vcek",
    "chip_id": "<hex>",
    "manifest_trust": "pinned",
    "manifest_sha256": "<64 hex>",
    "vm_id": "hipc-12-1a2b3c4d",
    "compose_sha256": "<64 hex>",
    "measurement": "<hex>",
    "observation": {"state": "running", "services": [...], "foreign": 0},
    "channel_bound": false
  }
}
```

When a check fails, `level` is `none`, and `failed_step` and `reason` say where and why. `failed_step` is one of `evidence`, `report`, `chain`, `manifest`, `cmdline`, `digest`, `kernel`, `policy`, `tcb`, `compose`, `binding`, `running`. A fact appears only once the steps that prove it passed.

When the verifier shows the compose's values, `$$` stands for one literal `$`: `PRICE: "$$5"` reaches the container as `$5`.

## Verdicts

| `level` | Summary | Meaning |
|---|---|---|
| `running` | `RUNNING — not bound to this connection` | Everything in `launched`, and the measured runner's signed observation says your compose's containers were running, with its image digests and nothing else, when the report was made. |
| `launched` | `LAUNCHED (not running)` | A report signed by the AMD chip says this VM booted the published app image with exactly your compose, byte for byte, and answered your nonce (fresh when the verifier drew it: `nonce_source: "fresh"`). `failed_step` is `running`, and `reason` says why. |
| `none` | `FAILED` | A check failed. The verifier names it. Don't trust the app then. |

**Why "not bound to this connection".** The check proves that *some* VM runs your compose and answered your nonce. It doesn't bind the TCP connection you used: a relay could pass your request to a genuine VM and serve you something else. `facts.channel_bound` is `false`. Binding the connection to the attested VM (RA-TLS, `hippius-app-verify tls://<ip>:<port>` for an app that sets `x-hippius.tls`) comes in a later phase; only then can a verdict say `channel_bound: true`. Until then, every `running` reads **running — not bound to this connection**.

`launched` without `running` usually means the runner refused to start the compose, or hasn't finished. The observation's `state` says which: `starting`, or a failure code such as `lineage-refused`, `pull-failed:<image>` or `secret-missing:<NAME>`. The app's owner also sees it in the console: see [Deployment status and runtime status](/use/compute/app-engine/deploy#deployment-status-and-runtime-status).

## Residuals

Every verdict lists its residuals: what it still leaves open. This is a beta, and there is no public "verifiable" claim until the first two are closed.

| Residual | Meaning |
|---|---|
| `host-acpi` | The host supplies the VM's ACPI tables (hardware description the kernel reads at boot), and they aren't measured yet. Until the VM's firmware generates them itself, every verdict carries this. |
| `interrupt-injection` | A malicious host can inject interrupts into the VM. Kernel fixes reduce this, but no kernel version is shown to cover every known vector, so every verdict carries it. |
| `network-operator-controlled` | The network path is Hippius's. The app's public inbound traffic and its outbound traffic go through Hippius's network and edge, which see whatever the app doesn't encrypt itself. The image limits what the network can reach inside the VM, not who carries the packets. Every verdict carries this: encrypt what matters in the app. |
| `kernel-unverified` | Appears only if you passed `--allow-unknown-kernel`. The VM's kernel then wasn't matched against the verifier's table of known distribution kernels. Without that flag, an unknown kernel is refused. |

Every verdict also carries two `notes` while they apply: `tcb-floor-provisional` (the minimum AMD firmware level is the fleet's recorded level, not yet reconciled with AMD's security bulletins) and `kernel-floor-provisional` (the minimum kernel isn't yet reconciled with every Ubuntu security notice).

## Not covered in this phase

<Unordered>
  <li><strong>Confidentiality from Hippius.</strong> Hippius can read the app's secrets and volumes.</li>
  <li><strong>The history of the volume data.</strong> A verdict covers what runs, not what the volumes hold or who wrote it.</li>
  <li><strong>What the containers do at runtime.</strong> Code an image downloads, or loads from its volumes, is the app's own behaviour. Read the compose and its images to judge that.</li>
  <li><strong>The connection.</strong> See <a href="#verdicts">why "not bound to this connection"</a>.</li>
  <li><strong>Revocation and the chain record.</strong> The signed index head and its record on the Hippius chain aren't published yet.</li>
</Unordered>

## With the raw API

The API lets a script or an agent fetch every input a verifier needs. It doesn't verify anything: Hippius relays the VM's documents and labels them **not verified by Hippius**. Comparing a few fields by hand, as in [What to compare](#what-to-compare), catches mistakes, not attacks. Trust comes from running a verifier on what you fetched.

Base URL `https://api.hippius.com`. Every call below except the [VM's own port](#3-get-the-evidence-for-your-nonce) needs a token of the app's account, from console **Settings**:

```bash
export HIPPIUS_TOKEN=...            # never commit it, never paste it in chat
API=https://api.hippius.com/api/compute/app-engine
AUTH="Authorization: Token $HIPPIUS_TOKEN"
UA="User-Agent: my-verify-script/1.0"
```

Add `X-Hippius-Account: acct_...` or `X-Hippius-Project: proj_...` to act in a shared account or a project. Reads need the `vms` viewer role. Send your own `User-Agent`: some default ones are blocked (`403`, `error code: 1010`). See [Management API](/use/api).

### 1. List the apps

```bash
curl -s -H "$AUTH" -H "$UA" "$API/apps/"
```

A JSON array of apps. Each has `vm_id`, `name`, `status`, `public_ip`, `compose_sha256`, `verifiable_publicly`, `evidence` and `evidence_proxy`.

### 2. Get the app

```bash
VM=hipc-12-1a2b3c4d
curl -s -H "$AUTH" -H "$UA" "$API/apps/$VM/"
```

The fields a verification uses:

```json
{
  "vm_id": "hipc-12-1a2b3c4d",
  "public_ip": "203.0.113.7",
  "compose_sha256": "<64 hex>",
  "publish_compose": false,
  "compose": "<the exact file Hippius stored>",
  "verifiable_publicly": true,
  "evidence": {
    "url": "http://203.0.113.7:9080/.well-known/hippius/app-evidence",
    "nonce_param": "nonce",
    "status_url": "http://203.0.113.7:9080/status",
    "bound_to_connection": false,
    "verify_command": "hippius-app-verify http://203.0.113.7:9080 --compose docker-compose.yaml"
  },
  "evidence_proxy": {
    "url": "/api/compute/app-engine/apps/hipc-12-1a2b3c4d/evidence/",
    "nonce_param": "nonce",
    "via": "public-ip",
    "verified": false
  }
}
```

`compose_sha256` and `compose` are Hippius's record. Check your own file against the evidence, not against these.

`evidence` is `null` and `verifiable_publicly` is `false` while the app has no public IP. `evidence_proxy` is `null` while the backend relays are off, or when it has no way to the VM.

### Runtime: what Hippius sees

```bash
curl -s -H "$AUTH" -H "$UA" "$API/apps/$VM/runtime/"
```

Hippius fetches the VM's `/status` and its evidence for a nonce Hippius drew. The answer is labelled `"verified": false`, with `evidence_state` (the observation's `state`), `compose_sha256_reported`, `raw_evidence`, the `nonce` it was asked with, and `error` (`null`, or one comma-separated string such as `"status:timeout,evidence:timeout"`). Cached 15 seconds, 30 requests a minute.

Good for monitoring, not for trust: you didn't choose the nonce. Use the next step to verify.

### 3. Get the evidence for your nonce

Draw a fresh nonce for every request: 32 random bytes, as 64 lowercase hex. Not all zeros.

```bash
NONCE=$(openssl rand -hex 32)
```

**Directly from the VM**, no account needed, plain HTTP on port 9080:

```bash
curl -s "http://203.0.113.7:9080/.well-known/hippius/app-evidence?nonce=$NONCE" > evidence.json
curl -s http://203.0.113.7:9080/status
```

The VM limits the evidence endpoint (5 reports a second, bursts of 20).

**Through the backend**, for the app's account, when the browser can't reach port 9080 or the app has no public IP:

```bash
curl -s -H "$AUTH" -H "$UA" "$API/apps/$VM/evidence/?nonce=$NONCE" > proxied.json
jq '.evidence' proxied.json > evidence.json
```

```json
{
  "label": "Unverified relay: the VM's evidence document as it answered, not verified by Hippius. Verify it yourself against this nonce.",
  "verified": false,
  "via": "public-ip",
  "nonce": "<your nonce>",
  "fetched_at": "2026-10-30T10:00:00+00:00",
  "evidence": { "format": "hippius.app-evidence.v1", "...": "as the VM answered" }
}
```

Never cached: each call is one fetch, 30 a minute.

The evidence document, `hippius.app-evidence.v1`:

| Field | What it is |
|---|---|
| `format` | `hippius.app-evidence.v1` |
| `nonce_hex` | The nonce the VM answered. Must be yours. |
| `vm_id` | The VM, from its measured boot parameters. |
| `compose_sha256` | The SHA-256 of the compose in the measurement. |
| `measured_cmdline` | The VM's measured kernel command line. |
| `vcpus` | The vCPUs at launch. |
| `manifest_sha256` | The app image manifest the VM says it booted. An unmeasured hint: the verifier uses the trusted manifest that reproduces the measurement, whatever the hint says. |
| `report_b64` | The AMD SEV-SNP attestation report, base64. |
| `certs` | Optional: `vcek_der_b64`, `ask_der_b64`, `ark_der_b64`. |
| `compose_b64` | The compose itself, only with `x-hippius.publish_compose: true`. |
| `observation_cbor_b64` | The runner's signed observation, CBOR: `state`, `runner`, `transform_v`, `services` (name, image digest, status), `foreign`. |

### 4. Get the image index

```bash
curl -s -H "$AUTH" -H "$UA" "$API/manifests/index.json" > index.json
```

`hippius.app-image-index.v1`: `entries`, each with `manifest_sha256`, `key_id` and `signature_b64`. Each entry is a manifest Hippius published, signed by a release key. The [release key](#the-release-key) `v1` has `key_id` `59c8cc9dc60ab55578a7f03b4373f167b8cc42aecd02eb874abe7d691115eafe`. A verifier takes release keys from its own pins, never from the index.

### 5. Get the app image manifest

```bash
MANIFEST=$(jq -r '.manifest_sha256' evidence.json)
curl -s -D - -H "$AUTH" -H "$UA" "$API/manifests/$MANIFEST.json" -o "$MANIFEST.json"
echo "$MANIFEST  $MANIFEST.json" | sha256sum -c
```

`hippius.app-image-manifest.v1`: the firmware (`ovmf.sha256`), kernel, initrd and root file system the image is built from, the runner version and its source commit, and the minimum AMD firmware levels. The answer's `X-Hippius-Manifest-Key-Id` and `X-Hippius-Manifest-Release-Key` headers name the key the index lists for it. They're for display: the backend doesn't check signatures.

### 6. Get the firmware image

```bash
OVMF=$(jq -r '.ovmf.sha256' "$MANIFEST.json")
curl -s -H "$AUTH" -H "$UA" "$API/manifests/artefacts/$OVMF" -o ovmf.fd
echo "$OVMF  ovmf.fd" | sha256sum -c
```

Only an artefact that a published manifest lists is served, and only once its bytes hash to the SHA-256 asked for. 20 requests a minute.

### 7. Get the AMD certificates

The VCEK is the chip's signing certificate, for one chip and one firmware level. AMD serves it at `kdsintf.amd.com`. The relay passes the same paths through, for a browser that can't reach AMD:

```bash
# The certificate chain (ASK and ARK) of a processor family: Milan, Genoa or Turin
curl -s -H "$AUTH" -H "$UA" "$API/kds/vcek/v1/Genoa/cert_chain" -o genoa-chain.pem

# A VCEK: the chip id (uppercase hex, 128 characters on Milan and Genoa, 16 on Turin)
# and the report's firmware levels, two digits each (Turin also takes fmcSPL)
curl -s -H "$AUTH" -H "$UA" \
  "$API/kds/vcek/v1/Genoa/<CHIP_ID>?blSPL=NN&teeSPL=NN&snpSPL=NN&ucodeSPL=NN" -o vcek.der
```

`NN` is a firmware level in decimal, at least two digits (`00` to `255`). The chip id and the levels come from the report. The verifier computes these URLs itself; you rarely build them by hand. The same paths work against `https://kdsintf.amd.com/` directly, without a token. 120 relay requests a minute.

The relay answers carry `X-Hippius-Relay: unverified`: they're AMD's or Hippius's bytes as served, checked by nothing.

### 8. Verify

Hand what you fetched to the CLI:

```bash
hippius-app-verify \
  --evidence evidence.json --nonce "$NONCE" \
  --compose docker-compose.yaml \
  --manifest "$MANIFEST.json" \
  --ovmf ovmf.fd
```

The CLI uses the VCEK the evidence carries, if any, and otherwise fetches it from AMD itself (not with `--offline`, unless it's cached). With recorded evidence, the verdict says `"nonce_source": "caller"`: it's fresh only because you drew the nonce just now. Against a VM with a public IP, prefer the live form, `hippius-app-verify http://<ip>:9080 ...`, which draws its own nonce.

### What to compare

Before or after the verifier, these comparisons catch the common mistakes. Each is necessary, none is sufficient:

| Compare | With | A mismatch means |
|---|---|---|
| `nonce_hex` in the evidence | the nonce you sent | A stale or replayed document. Stop. |
| `vm_id` in the evidence | the app's `vm_id` | Another VM answered. Stop. |
| `compose_sha256` in the evidence | `sha256sum docker-compose.yaml` of your copy | The VM runs another compose, or your copy differs (line endings, encoding). |
| `manifest_sha256` in the evidence | an entry of `index.json`, and the SHA-256 of the manifest file | The VM names an image Hippius didn't publish, or the file changed. |
| `ovmf.sha256` in the manifest | the SHA-256 of the firmware file | The wrong firmware. |
| The report's measurement | the launch digest recomputed from the manifest's firmware, kernel, initrd and the measured command line | Only the verifier computes this. |
| The report's signature | the VCEK, chained to AMD's ASK and ARK | Only the verifier checks this, against AMD's root keys it carries. |

The last two rows are the proof. Reading fields by hand checks nothing an attacker couldn't fake.

### Errors

Every refusal is `{"error": "<code>", "detail": "<sentence>"}`. Branch on `error`, show `detail`.

| HTTP | `error` | Meaning | What to do |
|---|---|---|---|
| 400 | `app-nonce-invalid` | The nonce isn't 64 lowercase hex, is all zeros, or is sent twice | Draw a new one with `openssl rand -hex 32`. |
| 403 | `app-engine-unavailable` | The app engine isn't open to this account, or a service token was used | Use a user API token of an account with access. |
| 403 | `app-tls-unavailable` | The evidence proxy and the relays aren't switched on yet | Fetch the evidence from port 9080 and use the CLI. |
| 404 | `not-found` | No such app on this account, or no such document | Check `vm_id`, the account header, the SHA-256. |
| 404 | `artefact-not-listed` | No published manifest lists that artefact | Take the SHA-256 from the manifest. |
| 409 | `app-evidence-unreachable` | The app has no public IP and the backend can't reach it privately (`why: "no-public-ip"`) | Attach a public IP, or verify from your private network. |
| 429 | | Rate limit | Wait for `Retry-After`. |
| 502 | `app-evidence-failed` | The VM didn't give its evidence. `why`: `unreachable`, `http-<code>`, `too-large`, `not-http`, `not-json`, `nonce-mismatch`, `vm-mismatch` | Retry. If it persists, read the app's runtime status. |
| 502 | `relay-upstream-error`, `relay-unreachable`, `relay-too-large`, `artefact-digest-mismatch` | The upstream failed, or sent the wrong bytes | Retry later. |
| 503 | `relay-busy`, `relay-rate-limited`, `manifest-relay-unavailable` | Another request is fetching the same document; AMD is limiting; the manifests aren't available yet | Retry in a second; later; use pinned files. |
| 504 | `app-evidence-timeout`, `relay-timeout` | The VM or the upstream was too slow (3 seconds for the VM) | Retry. |

## For AI agents

A procedure to collect a VM's evidence and get a verdict, without a browser. It needs an API token of the app's account, and never the user's passwords or recovery seed. Without a token, an agent can only fetch the evidence from the app's public IP: the manifests and the firmware come through the API until they're published.

<Ordered>
  <li>Set <code>API=https://api.hippius.com/api/compute/app-engine</code>, the headers <code>Authorization: Token &lt;token&gt;</code> and a <code>User-Agent</code> of your own. Add <code>X-Hippius-Account: acct_...</code> for a shared account.</li>
  <li><code>GET $API/apps/</code>. Pick the app by <code>name</code>; keep its <code>vm_id</code>.</li>
  <li><code>GET $API/apps/&lt;vm_id&gt;/</code>. Keep <code>public_ip</code>, <code>evidence.url</code>, <code>evidence_proxy.url</code> and <code>compose</code>. The compose to check is the user's own copy if they have one, else <code>compose</code> from this answer: say which in your report.</li>
  <li>Draw <code>NONCE=$(openssl rand -hex 32)</code>. If <code>evidence</code> isn't <code>null</code>, fetch <code>&lt;evidence.url&gt;?nonce=$NONCE</code> without a token. Otherwise fetch <code>&lt;evidence_proxy.url&gt;?nonce=$NONCE</code> on the API host, with the token, and take <code>.evidence</code>. If both are <code>null</code>, stop: the app can't be reached. Check that <code>nonce_hex</code> equals <code>$NONCE</code> and <code>vm_id</code> equals the app's.</li>
  <li><code>GET $API/manifests/&lt;evidence.manifest_sha256&gt;.json</code> and check its SHA-256. Then <code>GET $API/manifests/artefacts/&lt;manifest.ovmf.sha256&gt;</code> and check its SHA-256.</li>
  <li>Run the verifier. With a public IP: <code>hippius-app-verify http://&lt;public_ip&gt;:9080 --compose &lt;file&gt; --manifest &lt;manifest file&gt; --ovmf ovmf.fd --quiet</code>, which draws its own nonce. Without one: <code>hippius-app-verify --evidence evidence.json --nonce $NONCE --compose &lt;file&gt; --manifest &lt;manifest file&gt; --ovmf ovmf.fd --quiet</code>. If the verifier isn't installed, stop here and report what you fetched as "not verified".</li>
  <li>Report <code>level</code>, then <code>failed_step</code> and <code>reason</code> if present, <code>facts.compose_sha256</code>, <code>facts.manifest_sha256</code>, every entry of <code>residuals</code> and <code>notes</code>, and <code>facts.channel_bound</code>.</li>
</Ordered>

Rules for the answer:

<Unordered>
  <li>Exit code <code>0</code> and <code>level: "running"</code>: say "running — not bound to this connection", never just "verified".</li>
  <li>Exit code <code>1</code>, <code>level: "launched"</code>: the right compose booted, but the running check failed: the observation's <code>state</code> isn't <code>running</code>, or the services, image digests or other containers don't match. Give <code>reason</code> and the observation's <code>state</code>.</li>
  <li>Exit code <code>2</code>, <code>level: "none"</code>: tell the user not to trust the app, and why (<code>failed_step</code>, <code>reason</code>).</li>
  <li>Exit code <code>3</code>: the check didn't run. Report the error. It's not a verdict.</li>
  <li>Without the verifier, report only what you fetched, labelled "not verified". Never turn <code>runtime/</code>, <code>evidence_state</code> or matching hashes into a verdict.</li>
  <li>Never claim confidentiality from Hippius or a chain record. Never claim a binding to the connection unless <code>facts.channel_bound</code> is <code>true</code>.</li>
</Unordered>

Endpoints, all under `https://api.hippius.com/api/compute/app-engine/` and with the token unless noted:

| Method and path | Returns | Rate |
|---|---|---|
| `GET apps/` | Array of apps | |
| `GET apps/<vm_id>/` | The app, with `evidence`, `evidence_proxy`, `compose` | |
| `GET apps/<vm_id>/runtime/` | Hippius's fetch: `status`, `raw_evidence`, `evidence_state`, `verified: false` | 30/min, cached 15 s |
| `GET apps/<vm_id>/evidence/?nonce=<64 hex>` | `{label, verified: false, via, nonce, fetched_at, evidence}` | 30/min |
| `GET manifests/index.json` | The signed image index | 120/min |
| `GET manifests/<sha256>.json` | A manifest, exact bytes | 120/min |
| `GET manifests/artefacts/<sha256>` | A boot artefact (firmware, kernel, initrd) | 20/min |
| `GET kds/vcek/v1/<product>/<chip id>?blSPL=..&teeSPL=..&snpSPL=..&ucodeSPL=..` | A VCEK, DER | 120/min |
| `GET kds/vcek/v1/<product>/cert_chain` | ASK and ARK, PEM | 120/min |
| `GET info/` | `kds_base`, `manifest_base` (null while the relays are off), `evidence_port` | |
| `GET http://<public_ip>:9080/.well-known/hippius/app-evidence?nonce=<64 hex>` | The evidence, no token | VM: 5/s |
| `GET http://<public_ip>:9080/status` | The runner's state, no secrets, no token | |
