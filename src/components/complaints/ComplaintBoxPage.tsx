import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ShieldCheck, AlertCircle, Search } from 'lucide-react'
import { Badge, Button, Card } from '../../ui'
import { submitComplaint } from '../../services/complaintService'
import type { ComplaintCategory, ComplaintPriority } from '../../types/models'

const CATEGORIES: ComplaintCategory[] = [
  'Peer Pressure',
  'Substance Availability',
  'Stress / Anxiety',
  'Bullying',
  'Harassment',
  'Unsafe Campus Area',
  'Academic Pressure',
  'Social Pressure',
  'Other'
]

export function ComplaintBoxPage() {
  const [category, setCategory] = useState<ComplaintCategory>('Peer Pressure')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [contactPreference, setContactPreference] = useState('')
  const [priority, setPriority] = useState<ComplaintPriority>('Medium')
  const [submittedRef, setSubmittedRef] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!description.trim()) {
      setError('Please provide a brief description of what happened.')
      return
    }

    try {
      const complaint = submitComplaint({
        category,
        description,
        location,
        contactPreference,
        priority
      })
      setSubmittedRef(complaint.referenceId)
    } catch {
      setError("We couldn't submit your complaint. Please try again.")
    }
  }

  if (submittedRef) {
    return (
      <main className="page feature-page">
        <Badge tone="cool">Complaint Registered</Badge>
        <h1>Complaint Submitted</h1>
        <p className="hero-text">
          Your report has been received and entered into the campus review workflow.
        </p>

        <Card className="result-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '640px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CheckCircle2 size={28} color="#2b6957" />
            <div>
              <span style={{ fontSize: '0.82rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Your Reference ID</span>
              <h2 style={{ fontSize: '2.2rem', margin: '4px 0', color: 'var(--ink)' }}>{submittedRef}</h2>
            </div>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '0.92rem', lineHeight: 1.5 }}>
            Save this reference ID. You can enter it anytime into the Complaint Tracker to see when campus teams review, plan, and take action on this issue.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
            <Button to={`/complaints/track?ref=${encodeURIComponent(submittedRef)}`} icon={<Search size={16} />}>
              Track Progress Now
            </Button>
            <Button to="/complaints" variant="quiet" onClick={() => { setSubmittedRef(null); setDescription(''); setLocation(''); }}>
              Submit Another Report
            </Button>
            <Button to="/" variant="text">
              Return Home
            </Button>
          </div>
        </Card>

        <Card className="privacy-card" style={{ marginTop: '24px' }}>
          <ShieldCheck size={22} />
          <p>
            Your report is stored anonymously without personal tracking. PeerShield does not expose public student identities or promise immediate physical emergency response. For imminent danger, please call <strong>112</strong>.
          </p>
        </Card>
      </main>
    )
  }

  return (
    <main className="page feature-page">
      <div className="page-intro">
        <Badge tone="warm">Anonymous & Confidential</Badge>
        <h1>Campus Complaint Box</h1>
        <p className="hero-text">
          Report peer pressure incidents, substance availability, unsafe areas, or bullying. Identity is completely optional. You will receive a reference ID to track actions taken.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 0.9fr)', gap: '24px', alignItems: 'start' }}>
        <Card className="form-card" style={{ maxWidth: '100%' }}>
          {error && (
            <div style={{ padding: '12px 16px', background: '#fee2e2', color: '#991b1b', borderRadius: '6px', marginBottom: '18px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label>
              Issue Category
              <select value={category} onChange={(e) => setCategory(e.target.value as ComplaintCategory)}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>

            <label>
              Urgency Level
              <select value={priority} onChange={(e) => setPriority(e.target.value as ComplaintPriority)}>
                <option value="Low">Low - Informational / Non-urgent</option>
                <option value="Medium">Medium - Needs Campus Review</option>
                <option value="High">High - Serious Safety / Well-being Risk</option>
                <option value="Critical">Critical - Urgent Campus Intervention</option>
              </select>
            </label>

            <label>
              What happened? (Description)
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={5}
                placeholder="Describe the incident or situation. Only include what feels safe to share."
              />
            </label>

            <label>
              Approximate Location (Optional)
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Hostel Block B hallway, North gate, Library basement"
              />
            </label>

            <label>
              Contact Preference (Optional)
              <input
                value={contactPreference}
                onChange={(e) => setContactPreference(e.target.value)}
                placeholder="Leave blank for 100% anonymous, or provide an email/room if follow-up is desired"
              />
            </label>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
              <Button type="submit" icon={<ArrowRight size={16} />}>
                Submit Complaint & Get Reference ID
              </Button>
              <Link to="/complaints/track" style={{ color: 'var(--green)', fontSize: '0.88rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Search size={15} /> Already have a Reference ID?
              </Link>
            </div>
          </form>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <ShieldCheck size={20} color="var(--green)" />
              <strong style={{ fontSize: '1.05rem' }}>Confidentiality Notice</strong>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.55 }}>
              PeerShield collects only what you provide. We never log IP addresses, student roll numbers, or device fingerprints. Submissions go to the campus wellbeing oversight queue.
            </p>
          </Card>

          <Card style={{ background: '#fdf8f4', borderColor: '#f2ddcf' }}>
            <strong style={{ color: 'var(--coral)', fontSize: '0.95rem' }}>Track Your Complaint</strong>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '6px', lineHeight: 1.5 }}>
              Each submitted complaint receives a transparent lifecycle from <em>Submitted</em> to <em>Action Taken</em>.
            </p>
            <div style={{ marginTop: '14px' }}>
              <Button to="/complaints/track" variant="outline" size="small" icon={<ArrowRight size={14} />}>
                Go to Tracker
              </Button>
            </div>
          </Card>

          <Card>
            <strong style={{ fontSize: '0.95rem' }}>Immediate Danger?</strong>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '6px', lineHeight: 1.5 }}>
              If you or someone else is in acute physical danger, please call national emergency services or campus security immediately.
            </p>
            <div style={{ marginTop: '12px' }}>
              <Button to="/sos" variant="solid" size="small">
                Open Emergency SOS
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
