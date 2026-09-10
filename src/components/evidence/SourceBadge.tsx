/**
 * SourceBadge — renders a clearly labelled source attribution badge.
 * Used on every Government of India baseline statistic.
 * NEVER merge with PeerShield 2025 source labels.
 */

interface SourceBadgeProps {
  type?: 'government' | 'peershield'
}

export function SourceBadge({ type = 'government' }: SourceBadgeProps) {
  if (type === 'peershield') {
    return (
      <div className="source-badge source-badge-ps">
        <span className="source-badge-dot" />
        <div>
          <div className="source-badge-title">PeerShield 2025 Survey / Local Dataset</div>
        </div>
      </div>
    )
  }

  return (
    <div className="source-badge source-badge-gov">
      <span className="source-badge-dot" />
      <div>
        <div className="source-badge-title">
          MoSJE / NDDTC-AIIMS · Magnitude of Substance Use in India, 2019
        </div>
        <div className="source-badge-sub">
          Survey: December 2017 – October 2018 &nbsp;|&nbsp; Estimates: 2018 population
        </div>
      </div>
    </div>
  )
}
