'use client'

import React, { useEffect, useRef } from 'react'

import { clamp, reducedMotion } from './useProgress'

const v = (i: number) => ({ '--i': i }) as React.CSSProperties

/** A desktop page, 560×360 in its own coordinates: wireframe first, then design. */
function BrowserWire() {
  return (
    <>
      <rect className="bp-wire" pathLength={1} x={0} y={0} width={560} height={360} rx={10} style={v(0)} />
      <line className="bp-wire" pathLength={1} x1={0} y1={26} x2={560} y2={26} style={v(1)} />
      <rect className="bp-wire" pathLength={1} x={296} y={58} width={240} height={30} rx={3} style={v(2)} />
      <rect className="bp-wire" pathLength={1} x={336} y={96} width={200} height={30} rx={3} style={v(3)} />
      <rect className="bp-wire" pathLength={1} x={24} y={58} width={248} height={164} rx={8} style={v(4)} />
      <rect className="bp-wire" pathLength={1} x={24} y={256} width={160} height={80} rx={8} style={v(5)} />
      <rect className="bp-wire" pathLength={1} x={200} y={256} width={160} height={80} rx={8} style={v(6)} />
      <rect className="bp-wire" pathLength={1} x={376} y={256} width={160} height={80} rx={8} style={v(7)} />
    </>
  )
}

function BrowserFill() {
  return (
    <>
      <g className="bp-fill" style={v(0)}>
        <rect width={560} height={360} rx={10} className="fill-[#151a33]" />
        <circle cx={18} cy={13} r={3.5} className="fill-white/25" />
        <circle cx={30} cy={13} r={3.5} className="fill-white/25" />
        <circle cx={42} cy={13} r={3.5} className="fill-white/25" />
        <rect x={488} y={38} width={48} height={7} rx={3.5} className="fill-white/80" />
        <rect x={390} y={38} width={28} height={6} rx={3} className="fill-white/30" />
        <rect x={352} y={38} width={28} height={6} rx={3} className="fill-white/30" />
        <rect x={314} y={38} width={28} height={6} rx={3} className="fill-white/30" />
      </g>
      <g className="bp-fill" style={v(1)}>
        <rect x={296} y={58} width={240} height={30} rx={4} className="fill-white" />
        <rect x={336} y={96} width={200} height={30} rx={4} className="fill-brand" />
        <rect x={380} y={142} width={156} height={6} rx={3} className="fill-white/35" />
        <rect x={340} y={156} width={196} height={6} rx={3} className="fill-white/35" />
      </g>
      <g className="bp-fill" style={v(2)}>
        <rect x={24} y={58} width={248} height={164} rx={8} className="fill-brand" />
        <path d="M24 190 L100 130 L156 174 L196 146 L272 206 L272 214 Q272 222 264 222 L32 222 Q24 222 24 214 Z" className="fill-ink/35" />
        <circle cx={218} cy={96} r={14} className="fill-white/80" />
      </g>
      <g className="bp-fill" style={v(3)}>
        {[24, 200, 376].map((x) => (
          <g key={x}>
            <rect x={x} y={256} width={160} height={80} rx={8} className="fill-white/[0.07]" />
            <rect x={x + 92} y={274} width={52} height={7} rx={3.5} className="fill-white/80" />
            <rect x={x + 44} y={292} width={100} height={5} rx={2.5} className="fill-white/30" />
            <rect x={x + 64} y={304} width={80} height={5} rx={2.5} className="fill-white/30" />
          </g>
        ))}
      </g>
      <g className="bp-button">
        <rect x={432} y={176} width={104} height={30} rx={15} className="fill-white" />
        <rect x={456} y={188} width={56} height={6} rx={3} className="fill-ink" />
      </g>
    </>
  )
}

/** The same page on a phone, 150×300: the stack a desktop layout becomes. */
function PhoneWire() {
  return (
    <>
      <rect className="bp-wire" pathLength={1} x={0} y={0} width={150} height={300} rx={22} style={v(8)} />
      <rect className="bp-wire" pathLength={1} x={14} y={46} width={122} height={88} rx={8} style={v(9)} />
      <rect className="bp-wire" pathLength={1} x={14} y={150} width={122} height={44} rx={4} style={v(10)} />
      <rect className="bp-wire" pathLength={1} x={14} y={256} width={122} height={30} rx={15} style={v(11)} />
    </>
  )
}

