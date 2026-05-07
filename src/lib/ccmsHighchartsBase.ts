import type { Options } from 'highcharts'

export function ccmsPalette(isDark: boolean) {
  return {
    text: isDark ? '#cbd5e1' : '#475569',
    muted: isDark ? '#94a3b8' : '#64748b',
    grid: isDark ? '#334155' : '#e2e8f0',
    accent: ['#0d9488', '#0891b2', '#6366f1', '#a855f7', '#ea580c', '#dc2626'],
    risk: '#d97706',
    overdue: '#dc2626',
    track: '#059669',
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
  'rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900'
