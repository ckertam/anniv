import { useMemo, type CSSProperties } from 'react'
import MonthLayout from '../MonthLayout'
import contentData from '../../data/content.json'
import './Month11Garden.css'

type GardenMonth = {
  id: number
  type: 'garden'
  title: string
  subtitle: string
  emoji: string
  color: string
  garden: {
    flowers: string[]
    message: string
    petals: boolean
  }
}

function isGardenMonth(m: (typeof contentData.months)[number]): m is GardenMonth {
  return m.type === 'garden' && 'garden' in m
}

export default function Month11Garden() {
  const month = contentData.months.find(isGardenMonth)

  const petals = useMemo(() => {
    if (!month?.garden.petals) return []
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: `${(i * 37) % 100}%`,
      delay: `${(i % 9) * 0.45}s`,
      duration: `${9 + (i % 5)}s`,
      rot: `${(i * 47) % 360}deg`,
      hue: (i * 17) % 360,
    }))
  }, [month])

  if (!month) return null

  const { emoji, title, subtitle, color, garden } = month

  return (
    <MonthLayout emoji={emoji} title={title} subtitle={subtitle} color={color}>
      <div className="garden-page">
        {garden.petals && (
          <div className="garden-petals" aria-hidden>
            {petals.map((p) => (
              <span
                key={p.id}
                className="garden-petal"
                style={
                  {
                    left: p.left,
                    animationDelay: p.delay,
                    animationDuration: p.duration,
                    '--rot': p.rot,
                    '--hue': String(p.hue),
                  } as CSSProperties
                }
              />
            ))}
          </div>
        )}

        <section className="garden-grid-wrap" aria-label="Çiçek bahçesi">
          <div className="garden-grid">
            {garden.flowers.map((fl, i) => (
              <div
                key={`${fl}-${i}`}
                className="garden-flower"
                style={{ animationDelay: `${(i % 8) * 0.12}s` }}
              >
                <span className="garden-flower__emoji">{fl}</span>
              </div>
            ))}
          </div>
        </section>

        <blockquote className="garden-message">
          <span className="garden-message__leaf" aria-hidden>
            🌿
          </span>
          {garden.message}
        </blockquote>
      </div>
    </MonthLayout>
  )
}
