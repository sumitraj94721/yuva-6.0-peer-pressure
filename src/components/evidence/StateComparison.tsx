import { useState, useMemo } from 'react'
import { Card } from '../../ui'
import { SourceBadge } from './SourceBadge'
import { HorizontalBarChart } from './ChartBar'
import { governmentBaseline2018 } from '../../data/governmentBaseline2018'
import type { SubstanceName } from '../../types/governmentBaseline'

type MetricKey = 'currentUsePct' | 'dependencePct' | 'quantumOfWorkPct'

export function StateComparison() {
  const [selectedSubstance, setSelectedSubstance] = useState<SubstanceName>('alcohol')
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>('currentUsePct')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const activeSubstanceData = useMemo(() => {
    return governmentBaseline2018.substances.find((s) => s.substance === selectedSubstance)!
  }, [selectedSubstance])

  const metricLabel = {
    currentUsePct: 'Current Use (Past 12 Months) %',
    dependencePct: 'Dependence Rate (WHO ASSIST > 26) %',
    quantumOfWorkPct: 'Quantum of Work (Needs Treatment) %',
  }[selectedMetric]

  // Sort states: non-null descending, null / undetectable at the bottom
  const sortedStates = useMemo(() => {
    let list = [...activeSubstanceData.states]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter((st) => st.state.toLowerCase().includes(q) || st.stateCode.includes(q))
    }

    list.sort((a, b) => {
      const valA = a[selectedMetric]
      const valB = b[selectedMetric]

      if (valA === null && valB === null) return 0
      if (valA === null) return 1
      if (valB === null) return -1
      return valB - valA
    })

    return list
  }, [activeSubstanceData, selectedMetric, searchQuery])

  // Top 10 for quick chart view
  const top10BarItems = useMemo(() => {
    return sortedStates
      .filter((st) => st[selectedMetric] !== null)
      .slice(0, 10)
      .map((st, idx) => ({
        label: `${idx + 1}. ${st.state}`,
        value: st[selectedMetric],
        displayValue: `${st[selectedMetric]}%`,
        color: st.state === 'Uttarakhand' ? '#eb8b68' : '#2b6957',
        badge: st.state === 'Uttarakhand' ? 'Uttarakhand (Focus)' : undefined,
      }))
  }, [sortedStates, selectedMetric])

  const nationalValue = activeSubstanceData.india[selectedMetric]

  return (
    <div className="overview-page">
      <div className="section-head-banner">
        <div>
          <span className="badge-tag">Annexure 1 Data Table</span>
          <h2 className="section-main-title">State &amp; UT Rankings (All 36 Jurisdictions)</h2>
          <p className="section-desc">
            Complete state-level baseline from MoSJE / NDDTC-AIIMS 2019 report. Filter by substance and metric to view state rankings.
          </p>
        </div>
        <SourceBadge type="government" />
      </div>

      {/* Interactive Filter Bar */}
      <Card className="filter-controls-card">
        <div className="filter-controls-grid">
          {/* Substance Select */}
          <div className="filter-control-item">
            <label htmlFor="substance-select">Substance Category</label>
            <select
              id="substance-select"
              value={selectedSubstance}
              onChange={(e) => setSelectedSubstance(e.target.value as SubstanceName)}
            >
              {governmentBaseline2018.substances.map((s) => (
                <option key={s.substance} value={s.substance}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Metric Select */}
          <div className="filter-control-item">
            <label htmlFor="metric-select">Prevalence Metric</label>
            <select
              id="metric-select"
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value as MetricKey)}
            >
              <option value="currentUsePct">Current Use % (Past 12 Months)</option>
              <option value="quantumOfWorkPct">Quantum of Work % (Needs Help)</option>
              <option value="dependencePct">Dependence % (ASSIST &gt; 26)</option>
            </select>
          </div>

          {/* Search by State */}
          <div className="filter-control-item">
            <label htmlFor="search-input">Search State or UT</label>
            <input
              id="search-input"
              type="text"
              placeholder="e.g. Uttarakhand, Punjab, Delhi"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Active Selection Summary */}
        <div className="active-filter-summary">
          <span>Active filter: <strong>{activeSubstanceData.label}</strong> &bull; Metric: <strong>{metricLabel}</strong></span>
          <span className="india-benchmark-tag">
            National Total (India): <strong>{nationalValue !== null ? `${nationalValue}%` : 'Undetectable'}</strong>
          </span>
        </div>
      </Card>

      {/* Top 10 Chart */}
      <div style={{ margin: '24px 0' }}>
        <Card>
          <HorizontalBarChart
            items={top10BarItems}
            title={`Top 10 States/UTs — ${activeSubstanceData.label} (${metricLabel})`}
            subtitle="Sorted by prevalence. Uttarakhand is highlighted if present in the top 10."
          />
        </Card>
      </div>

      {/* Full 36 State Table */}
      <Card>
        <div className="state-table-topbar">
          <h3>Complete 36 States &amp; UTs Table</h3>
          <span className="table-count-label">Showing {sortedStates.length} records</span>
        </div>

        <div className="table-responsive-wrapper">
          <table className="gov-comparison-table state-full-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>Rank</th>
                <th style={{ width: '80px' }}>Code</th>
                <th>State / Union Territory</th>
                <th>Current Use %</th>
                <th>Dependence %</th>
                <th>Quantum of Work %</th>
                <th>vs National Avg</th>
              </tr>
            </thead>
            <tbody>
              {/* National row pinned at top */}
              <tr className="national-summary-row">
                <td>&mdash;</td>
                <td>IND</td>
                <td>
                  <strong>India (National Aggregate)</strong>
                </td>
                <td><strong>{activeSubstanceData.india.currentUsePct}%</strong></td>
                <td>
                  <strong>
                    {activeSubstanceData.india.dependencePct !== null ? `${activeSubstanceData.india.dependencePct}%` : 'Undetectable'}
                  </strong>
                </td>
                <td><strong>{activeSubstanceData.india.quantumOfWorkPct}%</strong></td>
                <td><span className="trend-tag">Baseline</span></td>
              </tr>

              {sortedStates.map((st, idx) => {
                const isUK = st.state === 'Uttarakhand'
                const val = st[selectedMetric]
                const natVal = activeSubstanceData.india[selectedMetric]
                const isHigher = val !== null && natVal !== null && val > natVal

                return (
                  <tr key={st.stateCode} className={isUK ? 'highlight-uk-row' : ''}>
                    <td className="rank-cell">
                      {val === null ? (
                        <span className="undetectable-rank">&mdash;</span>
                      ) : (
                        <span>#{idx + 1}</span>
                      )}
                    </td>
                    <td className="code-cell">{st.stateCode}</td>
                    <td className="state-name-cell">
                      <span>{st.state}</span>
                      {isUK && <span className="uk-pill-tag">Focus State</span>}
                    </td>
                    <td>{st.currentUsePct !== null ? `${st.currentUsePct}%` : <span className="undetectable-tag">Undetectable</span>}</td>
                    <td>{st.dependencePct !== null ? `${st.dependencePct}%` : <span className="undetectable-tag">Undetectable</span>}</td>
                    <td>{st.quantumOfWorkPct !== null ? `${st.quantumOfWorkPct}%` : <span className="undetectable-tag">Undetectable</span>}</td>
                    <td>
                      {val === null ? (
                        <span className="trend-tag trend-na">Undetectable</span>
                      ) : isHigher ? (
                        <span className="trend-tag trend-high">&uarr; Above National</span>
                      ) : (
                        <span className="trend-tag trend-low">&darr; Below National</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="table-footnote">
          <p>&bull; Undetectable / not reported: Preserved exactly from Annexure 1; not assigned artificial zero values.</p>
          <p>&bull; Source: National Survey on Extent and Pattern of Substance Use in India (MoSJE/NDDTC-AIIMS, 2019).</p>
        </div>
      </Card>
    </div>
  )
}
