import type { CaseFamily } from '../types'

export type RoutingStep = {
  title: string
  /** Statutory / design-time SLA cue — calendar vs working days configured per stage in production */
  slaCue?: string
}

export type Fr02RoutingBundle = {
  pathwayKey: string
  pathwayTitle: string
  /** Short note on why this path was chosen (data-layer routing, not officer discretion) */
  dataLayerNote: string
  steps: readonly RoutingStep[]
  automationNotes: readonly string[]
}

const SENIOR_FAMILIES: ReadonlySet<CaseFamily> = new Set([
  'Senior Executive — Serious Misconduct',
  'Senior Executive — Poor Performance',
])

/** FR-12 cohort is determined by case family in production DB — not toggleable for senior statutory families. */
export function resolveSeniorExecutiveFlag(family: CaseFamily, officerCheckbox: boolean): boolean {
  if (SENIOR_FAMILIES.has(family)) return true
  return officerCheckbox
}

function commonTail(): readonly RoutingStep[] {
  return [
    { title: 'Commission / PSDB outcomes captured · FR-08', slaCue: 'Deadlines anchored to stage-open events (e.g. 45 cal days Commission confirmation from PSDB order date).' },
    { title: 'Closure · statutory file locked · FR-06 audit hash', slaCue: 'Immutable versioning on every artefact mutation.' },
  ]
}

const ROUTES: Record<string, Omit<Fr02RoutingBundle, 'pathwayKey' | 'pathwayTitle' | 'dataLayerNote'> & { pathwayTitle: string; dataLayerNote: string }> = {
  employee_disciplinary: {
    pathwayTitle: 'Employee internal disciplinary · standard lane',
    dataLayerNote:
      'Routing key derives from case family = Employee Internal Disciplinary + FR-12=false — PSDB-centred pathway distinct from senior Commission workflow.',
    steps: [
      { title: 'Intake registered · FR-01 · immutable CREATE logged FR-06', slaCue: 'Trigger metadata only — stage timers start when each gate opens.' },
      { title: 'MDC preliminary assessment', slaCue: '5 working days from stage-open.' },
      { title: 'Progressive discipline / warnings ladder · PSC forms bundle', slaCue: 'Checklist enforced before gateway advance (warnings + replies).' },
      { title: 'PSDB hearing scheduling · statutory notice windows', slaCue: '≥28-day notice where applicable — configured per stage definition.' },
      ...commonTail(),
    ],
    automationNotes: [
      'Uploading a PSDB order opens the 45-calendar-day Commission confirmation stage timer from order date (not intake date).',
    ],
  },
  temporary_suspension: {
    pathwayTitle: 'Temporary suspension · high-clock-risk lane',
    dataLayerNote:
      'Routing key = Temporary Suspension — statutory packs trigger concurrent calendar-day timers at suspension-notice stage.',
    steps: [
      { title: 'Intake registered · FR-01 · PSC Form 6-1 / SMDR bundle checklist', slaCue: 'Attachments validated before suspension gateway.' },
      { title: 'Suspension notice recorded · gateway opens', slaCue: 'Automation fires twin timers: 3 calendar days SMDR issuance + 3 calendar days staff reply — concurrent same trigger.' },
      { title: 'Employee reply window · compliance verification', slaCue: 'Calendar-day counters.' },
      { title: 'Return-to-duty / escalation to misconduct pathway', slaCue: 'Routing mutation emits new FR-02 subgraph if family changes.' },
      ...commonTail(),
    ],
    automationNotes: [
      'Suspension notice event opens both SMDR issuance (3 cal days) and staff response (3 cal days) simultaneously.',
      'Working-day vs calendar-day units live on the stage definition — never inferred per officer.',
    ],
  },
  serious_misconduct_employee: {
    pathwayTitle: 'Serious misconduct — employee · investigation panel',
    dataLayerNote: 'Routing key = Serious Misconduct — Employee; introduces investigation panel subgraph.',
    steps: [
      { title: 'Intake registered · allegations bundle · FR-04 versioning', slaCue: 'Stage-open timers.' },
      { title: 'Investigation panel appointed · Terms of reference published', slaCue: '21-day statutory panel clock from stage-open (configured).' },
      { title: 'Panel report finalized · release-to-subject action required', slaCue: 'Release event logged FR-06 with actor + timestamp.' },
      { title: 'Commission deliberation / PSDB cross-over', slaCue: 'Separate timers per statute.' },
      ...commonTail(),
    ],
    automationNotes: [
      'Panel report upload closes open submission deadline (if any) and opens subject 1-week response window automatically.',
      'Subject release is a discrete audited action — browse-all unrelated cases blocked by RBAC (mediators ≠ disciplinary browse).',
    ],
  },
  grievance: {
    pathwayTitle: 'Grievance · FR-11 mediation submodule',
    dataLayerNote:
      'Routing key = Grievance Process — structurally distinct subgraph (mediation timers + privileged artefact classes).',
    steps: [
      { title: 'Referral logged · privileged mediation workspace spun up', slaCue: 'RBAC isolates notes from ministry Decision App slice §6.1.' },
      { title: 'Mediator appointed · mediation stage opens', slaCue: '10 working days resolution window from appointment stage-open.' },
      { title: 'MoM / PSC Form 6.8 · locked until outcome settled | not settled', slaCue: 'MoM step gated on mediation outcome enum.' },
      { title: 'Settlement handling or escalation to misconduct pathway', slaCue: 'Routing mutation if referral converts.' },
      ...commonTail(),
    ],
    automationNotes: [
      'Mediator appointment opens the 10-working-day mediation resolution timer.',
      'MoM attachment UI stays locked until mediation outcome recorded.',
    ],
  },
  senior_executive: {
    pathwayTitle: 'Senior executive pathway · FR-12 Commission-centric',
    dataLayerNote:
      'Routing key forces FR-12 whenever family ∈ Senior Executive families — checkbox redundant; Compliance cannot downgrade lane in CCMS data model.',
    steps: [
      { title: 'Intake registered · FR-01 · senior cohort tagging immutable', slaCue: 'Audit logs FR-06 capture cohort classifier.' },
      { title: 'Commission briefing packs · restricted circulation list', slaCue: 'Working-day vs calendar-day mix per Commission procedural gates.' },
      { title: 'Enhanced investigation / panel variant · statutory senior timelines', slaCue: 'Timers keyed off stage-open dates.' },
      { title: 'Commission decision publication · Decision App sync §6.1', slaCue: 'Ministry sees indicator only — never CCMS narrative detail.' },
      ...commonTail(),
    ],
    automationNotes: [
      'Senior executive flag is enforced whenever statutory family requires FR-12 — not officer judgement.',
    ],
  },
}

