import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import MonthLayout from '../MonthLayout'
import contentData from '../../data/content.json'
import './Month05Scratch.css'

type ScratchCard = {
  photo: string
  caption: string
}

type ScratchMonth = {
  id: number
  title: string
  subtitle: string
  type: 'scratch'
  emoji: string
  color: string
  scratch: {
    cards: ScratchCard[]
    endMessage: string
  }
}

function isScratchMonth(m: (typeof contentData.months)[number]): m is ScratchMonth {
  return m.type === 'scratch' && 'scratch' in m && Array.isArray((m as ScratchMonth).scratch?.cards)
}

function photoSrc(path: string): string {
  return `${import.meta.env.BASE_URL}photos/${path}`
}

const SCRATCH_THRESHOLD = 0.6

export default function Month05Scratch() {
  const month = contentData.months.find(isScratchMonth)
  const cards = month?.scratch.cards ?? []
  const total = cards.length
  const [revealed, setRevealed] = useState<Set<number>>(() => new Set())

  const onCardRevealed = useCallback((index: number) => {
    setRevealed((prev) => {
      if (prev.has(index)) return prev
      const next = new Set(prev)
      next.add(index)
      return next
    })
  }, [])

  const opened = revealed.size
  const allOpen = total > 0 && opened === total

  if (!month || !isScratchMonth(month)) {
    return (
      <MonthLayout emoji="🎰" title="Kazı Kazan" subtitle="" color="#e6f0f5">
        <p className="month05-empty">Kazı kazan içeriği bulunamadı.</p>
      </MonthLayout>
    )
  }

  if (total === 0) {
    return (
      <MonthLayout emoji={month.emoji} title={month.title} subtitle={month.subtitle} color={month.color}>
        <p className="month05-empty">Henüz kart eklenmemiş.</p>
      </MonthLayout>
    )
  }

  return (
    <MonthLayout emoji={month.emoji} title={month.title} subtitle={month.subtitle} color={month.color}>
      <div className="month05">
        <p className="month05-counter" aria-live="polite">
          <span className="month05-counter-num">{opened}</span>
          <span className="month05-counter-sep"> / </span>
          <span className="month05-counter-total">{total}</span>
          <span className="month05-counter-label"> anı açıldı</span>
        </p>

        <div className="month05-grid">
          {cards.map((card, index) => (
            <ScratchCardItem
              key={`${card.photo}-${index}`}
              card={card}
              index={index}
              isRevealed={revealed.has(index)}
              onRevealed={onCardRevealed}
            />
          ))}
        </div>

        {allOpen ? (
          <div className="month05-finale">
            <div className="month05-sparkles" aria-hidden>
              {Array.from({ length: 28 }, (_, i) => (
                <span
                  key={i}
                  className="month05-sparkle"
                  style={{ '--d': `${i * 0.12}s` } as CSSProperties}
                />
              ))}
            </div>
            <p className="month05-end-msg">{month.scratch.endMessage}</p>
          </div>
        ) : null}
      </div>
    </MonthLayout>
  )
}

type ScratchCardItemProps = {
  card: ScratchCard
  index: number
  isRevealed: boolean
  onRevealed: (index: number) => void
}

