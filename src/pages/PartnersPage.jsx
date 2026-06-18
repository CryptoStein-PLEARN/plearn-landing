// PartnersPage — /partners
// Sections: PartnersHero · WhyItMatters · WhoWeWorkWith · HowPilotsWork · PartnerRewards · PartnersCTA

import { useEffect, useRef, useState } from 'react'
import Navbar         from '@/components/layout/Navbar'
import Footer         from '@/components/layout/Footer'
import PageBackground from '@/components/layout/PageBackground'
import CoinBackground from '@/components/layout/CoinBackground'
import { COINS }      from '@/constants/assets'
import { CTA, CONTACT } from '@/constants/config'

// ── Local helpers ─────────────────────────────────────────────────────────────
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

// ── CTA helpers ───────────────────────────────────────────────────────────────
const PARTNER_EMAIL  = `mailto:${CONTACT.email}?subject=PLEARN%20Pilot%20Partnership`
const PILOT_EMAIL    = `mailto:${CONTACT.email}?subject=PLEARN%20Pilot%20Enquiry`

// ─────────────────────────────────────────────────────────────────────────────
// 1. PartnersHero
// ─────────────────────────────────────────────────────────────────────────────
function PartnersHero() {
  return (
    <section
      aria-labelledby="partners-hero-heading"
      className="relative overflow-hidden"
      style={{
        minHeight: '86vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '7rem 1.25rem 5rem',
        background: 'radial-gradient(ellipse 110% 80% at 50% 0%, #050B28 0%, #060115 50%, #040010 100%)',
      }}
    >
      {/* Dot grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: DOT_GRID, backgroundRepeat: 'repeat', opacity: 0.9 }} />

      {/* Ambient glows — cooler, bluer than user pages */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[100px]"
        style={{ background: 'radial-gradient(ellipse 65% 50% at 50% 42%, rgba(80,119,242,0.32) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse 40% 45% at 5% 65%, rgba(137,38,231,0.14) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse 35% 40% at 95% 55%, rgba(70,158,255,0.12) 0%, transparent 65%)' }} />

      {/* Corner coins — very subtle, professional */}
      <img src={COINS.purpleStyled} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden lg:block"
        style={{ width: '540px', height: '540px', left: '-160px', top: '-100px',
          objectFit: 'contain', opacity: 0.10,
          filter: 'blur(1px) drop-shadow(0 0 32px rgba(80,119,242,0.50))',
          animationDelay: '0s', animationDuration: '10s', zIndex: 0 }} />
      <img src={COINS.blue} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden lg:block"
        style={{ width: '460px', height: '460px', right: '-140px', bottom: '-80px',
          objectFit: 'contain', opacity: 0.09,
          filter: 'blur(1px) drop-shadow(0 0 28px rgba(70,158,255,0.45))',
          animationDelay: '2.8s', animationDuration: '9s', zIndex: 0 }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '840px', margin: '0 auto', width: '100%' }}>

        {/* Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            padding: '9px 24px', borderRadius: 9999,
            background: 'rgba(80,119,242,0.10)',
            border: '1.5px solid rgba(80,119,242,0.60)',
            boxShadow: '0 0 20px rgba(80,119,242,0.28), inset 0 0 12px rgba(80,119,242,0.07)',
          }}>
            <span aria-hidden="true" style={{ color: '#7BA8FF', fontSize: '0.70rem', lineHeight: 1 }}>✦</span>
            <span className="font-rem"
              style={{ fontSize: '0.75rem', color: 'rgba(190,210,255,0.92)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>
              For Partners
            </span>
            <span aria-hidden="true" style={{ color: '#7BA8FF', fontSize: '0.70rem', lineHeight: 1 }}>✦</span>
          </div>
        </div>

        {/* Headline */}
        <h1 id="partners-hero-heading" className="font-karantina"
          style={{ fontSize: 'clamp(3rem, 6vw, 4.75rem)', lineHeight: 0.95, letterSpacing: '-0.01em',
            color: '#F4F0FF',
            textShadow: '0 0 60px rgba(80,119,242,0.28), 0 2px 40px rgba(0,0,0,0.60)',
            marginBottom: '1.25rem',
            width: '100%', overflowWrap: 'normal', wordBreak: 'normal' }}>
          Build the next generation of{' '}
          <span style={{ background: 'linear-gradient(90deg, #5077F2 0%, #8926E7 48%, #469EFF 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            financially capable people.
          </span>
        </h1>

        {/* Neon underline — blue/indigo tone */}
        <div aria-hidden="true" style={{ position: 'relative', height: '28px', margin: '-0.6rem auto 1.5rem', maxWidth: '620px' }}>
          <div style={{ position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 90% 100% at 50% 100%, rgba(80,119,242,0.38) 0%, rgba(70,158,255,0.12) 40%, transparent 75%)',
            filter: 'blur(8px)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
            width: '55%', height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(70,158,255,0.60) 20%, rgba(80,119,242,0.90) 50%, rgba(87,62,251,0.65) 80%, transparent 100%)',
            borderRadius: 9999, filter: 'blur(1px)' }} />
          <div style={{ position: 'absolute', bottom: '-1px', left: '50%', transform: 'translateX(-50%)',
            width: '70px', height: '4px',
            background: 'rgba(180,200,255,0.95)',
            borderRadius: 9999, filter: 'blur(3px)' }} />
        </div>

        {/* Subtext */}
        <p className="font-rem"
          style={{ fontSize: 'clamp(0.95rem, 1.9vw, 1.1rem)', color: 'rgba(190,210,255,0.75)',
            lineHeight: 1.78, maxWidth: '580px', margin: '0 auto 2.5rem' }}>
          PLEARN is a gamified financial literacy platform, currently in beta.
          We're looking for schools, organizations, and brands to pilot with us
          — and help shape what financial education looks like for the next generation.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={PILOT_EMAIL} className="font-rem font-semibold"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '1rem 2.5rem', borderRadius: '14px', minWidth: '220px', justifyContent: 'center',
              background: 'linear-gradient(90deg, #5077F2 0%, #8926E7 50%, #573EFB 100%)',
              boxShadow: '0 0 28px rgba(80,119,242,0.55), 0 0 56px rgba(87,62,251,0.20), 0 8px 24px rgba(0,0,0,0.55)',
              color: '#FFFFFF', fontSize: '1rem', textDecoration: 'none',
              transition: 'opacity 0.2s, transform 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity='0.88'; e.currentTarget.style.transform='translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity='1';    e.currentTarget.style.transform='translateY(0)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Start a Pilot Conversation
          </a>
          <a href="#how-pilots-work" className="font-rem font-semibold"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
              padding: '1rem 2.5rem', borderRadius: '14px', minWidth: '190px', justifyContent: 'center',
              background: 'rgba(8,12,32,0.60)',
              border: '1.5px solid rgba(80,119,242,0.50)',
              boxShadow: '0 0 18px rgba(80,119,242,0.18), 0 8px 24px rgba(0,0,0,0.50)',
              color: '#FFFFFF', fontSize: '1rem', textDecoration: 'none',
              transition: 'opacity 0.2s, transform 0.2s, border-color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity='0.82'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.borderColor='rgba(80,119,242,0.80)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity='1';    e.currentTarget.style.transform='translateY(0)';   e.currentTarget.style.borderColor='rgba(80,119,242,0.50)' }}>
            How Pilots Work
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
// 2. WhyItMatters — 3 editorial columns
// ─────────────────────────────────────────────────────────────────────────────
const WHY_COLS = [
  {
    label: 'The Gap',
    color: '#5077F2',
    border: 'rgba(80,119,242,0.45)',
    glow:   'rgba(80,119,242,0.18)',
    body: 'Financial literacy is rarely part of a standard curriculum — yet money decisions shape every area of adult life, from credit and savings to debt and long-term security.',
  },
  {
    label: 'The Approach',
    color: '#8926E7',
    border: 'rgba(137,38,231,0.45)',
    glow:   'rgba(137,38,231,0.18)',
    body: 'Young people are more likely to engage when learning feels interactive, practical, and relevant to real life. PLEARN turns financial education into a journey — with missions, rewards, and meaningful progress.',
  },
  {
    label: 'The Opportunity',
    color: '#469EFF',
    border: 'rgba(70,158,255,0.45)',
    glow:   'rgba(70,158,255,0.18)',
    body: 'For schools, organizations, and brands who care about financial wellbeing and social impact — this is an opportunity to be part of something that addresses a real need, early.',
  },
]

