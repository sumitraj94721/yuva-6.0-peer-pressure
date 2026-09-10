import { useState, useMemo } from 'react'
import { ArrowRight, Sparkles, TrendingDown, TrendingUp, Minus, CalendarDays } from 'lucide-react'
import { Badge, Button, Card, SectionHeader } from '../../ui'
import { getWellbeingEntries, saveWellbeingEntry, calculateWellbeingTrends } from '../../services/wellbeingService'
import type { WellbeingEntry } from '../../types/models'

type Mood = WellbeingEntry['mood']
type SleepQuality = WellbeingEntry['sleepQuality']

const TODAY = new Date().toISOString().slice(0, 10)

function MoodBar({ label, value, max = 5, color }: { label: string; value: number; max?: number; color: string }) {
  const pct = Math.round((value / max) * 100)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
      <span style={{ fontSize: '0.7rem', opacity: 0.7, textAlign: 'center' }}>{label}</span>
      <div
        style={{
          height: `${Math.max(pct * 0.8, 10)}px`,
          background: color,
          borderRadius: 4,
          minHeight: 10,
          transition: 'height 0.4s ease'
        }}
      />
      <span style={{ fontSize: '0.7rem', textAlign: 'center', fontWeight: 600 }}>{value}/{max}</span>
    </div>
  )
}

function SevenDayChart({ entries }: { entries: WellbeingEntry[] }) {
  const moodColor = (m: Mood) =>
    m === 'Good' ? 'var(--accent, #38bdf8)' : m === 'Okay' ? 'var(--warm, #f59e0b)' : 'var(--danger, #f87171)'

  return (
    <div>
      <SectionHeader eyebrow="7-Day View" title="Stress & Pressure" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, alignItems: 'flex-end', minHeight: 110 }}>
        {entries.map((e) => (
          <div key={e.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 80 }}>
              <MoodBar label="" value={e.stress} color={moodColor(e.mood)} />
              <MoodBar label="" value={e.pressure} color="rgba(139,92,246,0.7)" />
            </div>
            <span style={{ fontSize: '0.65rem', opacity: 0.8 }}>{e.dayLabel}</span>
            <span style={{ fontSize: '0.55rem', opacity: 0.5 }}>{e.mood[0]}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: '0.7rem', opacity: 0.7 }}>
        <span><span style={{ color: 'var(--accent, #38bdf8)', fontWeight: 700 }}>■</span> Stress (mood-tinted)</span>
        <span><span style={{ color: 'rgba(139,92,246,0.9)', fontWeight: 700 }}>■</span> Pressure</span>
      </div>
    </div>
  )
}

