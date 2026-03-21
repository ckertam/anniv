import { useMemo, useState } from 'react'
import MonthLayout from '../MonthLayout'
import contentData from '../../data/content.json'
import './Month10Room.css'

type RoomObject = {
  type: string
  position: number[]
  image?: string
  label: string
}

type RoomMonth = {
  id: number
  type: 'room3d'
  title: string
  subtitle: string
  emoji: string
  color: string
  room3d: { objects: RoomObject[] }
}

function isRoomMonth(m: (typeof contentData.months)[number]): m is RoomMonth {
  return m.type === 'room3d' && 'room3d' in m
}

const base = import.meta.env.BASE_URL

function wallForFrame(pos: number[]): 'back' | 'left' | 'right' {
  const x = pos[0] ?? 0
  if (x < -1) return 'left'
  if (x > 1) return 'right'
  return 'back'
}

export default function Month10Room() {
  const month = contentData.months.find(isRoomMonth)
  const [zoom, setZoom] = useState<{ src: string; label: string } | null>(null)

  const { framesByWall, tableObjects } = useMemo(() => {
    const empty: Record<'back' | 'left' | 'right', RoomObject[]> = {
      back: [],
      left: [],
      right: [],
    }
    if (!month) return { framesByWall: empty, tableObjects: [] as RoomObject[] }
    const frames: Record<'back' | 'left' | 'right', RoomObject[]> = {
      back: [],
      left: [],
      right: [],
    }
    const table: RoomObject[] = []
    for (const o of month.room3d.objects) {
      if (o.type === 'photo_frame' && o.image) {
        frames[wallForFrame(o.position)].push(o)
      } else {
        table.push(o)
      }
    }
    return { framesByWall: frames, tableObjects: table }
  }, [month])

  if (!month) return null

  const { emoji, title, subtitle, color } = month

  const iconFor = (t: string) => {
    if (t === 'book') return '📖'
    if (t === 'vinyl') return '💿'
    return '✨'
  }

  return (
    <MonthLayout emoji={emoji} title={title} subtitle={subtitle} color={color}>
      <div className="room-page">
        <p className="room-page__hint">Çerçevelere dokun — yakınlaştır</p>

        <div className="room-viewport">
          <div className="room-stage">
            <div className="room-cube">
              <div className="room-wall room-wall--floor" />
              <div className="room-wall room-wall--back">
                {framesByWall.back.map((o) => (
                  <button
                    key={o.label + o.image}
                    type="button"
                    className="room-frame"
                    onClick={() => o.image && setZoom({ src: `${base}${o.image}`, label: o.label })}
                  >
                    <span className="room-frame__mat">
                      <img src={`${base}${o.image}`} alt={o.label} loading="lazy" />
                    </span>
                    <span className="room-frame__label">{o.label}</span>
                  </button>
                ))}
              </div>
              <div className="room-wall room-wall--left">
                {framesByWall.left.map((o) => (
                  <button
                    key={o.label + o.image}
                    type="button"
                    className="room-frame room-frame--side"
                    onClick={() => o.image && setZoom({ src: `${base}${o.image}`, label: o.label })}
                  >
                    <span className="room-frame__mat">
                      <img src={`${base}${o.image}`} alt={o.label} loading="lazy" />
                    </span>
                    <span className="room-frame__label">{o.label}</span>
                  </button>
                ))}
              </div>
              <div className="room-wall room-wall--right">
                {framesByWall.right.map((o) => (
                  <button
                    key={o.label + o.image}
                    type="button"
                    className="room-frame room-frame--side"
                    onClick={() => o.image && setZoom({ src: `${base}${o.image}`, label: o.label })}
                  >
                    <span className="room-frame__mat">
                      <img src={`${base}${o.image}`} alt={o.label} loading="lazy" />
                    </span>
                    <span className="room-frame__label">{o.label}</span>
                  </button>
                ))}
              </div>

              <div className="room-table">
                <div className="room-table__top">
                  {tableObjects.map((o) => (
                    <div key={o.label + o.type} className="room-table__obj" title={o.label}>
                      <span className="room-table__icon">{iconFor(o.type)}</span>
                      <span className="room-table__name">{o.label}</span>
                    </div>
                  ))}
                </div>
                <div className="room-table__leg room-table__leg--l" />
                <div className="room-table__leg room-table__leg--r" />
              </div>
            </div>
          </div>
        </div>

        {zoom && (
          <button
            type="button"
            className="room-lightbox"
            onClick={() => setZoom(null)}
            aria-label="Kapat"
          >
            <span className="room-lightbox__backdrop" />
            <span className="room-lightbox__card" onClick={(e) => e.stopPropagation()}>
              <img src={zoom.src} alt={zoom.label} />
              <span className="room-lightbox__caption">{zoom.label}</span>
              <span className="room-lightbox__close">×</span>
            </span>
          </button>
        )}
      </div>
    </MonthLayout>
  )
}
