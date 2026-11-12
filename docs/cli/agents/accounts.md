---
id: accounts
title: Accounts, projects, and billing accounts
sidebar_label: Accounts and projects
slug: /cli/agents/accounts
description: "How hipc selects a shared account, a project, or a billing account for one run or every run, and what the *_scope_unsupported refusals mean."
---

Read this when the user works in a shared account, a project, or a billing account other than the default.

One token can act in the user's own account and in every shared account they belong to. Each run acts in one account, and optionally one project or one billing account:

| Select | For one run | For every later run | Back to the default |
| --- | --- | --- | --- |
| Account | `--account <ID>` or `HIPPIUS_ACCOUNT` | `hipc account use acct_0123456789abcdef0123` | `hipc account use self` |
| Project | `--project <ID>` or `HIPPIUS_PROJECT` | `hipc account projects use proj_0123456789abcdef0123` | `hipc account projects use default` |
| Billing account | `--billing <ID>` or `HIPPIUS_BILLING` | `hipc account billing-accounts use bill_9f8e7d6c5b4a39281706` | `hipc account billing-accounts use default` |

`hipc account list` shows the accounts. `hipc auth status` shows what a run acts in, and where the project and billing account selections came from (`flag`, `environment`, `profile`, or none).

Rules worth knowing before a write:

- A confirmation question names the account, project, and billing account the write goes to. Read it back to the user.
- Switching accounts with `hipc account use` clears the stored project and billing account.
- Selecting both a project and a billing account by flag or variable refuses every command except the personal ones.
- A command that can't act in the selection refuses a selection given by flag or variable, with `account_scope_unsupported`, `project_scope_unsupported`, or `billing_scope_unsupported` (exit 2). Drop that selector and run it again. A selection stored with `use` is left off quietly where it doesn't apply, and a write left without its stored billing account is paid by the Default one, which the question says. A stored project refuses a write it can't go with, except on the commands whose path names the project (its update, budget, quota, transfer, and archive), where it is left off.
- Personal commands act as the signed-in user whatever is selected: SSH keys, support tickets, project transfers, referral links, notification settings, and marketing consent.
