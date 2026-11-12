---
id: hub
title: Hub
sidebar_label: Hub
slug: /cli/agents/hub
description: "How the hippius-hub registry commands map to hipc hub commands for the namespace, its plan, and its CI keys."
---

Read this when the user mentions Hippius Hub, a container registry namespace, or `hippius-hub`.

`hipc` manages the Hub namespace, its plan, and its CI keys with the API token. `docker`, `oras`, or `hippius-hub` move the images and models. The names differ from the `hippius-hub registry` commands, so map them here rather than guess:

| `hippius-hub registry` | `hipc` |
| --- | --- |
| `plans` | `hipc hub plans` |
| `check NAME` | `hipc hub namespace availability my-models` |
| `provision NAME` | `hipc hub namespace create my-models --secret-file robot.secret --yes` |
| `status` | `hipc hub namespace status` |
| `me` | `hipc hub namespace get`, and `hipc hub namespace robot get` for the login name |
| `rotate-token` | `hipc hub namespace robot rotate --secret-file robot.secret --yes` |
| `publicity public` | `hipc hub namespace update --visibility public --public --yes` |
| `repos` | `hipc hub repositories list` |
| `artifacts REPO` | `hipc hub artifacts list my-models/app` |
| `usage` | `hipc hub usage` |
| `keys list` | `hipc hub keys list` |
| `keys create NAME --role push` | `hipc hub keys create --name ci --role push --secret-file ci.secret --yes` |
| `keys show`, `rotate`, `revoke` | `hipc hub keys get 12`, `hipc hub keys rotate 12 --secret-file new.secret --yes`, `hipc hub keys delete 12 --yes` |
| `subscribe PLAN` | `hipc hub subscription subscribe --plan Builder --yes` |
| `subscriptions` | `hipc hub subscription get` |

The keys the console calls CI keys are the keys group, as in `hipc hub keys list`. Creating a namespace needs a positive balance. A second paid plan needs `--replace`.
