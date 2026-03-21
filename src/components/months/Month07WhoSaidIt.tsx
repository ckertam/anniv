import { useCallback, useEffect, useMemo, useState } from 'react'
import MonthLayout from '../MonthLayout'
import contentData from '../../data/content.json'
import './Month07WhoSaidIt.css'

type AnswerKey = 'name1' | 'name2'

type WhoStatement = {
  text: string
  answer: AnswerKey
  photo: string
  reaction: string
}

type WhoSaidItMonth = {
  id: number
  title: string
  subtitle: string
  type: 'whosaidit'
  emoji: string
  color: string
  whoSaidIt: {
    statements: WhoStatement[]
    endMessage: string
  }
}

function isWhoSaidItMonth(m: (typeof contentData.months)[number]): m is WhoSaidItMonth {
  return m.type === 'whosaidit' && 'whoSaidIt' in m && Array.isArray((m as WhoSaidItMonth).whoSaidIt?.statements)
}

const base = import.meta.env.BASE_URL

function ConfettiBurst({ active }: { active: boolean }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        id: i,
        left: `${8 + (i * 2.1) % 84}%`,
        delay: `${(i % 8) * 40}ms`,
        rot: `${(i * 47) % 360}deg`,
        hue: 95 + (i % 40),
      })),
    [],
  )

  if (!active) return null

  return (
    <div className="m07-confetti" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="m07-confetti-piece"
          style={{
            left: p.left,
            animationDelay: p.delay,
            ['--m07-rot' as string]: p.rot,
            ['--m07-hue' as string]: `${p.hue}`,
          }}
        />
      ))}
    </div>
  )
}

function StatementPhoto({ photo, emoji }: { photo: string; emoji: string }) {
  const [failed, setFailed] = useState(false)
  const src = `${base}photos/${photo}`

  if (failed) {
    return (
      <div className="m07-photo m07-photo--placeholder" aria-hidden>
        <span>{emoji}</span>
      </div>
    )
  }

  return <img className="m07-photo" src={src} alt="" loading="lazy" onError={() => setFailed(true)} />
}

export default function Month07WhoSaidIt() {
  const month = contentData.months.find(isWhoSaidItMonth)
  const name1 = contentData.couple.name1
  const name2 = contentData.couple.name2

  const statements = month?.whoSaidIt.statements ?? []
  const endMessage = month?.whoSaidIt.endMessage ?? ''
  const total = statements.length

  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [phase, setPhase] = useState<'pick' | 'result'>('pick')
  const [wrongToast, setWrongToast] = useState(false)
  const [redFlash, setRedFlash] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [pendingWrong, setPendingWrong] = useState(false)

  const statement = total > 0 ? statements[Math.min(index, total - 1)] : null

  useEffect(() => {
    if (!showConfetti) return
    const t = window.setTimeout(() => setShowConfetti(false), 2200)
    return () => window.clearTimeout(t)
  }, [showConfetti])

  const pick = useCallback(
    (choice: AnswerKey) => {
      if (!statement || phase !== 'pick' || pendingWrong) return
      const correct = statement.answer === choice
      if (correct) {
        setShowConfetti(true)
        setScore((s) => s + 1)
        setPhase('result')
        return
      }
      setPendingWrong(true)
      setWrongToast(true)
      setRedFlash(true)
      window.setTimeout(() => setRedFlash(false), 380)
      window.setTimeout(() => {
        setWrongToast(false)
        setPendingWrong(false)
        setPhase('result')
      }, 1100)
    },
    [statement, phase, pendingWrong],
  )

  const next = useCallback(() => {
    if (phase !== 'result') return
    if (index >= total - 1) {
      setIndex(total)
    } else {
      setIndex((i) => i + 1)
      setPhase('pick')
    }
  }, [phase, index, total])

  const restart = useCallback(() => {
    setIndex(0)
    setScore(0)
    setPhase('pick')
    setWrongToast(false)
    setRedFlash(false)
    setShowConfetti(false)
    setPendingWrong(false)
  }, [])

  if (!month || total === 0) {
    return (
      <MonthLayout emoji="🗣️" title="Bu Kim Dedi?" subtitle="" color="var(--cream)">
        <p className="m07-empty">İçerik bulunamadı.</p>
      </MonthLayout>
    )
  }

  const finished = index >= total

  return (
    <MonthLayout emoji={month.emoji} title={month.title} subtitle={month.subtitle} color={month.color}>
      <div className={`m07${redFlash ? ' m07--flash-wrong' : ''}`}>
        <ConfettiBurst active={showConfetti} />

        {wrongToast ? (
          <div className="m07-toast" role="status">
            Yanlış! 😄
          </div>
        ) : null}

        {!finished ? (
          <>
            <div className="m07-score" aria-live="polite">
              <span className="m07-score-val">{score}</span>
              <span className="m07-score-sep"> / </span>
              <span className="m07-score-max">{total}</span>
              <span className="m07-score-label"> doğru</span>
            </div>

            <div className="m07-stage">
              <div className="m07-bubble-wrap">
                <div className="m07-bubble-tail" aria-hidden />
                <div className="m07-bubble">
                  <p className="m07-bubble-text">{statement?.text}</p>
                </div>
              </div>

              {phase === 'result' && statement ? (
                <div className="m07-reveal m07-reveal--enter">
                  <StatementPhoto photo={statement.photo} emoji={month.emoji} />
                  <p className="m07-reaction">{statement.reaction}</p>
                  <button type="button" className="m07-next" onClick={next}>
                    Sonraki →
                  </button>
                </div>
              ) : (
                <div className="m07-choices">
                  <button
                    type="button"
                    className="m07-choice m07-choice--a"
                    disabled={pendingWrong}
                    onClick={() => pick('name1')}
                  >
                    {name1}
                  </button>
                  <button
                    type="button"
                    className="m07-choice m07-choice--b"
                    disabled={pendingWrong}
                    onClick={() => pick('name2')}
                  >
                    {name2}
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="m07-end">
            <p className="m07-end-score">
              Skor: <strong>{score}</strong> / {total}
            </p>
            <p className="m07-end-msg">{endMessage}</p>
            <div className="m07-strip" role="list">
              {statements.map((s) => (
                <div key={`${s.text}-${s.photo}`} className="m07-strip-item" role="listitem">
                  <StatementPhoto photo={s.photo} emoji={month.emoji} />
                </div>
              ))}
            </div>
            <button type="button" className="m07-replay" onClick={restart}>
              Tekrar oyna
            </button>
          </div>
        )}
      </div>
    </MonthLayout>
  )
}
