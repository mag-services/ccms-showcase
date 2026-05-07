import { VolumesByFamilyChart, SlaByOfficerChart } from './ReportsCharts'

/** Default export for `React.lazy` code-splitting (Highcharts chunk). */
export default function ReportsChartsPane() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <VolumesByFamilyChart />
      <SlaByOfficerChart />
    </div>
  )
}
