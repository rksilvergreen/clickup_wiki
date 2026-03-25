import type { DocumentConfig } from "doc-shell/types";
import { wikiToc } from "./documents/wiki/wiki-toc";
import { changelogToc } from "./documents/changelog/changelog-toc";

export const documents: DocumentConfig[] = [
  {
    slug: "wiki",
    title: "Wiki",
    description:
      "The complete ClickUp reference: ontology, fields, field types, scopes, task types, workflows, and more.",
    toc: wikiToc,
  },
  {
    slug: "changelog",
    title: "Changelog",
    description: "Release notes and updates.",
    toc: changelogToc,
  },
];

