import { useEffect, useRef, useState } from 'react'
import MonthLayout from '../MonthLayout'
import content from '../../data/content.json'
import './Month03Timeline.css'

type TimelinePhoto = {
  file: string
  caption: string
  date: string
}

type TimelineMonth = (typeof content.months)[2] & {
  type: 'timeline'
  timeline: { photos: TimelinePhoto[] }
}

function isTimelineMonth(m: (typeof content.months)[number]): m is TimelineMonth {
  return m.type === 'timeline' && 'timeline' in m && Array.isArray(m.timeline?.photos)
}

const NO_PHOTOS: TimelinePhoto[] = []

function TimelineThumb({ file, emoji }: { file: string; emoji: string }) {
  const base = import.meta.env.BASE_URL
  const src = `${base}photos/${file}`
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="month03-thumb month03-thumb--placeholder" aria-hidden>
        <span>{emoji}</span>
      </div>
    )
  }

  return (
    <img
      className="month03-thumb"
      src={src}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

export default function Month03Timeline() {
  const month = content.months[2]
  const valid = month != null && isTimelineMonth(month)
  const photos = valid && month ? month.timeline.photos : NO_PHOTOS
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [visible, setVisible] = useState(() => new Set<number>())

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, photos.length)
  }, [photos.length])

  useEffect(() => {
    const nodes = itemRefs.current.filter(Boolean) as HTMLDivElement[]
    if (nodes.length === 0) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const idx = Number((entry.target as HTMLElement).dataset.timelineIdx)
          if (Number.isFinite(idx)) {
            setVisible((prev) => {
              if (prev.has(idx)) return prev
              const next = new Set(prev)
              next.add(idx)
              return next
            })
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    )

    nodes.forEach((n) => obs.observe(n))
    return () => obs.disconnect()
  }, [photos.length])

  if (!valid || !month) {
    return (
      <MonthLayout emoji="📸" title="Zaman çizelgesi" subtitle="" color="#eaf5e6">
        <p className="month03-empty">İçerik bulunamadı.</p>
      </MonthLayout>
    )
  }

  if (photos.length === 0) {
    return (
      <MonthLayout
        emoji={month.emoji}
        title={month.title}
        subtitle={month.subtitle}
        color={month.color}
      >
        <p className="month03-empty">Henüz fotoğraf eklenmemiş.</p>
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
      <div className="month03">
        <ul className="month03-list">
          {photos.map((photo, i) => {
            const side = i % 2 === 0 ? 'left' : 'right'
            const isVisible = visible.has(i)
            return (
              <li key={`${photo.file}-${i}`} className="month03-li">
                <div
                  ref={(el) => {
                    itemRefs.current[i] = el
                  }}
                  data-timeline-idx={i}
                  className={`month03-item month03-item--${side}${isVisible ? ' month03-item--visible' : ''}`}
                >
                  <div className="month03-node" aria-hidden />
                  <div className="month03-card">
                    <div className="month03-media">
                      <TimelineThumb file={photo.file} emoji={month.emoji} />
                    </div>
                    <span className="month03-date">{photo.date}</span>
                    <p className="month03-caption">{photo.caption}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </MonthLayout>
  )
}
