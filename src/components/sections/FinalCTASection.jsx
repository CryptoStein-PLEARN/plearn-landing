import { useEffect, useRef, useState } from 'react'
import { COINS } from '@/constants/assets'
import { CTA, BETA } from '@/constants/config'

const GRID = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='0.75' fill='rgba(255%2C255%2C255%2C0.055)'/%3E%3C/svg%3E")`

/**
 * FinalCTASection — redesigned to match reference image.
 *
 * Key techniques:
 * - Gradient border: outer div has gradient bg + 2.5px padding → inner dark panel
 * - Split headline: "Ready to" white + italic, "make money\nskills stick?" pink→blue gradient + italic
 * - Custom icon buttons (inline SVG) to avoid Button component limitations
 * - SparkleAccent: thin lines + 4-pointed star center
 * - Corner sparkles on the panel
 * - Strong multi-layer box-shadow around the gradient border wrapper
 */

// ── Sparkle line (headline accent) ────────────────────────────────────────
function SparkleAccent() {
  return (
    <div className="flex items-center justify-center gap-3" aria-hidden="true" style={{ marginTop: '0.25rem' }}>
      <div style={{
        height: '1.5px', width: '90px', borderRadius: '9999px',
        background: 'linear-gradient(to right, transparent, rgba(180,100,255,0.65))',
      }} />
      <div style={{ position: 'relative', width: '16px', height: '16px', flexShrink: 0 }}>
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '2px', height: '100%', borderRadius: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(210,150,255,0.98), transparent)',
          boxShadow: '0 0 8px rgba(210,150,255,0.90)',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)',
          height: '2px', width: '100%', borderRadius: '1px',
          background: 'linear-gradient(to right, transparent, rgba(210,150,255,0.98), transparent)',
          boxShadow: '0 0 8px rgba(210,150,255,0.90)',
        }} />
      </div>
      <div style={{
        height: '1.5px', width: '90px', borderRadius: '9999px',
        background: 'linear-gradient(to left, transparent, rgba(180,100,255,0.65))',
      }} />
    </div>
  )
}

// ── 4-pointed corner sparkle ───────────────────────────────────────────────
function CornerSparkle({ top, right, bottom, left, size = 18 }) {
  const color = 'rgba(210,160,255,0.90)'
  return (
    <div aria-hidden="true" className="pointer-events-none absolute" style={{ top, right, bottom, left, width: size, height: size }}>
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '2px', height: '100%',
        background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
        boxShadow: `0 0 8px ${color}`,
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)',
        height: '2px', width: '100%',
        background: `linear-gradient(to right, transparent, ${color}, transparent)`,
        boxShadow: `0 0 8px ${color}`,
      }} />
    </div>
  )
}

// ── Rocket icon ────────────────────────────────────────────────────────────
function RocketIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11A22.35 22.35 0 0 1 12 15z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  )
}

// ── Gamepad icon ───────────────────────────────────────────────────────────
function GamepadIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <line x1="6" y1="12" x2="10" y2="12"/>
      <line x1="8" y1="10" x2="8" y2="14"/>
      <line x1="15" y1="13" x2="15.01" y2="13" strokeWidth="2.8"/>
      <line x1="18" y1="11" x2="18.01" y2="11" strokeWidth="2.8"/>
      <rect x="2" y="6" width="20" height="12" rx="3"/>
    </svg>
  )
}

// ── Shield check icon ──────────────────────────────────────────────────────
function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M8 1.5 L14 4 L14 8.5 C14 11.5 11.5 14 8 15 C4.5 14 2 11.5 2 8.5 L2 4 Z"
        stroke="rgba(137,38,231,0.80)" strokeWidth="1.3" fill="none" />
      <path d="M5.5 8 L7 9.5 L10.5 6" stroke="rgba(180,120,255,0.90)" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Section ────────────────────────────────────────────────────────────────
