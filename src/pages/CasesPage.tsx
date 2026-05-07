import { Link } from 'react-router-dom'
import { SAMPLE_CASES } from '../data/sampleCases'
import { SlaBadge } from '../components/SlaBadge'
import { useRegisterCaseModal } from '../context/RegisterCaseContext'
import { WorkflowGuideBanner } from '../components/workflow/WorkflowGuideBanner'
import { WorkflowTip } from '../components/workflow/WorkflowTip'

export function CasesPage() {
  const { openRegister } = useRegisterCaseModal()
  return (
    <div className="space-y-6">
      <WorkflowGuideBanner pageId="cases" />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Cases queue</h1>
            <WorkflowTip
              title="Operational rhythm"
              body="Use this queue to prioritise statutory milestones across ministries — SLA badges mirror amber/overdue signals Compliance Officers rely on."
            />
          </div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
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
            className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-teal-800"
          >
            Register case
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {['All open', 'Mine', 'Escalated', 'With Decision App ref'].map((t, i) => (
          <button
            key={t}
            type="button"
            className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
              i === 0 ? 'bg-teal-700 text-white' : 'bg-white text-slate-700 ring-1 ring-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 dark:bg-slate-800/70 dark:text-slate-400">
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
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {SAMPLE_CASES.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-mono text-xs font-medium">
                    <Link to={`/cases/${c.id}`} className="text-teal-700 hover:underline dark:text-teal-400">
                      {c.reference}
                    </Link>
                  </td>
                  <td className="max-w-[220px] px-4 py-3 text-slate-700 dark:text-slate-300">{c.family}</td>
                  <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400">{c.ministry}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{c.stage}</td>
                  <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400">{c.nextDeadline}</td>
                  <td className="px-4 py-3">
                    <SlaBadge status={c.sla} />
                  </td>
                  <td className="px-4 py-3 text-xs">{c.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
