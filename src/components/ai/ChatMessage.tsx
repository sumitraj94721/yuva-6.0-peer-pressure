import { Bot, User, Sparkles } from 'lucide-react'
import type { AIMessage } from '../../types/ai'

export function ChatMessage({ message }: { message: AIMessage }) {
  const isAI = message.role === 'assistant'

  return (
    <div className={`chat-message ${isAI ? 'chat-message-ai' : 'chat-message-user'}`}>
      <div className="chat-avatar" aria-hidden="true">
        {isAI ? <Bot size={18} /> : <User size={18} />}
      </div>
      <div className="chat-bubble">
        <div className="chat-header">
          <span className="chat-author">{isAI ? 'PeerShield AI' : 'You'}</span>
          {isAI && message.isDemo && (
            <span className="demo-ai-tag" title="Offline / Demo Fallback Mode">
              <Sparkles size={11} /> DEMO AI
            </span>
          )}
          <span className="chat-time">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div className="chat-content">
          <p>{message.content}</p>
          {message.feedback && (
            <div className="chat-practice-feedback">
              {message.feedback.category && (
                <div className="feedback-tag">
                  <strong>Focus:</strong> {message.feedback.category}
                </div>
              )}
              {message.feedback.confidenceDelta ? (
                <div className="feedback-delta">
                  Refusal Confidence +{message.feedback.confidenceDelta}%
                </div>
              ) : null}
              {message.feedback.suggestedResponse && (
                <div className="feedback-suggestion">
                  <em>Suggested line:</em> {message.feedback.suggestedResponse}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
