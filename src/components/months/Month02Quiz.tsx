import { useCallback, useState } from 'react'
import MonthLayout from '../MonthLayout'
import content from '../../data/content.json'
import './Month02Quiz.css'

type QuizQ = {
  question: string
  options: string[]
  correct: number
  funFact: string
}

type QuizMonth = (typeof content.months)[1] & {
  type: 'quiz'
  quiz: { questions: QuizQ[] }
}

function isQuizMonth(m: (typeof content.months)[number]): m is QuizMonth {
  return m.type === 'quiz' && 'quiz' in m && Array.isArray(m.quiz?.questions)
}

export default function Month02Quiz() {
  const month = content.months[1]
  const [step, setStep] = useState(0)
  const [score, setScore] = useState(0)
  const [shake, setShake] = useState(false)
  const [flash, setFlash] = useState<'correct' | null>(null)
  const [funFact, setFunFact] = useState<string | null>(null)
  const [finished, setFinished] = useState(false)

  const valid = month != null && isQuizMonth(month)
  const questions = valid ? month.quiz.questions : []
  const total = questions.length
  const q = total > 0 ? questions[Math.min(step, total - 1)] : null

  const progress = total > 0 ? ((finished ? total : step) / total) * 100 : 0

  const pick = useCallback(
    (optionIndex: number) => {
      if (!q || funFact || finished) return
      if (optionIndex === q.correct) {
        setFlash('correct')
        setFunFact(q.funFact)
        setScore((s) => s + 1)
      } else {
        setShake(true)
        window.setTimeout(() => setShake(false), 520)
      }
    },
    [q, funFact, finished],
  )

  const advance = useCallback(() => {
    if (!funFact) return
    setFunFact(null)
    setFlash(null)
    if (step >= total - 1) {
      setFinished(true)
    } else {
      setStep((s) => s + 1)
    }
  }, [funFact, step, total])

  const restart = useCallback(() => {
    setStep(0)
    setScore(0)
    setShake(false)
    setFlash(null)
    setFunFact(null)
    setFinished(false)
  }, [])

  if (!valid || !month) {
    return (
      <MonthLayout emoji="🧠" title="Quiz" subtitle="" color="#e6eaf5">
        <p className="month02-empty">Quiz içeriği bulunamadı.</p>
      </MonthLayout>
    )
  }

  if (total === 0) {
    return (
      <MonthLayout
        emoji={month.emoji}
        title={month.title}
        subtitle={month.subtitle}
        color={month.color}
      >
        <p className="month02-empty">Henüz soru eklenmemiş.</p>
      </MonthLayout>
    )
  }

  return (
    <MonthLayout
      emoji={month.emoji}
      title={month.title}
      subtitle={month.subtitle}
      color={month.color}
    >
      <div className="month02">
        <div className="month02-hud">
          <div className="month02-score">
            <span className="month02-score-label">Puan</span>
            <span className="month02-score-val">{score}</span>
            <span className="month02-score-max">/ {total}</span>
          </div>
          <div className="month02-progress" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
            <div className="month02-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {!finished ? (
          <div
            className={`month02-card${shake ? ' month02-card--shake' : ''}${flash === 'correct' ? ' month02-card--flash-ok' : ''}`}
          >
            <p className="month02-q-index">
              Soru {step + 1} / {total}
            </p>
            <h2 className="month02-question">{q?.question}</h2>
            <div className="month02-options">
              {q?.options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  className="month02-opt"
                  onClick={() => pick(i)}
                  disabled={!!funFact}
                >
                  <span className="month02-opt-key">{String.fromCharCode(65 + i)}</span>
                  <span className="month02-opt-text">{opt}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="month02-final">
            <div className="month02-final-emoji" aria-hidden>
              {score === total ? '🏆' : score >= total * 0.6 ? '💕' : '🌟'}
            </div>
            <h2 className="month02-final-title">Tebrikler!</h2>
            <p className="month02-final-score">
              Skorun: <strong>{score}</strong> / {total}
            </p>
            <p className="month02-final-msg">
              {score === total
                ? 'Her şeyi biliyorsun — sen harikasın!'
                : 'Birlikte daha çok anı biriktirelim.'}
            </p>
            <button type="button" className="month02-restart" onClick={restart}>
              Tekrar oyna
            </button>
          </div>
        )}

        {funFact ? (
          <div className="month02-overlay" role="dialog" aria-modal="true" aria-labelledby="month02-funfact-title">
            <div className="month02-modal">
              <p id="month02-funfact-title" className="month02-modal-title">
                ✨ Fun fact
              </p>
              <p className="month02-modal-body">{funFact}</p>
              <button type="button" className="month02-modal-btn" onClick={advance}>
                Devam
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </MonthLayout>
  )
}
