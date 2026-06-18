// RewardsPage — /rewards
// Updated to match reference images (all 6 sections)

import { useEffect, useRef, useState } from 'react'
import Navbar         from '@/components/layout/Navbar'
import Footer         from '@/components/layout/Footer'
import PageBackground from '@/components/layout/PageBackground'
import CoinBackground from '@/components/layout/CoinBackground'
import { COINS }      from '@/constants/assets'
import { CTA }        from '@/constants/config'

function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } },
      { threshold }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [threshold])
  return [ref, on]
}

const fx = (on, delay = 0) => ({
  opacity:    on ? 1 : 0,
  transform:  on ? 'translateY(0)' : 'translateY(22px)',
  transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
  willChange: 'opacity, transform',
})

const H2_SECTION = { fontSize: 'clamp(2.4rem, 4.8vw, 4rem)', lineHeight: 0.98, letterSpacing: '-0.01em' }
const H2_CTA     = { fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)', lineHeight: 0.98, letterSpacing: '-0.01em' }
const DOT_GRID   = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='0.75' fill='rgba(255%2C255%2C255%2C0.055)'/%3E%3C/svg%3E")`

// ─────────────────────────────────────────────────────────────────────────────
// 1. Hero
// ─────────────────────────────────────────────────────────────────────────────

// Star sparkle dots scattered across the hero background
const HERO_STARS = [
  { top: '8%',  left: '12%',  size: 2.5, opacity: 0.55 },
  { top: '14%', left: '38%',  size: 1.5, opacity: 0.40 },
  { top: '22%', left: '68%',  size: 2,   opacity: 0.50 },
  { top: '32%', left: '88%',  size: 1.5, opacity: 0.35 },
  { top: '52%', left: '92%',  size: 2,   opacity: 0.45 },
  { top: '72%', left: '78%',  size: 1.5, opacity: 0.38 },
  { top: '82%', left: '55%',  size: 2.5, opacity: 0.50 },
  { top: '88%', left: '28%',  size: 1.5, opacity: 0.38 },
  { top: '75%', left: '8%',   size: 2,   opacity: 0.45 },
  { top: '44%', left: '5%',   size: 1.5, opacity: 0.35 },
  { top: '18%', left: '52%',  size: 1,   opacity: 0.30 },
  { top: '60%', left: '42%',  size: 1,   opacity: 0.28 },
]

