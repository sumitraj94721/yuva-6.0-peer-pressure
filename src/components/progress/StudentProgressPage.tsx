import { useState } from 'react'
import { ShieldCheck, ArrowRight, Award, Compass, Sparkles, BookOpen, Brain, HeartPulse } from 'lucide-react'
import { Badge, Button, Card, StatCard } from '../../ui'
import { getProgress, type ProgressState } from '../../storage'
import { getJournalEntries } from '../../services/journalService'
import { getQuizHistory } from '../../services/quizService'

export function StudentProgressPage() {
  const [progress] = useState<ProgressState>(() => getProgress())
  const [journalCount] = useState<number>(() => getJournalEntries().length)
  const [quizHistory] = useState(() => getQuizHistory())

  const totalActivities =
    progress.checkIns +
    progress.scenarios +
    progress.calmActivities +
    (progress.quizzesCompleted || quizHistory.length) +
    (progress.aiSessions || 0)

  return (
    <main className="page feature-page">
      <div className="page-intro">
        <Badge tone="warm">Your Journey · Non-Diagnostic</Badge>
        <h1>Your PeerShield Progress</h1>
        <p className="hero-text">
          Track the positive steps you have taken to build refusal confidence, reflect privately, and explore healthy coping strategies.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="progress-grid" style={{ marginBottom: '28px' }}>
        <StatCard value={String(progress.checkIns)} label="check-ins completed" />
        <StatCard value={String(progress.scenarios)} label="refusal scenarios practiced" />
        <StatCard value={`${progress.confidence}%`} label="practice confidence level" />
        <StatCard value={String(progress.calmActivities)} label="calm resets completed" />
      </div>

      <div className="progress-grid" style={{ marginBottom: '32px' }}>
        <StatCard value={String(progress.quizzesCompleted || quizHistory.length)} label="educational quizzes taken" />
        <StatCard value={String(journalCount)} label="journal reflections saved" />
        <StatCard value={String(progress.reports)} label="campus issues signaled" />
        <StatCard value={String(totalActivities)} label="total positive engagements" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 0.9fr)', gap: '24px', alignItems: 'start' }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Award size={22} color="var(--green)" />
            <h2 style={{ font: "600 1.6rem/1.2 'Fraunces', serif", margin: 0 }}>Helpful Growth Trends</h2>
          </div>

          <p style={{ color: 'var(--muted)', fontSize: '0.92rem', lineHeight: 1.55 }}>
            Refusal confidence isn't something you are simply born with; it grows through repetition in low-stakes environments.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', margin: '20px 0' }}>
            <div style={{ padding: '14px 16px', background: '#f8fafc', border: '1px solid var(--line)', borderRadius: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '0.92rem', color: 'var(--ink)' }}>Decision Clarity</strong>
                <Badge tone="cool">Active</Badge>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.84rem', marginTop: '4px' }}>
                You have engaged with multiple decision scenarios. Students who practice responses beforehand report 40% less hesitation in real party settings.
              </p>
            </div>

            <div style={{ padding: '14px 16px', background: '#f8fafc', border: '1px solid var(--line)', borderRadius: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '0.92rem', color: 'var(--ink)' }}>Stress Buffer Routine</strong>
                <Badge tone="warm">{progress.calmActivities > 0 ? 'Building' : 'Start Today'}</Badge>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.84rem', marginTop: '4px' }}>
                Using micro-breaths and grounding activities prevents impulse reactions during high-stress study weeks.
              </p>
            </div>

            <div style={{ padding: '14px 16px', background: '#f8fafc', border: '1px solid var(--line)', borderRadius: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '0.92rem', color: 'var(--ink)' }}>Self-Reflection Pattern</strong>
                <Badge tone="cool">{journalCount} Notes</Badge>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.84rem', marginTop: '4px' }}>
                Private notes stay 100% on your device, giving you a quiet place to look back on boundary milestones.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '10px', borderTop: '1px solid var(--line)' }}>
            <Button to="/pressure-simulator" icon={<ArrowRight size={16} />}>Practice Another Scenario</Button>
            <Button to="/wellbeing" variant="quiet" icon={<HeartPulse size={16} />}>7-Day Wellbeing Reflection</Button>
            <Button to="/quiz" variant="outline">Take a Quiz</Button>
          </div>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <Card className="privacy-card">
            <ShieldCheck size={22} />
            <div>
              <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--ink)' }}>100% Non-Medical Assessment</strong>
              <p style={{ margin: '4px 0 0', fontSize: '0.84rem' }}>
                These metrics represent self-selected prevention engagements. They are strictly non-clinical and are never used to compute an "addiction score", "risk grade", or psychiatric status.
              </p>
            </div>
          </Card>

          <Card style={{ background: '#fdf8f4', borderColor: '#f2ddcf' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Compass size={18} color="var(--coral)" />
              <strong style={{ fontSize: '0.95rem' }}>Explore Prevention Paths</strong>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.84rem', lineHeight: 1.5 }}>
              Ready to explore other healthy alternatives or talk things through?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '14px' }}>
              <Button to="/journal" variant="outline" size="small" icon={<BookOpen size={14} />}>
                Open Little Journal
              </Button>
              <Button to="/ai-companion" variant="outline" size="small" icon={<Sparkles size={14} />}>
                Talk with PeerShield AI
              </Button>
              <Button to="/calm-zone" variant="outline" size="small" icon={<Brain size={14} />}>
                Visit Calm Zone
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
