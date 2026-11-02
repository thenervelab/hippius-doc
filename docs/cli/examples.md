---
id: examples
title: hipc examples
sidebar_label: Examples
slug: /cli/examples
description: Twelve hipc journeys as copyable snippets, from the first login to an agent loop. Account and billing, Drive, S3 with an AWS profile, Hub with a CI key, compute with an SSH key, CDN, the private network and Kubernetes, the team, support, automation, and token hygiene.
---

Each block is one journey, in order. Reads change nothing. A write is shown with `--dry-run` first (sends nothing); run it again with `--yes` to do it. Replace `<...>` with an id or name from an earlier answer.

They come from [docs/user-journeys.md](https://github.com/thenervelab/hippius-cli/blob/main/docs/user-journeys.md), run against the live API before each release.

## 1. First run and login

```bash
hipc version
hipc --help
hipc auth status                      # exit 1 `auth` until a token is stored
hipc auth login --token-file -        # paste the token, press Enter, then Ctrl-D
hipc auth status
```

## 2. Account and billing

```bash
hipc account get
hipc account notifications
hipc account members list
hipc billing balance
hipc billing subscriptions
hipc billing transactions --limit 5
hipc billing summary
hipc billing usage
hipc billing invoices list --limit 5
hipc billing profile get
hipc billing auto-reload get
hipc billing auto-reload history --limit 5
hipc billing top-up --amount 10 --method card --dry-run
```

## 3. Drive

```bash
hipc drive plans
hipc drive subscription get
hipc drive subscription history --limit 5
hipc drive subscription subscribe --plan solo --dry-run
hipc drive subscription change --plan duo --dry-run
hipc drive subscription cancel --dry-run
```

## 4. S3, with an AWS profile

Create a bucket, a sub token scoped to it, and an AWS CLI profile from that token; the objects themselves move with `aws s3 cp`.

```bash
hipc s3 plans
hipc s3 subscription get
hipc s3 buckets list
hipc s3 buckets objects list <bucket> --limit 10
hipc s3 buckets acl list
hipc s3 tokens list
hipc s3 subscription subscribe --plan pro --dry-run
hipc s3 buckets create photos --yes
hipc s3 buckets acl get photos
hipc s3 tokens create --kind sub --name photos-ci --bucket photos --reveal --yes > ~/s3-token.json
hipc s3 configure --from-token-file ~/s3-token.json --aws-profile hippius
aws --profile hippius s3 ls s3://photos
hipc s3 tokens revoke --kind sub <token_id> --yes
hipc s3 buckets delete photos --yes
```

## 5. Hub, with a CI key

```bash
hipc hub plans
hipc hub subscription get
hipc hub namespace status
hipc hub namespace get
hipc hub namespace robot
hipc hub usage
hipc hub repositories list
hipc hub artifacts list <repository>
hipc hub keys list
hipc hub subscription subscribe --plan Builder --dry-run
hipc hub keys create --name ci-pull --role read --expires-in 30 --reveal --yes > ~/hub-key.json
jq -r .secret ~/hub-key.json | docker login registry.hippius.com -u <login> --password-stdin
hipc hub keys delete <key_id> --yes
```

## 6. Compute, with an SSH key

```bash
hipc compute regions
hipc compute flavors
hipc compute prices
hipc compute public-prices                # needs no token
hipc compute quota
hipc compute feasibility --flavor small
hipc compute vms list
hipc compute ssh-keys list --all
hipc compute public-ip availability
ssh-keygen -q -t ed25519 -N '' -f ~/.ssh/hippius
hipc compute ssh-keys create --name laptop --public-key-file ~/.ssh/hippius.pub --yes
hipc compute vms create --flavor small --name web-1 --ssh-key-id <key_id> --dry-run
hipc compute vms create --flavor small --name web-1 --ssh-key-id <key_id> --yes
hipc compute public-ip create <vm_id> --dry-run
hipc compute vms get <vm_id>
hipc compute vms stop <vm_id> --yes
hipc compute vms delete <vm_id> --yes
```

## 7. CDN

```bash
hipc cdn prices
hipc cdn regions
hipc cdn estimate --traffic FR=100 --requests 1000000
hipc cdn zones list
hipc cdn lists list
hipc cdn waf get <zone_id>
hipc cdn zones create --name site --bucket photos --dry-run
```

## 8. Private network and Kubernetes

The first `hipc network get` for an account creates its network, so it is confirmed; the kubeconfig needs the key file the console saved when it created the cluster.

```bash
hipc network get --dry-run
hipc network peers list
hipc network vpcs list
hipc compute kubernetes clusters list
hipc compute kubernetes clusters refusals
hipc compute kubernetes clusters kubeconfig <cluster_id> --cluster-key-file ~/hippius-cluster-prod.key --output-file ~/.kube/hippius --dry-run
```

## 9. Team, projects, and billing accounts

```bash
hipc account members list
hipc account invites list
hipc account invites create --email teammate@example.com --dry-run
hipc account projects list
hipc account billing-accounts list
hipc account projects use <project_id>
hipc account projects use default
hipc account billing-accounts use <billing_account_id>
hipc account billing-accounts use default
hipc account use <account_id>                # act in a shared account
hipc account use self
```

## 10. Support

```bash
hipc support tickets list --limit 5
hipc support tickets get <ticket_id>
hipc support tickets create --subject 'VM will not start' --body-file ~/ticket.txt --dry-run
```

## 11. Agent and automation

A program learns `hipc` from its schema, reads JSON, and branches on error codes. Full playbook: [For agents](/cli/agents).

```bash
hipc schema | jq -r '.commands[] | select(.effect != "read_only") | .path | join(" ")'
AI_AGENT=1 hipc compute vms list                      # JSON without a flag
hipc compute ssh-keys list --all --json               # one array, every page
hipc s3 buckets create photos --dry-run --json
hipc s3 buckets delete photos --json                  # exit 2 `confirmation_required`: no --yes
hipc s3 tokens create --kind sub --bucket photos --yes --json   # exit 2 `reveal_required`: no --reveal
hipc compute vms list --bogus --json                  # exit 2 `usage`
```

## 12. Token hygiene

```bash
hipc auth login --token-file -        # stdin, never argv
ls -l ~/.hippius/config.toml         # mode 0600, owner only
hipc auth status                      # a four-character preview, never the token
hipc account list --debug             # request lines with no header, no token
hipc auth logout --yes
HIPPIUS_TOKEN=<token> hipc account list    # one run, stored nowhere
```
