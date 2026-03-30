import { useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import scenes, { type DiscoverItem, type QuizData } from './discoverScenes'
import './DiscoverGame.css'

interface ConfettiPiece {
  id: number
  x: number
  y: number
  emoji: string
}

interface Particle {
  id: number
  left: string
  size: number
  delay: string
  duration: string
  type: 'dot' | 'glow'
}

const ANIM_CLASSES = ['dg-anim-bob', 'dg-anim-wobble', 'dg-anim-bounce', 'dg-anim-sway', 'dg-anim-breathe']

function getAnimClass(index: number): string {
  return ANIM_CLASSES[index % ANIM_CLASSES.length]
}

function makeParticles(): Particle[] {
  return Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 3 + Math.random() * 8,
    delay: `${Math.random() * 16}s`,
    duration: `${10 + Math.random() * 12}s`,
    type: i % 4 === 0 ? 'glow' : 'dot',
  }))
}

interface BgDecor {
  id: number
  emoji: string
  left: string
  top: string
  size: string
  delay: string
}

function makeBgDecor(emojis: string[]): BgDecor[] {
  const positions = [
    { left: '8%', top: '15%' },
    { left: '85%', top: '20%' },
    { left: '15%', top: '75%' },
    { left: '80%', top: '80%' },
    { left: '50%', top: '50%' },
    { left: '30%', top: '90%' },
    { left: '70%', top: '10%' },
  ]
  return positions.slice(0, Math.min(6, emojis.length + 3)).map((pos, i) => ({
    id: i,
    emoji: emojis[i % emojis.length],
    left: pos.left,
    top: pos.top,
    size: `${4 + (i % 3) * 1.5}rem`,
    delay: `${i * 0.8}s`,
  }))
}

