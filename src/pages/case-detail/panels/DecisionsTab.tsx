import { useState } from 'react'
import { Scale } from 'lucide-react'
import type { ComplianceCase } from '../../../types'
import { DemoModeBadge } from '../../../components/DemoModeBadge'
import { DemoActionToast } from '../../../components/DemoActionToast'

export function DecisionsTab({ c }: { c: ComplianceCase }) {
  const [toast, setToast] = useState<string | null>(null)
  const closed = c.stage.startsWith('Closed')
  const steps = closed
    ? [
        { label: 'Investigation / panel', state: 'done' as const },
        { label: 'Commission deliberation', state: 'done' as const },
        { label: 'Decision notice issued FR-08', state: 'done' as const },
      ]
    : [
        { label: 'Evidence & brief ready', state: 'done' as const },
        { label: 'Commission review window', state: 'current' as const },
        { label: 'Outcome sync to Decision App', state: 'pending' as const },
      ]

  return (
    <div className="space-y-4">
      <DemoActionToast message={toast} />
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 lg:col-span-2">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
              <Scale className="size-4 text-teal-600 dark:text-teal-400" aria-hidden />
              Decision pathway · FR-08
            </h2>
            <DemoModeBadge />
          </div>
          <ol className="mt-6 space-y-5">
            {steps.map((s) => (
              <li key={s.label} className="flex gap-4">
                <span
                  className={`mt-1.5 flex size-3 shrink-0 rounded-full ring-4 ring-white dark:ring-slate-900 ${
                    s.state === 'done'
                      ? 'bg-teal-600'
                      : s.state === 'current'
                        ? 'bg-amber-500'
                        : 'border-2 border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-900'
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{s.label}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {s.state === 'done'
                      ? 'Recorded in showcase dataset.'
                      : s.state === 'current'
                        ? `Aligned with current gate — ${c.stage}.`
                        : 'Triggers API boundary to Decision App when Commission publishes.'}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <aside className="space-y-4">
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Drafting aids (demo)
            </h3>
            <button
              type="button"
              onClick={() => setToast(`Decision template opened (preview) · ${c.reference}`)}
              className="mt-3 w-full cursor-pointer rounded-lg bg-teal-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            >
              Open decision template
            </button>
            <button
              type="button"
              onClick={() => setToast(`Legal review queue stub · ${c.reference}`)}
              className="mt-2 w-full cursor-pointer rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-300 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600 dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-950"
            >
              Request legal review
            </button>
          </section>
          {c.decisionAppRef ? (
            <section className="rounded-xl border border-teal-200/90 bg-teal-50/80 p-4 dark:border-teal-900/50 dark:bg-teal-950/25">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-teal-900 dark:text-teal-200">
                Linked tracker
              </p>
              <p className="mt-2 font-mono text-xs font-semibold text-teal-900 dark:text-teal-100">{c.decisionAppRef}</p>
              <p className="mt-2 text-xs leading-relaxed text-teal-900/85 dark:text-teal-100/85">
                §6.1 ministry-visible slice stays thin — outcomes propagate after Commission approval only.
              </p>
            </section>
          ) : null}
        </aside>
      </div>
    </div>
  )
}
