import { lazy, Suspense } from 'react'
import { FR_ROWS } from '../data/frRequirements'
import { WorkflowGuideBanner } from '../components/workflow/WorkflowGuideBanner'
import { WorkflowTip } from '../components/workflow/WorkflowTip'
import { AiAssistTrigger } from '../components/ai/AiAssistTrigger'
import { DemoModeBadge } from '../components/DemoModeBadge'
import { ScrollHint } from '../components/layout/ScrollHint'

const ReportsChartsPane = lazy(() => import('../components/ReportsChartsPane'))

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <WorkflowGuideBanner pageId="reports" />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports &amp; notifications</h1>
            <WorkflowTip
              title="Oversight pack"
              body="Pair charts with the FR matrix during Compliance workshops — each row ties Need Assessment language to visible UI affordances."
            />
          </div>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            FR-10 analytics · Highcharts (sample data) · FR-09 alert centre below
          </p>
        </div>
        <AiAssistTrigger presetId="reports-analytics" />
      </div>

      <Suspense
        fallback={
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="flex h-[304px] items-center justify-center rounded-xl border border-gray-200 bg-white text-sm text-gray-500 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
              Loading charts…
            </div>
            <div className="flex h-[304px] items-center justify-center rounded-xl border border-gray-200 bg-white text-sm text-gray-500 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
              Loading charts…
            </div>
          </div>
        }
      >
        <ReportsChartsPane />
      </Suspense>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-800">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Average time per stage · FR-10 (sample)</h2>
            <WorkflowTip
              title="Capacity signal"
              body="Rolling averages by case family expose where statutory clocks slip — useful for Secretary briefings and resource asks to the Commission."
            />
            <DemoModeBadge label="Demo · analytics seed" />
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Mock aggregates — production would compute from immutable stage-open timestamps in FR-06.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500 dark:bg-gray-800/70 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">Case family</th>
                <th className="px-4 py-3">Stage</th>
                <th className="px-4 py-3">Avg. elapsed</th>
                <th className="px-4 py-3">Statutory target (illustrative)</th>
                <th className="px-4 py-3">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {[
                ['Temporary Suspension', 'Suspension notice → SMDR', '2.1 cal days', '3 cal days', 'Twin timers from same trigger'],
                ['Temporary Suspension', 'Staff reply window', '2.4 cal days', '3 cal days', 'Concurrent lane'],
                ['Employee Internal Disciplinary', 'MDC preliminary assessment', '3.8 work days', '5 work days', 'FR-03 working-day pack'],
                ['Serious Misconduct — Employee', 'Investigation panel', '18 work days', '21 days panel clock', 'Closes on report upload + opens subject week'],
                ['Grievance Process', 'Mediation resolution', '8.2 work days', '10 work days', 'FR-11 · MoM gated on outcome'],
                ['Senior Executive — Serious Misconduct', 'Commission briefing → decision', '38 cal days', '45 cal days PSDB confirmation', 'Anchored to order date'],
              ].map(([family, stage, avg, target, notes]) => (
                <tr key={`${family}-${stage}`} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40">
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{family}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{stage}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-800 dark:text-gray-200">{avg}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{target}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-800">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Functional requirements seed backlog</h2>
            <WorkflowTip
              title="Traceability"
              body="Use this table to confirm FR coverage — Step 3 Concept Note will expand each line into acceptance criteria."
            />
            <AiAssistTrigger presetId="fr-backlog" variant="subtle" />
            <DemoModeBadge label="Demo · FR matrix" />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            From Need Assessment Brief §5 — maps to CCMS modules in this showcase
          </p>
        </div>

        <div className="md:hidden">
          <ul className="divide-y divide-gray-100 dark:divide-gray-800">
            {FR_ROWS.map(([id, text, hint]) => (
              <li key={id} className="px-4 py-3">
                <p className="font-mono text-xs font-semibold text-blue-800 dark:text-blue-300">{id}</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{text}</p>
                <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">{hint}</p>
              </li>
            ))}
          </ul>
        </div>

        <ScrollHint className="hidden md:block" cueAboveMd>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500 dark:bg-gray-800/70 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Requirement</th>
                  <th className="px-4 py-3">Showcase touchpoint</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {FR_ROWS.map(([id, text, hint]) => (
                  <tr key={id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40">
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-blue-800 dark:text-blue-300">{id}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{text}</td>
                    <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">{hint}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollHint>
      </div>

      <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/35">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h3 className="text-sm font-semibold text-red-950 dark:text-red-100">Alert centre FR-09 (mock)</h3>
          <AiAssistTrigger presetId="alerts-triage" variant="subtle" />
        </div>
        <ul className="mt-2 space-y-2 text-xs text-red-950 dark:text-red-100">
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