export function WellbeingPage() {
  const [entries, setEntries] = useState<WellbeingEntry[]>(() => getWellbeingEntries())
  const [showForm, setShowForm] = useState(false)

  // Form state
  const [mood, setMood] = useState<Mood>('Okay')
  const [stress, setStress] = useState(3)
  const [pressure, setPressure] = useState(2)
  const [sleep, setSleep] = useState<SleepQuality>('Okay')
  const [activity, setActivity] = useState('')
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)

  const trends = useMemo(() => calculateWellbeingTrends(entries), [entries])

  const todayEntry = entries.find((e) => e.date === TODAY)

  const handleSave = () => {
    if (!activity.trim()) return
    const updated = saveWellbeingEntry({
      date: TODAY,
      mood,
      stress,
      pressure,
      sleepQuality: sleep,
      healthyActivity: activity.trim(),
      notes: notes.trim() || undefined
    })
    setEntries((prev) => {
      const idx = prev.findIndex((e) => e.date === TODAY)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = updated
        return copy
      }
      return [...prev, updated].slice(-7)
    })
    setSaved(true)
    setShowForm(false)
  }

  const TrendIcon = trends.averageStress >= 3.5 ? TrendingUp : trends.averageStress <= 2 ? TrendingDown : Minus

  return (
    <main className="page feature-page">
      <div className="page-intro">
        <Badge tone="cool">
          <CalendarDays size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
          7-Day Wellbeing Reflection
        </Badge>
        <h1>How has your week been?</h1>
        <p className="hero-text">
          A private, daily log of your mood, stress, and pressure. This is not a medical assessment — it's a personal reflection tool to help you spot patterns and find calm strategies.
        </p>
      </div>

      {/* Trend summary */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <TrendIcon size={22} style={{ marginTop: 2, flexShrink: 0 }} />
          <div>
            <SectionHeader eyebrow="This week's pattern" title="Wellbeing Trend" />
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', margin: '8px 0 12px' }}>
              <span style={{ fontSize: '0.85rem' }}>
                Avg stress <strong>{trends.averageStress}/5</strong>
              </span>
              <span style={{ fontSize: '0.85rem' }}>
                Avg pressure <strong>{trends.averagePressure}/5</strong>
              </span>
              {trends.highestPressureDay && (
                <span style={{ fontSize: '0.85rem' }}>
                  Peak pressure day: <strong>{trends.highestPressureDay}</strong>
                </span>
              )}
            </div>
            <p style={{ fontSize: '0.9rem', opacity: 0.85, marginBottom: 12 }}>{trends.calmRecommendation}</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Button to="/calm-zone" variant="outline" icon={<ArrowRight size={15} />}>
                Open Calm Zone
              </Button>
              <Button to="/ai-companion?context=wellbeing" variant="text" icon={<Sparkles size={15} />}>
                Talk with PeerShield AI
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Chart */}
      <Card>
        <SevenDayChart entries={entries} />
      </Card>

      {/* Today log */}
      {saved || todayEntry ? (
        <Card>
          <Badge tone="cool">Today logged</Badge>
          <h2 style={{ marginTop: 8 }}>Today's reflection saved</h2>
          <p>Mood: <strong>{todayEntry?.mood ?? mood}</strong> · Stress: <strong>{todayEntry?.stress ?? stress}/5</strong> · Pressure: <strong>{todayEntry?.pressure ?? pressure}/5</strong></p>
          <Button variant="text" onClick={() => { setShowForm(true); setSaved(false) }}>
            Edit today's entry <ArrowRight size={15} />
          </Button>
        </Card>
      ) : !showForm ? (
        <Card>
          <SectionHeader eyebrow="Daily check-in" title="Log today's reflection" />
          <p style={{ opacity: 0.8, marginBottom: 14 }}>Takes 30 seconds. Private to this device.</p>
          <Button onClick={() => setShowForm(true)} icon={<ArrowRight size={16} />}>
            Start today's log
          </Button>
        </Card>
      ) : null}

      {/* Entry form */}
      {showForm && (
        <Card className="form-card">
          <SectionHeader eyebrow="Today's entry" title="How are you feeling?" />

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>Overall mood</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {(['Good', 'Okay', 'Difficult'] as Mood[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  className={mood === m ? 'option-button selected' : 'option-button'}
                  style={{ flex: '0 0 auto', padding: '8px 18px' }}
                  onClick={() => setMood(m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>
              Stress level: <strong>{stress}/5</strong>
            </label>
            <input
              type="range"
              min={1}
              max={5}
              value={stress}
              onChange={(e) => setStress(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent, #38bdf8)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', opacity: 0.6 }}>
              <span>Relaxed</span><span>Very stressed</span>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>
              Peer pressure felt: <strong>{pressure}/5</strong>
            </label>
            <input
              type="range"
              min={1}
              max={5}
              value={pressure}
              onChange={(e) => setPressure(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'rgba(139,92,246,0.9)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', opacity: 0.6 }}>
              <span>None</span><span>Very high</span>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>Sleep quality last night</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {(['Good', 'Okay', 'Difficult'] as SleepQuality[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  className={sleep === s ? 'option-button selected' : 'option-button'}
                  style={{ flex: '0 0 auto', padding: '8px 18px' }}
                  onClick={() => setSleep(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>
              One healthy activity today <span style={{ fontWeight: 400, opacity: 0.7 }}>(required)</span>
            </label>
            <input
              type="text"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              placeholder="e.g. Morning walk, deep breathing, called a friend…"
              style={{
                width: '100%',
                padding: '10px 12px',
                background: 'var(--surface-2, rgba(255,255,255,0.06))',
                border: '1px solid var(--border, rgba(255,255,255,0.12))',
                borderRadius: 8,
                color: 'inherit',
                fontSize: '0.95rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>
              Optional notes <span style={{ fontWeight: 400, opacity: 0.7 }}>(private)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Anything you want to remember about today…"
              rows={3}
              style={{
                width: '100%',
                padding: '10px 12px',
                background: 'var(--surface-2, rgba(255,255,255,0.06))',
                border: '1px solid var(--border, rgba(255,255,255,0.12))',
                borderRadius: 8,
                color: 'inherit',
                fontSize: '0.9rem',
                resize: 'vertical',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Button onClick={handleSave} disabled={!activity.trim()}>
              Save today's reflection
            </Button>
            <Button variant="quiet" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Past entries */}
      <Card>
        <SectionHeader eyebrow="History" title="Past entries" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
          {[...entries].reverse().map((e) => (
            <div
              key={e.id}
              style={{
                display: 'flex',
                gap: 16,
                alignItems: 'center',
                padding: '10px 14px',
                background: 'var(--surface-2, rgba(255,255,255,0.04))',
                borderRadius: 8,
                flexWrap: 'wrap'
              }}
            >
              <div style={{ minWidth: 40 }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{e.dayLabel}</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>{e.date}</div>
              </div>
              <Badge tone={e.mood === 'Good' ? 'cool' : e.mood === 'Okay' ? 'warm' : 'warm'}>{e.mood}</Badge>
              <span style={{ fontSize: '0.8rem', opacity: 0.75 }}>Stress {e.stress}/5 · Pressure {e.pressure}/5</span>
              {e.healthyActivity && (
                <span style={{ fontSize: '0.8rem', opacity: 0.65, fontStyle: 'italic' }}>{e.healthyActivity}</span>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card className="privacy-card">
        <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>
          🔒 All wellbeing entries are stored privately on this device. No wellbeing data is shared or used for any medical assessment.
        </p>
      </Card>
    </main>
  )
}
