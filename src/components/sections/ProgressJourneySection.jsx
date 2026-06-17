import { useEffect, useRef, useState } from 'react'
import { PROGRESS } from '@/constants/copy'
import { COINS } from '@/constants/assets'
import SectionTag from '@/components/ui/SectionTag'

const GRID = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='0.75' fill='rgba(255%2C255%2C255%2C0.055)'/%3E%3C/svg%3E")`

/**
 * ProgressJourneySection — Stage 5 · Section 1  (layout-fixed revision)
 *
 * Fix strategy: split desktop layout into THREE separate flex rows:
 *   Row A — node circles only  (rail line is absolute behind them)
 *   Row B — drip connectors    (fixed height, perfectly centred per column)
 *   Row C — cards              (align-items:stretch → all cards same height)
 *
 * This eliminates the misalignment caused by stacking everything in one
 * column per step. Each row is independent; the cards row forces equal height.
 *
 * z-index layers:
 *   1 — rail line
 *   2 — node circles  (opaque bg covers the rail behind them)
 *   3 — node number text
 *   3 — midpoint dots on rail
 */

const STEPS = [
  {
    num:         '01',
    title:       'Start a real-life mission',
    body:        'Pick a financial scenario — your first paycheck, an unexpected bill, or saving for a big goal. No tutorials, just real situations.',
    nodeColor:   '#FF5533',
    nodeBg:      '#150906',   /* opaque — MUST cover the rail line */
    nodeGlow:    '0 0 0 3px rgba(255,85,51,0.18), 0 0 28px rgba(255,85,51,0.70)',
    cardBorder:  'rgba(254,89,52,0.62)',
    cardBorderH: 'rgba(254,89,52,0.96)',
    cardBg:      'radial-gradient(ellipse 90% 50% at 50% 0%, rgba(254,89,52,0.14) 0%, #0C0820 55%, #090618 100%)',
    outerGlow:   '0 0 20px 3px rgba(254,89,52,0.48), 0 0 55px 6px rgba(254,89,52,0.22)',
    outerGlowH:  '0 0 28px 5px rgba(254,89,52,0.68), 0 0 80px 10px rgba(254,89,52,0.32)',
    floorColor:  'rgba(254,89,52,0.30)',
    numClr:      'rgba(254,89,52,0.11)',
    accentBar:   'linear-gradient(90deg, #FE5934, #EF00BD)',
  },
  {
    num:         '02',
    title:       'Make choices, see outcomes',
    body:        'Every decision has a real consequence. No wrong answers — just the feedback that builds lasting financial instincts.',
    nodeColor:   '#8926E7',
    nodeBg:      '#0D0A1E',
    nodeGlow:    '0 0 0 3px rgba(137,38,231,0.20), 0 0 28px rgba(137,38,231,0.72)',
    cardBorder:  'rgba(137,38,231,0.62)',
    cardBorderH: 'rgba(170,80,255,0.96)',
    cardBg:      'radial-gradient(ellipse 90% 50% at 50% 0%, rgba(137,38,231,0.15) 0%, #0C0820 55%, #080520 100%)',
    outerGlow:   '0 0 20px 3px rgba(137,38,231,0.50), 0 0 55px 6px rgba(87,62,251,0.24)',
    outerGlowH:  '0 0 28px 5px rgba(137,38,231,0.70), 0 0 80px 10px rgba(87,62,251,0.36)',
    floorColor:  'rgba(137,38,231,0.28)',
    numClr:      'rgba(137,38,231,0.11)',
    accentBar:   'linear-gradient(90deg, #8926E7, #573EFB)',
  },
  {
    num:         '03',
    title:       'Earn P-coins & unlock badges',
    body:        'Complete missions to earn P-coins and unlock achievements that mark your financial progress. Every win is real.',
    nodeColor:   '#469EFF',
    nodeBg:      '#080B1A',
    nodeGlow:    '0 0 0 3px rgba(70,158,255,0.18), 0 0 28px rgba(70,158,255,0.68)',
    cardBorder:  'rgba(70,158,255,0.60)',
    cardBorderH: 'rgba(70,158,255,0.96)',
    cardBg:      'radial-gradient(ellipse 90% 50% at 50% 0%, rgba(70,158,255,0.13) 0%, #0A0820 55%, #07051A 100%)',
    outerGlow:   '0 0 20px 3px rgba(70,158,255,0.48), 0 0 55px 6px rgba(70,158,255,0.22)',
    outerGlowH:  '0 0 28px 5px rgba(70,158,255,0.68), 0 0 80px 10px rgba(70,158,255,0.32)',
    floorColor:  'rgba(70,158,255,0.26)',
    numClr:      'rgba(70,158,255,0.11)',
    accentBar:   'linear-gradient(90deg, #469EFF, #8926E7)',
  },
  {
    num:         '04',
    title:       'Build real money confidence',
    body:        'Track your growth, level up your profile, and leave PLEARN with the financial confidence most people spend years searching for.',
    nodeColor:   '#00CCAA',
    nodeBg:      '#070F0D',
    nodeGlow:    '0 0 0 3px rgba(0,204,170,0.18), 0 0 28px rgba(0,204,170,0.65)',
    cardBorder:  'rgba(1,222,91,0.58)',
    cardBorderH: 'rgba(1,222,91,0.96)',
    cardBg:      'radial-gradient(ellipse 90% 50% at 50% 0%, rgba(1,222,91,0.11) 0%, #09081E 55%, #060518 100%)',
    outerGlow:   '0 0 20px 3px rgba(1,222,91,0.44), 0 0 55px 6px rgba(1,222,91,0.20)',
    outerGlowH:  '0 0 28px 5px rgba(1,222,91,0.64), 0 0 80px 10px rgba(1,222,91,0.28)',
    floorColor:  'rgba(1,222,91,0.24)',
    numClr:      'rgba(1,222,91,0.11)',
    accentBar:   'linear-gradient(90deg, #01DE5B, #469EFF)',
  },
]

