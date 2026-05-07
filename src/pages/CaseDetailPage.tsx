import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Clock, ShieldAlert, Link2 } from 'lucide-react'
import { getCaseById } from '../data/sampleCases'
import { SlaBadge } from '../components/SlaBadge'
import { WorkflowGuideBanner } from '../components/workflow/WorkflowGuideBanner'
import { WorkflowTip } from '../components/workflow/WorkflowTip'
import { AiAssistTrigger } from '../components/ai/AiAssistTrigger'
import { WORKSPACE_TABS, type WorkspaceTabId } from './case-detail/workspaceTabs'
import { CaseWorkspacePanel } from './case-detail/CaseWorkspacePanel'

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
                  className={`cursor-pointer rounded-t-lg px-3 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 sm:text-[13px] dark:focus-visible:ring-offset-slate-950 ${
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
