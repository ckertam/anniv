import { useState, useCallback, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import cards, { type CardData } from './cards'
import './CardGame.css'

function MemoryBack({ card }: { card: Extract<CardData, { type: 'memory' }> }) {
  return (
    <>
      <div className="cg-memory-emoji">{card.emoji}</div>
      <div className="cg-memory-title">{card.title}</div>
      <div className="cg-memory-text">{card.text}</div>
      {card.photo && <img src={card.photo} alt="" className="cg-memory-photo" />}
    </>
  )
}

function QuizBack({
  card,
  onCorrect,
}: {
  card: Extract<CardData, { type: 'quiz' }>
  onCorrect: () => void
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const answered = selected !== null

  const handlePick = (i: number) => {
    if (answered) return
    setSelected(i)
    if (i === card.correct) {
      onCorrect()
    }
  }

  return (
    <>
      <div className="cg-quiz-question">{card.question}</div>
      <div className="cg-quiz-options">
        {card.options.map((opt, i) => {
          let cls = 'cg-quiz-option'
          if (answered) {
            if (i === card.correct) cls += ' cg-quiz-option--correct'
            else if (i === selected) cls += ' cg-quiz-option--wrong'
            else cls += ' cg-quiz-option--disabled'
          }
          return (
            <button key={i} className={cls} onClick={() => handlePick(i)}>
              {opt}
            </button>
          )
        })}
      </div>
    </>
  )
}

function QuoteBack({ card }: { card: Extract<CardData, { type: 'quote' }> }) {
  return (
    <>
      <div className="cg-quote-text">{card.text}</div>
      <div className="cg-quote-source">{card.source}</div>
    </>
  )
}

interface ConfettiPiece {
  id: number
  x: number
  y: number
  emoji: string
}

export default function CardGame() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [swiped, setSwiped] = useState(false)
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const confettiId = useRef(0)
  const finished = currentIndex >= cards.length

  const spawnConfetti = useCallback(() => {
    const emojis = ['🎉', '✨', '💫', '⭐', '🌟', '❤️']
    const pieces: ConfettiPiece[] = []
    for (let i = 0; i < 12; i++) {
      pieces.push({
        id: confettiId.current++,
        x: 30 + Math.random() * 40,
        y: 20 + Math.random() * 30,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      })
    }
    setConfetti(prev => [...prev, ...pieces])
    setTimeout(() => {
      setConfetti(prev => prev.filter(p => !pieces.includes(p)))
    }, 1600)
  }, [])

  const handleFlip = useCallback(() => {
    if (flipped || swiped) return
    setFlipped(true)
  }, [flipped, swiped])

  const handleSwipe = useCallback(() => {
    if (!flipped || swiped) return
    setSwiped(true)
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1)
      setFlipped(false)
      setSwiped(false)
    }, 500)
  }, [flipped, swiped])

  const handleQuizCorrect = useCallback(() => {
    spawnConfetti()
  }, [spawnConfetti])

  // Ambient particles
  const particles = useRef(
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 12}s`,
      size: 2 + Math.random() * 4,
    })),
  )

  // Keyboard: space to flip, right arrow to swipe
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') handleFlip()
      if (e.key === 'ArrowRight') handleSwipe()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleFlip, handleSwipe])

  const card = cards[currentIndex] as CardData | undefined

  return (
    <div className="cg-container">
      {/* Ambient particles */}
      {particles.current.map(p => (
        <div
          key={p.id}
          className="cg-particle"
          style={{
            left: p.left,
            animationDelay: p.delay,
            width: p.size,
            height: p.size,
          }}
        />
      ))}

      <button className="cg-back" onClick={() => navigate('/')}>←</button>

      {!finished && (
        <div className="cg-progress">
          {currentIndex + 1} / {cards.length}
        </div>
      )}

      {finished ? (
        <div className="cg-finish">
          <div className="cg-finish-emoji">💕</div>
          <div className="cg-finish-title">Bitti!</div>
          <div className="cg-finish-text">
            Tüm kartları gördün. Her biri bizim hikayemizden bir parça. 🤍
          </div>
          <button className="cg-finish-btn" onClick={() => navigate('/')}>
            Ana Sayfaya Dön
          </button>
        </div>
      ) : card ? (
        <>
          <div className="cg-stack">
            {/* Ghost cards behind for depth effect */}
            {currentIndex + 2 < cards.length && (
              <div
                className="cg-card-wrapper"
                style={{ transform: 'scale(0.9) translateY(16px)', opacity: 0.2 }}
              >
                <div className="cg-card cg-card-front" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div className="cg-card-front-icon">🃏</div>
                </div>
              </div>
            )}
            {currentIndex + 1 < cards.length && (
              <div
                className="cg-card-wrapper"
                style={{ transform: 'scale(0.95) translateY(8px)', opacity: 0.35 }}
              >
                <div className="cg-card cg-card-front" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="cg-card-front-icon">🃏</div>
                </div>
              </div>
            )}

            {/* Current card */}
            <div
              className={`cg-card-wrapper ${flipped ? 'cg-card-wrapper--flipped' : ''} ${swiped ? 'cg-card-wrapper--swiped' : ''}`}
            >
              {/* Front */}
              <div
                className="cg-card cg-card-front"
                onClick={handleFlip}
                style={{
                  background: `linear-gradient(135deg, ${card.color}33, ${card.color}11)`,
                  borderColor: `${card.color}44`,
                }}
              >
                <div className="cg-card-front-icon">
                  {card.type === 'memory' ? card.emoji : card.type === 'quiz' ? '❓' : '💬'}
                </div>
                <div className="cg-card-front-label">
                  {card.type === 'memory' ? 'Anı' : card.type === 'quiz' ? 'Soru' : 'Söz'}
                </div>
              </div>

              {/* Back */}
              <div
                className="cg-card cg-card-back"
                onClick={handleSwipe}
                style={{
                  background: `linear-gradient(160deg, ${card.color}dd, ${card.color}88)`,
                }}
              >
                {card.type === 'memory' && <MemoryBack card={card} />}
                {card.type === 'quiz' && <QuizBack card={card} onCorrect={handleQuizCorrect} />}
                {card.type === 'quote' && <QuoteBack card={card} />}
              </div>
            </div>
          </div>

          <div className="cg-swipe-hint">
            {!flipped ? 'Kartı çevirmek için dokun' : 'Sonraki kart için tekrar dokun'}
          </div>
        </>
      ) : null}

      {/* Confetti */}
      {confetti.map(c => (
        <div
          key={c.id}
          className="cg-confetti"
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
        >
          {c.emoji}
        </div>
      ))}
    </div>
  )
}
