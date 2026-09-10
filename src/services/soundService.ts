/**
 * Native Web Audio Ambient Sound Generator
 * Generates soothing ambient soundscapes locally without external copyrighted audio files or remote URLs.
 */
export type AmbientPreset = 'calm-waves' | 'binaural-drone' | 'gentle-rain'

class AmbientSoundManager {
  private ctx: AudioContext | null = null
  private gainNode: GainNode | null = null
  private isRunning = false
  private currentVolume = 0.4
  private timer: number | null = null
  private activePreset: AmbientPreset = 'calm-waves'

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new AudioCtx()
      this.gainNode = this.ctx.createGain()
      this.gainNode.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime)
      this.gainNode.connect(this.ctx.destination)
    }
  }

  public play(preset: AmbientPreset = 'calm-waves'): boolean {
    try {
      this.initContext()
      if (!this.ctx || !this.gainNode) return false

      if (this.ctx.state === 'suspended') {
        this.ctx.resume()
      }

      this.stop()
      this.activePreset = preset
      this.isRunning = true

      if (preset === 'binaural-drone') {
        this.startBinauralDrone()
      } else if (preset === 'gentle-rain') {
        this.startGentleRain()
      } else {
        this.startCalmWaves()
      }

      return true
    } catch (err) {
      console.warn('Web Audio playback error:', err)
      return false
    }
  }

  private startBinauralDrone() {
    if (!this.ctx || !this.gainNode) return
    // Harmonic pleasant sine tones at 216Hz and 222Hz (gentle calming alpha beat)
    const osc1 = this.ctx.createOscillator()
    const osc2 = this.ctx.createOscillator()
    const filter = this.ctx.createBiquadFilter()

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(400, this.ctx.currentTime)

    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(216, this.ctx.currentTime)

    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(222, this.ctx.currentTime)

    osc1.connect(filter)
    osc2.connect(filter)
    filter.connect(this.gainNode)

    osc1.start()
    osc2.start()

    this.timer = window.setInterval(() => {
      if (!this.ctx || !this.gainNode) return
      // subtle lfo modulation
      const t = this.ctx.currentTime
      filter.frequency.setValueAtTime(350 + Math.sin(t * 0.3) * 60, t)
    }, 200)
  }

  private startCalmWaves() {
    if (!this.ctx || !this.gainNode) return
    // Soft noise buffer filtered to mimic ocean waves
    const bufferSize = this.ctx.sampleRate * 2
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const whiteNoise = this.ctx.createBufferSource()
    whiteNoise.buffer = buffer
    whiteNoise.loop = true

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(300, this.ctx.currentTime)
    filter.Q.setValueAtTime(1.5, this.ctx.currentTime)

    whiteNoise.connect(filter)
    filter.connect(this.gainNode)
    whiteNoise.start()

    // Wave ebb and flow
    let phase = 0
    this.timer = window.setInterval(() => {
      if (!this.ctx) return
      phase += 0.05
      const freq = 250 + Math.sin(phase) * 180
      filter.frequency.setTargetAtTime(Math.max(80, freq), this.ctx.currentTime, 0.1)
    }, 100)
  }

  private startGentleRain() {
    if (!this.ctx || !this.gainNode) return
    const bufferSize = this.ctx.sampleRate * 2
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3
    }

    const noise = this.ctx.createBufferSource()
    noise.buffer = buffer
    noise.loop = true

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(800, this.ctx.currentTime)

    noise.connect(filter)
    filter.connect(this.gainNode)
    noise.start()
  }

  public stop(): void {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
    if (this.ctx && this.ctx.state !== 'closed') {
      try {
        this.ctx.close()
      } catch {}
      this.ctx = null
      this.gainNode = null
    }
    this.isRunning = false
  }

  public setVolume(vol: number): void {
    this.currentVolume = Math.max(0, Math.min(1, vol))
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime)
    }
  }

  public getVolume(): number {
    return this.currentVolume
  }

  public getIsPlaying(): boolean {
    return this.isRunning
  }

  public getPreset(): AmbientPreset {
    return this.activePreset
  }
}

export const soundManager = new AmbientSoundManager()