function WhyItMatters() {
  const [ref, on] = useReveal()

  return (
    <section
      ref={ref}
      aria-labelledby="why-matters-heading"
      style={{
        padding: '6rem 1.25rem',
        background: 'linear-gradient(180deg, #040010 0%, #060118 100%)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>

        {/* Section tag */}
        <div style={{ ...fx(on, 0), display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <span className="font-rem"
            style={{ fontSize: '0.72rem', color: 'rgba(160,185,255,0.75)', letterSpacing: '0.14em',
              textTransform: 'uppercase', fontWeight: 700 }}>
            ✦ &nbsp; Why It Matters &nbsp; ✦
          </span>
        </div>

        <h2 id="why-matters-heading" className="font-karantina" style={{ ...H2_SECTION, ...fx(on, 80),
          color: '#F4F0FF', textAlign: 'center', marginBottom: '1rem' }}>
          Financial literacy is one of the most{' '}
          <span style={{ background: 'linear-gradient(90deg, #5077F2 0%, #8926E7 60%, #469EFF 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            important life skills.
          </span>
        </h2>

        <p className="font-rem" style={{ ...fx(on, 140),
          fontSize: 'clamp(0.92rem, 1.75vw, 1.05rem)', color: 'rgba(180,200,255,0.68)',
          lineHeight: 1.78, textAlign: 'center', maxWidth: '600px', margin: '0 auto 3.5rem' }}>
          And one of the least taught. PLEARN exists to change that — for organizations
          who want to make a genuine difference.
        </p>

        {/* 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '1.5rem' }}>
          {WHY_COLS.map((col, i) => (
            <div key={col.label} style={{ ...fx(on, 200 + i * 90),
              borderTop: `2px solid ${col.border}`,
              borderRadius: '0 0 16px 16px',
              background: 'rgba(255,255,255,0.025)',
              backdropFilter: 'blur(8px)',
              padding: '2rem 1.75rem',
              boxShadow: `0 0 30px ${col.glow}, 0 4px 20px rgba(0,0,0,0.40)`,
            }}>
              <div style={{ marginBottom: '0.85rem' }}>
                <span className="font-rem font-bold"
                  style={{ fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase',
                    color: col.color }}>
                  {col.label}
                </span>
              </div>
              <p className="font-rem"
                style={{ fontSize: '0.95rem', color: 'rgba(200,215,255,0.78)', lineHeight: 1.78 }}>
                {col.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. WhoWeWorkWith — partner type cards
// ─────────────────────────────────────────────────────────────────────────────
const PARTNER_TYPES = [
  {
    color: '#5077F2', border: 'rgba(80,119,242,0.55)', glow: 'rgba(80,119,242,0.22)',
    cardBg: 'linear-gradient(145deg, rgba(30,50,160,0.22) 0%, rgba(6,8,24,0.96) 60%)',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5077F2"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    label: 'Schools & Universities',
    desc: 'Integrate PLEARN as a financial literacy supplement — a practical, engaging resource for students exploring real money skills.',
  },
  {
    color: '#01DE5B', border: 'rgba(1,222,91,0.50)', glow: 'rgba(1,222,91,0.18)',
    cardBg: 'linear-gradient(145deg, rgba(0,100,40,0.20) 0%, rgba(4,10,18,0.96) 60%)',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#01DE5B"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    label: 'Youth Programs & NGOs',
    desc: 'Bring interactive financial education to the communities you serve — especially those with the least access to formal money guidance.',
  },
  {
    color: '#8926E7', border: 'rgba(137,38,231,0.55)', glow: 'rgba(137,38,231,0.20)',
    cardBg: 'linear-gradient(145deg, rgba(70,16,120,0.22) 0%, rgba(6,4,20,0.96) 60%)',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8926E7"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
    label: 'Banks & Credit Unions',
    desc: 'Offer financial education as a meaningful value-add for young customers — building trust and engagement through learning, not just products.',
  },
  {
    color: '#FE5934', border: 'rgba(254,89,52,0.50)', glow: 'rgba(254,89,52,0.18)',
    cardBg: 'linear-gradient(145deg, rgba(120,34,14,0.20) 0%, rgba(8,5,4,0.96) 60%)',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FE5934"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    label: 'Brands & Reward Partners',
    desc: "Feature your brand within PLEARN's learning-linked reward system — reaching an engaged, financially-curious audience in a relevant context.",
  },
  {
    color: '#469EFF', border: 'rgba(70,158,255,0.50)', glow: 'rgba(70,158,255,0.18)',
    cardBg: 'linear-gradient(145deg, rgba(20,60,160,0.20) 0%, rgba(4,8,24,0.96) 60%)',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#469EFF"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    label: 'Accelerators & Supporters',
    desc: 'Help grow an early-stage platform with a clear social mission — supporting financial education for a generation that genuinely needs it.',
  },
]

function WhoWeWorkWith() {
  const [ref, on] = useReveal()

  return (
    <section
      ref={ref}
      aria-labelledby="who-work-with-heading"
      style={{
        padding: '6rem 1.25rem',
        background: 'radial-gradient(ellipse 90% 60% at 50% 50%, rgba(80,119,242,0.06) 0%, transparent 70%), #060118',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Dot grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: DOT_GRID, backgroundRepeat: 'repeat', opacity: 0.55 }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>

        {/* Section tag */}
        <div style={{ ...fx(on, 0), display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <span className="font-rem"
            style={{ fontSize: '0.72rem', color: 'rgba(160,185,255,0.75)', letterSpacing: '0.14em',
              textTransform: 'uppercase', fontWeight: 700 }}>
            ✦ &nbsp; Who We Work With &nbsp; ✦
          </span>
        </div>

        <h2 id="who-work-with-heading" className="font-karantina" style={{ ...H2_SECTION, ...fx(on, 80),
          color: '#F4F0FF', textAlign: 'center', marginBottom: '1rem' }}>
          Who we're{' '}
          <span style={{ background: 'linear-gradient(90deg, #8926E7 0%, #5077F2 60%, #469EFF 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            looking to partner with
          </span>
        </h2>

        <p className="font-rem" style={{ ...fx(on, 140),
          fontSize: 'clamp(0.92rem, 1.75vw, 1.05rem)', color: 'rgba(180,200,255,0.68)',
          lineHeight: 1.78, textAlign: 'center', maxWidth: '560px', margin: '0 auto 3.5rem' }}>
          We're open to a range of partnerships — from educational pilots to brand integrations.
          Here's who we're building for.
        </p>

        {/* Cards: 2-col on tablet, then special 3+2 layout on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '1.25rem' }}>
          {PARTNER_TYPES.slice(0, 3).map((p, i) => (
            <PartnerCard key={p.label} p={p} delay={200 + i * 80} on={on} />
          ))}
        </div>
        {/* Bottom 2 cards — centred */}
        <div className="grid grid-cols-1 sm:grid-cols-2"
          style={{ gap: '1.25rem', marginTop: '1.25rem', maxWidth: '760px', marginLeft: 'auto', marginRight: 'auto' }}>
          {PARTNER_TYPES.slice(3).map((p, i) => (
            <PartnerCard key={p.label} p={p} delay={440 + i * 80} on={on} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PartnerCard({ p, delay, on }) {
  return (
    <div style={{ ...fx(on, delay),
      position: 'relative', borderRadius: '16px', overflow: 'hidden',
      background: p.cardBg,
      border: `1.5px solid ${p.border}`,
      boxShadow: `0 0 28px ${p.glow}, 0 6px 24px rgba(0,0,0,0.45)`,
      padding: '1.75rem 1.5rem',
    }}>
      {/* Left color accent bar */}
      <div aria-hidden="true" style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px',
        background: p.color,
        boxShadow: `0 0 16px ${p.glow}`,
        borderRadius: '16px 0 0 16px',
      }} />

      {/* Icon */}
      <div style={{
        width: '52px', height: '52px', borderRadius: '14px', marginBottom: '1.1rem',
        background: `rgba(255,255,255,0.04)`,
        border: `1px solid ${p.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 0 18px ${p.glow}`,
      }}>
        {p.icon}
      </div>

      <h3 className="font-karantina"
        style={{ fontSize: '1.35rem', lineHeight: 1.1, color: '#F4F0FF', marginBottom: '0.65rem' }}>
        {p.label}
      </h3>
      <p className="font-rem"
        style={{ fontSize: '0.88rem', color: 'rgba(195,210,255,0.72)', lineHeight: 1.72 }}>
        {p.desc}
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. HowPilotsWork — 3-step process
// ─────────────────────────────────────────────────────────────────────────────
const PILOT_STEPS = [
  {
    num: '01', color: '#5077F2',
    border: 'rgba(80,119,242,0.60)', glow: 'rgba(80,119,242,0.30)', farGlow: 'rgba(80,119,242,0.10)',
    cardBg: 'linear-gradient(145deg, rgba(30,50,160,0.26) 0%, rgba(5,8,24,0.97) 55%)',
    iconBg: 'rgba(16,36,140,0.92)', iconShadow: '0 0 20px rgba(80,119,242,0.60), 0 4px 14px rgba(0,0,0,0.60)',
    numClr: 'rgba(80,119,242,0.09)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5077F2"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'Reach Out',
    body: `Send us a short email at ${CONTACT.email} describing your organization and what you're exploring. We'll respond within a few days.`,
  },
  {
    num: '02', color: '#8926E7',
    border: 'rgba(137,38,231,0.60)', glow: 'rgba(137,38,231,0.30)', farGlow: 'rgba(137,38,231,0.10)',
    cardBg: 'linear-gradient(145deg, rgba(70,16,120,0.24) 0%, rgba(5,4,20,0.97) 55%)',
    iconBg: 'rgba(50,8,100,0.92)', iconShadow: '0 0 20px rgba(137,38,231,0.60), 0 4px 14px rgba(0,0,0,0.60)',
    numClr: 'rgba(137,38,231,0.09)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8926E7"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Discovery Call',
    body: "We'll set up a short call to understand your goals, your audience, and whether a PLEARN pilot makes sense for your context.",
  },
  {
    num: '03', color: '#469EFF',
    border: 'rgba(70,158,255,0.60)', glow: 'rgba(70,158,255,0.30)', farGlow: 'rgba(70,158,255,0.10)',
    cardBg: 'linear-gradient(145deg, rgba(20,60,160,0.24) 0%, rgba(4,8,24,0.97) 55%)',
    iconBg: 'rgba(12,48,150,0.92)', iconShadow: '0 0 20px rgba(70,158,255,0.55), 0 4px 14px rgba(0,0,0,0.60)',
    numClr: 'rgba(70,158,255,0.09)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#469EFF"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: 'Pilot Together',
    body: "We work with you to scope a focused pilot — a class, a cohort, or a campaign. We're flexible on format and keep the process lightweight.",
  },
]

function HowPilotsWork() {
  const [ref, on] = useReveal()

  return (
    <section
      id="how-pilots-work"
      ref={ref}
      aria-labelledby="how-pilots-heading"
      style={{
        padding: '6rem 1.25rem 5rem',
        background: 'linear-gradient(180deg, #060118 0%, #050010 100%)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>

        {/* Section tag */}
        <div style={{ ...fx(on, 0), display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <span className="font-rem"
            style={{ fontSize: '0.72rem', color: 'rgba(160,185,255,0.75)', letterSpacing: '0.14em',
              textTransform: 'uppercase', fontWeight: 700 }}>
            ✦ &nbsp; How It Works &nbsp; ✦
          </span>
        </div>

        <h2 id="how-pilots-heading" className="font-karantina" style={{ ...H2_SECTION, ...fx(on, 80),
          color: '#F4F0FF', textAlign: 'center', marginBottom: '1rem' }}>
          Starting a pilot is{' '}
          <span style={{ background: 'linear-gradient(90deg, #5077F2 0%, #469EFF 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            simple
          </span>
        </h2>

        <p className="font-rem" style={{ ...fx(on, 140),
          fontSize: 'clamp(0.92rem, 1.75vw, 1.05rem)', color: 'rgba(180,200,255,0.68)',
          lineHeight: 1.78, textAlign: 'center', maxWidth: '540px', margin: '0 auto 3.5rem' }}>
          We keep the process lightweight so you can explore whether PLEARN is the right fit
          — before any major commitment.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3"
          style={{ gap: '1.25rem', alignItems: 'stretch' }}>
          {PILOT_STEPS.map((s, i) => (
            <div key={s.num} style={{ ...fx(on, 200 + i * 90),
              position: 'relative', borderRadius: '18px', overflow: 'hidden',
              background: s.cardBg,
              border: `1.5px solid ${s.border}`,
              boxShadow: `0 0 0 1px ${s.farGlow}, 0 0 32px ${s.glow}, 0 8px 28px rgba(0,0,0,0.50)`,
              padding: '2rem 1.75rem 2rem',
            }}>
              {/* Ghost number */}
              <div aria-hidden="true" className="font-karantina pointer-events-none select-none"
                style={{ position: 'absolute', top: '-0.5rem', right: '0.75rem',
                  fontSize: '7rem', lineHeight: 1, color: s.numClr, userSelect: 'none' }}>
                {s.num}
              </div>

              {/* Icon */}
              <div style={{ position: 'relative', zIndex: 1,
                width: '72px', height: '72px', borderRadius: '20px',
                background: s.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: s.iconShadow, marginBottom: '1.4rem' }}>
                {s.icon}
              </div>

              <h3 className="font-karantina"
                style={{ position: 'relative', zIndex: 1, fontSize: '1.6rem', lineHeight: 1.1,
                  color: '#F4F0FF', marginBottom: '0.7rem' }}>
                {s.title}
              </h3>
              <p className="font-rem"
                style={{ position: 'relative', zIndex: 1,
                  fontSize: '0.90rem', color: 'rgba(195,210,255,0.72)', lineHeight: 1.75 }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* Horizon glow */}
        <div aria-hidden="true" style={{ marginTop: '3.5rem', height: '180px',
          background: 'linear-gradient(90deg, rgba(80,119,242,0.12) 0%, rgba(137,38,231,0.10) 50%, rgba(70,158,255,0.10) 100%)',
          filter: 'blur(60px)', borderRadius: '50%' }} />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. PartnerRewards — What Partners Get
// ─────────────────────────────────────────────────────────────────────────────
const PARTNER_BENEFITS = [
  {
    color: '#8926E7', border: 'rgba(137,38,231,0.50)', glow: 'rgba(137,38,231,0.20)',
    cardBg: 'linear-gradient(145deg, rgba(70,16,120,0.22) 0%, rgba(5,4,20,0.96) 60%)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8926E7"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Early Access',
    body: "Be among the first to run PLEARN with your audience — ahead of a wider public launch, and with direct input into how the platform develops.",
  },
  {
    color: '#5077F2', border: 'rgba(80,119,242,0.50)', glow: 'rgba(80,119,242,0.20)',
    cardBg: 'linear-gradient(145deg, rgba(30,50,160,0.20) 0%, rgba(5,8,24,0.96) 60%)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5077F2"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: 'Co-Design Input',
    body: "Share feedback that directly shapes the platform — missions, features, and reward categories. Early partners help build what PLEARN becomes.",
  },
  {
    color: '#01DE5B', border: 'rgba(1,222,91,0.45)', glow: 'rgba(1,222,91,0.16)',
    cardBg: 'linear-gradient(145deg, rgba(0,90,36,0.18) 0%, rgba(4,10,18,0.96) 60%)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#01DE5B"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    title: 'Impact Visibility',
    body: "Get a high-level view of learner engagement and progress during the pilot — helping you understand how the experience is landing with your audience.",
  },
  {
    color: '#FE5934', border: 'rgba(254,89,52,0.45)', glow: 'rgba(254,89,52,0.16)',
    cardBg: 'linear-gradient(145deg, rgba(110,30,10,0.18) 0%, rgba(8,4,4,0.96) 60%)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FE5934"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'Brand Presence',
    body: "Reward partners and sponsors gain relevant visibility within the PLEARN experience — reaching learners in a context where your brand genuinely fits.",
  },
]

function PartnerRewards() {
  const [ref, on] = useReveal()

  return (
    <section
      ref={ref}
      aria-labelledby="partner-rewards-heading"
      style={{
        padding: '6rem 1.25rem',
        background: 'radial-gradient(ellipse 80% 55% at 50% 50%, rgba(137,38,231,0.05) 0%, transparent 70%), #050010',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Dot grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: DOT_GRID, backgroundRepeat: 'repeat', opacity: 0.50 }} />

      <div style={{ maxWidth: '960px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>

        {/* Section tag */}
        <div style={{ ...fx(on, 0), display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <span className="font-rem"
            style={{ fontSize: '0.72rem', color: 'rgba(160,185,255,0.75)', letterSpacing: '0.14em',
              textTransform: 'uppercase', fontWeight: 700 }}>
            ✦ &nbsp; What Partners Get &nbsp; ✦
          </span>
        </div>

        <h2 id="partner-rewards-heading" className="font-karantina" style={{ ...H2_SECTION, ...fx(on, 80),
          color: '#F4F0FF', textAlign: 'center', marginBottom: '1rem' }}>
          What{' '}
          <span style={{ background: 'linear-gradient(90deg, #8926E7 0%, #5077F2 60%, #01DE5B 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            partners get
          </span>
        </h2>

        <p className="font-rem" style={{ ...fx(on, 140),
          fontSize: 'clamp(0.92rem, 1.75vw, 1.05rem)', color: 'rgba(180,200,255,0.68)',
          lineHeight: 1.78, textAlign: 'center', maxWidth: '560px', margin: '0 auto 3rem' }}>
          We're in beta — which means early partners help shape PLEARN and get
          first access to everything we build.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '1.25rem', maxWidth: '900px', margin: '0 auto' }}>
          {PARTNER_BENEFITS.map((b, i) => (
            <div key={b.title} style={{ ...fx(on, 200 + i * 80),
              position: 'relative', borderRadius: '16px', overflow: 'hidden',
              background: b.cardBg,
              border: `1.5px solid ${b.border}`,
              boxShadow: `0 0 28px ${b.glow}, 0 6px 24px rgba(0,0,0,0.45)`,
              padding: '1.75rem 1.75rem',
            }}>
              {/* Filled circle icon */}
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%', marginBottom: '1.1rem',
                background: `rgba(255,255,255,0.04)`,
                border: `1px solid ${b.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 16px ${b.glow}`,
              }}>
                {b.icon}
              </div>

              <h3 className="font-karantina"
                style={{ fontSize: '1.45rem', lineHeight: 1.1, color: '#F4F0FF', marginBottom: '0.6rem' }}>
                {b.title}
              </h3>
              <p className="font-rem"
                style={{ fontSize: '0.90rem', color: 'rgba(195,210,255,0.72)', lineHeight: 1.75 }}>
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. PartnersCTA — final conversion section
// ─────────────────────────────────────────────────────────────────────────────
function PartnersCTA() {
  const [ref, on] = useReveal(0.08)

  return (
    <section
      ref={ref}
      aria-labelledby="partners-cta-heading"
      style={{
        padding: '7rem 1.25rem 8rem',
        background: 'radial-gradient(ellipse 100% 90% at 50% 50%, rgba(80,119,242,0.18) 0%, rgba(137,38,231,0.12) 35%, transparent 70%), #040010',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(80,119,242,0.28) 0%, transparent 65%)' }} />

      {/* Dot grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: DOT_GRID, backgroundRepeat: 'repeat', opacity: 0.60 }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>

        {/* Badge */}
        <div style={{ ...fx(on, 0), display: 'flex', justifyContent: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            padding: '9px 24px', borderRadius: 9999,
            background: 'rgba(80,119,242,0.10)',
            border: '1.5px solid rgba(80,119,242,0.55)',
            boxShadow: '0 0 20px rgba(80,119,242,0.28), inset 0 0 12px rgba(80,119,242,0.07)',
          }}>
            <span aria-hidden="true" style={{ color: '#7BA8FF', fontSize: '0.70rem' }}>✦</span>
            <span className="font-rem"
              style={{ fontSize: '0.75rem', color: 'rgba(190,210,255,0.92)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>
              Get in Touch
            </span>
            <span aria-hidden="true" style={{ color: '#7BA8FF', fontSize: '0.70rem' }}>✦</span>
          </div>
        </div>

        <h2 id="partners-cta-heading" className="font-karantina"
          style={{ ...H2_CTA, ...fx(on, 80), color: '#F4F0FF',
            textShadow: '0 0 60px rgba(80,119,242,0.30), 0 2px 40px rgba(0,0,0,0.60)',
            marginBottom: '1.25rem',
            width: '100%', overflowWrap: 'normal', wordBreak: 'normal' }}>
          Ready to explore a{' '}
          <span style={{ background: 'linear-gradient(90deg, #5077F2 0%, #8926E7 50%, #469EFF 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            partnership?
          </span>
        </h2>

        <p className="font-rem" style={{ ...fx(on, 160),
          fontSize: 'clamp(0.95rem, 1.9vw, 1.1rem)', color: 'rgba(185,205,255,0.72)',
          lineHeight: 1.78, maxWidth: '520px', margin: '0 auto 2.5rem' }}>
          Whether you represent a school, a financial institution, or a brand — we'd love
          to hear from you. Reach out and let's start the conversation.
        </p>

        {/* CTAs */}
        <div style={{ ...fx(on, 220), display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={PARTNER_EMAIL} className="font-rem font-semibold"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '1rem 2.5rem', borderRadius: '14px', minWidth: '220px', justifyContent: 'center',
              background: 'linear-gradient(90deg, #5077F2 0%, #8926E7 50%, #573EFB 100%)',
              boxShadow: '0 0 28px rgba(80,119,242,0.55), 0 0 56px rgba(137,38,231,0.20), 0 8px 24px rgba(0,0,0,0.55)',
              color: '#FFFFFF', fontSize: '1rem', textDecoration: 'none',
              transition: 'opacity 0.2s, transform 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity='0.88'; e.currentTarget.style.transform='translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity='1';    e.currentTarget.style.transform='translateY(0)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Email Us to Partner
          </a>
          <a href={CTA.joinWaitlist} className="font-rem font-semibold"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
              padding: '1rem 2.5rem', borderRadius: '14px', minWidth: '190px', justifyContent: 'center',
              background: 'rgba(8,12,32,0.60)',
              border: '1.5px solid rgba(80,119,242,0.50)',
              boxShadow: '0 0 18px rgba(80,119,242,0.18), 0 8px 24px rgba(0,0,0,0.50)',
              color: '#FFFFFF', fontSize: '1rem', textDecoration: 'none',
              transition: 'opacity 0.2s, transform 0.2s, border-color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity='0.82'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.borderColor='rgba(80,119,242,0.80)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity='1';    e.currentTarget.style.transform='translateY(0)';   e.currentTarget.style.borderColor='rgba(80,119,242,0.50)' }}>
            Join the Waitlist
          </a>
        </div>

        {/* Fine print */}
        <p className="font-rem" style={{ ...fx(on, 300),
          marginTop: '2rem', fontSize: '0.78rem', color: 'rgba(160,180,255,0.45)', lineHeight: 1.7 }}>
          No commitment required. We're in beta and actively shaping our partnership model — all enquiries welcome.
        </p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Page shell
// ─────────────────────────────────────────────────────────────────────────────
export default function PartnersPage() {
  return (
    <>
      <PageBackground />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header style={{ position: 'relative', zIndex: 10 }}><Navbar /></header>
      <CoinBackground variant="partners" />
      <main id="main-content" style={{ position: 'relative', zIndex: 1 }}>
        <PartnersHero />
        <WhyItMatters />
        <WhoWeWorkWith />
        <HowPilotsWork />
        <PartnerRewards />
        <PartnersCTA />
      </main>
      <Footer />
    </>
  )
}
