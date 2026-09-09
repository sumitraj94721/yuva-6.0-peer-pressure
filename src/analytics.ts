export type SurveyRow = Record<string, string>

export const expectedColumns = ['year_of_study', 'pressure_experience', 'pressure_frequency', 'pressure_context', 'perceived_prevalence', 'refusal_confidence', 'main_reason', 'preferred_intervention', 'preferred_feature']

export function calculatePressureRate(rows: SurveyRow[]) { return rows.length ? Math.round(rows.filter(row => ['Often', 'Very often'].includes(row.pressure_frequency)).length / rows.length * 100) : 0 }
export function calculateAverageConfidence(rows: SurveyRow[]) { if (!rows.length) return 0; const values: Record<string, number> = { 'Not yet confident': 1, 'A little confident': 2, 'Mostly confident': 3, 'Very confident': 4 }; return Math.round(rows.reduce((sum, row) => sum + (values[row.refusal_confidence] ?? 0), 0) / rows.length / 4 * 100) }
export function calculateTopPressureContexts(rows: SurveyRow[]) { return countBy(rows, 'pressure_context') }
export function calculatePreferredInterventions(rows: SurveyRow[]) { return countBy(rows, 'preferred_intervention') }
export function calculateFeatureDemand(rows: SurveyRow[]) { return countBy(rows, 'preferred_feature') }
export function calculatePerceivedNorms(rows: SurveyRow[]) { return countBy(rows, 'perceived_prevalence') }
function countBy(rows: SurveyRow[], key: string) { return rows.reduce<Record<string, number>>((result, row) => { const value = row[key] || 'Not answered'; result[value] = (result[value] || 0) + 1; return result }, {}) }

export function parseCsv(csv: string) { const [headerLine, ...lines] = csv.split(/\r?\n/).filter(line => line.trim()); const headers = headerLine?.split(',').map(value => value.trim()) ?? []; const missingColumns = expectedColumns.filter(column => !headers.includes(column)); const rows = lines.map(line => { const values = line.split(',').map(value => value.trim()); return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])) }).filter(row => Object.values(row).some(Boolean)); const invalidRows = rows.filter(row => expectedColumns.some(column => !row[column])); return { headers, rows, validRows: rows.filter(row => !invalidRows.includes(row)), invalidRows, missingColumns } }