export default function DiscoverGame() {
  const navigate = useNavigate()
  const [sceneIndex, setSceneIndex] = useState(0)
  const [foundIds, setFoundIds] = useState<Set<string>>(new Set())
  const [showIntro, setShowIntro] = useState(true)
  const [introExiting, setIntroExiting] = useState(false)
  const [finished, setFinished] = useState(false)
  const [shakingId, setShakingId] = useState<string | null>(null)

  const [activeCard, setActiveCard] = useState<DiscoverItem | null>(null)
  const [activeQuiz, setActiveQuiz] = useState<{ item: DiscoverItem; quiz: QuizData } | null>(null)
  const [quizSelected, setQuizSelected] = useState<number | null>(null)

  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const confettiId = useRef(0)

  const particles = useRef(makeParticles())

  const scene = scenes[sceneIndex]
  const bgDecor = useRef(makeBgDecor(scene?.items.filter(i => i.type === 'real').map(i => i.emoji) ?? []))

  const spawnConfetti = useCallback((cx: number, cy: number) => {
    const emojis = ['🎉', '✨', '💫', '⭐', '❤️', '🌟']
    const pieces: ConfettiPiece[] = Array.from({ length: 14 }, () => ({
      id: confettiId.current++,
      x: cx + (Math.random() - 0.5) * 40,
      y: cy + (Math.random() - 0.5) * 25,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }))
    setConfetti(prev => [...prev, ...pieces])
    setTimeout(() => setConfetti(prev => prev.filter(p => !pieces.includes(p))), 1600)
  }, [])

  const dismissIntro = useCallback(() => {
    setIntroExiting(true)
    setTimeout(() => {
      setShowIntro(false)
      setIntroExiting(false)
    }, 400)
  }, [])

  const handleItemClick = useCallback((item: DiscoverItem) => {
    if (foundIds.has(item.id)) return

    if (item.type === 'real' && item.quiz) {
      setActiveQuiz({ item, quiz: item.quiz })
      setQuizSelected(null)
      return
    }

    setFoundIds(prev => {
      const next = new Set(prev)
      next.add(item.id)
      return next
    })

    if (item.type === 'real') {
      spawnConfetti(50, 40)
    } else {
      setShakingId(item.id)
      setTimeout(() => setShakingId(null), 500)
    }

    setActiveCard(item)
  }, [foundIds, spawnConfetti])

  const handleCloseCard = useCallback(() => {
    setActiveCard(null)
  }, [])

  const handleQuizAnswer = useCallback((index: number) => {
    if (quizSelected !== null || !activeQuiz) return
    setQuizSelected(index)

    if (index === activeQuiz.quiz.correct) {
      spawnConfetti(50, 40)
      setTimeout(() => {
        setFoundIds(prev => {
          const next = new Set(prev)
          next.add(activeQuiz.item.id)
          return next
        })
        setActiveQuiz(null)
        setQuizSelected(null)
        setActiveCard(activeQuiz.item)
      }, 800)
    }
  }, [activeQuiz, quizSelected, spawnConfetti])

  const handleQuizRetry = useCallback(() => {
    setQuizSelected(null)
  }, [])

  const realFound = scene
    ? scene.items.filter(i => i.type === 'real' && foundIds.has(i.id)).length
    : 0
  const allFound = scene ? realFound >= scene.requiredFinds : false

  const handleNext = useCallback(() => {
    const next = sceneIndex + 1
    if (next >= scenes.length) {
      setFinished(true)
    } else {
      setSceneIndex(next)
      setFoundIds(new Set())
      setActiveCard(null)
      setActiveQuiz(null)
      setQuizSelected(null)
      setShowIntro(true)
      setShakingId(null)
      particles.current = makeParticles()
      const nextScene = scenes[next]
      if (nextScene) {
        bgDecor.current = makeBgDecor(nextScene.items.filter(i => i.type === 'real').map(i => i.emoji))
      }
    }
  }, [sceneIndex])

  if (!scene) return null

  if (finished) {
    return (
      <div className="dg" style={{ background: 'linear-gradient(135deg, #1a1a3e 0%, #e84393 50%, #6c5ce7 100%)' }}>
        <div className="dg-finish">
          <div className="dg-finish-emoji">🎉</div>
          <div className="dg-finish-title">Tebrikler!</div>
          <div className="dg-finish-text">
            12 ayın tüm gizli anılarını keşfettin! Her biri bizim hikayemizin bir parçası. 🤍
          </div>
          <button className="dg-finish-btn" onClick={() => navigate('/')}>
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="dg">
      <div className="dg-bg" style={{ background: scene.bgGradient }} />

      {/* Big blurred background emojis for atmosphere */}
      {!showIntro && bgDecor.current.map(d => (
        <div
          key={`bg-${d.id}`}
          className="dg-bg-decor"
          style={{
            left: d.left,
            top: d.top,
            fontSize: d.size,
            animationDelay: `${d.delay}, ${parseFloat(d.delay) + 1}s`,
          }}
        >
          {d.emoji}
        </div>
      ))}

      {/* Ambient particles */}
      {particles.current.map(p => (
        <div
          key={p.id}
          className={`dg-particle dg-particle--${p.type}`}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}

      {/* Emoji items with staggered entrance */}
      {!showIntro && scene.items.map((item, idx) => {
        const isFound = foundIds.has(item.id)
        const isShaking = shakingId === item.id
        return (
          <div
            key={item.id}
            className={`dg-item dg-item--${item.type} ${isFound ? 'dg-item--found' : ''} ${isShaking ? 'dg-item--shake' : ''}`}
            style={{
              left: item.x,
              top: item.y,
              animationDelay: `${idx * 0.08}s`,
            }}
            onClick={() => handleItemClick(item)}
          >
            <div className="dg-item-glow" />
            <div className="dg-item-glass" />
            <div className={`dg-item-emoji ${!isFound ? getAnimClass(idx) : ''}`}>
              {item.emoji}
            </div>

            {/* Lock icon for quiz items */}
            {item.type === 'real' && item.quiz && !isFound && (
              <div className="dg-item-lock">🔒</div>
            )}

            {/* Checkmark for found real items */}
            {isFound && item.type === 'real' && (
              <div className="dg-item-check">✅</div>
            )}
          </div>
        )
      })}

      {/* HUD */}
      {!showIntro && (
        <div className="dg-hud">
          <div className="dg-hud-top">
            <div className="dg-hud-left">
              <span className="dg-hud-month">Ay {scene.month}</span>
              <span className="dg-hud-city">{scene.city}</span>
            </div>
            <div className="dg-hud-counter">
              <span className="dg-hud-counter-icon">🔍</span>
              <span>{realFound} / {scene.requiredFinds}</span>
            </div>
          </div>
          <div className="dg-clues">
            {scene.clueWords.map((w, i) => (
              <span key={i} className="dg-clue">{w}</span>
            ))}
          </div>
        </div>
      )}

      {!showIntro && <button className="dg-back" onClick={() => navigate('/')}>←</button>}

      {allFound && !activeCard && !activeQuiz && (
        <button className="dg-next" onClick={handleNext}>
          {sceneIndex < scenes.length - 1 ? 'Sonraki Ay →' : 'Bitir 🎉'}
        </button>
      )}

      {/* Intro */}
      {showIntro && (
        <div
          className={`dg-intro ${introExiting ? 'dg-intro--exit' : ''}`}
          style={{ background: scene.bgGradient }}
          onClick={dismissIntro}
        >
          <div className="dg-intro-month">Ay {scene.month}</div>
          <div className="dg-intro-title">{scene.title}</div>
          <div className="dg-intro-city">{scene.city}</div>
          <div className="dg-intro-clues">
            {scene.clueWords.map((w, i) => (
              <span key={i} className="dg-intro-clue">{w}</span>
            ))}
          </div>
          <div className="dg-intro-hint">Başlamak için dokun</div>
        </div>
      )}

      {/* Card modal */}
      {activeCard && (
        <div className="dg-modal" onClick={handleCloseCard}>
          <div className="dg-modal-bg" />
          <div
            className={`dg-card ${activeCard.type === 'real' ? 'dg-card--real' : 'dg-card--decoy'}`}
            onClick={e => e.stopPropagation()}
          >
            {activeCard.type === 'real' && activeCard.photo && (
              <img src={activeCard.photo} alt="" className="dg-card-photo" />
            )}
            {activeCard.type === 'decoy' && activeCard.decoyPhoto && (
              <img src={activeCard.decoyPhoto} alt="" className="dg-card-photo" />
            )}

            <div className="dg-card-body">
              <div className="dg-card-emoji-row">{activeCard.emoji}</div>
              {activeCard.type === 'real' ? (
                <>
                  <div className="dg-card-title">{activeCard.title}</div>
                  <div className="dg-card-text">{activeCard.text}</div>
                </>
              ) : (
                <>
                  <div className="dg-card-title dg-card-title--decoy">Bulamadın! 😜</div>
                  <div className="dg-card-text">{activeCard.decoyText}</div>
                </>
              )}
              <button className="dg-card-close" onClick={handleCloseCard}>Kapat</button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz modal */}
      {activeQuiz && (
        <div className="dg-modal">
          <div className="dg-modal-bg" />
          <div className="dg-quiz" onClick={e => e.stopPropagation()}>
            <div className="dg-quiz-lock">🔒</div>
            <div className="dg-quiz-label">Bu anıyı açmak için cevapla</div>
            <div className="dg-quiz-question">{activeQuiz.quiz.question}</div>
            <div className="dg-quiz-options">
              {activeQuiz.quiz.options.map((opt, i) => {
                let cls = 'dg-quiz-opt'
                if (quizSelected !== null) {
                  if (i === activeQuiz.quiz.correct) cls += ' dg-quiz-opt--correct'
                  else if (i === quizSelected) cls += ' dg-quiz-opt--wrong'
                  else cls += ' dg-quiz-opt--dim'
                }
                return (
                  <button key={i} className={cls} onClick={() => handleQuizAnswer(i)}>
                    {opt}
                  </button>
                )
              })}
            </div>
            {quizSelected !== null && quizSelected !== activeQuiz.quiz.correct && (
              <button className="dg-quiz-retry" onClick={handleQuizRetry}>
                Tekrar Dene
              </button>
            )}
          </div>
        </div>
      )}

      {/* Confetti */}
      {confetti.map(c => (
        <div key={c.id} className="dg-confetti" style={{ left: `${c.x}%`, top: `${c.y}%` }}>
          {c.emoji}
        </div>
      ))}
    </div>
  )
}
