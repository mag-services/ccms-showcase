import { useEffect, useId, useRef, useState } from 'react'
import { Loader2, Sparkles, X } from 'lucide-react'
import type { AiAssistPresetId } from '../../data/aiAssistPresets'
import { AI_ASSIST_PRESETS } from '../../data/aiAssistPresets'
import { useTourDensity } from '../../context/TourDensityContext'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { useRestoreFocus } from '../../hooks/useRestoreFocus'

type Variant = 'primary' | 'subtle'

const AI_POLICY_FOOTER =
  'Policy pack · CCMS-AI-DRAFT-01 · Model: governed stub (no inference) · Region: VU on-prem target · Retention: 24mo audit corpus FR-06 · PII redaction required before prod.'

const POLICY_BLOCK_REPLY = [
  '**Request blocked · classification rule (demo)**',
  '',
  'Privileged mediation notes (FR-11 / PSC Form 6.8) cannot leave the Compliance secure partition without clerk approval.',
  '',
  '**Suggested alternative:**',
  'Ask for a statutorily safe summary — milestones, day-counts, and non-content routing flags only — then rerun.',
].join('\n')

const POLICY_CAPABLE: ReadonlySet<AiAssistPresetId> = new Set(['case-workspace', 'reports-analytics', 'dashboard-insights'])

export function AiAssistTrigger({
  presetId,
  extraContext,
  variant = 'primary',
}: {
  presetId: AiAssistPresetId
  /** Extra lines injected into mock replies (e.g. case reference). */
  extraContext?: readonly string[]
  variant?: Variant
}) {
  const { density } = useTourDensity()
  const preset = AI_ASSIST_PRESETS[presetId]
  const dialogTitleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [reply, setReply] = useState<string | null>(null)
  const [simulatePolicyBlock, setSimulatePolicyBlock] = useState(false)

  useRestoreFocus(open)
  useFocusTrap(panelRef, open)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  function close() {
    setOpen(false)
    setReply(null)
    setSimulatePolicyBlock(false)
  }

  function runGenerate() {
    setLoading(true)
    setReply(null)
    const delayMs = 420 + Math.floor(Math.random() * 980)
    window.setTimeout(() => {
      if (simulatePolicyBlock && POLICY_CAPABLE.has(presetId)) {
        setReply(POLICY_BLOCK_REPLY)
      } else {
        setReply(preset.buildMockReply(prompt, extraContext))
      }
      setLoading(false)
    }, delayMs)
  }

  if (density === 'compact') return null

  const btnBase =
    variant === 'primary'
      ? 'inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-teal-700 px-3 py-2 text-xs font-semibold text-white shadow-md ring-1 ring-white/15 transition hover:from-violet-500 hover:to-teal-600 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 dark:ring-white/10 dark:focus-visible:ring-offset-slate-950'
      : 'inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-[11px] font-semibold text-violet-900 ring-1 ring-violet-200 transition hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 dark:bg-slate-800 dark:text-violet-200 dark:ring-violet-800 dark:hover:bg-violet-950/40 dark:focus-visible:ring-offset-slate-950'

  return (
    <>
      <button
        type="button"
        className={btnBase}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        <Sparkles className="size-3.5 shrink-0 opacity-90" aria-hidden />
        {preset.buttonLabel}
      </button>

      {open ? (
        <div className="fixed inset-0 z-[120] flex items-end justify-center p-4 sm:items-center" role="presentation">
          <button
            type="button"
            className="absolute inset-0 cursor-pointer bg-slate-950/55 backdrop-blur-[2px]"
            aria-label="Close AI assistant"
            onClick={close}
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            className="relative z-[121] flex max-h-[min(90vh,40rem)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-violet-600/10 via-teal-600/10 to-transparent px-4 py-3 dark:border-slate-800">
              <div className="min-w-0">
                <p id={dialogTitleId} className="text-sm font-bold text-slate-900 dark:text-white">
                  {preset.modalTitle}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{preset.description}</p>
              </div>
              <button
                type="button"
                className="cursor-pointer rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                aria-label="Close"
                onClick={close}
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Natural-language instruction
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  placeholder={preset.placeholder}
                  className="mt-1 w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/25 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
              </label>

              {POLICY_CAPABLE.has(presetId) ? (
                <label className="flex cursor-pointer items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <input
                    type="checkbox"
                    checked={simulatePolicyBlock}
                    onChange={(e) => setSimulatePolicyBlock(e.target.checked)}
                    className="mt-0.5 rounded border-slate-400 text-teal-600 focus:ring-teal-500"
                  />
                  <span>
                    <strong className="text-slate-800 dark:text-slate-200">Simulate policy block</strong> — showcase
                    refusal path for privileged bundles while checked (always blocks generation).
                  </span>
                </label>
              ) : null}

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  disabled={loading}
                  onClick={runGenerate}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-slate-950"
                >
                  {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Sparkles className="size-4" aria-hidden />}
                  {preset.generateLabel}
                </button>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Demo stub · variable latency · no live model</span>
              </div>

              <div aria-live="polite" className="sr-only">
                {loading ? 'Generating preview.' : reply ? 'Preview ready.' : ''}
              </div>

              {reply ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 dark:border-slate-700 dark:bg-slate-950/60">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-teal-800 dark:text-teal-300">
                    Preview output
                  </p>
                  <pre className="mt-2 whitespace-pre-wrap font-sans text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                    {reply}
                  </pre>
                </div>
              ) : null}
            </div>

            <div className="border-t border-slate-100 px-4 py-2 dark:border-slate-800">
              <p className="text-center text-[10px] leading-snug text-slate-500 dark:text-slate-400">{AI_POLICY_FOOTER}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
