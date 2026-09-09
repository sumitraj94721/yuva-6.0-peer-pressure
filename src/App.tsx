import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { ArrowRight, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react'
import './App.css'
import { Badge, Button, Card, SectionHeader, StatCard } from './ui'

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Check-In', to: '/check-in' },
  { label: 'Simulator', to: '/simulator' },
  { label: 'Calm Zone', to: '/calm' },
  { label: 'Progress', to: '/progress' },
]

function Home() {
  return (
    <main className="page home-page">
      <section className="hero-copy">
        <Badge tone="warm">A quieter kind of strength</Badge>
        <h1>Make room for your own voice.</h1>
        <p className="hero-text">
          PeerShield helps you notice pressure, practice what to say, and find
          your next steady step without judgment.
        </p>
        <div className="hero-actions">
          <Button to="/check-in" icon={<ArrowRight size={17} />}>Start a check-in</Button>
          <Button to="/simulator" variant="quiet">Practice a moment</Button>
        </div>
      </section>

      <section className="home-grid" aria-label="PeerShield overview">
        <Card className="welcome-card">
          <div className="card-icon"><HeartHandshake size={22} /></div>
          <SectionHeader eyebrow="Your space" title="You do not have to figure it out alone." />
          <p>Small reflections become useful patterns over time. Everything here is private to your device.</p>
          <Button to="/progress" variant="text" icon={<ArrowRight size={16} />}>See your progress</Button>
        </Card>
        <div className="stats-grid">
          <StatCard value="0" label="check-ins completed" />
          <StatCard value="0%" label="pressure mapped" />
          <Card className="signal-card">
            <div className="signal-heading"><ShieldCheck size={18} /> Your data stays yours</div>
            <p>No account or real-time tracking. Your reflection history is stored locally.</p>
          </Card>
        </div>
      </section>
    </main>
  )
}

function Placeholder({ title, description }: { title: string; description: string }) {
  return (
    <main className="page placeholder-page">
      <Badge tone="cool">Phase 1 foundation</Badge>
      <h1>{title}</h1>
      <p className="hero-text">{description}</p>
      <Card className="placeholder-card">
        <Sparkles size={22} />
        <p>This route is ready for its dedicated phase.</p>
      </Card>
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
            <NavLink key={item.to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to={item.to} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Button to="/sos" variant="outline" size="small">Need support?</Button>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/check-in" element={<Placeholder title="Check-In" description="A gentle place to name what is happening today." />} />
        <Route path="/simulator" element={<Placeholder title="Peer Pressure Simulator" description="Practice a response before the moment arrives." />} />
        <Route path="/calm" element={<Placeholder title="Calm Zone" description="Simple tools for finding your center again." />} />
        <Route path="/progress" element={<Placeholder title="Progress" description="Notice the small ways you are building confidence." />} />
        <Route path="/sos" element={<Placeholder title="Support" description="Find an immediate next step when you need one." />} />
      </Routes>
      <footer className="footer"><span>PeerShield</span><span>Private by design</span></footer>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
