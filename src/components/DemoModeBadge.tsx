/** Marks clusters where behaviour is illustrative / partial in the showcase. */
export function DemoModeBadge({ label = 'Demo · preview' }: { label?: string }) {
  return (
    <span
      className="inline-flex shrink-0 items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-950 ring-1 ring-amber-300/80 dark:bg-amber-950/45 dark:text-amber-100 dark:ring-amber-700"
      title="Interactive behaviour may be limited — see tooltip or banner copy."
    >
      {label}
    </span>
  )
}
