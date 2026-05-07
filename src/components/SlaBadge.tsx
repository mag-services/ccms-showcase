import type { SlaStatus } from '../types'

const styles: Record<SlaStatus, string> = {
  on_track:
    'bg-green-100 text-green-900 ring-green-200 dark:bg-green-950/50 dark:text-green-200 dark:ring-green-800',
  at_risk:
    'bg-amber-100 text-amber-950 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-100 dark:ring-amber-800',
  overdue: 'bg-red-100 text-red-900 ring-red-200 dark:bg-red-950/45 dark:text-red-100 dark:ring-red-900',
}

const labels: Record<SlaStatus, string> = {
  on_track: 'On track',
  at_risk: 'At risk',
  overdue: 'Overdue',
}

export function SlaBadge({ status }: { status: SlaStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}
    >
      {labels[status]}
    </span>
  )
}
