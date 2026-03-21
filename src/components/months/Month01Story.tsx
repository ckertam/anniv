import { useCallback, useEffect, useState } from 'react'
import MonthLayout from '../MonthLayout'
import content from '../../data/content.json'
import './Month01Story.css'

type StoryScene = {
  text: string
  image: string | null
  emoji: string
}

type StoryMonth = (typeof content.months)[0] & {
  type: 'story'
  story: { scenes: StoryScene[] }
}

function isStoryMonth(m: (typeof content.months)[number]): m is StoryMonth {
  return m.type === 'story' && 'story' in m && Array.isArray(m.story?.scenes)
}

const fallbackScenes: StoryScene[] = [
  { text: 'Henüz sahne eklenmedi.', image: null, emoji: '✨' },
]

function StorySceneImage({ src, emoji }: { src: string | null; emoji: string }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return (
      <div className="month01-placeholder month01-placeholder--visible" aria-hidden>
        <span>{emoji}</span>
      </div>
    )
  }
  return (
    <img className="month01-image" src={src} alt="" onError={() => setFailed(true)} />
  )
}

export default function Month01Story() {
  const month = content.months[0]
  const valid = month != null && isStoryMonth(month)
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null)

  const scenes = valid ? month.story.scenes : []
  const safeScenes = scenes.length > 0 ? scenes : fallbackScenes
  const maxI = safeScenes.length - 1
  const i = Math.min(Math.max(0, index), maxI)
  const scene = safeScenes[i]
  const base = import.meta.env.BASE_URL
  const imageSrc =
    scene.image && String(scene.image).trim() !== ''
      ? `${base}photos/${scene.image}`
      : null

  const go = useCallback(
    (delta: number) => {
      let moved = false
      setIndex((prev) => {
        const next = prev + delta
        if (next < 0 || next >= safeScenes.length) return prev
        moved = true
        return next
      })
      if (moved) setDirection(delta > 0 ? 'next' : 'prev')
    },
    [safeScenes.length],
  )

  useEffect(() => {
    if (!direction) return
    const t = window.setTimeout(() => setDirection(null), 420)
    return () => window.clearTimeout(t)
  }, [direction, i])

  if (!valid || !month) {
    return (
      <MonthLayout emoji="💫" title="Hikaye" subtitle="" color="var(--bordo-soft)">
        <p className="month01-empty">İçerik bulunamadı.</p>
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
      <div className="month01">
        <div className="month01-stage" aria-live="polite">
          <div
            key={i}
            className={`month01-scene month01-scene--${direction ?? 'idle'}`}
          >
            <div className="month01-scene-emoji" aria-hidden>
              {scene.emoji}
            </div>
            <div className="month01-image-wrap">
              <StorySceneImage key={`${i}-${imageSrc ?? 'none'}`} src={imageSrc} emoji={scene.emoji} />
            </div>
            <p className="month01-text">{scene.text}</p>
          </div>
        </div>

        <div className="month01-nav">
          <button
            type="button"
            className="month01-btn month01-btn--ghost"
            onClick={() => go(-1)}
            disabled={i === 0}
            aria-label="Önceki sahne"
          >
            ← Önceki
          </button>
          <button
            type="button"
            className="month01-btn month01-btn--primary"
            onClick={() => go(1)}
            disabled={i === safeScenes.length - 1}
            aria-label="Sonraki sahne"
          >
            Sonraki →
          </button>
        </div>

        <div className="month01-dots" role="tablist" aria-label="Sahne seç">
          {safeScenes.map((_, dot) => (
            <button
              key={dot}
              type="button"
              role="tab"
              aria-selected={dot === i}
              aria-label={`Sahne ${dot + 1}`}
              className={`month01-dot${dot === i ? ' month01-dot--active' : ''}`}
              onClick={() => {
                setDirection(dot > i ? 'next' : dot < i ? 'prev' : null)
                setIndex(dot)
              }}
            />
          ))}
        </div>
      </div>
    </MonthLayout>
  )
}
