import { useState } from 'react'
import { ArrowRight, CheckCircle2, XCircle, RotateCcw, Sparkles, BookOpen, ShieldCheck } from 'lucide-react'
import { Badge, Button, Card } from '../../ui'
import { QUIZ_QUESTIONS, saveQuizResult } from '../../services/quizService'

export function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const currentQuestion = QUIZ_QUESTIONS[currentStep]

  const handleSelectOption = (idx: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(idx)
    const isCorrect = idx === currentQuestion.correctIndex
    if (isCorrect) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1)
      setSelectedAnswer(null)
    } else {
      saveQuizResult(score + (selectedAnswer === currentQuestion.correctIndex ? 0 : 0), QUIZ_QUESTIONS.length)
      setIsCompleted(true)
    }
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setSelectedAnswer(null)
    setScore(0)
    setIsCompleted(false)
  }

  if (isCompleted) {
    const percent = Math.round((score / QUIZ_QUESTIONS.length) * 100)

    return (
      <main className="page feature-page">
        <div className="page-intro">
          <Badge tone="cool">Knowledge & Refusal Skills</Badge>
          <h1>Quiz Completed</h1>
          <p className="hero-text">
            Great job taking time to learn healthy boundary and pressure-recognition skills.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 0.9fr)', gap: '24px', alignItems: 'start', maxWidth: '980px' }}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'var(--mint)',
                  color: 'var(--green)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '1.4rem',
                  fontWeight: 700
                }}
              >
                {percent}%
              </div>
              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--muted)', textTransform: 'uppercase' }}>Your Result</span>
                <h2 style={{ fontSize: '1.9rem', margin: '2px 0' }}>{score} of {QUIZ_QUESTIONS.length} Correct</h2>
              </div>
            </div>

            <p style={{ color: 'var(--ink)', fontSize: '0.94rem', lineHeight: 1.6, margin: '14px 0 24px' }}>
              {score === QUIZ_QUESTIONS.length
                ? 'Outstanding! You have a solid grasp of clear boundaries, indirect pressure awareness, and campus safety.'
                : 'Good effort! Refusal and bystander skills get easier the more you practice them before high-pressure moments happen.'}
            </p>

            <h3 style={{ fontSize: '1.15rem', marginBottom: '12px' }}>Key Learning Points</h3>
            <ul style={{ margin: '0 0 24px', paddingLeft: '18px', color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.65 }}>
              <li><strong>Clear boundaries:</strong> A short, relaxed refusal without over-apologizing leaves no opening for debate.</li>
              <li><strong>Indirect norms:</strong> Many students overestimate how often peers consume substances. You are not alone in choosing your health.</li>
              <li><strong>Bystander distraction:</strong> Stepping in with a simple neutral excuse gives pressured peers an easy, dignified way out.</li>
              <li><strong>Anonymous safety:</strong> Reporting unlit or hazardous campus areas helps everyone without exposing you to danger.</li>
            </ul>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button onClick={handleRestart} icon={<RotateCcw size={16} />}>
                Retake Quiz
              </Button>
              <Button to="/pressure-simulator" variant="quiet" icon={<ArrowRight size={16} />}>
                Try Pressure Simulator
              </Button>
              <Button to="/ai-companion?mode=practice" variant="outline" icon={<Sparkles size={16} />}>
                Practice Lines with AI
              </Button>
            </div>
          </Card>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <ShieldCheck size={20} color="var(--green)" />
                <strong style={{ fontSize: '0.98rem' }}>Educational Assessment Only</strong>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.84rem', lineHeight: 1.55 }}>
                This quiz is strictly an educational prevention tool. It is not an addiction diagnosis, medical risk test, or psychological evaluation.
              </p>
            </Card>

            <Card style={{ background: '#f8fafc', borderColor: '#e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <BookOpen size={18} color="var(--green)" />
                <strong style={{ fontSize: '0.92rem' }}>Next Recommended Step</strong>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.5 }}>
                Put your refusal skills to the test in the interactive Pressure Simulator or have a conversation with PeerShield AI.
              </p>
              <div style={{ marginTop: '12px' }}>
                <Button to="/pressure-simulator" variant="solid" size="small">
                  Go to Simulator
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    )
  }

  const isAnswered = selectedAnswer !== null
  const isSelectedCorrect = selectedAnswer === currentQuestion.correctIndex

  return (
    <main className="page feature-page">
      <div className="page-intro">
        <Badge tone="cool">Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</Badge>
        <h1>Peer Pressure & Refusal Quiz</h1>
        <p className="hero-text">
          Test your awareness of social pressure, refusal tactics, and campus wellbeing strategies.
        </p>
      </div>

      <Card className="question-card" style={{ maxWidth: '740px' }}>
        <div className="progress-track">
          <span style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <Badge tone="warm">{currentQuestion.category}</Badge>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Score: {score}</span>
        </div>

        <h2 style={{ fontSize: '1.45rem', lineHeight: 1.35, margin: '14px 0 20px' }}>
          {currentQuestion.question}
        </h2>

        <div className="option-list">
          {currentQuestion.options.map((opt, idx) => {
            let className = 'option-button'
            if (isAnswered) {
              if (idx === currentQuestion.correctIndex) {
                className += ' selected'
              } else if (idx === selectedAnswer) {
                className += ' selected'
              }
            }

            return (
              <button
                key={opt}
                type="button"
                className={className}
                onClick={() => handleSelectOption(idx)}
                style={{
                  borderColor:
                    isAnswered && idx === currentQuestion.correctIndex
                      ? 'var(--green)'
                      : isAnswered && idx === selectedAnswer
                      ? 'var(--coral)'
                      : undefined,
                  background:
                    isAnswered && idx === currentQuestion.correctIndex
                      ? '#ecfdf5'
                      : isAnswered && idx === selectedAnswer
                      ? '#fff1f2'
                      : undefined
                }}
              >
                <span style={{ flex: 1, paddingRight: '12px' }}>{opt}</span>
                {isAnswered && idx === currentQuestion.correctIndex && (
                  <CheckCircle2 size={18} color="var(--green)" style={{ flexShrink: 0 }} />
                )}
                {isAnswered && idx === selectedAnswer && idx !== currentQuestion.correctIndex && (
                  <XCircle size={18} color="#e11d48" style={{ flexShrink: 0 }} />
                )}
              </button>
            )
          })}
        </div>

        {/* Explanation Card */}
        {isAnswered && (
          <div
            style={{
              marginTop: '24px',
              padding: '18px',
              background: isSelectedCorrect ? '#f0fdf4' : '#fff7ed',
              border: `1px solid ${isSelectedCorrect ? '#bbf7d0' : '#fed7aa'}`,
              borderRadius: '6px'
            }}
          >
            <strong style={{ color: isSelectedCorrect ? '#166534' : '#9a3412', fontSize: '0.95rem' }}>
              {isSelectedCorrect ? '✓ Correct!' : '✦ Insight:'}
            </strong>
            <p style={{ color: 'var(--ink)', fontSize: '0.88rem', lineHeight: 1.55, margin: '8px 0 16px' }}>
              {currentQuestion.explanation}
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleNext} icon={<ArrowRight size={16} />}>
                {currentStep < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Results'}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </main>
  )
}
