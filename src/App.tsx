import { useEffect, useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { ArrowRight, Check, HeartHandshake, Leaf, ShieldCheck, Upload, Wind, Sparkles } from 'lucide-react'
import './App.css'
import { Badge, Button, Card, SectionHeader, StatCard } from './ui'
import { checkInQuestions, resources, scenarios } from './data'
import { addProgress, getProgress, saveCheckIn } from './storage'
import { calculateAverageConfidence, calculatePressureRate, expectedColumns, parseCsv, type SurveyRow } from './analytics'
import { generateInterventionRecommendations } from './intervention'
import { demoMetadata, publicMetadata } from './dataset'
import { AICompanionPage } from './components/ai/AICompanionPage'
import { ComplaintBoxPage } from './components/complaints/ComplaintBoxPage'
import { ComplaintTrackPage } from './components/complaints/ComplaintTrackPage'
import { CategoryIssuesDashboard } from './components/dashboard/CategoryIssuesDashboard'
import { JournalPage } from './components/journal/JournalPage'
import { QuizPage } from './components/quiz/QuizPage'
import { ImprovePage } from './components/improve/ImprovePage'
import { StudentProgressPage } from './components/progress/StudentProgressPage'
import { EvidenceDashboard } from './components/evidence/EvidenceDashboard'

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Check-In', to: '/check-in' },
  { label: 'Simulator', to: '/pressure-simulator' },
  { label: 'PeerShield AI', to: '/ai-companion' },
  { label: 'Campus Pulse', to: '/campus-pulse' },
  { label: 'Calm Zone', to: '/calm-zone' },
  { label: 'Journal', to: '/journal' },
  { label: 'Quiz', to: '/quiz' },
  { label: 'Progress', to: '/progress' },
  { label: 'Evidence & Substance Data', to: '/evidence' },
]

function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="page-intro">
      <Badge tone="warm">{eyebrow}</Badge>
      <h1>{title}</h1>
      <p className="hero-text">{text}</p>
    </div>
  )
}

function Home() {
  return (
    <main className="page home-page">
      <section className="hero-copy">
        <Badge tone="warm">Evidence-informed prevention</Badge>
        <h1>Don’t follow the pressure. Lead the change.</h1>
        <p className="hero-text">
          PeerShield helps college students recognize peer pressure, practice healthy responses, find support, and contribute to a healthier campus culture.
        </p>
        <div className="hero-actions">
          <Button to="/check-in" icon={<ArrowRight size={17} />}>Take a Quick Check-In</Button>
          <Button to="/pressure-simulator" variant="quiet">Try Pressure Simulator</Button>
        </div>
      </section>
      <section className="home-grid" aria-label="PeerShield overview">
        <Card className="welcome-card">
          <div className="card-icon"><HeartHandshake size={22} /></div>
          <SectionHeader eyebrow="Your private space" title="Recognize pressure. Practice your choice." />
          <p>Start with a reflection, try a response, and find a healthy next step. Your prototype activity stays on this device.</p>
          <Button to="/calm-zone" variant="text" icon={<ArrowRight size={16} />}>Find a calm alternative</Button>
        </Card>
        <div className="stats-grid">
          <StatCard value="01" label="recognize your pattern" />
          <StatCard value="02" label="practice a response" />
          <Card className="signal-card">
            <div className="signal-heading"><ShieldCheck size={18} /> Anonymous by default</div>
            <p>No account, diagnosis, or public student profiles. Campus views use aggregated signals only.</p>
          </Card>
        </div>
      </section>
    </main>
  )
}

