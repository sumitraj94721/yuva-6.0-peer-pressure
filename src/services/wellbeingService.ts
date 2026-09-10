import type { WellbeingEntry } from '../types/models'

const STORAGE_KEY = 'peershield_wellbeing_7day'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function getSevenDaysSeed(): WellbeingEntry[] {
  const list: WellbeingEntry[] = []
  const today = new Date()

  // Generate 7 consecutive days up to today
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(today.getDate() - i)
    const dateStr = d.toISOString().slice(0, 10)
    const dayLabel = DAYS[d.getDay()]

    // Demo values
    const demoStress = i === 4 ? 4 : i === 3 ? 4 : i === 0 ? 2 : 3
    const demoPressure = i === 4 ? 4 : i === 1 ? 3 : 2
    const demoMood: WellbeingEntry['mood'] = demoStress >= 4 ? 'Difficult' : demoStress === 3 ? 'Okay' : 'Good'

    list.push({
      id: `wb-${dateStr}`,
      date: dateStr,
      dayLabel,
      mood: demoMood,
      stress: demoStress,
      pressure: demoPressure,
      sleepQuality: demoStress >= 4 ? 'Difficult' : 'Good',
      healthyActivity: i === 0 ? 'Evening walk & tea' : i === 2 ? 'Calm Zone breathing' : 'Group badminton',
      notes: i === 4 ? 'Felt pressure to stay at party; left early.' : undefined
    })
  }
  return list
}

export function getWellbeingEntries(): WellbeingEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const seed = getSevenDaysSeed()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed))
      return seed
    }
    return JSON.parse(raw) as WellbeingEntry[]
  } catch {
    return getSevenDaysSeed()
  }
}

export function saveWellbeingEntry(entry: Omit<WellbeingEntry, 'id' | 'dayLabel'>): WellbeingEntry {
  const current = getWellbeingEntries()
  const d = new Date(entry.date)
  const dayLabel = DAYS[d.getDay()] || 'Day'

  const newEntry: WellbeingEntry = {
    ...entry,
    id: `wb-${entry.date}`,
    dayLabel
  }

  // Replace if same date exists, else append & keep last 7 days
  const existingIdx = current.findIndex((item) => item.date === entry.date)
  let updated: WellbeingEntry[]
  if (existingIdx >= 0) {
    updated = [...current]
    updated[existingIdx] = newEntry
  } else {
    updated = [...current, newEntry].slice(-7)
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch (err) {
    console.error('Failed to save wellbeing entry:', err)
  }

  return newEntry
}

export interface WellbeingTrends {
  averageStress: number
  averagePressure: number
  highestPressureDay: string | null
  calmRecommendation: string
}

export function calculateWellbeingTrends(entries: WellbeingEntry[]): WellbeingTrends {
  if (entries.length === 0) {
    return {
      averageStress: 0,
      averagePressure: 0,
      highestPressureDay: null,
      calmRecommendation: 'Start logging your daily reflections to see your 7-day pattern.'
    }
  }

  const avgStress = Math.round((entries.reduce((acc, curr) => acc + curr.stress, 0) / entries.length) * 10) / 10
  const avgPressure = Math.round((entries.reduce((acc, curr) => acc + curr.pressure, 0) / entries.length) * 10) / 10

  const sortedByPressure = [...entries].sort((a, b) => b.pressure - a.pressure)
  const highestDay = sortedByPressure[0] && sortedByPressure[0].pressure >= 3 ? sortedByPressure[0].dayLabel : null

  let calmRecommendation = 'Your week appears relatively steady. Keep maintaining your healthy boundaries.'
  if (avgStress >= 3.5 || avgPressure >= 3.5) {
    calmRecommendation = highestDay
      ? `Pressure was elevated on ${highestDay}. Consider scheduling a 60-second breathing reset or talking with PeerShield AI when those situations arise.`
      : 'Stress levels picked up mid-week. Consider taking a 15-minute nature walk or trying a Calm Zone reset.'
  }

  return {
    averageStress: avgStress,
    averagePressure: avgPressure,
    highestPressureDay: highestDay,
    calmRecommendation
  }
}
