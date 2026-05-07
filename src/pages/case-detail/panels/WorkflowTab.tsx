import { useMemo, useState } from 'react'
import { Clock, FileText } from 'lucide-react'
import type { ComplianceCase } from '../../../types'
import { WorkflowTip } from '../../../components/workflow/WorkflowTip'
import { DemoModeBadge } from '../../../components/DemoModeBadge'
import { DemoActionToast } from '../../../components/DemoActionToast'
import { getFr02RoutingBundle } from '../../../data/intakeRoutingPaths'
import {
  checklistCompletion,
  checklistItemSatisfied,
  checklistItemsForCase,
} from '../../../lib/workflowStageChecklist'

export function WorkflowTab({ c }: { c: ComplianceCase }) {
  const [toast, setToast] = useState<string | null>(null)
  const checklistItems = useMemo(() => checklistItemsForCase(c), [c])
  const checklistOk = useMemo(() => checklistCompletion(checklistItems, c), [checklistItems, c])
  const routing = useMemo(() => getFr02RoutingBundle(c.family, c.seniorExecutive), [c.family, c.seniorExecutive])

  const showPanelRelease =
    c.family === 'Serious Misconduct — Employee' ||
    c.stage.toLowerCase().includes('panel') ||
    c.artefacts.some((a) => a.toLowerCase().includes('panel'))

  const releasePanelReport = () => {
    const ts = new Date().toISOString()
    const actor = 'Compliance Officer (demo persona)'
    setToast(
      `FR-06 · Investigation panel report released to subject · actor=${actor} · utc=${ts} · ${c.reference}`,
    )
  }

  const advanceStage = () => {
    if (!checklistOk) {
      setToast(
        `Stage advance blocked (demo): complete checklist artefacts — production would enforce FR-04 gates before gateway advance · ${c.reference}`,
      )
      return
    }
    setToast(`Advance stage simulated · stays at “${c.stage}” in this showcase · ${c.reference}`)
  }

  return (
    <div className="space-y-4">
      <DemoActionToast message={toast} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900 lg:col-span-2">
          <div className="flex flex-wrap items-center gap-2">
            <Clock className="size-4 text-blue-600 dark:text-blue-400" aria-hidden />
            <h2 className="flex flex-wrap items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
              Workflow checklist · FR-02 FR-03
              <WorkflowTip
                title="Statutory sequencing"
                body="Each gate corresponds to OPSC procedures — e.g. MDC week, panel 21 days, Commission confirmation 45 days from PSDB orders."
              />
            </h2>
            <DemoModeBadge />
          </div>

          <div className="mt-4 rounded-lg border border-gray-100 bg-gray-50/80 p-3 dark:border-gray-700 dark:bg-gray-800/40">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Stage document checklist (demo)
            </p>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              Keywords matched against artefact labels — production loads rules per stage definition; attachments are version-stacked for FR-06.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {checklistItems.map((item) => {
                const ok = checklistItemSatisfied(item, c)
                return (
                  <li key={item.id} className="flex gap-2">
                    <span className={ok ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}>
                      {ok ? '✓' : '⚠'}
                    </span>
                    <span className="min-w-0 flex-1 leading-snug">
                      {item.label}
                      {!ok ? (
                        <span className="mt-0.5 block text-[11px] text-amber-800 dark:text-amber-200">
                          Missing keyword match in artefacts — advance blocked until resolved (showcase behaviour).
                        </span>
                      ) : null}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex gap-2">
              <span className="text-blue-600 dark:text-blue-400">✓</span> Intake registered FR-01
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 dark:text-blue-400">✓</span> Artefacts version-stacked FR-04
            </li>
            <li className="flex gap-2">
              <span className="text-amber-600 dark:text-amber-400">◷</span> Current stage: <strong>{c.stage}</strong>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400 dark:text-gray-500">○</span> Next statutory gateway unlocked after approvals
            </li>
          </ul>

          <div className="mt-4 rounded-lg border border-indigo-100 bg-indigo-50/90 p-3 text-xs text-indigo-950 dark:border-indigo-900 dark:bg-indigo-950/30 dark:text-indigo-100">
            <p className="font-semibold text-indigo-900 dark:text-indigo-50">Automation triggers · {routing.pathwayKey}</p>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              {routing.automationNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={advanceStage}
              className="cursor-pointer rounded-lg bg-blue-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950"
            >
              Advance stage (demo)
            </button>
            <button
              type="button"
              onClick={() => setToast(`Information request logged (preview) · ${c.reference}`)}
              className="cursor-pointer rounded-lg bg-white px-4 py-2 text-xs font-semibold text-gray-700 ring-1 ring-gray-300 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-600 dark:hover:bg-gray-700 dark:focus-visible:ring-offset-gray-950"
            >
              Request information
            </button>
            {showPanelRelease ? (
              <button
                type="button"
                onClick={releasePanelReport}
                className="cursor-pointer rounded-lg bg-indigo-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950"
              >
                Release panel report to subject (audited)
              </button>
            ) : null}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <h2 className="flex flex-wrap items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
            <FileText className="size-4 text-blue-600 dark:text-blue-400" aria-hidden />
            Artefacts
            <WorkflowTip
              title="Forms bundle"
              body="PSC Forms 6-1/6-4/6.8 and notices attach once — immutable versioning preserves judicial-review readiness."
            />
          </h2>
          <ul className="mt-3 space-y-2 text-xs text-gray-700 dark:text-gray-300">
            {c.artefacts.map((a) => (
              <li
                key={a}
                className="rounded-md bg-gray-50 px-2 py-1.5 ring-1 ring-gray-100 dark:bg-gray-800/60 dark:ring-gray-700"
              >
                {a}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setToast(`Upload dialog mocked · artefact count unchanged · ${c.reference}`)}
            className="mt-4 w-full cursor-pointer rounded-lg bg-gray-900 py-2 text-xs font-semibold text-white transition hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 dark:bg-blue-800 dark:hover:bg-blue-700 dark:focus-visible:ring-offset-gray-950"
          >
            Upload (demo)
          </button>
        </div>
      </div>
    </div>
  )
}
