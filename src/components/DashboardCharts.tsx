import { useMemo } from 'react'
import Highcharts from 'highcharts'
import { HighchartsReact } from 'highcharts-react-official'
import type { Options } from 'highcharts'
import type { ComplianceCase } from '../types'
import { useTheme } from '../context/ThemeContext'
import { SAMPLE_CASES } from '../data/sampleCases'
import { ccmsCardChartBase, ccmsChartCardClass, ccmsPalette } from '../lib/ccmsHighchartsBase'

const DH = 232

function pairBuckets(getter: (c: ComplianceCase) => string) {
  const m = new Map<string, number>()
  for (const row of SAMPLE_CASES) {
    const k = getter(row)
    m.set(k, (m.get(k) ?? 0) + 1)
  }
  return [...m.entries()].sort((a, b) => b[1] - a[1])
}

function ChartBox({
  theme,
  options,
  suffix,
}: {
  theme: string
  options: Options
  suffix: string
}) {
  return (
    <div className={ccmsChartCardClass}>
      <HighchartsReact highcharts={Highcharts} options={options} key={`${suffix}-${theme}`} />
    </div>
  )
}

export function DashboardSlaDonut() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const options = useMemo((): Options => {
    const colors = ccmsPalette(isDark)
    const base = ccmsCardChartBase(DH)
    let onTrack = 0
    let atRisk = 0
    let overdue = 0
    for (const c of SAMPLE_CASES) {
      if (c.sla === 'on_track') onTrack++
      else if (c.sla === 'at_risk') atRisk++
      else overdue++
    }
    return {
      ...base,
      chart: { ...base.chart, type: 'pie' },
      title: {
        text: 'SLA posture · sample queue',
        align: 'left',
        style: { color: colors.text, fontSize: '13px', fontWeight: '600' },
      },
      subtitle: {
        text: 'FR-03 statutory clock visibility',
        align: 'left',
        style: { color: colors.muted, fontSize: '10px' },
      },
      tooltip: { pointFormat: '<b>{point.percentage:.1f}%</b> · {point.y} matter(s)' },
      legend: {
        enabled: true,
        verticalAlign: 'bottom',
        itemStyle: { color: colors.muted, fontSize: '11px' },
      },
      plotOptions: {
        pie: {
          innerSize: '54%',
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            distance: 12,
            format: '{point.name}<br/><b>{point.y}</b>',
            style: { color: colors.muted, fontSize: '10px', fontWeight: '500', textOutline: 'none' },
          },
        },
      },
      series: [
        {
          type: 'pie',
          name: 'Cases',
          data: [
            { name: 'On track', y: onTrack, color: colors.track },
            { name: 'At risk', y: atRisk, color: colors.risk },
            { name: 'Overdue', y: overdue, color: colors.overdue },
          ],
        },
      ],
    }
  }, [isDark])

  return <ChartBox theme={theme} options={options} suffix="sla-donut" />
}

export function DashboardOpenVsClosed() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const options = useMemo((): Options => {
    const colors = ccmsPalette(isDark)
    const base = ccmsCardChartBase(DH)
    let open = 0
    let closed = 0
    for (const c of SAMPLE_CASES) {
      if (c.stage.startsWith('Closed')) closed++
      else open++
    }
    return {
      ...base,
      chart: { ...base.chart, type: 'column' },
      title: {
        text: 'Pipeline snapshot',
        align: 'left',
        style: { color: colors.text, fontSize: '13px', fontWeight: '600' },
      },
      subtitle: {
        text: 'Active stages vs closed (mock classifications)',
        align: 'left',
        style: { color: colors.muted, fontSize: '10px' },
      },
      xAxis: {
        categories: ['Open', 'Closed'],
        labels: { style: { color: colors.muted, fontSize: '11px' } },
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
      tooltip: { pointFormat: '<b>{point.category}</b>: {point.y}' },
      plotOptions: {
        column: {
          borderRadius: 6,
          borderWidth: 0,
          colorByPoint: true,
        },
      },
      colors: [colors.accent[0], colors.accent[3]],
      series: [{ type: 'column', name: 'Count', data: [open, closed] }],
    }
  }, [isDark])

  return <ChartBox theme={theme} options={options} suffix="open-closed" />
}

