import React, { useEffect, useRef } from 'react'

type Props = {
  title: string
  subtitle?: string
  lines?: string[]
  onClick?: () => void
}

export const Card3D: React.FC<Props> = ({ title, subtitle, lines = [], onClick }) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - .5
      const py = (e.clientY - r.top) / r.height - .5
      el.style.setProperty('--rx', (py * -8) + 'deg')
      el.style.setProperty('--ry', (px * 10) + 'deg')
    }
    const onLeave = () => {
      el.style.setProperty('--rx','0deg'); el.style.setProperty('--ry','0deg')
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => { cancelAnimationFrame(raf); el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [])

  return (
    <div
      ref={ref}
      className="relative rounded-2xl p-5 bg-white/5 border border-white/10 backdrop-blur-xl"
      style={{ transform: 'rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))', transformStyle: 'preserve-3d', transition: 'transform .08s linear' }}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e)=>{ if(e.key==='Enter' || e.key===' ') { e.preventDefault(); onClick?.() } }}
      aria-label={title}
    >
      <div className="absolute inset-0 rounded-2xl decor" style={{boxShadow:'inset 0 0 0 1px rgba(255,255,255,.06)'}}/>
      <div className="relative">
        <div className="text-sm uppercase tracking-widest text-white/60">{subtitle}</div>
        <h3 className="mt-1 text-xl font-semibold">{title}</h3>
        <ul className="mt-3 space-y-1 text-sm text-white/80">
          {lines.map((l,i)=>(<li key={i}>• {l}</li>))}
        </ul>
      </div>
    </div>
  )
}
