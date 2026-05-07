export type AiAssistPresetId =
  | 'reports-analytics'
  | 'dashboard-insights'
  | 'dashboard-charts'
  | 'cases-queue'
  | 'case-workspace'
  | 'register-intake'
  | 'fr-backlog'
  | 'alerts-triage'

export type AiAssistPreset = {
  buttonLabel: string
  modalTitle: string
  description: string
  placeholder: string
  generateLabel: string
  buildMockReply: (prompt: string, extraContext?: readonly string[]) => string
}

function clip(s: string, n: number) {
  const t = s.trim()
  if (!t) return '(no prompt — using default Compliance briefing slice)'
  if (t.length <= n) return t
  return `${t.slice(0, n)}…`
}

export const AI_ASSIST_PRESETS: Record<AiAssistPresetId, AiAssistPreset> = {
  'reports-analytics': {
    buttonLabel: 'AI · charts & narrative',
    modalTitle: 'AI analytics composer · FR-10 preview',
    description:
      'Describe the oversight story you need in plain language. A production CCMS would translate this into saved chart layouts, filters, and a draft Commission narrative.',
    placeholder:
      'e.g. Show SLA breaches by ministry this quarter and compare to grievance mediation volume…',
    generateLabel: 'Generate draft pack',
    buildMockReply: (prompt) =>
      [
        `**Interpreted request:** ${clip(prompt, 280)}`,
        '',
        '**Suggested visualizations (composer maps to Reports charts today):**',
        '• `VolumesByFamilyChart` — stacked / grouped families vs intake volumes.',
        '• `SlaByOfficerChart` — SLA posture heat by Compliance owner.',
        '• Dashboard twins would reuse `DashboardSlaDonut` + `DashboardSlaStackByFamily` for drill-down.',
        '',
        '**Draft narrative for oversight circular:**',
        'Workload remains concentrated in provincial grievances where mediation clocks approach amber thresholds; overdue buckets correlate with litigation-flagged FR-13 matters rather than routine disciplinary queues.',
      ].join('\n'),
  },
  'dashboard-insights': {
    buttonLabel: 'AI · explain dashboard',
    modalTitle: 'AI cockpit briefing · FR-07 FR-03',
    description:
      'Ask for interpretations of KPIs and themed charts. Useful during Compliance workshops when sponsors want spoken summaries tied to statutory urgency.',
    placeholder:
      'e.g. Summarize what stands out for the DG briefing tomorrow focusing on overdue SLA…',
    generateLabel: 'Generate briefing notes',
    buildMockReply: (prompt) =>
      [
        `**Prompt:** ${clip(prompt, 280)}`,
        '',
        '**Top signals (sample interpretation):**',
        '• Open caseload skew mirrors intake spikes after PSC referral bursts.',
        '• Overdue SLA items disproportionately carry litigation linkage FR-13 — escalate Commission clerk checklist.',
        '• “Caseload & origins” tab → `DashboardOpenVsClosed`, `DashboardFamilyBar`, `DashboardMinistryBar`.',
        '• “SLA & timeframes” tab → `DashboardSlaDonut`, `DashboardIllustrativeTrend`, `DashboardSlaStackByFamily`.',
        '',
        '**Suggested talking points:**',
        'Lead with statutory breach exposure, then reassure with on-track employee discipline lanes; close with Decision App boundary wording for ministry counterparts.',
      ].join('\n'),
  },
  'dashboard-charts': {
    buttonLabel: 'AI · NL charts',
    modalTitle: 'Natural-language chart composer · Dashboard',
    description:
      'Describe comparisons or layouts you want narrated during demos. A connected CCMS would translate prompts into saved widgets pinned under the themed tabs.',
    placeholder:
      'e.g. Put SLA donut next to litigation pie for DG briefing and highlight ministries above amber grievance timers…',
    generateLabel: 'Draft chart layout',
    buildMockReply: (prompt) =>
      [
        `**Prompt:** ${clip(prompt, 280)}`,
        '',
        '**Suggested tab placement:**',
        '• Primary emphasis → **SLA & timeframes** (donut + illustrative trend pairing).',
        '• Supporting linkage → **Oversight & linkage** (Decision App column juxtaposed with FR-13 litigation slice).',
        '',
        '**Composite slide suggestion:**',
        'Left stack: SLA composition + temporal bands · Right stack: litigation-linked refs · Footer bullets cite grievance mediation day-count hotspots.',
        '',
        '**Governance note:** Outputs inherit RBAC filters — ministry-facing decks omit privileged mediation excerpts.',
      ].join('\n'),
  },
  'cases-queue': {
    buttonLabel: 'AI · NL queue filter',
    modalTitle: 'Natural-language queue assistant · FR-07',
    description:
      'Describe who or what you are trying to find. Production CCMS would translate phrases into secure filters (respecting RBAC and artefact sensitivity).',
    placeholder:
      'e.g. At-risk grievances owned by M.Vanuaku with mediation under 3 working days left…',
    generateLabel: 'Translate to filters',
    buildMockReply: (prompt) =>
      [
        `**Interpreted filter intent:** ${clip(prompt, 280)}`,
        '',
        '**Equivalent criteria (demo):**',
        '• Stage contains mediation · SLA ≠ overdue.',
        '• Owner = M.Vanuaku OR Compliance pool if ambiguous.',
        '• Sort by ascending statutory window remaining.',
        '',
        '**Would also surface:**',
        'Linked FR-04 artefact freshness + FR-09 alert duplicates for the same reference.',
      ].join('\n'),
  },
  'case-workspace': {
    buttonLabel: 'AI · case copilot',
    modalTitle: 'Case workspace copilot · FR-02 FR-08',
    description:
      'Draft next-step language, briefing bullets, or hearing readiness checks grounded in this matter’s stage and artefacts.',
    placeholder:
      'e.g. Draft a short Commission briefing paragraph and list missing artefacts before mediation closes…',
    generateLabel: 'Suggest next actions',
    buildMockReply: (prompt, ctx = []) => {
      const head = ctx.filter(Boolean).join(' · ')
      return [
        head ? `**Matter context:** ${head}` : '**Matter context:** General statutory workspace',
        '',
        `**Your ask:** ${clip(prompt, 280)}`,
        '',
        '**Suggested next actions (demo):**',
        '• Confirm PSC Form 6.8 signatures before mediation day window expires.',
        '• Snapshot immutable artefact bundle FR-04 for judicial-review readiness.',
        '• Queue Decision App status snippet suitable for ministry-visible tracker §6.1.',
        '',
        '**Draft paragraph stub:**',
        'The Commission clerk should note mediation remains privileged; external narrative references process milestones only, avoiding mediation content consistent with FR-11 handling.',
      ].join('\n')
    },
  },
  'register-intake': {
    buttonLabel: 'AI · draft intake summary',
    modalTitle: 'Intake drafting assistant · FR-01',
    description:
      'Turn bullet allegations or rough notes into a structured statutory-friendly narrative before routing preview FR-02 runs.',
    placeholder:
      'e.g. Convert: employee late three times; prior warning 2025; DG wants suspension risk assessed…',
    generateLabel: 'Draft narrative',
    buildMockReply: (prompt) =>
      [
        `**Source notes:** ${clip(prompt, 320)}`,
        '',
        '**Structured narrative (draft):**',
        'The employing ministry referred allegations concerning attendance and prior progressive discipline. Initial facts reference a warning issued in 2025; DG seeks Compliance assessment of suspension proportionality pending employee reply windows.',
        '',
        '**Routing hints:**',
        'If suspension proceeds → Temporary Suspension family with PSC Form 6-1 pack; otherwise route Employee Internal Disciplinary until PSDB milestones crystallize.',
      ].join('\n'),
  },
  'fr-backlog': {
    buttonLabel: 'AI · FR coverage scan',
    modalTitle: 'Requirements assistant · traceability',
    description:
      'Cross-check functional-requirement rows against demo screens — helpful before Compliance sign-off workshops.',
    placeholder: 'e.g. Which FR rows touch Litigation FR-13 and what UI proves them?',
    generateLabel: 'Scan coverage',
    buildMockReply: (prompt) =>
      [
        `**Question:** ${clip(prompt, 280)}`,
        '',
        '**Heuristic answer (showcase):**',
        '• FR-13 touches litigation badges on Dashboard KPI strip, Case workspace Litigation tab, and linked cost ledger language.',
        '• FR-06 surfaces under Audit tab immutable logs + export affordance.',
        '• FR-10 aligns with Reports charts & narrative composer buttons.',
        '',
        '**Reminder:** Final acceptance tests still live in Step 3 Concept Note — this view seeds vocabulary only.',
      ].join('\n'),
  },
  'alerts-triage': {
    buttonLabel: 'AI · triage alerts',
    modalTitle: 'Alert prioritisation · FR-09 preview',
    description:
      'Rank mock alerts by statutory blast radius and suggested owner actions.',
    placeholder: 'e.g. What should we escalate first if clerk capacity is limited today?',
    generateLabel: 'Prioritise',
    buildMockReply: (prompt) =>
      [
        `**Capacity prompt:** ${clip(prompt, 280)}`,
        '',
        '**Suggested order:**',
        '1. SLA breach window · CCMS-2026-0081 — Commission confirmation overdue + litigation ledger.',
        '2. Grievance mediation Day 8/10 · CCMS-2026-0099 — privileged MoM gap risk.',
        '3. New SMDR routed — standard triage after statutory fires are staffed.',
        '',
        '**Automation hook (future):** Push item 1 into clerk mobile digest + attach breach justification paragraph template.',
      ].join('\n'),
  },
}
