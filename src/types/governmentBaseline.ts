/**
 * Government of India / NDDTC-AIIMS
 * Magnitude of Substance Use in India (2019)
 * Survey period: December 2017 – October 2018
 * Estimates based on 2018 population
 *
 * These types model the structured dataset for the national survey.
 * Data labels: "Government Baseline / 2018 Survey"
 * NEVER label as 2025 data.
 */

/** Metrics for a given substance in a given geography */
export interface SubstanceMetrics {
  /** Percentage of 10–75 year population who used the substance at least once in last 12 months */
  currentUsePct: number | null
  /** Percentage meeting WHO ASSIST dependence threshold (>26) */
  dependencePct: number | null
  /** Harmful use + dependence combined ("quantum of work") */
  quantumOfWorkPct: number | null
}

/** National-level data for a single substance, including absolute estimates */
export interface NationalSubstanceData extends SubstanceMetrics {
  /** Estimated total current users in crore (1 crore = 10 million) */
  estimatedCurrentUsers: string | null
  /** Estimated dependents (e.g. "2.9 crore") */
  estimatedDependent: string | null
  /** Estimated people needing professional help (quantum of work) */
  estimatedProblemUsers: string | null
  /** Any additional notes specific to this substance */
  notes: string[]
}

/** State / UT level data for a single substance */
export interface StateSubstanceRecord extends SubstanceMetrics {
  /** ISO state code as used in the report */
  stateCode: string
  /** State or Union Territory name */
  state: string
}

/** Full substance entry in the dataset */
export interface SubstanceBaseline {
  /** Substance identifier key */
  substance: SubstanceName
  /** Display label */
  label: string
  /** Brief definition as per report */
  definition: string
  /** National aggregate data */
  india: NationalSubstanceData
  /** All 36 States / UTs from Annexure 1 */
  states: StateSubstanceRecord[]
}

export type SubstanceName =
  | 'alcohol'
  | 'cannabis'
  | 'opioids'
  | 'sedatives'
  | 'cocaine'
  | 'ats'
  | 'inhalants'
  | 'hallucinogens'

/** PWID data for a specific state */
export interface StateWIDRecord {
  state: string
  estimatedPWID: number
}

/** People Who Inject Drugs national data */
export interface PWIDData {
  nationalTotal: number
  nationalTotalLabel: string
  topStates: StateWIDRecord[]
  /** Predominant injected substances with percentage */
  predominantSubstances: Array<{ substance: string; pct: number }>
  /** Risk behaviour statistics */
  riskBehaviours: Array<{ description: string; pct: number | null }>
}

/** Treatment access data for one population (alcohol or drug-dependent) */
export interface TreatmentAccessGroup {
  label: string
  triedQuittingPct: number | null
  receivedTreatmentPct: number
  /** Among those who received treatment */
  treatmentSources: Array<{ source: string; pct: number }>
  receivedInpatientPct: number
  /** Plain-language stat for display */
  treatmentGapStatement: string
}

/** Treatment gap data for the report */
export interface TreatmentGapData {
  alcohol: TreatmentAccessGroup
  drugs: TreatmentAccessGroup
  /** NMHS comparison figures */
  nmhsComparison: {
    alcoholUseDisorderGap: number
    otherDrugUseDisorderGap: number
    note: string
  }
}

/** Youth inhalant risk per state */
export interface YouthInhalantState {
  state: string
  childrenNeedingHelp: number
  label: string
}

/** Youth / children inhalant risk data */
export interface YouthRiskData {
  /** Key finding text */
  keyFinding: string
  nationalChildrenNeedingHelp: number
  nationalChildrenNeedingHelpLabel: string
  nationalAdultsNeedingHelp: number
  nationalAdultsNeedingHelpLabel: string
  topStates: YouthInhalantState[]
  allOtherStates: number
}

/** Survey methodology data */
export interface MethodologyData {
  coverageStatesUTs: number
  hhsSampleHouseholds: number
  hhsDistricts: number
  hhsIndividuals: number
  hhsAgeRange: string
  hhsPrimaryUnits: number
  hhsResponseRate: number
  rdsDistricts: number
  rdsStatesUTs: number
  rdsPeopleInterviewed: number
  totalPersonnel: number
  dataCollectionPeriod: string
  substancesCovered: string[]
}

/** Root data object */
export interface GovernmentBaselineDataset {
  sourceId: string
  sourceOrganization: string
  report: string
  publicationYear: number
  surveyPeriod: string
  estimateYear: number
  populationAge: string
  geography: string
  citationBadge: string
  substances: SubstanceBaseline[]
  pwid: PWIDData
  treatmentGap: TreatmentGapData
  youthRisk: YouthRiskData
  methodology: MethodologyData
  definitions: Record<string, string>
}
