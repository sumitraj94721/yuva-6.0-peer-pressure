import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type ButtonProps = {
  children: ReactNode
  to?: string
  variant?: 'solid' | 'quiet' | 'outline' | 'text'
  size?: 'small' | 'medium'
  icon?: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
}

export function Button({ children, to, variant = 'solid', size = 'medium', icon, onClick, type = 'button' }: ButtonProps) {
  const className = `button button-${variant} button-${size}`
  const content = <>{children}{icon}</>
  return to ? <Link className={className} to={to}>{content}</Link> : <button className={className} type={type} onClick={onClick}>{content}</button>
}

export function Badge({ children, tone = 'cool' }: { children: ReactNode; tone?: 'cool' | 'warm' }) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <article className={`card ${className}`}>{children}</article>
}

export function StatCard({ value, label }: { value: string; label: string }) {
  return <Card className="stat-card"><strong>{value}</strong><span>{label}</span></Card>
}

export function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div className="section-header"><span>{eyebrow}</span><h2>{title}</h2></div>
}