function PhoneFill() {
  return (
    <>
      <g className="bp-fill" style={v(4)}>
        <rect width={150} height={300} rx={22} className="fill-ink stroke-white/25" strokeWidth={1.5} />
        <rect x={55} y={10} width={40} height={8} rx={4} className="fill-white/15" />
        <rect x={98} y={28} width={38} height={6} rx={3} className="fill-white/80" />
        <rect x={14} y={27} width={14} height={2} rx={1} className="fill-white/60" />
        <rect x={14} y={32} width={14} height={2} rx={1} className="fill-white/60" />
      </g>
      <g className="bp-fill" style={v(5)}>
        <rect x={14} y={46} width={122} height={88} rx={8} className="fill-brand" />
        <path d="M14 116 L52 86 L80 106 L100 92 L136 120 L136 126 Q136 134 128 134 L22 134 Q14 134 14 126 Z" className="fill-ink/35" />
        <rect x={50} y={150} width={86} height={14} rx={3} className="fill-white" />
        <rect x={30} y={170} width={106} height={14} rx={3} className="fill-brand" />
        <rect x={56} y={202} width={80} height={5} rx={2.5} className="fill-white/35" />
        <rect x={36} y={214} width={100} height={5} rx={2.5} className="fill-white/35" />
      </g>
      <g className="bp-tap">
        <rect x={14} y={256} width={122} height={30} rx={15} className="fill-brand" />
        <rect x={50} y={268} width={50} height={6} rx={3} className="fill-white" />
        <circle className="bp-ripple fill-white/40" cx={75} cy={271} r={18} />
      </g>
    </>
  )
}

const Guides = ({ x0, x1, y0, y1 }: { x0: number; x1: number; y0: number; y1: number }) => (
  <>
    {Array.from({ length: 13 }, (_, i) => {
      const x = x0 + ((x1 - x0) * i) / 12
      return <line key={i} className="bp-guide" x1={x} y1={y0} x2={x} y2={y1} style={v(i)} />
    })}
  </>
)

/**
 * The hero's demonstration: the studio's work in one sequence. A twelve-column
 * plan appears, a desktop page draws itself and design fills it in, then the
 * same page assembles on a phone in front of it and its button is pressed:
 * plan → structure → product, on every screen. Layers sit at different depths:
 * with a pointer they follow it; on touch they part as the hero scrolls away.
 * Desktop: browser large, phone overlapping its lower corner. Phones: a portrait
 * composition led by the phone, the desktop behind it. CSS runs the sequence
 * (`.bp` in globals.css) once [data-play] is set; otherwise the finished state.
 */
export function Blueprint({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current!
    if (reducedMotion()) return
    el.dataset.play = ''
    const set = (x: number, y: number) => {
      el.style.setProperty('--px', x.toFixed(3))
      el.style.setProperty('--py', y.toFixed(3))
    }
    let frame = 0
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const host = el.closest('section') ?? el
      const move = (e: PointerEvent) => {
        if (frame) return
        frame = requestAnimationFrame(() => {
          frame = 0
          set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1)
        })
      }
      host.addEventListener('pointermove', move as EventListener)
      return () => host.removeEventListener('pointermove', move as EventListener)
    }
    const scroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        set(0, clamp(-el.getBoundingClientRect().top / window.innerHeight, -1, 1) * 2)
      })
    }
    window.addEventListener('scroll', scroll, { passive: true })
    return () => window.removeEventListener('scroll', scroll)
  }, [])

  return (
    <div ref={ref} aria-hidden className={`bp ${className}`}>
      {/* Desktop and tablet */}
      <svg viewBox="0 0 760 500" className="hidden h-auto w-full overflow-visible md:block" fill="none">
        <g className="bp-layer" style={{ '--d': 6 } as React.CSSProperties}>
          <Guides x0={180} x1={740} y0={0} y1={420} />
          <g className="bp-note">
            <text x={180} y={-8}>grid / 12 col</text>
            <text x={744} y={-8} textAnchor="end">1440</text>
          </g>
        </g>
        <g className="bp-layer" style={{ '--d': 14 } as React.CSSProperties}>
          <g transform="translate(180 20)">
            <BrowserWire />
            <BrowserFill />
          </g>
        </g>
        <g className="bp-layer" style={{ '--d': 30 } as React.CSSProperties}>
          <g transform="translate(40 190)">
            <PhoneWire />
            <PhoneFill />
          </g>
          <g className="bp-note">
            <text x={40} y={182}>390</text>
          </g>
        </g>
      </svg>

      {/* Phones: the phone leads, the desktop sits behind it. */}
      <svg viewBox="0 0 360 330" className="block h-auto w-full overflow-visible md:hidden" fill="none">
        <g className="bp-layer" style={{ '--d': 5 } as React.CSSProperties}>
          <Guides x0={108} x1={360} y0={0} y1={240} />
        </g>
        <g className="bp-layer" style={{ '--d': 10 } as React.CSSProperties}>
          <g transform="translate(108 14) scale(0.45)">
            <BrowserWire />
            <BrowserFill />
          </g>
        </g>
        <g className="bp-layer" style={{ '--d': 22 } as React.CSSProperties}>
          <g transform="translate(14 24) scale(1.02)">
            <PhoneWire />
            <PhoneFill />
          </g>
        </g>
      </svg>
    </div>
  )
}
