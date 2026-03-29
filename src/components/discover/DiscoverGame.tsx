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
}

function makeParticles(): Particle[] {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 3 + Math.random() * 6,
    delay: `${Math.random() * 16}s`,
    duration: `${12 + Math.random() * 10}s`,
  }))
}

export default function DiscoverGame() {
  const navigate = useNavigate()
  const [sceneIndex, setSceneIndex] = useState(0)
  const [foundIds, setFoundIds] = useState<Set<string>>(new Set())
  const [showIntro, setShowIntro] = useState(true)
  const [introExiting, setIntroExiting] = useState(false)
  const [finished, setFinished] = useState(false)

  // Modal states
  const [activeCard, setActiveCard] = useState<DiscoverItem | null>(null)
  const [activeQuiz, setActiveQuiz] = useState<{ item: DiscoverItem; quiz: QuizData } | null>(null)
  const [quizSelected, setQuizSelected] = useState<number | null>(null)

  // Confetti
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const confettiId = useRef(0)

  const particles = useRef(makeParticles())

  const scene = scenes[sceneIndex]

  const spawnConfetti = useCallback((cx: number, cy: number) => {
    const emojis = ['🎉', '✨', '💫', '⭐', '❤️', '🌟']
    const pieces: ConfettiPiece[] = Array.from({ length: 10 }, () => ({
      id: confettiId.current++,
      x: cx + (Math.random() - 0.5) * 30,
      y: cy + (Math.random() - 0.5) * 20,
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

    if (item.type === 'real' && item.quiz && !foundIds.has(item.id)) {
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
      particles.current = makeParticles()
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
      {/* Background */}
      <div className="dg-bg" style={{ background: scene.bgGradient }} />

      {/* Ambient particles */}
      {particles.current.map(p => (
        <div
          key={p.id}
          className="dg-particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}

      {/* Emoji items */}
      {!showIntro && scene.items.map(item => (
        <div
          key={item.id}
          className={`dg-item dg-item--${item.type} ${foundIds.has(item.id) ? 'dg-item--found' : ''}`}
          style={{ left: item.x, top: item.y }}
          onClick={() => handleItemClick(item)}
        >
          <div className="dg-item-glow" />
          <div className="dg-item-emoji">{item.emoji}</div>
        </div>
      ))}

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

      {/* Back */}
      {!showIntro && <button className="dg-back" onClick={() => navigate('/')}>←</button>}

      {/* Next button */}
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

      {/* Card modal (real or decoy) */}
      {activeCard && (
        <div className="dg-modal" onClick={handleCloseCard}>
          <div className="dg-modal-bg" />
          <div
            className={`dg-card ${activeCard.type === 'real' ? 'dg-card--real' : 'dg-card--decoy'}`}
            onClick={e => e.stopPropagation()}
          >
            {/* Photo */}
            {(activeCard.type === 'real' && activeCard.photo) && (
              <img src={activeCard.photo} alt="" className="dg-card-photo" />
            )}
            {(activeCard.type === 'decoy' && activeCard.decoyPhoto) && (
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

              <button className="dg-card-close" onClick={handleCloseCard}>
                Kapat
              </button>
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
        <div
          key={c.id}
          className="dg-confetti"
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
        >
          {c.emoji}
        </div>
      ))}
    </div>
  )
}
