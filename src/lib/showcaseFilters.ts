import type { ComplianceCase } from '../types'

export function isCaseOpen(c: ComplianceCase): boolean {
  return !c.stage.startsWith('Closed')
}

export type DashboardSavedView = 'open' | 'at_risk' | 'due_focus'

/** Chips above KPI tiles — filters dashboard attention preview rows only (demo). */
export function filterForDashboardSavedView(view: DashboardSavedView, cases: ComplianceCase[]): ComplianceCase[] {
  const open = cases.filter(isCaseOpen)
  switch (view) {
    case 'open':
      return open
    case 'at_risk':
      return open.filter((c) => c.sla === 'at_risk')
    case 'due_focus':
      return open.filter((c) => c.sla === 'overdue' || c.sla === 'at_risk')
    default:
      return open
  }
}

export type CasesQueueFilter = 'all_open' | 'mine' | 'escalated' | 'decision_app'

/** Queue facet chips — applied to full SAMPLE_CASES list (demo). */
export function filterCasesQueue(mode: CasesQueueFilter, cases: ComplianceCase[]): ComplianceCase[] {
  switch (mode) {
    case 'all_open':
      return cases.filter(isCaseOpen)
    case 'mine':
      return cases.filter(isCaseOpen).filter((c) => c.owner === 'H.Tevilili')
    case 'escalated':
      return cases.filter(isCaseOpen).filter((c) => c.seniorExecutive || c.litigation || c.sla === 'overdue')
    case 'decision_app':
      return cases.filter(isCaseOpen).filter((c) => Boolean(c.decisionAppRef))
    default:
      return cases.filter(isCaseOpen)
  }
}
