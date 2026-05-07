import { useMemo } from 'react'
import Highcharts from 'highcharts'
import { HighchartsReact } from 'highcharts-react-official'
import type { Options } from 'highcharts'
import { useTheme } from '../context/ThemeContext'
import { SAMPLE_CASES } from '../data/sampleCases'
import { ccmsCardChartBase, ccmsChartCardClass, ccmsPalette } from '../lib/ccmsHighchartsBase'

function buildVolumesByFamilyOptions(isDark: boolean): Options {
  const colors = ccmsPalette(isDark)
  const base = ccmsCardChartBase(280)
  const counts = new Map<string, number>()
  for (const row of SAMPLE_CASES) {
    counts.set(row.family, (counts.get(row.family) ?? 0) + 1)
  }
  const pairs = [...counts.entries()].sort((a, b) => b[1] - a[1])
  const categories = pairs.map(([k]) => k)
  const data = pairs.map(([, v]) => v)

  return {
    ...base,
    chart: { ...base.chart, type: 'column' },
    title: {
      text: 'Sample matters by case family',
      align: 'left',
      margin: 12,
      style: { color: colors.text, fontSize: '14px', fontWeight: '600' },
    },
    subtitle: {
      text: 'FR-10 · seeded showcase dataset (includes closed)',
      align: 'left',
      style: { color: colors.muted, fontSize: '11px' },
    },
    xAxis: {
      categories,
      labels: {
        style: { color: colors.muted, fontSize: '10px' },
        rotation: -32,
      },
      lineColor: colors.grid,
      tickColor: colors.grid,
    },
    yAxis: {
      title: { text: 'Matters', style: { color: colors.muted } },
      labels: { style: { color: colors.muted } },
      gridLineColor: colors.grid,
      allowDecimals: false,
      min: 0,
    },
    legend: { enabled: false },
    tooltip: {
      headerFormat: '',
      pointFormat: '<b>{point.category}</b><br/>Count: <b>{point.y}</b>',
    },
    plotOptions: {
      column: {
        borderRadius: 4,
        borderWidth: 0,
        colorByPoint: true,
      },
    },
    colors: colors.accent,
    series: [{ type: 'column', name: 'Matters', data }],
  }
}

function buildSlaByOfficerOptions(isDark: boolean): Options {
  const colors = ccmsPalette(isDark)
  const base = ccmsCardChartBase(280)
  const owners = [...new Set(SAMPLE_CASES.map((c) => c.owner))].sort()

  const atRisk = owners.map(
    (o) => SAMPLE_CASES.filter((c) => c.owner === o && c.sla === 'at_risk').length,
  )
  const overdue = owners.map(
    (o) => SAMPLE_CASES.filter((c) => c.owner === o && c.sla === 'overdue').length,
  )

  return {
    ...base,
    chart: { ...base.chart, type: 'column' },
    title: {
      text: 'SLA pressure by assigned officer',
      align: 'left',
      margin: 12,
      style: { color: colors.text, fontSize: '14px', fontWeight: '600' },
    },
    subtitle: {
      text: 'FR-03 · at-risk vs overdue (sample)',
      align: 'left',
      style: { color: colors.muted, fontSize: '11px' },
    },
    xAxis: {
      categories: owners,
      labels: { style: { color: colors.muted, fontSize: '11px' } },
      lineColor: colors.grid,
      tickColor: colors.grid,
    },
    yAxis: {
      title: { text: 'Cases', style: { color: colors.muted } },
      labels: { style: { color: colors.muted } },
      gridLineColor: colors.grid,
      allowDecimals: false,
      min: 0,
      stackLabels: {
        enabled: true,
        style: { color: colors.muted, fontSize: '10px', fontWeight: '600' },
      },
    },
    legend: {
      enabled: true,
      align: 'right',
      verticalAlign: 'top',
      itemStyle: { color: colors.muted, fontSize: '11px', fontWeight: '500' },
    },
    tooltip: {
      shared: true,
      headerFormat: '<b>{point.key}</b><br/>',
      pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        borderRadius: 3,
        borderWidth: 0,
      },
    },
    series: [
      { type: 'column', name: 'At risk', data: atRisk, color: colors.risk },
      { type: 'column', name: 'Overdue', data: overdue, color: colors.overdue },
    ],
  }
}

export function VolumesByFamilyChart() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const options = useMemo(() => buildVolumesByFamilyOptions(isDark), [isDark])

  return (
    <div className={ccmsChartCardClass}>
      <HighchartsReact highcharts={Highcharts} options={options} key={`vol-${theme}`} />
    </div>
  )
}

export function SlaByOfficerChart() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const options = useMemo(() => buildSlaByOfficerOptions(isDark), [isDark])

  return (
    <div className={ccmsChartCardClass}>
      <HighchartsReact highcharts={Highcharts} options={options} key={`sla-${theme}`} />
    </div>
  )
}
