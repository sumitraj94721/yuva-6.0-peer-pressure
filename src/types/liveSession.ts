export type LiveSessionState =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'muted'
  | 'error'
  | 'ended'

export interface TranscriptMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
  isFinal: boolean
  timestamp: number
}

export interface AudioState {
  isMuted: boolean
  inputVolume: number // 0.0 to 1.0
  outputVolume: number // 0.0 to 1.0
}

export interface SessionSummaryData {
  durationSeconds: number
  topics: string[]
  suggestedActions: {
    label: string
    to?: string
    variant?: 'solid' | 'quiet' | 'outline' | 'text'
  }[]
}
