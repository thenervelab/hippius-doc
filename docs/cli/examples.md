---
id: examples
title: hip examples
sidebar_label: Examples
slug: /cli/examples
description: Twelve hip journeys as copyable snippets, from the first login to an agent loop. Account and billing, Drive, S3 with an AWS profile, Hub with a CI key, compute with an SSH key, CDN, the private network and Kubernetes, the team, support, automation, and token hygiene.
---

Each block is one journey, in the order a person or a program runs it. Reads change nothing. A write is shown with `--dry-run` first, which prints the requests it would send and sends nothing; run it again with `--yes` to do it. Replace `<...>` with an id or a name from an earlier answer.

These are the scenarios of [docs/user-journeys.md](https://github.com/thenervelab/hippius-cli/blob/main/docs/user-journeys.md) in the repository, which a maintainer runs against the live API before each release.

## 1. First run and login

```bash
hip version
hip --help
hip auth status                      # exit 1 `auth` until a token is stored
hip auth login --token-file -        # paste the token, press Enter, then Ctrl-D
hip auth status
hip auth logout --yes
```

## 2. Account and billing

```bash
hip account get
hip account notifications
hip account members list
hip billing balance
hip billing subscriptions
hip billing transactions --limit 5
hip billing summary
hip billing usage
hip billing invoices list --limit 5
hip billing profile get
hip billing auto-reload get
hip billing auto-reload history --limit 5
hip billing top-up --amount 10 --method card --dry-run
```

## 3. Drive

```bash
hip drive plans
hip drive subscription get
hip drive subscription history --limit 5
hip drive subscription subscribe --plan solo --dry-run
hip drive subscription change --plan duo --dry-run
hip drive subscription cancel --dry-run
```

## 4. S3, with an AWS profile

Create a bucket, a sub token scoped to it, and an AWS CLI profile from that token; the objects themselves move with `aws s3 cp`.

```bash
hip s3 plans
hip s3 subscription get
hip s3 buckets list
hip s3 buckets objects list <bucket> --limit 10
hip s3 buckets acl list
hip s3 tokens list
hip s3 subscription subscribe --plan pro --dry-run
hip s3 buckets create photos --yes
hip s3 buckets acl get photos
hip s3 tokens create --kind sub --name photos-ci --bucket photos --reveal --yes > ~/s3-token.json
hip s3 configure --from-token-file ~/s3-token.json --aws-profile hippius
aws --profile hippius s3 ls s3://photos
hip s3 tokens revoke --kind sub <token_id> --yes
hip s3 buckets delete photos --yes
```

## 5. Hub, with a CI key

```bash
hip hub plans
hip hub subscription get
hip hub namespace status
hip hub namespace get
hip hub namespace robot
hip hub usage
hip hub repositories list
hip hub artifacts list <repository>
hip hub keys list
hip hub subscription subscribe --plan Builder --dry-run
hip hub keys create --name ci-pull --role read --expires-in 30 --reveal --yes > ~/hub-key.json
docker login registry.hippius.com -u <login> --password-stdin < <(jq -r .secret ~/hub-key.json)
hip hub keys delete <key_id> --yes
```

## 6. Compute, with an SSH key

```bash
hip compute regions
hip compute flavors
hip compute prices
hip compute public-prices                # needs no token
hip compute quota
hip compute feasibility --flavor small
hip compute vms list
hip compute ssh-keys list --all
hip compute public-ip availability
ssh-keygen -q -t ed25519 -N '' -f ~/.ssh/hippius
hip compute ssh-keys create --name laptop --public-key-file ~/.ssh/hippius.pub --yes
hip compute vms create --flavor small --name web-1 --ssh-key-id <key_id> --dry-run
hip compute vms create --flavor small --name web-1 --ssh-key-id <key_id> --yes
hip compute public-ip create <vm_id> --dry-run
hip compute vms get <vm_id>
hip compute vms stop <vm_id> --yes
hip compute vms delete <vm_id> --yes
```

## 7. CDN

```bash
hip cdn prices
hip cdn regions
hip cdn estimate --traffic FR=100 --requests 1000000
hip cdn zones list
hip cdn lists list
hip cdn waf get <zone_id>
hip cdn zones create --name site --bucket photos --dry-run
```

## 8. Private network and Kubernetes

The first `hip network get` for an account creates its network, so it is confirmed; the kubeconfig needs the key file the console saved when it created the cluster.

```bash
hip network get --dry-run
hip network peers list
hip network vpcs list
hip compute kubernetes clusters list
hip compute kubernetes clusters refusals
hip compute kubernetes clusters kubeconfig <cluster_id> --cluster-key-file ~/hippius-cluster-prod.key --output-file ~/.kube/hippius --dry-run
```

## 9. Team, projects, and billing accounts

```bash
hip account members list
hip account invites list
hip account invites create --email teammate@example.com --dry-run
hip account projects list
hip account billing-accounts list
hip account projects use <project_id>
hip account projects use default
hip account billing-accounts use <billing_account_id>
hip account billing-accounts use default
hip account use <account_id>                # act in a shared account
hip account use self
```

## 10. Support

```bash
hip support tickets list --limit 5
hip support tickets get <ticket_id>
hip support tickets create --subject 'VM will not start' --body-file ~/ticket.txt --dry-run
```

## 11. Agent and automation

A program learns `hip` from its schema, reads JSON, and branches on error codes. [hip for agents](/cli/agents) is the full playbook.

```bash
hip schema | jq -r '.commands[] | select(.effect != "read_only") | .path | join(" ")'
AI_AGENT=1 hip compute vms list                      # JSON without a flag
hip compute ssh-keys list --all --json               # one array, every page
hip s3 buckets create photos --dry-run --json
hip s3 buckets delete photos --json                  # exit 2 `confirmation_required`: no --yes
hip s3 tokens create --kind sub --bucket photos --yes --json   # exit 2 `reveal_required`: no --reveal
hip compute vms list --bogus --json                  # exit 2 `usage`
```

## 12. Token hygiene

```bash
hip auth login --token-file -        # stdin, never argv
ls -l ~/.hippius/config.toml         # mode 0600, owner only
hip auth status                      # a four-character preview, never the token
hip account list --debug             # request lines with no header, no token
hip auth logout --yes
HIPPIUS_TOKEN=<token> hip account list    # one run, stored nowhere
```
