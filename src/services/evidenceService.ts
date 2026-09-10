import { evidenceData } from '../data/evidenceData'
import { sourceRegistry } from '../data/sourceRegistry'
import type { EvidenceCategory, EvidenceRecord, EvidenceSource, EvidenceSourceType } from '../types/evidence'

const REQUIRED_SOURCE_FIELDS: Array<keyof EvidenceSource> = [
  'sourceName', 'sourceOrganization', 'reportTitle', 'population', 'geography', 'methodology', 'sourceURL', 'lastVerified'
]

export function getEvidenceByCategory(category?: EvidenceCategory): EvidenceRecord[] {
  return category ? evidenceData.filter((record) => record.category === category) : [...evidenceData]
}

export function getEvidenceBySourceType(sourceType: EvidenceSourceType): EvidenceRecord[] {
  const sourceIds = new Set(sourceRegistry.filter((source) => source.sourceType === sourceType).map((source) => source.id))
  return evidenceData.filter((record) => sourceIds.has(record.sourceId))
}

export function getSourceById(sourceId: string): EvidenceSource | undefined {
  return sourceRegistry.find((source) => source.id === sourceId)
}

export function validateEvidenceRecord(record: EvidenceRecord): string[] {
  const source = getSourceById(record.sourceId)
  const errors: string[] = []

  if (!source) errors.push('Source is not registered.')
  if (record.status !== 'UNAVAILABLE' && record.value === null) errors.push('Verified record has no value.')
  if (!record.population) errors.push('Population is required.')
  if (!record.geography) errors.push('Geography is required.')
  if (!record.limitations.length) errors.push('At least one limitation is required.')
  if (source) {
    for (const field of REQUIRED_SOURCE_FIELDS) {
      if (!source[field]) errors.push(`${field} is required on the source.`)
    }
  }

  return errors
}

export function getEvidenceQualityIssues(records: EvidenceRecord[] = evidenceData): Array<{ id: string; errors: string[] }> {
  return records
    .map((record) => ({ id: record.id, errors: validateEvidenceRecord(record) }))
    .filter((result) => result.errors.length > 0)
}

export function isDisplayableEvidence(record: EvidenceRecord): boolean {
  return record.status !== 'UNAVAILABLE' && validateEvidenceRecord(record).length === 0
}