import { useCallback, useId, useState } from 'react'
import { ChevronDown, Sparkles } from 'lucide-react'
import type { WorkflowGuideId } from '../../data/workflowGuides'
import { WORKFLOW_GUIDES } from '../../data/workflowGuides'
import { useTourDensity } from '../../context/TourDensityContext'

export function WorkflowGuideBanner({ pageId }: { pageId: WorkflowGuideId }) {
  const guide = WORKFLOW_GUIDES[pageId]
  const panelId = useId()
  const { density } = useTourDensity()
  const [open, setOpen] = useState(false)
  const [compactDetail, setCompactDetail] = useState(false)

  const hideKey = `ccms-guide-dismiss-${pageId}`
  const [hidden, setHidden] = useState(() =>
    typeof window !== 'undefined' ? sessionStorage.getItem(hideKey) === '1' : false,
  )

  const dismiss = useCallback(() => {
    sessionStorage.setItem(hideKey, '1')
    setHidden(true)
    setOpen(false)
  }, [hideKey])

  const restore = useCallback(() => {
    sessionStorage.removeItem(hideKey)
    setHidden(false)
  }, [hideKey])

  if (hidden) {
    return (
      <button
        type="button"
        onClick={restore}
        className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-blue-300/80 bg-blue-50/50 px-3 py-2 text-xs font-medium text-blue-900 transition hover:bg-blue-100/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-100 dark:hover:bg-blue-950/50 dark:focus-visible:ring-offset-gray-950"
      >
        <Sparkles className="size-3.5 shrink-0 opacity-80" aria-hidden />
        Show workflow guide again for this page
      </button>
    )
  }

  if (density === 'compact') {
    return (
      <section
        className="rounded-lg border border-blue-200/90 bg-blue-50/80 px-3 py-2 dark:border-blue-900/50 dark:bg-blue-950/35"
        aria-labelledby={`${panelId}-compact-title`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id={`${panelId}-compact-title`} className="text-xs font-semibold text-gray-900 dark:text-white">
            {guide.headline}
          </h2>
          <div className="flex shrink-0 flex-wrap items-center gap-1">
            <button
              type="button"
              onClick={() => setCompactDetail((v) => !v)}
              className="rounded-md px-2 py-1 text-[11px] font-semibold text-blue-800 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-200"
            >
              {compactDetail ? 'Less' : 'Summary'}
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="rounded-md px-2 py-1 text-[11px] font-semibold text-blue-800 hover:bg-blue-100/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-200 dark:hover:bg-blue-900/40"
              aria-expanded={open}
            >
              Steps
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="rounded-md px-2 py-1 text-[11px] text-gray-500 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-gray-400"
            >
              Hide
            </button>
          </div>
        </div>
        {compactDetail ? (
          <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">{guide.summary}</p>
        ) : null}
        {open ? (
          <ol className="mt-3 space-y-2 border-t border-blue-100/80 pt-3 dark:border-blue-900/40">
            {guide.workflowSteps.map((row, i) => (
              <li key={row.step} className="flex gap-2 text-[11px] leading-relaxed">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-900 dark:bg-blue-900/60 dark:text-blue-100">
                  {i + 1}
                </span>
                <span>
                  <span className="font-semibold text-gray-800 dark:text-gray-100">{row.step}</span>
                  <span className="mt-0.5 block text-gray-600 dark:text-gray-400">{row.detail}</span>
                </span>
              </li>
            ))}
          </ol>
        ) : null}
      </section>
    )
  }

  return (
    <section
      className="overflow-hidden rounded-xl border border-blue-200/90 bg-gradient-to-br from-blue-50/90 via-white to-gray-50 shadow-sm ring-1 ring-blue-900/5 dark:border-blue-900/50 dark:from-blue-950/40 dark:via-gray-900 dark:to-gray-950 dark:ring-white/5"
      aria-labelledby={`${panelId}-title`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-blue-100/80 px-4 py-3 dark:border-blue-900/40 sm:px-5">
        <div className="flex min-w-0 flex-1 gap-3">
          <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-700 text-white shadow-sm dark:bg-blue-600">
            <Sparkles className="size-[18px]" aria-hidden />
          </span>
          <div className="min-w-0">
            <h2 id={`${panelId}-title`} className="text-sm font-semibold text-gray-900 dark:text-white">
              {guide.headline}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-gray-600 dark:text-gray-400">{guide.summary}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-blue-800 shadow-sm ring-1 ring-blue-200/90 transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-gray-800 dark:text-blue-200 dark:ring-blue-800 dark:hover:bg-gray-700 dark:focus-visible:ring-offset-gray-950"
            aria-expanded={open}
            aria-controls={`${panelId}-steps`}
          >
            Guided steps
            <ChevronDown className={`size-3.5 transition ${open ? 'rotate-180' : ''}`} aria-hidden />
          </button>
          <button
            type="button"
            onClick={dismiss}
            className="cursor-pointer rounded-lg px-2 py-1.5 text-[11px] font-medium text-gray-500 underline-offset-2 hover:text-gray-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-200 dark:focus-visible:ring-offset-gray-950"
          >
            Hide for session
          </button>
        </div>
      </div>
      <div
        id={`${panelId}-steps`}
        role="region"
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <ol className="space-y-3 px-4 py-4 sm:px-5">
            {guide.workflowSteps.map((row, i) => (
              <li key={row.step} className="flex gap-3 text-xs leading-relaxed">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[11px] font-bold text-blue-900 dark:bg-blue-900/60 dark:text-blue-100">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-100">{row.step}</p>
                  <p className="mt-0.5 text-gray-600 dark:text-gray-400">{row.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
