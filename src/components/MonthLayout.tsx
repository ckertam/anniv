import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import './MonthLayout.css'

interface MonthLayoutProps {
  emoji: string
  title: string
  subtitle: string
  color: string
  children: ReactNode
}

export default function MonthLayout({ emoji, title, subtitle, color, children }: MonthLayoutProps) {
  const navigate = useNavigate()

  return (
    <div className="month-layout page-enter" style={{ '--month-color': color } as React.CSSProperties}>
      <button className="back-button" onClick={() => navigate('/')}>
        ← Geri
      </button>
      <header className="month-header">
        <span className="month-header-emoji">{emoji}</span>
        <h1 className="month-header-title">{title}</h1>
        <p className="month-header-subtitle">{subtitle}</p>
      </header>
      <main className="month-content">
        {children}
      </main>
    </div>
  )
}