export function DashboardExecutiveMix() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const options = useMemo((): Options => {
    const colors = ccmsPalette(isDark)
    const base = ccmsCardChartBase(DH)
    let se = 0
    let std = 0
    for (const c of SAMPLE_CASES) {
      if (c.seniorExecutive) se++
      else std++
    }
    return {
      ...base,
      chart: { ...base.chart, type: 'column' },
      title: {
        text: 'FR-12 senior executive routing',
        align: 'left',
        style: { color: colors.text, fontSize: '13px', fontWeight: '600' },
      },
      subtitle: {
        text: 'Commission-path cohort vs employee workflows',
        align: 'left',
        style: { color: colors.muted, fontSize: '10px' },
      },
      xAxis: {
        categories: ['Senior executive', 'Employee / standard'],
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
      },
      legend: { enabled: false },
      tooltip: { pointFormat: '{point.category}: <b>{point.y}</b>' },
      plotOptions: { column: { borderRadius: 5, borderWidth: 0 } },
      colors: ['#7c3aed', colors.accent[0]],
      series: [{ type: 'column', name: 'Matters', data: [se, std] }],
    }
  }, [isDark])

  return <ChartBox theme={theme} options={options} suffix="exec-mix" />
}

export function DashboardFamilyBar() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const options = useMemo((): Options => {
    const colors = ccmsPalette(isDark)
    const base = ccmsCardChartBase(DH)
    const pairs = pairBuckets((c) => c.family)
    return {
      ...base,
      chart: { ...base.chart, type: 'bar' },
      title: {
        text: 'Workload by statutory family',
        align: 'left',
        style: { color: colors.text, fontSize: '13px', fontWeight: '600' },
      },
      subtitle: {
        text: 'Six OPSC workflow families · §3 brief scope',
        align: 'left',
        style: { color: colors.muted, fontSize: '10px' },
      },
      xAxis: {
        categories: pairs.map(([k]) => k),
        labels: { style: { color: colors.muted, fontSize: '10px' } },
        lineColor: colors.grid,
        gridLineWidth: 0,
      },
      yAxis: {
        title: { text: '' },
        labels: { style: { color: colors.muted } },
        gridLineColor: colors.grid,
        allowDecimals: false,
        min: 0,
      },
      legend: { enabled: false },
      tooltip: { pointFormat: '{point.y} matter(s)' },
      plotOptions: { bar: { borderRadius: 4, borderWidth: 0, colorByPoint: true } },
      colors: colors.accent,
      series: [{ type: 'bar', name: 'Matters', data: pairs.map(([, v]) => v) }],
    }
  }, [isDark])

  return <ChartBox theme={theme} options={options} suffix="fam-bar" />
}

export function DashboardMinistryBar() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const options = useMemo((): Options => {
    const colors = ccmsPalette(isDark)
    const base = ccmsCardChartBase(DH)
    const pairs = pairBuckets((c) => c.ministry)
    return {
      ...base,
      chart: { ...base.chart, type: 'bar' },
      title: {
        text: 'Matters by originating ministry',
        align: 'left',
        style: { color: colors.text, fontSize: '13px', fontWeight: '600' },
      },
      subtitle: {
        text: 'FR-01 intake · DG referral concentration',
        align: 'left',
        style: { color: colors.muted, fontSize: '10px' },
      },
      xAxis: {
        categories: pairs.map(([k]) => k),
        labels: { style: { color: colors.muted, fontSize: '10px' } },
        lineColor: colors.grid,
        gridLineWidth: 0,
      },
      yAxis: {
        title: { text: '' },
        labels: { style: { color: colors.muted } },
        gridLineColor: colors.grid,
        allowDecimals: false,
        min: 0,
      },
      legend: { enabled: false },
      tooltip: { pointFormat: '{point.y} matter(s)' },
      plotOptions: { bar: { borderRadius: 4, borderWidth: 0, colorByPoint: true } },
      colors: [...colors.accent].reverse(),
      series: [{ type: 'bar', name: 'Matters', data: pairs.map(([, v]) => v) }],
    }
  }, [isDark])

  return <ChartBox theme={theme} options={options} suffix="min-bar" />
}

export function DashboardOwnerBar() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const options = useMemo((): Options => {
    const colors = ccmsPalette(isDark)
    const base = ccmsCardChartBase(DH)
    const pairs = pairBuckets((c) => c.owner)
    return {
      ...base,
      chart: { ...base.chart, type: 'bar' },
      title: {
        text: 'Caseload by assigned officer',
        align: 'left',
        style: { color: colors.text, fontSize: '13px', fontWeight: '600' },
      },
      subtitle: {
        text: 'FR-07 dashboard owner · triage balance',
        align: 'left',
        style: { color: colors.muted, fontSize: '10px' },
      },
      xAxis: {
        categories: pairs.map(([k]) => k),
        labels: { style: { color: colors.muted, fontSize: '11px' } },
        lineColor: colors.grid,
        gridLineWidth: 0,
      },
      yAxis: {
        title: { text: '' },
        labels: { style: { color: colors.muted } },
        gridLineColor: colors.grid,
        allowDecimals: false,
        min: 0,
      },
      legend: { enabled: false },
      tooltip: { pointFormat: '{point.y} active matter(s)' },
      plotOptions: { bar: { borderRadius: 4, borderWidth: 0, colorByPoint: true } },
      colors: colors.accent,
      series: [{ type: 'bar', name: 'Matters', data: pairs.map(([, v]) => v) }],
    }
  }, [isDark])

  return <ChartBox theme={theme} options={options} suffix="own-bar" />
}

