export interface TocEntry {
  id: string;
  text: string;
  children?: TocEntry[];
}

export const toc: TocEntry[] = [
  { id: 'sec-1', text: '1. Introduction' },
  {
    id: 'sec-2', text: '2. Ontology', children: [
      { id: 'sec-2-1', text: '2.1 Field' },
      { id: 'sec-2-2', text: '2.2 Field type' },
      { id: 'sec-2-3', text: '2.3 Schema' },
      { id: 'sec-2-4', text: '2.4 Entry' },
      { id: 'sec-2-5', text: '2.5 Database' },
      {
        id: 'sec-2-6', text: '2.6 Scope', children: [
          { id: 'sec-2-6-1', text: '2.6.1 Single database with scopes' },
          { id: 'sec-2-6-2', text: '2.6.2 Scope exposure and scope selector fields' },
          {
            id: 'sec-2-6-3', text: '2.6.3 Scope hierarchies and inheritance', children: [
              {
                id: 'sec-2-6-3-1', text: '2.6.3.1 Examples of possible scope hierarchies:', children: [
                  { id: 'sec-2-6-3-1-1', text: '2.6.3.1.1 Project Scope Hierarchy' },
                  { id: 'sec-2-6-3-1-2', text: '2.6.3.1.2 Type Scope Hierarchy' },
                  { id: 'sec-2-6-3-1-3', text: '2.6.3.1.3 Responsibility Scope Hierarchy' },
                ]
              },
            ]
          },
          { id: 'sec-2-6-4', text: '2.6.4 Per-scope parameterization' },
          {
            id: 'sec-2-6-5', text: '2.6.5 Scoped scope-hierarchies', children: [
              {
                id: 'sec-2-6-5-1', text: '2.6.5.1 Examples of possible scoped scope hierarchies:', children: [
                  { id: 'sec-2-6-5-1-1', text: '2.6.5.1.1 Status Scope Hierarchy' },
                ]
              },
            ]
          },
          { id: 'sec-2-6-6', text: '2.6.6 Entry-local scope' },
        ]
      },
    ]
  },
  {
    id: 'sec-3', text: '3. ClickUp', children: [
      {
        id: 'sec-3-1', text: '3.1 Fields', children: [
          {
            id: 'sec-3-1-1', text: '3.1.1 Base scope fields', children: [
              { id: 'sec-3-1-1-1', text: '3.1.1.1 Base Scope Table' },
              { id: 'sec-3-1-1-2', text: '3.1.1.2 ClickUp\'s inadequacy' },
            ]
          },
          { id: 'sec-3-1-2', text: '3.1.2 Custom Fields' },
        ]
      },
      {
        id: 'sec-3-2', text: '3.2 Field Types', children: [
          {
            id: 'sec-3-2-1', text: '3.2.1 Field-type families', children: [
              { id: 'sec-3-2-1-1', text: '3.2.1.1 System-only field types' },
              { id: 'sec-3-2-1-2', text: '3.2.1.2 Parameterized field types' },
              { id: 'sec-3-2-1-3', text: '3.2.1.3 Computational field types' },
              { id: 'sec-3-2-1-4', text: '3.2.1.4 AI field types' },
              { id: 'sec-3-2-1-5', text: '3.2.1.5 Scope-selecting field types' },
            ]
          },
          { id: 'sec-3-2-2', text: '3.2.2 Field Types Table' },
        ]
      },
      {
        id: 'sec-3-3', text: '3.3 Scope', children: [
          { id: 'sec-3-3-1', text: '3.3.1 Location Scope Hierarchy' },
          { id: 'sec-3-3-2', text: '3.3.2 Task Type Scope Hierarchy' },
        ]
      },
    ]
  },
  {
    id: 'sec-4', text: '4. Workspace', children: [
      {
        id: 'sec-4-1', text: '4.1 System fields parameters', children: [
          {
            id: 'sec-4-1-1', text: '4.1.1 Task Types', children: [
              { id: 'sec-4-1-1-1', text: '4.1.1.1 Task' },
              { id: 'sec-4-1-1-2', text: '4.1.1.2 Event' },
              { id: 'sec-4-1-1-3', text: '4.1.1.3 Record' },
            ]
          },
          {
            id: 'sec-4-1-2', text: '4.1.2 Status groups', children: [
              { id: 'sec-4-1-2-1', text: '4.1.2.1 Status transitions and triggers' },
              {
                id: 'sec-4-1-2-2', text: '4.1.2.2 Task', children: [
                  { id: 'sec-4-1-2-2-1', text: '4.1.2.2.1 Task Transitions' },
                ]
              },
              {
                id: 'sec-4-1-2-3', text: '4.1.2.3 Event', children: [
                  { id: 'sec-4-1-2-3-1', text: '4.1.2.3.1 Event Transitions' },
                ]
              },
              {
                id: 'sec-4-1-2-4', text: '4.1.2.4 Shopping', children: [
                  { id: 'sec-4-1-2-4-1', text: '4.1.2.4.1 Shopping Transitions' },
                ]
              },
              { id: 'sec-4-1-2-5', text: '4.1.2.5 Statusless' },
            ]
          },
        ]
      },
    ]
  },
];