// ── SVG line-art icons ─────────────────────────────────────────────────────
function IconTarget({ color }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"
      style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
      <circle cx="16" cy="16" r="11" stroke={color} strokeWidth="1.8" />
      <circle cx="16" cy="16" r="6" stroke={color} strokeWidth="1.8" />
      <circle cx="16" cy="16" r="1.8" fill={color} />
      <line x1="16" y1="2" x2="16" y2="6.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="16" y1="25.5" x2="16" y2="30" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="2" y1="16" x2="6.5" y2="16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="25.5" y1="16" x2="30" y2="16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M23 9 L27 5 M27 5 L23 5 M27 5 L27 9" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function IconBrain({ color }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"
      style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
      <path d="M16 27C16 27 6 24.5 6 16C6 11 10 7.5 14 7.5C14 7.5 12.5 11 14 13" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 16C6 16 10 16 10 19C10 22 14 24 16 24" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 27C16 27 26 24.5 26 16C26 11 22 7.5 18 7.5C18 7.5 19.5 11 18 13" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 16C26 16 22 16 22 19C22 22 18 24 16 24" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="16" y1="7.5" x2="16" y2="27" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeDasharray="2 2.5" />
      <path d="M12 15 Q16 13.5 20 15" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </svg>
  )
}
function IconTrophy({ color }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"
      style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
      <path d="M9.5 4.5H22.5V15C22.5 19.1 19.6 22.5 16 22.5C12.4 22.5 9.5 19.1 9.5 15V4.5Z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 7.5H6C6 7.5 5 13 9.5 13.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22.5 7.5H26C26 7.5 27 13 22.5 13.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="16" y1="22.5" x2="16" y2="27" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="11.5" y1="27" x2="20.5" y2="27" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 9.5 L17 12.5 L20 12.5 L17.8 14.2 L18.6 17.2 L16 15.5 L13.4 17.2 L14.2 14.2 L12 12.5 L15 12.5 Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}
function IconHeart({ color }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"
      style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
      <path d="M16 28C16 28 3.5 20 3.5 11.5C3.5 7.6 6.7 4.5 10.5 4.5C12.8 4.5 14.9 5.6 16 7.3C17.1 5.6 19.2 4.5 21.5 4.5C25.3 4.5 28.5 7.6 28.5 11.5C28.5 20 16 28 16 28Z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 12C10.5 12 9.5 14.5 12 16.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.65" />
    </svg>
  )
}

const ICONS = [IconTarget, IconBrain, IconTrophy, IconHeart]

