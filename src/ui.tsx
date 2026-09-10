import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type ButtonProps = {
  children: ReactNode
  to?: string
  variant?: 'solid' | 'quiet' | 'outline' | 'text'
  size?: 'small' | 'medium'
  icon?: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  style?: CSSProperties
  disabled?: boolean
}

export function Button({ children, to, variant = 'solid', size = 'medium', icon, onClick, type = 'button', style, disabled }: ButtonProps) {
  const className = `button button-${variant} button-${size}`
  const content = <>{children}{icon}</>
  return to ? <Link className={className} to={to} style={style}>{content}</Link> : <button className={className} type={type} onClick={onClick} style={style} disabled={disabled}>{content}</button>
}

export function Badge({ children, tone = 'cool' }: { children: ReactNode; tone?: 'cool' | 'warm' }) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}

export function Card({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return <article className={`card ${className}`} style={style}>{children}</article>
}

export function StatCard({ value, label, style }: { value: string; label: string; style?: CSSProperties }) {
  return <Card className="stat-card" style={style}><strong>{value}</strong><span>{label}</span></Card>
}

export function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div className="section-header"><span>{eyebrow}</span><h2>{title}</h2></div>
}
