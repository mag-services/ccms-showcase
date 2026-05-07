import type { ReactNode } from 'react'

/**
 * Visual reference for Compliance workshops — mirrors Need Assessment SLA engine narrative.
 * Static showcase only (no runtime calculation).
 */
export function SlaEngineDiagram() {
  return (
    <section
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:p-5"
      aria-labelledby="sla-engine-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="sla-engine-title" className="text-sm font-semibold text-gray-900 dark:text-white">
            SLA engine · conceptual flow (FR-03)
          </h2>
          <p className="mt-1 max-w-3xl text-xs leading-relaxed text-gray-600 dark:text-gray-400">
            Deadlines are computed when each <strong className="text-gray-800 dark:text-gray-200">stage opens</strong> or an{' '}
            <strong className="text-gray-800 dark:text-gray-200">instrumented action</strong> fires — not from intake date alone.
            Calendar vs <strong className="text-gray-800 dark:text-gray-200">working</strong> days are configured{' '}
            <strong className="text-gray-800 dark:text-gray-200">per stage definition</strong>, not per case officer.
          </p>
        </div>
        <div className="rounded-lg bg-gray-50 px-3 py-2 text-[10px] leading-snug text-gray-600 ring-1 ring-gray-200 dark:bg-gray-950 dark:text-gray-400 dark:ring-gray-700">
          <p className="font-semibold text-gray-800 dark:text-gray-200">Badge thresholds (demo)</p>
          <p>
            <span className="inline-block size-2 rounded-full bg-green-500 align-middle" aria-hidden /> On track — &gt;3 days remaining
          </p>
          <p>
            <span className="inline-block size-2 rounded-full bg-amber-500 align-middle" aria-hidden /> At risk — ≤3 days · alert
          </p>
          <p>
            <span className="inline-block size-2 rounded-full bg-red-500 align-middle" aria-hidden /> Overdue · escalate (Director /
            clerk playbook)
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto pb-2">
        <div className="flex min-w-[720px] flex-col gap-3">
          <FlowRow>
            <Node variant="trigger">Stage opened / action taken</Node>
            <Arrow />
            <Node variant="engine">
              <strong>SLA engine</strong>
              <span className="mt-1 block font-normal opacity-95">Deadline = trigger timestamp + statute / rule pack</span>
            </Node>
          </FlowRow>

          <div className="flex min-w-0 justify-center gap-3 pl-[8%] pr-[8%]">
            <Node variant="ok" className="flex-1">
              On track
              <span className="mt-1 block text-[11px] font-normal opacity-90">&gt;3 days remaining</span>
            </Node>
            <Node variant="risk" className="flex-1">
              At risk
              <span className="mt-1 block text-[11px] font-normal opacity-95">≤3 days · alert triggered</span>
            </Node>
            <Node variant="bad" className="flex-1">
              Overdue
              <span className="mt-1 block text-[11px] font-normal opacity-95">Escalates per playbook</span>
            </Node>
          </div>

          <p className="text-center text-[10px] text-gray-500 dark:text-gray-400">
            At-risk &amp; overdue lanes enqueue notifications before immutable audit rows (FR-06).
          </p>

          <FlowRow>
            <Node variant="neutral" className="flex-[1.2]">
              Internal notification to assigned officer · FR-09 Phase 1
            </Node>
          </FlowRow>

          <FlowRow>
            <Node variant="neutral" className="flex-[1.2]">
              Immutable audit log entry · <strong>FR-06</strong>
            </Node>
          </FlowRow>

          <FlowRow>
            <Node variant="out">
              Live dashboard · <strong>FR-07</strong> + reporting · <strong>FR-10</strong>
            </Node>
          </FlowRow>
        </div>
      </div>
    </section>
  )
}

function FlowRow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`flex flex-wrap items-stretch justify-center gap-3 ${className}`}>{children}</div>
}

function Arrow({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center px-1 text-gray-400 dark:text-gray-500 ${className}`} aria-hidden>
      →
    </div>
  )
}

function Node({
  variant,
  children,
  className = '',
}: {
  variant: 'trigger' | 'engine' | 'ok' | 'risk' | 'bad' | 'neutral' | 'out'
  children: ReactNode
  className?: string
}) {
  const styles: Record<
    'trigger' | 'engine' | 'ok' | 'risk' | 'bad' | 'neutral' | 'out',
    string
  > = {
    trigger: 'border-green-700/40 bg-green-600 text-white shadow-sm ring-1 ring-green-500/30',
    engine: 'border-indigo-700/40 bg-indigo-700 text-white shadow-sm ring-1 ring-indigo-500/25',
    ok: 'border-green-600/40 bg-green-50 text-green-950 ring-1 ring-green-200 dark:bg-green-950/35 dark:text-green-50 dark:ring-green-900',
    risk: 'border-amber-600/40 bg-amber-50 text-amber-950 ring-1 ring-amber-200 dark:bg-amber-950/35 dark:text-amber-50 dark:ring-amber-900',
    bad: 'border-red-700/40 bg-red-50 text-red-950 ring-1 ring-red-200 dark:bg-red-950/35 dark:text-red-50 dark:ring-red-900',
    neutral: 'border-gray-300 bg-gray-100 text-gray-900 ring-1 ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-700',
    out: 'border-indigo-700/35 bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-400/30',
  }
  return (
    <div
      className={`rounded-xl px-4 py-3 text-center text-xs font-semibold leading-snug ${styles[variant]} ${className}`}
    >
      {children}
    </div>
  )
}
