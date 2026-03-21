import { useMemo, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import MonthLayout from '../MonthLayout'
import contentData from '../../data/content.json'
import './Month12Escape.css'

type Puzzle = {
  type: string
  question: string
  answer: string
  hint: string
}

type EscapeMonth = {
  id: number
  type: 'escape'
  title: string
  subtitle: string
  emoji: string
  color: string
  escape: {
    intro: string
    puzzles: Puzzle[]
    finalMessage: string
  }
}

function isEscapeMonth(m: (typeof contentData.months)[number]): m is EscapeMonth {
  return m.type === 'escape' && 'escape' in m
}

function normalizeAnswer(input: string, puzzle: Puzzle): string {
  const t = input.trim()
  if (puzzle.type === 'date') {
    return t.replace(/\//g, '.').replace(/\s/g, '').toLowerCase()
  }
  if (puzzle.type === 'number') {
    return t.replace(/\s/g, '')
  }
  return t.toLowerCase()
}

function normalizeCorrect(puzzle: Puzzle): string {
  const t = puzzle.answer.trim()
  if (puzzle.type === 'date') {
    return t.replace(/\//g, '.').replace(/\s/g, '').toLowerCase()
  }
  if (puzzle.type === 'number') {
    return t.replace(/\s/g, '')
  }
  return t.toLowerCase()
}

function answersMatch(input: string, puzzle: Puzzle): boolean {
  const u = normalizeAnswer(input, puzzle)
  const c = normalizeCorrect(puzzle)
  if (puzzle.type === 'number') {
    return u === c || u === String(parseInt(c, 10))
  }
  return u === c
}

export default function Month12Escape() {
  const month = contentData.months.find(isEscapeMonth)
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const [value, setValue] = useState('')
  const [hintOpen, setHintOpen] = useState(false)
  const [shake, setShake] = useState(false)
  const [done, setDone] = useState(false)

  const escape = month?.escape
  const puzzles = escape?.puzzles ?? []
  const current = puzzles[index]
  const allSolved = done

  const progress = useMemo(() => {
    if (!puzzles.length) return 0
    return ((index + (allSolved ? 1 : 0)) / puzzles.length) * 100
  }, [puzzles.length, index, allSolved])

  if (!month) return null

  const { emoji, title, subtitle, color } = month

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!current || allSolved) return
    if (answersMatch(value, current)) {
      setHintOpen(false)
      setValue('')
      if (index + 1 >= puzzles.length) {
        setDone(true)
      } else {
        setIndex((i) => i + 1)
      }
    } else {
      setShake(true)
      window.setTimeout(() => setShake(false), 550)
    }
  }

  return (
    <MonthLayout emoji={emoji} title={title} subtitle={subtitle} color={color}>
      <div className="escape-page">
        <div className="escape-progress" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
          <div className="escape-progress__fill" style={{ width: `${progress}%` }} />
        </div>

        {escape?.intro && !allSolved && index === 0 && !value && (
          <p className="escape-intro">{escape.intro}</p>
        )}

        {!allSolved && current && (
          <form className={`escape-card ${shake ? 'escape-card--shake' : ''}`} onSubmit={submit}>
            <p className="escape-step">
              Bulmaca {index + 1} / {puzzles.length}
            </p>
            <h2 className="escape-question">{current.question}</h2>

            <label className="escape-label" htmlFor="escape-answer">
              Cevabın
            </label>
            <input
              id="escape-answer"
              className="escape-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoComplete="off"
              placeholder="..."
            />

            <div className="escape-actions">
              <button type="button" className="escape-btn escape-btn--ghost" onClick={() => setHintOpen((h) => !h)}>
                İpucu
              </button>
              <button type="submit" className="escape-btn escape-btn--primary">
                Kontrol et
              </button>
            </div>

            {hintOpen && <p className="escape-hint">{current.hint}</p>}
          </form>
        )}

        {allSolved && (
          <div className="escape-win">
            <div className="escape-win__glow" aria-hidden />
            <p className="escape-win__badge">✓ Tamamlandı</p>
            <h2 className="escape-win__title">Kutlar!</h2>
            <p className="escape-win__msg">{escape?.finalMessage}</p>
            <button type="button" className="escape-btn escape-btn--gold" onClick={() => navigate('/finale')}>
              Büyük finale →
            </button>
          </div>
        )}
      </div>
    </MonthLayout>
  )
}
