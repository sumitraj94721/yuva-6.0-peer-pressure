import type { SurveyRow } from './analytics'
import { calculateAverageConfidence, calculatePressureRate } from './analytics'

export type Recommendation = { title: string; reason: string; recommendedAction: string; targetAudience: string; priority: 'High' | 'Medium' }

export function generateInterventionRecommendations(rows: SurveyRow[]): Recommendation[] {
  const recommendations: Recommendation[] = []
  if (calculatePressureRate(rows) >= 50 || calculateAverageConfidence(rows) < 55) recommendations.push({ title: 'Run Peer Pressure Simulator workshops', reason: 'Pressure exposure is high or refusal confidence needs practice.', recommendedAction: 'Offer short, scenario-based refusal practice through student groups.', targetAudience: 'Students reporting frequent pressure', priority: 'High' })
  if (rows.filter(row => row.main_reason === 'Stress').length >= Math.max(1, rows.length / 4)) recommendations.push({ title: 'Promote Calm Zone and healthy coping', reason: 'Stress appears as a common reason students may consider unhealthy choices.', recommendedAction: 'Pair exam-period outreach with breathing, movement, and peer support activities.', targetAudience: 'Students navigating exam stress', priority: 'Medium' })
  if (!recommendations.length) recommendations.push({ title: 'Strengthen peer-led prevention', reason: 'The current sample does not show a single dominant pressure signal.', recommendedAction: 'Invite PeerShield Champions to collect more anonymous feedback and host healthy activities.', targetAudience: 'Campus community', priority: 'Medium' })
  return recommendations
}
