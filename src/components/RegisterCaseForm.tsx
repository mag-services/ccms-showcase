/** Intake form body — used inside {@link RegisterCaseModal}. */
export function RegisterCaseForm() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-teal-200 bg-teal-50/80 p-4 text-sm text-teal-950 dark:border-teal-800 dark:bg-teal-950/30 dark:text-teal-100">
        <strong>Optional:</strong> Linked Commission Decision App submission ref · pre-fills ministry &amp; form type · CCMS
        case detail never exposed to ministry users per §6.1 boundary.
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">A. Case facts</h2>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
            Case family
            <select className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100">
              <option>Employee Internal Disciplinary</option>
              <option>Serious Misconduct — Employee</option>
              <option>Temporary Suspension</option>
              <option>Grievance Process</option>
              <option>Senior Executive — Serious Misconduct</option>
              <option>Senior Executive — Poor Performance</option>
            </select>
          </label>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
            Subject &amp; ministry
            <input
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
              placeholder="Employee ID · ministry tree"
            />
          </label>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
            Initiating officer
            <input
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
              defaultValue="Compliance Unit officer"
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              Date received
              <input
                type="date"
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
              />
            </label>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              Channel
              <select className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100">
                <option>Email</option>
                <option>Walk-in</option>
                <option>Portal</option>
              </select>
            </label>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <input type="checkbox" className="rounded border-slate-400 text-teal-600 dark:border-slate-500" />
            Subject is senior executive (DG / Dir / SG / Town Clerk / AG / Sec OPSC) · FR-12
          </label>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
            Narrative
            <textarea
              rows={4}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
              placeholder="Summary · allegations · statutory refs"
            />
          </label>
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-xs text-slate-500 dark:border-slate-600 dark:bg-slate-800/40 dark:text-slate-400">
            Drag PSC Form 6-1, notices, warnings (FR-04) · demo drop zone
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600"
            >
              Save draft
            </button>
            <button type="button" className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800">
              Validate &amp; route (demo)
            </button>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">B. Routing preview · FR-02</h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Read-only sequence recomputed from family + senior flag
          </p>
          <ol className="mt-6 space-y-4 border-l-2 border-teal-200 pl-6 dark:border-teal-800">
            {[
              'Intake registered · immutable CREATE FR-06',
              'MDC preliminary assessment · 5 working days',
              'Investigation panel · 21 days statutory',
              'Commission / PSDB decision capture FR-08',
              'Closure · litigation ledger if FR-13',
            ].map((step, i) => (
              <li key={step} className="relative text-sm text-slate-700 dark:text-slate-300">
                <span className="absolute -left-[1.35rem] flex size-6 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                  {i + 1}
                </span>
                {step}
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
