import { lazy, Suspense, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SAMPLE_CASES } from '../data/sampleCases'
import { SlaBadge } from '../components/SlaBadge'
import { WorkflowGuideBanner } from '../components/workflow/WorkflowGuideBanner'
import { WorkflowTip } from '../components/workflow/WorkflowTip'
import { AiAssistTrigger } from '../components/ai/AiAssistTrigger'
import { DemoModeBadge } from '../components/DemoModeBadge'
import { ScrollHint } from '../components/layout/ScrollHint'
import type { DashboardSavedView } from '../lib/showcaseFilters'
import { filterForDashboardSavedView, isCaseOpen } from '../lib/showcaseFilters'

const DashboardChartsPane = lazy(() => import('../components/DashboardChartsPane'))

const VIEW_CHIPS: { id: DashboardSavedView; label: string }[] = [
  { id: 'open', label: 'Open' },
  { id: 'at_risk', label: 'At risk' },
  { id: 'due_focus', label: 'Due focus' },
]

export function DashboardPage() {
  const open = useMemo(() => SAMPLE_CASES.filter(isCaseOpen), [])
  const overdue = SAMPLE_CASES.filter((c) => c.sla === 'overdue').length
  const risk = SAMPLE_CASES.filter((c) => c.sla === 'at_risk').length
  const [savedView, setSavedView] = useState<DashboardSavedView>('open')

  const subset = useMemo(() => filterForDashboardSavedView(savedView, SAMPLE_CASES), [savedView])
  const attentionPreview = useMemo(() => subset.slice(0, 6), [subset])

  const viewLabel =
    savedView === 'open'
      ? 'All open matters'
      : savedView === 'at_risk'
        ? 'SLA at risk only'
        : 'Due focus (at risk + overdue)'

  return (
    <div className="space-y-6">
      <WorkflowGuideBanner pageId="dashboard" />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
            <WorkflowTip
              title="What am I looking at?"
              body="This is the Compliance Unit overview — KPI tiles summarise statutory urgency while themed charts below group workload analytics for stakeholder demos."
            />
          </div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            FR-07 caseload · FR-03 SLA · FR-10 analytics (Highcharts · sample data)
          </p>
        </div>
        <AiAssistTrigger presetId="dashboard-insights" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Saved views (demo)
        </span>
        <DemoModeBadge label="Demo · filters table" />
        <WorkflowTip
          title="Queue shortcuts"
          body="Chips now slice the “Cases needing attention” preview below — KPI tiles stay global for the showcase dataset."
        />
        <div className="flex flex-wrap items-center gap-2">
          {VIEW_CHIPS.map(({ id, label }) => {
            const on = savedView === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => setSavedView(id)}
                aria-pressed={on}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
                  on
                    ? 'bg-teal-700 text-white'
                    : 'bg-white text-slate-700 ring-1 ring-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          Active: <strong className="text-slate-800 dark:text-slate-200">{viewLabel}</strong> · {subset.length} rows
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          KPI snapshot
        </span>
        <WorkflowTip
          title="Tiles vs charts"
          body="Tiles emphasise breaches needing immediate action (FR-03). Charts underneath explore themes via tabs — switch tabs during Compliance walkthroughs."
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Open matters', value: open.length, hint: 'active stages' },
          { label: 'SLA at risk', value: risk, hint: 'amber queue' },
          { label: 'SLA overdue', value: overdue, hint: 'statutory breach' },
          { label: 'Litigation linked FR-13', value: SAMPLE_CASES.filter((c) => c.litigation).length, hint: 'cost ledger' },
        ].map((k) => (
          <div key={k.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{k.label}</p>
            <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{k.value}</p>
            <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">{k.hint}</p>
          </div>
        ))}
      </div>

      <Suspense
        fallback={
          <div className="h-[380px] animate-pulse rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-900" />
        }
      >
        <DashboardChartsPane />
      </Suspense>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Cases needing attention</h2>
            <WorkflowTip
              title="Next workflow hop"
              body="Each reference routes into the case workspace where Compliance progresses gateways, attaches PSC forms, and records Commission outcomes."
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Row links to case workspace · filtered by saved-view chip above (demo)
          </p>
        </div>

        <div className="md:hidden">
          <p className="px-4 pt-3 text-[11px] text-slate-500 dark:text-slate-400">
            Card layout on small screens — same data as desktop table.
          </p>
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {attentionPreview.map((c) => (
              <li key={c.id} className="px-4 py-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <Link
                    to={`/cases/${c.id}`}
                    className="font-mono text-sm font-semibold text-teal-700 underline-offset-2 hover:underline dark:text-teal-400"
                  >
                    {c.reference}
                  </Link>
                  <SlaBadge status={c.sla} />
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{c.family}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">{c.stage}</p>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">{c.nextDeadline}</p>
              </li>
            ))}
          </ul>
        </div>

        <ScrollHint className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 dark:bg-slate-800/70 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3">Reference</th>
                  <th className="px-4 py-3">Family</th>
                  <th className="px-4 py-3">Stage</th>
                  <th className="px-4 py-3">Next deadline</th>
                  <th className="px-4 py-3">SLA</th>
                  <th className="px-4 py-3">Owner</th>
                  <th className="px-4 py-3">Flags</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {attentionPreview.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-3 font-mono text-xs font-medium">
                      <Link to={`/cases/${c.id}`} className="text-teal-700 underline-offset-2 hover:underline dark:text-teal-400">
                        {c.reference}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{c.family}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{c.stage}</td>
                    <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400">{c.nextDeadline}</td>
                    <td className="px-4 py-3">
                      <SlaBadge status={c.sla} />
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400">{c.owner}</td>
                    <td className="px-4 py-3 text-xs">
                      {c.seniorExecutive && (
                        <span className="mr-1 rounded bg-violet-100 px-1.5 py-0.5 text-violet-900 dark:bg-violet-950/50 dark:text-violet-200">
                          SE FR-12
                        </span>
                      )}
                      {c.litigation && (
                        <span className="rounded bg-rose-100 px-1.5 py-0.5 text-rose-900 dark:bg-rose-950/50 dark:text-rose-200">
                          Litigation
                        </span>
                      )}
                      {!c.seniorExecutive && !c.litigation && '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollHint>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-4 py-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <span>
            Showing {attentionPreview.length} of {subset.length} in “{viewLabel}” ({open.length} open total)
          </span>
          <Link to="/cases" className="font-semibold text-teal-700 hover:underline dark:text-teal-400">
            View full queue
          </Link>
        </div>
      </div>
    </div>
  )
}
