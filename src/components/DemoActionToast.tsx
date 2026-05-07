/** Tiny accessible acknowledgement for demo-only buttons. */
export function DemoActionToast({ message }: { message: string | null }) {
  if (!message) return null
  return (
    <p
      role="status"
      aria-live="polite"
      className="rounded-lg bg-teal-50 px-3 py-2 text-xs font-medium text-teal-950 ring-1 ring-teal-200 dark:bg-teal-950/45 dark:text-teal-50 dark:ring-teal-800"
    >
      {message}
    </p>
  )
}