function RewardsHero() {
  return (
    <section
      aria-labelledby="rewards-hero-heading"
      className="relative overflow-hidden"
      style={{
        minHeight: '92vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '7rem 1.25rem 5rem',
        background: 'radial-gradient(ellipse 110% 80% at 50% 0%, #0E0530 0%, #060115 55%, #040010 100%)',
      }}
    >
      {/* Dot grid texture */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: DOT_GRID, backgroundRepeat: 'repeat', opacity: 0.9 }} />

      {/* Star sparkle dots */}
      {HERO_STARS.map((s, i) => (
        <div key={i} aria-hidden="true" className="pointer-events-none absolute"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, borderRadius: '50%',
            background: '#FFFFFF', opacity: s.opacity,
            boxShadow: `0 0 ${s.size * 3}px rgba(180,160,255,0.80)` }} />
      ))}

      {/* Main purple glow behind headline */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[100px]"
        style={{ background: 'radial-gradient(ellipse 65% 50% at 50% 42%, rgba(137,38,231,0.40) 0%, transparent 65%)' }} />
      {/* Secondary pink glow — left edge */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse 35% 40% at 8% 60%, rgba(239,0,189,0.15) 0%, transparent 65%)' }} />
      {/* Tertiary blue glow — right edge */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse 30% 40% at 92% 55%, rgba(80,119,242,0.13) 0%, transparent 65%)' }} />

      {/* Large P-coin — top-left corner */}
      <img src={COINS.purpleStyled} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden lg:block"
        style={{ width: '620px', height: '620px', left: '-180px', top: '-120px',
          objectFit: 'contain', opacity: 0.16,
          filter: 'blur(0.5px) drop-shadow(0 0 40px rgba(137,38,231,0.65))',
          animationDelay: '0s', animationDuration: '9s', zIndex: 0 }} />

      {/* Large P-coin — bottom-right corner */}
      <img src={COINS.orange} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden lg:block"
        style={{ width: '520px', height: '520px', right: '-160px', bottom: '-100px',
          objectFit: 'contain', opacity: 0.14,
          filter: 'blur(0.5px) drop-shadow(0 0 32px rgba(254,89,52,0.50))',
          animationDelay: '2.5s', animationDuration: '8.5s', zIndex: 0 }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '980px', margin: '0 auto', width: '100%', overflow: 'hidden' }}>

        {/* Badge — neon pill */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            padding: '9px 24px', borderRadius: 9999,
            background: 'rgba(137,38,231,0.10)',
            border: '1.5px solid rgba(137,38,231,0.65)',
            boxShadow: '0 0 20px rgba(137,38,231,0.32), inset 0 0 12px rgba(137,38,231,0.08)',
          }}>
            <span aria-hidden="true" style={{ color: '#A855F7', fontSize: '0.70rem', lineHeight: 1 }}>✦</span>
            <span className="font-rem"
              style={{ fontSize: '0.75rem', color: 'rgba(210,190,255,0.92)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>
              Rewards &amp; Progress
            </span>
            <span aria-hidden="true" style={{ color: '#A855F7', fontSize: '0.70rem', lineHeight: 1 }}>✦</span>
          </div>
        </div>

        {/* Headline */}
        <h1 id="rewards-hero-heading" className="font-karantina"
          style={{ fontSize: 'clamp(3rem, 6vw, 4.75rem)', lineHeight: 0.95, letterSpacing: '-0.01em',
            color: '#F4F0FF',
            textShadow: '0 0 60px rgba(137,38,231,0.30), 0 2px 40px rgba(0,0,0,0.60)',
            marginBottom: '1.25rem',
            width: '100%', overflowWrap: 'normal', wordBreak: 'normal' }}>
          Learn.{' '}
          <span style={{ background: 'linear-gradient(90deg, #EF00BD 0%, #8926E7 48%, #5077F2 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Earn.
          </span>
          {' '}Level up.
        </h1>

        {/* Neon glow bar — horizontal light under headline */}
        <div aria-hidden="true" style={{ position: 'relative', height: '28px', margin: '-0.8rem auto 1.4rem', maxWidth: '680px' }}>
          {/* Wide outer haze */}
          <div style={{ position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 90% 100% at 50% 100%, rgba(137,38,231,0.45) 0%, rgba(239,0,189,0.15) 40%, transparent 75%)',
            filter: 'blur(8px)' }} />
          {/* Bright core line */}
          <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
            width: '60%', height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(239,0,189,0.70) 20%, rgba(137,38,231,0.90) 50%, rgba(80,119,242,0.70) 80%, transparent 100%)',
            borderRadius: 9999, filter: 'blur(1px)' }} />
          {/* Ultra-bright centre dot */}
          <div style={{ position: 'absolute', bottom: '-1px', left: '50%', transform: 'translateX(-50%)',
            width: '80px', height: '4px',
            background: 'rgba(220,180,255,0.95)',
            borderRadius: 9999, filter: 'blur(3px)' }} />
        </div>

        {/* Subtext */}
        <p className="font-rem"
          style={{ fontSize: 'clamp(0.95rem, 1.9vw, 1.1rem)', color: 'rgba(200,182,240,0.75)',
            lineHeight: 1.78, maxWidth: '580px', margin: '0 auto 2.5rem' }}>
          Every mission you complete in PLEARN earns P-Coins — our in-platform reward points.
          Spend them on real vouchers, unlock partner perks, and collect badges that show how far you've come.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* Primary */}
          <a href={CTA.joinBeta} className="font-rem font-semibold"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '1rem 2.5rem', borderRadius: '14px', minWidth: '188px', justifyContent: 'center',
              background: 'linear-gradient(90deg, #EF00BD 0%, #8926E7 42%, #573EFB 78%, #5077F2 100%)',
              boxShadow: '0 0 28px rgba(137,38,231,0.60), 0 0 56px rgba(239,0,189,0.22), 0 8px 24px rgba(0,0,0,0.55)',
              color: '#FFFFFF', fontSize: '1rem', textDecoration: 'none',
              transition: 'opacity 0.2s, transform 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity='0.88'; e.currentTarget.style.transform='translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity='1';    e.currentTarget.style.transform='translateY(0)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true">
              <path d="M13 2 3.09 14.27A1 1 0 0 0 4 16h7l-2 6 11.91-12.27A1 1 0 0 0 20 8h-7z"/>
            </svg>
            Join the Beta
          </a>
          {/* Secondary */}
          <a href="#rewards-how" className="font-rem font-semibold"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
              padding: '1rem 2.5rem', borderRadius: '14px', minWidth: '220px', justifyContent: 'center',
              background: 'rgba(10,4,28,0.60)',
              border: '1.5px solid rgba(137,38,231,0.55)',
              boxShadow: '0 0 18px rgba(137,38,231,0.20), 0 8px 24px rgba(0,0,0,0.50)',
              color: '#FFFFFF', fontSize: '1rem', textDecoration: 'none',
              transition: 'opacity 0.2s, transform 0.2s, border-color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity='0.82'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.borderColor='rgba(137,38,231,0.85)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity='1';    e.currentTarget.style.transform='translateY(0)';   e.currentTarget.style.borderColor='rgba(137,38,231,0.55)' }}>
            See How It Works
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. How Earning Works
// ─────────────────────────────────────────────────────────────────────────────
const EARN_STEPS = [
  {
    num: '01', color: '#8926E7',
    border: 'rgba(137,38,231,0.60)', outerGlow: 'rgba(137,38,231,0.35)', farGlow: 'rgba(137,38,231,0.10)',
    cardBg: 'linear-gradient(145deg, rgba(80,18,140,0.30) 0%, rgba(8,4,22,0.97) 55%)',
    iconBg: 'rgba(60,8,115,0.92)', iconShadow: '0 0 20px rgba(137,38,231,0.65), 0 4px 14px rgba(0,0,0,0.60)',
    numClr: 'rgba(137,38,231,0.09)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8926E7"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    title: 'Complete a Mission',
    body: 'Progress through tasks, missions, and levels focused on budgeting, saving, credit, and everyday money decisions. Every completed mission earns P-Coins.',
  },
  {
    num: '02', color: '#469EFF',
    border: 'rgba(70,158,255,0.60)', outerGlow: 'rgba(70,158,255,0.32)', farGlow: 'rgba(70,158,255,0.09)',
    cardBg: 'linear-gradient(145deg, rgba(24,50,180,0.26) 0%, rgba(5,8,24,0.97) 55%)',
    iconBg: 'rgba(16,38,160,0.92)', iconShadow: '0 0 20px rgba(70,158,255,0.60), 0 4px 14px rgba(0,0,0,0.60)',
    numClr: 'rgba(70,158,255,0.09)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#469EFF"
        strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2" fill="#469EFF" stroke="none"/>
      </svg>
    ),
    title: 'Stack Your Points',
    body: 'Your P-Coin balance grows with every mission, streak, and badge you unlock. Progress is always visible on your dashboard.',
  },
  {
    num: '03', color: '#01DE5B',
    border: 'rgba(1,200,80,0.55)', outerGlow: 'rgba(1,200,80,0.28)', farGlow: 'rgba(1,200,80,0.08)',
    cardBg: 'linear-gradient(145deg, rgba(0,68,26,0.28) 0%, rgba(4,14,10,0.97) 55%)',
    iconBg: 'rgba(0,62,22,0.92)', iconShadow: '0 0 20px rgba(1,222,91,0.60), 0 4px 14px rgba(0,0,0,0.60)',
    numClr: 'rgba(1,222,91,0.09)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#01DE5B"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 12 20 22 4 22 4 12"/>
        <rect x="2" y="7" width="20" height="5" rx="1"/>
        <line x1="12" y1="22" x2="12" y2="7"/>
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
      </svg>
    ),
    title: 'Redeem for Real Rewards',
    body: 'Swap P-Coins for vouchers, partner discounts, and exclusive beta rewards — or unlock premium content inside the game.',
  },
]

