import { useState } from 'react'
import { Card } from '../../ui'
import { SourceBadge } from './SourceBadge'
import { HorizontalBarChart } from './ChartBar'
import { getUttarakhandData } from '../../data/governmentBaseline2018'
import { AlertCircle } from 'lucide-react'

export function UttarakhandOverview() {
  const [viewMode, setViewMode] = useState<'profile' | 'comparison'>('profile')
  const uttarakhandList = getUttarakhandData()

  // Chart data for Uttarakhand Profile
  const currentUseBars = uttarakhandList.map((item) => ({
    label: item.label,
    value: item.data?.currentUsePct ?? null,
    displayValue: item.data?.currentUsePct !== null ? `${item.data?.currentUsePct}%` : 'Undetectable',
    color: (item.data?.currentUsePct ?? 0) > (item.indiaData.currentUsePct ?? 0) ? '#eb8b68' : '#2b6957',
    badge: (item.data?.currentUsePct ?? 0) > (item.indiaData.currentUsePct ?? 0) ? '> National Avg' : undefined,
  }))

  const quantumBars = uttarakhandList.map((item) => ({
    label: item.label,
    value: item.data?.quantumOfWorkPct ?? null,
    displayValue: item.data?.quantumOfWorkPct !== null ? `${item.data?.quantumOfWorkPct}%` : 'Undetectable',
    color: '#eb8b68',
  }))

  return (
    <div className="overview-page">
      <div className="section-head-banner">
        <div>
          <span className="badge-tag">State Deep Dive · Code 05</span>
          <h2 className="section-main-title">Uttarakhand Substance Risk Baseline (2018)</h2>
          <p className="section-desc">
            Official State Profile for Uttarakhand from the National Survey on Extent and Pattern of Substance Use in India (MoSJE / NDDTC-AIIMS, 2019).
            Population age: 10–75 years.
          </p>
        </div>
        <SourceBadge type="government" />
      </div>

      {/* STRICT ANTI-FABRICATION RULE CARD */}
      <div className="local-data-boundary-card">
        <div className="boundary-icon">
          <AlertCircle size={24} />
        </div>
        <div>
          <h4>Local Data Integrity &amp; Strict Geographic Scope</h4>
          <p>
            The Government of India report provides representative data at the <strong>State level (Uttarakhand)</strong> and National level.
            It <strong>does not</strong> contain Dehradun-, Vikasnagar-, Sahaspur-, or college-specific (GEU, GEHU, UPES, DIT, DBS) prevalence statistics.
          </p>
          <div className="boundary-example">
            <span className="boundary-tag boundary-gov">Uttarakhand Government Baseline: <strong>2.58%</strong> (Opioids)</span>
            <span className="boundary-tag boundary-na">Dehradun-specific Government baseline: <strong>Not available in this report</strong></span>
          </div>
          <p className="boundary-note">
            College and Dehradun local trends are captured exclusively through our separate <strong>PeerShield 2025 Local Survey / Complaint System</strong> and are never derived mathematically from state percentages.
          </p>
        </div>
      </div>

      {/* Mode Toggle: Profile vs India Comparison */}
      <div className="uk-mode-toggle-row">
        <div className="toggle-tabs">
          <button
            type="button"
            className={`toggle-tab ${viewMode === 'profile' ? 'active' : ''}`}
            onClick={() => setViewMode('profile')}
          >
            Uttarakhand Substance Profile
          </button>
          <button
            type="button"
            className={`toggle-tab ${viewMode === 'comparison' ? 'active' : ''}`}
            onClick={() => setViewMode('comparison')}
          >
            India vs Uttarakhand Comparison
          </button>
        </div>
      </div>

      {viewMode === 'profile' ? (
        <>
          {/* Uttarakhand 8 Substance KPI Cards */}
          <h3 className="sub-section-title">Uttarakhand Prevalence Indicators (Age 10–75)</h3>
          <div className="kpi-grid-8">
            {uttarakhandList.map((item) => {
              const d = item.data
              const higherThanNational = (d?.currentUsePct ?? 0) > (item.indiaData.currentUsePct ?? 0)
              return (
                <div key={item.substance} className="kpi-stat-card">
                  <div className="kpi-card-header">
                    <span className="kpi-card-name">{item.label}</span>
                    <span className="kpi-card-pct">{d?.currentUsePct !== null ? `${d?.currentUsePct}%` : 'Undetectable'}</span>
                  </div>
                  <div className="kpi-card-body">
                    <div className="kpi-metric-row">
                      <span className="kpi-metric-label">Dependence:</span>
                      <strong className="kpi-metric-val">
                        {d?.dependencePct !== null ? `${d?.dependencePct}%` : 'Undetectable'}
                      </strong>
                    </div>
                    <div className="kpi-metric-row">
                      <span className="kpi-metric-label">Quantum of Work:</span>
                      <strong className="kpi-metric-val" style={{ color: '#eb8b68' }}>
                        {d?.quantumOfWorkPct !== null ? `${d?.quantumOfWorkPct}%` : 'Undetectable'}
                      </strong>
                    </div>
                    <div className="kpi-metric-row">
                      <span className="kpi-metric-label">National Comparison:</span>
                      <span className="kpi-metric-val" style={{ fontSize: '0.75rem' }}>
                        {higherThanNational ? 'Above India Avg' : 'At/Below India Avg'}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Charts */}
          <div className="charts-grid-2" style={{ marginTop: '28px' }}>
            <Card>
              <HorizontalBarChart
                items={currentUseBars}
                title="Uttarakhand Current Substance Use (%)"
                subtitle="Percentage of population (10–75) who consumed substance in preceding 12 months"
              />
            </Card>

            <Card>
              <HorizontalBarChart
                items={quantumBars}
                title="Uttarakhand Quantum of Work / Needs Help (%)"
                subtitle="Proportion of Uttarakhand population requiring professional substance intervention"
              />
            </Card>
          </div>

          {/* Key Findings for Uttarakhand */}
          <Card style={{ marginTop: '24px' }}>
            <h3 style={{ font: "600 1.3rem/1.2 'Fraunces', serif", marginBottom: '12px' }}>
              Uttarakhand State Baseline Highlights
            </h3>
            <div className="uk-highlights-list">
              <div className="uk-highlight-row">
                <strong>Alcohol (18.8% vs India 14.6%):</strong>
                <span>Current use is noticeably higher than the national average; approximately 4.2% of the state population requires medical/counselling support (quantum of work).</span>
              </div>
              <div className="uk-highlight-row">
                <strong>Cannabis (3.38% vs India 2.83%):</strong>
                <span>Dependence stands at 0.53% (more than double the national baseline of 0.25%), indicating heightened problem cannabis use in the state.</span>
              </div>
              <div className="uk-highlight-row">
                <strong>Opioids (2.58% vs India 2.06%):</strong>
                <span>Opioid use is elevated relative to national figures, with 0.80% requiring professional intervention.</span>
              </div>
              <div className="uk-highlight-row">
                <strong>Sedatives (2.09% vs India 1.08%):</strong>
                <span>Non-medical prescription sedative use is nearly double the national average, pointing to significant pharmaceutical diversion risk.</span>
              </div>
              <div className="uk-highlight-row">
                <strong>Inhalants (1.00% vs India 0.70%):</strong>
                <span>Elevated volatile inhalant use presents an acute risk pattern specifically relevant to school and college youth transitions.</span>
              </div>
            </div>
          </Card>
        </>
      ) : (
        /* SIDE BY SIDE COMPARISON VIEW: India vs Uttarakhand */
        <Card style={{ marginTop: '16px' }}>
          <div className="comparison-table-header">
            <div>
              <h3>India vs Uttarakhand Baseline Comparison (2018)</h3>
              <p className="table-subtitle">Exact side-by-side metrics from MoSJE / NDDTC-AIIMS Annexure 1.</p>
            </div>
            <SourceBadge type="government" />
          </div>

          <div className="table-responsive-wrapper">
            <table className="gov-comparison-table">
              <thead>
                <tr>
                  <th>Substance</th>
                  <th colSpan={3} className="group-th india-group">India (National Total)</th>
                  <th colSpan={3} className="group-th uk-group">Uttarakhand (State Code 05)</th>
                  <th>Key Difference</th>
                </tr>
                <tr>
                  <th>Category</th>
                  <th>Current Use %</th>
                  <th>Dependence %</th>
                  <th>Quantum %</th>
                  <th>Current Use %</th>
                  <th>Dependence %</th>
                  <th>Quantum %</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {uttarakhandList.map((item) => {
                  const d = item.data
                  const i = item.indiaData
                  const higher = (d?.currentUsePct ?? 0) > (i.currentUsePct ?? 0)
                  return (
                    <tr key={item.substance}>
                      <td className="table-substance-cell">
                        <strong>{item.label}</strong>
                      </td>
                      {/* India columns */}
                      <td className="india-val">{i.currentUsePct}%</td>
                      <td className="india-val">{i.dependencePct !== null ? `${i.dependencePct}%` : 'Undetectable'}</td>
                      <td className="india-val">{i.quantumOfWorkPct}%</td>
                      {/* Uttarakhand columns */}
                      <td className={`uk-val ${higher ? 'val-higher' : ''}`}>{d?.currentUsePct !== null ? `${d?.currentUsePct}%` : 'Undetectable'}</td>
                      <td className={`uk-val ${higher ? 'val-higher' : ''}`}>{d?.dependencePct !== null ? `${d?.dependencePct}%` : 'Undetectable'}</td>
                      <td className={`uk-val ${higher ? 'val-higher' : ''}`}>{d?.quantumOfWorkPct !== null ? `${d?.quantumOfWorkPct}%` : 'Undetectable'}</td>
                      {/* Trend tag */}
                      <td>
                        {higher ? (
                          <span className="trend-tag trend-high">UK &gt; National</span>
                        ) : (
                          <span className="trend-tag trend-low">UK &le; National</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="table-footnote">
            <p>* Undetectable denotes values too small for reliable estimation in the Household Survey, or not detected in sample PSU clusters.</p>
            <p>* Comparison valid exclusively within the 2017–2018 NDDTC-AIIMS national survey dataset. Do not project onto 2025 college cohorts.</p>
          </div>
        </Card>
      )}
    </div>
  )
}
