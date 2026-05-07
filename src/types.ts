export type CaseFamily =
  | 'Employee Internal Disciplinary'
  | 'Serious Misconduct — Employee'
  | 'Temporary Suspension'
  | 'Grievance Process'
  | 'Senior Executive — Serious Misconduct'
  | 'Senior Executive — Poor Performance'

export type SlaStatus = 'on_track' | 'at_risk' | 'overdue'

export interface ComplianceCase {
  id: string
  reference: string
  family: CaseFamily
  subjectLabel: string
  ministry: string
  stage: string
  owner: string
  sla: SlaStatus
  nextDeadline: string
  seniorExecutive: boolean
  litigation: boolean
  decisionAppRef?: string
  summary: string
  artefacts: string[]
}
