import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, CheckCircle2, Clock, ArrowRight, ShieldCheck, AlertCircle, FileText, Activity } from 'lucide-react'
import { Badge, Button, Card } from '../../ui'
import { findComplaintByReference, getStoredComplaints } from '../../services/complaintService'
import type { Complaint, ComplaintStatus } from '../../types/models'

const STATUS_STEPS: { status: ComplaintStatus; label: string; desc: string }[] = [
  { status: 'Submitted', label: 'Submitted', desc: 'Complaint registered in campus security & wellbeing queue' },
  { status: 'Under Review', label: 'Under Review', desc: 'Assigned to wellbeing coordinator or campus warden' },
  { status: 'Action Planned', label: 'Action Planned', desc: 'Intervention, patrol adjustment, or workshop scheduled' },
  { status: 'Action Taken', label: 'Action Taken', desc: 'Direct corrective or preventive action completed' },
  { status: 'Resolved', label: 'Resolved', desc: 'Case verified settled with campus oversight' }
]

export function ComplaintTrackPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialRef = searchParams.get('ref') || ''
  const [query, setQuery] = useState(initialRef)
  const [sampleComplaints] = useState<Complaint[]>(() => getStoredComplaints().slice(0, 4))
  const [searchedComplaint, setSearchedComplaint] = useState<Complaint | null>(() => {
    return initialRef.trim() ? findComplaintByReference(initialRef.trim()) || null : null
  })
  const [hasSearched, setHasSearched] = useState(() => Boolean(initialRef.trim()))

  const handleSearch = (refId: string) => {
    setHasSearched(true)
    const found = findComplaintByReference(refId)
    setSearchedComplaint(found || null)
    setSearchParams({ ref: refId })
  }

  const getStepIndex = (status: ComplaintStatus) => {
    const idx = STATUS_STEPS.findIndex((s) => s.status === status)
    return idx === -1 ? 0 : idx
  }

  return (
    <main className="page feature-page">
      <div className="page-intro">
        <Badge tone="cool">Transparent Campus Accountability</Badge>
        <h1>Track Complaint Progress</h1>
        <p className="hero-text">
          Enter your anonymous Reference ID to check real-time status and see what actions campus teams have planned or completed.
        </p>
      </div>

      <Card className="form-card" style={{ maxWidth: '720px', marginBottom: '32px' }}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSearch(query)
          }}
          style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}
        >
          <div style={{ flex: 1, minWidth: '220px' }}>
            <label style={{ margin: 0 }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--muted)', display: 'block', marginBottom: '6px' }}>Reference ID</span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. PS-2026-1048"
                style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}
                required
              />
            </label>
          </div>
          <Button type="submit" icon={<Search size={16} />} style={{ marginTop: '22px' }}>
            Track Progress
          </Button>
        </form>

        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '0.82rem', color: 'var(--muted)' }}>
          <span>Try demo IDs:</span>
          {sampleComplaints.map((c) => (
            <button
              key={c.referenceId}
              type="button"
              onClick={() => {
                setQuery(c.referenceId)
                handleSearch(c.referenceId)
              }}
              style={{
                background: 'var(--mint)',
                border: '1px solid #c0dfcc',
                padding: '3px 9px',
                borderRadius: '4px',
                cursor: 'pointer',
                color: 'var(--green)',
                fontWeight: 600,
                fontSize: '0.78rem'
              }}
            >
              {c.referenceId} ({c.category})
            </button>
          ))}
        </div>
      </Card>

      {hasSearched && !searchedComplaint && (
        <Card style={{ maxWidth: '720px', padding: '28px', background: '#fef3f2', borderColor: '#fecdca' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AlertCircle size={24} color="#b42318" />
            <div>
              <strong style={{ color: '#912018', fontSize: '1.05rem' }}>No complaint found with ID "{query}"</strong>
              <p style={{ color: '#b42318', fontSize: '0.86rem', marginTop: '4px' }}>
                Please double-check the spelling. Reference IDs follow the format <code>PS-YYYY-XXXX</code>.
              </p>
            </div>
          </div>
        </Card>
      )}

      {searchedComplaint && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 0.8fr)', gap: '24px', alignItems: 'start', maxWidth: '1000px' }}>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Reference ID</span>
                <h2 style={{ fontSize: '1.8rem', margin: '4px 0 10px' }}>{searchedComplaint.referenceId}</h2>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Badge tone="warm">{searchedComplaint.category}</Badge>
                  <span style={{ padding: '4px 10px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' }}>
                    Status: {searchedComplaint.status}
                  </span>
                  {searchedComplaint.isDemo && (
                    <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.72rem', background: '#f3f4f6', color: '#6b7280' }}>
                      DEMO DATA
                    </span>
                  )}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Logged Date</span>
                <p style={{ fontWeight: 600, fontSize: '0.88rem' }}>{searchedComplaint.date}</p>
              </div>
            </div>

            <div style={{ margin: '22px 0 28px', padding: '16px', background: '#fcfdfa', border: '1px solid var(--line)', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '6px' }}>Reported Situation</span>
              <p style={{ color: 'var(--ink)', fontSize: '0.94rem', lineHeight: 1.55 }}>
                {searchedComplaint.description}
              </p>
              {searchedComplaint.location && (
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '8px' }}>
                  <strong>Approx. Location:</strong> {searchedComplaint.location}
                </p>
              )}
            </div>

            <h3 style={{ fontSize: '1.15rem', marginBottom: '18px' }}>Action & Resolution Timeline</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', paddingLeft: '8px' }}>
              {STATUS_STEPS.map((step, index) => {
                const currentIdx = getStepIndex(searchedComplaint.status)
                const isCompleted = index <= currentIdx
                const isCurrent = index === currentIdx
                const timelineItem = searchedComplaint.timeline.find((t) => t.status === step.status)

                return (
                  <div key={step.status} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          display: 'grid',
                          placeItems: 'center',
                          background: isCompleted ? 'var(--green)' : '#e5e7eb',
                          color: isCompleted ? '#ffffff' : '#9ca3af',
                          boxShadow: isCurrent ? '0 0 0 4px rgba(43, 105, 87, 0.18)' : 'none'
                        }}
                      >
                        {isCompleted ? <CheckCircle2 size={16} /> : <Clock size={14} />}
                      </div>
                      {index < STATUS_STEPS.length - 1 && (
                        <div
                          style={{
                            width: '2px',
                            height: '34px',
                            background: index < currentIdx ? 'var(--green)' : '#e5e7eb',
                            margin: '4px 0'
                          }}
                        />
                      )}
                    </div>
                    <div style={{ flex: 1, paddingBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                        <strong style={{ fontSize: '0.95rem', color: isCompleted ? 'var(--ink)' : 'var(--muted)' }}>
                          {step.label}
                        </strong>
                        {timelineItem && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{timelineItem.timestamp}</span>
                        )}
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '3px' }}>{step.desc}</p>
                      {timelineItem?.note && (
                        <div style={{ marginTop: '6px', padding: '8px 12px', background: 'var(--mint)', borderRadius: '4px', fontSize: '0.84rem', color: 'var(--ink)', borderLeft: '3px solid var(--green)' }}>
                          <strong>Campus Update:</strong> {timelineItem.note}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <Activity size={18} color="var(--green)" />
                <strong style={{ fontSize: '0.95rem' }}>Campus Action Commitment</strong>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.84rem', lineHeight: 1.5 }}>
                PeerShield complaints are reviewed in campus wellbeing coordination circles. Actions may include lighting updates, peer-mentor presence, policy briefings, or health resources.
              </p>
            </Card>

            <Card style={{ background: '#f8fafc', borderColor: '#e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <FileText size={18} color="var(--ink)" />
                <strong style={{ fontSize: '0.92rem' }}>Need to report another issue?</strong>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.5 }}>
                Submit a new anonymous issue or safety hazard anytime.
              </p>
              <div style={{ marginTop: '12px' }}>
                <Button to="/complaints" variant="outline" size="small" icon={<ArrowRight size={14} />}>
                  Open Complaint Box
                </Button>
              </div>
            </Card>

            <Card>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <ShieldCheck size={18} color="var(--coral)" />
                <strong style={{ fontSize: '0.92rem' }}>Privacy Safeguard</strong>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.5 }}>
                Only individuals holding this Reference ID can check this timeline. Internal staff see aggregated metrics without individual identity exposure.
              </p>
            </Card>
          </div>
        </div>
      )}
    </main>
  )
}
