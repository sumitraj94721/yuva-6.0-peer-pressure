export type ProgressState = {
  checkIns: number
  scenarios: number
  confidence: number
  calmActivities: number
  reports: number
  quizzesCompleted?: number
  aiSessions?: number
  resourcesViewed?: number
  healthyChallenges?: number
}

const key = 'peershield-progress'
const checkInKey = 'peershield-check-in'
const reportKey = 'peershield-reports'

export const defaultProgress: ProgressState = {
  checkIns: 0,
  scenarios: 0,
  confidence: 0,
  calmActivities: 0,
  reports: 0,
  quizzesCompleted: 0,
  aiSessions: 0,
  resourcesViewed: 0,
  healthyChallenges: 0
}

function read<T>(storageKey: string, fallback: T): T {
  try {
    const value = localStorage.getItem(storageKey)
    return value ? JSON.parse(value) as T : fallback
  } catch { return fallback }
}

export function getProgress() { return read(key, defaultProgress) }
export function saveProgress(progress: ProgressState) { localStorage.setItem(key, JSON.stringify(progress)) }
export function addProgress(update: Partial<ProgressState>) { const next = { ...getProgress(), ...update }; saveProgress(next); return next }
export function saveCheckIn(answers: Record<string, string>) { localStorage.setItem(checkInKey, JSON.stringify(answers)); addProgress({ checkIns: getProgress().checkIns + 1 }) }
export function saveReport(report: Record<string, string>) { const reports = read<Record<string, string>[]>(reportKey, []); reports.push(report); localStorage.setItem(reportKey, JSON.stringify(reports)); addProgress({ reports: getProgress().reports + 1 }) }
