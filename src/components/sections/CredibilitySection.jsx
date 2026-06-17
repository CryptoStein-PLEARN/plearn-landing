import { useEffect, useRef, useState } from 'react'
import { CREDIBILITY } from '@/constants/copy'
import { COINS } from '@/constants/assets'
import SectionTag from '@/components/ui/SectionTag'

// Dot grid — shared visual language
const GRID = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='0.75' fill='rgba(255%2C255%2C255%2C0.055)'/%3E%3C/svg%3E")`

/**
 * CredibilitySection — Stage 5 · Section 2
 *
 * Trust/credibility section. Copy from CREDIBILITY constant — no invented claims,
 * no fake logos, no fabricated metrics. Badges from CREDIBILITY.badges only.
 */

// Visual config per badge — maps to CREDIBILITY.badges ids
const BADGE_CONFIG = {
  eit: {
    color:       '#573EFB',
    border:      'rgba(87,62,251,0.65)',
    borderHov:   'rgba(87,62,251,1.00)',
    cardBg:      'radial-gradient(ellipse 90% 55% at 50% 0%, rgba(87,62,251,0.14) 0%, #0C0820 55%, #080520 100%)',
    outerGlow:   '0 0 18px 2px rgba(87,62,251,0.48), 0 0 52px 5px rgba(87,62,251,0.22)',
    outerGlowH:  '0 0 26px 4px rgba(87,62,251,0.68), 0 0 78px 8px rgba(87,62,251,0.34)',
    floorColor:  'rgba(87,62,251,0.28)',
    accentBar:   'linear-gradient(90deg, #573EFB, #8926E7)',
    body:        'Developed with support from EIT Digital — one of Europe\'s leading innovation and education programs.',
    // Shield icon SVG path
    iconPath:    'M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z',
    iconViewBox: '0 0 24 24',
    delay:       0,
  },
  beta: {
    color:       '#FE5934',
    border:      'rgba(254,89,52,0.62)',
    borderHov:   'rgba(254,89,52,1.00)',
    cardBg:      'radial-gradient(ellipse 90% 55% at 50% 0%, rgba(254,89,52,0.13) 0%, #0C0820 55%, #090618 100%)',
    outerGlow:   '0 0 18px 2px rgba(254,89,52,0.45), 0 0 52px 5px rgba(254,89,52,0.20)',
    outerGlowH:  '0 0 26px 4px rgba(254,89,52,0.65), 0 0 78px 8px rgba(254,89,52,0.30)',
    floorColor:  'rgba(254,89,52,0.28)',
    accentBar:   'linear-gradient(90deg, #FE5934, #EF00BD)',
    body:        'PLEARN is live and running in active beta — real missions, real feedback, real progress being made right now.',
    // Rocket icon
    iconPath:    'M12 2.5c0 0-6 5.5-6 11.5a6 6 0 0012 0c0-6-6-11.5-6-11.5zm0 9a2 2 0 110 4 2 2 0 010-4zm-2 7.5l2-3 2 3H10z',
    iconViewBox: '0 0 24 24',
    delay:       100,
  },
  youth: {
    color:       '#8926E7',
    border:      'rgba(137,38,231,0.62)',
    borderHov:   'rgba(137,38,231,1.00)',
    cardBg:      'radial-gradient(ellipse 90% 55% at 50% 0%, rgba(137,38,231,0.13) 0%, #0C0820 55%, #080520 100%)',
    outerGlow:   '0 0 18px 2px rgba(137,38,231,0.48), 0 0 52px 5px rgba(137,38,231,0.22)',
    outerGlowH:  '0 0 26px 4px rgba(137,38,231,0.68), 0 0 78px 8px rgba(137,38,231,0.34)',
    floorColor:  'rgba(137,38,231,0.26)',
    accentBar:   'linear-gradient(90deg, #8926E7, #EF00BD)',
    body:        'Built from the ground up for Gen Z and young adults — the people who need financial education the most, in a format they\'ll actually use.',
    // Game controller icon
    iconPath:    'M21 6H3a2 2 0 00-2 2v8a2 2 0 002 2h18a2 2 0 002-2V8a2 2 0 00-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3-3a1.5 1.5 0 110-3 1.5 1.5 0 010 3z',
    iconViewBox: '0 0 24 24',
    delay:       200,
  },
  pilot: {
    color:       '#01DE5B',
    border:      'rgba(1,222,91,0.58)',
    borderHov:   'rgba(1,222,91,1.00)',
    cardBg:      'radial-gradient(ellipse 90% 55% at 50% 0%, rgba(1,222,91,0.10) 0%, #09081E 55%, #060518 100%)',
    outerGlow:   '0 0 18px 2px rgba(1,222,91,0.42), 0 0 52px 5px rgba(1,222,91,0.18)',
    outerGlowH:  '0 0 26px 4px rgba(1,222,91,0.62), 0 0 78px 8px rgba(1,222,91,0.26)',
    floorColor:  'rgba(1,222,91,0.24)',
    accentBar:   'linear-gradient(90deg, #01DE5B, #469EFF)',
    body:        'Ready for schools, banks, and youth programs that want to bring real financial education to their communities.',
    // Link / partner icon
    iconPath:    'M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71',
    iconViewBox: '0 0 24 24',
    delay:       300,
  },
}

