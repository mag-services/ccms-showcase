import { useState } from 'react'
import { AiAssistTrigger } from './ai/AiAssistTrigger'
import { DemoActionToast } from './DemoActionToast'

/** Intake form body — used inside {@link RegisterCaseModal}. */
export function RegisterCaseForm() {
  const [toast, setToast] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <DemoActionToast message={toast} />

      <div className="rounded-xl border border-blue-200 bg-blue-50/80 p-4 text-sm text-blue-950 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-100">
        <strong>Optional:</strong> Linked Commission Decision App submission ref · pre-fills ministry &amp; form type · CCMS
        case detail never exposed to ministry users per §6.1 boundary.
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">A. Case facts</h2>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
            Case family
            <select className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-gray-100">
              <option>Employee Internal Disciplinary</option>
              <option>Serious Misconduct — Employee</option>
              <option>Temporary Suspension</option>
              <option>Grievance Process</option>
              <option>Senior Executive — Serious Misconduct</option>
              <option>Senior Executive — Poor Performance</option>
            </select>
          </label>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
            Subject &amp; ministry
            <input
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-gray-100"
              placeholder="Employee ID · ministry tree"
            />
          </label>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
            Initiating officer
            <input
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-gray-100"
              defaultValue="Compliance Unit officer"
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
              Date received
              <input
                type="date"
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-gray-100"
              />
            </label>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
              Channel
              <select className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-gray-100">
                <option>Email</option>
                <option>Walk-in</option>
                <option>Portal</option>
              </select>
            </label>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input type="checkbox" className="rounded border-gray-400 text-blue-600 dark:border-gray-500" />
            Subject is senior executive (DG / Dir / SG / Town Clerk / AG / Sec OPSC) · FR-12
          </label>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
            Narrative
            <textarea
              rows={4}
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-gray-100"
              placeholder="Summary · allegations · statutory refs"
            />
          </label>
          <div className="flex justify-end">
            <AiAssistTrigger presetId="register-intake" variant="subtle" />
          </div>
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-xs text-gray-500 dark:border-gray-600 dark:bg-gray-800/40 dark:text-gray-400">
            Drag PSC Form 6-1, notices, warnings (FR-04) · demo drop zone
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                setToast('Draft saved locally for demo — no backend persistence in this showcase.')
              }
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-600"
            >
              Save draft
            </button>
            <button
              type="button"
              onClick={() =>
                setToast(
                  'Validation simulated · routing preview refreshed · FR-02 pathway unchanged until Phase 2 APIs.',
                )
              }
              className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Validate &amp; route (demo)
            </button>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">B. Routing preview · FR-02</h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Read-only sequence recomputed from family + senior flag
          </p>
          <ol className="mt-6 space-y-4">
            {[
              'Intake registered · immutable CREATE FR-06',
              'MDC preliminary assessment · 5 working days',
              'Investigation panel · 21 days statutory',
              'Commission / PSDB decision capture FR-08',
              'Closure · litigation ledger if FR-13',
            ].map((step, i) => (
              <li key={step} className="flex gap-4 text-sm text-gray-700 dark:text-gray-300">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1 pt-1 leading-snug">{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-8 rounded-lg bg-amber-50 p-4 text-xs text-amber-950 ring-1 ring-amber-200 dark:bg-amber-950/25 dark:text-amber-100 dark:ring-amber-900">
            <strong>SLA watch:</strong> e.g. 3 calendar days from suspension notice for SMDR to staff; Commission 45-day
            confirmation for PSDB orders FR-03.
          </div>
        </section>
      </div>
    </div>
  )
}
