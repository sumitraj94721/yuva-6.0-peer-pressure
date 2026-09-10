import { useState, useMemo } from 'react'
import { BookOpen, Plus, Search, Trash2, Edit3, Check, X, ShieldCheck, Tag } from 'lucide-react'
import { Badge, Button, Card } from '../../ui'
import { getJournalEntries, createJournalEntry, updateJournalEntry, deleteJournalEntry } from '../../services/journalService'
import type { JournalEntry } from '../../types/models'

export function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>(() => getJournalEntries())
  const [searchQuery, setSearchQuery] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [activeTagFilter, setActiveTagFilter] = useState<string>('All')

  const allTags = useMemo(() => {
    const set = new Set<string>()
    entries.forEach((e) => e.tags?.forEach((t) => set.add(t)))
    return Array.from(set)
  }, [entries])

  const filteredEntries = useMemo(() => {
    let list = [...entries]
    if (activeTagFilter !== 'All') {
      list = list.filter((e) => e.tags?.includes(activeTagFilter))
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (e) => e.title.toLowerCase().includes(q) || e.content.toLowerCase().includes(q)
      )
    }
    return list
  }, [entries, activeTagFilter, searchQuery])

  const handleStartCreate = () => {
    setEditingId(null)
    setTitle('')
    setContent('')
    setTagInput('')
    setIsEditing(true)
  }

  const handleStartEdit = (entry: JournalEntry) => {
    setEditingId(entry.id)
    setTitle(entry.title)
    setContent(entry.content)
    setTagInput(entry.tags?.join(', ') || '')
    setIsEditing(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    const parsedTags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0)

    if (editingId) {
      updateJournalEntry(editingId, title, content, parsedTags)
    } else {
      createJournalEntry(title, content, parsedTags)
    }

    setEntries(getJournalEntries())
    setIsEditing(false)
    setEditingId(null)
    setTitle('')
    setContent('')
    setTagInput('')
  }

  const handleDelete = (id: string) => {
    deleteJournalEntry(id)
    setEntries(getJournalEntries())
    setDeleteConfirmId(null)
  }

  return (
    <main className="page feature-page">
      <div className="page-intro">
        <Badge tone="cool">Private Personal Space</Badge>
        <h1>Little Journal</h1>
        <p className="hero-text">
          A confidential space on your device to write down what you are feeling, record moments you navigated pressure, or set goals for yourself.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 0.8fr)', gap: '24px', alignItems: 'start' }}>
        <div>
          {/* Controls Bar */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--muted)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your notes..."
                style={{ paddingLeft: '36px' }}
              />
            </div>
            {!isEditing && (
              <Button onClick={handleStartCreate} icon={<Plus size={16} />}>
                New Note
              </Button>
            )}
          </div>

          {/* Tag filter pills */}
          {allTags.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <button
                type="button"
                onClick={() => setActiveTagFilter('All')}
                style={{
                  background: activeTagFilter === 'All' ? 'var(--green)' : '#f3f4f6',
                  color: activeTagFilter === 'All' ? '#ffffff' : 'var(--ink)',
                  border: 'none',
                  borderRadius: '100px',
                  padding: '4px 12px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                All Notes ({entries.length})
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTagFilter(tag)}
                  style={{
                    background: activeTagFilter === tag ? 'var(--green)' : '#f3f4f6',
                    color: activeTagFilter === tag ? '#ffffff' : 'var(--ink)',
                    border: 'none',
                    borderRadius: '100px',
                    padding: '4px 12px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}

          {/* Note Editor Drawer / Form */}
          {isEditing && (
            <Card style={{ marginBottom: '24px', border: '2px solid var(--green)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <strong style={{ fontSize: '1.1rem' }}>{editingId ? 'Edit Reflection' : 'New Note'}</strong>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSave}>
                <label>
                  Title (Optional)
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Walking away from party pressure..."
                  />
                </label>

                <label>
                  Your Thoughts & Reflections
                  <textarea
                    rows={6}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    placeholder="Write honestly. What happened? How did you respond? What do you want to remind yourself of next time?"
                  />
                </label>

                <label>
                  Tags (comma-separated, optional)
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="e.g. Refusal, Finals, CalmMoment, Friends"
                  />
                </label>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '16px' }}>
                  <Button variant="quiet" size="small" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" size="small" icon={<Check size={16} />}>
                    {editingId ? 'Save Changes' : 'Add to Journal'}
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Entries list */}
          {filteredEntries.length === 0 ? (
            <Card style={{ textAlign: 'center', padding: '50px 24px' }}>
              <BookOpen size={36} color="var(--green)" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ font: "600 1.5rem 'Fraunces', serif" }}>Your Journal is Empty</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: '8px 0 20px' }}>
                {searchQuery ? 'No notes match your search.' : 'Write your first note to capture a thought or boundary experience.'}
              </p>
              {!isEditing && (
                <Button onClick={handleStartCreate} icon={<Plus size={16} />}>
                  Write Note
                </Button>
              )}
            </Card>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredEntries.map((entry) => {
                const dateFormatted = new Date(entry.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })

                return (
                  <Card key={entry.id} style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                      <div>
                        <h3 style={{ font: "600 1.35rem/1.25 'Fraunces', serif", margin: '0 0 6px' }}>{entry.title}</h3>
                        <span style={{ fontSize: '0.76rem', color: 'var(--muted)' }}>{dateFormatted}</span>
                      </div>

                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => handleStartEdit(entry)}
                          title="Edit note"
                          style={{
                            background: 'none',
                            border: '1px solid var(--line)',
                            borderRadius: '4px',
                            padding: '6px 8px',
                            cursor: 'pointer',
                            color: 'var(--ink)'
                          }}
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(entry.id)}
                          title="Delete note"
                          style={{
                            background: 'none',
                            border: '1px solid var(--line)',
                            borderRadius: '4px',
                            padding: '6px 8px',
                            cursor: 'pointer',
                            color: '#b91c1c'
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    <p style={{ color: 'var(--ink)', fontSize: '0.94rem', lineHeight: 1.6, margin: '14px 0', whiteSpace: 'pre-wrap' }}>
                      {entry.content}
                    </p>

                    {entry.tags && entry.tags.length > 0 && (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px' }}>
                        {entry.tags.map((t) => (
                          <span
                            key={t}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '3px',
                              background: 'var(--mint)',
                              color: 'var(--green)',
                              fontSize: '0.74rem',
                              fontWeight: 600,
                              padding: '2px 8px',
                              borderRadius: '4px'
                            }}
                          >
                            <Tag size={10} /> {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Delete Confirmation Overlay */}
                    {deleteConfirmId === entry.id && (
                      <div
                        style={{
                          marginTop: '16px',
                          padding: '12px 16px',
                          background: '#fef2f2',
                          border: '1px solid #fecaca',
                          borderRadius: '6px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '10px'
                        }}
                      >
                        <span style={{ fontSize: '0.85rem', color: '#991b1b', fontWeight: 600 }}>
                          Are you sure you want to delete this note?
                        </span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(null)}
                            style={{
                              background: '#ffffff',
                              border: '1px solid #d1d5db',
                              padding: '4px 10px',
                              borderRadius: '4px',
                              fontSize: '0.78rem',
                              cursor: 'pointer'
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(entry.id)}
                            style={{
                              background: '#dc2626',
                              color: '#ffffff',
                              border: 'none',
                              padding: '4px 10px',
                              borderRadius: '4px',
                              fontSize: '0.78rem',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </Card>
                )
              })}
            </div>
          )}
        </div>

        {/* Sidebar Info & Privacy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <ShieldCheck size={20} color="var(--green)" />
              <strong style={{ fontSize: '1.05rem' }}>Strict Local Device Privacy</strong>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.55 }}>
              Your journal is private on this device in this prototype.
            </p>
            <p style={{ color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.55, marginTop: '8px' }}>
              • No journal content is ever sent to administrators.<br />
              • Entries are not included in public or campus analytics.<br />
              • Notes are never used to compute medical or addiction scores.
            </p>
          </Card>

          <Card style={{ background: '#f8fafc', borderColor: '#e2e8f0' }}>
            <strong style={{ fontSize: '0.95rem' }}>Prompt Ideas for Reflection</strong>
            <ul style={{ margin: '10px 0 0', paddingLeft: '18px', color: 'var(--muted)', fontSize: '0.84rem', lineHeight: 1.6 }}>
              <li>What was a situation where saying "no" felt easy or difficult today?</li>
              <li>Who in my campus circle respects my personal boundaries?</li>
              <li>What is one healthy hobby I can turn to when stress is rising?</li>
              <li>What words can I use if friends push me to stay out late?</li>
            </ul>
          </Card>

          <Card>
            <strong style={{ fontSize: '0.92rem' }}>Want to talk it through?</strong>
            <p style={{ color: 'var(--muted)', fontSize: '0.84rem', margin: '6px 0 14px', lineHeight: 1.5 }}>
              Talk through your reflection or practice your refusal boundary with PeerShield AI.
            </p>
            <Button to="/ai-companion" variant="outline" size="small">
              Open PeerShield AI
            </Button>
          </Card>
        </div>
      </div>
    </main>
  )
}
