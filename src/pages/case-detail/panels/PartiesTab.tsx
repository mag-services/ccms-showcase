import { LandPlot, Users } from 'lucide-react'
import type { ComplianceCase } from '../../../types'
import { DemoModeBadge } from '../../../components/DemoModeBadge'

export function PartiesTab({ c }: { c: ComplianceCase }) {
  const complainantLabel =
    c.family === 'Grievance Process'
      ? 'Anonymous complainant · PSC referral'
      : 'Employing ministry / DG delegation'

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
            <Users className="size-4 text-blue-600 dark:text-blue-400" aria-hidden />
            Named actors
          </h2>
          <DemoModeBadge label="Demo · read-only" />
        </div>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4 border-b border-gray-100 pb-3 dark:border-gray-800">
            <dt className="text-gray-500 dark:text-gray-400">Subject</dt>
            <dd className="max-w-[60%] text-right font-medium text-gray-900 dark:text-white">{c.subjectLabel}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-gray-100 pb-3 dark:border-gray-800">
            <dt className="text-gray-500 dark:text-gray-400">Compliance owner</dt>
            <dd className="font-medium text-gray-900 dark:text-white">{c.owner}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-gray-100 pb-3 dark:border-gray-800">
            <dt className="text-gray-500 dark:text-gray-400">Ministry liaison</dt>
            <dd className="max-w-[60%] text-right text-gray-700 dark:text-gray-300">{c.ministry}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-gray-500 dark:text-gray-400">Counter-party / complainant channel</dt>
            <dd className="max-w-[55%] text-right text-xs leading-snug text-gray-700 dark:text-gray-300">
              {complainantLabel}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
          <LandPlot className="size-4 text-blue-600 dark:text-blue-400" aria-hidden />
          RBAC preview (demo)
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
          Production CCMS would hide mediation notes from ministry accounts and restrict Commission briefing packs to clerk / legal roles.
        </p>
        <ul className="mt-4 space-y-2 text-xs text-gray-700 dark:text-gray-300">
          <li className="rounded-lg bg-gray-50 px-3 py-2 ring-1 ring-gray-100 dark:bg-gray-800/50 dark:ring-gray-700">
            <strong className="text-gray-900 dark:text-white">Compliance Officer:</strong> full workspace tabs shown here.
          </li>
          <li className="rounded-lg bg-gray-50 px-3 py-2 ring-1 ring-gray-100 dark:bg-gray-800/50 dark:ring-gray-700">
            <strong className="text-gray-900 dark:text-white">Ministry HR:</strong> Decision App status + limited artefact list only.
          </li>
          <li className="rounded-lg bg-gray-50 px-3 py-2 ring-1 ring-gray-100 dark:bg-gray-800/50 dark:ring-gray-700">
            <strong className="text-gray-900 dark:text-white">Commission clerk:</strong> FR-08 drafting + FR-06 audit exports.
          </li>
        </ul>
      </section>
    </div>
  )
}
