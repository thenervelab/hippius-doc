---
id: secrets
title: Secrets
sidebar_label: Secrets
slug: /cli/agents/secrets
description: "How hipc issues S3 and Hub keys and database credentials once, writes them to private files with --secret-file or --credentials-dir, and which secrets go in only from the user's own files."
---

Read this before a command that creates or rotates a key, or creates a database.

A secret is printed once, when it is issued, and never again: a later read shows `secret: null` and a short preview. If it is lost, rotate it. A command whose answer holds a secret needs `--reveal`, or it exits 2 `reveal_required` and sends nothing. `hipc schema` marks them with `reveal`.

## Keep it out of the transcript

Don't print a secret to stdout you read. Send it to a file:

- **`--secret-file <path>`.** Taken by `hipc s3 tokens create` and `rotate`, `hipc hub keys create` and `rotate`, `hipc hub namespace create`, and `hipc hub namespace robot rotate`. It writes the secret alone to a new file of mode 0600 and prints the path in its place. It counts as the reveal, so `--reveal` isn't needed beside it.
- **`--credentials-dir <dir>`.** Taken by `hipc compute databases create` and `restore`. It writes `client.crt`, `client.key`, `ca.crt`, `credentials.json`, and a `.env` with the `PG*` variables into an existing private directory. Load the variables with `set -a; . <dir>/.env; set +a`.

Both refuse a path that already exists or a directory others can write. If writing fails after the secret was issued, the whole answer goes to stdout so the secret is not lost: that output then holds it.

```sh
hipc s3 tokens create --kind sub --bucket photos --action read --action write --secret-file s3.secret --yes > token.json
hipc s3 configure --from-token-file token.json --aws-profile hippius
hipc hub keys create --name ci --role push --secret-file ci.secret --yes
```

With `--from-token-file`, `hipc s3 configure` reads the secret from the file the token document names, so run it from the same directory as the create. For the Hub, pass the secret file to `docker login --password-stdin`. Delete the secret file and the token document once the secret is stored where it is used.

## Secrets that go in, not out

- A DNS provider credential (`--credentials-file` of `hipc cdn hostnames dns-setup`) and App Engine secret values (`--secrets-file` of `hipc compute app-engine apps create`) come only from a file that is the user's own, mode 0600, not a symlink, in a directory no one else can write. Ask the user to create it; don't write the values into it yourself.
- A Bittensor hotkey's words go only in the file `--hotkey-file` names.
- Nothing else that is secret is an input to `hipc`. The API token goes only to `hipc auth login`, on the user's machine.

`--debug` prints each request's method, its URL with query values redacted, and its status, never a header or a body, so its lines are safe to show.
