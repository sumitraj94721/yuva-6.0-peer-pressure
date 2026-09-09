import type { LiveSessionState } from '../../types/liveSession'

interface AIOrbProps {
  state: LiveSessionState
  volume: number // 0 to 1
}

export function AIOrb({ state, volume }: AIOrbProps) {
  // Compute scale based on audio volume and state
  const dynamicScale = state === 'speaking' || state === 'listening'
    ? 1 + Math.min(volume * 0.35, 0.4)
    : 1

  return (
    <div className={`ai-orb-container state-${state}`}>
      <div
        className="ai-orb-outer-glow"
        style={{ transform: `scale(${dynamicScale * 1.15})` }}
      />
      <div
        className="ai-orb-core"
        style={{ transform: `scale(${dynamicScale})` }}
      >
        <div className="ai-orb-inner-wave wave-1" />
        <div className="ai-orb-inner-wave wave-2" />
        <div className="ai-orb-inner-wave wave-3" />
      </div>
      <div className="ai-orb-pulse-ring" />
    </div>
  )
}
