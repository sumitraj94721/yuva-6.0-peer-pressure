import { useState, useMemo } from 'react'
import { Filter, ArrowUpDown } from 'lucide-react'
import { Badge, Card, StatCard, Button } from '../../ui'
import { getStoredComplaints, getCategoryWiseSummaries, updateComplaintStatus } from '../../services/complaintService'
import type { Complaint, ComplaintStatus } from '../../types/models'

export function CategoryIssuesDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedStatus, setSelectedStatus] = useState<string>('All')
  const [selectedPriority, setSelectedPriority] = useState<string>('All')
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc')
  const [complaints, setComplaints] = useState<Complaint[]>(() => getStoredComplaints())
  const [activeActionRef, setActiveActionRef] = useState<string | null>(null)
  const [newStatus, setNewStatus] = useState<ComplaintStatus>('Under Review')
  const [actionNote, setActionNote] = useState('')
  const [updateFeedback, setUpdateFeedback] = useState<string | null>(null)

  const summaries = useMemo(() => {
    return getCategoryWiseSummaries(selectedStatus, selectedPriority, complaints)
  }, [selectedStatus, selectedPriority, complaints])

  const filteredComplaints = useMemo(() => {
    let list = [...complaints]
    if (selectedCategory !== 'All') {
      list = list.filter((c) => c.category === selectedCategory)
    }
    if (selectedStatus !== 'All') {
      list = list.filter((c) => c.status === selectedStatus)
    }
    if (selectedPriority !== 'All') {
      list = list.filter((c) => c.priority === selectedPriority)
    }

    list.sort((a, b) => {
      const cmp = a.date.localeCompare(b.date)
      return sortOrder === 'desc' ? -cmp : cmp
    })

    return list
  }, [complaints, selectedCategory, selectedStatus, selectedPriority, sortOrder])

  const totalReports = useMemo(() => {
    return summaries.reduce((acc, curr) => acc + curr.reportCount, 0)
  }, [summaries])

  const highPriorityTotal = useMemo(() => {
    return summaries.reduce((acc, curr) => acc + curr.highPriorityCount, 0)
  }, [summaries])

  const resolvedTotal = useMemo(() => {
    return complaints.filter((c) => c.status === 'Resolved' || c.status === 'Action Taken').length
  }, [complaints])

  const handleUpdateStatus = (refId: string) => {
    if (!actionNote.trim()) {
      setUpdateFeedback('Please add an action or review note.')
      return
    }

    const success = updateComplaintStatus(refId, newStatus, actionNote)
    if (success) {
      setComplaints(getStoredComplaints())
      setUpdateFeedback(`Status updated to ${newStatus} for ${refId}.`)
      setActiveActionRef(null)
      setActionNote('')
      setTimeout(() => setUpdateFeedback(null), 4000)
    }
  }

  return (
    <section style={{ marginTop: '36px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
        <div>
          <Badge tone="warm">Campus Oversight · Aggregated</Badge>
          <h2 style={{ font: "600 2rem/1.2 'Fraunces', serif", margin: '6px 0 2px' }}>Category-Wise Problem Overview</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>
            Anonymous aggregated signals grouped by concern area. Zero individual student tracking.
          </p>
        </div>
        <Badge tone="cool">DEMO DATA — Illustrative only</Badge>
      </div>

      {/* Aggregate Stat Row */}
      <div className="progress-grid" style={{ marginBottom: '28px' }}>
        <StatCard value={String(totalReports)} label="total complaints registered" />
        <StatCard value={String(highPriorityTotal)} label="high/critical priority" />
        <StatCard value={String(resolvedTotal)} label="actions planned or completed" />
        <StatCard value={`${Math.round((resolvedTotal / Math.max(1, totalReports)) * 100)}%`} label="resolution / action rate" />
      </div>

      {/* Filters Bar */}
      <Card style={{ marginBottom: '24px', padding: '18px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ink)', fontWeight: 600, fontSize: '0.88rem' }}>
            <Filter size={16} /> Filters:
          </div>

          <label style={{ margin: 0, display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}>
            <span>Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ width: 'auto', padding: '6px 10px', fontSize: '0.82rem' }}
            >
              <option value="All">All Categories</option>
              <option value="Peer Pressure">Peer Pressure</option>
              <option value="Substance Availability">Substance Availability</option>
              <option value="Stress / Anxiety">Stress / Anxiety</option>
              <option value="Bullying">Bullying</option>
              <option value="Harassment">Harassment</option>
              <option value="Unsafe Campus Area">Unsafe Campus Area</option>
              <option value="Academic Pressure">Academic Pressure</option>
              <option value="Social Pressure">Social Pressure</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label style={{ margin: 0, display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}>
            <span>Priority:</span>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              style={{ width: 'auto', padding: '6px 10px', fontSize: '0.82rem' }}
            >
              <option value="All">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>

          <label style={{ margin: 0, display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}>
            <span>Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{ width: 'auto', padding: '6px 10px', fontSize: '0.82rem' }}
            >
              <option value="All">All Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Action Planned">Action Planned</option>
              <option value="Action Taken">Action Taken</option>
              <option value="Resolved">Resolved</option>
            </select>
          </label>

          <button
            type="button"
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            style={{
              marginLeft: 'auto',
              background: 'none',
              border: '1px solid var(--line)',
              borderRadius: '4px',
              padding: '6px 12px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.82rem',
              color: 'var(--ink)'
            }}
          >
            <ArrowUpDown size={14} /> Date: {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
          </button>
        </div>
      </Card>

      {/* Category Summary Cards Grid */}
      <h3 style={{ fontSize: '1.25rem', marginBottom: '14px' }}>Category Breakdown</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {summaries.map((s) => {
          const isFilterMatch = selectedCategory === 'All' || selectedCategory === s.category
          if (!isFilterMatch && s.reportCount === 0) return null

          return (
            <Card
              key={s.category}
              style={{
                borderTop: s.highPriorityCount > 0 ? '4px solid var(--coral)' : '4px solid var(--green)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                  <strong style={{ fontSize: '1.05rem', color: 'var(--ink)' }}>{s.category}</strong>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '100px',
                      background: s.dominantPriority === 'High' ? '#fee2e2' : '#ecfdf5',
                      color: s.dominantPriority === 'High' ? '#b91c1c' : '#047857'
                    }}
                  >
                    {s.dominantPriority} Priority
                  </span>
                </div>

                <div style={{ margin: '14px 0 10px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ font: "600 2.2rem/1 'Fraunces', serif", color: 'var(--ink)' }}>{s.reportCount}</span>
                  <span style={{ fontSize: '0.84rem', color: 'var(--muted)' }}>reports logged</span>
                </div>

                {/* Mini status bar */}
                <div style={{ display: 'flex', gap: '4px', height: '6px', borderRadius: '3px', overflow: 'hidden', background: '#e5e7eb', margin: '8px 0 12px' }}>
                  <span style={{ flex: s.statusBreakdown.Submitted, background: '#f59e0b' }} title="Submitted" />
                  <span style={{ flex: s.statusBreakdown['Under Review'], background: '#3b82f6' }} title="Under Review" />
                  <span style={{ flex: s.statusBreakdown['Action Planned'] + s.statusBreakdown['Action Taken'], background: '#10b981' }} title="Action" />
                  <span style={{ flex: s.statusBreakdown.Resolved, background: '#2b6957' }} title="Resolved" />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.76rem', color: 'var(--muted)', paddingTop: '10px', borderTop: '1px solid var(--line)' }}>
                <span>Latest: {s.recentDate}</span>
                <button
                  type="button"
                  onClick={() => setSelectedCategory(s.category)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--green)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  Filter category →
                </button>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Admin Action & Review Queue */}
      <Card style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ font: "600 1.5rem/1.2 'Fraunces', serif", margin: 0 }}>Campus Action & Review Queue</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.84rem', marginTop: '4px' }}>
              Campus administrators can update the status and record planned or completed actions.
            </p>
          </div>
          <Badge tone="cool">{filteredComplaints.length} Items Listed</Badge>
        </div>

        {updateFeedback && (
          <div style={{ padding: '10px 14px', background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', borderRadius: '6px', marginBottom: '16px', fontSize: '0.88rem' }}>
            ✓ {updateFeedback}
          </div>
        )}

        {filteredComplaints.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--muted)' }}>
            <p>No complaints match the selected filters.</p>
            <Button variant="quiet" size="small" onClick={() => { setSelectedCategory('All'); setSelectedStatus('All'); setSelectedPriority('All'); }}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--line)', color: 'var(--muted)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  <th style={{ padding: '10px 12px' }}>Ref ID</th>
                  <th style={{ padding: '10px 12px' }}>Category</th>
                  <th style={{ padding: '10px 12px' }}>Description / Location</th>
                  <th style={{ padding: '10px 12px' }}>Priority</th>
                  <th style={{ padding: '10px 12px' }}>Status</th>
                  <th style={{ padding: '10px 12px' }}>Date</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Admin Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((item) => (
                  <tr key={item.referenceId} style={{ borderBottom: '1px solid var(--line)' }}>
                    <td style={{ padding: '12px', fontWeight: 600, color: 'var(--ink)' }}>
                      <code>{item.referenceId}</code>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <Badge tone="warm">{item.category}</Badge>
                    </td>
                    <td style={{ padding: '12px', maxWidth: '280px' }}>
                      <p style={{ margin: 0, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.description}
                      </p>
                      {item.location && (
                        <span style={{ fontSize: '0.76rem', color: 'var(--muted)' }}>📍 {item.location}</span>
                      )}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          color: item.priority === 'High' || item.priority === 'Critical' ? '#b91c1c' : '#4b5563'
                        }}
                      >
                        {item.priority}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: '100px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          background: item.status === 'Resolved' || item.status === 'Action Taken' ? '#ecfdf5' : '#fffbeb',
                          color: item.status === 'Resolved' || item.status === 'Action Taken' ? '#065f46' : '#92400e'
                        }}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--muted)', fontSize: '0.8rem' }}>
                      {item.date}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <button
                        type="button"
                        onClick={() => {
                          if (activeActionRef === item.referenceId) {
                            setActiveActionRef(null)
                          } else {
                            setActiveActionRef(item.referenceId)
                            setNewStatus(item.status)
                            setActionNote('')
                          }
                        }}
                        style={{
                          background: 'var(--mint)',
                          border: '1px solid #c0dfcc',
                          color: 'var(--green)',
                          fontWeight: 600,
                          padding: '5px 10px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.78rem'
                        }}
                      >
                        {activeActionRef === item.referenceId ? 'Close' : 'Update Status'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal-like inline editor when an item is selected */}
        {activeActionRef && (
          <div style={{ marginTop: '20px', padding: '18px', background: '#fcfdfa', border: '1px solid var(--green)', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 12px', fontSize: '1rem', color: 'var(--green)' }}>
              Update Lifecycle for <code>{activeActionRef}</code>
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)', gap: '14px', alignItems: 'end' }}>
              <label style={{ margin: 0 }}>
                <span>New Status:</span>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ComplaintStatus)}
                  style={{ marginTop: '4px' }}
                >
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Action Planned">Action Planned</option>
                  <option value="Action Taken">Action Taken</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Requires More Information">Requires More Information</option>
                </select>
              </label>

              <label style={{ margin: 0 }}>
                <span>Action / Resolution Note:</span>
                <input
                  type="text"
                  value={actionNote}
                  onChange={(e) => setActionNote(e.target.value)}
                  placeholder="e.g. Wardens completed night patrol; maintenance fixed lighting fixtures"
                  style={{ marginTop: '4px' }}
                />
              </label>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '14px', justifyContent: 'flex-end' }}>
              <Button variant="quiet" size="small" onClick={() => setActiveActionRef(null)}>
                Cancel
              </Button>
              <Button size="small" onClick={() => handleUpdateStatus(activeActionRef)}>
                Save Status & Timeline Update
              </Button>
            </div>
          </div>
        )}
      </Card>
    </section>
  )
}
