export type WorkflowGuideId = 'dashboard' | 'cases' | 'case-detail' | 'reports' | 'register-case'

export type WorkflowGuide = {
  headline: string
  summary: string
  workflowSteps: readonly { step: string; detail: string }[]
}

export const WORKFLOW_GUIDES: Record<WorkflowGuideId, WorkflowGuide> = {
  dashboard: {
    headline: 'Compliance workflow · Command view',
    summary:
      'Use this screen as the Compliance Unit’s daily cockpit: spot SLA pressure, balance workload across officers and ministries, then drill into the queue or case workspace.',
    workflowSteps: [
      {
        step: 'Scan KPI tiles',
        detail:
          'Open counts, at-risk and overdue SLA buckets (FR-03), and litigation-linked matters (FR-13) mirror statutory urgency before Commission or PSDB milestones.',
      },
      {
        step: 'Read themed charts',
        detail:
          'Charts are grouped by theme below — pipeline volume, workflow stage, SLA layers, and Decision App / litigation linkage — all seeded from the same showcase dataset.',
      },
      {
        step: 'Act on “needs attention”',
        detail:
          'Each row links to the case record where artefacts (FR-04), routing (FR-02), and decisions (FR-08) would be maintained in production.',
      },
    ],
  },
  cases: {
    headline: 'Compliance workflow · Master queue',
    summary:
      'This queue is FR-07 in practice: every statutory family lands here after intake so officers can sort, filter, and pick up the next statutory action.',
    workflowSteps: [
      {
        step: 'Triaging intake',
        detail:
          'New matters arrive via PSC Form 6-1 (SMDR), grievance referrals, or linked Decision App submissions — each logged before routing.',
      },
      {
        step: 'Using SLA badges',
        detail:
          'Colour cues highlight approaching statutory windows (panel 21 days, Commission confirmation 45 days, suspension responses, etc.).',
      },
      {
        step: 'Register from anywhere',
        detail:
          'Use Register case to open the intake dialog — it previews routing (FR-02) and senior-executive flags (FR-12) without leaving your context.',
      },
    ],
  },
  'case-detail': {
    headline: 'Compliance workflow · Case workspace',
    summary:
      'Single authoritative record per matter: stages, documents, decisions, and audit hooks reflect how CCMS would prevent fragmentation across files and inboxes.',
    workflowSteps: [
      {
        step: 'Follow the statutory pathway',
        detail:
          'Tabs sketch artefacts (FR-04), decisions (FR-08), litigation cost (FR-13), and immutable audit (FR-06) — production would enforce permissions per role.',
      },
      {
        step: 'Track Decision App boundary',
        detail:
          'Linked PSC tracker refs sync outcomes without exposing sensitive detail to ministry-side users (§6.1 boundary).',
      },
      {
        step: 'Advancement',
        detail:
          'Demonstration buttons hint at stage transitions; a live system would calculate SLA clocks per gate.',
      },
    ],
  },
  reports: {
    headline: 'Compliance workflow · Oversight & backlog',
    summary:
      'FR-10 reporting surfaces volumes and SLA breaches by officer for Commission cycles and IPDU reviews; FR-09 captures in-app alerts before email integration.',
    workflowSteps: [
      {
        step: 'Interpret charts',
        detail:
          'Family volumes and SLA-by-officer charts complement dashboard themes — here they sit beside the functional-requirements seed backlog.',
      },
      {
        step: 'Requirements traceability',
        detail:
          'The FR table maps brief statements to UI touchpoints so Compliance can validate coverage during walkthroughs.',
      },
      {
        step: 'Alert centre',
        detail:
          'Mock alerts preview how critical breaches would surface alongside analytics.',
      },
    ],
  },
  'register-case': {
    headline: 'Compliance workflow · Intake (FR-01)',
    summary:
      'Registration anchors every lifecycle: capture family, subject, ministry, channel, and artefacts before the system computes statutory gates.',
    workflowSteps: [
      {
        step: 'Choose case family',
        detail:
          'Selection drives FR-02 routing — six distinct public-service pathways with different actors and time limits.',
      },
      {
        step: 'Senior executive flag',
        detail:
          'FR-12 reroutes DG/Director/SG cohorts through Commission-level procedures rather than standard employee discipline.',
      },
      {
        step: 'Commission Decision App (optional)',
        detail:
          'A linked PSC submission ref can pre-fill metadata while keeping CCMS detail internal to OPSC.',
      },
    ],
  },
}
