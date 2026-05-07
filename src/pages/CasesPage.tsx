import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SAMPLE_CASES } from '../data/sampleCases'
import { SlaBadge } from '../components/SlaBadge'
import { useRegisterCaseModal } from '../context/RegisterCaseContext'
import { WorkflowGuideBanner } from '../components/workflow/WorkflowGuideBanner'
import { WorkflowTip } from '../components/workflow/WorkflowTip'
import { AiAssistTrigger } from '../components/ai/AiAssistTrigger'
import { DemoModeBadge } from '../components/DemoModeBadge'
import { ScrollHint } from '../components/layout/ScrollHint'
import type { CasesQueueFilter } from '../lib/showcaseFilters'
import { filterCasesQueue } from '../lib/showcaseFilters'

const FACETS: { id: CasesQueueFilter; label: string }[] = [
  { id: 'all_open', label: 'All open' },
  { id: 'mine', label: 'Mine' },
  { id: 'escalated', label: 'Escalated' },
  { id: 'decision_app', label: 'With Decision App ref' },
]

export function CasesPage() {
  const { openRegister } = useRegisterCaseModal()
  const [facet, setFacet] = useState<CasesQueueFilter>('all_open')

  const rows = useMemo(() => filterCasesQueue(facet, SAMPLE_CASES), [facet])

  return (
    <div className="space-y-6">
      <WorkflowGuideBanner pageId="cases" />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cases queue</h1>
            <WorkflowTip
              title="Operational rhythm"
              body="Use this queue to prioritise statutory milestones across ministries — SLA badges mirror amber/overdue signals Compliance Officers rely on."
            />
          </div>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            FR-07 · six statutory families · SLA badges FR-03 · sample Vanuatu public service matters
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <WorkflowTip
            title="Cases-only intake"
            body="Register case opens the intake overlay from this queue — FR-01 capture plus routing preview (sidebar no longer exposes intake)."
          />
          <button
            type="button"
            onClick={() => openRegister()}
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950"
          >
            Register case
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <DemoModeBadge label="Demo · facet filters" />
          {FACETS.map(({ id, label }) => {
            const on = facet === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => setFacet(id)}
                aria-pressed={on}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950 ${
                  on
                    ? 'bg-blue-700 text-white'
                    : 'bg-white text-gray-700 ring-1 ring-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-600'
                }`}
              >
                {label}
              </button>
            )
          })}
          <span className="text-[11px] text-gray-500 dark:text-gray-400">{rows.length} matter(s)</span>
        </div>
        <AiAssistTrigger presetId="cases-queue" variant="subtle" />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="md:hidden">
          <ul className="divide-y divide-gray-100 dark:divide-gray-800">
            {rows.map((c) => (
              <li key={c.id} className="px-4 py-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <Link
                    to={`/cases/${c.id}`}
                    className="font-mono text-sm font-semibold text-blue-700 underline-offset-2 hover:underline dark:text-blue-400"
                  >
                    {c.reference}
                  </Link>
                  <SlaBadge status={c.sla} />
                </div>
                <p className="mt-1 text-xs text-gray-700 dark:text-gray-300">{c.family}</p>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">{c.ministry}</p>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">{c.stage}</p>
                <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-500">{c.nextDeadline}</p>
                <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">Owner: {c.owner}</p>
              </li>
            ))}
          </ul>
        </div>

        <ScrollHint className="hidden md:block" cueAboveMd>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-left text-sm">
              <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500 dark:bg-gray-800/70 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-3">Reference</th>
                  <th className="px-4 py-3">Family</th>
                  <th className="px-4 py-3">Ministry</th>
                  <th className="px-4 py-3">Stage</th>
                  <th className="px-4 py-3">Deadline</th>
                  <th className="px-4 py-3">SLA</th>
                  <th className="px-4 py-3">Owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {rows.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40">
                    <td className="px-4 py-3 font-mono text-xs font-medium">
                      <Link to={`/cases/${c.id}`} className="text-blue-700 hover:underline dark:text-blue-400">
                        {c.reference}
                      </Link>
                    </td>
                    <td className="max-w-[220px] px-4 py-3 text-gray-700 dark:text-gray-300">{c.family}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{c.ministry}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{c.stage}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{c.nextDeadline}</td>
                    <td className="px-4 py-3">
                      <SlaBadge status={c.sla} />
                    </td>
                    <td className="px-4 py-3 text-xs">{c.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollHint>
      </div>
    </div>
  )
}
