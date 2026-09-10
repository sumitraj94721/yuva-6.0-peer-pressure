import { useState } from 'react'
import { CheckCircle2, MessageSquare, Star, ArrowRight, ShieldCheck } from 'lucide-react'
import { Badge, Button, Card } from '../../ui'
import { submitFeedback } from '../../services/feedbackService'
import type { AppFeedback } from '../../types/models'

const CATEGORIES: AppFeedback['category'][] = [
  'Bug report',
  'Feature request',
  'UI feedback',
  'Content feedback',
  'Accessibility issue',
  'Other'
]

export function ImprovePage() {
  const [category, setCategory] = useState<AppFeedback['category']>('Feature request')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState<number>(5)
  const [contact, setContact] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    submitFeedback({
      category,
      message,
      rating,
      contact
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="page feature-page">
        <Badge tone="cool">Feedback Received</Badge>
        <h1>Thank You for Helping Improve PeerShield!</h1>
        <p className="hero-text">
          Your feedback helps make PeerShield safer, easier to use, and more supportive for every student.
        </p>

        <Card className="result-card" style={{ maxWidth: '640px' }}>
          <CheckCircle2 size={28} color="var(--green)" />
          <div>
            <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Feedback Logged Successfully</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.92rem', margin: '8px 0 16px', lineHeight: 1.5 }}>
              Our design and development team reviews product suggestions and accessibility feedback regularly.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Button to="/" icon={<ArrowRight size={16} />}>Return Home</Button>
              <Button variant="quiet" onClick={() => { setSubmitted(false); setMessage(''); }}>
                Send Another Suggestion
              </Button>
            </div>
          </div>
        </Card>
      </main>
    )
  }

  return (
    <main className="page feature-page">
      <div className="page-intro">
        <Badge tone="warm">Community Input</Badge>
        <h1>Improve PeerShield</h1>
        <p className="hero-text">
          Have an idea for a new feature, noticed a glitch, or want better accessibility? Tell us how we can make PeerShield work better for your campus.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 0.9fr)', gap: '24px', alignItems: 'start' }}>
        <Card className="form-card" style={{ maxWidth: '100%' }}>
          <form onSubmit={handleSubmit}>
            <label>
              Feedback Type
              <select value={category} onChange={(e) => setCategory(e.target.value as AppFeedback['category'])}>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </label>

            <label>
              Overall Experience Rating
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: star <= rating ? '#f59e0b' : '#d1d5db',
                      padding: '4px'
                    }}
                    title={`${star} star${star > 1 ? 's' : ''}`}
                  >
                    <Star size={24} fill={star <= rating ? '#f59e0b' : 'none'} />
                  </button>
                ))}
                <span style={{ fontSize: '0.85rem', color: 'var(--muted)', alignSelf: 'center', marginLeft: '6px' }}>
                  ({rating} of 5)
                </span>
              </div>
            </label>

            <label>
              What can we improve? (Your feedback)
              <textarea
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Share your suggestion, bug report, or accessibility feedback..."
              />
            </label>

            <label>
              Contact info (Optional)
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Optional email if you'd like us to follow up regarding your feature request"
              />
            </label>

            <div style={{ marginTop: '20px' }}>
              <Button type="submit" icon={<ArrowRight size={16} />}>
                Submit App Improvement Feedback
              </Button>
            </div>
          </form>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <MessageSquare size={18} color="var(--green)" />
              <strong style={{ fontSize: '0.95rem' }}>Separate from Safety Reports</strong>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.84rem', lineHeight: 1.55 }}>
              This form is exclusively for app features, usability, and design feedback.
            </p>
            <p style={{ color: 'var(--muted)', fontSize: '0.84rem', lineHeight: 1.55, marginTop: '8px' }}>
              If you need to report an unsafe situation, harassment, or substance pressure on campus, please use the anonymous <strong>Complaint Box</strong>.
            </p>
            <div style={{ marginTop: '12px' }}>
              <Button to="/complaints" variant="outline" size="small">
                Go to Complaint Box
              </Button>
            </div>
          </Card>

          <Card style={{ background: '#f8fafc', borderColor: '#e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <ShieldCheck size={18} color="var(--coral)" />
              <strong style={{ fontSize: '0.92rem' }}>Student Voice Matters</strong>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.5 }}>
              PeerShield is developed for students, with students. Your suggestions directly influence future simulator scenarios, calm activities, and privacy safeguards.
            </p>
          </Card>
        </div>
      </div>
    </main>
  )
}
