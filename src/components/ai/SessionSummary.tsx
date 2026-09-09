import { CheckCircle2, ArrowRight, RotateCcw, Heart, Shield, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { SessionSummaryData } from '../../types/liveSession'

interface SessionSummaryProps {
  summary: SessionSummaryData
  onRestart: () => void
  onReturnToChat: () => void
}

export function SessionSummary({ summary, onRestart, onReturnToChat }: SessionSummaryProps) {
  const minutes = Math.floor(summary.durationSeconds / 60)
  const seconds = summary.durationSeconds % 60
  const durationText = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`

  return (
    <div className="session-summary-card">
      <div className="summary-header">
        <div className="summary-badge">
          <CheckCircle2 size={24} />
        </div>
        <h2>Session complete</h2>
        <p className="summary-duration">Duration: {durationText}</p>
      </div>

      <div className="summary-topics-block">
        <h3>Key areas explored</h3>
        <ul className="summary-topics-list">
          {summary.topics.map((t) => (
            <li key={t}>
              <span className="topic-bullet" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="summary-actions-block">
        <h3>Suggested next steps</h3>
        <div className="summary-buttons-grid">
          <button type="button" className="button button-solid" onClick={onRestart}>
            <RotateCcw size={16} /> Start another session
          </button>
          <button type="button" className="button button-quiet" onClick={onReturnToChat}>
            <Sparkles size={16} /> Back to text chat
          </button>
          <Link to="/calm-zone" className="button button-outline">
            <Heart size={16} /> Open Calm Zone <ArrowRight size={14} />
          </Link>
          <Link to="/pressure-simulator" className="button button-outline">
            <Shield size={16} /> Try another scenario <ArrowRight size={14} />
          </Link>
          <Link to="/resources" className="button button-outline">
            View Resources <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
