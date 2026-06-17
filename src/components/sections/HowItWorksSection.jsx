import { useEffect, useRef, useState } from 'react'
import { HOW_IT_WORKS } from '@/constants/copy'
import { COINS } from '@/constants/assets'
import SectionTag from '@/components/ui/SectionTag'

/**
 * HowItWorksSection — Stage 3 · Section 2
 *
 * Neon enhancement: card border + box-shadow moved to OUTER wrapper (no overflow:hidden)
 * so the glow is no longer clipped. Inner div keeps overflow:hidden for bg gradient only.
 * Glow values significantly boosted to match the neon system of Rewards + Gameplay sections.
 * Floor glow, ring badge glow, accent bar — all kept and enhanced.
 * All content, copy, icons, connectors unchanged.
 */

const GRID = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='0.75' fill='rgba(255%2C255%2C255%2C0.055)'/%3E%3C/svg%3E")`

const STEP_CONFIG = [
  {
    ringBorder:   '#FF5533',
    ringGlow:     '0 0 0 2px rgba(255,85,51,0.22), 0 0 26px rgba(255,85,51,0.72), inset 0 0 18px rgba(255,85,51,0.08)',
    ringBg:       'radial-gradient(ellipse at center, #1E0C0A 0%, #100508 100%)',
    accentBar:    'linear-gradient(90deg, #FE5934, #EF00BD)',
    topBar:       'linear-gradient(90deg, #FE5934, #EF00BD)',
    // Outer glow — strong multi-layer, NOT clipped by overflow:hidden
    border:       'rgba(254,89,52,0.80)',
    borderHov:    'rgba(254,89,52,1.00)',
    outerGlow:    '0 0 0 1px rgba(254,89,52,0.28), 0 0 22px 3px rgba(254,89,52,0.60), 0 0 60px 8px rgba(254,89,52,0.34), 0 0 120px 16px rgba(254,89,52,0.16)',
    outerGlowHov: '0 0 0 1px rgba(254,89,52,0.48), 0 0 28px 5px rgba(254,89,52,0.78), 0 0 80px 12px rgba(254,89,52,0.46), 0 0 140px 22px rgba(254,89,52,0.22)',
    cardBg:       'radial-gradient(ellipse 90% 55% at 50% 0%, rgba(254,89,52,0.14) 0%, #0C0820 52%, #090618 100%)',
    floorColor:   'rgba(254,89,52,0.30)',
    numClr:       'rgba(254,89,52,0.11)',
  },
  {
    ringBorder:   '#5566FF',
    ringGlow:     '0 0 0 2px rgba(85,102,255,0.24), 0 0 26px rgba(85,102,255,0.72), inset 0 0 18px rgba(85,102,255,0.08)',
    ringBg:       'radial-gradient(ellipse at center, #0E0C28 0%, #08061A 100%)',
    accentBar:    'linear-gradient(90deg, #573EFB, #469EFF)',
    topBar:       'linear-gradient(90deg, #469EFF, #8926E7)',
    border:       'rgba(87,62,251,0.80)',
    borderHov:    'rgba(120,90,255,1.00)',
    outerGlow:    '0 0 0 1px rgba(87,62,251,0.28), 0 0 22px 3px rgba(87,62,251,0.62), 0 0 60px 8px rgba(87,62,251,0.36), 0 0 120px 16px rgba(87,62,251,0.16)',
    outerGlowHov: '0 0 0 1px rgba(87,62,251,0.48), 0 0 28px 5px rgba(87,62,251,0.80), 0 0 80px 12px rgba(87,62,251,0.48), 0 0 140px 22px rgba(87,62,251,0.22)',
    cardBg:       'radial-gradient(ellipse 90% 55% at 50% 0%, rgba(87,62,251,0.16) 0%, #0A0820 52%, #07051A 100%)',
    floorColor:   'rgba(87,62,251,0.28)',
    numClr:       'rgba(70,158,255,0.11)',
  },
  {
    ringBorder:   '#00CCAA',
    ringGlow:     '0 0 0 2px rgba(0,204,170,0.22), 0 0 26px rgba(0,204,170,0.68), inset 0 0 18px rgba(0,204,170,0.08)',
    ringBg:       'radial-gradient(ellipse at center, #0A1C18 0%, #060F0D 100%)',
    accentBar:    'linear-gradient(90deg, #01DE5B, #469EFF)',
    topBar:       'linear-gradient(90deg, #01DE5B, #469EFF)',
    border:       'rgba(1,222,91,0.75)',
    borderHov:    'rgba(1,222,91,1.00)',
    outerGlow:    '0 0 0 1px rgba(1,222,91,0.26), 0 0 22px 3px rgba(1,222,91,0.58), 0 0 60px 8px rgba(1,222,91,0.32), 0 0 120px 16px rgba(1,222,91,0.14)',
    outerGlowHov: '0 0 0 1px rgba(1,222,91,0.44), 0 0 28px 5px rgba(1,222,91,0.76), 0 0 80px 12px rgba(1,222,91,0.44), 0 0 140px 22px rgba(1,222,91,0.20)',
    cardBg:       'radial-gradient(ellipse 90% 55% at 50% 0%, rgba(1,222,91,0.12) 0%, #09081E 52%, #060518 100%)',
    floorColor:   'rgba(1,222,91,0.24)',
    numClr:       'rgba(1,222,91,0.11)',
  },
]


