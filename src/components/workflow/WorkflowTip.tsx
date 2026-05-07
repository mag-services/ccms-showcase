import { useRef, useState } from 'react'
import { CircleHelp } from 'lucide-react'
import { useClickOutside } from '../../hooks/useClickOutside'

export function WorkflowTip({ title, body }: { title: string; body: string }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLSpanElement>(null)

  useClickOutside(wrapRef, () => setOpen(false), open)

  return (
    <span ref={wrapRef} className="relative inline-flex align-middle">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="cursor-pointer rounded-full p-1 text-teal-700 transition hover:bg-teal-100/90 hover:text-teal-900 dark:text-teal-400 dark:hover:bg-teal-950/50 dark:hover:text-teal-200"
        aria-expanded={open}
        aria-label={`Workflow tip: ${title}`}
      >
        <CircleHelp className="size-[18px]" aria-hidden />
      </button>
      {open ? (
        <div
          role="tooltip"
          className="absolute left-1/2 top-[calc(100%+6px)] z-50 w-[min(calc(100vw-2rem),17rem)] -translate-x-1/2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left shadow-xl dark:border-slate-700 dark:bg-slate-900 sm:left-0 sm:translate-x-0"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wide text-teal-800 dark:text-teal-300">{title}</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{body}</p>
        </div>
      ) : null}
    </span>
  )
}