function ScratchCardItem({ card, index, isRevealed, onRevealed }: ScratchCardItemProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawingRef = useRef(false)
  const revealedRef = useRef(isRevealed)
  const checkRafRef = useRef<number | null>(null)
  const [imgBroken, setImgBroken] = useState(false)
  const [fadeCover, setFadeCover] = useState(isRevealed)
  const [coverGone, setCoverGone] = useState(isRevealed)

  const drawCover = useCallback(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const rect = wrap.getBoundingClientRect()
    const w = Math.max(1, Math.floor(rect.width))
    const h = Math.max(1, Math.floor(rect.height))
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5)
    canvas.width = Math.floor(w * dpr)
    canvas.height = Math.floor(h * dpr)
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)

    const g = ctx.createLinearGradient(0, 0, w, h)
    g.addColorStop(0, '#5c0018')
    g.addColorStop(0.35, '#800020')
    g.addColorStop(0.55, '#c9a96e')
    g.addColorStop(0.72, '#a3324a')
    g.addColorStop(1, '#800020')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)

    const shine = ctx.createLinearGradient(0, 0, w, 0)
    shine.addColorStop(0, 'rgba(255,255,255,0)')
    shine.addColorStop(0.45, 'rgba(255,255,255,0.22)')
    shine.addColorStop(0.55, 'rgba(255,255,255,0.28)')
    shine.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = shine
    ctx.fillRect(0, 0, w, h * 0.4)

    ctx.font = `700 ${Math.max(14, w * 0.075)}px Inter, system-ui, sans-serif`
    ctx.fillStyle = 'rgba(255, 248, 245, 0.95)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.shadowColor = 'rgba(0,0,0,0.35)'
    ctx.shadowBlur = 8
    ctx.fillText('Kazı Kazan 🎰', w / 2, h / 2 - 6)
    ctx.font = `600 ${Math.max(11, w * 0.048)}px Inter, system-ui, sans-serif`
    ctx.fillStyle = 'rgba(255, 248, 245, 0.75)'
    ctx.fillText('Kazı! ✨', w / 2, h / 2 + 16)
    ctx.shadowBlur = 0
  }, [])

  useEffect(() => {
    if (isRevealed || coverGone) return
    const wrap = wrapRef.current
    if (!wrap) return
    const ro = new ResizeObserver(() => {
      drawCover()
    })
    ro.observe(wrap)
    drawCover()
    return () => ro.disconnect()
  }, [drawCover, isRevealed, coverGone])

  const checkScratchedRatio = useCallback(() => {
    if (checkRafRef.current != null) return
    checkRafRef.current = window.requestAnimationFrame(() => {
      checkRafRef.current = null
      const canvas = canvasRef.current
      if (!canvas || revealedRef.current) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const { width: cw, height: ch } = canvas
      if (cw < 2 || ch < 2) return
      const step = 6
      let clear = 0
      let total = 0
      const data = ctx.getImageData(0, 0, cw, ch).data
      for (let y = 0; y < ch; y += step) {
        for (let x = 0; x < cw; x += step) {
          const i = (y * cw + x) * 4 + 3
          total++
          if (data[i] < 64) clear++
        }
      }
      const ratio = total ? clear / total : 0
      if (ratio >= SCRATCH_THRESHOLD) {
        revealedRef.current = true
        setFadeCover(true)
        window.setTimeout(() => {
          setCoverGone(true)
          onRevealed(index)
        }, 420)
      }
    })
  }, [index, onRevealed])

  const scratchAt = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current
      if (!canvas || revealedRef.current || fadeCover) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      const x = (clientX - rect.left) * scaleX
      const y = (clientY - rect.top) * scaleY
      const brush = Math.max(28, canvas.width * 0.09)
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath()
      ctx.arc(x, y, brush, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalCompositeOperation = 'source-over'
      checkScratchedRatio()
    },
    [checkScratchedRatio, fadeCover],
  )

  const onMouseDown = (e: React.MouseEvent) => {
    if (isRevealed || coverGone) return
    drawingRef.current = true
    scratchAt(e.clientX, e.clientY)
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!drawingRef.current || isRevealed || coverGone) return
    scratchAt(e.clientX, e.clientY)
  }

  const onMouseUpLeave = () => {
    drawingRef.current = false
  }

  const onTouchStart = (e: React.TouchEvent) => {
    if (isRevealed || coverGone) return
    drawingRef.current = true
    const t = e.touches[0]
    if (t) scratchAt(t.clientX, t.clientY)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (!drawingRef.current || isRevealed || coverGone) return
    const t = e.touches[0]
    if (t) scratchAt(t.clientX, t.clientY)
  }

  const onTouchEnd = () => {
    drawingRef.current = false
  }

  return (
    <div className="month05-card">
      <div className="month05-card-inner" ref={wrapRef}>
        <div className="month05-photo-layer">
          {!imgBroken ? (
            <img
              className="month05-photo"
              src={photoSrc(card.photo)}
              alt=""
              draggable={false}
              onError={() => setImgBroken(true)}
            />
          ) : (
            <div className="month05-photo-placeholder" aria-hidden>
              <span>💕</span>
            </div>
          )}
          <p className="month05-caption">{card.caption}</p>
        </div>

        {!coverGone ? (
          <canvas
            ref={canvasRef}
            className={`month05-canvas${fadeCover ? ' month05-canvas--fade' : ''}`}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUpLeave}
            onMouseLeave={onMouseUpLeave}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          />
        ) : null}
      </div>
    </div>
  )
}
