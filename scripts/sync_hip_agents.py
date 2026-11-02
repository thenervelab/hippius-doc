#!/usr/bin/env python3
"""Keep docs/cli/agents.md equal to docs/agents.md of the hip repository.

The hip repository's docs/agents.md is the source: tests there run every command it shows
against the binary. This page is that file with five links rewritten for the site (TENETS,
the command reference, the user journeys) and a front matter plus an admonition prepended.

    python3 scripts/sync_hip_agents.py --write                # regenerate the page
    python3 scripts/sync_hip_agents.py --check --mode lenient  # pull requests
    python3 scripts/sync_hip_agents.py --check --mode strict   # the Monday run

--check exits 1 when the page differs from the regenerated one. While the hip repository's
content has not landed (the latest release's install.sh answers 404), lenient mode prints a
warning and exits 0, because the source cannot be fetched yet; strict mode fails. That
leniency expires by itself with the first public release.
"""

import sys
import urllib.error
import urllib.request
from pathlib import Path

PAGE = Path(__file__).resolve().parents[1] / "docs" / "cli" / "agents.md"
REPO = "https://github.com/thenervelab/hippius-cli/blob/main"
RAW = "https://raw.githubusercontent.com/thenervelab/hippius-cli/main/docs/agents.md"
INSTALL_URL = "https://github.com/thenervelab/hippius-cli/releases/latest/download/install.sh"

HEAD = f"""---
id: agents
title: hip for agents
sidebar_label: For agents
slug: /cli/agents
description: The hip playbook for coding agents, written to be pasted into an agent's context. Discovery with hip schema, the JSON output and error contract, exit codes, confirmations and guards, dry runs, pagination, selectors, secrets, idempotency, a worked loop, and when to use hip api.
---

:::info Source
This page is [docs/agents.md]({REPO}/docs/agents.md) of the hip repository, which tests hold to the binary, with its relative links rewritten to point at this site and at the repository; `scripts/sync_hip_agents.py` regenerates it and a check fails when the two drift. When they differ, that file wins. The raw file, for pasting into a context, is {RAW}.
:::

"""


def fetch(url: str) -> tuple[int, str]:
    request = urllib.request.Request(url, headers={"User-Agent": "hippius-docs-sync"})
    try:
        with urllib.request.urlopen(request, timeout=30) as answer:
            return answer.status, answer.read().decode("utf-8")
    except urllib.error.HTTPError as error:
        return error.code, ""


def render(source: str) -> str:
    body = source.replace("# hip for agents\n\n", "", 1)
    body = body.replace("(../TENETS.md#", f"({REPO}/TENETS.md#")
    body = body.replace("(../TENETS.md)", f"({REPO}/TENETS.md)")
    body = body.replace("[commands.md](commands.md)", "[Command reference](/cli/commands)")
    body = body.replace("(user-journeys.md)", f"({REPO}/docs/user-journeys.md)")
    return HEAD + body


def main() -> None:
    args = sys.argv[1:]
    mode = "lenient"
    if "--mode" in args:
        at = args.index("--mode")
        mode = args[at + 1]
        del args[at : at + 2]
    if args not in (["--write"], ["--check"]) or mode not in ("lenient", "strict"):
        raise SystemExit("usage: sync_hip_agents.py (--write | --check) [--mode lenient|strict]")

    code, source = fetch(RAW)
    if code != 200:
        pending = mode == "lenient" and fetch(INSTALL_URL)[0] == 404
        message = f"{code} {RAW}"
        if pending:
            print(f"WARNING {message} (hip content lands with the public flip)")
            return
        raise SystemExit(f"FAIL {message}")

    page = render(source)
    if args == ["--write"]:
        PAGE.write_text(page)
        print(f"wrote {PAGE}")
        return
    if PAGE.read_text() != page:
        raise SystemExit(
            "FAIL docs/cli/agents.md differs from the hip repository's docs/agents.md: "
            "run `python3 scripts/sync_hip_agents.py --write`"
        )
    print("agents page in sync")


if __name__ == "__main__":
    main()