function HowEarningWorks() {
  const [ref, on] = useReveal()
  return (
    <section id="rewards-how" ref={ref} aria-labelledby="rewards-how-heading"
      className="relative overflow-hidden"
      style={{ padding: '5.5rem 1.25rem 7rem', background: '#06011A' }}>

      {/* Dot grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: DOT_GRID, backgroundRepeat: 'repeat' }} />

      {/* Top fade */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-32 z-[2]"
        style={{ background: 'linear-gradient(to bottom, rgba(4,1,12,0.75) 0%, transparent 100%)' }} />

      {/* Ambient glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[110px]"
        style={{ background: 'radial-gradient(ellipse 55% 40% at 50% 8%, rgba(137,38,231,0.26) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[100px]"
        style={{ background: 'radial-gradient(ellipse 35% 45% at 4% 65%, rgba(70,158,255,0.14) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[100px]"
        style={{ background: 'radial-gradient(ellipse 35% 45% at 96% 65%, rgba(1,222,91,0.12) 0%, transparent 65%)' }} />

      {/* Horizon glow across card bottom — matches reference */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 blur-[60px]"
        style={{ height: '200px',
          background: 'linear-gradient(90deg, rgba(137,38,231,0.14) 0%, rgba(70,158,255,0.10) 50%, rgba(1,222,91,0.12) 100%)',
          zIndex: 0 }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem', ...fx(on, 0) }}>
          <p className="section-tag" style={{ marginBottom: '1rem', justifyContent: 'center' }}>
            <span aria-hidden="true" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
              background: '#8926E7', boxShadow: '0 0 6px rgba(137,38,231,0.85)', marginRight: 8, flexShrink: 0 }} />
            How It Works
          </p>
          <h2 id="rewards-how-heading" className="font-karantina"
            style={{ ...H2_SECTION, color: '#F4F0FF', textShadow: '0 0 50px rgba(137,38,231,0.18)', marginBottom: 0 }}>
            Three steps from mission to reward.
          </h2>
        </div>

        {/* Cards — 3 col desktop, 1 col mobile. Equal height via grid stretch. */}
        <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: '1.25rem', alignItems: 'stretch' }}>
          {EARN_STEPS.map((s, i) => (
            <div key={s.title} style={{ ...fx(on, 80 + i * 80),
              position: 'relative', overflow: 'hidden',
              background: s.cardBg,
              border: `1.5px solid ${s.border}`,
              borderRadius: '18px',
              padding: '2.25rem 2rem 2rem',
              boxShadow: [`0 0 24px ${s.outerGlow}`, `0 0 60px ${s.farGlow}`,
                'inset 0 1px 0 rgba(255,255,255,0.07)', '0 18px 48px rgba(0,0,0,0.70)'].join(', '),
              display: 'flex', flexDirection: 'column' }}>

              {/* Large faint number — top right */}
              <span aria-hidden="true" className="font-karantina select-none pointer-events-none absolute"
                style={{ top: '-0.5rem', right: '0.75rem', fontSize: '7rem', lineHeight: 1,
                  color: s.numClr, zIndex: 0 }}>
                {s.num}
              </span>

              {/* Icon circle */}
              <div style={{ width: 72, height: 72, borderRadius: '50%',
                background: s.iconBg, boxShadow: s.iconShadow,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginBottom: '1.5rem', position: 'relative', zIndex: 2 }}>
                {s.icon}
              </div>

              {/* Title */}
              <h3 className="font-rem"
                style={{ fontWeight: 700, fontSize: '1.08rem', color: '#FFFFFF',
                  lineHeight: 1.25, marginBottom: '0.55rem', position: 'relative', zIndex: 2 }}>
                {s.title}
              </h3>

              {/* Neon accent line */}
              <div style={{ width: '36px', height: '2.5px', background: s.color,
                boxShadow: `0 0 8px ${s.color}, 0 0 18px ${s.outerGlow}`,
                borderRadius: 9999, marginBottom: '0.85rem', flexShrink: 0 }} />

              {/* Body */}
              <p className="font-rem"
                style={{ fontSize: '0.88rem', color: 'rgba(160,145,195,0.72)',
                  lineHeight: 1.78, flex: 1, position: 'relative', zIndex: 2 }}>
                {s.body}
              </p>

              {/* Bottom card glow */}
              <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px',
                background: `radial-gradient(ellipse 60% 100% at 50% 100%, ${s.farGlow} 0%, transparent 65%)`,
                pointerEvents: 'none', zIndex: 1 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. What You Can Earn — 2×2 grid, animated neon border, corner accent
// ─────────────────────────────────────────────────────────────────────────────
const REWARD_TYPES = [
  {
    num: '01', color: '#8926E7', spinDuration: '6.5s',
    border: 'rgba(137,38,231,0.65)', outerGlow: 'rgba(137,38,231,0.38)', farGlow: 'rgba(137,38,231,0.11)',
    cardBg: 'linear-gradient(135deg, rgba(90,20,160,0.30) 0%, rgba(8,4,22,0.97) 55%)',
    iconBg: 'rgba(65,10,120,0.92)', iconShadow: '0 0 20px rgba(137,38,231,0.65), 0 4px 14px rgba(0,0,0,0.60)',
    numClr: 'rgba(137,38,231,0.11)',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#8926E7"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
        <line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
    ),
    title: 'Vouchers & Discounts',
    body: "Redeem your P-Coins for vouchers with PLEARN's partner network — from everyday essentials to digital services.",
  },
  {
    num: '02', color: '#469EFF', spinDuration: '7.2s',
    border: 'rgba(70,158,255,0.65)', outerGlow: 'rgba(70,158,255,0.35)', farGlow: 'rgba(70,158,255,0.10)',
    cardBg: 'linear-gradient(135deg, rgba(28,50,190,0.28) 0%, rgba(6,8,24,0.97) 55%)',
    iconBg: 'rgba(20,40,160,0.92)', iconShadow: '0 0 20px rgba(70,158,255,0.60), 0 4px 14px rgba(0,0,0,0.60)',
    numClr: 'rgba(70,158,255,0.11)',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#469EFF"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="6"/>
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    title: 'Achievement Badges',
    body: 'Earn badges tied to specific skills: budgeting mastery, saving streaks, credit clarity. Each one proves something real.',
  },
  {
    num: '03', color: '#01DE5B', spinDuration: '7.8s',
    border: 'rgba(1,200,80,0.60)', outerGlow: 'rgba(1,200,80,0.32)', farGlow: 'rgba(1,200,80,0.09)',
    cardBg: 'linear-gradient(135deg, rgba(0,68,28,0.28) 0%, rgba(4,14,10,0.97) 55%)',
    iconBg: 'rgba(0,62,22,0.92)', iconShadow: '0 0 22px rgba(1,222,91,0.65), 0 4px 14px rgba(0,0,0,0.60)',
    numClr: 'rgba(1,222,91,0.10)',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#01DE5B"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
      </svg>
    ),
    title: 'Unlockable Content',
    body: 'Use P-Coins to access advanced missions, bonus scenarios, and premium learning paths inside the game.',
  },
  {
    num: '04', color: '#EF00BD', spinDuration: '8.4s',
    border: 'rgba(239,0,189,0.60)', outerGlow: 'rgba(239,0,189,0.30)', farGlow: 'rgba(239,0,189,0.09)',
    cardBg: 'linear-gradient(135deg, rgba(140,0,90,0.24) 0%, rgba(18,4,16,0.97) 55%)',
    iconBg: 'rgba(110,0,72,0.92)', iconShadow: '0 0 20px rgba(239,0,189,0.60), 0 4px 14px rgba(0,0,0,0.60)',
    numClr: 'rgba(239,0,189,0.10)',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#EF00BD"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 12 20 22 4 22 4 12"/>
        <rect x="2" y="7" width="20" height="5" rx="1"/>
        <line x1="12" y1="22" x2="12" y2="7"/>
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
      </svg>
    ),
    title: 'Partner Perks',
    body: "PLEARN's growing partner network offers exclusive deals to high-progress users — early access, exclusive offers, and learning-linked perks.",
  },
]

function WhatYouCanEarn() {
  const [ref, on] = useReveal()
  return (
    <section id="rewards-earn" ref={ref} aria-labelledby="rewards-earn-heading"
      className="relative overflow-hidden"
      style={{ padding: '5.5rem 1.25rem 7rem', background: '#06011A' }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: DOT_GRID, backgroundRepeat: 'repeat' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-36 z-[2]"
        style={{ background: 'linear-gradient(to bottom, rgba(4,1,12,0.70) 0%, transparent 100%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[110px]"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 8%, rgba(137,38,231,0.22) 0%, transparent 70%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 38% 50% at 5% 55%, rgba(239,0,189,0.11) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 38% 50% at 95% 55%, rgba(1,222,91,0.10) 0%, transparent 65%)' }} />

      <img src={COINS.green} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden lg:block"
        style={{ width: '400px', height: '400px', left: '-100px', top: '50%', transform: 'translateY(-50%)',
          objectFit: 'contain', opacity: 0.09,
          filter: 'blur(1.5px) drop-shadow(0 0 18px rgba(1,222,91,0.40))',
          animationDelay: '1s', animationDuration: '8s', zIndex: 0 }} />
      <img src={COINS.magenta} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden lg:block"
        style={{ width: '360px', height: '360px', right: '-90px', top: '40%', transform: 'translateY(-50%)',
          objectFit: 'contain', opacity: 0.09,
          filter: 'blur(1.5px) drop-shadow(0 0 16px rgba(239,0,189,0.40))',
          animationDelay: '3s', animationDuration: '7.5s', zIndex: 0 }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem', ...fx(on, 0) }}>
          <p className="section-tag" style={{ marginBottom: '1rem', justifyContent: 'center' }}>
            <span aria-hidden="true" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
              background: '#8926E7', boxShadow: '0 0 6px rgba(137,38,231,0.85)', marginRight: 8, flexShrink: 0 }} />
            What You Earn
          </p>
          <h2 id="rewards-earn-heading" className="font-karantina"
            style={{ ...H2_SECTION, color: '#F4F0FF', textShadow: '0 0 50px rgba(137,38,231,0.18)', marginBottom: '1rem' }}>
            Rewards that{' '}
            <span style={{ background: 'linear-gradient(90deg, #EF00BD 0%, #8926E7 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              actually mean
            </span>
            {' '}something.
          </h2>
          <p className="font-rem"
            style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)', color: 'rgba(190,175,230,0.68)',
              lineHeight: 1.7, maxWidth: '520px', margin: '0 auto' }}>
            P-Coins aren't points that expire in your inbox. They unlock things you'd actually want.
          </p>
        </div>

        {/* Grid — constrained width, centred */}
        <div className="grid grid-cols-1 sm:grid-cols-2"
          style={{ gap: '1rem', maxWidth: '900px', margin: '0 auto' }}>
          {REWARD_TYPES.map((r, i) => (
            <div key={r.title} style={{ ...fx(on, 80 + i * 70),
              position: 'relative', borderRadius: '16px', overflow: 'hidden',
              border: `1.5px solid ${r.border}`,
              background: r.cardBg,
              boxShadow: [`0 0 22px ${r.outerGlow}`, `0 0 60px ${r.farGlow}`, '0 12px 40px rgba(0,0,0,0.60)'].join(', '),
              display: 'flex', alignItems: 'center', minHeight: '150px',
              padding: '1.5rem 1.75rem', gap: '1.25rem' }}>

              {/* Subtle dot texture — upper-right quadrant */}
              <div aria-hidden="true" style={{ position: 'absolute', top: 0, right: 0, width: '55%', height: '55%',
                backgroundImage: DOT_GRID, backgroundRepeat: 'repeat', opacity: 0.55, pointerEvents: 'none' }} />

              {/* Watermark number — top right */}
              <span aria-hidden="true" className="font-karantina select-none pointer-events-none absolute"
                style={{ top: '0.25rem', right: '0.9rem', fontSize: '5rem', lineHeight: 1, color: r.numClr, zIndex: 1 }}>
                {r.num}
              </span>

              {/* Filled triangle corner accent — bottom right */}
              <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, right: 0,
                width: 32, height: 32, background: r.color,
                clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                opacity: 0.50, pointerEvents: 'none' }} />

              {/* Icon circle — vertically centred */}
              <div style={{ width: 76, height: 76, borderRadius: '50%', background: r.iconBg,
                border: `1.5px solid ${r.border}`,
                boxShadow: r.iconShadow, display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, position: 'relative', zIndex: 2 }}>
                {r.icon}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 2 }}>
                <h3 className="font-rem"
                  style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.3, marginBottom: '0.45rem' }}>
                  {r.title}
                </h3>
                <div style={{ width: '32px', height: '2px', background: r.color,
                  boxShadow: `0 0 7px ${r.color}`, borderRadius: 9999, marginBottom: '0.65rem' }} />
                <p className="font-rem"
                  style={{ fontSize: '0.85rem', color: 'rgba(160,145,195,0.72)', lineHeight: 1.7 }}>
                  {r.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Badges & Progress
// ─────────────────────────────────────────────────────────────────────────────
const BADGE_TIERS = [
  {
    tier: 'Starter', color: '#8926E7', locked: false,
    border: 'rgba(137,38,231,0.65)', outerGlow: 'rgba(137,38,231,0.38)', farGlow: 'rgba(137,38,231,0.12)',
    cardBg: 'linear-gradient(155deg, rgba(90,20,160,0.32) 0%, rgba(8,4,22,0.96) 60%)',
    iconBg: 'rgba(55,8,110,0.95)',
    // iconShadow = inner fill + middle ring + outer halo
    iconShadow: '0 0 0 6px rgba(137,38,231,0.14), 0 0 0 12px rgba(137,38,231,0.06), 0 0 28px rgba(137,38,231,0.55)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8926E7"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    description: 'Your first step into financial literacy.',
    badges: ['First Mission Completed', 'First Budget Built', 'Money Basics Cleared'],
    sparkles: [
      { top: '8%',  left: '68%', size: 2.5, opacity: 0.42 },
      { top: '20%', left: '88%', size: 1.5, opacity: 0.30 },
      { top: '5%',  left: '50%', size: 1.5, opacity: 0.28 },
      { top: '35%', left: '92%', size: 2,   opacity: 0.24 },
      { top: '14%', left: '78%', size: 1,   opacity: 0.20 },
    ],
  },
  {
    tier: 'Builder', color: '#469EFF', locked: false,
    border: 'rgba(70,158,255,0.60)', outerGlow: 'rgba(70,158,255,0.35)', farGlow: 'rgba(70,158,255,0.10)',
    cardBg: 'linear-gradient(155deg, rgba(20,45,180,0.30) 0%, rgba(5,8,24,0.96) 60%)',
    iconBg: 'rgba(14,34,155,0.95)',
    iconShadow: '0 0 0 6px rgba(70,158,255,0.14), 0 0 0 12px rgba(70,158,255,0.06), 0 0 28px rgba(70,158,255,0.55)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#469EFF"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    description: 'Building real financial habits, one mission at a time.',
    badges: ['10 Missions Completed', 'Saving Streak Active', 'Credit Clarity Earned'],
    sparkles: [
      { top: '10%', left: '72%', size: 2,   opacity: 0.38 },
      { top: '6%',  left: '55%', size: 1.5, opacity: 0.26 },
      { top: '28%', left: '90%', size: 2.5, opacity: 0.28 },
      { top: '18%', left: '84%', size: 1,   opacity: 0.20 },
      { top: '40%', left: '95%', size: 1.5, opacity: 0.18 },
    ],
  },
  {
    tier: 'Master', color: '#FE5934', locked: true,
    border: 'rgba(254,89,52,0.52)', outerGlow: 'rgba(254,89,52,0.28)', farGlow: 'rgba(254,89,52,0.09)',
    cardBg: 'linear-gradient(155deg, rgba(130,40,10,0.26) 0%, rgba(18,6,4,0.96) 60%)',
    iconBg: 'rgba(100,24,6,0.95)',
    iconShadow: '0 0 0 6px rgba(254,89,52,0.14), 0 0 0 12px rgba(254,89,52,0.06), 0 0 28px rgba(254,89,52,0.50)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FE5934"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 6l4 10h12l4-10-5 4-5-8-5 8-5-4z"/>
        <line x1="6" y1="20" x2="18" y2="20"/>
      </svg>
    ),
    description: 'Full mastery. The highest tier in the PLEARN journey.',
    badges: ['Full Module Complete', 'Leaderboard Ranked', 'Challenge Unlocked'],
    sparkles: [
      { top: '7%',  left: '62%', size: 2,   opacity: 0.35 },
      { top: '22%', left: '86%', size: 1.5, opacity: 0.26 },
      { top: '12%', left: '76%', size: 2.5, opacity: 0.28 },
      { top: '5%',  left: '48%', size: 1,   opacity: 0.20 },
      { top: '34%', left: '93%', size: 1.5, opacity: 0.18 },
    ],
  },
]

