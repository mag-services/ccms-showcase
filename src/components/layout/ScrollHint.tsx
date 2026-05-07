import type { ReactNode } from 'react'

/** Fade cue that horizontal scroll is available (narrow viewports). */
export function ScrollHint({
  children,
  className = '',
  cueAboveMd = false,
}: {
  children: ReactNode
  className?: string
  /** When true, keep gradient + hint text on md+ (wide tables that still overflow). */
  cueAboveMd?: boolean
}) {
  const hideOnMd = cueAboveMd ? '' : 'md:hidden'
  return (
    <div className={`relative ${className}`}>
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-[1] w-12 bg-gradient-to-l from-slate-100 from-40% to-transparent dark:from-slate-950 dark:from-40% ${hideOnMd}`}
        aria-hidden
      />
      <p
        className={`mb-1 text-[10px] font-medium text-slate-500 dark:text-slate-400 ${hideOnMd}`}
      >
        ← Scroll for more columns →
      </p>
      {children}
    </div>
  )
}
