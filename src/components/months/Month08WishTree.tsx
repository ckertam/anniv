import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import MonthLayout from '../MonthLayout'
import content from '../../data/content.json'
import './Month08WishTree.css'

type WishTreeMonth = (typeof content.months)[7]

/** Stable pseudo-random 0..1 from index + string */
function leafJitter(i: number, seed: string): number {
  let x = i * 7919
  for (let c = 0; c < seed.length; c++) x += seed.charCodeAt(c) * (c + 1)
  const t = Math.sin(x) * 10000
  return t - Math.floor(t)
}

export default function Month08WishTree() {
  const month = content.months[7] as WishTreeMonth
  if (month.type !== 'wishtree' || !month.wishTree) return null

  const { emoji, title, subtitle, color, wishTree } = month
  const { wishes, message } = wishTree

  const [revealed, setRevealed] = useState<Set<number>>(() => new Set())
  const [messageUnlocked, setMessageUnlocked] = useState(false)

  const positions = useMemo(() => {
    return wishes.map((w, i) => {
      const j = leafJitter(i, w)
      const row = Math.floor(i / 3)
      const col = i % 3
      const left = 12 + col * 28 + j * 8
      const top = 18 + row * 14 + (1 - j) * 6
      const rot = -28 + j * 56
      const delay = j * 0.85
      return { left, top, rot, delay }
    })
  }, [wishes])

  useEffect(() => {
    if (revealed.size === wishes.length) setMessageUnlocked(true)
  }, [revealed, wishes.length])

  const toggle = (i: number) => {
    setRevealed((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <MonthLayout emoji={emoji} title={title} subtitle={subtitle} color={color}>
      <div className="month08">
        <div className="month08-scene">
          <svg className="month08-tree-svg" viewBox="0 0 320 280" aria-hidden>
            <defs>
              <linearGradient id="month08-trunk" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4a2818" />
                <stop offset="50%" stopColor="#6b3d28" />
                <stop offset="100%" stopColor="#3d2114" />
              </linearGradient>
              <linearGradient id="month08-canopy" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1f5c3a" />
                <stop offset="100%" stopColor="#0d3d24" />
              </linearGradient>
            </defs>
            <ellipse className="month08-ground" cx="160" cy="262" rx="120" ry="14" />
            <path
              className="month08-trunk"
              d="M148 255 L152 175 L168 175 L172 255 Q160 262 148 255 Z"
              fill="url(#month08-trunk)"
            />
            <path
              className="month08-branch month08-branch--l"
              d="M155 195 Q120 188 88 165"
              fill="none"
              stroke="#5c3d28"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              className="month08-branch month08-branch--r"
              d="M165 188 Q200 175 238 158"
              fill="none"
              stroke="#5c3d28"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              className="month08-branch month08-branch--m"
              d="M160 168 Q160 140 175 118"
              fill="none"
              stroke="#4a3020"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              className="month08-canopy"
              d="M160 28 C95 52 58 118 72 168 C88 210 128 228 160 232 C192 228 232 210 248 168 C262 118 225 52 160 28 Z"
              fill="url(#month08-canopy)"
            />
            <path
              className="month08-canopy-shine"
              d="M160 42 C110 62 82 115 95 155"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>

          <div className="month08-leaves">
            {wishes.map((wish, i) => {
              const p = positions[i]!
              const open = revealed.has(i)
              return (
                <button
                  key={i}
                  type="button"
                  className={`month08-leaf ${open ? 'month08-leaf--open' : ''}`}
                  style={
                    {
                      '--leaf-left': `${p.left}%`,
                      '--leaf-top': `${p.top}%`,
                      '--leaf-rot': `${p.rot}deg`,
                      '--wind-delay': `${p.delay}s`,
                    } as CSSProperties
                  }
                  onClick={() => toggle(i)}
                  aria-expanded={open}
                >
                  <span className="month08-leaf-shape" aria-hidden />
                  <span className="month08-leaf-text">{wish}</span>
                </button>
              )
            })}
          </div>
        </div>

        <p className="month08-hint">Yapraklara dokun — dilekler açılır</p>

        {messageUnlocked && (
          <div className="month08-message" role="status">
            <p>{message}</p>
          </div>
        )}
      </div>
    </MonthLayout>
  )
}
