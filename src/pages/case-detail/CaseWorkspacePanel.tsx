import type { ComplianceCase } from '../../types'
import type { WorkspaceTabId } from './workspaceTabs'
import { OverviewTab } from './panels/OverviewTab'
import { WorkflowTab } from './panels/WorkflowTab'
import { DocumentsTab } from './panels/DocumentsTab'
import { PartiesTab } from './panels/PartiesTab'
import { DecisionsTab } from './panels/DecisionsTab'
import { LitigationTab } from './panels/LitigationTab'
import { AuditTab } from './panels/AuditTab'

export function CaseWorkspacePanel({ tab, c }: { tab: WorkspaceTabId; c: ComplianceCase }) {
  switch (tab) {
    case 'overview':
      return <OverviewTab c={c} />
    case 'workflow':
      return <WorkflowTab c={c} />
    case 'documents':
      return <DocumentsTab c={c} />
    case 'parties':
      return <PartiesTab c={c} />
    case 'decisions':
      return <DecisionsTab c={c} />
    case 'litigation':
      return <LitigationTab c={c} />
    case 'audit':
      return <AuditTab c={c} />
    default:
      return null
  }
}
