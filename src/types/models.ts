export type ComplaintCategory =
  | 'Peer Pressure'
  | 'Substance Availability'
  | 'Stress / Anxiety'
  | 'Bullying'
  | 'Harassment'
  | 'Unsafe Campus Area'
  | 'Academic Pressure'
  | 'Social Pressure'
  | 'Other'

export type ComplaintPriority = 'Low' | 'Medium' | 'High' | 'Critical'

export type ComplaintStatus =
  | 'Submitted'
  | 'Under Review'
  | 'Action Planned'
  | 'Action Taken'
  | 'Resolved'
  | 'Requires More Information'

export interface ComplaintStatusUpdate {
  status: ComplaintStatus
  timestamp: string
  note?: string
}

export interface Complaint {
  id: string
  referenceId: string
  category: ComplaintCategory
  description: string
  location?: string
  date: string
  contactPreference?: string
  priority: ComplaintPriority
  status: ComplaintStatus
  timeline: ComplaintStatusUpdate[]
  isDemo?: boolean
}

export interface JournalEntry {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  tags?: string[]
}

export interface AppFeedback {
  id: string
  category: 'Bug report' | 'Feature request' | 'UI feedback' | 'Content feedback' | 'Accessibility issue' | 'Other'
  message: string
  rating?: number
  contact?: string
  createdAt: string
}

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  category: string
}

export interface QuizResult {
  score: number
  total: number
  completedAt: string
}

export interface WellbeingEntry {
  id: string
  date: string // YYYY-MM-DD
  dayLabel: string // 'Mon', 'Tue', etc.
  mood: 'Good' | 'Okay' | 'Difficult'
  stress: number // 1 to 5
  pressure: number // 1 to 5
  sleepQuality: 'Good' | 'Okay' | 'Difficult'
  healthyActivity: string
  notes?: string
}

export interface CallSettings {
  campusSupportNumber: string
  campusSupportLabel: string
  trustedContactName?: string
  trustedContactNumber?: string
}

export interface LocationResult {
  latitude: number
  longitude: number
  accuracy: number
  timestamp: number
  mapsUrl: string
}
