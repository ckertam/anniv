import { useCallback, useState } from 'react'
import type { CSSProperties } from 'react'
import MonthLayout from '../MonthLayout'
import content from '../../data/content.json'
import './Month07Memory.css'

type MemoryMonth = (typeof content.months)[6]

type GameCard = {
  cardId: string
  pairId: string
  label: string
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j]!, a[i]!]
  }
  return a
}

function pairHue(pairId: string): number {
  let h = 0
  for (let i = 0; i < pairId.length; i++) h = (h * 31 + pairId.charCodeAt(i)) % 360
  return h
}

export default function Month07Memory() {
  const month = content.months[6] as MemoryMonth
  if (month.type !== 'memory' || !month.memory) return null

  const { emoji, title, subtitle, color, memory } = month
  const { pairs, winMessage } = memory

  const [deck] = useState<GameCard[]>(() => {
    const d: GameCard[] = []
    pairs.forEach((p) => {
      d.push(
        { cardId: `${p.id}-a`, pairId: p.id, label: p.label },
        { cardId: `${p.id}-b`, pairId: p.id, label: p.label }
      )
    })
    return shuffle(d)
  })
  const [flipped, setFlipped] = useState<string[]>([])
  const [matched, setMatched] = useState<Set<string>>(() => new Set())
  const [moves, setMoves] = useState(0)
  const [lock, setLock] = useState(false)

  const won = matched.size === pairs.length

  const onCardClick = useCallback(
    (card: GameCard) => {
      if (won || lock || matched.has(card.pairId) || flipped.includes(card.cardId)) return
      if (flipped.length === 0) {
        setFlipped([card.cardId])
        return
      }
      if (flipped.length === 1) {
        const firstId = flipped[0]!
        const first = deck.find((c) => c.cardId === firstId)
        if (!first || first.cardId === card.cardId) return

        setFlipped([firstId, card.cardId])
        setMoves((m) => m + 1)
        setLock(true)

        if (first.pairId === card.pairId) {
          window.setTimeout(() => {
            setMatched((prev) => new Set(prev).add(card.pairId))
            setFlipped([])
            setLock(false)
          }, 520)
        } else {
          window.setTimeout(() => {
            setFlipped([])
            setLock(false)
          }, 900)
        }
      }
    },
    [deck, flipped, lock, matched, won, pairs.length]
  )

  return (
    <MonthLayout emoji={emoji} title={title} subtitle={subtitle} color={color}>
      <div className="month07">
        <div className="month07-hud">
          <span className="month07-moves">
            Hamle: <strong>{moves}</strong>
          </span>
          <span className="month07-pairs">
            Eşleşme:{' '}
            <strong>
              {matched.size}/{pairs.length}
            </strong>
          </span>
        </div>

        <div className="month07-grid" role="grid" aria-label="Hafıza kartları">
          {deck.map((card) => {
            const isFlipped = flipped.includes(card.cardId) || matched.has(card.pairId)
            const hue = pairHue(card.pairId)
            return (
              <button
                key={card.cardId}
                type="button"
                className={`month07-card ${isFlipped ? 'month07-card--flipped' : ''} ${matched.has(card.pairId) ? 'month07-card--matched' : ''}`}
                onClick={() => onCardClick(card)}
                disabled={won || lock || matched.has(card.pairId)}
                aria-pressed={isFlipped}
              >
                <span className="month07-card-inner">
                  <span className="month07-card-face month07-card-back" aria-hidden>
                    <span className="month07-card-pattern" />
                    <span className="month07-card-mark">♥</span>
                  </span>
                  <span
                    className="month07-card-face month07-card-front"
                    style={{ '--pair-hue': String(hue) } as CSSProperties}
                  >
                    <span className="month07-card-label">{card.label}</span>
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {won && (
          <div className="month07-win" role="status">
            <div className="month07-win-sparkles" aria-hidden>
              ✨ 💕 ✨
            </div>
            <p className="month07-win-text">{winMessage}</p>
          </div>
        )}
      </div>
    </MonthLayout>
  )
}
