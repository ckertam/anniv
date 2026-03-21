import { useCallback, useMemo, useState } from 'react'
import MonthLayout from '../MonthLayout'
import contentData from '../../data/content.json'
import './Month04CouplesQuiz.css'

type CouplesQuizQuestion = {
  question: string
  about: string
  options: string[]
  correct: number
  photo: string
  reaction: string
}

type CouplesQuizMonth = {
  id: number
  title: string
  subtitle: string
  type: 'couples_quiz'
  emoji: string
  color: string
  couplesQuiz: {
    questions: CouplesQuizQuestion[]
    endMessage: string
  }
}

function isCouplesQuizMonth(m: (typeof contentData.months)[number]): m is CouplesQuizMonth {
  return m.type === 'couples_quiz' && 'couplesQuiz' in m && Array.isArray((m as CouplesQuizMonth).couplesQuiz?.questions)
}

function aboutBadge(about: string, name1: string, name2: string): string {
  if (about === 'ben') return `${name1} hakkında`
  if (about === 'o') return `${name2} hakkında`
  if (about === 'biz') return 'İkiniz hakkında'
  return 'Hakkında'
}

function photoSrc(path: string): string {
  return `${import.meta.env.BASE_URL}photos/${path}`
}

export default function Month04CouplesQuiz() {
  const month = contentData.months.find(isCouplesQuizMonth)
  const name1 = contentData.couple?.name1 ?? 'Sen'
  const name2 = contentData.couple?.name2 ?? 'O'

  const [step, setStep] = useState(0)
  const [phase, setPhase] = useState<'question' | 'revealed'>('question')
  const [wrongIndex, setWrongIndex] = useState<number | null>(null)
  const [toast, setToast] = useState(false)
  const [finished, setFinished] = useState(false)
  const [imgBroken, setImgBroken] = useState(false)

  const questions = month?.couplesQuiz.questions ?? []
  const total = questions.length
  const q = total > 0 ? questions[Math.min(step, total - 1)] : null

  const progressPct = useMemo(() => {
    if (total === 0) return 0
    if (finished) return 100
    const base = step / total
    const extra = phase === 'revealed' ? 1 / total : 0
    return Math.min(100, (base + extra) * 100)
  }, [finished, phase, step, total])

  const showToast = useCallback(() => {
    setToast(true)
    window.setTimeout(() => setToast(false), 2200)
  }, [])

  const pick = useCallback(
    (i: number) => {
      if (!q || phase !== 'question' || finished) return
      if (i === q.correct) {
        setWrongIndex(null)
        setPhase('revealed')
        setImgBroken(false)
      } else {
        setWrongIndex(i)
        showToast()
        window.setTimeout(() => setWrongIndex(null), 520)
      }
    },
    [finished, phase, q, showToast],
  )

  const next = useCallback(() => {
    if (phase !== 'revealed' || !q) return
    if (step >= total - 1) {
      setFinished(true)
    } else {
      setStep((s) => s + 1)
      setPhase('question')
    }
  }, [phase, q, step, total])

  const restart = useCallback(() => {
    setStep(0)
    setPhase('question')
    setWrongIndex(null)
    setToast(false)
    setFinished(false)
    setImgBroken(false)
  }, [])

  if (!month || !isCouplesQuizMonth(month)) {
    return (
      <MonthLayout emoji="💑" title="Sence Ben, Sence Sen" subtitle="" color="#f5f0e6">
        <p className="month04-empty">Çift quiz içeriği bulunamadı.</p>
      </MonthLayout>
    )
  }

  if (total === 0) {
    return (
      <MonthLayout emoji={month.emoji} title={month.title} subtitle={month.subtitle} color={month.color}>
        <p className="month04-empty">Henüz soru eklenmemiş.</p>
      </MonthLayout>
    )
  }

  return (
    <MonthLayout emoji={month.emoji} title={month.title} subtitle={month.subtitle} color={month.color}>
      <div className="month04">
        <div
          className="month04-progress"
          role="progressbar"
          aria-valuenow={Math.round(progressPct)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="month04-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>

        {toast ? (
          <div className="month04-toast" role="status">
            Tekrar dene ✨
          </div>
        ) : null}

        {!finished ? (
          <div
            className={`month04-stage${phase === 'revealed' ? ' month04-stage--correct-glow' : ''}`}
          >
            <span className="month04-badge">{q ? aboutBadge(q.about, name1, name2) : ''}</span>

            <h2 className="month04-question">{q?.question}</h2>

            {phase === 'question' ? (
              <div className="month04-options">
                {q?.options.map((opt, i) => (
                  <button
                    key={`${step}-${i}`}
                    type="button"
                    className={`month04-opt${wrongIndex === i ? ' month04-opt--wrong' : ''}`}
                    onClick={() => pick(i)}
                  >
                    <span className="month04-opt-key">{String.fromCharCode(65 + i)}</span>
                    <span className="month04-opt-text">{opt}</span>
                  </button>
                ))}
              </div>
            ) : null}

            {phase === 'revealed' && q ? (
              <div className="month04-reveal">
                <div className="month04-flip-scene">
                  <div className="month04-flip-inner month04-flip-inner--show">
                    <div className="month04-photo-wrap">
                      {!imgBroken ? (
                        <img
                          className="month04-photo"
                          src={photoSrc(q.photo)}
                          alt=""
                          onError={() => setImgBroken(true)}
                        />
                      ) : (
                        <div className="month04-photo-placeholder" aria-hidden>
                          <span className="month04-photo-placeholder-emoji">💕</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <p className="month04-reaction">{q.reaction}</p>
                <button type="button" className="month04-next" onClick={next}>
                  Sonraki
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="month04-end">
            <div className="month04-mosaic" aria-hidden>
              {questions.map((item, idx) => (
                <MosaicThumb key={idx} path={item.photo} />
              ))}
            </div>
            <p className="month04-end-msg">{month.couplesQuiz.endMessage}</p>
            <button type="button" className="month04-restart" onClick={restart}>
              Baştan oyna
            </button>
          </div>
        )}
      </div>
    </MonthLayout>
  )
}

function MosaicThumb({ path }: { path: string }) {
  const [broken, setBroken] = useState(false)
  if (broken) {
    return (
      <div className="month04-mosaic-cell month04-mosaic-cell--ph">
        <span>📷</span>
      </div>
    )
  }
  return (
    <img
      className="month04-mosaic-cell"
      src={photoSrc(path)}
      alt=""
      onError={() => setBroken(true)}
    />
  )
}
