import { useState } from 'react'
import { Briefcase } from 'lucide-react'
import type { ComplianceCase } from '../../../types'
import { DemoModeBadge } from '../../../components/DemoModeBadge'
import { DemoActionToast } from '../../../components/DemoActionToast'

export function OverviewTab({ c }: { c: ComplianceCase }) {
  const routing = c.seniorExecutive ? 'Commission-level pathway (FR-12)' : 'Standard employee discipline / grievance routing'
  const channel =
    c.family === 'Grievance Process'
      ? 'PSC grievance referral · privileged mediation notes'
      : c.family.includes('Suspension')
        ? 'SMDR · PSC Form 6-1 statutory suspension pack'
        : 'Internal referral · DG / HR delegation'

  const [toast, setToast] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <DemoActionToast message={toast} />
      <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
            <Briefcase className="size-4 text-teal-600 dark:text-teal-400" aria-hidden />
            Matter snapshot
          </h2>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Case family
              </dt>
              <dd className="mt-1 font-medium text-slate-900 dark:text-white">{c.family}</dd>
            </div>
            <div className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Subject profile
              </dt>
              <dd className="mt-1 font-medium text-slate-900 dark:text-white">{c.subjectLabel}</dd>
            </div>
            <div className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Ministry account
              </dt>
              <dd className="mt-1 font-medium text-slate-900 dark:text-white">{c.ministry}</dd>
            </div>
            <div className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Statutory gate
              </dt>
              <dd className="mt-1 font-medium text-teal-900 dark:text-teal-200">{c.stage}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Routing & channel (preview)</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>
              <span className="font-medium text-slate-800 dark:text-slate-200">FR-02 pathway:</span> {routing}
            </li>
            <li>
              <span className="font-medium text-slate-800 dark:text-slate-200">Intake channel:</span> {channel}
            </li>
            {c.decisionAppRef ? (
              <li>
                <span className="font-medium text-slate-800 dark:text-slate-200">Decision App sync:</span>{' '}
                <span className="font-mono text-xs text-teal-800 dark:text-teal-300">{c.decisionAppRef}</span> — ministry
                sees status indicator only.
              </li>
            ) : null}
          </ul>
        </section>
      </div>

      <aside className="space-y-4">
        <section className="rounded-xl border border-amber-200/90 bg-amber-50/90 p-4 dark:border-amber-900/40 dark:bg-amber-950/25">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-950 dark:text-amber-100">
            SLA posture · FR-03
          </h3>
          <p className="mt-2 text-sm text-amber-950/90 dark:text-amber-50/90">{c.nextDeadline}</p>
          <p className="mt-2 text-xs leading-relaxed text-amber-900/80 dark:text-amber-100/80">
            Showcase badges mirror amber/overdue statutory windows — production CCMS would clock each gate from PSDB orders and panel milestones.
          </p>
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white">Quick actions (demo)</h3>
            <DemoModeBadge />
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setToast(`Briefing PDF queued (preview) · ${c.reference}`)}
              className="cursor-pointer rounded-lg bg-teal-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            >
              Generate briefing PDF
            </button>
            <button
              type="button"
              onClick={() => setToast(`Flagged for Commission agenda (preview) · ${c.reference}`)}
              className="cursor-pointer rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-300 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600 dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-950"
            >
              Flag for Commission agenda
            </button>
          </div>
        </section>
      </aside>
    </div>
    </div>
  )
}
