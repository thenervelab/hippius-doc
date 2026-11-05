---
id: ci
title: Publish from GitHub Actions
sidebar_label: GitHub Actions
slug: /registry/ci
description: Push a container image and upload a model to Hippius Hub from a GitHub Actions workflow on each release, with a scoped CI key stored as GitHub secrets. Covers creating the key with hipc, quoting the login safely, expiry, rotation and storage per release.
---

# Publish from GitHub Actions

This page sets up a GitHub Actions workflow that pushes a container image and uploads a model to your Hub namespace every time you publish a release. It uses a scoped CI key, so the pipeline never holds your account's API token or the namespace's own login.

You need a namespace first: see [Push](/registry/push#provision-a-namespace).

---

## 1. Create a CI key

A CI key is a registry login with one role. `push` can pull and push; it can't delete anything. Create it with [hipc](/cli) and send the answer straight to a private file, so the secret never shows in your terminal:

```bash
(umask 077; hipc --json hub keys create --name ci --role push --expires-in 365 --reveal --yes > hub-key.json)
```

Run it with `--dry-run` in place of `--yes` first to see the request. The answer holds the key's `id`, its `login` (such as `robot$my-team+ci`) and its `secret`. The secret is shown once.

You can also create the key with `hippius-hub registry keys create ci --role push` or on the console's Hub page.

## 2. Store it as GitHub secrets

With the [GitHub CLI](https://cli.github.com), in the repository:

```bash
jq -r .login hub-key.json | gh secret set HIPPIUS_HUB_USER
jq -r .secret hub-key.json | gh secret set HIPPIUS_HUB_PASS
rm hub-key.json
```

`gh secret set` reads the value from stdin, so it never appears in your shell history. Or paste both values in the repository's **Settings** → **Secrets and variables** → **Actions**.

## 3. The workflow

```yaml title=".github/workflows/publish.yml"
name: Publish to Hippius Hub

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    env:
      HUB_USER: ${{ secrets.HIPPIUS_HUB_USER }}
      HUB_PASS: ${{ secrets.HIPPIUS_HUB_PASS }}
      TAG: ${{ github.event.release.tag_name }}
    steps:
      - uses: actions/checkout@v4

      - name: Push the image
        run: |
          printf '%s' "$HUB_PASS" | docker login registry.hippius.com -u "$HUB_USER" --password-stdin
          docker build -t "registry.hippius.com/my-team/app:$TAG" .
          docker push "registry.hippius.com/my-team/app:$TAG"

      - name: Upload the model
        run: |
          pip install hippius_hub
          printf '%s' "$HUB_PASS" | hippius-hub login --username "$HUB_USER" --password-stdin
          hippius-hub upload my-team/my-model ./model --revision "$TAG"
```

Replace `my-team` with your namespace, and `app`, `my-model` and `./model` with your repositories and folder.

:::warning The login contains a `$`
A CI key's login looks like `robot$my-team+ci`. GitHub pastes every `${{ ... }}` expression into the script as text before the shell runs it, so `-u "${{ secrets.HIPPIUS_HUB_USER }}"` becomes `-u "robot$my-team+ci"`, and the shell replaces `$my` with nothing. Both logins then fail. Map each secret to an environment variable under `env:`, as above, and use `"$HUB_USER"` in the script. Pass the secret on stdin with `--password-stdin`, never as an argument.
:::

---

## Expiry and rotation

- **Expiry.** The key above stops working after 365 days. Without `--expires-in` it never expires. When it expires, logins fail: create a new key, update both secrets, then delete the old key with `hipc hub keys delete KEY_ID --yes`.
- **Rotation.** `hipc hub keys rotate KEY_ID --reveal --yes` replaces the secret, and the old one stops working at once. Redirect it to a private file as in step 1, then set `HIPPIUS_HUB_PASS` again. The login stays the same. `hipc hub keys list` shows the key ids.
- **Leaked key.** Delete it, or rotate it. Only that key is affected: the namespace login and your other keys keep working.

Don't use `hippius-hub registry rotate-token` for CI. It replaces the namespace's own login, which breaks everything else that uses it.

## Storage per release

Every release adds a tag and a revision, and each counts against your plan's storage. The Free plan holds 25 GB private and 100 GB public: a 7B model at 16-bit precision is about 15 GB, so a few private releases fill it. See the [Hub plans](/use/console/hub#hub-plans).

- `hipc hub usage` shows what you store.
- `hipc hub artifacts list my-team/my-model` lists the versions, and `hipc hub artifacts delete my-team/my-model REFERENCE --yes` deletes an old one. A deleted version can't be restored.
- New namespaces are public. To keep a model private, run `hipc hub namespace update --visibility private --yes` before the first push.

---

## Where to next

- [**Push**](/registry/push): images, models and Hugging Face mirrors.
- [**CLI reference**](/registry/cli): `hippius-hub` and the same tasks with `hipc`.
- [**Hub console page**](/use/console/hub): plans, keys and visibility in the browser.
