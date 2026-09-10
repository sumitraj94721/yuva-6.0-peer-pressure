import { Card } from '../../ui'
import { SourceBadge } from './SourceBadge'
import { HorizontalBarChart } from './ChartBar'
import { governmentBaseline2018 } from '../../data/governmentBaseline2018'
import { AlertOctagon } from 'lucide-react'

export function YouthInhalantRisk() {
  const { youthRisk } = governmentBaseline2018

  // Top states bar chart for children needing help
  const stateBars = [
    ...youthRisk.topStates.map((st) => ({
      label: st.state,
      value: st.childrenNeedingHelp,
      displayValue: `${st.childrenNeedingHelp.toLocaleString('en-IN')} (${st.label})`,
      color: '#eb8b68',
    })),
    {
      label: 'All Other States Combined',
      value: youthRisk.allOtherStates,
      displayValue: `${youthRisk.allOtherStates.toLocaleString('en-IN')} (201 thousand)`,
      color: '#738c82',
    },
  ]

  // Children vs Adults needing help
  const ageComparisonBars = [
    {
      label: 'Children Needing Help (Age 10–17)',
      value: youthRisk.nationalChildrenNeedingHelp,
      displayValue: `${youthRisk.nationalChildrenNeedingHelpLabel} (458,000)`,
      sublabel: 'Disproportionately elevated child burden',
      color: '#d46b48',
    },
    {
      label: 'Adults Needing Help (Age 18–75)',
      value: youthRisk.nationalAdultsNeedingHelp,
      displayValue: `${youthRisk.nationalAdultsNeedingHelpLabel} (1,800,000)`,
      sublabel: 'Adult problematic inhalant users',
      color: '#2b6957',
    },
  ]

  return (
    <div className="overview-page">
      <div className="section-head-banner">
        <div>
          <span className="badge-tag">Vulnerable Populations</span>
          <h2 className="section-main-title">Youth &amp; Inhalant Substance Risk</h2>
          <p className="section-desc">
            Specific findings on child and adolescent substance vulnerability from the MoSJE / NDDTC-AIIMS national survey baseline.
          </p>
        </div>
        <SourceBadge type="government" />
      </div>

      {/* CRITICAL YOUTH RISK ALERT BANNER */}
      <div className="callout-alert-box warning-box" style={{ background: '#fff5f2', borderColor: '#f4b8a5' }}>
        <AlertOctagon size={28} style={{ color: '#d46b48', flexShrink: 0 }} />
        <div>
          <h3 style={{ color: '#b84b24', margin: '0 0 4px', font: "600 1.25rem/1.2 'Fraunces', serif" }}>
            Critical Child Finding: Inhalant Reversal Pattern
          </h3>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#66736e', lineHeight: 1.5 }}>
            {youthRisk.keyFinding}
            <br />
            While adults have higher prevalence across alcohol, opioids, and cannabis, <strong>inhalants are the unique category where children (10–17 years) exhibit greater vulnerability and higher proportional prevalence</strong>.
          </p>
        </div>
      </div>

      {/* Key Stats Grid */}
      <div className="treatment-kpi-grid" style={{ marginTop: '24px' }}>
        <div className="kpi-stat-card highlight" style={{ borderColor: '#d46b48' }}>
          <div className="kpi-card-header">
            <span className="kpi-card-name">Children Needing Help</span>
            <span className="kpi-card-pct">4.58 Lakh</span>
          </div>
          <p className="kpi-explainer">
            Nationally, an estimated <strong>458,000 children (10–17 years)</strong> require professional help for problematic inhalant use.
          </p>
        </div>

        <div className="kpi-stat-card">
          <div className="kpi-card-header">
            <span className="kpi-card-name">Adults Needing Help</span>
            <span className="kpi-card-pct">18 Lakh</span>
          </div>
          <p className="kpi-explainer">
            Approximately 18 lakh adults nationally need professional help for harmful inhalant use.
          </p>
        </div>

        <div className="kpi-stat-card">
          <div className="kpi-card-header">
            <span className="kpi-card-name">National Inhalant Users</span>
            <span className="kpi-card-pct">77 Lakh</span>
          </div>
          <p className="kpi-explainer">
            0.70% of the 10–75 year population (~77 lakh people) used volatile inhalants in the preceding 12 months.
          </p>
        </div>

        <div className="kpi-stat-card">
          <div className="kpi-card-header">
            <span className="kpi-card-name">Dependent Inhalant Users</span>
            <span className="kpi-card-pct">8.5 Lakh</span>
          </div>
          <p className="kpi-explainer">
            0.08% (~8.5 lakh people) meet clinical criteria for inhalant dependence (WHO ASSIST &gt; 26).
          </p>
        </div>
      </div>

      {/* Bar Charts */}
      <div className="charts-grid-2" style={{ marginTop: '28px' }}>
        <Card>
          <HorizontalBarChart
            items={stateBars}
            title="Children Needing Help for Problem Inhalant Use"
            subtitle="Top 5 states and balance of India (absolute number of children aged 10–17)"
            unit=""
          />
        </Card>

        <Card>
          <HorizontalBarChart
            items={ageComparisonBars}
            title="Estimated Quantum of Work: Children vs Adults"
            subtitle="Comparison of absolute numbers requiring medical/psychosocial assistance"
            unit=""
          />

          <div className="youth-prevention-note" style={{ marginTop: '24px' }}>
            <h4>Why This Matters on Campus:</h4>
            <p>
              Inhalants are frequently accessible as commercial adhesives, thinners, correction fluids, and aerosol propellants.
              Students transitioning from high school into college often encounter experimental peer pressure.
              Because early inhalant use is tightly coupled with school environments, <strong>PeerShield’s safe reporting, campus champions, and refusal simulation</strong> offer early intervention before severe neurotoxicity occurs.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
