/** Fragment ids for §4.4.1.1 status type definitions (wiki.mdx). */
export const STATUS_TYPE_DEFINITION_IDS: Record<string, string> = {
  "Not started": "cu-status-type-not-started",
  Active: "cu-status-type-active",
  Done: "cu-status-type-done",
  Closed: "cu-status-type-closed",
};

export function getStatusTypeDefinitionId(label: string): string | undefined {
  return STATUS_TYPE_DEFINITION_IDS[label];
}
