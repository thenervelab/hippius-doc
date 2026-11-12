---
id: api
title: hipc api
sidebar_label: hipc api
slug: /cli/agents/api
description: "What hipc api sends to the console API, what it asks for, what it never sends, and when to use it instead of a command."
---

Read this when no command covers what the user needs.

`hipc api <METHOD> <PATH>` sends one request to the Hippius console API, with the same token, account selection, confirmations, guards, and error object as every command. The path is under `/api`, so `/accounts/` means `/api/accounts/`. Prefer a command when one exists: it reads first, names the risk in its question, and prints a document that only gains fields.

```sh
hipc api GET /accounts/
hipc api GET /compute/vms/ --all
hipc api POST /cdn/zones/ --body-file zone.json --dry-run
```

What it asks for:

- Every method other than `GET` and `HEAD` needs `--yes`, and so does a `GET` or `HEAD` of `/network/me/`, which may create the account's network.
- A route whose answer holds a secret needs `--reveal`. So does a `GET` of a route `hipc` doesn't know, since its answer may hold one.
- A guarded write needs the same flag as its command, whatever the method or the path's letter case: `--public`, `--remove-others`, or `--change-isolation` for a change to which network peers can reach each other.
- `--dry-run` works as everywhere.

What it never sends, whatever the flags:

- an account deletion request;
- anything under `/auth/token/`;
- a Kubernetes cluster's sealed secrets;
- a CDN hostname's DNS setup;
- a Hub subscribe;
- an App Engine body that sets `secrets`;
- a support message that holds the API token or an access key.

Each of these has a command, or the console, that does it safely. A URL on another host is refused; use `curl` for that.

`hipc api --help` and `hipc schema api` list each rule with its exact routes.
