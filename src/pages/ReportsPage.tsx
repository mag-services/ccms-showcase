import { lazy, Suspense } from 'react'
import { FR_ROWS } from '../data/frRequirements'

const ReportsChartsPane = lazy(() => import('../components/ReportsChartsPane'))

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Reports &amp; notifications</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          FR-10 analytics · Highcharts (sample data) · FR-09 alert centre below
        </p>
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
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Functional requirements seed backlog</h2>
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
        <h3 className="text-sm font-semibold text-rose-950 dark:text-rose-100">Alert centre FR-09 (mock)</h3>
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
