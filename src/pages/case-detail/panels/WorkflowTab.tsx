import { useState } from 'react'
import { Clock, FileText } from 'lucide-react'
import type { ComplianceCase } from '../../../types'
import { WorkflowTip } from '../../../components/workflow/WorkflowTip'
import { DemoModeBadge } from '../../../components/DemoModeBadge'
import { DemoActionToast } from '../../../components/DemoActionToast'

export function WorkflowTab({ c }: { c: ComplianceCase }) {
  const [toast, setToast] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <DemoActionToast message={toast} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 lg:col-span-2">
          <div className="flex flex-wrap items-center gap-2">
            <Clock className="size-4 text-teal-600 dark:text-teal-400" aria-hidden />
            <h2 className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
              Workflow checklist · FR-02 FR-03
              <WorkflowTip
                title="Statutory sequencing"
                body="Each gate corresponds to OPSC procedures — e.g. MDC week, panel 21 days, Commission confirmation 45 days from PSDB orders."
              />
            </h2>
            <DemoModeBadge />
          </div>
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
              onClick={() =>
                setToast(`Advance stage simulated · stays at “${c.stage}” in this showcase · ${c.reference}`)
              }
              className="cursor-pointer rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            >
              Advance stage (demo)
            </button>
            <button
              type="button"
              onClick={() => setToast(`Information request logged (preview) · ${c.reference}`)}
              className="cursor-pointer rounded-lg bg-white px-4 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-300 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600 dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-950"
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
            onClick={() => setToast(`Upload dialog mocked · artefact count unchanged · ${c.reference}`)}
            className="mt-4 w-full cursor-pointer rounded-lg bg-slate-900 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 dark:bg-teal-800 dark:hover:bg-teal-700 dark:focus-visible:ring-offset-slate-950"
          >
            Upload (demo)
          </button>
        </div>
      </div>
    </div>
  )
}
