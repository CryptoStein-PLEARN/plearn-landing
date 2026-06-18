// MissionsPage — /missions
// Sections: MissionsHero · HowMissionsWork · MissionPaths · ProgressSystem · MissionsCTA

import { useEffect, useRef, useState } from 'react'
import Navbar         from '@/components/layout/Navbar'
import Footer         from '@/components/layout/Footer'
import PageBackground from '@/components/layout/PageBackground'
import CoinBackground from '@/components/layout/CoinBackground'
import { COINS }      from '@/constants/assets'
import { CTA }        from '@/constants/config'

// ── Local helpers (mirrors RewardsPage pattern) ───────────────────────────────
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

const H2_SECTION = { fontSize: 'clamp(2.4rem, 4.8vw, 4rem)',   lineHeight: 0.98, letterSpacing: '-0.01em' }
const H2_CTA     = { fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)', lineHeight: 0.98, letterSpacing: '-0.01em' }
const DOT_GRID   = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='0.75' fill='rgba(255%2C255%2C255%2C0.055)'/%3E%3C/svg%3E")`

// ─────────────────────────────────────────────────────────────────────────────
// 1. Hero
// ─────────────────────────────────────────────────────────────────────────────
function MissionsHero() {
  return (
    <section
      aria-labelledby="missions-hero-heading"
      className="relative overflow-hidden"
      style={{
        minHeight: '86vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '7rem 1.25rem 5rem',
        background: 'radial-gradient(ellipse 110% 80% at 50% 0%, #0E0530 0%, #060115 55%, #040010 100%)',
      }}
    >
      {/* Dot grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: DOT_GRID, backgroundRepeat: 'repeat', opacity: 0.9 }} />

      {/* Ambient glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[100px]"
        style={{ background: 'radial-gradient(ellipse 65% 50% at 50% 42%, rgba(137,38,231,0.38) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse 35% 40% at 8% 60%, rgba(239,0,189,0.13) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse 30% 40% at 92% 55%, rgba(70,158,255,0.12) 0%, transparent 65%)' }} />

      {/* Corner coins */}
      <img src={COINS.purpleStyled} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden lg:block"
        style={{ width: '580px', height: '580px', left: '-170px', top: '-110px',
          objectFit: 'contain', opacity: 0.14,
          filter: 'blur(0.5px) drop-shadow(0 0 38px rgba(137,38,231,0.60))',
          animationDelay: '0s', animationDuration: '9s', zIndex: 0 }} />
      <img src={COINS.blue} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden lg:block"
        style={{ width: '480px', height: '480px', right: '-150px', bottom: '-90px',
          objectFit: 'contain', opacity: 0.12,
          filter: 'blur(0.5px) drop-shadow(0 0 30px rgba(70,158,255,0.50))',
          animationDelay: '2.5s', animationDuration: '8.5s', zIndex: 0 }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '820px', margin: '0 auto', width: '100%' }}>

        {/* Badge */}
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
              The Game
            </span>
            <span aria-hidden="true" style={{ color: '#A855F7', fontSize: '0.70rem', lineHeight: 1 }}>✦</span>
          </div>
        </div>

        {/* Headline */}
        <h1 id="missions-hero-heading" className="font-karantina"
          style={{ fontSize: 'clamp(3rem, 6vw, 4.75rem)', lineHeight: 0.95, letterSpacing: '-0.01em',
            color: '#F4F0FF',
            textShadow: '0 0 60px rgba(137,38,231,0.30), 0 2px 40px rgba(0,0,0,0.60)',
            marginBottom: '1.25rem',
            width: '100%', overflowWrap: 'normal', wordBreak: 'normal' }}>
          Real money skills.{' '}
          <span style={{ background: 'linear-gradient(90deg, #EF00BD 0%, #8926E7 48%, #5077F2 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Real missions.
          </span>
        </h1>

        {/* Neon underline */}
        <div aria-hidden="true" style={{ position: 'relative', height: '28px', margin: '-0.6rem auto 1.5rem', maxWidth: '600px' }}>
          <div style={{ position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 90% 100% at 50% 100%, rgba(137,38,231,0.42) 0%, rgba(239,0,189,0.14) 40%, transparent 75%)',
            filter: 'blur(8px)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
            width: '55%', height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(239,0,189,0.65) 20%, rgba(137,38,231,0.88) 50%, rgba(80,119,242,0.65) 80%, transparent 100%)',
            borderRadius: 9999, filter: 'blur(1px)' }} />
          <div style={{ position: 'absolute', bottom: '-1px', left: '50%', transform: 'translateX(-50%)',
            width: '70px', height: '4px',
            background: 'rgba(220,180,255,0.95)',
            borderRadius: 9999, filter: 'blur(3px)' }} />
        </div>

        {/* Subtext */}
        <p className="font-rem"
          style={{ fontSize: 'clamp(0.95rem, 1.9vw, 1.1rem)', color: 'rgba(200,182,240,0.75)',
            lineHeight: 1.78, maxWidth: '560px', margin: '0 auto 2.5rem' }}>
          PLEARN isn't a course. It's a game built around the financial decisions you'll actually face.
          Complete tasks, missions, and levels — and build money skills that last.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
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
          <a href="#missions-paths" className="font-rem font-semibold"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
              padding: '1rem 2.5rem', borderRadius: '14px', minWidth: '200px', justifyContent: 'center',
              background: 'rgba(10,4,28,0.60)',
              border: '1.5px solid rgba(137,38,231,0.55)',
              boxShadow: '0 0 18px rgba(137,38,231,0.20), 0 8px 24px rgba(0,0,0,0.50)',
              color: '#FFFFFF', fontSize: '1rem', textDecoration: 'none',
              transition: 'opacity 0.2s, transform 0.2s, border-color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity='0.82'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.borderColor='rgba(137,38,231,0.85)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity='1';    e.currentTarget.style.transform='translateY(0)';   e.currentTarget.style.borderColor='rgba(137,38,231,0.55)' }}>
            See the Missions
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
// 2. How Missions Work — 3-step card row
// ─────────────────────────────────────────────────────────────────────────────
const HOW_STEPS = [
  {
    num: '01', color: '#8926E7',
    border: 'rgba(137,38,231,0.60)', outerGlow: 'rgba(137,38,231,0.35)', farGlow: 'rgba(137,38,231,0.10)',
    cardBg: 'linear-gradient(145deg, rgba(80,18,140,0.30) 0%, rgba(8,4,22,0.97) 55%)',
    iconBg: 'rgba(60,8,115,0.92)', iconShadow: '0 0 20px rgba(137,38,231,0.65), 0 4px 14px rgba(0,0,0,0.60)',
    numClr: 'rgba(137,38,231,0.09)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8926E7"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    title: 'Complete a Task',
    body: "Each task puts you in a real financial moment. You make the call. You see the outcome. No right answer handed to you on a plate.",
  },
  {
    num: '02', color: '#469EFF',
    border: 'rgba(70,158,255,0.60)', outerGlow: 'rgba(70,158,255,0.32)', farGlow: 'rgba(70,158,255,0.09)',
    cardBg: 'linear-gradient(145deg, rgba(24,50,180,0.26) 0%, rgba(5,8,24,0.97) 55%)',
    iconBg: 'rgba(16,38,160,0.92)', iconShadow: '0 0 20px rgba(70,158,255,0.60), 0 4px 14px rgba(0,0,0,0.60)',
    numClr: 'rgba(70,158,255,0.09)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#469EFF"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="6"/>
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    title: 'Finish a Mission',
    body: 'String your tasks together into a mission. Each completed mission earns P-Coins, moves you up a level, and builds toward your next badge.',
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
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
    title: 'Level Up',
    body: 'Missions build on each other. The further you progress, the deeper the skill — and the bigger the rewards waiting for you.',
  },
]

