import { useState, type FormEvent, type KeyboardEvent } from 'react'
import { Send, Mic, Radio } from 'lucide-react'

interface ChatInputProps {
  onSend: (text: string) => void
  onStartLive: () => void
  disabled?: boolean
  suggestedPrompts?: string[]
}

const DEFAULT_SUGGESTED_PROMPTS = [
  'I am feeling pressured.',
  'Help me say no.',
  'I am worried about fitting in.',
  'Practice a conversation with me.',
  'I feel stressed about exams.',
  'Give me a healthy alternative.',
  'Can we talk in Hindi?'
]

export function ChatInput({
  onSend,
  onStartLive,
  disabled = false,
  suggestedPrompts = DEFAULT_SUGGESTED_PROMPTS
}: ChatInputProps) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim() || disabled) return
    onSend(input.trim())
    setInput('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleSelectPrompt = (prompt: string) => {
    if (disabled) return
    onSend(prompt)
  }

  return (
    <div className="chat-input-wrapper">
      <div className="suggested-prompts-tray" aria-label="Suggested prompts">
        {suggestedPrompts.map((p) => (
          <button
            key={p}
            type="button"
            className="suggested-prompt-chip"
            onClick={() => handleSelectPrompt(p)}
            disabled={disabled}
          >
            {p}
          </button>
        ))}
      </div>

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="chat-text-input"
          placeholder="Type what you're feeling..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-label="Message PeerShield AI"
        />

        <div className="chat-input-actions">
          <button
            type="button"
            className="chat-action-btn live-btn"
            onClick={onStartLive}
            title="Start Live Voice Session"
            aria-label="Start Live Voice Session"
          >
            <Radio size={16} className="pulse-icon" />
            <span className="live-btn-label">Start Live Session</span>
          </button>

          <button
            type="button"
            className="chat-action-btn mic-btn"
            onClick={onStartLive}
            title="Start Live Voice Session with microphone"
            aria-label="Start Live Voice Session with microphone"
          >
            <Mic size={18} />
          </button>

          <button
            type="submit"
            className="chat-action-btn send-btn"
            disabled={disabled || !input.trim()}
            title="Send message"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  )
}
