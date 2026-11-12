#!/usr/bin/env python3
"""Keep the hipc agent pages equal to the CLI repository's agent docs.

The CLI repository's docs/agents.md and docs/agents/*.md are the source: tests there run
every command they show against the binary. Each site page is its source file with a front
matter (and, on the main page, an admonition) prepended, the H1 dropped, and its relative
links rewritten: a link to another agent page goes to that page on this site, and any other
link goes to the file in the repository.

    docs/agents.md            -> docs/cli/agents.md           (/cli/agents)
    docs/agents/<topic>.md    -> docs/cli/agents/<topic>.md   (/cli/agents/<topic>)

    python3 scripts/sync_hip_agents.py --write                 # regenerate the pages
    python3 scripts/sync_hip_agents.py --write --source DIR    # from a local CLI checkout
    python3 scripts/sync_hip_agents.py --check --mode lenient  # pull requests
    python3 scripts/sync_hip_agents.py --check --mode strict   # the Monday run

The pages are fetched from the CLI repository's main branch, unless --source names a local
checkout of it (to render docs that have not merged there yet). --check exits 1 when a page
differs from the regenerated one. When a source file is missing on main (a page added on
this site ahead of the CLI repository's merge), lenient mode prints a warning and exits 0;
strict mode fails.
"""

import json
import posixpath
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

SITE_DOCS = Path(__file__).resolve().parents[1] / "docs" / "cli"
REPO = "https://github.com/thenervelab/hippius-cli/blob/main"
RAW = "https://raw.githubusercontent.com/thenervelab/hippius-cli/main"

# Source path in the CLI repository -> (site page, slug, title, sidebar label, description).
PAGES = {
    "docs/agents.md": (
        "agents.md",
        "/cli/agents",
        "hipc for agents",
        "For agents",
        "The one page a coding agent reads before using hipc: how to find a command with "
        "--help and hipc schema, the dry-run and --yes loop, the JSON output and error "
        "contract, and the safety rules.",
    ),
    "docs/agents/accounts.md": (
        "agents/accounts.md",
        "/cli/agents/accounts",
        "Accounts, projects, and billing accounts",
        "Accounts and projects",
        "How hipc selects a shared account, a project, or a billing account for one run or "
        "every run, and what the *_scope_unsupported refusals mean.",
    ),
    "docs/agents/secrets.md": (
        "agents/secrets.md",
        "/cli/agents/secrets",
        "Secrets",
        "Secrets",
        "How hipc issues S3 and Hub keys and database credentials once, writes them to "
        "private files with --secret-file or --credentials-dir, and which secrets go in only "
        "from the user's own files.",
    ),
    "docs/agents/hub.md": (
        "agents/hub.md",
        "/cli/agents/hub",
        "Hub",
        "Hub",
        "How the hippius-hub registry commands map to hipc hub commands for the namespace, "
        "its plan, and its CI keys.",
    ),
    "docs/agents/api.md": (
        "agents/api.md",
        "/cli/agents/api",
        "hipc api",
        "hipc api",
        "What hipc api sends to the console API, what it asks for, what it never sends, and "
        "when to use it instead of a command.",
    ),
}

MAIN = "docs/agents.md"

NOTE = f"""
:::info Source
This page is [docs/agents.md]({REPO}/docs/agents.md) of the CLI repository, which tests hold to the binary, with its links rewritten for this site; `scripts/sync_hip_agents.py` regenerates it and the pages under it, and a check fails when they drift. When they differ, that file wins. The raw file, for pasting into a context, is {RAW}/docs/agents.md.
:::
"""

LINK_RE = re.compile(r"\]\(([^)\s]+)\)")


def fetch(url: str) -> tuple[int, str]:
    request = urllib.request.Request(url, headers={"User-Agent": "hippius-docs-sync"})
    try:
        with urllib.request.urlopen(request, timeout=30) as answer:
            return answer.status, answer.read().decode("utf-8")
    except urllib.error.HTTPError as error:
        return error.code, ""


def rewrite_link(source_path: str, target: str) -> str:
    """Point one relative link of a source file at this site or at the repository."""
    if re.match(r"^[a-z][a-z0-9+.-]*:", target) or target.startswith(("/", "#")):
        return target
    path, hash_mark, anchor = target.partition("#")
    resolved = posixpath.normpath(posixpath.join(posixpath.dirname(source_path), path))
    fragment = hash_mark + anchor
    if resolved in PAGES:
        return PAGES[resolved][1] + fragment
    return f"{REPO}/{resolved}{fragment}"


def render(source_path: str, source: str) -> str:
    _, slug, title, label, description = PAGES[source_path]
    page_id = slug.rsplit("/", 1)[1]
    body = re.sub(r"\A# [^\n]*\n\n", "", source, count=1)
    body = LINK_RE.sub(lambda m: f"]({rewrite_link(source_path, m.group(1))})", body)
    head = (
        "---\n"
        f"id: {page_id}\n"
        f"title: {title}\n"
        f"sidebar_label: {label}\n"
        f"slug: {slug}\n"
        f"description: {json.dumps(description)}\n"
        "---\n"
    )
    if source_path == MAIN:
        head += NOTE
    return head + "\n" + body


def read_sources(source_dir: Path | None) -> tuple[dict[str, str], list[str]]:
    found, missing = {}, []
    for source_path in PAGES:
        if source_dir is not None:
            local = source_dir / source_path
            if local.is_file():
                found[source_path] = local.read_text()
            else:
                missing.append(str(local))
            continue
        code, text = fetch(f"{RAW}/{source_path}")
        if code == 200:
            found[source_path] = text
        else:
            missing.append(f"{code} {RAW}/{source_path}")
    return found, missing


def main() -> None:
    args = sys.argv[1:]
    mode = "lenient"
    source_dir = None
    if "--mode" in args:
        at = args.index("--mode")
        mode = args[at + 1] if at + 1 < len(args) else ""
        del args[at : at + 2]
    if "--source" in args:
        at = args.index("--source")
        source_dir = Path(args[at + 1]) if at + 1 < len(args) else None
        del args[at : at + 2]
    if args not in (["--write"], ["--check"]) or mode not in ("lenient", "strict"):
        raise SystemExit(
            "usage: sync_hip_agents.py (--write | --check) [--mode lenient|strict] [--source DIR]"
        )

    sources, missing = read_sources(source_dir)
    if missing:
        if args == ["--check"] and mode == "lenient" and source_dir is None:
            for item in missing:
                print(f"WARNING {item} (not on the CLI repository's main branch yet)")
            return
        raise SystemExit("FAIL " + "; ".join(missing))

    if args == ["--write"]:
        for source_path, text in sources.items():
            page = SITE_DOCS / PAGES[source_path][0]
            page.parent.mkdir(parents=True, exist_ok=True)
            page.write_text(render(source_path, text))
            print(f"wrote {page}")
        return

    stale = [
        PAGES[source_path][0]
        for source_path, text in sources.items()
        if not (SITE_DOCS / PAGES[source_path][0]).is_file()
        or (SITE_DOCS / PAGES[source_path][0]).read_text() != render(source_path, text)
    ]
    if stale:
        raise SystemExit(
            f"FAIL docs/cli/{', docs/cli/'.join(stale)} differ from the CLI repository's agent "
            "docs: run `python3 scripts/sync_hip_agents.py --write`"
        )
    print("agent pages in sync")


if __name__ == "__main__":
    main()
