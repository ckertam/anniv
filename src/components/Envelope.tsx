import { useState, useEffect } from 'react'
import content from '../data/content.json'
import './Envelope.css'

interface EnvelopeProps {
  onOpen: () => void
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [opening, setOpening] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number; size: number }>>([])

  useEffect(() => {
    const p = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
      size: Math.random() * 4 + 2,
    }))
    setParticles(p)
  }, [])

  const handleClick = () => {
    if (opening) return
    setOpening(true)
    setTimeout(onOpen, 1200)
  }

  return (
    <div className={`envelope-overlay ${opening ? 'fade-out' : ''}`}>
      <div className="envelope-particles">
        {particles.map(p => (
          <span
            key={p.id}
            className="envelope-particle"
            style={{
              left: `${p.x}%`,
              animationDelay: `${p.delay}s`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
          />
        ))}
      </div>

      <div className={`envelope-container ${opening ? 'opening' : ''}`} onClick={handleClick}>
        <div className="envelope-body-wrap">
          <div className="envelope-flap" />
          <div className="envelope-front">
            <div className="envelope-seal">{content.envelope.seal}</div>
            <p className="envelope-label">{content.envelope.label}</p>
            <span className="envelope-tap-hint">dokunarak aç</span>
          </div>
        </div>
      </div>
    </div>
  )
}
