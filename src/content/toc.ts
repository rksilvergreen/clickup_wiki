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
      { id: 'sec-2-2', text: '2.2 Field Type' },
      { id: 'sec-2-3', text: '2.3 Schema' },
      { id: 'sec-2-4', text: '2.4 Entry' },
      { id: 'sec-2-5', text: '2.5 Database' },
      {
        id: 'sec-2-6', text: '2.6 Scope', children: [
          { id: 'sec-2-6-1', text: '2.6.1 Single Database with Scopes' },
          { id: 'sec-2-6-2', text: '2.6.2 Scope Exposure and Scope Selector Fields' },
          {
            id: 'sec-2-6-3', text: '2.6.3 Scope Hierarchies and Inheritance', children: [
              {
                id: 'sec-2-6-3-1', text: '2.6.3.1 Examples of Possible Scope Hierarchies:', children: [
                  { id: 'sec-2-6-3-1-1', text: '2.6.3.1.1 Project Scope Hierarchy' },
                  { id: 'sec-2-6-3-1-2', text: '2.6.3.1.2 Type Scope Hierarchy' },
                  { id: 'sec-2-6-3-1-3', text: '2.6.3.1.3 Responsibility Scope Hierarchy' },
                ]
              },
            ]
          },
          { id: 'sec-2-6-4', text: '2.6.4 Per-Scope Parameterization' },
          {
            id: 'sec-2-6-5', text: '2.6.5 Scoped Scope-Hierarchies', children: [
              {
                id: 'sec-2-6-5-1', text: '2.6.5.1 Examples of Possible Scoped Scope Hierarchies:', children: [
                  { id: 'sec-2-6-5-1-1', text: '2.6.5.1.1 Status Scope Hierarchy' },
                ]
              },
            ]
          },
          { id: 'sec-2-6-6', text: '2.6.6 Entry-Local Scope' },
        ]
      },
    ]
  },
  {
    id: 'sec-3', text: '3. ClickUp', children: [
      {
        id: 'sec-3-1', text: '3.1 Fields', children: [
          {
            id: 'sec-3-1-1', text: '3.1.1 Base Scope Fields', children: [
              { id: 'sec-3-1-1-1', text: '3.1.1.1 Base Scope Table' },
              { id: 'sec-3-1-1-2', text: '3.1.1.2 ClickUp\'s Inadequacy' },
            ]
          },
          { id: 'sec-3-1-2', text: '3.1.2 Custom Fields' },
        ]
      },
      {
        id: 'sec-3-2', text: '3.2 Field Types', children: [
          {
            id: 'sec-3-2-1', text: '3.2.1 Field-Type Families', children: [
              { id: 'sec-3-2-1-1', text: '3.2.1.1 System-Only Field Types' },
              { id: 'sec-3-2-1-2', text: '3.2.1.2 Parameterized Field Types' },
              { id: 'sec-3-2-1-3', text: '3.2.1.3 Computational Field Types' },
              { id: 'sec-3-2-1-4', text: '3.2.1.4 AI Field Types' },
              { id: 'sec-3-2-1-5', text: '3.2.1.5 Scope-Selecting Field Types' },
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
        id: 'sec-4-1', text: '4.1 System Fields Parameters', children: [
          {
            id: 'sec-4-1-1', text: '4.1.1 Task Types', children: [
              {
                id: 'sec-4-1-1-1', text: '4.1.1.1 Task', children: [
                  { id: 'sec-4-1-1-1-1', text: '4.1.1.1.1 Task Fields' },
                  { id: 'sec-4-1-1-1-2', text: '4.1.1.1.2 Task Constraints' },
                  { id: 'sec-4-1-1-1-3', text: '4.1.1.1.3 Task Operational Rules' },
                ]
              },
              {
                id: 'sec-4-1-1-2', text: '4.1.1.2 Event', children: [
                  { id: 'sec-4-1-1-2-1', text: '4.1.1.2.1 Event Fields' },
                  { id: 'sec-4-1-1-2-2', text: '4.1.1.2.2 Event Constraints' },
                  { id: 'sec-4-1-1-2-3', text: '4.1.1.2.3 Event Operational Rules' },
                ]
              },
              {
                id: 'sec-4-1-1-3', text: '4.1.1.3 Record', children: [
                  { id: 'sec-4-1-1-3-1', text: '4.1.1.3.1 Record Fields' },
                  { id: 'sec-4-1-1-3-2', text: '4.1.1.3.2 Record Operational Rules' },
                ]
              },
            ]
          },
          {
            id: 'sec-4-1-2', text: '4.1.2 Status Groups', children: [
              { id: 'sec-4-1-2-1', text: '4.1.2.1 Status Transitions and Triggers' },
              {
                id: 'sec-4-1-2-2', text: '4.1.2.2 Task Status Group', children: [
                  { id: 'sec-4-1-2-2-1', text: '4.1.2.2.1 Task Transitions' },
                ]
              },
              {
                id: 'sec-4-1-2-3', text: '4.1.2.3 Event Status Group', children: [
                  { id: 'sec-4-1-2-3-1', text: '4.1.2.3.1 Event Transitions' },
                ]
              },
              {
                id: 'sec-4-1-2-4', text: '4.1.2.4 Shopping Status Group', children: [
                  { id: 'sec-4-1-2-4-1', text: '4.1.2.4.1 Shopping Transitions' },
                ]
              },
              { id: 'sec-4-1-2-5', text: '4.1.2.5 Statusless Status Group' },
            ]
          },
        ]
      },
      { id: 'sec-4-2', text: '4.2 Custom Fields' },
    ]
  },
];
