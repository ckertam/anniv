import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import contentData from '../../data/content.json'
import './Finale.css'

const COLORS = ['#800020', '#c9a96e', '#a3324a', '#5c0018', '#e8d4a8', '#2c2226', '#f5e6ea']

function youtubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.slice(1)
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
    if (u.hostname.includes('youtube.com')) {
      const id = u.searchParams.get('v')
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
  } catch {
    /* ignore */
  }
  return null
}

export default function Finale() {
  const navigate = useNavigate()
  const { finale } = contentData
  const confettiRef = useRef<HTMLDivElement>(null)
  const [typedLen, setTypedLen] = useState(0)

  useEffect(() => {
    if (typedLen >= finale.message.length) return
    const t = window.setTimeout(() => setTypedLen((n) => n + 1), 38)
    return () => window.clearTimeout(t)
  }, [typedLen, finale.message])

  useEffect(() => {
    if (!finale.confetti || !confettiRef.current) return
    const root = confettiRef.current
    const frag = document.createDocumentFragment()
    const n = 48
    for (let i = 0; i < n; i++) {
      const el = document.createElement('span')
      el.className = 'finale-confetti__piece'
      el.style.setProperty('--c', COLORS[i % COLORS.length])
      el.style.left = `${Math.random() * 100}%`
      el.style.animationDelay = `${Math.random() * 3.5}s`
      el.style.animationDuration = `${2.8 + Math.random() * 2.2}s`
      el.style.setProperty('--drift', `${(Math.random() - 0.5) * 80}px`)
      el.style.setProperty('--rot', `${Math.random() * 720}deg`)
      frag.appendChild(el)
    }
    root.appendChild(frag)
    return () => {
      root.replaceChildren()
    }
  }, [finale.confetti])

  const embed = finale.video ? youtubeEmbedUrl(finale.video) : null

  return (
    <div className="finale">
      {finale.confetti && (
        <div className="finale-confetti" ref={confettiRef} aria-hidden />
      )}

      <div className="finale-hearts" aria-hidden>
        {Array.from({ length: 14 }, (_, i) => (
          <span
            key={i}
            className="finale-heart"
            style={{ '--d': `${i * 0.12}s` } as CSSProperties}
          />
        ))}
      </div>

      <div className="finale-inner">
        <h1 className="finale-title">{finale.title}</h1>

        <p className="finale-typewriter" aria-live="polite">
          {finale.message.slice(0, typedLen)}
          {typedLen < finale.message.length && <span className="finale-caret">|</span>}
        </p>

        {finale.video && embed && (
          <div className="finale-video">
            <iframe
              title="Finale video"
              src={embed}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {finale.video && !embed && (
          <p className="finale-video-fallback">
            <a href={finale.video} target="_blank" rel="noreferrer">
              Videoyu aç
            </a>
          </p>
        )}

        <p className="finale-love">Seni çok seviyorum 🤍</p>

        <button type="button" className="finale-map-btn" onClick={() => navigate('/')}>
          Haritaya dön
        </button>
      </div>
    </div>
  )
}
