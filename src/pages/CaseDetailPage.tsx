import { Link, useParams } from 'react-router-dom'
import { getCaseById } from '../data/sampleCases'
import { SlaBadge } from '../components/SlaBadge'
import { FileText, Link2, Clock, ShieldAlert } from 'lucide-react'

export function CaseDetailPage() {
  const { id } = useParams<{ id: string }>()
  const c = id ? getCaseById(id) : undefined

  if (!c) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <p className="text-slate-600 dark:text-slate-400">Case not found in showcase dataset.</p>
        <Link to="/cases" className="mt-4 inline-block font-semibold text-teal-700 hover:underline dark:text-teal-400">
          Back to queue
        </Link>
      </div>
    )
  }

  const tabs = ['Overview', 'Workflow', 'Documents FR-04', 'Parties', 'Decisions FR-08', 'Litigation FR-13', 'Audit FR-06']

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-teal-800 dark:text-teal-400">
            <Link to="/cases" className="hover:underline">
              Cases
            </Link>{' '}
            / {c.reference}
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{c.reference}</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">{c.family}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <SlaBadge status={c.sla} />
          {c.seniorExecutive && (
            <span className="rounded-md bg-violet-100 px-2 py-1 text-xs font-semibold text-violet-900 ring-1 ring-violet-200 dark:bg-violet-950/50 dark:text-violet-200 dark:ring-violet-800">
              Senior executive FR-12
            </span>
          )}
          {c.litigation && (
            <span className="rounded-md bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-900 ring-1 ring-rose-200 dark:bg-rose-950/50 dark:text-rose-200 dark:ring-rose-800">
              Litigation FR-13
            </span>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Clock className="size-4 text-slate-400 dark:text-slate-500" aria-hidden />
            <span>
              <span className="font-medium text-slate-800 dark:text-slate-200">Next:</span> {c.nextDeadline}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <ShieldAlert className="size-4 text-slate-400 dark:text-slate-500" aria-hidden />
            <span>
              Owner <strong className="text-slate-900 dark:text-white">{c.owner}</strong>
            </span>
          </div>
          {c.decisionAppRef && (
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Link2 className="size-4 text-teal-600 dark:text-teal-400" aria-hidden />
              <span>
                Decision App ref{' '}
                <span className="font-mono text-xs font-semibold text-teal-800 dark:text-teal-300">{c.decisionAppRef}</span>{' '}
                <span className="text-xs text-slate-500 dark:text-slate-400">(ministry blind boundary §6.1)</span>
              </span>
            </div>
          )}
        </div>
        <p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-relaxed text-slate-700 dark:border-slate-800 dark:text-slate-300">
          {c.summary}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2 dark:border-slate-700">
        {tabs.map((t, i) => (
          <button
            key={t}
            type="button"
            className={`rounded-t-lg px-3 py-2 text-xs font-semibold ${
              i === 1
                ? 'bg-teal-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 lg:col-span-2">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
            <Clock className="size-4 text-teal-600 dark:text-teal-400" aria-hidden />
            Workflow checklist · FR-02 FR-03
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex gap-2">
              <span className="text-teal-600">✓</span> Intake registered FR-01
            </li>
            <li className="flex gap-2">
              <span className="text-teal-600">✓</span> Artefacts version-stacked FR-04
            </li>
            <li className="flex gap-2">
              <span className="text-amber-600">◷</span> Current stage: <strong>{c.stage}</strong>
            </li>
            <li className="flex gap-2">
              <span className="text-slate-400">○</span> Next statutory gateway unlocked after approvals
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            <button type="button" className="rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white">
              Advance stage (demo)
            </button>
            <button type="button" className="rounded-lg bg-white px-4 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600">
              Request information
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
            <FileText className="size-4 text-teal-600 dark:text-teal-400" aria-hidden />
            Artefacts
          </h2>
          <ul className="mt-3 space-y-2 text-xs text-slate-700 dark:text-slate-300">
            {c.artefacts.map((a) => (
              <li key={a} className="rounded-md bg-slate-50 px-2 py-1.5 ring-1 ring-slate-100 dark:bg-slate-800/60 dark:ring-slate-700">
                {a}
              </li>
            ))}
          </ul>
          <button type="button" className="mt-4 w-full rounded-lg bg-slate-900 py-2 text-xs font-semibold text-white dark:bg-teal-800 dark:hover:bg-teal-700">
            Upload (demo)
          </button>
        </div>
      </div>
    </div>
  )
}