function CheckIn() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [done, setDone] = useState(false)
  const question = checkInQuestions[step]

  const choose = (answer: string) => {
    const next = { ...answers, [question.id]: answer }
    setAnswers(next)
    if (step === checkInQuestions.length - 1) {
      saveCheckIn(next)
      setDone(true)
    } else {
      setStep(step + 1)
    }
  }

  if (done) {
    return (
      <main className="page feature-page">
        <Badge tone="cool">Check-in complete</Badge>
        <h1>Your current focus</h1>
        <p className="hero-text">Based on your reflection, a useful next step is to build refusal confidence and make one supportive choice today.</p>
        <Card className="result-card">
          <Check size={24} />
          <div>
            <h2>Practice before the pressure arrives</h2>
            <p>Try one simulator scenario, then return to this reflection whenever your situation changes.</p>
          </div>
        </Card>
        <Card className="result-card ai-talk-card">
          <Sparkles size={24} />
          <div>
            <h2>Want to talk about this?</h2>
            <p>Talk through your reflection or practice your refusal lines with PeerShield AI.</p>
            <div style={{ marginTop: '14px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Button to="/ai-companion?context=refusal-confidence" icon={<ArrowRight size={16} />}>Talk to PeerShield AI</Button>
              <Button to="/pressure-simulator" variant="quiet">Practice a response</Button>
              <Button to="/progress" variant="quiet">View progress</Button>
            </div>
          </div>
        </Card>
      </main>
    )
  }

  return (
    <main className="page feature-page">
      <PageIntro eyebrow={`Private reflection · ${step + 1} of ${checkInQuestions.length}`} title="What is happening around you?" text="A short, anonymous prevention check-in. This is not a medical diagnosis." />
      <Card className="question-card">
        <div className="progress-track"><span style={{ width: `${((step + 1) / checkInQuestions.length) * 100}%` }} /></div>
        <h2>{question.label}</h2>
        <div className="option-list">
          {question.options.map((option) => (
            <button className="option-button" type="button" key={option} onClick={() => choose(option)}>
              {option}<ArrowRight size={16} />
            </button>
          ))}
        </div>
      </Card>
    </main>
  )
}

function Simulator() {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(0)
  const scenario = scenarios[index]

  const choose = (optionIndex: number) => {
    if (selected !== null) return
    const option = scenario.options[optionIndex]
    setSelected(optionIndex)
    setScore(score + option.score)
    const progress = getProgress()
    addProgress({
      scenarios: progress.scenarios + 1,
      confidence: Math.round((progress.confidence * progress.scenarios + option.score * 10) / (progress.scenarios + 1))
    })
  }

  const next = () => {
    setSelected(null)
    if (index === scenarios.length - 1) setCompleted(completed + 1)
    setIndex((index + 1) % scenarios.length)
  }

  return (
    <main className="page feature-page">
      <PageIntro eyebrow="Practice without pressure" title="What would you say?" text="There is no perfect response. Try one that protects your choice and feels possible for you." />
      <Card className="scenario-card">
        <Badge tone="cool">Scenario {index + 1} of {scenarios.length}</Badge>
        <p className="scenario-context">{scenario.context}</p>
        <h2>“{scenario.prompt}”</h2>
        <div className="option-list">
          {scenario.options.map((option, optionIndex) => (
            <button
              className={selected === optionIndex ? 'option-button selected' : 'option-button'}
              type="button"
              key={option.label}
              onClick={() => choose(optionIndex)}
            >
              {option.label}<ArrowRight size={16} />
            </button>
          ))}
        </div>
        {selected !== null && (
          <div className="feedback">
            <strong>{scenario.options[selected].score >= 8 ? 'That protects your choice.' : 'That is a starting point.'}</strong>
            <p>{scenario.options[selected].feedback}</p>
            <div className="feedback-row">
              <Badge tone="warm">Confidence +{scenario.options[selected].score}</Badge>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Button to="/ai-companion?mode=practice" variant="outline" icon={<Sparkles size={15} />}>Practice with AI</Button>
                <Button onClick={next}>Try another scenario</Button>
              </div>
            </div>
          </div>
        )}
      </Card>
      <p className="practice-count">{completed} practice loops completed · Your progress is stored locally.</p>
    </main>
  )
}

function CalmZone() {
  const [breathing, setBreathing] = useState(false)
  const [seconds, setSeconds] = useState(60)

  useEffect(() => {
    if (!breathing || seconds === 0) return
    const timer = window.setInterval(() => setSeconds((value) => value - 1), 1000)
    return () => window.clearInterval(timer)
  }, [breathing, seconds])

  return (
    <main className="page feature-page">
      <PageIntro eyebrow="A steadier next step" title="Calm Zone" text="Small, healthy ways to move through pressure without making a big decision in the heat of the moment." />
      <div className="calm-grid">
        <Card className="breathing-card">
          <div className={breathing ? 'breath-orb breathing' : 'breath-orb'}><Wind size={28} /></div>
          <h2>60-second breathing reset</h2>
          <p>Slow your exhale and give yourself a little space.</p>
          <Button onClick={() => { setBreathing(!breathing); if (!breathing) setSeconds(60) }}>
            {breathing ? `Pause · ${seconds}s` : 'Begin reset'}
          </Button>
        </Card>
        <Card>
          <Leaf size={22} className="card-symbol" />
          <h2>Healthy alternatives</h2>
          <ul className="clean-list">
            <li>Take a short walk or get some water.</li>
            <li>Message a friend who respects your boundaries.</li>
            <li>Choose music, movement, or a creative distraction.</li>
            <li>Leave the situation and return when it feels safe.</li>
          </ul>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '16px' }}>
            <Button to="/ai-companion?context=calm" variant="solid" icon={<Sparkles size={16} />}>Talk it through with PeerShield AI</Button>
            <Button to="/sos" variant="text">I need support now <ArrowRight size={16} /></Button>
          </div>
        </Card>
      </div>
    </main>
  )
}

