import { useNavigate } from 'react-router-dom'
import content from '../data/content.json'
import './WorldMap.css'

export default function WorldMap() {
  const navigate = useNavigate()
  const months = content.months

  return (
    <div className="worldmap page-enter">
      <header className="worldmap-header">
        <h1 className="worldmap-title">Seninle 365 Gün</h1>
        <p className="worldmap-subtitle">Her aya dokun, bir anıyı keşfet</p>
      </header>

      <div className="worldmap-grid">
        {months.map((month) => (
          <button
            key={month.id}
            className="month-card"
            style={{ '--card-color': month.color } as React.CSSProperties}
            onClick={() => navigate(`/month/${month.id}`)}
          >
            <span className="month-emoji">{month.emoji}</span>
            <span className="month-number">Ay {month.id}</span>
            <span className="month-title">{month.title}</span>
            <span className="month-subtitle">{month.subtitle}</span>
          </button>
        ))}
      </div>

      <button
        className="finale-button"
        onClick={() => navigate('/finale')}
      >
        🎉 Büyük Final
      </button>
    </div>
  )
}