export function DashboardStageBar() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const options = useMemo((): Options => {
    const colors = ccmsPalette(isDark)
    const base = ccmsCardChartBase(DH)
    const pairs = pairBuckets((c) => c.stage)
    const shortCat = pairs.map(([k]) => (k.length > 38 ? `${k.slice(0, 36)}…` : k))
    return {
      ...base,
      chart: { ...base.chart, type: 'bar' },
      title: {
        text: 'Distribution by workflow stage',
        align: 'left',
        style: { color: colors.text, fontSize: '13px', fontWeight: '600' },
      },
      subtitle: {
        text: 'FR-02 gate sequencing · sample snapshot',
        align: 'left',
        style: { color: colors.muted, fontSize: '10px' },
      },
      xAxis: {
        categories: shortCat,
        labels: {
          style: { color: colors.muted, fontSize: '9px' },
        },
        lineColor: colors.grid,
        gridLineWidth: 0,
      },
      yAxis: {
        title: { text: '' },
        labels: { style: { color: colors.muted } },
        gridLineColor: colors.grid,
        allowDecimals: false,
        min: 0,
      },
      legend: { enabled: false },
      tooltip: {
        formatter() {
          const ctx = this as {
            points?: Array<{ point: { index?: number; y?: number } }>
            point?: { index?: number; y?: number }
          }
          const pt = ctx.points?.[0]?.point ?? ctx.point
          const idx = typeof pt?.index === 'number' ? pt.index : 0
          const full = pairs[idx]?.[0] ?? ''
          const y = pt?.y ?? 0
          return `<b>${full}</b><br/><b>${y}</b> matter(s)`
        },
      },
      plotOptions: { bar: { borderRadius: 4, borderWidth: 0, colorByPoint: true } },
      colors: colors.accent,
      series: [{ type: 'bar', name: 'Matters', data: pairs.map(([, v]) => v) }],
    }
  }, [isDark])

  return <ChartBox theme={theme} options={options} suffix="stage-bar" />
}

export function DashboardDecisionAppColumn() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const options = useMemo((): Options => {
    const colors = ccmsPalette(isDark)
    const base = ccmsCardChartBase(DH)
    let linked = 0
    for (const c of SAMPLE_CASES) {
      if (c.decisionAppRef) linked++
    }
    const notLinked = SAMPLE_CASES.length - linked
    return {
      ...base,
      chart: { ...base.chart, type: 'column' },
      title: {
        text: 'Commission Decision App linkage',
        align: 'left',
        style: { color: colors.text, fontSize: '13px', fontWeight: '600' },
      },
      subtitle: {
        text: '§6.1 cross-system refs · ministry-blind boundary',
        align: 'left',
        style: { color: colors.muted, fontSize: '10px' },
      },
      xAxis: {
        categories: ['PSC tracker ref present', 'CCMS-only record'],
        labels: { style: { color: colors.muted, fontSize: '10px' } },
        lineColor: colors.grid,
        tickColor: colors.grid,
      },
      yAxis: {
        title: { text: 'Cases', style: { color: colors.muted } },
        labels: { style: { color: colors.muted } },
        gridLineColor: colors.grid,
        allowDecimals: false,
        min: 0,
      },
      legend: { enabled: false },
      tooltip: { pointFormat: '{point.y} matter(s)' },
      plotOptions: { column: { borderRadius: 5, borderWidth: 0 } },
      colors: [colors.accent[1], colors.muted],
      series: [{ type: 'column', name: 'Matters', data: [linked, notLinked] }],
    }
  }, [isDark])

  return <ChartBox theme={theme} options={options} suffix="dec-app" />
}