function Resources() {
  return (
    <main className="page feature-page">
      <PageIntro eyebrow="Reliable next steps" title="Resources" text="Start with a practical option. External resources are clearly identified so you know what you are opening." />
      <div className="resource-grid">
        {resources.map((resource) => (
          <Card key={resource.title}>
            <Badge tone={resource.type === 'External official resource' ? 'cool' : 'warm'}>{resource.category}</Badge>
            <h2>{resource.title}</h2>
            <p>{resource.description}</p>
            {resource.href ? (
              <a className="resource-link" href={resource.href} target="_blank" rel="noreferrer">
                Open official resource <ArrowRight size={15} />
              </a>
            ) : (
              <span className="resource-type">{resource.type}</span>
            )}
          </Card>
        ))}
      </div>
    </main>
  )
}

function Sos() {
  return (
    <main className="page feature-page">
      <Badge tone="warm">Immediate support</Badge>
      <h1>Need help right now?</h1>
      <p className="hero-text">If there is an immediate emergency or someone is in danger, contact emergency services.</p>
      <Card className="emergency-card">
        <span>Emergency services in India</span>
        <strong>112</strong>
        <a className="button button-solid" href="tel:112">Call 112</a>
      </Card>
      <Card className="privacy-card">
        <p>PeerShield is a prevention prototype and does not provide emergency response. For non-immediate support, try a trusted person, campus support service, or the Calm Zone.</p>
      </Card>
    </main>
  )
}

function Pulse() {
  return (
    <main className="page feature-page">
      <PageIntro eyebrow="Campus intelligence" title="Campus Pulse" text="A future home for anonymous, aggregated campus signals. No individual student behavior is shown." />
      <Card className="demo-panel">
        <Badge tone="warm">{demoMetadata.dataType}</Badge>
        <h2>Illustrative campus pilot data — not measured results.</h2>
        <p>{demoMetadata.description}</p>
        <div className="metadata">
          <span>Source: {demoMetadata.source}</span>
          <span>Population: {demoMetadata.population}</span>
          <span>Geography: {demoMetadata.geographicCoverage}</span>
        </div>
        <div className="pulse-bars">
          <span style={{ height: '42%' }} />
          <span style={{ height: '68%' }} />
          <span style={{ height: '54%' }} />
          <span style={{ height: '82%' }} />
          <span style={{ height: '62%' }} />
        </div>
        <p className="public-note">Public context is kept separate: {publicMetadata.datasetName} covers {publicMetadata.population} in {publicMetadata.geographicCoverage}, not college students.</p>
      </Card>
    </main>
  )
}

