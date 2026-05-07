import { useTourDensity, type TourDensity } from '../context/TourDensityContext'

const OPTIONS: { id: TourDensity; label: string }[] = [
  { id: 'compact', label: 'Compact' },
  { id: 'standard', label: 'Standard' },
  { id: 'full', label: 'Full tour' },
]

/** Header control — guides / tips / AI density for Compliance sessions. */
export function TourDensityToggle() {
  const { density, setDensity } = useTourDensity()

  return (
    <div
      className="flex max-w-[14rem] flex-wrap items-center justify-end gap-1 rounded-lg border border-slate-200 bg-white p-0.5 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:max-w-none"
      role="group"
      aria-label="Tour density — guides and contextual tips"
    >
      {OPTIONS.map(({ id, label }) => {
        const on = density === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => setDensity(id)}
            className={`rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
              on
                ? 'bg-teal-700 text-white shadow-sm dark:bg-teal-600'
                : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
