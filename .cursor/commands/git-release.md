# Release to main (`@git-release`)

Use this command to release the current branch by merging it into main with a version bump, changelog entry, tag, and push.

## How it works

This command uses a permanent Python script at **`.cursor/commands/git_release.py`** which handles the `package.json` bump, changelog insertion, and invocation of `git_merge_to_main`. The agent is responsible for preparing the inputs and invoking the script.

## Arguments

The user must provide the **`version`** to release. Do not invent a version yourself. If the user did not supply the version when invoking the command, ask for it immediately before doing anything else.

## Workflow

Execute the following steps in order:

### 1. Commit uncommitted changes

If the working tree has uncommitted changes, invoke **`@git-commit-and-push`** first (auto-composing the commit message as that command normally does). The release script must start with a clean working tree.

### 2. Compose changelog content

The changelog documents changes to the wiki's content. The wiki document (`src/content/documents/wiki.mdx`) is a thin shell that imports all of its actual content from partial files in `src/content/_wiki/`. You must diff **both** paths to capture the full picture:

```
git diff {last-tag-or-main}..HEAD -- src/content/documents/wiki.mdx src/content/_wiki/
```

Use the last version tag as the base, or `main` if no version tag exists yet.

- If there are wiki content changes, compose concise bullet points summarizing each meaningful change (one bullet per logical change, squash trivial or related changes where appropriate).
- If no changes were made to any of these files in this release, use: `- Internal improvements to site infrastructure and tooling (no wiki content changes).`

### 3. Invoke the release script

Run:

```
python .cursor/commands/git_release.py <version> <changelog_bullets>
```

- **`version`** — the version provided by the user.
- **`changelog_bullets`** — the bullet-point text composed in step 2 (as a single string argument).

The script handles:
- Normalizing the version (stripping a leading `v` if present) and ensuring the changelog section title always displays with a `v` prefix (e.g., `v1.3.1 (08-06-26 14:30)`).
- Updating `package.json` with the release version.
- Prepending a new `<Section>` to `src/content/documents/changelog.mdx` (immediately after frontmatter, before any existing sections).
- Calling `git_merge_to_main` with the appropriate arguments.

All `git_merge_to_main` arguments follow the defaults described in **`@git-merge-to-main`** unless the user explicitly specifies otherwise.