function Champions() {
  return (
    <main className="page feature-page">
      <PageIntro eyebrow="Community" title="PeerShield Champions" text="Peer-led prevention means making healthier choices easier to see, share, and join." />
      <div className="resource-grid">
        <Card>
          <Badge tone="cool">Demo champion</Badge>
          <h2>Aanya · Wellbeing circle</h2>
          <p>Organizes low-pressure walks and shares support resources during exam weeks.</p>
        </Card>
        <Card>
          <Badge tone="cool">Demo champion</Badge>
          <h2>Rohan · Sports collective</h2>
          <p>Creates social alternatives where students can connect without needing to fit a substance-use norm.</p>
        </Card>
        <Card className="demo-panel">
          <h2>Want to help?</h2>
          <p>Champions can organize healthy activities, promote positive norms, share resources, and collect anonymous feedback. This prototype does not rank students or expose private behavior.</p>
          <Button to="/report" variant="text">Share a campus idea <ArrowRight size={16} /></Button>
        </Card>
      </div>
    </main>
  )
}

function About() {
  return (
    <main className="page feature-page">
      <PageIntro eyebrow="Evidence-informed prototype" title="Why PeerShield?" text="Peer pressure and perceived social norms can shape decisions. Prevention works best when students have practical choices, supportive peers, and safe ways to signal what is happening." />
      <div className="about-grid">
        <Card>
          <h2>How it works</h2>
          <p>Recognize → Understand → Practice → Resist → Choose a healthy alternative → Get support → Improve campus culture.</p>
        </Card>
        <Card>
          <h2>What data means</h2>
          <p>Campus survey data, public evidence, and illustrative demo data are separate. WHO India GSHS 2022 describes school-going adolescents in Jaipur, not Indian college students.</p>
        </Card>
        <Card>
          <h2>Privacy and limits</h2>
          <p>Anonymous by default, minimum data, local prototype storage, no diagnosis, and no individual student profiles. Real deployment would need secure review, consent, and evaluation.</p>
        </Card>
        <Card>
          <h2>References</h2>
          <p>WHO India GSHS 2022 and the Government of India National Tobacco Control Programme are starting points for evidence and official information.</p>
        </Card>
      </div>
    </main>
  )
}

function Impact() {
  return (
    <main className="page feature-page">
      <PageIntro eyebrow="Measure the change" title="Impact loop" text="Measure → Understand → Intervene → Engage peers → Change the campus environment → Measure again." />
      <Card className="demo-panel">
        <Badge tone="warm">Illustrative pilot scenario — not measured results</Badge>
        <div className="impact-steps">
          <div><strong>Baseline</strong><span>Pressure exposure 62%</span></div>
          <ArrowRight />
          <div><strong>Intervention</strong><span>Simulator workshops + Calm Zone</span></div>
          <ArrowRight />
          <div><strong>Follow-up</strong><span>Confidence target 70%</span></div>
        </div>
      </Card>
    </main>
  )
}