// ── StepCard — card only (no node/drip, those are in separate rows) ────────
function StepCard({ step, index, hovered, onEnter, onLeave }) {
  const Icon = ICONS[index]
  return (
    <div
      style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Floor underglow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: '-28px', left: '6%', right: '6%', height: '56px',
          background: `radial-gradient(ellipse 80% 100% at 50% 0%, ${step.floorColor} 0%, transparent 70%)`,
          filter: 'blur(16px)', pointerEvents: 'none', zIndex: 0,
        }}
      />
      {/* Outer border + glow — no overflow:hidden so shadow isn't clipped */}
      <div
        style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          position: 'relative', borderRadius: '16px',
          border:     `1.5px solid ${hovered ? step.cardBorderH : step.cardBorder}`,
          boxShadow:  hovered ? step.outerGlowH : step.outerGlow,
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          cursor: 'default',
        }}
      >
        {/* Inner content — overflow:hidden clips bg gradients */}
        <div
          style={{
            flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem',
            padding: '1.5rem', overflow: 'hidden', borderRadius: '14px',
            background: step.cardBg, position: 'relative',
          }}
        >
          {/* Top accent bar */}
          <div aria-hidden="true" style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
            borderRadius: '14px 14px 0 0', background: step.accentBar,
            boxShadow: `0 0 10px 1px ${step.cardBorder}`,
          }} />

          {/* Watermark number */}
          <span aria-hidden="true" className="pointer-events-none select-none absolute font-karantina leading-none"
            style={{ fontSize: '5.5rem', top: '-0.4rem', right: '0.5rem', color: step.numClr }}>
            {step.num}
          </span>

          {/* SVG icon */}
          <div style={{ marginTop: '0.35rem', position: 'relative', zIndex: 1 }}>
            <Icon color={step.nodeColor} />
          </div>

          {/* Accent bar below icon */}
          <div aria-hidden="true" className="rounded-full" style={{
            width: '2.25rem', height: '3px',
            background: step.accentBar, marginTop: '-0.35rem',
          }} />

          {/* Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', position: 'relative', zIndex: 1 }}>
            <h3 className="font-karantina text-white leading-snug" style={{ fontSize: '1.3rem' }}>
              {step.title}
            </h3>
            <p className="font-rem text-body text-text-muted leading-relaxed">
              {step.body}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Section ────────────────────────────────────────────────────────────────
export default function ProgressJourneySection() {
  const [visible, setVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const reveal = (delayMs = 0) => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? 'translateY(0px)' : 'translateY(24px)',
    transition: `opacity 0.7s ease ${delayMs}ms, transform 0.65s ease ${delayMs}ms`,
  })

  return (
    <section
      id="progress"
      ref={ref}
      aria-label="Progress Journey"
      className="relative overflow-hidden py-section"
      style={{ background: '#070120' }}
    >
      {/* ── Background (unchanged) ───────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: GRID, backgroundRepeat: 'repeat' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-36"
        style={{ background: 'linear-gradient(to bottom, rgba(4,1,14,0.65) 0%, transparent 100%)', zIndex: 2 }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(137,38,231,0.18) 0%, transparent 68%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[95px]"
        style={{ background: 'radial-gradient(ellipse 32% 50% at 14% 68%, rgba(254,89,52,0.14) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[95px]"
        style={{ background: 'radial-gradient(ellipse 32% 50% at 40% 68%, rgba(137,38,231,0.16) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[95px]"
        style={{ background: 'radial-gradient(ellipse 32% 50% at 66% 68%, rgba(70,158,255,0.14) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[95px]"
        style={{ background: 'radial-gradient(ellipse 32% 50% at 90% 68%, rgba(1,222,91,0.12) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 44% 38% at 5% 90%, rgba(239,0,189,0.10) 0%, transparent 65%)' }} />

      <img src={COINS.blue} alt="" aria-hidden="true"
        className="pointer-events-none select-none absolute animate-float"
        style={{ width: '460px', height: '460px', left: '-80px', top: '50%',
          transform: 'translateY(-50%)', objectFit: 'contain', opacity: 0.11,
          filter: 'blur(1px) drop-shadow(0 0 18px rgba(70,158,255,0.55)) drop-shadow(0 0 38px rgba(70,158,255,0.28))',
          animationDelay: '0.8s', animationDuration: '7s', zIndex: 0 }} />
      <img src={COINS.orange} alt="" aria-hidden="true"
        className="pointer-events-none select-none absolute animate-float"
        style={{ width: '340px', height: '340px', right: '-65px', top: '35%',
          objectFit: 'contain', opacity: 0.09,
          filter: 'blur(1.5px) drop-shadow(0 0 16px rgba(254,89,52,0.50)) drop-shadow(0 0 32px rgba(254,89,52,0.25))',
          animationDelay: '2.8s', animationDuration: '8.5s', zIndex: 0 }} />
      <img src={COINS.purpleStyled} alt="" aria-hidden="true"
        className="pointer-events-none select-none absolute animate-float"
        style={{ width: '190px', height: '190px', right: '8%', bottom: '10%',
          objectFit: 'contain', opacity: 0.07,
          filter: 'blur(2px) drop-shadow(0 0 12px rgba(137,38,231,0.40))',
          animationDelay: '4.5s', animationDuration: '9s', zIndex: 0 }} />

      {/* ════════════════════════════════════════════════════════════════ */}
      <div className="section-container relative z-10">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center gap-4 mb-16" style={reveal(0)}>
          <SectionTag>{PROGRESS.preTag}</SectionTag>

          <h2 className="font-karantina text-h2-sm lg:text-h2 leading-tight max-w-3xl">
            <span style={{ color: '#FFFFFF' }}>From zero to </span>
            <span style={{
              background: 'linear-gradient(90deg, #C850FF 0%, #EF00BD 50%, #43FEF0 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>financially fluent.</span>
          </h2>

          <div aria-hidden="true" style={{
            width: '14rem', height: '4px', borderRadius: '9999px', marginTop: '-0.25rem',
            background: 'linear-gradient(90deg, #FE5934, #8926E7 35%, #469EFF 68%, #01DE5B)',
            boxShadow: '0 0 18px rgba(137,38,231,0.55), 0 0 40px rgba(70,158,255,0.25)',
          }} />

          <p className="font-rem text-body-lg text-text-muted max-w-2xl leading-relaxed mt-1">
            {PROGRESS.body}
          </p>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            DESKTOP TIMELINE — 3 separate rows for perfect alignment
            ════════════════════════════════════════════════════════════ */}
        <div style={reveal(100)}>

          {/* ── ROW A: Nodes — visible on md+, hidden on mobile ─────── */}
          <div
            className="hidden md:block"
            style={{ position: 'relative', paddingBottom: 0 }}
          >
            {/*
              Rail line — z:1.
              Spans from center of col-1 (12.5%) to center of col-4 (87.5%).
              Each of 4 equal columns = 25% wide, centers at 12.5 / 37.5 / 62.5 / 87.5.
            */}
            <div aria-hidden="true" style={{
              position: 'absolute',
              top: '45px',                                   /* half of 90px node height */
              left: 'calc(12.5% + 0px)',
              right: 'calc(12.5% + 0px)',
              height: '3px',
              background: 'linear-gradient(90deg, #FF5533, #8926E7 38%, #469EFF 68%, #00CCAA)',
              boxShadow: '0 0 18px rgba(137,38,231,0.55), 0 0 6px rgba(255,255,255,0.10)',
              zIndex: 1,
            }} />

            {/* Midpoint dots — z:3 (above the rail and nodes) */}
            {[25, 50, 75].map(pct => (
              <div key={pct} aria-hidden="true" style={{
                position: 'absolute',
                top: '40px',
                left: `${pct}%`,
                transform: 'translateX(-50%)',
                width: '10px', height: '10px',
                borderRadius: '50%',
                background: '#FFFFFF',
                boxShadow: '0 0 8px 3px rgba(210,170,255,0.90), 0 0 20px rgba(137,38,231,0.60)',
                zIndex: 3,
              }} />
            ))}

            {/* 4 node circles — z:2, opaque bg hides the rail behind them */}
            <div style={{ display: 'flex' }}>
              {STEPS.map((step) => (
                <div key={step.num} style={{
                  flex: 1, display: 'flex', justifyContent: 'center',
                  position: 'relative', zIndex: 2,
                }}>
                  <div style={{
                    width: '90px', height: '90px',
                    borderRadius: '50%',
                    /*
                      nodeBg is a solid dark hex — NOT semi-transparent.
                      This ensures the rail line is completely hidden behind each node.
                    */
                    background: step.nodeBg,
                    border: `2.5px solid ${step.nodeColor}`,
                    boxShadow: step.nodeGlow,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', zIndex: 2,
                  }}>
                    <span className="font-karantina text-white leading-none"
                      style={{ fontSize: '2.1rem', position: 'relative', zIndex: 3 }}>
                      {step.num}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── ROW B: Drip connectors — desktop only, fixed height ─── */}
          <div className="hidden md:flex" style={{ height: '48px' }}>
            {STEPS.map((step) => (
              <div key={step.num} style={{
                flex: 1,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
                {/* Thin coloured drip line */}
                <div style={{
                  width: '2px',
                  flex: 1,
                  background: `linear-gradient(to bottom, ${step.nodeColor} 0%, rgba(255,255,255,0.10) 100%)`,
                }} />
                {/* Diamond marker */}
                <div aria-hidden="true" style={{
                  width: '8px', height: '8px',
                  transform: 'rotate(45deg)',
                  background: step.nodeColor,
                  boxShadow: `0 0 10px 2px ${step.nodeColor}`,
                  flexShrink: 0,
                  marginBottom: '4px',
                }} />
              </div>
            ))}
          </div>

          {/* ── ROW C: Cards — align-items:stretch forces equal height ─ */}
          {/*
            Desktop: flex row, stretch = all cards same height.
            Mobile:  stacked column with combined node+drip+card per step.
          */}

          {/* Desktop cards */}
          <div
            className="hidden md:flex gap-4"
            style={{ alignItems: 'stretch', paddingBottom: '40px' }}
          >
            {STEPS.map((step, i) => (
              <div key={step.num} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <StepCard
                  step={step}
                  index={i}
                  hovered={hoveredCard === i}
                  onEnter={() => setHoveredCard(i)}
                  onLeave={() => setHoveredCard(null)}
                />
              </div>
            ))}
          </div>

          {/* Mobile: self-contained stack — node + drip + card per step */}
          <div className="md:hidden flex flex-col gap-10 pb-8">
            {STEPS.map((step, i) => {
              const Icon = ICONS[i]
              return (
                <div key={step.num} className="flex flex-col items-center gap-0">
                  {/* Node */}
                  <div style={{
                    width: '80px', height: '80px', borderRadius: '50%',
                    background: step.nodeBg,
                    border: `2.5px solid ${step.nodeColor}`,
                    boxShadow: step.nodeGlow,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, zIndex: 2, position: 'relative',
                  }}>
                    <span className="font-karantina text-white leading-none" style={{ fontSize: '1.9rem' }}>
                      {step.num}
                    </span>
                  </div>
                  {/* Drip */}
                  <div style={{ width: '2px', height: '22px', background: `linear-gradient(to bottom, ${step.nodeColor}, rgba(255,255,255,0.08))` }} />
                  <div style={{ width: '8px', height: '8px', transform: 'rotate(45deg)', background: step.nodeColor, boxShadow: `0 0 8px 2px ${step.nodeColor}`, marginBottom: '6px' }} />
                  {/* Card */}
                  <div style={{ position: 'relative', width: '100%' }}>
                    <div style={{
                      position: 'absolute', bottom: '-24px', left: '6%', right: '6%', height: '48px',
                      background: `radial-gradient(ellipse 80% 100% at 50% 0%, ${step.floorColor} 0%, transparent 70%)`,
                      filter: 'blur(14px)', pointerEvents: 'none',
                    }} />
                    <div style={{
                      position: 'relative', borderRadius: '16px',
                      border: `1.5px solid ${step.cardBorder}`,
                      boxShadow: step.outerGlow,
                    }}>
                      <div style={{
                        borderRadius: '14px', background: step.cardBg,
                        padding: '1.5rem', overflow: 'hidden', position: 'relative',
                        display: 'flex', flexDirection: 'column', gap: '0.875rem',
                      }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', borderRadius: '14px 14px 0 0', background: step.accentBar }} />
                        <span aria-hidden="true" className="pointer-events-none select-none absolute font-karantina leading-none"
                          style={{ fontSize: '5rem', top: '-0.3rem', right: '0.5rem', color: step.numClr }}>{step.num}</span>
                        <div style={{ marginTop: '0.25rem', position: 'relative', zIndex: 1 }}><Icon color={step.nodeColor} /></div>
                        <div className="rounded-full" style={{ width: '2rem', height: '3px', background: step.accentBar, marginTop: '-0.25rem' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', position: 'relative', zIndex: 1 }}>
                          <h3 className="font-karantina text-white leading-snug" style={{ fontSize: '1.3rem' }}>{step.title}</h3>
                          <p className="font-rem text-body text-text-muted leading-relaxed">{step.body}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>

        {/* ── XP label pill ────────────────────────────────────────────── */}
        <div className="flex justify-center mt-8" style={reveal(400)}>
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full"
            style={{
              background: 'rgba(137,38,231,0.08)',
              border: '1px solid rgba(137,38,231,0.22)',
              boxShadow: '0 0 18px rgba(137,38,231,0.14)',
            }}>
            <img src={COINS.purpleStyled} alt="" aria-hidden="true" className="w-4 h-4 object-contain" />
            <p className="font-rem text-caption text-text-muted">{PROGRESS.xpLabel}</p>
          </div>
        </div>

      </div>
    </section>
  )
}