// ─── Step card ─────────────────────────────────────────────────────────────
// Critical pattern: outer div has border + box-shadow (no overflow:hidden)
//                  inner div has overflow:hidden for bg gradient clipping only
function StepCard({ step, cfg, revealStyle }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{ ...revealStyle, position: 'relative', flex: 1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Floor underglow — bleeds below card */}
      <div aria-hidden="true" className="pointer-events-none absolute" style={{
        bottom: '-28px', left: '8%', right: '8%', height: '64px',
        background: `radial-gradient(ellipse 80% 100% at 50% 0%, ${cfg.floorColor} 0%, transparent 70%)`,
        filter: 'blur(16px)',
      }} />

      {/* OUTER wrapper — border + glow here (NO overflow:hidden) */}
      <div
        className="cursor-default"
        style={{
          borderRadius: '16px',
          border:    `2px solid ${hovered ? cfg.borderHov : cfg.border}`,
          boxShadow: hovered ? cfg.outerGlowHov : cfg.outerGlow,
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          height: '100%',
        }}
      >
        {/* INNER card — overflow:hidden only here (for bg radial gradient) */}
        <div style={{
          borderRadius: '14px', overflow: 'hidden',
          background: cfg.cardBg, position: 'relative', height: '100%',
        }}>

          {/* Top accent bar */}
          <div aria-hidden="true" style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
            borderRadius: '14px 14px 0 0',
            background: cfg.topBar,
            boxShadow: `0 0 10px 1px ${cfg.border}`,
          }} />

          {/* Watermark number */}
          <span aria-hidden="true" className="pointer-events-none select-none absolute font-karantina leading-none"
            style={{ fontSize: '7rem', top: '0.25rem', right: '1rem', color: cfg.numClr, letterSpacing: '-0.02em' }}>
            {step.number}
          </span>

          {/* Card content */}
          <div className="relative flex flex-col gap-6 p-5 sm:p-8 pt-6 sm:pt-9">

            {/* Ring badge + accent bar */}
            <div className="flex flex-col items-start gap-3">
              <div
                className="flex items-center justify-center rounded-full shrink-0"
                style={{
                  width:      '88px',
                  height:     '88px',
                  background: cfg.ringBg,
                  border:     `3px solid ${cfg.ringBorder}`,
                  boxShadow:  cfg.ringGlow,
                }}
              >
                <span className="font-karantina text-white leading-none" style={{ fontSize: '2.5rem' }}>
                  {step.number}
                </span>
              </div>

              <div aria-hidden="true" className="rounded-full"
                style={{ width: '2.75rem', height: '3px', background: cfg.accentBar }} />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-2.5">
              <h3 className="font-karantina text-h3-sm text-white leading-snug" style={{ letterSpacing: '-0.01em' }}>
                {step.title}
              </h3>
              <p className="font-rem text-body text-text-muted leading-relaxed">
                {step.body}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Section ───────────────────────────────────────────────────────────────
