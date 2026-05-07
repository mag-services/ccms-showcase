export const WORKSPACE_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'documents', label: 'Documents FR-04' },
  { id: 'parties', label: 'Parties' },
  { id: 'decisions', label: 'Decisions FR-08' },
  { id: 'litigation', label: 'Litigation FR-13' },
  { id: 'audit', label: 'Audit FR-06' },
] as const

export type WorkspaceTabId = (typeof WORKSPACE_TABS)[number]['id']
