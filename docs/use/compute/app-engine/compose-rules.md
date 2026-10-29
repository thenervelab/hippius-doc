---
id: compose-rules
title: Compose rules reference
sidebar_label: Compose rules
slug: /use/compute/app-engine/compose-rules
unlisted: true
displayed_sidebar: docsSidebar
description: Every rule of the Hippius app engine compose grammar v1, with what it means. The restricted YAML gate, the compose grammar, the accepted values, and the bundle and secret codes. Beta.
---

The [app engine](/use/compute/app-engine) checks every compose file against grammar v1. The console, the control plane, the runner inside the VM and the verifier all apply the same rules, and refuse the same file with the same rule id.

A refusal looks like this:

<ul>
  <li>In the console and the API: <code>app-compose-invalid:&lt;rule&gt;</code>, with a sentence and, for the YAML rules, the line number.</li>
  <li>From the runner, as the app's runtime state: <code>compose-invalid:&lt;rule&gt;</code>.</li>
</ul>

The rules are checked in order and the first failure wins: fix it and check again. See [Deploying an app](/use/compute/app-engine/deploy#compose-requirements) for an overview and an example.

## Restricted YAML

These rules run first, on the raw file. They keep the file to a small subset of YAML, so that every reader parses it the same way.

| Rule | Meaning |
|---|---|
| `yaml-size` | The file is larger than 64 KiB. |
| `yaml-bom` | The file starts with a byte-order mark. |
| `yaml-utf8` | The file is not valid UTF-8. |
| `yaml-crlf` | The file has a carriage return. Use LF line endings. |
| `yaml-control-char` | The file has a tab or another control character. Indent with spaces. |
| `yaml-unicode-control` | The file has a Unicode line separator, NEL, zero-width or other invisible character, noncharacter or bidirectional control. These make a file look different from its bytes. |
| `yaml-interpolation` | `$` outside `$$`: variable interpolation is not allowed, comments included. Write `$$` for a literal `$`. |
| `yaml-empty` | The file has no content. |
| `yaml-multi-document` | More than one YAML document (`---` / `...`). |
| `yaml-directive` | A `%` directive. |
| `yaml-flow-collection` | `[...]` or `{...}`. Use block style. |
| `yaml-block-scalar` | A `\|` or `>` block scalar. |
| `yaml-multiline-scalar` | A value continues on another line, or sits on its own line. |
| `yaml-anchor` | A YAML anchor (`&name`). |
| `yaml-alias` | A YAML alias (`*name`). |
| `yaml-tag` | A YAML tag (`!reset`, `!override`, `!!str`, ...). |
| `yaml-merge-key` | A merge key (`<<`). |
| `yaml-complex-key` | A `?` complex key. |
| `yaml-duplicate-key` | A key appears twice in one map. |
| `yaml-implicit-typing` | An unquoted value other than an integer, `true` or `false`. Quote strings. |
| `yaml-single-quoted` | A single-quoted string. Use double quotes. |
| `yaml-escape` | An escape other than `\\` and `\"` in a string. |
| `yaml-key-form` | A key that must be double-quoted, or a space before a colon. |
| `yaml-indent` | Inconsistent indentation, or a sequence not indented under its key. |
| `yaml-int-range` | An integer above 2^53 - 1. |
| `yaml-root-not-map` | The document is not a map. |
| `yaml-syntax` | Any other construct outside the subset. |

What the subset accepts:

- A value is a double-quoted string (escapes `\\` and `\"` only), an integer without sign or leading zero, `true` or `false`. A key with nothing after the colon and no nested block is empty, as in `volumes:` → `pgdata:`.
- A plain key matches `[A-Za-z_][A-Za-z0-9_./-]*` and is not `y`, `n`, `yes`, `no`, `on`, `off`, `true`, `false`, `null` or `~` (in any case). Other keys are double-quoted, such as `"org.example/team": "web"`.
- Nested blocks are indented deeper than their parent, and siblings share a column. A list item is `- <value>` or `- <key>: ...` with one space after the dash, indented under its key.
- Comments are whole lines, or ` # ...` after a complete value.

## Compose grammar v1

These rules check what the file says.

| Rule | Meaning |
|---|---|
| `top-level-key` | A top-level key other than `services`, `volumes`, `networks`, `x-hippius` (`include`, `configs`, `secrets`, `name`, `version`, ...). |
| `extension-key` | An `x-*` key anywhere but the top-level `x-hippius`. |
| `services-missing` | No services. |
| `service-count` | More than 64 services. |
| `x-hippius-missing` | No `x-hippius` block. |
| `x-hippius-version` | `x-hippius.version` is missing or not `1`. |
| `x-hippius-key` | An unknown key in `x-hippius`. |
| `x-hippius-value` | An `x-hippius` value out of form (`logs`, `publish_compose`, `upgrade_from`, ...). |
| `secret-name` | A secret name outside `[A-Z][A-Z0-9_]{0,63}`. |
| `secret-duplicate` | A secret declared twice. |
| `service-name` | A service name outside `[a-z0-9][a-z0-9_-]{0,62}`. |
| `service-key` | A service key that is not allowed (`privileged`, `devices`, `cap_add`, `network_mode`, `build`, `pid`, `security_opt`, `env_file`, `volumes_from`, `extends`, `sysctls`, `logging`, `platform`, ...). |
| `image-digest` | `image` missing, or not `<ref>@sha256:<64 hex>` without a tag. |
| `image-registry` | The image's registry is not a public DNS name (an IP address, `localhost`, a single label, `.local`, `.internal`, ...). |
| `command-form` | `command` or `entrypoint` is not a non-empty list of strings. Shell strings are refused. |
| `environment-form` | `environment` is not a map of names to quoted strings. |
| `port-form` | A port is not `"<host>:<container>[/tcp]"` (no host IP, no range). |
| `port-udp` | A UDP port. TCP only in this phase. |
| `port-reserved` | Host port 9080, 9443 or 51820. |
| `port-duplicate` | A host port published twice. |
| `expose-form` | An `expose` entry is not a quoted port number, or is repeated. |
| `mount-form` | A volume in the short `src:dst` form. Use the long form. |
| `mount-key` | A mount key outside the exact set (`volume.subpath`, `volume.nocopy`, `bind`, `consistency`, ...). |
| `mount-type` | A mount type other than `volume` or `tmpfs` (`bind`, `image`, `npipe`, `cluster`). |
| `mount-source` | A volume mount whose source is not a declared top-level volume. |
| `mount-target` | A mount target that is not an absolute normalised path, or two mounts on one path. |
| `tmpfs-form` | A `tmpfs` entry with options, or an empty `tmpfs` block. |
| `volume-name` | A volume name outside `[a-z0-9][a-z0-9_-]{0,62}`. |
| `volume-config` | A top-level volume with options (`driver`, `driver_opts`, `external`, `name`). |
| `network-name` | A network name out of form, or a declared `default`. |
| `network-config` | A top-level network with options (`external`, `driver_opts`, `ipam`, ...). |
| `service-network-unknown` | A service network that is not declared. |
| `depends-on-form` | `depends_on` out of form (only `condition` and `required`). |
| `depends-on-unknown` | `depends_on` names an unknown service. |
| `depends-on-cycle` | `depends_on` has a cycle. |
| `depends-on-complexity` | `depends_on` has more than 10,000 paths: too many dependencies between services. |
| `restart-value` | `restart` is not `"no"`, `"always"`, `"on-failure"` or `"unless-stopped"`. |
| `healthcheck-form` | `healthcheck` out of form (`test` is a list starting `CMD`, `CMD-SHELL` or `NONE`). |
| `label-form` | `labels` is not a map of keys to quoted strings. |
| `label-reserved` | A label under `com.docker.` or `io.hippius.`. |
| `service-secret-undeclared` | A service lists a secret that is not in `x-hippius.secrets`. |
| `duration-form` | A duration is not `"<n>ms"`, `"<n>s"`, `"<n>m"` or `"<n>h"`. |
| `size-form` | A size is not a positive byte count or `"<n>b"`, `"<n>k"`, `"<n>m"`, `"<n>g"`. |
| `value-form` | Another value out of form (`read_only`, `cpus`, `user`, `working_dir`, `hostname`, ...). |
| `ulimits-form` | `ulimits` out of form (a number, or `soft` ≤ `hard`). |
| `extra-hosts-form` | An `extra_hosts` entry is not `"host=ip"` with a canonical IP. |
| `cap-drop-form` | A `cap_drop` entry is not an upper-case capability, or is repeated. |
| `tls-port` | `x-hippius.tls.port` is reserved, missing, or also a published port. |
| `tls-upstream` | `x-hippius.tls.upstream` is not `<declared service>:<port>`. |

`x-hippius.tls` belongs to a later phase. Until then, a compose that sets it is refused with `app-tls-unavailable`.

### Runner only

| Rule | Meaning |
|---|---|
| `differential` | Docker Compose read the file differently from grammar v1, so the runner refuses to start it. It never comes from the console: it shows as the app's runtime state, `compose-invalid:differential`. |

### Allowed keys and values

Top level: `services` (required, 1 to 64), `volumes`, `networks`, `x-hippius` (required).

A service may use: `image`, `command`, `entrypoint`, `environment`, `ports`, `expose`, `volumes`, `tmpfs`, `depends_on`, `restart`, `healthcheck`, `working_dir`, `user`, `read_only`, `init`, `cap_drop`, `ulimits`, `mem_limit`, `cpus`, `pids_limit`, `shm_size`, `stop_signal`, `stop_grace_period`, `labels`, `hostname`, `networks`, `extra_hosts`, `secrets`. Anything else is `service-key`.

"String" means double-quoted.

| Key | Accepted |
|---|---|
| Service, volume, network names | `[a-z0-9][a-z0-9_-]{0,62}`. `default` can't be declared. |
| Top-level `volumes.<name>`, `networks.<name>` | Empty: nothing after the colon. |
| `image` | `[<registry>/]<path>@sha256:<64 lowercase hex>`, at most 512 bytes. A registry is a public DNS name with at least two labels and an optional `:<port>`. |
| `command`, `entrypoint` | A non-empty list of strings. |
| `environment` | A map of `[A-Za-z_][A-Za-z0-9_]*` to strings. |
| `ports` | A list of strings `"<host>:<container>"` or `"<host>:<container>/tcp"`, ports 1 to 65535. Each host port once across all services. |
| `expose` | A list of distinct strings, ports 1 to 65535. |
| `volumes` (service) | A list of maps: `type: "volume"` with `source` (a declared volume), `target`, optional `read_only`; or `type: "tmpfs"` with `target`, optional `read_only`, optional `tmpfs:` → `size`. |
| `tmpfs` | A list of absolute paths. |
| Absolute paths (`target`, `tmpfs`, `working_dir`) | `/` then segments of `[A-Za-z0-9._@+-]`, none empty, `.` or `..`, no trailing `/`, not `/` alone. Mount targets distinct within a service. |
| `depends_on` | A list of service names, or a map of names to `condition` (`"service_started"`, `"service_healthy"`, `"service_completed_successfully"`) and optional `required`. No cycles. |
| `restart` | `"no"`, `"always"`, `"on-failure"`, `"unless-stopped"`. |
| `healthcheck` | `test` (a list starting `"CMD"`, `"CMD-SHELL"` or `"NONE"`), durations `interval`, `timeout`, `start_period`, `start_interval`, `retries` (an integer ≥ 1), `disable` (bool). |
| Durations (`stop_grace_period`, healthcheck) | A string `"<n>ms"`, `"<n>s"`, `"<n>m"`, `"<n>h"`, with `n` ≥ 1. |
| Sizes (`mem_limit`, `shm_size`, `tmpfs.size`) | An integer ≥ 1 (bytes), or a string `"<n>"`, `"<n>b"`, `"<n>k"`, `"<n>m"`, `"<n>g"` (1024-based). |
| `cpus` | An integer 1 to 999, or a string such as `"0.5"` or `"1.25"` (at most two decimals, no trailing zero). |
| `user` | `"<user>"` or `"<user>:<group>"`, each `[A-Za-z0-9_.-]{1,64}`. |
| `read_only`, `init` | `true` or `false`. |
| `cap_drop` | A list of distinct capabilities, such as `"NET_RAW"`. |
| `ulimits` | A map of `[a-z]+` to an integer, or to `soft` and `hard` integers with `soft` ≤ `hard`. |
| `pids_limit` | An integer ≥ 1. |
| `stop_signal` | `"SIG..."`, such as `"SIGTERM"`. |
| `labels` | A map of `[A-Za-z0-9][A-Za-z0-9._/-]*`, at most 255 bytes, to strings. A key that starts with a digit is double-quoted. Not under `com.docker.` or `io.hippius.`. |
| `hostname` | One lowercase DNS label. |
| `networks` (service) | A list of distinct declared networks, or `"default"`. |
| `extra_hosts` | A list of `"<host>=<ip>"`, with the IP in its canonical form. |
| `secrets` (service) | A list of distinct names from `x-hippius.secrets`. |
| `x-hippius` | `version: 1` (required); `secrets` (distinct `[A-Z][A-Z0-9_]{0,63}`); `logs` (`"none"` or `"public"`); `publish_compose` (bool); `upgrade_from` (distinct SHA-256 hashes, 64 lowercase hex). |

## Secrets and the bundle

The compose and your secret values travel to the VM together, in a launch bundle. These codes concern the secrets you enter and that bundle.

| Code | Meaning |
|---|---|
| `app-compose-required` | No compose was sent. An empty file is `yaml-empty`. |
| `app-too-many-ports` | More than 64 published ports. |
| `app-secrets-invalid` | The secrets are not a set of names and text values. |
| `app-secret-name-invalid` | A secret name outside `[A-Z][A-Z0-9_]{0,63}`. |
| `app-secret-undeclared` | A value for a name the compose doesn't declare in `x-hippius.secrets`. |
| `app-secret-missing` | A declared secret without a value. |
| `app-secret-too-large` | A secret value over 64 KiB. |
| `app-bundle-too-large` | The compose and its secrets together are over 256 KiB. |
| `app-bundle-invalid` | The control plane refused the bundle as malformed. Contact support if you see it. |
| `app-compose-hash-mismatch` | The compose received doesn't match the hash it was launched with. Contact support if you see it. |

On the VM, the runner applies the same checks before it starts anything. If one fails, nothing runs, and the app's runtime state names it:

| Runner state | Meaning |
|---|---|
| `compose-mismatch` | The compose doesn't hash to the value in the VM's measurement. |
| `bundle-missing`, `bundle-invalid` | The VM didn't receive a valid launch bundle. |
| `secret-missing:<NAME>` | A declared secret is not in the bundle. |
| `secret-undeclared:<NAME>` | The bundle carries a secret the compose doesn't declare. |