export default function FinalCTASection() {
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
    transform:  visible ? 'translateY(0px)' : 'translateY(32px)',
    transition: `opacity 0.75s ease ${delayMs}ms, transform 0.70s ease ${delayMs}ms`,
  })

  return (
    <section
      id="waitlist"
      ref={ref}
      aria-label="Join the Beta"
      className="relative overflow-hidden py-section"
      style={{ background: '#060118' }}
    >
      {/* ── Dot grid ─────────────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: GRID, backgroundRepeat: 'repeat' }} />

      {/* ── Top-edge blend ───────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-36 z-[2]"
        style={{ background: 'linear-gradient(to bottom, rgba(3,0,12,0.75) 0%, transparent 100%)' }} />

      {/* ── Atmospheric glow blobs ───────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[140px]"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(137,38,231,0.30) 0%, transparent 68%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse 45% 50% at 5% 60%, rgba(239,0,189,0.16) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse 45% 50% at 95% 60%, rgba(87,62,251,0.18) 0%, transparent 65%)' }} />

      {/* ── Floating coin watermarks ─────────────────────────────────── */}
      <img src={COINS.purpleStyled} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float"
        style={{ width: '440px', height: '440px', left: '-75px', top: '50%',
          transform: 'translateY(-50%)', objectFit: 'contain', opacity: 0.13,
          filter: 'blur(1px) drop-shadow(0 0 20px rgba(137,38,231,0.60)) drop-shadow(0 0 40px rgba(87,62,251,0.30))',
          animationDelay: '0.3s', animationDuration: '6.5s', zIndex: 0 }} />
      <img src={COINS.magenta} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float"
        style={{ width: '380px', height: '380px', right: '-65px', top: '50%',
          transform: 'translateY(-50%)', objectFit: 'contain', opacity: 0.11,
          filter: 'blur(1.5px) drop-shadow(0 0 18px rgba(239,0,189,0.55)) drop-shadow(0 0 36px rgba(239,0,189,0.28))',
          animationDelay: '2.0s', animationDuration: '7.5s', zIndex: 0 }} />
      <img src={COINS.orange} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float"
        style={{ width: '160px', height: '160px', left: '9%', top: '6%',
          objectFit: 'contain', opacity: 0.07,
          filter: 'blur(2px) drop-shadow(0 0 10px rgba(254,89,52,0.38))',
          animationDelay: '3.5s', animationDuration: '8.5s', zIndex: 0 }} />
      <img src={COINS.green} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float"
        style={{ width: '140px', height: '140px', right: '9%', top: '8%',
          objectFit: 'contain', opacity: 0.06,
          filter: 'blur(2px) drop-shadow(0 0 10px rgba(1,222,91,0.35))',
          animationDelay: '5.0s', animationDuration: '9.5s', zIndex: 0 }} />

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="section-container relative z-10 flex flex-col items-center">

        <div style={{ ...reveal(0), width: '100%', maxWidth: '820px', position: 'relative' }}>

          {/* Panel outer floor glow */}
          <div aria-hidden="true" className="pointer-events-none absolute" style={{
            bottom: '-50px', left: '5%', right: '5%', height: '100px',
            background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(137,38,231,0.50) 0%, rgba(239,0,189,0.20) 50%, transparent 70%)',
            filter: 'blur(24px)',
          }} />

          {/* ── GRADIENT BORDER WRAPPER ─────────────────────────────── */}
          {/* Outer div = the "border" — gradient bg + 2.5px padding     */}
          <div style={{
            padding: '2.5px',
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #5B3FE7 0%, #8926E7 18%, #C832FF 38%, #EF00BD 55%, #8926E7 72%, #5077F2 88%, #469EFF 100%)',
            boxShadow:
              '0 0 40px 8px rgba(137,38,231,0.58), ' +
              '0 0 80px 16px rgba(239,0,189,0.28), ' +
              '0 0 140px 28px rgba(87,62,251,0.20), ' +
              '0 0 220px 40px rgba(137,38,231,0.12)',
          }}>

            {/* ── INNER DARK PANEL ──────────────────────────────────── */}
            <div style={{
              borderRadius: '26px',
              background: 'radial-gradient(ellipse 120% 65% at 50% 0%, rgba(137,38,231,0.28) 0%, rgba(15,8,40,0.98) 45%, rgba(8,4,26,1) 100%)',
              position: 'relative',
              overflow: 'hidden',
            }}>

              {/* Top inner glow stripe */}
              <div aria-hidden="true" style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '140px',
                background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(137,38,231,0.22) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              {/* Bottom center bright spot (matching reference) */}
              <div aria-hidden="true" style={{
                position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)',
                width: '60px', height: '20px',
                background: 'radial-gradient(ellipse 100% 100% at 50% 100%, rgba(200,140,255,0.75) 0%, transparent 100%)',
                filter: 'blur(4px)',
                pointerEvents: 'none',
              }} />

              {/* Corner sparkles */}
              <CornerSparkle top="20px"  left="22px"  size={16} />
              <CornerSparkle top="20px"  right="22px" size={16} />
              <CornerSparkle bottom="18px" left="22px"  size={12} />
              <CornerSparkle bottom="18px" right="22px" size={12} />

              {/* ── Panel content ──────────────────────────────────── */}
              <div
                className="relative flex flex-col items-center text-center"
                style={{ padding: '3.5rem 2.5rem 3rem', gap: '0' }}
              >

                {/* Section label */}
                <div className="flex items-center gap-2.5" style={{ marginBottom: '1.6rem' }}>
                  <div style={{
                    width: '7px', height: '7px', borderRadius: '50%',
                    background: 'rgba(180,100,255,0.90)',
                    boxShadow: '0 0 8px rgba(180,100,255,0.80)',
                  }} />
                  <span className="font-rem font-bold uppercase tracking-widest"
                    style={{ fontSize: '0.70rem', letterSpacing: '0.22em', color: 'rgba(200,160,255,0.88)' }}>
                    Join the Beta
                  </span>
                </div>

                {/* ── Headline ─────────────────────────────────────── */}
                <div style={{ marginBottom: '1.1rem', lineHeight: 1.08 }}>
                  {/* Line 1: "Ready to" — white */}
                  <span
                    className="font-karantina"
                    style={{
                      display: 'block',
                      fontSize: 'clamp(2.8rem, 6.5vw, 4.4rem)',
                      fontStyle: 'italic',
                      color: '#FFFFFF',
                      lineHeight: 1.05,
                    }}
                  >
                    Ready to
                  </span>
                  {/* Line 2: "make money" — gradient */}
                  <span
                    className="font-karantina"
                    style={{
                      display: 'block',
                      fontSize: 'clamp(2.8rem, 6.5vw, 4.4rem)',
                      fontStyle: 'italic',
                      background: 'linear-gradient(90deg, #EF00BD 0%, #B040FF 28%, #8926E7 52%, #5077F2 76%, #469EFF 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      lineHeight: 1.05,
                    }}
                  >
                    make money
                  </span>
                  {/* Line 3: "skills stick?" — hot pink/magenta */}
                  <span
                    className="font-karantina"
                    style={{
                      display: 'block',
                      fontSize: 'clamp(2.8rem, 6.5vw, 4.4rem)',
                      fontStyle: 'italic',
                      background: 'linear-gradient(90deg, #EF00BD 0%, #C832FF 55%, #8926E7 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      lineHeight: 1.05,
                    }}
                  >
                    skills stick?
                  </span>
                </div>

                {/* Sparkle accent line */}
                <SparkleAccent />

                {/* Body paragraph */}
                <p className="font-rem leading-relaxed"
                  style={{
                    fontSize: '1rem',
                    color: 'rgba(200,185,230,0.72)',
                    maxWidth: '480px',
                    marginTop: '1.4rem',
                    marginBottom: '2rem',
                  }}>
                  Join the beta and be among the first to explore PLEARN's mission-based financial literacy game.
                </p>

                {/* ── CTA Buttons ─────────────────────────────────── */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4"
                  style={{ marginBottom: '1.75rem', width: '100%' }}>

                  {/* Primary: gradient fill + rocket icon */}
                  <a
                    href={CTA.joinBeta}
                    className="inline-flex items-center gap-3 font-rem font-bold transition-all duration-200"
                    style={{
                      fontSize: '1rem',
                      padding: '1rem 2rem',
                      borderRadius: '9999px',
                      background: 'linear-gradient(105deg, #EF00BD 0%, #8926E7 45%, #5077F2 80%, #469EFF 100%)',
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      boxShadow:
                        '0 0 24px rgba(239,0,189,0.55), ' +
                        '0 0 50px rgba(137,38,231,0.38), ' +
                        '0 4px 20px rgba(0,0,0,0.40)',
                      minWidth: '220px',
                      justifyContent: 'center',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-1px)'
                      e.currentTarget.style.boxShadow =
                        '0 0 32px rgba(239,0,189,0.72), ' +
                        '0 0 65px rgba(137,38,231,0.52), ' +
                        '0 6px 24px rgba(0,0,0,0.40)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0px)'
                      e.currentTarget.style.boxShadow =
                        '0 0 24px rgba(239,0,189,0.55), ' +
                        '0 0 50px rgba(137,38,231,0.38), ' +
                        '0 4px 20px rgba(0,0,0,0.40)'
                    }}
                  >
                    <RocketIcon />
                    Join the Beta
                    <span aria-hidden="true" style={{ fontSize: '1.1rem' }}>›</span>
                  </a>

                  {/* Secondary: dark + neon outline + gamepad icon */}
                  <a
                    href={CTA.exploreDemo}
                    className="inline-flex items-center gap-3 font-rem font-bold transition-all duration-200"
                    style={{
                      fontSize: '1rem',
                      padding: '1rem 2rem',
                      borderRadius: '9999px',
                      background: 'rgba(10,6,28,0.90)',
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      border: '1.5px solid rgba(100,70,200,0.70)',
                      boxShadow:
                        '0 0 18px rgba(87,62,251,0.28), ' +
                        '0 4px 20px rgba(0,0,0,0.40), ' +
                        'inset 0 0 14px rgba(87,62,251,0.08)',
                      minWidth: '220px',
                      justifyContent: 'center',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-1px)'
                      e.currentTarget.style.borderColor = 'rgba(150,100,255,0.90)'
                      e.currentTarget.style.boxShadow =
                        '0 0 26px rgba(87,62,251,0.44), ' +
                        '0 6px 24px rgba(0,0,0,0.40), ' +
                        'inset 0 0 20px rgba(87,62,251,0.12)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0px)'
                      e.currentTarget.style.borderColor = 'rgba(100,70,200,0.70)'
                      e.currentTarget.style.boxShadow =
                        '0 0 18px rgba(87,62,251,0.28), ' +
                        '0 4px 20px rgba(0,0,0,0.40), ' +
                        'inset 0 0 14px rgba(87,62,251,0.08)'
                    }}
                  >
                    <GamepadIcon />
                    Explore the Demo
                    <span aria-hidden="true" style={{ fontSize: '1.1rem' }}>›</span>
                  </a>
                </div>

                {/* Credibility / EIT line */}
                <div className="flex items-center gap-2">
                  <ShieldIcon />
                  <span className="font-rem" style={{ fontSize: '0.80rem', color: 'rgba(180,160,220,0.62)' }}>
                    {BETA.backer}
                  </span>
                </div>

              </div>
            </div>
          </div>
          {/* ── end gradient border wrapper ─────────────────────────── */}

        </div>
      </div>
    </section>
  )
}
