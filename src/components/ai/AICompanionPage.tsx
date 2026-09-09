import { useState, useEffect, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Radio, ShieldAlert, Sparkles, PhoneCall, RefreshCw, Layers } from 'lucide-react'
import type { AIMessage } from '../../types/ai'
import { sendAIMessage, isGeminiConfigured } from '../../services/aiService'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { LiveSessionView } from './LiveSessionView'
import { Badge, Card } from '../../ui'

export function AICompanionPage() {
  const [searchParams] = useSearchParams()
  const modeParam = searchParams.get('mode')
  const contextParam = searchParams.get('context')

  const isPracticeMode = modeParam === 'practice'

  const getInitialMessage = (practice: boolean, context: string | null): AIMessage => {
    let initialText =
      'Hi there! I’m PeerShield AI, your supportive college prevention companion. You can practice saying no, talk through peer pressure, or find healthy ways to deal with stress. What’s happening around you?'

    if (practice) {
      initialText =
        'Welcome to Practice Mode! I will act as a friend urging you to join in, so you can practice your refusal boundary safely. Ready? Here goes:\n\n“Come on, everyone’s trying it at the party tonight. Just take one sip, don’t be boring!”\n\nHow do you want to respond?'
    } else if (context === 'refusal-confidence') {
      initialText =
        'Welcome! You just completed your Check-In with a focus on building refusal confidence. What is one situation where saying "no" has felt tricky lately?'
    } else if (context === 'calm') {
      initialText =
        'Welcome from the Calm Zone. Take a steady breath. Would you like to talk through what’s creating tension right now, or explore a quick healthy alternative?'
    }

    return {
      id: 'init-1',
      role: 'assistant',
      content: initialText,
      timestamp: Date.now(),
      isDemo: !isGeminiConfigured()
    }
  }

  const [messages, setMessages] = useState<AIMessage[]>(() => [
    getInitialMessage(isPracticeMode, contextParam)
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [showLiveSession, setShowLiveSession] = useState(false)
  const [errorState, setErrorState] = useState<string | null>(null)
  const [geminiActive] = useState(() => isGeminiConfigured())

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const prevParamsRef = useRef({ mode: modeParam, context: contextParam })

  // Re-initialize only when mode or context URL params actually change after mount
  useEffect(() => {
    if (
      prevParamsRef.current.mode !== modeParam ||
      prevParamsRef.current.context !== contextParam
    ) {
      prevParamsRef.current = { mode: modeParam, context: contextParam }
      setMessages([getInitialMessage(isPracticeMode, contextParam)])
    }
  }, [modeParam, contextParam, isPracticeMode])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return

    setErrorState(null)
    const userMsg: AIMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now()
    }

    const updated = [...messages, userMsg]
    setMessages(updated)
    setIsTyping(true)

    try {
      const response = await sendAIMessage({
        messages: updated,
        practiceMode: isPracticeMode,
        scenarioContext: contextParam || undefined
      })

      const aiMsg: AIMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: response.content,
        timestamp: Date.now(),
        isDemo: response.isDemo,
        feedback: response.feedback
      }

      setMessages((prev) => [...prev, aiMsg])
    } catch (err) {
      console.warn('Chat error:', err)
      setErrorState('AI service is currently unavailable. Try again or check the options below.')
    } finally {
      setIsTyping(false)
    }
  }

  const handleRetryLast = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === 'user')
    if (lastUser) {
      handleSendMessage(lastUser.content)
    }
  }

  return (
    <main className="page feature-page ai-companion-page">
      {/* Live Voice Modal Overlay */}
      {showLiveSession && (
        <LiveSessionView onClose={() => setShowLiveSession(false)} />
      )}

      {/* Hero Intro */}
      <div className="page-intro ai-intro">
        <div className="ai-badge-row">
          <Badge tone="warm">PeerShield AI</Badge>
          <span className="live-status-pill">
            <Radio size={12} className="pulse-icon" /> Live Voice Ready
          </span>
          {!geminiActive && (
            <span className="demo-ai-banner-tag">
              <Sparkles size={12} /> DEMO AI FALLBACK ACTIVE
            </span>
          )}
        </div>
        <h1>Your prevention companion</h1>
        <p className="hero-text">
          A supportive, private space to practice boundaries, talk through social pressure, and choose healthy alternatives. Not a diagnostic tool.
        </p>
      </div>

      {/* Emergency & Privacy Disclaimers */}
      <div className="ai-disclaimers-grid">
        <Card className="ai-privacy-note">
          <ShieldAlert size={20} className="card-symbol" />
          <div>
            <strong>Private & Non-Medical</strong>
            <p>
              PeerShield AI is a supportive companion, not a doctor or therapist. Do not share passwords, financial details, or exact addresses. Conversations stay temporary on your device.
            </p>
          </div>
        </Card>

        <Card className="ai-emergency-note">
          <PhoneCall size={20} className="card-symbol" />
          <div>
            <strong>Immediate Help · India 112</strong>
            <p>
              If you or someone around you is in immediate danger or severe distress, please contact emergency services directly at <strong>112</strong>.
            </p>
          </div>
        </Card>
      </div>

      {/* Mode Navigation Bar */}
      <div className="ai-mode-bar">
        <div className="mode-toggle-group">
          <Link
            to="/ai-companion"
            className={`mode-tab ${!isPracticeMode ? 'active' : ''}`}
          >
            <Sparkles size={16} /> Prevention Chat
          </Link>
          <Link
            to="/ai-companion?mode=practice"
            className={`mode-tab ${isPracticeMode ? 'active' : ''}`}
          >
            <Layers size={16} /> Refusal Practice Mode
          </Link>
        </div>

        <button
          type="button"
          className="button button-solid live-voice-trigger"
          onClick={() => setShowLiveSession(true)}
        >
          <Radio size={16} className="pulse-icon" /> Start Live Voice Session
        </button>
      </div>

      {/* Chat Container */}
      <div className="ai-chat-card card">
        <div className="chat-messages-container" aria-live="polite">
          {messages.map((m) => (
            <ChatMessage key={m.id} message={m} />
          ))}

          {isTyping && (
            <div className="chat-message chat-message-ai typing-indicator">
              <div className="chat-avatar">
                <Sparkles size={16} />
              </div>
              <div className="chat-bubble typing-bubble">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
                <span className="typing-label">PeerShield AI is typing...</span>
              </div>
            </div>
          )}

          {errorState && (
            <div className="chat-error-card">
              <p>{errorState}</p>
              <div className="error-actions">
                <button
                  type="button"
                  className="button button-small button-solid"
                  onClick={handleRetryLast}
                >
                  <RefreshCw size={14} /> Try Again
                </button>
                <Link to="/calm-zone" className="button button-small button-outline">
                  Open Calm Zone
                </Link>
                <Link to="/resources" className="button button-small button-outline">
                  Open Resources
                </Link>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <ChatInput
          onSend={handleSendMessage}
          onStartLive={() => setShowLiveSession(true)}
          disabled={isTyping}
        />
      </div>
    </main>
  )
}
