/** Tiny accessible acknowledgement for demo-only buttons. */
export function DemoActionToast({ message }: { message: string | null }) {
  if (!message) return null
  return (
    <p
      role="status"
      aria-live="polite"
      className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-950 ring-1 ring-blue-200 dark:bg-blue-950/45 dark:text-blue-50 dark:ring-blue-800"
    >
      {message}
    </p>
  )
}
