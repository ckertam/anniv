import { useCallback, useRef, useState } from 'react'
import type { TouchEvent } from 'react'
import MonthLayout from '../MonthLayout'
import content from '../../data/content.json'
import './Month04Letters.css'

type LetterItem = {
  title: string
  body: string
  date: string
}

type LettersMonth = (typeof content.months)[3] & {
  type: 'letters'
  letters: { items: LetterItem[]; video: string | null }
}

function isLettersMonth(m: (typeof content.months)[number]): m is LettersMonth {
  return m.type === 'letters' && 'letters' in m && Array.isArray(m.letters?.items)
}

const NO_ITEMS: LetterItem[] = []

function toEmbedUrl(raw: string): string {
  const u = raw.trim()
  if (!u) return ''
  if (u.includes('youtube.com/embed')) return u
  try {
    const url = new URL(u)
    const v = url.searchParams.get('v')
    if (url.hostname.includes('youtube.com') && v) {
      return `https://www.youtube.com/embed/${v}`
    }
    if (url.hostname === 'youtu.be') {
      const id = url.pathname.replace(/^\//, '').split('/')[0]
      if (id) return `https://www.youtube.com/embed/${id}`
    }
  } catch {
    /* not a URL */
  }
  return u
}

export default function Month04Letters() {
  const month = content.months[3]
  const valid = month != null && isLettersMonth(month)
  const items = valid && month ? month.letters.items : NO_ITEMS
  const videoRaw = valid && month ? month.letters.video : null
  const [letterIx, setLetterIx] = useState(0)
  const [opened, setOpened] = useState(false)
  const touchStartX = useRef(0)

  const n = items.length
  const i = n > 0 ? Math.min(Math.max(0, letterIx), n - 1) : 0
  const letter = n > 0 ? items[i] : null

  let videoSrc: string | null = null
  if (videoRaw != null) {
    const t = String(videoRaw).trim()
    if (t !== '') videoSrc = toEmbedUrl(t)
  }

  const goPrev = useCallback(() => {
    if (n <= 1) return
    setLetterIx((x) => (x - 1 + n) % n)
    setOpened(false)
  }, [n])

  const goNext = useCallback(() => {
    if (n <= 1) return
    setLetterIx((x) => (x + 1) % n)
    setOpened(false)
  }, [n])

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: TouchEvent) => {
    if (!opened) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (dx > 56) goPrev()
    else if (dx < -56) goNext()
  }

  if (!valid || !month) {
    return (
      <MonthLayout emoji="💌" title="Mektuplar" subtitle="" color="#f5f0e6">
        <p className="month04-empty">İçerik bulunamadı.</p>
      </MonthLayout>
    )
  }

  if (n === 0 || !letter) {
    return (
      <MonthLayout
        emoji={month.emoji}
        title={month.title}
        subtitle={month.subtitle}
        color={month.color}
      >
        <p className="month04-empty">Henüz mektup eklenmemiş.</p>
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
      <div className="month04">
        <div className="month04-toolbar">
          <button
            type="button"
            className="month04-icon-btn"
            onClick={goPrev}
            disabled={n <= 1}
            aria-label="Önceki mektup"
          >
            ←
          </button>
          <span className="month04-counter">
            Mektup {i + 1} / {n}
          </span>
          <button
            type="button"
            className="month04-icon-btn"
            onClick={goNext}
            disabled={n <= 1}
            aria-label="Sonraki mektup"
          >
            →
          </button>
        </div>

        <div
          className={`month04-stage${opened ? ' month04-stage--reading' : ''}`}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {!opened ? (
            <button
              type="button"
              className="month04-open-trigger"
              onClick={() => setOpened(true)}
              aria-expanded={false}
            >
              <div className="month04-stack" aria-hidden>
                <div className="month04-stack-layer month04-stack-layer--back" />
                <div className="month04-stack-layer month04-stack-layer--mid" />
                <div className="month04-envelope">
                  <div className="month04-envelope-inner">
                    <div className="month04-envelope-paper-glow" />
                    <div className="month04-envelope-body" />
                    <div className="month04-envelope-flap" />
                    <div className="month04-envelope-seal">{month.emoji}</div>
                  </div>
                  <p className="month04-envelope-title">{letter.title}</p>
                  <span className="month04-envelope-hint">Dokun ve oku</span>
                </div>
              </div>
            </button>
          ) : (
            <div className="month04-letter-wrap" aria-live="polite">
              <div className="month04-letter">
                <div className="month04-letter-tools">
                  <button
                    type="button"
                    className="month04-letter-nav"
                    onClick={goPrev}
                    disabled={n <= 1}
                    aria-label="Önceki mektup"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="month04-close"
                    onClick={() => setOpened(false)}
                    aria-label="Zarfı kapat"
                  >
                    Kapat
                  </button>
                  <button
                    type="button"
                    className="month04-letter-nav"
                    onClick={goNext}
                    disabled={n <= 1}
                    aria-label="Sonraki mektup"
                  >
                    ›
                  </button>
                </div>
                <h2 className="month04-letter-heading">{letter.title}</h2>
                <time className="month04-letter-date">{letter.date}</time>
                <div className="month04-letter-body">{letter.body}</div>
                {n > 1 ? <p className="month04-swipe-hint">Kaydırarak diğer mektuplara geç</p> : null}
              </div>
            </div>
          )}
        </div>

        {videoSrc ? (
          <section className="month04-video-block" aria-label="Video">
            <h3 className="month04-video-title">Sana özel</h3>
            <div className="month04-video-frame">
              <iframe
                title="Mektup videosu"
                src={videoSrc}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        ) : null}
      </div>
    </MonthLayout>
  )
}
