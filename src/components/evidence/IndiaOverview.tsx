import { useState } from 'react'
import { Card } from '../../ui'
import { SourceBadge } from './SourceBadge'
import { HorizontalBarChart } from './ChartBar'
import { governmentBaseline2018 } from '../../data/governmentBaseline2018'
import { ChevronRight, Info } from 'lucide-react'

export function IndiaOverview() {
  const [selectedSubstanceKey, setSelectedSubstanceKey] = useState<string>('alcohol')
  const { substances } = governmentBaseline2018

  // Charts data derived from dataset
  const currentUseBars = substances.map((s) => ({
    label: s.label,
    value: s.india.currentUsePct,
    displayValue: `${s.india.currentUsePct}% (${s.india.estimatedCurrentUsers ?? 'N/A'})`,
    color: s.substance === 'alcohol' ? '#2b6957' : s.substance === 'cannabis' ? '#3d806f' : s.substance === 'opioids' ? '#eb8b68' : '#738c82',
  }))

  const quantumBars = substances.map((s) => ({
    label: s.label,
    value: s.india.quantumOfWorkPct,
    displayValue: `${s.india.quantumOfWorkPct}% (${s.india.estimatedProblemUsers ?? 'N/A'})`,
    color: '#eb8b68',
  }))

  const dependenceBars = substances.map((s) => ({
    label: s.label,
    value: s.india.dependencePct,
    displayValue: s.india.dependencePct !== null ? `${s.india.dependencePct}% (${s.india.estimatedDependent ?? 'N/A'})` : 'Undetectable / --',
    color: '#d46b48',
  }))

  const selectedSubstance = substances.find((s) => s.substance === selectedSubstanceKey) || substances[0]

  return (
    <div className="overview-page">
      <div className="section-head-banner">
        <div>
          <span className="badge-tag">National Evidence Baseline</span>
          <h2 className="section-main-title">National Substance Use Overview (India)</h2>
          <p className="section-desc">
            Baseline estimates from the National Survey on Extent and Pattern of Substance Use in India.
            Population: 10–75 years. Survey conducted December 2017 – October 2018; estimates projected to 2018 population.
          </p>
        </div>
        <SourceBadge type="government" />
      </div>

      <div className="callout-alert-box">
        <Info size={20} className="callout-icon" />
        <div>
          <strong>Important Temporal Rule:</strong> These statistics represent the official Government of India baseline from 2018. They must <strong>never</strong> be described as 2025 prevalence figures and are maintained separately from campus-level PeerShield surveys.
        </div>
      </div>

      {/* 8 Substance KPI Cards */}
      <h3 className="sub-section-title">Primary Substance Prevalence (National 2018 Baseline)</h3>
      <div className="kpi-grid-8">
        {substances.map((s) => {
          const isSelected = s.substance === selectedSubstanceKey
          return (
            <div
              key={s.substance}
              className={`kpi-stat-card ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedSubstanceKey(s.substance)}
              role="button"
              tabIndex={0}
            >
              <div className="kpi-card-header">
                <span className="kpi-card-name">{s.label}</span>
                <span className="kpi-card-pct">{s.india.currentUsePct}%</span>
              </div>
              <div className="kpi-card-body">
                <div className="kpi-metric-row">
                  <span className="kpi-metric-label">Estimated Users:</span>
                  <strong className="kpi-metric-val">{s.india.estimatedCurrentUsers || 'N/A'}</strong>
                </div>
                <div className="kpi-metric-row">
                  <span className="kpi-metric-label">Quantum of Work:</span>
                  <span className="kpi-metric-val">{s.india.quantumOfWorkPct}%</span>
                </div>
                <div className="kpi-metric-row">
                  <span className="kpi-metric-label">Dependence:</span>
                  <span className="kpi-metric-val">{s.india.dependencePct !== null ? `${s.india.dependencePct}%` : 'Undetectable'}</span>
                </div>
              </div>
              <div className="kpi-card-footer">
                <span>View deep-dive</span>
                <ChevronRight size={14} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Detailed Drill-down Box for selected substance */}
      {selectedSubstance && (
        <Card className="selected-substance-detail">
          <div className="detail-header">
            <div>
              <span className="badge-tag">{selectedSubstance.label} Drill-down</span>
              <h3>{selectedSubstance.label} — National Profile</h3>
              <p className="detail-def">{selectedSubstance.definition}</p>
            </div>
            <SourceBadge type="government" />
          </div>

          <div className="detail-stat-row">
            <div className="detail-stat-box">
              <span className="stat-label">Current Use (12 Months)</span>
              <span className="stat-number">{selectedSubstance.india.currentUsePct}%</span>
              <span className="stat-sub">{selectedSubstance.india.estimatedCurrentUsers} users</span>
            </div>
            <div className="detail-stat-box">
              <span className="stat-label">Dependence Rate (ASSIST &gt; 26)</span>
              <span className="stat-number">
                {selectedSubstance.india.dependencePct !== null ? `${selectedSubstance.india.dependencePct}%` : 'Undetectable'}
              </span>
              <span className="stat-sub">{selectedSubstance.india.estimatedDependent || 'Estimates low / non-reported'}</span>
            </div>
            <div className="detail-stat-box highlight">
              <span className="stat-label">Quantum of Work (Needs Treatment)</span>
              <span className="stat-number">{selectedSubstance.india.quantumOfWorkPct}%</span>
              <span className="stat-sub">{selectedSubstance.india.estimatedProblemUsers || 'Combination of harmful + dependent'}</span>
            </div>
          </div>

          {selectedSubstance.india.notes.length > 0 && (
            <div className="detail-notes-list">
              <h4>Key Findings from NDDTC-AIIMS Report:</h4>
              <ul>
                {selectedSubstance.india.notes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      )}

      {/* Comparison Charts */}
      <div className="charts-grid-2">
        <Card>
          <HorizontalBarChart
            items={currentUseBars}
            title="Current Substance Use Prevalence (%)"
            subtitle="Percentage of population (10–75 years) using substance in past 12 months"
          />
        </Card>

        <Card>
          <HorizontalBarChart
            items={quantumBars}
            title="Quantum of Work / Needs Help (%)"
            subtitle="Combined harmful use and dependence requiring professional intervention"
          />
        </Card>
      </div>

      <div className="charts-grid-2" style={{ marginTop: '24px' }}>
        <Card>
          <HorizontalBarChart
            items={dependenceBars}
            title="Substance Dependence Prevalence (%)"
            subtitle="WHO ASSIST score > 26 (substance dependence)"
          />
        </Card>

        <Card className="summary-callout-card">
          <h3>National Quick Highlights</h3>
          <div className="quick-stat-item">
            <div className="quick-stat-badge">8.5 Lakh</div>
            <p><strong>People Who Inject Drugs (PWID):</strong> National total of 845,296. Top states include Uttar Pradesh (100k), Punjab (88k), Delhi (87k).</p>
          </div>
          <div className="quick-stat-item">
            <div className="quick-stat-badge" style={{ background: '#fdf2ed', color: '#b84b24' }}>75% Gap</div>
            <p><strong>Alcohol Treatment Gap:</strong> 75% of dependent individuals who tried quitting received zero professional treatment. Only 1 in 38 received any help.</p>
          </div>
          <div className="quick-stat-item">
            <div className="quick-stat-badge" style={{ background: '#e7f0d9', color: '#2b6957' }}>Youth Risk</div>
            <p><strong>Inhalant Child Vulnerability:</strong> Inhalants are the only substance where prevalence among children/adolescents exceeds that of adults (approx. 4.58 lakh children needing help).</p>
          </div>
        </Card>
      </div>

      {/* Report Supported Insights */}
      <div className="insights-container" style={{ marginTop: '36px' }}>
        <h3 className="sub-section-title">Official Report Findings &amp; Insights</h3>
        <p className="section-desc" style={{ marginBottom: '18px' }}>
          Key evidence-based takeaways confirmed in the MoSJE / NDDTC-AIIMS 2019 report:
        </p>
        <div className="insights-grid">
          <div className="insight-card">
            <span className="insight-num">01</span>
            <p><strong>Alcohol dominance:</strong> Alcohol is by far the most commonly used psychoactive substance covered by the survey (~16 crore users).</p>
          </div>
          <div className="insight-card">
            <span className="insight-num">02</span>
            <p><strong>Secondary burden:</strong> Cannabis and opioids form the next major substance categories in both current use and dependence.</p>
          </div>
          <div className="insight-card">
            <span className="insight-num">03</span>
            <p><strong>Demographic distribution:</strong> Adult men bear the largest burden (~95% of alcohol users are male), but use is also present among women and youth.</p>
          </div>
          <div className="insight-card">
            <span className="insight-num">04</span>
            <p><strong>Child vulnerability:</strong> Inhalants require specialized focus for adolescents, where child prevalence is disproportionately higher than adults.</p>
          </div>
          <div className="insight-card">
            <span className="insight-num">05</span>
            <p><strong>Opioid pattern shift:</strong> Heroin (smack/brown sugar) has surpassed traditional opium as the most commonly used opioid nationally.</p>
          </div>
          <div className="insight-card">
            <span className="insight-num">06</span>
            <p><strong>Injecting drug risks:</strong> India has an estimated 8.5 lakh PWID, with high rates of needle reuse (~50%) and sharing (~27%).</p>
          </div>
          <div className="insight-card">
            <span className="insight-num">07</span>
            <p><strong>Severe treatment gap:</strong> Treatment access is critically low compared to need; only ~12% of drug-dependent individuals receive help.</p>
          </div>
          <div className="insight-card">
            <span className="insight-num">08</span>
            <p><strong>Community service priority:</strong> Inpatient/de-addiction centres alone cannot meet demand; outpatient and community-level interventions are urgent.</p>
          </div>
          <div className="insight-card">
            <span className="insight-num">09</span>
            <p><strong>Multilevel prevention:</strong> Prevention must actively involve families, colleges, schools, and peer networks rather than passive awareness alone.</p>
          </div>
          <div className="insight-card">
            <span className="insight-num">10</span>
            <p><strong>Evidence integrity:</strong> Historical baseline figures establish the scope of the problem but do not substitute for local continuous campus tracking.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
