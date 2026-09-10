export type EvidenceCategory =
  | 'Tobacco / Nicotine'
  | 'Alcohol'
  | 'Drug / Substance Use'
  | 'Peer Influence'
  | 'Campus Environment'
  | 'Student Safety'
  | 'Prevention'
  | 'Government Support'

export type EvidenceSourceType =
  | 'OFFICIAL DATA'
  | 'SCIENTIFIC EVIDENCE'
  | 'CAMPUS SURVEY'
  | 'PEERSHIELD PLATFORM DATA'
  | 'DEMO DATA'

export type EvidenceStatus =
  | 'VERIFIED_OFFICIAL'
  | 'VERIFIED_SCIENTIFIC'
  | 'CAMPUS_SURVEY'
  | 'PEERSHIELD_PLATFORM'
  | 'DEMO'
  | 'UNAVAILABLE'

export interface EvidenceSource {
  id: string
  sourceName: string
  sourceOrganization: string
  sourceType: EvidenceSourceType
  reportTitle: string
  publicationYear: number | null
  dataYear: string | null
  population: string
  geography: string
  sampleSize: number | string | null
  indicators: string[]
  methodology: string
  sourceURL: string
  lastVerified: string
  limitations: string[]
}

export interface EvidenceRecord {
  id: string
  sourceId: string
  indicator: string
  category: EvidenceCategory
  value: number | null
  unit: string
  percentage: number | null
  definition: string
  population: string
  ageRange: string | null
  geography: string
  sampleSize: number | string | null
  methodology: string
  sourceURL: string
  lastVerified: string
  evidenceLevel: 'OFFICIAL' | 'SCIENTIFIC' | 'CAMPUS' | 'PLATFORM' | 'DEMO' | 'UNAVAILABLE'
  limitations: string[]
  status: EvidenceStatus
}