function BadgeCard({ badge, revealStyle }) {
  const [hovered, setHovered] = useState(false)
  const cfg = BADGE_CONFIG[badge.id]
  if (!cfg) return null

  return (
    <div style={{ ...revealStyle, position: 'relative' }}>

      {/* Floor glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: '-24px', left: '6%', right: '6%', height: '52px',
          background: `radial-gradient(ellipse 80% 100% at 50% 0%, ${cfg.floorColor} 0%, transparent 70%)`,
          filter: 'blur(14px)', pointerEvents: 'none',
        }}
      />

      {/* Outer wrapper — border + glow (no overflow:hidden) */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative', borderRadius: '16px',
          border:     `1.5px solid ${hovered ? cfg.borderHov : cfg.border}`,
          boxShadow:  hovered ? cfg.outerGlowH : cfg.outerGlow,
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          cursor: 'default',
          height: '100%',
        }}
      >
        {/* Inner card */}
        <div
          className="relative flex flex-col gap-5 p-6 overflow-hidden h-full"
          style={{ borderRadius: '14px', background: cfg.cardBg }}
        >
          {/* Top accent bar */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '3px', borderRadius: '14px 14px 0 0',
              background: cfg.accentBar,
              boxShadow: `0 0 10px 1px ${cfg.border}`,
            }}
          />

          {/* Icon ring */}
          <div
            style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: `radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, transparent 70%)`,
              border: `1.5px solid ${cfg.border}`,
              boxShadow: `0 0 16px ${cfg.border}, inset 0 0 12px rgba(255,255,255,0.03)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg
              width="24" height="24"
              viewBox={cfg.iconViewBox}
              fill="none"
              stroke={cfg.color}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ filter: `drop-shadow(0 0 6px ${cfg.color})` }}
            >
              <path d={cfg.iconPath} />
            </svg>
          </div>

          {/* Short accent bar */}
          <div
            aria-hidden="true"
            className="rounded-full"
            style={{ width: '2.25rem', height: '3px', background: cfg.accentBar }}
          />

          {/* Text */}
          <div className="relative flex flex-col gap-2">
            <h3 className="font-karantina text-white leading-snug" style={{ fontSize: '1.3rem' }}>
              {badge.label}
            </h3>
            <p className="font-rem text-body text-text-muted leading-relaxed">
              {cfg.body}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CredibilitySection() {
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
      id="credibility"
      ref={ref}
      aria-label="Credibility and Backing"
      className="relative overflow-hidden py-section"
      style={{ background: '#06011C' }}
    >
      {/* ── Dot grid ─────────────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: GRID, backgroundRepeat: 'repeat' }} />

      {/* ── Top-edge blend ───────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-36"
        style={{ background: 'linear-gradient(to bottom, rgba(4,1,14,0.65) 0%, transparent 100%)', zIndex: 2 }} />

      {/* ── Atmospheric glow blobs ───────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse 68% 44% at 50% 0%, rgba(87,62,251,0.20) 0%, transparent 68%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[110px]"
        style={{ background: 'radial-gradient(ellipse 50% 44% at 92% 8%, rgba(239,0,189,0.14) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[100px]"
        style={{ background: 'radial-gradient(ellipse 38% 50% at 16% 70%, rgba(87,62,251,0.16) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[100px]"
        style={{ background: 'radial-gradient(ellipse 38% 50% at 84% 70%, rgba(1,222,91,0.14) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 44% 36% at 5% 88%, rgba(137,38,231,0.12) 0%, transparent 65%)' }} />

      {/* ── Floating P-coin watermarks ────────────────────────────────── */}
      <img src={COINS.purpleStyled} alt="" aria-hidden="true"
        className="pointer-events-none select-none absolute animate-float"
        style={{ width: '460px', height: '460px', left: '-80px', top: '50%',
          transform: 'translateY(-50%)', objectFit: 'contain', opacity: 0.11,
          filter: 'blur(1px) drop-shadow(0 0 18px rgba(137,38,231,0.55)) drop-shadow(0 0 38px rgba(87,62,251,0.28))',
          animationDelay: '1.2s', animationDuration: '7s', zIndex: 0 }} />
      <img src={COINS.green} alt="" aria-hidden="true"
        className="pointer-events-none select-none absolute animate-float"
        style={{ width: '350px', height: '350px', right: '-65px', top: '40%',
          objectFit: 'contain', opacity: 0.09,
          filter: 'blur(1.5px) drop-shadow(0 0 16px rgba(1,222,91,0.50)) drop-shadow(0 0 32px rgba(1,222,91,0.25))',
          animationDelay: '3.2s', animationDuration: '8s', zIndex: 0 }} />
      <img src={COINS.blue} alt="" aria-hidden="true"
        className="pointer-events-none select-none absolute animate-float"
        style={{ width: '180px', height: '180px', right: '6%', bottom: '12%',
          objectFit: 'contain', opacity: 0.07,
          filter: 'blur(2px) drop-shadow(0 0 12px rgba(70,158,255,0.40))',
          animationDelay: '5.0s', animationDuration: '9.5s', zIndex: 0 }} />

      <div className="section-container relative z-10">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center gap-5 mb-16" style={reveal(0)}>

          <SectionTag>{CREDIBILITY.preTag}</SectionTag>

          <h2 className="font-karantina text-h2-sm lg:text-h2 text-white leading-tight max-w-3xl">
            {CREDIBILITY.headline}
          </h2>

          <div
            aria-hidden="true"
            className="rounded-full"
            style={{
              width: '5rem', height: '4px', marginTop: '-0.25rem',
              background: 'linear-gradient(90deg, #8926E7, #573EFB, #EF00BD)',
              boxShadow:  '0 0 12px rgba(137,38,231,0.55)',
            }}
          />

          <p className="font-rem text-body-lg text-text-muted max-w-2xl leading-relaxed mt-1">
            {CREDIBILITY.body}
          </p>

        </div>

        {/* ── Badge cards — 2×2 on md, 4-col on lg ─────────────────────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
          {CREDIBILITY.badges.map((badge) => (
            <BadgeCard
              key={badge.id}
              badge={badge}
              revealStyle={reveal((BADGE_CONFIG[badge.id]?.delay ?? 0) + 120)}
            />
          ))}
        </div>

        {/* ── EIT Digital note ─────────────────────────────────────────── */}
        <div className="flex justify-center mt-12" style={reveal(580)}>
          <div
            className="flex items-center gap-3 px-5 py-2.5 rounded-full"
            style={{
              background: 'rgba(87,62,251,0.08)',
              border:     '1px solid rgba(87,62,251,0.22)',
              boxShadow:  '0 0 18px rgba(87,62,251,0.14)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="rgba(87,62,251,0.90)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
            </svg>
            <p className="font-rem text-caption text-text-muted">
              Built with support from EIT Digital · Currently in active beta
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
