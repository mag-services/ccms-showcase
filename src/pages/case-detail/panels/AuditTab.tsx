import { useMemo, useState } from 'react'
import { History } from 'lucide-react'
import type { ComplianceCase } from '../../../types'
import { WorkflowTip } from '../../../components/workflow/WorkflowTip'
import { DemoModeBadge } from '../../../components/DemoModeBadge'
import { DemoActionToast } from '../../../components/DemoActionToast'
import { ScrollHint } from '../../../components/layout/ScrollHint'

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
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 px-4 py-3 dark:border-gray-800">
          <h2 className="flex flex-wrap items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
            <History className="size-4 text-blue-600 dark:text-blue-400" aria-hidden />
            Immutable audit trail · FR-06
            <WorkflowTip
              title="Evidence-grade logging"
              body="Production CCMS would hash entries and restrict deletion — this grid illustrates read-only reviewer UX."
            />
          </h2>
          <DemoModeBadge />
        </div>
        <p className="border-b border-gray-100 px-4 py-2 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
          Showcase rows are illustrative; timestamps align with demo narrative only.
        </p>

        <div className="md:hidden">
          <ul className="divide-y divide-gray-100 dark:divide-gray-800">
            {rows.map((r) => (
              <li key={r.when + r.action} className="px-4 py-3">
                <p className="font-mono text-[11px] text-gray-500 dark:text-gray-400">{r.when}</p>
                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">{r.action}</p>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">{r.actor}</p>
                <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">{r.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        <ScrollHint className="hidden md:block px-0 pb-0" cueAboveMd>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500 dark:bg-gray-800/70 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">Actor</th>
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {rows.map((r) => (
                  <tr key={r.when + r.action} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40">
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-400">
                      {r.when}
                    </td>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{r.actor}</td>
                    <td className="px-4 py-3 font-medium text-blue-900 dark:text-blue-200">{r.action}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{r.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollHint>

        <div className="border-t border-gray-100 px-4 py-3 dark:border-gray-800">
          <button
            type="button"
            onClick={() => setToast(`CSV export mocked · ${rows.length} rows · ${c.reference}`)}
            className="cursor-pointer rounded-lg bg-white px-4 py-2 text-xs font-semibold text-gray-700 ring-1 ring-gray-300 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-600 dark:hover:bg-gray-700 dark:focus-visible:ring-offset-gray-950"
          >
            Export audit excerpt (CSV · demo)
          </button>
        </div>
      </div>
    </div>
  )
}
