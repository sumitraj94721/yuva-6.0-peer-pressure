import type { QuizQuestion, QuizResult } from '../types/models'
import { addProgress, getProgress } from '../storage'

const STORAGE_KEY = 'peershield_quiz_history'

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'Refusal Skills',
    question: 'Your friends pressure you to try something you don’t want to try at an evening party. What is the healthiest, most effective response?',
    options: [
      'Give in just this once so they stop bothering you.',
      'Clearly say no with a relaxed boundary and suggest another activity or grab a soft drink.',
      'Lie and make up an elaborate excuse that you have a rare medical emergency.',
      'Disappear without saying anything and feel guilty about it later.'
    ],
    correctIndex: 1,
    explanation: 'A short, clear boundary without over-explaining ("I’m good, thanks! Grabbing a soda") leaves no room for debate while keeping your confidence intact.'
  },
  {
    id: 2,
    category: 'Recognizing Pressure',
    question: 'What is an example of "indirect" or "unspoken" peer pressure on college campuses?',
    options: [
      'Someone physically handing you a drink and demanding you drink it immediately.',
      'Feeling like you have to participate because "everyone" in the dorm or social group seems to be doing it, even if no one asked you directly.',
      'A professor announcing test dates in class.',
      'A hostel warden posting a safety notice on the bulletin board.'
    ],
    correctIndex: 1,
    explanation: 'Perceived norms—believing "everybody is doing it"—create strong indirect pressure. In reality, research consistently shows a majority of students prefer healthier boundaries.'
  },
  {
    id: 3,
    category: 'Healthy Coping',
    question: 'During intense exam weeks, you feel overwhelmed and someone offers you an unprescribed stimulant or substance to "stay focused". What is the safest course of action?',
    options: [
      'Take it just during finals to survive the sleepless night.',
      'Decline firmly, take a 15-minute screen break, hydrate, and try a 60-second breathing or study block method.',
      'Share it with your roommate to see how they react first.',
      'Double the dose because final exams determine your whole life.'
    ],
    correctIndex: 1,
    explanation: 'Unprescribed substances carry severe cardiovascular, psychological, and academic dependency risks. Micro-breaks, sleep hygiene, and pacing protect your long-term focus.'
  },
  {
    id: 4,
    category: 'Bystander Support',
    question: 'You notice a first-year student being pressured and mocked by seniors in the corridor for refusing alcohol. How can you be a supportive peer ally?',
    options: [
      'Join in the laughter so you don’t become the next target.',
      'Interrupt neutrally by asking the student to help you find a textbook or step out with you, giving them an easy exit.',
      'Record a video and post it onto campus gossip channels.',
      'Ignore it because it is traditional initiation.'
    ],
    correctIndex: 1,
    explanation: 'Creating a low-friction distraction ("Hey, can you come help me grab those notes?") allows the student to step away safely without escalating conflict.'
  },
  {
    id: 5,
    category: 'Campus Safety',
    question: 'If you encounter an unlit campus boundary where illegal substance trade is actively occurring, what is the safest next step?',
    options: [
      'Confront the sellers yourself to prove courage.',
      'Quietly walk back to a well-lit public route and later file an anonymous complaint through PeerShield.',
      'Hang around to see who from your class is there.',
      'Keep it completely secret and avoid the area forever without signaling anyone.'
    ],
    correctIndex: 1,
    explanation: 'Never endanger yourself. Walking to safety and logging an anonymous campus hazard signal enables security and maintenance to address the root issue.'
  }
]

export function getQuizHistory(): QuizResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as QuizResult[]) : []
  } catch {
    return []
  }
}

export function saveQuizResult(score: number, total: number): QuizResult {
  const history = getQuizHistory()
  const result: QuizResult = {
    score,
    total,
    completedAt: new Date().toISOString()
  }
  const updated = [result, ...history]
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch (err) {
    console.error('Failed to save quiz result:', err)
  }
  addProgress({
    quizzesCompleted: (getProgress().quizzesCompleted || 0) + 1
  })
  return result
}
