import { describe, expect, it } from 'vitest'
import type { ComplianceCase } from '../types'
import { filterCasesQueue, filterForDashboardSavedView } from './showcaseFilters'

const mk = (partial: Partial<ComplianceCase> & Pick<ComplianceCase, 'id'>): ComplianceCase => ({
  reference: 'X',
  family: 'Grievance Process',
  subjectLabel: '—',
  ministry: '—',
  stage: 'Open stage',
  owner: 'H.Tevilili',
  sla: 'on_track',
  nextDeadline: '—',
  seniorExecutive: false,
  litigation: false,
  summary: '—',
  artefacts: [],
  ...partial,
})

describe('filterForDashboardSavedView', () => {
  const cases: ComplianceCase[] = [
    mk({ id: '1', sla: 'at_risk', stage: 'Investigation' }),
    mk({ id: '2', sla: 'overdue', stage: 'Review' }),
    mk({ id: '3', sla: 'on_track', stage: 'Closed · archived' }),
  ]

  it('returns open matters only for open view', () => {
    const out = filterForDashboardSavedView('open', cases)
    expect(out.map((c) => c.id).sort()).toEqual(['1', '2'])
  })

  it('filters at-risk among open', () => {
    const out = filterForDashboardSavedView('at_risk', cases)
    expect(out.map((c) => c.id)).toEqual(['1'])
  })

  it('due_focus keeps overdue and at_risk among open', () => {
    const out = filterForDashboardSavedView('due_focus', cases)
    expect(out.map((c) => c.id).sort()).toEqual(['1', '2'])
  })
})

describe('filterCasesQueue', () => {
  const cases: ComplianceCase[] = [
    mk({
      id: 'a',
      owner: 'H.Tevilili',
      seniorExecutive: false,
      litigation: false,
      sla: 'on_track',
      stage: 'Open',
      decisionAppRef: 'REF-1',
    }),
    mk({
      id: 'b',
      owner: 'Other',
      seniorExecutive: true,
      litigation: false,
      sla: 'on_track',
      stage: 'Open',
    }),
    mk({
      id: 'c',
      owner: 'Other',
      seniorExecutive: false,
      litigation: false,
      sla: 'overdue',
      stage: 'Open',
    }),
    mk({
      id: 'd',
      owner: 'Other',
      seniorExecutive: false,
      litigation: false,
      sla: 'on_track',
      stage: 'Closed · done',
    }),
  ]

  it('all_open excludes closed', () => {
    expect(filterCasesQueue('all_open', cases).map((c) => c.id).sort()).toEqual(['a', 'b', 'c'])
  })

  it('mine filters by showcase officer', () => {
    expect(filterCasesQueue('mine', cases).map((c) => c.id)).toEqual(['a'])
  })

  it('escalated includes senior, litigation, or overdue', () => {
    expect(filterCasesQueue('escalated', cases).map((c) => c.id).sort()).toEqual(['b', 'c'])
  })

  it('decision_app requires ref', () => {
    expect(filterCasesQueue('decision_app', cases).map((c) => c.id)).toEqual(['a'])
  })
})