function HowMissionsWork() {
  const [ref, on] = useReveal()
  return (
    <section id="missions-how" ref={ref} aria-labelledby="missions-how-heading"
      className="relative overflow-hidden"
      style={{ padding: '5.5rem 1.25rem 7rem', background: '#06011A' }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: DOT_GRID, backgroundRepeat: 'repeat' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-32 z-[2]"
        style={{ background: 'linear-gradient(to bottom, rgba(4,1,12,0.75) 0%, transparent 100%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[110px]"
        style={{ background: 'radial-gradient(ellipse 55% 40% at 50% 8%, rgba(137,38,231,0.24) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[100px]"
        style={{ background: 'radial-gradient(ellipse 35% 45% at 4% 65%, rgba(70,158,255,0.12) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[100px]"
        style={{ background: 'radial-gradient(ellipse 35% 45% at 96% 65%, rgba(1,222,91,0.10) 0%, transparent 65%)' }} />
      {/* Horizon glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 blur-[60px]"
        style={{ height: '200px',
          background: 'linear-gradient(90deg, rgba(137,38,231,0.12) 0%, rgba(70,158,255,0.09) 50%, rgba(1,222,91,0.10) 100%)',
          zIndex: 0 }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem', ...fx(on, 0) }}>
          <p className="section-tag" style={{ marginBottom: '1rem', justifyContent: 'center' }}>
            <span aria-hidden="true" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
              background: '#8926E7', boxShadow: '0 0 6px rgba(137,38,231,0.85)', marginRight: 8, flexShrink: 0 }} />
            How It Works
          </p>
          <h2 id="missions-how-heading" className="font-karantina"
            style={{ ...H2_SECTION, color: '#F4F0FF', textShadow: '0 0 50px rgba(137,38,231,0.18)', marginBottom: 0 }}>
            Complete tasks. Unlock missions. Level up.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: '1.25rem', alignItems: 'stretch' }}>
          {HOW_STEPS.map((s, i) => (
            <div key={s.title} style={{ ...fx(on, 80 + i * 80),
              position: 'relative', overflow: 'hidden',
              background: s.cardBg,
              border: `1.5px solid ${s.border}`,
              borderRadius: '18px',
              padding: '2.25rem 2rem 2rem',
              boxShadow: [`0 0 24px ${s.outerGlow}`, `0 0 60px ${s.farGlow}`,
                'inset 0 1px 0 rgba(255,255,255,0.07)', '0 18px 48px rgba(0,0,0,0.70)'].join(', '),
              display: 'flex', flexDirection: 'column' }}>

              <span aria-hidden="true" className="font-karantina select-none pointer-events-none absolute"
                style={{ top: '-0.5rem', right: '0.75rem', fontSize: '7rem', lineHeight: 1,
                  color: s.numClr, zIndex: 0 }}>
                {s.num}
              </span>

              <div style={{ width: 72, height: 72, borderRadius: '50%',
                background: s.iconBg, boxShadow: s.iconShadow,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginBottom: '1.5rem', position: 'relative', zIndex: 2 }}>
                {s.icon}
              </div>

              <h3 className="font-rem"
                style={{ fontWeight: 700, fontSize: '1.08rem', color: '#FFFFFF',
                  lineHeight: 1.25, marginBottom: '0.55rem', position: 'relative', zIndex: 2 }}>
                {s.title}
              </h3>
              <div style={{ width: '36px', height: '2.5px', background: s.color,
                boxShadow: `0 0 8px ${s.color}`, borderRadius: 9999, marginBottom: '0.85rem', flexShrink: 0 }} />
              <p className="font-rem"
                style={{ fontSize: '0.88rem', color: 'rgba(160,145,195,0.72)',
                  lineHeight: 1.78, flex: 1, position: 'relative', zIndex: 2 }}>
                {s.body}
              </p>

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
// 3. Mission Paths — 4 beta modules, 2×2 grid
// ─────────────────────────────────────────────────────────────────────────────
const MISSION_MODULES = [
  {
    num: '01', color: '#8926E7',
    border: 'rgba(137,38,231,0.65)', outerGlow: 'rgba(137,38,231,0.38)', farGlow: 'rgba(137,38,231,0.12)',
    cardBg: 'linear-gradient(155deg, rgba(90,20,160,0.30) 0%, rgba(8,4,22,0.96) 60%)',
    iconBg: 'rgba(55,8,110,0.95)',
    iconShadow: '0 0 0 6px rgba(137,38,231,0.14), 0 0 0 12px rgba(137,38,231,0.06), 0 0 28px rgba(137,38,231,0.55)',
    numClr: 'rgba(137,38,231,0.10)',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#8926E7"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <path d="M2 10h20"/>
      </svg>
    ),
    name: 'Financial Responsibility',
    tagline: 'Master your money mindset.',
    tasks: ['Budget your first month', 'Track income vs. expenses', 'Build a money safety net'],
    badge: 'Money Basics',
  },
  {
    num: '02', color: '#469EFF',
    border: 'rgba(70,158,255,0.65)', outerGlow: 'rgba(70,158,255,0.35)', farGlow: 'rgba(70,158,255,0.10)',
    cardBg: 'linear-gradient(155deg, rgba(20,45,180,0.28) 0%, rgba(5,8,24,0.96) 60%)',
    iconBg: 'rgba(14,34,155,0.95)',
    iconShadow: '0 0 0 6px rgba(70,158,255,0.14), 0 0 0 12px rgba(70,158,255,0.06), 0 0 28px rgba(70,158,255,0.55)',
    numClr: 'rgba(70,158,255,0.10)',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#469EFF"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    name: 'Checking & Debit',
    tagline: 'Know what\'s in your account — and why it matters.',
    tasks: ['Read a bank statement', 'Avoid overdraft fees', 'Understand transaction records'],
    badge: 'Account Aware',
  },
  {
    num: '03', color: '#EF00BD',
    border: 'rgba(239,0,189,0.60)', outerGlow: 'rgba(239,0,189,0.32)', farGlow: 'rgba(239,0,189,0.10)',
    cardBg: 'linear-gradient(155deg, rgba(140,0,90,0.24) 0%, rgba(18,4,16,0.96) 60%)',
    iconBg: 'rgba(110,0,72,0.95)',
    iconShadow: '0 0 0 6px rgba(239,0,189,0.14), 0 0 0 12px rgba(239,0,189,0.06), 0 0 28px rgba(239,0,189,0.50)',
    numClr: 'rgba(239,0,189,0.10)',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#EF00BD"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    name: 'Credit & Loans',
    tagline: 'Understand credit before it costs you.',
    tasks: ['Learn how credit scores work', 'Read a loan offer', 'Compare interest rates'],
    badge: 'Credit Clarity',
  },
  {
    num: '04', color: '#01DE5B',
    border: 'rgba(1,200,80,0.60)', outerGlow: 'rgba(1,200,80,0.32)', farGlow: 'rgba(1,200,80,0.09)',
    cardBg: 'linear-gradient(155deg, rgba(0,68,28,0.28) 0%, rgba(4,14,10,0.96) 60%)',
    iconBg: 'rgba(0,62,22,0.95)',
    iconShadow: '0 0 0 6px rgba(1,222,91,0.14), 0 0 0 12px rgba(1,222,91,0.06), 0 0 28px rgba(1,222,91,0.55)',
    numClr: 'rgba(1,222,91,0.10)',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#01DE5B"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
      </svg>
    ),
    name: 'Savings',
    tagline: 'Build the habit before you need it.',
    tasks: ['Set a savings target', 'Understand compound growth', 'Build an emergency fund'],
    badge: 'Saving Streak',
  },
]

function MissionPaths() {
  const [ref, on] = useReveal()
  return (
    <section id="missions-paths" ref={ref} aria-labelledby="missions-paths-heading"
      className="relative overflow-hidden"
      style={{ padding: '5.5rem 1.25rem 7rem', background: '#080220' }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: DOT_GRID, backgroundRepeat: 'repeat' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-36 z-[2]"
        style={{ background: 'linear-gradient(to bottom, rgba(5,2,16,0.72) 0%, transparent 100%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[110px]"
        style={{ background: 'radial-gradient(ellipse 60% 45% at 50% 8%, rgba(137,38,231,0.24) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 35% 50% at 92% 60%, rgba(1,222,91,0.10) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 30% 45% at 8% 60%, rgba(239,0,189,0.09) 0%, transparent 65%)' }} />

      {/* Edge coins */}
      <img src={COINS.green} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden lg:block"
        style={{ width: '340px', height: '340px', left: '-110px', top: '50%', transform: 'translateY(-50%)',
          objectFit: 'contain', opacity: 0.08,
          filter: 'blur(1.5px) drop-shadow(0 0 18px rgba(1,222,91,0.40))',
          animationDelay: '0s', animationDuration: '9s', zIndex: 0 }} />
      <img src={COINS.magenta} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden lg:block"
        style={{ width: '300px', height: '300px', right: '-90px', top: '50%', transform: 'translateY(-50%)',
          objectFit: 'contain', opacity: 0.08,
          filter: 'blur(1.5px) drop-shadow(0 0 18px rgba(239,0,189,0.40))',
          animationDelay: '2s', animationDuration: '8.5s', zIndex: 0 }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem', ...fx(on, 0) }}>
          <p className="section-tag" style={{ marginBottom: '1rem', justifyContent: 'center' }}>
            <span aria-hidden="true" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
              background: '#8926E7', boxShadow: '0 0 6px rgba(137,38,231,0.85)', marginRight: 8, flexShrink: 0 }} />
            Beta Mission Paths
          </p>
          <h2 id="missions-paths-heading" className="font-karantina"
            style={{ ...H2_SECTION, color: '#F4F0FF', textShadow: '0 0 50px rgba(137,38,231,0.18)', marginBottom: '1rem' }}>
            Four beta mission paths.{' '}
            <span style={{ background: 'linear-gradient(90deg, #EF00BD 0%, #8926E7 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              One financial foundation.
            </span>
          </h2>
          <p className="font-rem"
            style={{ fontSize: 'clamp(0.92rem, 1.7vw, 1.02rem)', color: 'rgba(190,175,230,0.65)',
              lineHeight: 1.72, maxWidth: '520px', margin: '0 auto' }}>
            The beta starts with four foundational mission paths, with more financial life-skill areas
            planned as PLEARN grows.
          </p>
        </div>

        {/* 2×2 module grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '1.25rem' }}>
          {MISSION_MODULES.map((m, i) => (
            <div key={m.name} style={{ ...fx(on, 80 + i * 70),
              position: 'relative', overflow: 'hidden',
              background: m.cardBg,
              border: `1.5px solid ${m.border}`,
              borderRadius: '18px',
              padding: '1.75rem 1.75rem 1.5rem',
              boxShadow: [`0 0 24px ${m.outerGlow}`, `0 0 60px ${m.farGlow}`,
                'inset 0 1px 0 rgba(255,255,255,0.06)', '0 16px 44px rgba(0,0,0,0.65)'].join(', '),
              display: 'flex', flexDirection: 'column' }}>

              {/* Number watermark */}
              <span aria-hidden="true" className="font-karantina select-none pointer-events-none absolute"
                style={{ top: '-0.4rem', right: '0.8rem', fontSize: '6rem', lineHeight: 1,
                  color: m.numClr, zIndex: 0 }}>
                {m.num}
              </span>

              {/* Top: icon circle + name + tagline */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem', marginBottom: '1.25rem' }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div aria-hidden="true" style={{ position: 'absolute', inset: '-7px', borderRadius: '50%',
                    border: `1px solid ${m.border}`, opacity: 0.35 }} />
                  <div style={{ width: 68, height: 68, borderRadius: '50%',
                    background: m.iconBg, border: `1.5px solid ${m.border}`,
                    boxShadow: m.iconShadow,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
                    {m.icon}
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 2 }}>
                  <h3 className="font-karantina"
                    style={{ fontSize: '1.85rem', lineHeight: 1.0, color: '#FFFFFF',
                      marginBottom: '0.25rem', letterSpacing: '-0.01em' }}>
                    {m.name}
                  </h3>
                  <p className="font-rem"
                    style={{ fontSize: '0.80rem', color: 'rgba(180,165,215,0.65)', lineHeight: 1.5 }}>
                    {m.tagline}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px',
                background: `linear-gradient(90deg, ${m.border} 0%, transparent 85%)`,
                marginBottom: '1.1rem', flexShrink: 0 }} />

              {/* Task pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.25rem', flex: 1 }}>
                {m.tasks.map(task => (
                  <span key={task} className="font-rem" style={{
                    fontSize: '0.72rem', padding: '4px 11px', borderRadius: 9999,
                    background: `${m.color}18`,
                    border: `1px solid ${m.border}`,
                    color: m.color, fontWeight: 600, letterSpacing: '0.01em',
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                  }}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill={m.color} aria-hidden="true">
                      <circle cx="4" cy="4" r="3.5"/>
                    </svg>
                    {task}
                  </span>
                ))}
              </div>

              {/* Badge footer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem',
                paddingTop: '0.85rem',
                borderTop: `1px solid ${m.border.replace(/[\d.]+\)$/, '0.30)')}` }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={m.color}
                  strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <span className="font-rem"
                  style={{ fontSize: '0.76rem', color: m.color, fontWeight: 700, letterSpacing: '0.03em' }}>
                  Badge: {m.badge}
                </span>
              </div>

              {/* Bottom glow */}
              <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '70px',
                background: `radial-gradient(ellipse 55% 100% at 50% 100%, ${m.farGlow} 0%, transparent 65%)`,
                pointerEvents: 'none' }} />
            </div>
          ))}
        </div>

        {/* "More coming" note */}
        <p className="font-rem" style={{ textAlign: 'center', marginTop: '2.5rem',
          fontSize: '0.82rem', color: 'rgba(160,145,195,0.50)', letterSpacing: '0.04em',
          ...fx(on, 400) }}>
          ✦&nbsp;&nbsp;More mission worlds are planned as PLEARN grows.&nbsp;&nbsp;✦
        </p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Progress System — Levels · P-Coins · Badges
// ─────────────────────────────────────────────────────────────────────────────
const PROGRESS_FEATURES = [
  {
    color: '#8926E7',
    border: 'rgba(137,38,231,0.55)', outerGlow: 'rgba(137,38,231,0.32)', farGlow: 'rgba(137,38,231,0.10)',
    cardBg: 'linear-gradient(145deg, rgba(80,18,140,0.26) 0%, rgba(8,4,22,0.97) 55%)',
    iconBg: 'rgba(55,8,110,0.92)', iconShadow: '0 0 20px rgba(137,38,231,0.60), 0 4px 12px rgba(0,0,0,0.55)',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8926E7"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 20V10M12 20V4M6 20v-6"/>
      </svg>
    ),
    label: 'Levels 1–10',
    title: 'Progress through levels.',
    body: 'Every completed mission moves you up. Progress from Money Newbie to Financially Fluent — one level at a time.',
  },
  {
    color: '#469EFF',
    border: 'rgba(70,158,255,0.55)', outerGlow: 'rgba(70,158,255,0.30)', farGlow: 'rgba(70,158,255,0.09)',
    cardBg: 'linear-gradient(145deg, rgba(20,45,180,0.24) 0%, rgba(5,8,24,0.97) 55%)',
    iconBg: 'rgba(14,34,155,0.92)', iconShadow: '0 0 20px rgba(70,158,255,0.55), 0 4px 12px rgba(0,0,0,0.55)',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#469EFF"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="8"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    label: 'P-Coins',
    title: 'Earn P-Coins automatically.',
    body: 'Complete missions and tasks to earn P-Coins — PLEARN\'s in-platform reward points. Spend them in the Rewards system.',
  },
  {
    color: '#01DE5B',
    border: 'rgba(1,200,80,0.55)', outerGlow: 'rgba(1,200,80,0.28)', farGlow: 'rgba(1,200,80,0.08)',
    cardBg: 'linear-gradient(145deg, rgba(0,68,26,0.24) 0%, rgba(4,14,10,0.97) 55%)',
    iconBg: 'rgba(0,62,22,0.92)', iconShadow: '0 0 20px rgba(1,222,91,0.55), 0 4px 12px rgba(0,0,0,0.55)',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#01DE5B"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="6"/>
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    label: 'Badges',
    title: 'Unlock real skill badges.',
    body: 'Each mission path has a badge tied to the skills you\'ve built. Earn them through gameplay — not just participation.',
  },
]

function ProgressSystem() {
  const [ref, on] = useReveal()
  return (
    <section id="missions-progress" ref={ref} aria-labelledby="missions-progress-heading"
      className="relative overflow-hidden"
      style={{ padding: '5.5rem 1.25rem 7rem', background: '#06011A' }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: DOT_GRID, backgroundRepeat: 'repeat' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-36 z-[2]"
        style={{ background: 'linear-gradient(to bottom, rgba(4,1,12,0.70) 0%, transparent 100%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[110px]"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 10%, rgba(137,38,231,0.22) 0%, transparent 65%)' }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem', ...fx(on, 0) }}>
          <p className="section-tag" style={{ marginBottom: '1rem', justifyContent: 'center' }}>
            <span aria-hidden="true" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
              background: '#8926E7', boxShadow: '0 0 6px rgba(137,38,231,0.85)', marginRight: 8, flexShrink: 0 }} />
            Your Progress
          </p>
          <h2 id="missions-progress-heading" className="font-karantina"
            style={{ ...H2_SECTION, color: '#F4F0FF', textShadow: '0 0 50px rgba(137,38,231,0.18)', marginBottom: '0' }}>
            Every mission moves you forward.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: '1.25rem', alignItems: 'stretch' }}>
          {PROGRESS_FEATURES.map((f, i) => (
            <div key={f.label} style={{ ...fx(on, 80 + i * 80),
              position: 'relative', overflow: 'hidden',
              background: f.cardBg,
              border: `1.5px solid ${f.border}`,
              borderRadius: '18px',
              padding: '2rem 1.75rem',
              boxShadow: [`0 0 22px ${f.outerGlow}`, `0 0 55px ${f.farGlow}`,
                'inset 0 1px 0 rgba(255,255,255,0.06)', '0 16px 44px rgba(0,0,0,0.65)'].join(', '),
              display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              {/* Label pill */}
              <div style={{ display: 'inline-flex', alignSelf: 'flex-start',
                padding: '3px 12px', borderRadius: 9999,
                background: `${f.color}18`, border: `1px solid ${f.border}` }}>
                <span className="font-rem" style={{ fontSize: '0.68rem', color: f.color,
                  fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {f.label}
                </span>
              </div>

              {/* Icon + title row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%',
                  background: f.iconBg, boxShadow: f.iconShadow,
                  border: `1.5px solid ${f.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {f.icon}
                </div>
                <h3 className="font-rem"
                  style={{ fontWeight: 700, fontSize: '1.05rem', color: '#FFFFFF', lineHeight: 1.3 }}>
                  {f.title}
                </h3>
              </div>

              {/* Accent line */}
              <div style={{ width: '32px', height: '2px', background: f.color,
                boxShadow: `0 0 7px ${f.color}`, borderRadius: 9999 }} />

              {/* Body */}
              <p className="font-rem"
                style={{ fontSize: '0.88rem', color: 'rgba(160,145,195,0.72)', lineHeight: 1.75, flex: 1 }}>
                {f.body}
              </p>

              <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '70px',
                background: `radial-gradient(ellipse 55% 100% at 50% 100%, ${f.farGlow} 0%, transparent 65%)`,
                pointerEvents: 'none' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. CTA
// ─────────────────────────────────────────────────────────────────────────────
function MissionsCTA() {
  const [ref, on] = useReveal()
  return (
    <section id="missions-cta" ref={ref} aria-labelledby="missions-cta-heading"
      className="relative overflow-hidden"
      style={{ padding: '6rem 1.25rem 7rem', background: '#060115' }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: DOT_GRID, backgroundRepeat: 'repeat' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(137,38,231,0.30) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 40% 50% at 10% 55%, rgba(239,0,189,0.12) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 35% 45% at 90% 55%, rgba(1,222,91,0.09) 0%, transparent 65%)' }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <div style={{ ...fx(on, 0) }}>
          <p className="section-tag" style={{ marginBottom: '1.5rem', justifyContent: 'center' }}>
            <span aria-hidden="true" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
              background: '#8926E7', boxShadow: '0 0 6px rgba(137,38,231,0.85)', marginRight: 8, flexShrink: 0 }} />
            Get Started
          </p>

          {/* 4-pointed star sparkle */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <svg width="28" height="28" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 0 L9.2 6.8 L16 8 L9.2 9.2 L8 16 L6.8 9.2 L0 8 L6.8 6.8 Z" fill="rgba(215,175,255,0.98)"/>
            </svg>
          </div>

          <h2 id="missions-cta-heading" className="font-karantina"
            style={{ ...H2_CTA, color: '#F4F0FF', textShadow: '0 0 80px rgba(137,38,231,0.28)', marginBottom: '1.25rem' }}>
            Your first mission is waiting.
          </h2>
          <p className="font-rem"
            style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)', color: 'rgba(190,175,230,0.68)',
              lineHeight: 1.75, maxWidth: '480px', margin: '0 auto 2.5rem' }}>
            Join the beta and be among the first to explore PLEARN's foundational missions.
            No financial knowledge required — just start playing.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
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
            <a href="/rewards" className="font-rem font-semibold"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                padding: '1rem 2.5rem', borderRadius: '14px', minWidth: '188px', justifyContent: 'center',
                background: 'rgba(10,4,28,0.60)',
                border: '1.5px solid rgba(137,38,231,0.55)',
                boxShadow: '0 0 18px rgba(137,38,231,0.20), 0 8px 24px rgba(0,0,0,0.50)',
                color: '#FFFFFF', fontSize: '1rem', textDecoration: 'none',
                transition: 'opacity 0.2s, transform 0.2s, border-color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.opacity='0.82'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.borderColor='rgba(137,38,231,0.85)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity='1';    e.currentTarget.style.transform='translateY(0)';   e.currentTarget.style.borderColor='rgba(137,38,231,0.55)' }}>
              See Rewards
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Page shell
// ─────────────────────────────────────────────────────────────────────────────
export default function MissionsPage() {
  return (
    <>
      <PageBackground />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
      </header>
      <CoinBackground variant="missions" />
      <main id="main-content" style={{ position: 'relative', zIndex: 1 }}>
        <MissionsHero />
        <HowMissionsWork />
        <MissionPaths />
        <ProgressSystem />
        <MissionsCTA />
      </main>
      <Footer />
    </>
  )
}
