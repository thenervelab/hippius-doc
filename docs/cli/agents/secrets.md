---
id: secrets
title: Secrets
sidebar_label: Secrets
slug: /cli/agents/secrets
description: "How hipc issues S3 and Hub keys and database credentials once, writes them to private files with --secret-file or --credentials-dir, and which secrets go in only from the user's own files."
---

Read this before a command that creates or rotates a key, or creates a database.

An issued S3 or Hub secret is printed once and never again: a later read shows `secret: null` and a short preview. If it is lost, rotate it. A presigned URL and a Kubernetes backup's download links are made fresh on each call, and are secrets too. A command whose answer holds a secret needs `--reveal`, or it exits 2 `reveal_required` and sends nothing. `hipc schema` marks them with `reveal`.

## Keep it out of the transcript

Don't print a secret to stdout you read. Send it to a file:

- **`--secret-file <path>`.** Taken by the commands that issue an S3 token, a Hub key, or a Hub robot secret; their `--help` shows it. It writes the secret alone to a new file of mode 0600 and prints the path in its place. It counts as the reveal, so `--reveal` isn't needed beside it.
- **`--credentials-dir <dir>`.** Taken by the database create and restore. It writes `client.crt`, `client.key`, `ca.crt`, `credentials.json`, and a `.env` with the `PG*` variables into an existing private directory. Load the variables with `set -a; . <dir>/.env; set +a`.

`--secret-file` refuses a path where anything exists. `--credentials-dir` refuses a symlink or a directory that already holds one of the five files. Both refuse a directory others can write. If writing fails after the secret was issued, the whole answer goes to stdout so the secret is not lost: that output then holds it.

```sh
hipc s3 tokens create --kind sub --bucket photos --action read --action write --secret-file s3.secret --yes > token.json
hipc s3 configure --from-token-file token.json --aws-profile hippius
hipc hub keys create --name ci --role push --secret-file ci.secret --yes
```

With `--from-token-file`, `hipc s3 configure` reads the secret from the file the token document names, so run it from the same directory as the create. For the Hub, pass the secret file to `docker login --password-stdin`. Delete the secret file and the token document once the secret is stored where it is used.

## Secrets that go in, not out

- A DNS provider credential (`--credentials-file` of `hipc cdn hostnames dns-setup`) and App Engine secret values (`--secrets-file` of `hipc compute app-engine apps create`) come only from a file that is the user's own, mode 0600, not a symlink, in a directory no one else can write. Ask the user to create it; don't write the values into it yourself. In this beta, Hippius operators can read App Engine secret values.
- A Bittensor hotkey's words go only in the file `--hotkey-file` names.
- An S3 secret key (`--secret-key-file` of `hipc s3 configure`), an invite token (`--token-file` of `hipc account invites accept`), and a Kubernetes cluster key (`--cluster-key-file`) are read from files too. The API token goes only to `hipc auth login`, on the user's machine.

`--debug` prints each request's method, its URL with query values redacted, and its status, never a header or a body, so its lines are safe to show.
