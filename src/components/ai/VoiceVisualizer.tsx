interface VoiceVisualizerProps {
  volume: number // 0 to 1
  isActive: boolean
  colorTone?: 'green' | 'coral' | 'neutral'
}

export function VoiceVisualizer({ volume, isActive, colorTone = 'green' }: VoiceVisualizerProps) {
  const bars = 16

  return (
    <div className={`voice-visualizer tone-${colorTone} ${isActive ? 'active' : 'inactive'}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => {
        // Vary heights around center symmetrically
        const offset = Math.abs(i - bars / 2) / (bars / 2)
        const baseFactor = 1 - offset * 0.35
        const waveFactor = 0.85 + Math.sin(i * 0.7) * 0.25
        const height = isActive
          ? Math.max(12, Math.min(100, Math.round(volume * 90 * baseFactor * waveFactor)))
          : 8

        return (
          <span
            key={i}
            className="visualizer-bar"
            style={{ height: `${height}%` }}
          />
        )
      })}
    </div>
  )
}
