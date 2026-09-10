import { useSearchParams } from 'react-router-dom'
import { Badge } from '../../ui'
import { IndiaOverview } from './IndiaOverview'
import { UttarakhandOverview } from './UttarakhandOverview'
import { StateComparison } from './StateComparison'
import { SubstanceComparison } from './SubstanceComparison'
import { TreatmentGap } from './TreatmentGap'
import { InjectingDrugUse } from './InjectingDrugUse'
import { YouthInhalantRisk } from './YouthInhalantRisk'
import { MethodologyPage } from './MethodologyPage'
import { DataSources } from './DataSources'
import {
  Globe,
  MapPin,
  BarChart3,
  Layers,
  HeartCrack,
  Syringe,
  AlertTriangle,
  BookOpen,
  FileText,
} from 'lucide-react'

export type EvidenceTab =
  | 'india'
  | 'uttarakhand'
  | 'states'
  | 'substances'
  | 'treatment-gap'
  | 'pwid'
  | 'youth-inhalants'
  | 'methodology'
  | 'sources'

interface TabDef {
  id: EvidenceTab
  label: string
  icon: React.ReactNode
}

const TABS: TabDef[] = [
  { id: 'india', label: 'India Overview', icon: <Globe size={15} /> },
  { id: 'uttarakhand', label: 'Uttarakhand Overview', icon: <MapPin size={15} /> },
  { id: 'states', label: 'State Comparison', icon: <BarChart3 size={15} /> },
  { id: 'substances', label: 'Substance Comparison', icon: <Layers size={15} /> },
  { id: 'treatment-gap', label: 'Treatment Gap', icon: <HeartCrack size={15} /> },
  { id: 'pwid', label: 'Injecting Drug Use', icon: <Syringe size={15} /> },
  { id: 'youth-inhalants', label: 'Youth / Inhalants', icon: <AlertTriangle size={15} /> },
  { id: 'methodology', label: 'Methodology', icon: <FileText size={15} /> },
  { id: 'sources', label: 'Data Sources', icon: <BookOpen size={15} /> },
]

export function EvidenceDashboard() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab') as EvidenceTab | null
  const activeTab: EvidenceTab = tabParam && TABS.some((t) => t.id === tabParam) ? tabParam : 'india'

  const handleTabChange = (tabId: EvidenceTab) => {
    setSearchParams({ tab: tabId })
  }

  return (
    <main className="page evidence-page">
      <div className="evidence-header-area">
        <div className="evidence-brand-line">
          <Badge tone="warm">Government Evidence Baseline</Badge>
          <span className="temporal-badge">Survey 2017–2018 &bull; Projected 2018 Population</span>
        </div>
        <h1 className="evidence-page-title">Evidence &amp; Substance Data</h1>
        <p className="hero-text" style={{ maxWidth: '780px' }}>
          National Drug Dependence Treatment Centre (NDDTC), AIIMS &amp; Ministry of Social Justice and Empowerment (MoSJE) benchmark data for evidence-informed prevention.
        </p>

        {/* 9-Tab Navigation Bar */}
        <nav className="evidence-subnav" aria-label="Evidence Sections">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                className={`evidence-nav-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Contents */}
      <div className="evidence-tab-content">
        {activeTab === 'india' && <IndiaOverview />}
        {activeTab === 'uttarakhand' && <UttarakhandOverview />}
        {activeTab === 'states' && <StateComparison />}
        {activeTab === 'substances' && <SubstanceComparison />}
        {activeTab === 'treatment-gap' && <TreatmentGap />}
        {activeTab === 'pwid' && <InjectingDrugUse />}
        {activeTab === 'youth-inhalants' && <YouthInhalantRisk />}
        {activeTab === 'methodology' && <MethodologyPage />}
        {activeTab === 'sources' && <DataSources />}
      </div>
    </main>
  )
}
