import type { DocumentConfig } from 'doc-shell/types';

export const siteTitle = 'ClickUp Wiki';

export const documents: DocumentConfig[] = [
  {
    slug: 'wiki',
    title: 'Wiki',
    description: 'The complete ClickUp reference: ontology, fields, field types, scopes, task types, workflows, and more.',
  },
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
