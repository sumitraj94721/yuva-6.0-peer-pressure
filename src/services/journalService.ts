import type { JournalEntry } from '../types/models'

const STORAGE_KEY = 'peershield_journal'

const DEMO_ENTRIES: JournalEntry[] = [
  {
    id: 'entry-demo-1',
    title: 'Staying firm when friends pushed drinks at the fest',
    content: 'Felt awkward at first when everyone had a beer in hand, but I ordered lime soda and told them I was driving early tomorrow. Nobody actually cared after 5 minutes. Realized the pressure was 90% in my own head.',
    createdAt: '2026-09-08T18:30:00.000Z',
    updatedAt: '2026-09-08T18:30:00.000Z',
    tags: ['Refusal', 'Confidence']
  },
  {
    id: 'entry-demo-2',
    title: 'Post-midterm reset',
    content: 'Exam stress was peaking yesterday. Did the 60-second breathing exercise in the library lobby. Took a 20-minute walk instead of doomscrolling or staying in the noisy hostel corridor.',
    createdAt: '2026-09-06T14:15:00.000Z',
    updatedAt: '2026-09-06T14:15:00.000Z',
    tags: ['Calm', 'Stress Management']
  }
]

export function getJournalEntries(): JournalEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_ENTRIES))
      return DEMO_ENTRIES
    }
    return JSON.parse(raw) as JournalEntry[]
  } catch {
    return DEMO_ENTRIES
  }
}

export function saveJournalEntries(entries: JournalEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  } catch (err) {
    console.error('Failed to save journal entries:', err)
  }
}

export function createJournalEntry(title: string, content: string, tags: string[] = []): JournalEntry {
  const current = getJournalEntries()
  const now = new Date().toISOString()
  const newEntry: JournalEntry = {
    id: `jnl-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    title: title.trim() || 'Untitled Reflection',
    content: content.trim(),
    createdAt: now,
    updatedAt: now,
    tags
  }
  const updated = [newEntry, ...current]
  saveJournalEntries(updated)
  return newEntry
}

export function updateJournalEntry(id: string, title: string, content: string, tags?: string[]): boolean {
  const entries = getJournalEntries()
  const idx = entries.findIndex((e) => e.id === id)
  if (idx === -1) return false

  entries[idx] = {
    ...entries[idx],
    title: title.trim() || 'Untitled Reflection',
    content: content.trim(),
    updatedAt: new Date().toISOString(),
    tags: tags ?? entries[idx].tags
  }
  saveJournalEntries(entries)
  return true
}

export function deleteJournalEntry(id: string): boolean {
  const entries = getJournalEntries()
  const filtered = entries.filter((e) => e.id !== id)
  if (filtered.length === entries.length) return false
  saveJournalEntries(filtered)
  return true
}
