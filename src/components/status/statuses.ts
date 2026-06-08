export interface StatusDef {
  name: string;
  slug: string;
  color: string;
  /** ClickUp status type (Not started, Active, Done, Closed, or board-specific labels). */
  statusType: string;
}

export interface StatusGroup {
  type: string;
  statuses: StatusDef[];
}

export const statusGroups: StatusGroup[] = [
  {
    type: "task",
    statuses: [
      { name: "Unspecified", slug: "unspecified", color: "#656f7d", statusType: "Not started" },
      { name: "To Do", slug: "to-do", color: "#fff187", statusType: "Not started" },
      { name: "Blocked", slug: "blocked", color: "#e67377", statusType: "Not started" },
      { name: "Committed", slug: "committed", color: "#128aa5", statusType: "Active" },
      { name: "Scheduled", slug: "scheduled", color: "#12a594", statusType: "Active" },
      { name: "Waiting", slug: "waiting", color: "#ab4aba", statusType: "Active" },
      { name: "Canceled", slug: "canceled", color: "#dc8084", statusType: "Done" },
      { name: "Done", slug: "done", color: "#30a46c", statusType: "Done" },
      { name: "Complete", slug: "complete", color: "#30a46c", statusType: "Closed" },
    ],
  },
  {
    type: "milestone",
    statuses: [
      { name: "Not Set", slug: "not-set", color: "#656f7d", statusType: "Not started" },
      { name: "Set", slug: "set", color: "#fff187", statusType: "Active" },
      { name: "Reached", slug: "reached", color: "#30a46c", statusType: "Closed" },
    ],
  },
  {
    type: "event",
    statuses: [
      { name: "Not Scheduled", slug: "not-scheduled", color: "#656f7d", statusType: "Not started" },
      { name: "Upcoming", slug: "upcoming", color: "#fff187", statusType: "Not started" },
      { name: "Occurring", slug: "occurring", color: "#7a6ae6", statusType: "Active" },
      { name: "Occurred", slug: "occurred", color: "#30a46c", statusType: "Closed" },
    ],
  },
  {
    type: "shopping",
    statuses: [
      { name: "Idea", slug: "idea", color: "#656f7d", statusType: "Not started" },
      { name: "To Buy", slug: "to-buy", color: "#fff187", statusType: "Not started" },
      { name: "In Cart", slug: "in-cart", color: "#f76808", statusType: "Active" },
      { name: "Ordered", slug: "ordered", color: "#7a6ae6", statusType: "Active" },
      { name: "Cancelled", slug: "cancelled", color: "#dc8084", statusType: "Done" },
      { name: "Received", slug: "received", color: "#30a46c", statusType: "Closed" },
    ],
  },
  {
    type: "bug",
    statuses: [
      { name: "Logged", slug: "logged", color: "#87909e", statusType: "Not started" },
      { name: "Reported", slug: "reported", color: "#fff187", statusType: "Active" },
      { name: "Confirmed", slug: "confirmed", color: "#ab4aba", statusType: "Active" },
      { name: "Rejected", slug: "rejected", color: "#e5484d", statusType: "Done" },
      { name: "Fixed", slug: "fixed", color: "#30a46c", statusType: "Closed" },
    ],
  },
  {
    type: "feature-request",
    statuses: [
      { name: "Not submitted", slug: "not-submitted", color: "#87909e", statusType: "Not started" },
      { name: "Open", slug: "open", color: "#ffffff", statusType: "Active" },
      { name: "Future", slug: "future", color: "#ee5e99", statusType: "Active" },
      { name: "Planned", slug: "planned", color: "#4466ff", statusType: "Active" },
      { name: "Building Now", slug: "building-now", color: "#b660e0", statusType: "Active" },
      { name: "Beta", slug: "beta", color: "#3db88b", statusType: "Active" },
      { name: "Complete", slug: "complete", color: "#30a46c", statusType: "Closed" },
    ],
  },
  {
    type: "statusless",
    statuses: [
      { name: "--", slug: "none", color: "#656f7d", statusType: "Not started" },
      { name: "---", slug: "closed", color: "#30a46c", statusType: "Closed" },
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
