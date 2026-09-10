import { Card } from '../../ui'
import { SourceBadge } from './SourceBadge'

export function DataSources() {
  return (
    <div className="overview-page">
      <div className="section-head-banner">
        <div>
          <span className="badge-tag">Citation &amp; Provenance</span>
          <h2 className="section-main-title">Data Sources &amp; Architecture</h2>
          <p className="section-desc">
            Full bibliographic citations, dataset separation protocols, and hierarchical data provenance.
          </p>
        </div>
        <SourceBadge type="government" />
      </div>

      {/* Official Government Citation Card */}
      <Card className="citation-main-card">
        <div className="citation-grid">
          <div>
            <span className="badge-tag">Primary Official Source</span>
            <h3 style={{ font: "600 1.5rem/1.2 'Fraunces', serif", margin: '8px 0 16px' }}>
              Magnitude of Substance Use in India (2019)
            </h3>

            <div className="citation-field-list">
              <div className="citation-field">
                <span className="field-label">Commissioning Authority:</span>
                <span className="field-val">Ministry of Social Justice and Empowerment (MoSJE), Government of India</span>
              </div>
              <div className="citation-field">
                <span className="field-label">Executing Institution:</span>
                <span className="field-val">National Drug Dependence Treatment Centre (NDDTC), All India Institute of Medical Sciences (AIIMS), New Delhi</span>
              </div>
              <div className="citation-field">
                <span className="field-label">Official Survey Title:</span>
                <span className="field-val">National Survey on Extent and Pattern of Substance Use in India</span>
              </div>
              <div className="citation-field">
                <span className="field-label">Publication Date:</span>
                <span className="field-val">February 2019</span>
              </div>
              <div className="citation-field">
                <span className="field-label">Field Data Collection:</span>
                <span className="field-val">December 2017 – October 2018</span>
              </div>
              <div className="citation-field">
                <span className="field-label">Population Projections:</span>
                <span className="field-val">2018 Census-projected population (10–75 years)</span>
              </div>
            </div>
          </div>

          <div className="citation-badge-showcase">
            <h4 style={{ margin: '0 0 12px', fontSize: '0.9rem' }}>Official Source Attribution Badge:</h4>
            <SourceBadge type="government" />

            <h4 style={{ margin: '20px 0 12px', fontSize: '0.9rem' }}>PeerShield Local Attribution Badge:</h4>
            <SourceBadge type="peershield" />

            <p className="badge-rule-note">
              <strong>Mandatory Protocol:</strong> Government 2018 baseline figures and PeerShield 2025 local figures never share or merge source labels.
            </p>
          </div>
        </div>
      </Card>

      {/* Dataset Hierarchy Architecture */}
      <Card style={{ marginTop: '24px' }}>
        <h3 style={{ font: "600 1.3rem/1.2 'Fraunces', serif", marginBottom: '8px' }}>
          Data Hierarchy &amp; Multi-Tier Separation
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: '0.86rem', marginBottom: '18px' }}>
          PeerShield maintains strict isolation between national baseline benchmarks and real-time student interactions:
        </p>

        <div className="hierarchy-tree-box">
          <pre className="hierarchy-code">{`PeerShield Architecture
|
|-- Existing 2025 Data
|     |-- College (GEU, GEHU, UPES, DIT, DBS)
|     |-- Survey (Campus Pulse, Student Reflections)
|     |-- Peer Pressure & Simulator Scenarios
|     |-- Bullying / Ragging Incident Box
|     |-- Support & Emergency Helplines (112, Tele-MANAS)
|     |-- NGO & Counselling Centres Directory
|
|-- Government Baseline 2018 (MoSJE / NDDTC-AIIMS)
|     |-- India National Total (10–75 Age)
|     |-- State/UT (All 36 Jurisdictions - Annexure 1)
|     |-- 8 Substance Categories
|     |-- Current Use % (12 Months)
|     |-- Dependence % (WHO ASSIST > 26)
|     |-- Quantum of Work % (Harmful + Dependent)
|     |-- Treatment Gap & Hospital Coverage
|     |-- People Who Inject Drugs (PWID - 8.45 Lakh)
|     |-- Youth & Adolescent Inhalant Risk
|
|-- Local PeerShield Data
      |-- Dehradun District
      |-- Vikasnagar
      |-- Sahaspur
      |-- Colleges (Campus Specific Trends)
      |-- Student Champions & Peer Circles
      |-- 2025 Local Survey`}</pre>
        </div>
      </Card>

      {/* Missing Data Policy */}
      <Card style={{ marginTop: '24px' }}>
        <h3 style={{ font: "600 1.3rem/1.2 'Fraunces', serif", marginBottom: '8px' }}>
          Missing Data &amp; Non-Fabrication Protocol
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: '0.86rem', lineHeight: 1.55 }}>
          If a specific data point (such as a district-level prevalence, or college-specific addiction rate) is absent from the 2019 report:
        </p>
        <ul className="clean-list">
          <li>We <strong>never</strong> mathematically interpolate or estimate district figures from state percentages.</li>
          <li>We <strong>never</strong> assign artificial zero values to survey cells marked undetectable (&ldquo;--&rdquo;).</li>
          <li>We explicitly display &ldquo;<strong>Data not available in this source</strong>&rdquo; or &ldquo;<strong>Undetectable</strong>&rdquo;.</li>
          <li>We cleanly separate local peer data from national public health baselines.</li>
        </ul>
      </Card>
    </div>
  )
}
