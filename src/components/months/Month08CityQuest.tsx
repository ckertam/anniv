import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import contentData from '../../data/content.json'
import './Month08CityQuest.css'

type CityEntry = {
  name: string
  event: string
  date: string
  story: string
  photo: string
  color: string
  emoji: string
}

type CityQuestMonth = {
  id: number
  title: string
  subtitle: string
  type: 'cityquest'
  emoji: string
  color: string
  cityQuest: {
    cities: CityEntry[]
    endMessage: string
  }
}

function isCityQuestMonth(m: (typeof contentData.months)[number]): m is CityQuestMonth {
  if (m.type !== 'cityquest' || !('cityQuest' in m)) return false
  const cq = (m as { cityQuest?: { cities?: unknown } }).cityQuest
  return Array.isArray(cq?.cities)
}

const base = import.meta.env.BASE_URL
const WALK_MS = 2400

function CityPhoto({ photo, label }: { photo: string; label: string }) {
  const [failed, setFailed] = useState(false)
  const src = `${base}photos/${photo}`

  if (failed) {
    return (
      <div className="m08-photo m08-photo--placeholder" aria-hidden>
        <span>📷</span>
      </div>
    )
  }

  return <img className="m08-photo" src={src} alt={label} loading="lazy" onError={() => setFailed(true)} />
}

export default function Month08CityQuest() {
  const navigate = useNavigate()
  const month = contentData.months.find(isCityQuestMonth)
  const cities = month?.cityQuest.cities ?? []
  const endMessage = month?.cityQuest.endMessage ?? ''
  const total = cities.length

  type View = 'intro' | 'walk' | 'play' | 'end'
  const [view, setView] = useState<View>('intro')
  const [cityIdx, setCityIdx] = useState(0)
  const [afterWalk, setAfterWalk] = useState<'first' | 'next' | 'final' | null>(null)
  const [typedLen, setTypedLen] = useState(0)
  const [walkKey, setWalkKey] = useState(0)

  const city = total > 0 ? cities[Math.min(cityIdx, total - 1)] : null
  const story = city?.story ?? ''
  const storyDone = story.length > 0 && typedLen >= story.length

  useEffect(() => {
    if (view !== 'walk' || afterWalk == null) return
    const t = window.setTimeout(() => {
      if (afterWalk === 'first') {
        setCityIdx(0)
        setView('play')
      } else if (afterWalk === 'next') {
        setCityIdx((i) => i + 1)
        setView('play')
      } else {
        setView('end')
      }
      setAfterWalk(null)
    }, WALK_MS)
    return () => window.clearTimeout(t)
  }, [view, afterWalk])

  useEffect(() => {
    if (view !== 'play') return
    setTypedLen(0)
  }, [view, cityIdx])

  useEffect(() => {
    if (view !== 'play' || !city) return
    if (typedLen >= story.length) return
    const t = window.setTimeout(() => setTypedLen((n) => n + 1), 42)
    return () => window.clearTimeout(t)
  }, [view, city, story.length, typedLen])

  const beginWalk = (kind: 'first' | 'next' | 'final') => {
    setWalkKey((k) => k + 1)
    setAfterWalk(kind)
    setView('walk')
  }

  const onNextCity = () => {
    if (!storyDone) return
    if (cityIdx >= total - 1) {
      beginWalk('final')
    } else {
      beginWalk('next')
    }
  }

  const progress =
    view === 'intro'
      ? 0
      : view === 'end'
        ? 100
        : view === 'walk'
          ? afterWalk === 'first'
            ? (0.5 / Math.max(total, 1)) * 100
            : afterWalk === 'next'
              ? Math.min(100, ((cityIdx + 1.5) / Math.max(total, 1)) * 100)
              : Math.min(100, (total / Math.max(total, 1)) * 100)
          : Math.min(100, ((cityIdx + 1) / Math.max(total, 1)) * 100)

  const levelLabel =
    view === 'intro'
      ? 0
      : view === 'end'
        ? total
        : view === 'walk'
          ? afterWalk === 'first'
            ? 1
            : afterWalk === 'next'
              ? Math.min(cityIdx + 2, total)
              : total
          : Math.min(cityIdx + 1, total)

  if (!month || total === 0) {
    return (
      <div className="m08-root m08-root--empty">
        <button type="button" className="m08-back" onClick={() => navigate('/')}>
          ← Geri
        </button>
        <p className="m08-empty-txt">İçerik bulunamadı.</p>
      </div>
    )
  }

  return (
    <div className="m08-root">
      <button type="button" className="m08-back" onClick={() => navigate('/')}>
        ← Geri
      </button>

      <div className="m08-progress-wrap" aria-hidden>
        <div className="m08-progress-label">
          LV {levelLabel} / {total}
        </div>
        <div className="m08-progress-bar" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
          <div className="m08-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {view === 'intro' ? (
        <div className="m08-panel m08-intro">
          <div className="m08-pixel-badge">🎮</div>
          <h1 className="m08-title">{month.title}</h1>
          <p className="m08-intro-line">
            Prensesi kurtarmak için {total} şehri geçmelisin!
          </p>
          <button type="button" className="m08-btn-primary" onClick={() => beginWalk('first')}>
            Maceraya Başla!
          </button>
        </div>
      ) : null}

      {view === 'walk' ? (
        <div className="m08-walk" key={walkKey}>
          <div className="m08-road" aria-hidden />
          <div className="m08-walker" aria-hidden>
            <span className="m08-walker-sprite">🧑</span>
          </div>
        </div>
      ) : null}

      {view === 'play' && city ? (
        <div className="m08-panel m08-level" style={{ ['--m08-accent' as string]: city.color }}>
          <div className="m08-city-badge" aria-hidden>
            <span className="m08-city-emoji">{city.emoji}</span>
          </div>
          <h2 className="m08-city-name">{city.name}</h2>
          <p className="m08-event">{city.event}</p>
          {city.date ? <p className="m08-date">{city.date}</p> : null}

          <div className="m08-scroll">
            <p className="m08-scroll-text">
              {story.slice(0, typedLen)}
              {!storyDone ? <span className="m08-caret">▌</span> : null}
            </p>
          </div>

          <div className={`m08-photo-wrap${storyDone ? ' m08-photo-wrap--visible' : ''}`}>
            <CityPhoto photo={city.photo} label={city.name} />
          </div>

          <button type="button" className="m08-btn-primary m08-btn-next" disabled={!storyDone} onClick={onNextCity}>
            Sonraki Şehir →
          </button>
        </div>
      ) : null}

      {view === 'end' ? (
        <div className="m08-panel m08-final">
          <div className="m08-hearts" aria-hidden>
            <span className="m08-heart">♥</span>
            <span className="m08-heart m08-heart--lg">♥</span>
            <span className="m08-heart">♥</span>
          </div>
          <h2 className="m08-win-title">Prenses kurtarıldı! 👸💕</h2>
          <p className="m08-end-msg">{endMessage}</p>
          <div className="m08-reel" role="list">
            {cities.map((c) => (
              <div key={`${c.name}-${c.photo}`} className="m08-reel-item" role="listitem">
                <CityPhoto photo={c.photo} label={c.name} />
                <span className="m08-reel-cap">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
