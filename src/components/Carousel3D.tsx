// src/components/Carousel3D.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react'

export type Item = {
  title: string
  subtitle?: string
  lines?: string[]
}

type Props = {
  items: Item[]
  radius?: number
  stepDeg?: number
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
const modulo = (n: number, m: number) => ((n % m) + m) % m

export const Carousel3D: React.FC<Props> = ({ items, radius = 360, stepDeg }) => {
  const n = items.length
  const step = stepDeg ?? (360 / n)
  const [index, setIndex] = useState(0)
  const [angle, setAngle] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startAngle, setStartAngle] = useState(0)
  const viewportRef = useRef<HTMLDivElement | null>(null)

  // Snap visual angle to the current index
  useEffect(() => {
    setAngle(index * step)
  }, [index, step])

  const positions = useMemo(() => {
    return items.map((_, k) => {
      const a = (k * step) - angle // absolute angle around the ring
      // normalize visibility around center [-180, 180]
      let norm = ((a + 180) % 360 + 360) % 360 - 180

      // 3D ring coords
      const rad = (a * Math.PI) / 180
      const z = Math.cos(rad) * radius
      const x = Math.sin(rad) * radius

      // depth/scale/opacity tuned for readability
      const depth = 1 - Math.min(1, Math.abs(norm) / 180) // 1 at center
      const scale = 0.82 + 0.18 * (1 - Math.min(1, Math.abs(norm) / 90))
      const baseOpacity = 0.18 + 0.82 * (1 - Math.min(1, Math.abs(norm) / 140))

      // thresholds
      const isCenter = Math.abs(norm) < step / 2
      const hide = Math.abs(norm) > 140 // muito atrás? some

      // z-index pela profundidade (maior Z fica por cima)
      const zIndex = Math.round(1000 + z)

      return { a, x, z, scale, opacity: clamp(baseOpacity, 0, 1), isCenter, hide, zIndex, norm }
    })
  }, [items, step, angle, radius])

  // Drag
  const sensitivity = 0.4
  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true)
    setStartX(e.clientX)
    setStartAngle(angle)
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return
    const dx = e.clientX - startX
    setAngle(startAngle - dx * sensitivity * (step / 100))
  }
  const onPointerUp = () => {
    setDragging(false)
    const snapped = Math.round(angle / step)
    setIndex(modulo(snapped, n))
  }

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setIndex(i => modulo(i + 1, n))
      if (e.key === 'ArrowLeft') setIndex(i => modulo(i - 1, n))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [n])

  return (
    <div className="scene relative w-full" style={{ perspective: '1200px' }}>
      <div
        ref={viewportRef}
        className="relative h-[460px] sm:h-[520px] select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="region"
        aria-roledescription="3D carousel"
        aria-label="Interactive showcase"
      >
        {items.map((it, k) => {
          const p = positions[k]
          if (p.hide) {
            // não renderiza itens muito “atrás” para evitar sujeira visual
            return null
          }

          const panelBase =
            'rounded-2xl p-6 backdrop-blur-xl border transition-[transform,opacity,filter] duration-500'
          const panelStyle: React.CSSProperties = {
            transformStyle: 'preserve-3d',
            transform: `translateZ(${p.z}px) translateX(${p.x}px) scale(${p.scale})`,
            opacity: p.isCenter ? 1 : p.opacity,
            zIndex: p.zIndex,
            filter: p.isCenter ? 'none' : 'blur(0.5px)',
          }

          // centro: fundo mais escuro para contraste + pointer events ativos
          // laterais: fundo mais transparente, pointer events desativados
          const containerClasses = p.isCenter
            ? 'bg-black/55 border-white/15 shadow-glow'
            : 'bg-black/25 border-white/10 pointer-events-none'

          return (
            <div
              key={k}
              className="absolute inset-0 grid place-items-center will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
              aria-hidden={!p.isCenter}
            >
              <div className={`w-[78%] sm:w-[62%] md:w-[48%] ${panelBase} ${containerClasses}`} style={panelStyle}>
                <div className="text-xs uppercase tracking-widest text-white/70">{it.subtitle}</div>
                <h3
                  className="mt-1 text-2xl font-semibold"
                  style={{ textShadow: p.isCenter ? '0 1px 10px rgba(0,0,0,.45)' : 'none' }}
                >
                  {it.title}
                </h3>
                <ul className="mt-3 space-y-1 text-sm text-white/85">
                  {(it.lines || []).map((l, i) => (
                    <li key={i}>• {l}</li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>

      {/* Controls */}
      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          onClick={() => setIndex(i => modulo(i - 1, n))}
          className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10"
        >
          Prev
        </button>
        <div className="text-sm opacity-80">Use ← → or drag</div>
        <button
          onClick={() => setIndex(i => modulo(i + 1, n))}
          className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10"
        >
          Next
        </button>
      </div>
    </div>
  )
}
