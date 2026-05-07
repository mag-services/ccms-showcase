import { useState } from 'react'
import { Download, Eye, FileText } from 'lucide-react'
import type { ComplianceCase } from '../../../types'
import { DemoModeBadge } from '../../../components/DemoModeBadge'
import { DemoActionToast } from '../../../components/DemoActionToast'

export function DocumentsTab({ c }: { c: ComplianceCase }) {
  const [toast, setToast] = useState<string | null>(null)

  return (
    <div className="space-y-3">
      <DemoActionToast message={toast} />
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
          <h2 className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
            <FileText className="size-4 text-teal-600 dark:text-teal-400" aria-hidden />
            Document register · FR-04
          </h2>
          <DemoModeBadge />
        </div>
        <p className="border-b border-slate-100 px-4 py-2 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
          Immutability after Commission publication — demo grid shows versioning UX only.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 dark:bg-slate-800/70 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3">Document</th>
                <th className="px-4 py-3">Version</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Retention</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {c.artefacts.map((label, i) => {
                const version = `v1.${i + 1}`
                const last = i === c.artefacts.length - 1
                const status = last ? 'Draft / in circulation' : 'Immutable · superseded'
                return (
                  <tr key={label} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{label}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600 dark:text-slate-400">{version}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${
                          last
                            ? 'bg-amber-50 text-amber-950 ring-amber-200 dark:bg-amber-950/35 dark:text-amber-100 dark:ring-amber-800'
                            : 'bg-teal-50 text-teal-900 ring-teal-200 dark:bg-teal-950/40 dark:text-teal-100 dark:ring-teal-800'
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400">Permanent · statutory file</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setToast(`Viewer mocked · ${label}`)}
                          className="inline-flex cursor-pointer items-center gap-1 rounded-md bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600 dark:hover:bg-slate-700"
                        >
                          <Eye className="size-3.5" aria-hidden />
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => setToast(`PDF export mocked · ${label}`)}
                          className="inline-flex cursor-pointer items-center gap-1 rounded-md bg-teal-700 px-2 py-1 text-[11px] font-semibold text-white transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                        >
                          <Download className="size-3.5" aria-hidden />
                          PDF
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
