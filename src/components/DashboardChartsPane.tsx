import { useState } from 'react'
import {
  DashboardDecisionAppColumn,
  DashboardExecutiveMix,
  DashboardFamilyBar,
  DashboardIllustrativeTrend,
  DashboardLitigationPie,
  DashboardMinistryBar,
  DashboardOpenVsClosed,
  DashboardOwnerBar,
  DashboardSlaDonut,
  DashboardSlaStackByFamily,
  DashboardStageBar,
} from './DashboardCharts'

const CHART_TABS = [
  {
    id: 'caseload',
    label: 'Caseload & origins',
    hint: 'Pipeline volume, family mix, ministries, and owner workload — how matters enter and distribute across the unit.',
    content: (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
        <DashboardOpenVsClosed />
        <DashboardFamilyBar />
        <DashboardMinistryBar />
        <DashboardOwnerBar />
      </div>
    ),
  },
  {
    id: 'workflow',
    label: 'Workflow routing',
    hint: 'Current gate/stage distribution and senior-executive (FR-12) pathways versus standard employee workflows.',
    content: (
      <div className="grid gap-4 lg:grid-cols-2">
        <DashboardStageBar />
        <DashboardExecutiveMix />
      </div>
    ),
  },
  {
    id: 'sla',
    label: 'SLA & timeframes',
    hint: 'Statutory posture (FR-03), SLA composition by family, and an illustrative intake trend for briefing only.',
    content: (
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <DashboardSlaDonut />
          <DashboardIllustrativeTrend />
        </div>
        <DashboardSlaStackByFamily />
      </div>
    ),
  },
  {
    id: 'oversight',
    label: 'Oversight & linkage',
    hint: 'Commission Decision App visibility (§6.1) and litigation / cost exposure (FR-13) for closed-case legal risk.',
    content: (
      <div className="grid gap-4 sm:grid-cols-2">
        <DashboardDecisionAppColumn />
        <DashboardLitigationPie />
      </div>
    ),
  },
] as const

type TabId = (typeof CHART_TABS)[number]['id']

/** Themed chart groups — horizontal tabs for Compliance showcase walkthroughs. */
export default function DashboardChartsPane() {
  const [active, setActive] = useState<TabId>('caseload')
  const current = CHART_TABS.find((t) => t.id === active) ?? CHART_TABS[0]

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="border-b border-slate-200 bg-slate-50/80 px-2 pt-2 dark:border-slate-800 dark:bg-slate-950/50 sm:px-4">
        <div
          role="tablist"
          aria-label="Dashboard chart themes"
          className="flex gap-1 overflow-x-auto pb-px [-webkit-overflow-scrolling:touch]"
        >
          {CHART_TABS.map((tab) => {
            const selected = tab.id === active
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`dashboard-tab-${tab.id}`}
                id={`dashboard-tab-trigger-${tab.id}`}
                onClick={() => setActive(tab.id)}
                className={`relative shrink-0 cursor-pointer whitespace-nowrap rounded-t-lg px-3 py-2.5 text-xs font-semibold transition sm:px-4 sm:text-sm ${
                  selected
                    ? 'bg-teal-700 text-white shadow-sm ring-1 ring-teal-600/40 dark:bg-teal-600 dark:text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>
      <div
        role="tabpanel"
        id={`dashboard-tab-${current.id}`}
        aria-labelledby={`dashboard-tab-trigger-${current.id}`}
        className="p-4 sm:p-5"
      >
        <p className="mb-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{current.hint}</p>
        {current.content}
      </div>
    </div>
  )
}
