import { useMemo, useState } from 'react'
import { History } from 'lucide-react'
import type { ComplianceCase } from '../../../types'
import { WorkflowTip } from '../../../components/workflow/WorkflowTip'
import { DemoModeBadge } from '../../../components/DemoModeBadge'
import { DemoActionToast } from '../../../components/DemoActionToast'

export function AuditTab({ c }: { c: ComplianceCase }) {
  const [toast, setToast] = useState<string | null>(null)

  const rows = useMemo(
    () => [
      {
        when: '2026-05-06 · 14:22',
        actor: 'system',
        action: 'SLA evaluation job',
        detail: `Recomputed statutory posture for ${c.reference}`,
      },
      {
        when: '2026-05-05 · 09:03',
        actor: c.owner,
        action: 'Workspace viewed',
        detail: `Opened ${c.stage} · tabs logged`,
      },
      {
        when: '2026-05-02 · 16:41',
        actor: 'Commission clerk (demo)',
        action: 'Artefact superseded',
        detail: `Version bump on ${c.artefacts[0] ?? 'record'}`,
      },
      {
        when: '2026-04-28 · 11:18',
        actor: c.owner,
        action: 'Routing flag applied',
        detail: c.seniorExecutive ? 'FR-12 senior pathway tagged' : 'Standard employee pathway confirmed',
      },
    ],
    [c],
  )

  return (
    <div className="space-y-4">
      <DemoActionToast message={toast} />
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
          <h2 className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
            <History className="size-4 text-teal-600 dark:text-teal-400" aria-hidden />
            Immutable audit trail · FR-06
            <WorkflowTip
              title="Evidence-grade logging"
              body="Production CCMS would hash entries and restrict deletion — this grid illustrates read-only reviewer UX."
            />
          </h2>
          <DemoModeBadge />
        </div>
        <p className="border-b border-slate-100 px-4 py-2 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
          Showcase rows are illustrative; timestamps align with demo narrative only.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 dark:bg-slate-800/70 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Actor</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rows.map((r) => (
                <tr key={r.when + r.action} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-slate-600 dark:text-slate-400">
                    {r.when}
                  </td>
                  <td className="px-4 py-3 text-slate-800 dark:text-slate-200">{r.actor}</td>
                  <td className="px-4 py-3 font-medium text-teal-900 dark:text-teal-200">{r.action}</td>
                  <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400">{r.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-slate-100 px-4 py-3 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setToast(`CSV export mocked · ${rows.length} rows · ${c.reference}`)}
            className="cursor-pointer rounded-lg bg-white px-4 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-300 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600 dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-950"
          >
            Export audit excerpt (CSV · demo)
          </button>
        </div>
      </div>
    </div>
  )
}
