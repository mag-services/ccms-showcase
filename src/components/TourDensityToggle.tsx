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
      className="flex max-w-[14rem] flex-wrap items-center justify-end gap-1 rounded-lg border border-gray-200 bg-white p-0.5 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:max-w-none"
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
            className={`rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 ${
              on
                ? 'bg-blue-700 text-white shadow-sm dark:bg-blue-600'
                : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
