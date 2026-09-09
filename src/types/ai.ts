export type AIMessageRole = 'user' | 'assistant' | 'system'

export interface AIMessage {
  id: string
  role: AIMessageRole
  content: string
  timestamp: number
  isDemo?: boolean
  status?: 'sending' | 'complete' | 'error'
  feedback?: {
    confidenceDelta?: number
    category?: string
    suggestedResponse?: string
  }
}

export interface AIConversation {
  id: string
  title: string
  messages: AIMessage[]
  context?: string
  mode?: 'chat' | 'practice'
}

export interface AIState {
  isTyping: boolean
  error: string | null
  provider: 'gemini' | 'demo'
  apiKeyConfigured: boolean
}

export interface QuickPrompt {
  id: string
  label: string
  prompt: string
  category?: 'pressure' | 'refusal' | 'stress' | 'language' | 'alternative'
}

export interface PracticeScenario {
  id: string
  peerStatement: string
  context: string
  difficulty: 'mild' | 'moderate' | 'strong'
  goodRefusalHints: string[]
}
