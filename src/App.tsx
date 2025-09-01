import React from 'react'
import { Carousel3D, Item } from './components/Carousel3D'

const items: Item[] = [
  {
    title: 'Neon Forms',
    subtitle: 'UI Component',
    lines: ['Animated focus rings', 'Validation states', 'Accessible labels'],
  },
  {
    title: 'Liquid Button',
    subtitle: 'Micro Interaction',
    lines: ['Morphing SVG blob', 'Hover ripple', 'ARIA-friendly'],
  },
  {
    title: 'Glass Nav',
    subtitle: 'Navigation',
    lines: ['Frosted glass look', 'Active underline', 'Keyboard support'],
  },
  {
    title: 'Tilt Cards',
    subtitle: 'Showcase',
    lines: ['3D parallax tilt', 'Soft glow', 'Smooth spring'],
  },
  {
    title: 'Spectrum Switch',
    subtitle: 'Theme',
    lines: ['Dark / Light', 'Animated gradient', 'Local storage'],
  },
  {
    title: 'Toast Stack',
    subtitle: 'Feedback',
    lines: ['Staggered enter', 'Auto hide', 'Reduced motion aware'],
  },
]

export default function App(){
  return (
    <div className="min-h-screen bg-mesh">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="max-w-6xl mx-auto h-16 flex items-center justify-between px-6">
          <a href="#" className="font-extrabold">Interactive<span className="text-brand-500">3D</span></a>
          <nav className="hidden md:flex gap-6 text-sm text-white/80">
            <a href="#showcase" className="hover:text-white">Showcase</a>
            <a href="https://github.com/Matheushrz" target="_blank" className="hover:text-white">GitHub</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        <section className="pt-16 md:pt-24 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Interactive 3D Showcase</h1>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto">
            Drag, press arrows, and explore a 3D ring of UI ideas. Pure frontend — no WebGL needed.
          </p>
        </section>

        <section id="showcase" className="py-14">
          <Carousel3D items={items} />
        </section>

        <section className="py-14 text-center">
          <a
            href="https://github.com/Matheushrz"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-medium shadow-glow"
          >
            See more on GitHub
          </a>
        </section>
      </main>
    </div>
  )
}