export default function HowItWorksSection() {
  const [visible, setVisible] = useState(false)
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
    transform:  visible ? 'translateY(0px)' : 'translateY(28px)',
    transition: `opacity 0.7s ease ${delayMs}ms, transform 0.65s ease ${delayMs}ms`,
  })

  return (
    <section
      id="how-it-works"
      ref={ref}
      aria-label="How It Works"
      className="relative overflow-hidden py-section-sm lg:py-section"
      style={{ background: '#080220' }}
    >
      {/* ── Dot grid texture ─────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: GRID, backgroundRepeat: 'repeat' }} />

      {/* ── Top-edge blend ───────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-36 z-[2]"
        style={{ background: 'linear-gradient(to bottom, rgba(5,2,16,0.65) 0%, transparent 100%)' }} />

      {/* ── Atmospheric glow blobs (unchanged) ──────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[110px]"
        style={{ background: 'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(137,38,231,0.20) 0%, transparent 68%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[100px]"
        style={{ background: 'radial-gradient(ellipse 38% 55% at 18% 65%, rgba(254,89,52,0.14) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[100px]"
        style={{ background: 'radial-gradient(ellipse 38% 55% at 50% 65%, rgba(87,62,251,0.16) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[100px]"
        style={{ background: 'radial-gradient(ellipse 38% 55% at 82% 65%, rgba(1,222,91,0.11) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 50% 42% at 92% 6%, rgba(87,62,251,0.22) 0%, transparent 68%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 44% 38% at 6% 92%, rgba(239,0,189,0.12) 0%, transparent 65%)' }} />

      {/* ── Floating P-coin watermarks (unchanged) ───────────────────── */}
      <img src={COINS.purpleStyled} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden sm:block"
        style={{ width: '500px', height: '500px', left: '-90px', top: '50%',
          transform: 'translateY(-50%)', objectFit: 'contain', opacity: 0.12,
          filter: 'blur(1px) drop-shadow(0 0 18px rgba(137,38,231,0.55)) drop-shadow(0 0 40px rgba(87,62,251,0.30))',
          animationDelay: '0.4s', animationDuration: '6s', zIndex: 0 }} />
      <img src={COINS.blue} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden sm:block"
        style={{ width: '400px', height: '400px', right: '-80px', top: '45%',
          transform: 'translateY(-50%)', objectFit: 'contain', opacity: 0.10,
          filter: 'blur(1.5px) drop-shadow(0 0 16px rgba(70,158,255,0.50)) drop-shadow(0 0 36px rgba(70,158,255,0.25))',
          animationDelay: '1.8s', animationDuration: '7s', zIndex: 0 }} />
      <img src={COINS.orange} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float"
        style={{ width: '210px', height: '210px', right: '4%', top: '8%', objectFit: 'contain', opacity: 0.07,
          filter: 'blur(2px) drop-shadow(0 0 12px rgba(254,89,52,0.40))',
          animationDelay: '3.8s', animationDuration: '8.5s', zIndex: 0 }} />

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="section-container relative z-10">

        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center gap-5 mb-10 lg:mb-16" style={reveal(0)}>

          <SectionTag>{HOW_IT_WORKS.preTag}</SectionTag>

          <h2 className="font-karantina text-h2-sm lg:text-h2 text-white max-w-3xl leading-tight">
            {HOW_IT_WORKS.headline}
          </h2>

          <div aria-hidden="true" className="rounded-full" style={{
            width: '6rem', height: '4px', marginTop: '-0.25rem',
            background: 'linear-gradient(90deg, #EF00BD, #8926E7, #469EFF)',
            boxShadow: '0 0 12px rgba(137,38,231,0.55)',
          }} />

        </div>

        {/* ── Step cards + connectors ──────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-stretch gap-5" style={{ paddingBottom: '40px' }}>
          {HOW_IT_WORKS.steps.map((step, i) => (
            <StepCard
              key={step.number}
              step={step}
              cfg={STEP_CONFIG[i]}
              revealStyle={reveal(120 + i * 140)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