export function DashboardLitigationPie() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const options = useMemo((): Options => {
    const colors = ccmsPalette(isDark)
    const base = ccmsCardChartBase(DH)
    let lit = 0
    for (const c of SAMPLE_CASES) {
      if (c.litigation) lit++
    }
    const rest = SAMPLE_CASES.length - lit
    return {
      ...base,
      chart: { ...base.chart, type: 'pie' },
      title: {
        text: 'Litigation & cost ledger FR-13',
        align: 'left',
        style: { color: colors.text, fontSize: '13px', fontWeight: '600' },
      },
      subtitle: {
        text: 'Flagged matters vs standard compliance track',
        align: 'left',
        style: { color: colors.muted, fontSize: '10px' },
      },
      tooltip: { pointFormat: '<b>{point.percentage:.1f}%</b> · {point.y}' },
      legend: {
        enabled: true,
        verticalAlign: 'bottom',
        itemStyle: { color: colors.muted, fontSize: '11px' },
      },
      plotOptions: {
        pie: {
          innerSize: '45%',
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y}',
            style: { color: colors.muted, fontSize: '10px', textOutline: 'none' },
          },
        },
      },
      series: [
        {
          type: 'pie',
          name: 'Cases',
          data: [
            { name: 'Litigation tracked', y: lit, color: colors.overdue },
            { name: 'No litigation flag', y: rest, color: '#6b7280' },
          ],
        },
      ],
    }
  }, [isDark])

  return <ChartBox theme={theme} options={options} suffix="lit-pie" />
}

export function DashboardSlaStackByFamily() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const options = useMemo((): Options => {
    const colors = ccmsPalette(isDark)
    const base = ccmsCardChartBase(DH)
    const families = [...new Set(SAMPLE_CASES.map((c) => c.family))]
    const sorted = families.sort()
    const onTrack = sorted.map(
      (f) => SAMPLE_CASES.filter((c) => c.family === f && c.sla === 'on_track').length,
    )
    const atRisk = sorted.map(
      (f) => SAMPLE_CASES.filter((c) => c.family === f && c.sla === 'at_risk').length,
    )
    const overdue = sorted.map(
      (f) => SAMPLE_CASES.filter((c) => c.family === f && c.sla === 'overdue').length,
    )
    return {
      ...base,
      chart: { ...base.chart, type: 'column' },
      title: {
        text: 'SLA layers by family',
        align: 'left',
        style: { color: colors.text, fontSize: '13px', fontWeight: '600' },
      },
      subtitle: {
        text: 'Stacked statutory health · FR-03',
        align: 'left',
        style: { color: colors.muted, fontSize: '10px' },
      },
      xAxis: {
        categories: sorted.map((f) => (f.length > 28 ? `${f.slice(0, 26)}…` : f)),
        labels: { style: { color: colors.muted, fontSize: '9px', fontWeight: '500' }, rotation: -22 },
        lineColor: colors.grid,
        tickColor: colors.grid,
      },
      yAxis: {
        title: { text: 'Matters', style: { color: colors.muted } },
        labels: { style: { color: colors.muted } },
        gridLineColor: colors.grid,
        stackLabels: {
          enabled: true,
          style: { color: colors.muted, fontSize: '10px', fontWeight: '600' },
        },
        allowDecimals: false,
        min: 0,
      },
      legend: {
        enabled: true,
        itemStyle: { color: colors.muted, fontSize: '11px' },
      },
      tooltip: {
        shared: true,
        headerFormat: '<b>{point.key}</b><br/>',
        pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          borderRadius: 2,
          borderWidth: 0,
        },
      },
      series: [
        { type: 'column', name: 'On track', data: onTrack, color: colors.track },
        { type: 'column', name: 'At risk', data: atRisk, color: colors.risk },
        { type: 'column', name: 'Overdue', data: overdue, color: colors.overdue },
      ],
    }
  }, [isDark])

  return <ChartBox theme={theme} options={options} suffix="sla-stack" />
}

export function DashboardIllustrativeTrend() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const options = useMemo((): Options => {
    const colors = ccmsPalette(isDark)
    const base = ccmsCardChartBase(DH)
    return {
      ...base,
      chart: { ...base.chart, type: 'areaspline' },
      title: {
        text: 'Commission intake trend',
        align: 'left',
        style: { color: colors.text, fontSize: '13px', fontWeight: '600' },
      },
      subtitle: {
        text: 'Illustrative monthly counts · not tied to live volumes',
        align: 'left',
        style: { color: colors.muted, fontSize: '10px' },
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        labels: { style: { color: colors.muted, fontSize: '11px' } },
        lineColor: colors.grid,
        tickColor: colors.grid,
      },
      yAxis: {
        title: { text: 'Matters opened', style: { color: colors.muted } },
        labels: { style: { color: colors.muted } },
        gridLineColor: colors.grid,
        allowDecimals: false,
        min: 0,
      },
      legend: { enabled: false },
      tooltip: { pointFormat: '{point.y} matters (illustrative)' },
      plotOptions: {
        areaspline: {
          fillOpacity: 0.18,
          lineWidth: 2,
          marker: { radius: 4, symbol: 'circle' },
        },
      },
      series: [
        {
          type: 'areaspline',
          name: 'New registrations',
          color: colors.accent[0],
          data: [4, 7, 6, 11, 9, 13],
        },
      ],
    }
  }, [isDark])

  return <ChartBox theme={theme} options={options} suffix="trend" />
}
