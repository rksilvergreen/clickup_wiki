"""
Permanent release script invoked by the @git-release command.

Usage:
    python .cursor/commands/git_release.py <version> <changelog_bullets>

- version: the release version string (e.g. "0.0.1" or "v0.0.1")
- changelog_bullets: pre-composed bullet-point content for the changelog section
"""

import json
import re
import sys
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent / "shared"))
from git_custom_commands import git_merge_to_main  # noqa: E402


def _normalize_version(version: str) -> str:
    return version.lstrip("v")


def _version_display(version: str) -> str:
    return f"v{_normalize_version(version)}"


def prepare_release(repo_root: Path, version: str, changelog_bullets: str) -> None:
    ver = _normalize_version(version)

    pkg_path = repo_root / "package.json"
    data = json.loads(pkg_path.read_text(encoding="utf-8"))
    data["version"] = ver
    pkg_path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")

    now = datetime.now().strftime("%d-%m-%y %H:%M")
    display = _version_display(ver)
    section_id = display.replace(".", "-")
    title = f"{display} ({now})"

    changelog_path = repo_root / "src" / "content" / "documents" / "changelog.mdx"
    content = changelog_path.read_text(encoding="utf-8")
    m = re.match(r"(^---\n.*?\n---\n)(.*)", content, re.DOTALL)
    if not m:
        raise RuntimeError("changelog.mdx: frontmatter not found")
    frontmatter, rest = m.group(1), m.group(2)

    section = (
        f'<Section id="{section_id}" title="{title}">\n'
        f"{changelog_bullets}\n"
        f"</Section>\n\n"
    )
    changelog_path.write_text(
        frontmatter + section + rest.lstrip("\n"), encoding="utf-8"
    )


def main() -> None:
    if len(sys.argv) < 3:
        print("Usage: python git_release.py <version> <changelog_bullets>", file=sys.stderr)
        sys.exit(1)

    version = _normalize_version(sys.argv[1])
    changelog_bullets = sys.argv[2]
    repo_root = Path(__file__).resolve().parent.parent.parent

    result = git_merge_to_main(
        repo_root,
        version=version,
        prepare_release=lambda root, ver: prepare_release(root, ver, changelog_bullets),
        release_commit_message=f"chore: Bump version to {version}",
    )

    print("SUCCESS")
    print(f"  tag: {result.tag}")
    print(f"  merge: {result.merge_commit_hash}")
    print(f"  release commit: {result.release_commit_hash}")
    print(f"  pushed: {result.pushed}")
    print(f"  remote: {result.remote_url}")
    for w in result.warnings:
        print(f"  warning: {w}")


if __name__ == "__main__":
    main()
