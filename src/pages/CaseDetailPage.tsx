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
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400">Case not found in showcase dataset.</p>
        <Link
          to="/cases"
          className="mt-4 inline-block font-semibold text-blue-700 hover:underline dark:text-blue-400"
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
          <p className="text-xs font-medium text-blue-800 dark:text-blue-400">
            <Link to="/cases" className="hover:underline">
              Cases
            </Link>{' '}
            / {c.reference}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{c.reference}</h1>
            <WorkflowTip
              title="Single source of truth"
              body="The workspace consolidates stages, PSC forms, and decisions so Commission clerks never chase scattered files — audit logs would capture each transition (FR-06)."
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{c.family}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <AiAssistTrigger
            presetId="case-workspace"
            variant="subtle"
            extraContext={[c.reference, c.family, c.stage]}
          />
          <SlaBadge status={c.sla} />
          {c.seniorExecutive && (
            <span className="rounded-md bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-900 ring-1 ring-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-200 dark:ring-indigo-800">
              Senior executive FR-12
            </span>
          )}
          {c.litigation && (
            <span className="rounded-md bg-red-100 px-2 py-1 text-xs font-semibold text-red-900 ring-1 ring-red-200 dark:bg-red-950/50 dark:text-red-200 dark:ring-red-800">
              Litigation FR-13
            </span>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Clock className="size-4 text-gray-400 dark:text-gray-500" aria-hidden />
            <span>
              <span className="font-medium text-gray-800 dark:text-gray-200">Next:</span> {c.nextDeadline}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <ShieldAlert className="size-4 text-gray-400 dark:text-gray-500" aria-hidden />
            <span>
              Owner <strong className="text-gray-900 dark:text-white">{c.owner}</strong>
            </span>
          </div>
          {c.decisionAppRef && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Link2 className="size-4 text-blue-600 dark:text-blue-400" aria-hidden />
              <span>
                Decision App ref{' '}
                <span className="font-mono text-xs font-semibold text-blue-800 dark:text-blue-300">
                  {c.decisionAppRef}
                </span>{' '}
                <span className="text-xs text-gray-500 dark:text-gray-400">(ministry blind boundary §6.1)</span>
              </span>
            </div>
          )}
        </div>
        <p className="mt-3 border-t border-gray-100 pt-3 text-sm leading-relaxed text-gray-700 dark:border-gray-800 dark:text-gray-300">
          {c.summary}
        </p>
      </div>

      <div className="flex flex-col gap-2 border-b border-gray-200 pb-2 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-2">
          <WorkflowTip
            title="Workspace tabs (preview)"
            body="Tab labels mirror FR packs — Documents, Decisions, Litigation, Audit — production RBAC would show only what each role may edit."
          />
          <div
            role="tablist"
            aria-label="Case workspace"
            className="flex flex-wrap gap-1 border-l border-gray-200 pl-3 dark:border-gray-600"
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
                  className={`cursor-pointer rounded-t-lg px-3 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:text-[13px] dark:focus-visible:ring-offset-gray-950 ${
                    selected
                      ? 'bg-blue-700 text-white shadow-sm ring-1 ring-blue-600/50 dark:bg-blue-600'
                      : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100'
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
