# `docker push` fails with `500 Cannot find server.` on Docker Desktop

## Symptom

```
$ docker push registry.hippius.com/<ns>/<image>:<tag>
The push refers to repository [registry.hippius.com/<ns>/<image>]
a8d26d037006: Preparing
a8d26d037006: Retrying in 5 seconds
...
received unexpected HTTP status: 500 Cannot find server.
```

The push retries indefinitely and never reaches the registry. `docker pull` may work (or also fail), `hippius-hub upload` and `docker buildx imagetools create` push successfully.

## Root cause

**Docker Desktop is configured with a broken HTTP/HTTPS proxy.** The daemon routes every outbound HTTP request through that proxy. When the proxy can't connect to the destination — or itself is unreachable — it returns `500 Cannot find server.` to the client. Docker shows that as if the registry returned the error, but **the registry is never reached**.

The smoking gun is in `docker info`:

```
$ docker info | grep -iE 'proxy'
 HTTP Proxy: http.docker.internal:3128
 HTTPS Proxy: http.docker.internal:3128
 No Proxy: hubproxy.docker.internal
```

`http.docker.internal:3128` is Docker Desktop's internal proxy (used by the Hardened Desktop / VPNKit features). If it's misconfigured, stale, or the upstream is down, every direct registry call from `docker push` and `docker pull` will fail.

## How to confirm it's the proxy, not the registry

If any of these succeed while `docker push` fails, the issue is on the client side — not the registry:

1. **buildx** uses different network plumbing inside Docker Desktop's VM and bypasses the daemon-level proxy:
   ```bash
   docker buildx imagetools create --tag registry.hippius.com/<ns>/<image>:<tag> <source-image>
   ```
2. **`hippius-hub upload`** talks to the console API directly from the host, not via the daemon:
   ```bash
   hippius-hub upload <ns>/<repo> ./path --revision v1
   ```
3. **A raw `curl` from the host** uses the host's network stack, not the daemon's:
   ```bash
   curl -i https://registry.hippius.com/v2/
   # expect: HTTP/2 401 with Www-Authenticate: Bearer realm="..."
   ```

If those work, the registry path is fine. Fix Docker Desktop.

## Fix

**Docker Desktop → Settings → Resources → Proxies.** Pick one:

- **Disable the proxy** if you don't need it. Most users don't.
- Or add `registry.hippius.com` (and any other hosts you push to) to **"Bypass proxy for the following hosts"**.

Then **restart Docker Desktop** so the daemon picks up the new config. Verify with:

```bash
docker info | grep -iE 'proxy'
```

The hostnames you bypassed should appear under `No Proxy`, not `HTTP Proxy` / `HTTPS Proxy`.

## Why CLI env vars don't help

Setting `NO_PROXY=registry.hippius.com` in your shell **does not** affect Docker Desktop's daemon — those env vars only configure the docker CLI client process, which already lives outside the daemon's VM. The daemon's proxy config is managed by Docker Desktop's settings and only by Docker Desktop's settings.

## Workarounds (while you sort the proxy)

Any of these will push to the registry without touching the broken proxy path:

```bash
# Buildx (recommended) — same image, just different push tool
docker buildx imagetools create --tag registry.hippius.com/<ns>/<image>:<tag> <source-image>

# Hippius Hub CLI (for model artifacts, not OCI images)
hippius-hub upload <ns>/<repo> ./local-folder --revision v1

# skopeo / crane / regctl — if you have them installed, all bypass the docker daemon
skopeo copy docker-daemon:<source-image> docker://registry.hippius.com/<ns>/<image>:<tag>
```

## Not a registry issue

This is purely a client-side Docker Desktop configuration problem. The registry, ATS proxy, HAProxy auth layer, and Harbor are all unaffected. No infra changes needed.
