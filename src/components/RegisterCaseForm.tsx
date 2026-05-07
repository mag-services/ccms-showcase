import { useMemo, useState } from 'react'
import type { CaseFamily } from '../types'
import { AiAssistTrigger } from './ai/AiAssistTrigger'
import { DemoActionToast } from './DemoActionToast'
import { getFr02RoutingBundle, isSeniorExecutiveFamily, resolveSeniorExecutiveFlag } from '../data/intakeRoutingPaths'

const CASE_FAMILIES: CaseFamily[] = [
  'Employee Internal Disciplinary',
  'Serious Misconduct — Employee',
  'Temporary Suspension',
  'Grievance Process',
  'Senior Executive — Serious Misconduct',
  'Senior Executive — Poor Performance',
]

/** Intake form body — used inside {@link RegisterCaseModal}. */
export function RegisterCaseForm() {
  const [toast, setToast] = useState<string | null>(null)
  const [family, setFamily] = useState<CaseFamily>('Employee Internal Disciplinary')
  const [officerSeniorFlag, setOfficerSeniorFlag] = useState(false)
  const [decisionAppAutoCreate, setDecisionAppAutoCreate] = useState(false)
  const [pscFormRef, setPscFormRef] = useState('')

  const seniorLocked = isSeniorExecutiveFamily(family)
  const effectiveSenior = resolveSeniorExecutiveFlag(family, officerSeniorFlag)
  const routing = useMemo(() => getFr02RoutingBundle(family, officerSeniorFlag), [family, officerSeniorFlag])

  return (
    <div className="space-y-6">
      <DemoActionToast message={toast} />

      <div className="rounded-xl border border-blue-200 bg-blue-50/80 p-4 text-sm text-blue-950 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-100">
        <strong>Showcase only:</strong> No Django API or Decision App webhook runs here. The checkbox below illustrates §6.1 / FR-01 automatic case creation when PSC Form 6.x hits the Commission tracker — CCMS case narrative stays inside Compliance; ministry Decision App users see status indicators only.
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h3 className="text-xs font-semibold text-gray-900 dark:text-white">Commission Decision App · auto-intake (demo FR-01)</h3>
        <label className="mt-3 flex cursor-pointer items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={decisionAppAutoCreate}
            onChange={(e) => setDecisionAppAutoCreate(e.target.checked)}
            className="mt-1 rounded border-gray-400 text-blue-600 dark:border-gray-500"
          />
          <span>
            Simulate webhook: create CCMS shell when PSC Form 6.x registers in the Decision App tracker (Section 6.1).
          </span>
        </label>
        <label className="mt-3 block text-xs font-medium text-gray-700 dark:text-gray-300">
          PSC Form 6.x / tracker reference
          <input
            value={pscFormRef}
            onChange={(e) => setPscFormRef(e.target.value)}
            placeholder="e.g. PSC-DISC-2026-00901 · Form 6-4"
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-gray-100"
          />
        </label>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">A. Case facts</h2>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
            Case family · drives FR-02 route key
            <select
              value={family}
              onChange={(e) => setFamily(e.target.value as CaseFamily)}
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-gray-100"
            >
              {CASE_FAMILIES.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
            Subject employee
            <input
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-gray-100"
              placeholder="Employee ID · name / initials per policy"
            />
          </label>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
            Ministry / department
            <input
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-gray-100"
              placeholder="Organisation unit · cost centre"
            />
          </label>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
            Initiating officer
            <input
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-gray-100"
              defaultValue="Compliance Unit officer"
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
              Date received
              <input
                type="date"
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-gray-100"
              />
            </label>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
              Channel
              <select className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-gray-100">
                <option>Email</option>
                <option>Walk-in</option>
                <option>Portal</option>
              </select>
            </label>
          </div>
          <label className={`flex items-start gap-2 text-sm ${seniorLocked ? 'text-gray-500 dark:text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>
            <input
              type="checkbox"
              checked={effectiveSenior}
              disabled={seniorLocked}
              onChange={(e) => setOfficerSeniorFlag(e.target.checked)}
              className="mt-0.5 rounded border-gray-400 text-blue-600 disabled:opacity-60 dark:border-gray-500"
            />
            <span>
              Subject is senior executive (DG / Dir / SG / Town Clerk / AG / Sec OPSC) · <strong className="font-semibold">FR-12</strong>
              {seniorLocked ? (
                <span className="mt-1 block text-[11px] font-normal text-amber-800 dark:text-amber-200">
                  Locked on — statutory senior executive families always carry FR-12 in the data model.
                </span>
              ) : null}
            </span>
          </label>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
            Narrative
            <textarea
              rows={4}
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950 dark:text-gray-100"
              placeholder="Summary · allegations · statutory refs"
            />
          </label>
          <div className="flex justify-end">
            <AiAssistTrigger presetId="register-intake" variant="subtle" />
          </div>
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-xs text-gray-500 dark:border-gray-600 dark:bg-gray-800/40 dark:text-gray-400">
            Initial attachments · PSC forms, notices, warnings (FR-04) · demo drop zone
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                setToast('Draft saved locally for demo — no backend persistence in this showcase.')
              }
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-600"
            >
              Save draft
            </button>
            <button
              type="button"
              onClick={() => {
                if (decisionAppAutoCreate && !pscFormRef.trim()) {
                  setToast('Decision App auto-intake selected — enter a PSC Form 6.x / tracker reference (demo validation).')
                  return
                }
                const webhook = decisionAppAutoCreate
                  ? ` §6.1 webhook simulated · ref ${pscFormRef.trim()} · FR-01 shell created.`
                  : ''
                setToast(
                  `Validated · pathway “${routing.pathwayKey}” · FR-02 steps locked from family + FR-12=${effectiveSenior}.${webhook}`,
                )
              }}
              className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Validate &amp; route (demo)
            </button>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">B. Routing preview · FR-02</h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Read-only sequence from data-layer route bundle — not officer judgement.
          </p>
          <p className="mt-3 rounded-lg bg-gray-50 px-3 py-2 text-[11px] leading-snug text-gray-700 ring-1 ring-gray-100 dark:bg-gray-800/60 dark:text-gray-300 dark:ring-gray-700">
            <strong className="text-gray-900 dark:text-white">{routing.pathwayTitle}</strong>
            <span className="mt-1 block font-mono text-[10px] text-gray-500 dark:text-gray-400">route:{routing.pathwayKey}</span>
          </p>
          <p className="mt-3 text-xs leading-relaxed text-gray-600 dark:text-gray-400">{routing.dataLayerNote}</p>
          <ol className="mt-6 space-y-4">
            {routing.steps.map((step, i) => (
              <li key={`${step.title}-${i}`} className="flex gap-4 text-sm text-gray-700 dark:text-gray-300">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1 pt-1 leading-snug">
                  {step.title}
                  {step.slaCue ? (
                    <span className="mt-1 block text-[11px] font-normal text-gray-500 dark:text-gray-400">{step.slaCue}</span>
                  ) : null}
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-6 rounded-lg bg-indigo-50 p-4 text-xs text-indigo-950 ring-1 ring-indigo-200 dark:bg-indigo-950/25 dark:text-indigo-100 dark:ring-indigo-900">
            <p className="font-semibold text-indigo-900 dark:text-indigo-50">Workflow automations (design cues)</p>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              {routing.automationNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4 rounded-lg bg-amber-50 p-4 text-xs text-amber-950 ring-1 ring-amber-200 dark:bg-amber-950/25 dark:text-amber-100 dark:ring-amber-900">
            <strong>SLA engine:</strong> deadlines attach when each stage opens or when instrumented actions fire — calendar vs working days live on the stage definition (FR-03).
          </div>
        </section>
      </div>
    </div>
  )
}
