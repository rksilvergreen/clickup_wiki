# ClickUp Wiki

An Astro-based single-page documentation wiki. Content is authored in Markdown/HTML files; the **theme layer** (`src/theme/`) provides layout, TOC, tooltips, sticky headers, and navigation — and is designed to eventually be extracted into a reusable npm package.

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:4321` in a browser. Changes to content, styles, or components are reflected instantly via HMR.

## Commands

| Command           | Description                          |
|-------------------|--------------------------------------|
| `npm run dev`     | Start dev server with HMR            |
| `npm run build`   | Build static site to `dist/`         |
| `npm run preview` | Serve the built output locally       |

## Project layout

| Path | Purpose |
|------|---------|
| `wiki.config.ts` | Document title, feature flags |
| `src/content/documents/` | Content files (`.md` or `.mdx`) — one per top-level document section |
| `src/content/toc.ts` | Table of contents data structure |
| `src/content/config.ts` | Astro content collection schema |
| `src/pages/index.astro` | Page that assembles all sections |
| `src/theme/layouts/` | Page layout (WikiLayout) |
| `src/theme/components/` | TOC, NavControls, StickyToggle |
| `src/theme/scripts/` | Interactive features (tooltips, sticky headers, navigation) |
| `src/theme/styles/` | CSS styles |

## Content format

Content files live in `src/content/documents/` and use frontmatter:

```md
---
title: "Section Title"
order: 1
---

<h1 id="sec-1">1. Section Title</h1>
<p>Content here...</p>
```

- Use `.md` for sections with HTML content (current approach).
- Use `.mdx` for sections that need to import Astro/React/Svelte components.
- Headings use explicit `id` attributes (e.g. `id="sec-2-1"`).
- Tables are wrapped in `<div class="doc-table-wrap">`.
- Tree diagrams are wrapped in `<div class="doc-tree">`.
- When adding or reordering sections, update `src/content/toc.ts` accordingly.

## Architecture

The project has two layers:

- **Theme layer** (`src/theme/`): Layout, components, scripts, and styles. Knows nothing about specific content. Future npm package.
- **Content layer** (`src/content/`, `src/pages/`, `wiki.config.ts`): Content files, TOC data, page assembly, and configuration. Specific to this wiki.