function Dashboard() {
  const demoRows: SurveyRow[] = [
    { pressure_frequency: 'Often', refusal_confidence: 'A little confident', main_reason: 'Stress' },
    { pressure_frequency: 'Very often', refusal_confidence: 'Mostly confident', main_reason: 'Stress' },
    { pressure_frequency: 'Sometimes', refusal_confidence: 'Very confident', main_reason: 'Curiosity' }
  ]
  const recommendations = generateInterventionRecommendations(demoRows)

  return (
    <main className="page feature-page">
      <PageIntro eyebrow="Admin view · demo" title="Prevention dashboard" text="Aggregated patterns only. Demo data is illustrative and not measured results." />
      <div className="progress-grid">
        <StatCard value="248" label="students reached · demo" />
        <StatCard value="62%" label="pressure exposure · demo" />
        <StatCard value={`${calculateAverageConfidence(demoRows)}%`} label="refusal confidence · demo" />
        <StatCard value="18" label="PeerShield Champions · demo" />
      </div>
      <div className="dashboard-grid">
        <Card>
          <Badge tone="warm">Demo data</Badge>
          <h2>Campus signal</h2>
          <p>Pressure rate: {calculatePressureRate(demoRows)}%</p>
          <p>Perceived norms and preferred interventions should be displayed with source, year, population, and geography metadata.</p>
        </Card>
        <Card>
          <h2>Recommendations</h2>
          {recommendations.map((item) => (
            <div className="recommendation" key={item.title}>
              <strong>{item.priority} · {item.title}</strong>
              <p>{item.reason}</p>
            </div>
          ))}
        </Card>
      </div>
      <Button to="/dashboard/data-import" variant="quiet" icon={<Upload size={16} />}>
        Import campus survey CSV
      </Button>
      <CategoryIssuesDashboard />
    </main>
  )
}

function DataImport() {
  const [summary, setSummary] = useState<{ validRows: SurveyRow[]; invalidRows: SurveyRow[]; missingColumns: string[] } | null>(null)

  const onFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    file.text().then((text) => setSummary(parseCsv(text)))
  }

  return (
    <main className="page feature-page">
      <PageIntro eyebrow="Admin demo tool" title="Import campus survey data" text="Upload a CSV with the expected anonymous survey columns. Malformed rows are reported rather than crashing the app." />
      <Card className="form-card">
        <label className="upload-box">
          <Upload size={24} />Choose CSV file
          <input type="file" accept=".csv,text/csv" onChange={onFile} />
        </label>
        <p className="import-columns">Expected columns: {expectedColumns.join(', ')}</p>
        {summary && (
          <div className="import-summary">
            <StatCard value={String(summary.validRows.length)} label="valid rows" />
            <StatCard value={String(summary.invalidRows.length)} label="invalid rows" />
            <StatCard value={String(summary.missingColumns.length)} label="missing columns" />
            {summary.missingColumns.length > 0 && <p>Missing: {summary.missingColumns.join(', ')}</p>}
          </div>
        )}
      </Card>
    </main>
  )
}

function NotFound() {
  return (
    <main className="page feature-page">
      <Badge tone="warm">404</Badge>
      <h1>That page is not here.</h1>
      <p className="hero-text">Try returning to the PeerShield home space.</p>
      <Button to="/">Back home</Button>
    </main>
  )
}

function AppShell() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/" aria-label="PeerShield home">
          <span className="brand-mark"><ShieldCheck size={18} /></span>
          <span>PeerShield</span>
        </NavLink>
        <nav aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink key={item.to} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to={item.to} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Button to="/sos" variant="outline" size="small">Need support?</Button>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/check-in" element={<CheckIn />} />
        <Route path="/pressure-simulator" element={<Simulator />} />
        <Route path="/simulator" element={<Simulator />} />
        <Route path="/campus-pulse" element={<Pulse />} />
        <Route path="/calm-zone" element={<CalmZone />} />
        <Route path="/calm" element={<CalmZone />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/report" element={<ComplaintBoxPage />} />
        <Route path="/complaints" element={<ComplaintBoxPage />} />
        <Route path="/complaints/track" element={<ComplaintTrackPage />} />
        <Route path="/track" element={<ComplaintTrackPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/improve" element={<ImprovePage />} />
        <Route path="/sos" element={<Sos />} />
        <Route path="/progress" element={<StudentProgressPage />} />
        <Route path="/peer-champions" element={<Champions />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/data-import" element={<DataImport />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/about" element={<About />} />
        <Route path="/ai-companion" element={<AICompanionPage />} />
        <Route path="/evidence" element={<EvidenceDashboard />} />
        <Route path="/evidence/*" element={<EvidenceDashboard />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer className="footer">
        <span>PeerShield · Don’t follow the pressure. Lead the change.</span>
        <span>Private by design</span>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
