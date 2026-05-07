import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Scale,
  FileText,
  Link2,
  Clock,
  ShieldAlert,
  Users,
  LandPlot,
  ScrollText,
  History,
  Download,
  Eye,
  Briefcase,
} from 'lucide-react'
import type { ComplianceCase } from '../types'
import { getCaseById } from '../data/sampleCases'
import { SlaBadge } from '../components/SlaBadge'
import { WorkflowGuideBanner } from '../components/workflow/WorkflowGuideBanner'
import { WorkflowTip } from '../components/workflow/WorkflowTip'
import { AiAssistTrigger } from '../components/ai/AiAssistTrigger'

const WORKSPACE_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'documents', label: 'Documents FR-04' },
  { id: 'parties', label: 'Parties' },
  { id: 'decisions', label: 'Decisions FR-08' },
  { id: 'litigation', label: 'Litigation FR-13' },
  { id: 'audit', label: 'Audit FR-06' },
] as const

type WorkspaceTabId = (typeof WORKSPACE_TABS)[number]['id']

export function CaseDetailPage() {
  const { id } = useParams<{ id: string }>()
  const c = id ? getCaseById(id) : undefined
  const [activeTab, setActiveTab] = useState<WorkspaceTabId>('overview')

  if (!c) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <p className="text-slate-600 dark:text-slate-400">Case not found in showcase dataset.</p>
        <Link
          to="/cases"
          className="mt-4 inline-block font-semibold text-teal-700 hover:underline dark:text-teal-400"
        >
          Back to queue
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <WorkflowGuideBanner pageId="case-detail" />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-teal-800 dark:text-teal-400">
            <Link to="/cases" className="hover:underline">
              Cases
            </Link>{' '}
            / {c.reference}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{c.reference}</h1>
            <WorkflowTip
              title="Single source of truth"
              body="The workspace consolidates stages, PSC forms, and decisions so Commission clerks never chase scattered files — audit logs would capture each transition (FR-06)."
            />
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">{c.family}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <AiAssistTrigger
            presetId="case-workspace"
            variant="subtle"
            extraContext={[c.reference, c.family, c.stage]}
          />
          <SlaBadge status={c.sla} />
          {c.seniorExecutive && (
            <span className="rounded-md bg-violet-100 px-2 py-1 text-xs font-semibold text-violet-900 ring-1 ring-violet-200 dark:bg-violet-950/50 dark:text-violet-200 dark:ring-violet-800">
              Senior executive FR-12
            </span>
          )}
          {c.litigation && (
            <span className="rounded-md bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-900 ring-1 ring-rose-200 dark:bg-rose-950/50 dark:text-rose-200 dark:ring-rose-800">
              Litigation FR-13
            </span>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Clock className="size-4 text-slate-400 dark:text-slate-500" aria-hidden />
            <span>
              <span className="font-medium text-slate-800 dark:text-slate-200">Next:</span> {c.nextDeadline}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <ShieldAlert className="size-4 text-slate-400 dark:text-slate-500" aria-hidden />
            <span>
              Owner <strong className="text-slate-900 dark:text-white">{c.owner}</strong>
            </span>
          </div>
          {c.decisionAppRef && (
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Link2 className="size-4 text-teal-600 dark:text-teal-400" aria-hidden />
              <span>
                Decision App ref{' '}
                <span className="font-mono text-xs font-semibold text-teal-800 dark:text-teal-300">
                  {c.decisionAppRef}
                </span>{' '}
                <span className="text-xs text-slate-500 dark:text-slate-400">(ministry blind boundary §6.1)</span>
              </span>
            </div>
          )}
        </div>
        <p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-relaxed text-slate-700 dark:border-slate-800 dark:text-slate-300">
          {c.summary}
        </p>
      </div>

      <div className="flex flex-col gap-2 border-b border-slate-200 pb-2 dark:border-slate-700">
        <div className="flex flex-wrap items-center gap-2">
          <WorkflowTip
            title="Workspace tabs (preview)"
            body="Tab labels mirror FR packs — Documents, Decisions, Litigation, Audit — production RBAC would show only what each role may edit."
          />
          <div
            role="tablist"
            aria-label="Case workspace"
            className="flex flex-wrap gap-1 border-l border-slate-200 pl-3 dark:border-slate-600"
          >
            {WORKSPACE_TABS.map((t) => {
              const selected = activeTab === t.id
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`case-tab-${t.id}`}
                  id={`case-tab-trigger-${t.id}`}
                  onClick={() => setActiveTab(t.id)}
                  className={`cursor-pointer rounded-t-lg px-3 py-2 text-xs font-semibold transition sm:text-[13px] ${
                    selected
                      ? 'bg-teal-700 text-white shadow-sm ring-1 ring-teal-600/50 dark:bg-teal-600'
                      : 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                  }`}
                >
                  {t.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div role="tabpanel" id={`case-tab-${activeTab}`} aria-labelledby={`case-tab-trigger-${activeTab}`}>
        <CaseWorkspacePanel tab={activeTab} c={c} />
      </div>
    </div>
  )
}

function CaseWorkspacePanel({ tab, c }: { tab: WorkspaceTabId; c: ComplianceCase }) {
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

function OverviewTab({ c }: { c: ComplianceCase }) {
  const routing = c.seniorExecutive ? 'Commission-level pathway (FR-12)' : 'Standard employee discipline / grievance routing'
  const channel =
    c.family === 'Grievance Process'
      ? 'PSC grievance referral · privileged mediation notes'
      : c.family.includes('Suspension')
        ? 'SMDR · PSC Form 6-1 statutory suspension pack'
        : 'Internal referral · DG / HR delegation'

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
            <Briefcase className="size-4 text-teal-600 dark:text-teal-400" aria-hidden />
            Matter snapshot
          </h2>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Case family
              </dt>
              <dd className="mt-1 font-medium text-slate-900 dark:text-white">{c.family}</dd>
            </div>
            <div className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Subject profile
              </dt>
              <dd className="mt-1 font-medium text-slate-900 dark:text-white">{c.subjectLabel}</dd>
            </div>
            <div className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Ministry account
              </dt>
              <dd className="mt-1 font-medium text-slate-900 dark:text-white">{c.ministry}</dd>
            </div>
            <div className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Statutory gate
              </dt>
              <dd className="mt-1 font-medium text-teal-900 dark:text-teal-200">{c.stage}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Routing & channel (preview)</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>
              <span className="font-medium text-slate-800 dark:text-slate-200">FR-02 pathway:</span> {routing}
            </li>
            <li>
              <span className="font-medium text-slate-800 dark:text-slate-200">Intake channel:</span> {channel}
            </li>
            {c.decisionAppRef ? (
              <li>
                <span className="font-medium text-slate-800 dark:text-slate-200">Decision App sync:</span>{' '}
                <span className="font-mono text-xs text-teal-800 dark:text-teal-300">{c.decisionAppRef}</span> — ministry
                sees status indicator only.
              </li>
            ) : null}
          </ul>
        </section>
      </div>

      <aside className="space-y-4">
        <section className="rounded-xl border border-amber-200/90 bg-amber-50/90 p-4 dark:border-amber-900/40 dark:bg-amber-950/25">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-950 dark:text-amber-100">
            SLA posture · FR-03
          </h3>
          <p className="mt-2 text-sm text-amber-950/90 dark:text-amber-50/90">{c.nextDeadline}</p>
          <p className="mt-2 text-xs leading-relaxed text-amber-900/80 dark:text-amber-100/80">
            Showcase badges mirror amber/overdue statutory windows — production CCMS would clock each gate from PSDB orders and panel milestones.
          </p>
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white">Quick actions (demo)</h3>
          <div className="mt-3 flex flex-col gap-2">
            <button
              type="button"
              className="cursor-pointer rounded-lg bg-teal-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-teal-800"
            >
              Generate briefing PDF
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-300 transition hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600 dark:hover:bg-slate-700"
            >
              Flag for Commission agenda
            </button>
          </div>
        </section>
      </aside>
    </div>
  )
}

function WorkflowTab({ c }: { c: ComplianceCase }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 lg:col-span-2">
        <h2 className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <Clock className="size-4 text-teal-600 dark:text-teal-400" aria-hidden />
          Workflow checklist · FR-02 FR-03
          <WorkflowTip
            title="Statutory sequencing"
            body="Each gate corresponds to OPSC procedures — e.g. MDC week, panel 21 days, Commission confirmation 45 days from PSDB orders."
          />
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <li className="flex gap-2">
            <span className="text-teal-600 dark:text-teal-400">✓</span> Intake registered FR-01
          </li>
          <li className="flex gap-2">
            <span className="text-teal-600 dark:text-teal-400">✓</span> Artefacts version-stacked FR-04
          </li>
          <li className="flex gap-2">
            <span className="text-amber-600 dark:text-amber-400">◷</span> Current stage: <strong>{c.stage}</strong>
          </li>
          <li className="flex gap-2">
            <span className="text-slate-400 dark:text-slate-500">○</span> Next statutory gateway unlocked after approvals
          </li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            className="cursor-pointer rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-teal-800"
          >
            Advance stage (demo)
          </button>
          <button
            type="button"
            className="cursor-pointer rounded-lg bg-white px-4 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-300 transition hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600 dark:hover:bg-slate-700"
          >
            Request information
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h2 className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <FileText className="size-4 text-teal-600 dark:text-teal-400" aria-hidden />
          Artefacts
          <WorkflowTip
            title="Forms bundle"
            body="PSC Forms 6-1/6-4/6.8 and notices attach once — immutable versioning preserves judicial-review readiness."
          />
        </h2>
        <ul className="mt-3 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          {c.artefacts.map((a) => (
            <li
              key={a}
              className="rounded-md bg-slate-50 px-2 py-1.5 ring-1 ring-slate-100 dark:bg-slate-800/60 dark:ring-slate-700"
            >
              {a}
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="mt-4 w-full cursor-pointer rounded-lg bg-slate-900 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 dark:bg-teal-800 dark:hover:bg-teal-700"
        >
          Upload (demo)
        </button>
      </div>
    </div>
  )
}

function DocumentsTab({ c }: { c: ComplianceCase }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
        <h2 className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <FileText className="size-4 text-teal-600 dark:text-teal-400" aria-hidden />
          Document register · FR-04
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Immutability after Commission publication — demo grid shows versioning UX only.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 dark:bg-slate-800/70 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3">Document</th>
              <th className="px-4 py-3">Version</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Retention</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {c.artefacts.map((label, i) => {
              const version = `v1.${i + 1}`
              const last = i === c.artefacts.length - 1
              const status = last ? 'Draft / in circulation' : 'Immutable · superseded'
              return (
                <tr key={label} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{label}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-600 dark:text-slate-400">{version}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${
                        last
                          ? 'bg-amber-50 text-amber-950 ring-amber-200 dark:bg-amber-950/35 dark:text-amber-100 dark:ring-amber-800'
                          : 'bg-teal-50 text-teal-900 ring-teal-200 dark:bg-teal-950/40 dark:text-teal-100 dark:ring-teal-800'
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400">Permanent · statutory file</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        className="inline-flex cursor-pointer items-center gap-1 rounded-md bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600 dark:hover:bg-slate-700"
                      >
                        <Eye className="size-3.5" aria-hidden />
                        View
                      </button>
                      <button
                        type="button"
                        className="inline-flex cursor-pointer items-center gap-1 rounded-md bg-teal-700 px-2 py-1 text-[11px] font-semibold text-white transition hover:bg-teal-800"
                      >
                        <Download className="size-3.5" aria-hidden />
                        PDF
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PartiesTab({ c }: { c: ComplianceCase }) {
  const complainantLabel =
    c.family === 'Grievance Process'
      ? 'Anonymous complainant · PSC referral'
      : 'Employing ministry / DG delegation'

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <Users className="size-4 text-teal-600 dark:text-teal-400" aria-hidden />
          Named actors
        </h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4 border-b border-slate-100 pb-3 dark:border-slate-800">
            <dt className="text-slate-500 dark:text-slate-400">Subject</dt>
            <dd className="max-w-[60%] text-right font-medium text-slate-900 dark:text-white">{c.subjectLabel}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-slate-100 pb-3 dark:border-slate-800">
            <dt className="text-slate-500 dark:text-slate-400">Compliance owner</dt>
            <dd className="font-medium text-slate-900 dark:text-white">{c.owner}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-slate-100 pb-3 dark:border-slate-800">
            <dt className="text-slate-500 dark:text-slate-400">Ministry liaison</dt>
            <dd className="max-w-[60%] text-right text-slate-700 dark:text-slate-300">{c.ministry}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500 dark:text-slate-400">Counter-party / complainant channel</dt>
            <dd className="max-w-[55%] text-right text-xs leading-snug text-slate-700 dark:text-slate-300">
              {complainantLabel}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <LandPlot className="size-4 text-teal-600 dark:text-teal-400" aria-hidden />
          RBAC preview (demo)
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          Production CCMS would hide mediation notes from ministry accounts and restrict Commission briefing packs to clerk / legal roles.
        </p>
        <ul className="mt-4 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <li className="rounded-lg bg-slate-50 px-3 py-2 ring-1 ring-slate-100 dark:bg-slate-800/50 dark:ring-slate-700">
            <strong className="text-slate-900 dark:text-white">Compliance Officer:</strong> full workspace tabs shown here.
          </li>
          <li className="rounded-lg bg-slate-50 px-3 py-2 ring-1 ring-slate-100 dark:bg-slate-800/50 dark:ring-slate-700">
            <strong className="text-slate-900 dark:text-white">Ministry HR:</strong> Decision App status + limited artefact list only.
          </li>
          <li className="rounded-lg bg-slate-50 px-3 py-2 ring-1 ring-slate-100 dark:bg-slate-800/50 dark:ring-slate-700">
            <strong className="text-slate-900 dark:text-white">Commission clerk:</strong> FR-08 drafting + FR-06 audit exports.
          </li>
        </ul>
      </section>
    </div>
  )
}

function DecisionsTab({ c }: { c: ComplianceCase }) {
  const closed = c.stage.startsWith('Closed')
  const steps = closed
    ? [
        { label: 'Investigation / panel', state: 'done' as const },
        { label: 'Commission deliberation', state: 'done' as const },
        { label: 'Decision notice issued FR-08', state: 'done' as const },
      ]
    : [
        { label: 'Evidence & brief ready', state: 'done' as const },
        { label: 'Commission review window', state: 'current' as const },
        { label: 'Outcome sync to Decision App', state: 'pending' as const },
      ]

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 lg:col-span-2">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <Scale className="size-4 text-teal-600 dark:text-teal-400" aria-hidden />
          Decision pathway · FR-08
        </h2>
        <ol className="mt-6 space-y-5">
          {steps.map((s) => (
            <li key={s.label} className="flex gap-4">
              <span
                className={`mt-1.5 flex size-3 shrink-0 rounded-full ring-4 ring-white dark:ring-slate-900 ${
                  s.state === 'done'
                    ? 'bg-teal-600'
                    : s.state === 'current'
                      ? 'bg-amber-500'
                      : 'border-2 border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-900'
                }`}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-900 dark:text-white">{s.label}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {s.state === 'done'
                    ? 'Recorded in showcase dataset.'
                    : s.state === 'current'
                      ? `Aligned with current gate — ${c.stage}.`
                      : 'Triggers API boundary to Decision App when Commission publishes.'}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <aside className="space-y-4">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Drafting aids (demo)
          </h3>
          <button
            type="button"
            className="mt-3 w-full cursor-pointer rounded-lg bg-teal-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-teal-800"
          >
            Open decision template
          </button>
          <button
            type="button"
            className="mt-2 w-full cursor-pointer rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-300 transition hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600 dark:hover:bg-slate-700"
          >
            Request legal review
          </button>
        </section>
        {c.decisionAppRef ? (
          <section className="rounded-xl border border-teal-200/90 bg-teal-50/80 p-4 dark:border-teal-900/50 dark:bg-teal-950/25">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-teal-900 dark:text-teal-200">
              Linked tracker
            </p>
            <p className="mt-2 font-mono text-xs font-semibold text-teal-900 dark:text-teal-100">{c.decisionAppRef}</p>
            <p className="mt-2 text-xs leading-relaxed text-teal-900/85 dark:text-teal-100/85">
              §6.1 ministry-visible slice stays thin — outcomes propagate after Commission approval only.
            </p>
          </section>
        ) : null}
      </aside>
    </div>
  )
}

function LitigationTab({ c }: { c: ComplianceCase }) {
  if (!c.litigation) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/80 p-10 text-center dark:border-slate-600 dark:bg-slate-900/40">
        <ScrollText className="mx-auto size-10 text-slate-400 dark:text-slate-500" aria-hidden />
        <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">No active litigation ledger</p>
        <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          FR-13 activates when judicial review or civil exposure is logged — this showcase matter remains an administrative discipline track only.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-xl border border-rose-200 bg-rose-50/90 p-4 shadow-sm dark:border-rose-900/50 dark:bg-rose-950/30">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-rose-950 dark:text-rose-100">
          <ScrollText className="size-4 text-rose-700 dark:text-rose-300" aria-hidden />
          Exposure summary · FR-13
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-rose-950/90 dark:text-rose-50/90">
          <li>
            <strong>Matter:</strong> {c.reference} · senior executive cohort increases judicial scrutiny risk.
          </li>
          <li>
            <strong>Reserved estimate:</strong> VUV placeholder — cost centre tagged to IPDU legal liaison (demo figures).
          </li>
          <li>
            <strong>Council briefing:</strong> Next cycle slides would pull this card automatically.
          </li>
        </ul>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Counsel & filings (mock)
        </h3>
        <table className="mt-3 w-full text-left text-xs">
          <thead className="text-[11px] font-semibold uppercase text-slate-500 dark:text-slate-400">
            <tr>
              <th className="py-2">Item</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            <tr>
              <td className="py-2 text-slate-700 dark:text-slate-300">JR notice · judicial review</td>
              <td className="py-2 font-medium text-amber-700 dark:text-amber-400">Filed · awaiting defence</td>
            </tr>
            <tr>
              <td className="py-2 text-slate-700 dark:text-slate-300">Legal hold on commission papers</td>
              <td className="py-2 font-medium text-teal-700 dark:text-teal-400">Active</td>
            </tr>
          </tbody>
        </table>
        <button
          type="button"
          className="mt-4 w-full cursor-pointer rounded-lg bg-slate-900 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 dark:bg-rose-900 dark:hover:bg-rose-800"
        >
          Upload counsel correspondence (demo)
        </button>
      </section>
    </div>
  )
}

function AuditTab({ c }: { c: ComplianceCase }) {
  const rows = useMemo(
    () => [
      {
        when: '2026-05-06 · 14:22',
        actor: 'system',
        action: 'SLA evaluation job',
        detail: `Recomputed statutory posture for ${c.reference}`,
      },
      {
        when: '2026-05-05 · 09:03',
        actor: c.owner,
        action: 'Workspace viewed',
        detail: `Opened ${c.stage} · tabs logged`,
      },
      {
        when: '2026-05-02 · 16:41',
        actor: 'Commission clerk (demo)',
        action: 'Artefact superseded',
        detail: `Version bump on ${c.artefacts[0] ?? 'record'}`,
      },
      {
        when: '2026-04-28 · 11:18',
        actor: c.owner,
        action: 'Routing flag applied',
        detail: c.seniorExecutive ? 'FR-12 senior pathway tagged' : 'Standard employee pathway confirmed',
      },
    ],
    [c],
  )

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
        <h2 className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <History className="size-4 text-teal-600 dark:text-teal-400" aria-hidden />
          Immutable audit trail · FR-06
          <WorkflowTip
            title="Evidence-grade logging"
            body="Production CCMS would hash entries and restrict deletion — this grid illustrates read-only reviewer UX."
          />
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Showcase rows are illustrative; timestamps align with demo narrative only.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 dark:bg-slate-800/70 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3">Timestamp</th>
              <th className="px-4 py-3">Actor</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Detail</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {rows.map((r) => (
              <tr key={r.when + r.action} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-slate-600 dark:text-slate-400">
                  {r.when}
                </td>
                <td className="px-4 py-3 text-slate-800 dark:text-slate-200">{r.actor}</td>
                <td className="px-4 py-3 font-medium text-teal-900 dark:text-teal-200">{r.action}</td>
                <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400">{r.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-slate-100 px-4 py-3 dark:border-slate-800">
        <button
          type="button"
          className="cursor-pointer rounded-lg bg-white px-4 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-300 transition hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600 dark:hover:bg-slate-700"
        >
          Export audit excerpt (CSV · demo)
        </button>
      </div>
    </div>
  )
}