function BadgesAndProgress() {
  const [ref, on] = useReveal()
  return (
    <section id="rewards-badges" ref={ref} aria-labelledby="badges-heading"
      className="relative overflow-hidden"
      style={{ padding: '5.5rem 1.25rem 7rem', background: '#080220' }}>

      {/* Dot grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: DOT_GRID, backgroundRepeat: 'repeat' }} />
      {/* Top fade */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-36 z-[2]"
        style={{ background: 'linear-gradient(to bottom, rgba(5,2,16,0.72) 0%, transparent 100%)' }} />
      {/* Ambient glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[110px]"
        style={{ background: 'radial-gradient(ellipse 60% 45% at 50% 8%, rgba(137,38,231,0.26) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 35% 50% at 92% 60%, rgba(254,89,52,0.12) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 30% 45% at 8% 60%, rgba(137,38,231,0.10) 0%, transparent 65%)' }} />

      {/* Edge coins — stays well outside card area */}
      <img src={COINS.purpleStyled} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden lg:block"
        style={{ width: '360px', height: '360px', left: '-120px', top: '50%', transform: 'translateY(-50%)',
          objectFit: 'contain', opacity: 0.09,
          filter: 'blur(1.5px) drop-shadow(0 0 18px rgba(137,38,231,0.40))',
          animationDelay: '0s', animationDuration: '9s', zIndex: 0 }} />
      <img src={COINS.orange} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden lg:block"
        style={{ width: '320px', height: '320px', right: '-100px', top: '50%', transform: 'translateY(-50%)',
          objectFit: 'contain', opacity: 0.09,
          filter: 'blur(1.5px) drop-shadow(0 0 18px rgba(254,89,52,0.40))',
          animationDelay: '2s', animationDuration: '8.5s', zIndex: 0 }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem', ...fx(on, 0) }}>
          <p className="section-tag" style={{ marginBottom: '1rem', justifyContent: 'center' }}>
            <span aria-hidden="true" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
              background: '#8926E7', boxShadow: '0 0 6px rgba(137,38,231,0.85)', marginRight: 8, flexShrink: 0 }} />
            Achievement System
          </p>
          <h2 id="badges-heading" className="font-karantina"
            style={{ ...H2_SECTION, color: '#F4F0FF', textShadow: '0 0 50px rgba(137,38,231,0.18)', marginBottom: '1rem' }}>
            Your progress is always visible.
          </h2>
          <p className="font-rem"
            style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)', color: 'rgba(190,175,230,0.68)',
              lineHeight: 1.75, maxWidth: '560px', margin: '0 auto' }}>
            PLEARN tracks every milestone. Badges reflect real knowledge — not just time spent.
            The more you complete, the more you unlock.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: '1.25rem', alignItems: 'stretch' }}>
          {BADGE_TIERS.map((t, i) => (
            <div key={t.tier} style={{ ...fx(on, 80 + i * 80),
              position: 'relative', overflow: 'hidden',
              background: t.cardBg,
              border: `1.5px solid ${t.border}`,
              borderRadius: '18px',
              padding: '1.75rem 1.75rem 1.75rem',
              boxShadow: [`0 0 26px ${t.outerGlow}`, `0 0 65px ${t.farGlow}`,
                'inset 0 1px 0 rgba(255,255,255,0.06)', '0 18px 48px rgba(0,0,0,0.70)'].join(', '),
              display: 'flex', flexDirection: 'column' }}>

              {/* COMING SOON pill — absolute top-right, Master only */}
              {t.locked && (
                <div aria-label="Coming soon" style={{ position: 'absolute', top: '1.1rem', right: '1.1rem',
                  padding: '3px 10px', borderRadius: 9999,
                  background: 'rgba(254,89,52,0.18)', border: '1px solid rgba(254,89,52,0.55)',
                  boxShadow: '0 0 10px rgba(254,89,52,0.22)' }}>
                  <span className="font-rem" style={{ fontSize: '0.60rem', color: '#FE7A5A',
                    fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase' }}>
                    Coming Soon
                  </span>
                </div>
              )}

              {/* ── Card top: icon + title + description ── */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem', marginBottom: '1.25rem' }}>

                {/* Icon circle with multi-ring halo */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  {/* Outer halo ring */}
                  <div aria-hidden="true" style={{ position: 'absolute', inset: '-7px', borderRadius: '50%',
                    border: `1px solid ${t.border}`, opacity: 0.35 }} />
                  {/* Icon circle */}
                  <div style={{ width: 74, height: 74, borderRadius: '50%',
                    background: t.iconBg,
                    border: `1.5px solid ${t.border}`,
                    boxShadow: t.iconShadow,
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {t.icon}
                  </div>
                </div>

                {/* Title + description */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 className="font-karantina"
                    style={{ fontSize: '2.1rem', lineHeight: 1.0, color: '#FFFFFF',
                      marginBottom: '0.3rem', letterSpacing: '-0.01em' }}>
                    {t.tier}
                  </h3>
                  <p className="font-rem"
                    style={{ fontSize: '0.82rem', color: 'rgba(180,165,215,0.65)', lineHeight: 1.55 }}>
                    {t.description}
                  </p>
                </div>
              </div>

              {/* Accent divider line */}
              <div style={{ height: '1px',
                background: `linear-gradient(90deg, ${t.border} 0%, transparent 85%)`,
                marginBottom: '1.1rem', flexShrink: 0 }} />

              {/* Checklist */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1,
                display: 'flex', flexDirection: 'column' }}>
                {t.badges.map((b, bi) => (
                  <li key={b}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem',
                      padding: '0.65rem 0' }}>
                      {/* Icon: filled circle+check for unlocked; lock outline for locked */}
                      {t.locked ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                          stroke={`${t.color}99`} strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                          <rect x="3" y="11" width="18" height="11" rx="2"/>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                          <circle cx="9" cy="9" r="9" fill={t.color} fillOpacity="0.80"/>
                          <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="#FFFFFF" strokeWidth="1.7"
                            strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                      <span className="font-rem" style={{ fontSize: '0.86rem', lineHeight: 1.4,
                        color: t.locked ? 'rgba(155,140,180,0.45)' : 'rgba(200,188,235,0.82)' }}>
                        {b}
                      </span>
                    </div>
                    {/* Row divider — between items, not after last */}
                    {bi < t.badges.length - 1 && (
                      <div style={{ height: '1px',
                        background: `linear-gradient(90deg, transparent 0%, ${t.border} 30%, ${t.border} 70%, transparent 100%)`,
                        opacity: 0.38 }} />
                    )}
                  </li>
                ))}
              </ul>

              {/* Bottom card glow */}
              <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px',
                background: `radial-gradient(ellipse 60% 100% at 50% 100%, ${t.farGlow} 0%, transparent 65%)`,
                pointerEvents: 'none' }} />

              {/* Sparkle particles — faint glowing dots scattered in upper/side card area */}
              {t.sparkles.map((sp, si) => (
                <div key={si} aria-hidden="true" style={{
                  position: 'absolute', top: sp.top, left: sp.left,
                  width: sp.size, height: sp.size, borderRadius: '50%',
                  background: t.color,
                  opacity: sp.opacity,
                  boxShadow: `0 0 ${sp.size * 2.5}px ${t.color}, 0 0 ${sp.size * 5}px ${t.outerGlow}`,
                  pointerEvents: 'none', zIndex: 0,
                }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. Partner Rewards — icon | vertical divider | content
// ─────────────────────────────────────────────────────────────────────────────
const PARTNER_PROPS = [
  {
    color: '#5077F2',
    border: 'rgba(80,119,242,0.55)', outerGlow: 'rgba(80,119,242,0.30)', farGlow: 'rgba(80,119,242,0.09)',
    cardBg: 'linear-gradient(145deg, rgba(40,60,200,0.24) 0%, rgba(6,8,24,0.97) 55%)',
    iconBg: 'rgba(28,44,170,0.90)', iconShadow: '0 0 18px rgba(80,119,242,0.60), 0 4px 12px rgba(0,0,0,0.55)',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5077F2"
        strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2" fill="#5077F2" stroke="none"/>
      </svg>
    ),
    title: 'Contextual Reach',
    body: 'Your reward appears when a user completes a mission that aligns with what your brand offers. Timing that makes sense — not just impressions.',
  },
  {
    color: '#8926E7',
    border: 'rgba(137,38,231,0.55)', outerGlow: 'rgba(137,38,231,0.30)', farGlow: 'rgba(137,38,231,0.09)',
    cardBg: 'linear-gradient(145deg, rgba(80,18,140,0.24) 0%, rgba(8,4,22,0.97) 55%)',
    iconBg: 'rgba(60,8,115,0.90)', iconShadow: '0 0 18px rgba(137,38,231,0.60), 0 4px 12px rgba(0,0,0,0.55)',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8926E7"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 9H4a2 2 0 0 0 0 4h2"/>
        <path d="M18 9h2a2 2 0 0 1 0 4h-2"/>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
        <path d="M9 21h6"/><path d="M12 17v4"/>
      </svg>
    ),
    title: 'Brand Association',
    body: 'Users connect your name to growth, achievement, and positive progress — not just another ad. Be part of their financial journey.',
  },
  {
    color: '#01DE5B',
    border: 'rgba(1,200,80,0.50)', outerGlow: 'rgba(1,200,80,0.26)', farGlow: 'rgba(1,200,80,0.08)',
    cardBg: 'linear-gradient(145deg, rgba(0,68,26,0.24) 0%, rgba(4,14,10,0.97) 55%)',
    iconBg: 'rgba(0,62,22,0.90)', iconShadow: '0 0 18px rgba(1,222,91,0.55), 0 4px 12px rgba(0,0,0,0.55)',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#01DE5B"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6"  y1="20" x2="6"  y2="14"/>
      </svg>
    ),
    title: 'Trackable Engagement',
    body: 'Monitor redemptions and mission-linked interactions. See how your brand performs inside the learning experience, with clear results.',
  },
]

function PartnerRewards() {
  const [ref, on] = useReveal()
  return (
    <section id="rewards-partners" ref={ref} aria-labelledby="partners-heading"
      className="relative overflow-hidden"
      style={{ padding: '5.5rem 1.25rem 7rem', background: '#06011A' }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: DOT_GRID, backgroundRepeat: 'repeat' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-36 z-[2]"
        style={{ background: 'linear-gradient(to bottom, rgba(4,1,12,0.70) 0%, transparent 100%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[110px]"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 10%, rgba(80,119,242,0.22) 0%, transparent 70%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 38% 50% at 5% 55%, rgba(137,38,231,0.12) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 38% 50% at 95% 55%, rgba(1,222,91,0.10) 0%, transparent 65%)' }} />

      <img src={COINS.purple} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden lg:block"
        style={{ width: '460px', height: '460px', left: '-120px', top: '40%', transform: 'translateY(-50%)',
          objectFit: 'contain', opacity: 0.10,
          filter: 'blur(1px) drop-shadow(0 0 20px rgba(137,38,231,0.45))',
          animationDelay: '0.8s', animationDuration: '9s', zIndex: 0 }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem', ...fx(on, 0) }}>
          <p className="section-tag" style={{ marginBottom: '1rem', justifyContent: 'center' }}>
            <span aria-hidden="true" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
              background: '#5077F2', boxShadow: '0 0 6px rgba(80,119,242,0.85)', marginRight: 8, flexShrink: 0 }} />
            For Partners
          </p>
          {/* Headline with gradient on "money skills." */}
          <h2 id="partners-heading" className="font-karantina"
            style={{ ...H2_SECTION, color: '#F4F0FF', textShadow: '0 0 50px rgba(80,119,242,0.18)', marginBottom: '1rem' }}>
            Reach users who are actively building{' '}
            <span style={{ background: 'linear-gradient(90deg, #EF00BD 0%, #8926E7 45%, #469EFF 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              money skills.
            </span>
          </h2>
          <p className="font-rem"
            style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)', color: 'rgba(190,175,230,0.68)',
              lineHeight: 1.7, maxWidth: '570px', margin: '0 auto' }}>
            PLEARN connects your brand to a financially curious, motivated audience — at the exact moment they're forming new habits. Reward their progress, and they'll remember you for it.
          </p>
        </div>

        {/* Cards: icon | vertical divider | content */}
        <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: '1.25rem', marginBottom: '3rem' }}>
          {PARTNER_PROPS.map((p, i) => (
            <div key={p.title} style={{ ...fx(on, 80 + i * 80), position: 'relative', overflow: 'hidden',
              background: p.cardBg, border: `1.5px solid ${p.border}`, borderRadius: '16px',
              padding: '1.75rem',
              boxShadow: [`0 0 0 1px ${p.border}`, `0 0 26px ${p.outerGlow}`,
                `0 0 65px ${p.farGlow}`, '0 16px 44px rgba(0,0,0,0.65)'].join(', '),
              display: 'flex', alignItems: 'center', gap: '1.25rem' }}>

              {/* Icon circle */}
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: p.iconBg,
                boxShadow: p.iconShadow, display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0 }}>
                {p.icon}
              </div>

              {/* Vertical divider */}
              <div aria-hidden="true" style={{ width: 1, height: 72, background: p.border, flexShrink: 0 }} />

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 className="font-rem"
                  style={{ fontSize: '1.02rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.3, marginBottom: '0.45rem' }}>
                  {p.title}
                </h3>
                <div style={{ width: '28px', height: '2px', background: p.color,
                  boxShadow: `0 0 8px ${p.color}`, borderRadius: 9999, marginBottom: '0.65rem' }} />
                <p className="font-rem"
                  style={{ fontSize: '0.84rem', color: 'rgba(160,145,195,0.72)', lineHeight: 1.72 }}>
                  {p.body}
                </p>
              </div>

              <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '55px',
                background: `radial-gradient(ellipse 55% 100% at 50% 100%, ${p.farGlow} 0%, transparent 70%)`,
                pointerEvents: 'none' }} />
            </div>
          ))}
        </div>

        {/* Partner CTA */}
        <div style={{ ...fx(on, 300), textAlign: 'center' }}>
          <a href="mailto:info@plearn.io?subject=Rewards%20Partner%20Enquiry"
            className="font-rem font-semibold"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.95rem 2.25rem', borderRadius: '12px',
              background: 'rgba(80,119,242,0.10)', border: '1.5px solid rgba(80,119,242,0.50)',
              boxShadow: '0 0 20px rgba(80,119,242,0.22), 0 6px 22px rgba(0,0,0,0.50)',
              color: '#FFFFFF', fontSize: '1rem', textDecoration: 'none',
              transition: 'opacity 0.2s, transform 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity='0.82'; e.currentTarget.style.transform='translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity='1'; e.currentTarget.style.transform='translateY(0)' }}>
            Start a Pilot
          </a>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. Closing CTA
// ─────────────────────────────────────────────────────────────────────────────
const REWARDS_CTA_GRID = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='0.75' fill='rgba(255%2C255%2C255%2C0.050)'/%3E%3C/svg%3E")`

function RewardsCTA() {
  const [ref, on] = useReveal(0.2)
  return (
    <section id="rewards-cta" ref={ref} aria-labelledby="rewards-cta-heading"
      className="relative overflow-hidden"
      style={{ padding: '8rem 1.25rem 9rem', background: '#060115', textAlign: 'center' }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: REWARDS_CTA_GRID, backgroundRepeat: 'repeat' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[110px]"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(137,38,231,0.30) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 40% 45% at 12% 40%, rgba(239,0,189,0.12) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 40% 45% at 88% 40%, rgba(1,222,91,0.10) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-40 z-[2]"
        style={{ background: 'linear-gradient(to bottom, rgba(4,1,12,0.80) 0%, transparent 100%)' }} />

      <img src={COINS.purpleStyled} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden lg:block"
        style={{ width: '520px', height: '520px', left: '-150px', top: '50%', transform: 'translateY(-50%)',
          objectFit: 'contain', opacity: 0.11,
          filter: 'blur(1px) drop-shadow(0 0 28px rgba(137,38,231,0.55))',
          animationDelay: '0s', animationDuration: '9s', zIndex: 0 }} />
      <img src={COINS.orange} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden lg:block"
        style={{ width: '460px', height: '460px', right: '-130px', top: '50%', transform: 'translateY(-50%)',
          objectFit: 'contain', opacity: 0.10,
          filter: 'blur(1.5px) drop-shadow(0 0 24px rgba(254,89,52,0.45))',
          animationDelay: '3s', animationDuration: '8.5s', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '820px', margin: '0 auto' }}>
        <div style={fx(on, 0)}>
          {/* Pill badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 20px',
            borderRadius: 9999, background: 'rgba(137,38,231,0.06)', border: '1.5px solid rgba(137,38,231,0.55)',
            boxShadow: '0 0 16px rgba(137,38,231,0.28), inset 0 0 12px rgba(137,38,231,0.06)',
            marginBottom: '2.25rem' }}>
            <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: '50%', background: '#8926E7',
              boxShadow: '0 0 8px rgba(137,38,231,0.95), 0 0 16px rgba(137,38,231,0.55)',
              display: 'inline-block', flexShrink: 0 }} />
            <span className="font-rem" style={{ fontSize: '0.75rem', color: 'rgba(200,165,255,0.90)',
              letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
              Now in Active Beta
            </span>
          </div>

          <h2 id="rewards-cta-heading" className="font-karantina"
            style={{ ...H2_CTA, color: '#F4F0FF', textShadow: '0 0 80px rgba(137,38,231,0.22)', marginBottom: 0 }}>
            Start earning from
            <br />
            <span style={{ background: 'linear-gradient(90deg, #EF00BD 0%, #8926E7 35%, #5077F2 70%, #469EFF 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              your first mission.
            </span>
          </h2>

          {/* 4-pointed star sparkle divider */}
          <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '10px', margin: '1.75rem auto 1.5rem' }}>
            <div style={{ height: '1px', width: 'clamp(50px,10vw,100px)',
              background: 'linear-gradient(to right, transparent, rgba(137,38,231,0.65))' }} />
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"
              style={{ filter: 'drop-shadow(0 0 6px rgba(210,170,255,0.9)) drop-shadow(0 0 14px rgba(137,38,231,0.6))' }}>
              <path d="M8 0 L9.2 6.8 L16 8 L9.2 9.2 L8 16 L6.8 9.2 L0 8 L6.8 6.8 Z" fill="rgba(215,175,255,0.98)"/>
            </svg>
            <div style={{ height: '1px', width: 'clamp(50px,10vw,100px)',
              background: 'linear-gradient(to left, transparent, rgba(137,38,231,0.65))' }} />
          </div>

          <p className="font-rem"
            style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)', color: 'rgba(190,170,230,0.65)',
              lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 3rem' }}>
            Join the PLEARN beta and collect P-Coins from day one. Or connect your brand to a generation actively learning about money.
          </p>
        </div>

        <div style={{ ...fx(on, 150), display: 'flex', gap: '1.1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={CTA.joinBeta} className="font-rem font-semibold"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.95rem 2.25rem', borderRadius: '12px',
              background: 'linear-gradient(90deg, #EF00BD 0%, #8926E7 40%, #573EFB 75%, #5077F2 100%)',
              boxShadow: '0 0 22px rgba(137,38,231,0.55), 0 0 50px rgba(239,0,189,0.22), 0 6px 22px rgba(0,0,0,0.50)',
              color: '#FFFFFF', fontSize: '1rem', textDecoration: 'none',
              minWidth: '190px', justifyContent: 'center', transition: 'opacity 0.2s, transform 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity='0.88'; e.currentTarget.style.transform='translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity='1'; e.currentTarget.style.transform='translateY(0)' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true">
              <path d="M13 2 3.09 14.27A1 1 0 0 0 4 16h7l-2 6 11.91-12.27A1 1 0 0 0 20 8h-7z"/>
            </svg>
            Join the Beta
          </a>
          <a href="mailto:info@plearn.io?subject=Rewards%20Partner%20Enquiry"
            className="font-rem font-semibold"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.95rem 2.25rem', borderRadius: '12px',
              background: 'rgba(87,62,251,0.08)', border: '1.5px solid rgba(137,38,231,0.50)',
              boxShadow: '0 0 18px rgba(137,38,231,0.20), inset 0 0 12px rgba(137,38,231,0.05), 0 6px 22px rgba(0,0,0,0.50)',
              color: '#FFFFFF', fontSize: '1rem', textDecoration: 'none',
              minWidth: '190px', justifyContent: 'center', transition: 'opacity 0.2s, border-color 0.2s, transform 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity='0.88'; e.currentTarget.style.borderColor='rgba(137,38,231,0.80)'; e.currentTarget.style.transform='translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity='1'; e.currentTarget.style.borderColor='rgba(137,38,231,0.50)'; e.currentTarget.style.transform='translateY(0)' }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF"
              strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 7.65l8.19 8.19 8.19-8.19a5.4 5.4 0 0 0 0-7.65z"/>
            </svg>
            Partner With Us
          </a>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Page wrapper
// ─────────────────────────────────────────────────────────────────────────────
export default function RewardsPage() {
  return (
    <>
      <PageBackground />
      <CoinBackground variant="rewards" />
      <a href="#rewards-main" className="skip-link">Skip to main content</a>
      <header style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
      </header>
      <main id="rewards-main" style={{ position: 'relative', zIndex: 1 }}>
        <RewardsHero />
        <HowEarningWorks />
        <WhatYouCanEarn />
        <BadgesAndProgress />
        <PartnerRewards />
        <RewardsCTA />
      </main>
      <Footer />
    </>
  )
}
