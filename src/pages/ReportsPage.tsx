import { lazy, Suspense } from 'react'
import { FR_ROWS } from '../data/frRequirements'
import { WorkflowGuideBanner } from '../components/workflow/WorkflowGuideBanner'
import { WorkflowTip } from '../components/workflow/WorkflowTip'
import { AiAssistTrigger } from '../components/ai/AiAssistTrigger'

const ReportsChartsPane = lazy(() => import('../components/ReportsChartsPane'))

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <WorkflowGuideBanner pageId="reports" />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Reports &amp; notifications</h1>
            <WorkflowTip
              title="Oversight pack"
              body="Pair charts with the FR matrix during Compliance workshops — each row ties Need Assessment language to visible UI affordances."
            />
          </div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            FR-10 analytics · Highcharts (sample data) · FR-09 alert centre below
          </p>
        </div>
        <AiAssistTrigger presetId="reports-analytics" />
      </div>

      <Suspense
        fallback={
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="flex h-[304px] items-center justify-center rounded-xl border border-slate-200 bg-white text-sm text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
              Loading charts…
            </div>
            <div className="flex h-[304px] items-center justify-center rounded-xl border border-slate-200 bg-white text-sm text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
              Loading charts…
            </div>
          </div>
        }
      >
        <ReportsChartsPane />
      </Suspense>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Functional requirements seed backlog</h2>
            <WorkflowTip
              title="Traceability"
              body="Use this table to confirm FR coverage — Step 3 Concept Note will expand each line into acceptance criteria."
            />
            <AiAssistTrigger presetId="fr-backlog" variant="subtle" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">From Need Assessment Brief §5 — maps to CCMS modules in this showcase</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 dark:bg-slate-800/70 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Requirement</th>
                <th className="px-4 py-3">Showcase touchpoint</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {FR_ROWS.map(([id, text, hint]) => (
                <tr key={id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-teal-800 dark:text-teal-300">{id}</td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{text}</td>
                  <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400">{hint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900 dark:bg-rose-950/35">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h3 className="text-sm font-semibold text-rose-950 dark:text-rose-100">Alert centre FR-09 (mock)</h3>
          <AiAssistTrigger presetId="alerts-triage" variant="subtle" />
        </div>
        <ul className="mt-2 space-y-2 text-xs text-rose-950 dark:text-rose-100">
          <li>
            <strong>Critical:</strong> SLA breach window · CCMS-2026-0081 · escalate Commission clerk
          </li>
          <li>
            <strong>Warning:</strong> Grievance mediation Day 8/10 · CCMS-2026-0099
          </li>
          <li>
            <strong>Info:</strong> New SMDR routed · awaiting triage queue
          </li>
        </ul>
      </div>
    </div>
  )
}
