import type { AppFeedback } from '../types/models'

const STORAGE_KEY = 'peershield_feedback'

export function getStoredFeedback(): AppFeedback[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AppFeedback[]) : []
  } catch {
    return []
  }
}

export function submitFeedback(params: {
  category: AppFeedback['category']
  message: string
  rating?: number
  contact?: string
}): AppFeedback {
  const current = getStoredFeedback()
  const newFeedback: AppFeedback = {
    id: `fb-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    category: params.category,
    message: params.message.trim(),
    rating: params.rating,
    contact: params.contact?.trim() || undefined,
    createdAt: new Date().toISOString()
  }

  const updated = [newFeedback, ...current]
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch (err) {
    console.error('Failed to save feedback to localStorage:', err)
  }

  return newFeedback
}
