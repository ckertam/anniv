import { useCallback, useEffect, useState } from 'react'
import MonthLayout from '../MonthLayout'
import contentData from '../../data/content.json'
import './Month09Leo.css'

type LeoMonth = {
  id: number
  type: 'leo'
  title: string
  subtitle: string
  emoji: string
  color: string
  leo: {
    name: string
    adoptionDate: string
    story: string
    photos: { file: string; caption: string }[]
    pawPrints: number
  }
}

function isLeoMonth(m: (typeof contentData.months)[number]): m is LeoMonth {
  return m.type === 'leo' && 'leo' in m
}

const base = import.meta.env.BASE_URL

export default function Month09Leo() {
  const month = contentData.months.find(isLeoMonth)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [bouncing, setBouncing] = useState<Record<number, boolean>>({})

  const updateScroll = useCallback(() => {
    const el = document.documentElement
    const max = el.scrollHeight - el.clientHeight
    const p = max > 0 ? el.scrollTop / max : 1
    setScrollProgress(Math.min(1, Math.max(0, p)))
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('resize', updateScroll)
    return () => {
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('resize', updateScroll)
    }
  }, [updateScroll])

  if (!month) return null

  const { leo, emoji, title, subtitle, color } = month

  const onPawTap = (i: number) => {
    setBouncing((b) => ({ ...b, [i]: true }))
    window.setTimeout(() => {
      setBouncing((b) => {
        const next = { ...b }
        delete next[i]
        return next
      })
    }, 500)
  }

  const trailCount = Math.max(6, leo.pawPrints)
  const activeSteps = Math.floor(scrollProgress * trailCount) + (scrollProgress >= 0.99 ? 1 : 0)

  return (
    <MonthLayout emoji={emoji} title={title} subtitle={subtitle} color={color}>
      <div className="leo-page">
        <aside className="leo-paw-trail" aria-hidden>
          {Array.from({ length: trailCount }, (_, i) => (
            <span
              key={i}
              className={`leo-paw-trail__step ${i < activeSteps ? 'leo-paw-trail__step--on' : ''}`}
            >
              🐾
            </span>
          ))}
        </aside>

        <section className="leo-hero">
          <div className="leo-hero__badge">🐕 {leo.name}</div>
          <p className="leo-hero__date">
            Sahiplenme:{' '}
            <time dateTime={leo.adoptionDate}>
              {new Date(leo.adoptionDate).toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </p>
        </section>

        <div className="leo-paw-play">
          {Array.from({ length: 8 }, (_, i) => (
            <button
              type="button"
              key={i}
              className={`leo-paw-btn ${bouncing[i] ? 'leo-paw-btn--bounce' : ''}`}
              aria-label="Pat izi"
              onClick={() => onPawTap(i)}
            >
              🐾
            </button>
          ))}
        </div>

        <article className="leo-story card-soft">
          <h2 className="leo-story__title">Leo&apos;nun hikayesi</h2>
          <p className="leo-story__text">{leo.story}</p>
        </article>

        <section className="leo-gallery" aria-label="Leo fotoğrafları">
          <h2 className="leo-gallery__title">Minik albüm</h2>
          <div className="leo-gallery__grid">
            {leo.photos.map((ph) => (
              <figure key={ph.file} className="leo-gallery__card">
                <div className="leo-gallery__frame">
                  <img src={`${base}${ph.file}`} alt={ph.caption} loading="lazy" />
                </div>
                <figcaption>{ph.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>
    </MonthLayout>
  )
}
