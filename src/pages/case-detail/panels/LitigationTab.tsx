import { useState } from 'react'
import { ScrollText } from 'lucide-react'
import type { ComplianceCase } from '../../../types'
import { DemoModeBadge } from '../../../components/DemoModeBadge'
import { DemoActionToast } from '../../../components/DemoActionToast'

export function LitigationTab({ c }: { c: ComplianceCase }) {
  const [toast, setToast] = useState<string | null>(null)

  if (!c.litigation) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/80 p-10 text-center dark:border-slate-600 dark:bg-slate-900/40">
        <ScrollText className="mx-auto size-10 text-slate-400 dark:text-slate-500" aria-hidden />
        <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">No active litigation ledger</p>
        <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          FR-13 activates when judicial review or civil exposure is logged — this showcase matter remains an administrative discipline track only.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <DemoActionToast message={toast} />
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-rose-200 bg-rose-50/90 p-4 shadow-sm dark:border-rose-900/50 dark:bg-rose-950/30">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-rose-950 dark:text-rose-100">
            <ScrollText className="size-4 text-rose-700 dark:text-rose-300" aria-hidden />
            Exposure summary · FR-13
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-rose-950/90 dark:text-rose-50/90">
            <li>
              <strong>Matter:</strong> {c.reference} · senior executive cohort increases judicial scrutiny risk.
            </li>
            <li>
              <strong>Reserved estimate:</strong> VUV placeholder — cost centre tagged to IPDU legal liaison (demo figures).
            </li>
            <li>
              <strong>Council briefing:</strong> Next cycle slides would pull this card automatically.
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Counsel & filings (mock)
            </h3>
            <DemoModeBadge />
          </div>
          <table className="mt-3 w-full text-left text-xs">
            <thead className="text-[11px] font-semibold uppercase text-slate-500 dark:text-slate-400">
              <tr>
                <th className="py-2">Item</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-2 text-slate-700 dark:text-slate-300">JR notice · judicial review</td>
                <td className="py-2 font-medium text-amber-700 dark:text-amber-400">Filed · awaiting defence</td>
              </tr>
              <tr>
                <td className="py-2 text-slate-700 dark:text-slate-300">Legal hold on commission papers</td>
                <td className="py-2 font-medium text-teal-700 dark:text-teal-400">Active</td>
              </tr>
            </tbody>
          </table>
          <button
            type="button"
            onClick={() => setToast(`Counsel upload mocked · ${c.reference}`)}
            className="mt-4 w-full cursor-pointer rounded-lg bg-slate-900 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 dark:bg-rose-900 dark:hover:bg-rose-800 dark:focus-visible:ring-offset-slate-950"
          >
            Upload counsel correspondence (demo)
          </button>
        </section>
      </div>
    </div>
  )
}
