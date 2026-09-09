import { useEffect, useRef, useState, useMemo } from 'react'
import { Mic, MicOff, PhoneOff, RotateCcw, AlertTriangle, MessageSquare } from 'lucide-react'
import type { LiveSessionState, TranscriptMessage, SessionSummaryData } from '../../types/liveSession'
import { LiveSessionManager } from '../../services/liveSessionService'
import { AIOrb } from './AIOrb'
import { VoiceVisualizer } from './VoiceVisualizer'
import { SessionSummary } from './SessionSummary'

interface LiveSessionViewProps {
  onClose: () => void
}

export function LiveSessionView({ onClose }: LiveSessionViewProps) {
  const [sessionState, setSessionState] = useState<LiveSessionState>('idle')
  const [transcripts, setTranscripts] = useState<TranscriptMessage[]>([])
  const [inputVol, setInputVol] = useState(0)
  const [outputVol, setOutputVol] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [startTime, setStartTime] = useState<number>(() => Date.now())
  const [duration, setDuration] = useState<number>(0)

  const managerRef = useRef<LiveSessionManager | null>(null)
  const transcriptBottomRef = useRef<HTMLDivElement>(null)

  // Start live session on mount
  useEffect(() => {
    const manager = new LiveSessionManager({
      onStateChange: (state) => {
        setSessionState(state)
        if (state === 'listening' || state === 'speaking') {
          setErrorMessage(null)
        }
      },
      onTranscript: (msg) => {
        setTranscripts((prev) => [...prev, msg])
      },
      onVolumeChange: (inVol, outVol) => {
        setInputVol(inVol)
        setOutputVol(outVol)
      },
      onError: (err) => {
        setErrorMessage(err)
      },
      onSessionEnded: () => {
        // Will show summary
      }
    })

    managerRef.current = manager
    manager.startSession()

    return () => {
      manager.endSession()
    }
  }, [])

  // Auto-scroll transcript to bottom
  useEffect(() => {
    transcriptBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [transcripts])

  // Track session timer
  useEffect(() => {
    if (sessionState === 'ended') return
    const timer = setInterval(() => {
      setDuration(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)
    return () => clearInterval(timer)
  }, [startTime, sessionState])

  const handleToggleMute = () => {
    if (managerRef.current) {
      const muted = managerRef.current.toggleMute()
      setIsMuted(muted)
    }
  }

  const handleEndSession = () => {
    if (managerRef.current) {
      managerRef.current.endSession()
    }
    setSessionState('ended')
  }

  const handleRestart = () => {
    setTranscripts([])
    setErrorMessage(null)
    setDuration(0)
    setStartTime(Date.now())
    if (managerRef.current) {
      managerRef.current.startSession()
    }
  }

  const handleQuickDemoPrompt = (prompt: string) => {
    if (managerRef.current) {
      managerRef.current.triggerDemoPrompt(prompt)
    }
  }

  // Generate summary data
  const summaryData: SessionSummaryData = useMemo(() => {
    const topics: string[] = []
    const fullText = transcripts.map((t) => t.text.toLowerCase()).join(' ')
    if (fullText.includes('pressure') || fullText.includes('friend')) topics.push('Peer pressure & boundary setting')
    if (fullText.includes('no') || fullText.includes('refuse') || fullText.includes('say')) topics.push('Refusal confidence practice')
    if (fullText.includes('stress') || fullText.includes('exam') || fullText.includes('tired')) topics.push('Stress & exam coping')
    if (topics.length === 0) {
      topics.push('General peer support & healthy alternatives')
    }

    return {
      durationSeconds: duration,
      topics,
      suggestedActions: [
        { label: 'Try another scenario', to: '/pressure-simulator' },
        { label: 'Open Calm Zone', to: '/calm-zone' },
        { label: 'View Resources', to: '/resources' }
      ]
    }
  }, [transcripts, duration])

  const getStatusText = () => {
    switch (sessionState) {
      case 'connecting':
        return 'Connecting to PeerShield Live...'
      case 'connected':
        return 'Ready. I’m listening.'
      case 'listening':
        return 'I’m listening...'
      case 'thinking':
        return 'Thinking...'
      case 'speaking':
        return 'PeerShield AI is speaking...'
      case 'muted':
        return 'Microphone is muted'
      case 'error':
        return 'Connection or permission notice'
      case 'ended':
        return 'Session complete'
      default:
        return 'Standby'
    }
  }

  if (sessionState === 'ended') {
    return (
      <div className="live-session-modal">
        <div className="live-session-inner">
          <SessionSummary
            summary={summaryData}
            onRestart={handleRestart}
            onReturnToChat={onClose}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="live-session-modal" role="dialog" aria-label="PeerShield Live Voice Session">
      <div className="live-session-inner">
        {/* Top Header */}
        <div className="live-session-top">
          <div className="live-identity">
            <span className="live-pill">
              <span className="live-dot" /> LIVE
            </span>
            <span className="live-brand-title">PeerShield AI</span>
          </div>

          <div className="live-timer" aria-label="Session duration">
            {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
          </div>

          <button
            type="button"
            className="live-close-btn"
            onClick={handleEndSession}
            title="End Session"
            aria-label="End Session"
          >
            <PhoneOff size={18} />
          </button>
        </div>

        {/* Error / Notification Banner */}
        {errorMessage && (
          <div className="live-error-banner" role="alert">
            <AlertTriangle size={18} />
            <span>{errorMessage}</span>
            <button
              type="button"
              className="button button-small button-outline"
              onClick={handleRestart}
            >
              <RotateCcw size={14} /> Try again
            </button>
          </div>
        )}

        {/* Center Orb & Visualizer */}
        <div className="live-visualizer-area">
          <AIOrb
            state={sessionState}
            volume={sessionState === 'speaking' ? outputVol : inputVol}
          />

          <div className="live-status-label">{getStatusText()}</div>

          <VoiceVisualizer
            volume={sessionState === 'speaking' ? outputVol : inputVol}
            isActive={sessionState === 'listening' || sessionState === 'speaking'}
            colorTone={sessionState === 'speaking' ? 'coral' : 'green'}
          />
        </div>

        {/* Transcript Panel */}
        <div className="live-transcript-panel" aria-live="polite">
          <div className="transcript-header">
            <span>Conversation Transcript</span>
            <span className="transcript-privacy">Temporary · In memory</span>
          </div>

          <div className="transcript-messages">
            {transcripts.length === 0 ? (
              <p className="transcript-empty">
                Speak naturally or tap a sample prompt below. Your microphone is live.
              </p>
            ) : (
              transcripts.map((msg) => (
                <div
                  key={msg.id}
                  className={`transcript-bubble ${msg.role === 'user' ? 'transcript-user' : 'transcript-ai'}`}
                >
                  <strong>{msg.role === 'user' ? 'You' : 'PeerShield AI'}</strong>
                  <p>{msg.text}</p>
                </div>
              ))
            )}
            <div ref={transcriptBottomRef} />
          </div>

          {/* Quick interactive test prompts */}
          <div className="live-quick-prompts">
            <span className="quick-prompts-label">Quick sample voice input:</span>
            <button
              type="button"
              className="quick-chip"
              onClick={() => handleQuickDemoPrompt('I feel pressured by my friends.')}
            >
              “I feel pressured by my friends.”
            </button>
            <button
              type="button"
              className="quick-chip"
              onClick={() => handleQuickDemoPrompt('Help me say no to drinking tonight.')}
            >
              “Help me say no to drinking tonight.”
            </button>
            <button
              type="button"
              className="quick-chip"
              onClick={() => handleQuickDemoPrompt('Practice a conversation with me.')}
            >
              “Practice a conversation with me.”
            </button>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="live-controls-bar">
          <button
            type="button"
            className={`live-control-btn ${isMuted ? 'muted' : ''}`}
            onClick={handleToggleMute}
            aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'}
          >
            {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
            <span>{isMuted ? 'Unmute' : 'Mute'}</span>
          </button>

          <button
            type="button"
            className="live-control-btn end-session-btn"
            onClick={handleEndSession}
            aria-label="End live session"
          >
            <PhoneOff size={20} />
            <span>End Session</span>
          </button>

          <button
            type="button"
            className="live-control-btn text-fallback-btn"
            onClick={() => {
              handleEndSession()
              onClose()
            }}
            aria-label="Switch to text chat"
          >
            <MessageSquare size={20} />
            <span>Text Chat</span>
          </button>
        </div>
      </div>
    </div>
  )
}
