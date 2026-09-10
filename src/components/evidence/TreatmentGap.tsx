import { Card } from '../../ui'
import { SourceBadge } from './SourceBadge'
import { HorizontalBarChart } from './ChartBar'
import { ShieldAlert } from 'lucide-react'

export function TreatmentGap() {
  const treatmentComparisonBars = [
    {
      label: 'Alcohol: Received Any Treatment',
      value: 2.6, // ~ 1 in 38
      displayValue: '1 in 38 (approx 2.6%)',
      sublabel: 'Proportion of all alcohol-dependent individuals receiving help',
      color: '#d46b48',
    },
    {
      label: 'Alcohol: Inpatient / Hospitalized',
      value: 0.55, // ~ 1 in 180
      displayValue: '1 in 180 (approx 0.55%)',
      sublabel: 'Proportion of alcohol-dependent individuals hospitalized',
      color: '#eb8b68',
    },
    {
      label: 'Illicit Drugs: Received Any Treatment',
      value: 12,
      displayValue: '12% (~1 in 8)',
      sublabel: 'Proportion of all illicit drug-dependent receiving help',
      color: '#2b6957',
    },
    {
      label: 'Illicit Drugs: Inpatient Care',
      value: 5, // ~ 1 in 20
      displayValue: '1 in 20 (~5%)',
      sublabel: 'Proportion receiving inpatient / hospitalization',
      color: '#3d806f',
    },
  ]

  const nmhsGapBars = [
    {
      label: 'Alcohol Use Disorder Treatment Gap (NMHS)',
      value: 86,
      displayValue: '86% Gap',
      sublabel: '86% of affected individuals receive zero formal care',
      color: '#eb8b68',
    },
    {
      label: 'Other Drug Use Disorder Gap (NMHS)',
      value: 73,
      displayValue: '73% Gap',
      sublabel: '73% of affected individuals receive zero formal care',
      color: '#d46b48',
    },
  ]

  return (
    <div className="overview-page">
      <div className="section-head-banner">
        <div>
          <span className="badge-tag">Service Access &amp; Unmet Need</span>
          <h2 className="section-main-title">Substance Treatment Gap in India</h2>
          <p className="section-desc">
            Evidence on health service coverage, quitting attempts, and barriers to formal treatment for substance dependence.
          </p>
        </div>
        <SourceBadge type="government" />
      </div>

      {/* CORE DASHBOARD STATEMENT (Prompt item 15) */}
      <div className="callout-alert-box highlight-statement-box">
        <ShieldAlert size={26} className="statement-icon" />
        <div>
          <h3 className="statement-quote">
            “Substance use disorder treatment demand substantially exceeds treatment availability.”
          </h3>
          <p className="statement-tag">
            Government baseline / historical treatment-gap evidence (MoSJE / NDDTC-AIIMS 2019).
          </p>
        </div>
      </div>

      {/* Treatment Gap KPI Highlights */}
      <div className="treatment-kpi-grid">
        <div className="kpi-stat-card highlight">
          <div className="kpi-card-header">
            <span className="kpi-card-name">Alcohol Treatment Ratio</span>
            <span className="kpi-card-pct">1 in 38</span>
          </div>
          <p className="kpi-explainer">
            Only 1 in 38 people with alcohol dependence ever received any treatment or professional help.
          </p>
        </div>

        <div className="kpi-stat-card highlight">
          <div className="kpi-card-header">
            <span className="kpi-card-name">Alcohol Inpatient Care</span>
            <span className="kpi-card-pct">1 in 180</span>
          </div>
          <p className="kpi-explainer">
            Only 1 in 180 alcohol-dependent persons received inpatient treatment / hospitalization.
          </p>
        </div>

        <div className="kpi-stat-card highlight">
          <div className="kpi-card-header">
            <span className="kpi-card-name">Drug Dependence Treatment</span>
            <span className="kpi-card-pct">12%</span>
          </div>
          <p className="kpi-explainer">
            Only approximately 12% of people dependent on illicit drugs received any medical or counselling assistance.
          </p>
        </div>

        <div className="kpi-stat-card highlight">
          <div className="kpi-card-header">
            <span className="kpi-card-name">Drug Inpatient Care</span>
            <span className="kpi-card-pct">1 in 20</span>
          </div>
          <p className="kpi-explainer">
            Approximately 1 in 20 people with illicit drug dependence accessed inpatient hospitalization.
          </p>
        </div>
      </div>

      {/* Side-by-Side: Alcohol vs Drug Dependence Breakdown */}
      <div className="charts-grid-2" style={{ marginTop: '28px' }}>
        {/* Alcohol Dependence Column */}
        <Card className="gap-detail-card">
          <div className="gap-detail-head">
            <span className="badge-tag">Alcohol Dependence</span>
            <h3>Alcohol Treatment Flow</h3>
          </div>

          <div className="treatment-donut-container">
            <div className="donut-circle alcohol-donut">
              <div className="donut-inner">
                <strong>75%</strong>
                <span>Untreated</span>
              </div>
            </div>
            <div className="donut-legend">
              <div className="legend-item">
                <span className="legend-color" style={{ background: '#d46b48' }} />
                <span><strong>75%</strong> Did not receive any treatment</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ background: '#2b6957' }} />
                <span><strong>25%</strong> Received some help (among quit attempts)</span>
              </div>
            </div>
          </div>

          <div className="treatment-sources-list">
            <h4>Primary Sources of Treatment:</h4>
            <ul>
              <li><strong>Spiritual / religious help:</strong> 33% of those treated</li>
              <li><strong>Government doctor / clinic:</strong> 25% of those treated</li>
              <li><strong>Hospitalization / admission:</strong> 21% of those treated</li>
            </ul>

            <h4 style={{ marginTop: '12px' }}>Inpatient Admissions Distribution:</h4>
            <ul>
              <li><strong>General Government Hospital:</strong> 36%</li>
              <li><strong>Government De-Addiction Centres:</strong> 23%</li>
              <li><strong>NGO De-Addiction Centres:</strong> 7%</li>
            </ul>
          </div>
        </Card>

        {/* Drug Dependence Column */}
        <Card className="gap-detail-card">
          <div className="gap-detail-head">
            <span className="badge-tag">Illicit Drug Dependence</span>
            <h3>Drug Treatment Flow</h3>
          </div>

          <div className="treatment-donut-container">
            <div className="donut-circle drug-donut">
              <div className="donut-inner">
                <strong>88%</strong>
                <span>Unassisted</span>
              </div>
            </div>
            <div className="donut-legend">
              <div className="legend-item">
                <span className="legend-color" style={{ background: '#d46b48' }} />
                <span><strong>88%</strong> Overall drug-dependent receive NO help</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ background: '#2b6957' }} />
                <span><strong>12%</strong> Total received any treatment or counselling</span>
              </div>
            </div>
          </div>

          <div className="treatment-sources-list">
            <h4>Quitting Attempts &amp; Access:</h4>
            <ul>
              <li><strong>Tried quitting:</strong> Approx. 44% of drug-dependent people reported trying to quit.</li>
              <li><strong>Received treatment among those trying:</strong> Approx. 25% received help.</li>
              <li><strong>Net coverage:</strong> Approx. 12% of total dependent population.</li>
            </ul>

            <h4 style={{ marginTop: '12px' }}>Treatment Setting &amp; Modality:</h4>
            <ul>
              <li><strong>Most common source:</strong> Government hospital (40% among treated).</li>
              <li><strong>Inpatient admission rate:</strong> 44% among those receiving treatment.</li>
              <li><strong>Overall inpatient coverage:</strong> ~1 in 20 of total drug-dependent population.</li>
            </ul>
          </div>
        </Card>
      </div>

      {/* Comparison Bar Chart */}
      <div style={{ marginTop: '24px' }}>
        <Card>
          <HorizontalBarChart
            items={treatmentComparisonBars}
            title="Alcohol vs Illicit Drug Treatment Access Rates"
            subtitle="Comparing overall proportion of affected individuals accessing care"
            unit="%"
          />
        </Card>
      </div>

      {/* NMHS Comparison Section */}
      <Card style={{ marginTop: '24px' }}>
        <h3 style={{ font: "600 1.3rem/1.2 'Fraunces', serif", marginBottom: '8px' }}>
          National Mental Health Survey (NMHS) Context
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: '0.86rem', marginBottom: '18px' }}>
          The National Mental Health Survey similarly corroborates an overwhelming treatment gap across psychiatric and substance-related conditions:
        </p>

        <HorizontalBarChart
          items={nmhsGapBars}
          title="NMHS Treatment Gap Estimates"
          subtitle="Proportion of individuals with substance use disorders receiving no medical treatment"
        />

        <div className="treatment-takeaway-box" style={{ marginTop: '18px' }}>
          <strong>Implications for PeerShield Campus Support:</strong>
          <p>
            Because formal inpatient de-addiction facilities can serve only a fraction of dependent individuals, <strong>early peer intervention, confidential stigma-free reporting, and campus counselling navigation</strong> are vital to prevent progressive harm before clinical dependence develops.
          </p>
        </div>
      </Card>
    </div>
  )
}
