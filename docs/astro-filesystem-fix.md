# Astro UnknownFilesystemError fix

## Why it happens

`UnknownFilesystemError` at `MutableDataStore.writeToDisk` occurs because Astro writes the content data store to a **fixed** temp file (`.astro/data-store.json.tmp`), then renames it to `data-store.json`. Vite's file watcher on `.astro/` can touch or remove that temp file between the write and the rename, so the rename fails with ENOENT and Astro throws.

See: [withastro/astro#15671](https://github.com/withastro/astro/issues/15671)

## What we did

We patched `node_modules/astro/dist/content/mutable-data-store.js` so that:

1. The temp file uses a **random suffix** (e.g. `data-store.json.a1b2c3d4e5f6.tmp`) so watchers don't interfere.
2. On error, the temp file is unlinked so it doesn't leak.

**This patch lives in `node_modules`.** It will be lost when you run `npm install` or when Astro is upgraded. If the error comes back, re-apply the same two edits in that file (add `import { randomBytes } from "node:crypto";` and use a random temp filename + catch/unlink in `#writeFileAtomic`).

## When to remove this

When an Astro release includes the fix (check the [issue](https://github.com/withastro/astro/issues/15671) or release notes), remove the patch and upgrade Astro as usual.
