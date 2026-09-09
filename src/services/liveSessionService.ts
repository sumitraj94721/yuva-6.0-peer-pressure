import type { LiveSessionState, TranscriptMessage } from '../types/liveSession'
import { getGeminiApiKey } from './aiService'

export interface LiveSessionCallbacks {
  onStateChange: (state: LiveSessionState) => void
  onTranscript: (message: TranscriptMessage) => void
  onVolumeChange: (inputVol: number, outputVol: number) => void
  onError: (errorMessage: string) => void
  onSessionEnded: () => void
}

export class LiveSessionManager {
  private state: LiveSessionState = 'idle'
  private callbacks: LiveSessionCallbacks
  private ws: WebSocket | null = null
  private mediaStream: MediaStream | null = null
  private audioContext: AudioContext | null = null
  private analyser: AnalyserNode | null = null
  private scriptProcessor: ScriptProcessorNode | null = null
  private isMuted: boolean = false
  private animFrameId: number | null = null
  private isDemoMode: boolean = false

  // Web Speech Fallback properties
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private speechRecognition: any = null
  private activeAudioSource: AudioBufferSourceNode | null = null

  constructor(callbacks: LiveSessionCallbacks) {
    this.callbacks = callbacks
  }

  public getState(): LiveSessionState {
    return this.state
  }

  public isDemo(): boolean {
    return this.isDemoMode
  }

  private setState(newState: LiveSessionState) {
    this.state = newState
    this.callbacks.onStateChange(newState)
  }

