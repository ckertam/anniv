import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import MonthLayout from '../MonthLayout'
import content from '../../data/content.json'
import './Month06Adventure.css'

type AdventureMonth = (typeof content.months)[5]

export default function Month06Adventure() {
  const month = content.months[5] as AdventureMonth
  if (month.type !== 'adventure' || !month.adventure) return null

  const { emoji, title, subtitle, color, adventure } = month
  const { intro, scenes } = adventure

  const sceneById = useMemo(() => {
    const map = new Map<string, (typeof scenes)[number]>()
    scenes.forEach((s) => map.set(s.id, s))
    return map
  }, [scenes])

  const [phase, setPhase] = useState<'intro' | 'play'>('intro')
  const [introTyped, setIntroTyped] = useState(false)
  const [currentId, setCurrentId] = useState<string | null>(null)
  const [sceneTyped, setSceneTyped] = useState(false)
  const [history, setHistory] = useState<{ id: string; excerpt: string }[]>([])

  const startPlay = useCallback(() => {
    const start = scenes.find((s) => s.id === 'start') ?? scenes[0]
    if (start) {
      setPhase('play')
      setCurrentId(start.id)
    }
  }, [scenes])

  const currentScene = currentId ? sceneById.get(currentId) : undefined
  const isEnd = phase === 'play' && currentScene && currentScene.choices.length === 0

  useEffect(() => {
    setSceneTyped(false)
  }, [currentId])

  const pickChoice = (next: string) => {
    if (!currentScene) return
    setHistory((h) => [
      ...h,
      { id: currentScene.id, excerpt: truncate(currentScene.text, 72) },
    ])
    setCurrentId(next)
  }

  return (
    <MonthLayout emoji={emoji} title={title} subtitle={subtitle} color={color}>
      <div className="month06">
        {history.length > 0 && (
          <ul className="month06-history" aria-label="Gezilen sahneler">
            {history.map((item, idx) => (
              <li key={`${item.id}-${idx}`} className="month06-history-item">
                {item.excerpt}
              </li>
            ))}
          </ul>
        )}

        <div className="month06-panel">
          {phase === 'intro' && (
            <div className="month06-intro">
              <TypingText text={intro} onComplete={() => setIntroTyped(true)} />
              <button
                type="button"
                className="month06-start"
                onClick={startPlay}
                disabled={!introTyped}
              >
                Hikayeye başla
              </button>
            </div>
          )}

          {phase === 'play' && currentScene && (
            <>
              {isEnd ? (
                <div className="month06-end">
                  <div className="month06-hearts" aria-hidden>
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <span key={i} className={`month06-heart month06-heart--${i}`}>
                        💕
                      </span>
                    ))}
                  </div>
                  <TypingText key={currentScene.id} text={currentScene.text} />
                  <p className="month06-end-note">Son</p>
                </div>
              ) : (
                <>
                  <TypingText
                    key={currentScene.id}
                    text={currentScene.text}
                    onComplete={() => setSceneTyped(true)}
                  />
                  <div
                    className={`month06-choices ${sceneTyped ? 'month06-choices--ready' : ''}`}
                    aria-hidden={!sceneTyped}
                  >
                    {currentScene.choices.map((c) => (
                      <button
                        key={c.next + c.text}
                        type="button"
                        className="month06-choice"
                        disabled={!sceneTyped}
                        onClick={() => pickChoice(c.next)}
                      >
                        {c.text}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </MonthLayout>
  )
}

function truncate(s: string, max: number) {
  const t = s.trim()
  return t.length <= max ? t : `${t.slice(0, max)}…`
}

function TypingText({
  text,
  onComplete,
}: {
  text: string
  onComplete?: () => void
}) {
  const [len, setLen] = useState(0)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    setLen(0)
    let cancelled = false
    let i = 0
    const timeoutRef = { id: 0 }

    const clear = () => window.clearTimeout(timeoutRef.id)

    const step = () => {
      if (cancelled) return
      i += 1
      setLen(Math.min(i, text.length))
      if (i >= text.length) {
        onCompleteRef.current?.()
        return
      }
      const ch = text[i - 1]
      const delay = ch === ' ' || ch === '\n' ? 28 : 18 + Math.random() * 22
      clear()
      timeoutRef.id = window.setTimeout(step, delay)
    }

    timeoutRef.id = window.setTimeout(step, 120)
    return () => {
      cancelled = true
      clear()
    }
  }, [text])

  const shown = text.slice(0, len)

  return (
    <p className="month06-scene">
      {shown}
      {len < text.length && <span className="month06-caret" aria-hidden />}
    </p>
  )
}
