import type { AIMessage } from '../types/ai'

const SYSTEM_INSTRUCTION = `You are PeerShield AI, a warm, supportive, evidence-informed prevention companion for college students.
Your goal is to help students navigate peer pressure, practice refusing substances or uncomfortable situations, cope with exam or social stress, deal with FOMO, build confidence, and discover healthy alternatives.

Core Rules:
1. You are NOT a doctor, therapist, psychiatrist, diagnostic system, or emergency service. Never diagnose, score substance use, or offer medical treatment.
2. If the user indicates immediate danger, self-harm, medical emergency, or severe crisis, immediately urge them to contact emergency services: "If you are in immediate danger, please contact emergency services now. In India, you can call 112."
3. NEVER provide instructions, tips, or advice on: obtaining drugs/alcohol, hiding substance use, using illegal substances, mixing substances, or evading detection or disciplinary action. Redirect immediately to safety, calm boundaries, trusted support, and healthy alternatives.
4. Language handling: Support English, Hindi, and Hinglish. Naturally match the language and conversational vibe of the student.
5. Tone: Non-judgmental, empowering, empathetic, calm, and concise (typically 2-4 sentences per response). Never shame the student.
6. Practice mode: If asked to practice or roleplay, act realistically as a peer offering pressure gently or directly, but allow the user to try refusal lines and then give gentle, actionable feedback.`

export interface SendMessageOptions {
  messages: AIMessage[]
  practiceMode?: boolean
  scenarioContext?: string
}

export interface AIResponseResult {
  content: string
  isDemo: boolean
  feedback?: {
    confidenceDelta?: number
    category?: string
    suggestedResponse?: string
  }
}

export function getGeminiApiKey(): string {
  return (import.meta.env.VITE_GEMINI_API_KEY as string | undefined)?.trim() || ''
}

export function isGeminiConfigured(): boolean {
  return getGeminiApiKey().length > 0
}

/**
 * Intelligent Demo AI fallback responding in English, Hindi, and Hinglish.
 */
