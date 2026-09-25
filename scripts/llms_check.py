#!/usr/bin/env python3
"""Check the Hippius agent index and the pages it sends agents to.

lenient (pull requests): docs.hippius.com links must answer. A leaf llms.txt
that is not on the default branch yet is a warning. The leaf pull requests
have to merge before strict mode can pass.

strict (Monday cron, and a manual run): every link answers, and each leaf
file still contains the facts an agent has to get right.
"""

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "static" / "llms.txt"

URL_RE = re.compile(r"https://[^\s)>\]]+")

ROOT_FACTS = (
    "https://s3.hippius.com",
    "hip_",
    "REGISTRY_MIN_CREDITS",
    "10 credits",
    "https://docs.hippius.com/cli/usage",
    "https://docs.hippius.com/use/console/getting-started",
    "https://docs.hippius.com/use/mobile/getting-started",
    "https://raw.githubusercontent.com/thenervelab/hippius-s3/staging/llms.txt",
    "https://raw.githubusercontent.com/thenervelab/hippius-hub/main/llms.txt",
    "https://raw.githubusercontent.com/thenervelab/hippius-desktop/main/llms.txt",
    "https://raw.githubusercontent.com/thenervelab/hippius-mem/main/llms.txt",
    "https://raw.githubusercontent.com/thenervelab/arion/main/llms.txt",
    "https://raw.githubusercontent.com/thenervelab/hippius-drive-sdk/main/llms.txt",
)

ROOT_FORBIDDEN = ("eu-central-1", "us-east-1.hippius.com")

# Facts that must stay in the leaf file once it is on the default branch.
LEAF_FACTS = {
    "hippius-s3": (["https://s3.hippius.com", "decentralized", "hip_"], ["eu-central-1", "us-east-1.hippius.com"]),
    "hippius-hub": (["REGISTRY_MIN_CREDITS", "10"], []),
    "hippius-desktop": (["desktop-app", "unlock password"], []),
    "hippius-mem": (["FOR-AGENTS.md"], []),
    "hippius-cli": (["Do not install", "deprecated"], []),
    "hippius-storage-miner": (["Arion", "Do not"], []),
    "arion": (["running-miner"], []),
    "hippius-drive-sdk": (["recovery", "ciphertext"], []),
    "hippius-sdk": (["Do not", "s3.hippius.com"], []),
    "hippius-rust-sdk": (["Do not"], []),
    "hippius-sync-engine": (["Do not"], []),
    "hippius-validator": (["installing-validator"], []),
    "hippius-cvm": (["coming soon"], []),
    "homebrew-tap": (["Do not"], []),
}


def curl(url: str) -> tuple[int, str, str]:
    proc = subprocess.run(
        [
            "curl",
            "-sS",
            "-L",
            "--max-time",
            "30",
            "-A",
            "hippius-llms-check",
            "-w",
            "\n__LLMS_META__%{http_code} %{content_type}",
            url,
        ],
        capture_output=True,
        text=True,
        check=False,
    )
    if proc.returncode != 0 and "__LLMS_META__" not in proc.stdout:
        raise SystemExit(f"curl failed for {url}\n{proc.stderr.strip()}")
    body, _, meta = proc.stdout.rpartition("\n__LLMS_META__")
    code_str, _, content_type = meta.strip().partition(" ")
    return int(code_str), content_type, body


def urls_in(text: str) -> list[str]:
    found = []
    seen = set()
    for raw in URL_RE.findall(text):
        url = raw.rstrip(".,);")
        if url not in seen:
            seen.add(url)
            found.append(url)
    return found


def host_of(url: str) -> str:
    return url.split("://", 1)[1].split("/", 1)[0].split(":", 1)[0]


def repo_of(url: str) -> str | None:
    marker = "https://raw.githubusercontent.com/thenervelab/"
    if not url.startswith(marker) or not url.endswith("/llms.txt"):
        return None
    rest = url[len(marker):]
    return rest.split("/", 1)[0]


def main() -> None:
    mode = "lenient"
    if len(sys.argv) == 3 and sys.argv[1] == "--mode" and sys.argv[2] in ("lenient", "strict"):
        mode = sys.argv[2]
    elif len(sys.argv) != 1:
        raise SystemExit("usage: llms_check.py [--mode lenient|strict]")

    text = ROOT.read_text()
    failures = []
    warnings = []

    for fact in ROOT_FACTS:
        if fact not in text:
            failures.append(f"root llms.txt is missing {fact!r}")
    for banned in ROOT_FORBIDDEN:
        if banned in text:
            failures.append(f"root llms.txt advertises {banned}")

    for url in urls_in(text):
        code, content_type, body = curl(url)
        repo = repo_of(url)
        leaf = repo is not None
        # Anonymous GET of the S3 API root is refused. 403 means the host answered.
        if code == 403 and host_of(url) == "s3.hippius.com":
            print(f"ok 403 {url}")
            continue
        if code != 200:
            message = f"{code} {url}"
            if leaf and mode == "lenient":
                warnings.append(message + " (leaf not merged yet)")
            else:
                failures.append(message)
            continue
        if leaf and "text/html" in content_type:
            failures.append(f"leaf is HTML, not markdown: {url}")
            continue
        if repo in LEAF_FACTS:
            need, forbid = LEAF_FACTS[repo]
            missing = [item for item in need if item not in body]
            present = [item for item in forbid if item in body]
            if missing or present:
                detail = f"{repo}: missing {missing} forbidden {present}"
                if mode == "lenient":
                    warnings.append(detail + " (leaf PR not updated yet)")
                else:
                    failures.append(detail)
        print(f"ok {code} {url}")

    for warning in warnings:
        print(f"WARNING {warning}")
    if failures:
        for failure in failures:
            print(f"FAIL {failure}")
        raise SystemExit(1)
    print(f"llms check passed ({mode}), {len(warnings)} warning(s)")


if __name__ == "__main__":
    main()
