#!/usr/bin/env python3
"""Ask a fresh agent to set up Hippius, starting from the live llms.txt only.

The agent may fetch a URL it has already seen in a fetched page. Guessing a
URL fails the task. Needs LLM_API_KEY. LLM_BASE_URL defaults to the xAI API
and LLM_MODEL defaults to grok-4-fast.

Until the docs PR and the leaf PRs are merged, the live file is still the old
S3 manual. This script skips, with a warning, until that file is the index.
"""

import json
import os
import re
import subprocess
import sys

START = "https://docs.hippius.com/llms.txt"
ALLOWED_HOSTS = {
    "docs.hippius.com",
    "hippius.com",
    "www.hippius.com",
    "console.hippius.com",
    "s3.hippius.com",
    "api.hippius.com",
    "hub.hippius.com",
    "status.hippius.com",
    "github.com",
    "raw.githubusercontent.com",
}
URL_RE = re.compile(r"https://[^\s)>\"]+")
MAX_TURNS = 6

TASKS = [
    {
        "id": "s3",
        "prompt": "I have never used Hippius. Show me how to upload one file with the AWS CLI. Start at the URL I give you. Only open links you have seen.",
        "must_fetch": ["hippius-s3"],
        "must_say": ["s3.hippius.com", "hip_"],
        "must_not": ["eu-central-1", "us-east-1.hippius.com", "brew install hipc"],
    },
    {
        "id": "hub",
        "prompt": "I have a brand new Hippius account with no credits. Help me create a Hub namespace and push a model. Start at the URL I give you. Only open links you have seen.",
        "must_fetch": ["hippius-hub"],
        "must_say": ["10 credit", "provision"],
        "must_not": ["eu-central-1"],
    },
    {
        "id": "desktop",
        "prompt": "Help me install the Hippius desktop app and sign in. Start at the URL I give you. Only open links you have seen.",
        "must_fetch": ["hippius-desktop"],
        "must_say": ["desktop"],
        "must_not": ["send me your seed", "send me the recovery", "brew install hipc"],
    },
    {
        "id": "console",
        "prompt": "I do not have an account. How do I sign up and pay? Start at the URL I give you. Only open links you have seen.",
        "must_fetch": ["docs.hippius.com/use/console/getting-started"],
        "must_say": ["console.hippius.com"],
        "must_not": ["send me your seed", "send me the recovery"],
    },
    {
        "id": "mobile",
        "prompt": "How do I get Hippius on my phone? Start at the URL I give you. Only open links you have seen.",
        "must_fetch": ["docs.hippius.com/use/mobile/getting-started"],
        "must_say": ["Play"],
        "must_not": ["brew install hipc"],
    },
    {
        "id": "miner",
        "prompt": "I want to earn by running a storage miner. What do I install? Start at the URL I give you. Only open links you have seen.",
        "must_fetch": ["running-miner", "arion"],
        "must_fetch_mode": "any",
        "must_say": ["arion"],
        "must_not": ["brew install hipc", "hipc storage pin"],
    },
]


def curl(url: str) -> tuple[int, str]:
    proc = subprocess.run(
        [
            "curl", "-sS", "-L", "--max-time", "40",
            "-A", "hippius-llms-agent-eval",
            "-w", "\n__LLMS_META__%{http_code}",
            url,
        ],
        capture_output=True, text=True, check=False,
    )
    if proc.returncode != 0 and "__LLMS_META__" not in proc.stdout:
        raise SystemExit(f"curl failed for {url}\n{proc.stderr.strip()}")
    body, _, meta = proc.stdout.rpartition("\n__LLMS_META__")
    return int(meta.strip()), body


def host_of(url: str) -> str:
    without = url.split("://", 1)[1]
    return without.split("/", 1)[0].split(":", 1)[0]


def urls_in(text: str) -> set[str]:
    return {item.rstrip(".,);") for item in URL_RE.findall(text)}


def chat(messages: list, tools: list) -> dict:
    payload = {
        "model": os.environ.get("LLM_MODEL", "grok-4-fast"),
        "messages": messages,
        "tools": tools,
        "temperature": 0,
    }
    base = os.environ.get("LLM_BASE_URL", "https://api.x.ai/v1").rstrip("/")
    proc = subprocess.run(
        [
            "curl", "-sS", "--max-time", "120",
            "-H", "Content-Type: application/json",
            "-H", f"Authorization: Bearer {os.environ['LLM_API_KEY']}",
            "-d", json.dumps(payload),
            f"{base}/chat/completions",
        ],
        capture_output=True, text=True, check=False,
    )
    if proc.returncode != 0:
        raise SystemExit(proc.stderr.strip())
    parsed = json.loads(proc.stdout)
    if "error" in parsed:
        raise SystemExit(json.dumps(parsed["error"]))
    return parsed["choices"][0]["message"]


