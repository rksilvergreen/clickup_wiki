export interface StatusDef {
  name: string;
  slug: string;
  color: string;
  subgroup: string;
}

export interface StatusGroup {
  type: string;
  statuses: StatusDef[];
}

export const statusGroups: StatusGroup[] = [
  {
    type: "task",
    statuses: [
      { name: "Backlog", slug: "backlog", color: "#656f7d", subgroup: "Not started" },
      { name: "To Do", slug: "to-do", color: "#fff187", subgroup: "Not started" },
      { name: "In Progress", slug: "in-progress", color: "#7a6ae6", subgroup: "Active" },
      { name: "Canceled", slug: "canceled", color: "#dc8084", subgroup: "Done" },
      { name: "Complete", slug: "complete", color: "#30a46c", subgroup: "Closed" },
    ],
  },
  {
    type: "event",
    statuses: [
      { name: "Not Scheduled", slug: "not-scheduled", color: "#656f7d", subgroup: "Not started" },
      { name: "Upcoming", slug: "upcoming", color: "#fff187", subgroup: "Not started" },
      { name: "Occurring", slug: "occurring", color: "#7a6ae6", subgroup: "Active" },
      { name: "Occurred", slug: "occurred", color: "#30a46c", subgroup: "Closed" },
    ],
  },
  {
    type: "shopping",
    statuses: [
      { name: "Idea", slug: "idea", color: "#656f7d", subgroup: "Not started" },
      { name: "To Buy", slug: "to-buy", color: "#fff187", subgroup: "Not started" },
      { name: "In Cart", slug: "in-cart", color: "#f76808", subgroup: "Active" },
      { name: "Ordered", slug: "ordered", color: "#7a6ae6", subgroup: "Active" },
      { name: "Cancelled", slug: "cancelled", color: "#dc8084", subgroup: "Done" },
      { name: "Received", slug: "received", color: "#30a46c", subgroup: "Closed" },
    ],
  },
  {
    type: "statusless",
    statuses: [
      { name: "--", slug: "none", color: "#656f7d", subgroup: "Not started" },
      { name: "---", slug: "closed", color: "#30a46c", subgroup: "Closed" },
    ],
  },
];

const index = new Map<string, StatusDef>();
for (const group of statusGroups) {
  for (const s of group.statuses) {
    index.set(`${group.type}/${s.slug}`, s);
  }
}

export function getStatus(type: string, slug: string): StatusDef {
  const def = index.get(`${type}/${slug}`);
  if (!def) throw new Error(`Unknown status: ${type}/${slug}`);
  return def;
}

export function getStatusId(type: string, slug: string): string {
  return `status-${type}-${slug}`;
}
