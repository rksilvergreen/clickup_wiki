# ClickUp Wiki — Document project

Edit **Markdown** in `content/`; the build merges all content into **one** HTML document in `dist/index.html` with hierarchical numbering (1., 1.1, 2.3.1, etc.).

## Quick start

```bash
npm install
npm run build
```

Open `dist/index.html` in a browser. The entire document is a single page.

## Workflow

1. **Edit the document** — Change any `.md` file in `content/` (see order below).
2. **Rebuild** — Run `npm run build` to regenerate `dist/index.html`.
3. **Watch (optional)** — Run `npm run watch` so the HTML updates whenever you save a file in `content/`.

## Document order and structure

The build uses a **fixed order** of files and produces one webpage:

| Order | File | Becomes |
|-------|------|--------|
| 1 | `Introduction.md` | 1. Introduction |
| 2 | `Ontology.md` | 2. Ontology (2.1, 2.2, …) |
| 3 | `ClickUp.md` | 3. ClickUp (3.1, 3.2, …) |
| 4 | `Workspace.md` | 4. Workspace (4.1 System fields parameters, 4.1.1 Status groups, …) |

To add or reorder sections, edit `CONTENT_ORDER` in `scripts/build.js`.

## Project layout

| Path | Purpose |
|------|--------|
| `content/` | Source `.md` files (single source of truth) |
| `templates/` | `base.html` (document layout) |
| `assets/css/document.css` | Base styles for the document |
| `scripts/build.js` | Merges ordered `.md` → one HTML, adds numbering |
| `dist/index.html` | Generated single-page document |

## Conventions (automatic styling)

- **First paragraph** after 1. Introduction gets the lead/intro style.
- **Numbering** — All headings get hierarchical numbers (1., 1.1, 2.6.3.1, etc.) from the build.
- **Trigger types** — `**Manual**`, `**Internal Conditional**`, etc. in list items are rendered as pills.
- **Subgroups** — `(Not started)`, `(Active)`, `(Done)`, `(Closed)` in list items are styled as subgroup labels.

## Scripts

- `npm run build` — Merge `content/*.md` (in order) → `dist/index.html`.
- `npm run watch` — Build once, then rebuild when any file in `content/` changes.