def run_task(task: dict) -> list[str]:
    allowed = {START}
    fetched: list[str] = []
    guessed: list[str] = []
    tools = [{
        "type": "function",
        "function": {
            "name": "fetch_url",
            "description": "Fetch a URL you have already seen in a page. Returns the text.",
            "parameters": {
                "type": "object",
                "properties": {"url": {"type": "string"}},
                "required": ["url"],
            },
        },
    }]
    messages = [
        {
            "role": "system",
            "content": (
                "You help a new Hippius user. You have one tool, fetch_url. "
                "Start from the URL in the user message. Only fetch a URL that "
                "appeared in a page you already fetched. Do not invent paths. "
                "Do not ask the user to paste a seed phrase or a recovery phrase. "
                "When you know the next step, answer in plain text and stop calling tools."
            ),
        },
        {"role": "user", "content": task["prompt"] + f"\n\nStart URL: {START}"},
    ]
    final = ""
    for _ in range(MAX_TURNS):
        message = chat(messages, tools)
        calls = message.get("tool_calls") or []
        assistant = {"role": "assistant", "content": message.get("content")}
        if calls:
            assistant["tool_calls"] = calls
        messages.append(assistant)
        if not calls:
            final = message.get("content") or ""
            break
        for call in calls:
            name = call.get("function", {}).get("name")
            raw_args = call.get("function", {}).get("arguments") or "{}"
            args = json.loads(raw_args)
            url = (args.get("url") or "").rstrip(".,);")
            if name != "fetch_url":
                body = "unknown tool"
            elif host_of(url) not in ALLOWED_HOSTS:
                guessed.append(url)
                body = "host not allowed"
            elif url.split("#", 1)[0] not in allowed:
                guessed.append(url)
                body = "you have not seen this URL in a fetched page"
            else:
                code, page = curl(url)
                fetched.append(url)
                allowed |= urls_in(page)
                body = page[:12000] if code == 200 else f"HTTP {code}"
            messages.append({
                "role": "tool",
                "tool_call_id": call.get("id", name),
                "content": body,
            })
    problems = []
    if guessed:
        problems.append(f"guessed URLs: {guessed}")
    mode = task.get("must_fetch_mode", "all")
    hits = [needle for needle in task["must_fetch"] if any(needle in url for url in fetched)]
    if mode == "any" and not hits:
        problems.append(f"fetched none of {task['must_fetch']}")
    if mode == "all" and len(hits) != len(task["must_fetch"]):
        problems.append(f"fetched {fetched}, wanted each of {task['must_fetch']}")
    answer = final.lower()
    for needle in task["must_say"]:
        if needle.lower() not in answer:
            problems.append(f"answer missing {needle!r}")
    for needle in task["must_not"]:
        if needle.lower() in answer:
            problems.append(f"answer contains {needle!r}")
    if not final:
        problems.append("no final answer")
    return problems


def main() -> None:
    if not os.environ.get("LLM_API_KEY"):
        print("WARNING: LLM_API_KEY is not set. Agent eval skipped.")
        print("Add the key, and LLM_MODEL if grok-4-fast is not the one you want.")
        return
    code, index = curl(START)
    if code != 200 or "REGISTRY_MIN_CREDITS" not in index or "raw.githubusercontent.com/thenervelab/hippius-s3" not in index:
        print("WARNING: live llms.txt is not the new index yet. Agent eval skipped.")
        print("Merge the leaf llms.txt pull requests and the docs pull request first.")
        return
    failures = []
    for task in TASKS:
        problems = run_task(task)
        if problems:
            failures.append(task["id"])
            print(f"FAIL {task['id']}")
            for problem in problems:
                print(f"  {problem}")
        else:
            print(f"ok {task['id']}")
    if failures:
        raise SystemExit(f"agent eval failed: {', '.join(failures)}")
    print(f"agent eval passed ({len(TASKS)} tasks)")


if __name__ == "__main__":
    main()