  public async startSession(): Promise<void> {
    if (this.state !== 'idle' && this.state !== 'ended' && this.state !== 'error') {
      return
    }

    this.setState('connecting')

    // 1. Request Microphone Access
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
          sampleRate: 16000
        }
      })
    } catch (err: unknown) {
      const error = err as { name?: string; message?: string }
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        this.setState('error')
        this.callbacks.onError(
          'Microphone access is needed for Live Session. You can still use text chat.'
        )
      } else {
        this.setState('error')
        this.callbacks.onError('Microphone is unavailable or unsupported in this browser.')
      }
      return
    }

    // 2. Setup Web Audio Analyser for volume visualization
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.audioContext = new AudioContextClass()
      const source = this.audioContext.createMediaStreamSource(this.mediaStream)
      this.analyser = this.audioContext.createAnalyser()
      this.analyser.fftSize = 256
      source.connect(this.analyser)
      this.startVolumeMonitoring()
    } catch (err) {
      console.warn('AudioContext setup warning:', err)
    }

    // 3. Connect to Gemini Live or Demo Fallback
    const apiKey = getGeminiApiKey()
    if (!apiKey) {
      this.initDemoMode()
      return
    }

    try {
      this.connectWebSocket(apiKey)
    } catch (err) {
      console.warn('WebSocket connection error, activating Demo Live mode:', err)
      this.initDemoMode()
    }
  }

  private connectWebSocket(apiKey: string) {
    const url = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${apiKey}`
    this.ws = new WebSocket(url)

    const connectionTimeout = window.setTimeout(() => {
      if (this.ws && this.ws.readyState !== WebSocket.OPEN) {
        console.warn('Live WebSocket connection timed out. Falling back to Demo mode.')
        this.ws.close()
        this.initDemoMode()
      }
    }, 4500)

    this.ws.onopen = () => {
      window.clearTimeout(connectionTimeout)
      this.setState('connected')
      this.sendInitialSetup()
      this.startAudioStreaming()
      this.setState('listening')
    }

    this.ws.onmessage = (event) => {
      this.handleServerMessage(event.data)
    }

    this.ws.onerror = (err) => {
      console.warn('Gemini Live WebSocket error, switching to Demo Voice mode.', err)
      window.clearTimeout(connectionTimeout)
      if (this.state === 'connecting') {
        this.initDemoMode()
      } else {
        this.setState('error')
        this.callbacks.onError('Live session connection interrupted. Demo AI is ready.')
      }
    }

    this.ws.onclose = () => {
      if (this.state !== 'ended' && this.state !== 'error') {
        if (this.state === 'connecting') {
          this.initDemoMode()
        } else {
          this.setState('ended')
        }
      }
    }
  }

  private sendInitialSetup() {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return

    const setupMsg = {
      setup: {
        model: 'models/gemini-2.0-flash-exp',
        generationConfig: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: 'Puck'
              }
            }
          }
        },
        systemInstruction: {
          parts: [
            {
              text: 'You are PeerShield AI, a conversational, supportive, empathetic prevention companion for college students in a real-time live voice session. Keep spoken responses brief, natural (1-3 sentences), and supportive. Help with peer pressure, refusal strategies, and stress. If immediate emergency arises, advise calling 112 in India.'
            }
          ]
        }
      }
    }
    this.ws.send(JSON.stringify(setupMsg))
  }

  private startAudioStreaming() {
    if (!this.audioContext || !this.mediaStream) return

    try {
      this.scriptProcessor = this.audioContext.createScriptProcessor(4096, 1, 1)
      const source = this.audioContext.createMediaStreamSource(this.mediaStream)
      source.connect(this.scriptProcessor)
      this.scriptProcessor.connect(this.audioContext.destination)

      this.scriptProcessor.onaudioprocess = (e) => {
        if (this.isMuted || !this.ws || this.ws.readyState !== WebSocket.OPEN) return

        const inputData = e.inputBuffer.getChannelData(0)
        const pcm16 = this.floatTo16BitPCM(inputData)
        const base64Audio = this.arrayBufferToBase64(pcm16)

        const clientChunk = {
          realtimeInput: {
            mediaChunks: [
              {
                mimeType: 'audio/pcm;rate=16000',
                data: base64Audio
              }
            ]
          }
        }
        this.ws.send(JSON.stringify(clientChunk))
      }
    } catch (err) {
      console.warn('Error starting audio processor:', err)
    }
  }

  private handleServerMessage(data: unknown) {
    if (typeof data !== 'string') return

    try {
      const response = JSON.parse(data)

      // Server interrupted signal (user barged in)
      if (response.serverContent?.interrupted) {
        this.stopCurrentPlayback()
        this.setState('listening')
        return
      }

      const parts = response.serverContent?.modelTurn?.parts
      if (parts && Array.isArray(parts)) {
        for (const part of parts) {
          if (part.text) {
            this.callbacks.onTranscript({
              id: `ai-${Date.now()}`,
              role: 'assistant',
              text: part.text,
              isFinal: true,
              timestamp: Date.now()
            })
          }
          if (part.inlineData && part.inlineData.data) {
            this.setState('speaking')
            this.playPcmAudio(part.inlineData.data)
          }
        }
      }

      if (response.serverContent?.turnComplete) {
        this.setState('listening')
      }
    } catch (e) {
      console.warn('Failed to parse Gemini Live message:', e)
    }
  }

  private playPcmAudio(base64Pcm: string) {
    if (!this.audioContext) return

    try {
      const binary = atob(base64Pcm)
      const len = binary.length
      const bytes = new Uint8Array(len)
      for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i)
      }

      const int16Array = new Int16Array(bytes.buffer)
      const float32Array = new Float32Array(int16Array.length)
      for (let i = 0; i < int16Array.length; i++) {
        float32Array[i] = int16Array[i] / 32768.0
      }

      const audioBuffer = this.audioContext.createBuffer(1, float32Array.length, 24000)
      audioBuffer.getChannelData(0).set(float32Array)

      const source = this.audioContext.createBufferSource()
      source.buffer = audioBuffer
      source.connect(this.audioContext.destination)
      this.activeAudioSource = source

      source.onended = () => {
        if (this.state === 'speaking') {
          this.setState('listening')
        }
      }

      source.start()
    } catch (err) {
      console.warn('Error playing live audio chunk:', err)
      this.setState('listening')
    }
  }

  private stopCurrentPlayback() {
    if (this.activeAudioSource) {
      try {
        this.activeAudioSource.stop()
      } catch {
        // Source might already have ended
      }
      this.activeAudioSource = null
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }

  /**
   * High-fidelity Demo Mode:
   * Uses Web Speech API (if supported) or simulated conversational loop
   */
  private initDemoMode() {
    this.isDemoMode = true
    this.setState('connected')
    window.setTimeout(() => {
      this.setState('listening')
    }, 400)

    // Initial greeting in Demo mode
    window.setTimeout(() => {
      this.handleDemoAIResponse('Hello! I am PeerShield AI. What kind of pressure or situation is on your mind today?')
    }, 800)

    // Setup speech recognition if available
    const SpeechRecognitionClass =
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).webkitSpeechRecognition

    if (SpeechRecognitionClass) {
      try {
        this.speechRecognition = new SpeechRecognitionClass()
        this.speechRecognition.continuous = true
        this.speechRecognition.interimResults = false
        this.speechRecognition.lang = 'en-IN'

        this.speechRecognition.onresult = (event: any) => {
          if (this.isMuted) return
          const current = event.resultIndex
          const transcript = event.results[current][0].transcript
          if (transcript.trim()) {
            this.stopCurrentPlayback()
            this.callbacks.onTranscript({
              id: `user-${Date.now()}`,
              role: 'user',
              text: transcript.trim(),
              isFinal: true,
              timestamp: Date.now()
            })
            this.setState('thinking')
            window.setTimeout(() => {
              this.respondToUserSpeech(transcript.trim())
            }, 600)
          }
        }

        this.speechRecognition.onerror = () => {
          // Keep listening even on occasional speech recognition warnings
        }

        this.speechRecognition.start()
      } catch (err) {
        console.warn('Web Speech Recognition initialization notice:', err)
      }
    }
  }

  private respondToUserSpeech(userText: string) {
    const lower = userText.toLowerCase()
    let reply = "I hear you. You don't have to carry that pressure alone. What feels like the safest next step for you?"

    if (lower.includes('no') || lower.includes('refuse') || lower.includes('say')) {
      reply = "A quick, calm refusal like 'I'm good, thanks' protects your space without sparking a debate. Want to practice saying it?"
    } else if (lower.includes('stress') || lower.includes('exam') || lower.includes('tired')) {
      reply = "Exam pressure is really tough. Remember you can step out for some water or do our 60-second breathing reset anytime."
    } else if (lower.includes('friend') || lower.includes('push') || lower.includes('drinking')) {
      reply = "When friends push, suggest a different activity or link up with someone who respects your boundaries."
    } else if (lower.includes('hindi') || lower.includes('yaar') || lower.includes('kya')) {
      reply = "Haan yaar, main sun raha hoon. Doston ke beech 'no' kehna mushkil ho sakta hai, par tumhara comfort sabse pehle hai."
    }

    this.handleDemoAIResponse(reply)
  }

  private handleDemoAIResponse(text: string) {
    this.setState('speaking')
    this.callbacks.onTranscript({
      id: `ai-${Date.now()}`,
      role: 'assistant',
      text,
      isFinal: true,
      timestamp: Date.now()
    })

    const hasSpeech = typeof window !== 'undefined' && 'speechSynthesis' in window && Boolean(window.speechSynthesis)
    if (hasSpeech) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1.0
      utterance.pitch = 1.0
      utterance.onend = () => {
        if (this.state === 'speaking') {
          this.setState('listening')
        }
      }
      utterance.onerror = () => {
        if (this.state === 'speaking') {
          this.setState('listening')
        }
      }
      window.speechSynthesis.speak(utterance)
    } else {
      // Fallback timer if speech synthesis is not supported
      const duration = Math.min(Math.max(text.length * 55, 1800), 5000)
      setTimeout(() => {
        if (this.state === 'speaking') {
          this.setState('listening')
        }
      }, duration)
    }
  }

  public triggerDemoPrompt(promptText: string) {
    this.stopCurrentPlayback()
    this.callbacks.onTranscript({
      id: `user-${Date.now()}`,
      role: 'user',
      text: promptText,
      isFinal: true,
      timestamp: Date.now()
    })
    this.setState('thinking')
    window.setTimeout(() => {
      this.respondToUserSpeech(promptText)
    }, 600)
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted
    if (this.mediaStream) {
      this.mediaStream.getAudioTracks().forEach((track) => {
        track.enabled = !this.isMuted
      })
    }
    if (this.isMuted) {
      this.setState('muted')
    } else {
      this.setState('listening')
    }
    return this.isMuted
  }

  public interruptAI() {
    this.stopCurrentPlayback()
    this.setState('listening')
  }

  public endSession() {
    this.cleanup()
    this.setState('ended')
    this.callbacks.onSessionEnded()
  }

  private startVolumeMonitoring() {
    if (!this.analyser) return

    const bufferLength = this.analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const update = () => {
      if (this.state === 'ended') return

      if (this.analyser) {
        this.analyser.getByteFrequencyData(dataArray)
        let sum = 0
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i]
        }
        const avg = sum / bufferLength
        const normalized = Math.min(avg / 128.0, 1.0)
        const inputVol = this.isMuted ? 0 : normalized
        const outputVol = this.state === 'speaking' ? 0.75 + Math.random() * 0.25 : 0

        this.callbacks.onVolumeChange(inputVol, outputVol)

        // Barge-in check: if user speaks loud enough while AI is speaking
        if (this.state === 'speaking' && inputVol > 0.45) {
          this.interruptAI()
        }
      }

      this.animFrameId = requestAnimationFrame(update)
    }

    this.animFrameId = requestAnimationFrame(update)
  }

  private cleanup() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId)
      this.animFrameId = null
    }

    this.stopCurrentPlayback()

    if (this.speechRecognition) {
      try {
        this.speechRecognition.stop()
      } catch {
        // Recognition might already have stopped
      }
      this.speechRecognition = null
    }

    if (this.scriptProcessor) {
      try {
        this.scriptProcessor.disconnect()
      } catch {}
      this.scriptProcessor = null
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => {
        track.stop()
      })
      this.mediaStream = null
    }

    if (this.ws) {
      try {
        this.ws.close()
      } catch {}
      this.ws = null
    }

    if (this.audioContext && this.audioContext.state !== 'closed') {
      try {
        this.audioContext.close()
      } catch {}
      this.audioContext = null
    }
  }

  // Audio encoding helpers
  private floatTo16BitPCM(input: Float32Array): ArrayBuffer {
    const output = new Int16Array(input.length)
    for (let i = 0; i < input.length; i++) {
      const s = Math.max(-1, Math.min(1, input[i]))
      output[i] = s < 0 ? s * 0x8000 : s * 0x7fff
    }
    return output.buffer
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = ''
    const bytes = new Uint8Array(buffer)
    const len = bytes.byteLength
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return btoa(binary)
  }
}
