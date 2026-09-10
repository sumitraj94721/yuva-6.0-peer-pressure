import { Card } from '../../ui'
import { SourceBadge } from './SourceBadge'
import { governmentBaseline2018 } from '../../data/governmentBaseline2018'
import { AlertTriangle } from 'lucide-react'

export function MethodologyPage() {
  const { methodology, definitions } = governmentBaseline2018

  return (
    <div className="overview-page">
      <div className="section-head-banner">
        <div>
          <span className="badge-tag">Rigorous Scientific Design</span>
          <h2 className="section-main-title">Survey Methodology &amp; Definitions</h2>
          <p className="section-desc">
            National Survey on Extent and Pattern of Substance Use in India (MoSJE / NDDTC-AIIMS, 2019).
          </p>
        </div>
        <SourceBadge type="government" />
      </div>

      {/* CORE METHODOLOGY CITATION STATEMENT */}
      <Card className="methodology-intro-card">
        <p className="methodology-core-statement">
          “The National Survey on Extent and Pattern of Substance Use in India was conducted across all 36 States and Union Territories.
          The survey used a Household Sample Survey among the 10–75-year-old general population and a Respondent Driven Sampling approach
          among people dependent on illicit drugs. The results presented in the report were projected to the estimated 2018 population.”
        </p>
        <div className="temporal-warning-pill">
          <AlertTriangle size={16} />
          <span>These figures are historical government baseline estimates and should not be interpreted as current 2025 prevalence.</span>
        </div>
      </Card>

      {/* 2 Sampling Pillars: HHS and RDS */}
      <div className="charts-grid-2" style={{ marginTop: '24px' }}>
        <Card>
          <span className="badge-tag">Pillar 1: General Population</span>
          <h3 style={{ font: "600 1.4rem/1.2 'Fraunces', serif", margin: '10px 0 14px' }}>
            Household Sample Survey (HHS)
          </h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '16px' }}>
            Designed to estimate the prevalence of substance use in the general community across urban and rural clusters.
          </p>

          <div className="methodology-stats-list">
            <div className="meth-stat-row">
              <span>Geographic Coverage:</span>
              <strong>186 districts across all 36 States &amp; UTs</strong>
            </div>
            <div className="meth-stat-row">
              <span>Households Visited:</span>
              <strong>{methodology.hhsSampleHouseholds.toLocaleString('en-IN')} households</strong>
            </div>
            <div className="meth-stat-row">
              <span>Individuals Interviewed:</span>
              <strong>{methodology.hhsIndividuals.toLocaleString('en-IN')} individuals</strong>
            </div>
            <div className="meth-stat-row">
              <span>Population Age Range:</span>
              <strong>{methodology.hhsAgeRange}</strong>
            </div>
            <div className="meth-stat-row">
              <span>Primary Sampling Units:</span>
              <strong>{methodology.hhsPrimaryUnits.toLocaleString('en-IN')} PSUs</strong>
            </div>
            <div className="meth-stat-row">
              <span>Eligible Member Response Rate:</span>
              <strong>{methodology.hhsResponseRate}% successfully completed</strong>
            </div>
          </div>
        </Card>

        <Card>
          <span className="badge-tag">Pillar 2: High-Risk Populations</span>
          <h3 style={{ font: "600 1.4rem/1.2 'Fraunces', serif", margin: '10px 0 14px' }}>
            Respondent Driven Sampling (RDS)
          </h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '16px' }}>
            Peer-referral sampling designed specifically to reach hidden, stigmatized populations with illicit drug dependence.
          </p>

          <div className="methodology-stats-list">
            <div className="meth-stat-row">
              <span>Geographic Coverage:</span>
              <strong>135 districts across 34 States &amp; UTs</strong>
            </div>
            <div className="meth-stat-row">
              <span>Dependent Individuals Interviewed:</span>
              <strong>{methodology.rdsPeopleInterviewed.toLocaleString('en-IN')} participants</strong>
            </div>
            <div className="meth-stat-row">
              <span>Recruitment Mechanism:</span>
              <strong>Chain-referral peer recruitment via initial seeds</strong>
            </div>
            <div className="meth-stat-row">
              <span>Field Personnel:</span>
              <strong>&gt; 1,500 trained data collection personnel</strong>
            </div>
            <div className="meth-stat-row">
              <span>Collection Period:</span>
              <strong>{methodology.dataCollectionPeriod}</strong>
            </div>
            <div className="meth-stat-row">
              <span>Tobacco Exclusion Rationale:</span>
              <strong>Recent robust surveys (GATS India) already existed</strong>
            </div>
          </div>
        </Card>
      </div>

      {/* Exact Technical Definitions (Section 3) */}
      <Card style={{ marginTop: '24px' }}>
        <h3 style={{ font: "600 1.3rem/1.2 'Fraunces', serif", marginBottom: '16px' }}>
          Standardized Source Definitions (As Used in the Report)
        </h3>

        <div className="definitions-grid">
          <div className="def-card">
            <h4>CURRENT USE</h4>
            <p>{definitions.currentUse}</p>
          </div>

          <div className="def-card">
            <h4>DEPENDENCE</h4>
            <p>{definitions.dependence}</p>
          </div>

          <div className="def-card">
            <h4>HARMFUL USE</h4>
            <p>{definitions.harmfulUse}</p>
          </div>

          <div className="def-card">
            <h4>QUANTUM OF WORK</h4>
            <p>{definitions.quantumOfWork}</p>
          </div>

          <div className="def-card">
            <h4>OPIOIDS</h4>
            <p>{definitions.opioids}</p>
          </div>

          <div className="def-card">
            <h4>CANNABIS</h4>
            <p>{definitions.cannabis}</p>
          </div>

          <div className="def-card">
            <h4>SEDATIVES</h4>
            <p>{definitions.sedatives}</p>
          </div>

          <div className="def-card">
            <h4>INDIAN NUMERICAL UNITS</h4>
            <p><strong>1 Crore:</strong> 10 million &bull; <strong>1 Lakh:</strong> 0.1 million (100,000).</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
