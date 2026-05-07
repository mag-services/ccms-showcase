import type { Options } from 'highcharts'

/** Tailwind default palette hex values for chart series / axes (gray + semantic defaults). */
export function ccmsPalette(isDark: boolean) {
  return {
    text: isDark ? '#9ca3af' : '#4b5563',
    muted: isDark ? '#9ca3af' : '#6b7280',
    grid: isDark ? '#374151' : '#e5e7eb',
    accent: ['#2563eb', '#0891b2', '#4f46e5', '#7c3aed', '#ea580c', '#dc2626'],
    risk: '#d97706',
    overdue: '#dc2626',
    track: '#16a34a',
  }
}

export function ccmsCardChartBase(chartHeight = 260): Pick<Options, 'chart' | 'credits' | 'navigation'> {
  return {
    chart: {
      backgroundColor: 'transparent',
      style: { fontFamily: 'inherit' },
      height: chartHeight,
      spacing: [10, 12, 6, 6],
    },
    credits: { enabled: false },
    navigation: { buttonOptions: { theme: { fill: 'transparent' } } },
  }
}

export const ccmsChartCardClass =
  'rounded-xl border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-900'
