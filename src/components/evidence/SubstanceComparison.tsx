import { useState } from 'react'
import { Card } from '../../ui'
import { SourceBadge } from './SourceBadge'
import { HorizontalBarChart } from './ChartBar'
import { governmentBaseline2018 } from '../../data/governmentBaseline2018'
import { AlertTriangle } from 'lucide-react'

export function SubstanceComparison() {
  const [activeMetric, setActiveMetric] = useState<'currentUsePct' | 'quantumOfWorkPct' | 'dependencePct'>('currentUsePct')
  const { substances } = governmentBaseline2018

  const metricTitle = {
    currentUsePct: 'Current Use % (Last 12 Months)',
    quantumOfWorkPct: 'Quantum of Work % (Requires Treatment / Harmful + Dependent)',
    dependencePct: 'Dependence % (WHO ASSIST > 26)',
  }[activeMetric]

  // National bars
  const nationalBars = substances.map((s) => ({
    label: s.label,
    value: s.india[activeMetric],
    displayValue: s.india[activeMetric] !== null ? `${s.india[activeMetric]}%` : 'Undetectable',
    sublabel: s.india.estimatedCurrentUsers ? `~${s.india.estimatedCurrentUsers} users` : undefined,
    color: '#2b6957',
  }))

  // Uttarakhand bars
  const ukBars = substances.map((s) => {
    const uk = s.states.find((st) => st.state === 'Uttarakhand')
    const val = uk ? uk[activeMetric] : null
    return {
      label: s.label,
      value: val,
      displayValue: val !== null ? `${val}%` : 'Undetectable',
      color: '#eb8b68',
    }
  })

  return (
    <div className="overview-page">
      <div className="section-head-banner">
        <div>
          <span className="badge-tag">Cross-Substance Analysis</span>
          <h2 className="section-main-title">Substance Category Comparison</h2>
          <p className="section-desc">
            Comparative analysis of all 8 substance classes evaluated in the National Survey (2018 baseline).
          </p>
        </div>
        <SourceBadge type="government" />
      </div>

      {/* COMPARABILITY WARNING (Prompt item 32) */}
      <div className="callout-alert-box warning-box" style={{ background: '#fff9f5', borderColor: '#f6cfc0' }}>
        <AlertTriangle size={22} style={{ color: '#eb8b68', flexShrink: 0 }} />
        <div>
          <strong style={{ color: '#b84b24' }}>Methodological Comparability Notice:</strong>
          <p style={{ margin: '4px 0 0', fontSize: '0.86rem', color: 'var(--muted)' }}>
            This Government Baseline represents a nationally and state-representative household + RDS survey (ages 10–75) conducted in 2017–2018.
            It utilizes the WHO ASSIST instrument. PeerShield 2025 campus surveys reflect local student cohorts.
            <strong> Historical baseline comparison — methodology and time periods differ; do not calculate simplistic delta percentages.</strong>
          </p>
        </div>
      </div>

      {/* Metric Selector */}
      <div className="uk-mode-toggle-row" style={{ marginTop: '20px' }}>
        <div className="toggle-tabs">
          <button
            type="button"
            className={`toggle-tab ${activeMetric === 'currentUsePct' ? 'active' : ''}`}
            onClick={() => setActiveMetric('currentUsePct')}
          >
            1. Current Use (12 Months)
          </button>
          <button
            type="button"
            className={`toggle-tab ${activeMetric === 'quantumOfWorkPct' ? 'active' : ''}`}
            onClick={() => setActiveMetric('quantumOfWorkPct')}
          >
            2. Quantum of Work (Needs Help)
          </button>
          <button
            type="button"
            className={`toggle-tab ${activeMetric === 'dependencePct' ? 'active' : ''}`}
            onClick={() => setActiveMetric('dependencePct')}
          >
            3. Dependence Pattern (ASSIST &gt; 26)
          </button>
        </div>
      </div>

      {/* Side by side charts: National vs Uttarakhand */}
      <div className="charts-grid-2" style={{ marginTop: '20px' }}>
        <Card>
          <HorizontalBarChart
            items={nationalBars}
            title={`India (National Aggregate) — ${metricTitle}`}
            subtitle="Ranked across all 8 substances covered by the survey"
          />
        </Card>

        <Card>
          <HorizontalBarChart
            items={ukBars}
            title={`Uttarakhand Baseline — ${metricTitle}`}
            subtitle="State-level estimates (State Code 05) for comparison"
          />
        </Card>
      </div>

      {/* Cross-Substance Master Matrix */}
      <Card style={{ marginTop: '24px' }}>
        <h3 style={{ font: "600 1.3rem/1.2 'Fraunces', serif", marginBottom: '8px' }}>
          National &amp; State Master Metrics Matrix (2018 Baseline)
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: '0.84rem', marginBottom: '16px' }}>
          Direct extracted numbers from MoSJE / NDDTC-AIIMS national survey report.
        </p>

        <div className="table-responsive-wrapper">
          <table className="gov-comparison-table">
            <thead>
              <tr>
                <th>Substance Class</th>
                <th>National Current Use %</th>
                <th>National Est. Users</th>
                <th>National Quantum %</th>
                <th>National Dep. %</th>
                <th>Uttarakhand Current %</th>
                <th>Uttarakhand Quantum %</th>
                <th>Uttarakhand Dep. %</th>
              </tr>
            </thead>
            <tbody>
              {substances.map((s) => {
                const uk = s.states.find((st) => st.state === 'Uttarakhand')
                return (
                  <tr key={s.substance}>
                    <td className="table-substance-cell">
                      <strong>{s.label}</strong>
                    </td>
                    <td>{s.india.currentUsePct}%</td>
                    <td>{s.india.estimatedCurrentUsers ?? 'N/A'}</td>
                    <td style={{ color: '#eb8b68', fontWeight: 600 }}>{s.india.quantumOfWorkPct}%</td>
                    <td>{s.india.dependencePct !== null ? `${s.india.dependencePct}%` : 'Undetectable'}</td>
                    <td>{uk?.currentUsePct !== null ? `${uk?.currentUsePct}%` : 'Undetectable'}</td>
                    <td style={{ color: '#eb8b68', fontWeight: 600 }}>{uk?.quantumOfWorkPct !== null ? `${uk?.quantumOfWorkPct}%` : 'Undetectable'}</td>
                    <td>{uk?.dependencePct !== null ? `${uk?.dependencePct}%` : 'Undetectable'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
