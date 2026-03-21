import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import MonthLayout from '../MonthLayout'
import content from '../../data/content.json'
import './Month05Music.css'

type MusicMonth = (typeof content.months)[4]

export default function Month05Music() {
  const month = content.months[4] as MusicMonth
  if (month.type !== 'music' || !month.music) return null

  const { emoji, title, subtitle, color, music } = month
  const tracks = music.tracks

  return (
    <MonthLayout emoji={emoji} title={title} subtitle={subtitle} color={color}>
      <div className="month05-list">
        {tracks.map((track, index) => (
          <MusicTrackCard key={`${track.spotifyId}-${index}`} track={track} index={index} />
        ))}
      </div>
    </MonthLayout>
  )
}

function MusicTrackCard({
  track,
  index,
}: {
  track: { title: string; artist: string; spotifyId: string; memory: string }
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible(true)
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const embedSrc = `https://open.spotify.com/embed/track/${track.spotifyId}?utm_source=generator&theme=0`

  return (
    <article
      ref={ref}
      className={`month05-card ${visible ? 'month05-card--visible' : ''}`}
      style={{ '--month05-stagger': String(index) } as CSSProperties}
    >
      <div className="month05-vinyl-row">
        <div className="month05-vinyl" aria-hidden>
          <div className="month05-vinyl-disc">
            <div className="month05-vinyl-groove" />
            <div className="month05-vinyl-label">
              <span className="month05-vinyl-heart">♥</span>
            </div>
          </div>
        </div>
        <div className="month05-meta">
          <h2 className="month05-track-title">{track.title}</h2>
          <p className="month05-track-artist">{track.artist}</p>
        </div>
      </div>
      <div className="month05-embed-wrap">
        <iframe
          title={`Spotify: ${track.title}`}
          className="month05-embed"
          src={embedSrc}
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
      <p className="month05-memory">{track.memory}</p>
    </article>
  )
}