function getDemoAIResponse(userText: string, practiceMode?: boolean): AIResponseResult {
  const lower = userText.toLowerCase()

  // Emergency triggers
  if (lower.includes('suicide') || lower.includes('kill') || lower.includes('emergency') || lower.includes('overdose') || lower.includes('danger')) {
    return {
      content: 'If you are in immediate danger or facing a medical crisis, please reach out for emergency help right away. In India, you can call 112 immediately. PeerShield cannot dispatch emergency services, but your safety is the absolute priority.',
      isDemo: true,
      feedback: { category: 'Emergency Assistance', confidenceDelta: 0 }
    }
  }

  // Safety filter triggers (substance acquisition / evasion)
  if (lower.includes('where to buy') || lower.includes('hide drug') || lower.includes('pass drug test') || lower.includes('fake id') || lower.includes('smuggle')) {
    return {
      content: 'PeerShield AI is dedicated to student safety and healthy choices. I cannot help with obtaining, concealing, or using substances. If you are feeling pressured right now, let’s talk about a safe way out or a healthy alternative.',
      isDemo: true,
      feedback: { category: 'Safety Guardrail', confidenceDelta: 0 }
    }
  }

  // Practice mode roleplay
  if (practiceMode) {
    const isStrongRefusal = lower.includes('no') || lower.includes('nah') || lower.includes('not interested') || lower.includes('don\'t want') || lower.includes('pass') || lower.includes('nahi') || lower.includes('man nahi')
    if (isStrongRefusal) {
      return {
        content: 'That was a solid, direct boundary! You kept it brief and left no room for debate. A great follow-up is to suggest an alternative activity or walk over to other friends.',
        isDemo: true,
        feedback: {
          confidenceDelta: 10,
          category: 'Direct Refusal',
          suggestedResponse: '“I’m good, thanks. I’m grabbing some water, come with if you want.”'
        }
      }
    }
    return {
      content: 'That is an honest start. When friends push, staying too apologetic might invite them to keep insisting. Try using a firm, relaxed "No thanks, I\'m good" without over-explaining.',
      isDemo: true,
      feedback: {
        confidenceDelta: 5,
        category: 'Refusal Coaching',
        suggestedResponse: '“No thanks, I’m sticking with soda tonight.”'
      }
    }
  }

  // Hindi / Hinglish detection
  if (lower.includes('hindi') || lower.includes('kaise') || lower.includes('yaar') || lower.includes('bhai') || lower.includes('kya') || lower.includes('nahi') || lower.includes('dost')) {
    if (lower.includes('say no') || lower.includes('mana') || lower.includes('pressure')) {
      return {
        content: 'Haan bilkul! Dost kitna bhi bole, tum seedha bol sakte ho: "Nahi yaar, mera mood nahi hai, main soda le raha hoon." Apne boundary ko short aur clear rakho, bina kisi guilt ke.',
        isDemo: true,
        feedback: { category: 'Hinglish Refusal Advice', confidenceDelta: 8 }
      }
    }
    return {
      content: 'Main yahan hoon tumhari baat sunne ke liye. College mein peer pressure ya exam stress hona aam baat hai. Batao, abhi kya chal raha hai tumhare dimaag mein?',
      isDemo: true
    }
  }

  // Common user intentions
  if (lower.includes('pressure') || lower.includes('pressured')) {
    return {
      content: 'Feeling pressured can feel heavy and isolating, but you are not alone. Remember: you never owe anyone an elaborate excuse to protect your comfort. Would you like to practice a quick refusal script together?',
      isDemo: true
    }
  }

  if (lower.includes('say no') || lower.includes('saying no') || lower.includes('refuse')) {
    return {
      content: 'The most effective refusal is the "Broken Record" technique: simple, polite, and repeated once if pushed. For example: "No thanks, I’m good." You don’t need to justify your boundary.',
      isDemo: true,
      feedback: {
        suggestedResponse: '“Thanks, but I’m good with what I have.”',
        confidenceDelta: 6
      }
    }
  }

  if (lower.includes('fitting in') || lower.includes('fit in') || lower.includes('fomo') || lower.includes('left out')) {
    return {
      content: 'FOMO makes it feel like everyone is participating, but campus surveys consistently show most students respect someone who owns their choices. Real friends respect boundaries rather than testing them.',
      isDemo: true
    }
  }

  if (lower.includes('exam') || lower.includes('stressed') || lower.includes('stress') || lower.includes('anxious')) {
    return {
      content: 'Exam periods amplify pressure when everyone is looking for quick ways to numb stress. A 10-minute walk, cold water, or our Calm Zone 60-second breathing reset can give your nervous system a genuine break.',
      isDemo: true
    }
  }

  if (lower.includes('alternative') || lower.includes('healthy')) {
    return {
      content: 'Great alternatives include suggesting a gaming break, stepping outside for tea or coffee, organizing a group study session, or checking out low-pressure campus clubs like sports or arts.',
      isDemo: true
    }
  }

  // Default supportive response
  return {
    content: 'I hear you. College life brings lots of unwritten expectations, but you have the right to set the pace that feels right for you. How would you like to handle this situation?',
    isDemo: true
  }
}

/**
 * Send chat message to Gemini API or graceful Demo fallback.
 */
export async function sendAIMessage(options: SendMessageOptions): Promise<AIResponseResult> {
  const { messages, practiceMode, scenarioContext } = options
  const apiKey = getGeminiApiKey()

  const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content || ''

  if (!apiKey) {
    // Artificial small delay to feel conversational
    await new Promise(r => setTimeout(r, 450))
    return getDemoAIResponse(lastUserMessage, practiceMode)
  }

  try {
    const geminiContents = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }))

    const contextPrefix = scenarioContext ? `[Context: ${scenarioContext}]\n` : ''
    const practicePrefix = practiceMode ? `[Roleplay Mode: You are a friendly peer offering a substance or pressure. Stay in character briefly, then evaluate the student's refusal with constructive feedback.]\n` : ''

    const systemText = `${SYSTEM_INSTRUCTION}\n${contextPrefix}${practicePrefix}`

    const requestBody = {
      contents: geminiContents,
      systemInstruction: {
        parts: [{ text: systemText }]
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 350
      }
    }

    // Try Gemini 2.0 Flash first, fallback to 1.5 Flash
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      console.warn(`Gemini API returned status ${response.status}. Activating fallback.`)
      return getDemoAIResponse(lastUserMessage, practiceMode)
    }

    const data = await response.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) {
      return getDemoAIResponse(lastUserMessage, practiceMode)
    }

    return {
      content: text.trim(),
      isDemo: false
    }
  } catch (err) {
    console.warn('Network error reaching Gemini API. Activating Demo AI fallback.', err)
    return getDemoAIResponse(lastUserMessage, practiceMode)
  }
}
