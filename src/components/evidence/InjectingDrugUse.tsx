import { Card } from '../../ui'
import { SourceBadge } from './SourceBadge'
import { HorizontalBarChart } from './ChartBar'
import { governmentBaseline2018 } from '../../data/governmentBaseline2018'

export function InjectingDrugUse() {
  const { pwid } = governmentBaseline2018

  // State ranking bars
  const pwidStateBars = pwid.topStates.map((st) => ({
    label: st.state,
    value: st.estimatedPWID,
    displayValue: `${st.estimatedPWID.toLocaleString('en-IN')}`,
    color: '#eb8b68',
  }))

  // Predominant substances bars
  const substanceBars = pwid.predominantSubstances.map((s) => ({
    label: s.substance,
    value: s.pct,
    displayValue: `${s.pct}%`,
    color: '#2b6957',
  }))

  // Risk behaviours
  const riskBars = pwid.riskBehaviours.map((r) => ({
    label: r.description,
    value: r.pct,
    displayValue: `${r.pct}%`,
    color: '#d46b48',
  }))

  return (
    <div className="overview-page">
      <div className="section-head-banner">
        <div>
          <span className="badge-tag">High-Risk Substance Use</span>
          <h2 className="section-main-title">People Who Inject Drugs (PWID)</h2>
          <p className="section-desc">
            National estimates and risk behaviours from the Respondent Driven Sampling (RDS) survey of people with drug dependence across 135 districts.
          </p>
        </div>
        <SourceBadge type="government" />
      </div>

      {/* National PWID Total Headline Cards */}
      <div className="treatment-kpi-grid">
        <div className="kpi-stat-card highlight" style={{ borderColor: '#eb8b68' }}>
          <div className="kpi-card-header">
            <span className="kpi-card-name">Estimated PWID in India</span>
            <span className="kpi-card-pct">8.45 Lakh</span>
          </div>
          <p className="kpi-explainer">
            Exact survey estimate: <strong>{pwid.nationalTotal.toLocaleString('en-IN')} individuals</strong> (approximately 8.5 lakh people).
          </p>
        </div>

        <div className="kpi-stat-card">
          <div className="kpi-card-header">
            <span className="kpi-card-name">Daily Injecting Rate</span>
            <span className="kpi-card-pct">49%</span>
          </div>
          <p className="kpi-explainer">
            Nearly half of surveyed PWID reported injecting drugs on a daily basis; an additional 18% inject 4–6 times weekly.
          </p>
        </div>

        <div className="kpi-stat-card">
          <div className="kpi-card-header">
            <span className="kpi-card-name">Needle Re-use Rate</span>
            <span className="kpi-card-pct">~50%</span>
          </div>
          <p className="kpi-explainer">
            Approximately half reported reusing needles/syringes, elevating risk for hepatitis C, HIV, and soft tissue sepsis.
          </p>
        </div>

        <div className="kpi-stat-card">
          <div className="kpi-card-header">
            <span className="kpi-card-name">Peer Needle Sharing</span>
            <span className="kpi-card-pct">27%</span>
          </div>
          <p className="kpi-explainer">
            More than a quarter shared injection equipment with peers in the preceding 12 months.
          </p>
        </div>
      </div>

      {/* Top States Ranking */}
      <div className="charts-grid-2" style={{ marginTop: '28px' }}>
        <Card>
          <HorizontalBarChart
            items={pwidStateBars}
            title="Top States by Estimated Number of PWID"
            subtitle="Estimated count of people who inject drugs (from MoSJE/NDDTC PWID survey table)"
            unit=""
          />
          <p className="table-footnote" style={{ marginTop: '10px' }}>
            * Exact values from the report's PWID state table. States not listed were either not covered in RDS or had smaller sample clusters.
          </p>
        </Card>

        <Card>
          <HorizontalBarChart
            items={substanceBars}
            title="Predominant Injected Substances"
            subtitle="Percentage of PWID reporting use of specific injectables"
          />

          <div style={{ marginTop: '24px' }}>
            <HorizontalBarChart
              items={riskBars}
              title="Injection-Related Health Risk Indicators"
              subtitle="Prevalence of high-risk injecting practices and physical complications"
            />
          </div>
        </Card>
      </div>

      {/* Clinical & Harm Reduction Insights */}
      <Card style={{ marginTop: '24px' }}>
        <h3 style={{ font: "600 1.3rem/1.2 'Fraunces', serif", marginBottom: '8px' }}>
          Key PWID Insights &amp; Clinical Complications
        </h3>
        <div className="uk-highlights-list">
          <div className="uk-highlight-row">
            <strong>Opioid Dual Burden:</strong>
            <span>Heroin (46%) and injectable pharmaceutical opioids such as buprenorphine (46%) are equally dominant among PWID in India.</span>
          </div>
          <div className="uk-highlight-row">
            <strong>Vascular Complications:</strong>
            <span>Approximately one-third (~33%) of individuals reported vein-related complications; 28% experienced injection-site ulcers or abscesses.</span>
          </div>
          <div className="uk-highlight-row">
            <strong>Harm Reduction Imperative:</strong>
            <span>Given the high rates of peer needle-sharing (27%), needle-syringe exchange programs (NSEP) and Opioid Agonist Treatment (OAT) represent critical public health priorities.</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
