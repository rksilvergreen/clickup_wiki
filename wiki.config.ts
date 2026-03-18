import type { DocumentConfig } from 'doc-shell/types';

export const siteTitle = 'ClickUp Wiki';

export const documents: DocumentConfig[] = [
  { slug: 'introduction', title: 'Introduction', description: 'Getting started with the ClickUp documentation portal.' },
  { slug: 'ontology', title: 'Ontology', description: 'Fields, field types, schemas, entries, databases, and scopes.' },
  { slug: 'clickup', title: 'ClickUp', description: 'ClickUp-specific fields, field types, and scope hierarchies.' },
  { slug: 'workspace', title: 'Workspace', description: 'Task types, project scope, workflows, templates, and automations.' },
];

export default {
  title: siteTitle,
  documents,
  features: {
    stickyHeaders: true,
    sectionTooltips: true,
    rowTooltips: true,
  },
};
