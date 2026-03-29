import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import scenes, { type HotspotData } from './scenes'
import './HiddenGame.css'

export default function HiddenGame() {
  const navigate = useNavigate()
  const [sceneIndex, setSceneIndex] = useState(0)
  const [foundIds, setFoundIds] = useState<Set<string>>(new Set())
  const [activeCard, setActiveCard] = useState<HotspotData | null>(null)
  const [showIntro, setShowIntro] = useState(true)
  const [introExiting, setIntroExiting] = useState(false)
  const [finished, setFinished] = useState(false)

  const scene = scenes[sceneIndex]

  const dismissIntro = useCallback(() => {
    setIntroExiting(true)
    setTimeout(() => {
      setShowIntro(false)
      setIntroExiting(false)
    }, 500)
  }, [])

  const handleHotspotClick = useCallback((hotspot: HotspotData) => {
    if (foundIds.has(hotspot.id)) return
    setFoundIds(prev => {
      const next = new Set(prev)
      next.add(hotspot.id)
      return next
    })
    setActiveCard(hotspot)
  }, [foundIds])

  const handleCloseCard = useCallback(() => {
    setActiveCard(null)
  }, [])

  const allFound = scene ? foundIds.size >= scene.hotspots.length : false

  const handleNext = useCallback(() => {
    const nextIndex = sceneIndex + 1
    if (nextIndex >= scenes.length) {
      setFinished(true)
    } else {
      setSceneIndex(nextIndex)
      setFoundIds(new Set())
      setActiveCard(null)
      setShowIntro(true)
    }
  }, [sceneIndex])

  if (!scene) return null

  if (finished) {
    return (
      <div className="hg-container">
        <div className="hg-finish" style={{ background: scene.bgGradient }}>
          <div className="hg-finish-emoji">🎉</div>
          <div className="hg-finish-title">Tebrikler!</div>
          <div className="hg-finish-text">
            12 ayın tüm anılarını keşfettin. Her biri bizim hikayemizin bir parçası. 🤍
          </div>
          <button className="hg-finish-btn" onClick={() => navigate('/')}>
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="hg-container">
      <div className="hg-scene" style={{ background: scene.bgGradient }}>
        <div className="hg-scene-inner">
          {/* Floating decorations */}
          {scene.decorEmojis.map((emoji, i) => (
            <div
              key={`${scene.month}-decor-${i}`}
              className="hg-decor"
              style={{
                left: `${15 + i * 22}%`,
                top: `${10 + (i % 3) * 25}%`,
                animationDelay: `${i * 1.5}s`,
                fontSize: `${1.5 + (i % 2) * 0.8}rem`,
              }}
            >
              {emoji}
            </div>
          ))}

          {/* Hotspots */}
          {scene.hotspots.map(hotspot => (
            <div
              key={hotspot.id}
              className={`hg-hotspot ${foundIds.has(hotspot.id) ? 'hg-hotspot--found' : ''}`}
              style={{ left: hotspot.x, top: hotspot.y }}
              onClick={() => handleHotspotClick(hotspot)}
            >
              <div className="hg-hotspot-ring" />
              <div className="hg-hotspot-emoji">{hotspot.emoji}</div>
            </div>
          ))}
        </div>

        {/* HUD */}
        <div className="hg-hud">
          <div className="hg-hud-left">
            <span className="hg-hud-month">Ay {scene.month}</span>
            <span className="hg-hud-city">{scene.city}</span>
          </div>
          <div className="hg-hud-progress">
            {scene.hotspots.map(h => (
              <div
                key={h.id}
                className={`hg-hud-dot ${foundIds.has(h.id) ? 'hg-hud-dot--found' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Back */}
        <button className="hg-back" onClick={() => navigate('/')}>←</button>

        {/* Next button when all found */}
        {allFound && !activeCard && (
          <button className="hg-next" onClick={handleNext}>
            {sceneIndex < scenes.length - 1 ? 'Sonraki Ay →' : 'Bitir 🎉'}
          </button>
        )}
      </div>

      {/* Intro overlay */}
      {showIntro && (
        <div
          className={`hg-intro ${introExiting ? 'hg-intro--exit' : ''}`}
          style={{ background: scene.bgGradient }}
          onClick={dismissIntro}
        >
          <div className="hg-intro-emoji">{scene.decorEmojis[0]}</div>
          <div className="hg-intro-month">Ay {scene.month}</div>
          <div className="hg-intro-title">{scene.title}</div>
          <div className="hg-intro-city">{scene.city}</div>
        </div>
      )}

      {/* Story card */}
      {activeCard && (
        <div className="hg-overlay" onClick={handleCloseCard}>
          <div className="hg-overlay-bg" />
          <div className="hg-card" onClick={e => e.stopPropagation()}>
            <div className="hg-card-emoji">{activeCard.emoji}</div>
            <div className="hg-card-title">{activeCard.title}</div>
            {activeCard.photo && (
              <img src={activeCard.photo} alt="" className="hg-card-photo" />
            )}
            <div className="hg-card-text">{activeCard.text}</div>
            <button className="hg-card-close" onClick={handleCloseCard}>
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
