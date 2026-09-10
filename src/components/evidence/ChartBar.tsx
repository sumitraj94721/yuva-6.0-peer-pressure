export interface BarItem {
  label: string
  value: number | null
  maxValue?: number
  sublabel?: string
  color?: string
  displayValue?: string
  badge?: string
}

interface ChartBarProps {
  items: BarItem[]
  unit?: string
  title?: string
  subtitle?: string
  maxScale?: number
}

export function HorizontalBarChart({
  items,
  unit = '%',
  title,
  subtitle,
  maxScale,
}: ChartBarProps) {
  // Find highest valid value to scale bars accurately if not provided
  const numericValues = items.map((i) => (typeof i.value === 'number' ? i.value : 0))
  const calculatedMax = Math.max(...numericValues, 1)
  const max = maxScale || calculatedMax

  return (
    <div className="bar-chart-container">
      {title && <h3 className="bar-chart-title">{title}</h3>}
      {subtitle && <p className="bar-chart-subtitle">{subtitle}</p>}
      <div className="bar-chart-list">
        {items.map((item, idx) => {
          const isUndetectable = item.value === null
          const pctWidth = isUndetectable ? 0 : Math.min(100, Math.max(2, ((item.value || 0) / max) * 100))

          return (
            <div key={idx} className="bar-chart-row">
              <div className="bar-chart-label-group">
                <span className="bar-chart-label">{item.label}</span>
                {item.sublabel && <span className="bar-chart-sublabel">{item.sublabel}</span>}
              </div>
              <div className="bar-chart-track">
                <div
                  className="bar-chart-fill"
                  style={{
                    width: `${pctWidth}%`,
                    backgroundColor: item.color || 'var(--green)',
                  }}
                />
              </div>
              <div className="bar-chart-value">
                {isUndetectable ? (
                  <span className="undetectable-tag">Undetectable / --</span>
                ) : (
                  <span>
                    {item.displayValue ?? `${item.value}${unit}`}
                  </span>
                )}
                {item.badge && <span className="bar-item-badge">{item.badge}</span>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