export function intakeFamilyToRouteKey(family: CaseFamily): keyof typeof ROUTES {
  switch (family) {
    case 'Employee Internal Disciplinary':
      return 'employee_disciplinary'
    case 'Temporary Suspension':
      return 'temporary_suspension'
    case 'Serious Misconduct — Employee':
      return 'serious_misconduct_employee'
    case 'Grievance Process':
      return 'grievance'
    case 'Senior Executive — Serious Misconduct':
    case 'Senior Executive — Poor Performance':
      return 'senior_executive'
    default:
      return 'employee_disciplinary'
  }
}

export function isSeniorExecutiveFamily(family: CaseFamily): boolean {
  return SENIOR_FAMILIES.has(family)
}

export function getFr02RoutingBundle(family: CaseFamily, officerSeniorCheckbox: boolean): Fr02RoutingBundle {
  const routeKey = intakeFamilyToRouteKey(family)
  const base = ROUTES[routeKey]
  const senior = resolveSeniorExecutiveFlag(family, officerSeniorCheckbox)
  const seniorNote =
    senior && routeKey !== 'senior_executive'
      ? ' FR-12 senior cohort flag is recorded — pathway remains family-keyed in Phase 1; production may emit overlays.'
      : ''
  return {
    pathwayKey: routeKey,
    pathwayTitle: base.pathwayTitle,
    dataLayerNote: base.dataLayerNote + seniorNote,
    steps: base.steps,
    automationNotes: base.automationNotes,
  }
}
