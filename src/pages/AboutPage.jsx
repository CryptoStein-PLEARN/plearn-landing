// ─────────────────────────────────────────────────────────────────────────────
// AboutPage — /about
//
// Sections (in order):
//  1. AboutHero          — headline + mission statement + CTAs
//  2. StorySection       — why we built PLEARN / the problem
//  3. BeliefsSection     — 3 editorial belief cards
//  4. DifferentiatorSection — 4 cards: what makes PLEARN different
//  5. AudienceSection    — 3 audience cards
//  6. AboutCTA           — closing "Join the Beta" call to action
//
// Design notes:
//  - Fewer animations than Home, more editorial / typography-led
//  - Same design system: dark bg, purple/pink/blue neon, Karantina + REM fonts
//  - All "Join the Beta" CTAs use href="#waitlist" caught by global interceptor
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react'
import Navbar          from '@/components/layout/Navbar'
import Footer          from '@/components/layout/Footer'
import PageBackground  from '@/components/layout/PageBackground'
import CoinBackground  from '@/components/layout/CoinBackground'
import { COINS }       from '@/constants/assets'
import { CTA }         from '@/constants/config'

// ── Shared reveal hook ────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [on, setOn]  = useState(false)
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

// Fade-up style helper
const fx = (on, delay = 0) => ({
  opacity:    on ? 1 : 0,
  transform:  on ? 'translateY(0)' : 'translateY(22px)',
  transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
  willChange: 'opacity, transform',
})

// ── Shared heading sizes — About page section h2
// Desktop max: 64px (4rem) · Tablet: ~52–58px · Mobile: ~38px
// Spread into each section h2 style object alongside color, textShadow, etc.
const H2_SECTION = { fontSize: 'clamp(2.4rem, 4.8vw, 4rem)', lineHeight: 0.98, letterSpacing: '-0.01em' }
// CTA block is two-line — slightly smaller keeps it from dominating
const H2_CTA     = { fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', lineHeight: 0.98, letterSpacing: '-0.01em' }

// ── Section tag component ──────────────────────────────────────────────────────
function SectionTag({ children }) {
  return (
    <p className="section-tag" style={{ marginBottom: '1rem' }}>
      <span aria-hidden="true" style={{
        display: 'inline-block', width: 6, height: 6,
        borderRadius: '50%', background: '#8926E7',
        boxShadow: '0 0 6px rgba(137,38,231,0.85)',
        marginRight: 8, flexShrink: 0,
      }} />
      {children}
    </p>
  )
}

// ── Neon accent line ──────────────────────────────────────────────────────────
function AccentLine({ width = '3rem' }) {
  return (
    <div style={{
      width, height: '2px',
      background: 'linear-gradient(90deg, #8926E7, #469EFF)',
      boxShadow: '0 0 8px rgba(137,38,231,0.55)',
      borderRadius: 9999,
      margin: '1.4rem 0 0',
    }} />
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. About Hero
// ─────────────────────────────────────────────────────────────────────────────
function AboutHero() {
  return (
    <section
      aria-labelledby="about-hero-heading"
      style={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8rem 1.25rem 5rem',
        overflow: 'hidden',
      }}
    >
      {/* Radial glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: [
          'radial-gradient(ellipse 65% 55% at 50% 40%, rgba(137,38,231,0.16) 0%, transparent 65%)',
          'radial-gradient(ellipse 35% 30% at 75% 60%, rgba(87,62,251,0.08) 0%, transparent 55%)',
        ].join(', '),
      }} />

      {/* Decorative coins come from the global CoinBackground layer — no per-hero coin needed */}

      <div
        className="section-container"
        style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}
      >
        <SectionTag>About PLEARN</SectionTag>

        <h1
          id="about-hero-heading"
          className="font-karantina"
          style={{
            fontSize: 'clamp(2.6rem, 6vw, 4.6rem)',
            lineHeight: 1.05,
            color: '#F4F0FF',
            marginBottom: '1.5rem',
            letterSpacing: '-0.01em',
          }}
        >
          Money skills should feel{' '}
          <span style={{
            background: 'linear-gradient(90deg, #8926E7, #EF00BD)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            playable
          </span>
          , not intimidating.
        </h1>

        <p
          className="font-rem"
          style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.18rem)',
            color: 'rgba(200,180,240,0.75)',
            lineHeight: 1.7,
            maxWidth: '600px',
            margin: '0 auto 2.5rem',
          }}
        >
          PLEARN was created to help young people build real-world financial
          confidence through missions, choices, rewards, and game-based learning.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={CTA.joinBeta}
            className="btn-primary"
          >
            Join the Beta
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href={CTA.exploreDemo} className="btn-ghost">
            Explore the Game
          </a>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Story — Why We Built PLEARN
// ─────────────────────────────────────────────────────────────────────────────
function StorySection() {
  const [ref, on] = useReveal()

  return (
    <section
      id="about-story"
      ref={ref}
      aria-labelledby="story-heading"
      style={{ padding: '6rem 1.25rem', position: 'relative' }}
    >
      {/* Subtle left-side glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 45% 60% at 10% 50%, rgba(87,62,251,0.07) 0%, transparent 65%)',
      }} />

      <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative' }}>

        <div style={fx(on, 0)}>
          <SectionTag>The Story</SectionTag>
          <h2
            id="story-heading"
            className="font-karantina"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              color: '#F4F0FF',
              lineHeight: 1.1,
              marginBottom: '2rem',
            }}
          >
            Traditional financial education wasn't working.
          </h2>
        </div>

        {/* Pull quote */}
        <div style={{ ...fx(on, 100), margin: '0 0 2rem' }}>
          <div style={{
            borderLeft: '3px solid rgba(137,38,231,0.70)',
            paddingLeft: '1.5rem',
            margin: '0 0 2rem',
          }}>
            <p
              className="font-karantina"
              style={{
                fontSize: 'clamp(1.3rem, 3vw, 1.9rem)',
                color: 'rgba(200,170,255,0.85)',
                lineHeight: 1.35,
                fontStyle: 'italic',
              }}
            >
              "What if learning about money felt as engaging as your favourite game?"
            </p>
          </div>
        </div>

        <div style={fx(on, 160)}>
          <p
            className="font-rem"
            style={{
              fontSize: '1.05rem',
              color: 'rgba(190,170,230,0.72)',
              lineHeight: 1.8,
              marginBottom: '1.25rem',
            }}
          >
            Most young people enter adulthood without ever being taught how money actually
            works. Schools skip it. Banks obscure it. And every app that tries to help feels
            like homework — passive, abstract, and completely disconnected from real life.
          </p>
          <p
            className="font-rem"
            style={{
              fontSize: '1.05rem',
              color: 'rgba(190,170,230,0.72)',
              lineHeight: 1.8,
            }}
          >
            So we built PLEARN as a game — because that is how humans naturally learn.
            Every mission puts you inside a real financial situation. Every choice teaches
            something. Every reward reinforces the lesson. The result is financial knowledge
            that actually stays.
          </p>
          <AccentLine />
        </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Beliefs — rebuilt to match reference image exactly
// ─────────────────────────────────────────────────────────────────────────────

const BELIEFS = [
  {
    // Card 1 — pink / purple (reference: left card)
    accent:      '#C940FF',
    // dimBorder fills the 2px outer-wrapper gap when the rotating arc is elsewhere
    dimBorder:   'rgba(180,48,255,0.32)',
    outerGlow:   'rgba(180,48,255,0.36)',
    farGlow:     'rgba(180,48,255,0.10)',
    // Card interior: very dark with a subtle purple tint at top-left (matches reference)
    cardBg:      'linear-gradient(145deg, rgba(90,20,130,0.38) 0%, rgba(12,5,28,0.97) 50%)',
    // Icon badge: dark purple square (reference shows solid dark-purple bg)
    iconBg:      'rgba(90,15,140,0.92)',
    iconShadow:  '0 0 18px rgba(200,48,255,0.55), 0 4px 14px rgba(0,0,0,0.60)',
    accentLine:  '#C940FF',
    bloomColor:  '#C940FF',
    bloomGlow:   'rgba(200,48,255,0.55)',
    // Icon stroke = accent color (matches reference — pink/purple stroke, not white)
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#C940FF"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    title: 'Learning should be practical',
    body:  'Real decisions, not textbook exercises. Every mission is grounded in a situation you will actually face.',
  },
  {
    // Card 2 — violet / blue (reference: center card)
    accent:      '#6858FF',
    dimBorder:   'rgba(104,88,255,0.32)',
    outerGlow:   'rgba(104,88,255,0.36)',
    farGlow:     'rgba(104,88,255,0.10)',
    cardBg:      'linear-gradient(145deg, rgba(44,32,160,0.34) 0%, rgba(8,6,26,0.97) 50%)',
    iconBg:      'rgba(36,24,180,0.92)',
    iconShadow:  '0 0 18px rgba(104,88,255,0.55), 0 4px 14px rgba(0,0,0,0.60)',
    accentLine:  '#6858FF',
    bloomColor:  '#6858FF',
    bloomGlow:   'rgba(104,88,255,0.55)',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#6858FF"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Financial confidence should start early',
    body:  'The earlier you understand money, the stronger your foundation. We are building that start.',
  },
  {
    // Card 3 — green / cyan (reference: right card)
    accent:      '#01DE5B',
    dimBorder:   'rgba(1,200,80,0.28)',
    outerGlow:   'rgba(1,200,80,0.32)',
    farGlow:     'rgba(1,200,80,0.09)',
    cardBg:      'linear-gradient(145deg, rgba(0,70,30,0.32) 0%, rgba(4,14,10,0.97) 50%)',
    iconBg:      'rgba(0,88,34,0.92)',
    iconShadow:  '0 0 18px rgba(1,210,80,0.50), 0 4px 14px rgba(0,0,0,0.60)',
    accentLine:  '#01DE5B',
    bloomColor:  '#01DE5B',
    bloomGlow:   'rgba(1,210,80,0.55)',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#01DE5B"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Rewards should reinforce good habits',
    body:  'Progress is better when it is acknowledged. P-Coins, badges, and real rewards make every step count.',
  },
]

// Background sparkle dots — subtle stars, not coins
const BELIEF_STARS = [
  { left: '7%',  top: '14%', s: 2, d: '0s'  },
  { left: '24%', top: '5%',  s: 3, d: '1.2s' },
  { left: '52%', top: '8%',  s: 2, d: '0.6s' },
  { left: '77%', top: '4%',  s: 3, d: '1.8s' },
  { left: '93%', top: '20%', s: 2, d: '0.3s' },
  { left: '4%',  top: '80%', s: 2, d: '1.0s' },
  { left: '62%', top: '94%', s: 3, d: '0.8s' },
  { left: '90%', top: '76%', s: 2, d: '1.5s' },
  { left: '38%', top: '96%', s: 2, d: '0.4s' },
]

// Dot grid SVG — same as HowItWorksSection
const BELIEFS_DOT_GRID = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='0.75' fill='rgba(255%2C255%2C255%2C0.055)'/%3E%3C/svg%3E")`

function BeliefsSection() {
  const [ref, on] = useReveal()

  return (
    <section
      id="about-beliefs"
      ref={ref}
      aria-labelledby="beliefs-heading"
      // overflow:hidden clips the absolute-positioned coins to this section only
      // background matches HowItWorks dark base
      className="relative overflow-hidden"
      style={{ padding: '5.5rem 1.25rem 7rem', background: '#080220' }}
    >

      {/* ── Dot grid texture — same as HowItWorksSection ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: BELIEFS_DOT_GRID, backgroundRepeat: 'repeat' }} />

      {/* ── Top-edge blend ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-36 z-[2]"
        style={{ background: 'linear-gradient(to bottom, rgba(5,2,16,0.65) 0%, transparent 100%)' }} />

      {/* ── Atmospheric glow blobs — same technique as HowItWorksSection ──
           Tailwind blur-[100px]/blur-[130px] classes trigger the mobile
           kill-rule in index.css so these auto-hide on phones (<768px).      */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[110px]"
        style={{ background: 'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(137,38,231,0.20) 0%, transparent 68%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[100px]"
        style={{ background: 'radial-gradient(ellipse 45% 55% at 12% 60%, rgba(201,64,255,0.14) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[100px]"
        style={{ background: 'radial-gradient(ellipse 45% 55% at 88% 60%, rgba(1,222,91,0.10) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 50% 42% at 90% 8%, rgba(87,62,251,0.18) 0%, transparent 68%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 44% 38% at 6% 90%, rgba(104,88,255,0.12) 0%, transparent 65%)' }} />

      {/* ── Floating P-coins — position:absolute, clipped by overflow:hidden above ──
           Mirrors the HowItWorksSection coin approach exactly.
           Large coins sit at the left/right edges, partially off-screen.
           Cards are centered content so the edge coins do NOT sit behind them.
           hidden sm:block → coins disappear on phones (<640px).              */}

      {/* Left coin — large purpleStyled, left edge, vertically centered */}
      <img src={COINS.purpleStyled} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden sm:block"
        style={{
          width: '500px', height: '500px',
          left: '-90px', top: '50%',
          transform: 'translateY(-50%)',
          objectFit: 'contain',
          opacity: 0.11,
          filter: 'blur(1px) drop-shadow(0 0 18px rgba(137,38,231,0.55)) drop-shadow(0 0 40px rgba(87,62,251,0.30))',
          animationDelay: '0.4s', animationDuration: '6.5s',
          zIndex: 0,
        }}
      />

      {/* Right coin — large blue, right edge, vertically centered */}
      <img src={COINS.blue} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden sm:block"
        style={{
          width: '400px', height: '400px',
          right: '-80px', top: '45%',
          transform: 'translateY(-50%)',
          objectFit: 'contain',
          opacity: 0.09,
          filter: 'blur(1.5px) drop-shadow(0 0 16px rgba(70,158,255,0.50)) drop-shadow(0 0 36px rgba(70,158,255,0.25))',
          animationDelay: '1.8s', animationDuration: '7.5s',
          zIndex: 0,
        }}
      />

      {/* Small coin — upper-right, inside section, smaller and more opaque */}
      <img src={COINS.orange} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden sm:block"
        style={{
          width: '200px', height: '200px',
          right: '3%', top: '8%',
          objectFit: 'contain',
          opacity: 0.065,
          filter: 'blur(2px) drop-shadow(0 0 12px rgba(254,89,52,0.40))',
          animationDelay: '3.5s', animationDuration: '8.5s',
          zIndex: 0,
        }}
      />

      {/* ── Sparkle star particles ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
      }}>
        {BELIEF_STARS.map((s, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: s.left, top: s.top,
            width: s.s, height: s.s,
            borderRadius: '50%',
            background: 'rgba(220,200,255,0.90)',
            boxShadow: `0 0 ${s.s * 2}px rgba(200,170,255,0.80)`,
            animation: `sparkle-twinkle 3s ease-in-out ${s.d} infinite`,
          }} />
        ))}
      </div>

      <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>

        {/* ── Headline — large, matches reference ── */}
        <div style={{ textAlign: 'center', marginBottom: '3rem', ...fx(on, 0) }}>
          <SectionTag>What We Believe</SectionTag>
          <h2
            id="beliefs-heading"
            className="font-karantina"
            style={{
              ...H2_SECTION,
              color: '#F4F0FF',
              letterSpacing: '-0.01em',
              textShadow: '0 0 50px rgba(160,100,255,0.22)',
              marginBottom: '1.5rem',
            }}
          >
            Three principles behind everything we build.
          </h2>
          {/* Short centered gradient underline — matches reference */}
          <div style={{
            margin: '0 auto',
            width: 'clamp(160px, 16%, 220px)',
            height: '2.5px',
            background: 'linear-gradient(90deg, transparent 0%, #8926E7 30%, #9B7FFF 50%, #5077F2 70%, transparent 100%)',
            boxShadow: '0 0 12px rgba(137,38,231,0.90), 0 0 30px rgba(130,100,255,0.50)',
            borderRadius: 9999,
          }} />
        </div>

        {/* ── Card grid ── */}
        {/*
          Desktop: 3 equal columns, same height (CSS Grid align-items:stretch default).
          Mobile: single column stack.
          Gap matches reference spacing.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: '1.25rem' }}>
          {BELIEFS.map((b, i) => (
            /*
             * ANIMATED NEON BORDER — how it works:
             *
             * Layer 1 — Outer wrapper ("border sleeve"):
             *   • padding: 2px creates a 2px gap between wrapper and inner card
             *   • background: b.dimBorder is the always-on dim ring color
             *   • overflow: hidden clips the oversized rotating div
             *   • The dim ring is always visible, even when the bright arc is on the far side
             *
             * Layer 2 — Rotating conic-gradient div:
             *   • 200% × 200% sized, offset by -50%/-50% so its center aligns with
             *     the card's center (conic-gradient radiates from center)
             *   • Bright 100° arc (accent → white peak → accent) sweeps around the border
             *   • animation: rotateBorder spins it at 6-7s per revolution
             *   • z-index 0 — sits above wrapper bg, below inner content
             *
             * Layer 3 — Inner card div:
             *   • z-index 1 — covers the center area, revealing only the 2px border
             *   • Has the dark tinted background matching card color
             *   • flex: 1 ensures it fills the full wrapper height (equal card heights)
             */
            <div
              key={b.title}
              style={{
                ...fx(on, 80 + i * 100),
                // ── OUTER WRAPPER (the "border sleeve") ──
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                padding: '2px',
                borderRadius: '20px',
                overflow: 'hidden',
                // dimBorder fills the 2px gap as the always-on dim ring
                background: b.dimBorder,
                // Colored outer glow around the entire card
                boxShadow: [
                  `0 0 35px ${b.outerGlow}`,
                  `0 0 80px ${b.farGlow}`,
                  '0 18px 48px rgba(0,0,0,0.68)',
                ].join(', '),
              }}
            >
              {/* ── ROTATING NEON BORDER ── */}
              <div
                aria-hidden="true"
                style={{
                  position:  'absolute',
                  width:     '200%',
                  height:    '200%',
                  top:       '-50%',
                  left:      '-50%',
                  // Bright 100° arc (transparent → dim → accent → white peak → accent → dim → transparent)
                  // The white hotspot makes the corner flash clearly visible
                  background: `conic-gradient(
                    from 0deg at 50% 50%,
                    transparent   0deg,
                    transparent  35deg,
                    ${b.dimBorder} 55deg,
                    ${b.accent}   80deg,
                    rgba(255,255,255,0.95) 95deg,
                    ${b.accent}  110deg,
                    ${b.dimBorder} 130deg,
                    transparent  150deg,
                    transparent  360deg
                  )`,
                  // Each card rotates at a slightly different speed so they don't sync
                  animation:   `rotateBorder ${6 + i * 0.8}s linear infinite`,
                  zIndex:      0,
                  willChange:  'transform',
                }}
              />

              {/* ── INNER CARD CONTENT ── */}
              <div style={{
                position:       'relative',
                zIndex:         1,
                flex:           1,           // fills full wrapper height → equal card heights
                display:        'flex',
                flexDirection:  'column',
                // Tinted dark background matching card color (top-left tint, dark center)
                background:     b.cardBg,
                borderRadius:   '18px',
                padding:        '2rem 2rem 3.5rem',  // extra bottom for the glow
                overflow:       'hidden',
              }}>

                {/* ── Icon badge ── */}
                <div style={{
                  width:          68,
                  height:         68,
                  borderRadius:   '14px',
                  background:     b.iconBg,
                  boxShadow:      b.iconShadow,
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  flexShrink:     0,
                  marginBottom:   '1rem',
                }}>
                  {b.icon}
                </div>

                {/* ── Short accent line under icon — matches reference ── */}
                <div style={{
                  width:        '42px',
                  height:       '3px',
                  background:   b.accentLine,
                  boxShadow:    `0 0 8px ${b.accentLine}, 0 0 18px ${b.bloomGlow}`,
                  borderRadius: 9999,
                  marginBottom: '1.5rem',
                }} />

                {/* ── Title — bold, white ── */}
                <h3
                  className="font-rem"
                  style={{
                    fontSize:     '1.1rem',
                    fontWeight:   700,
                    color:        '#FFFFFF',
                    lineHeight:   1.3,
                    marginBottom: '0.9rem',
                  }}
                >
                  {b.title}
                </h3>

                {/* ── Body ── */}
                <p
                  className="font-rem"
                  style={{
                    fontSize:   '0.90rem',
                    color:      'rgba(160,145,195,0.75)',
                    lineHeight: 1.75,
                    flex:       1,
                  }}
                >
                  {b.body}
                </p>

                {/*
                  ── BOTTOM LIGHT SOURCE — matches reference ──
                  Reference shows: a small bright orb/point at the very bottom center,
                  glowing upward into the card. Not a bar — a concentrated point source.

                  Layer A: wide radial bloom filling lower 40% of card
                  Layer B: concentrated bright 2px line at absolute bottom center
                           with multi-spread box-shadow = the "light bulb" effect
                */}

                {/* Layer A — diffuse upward bloom */}
                <div aria-hidden="true" style={{
                  position:   'absolute',
                  bottom:     0,
                  left:       0,
                  right:      0,
                  height:     '120px',
                  background: `radial-gradient(ellipse 60% 100% at 50% 100%, ${b.bloomGlow} 0%, transparent 72%)`,
                  pointerEvents: 'none',
                }} />

                {/* Layer B — the bright point/line at bottom center */}
                <div aria-hidden="true" style={{
                  position:      'absolute',
                  bottom:        0,
                  left:          '50%',
                  transform:     'translateX(-50%)',
                  width:         '50%',
                  height:        '2px',
                  background:    b.bloomColor,
                  // 4 concentric glows: immediate glow → spread glow → far halo → upward push
                  boxShadow: [
                    `0 0 4px 1px ${b.bloomColor}`,
                    `0 0 12px 4px ${b.bloomGlow}`,
                    `0 0 30px 10px ${b.outerGlow}`,
                    `0 -12px 40px 8px ${b.farGlow}`,
                  ].join(', '),
                  borderRadius:  9999,
                  pointerEvents: 'none',
                }} />

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Differentiators — 2×2 horizontal cards, rebuilt to match reference
// ─────────────────────────────────────────────────────────────────────────────

const DIFFS = [
  {
    num: '01',
    // Purple
    color:     '#8926E7',
    border:    'rgba(137,38,231,0.65)',
    outerGlow: 'rgba(137,38,231,0.38)',
    farGlow:   'rgba(137,38,231,0.11)',
    cardBg:    'linear-gradient(135deg, rgba(90,20,160,0.30) 0%, rgba(8,4,22,0.97) 55%)',
    iconBg:    'rgba(65,10,120,0.92)',
    iconShadow:'0 0 20px rgba(137,38,231,0.65), 0 4px 14px rgba(0,0,0,0.60)',
    numClr:    'rgba(137,38,231,0.11)',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8926E7"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    title: 'Mission-based learning',
    body:  'Each module is a real-world financial scenario wrapped in a compelling challenge. You do not read about money — you navigate it.',
  },
  {
    num: '02',
    // Blue
    color:     '#5077F2',
    border:    'rgba(80,119,242,0.65)',
    outerGlow: 'rgba(80,119,242,0.35)',
    farGlow:   'rgba(80,119,242,0.10)',
    cardBg:    'linear-gradient(135deg, rgba(40,60,200,0.28) 0%, rgba(6,8,24,0.97) 55%)',
    iconBg:    'rgba(28,44,170,0.92)',
    iconShadow:'0 0 20px rgba(80,119,242,0.65), 0 4px 14px rgba(0,0,0,0.60)',
    numClr:    'rgba(80,119,242,0.11)',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5077F2"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
    title: 'Real-life financial scenarios',
    body:  'Budgeting, saving, investing, credit — the exact decisions young people actually face. Simulated safely inside the game.',
  },
  {
    num: '03',
    // Green
    color:     '#01DE5B',
    border:    'rgba(1,210,80,0.60)',
    outerGlow: 'rgba(1,210,80,0.32)',
    farGlow:   'rgba(1,210,80,0.09)',
    cardBg:    'linear-gradient(135deg, rgba(0,80,30,0.28) 0%, rgba(4,14,10,0.97) 55%)',
    iconBg:    'rgba(0,75,26,0.92)',
    iconShadow:'0 0 20px rgba(1,222,91,0.60), 0 4px 14px rgba(0,0,0,0.60)',
    numClr:    'rgba(1,222,91,0.10)',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#01DE5B"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 9H4a2 2 0 0 0 0 4h2"/>
        <path d="M18 9h2a2 2 0 0 1 0 4h-2"/>
        <path d="M6 5h12v9a6 6 0 0 1-12 0V5z"/>
        <line x1="9" y1="21" x2="15" y2="21"/>
        <line x1="12" y1="18" x2="12" y2="21"/>
      </svg>
    ),
    title: 'Progress and rewards',
    body:  'Every completed mission earns P-Coins, badges, and real-world rewards. Progress is visible, tangible, and worth celebrating.',
  },
  {
    num: '04',
    // Pink
    color:     '#EF00BD',
    border:    'rgba(239,0,189,0.60)',
    outerGlow: 'rgba(239,0,189,0.30)',
    farGlow:   'rgba(239,0,189,0.09)',
    cardBg:    'linear-gradient(135deg, rgba(140,0,90,0.24) 0%, rgba(18,4,16,0.97) 55%)',
    iconBg:    'rgba(110,0,72,0.92)',
    iconShadow:'0 0 20px rgba(239,0,189,0.60), 0 4px 14px rgba(0,0,0,0.60)',
    numClr:    'rgba(239,0,189,0.10)',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#EF00BD"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
    ),
    title: 'Built for digital natives',
    body:  'Designed for the generation that grew up playing games and expects their apps to feel the same — fast, rewarding, and alive.',
  },
]

// Dot grid — same as HowItWorksSection / BeliefsSection
const DIFFS_DOT_GRID = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='0.75' fill='rgba(255%2C255%2C255%2C0.055)'/%3E%3C/svg%3E")`

function DifferentiatorSection() {
  const [ref, on] = useReveal()

  return (
    <section
      id="about-different"
      ref={ref}
      aria-labelledby="diff-heading"
      className="relative overflow-hidden"
      style={{ padding: '5.5rem 1.25rem 7rem', background: '#06011A' }}
    >
      {/* Dot grid texture */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: DIFFS_DOT_GRID, backgroundRepeat: 'repeat' }} />

      {/* Top-edge blend */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-36 z-[2]"
        style={{ background: 'linear-gradient(to bottom, rgba(4,1,14,0.70) 0%, transparent 100%)' }} />

      {/* Atmospheric glow blobs — auto-hidden on mobile by the blur-[1xx] CSS rule */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[110px]"
        style={{ background: 'radial-gradient(ellipse 60% 45% at 50% 5%, rgba(137,38,231,0.22) 0%, transparent 70%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[100px]"
        style={{ background: 'radial-gradient(ellipse 40% 50% at 8% 55%, rgba(80,119,242,0.16) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[100px]"
        style={{ background: 'radial-gradient(ellipse 40% 50% at 92% 55%, rgba(1,222,91,0.12) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 45% 40% at 88% 10%, rgba(239,0,189,0.14) 0%, transparent 68%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 40% 35% at 8% 88%, rgba(137,38,231,0.12) 0%, transparent 65%)' }} />

      {/* P-coin — far left edge, partially off-screen */}
      <img src={COINS.magenta} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden lg:block"
        style={{
          width: '460px', height: '460px',
          left: '-100px', top: '50%',
          transform: 'translateY(-50%)',
          objectFit: 'contain',
          opacity: 0.10,
          filter: 'blur(1px) drop-shadow(0 0 18px rgba(239,0,189,0.45)) drop-shadow(0 0 38px rgba(137,38,231,0.28))',
          animationDelay: '0.6s', animationDuration: '7s',
          zIndex: 0,
        }}
      />

      {/* P-coin — far right edge, partially off-screen */}
      <img src={COINS.green} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden lg:block"
        style={{
          width: '380px', height: '380px',
          right: '-85px', top: '40%',
          transform: 'translateY(-50%)',
          objectFit: 'contain',
          opacity: 0.09,
          filter: 'blur(1.5px) drop-shadow(0 0 16px rgba(1,222,91,0.45)) drop-shadow(0 0 34px rgba(1,200,80,0.24))',
          animationDelay: '2.2s', animationDuration: '8s',
          zIndex: 0,
        }}
      />

      {/* ── Content ── */}
      <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>

        {/* ── Headline block — centered ── */}
        <div style={{ textAlign: 'center', marginBottom: '3rem', ...fx(on, 0) }}>
          <SectionTag>What Makes Us Different</SectionTag>

          <h2
            id="diff-heading"
            className="font-karantina"
            style={{
              ...H2_SECTION,
              color: '#F4F0FF',
              textShadow: '0 0 50px rgba(137,38,231,0.22)',
              marginBottom: '1.5rem',
            }}
          >
            Built for{' '}
            <span style={{
              background: 'linear-gradient(90deg, #8926E7 0%, #5077F2 55%, #469EFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              real
            </span>
            {' '}financial growth.
          </h2>

          {/* Gradient underline */}
          <div style={{
            margin: '0 auto 1.75rem',
            width: 'clamp(160px, 16%, 220px)',
            height: '2.5px',
            background: 'linear-gradient(90deg, transparent 0%, #8926E7 30%, #5077F2 55%, #469EFF 70%, transparent 100%)',
            boxShadow: '0 0 12px rgba(137,38,231,0.90), 0 0 30px rgba(80,119,242,0.45)',
            borderRadius: 9999,
          }} />

          <p
            className="font-rem"
            style={{
              fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
              color: 'rgba(190,175,230,0.70)',
              lineHeight: 1.7,
              maxWidth: '580px',
              margin: '0 auto',
            }}
          >
            PLEARN isn't just another learning platform. It's a game that makes money skills click, stick, and show up in real life.
          </p>
        </div>

        {/* ── 2×2 Card grid — horizontal layout cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '1.25rem' }}>
          {DIFFS.map((d, i) => (
            /*
             * HORIZONTAL CARD LAYOUT:
             *  ┌──────────────────────────────────────────────┐
             *  │ [○ icon]  Title                          [01]│
             *  │           ─────                              │
             *  │           Body text body text body text      │
             *  └──────────────────────────────────────────────┘
             *
             * position:relative + overflow:hidden clips internal absolute elements.
             * The grid's align-items:stretch (default) ensures cards in the same
             * row share equal height.
             */
            <div
              key={d.title}
              style={{
                ...fx(on, 80 + i * 70),
                position:     'relative',
                overflow:     'hidden',
                display:      'flex',
                alignItems:   'flex-start',
                gap:          '1.5rem',
                // Dark tinted card background
                background:   d.cardBg,
                // Neon border — visible but not messy
                border:       `1.5px solid ${d.border}`,
                borderRadius: '16px',
                padding:      '1.75rem 2rem',
                // Colored glow: ring + outer spread + depth shadow
                boxShadow: [
                  `0 0 0 1px ${d.border}`,
                  `0 0 28px ${d.outerGlow}`,
                  `0 0 70px ${d.farGlow}`,
                  `inset 0 1px 0 rgba(255,255,255,0.06)`,
                  '0 16px 44px rgba(0,0,0,0.65)',
                ].join(', '),
              }}
            >
              {/* Faint large watermark number — top-right corner */}
              <span
                aria-hidden="true"
                className="font-karantina select-none pointer-events-none absolute"
                style={{
                  top: '0.4rem', right: '1.1rem',
                  fontSize: '5.5rem', lineHeight: 1,
                  color: d.numClr,
                  letterSpacing: '-0.02em',
                }}
              >
                {d.num}
              </span>

              {/* ── Circular glowing icon — left ── */}
              <div style={{
                width:          64,
                height:         64,
                borderRadius:   '50%',
                background:     d.iconBg,
                boxShadow:      d.iconShadow,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                flexShrink:     0,
                marginTop:      '0.2rem',  // slight top offset for optical alignment
              }}>
                {d.icon}
              </div>

              {/* ── Text content — right ── */}
              <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
                <h3
                  className="font-rem"
                  style={{
                    fontSize:     '1.08rem',
                    fontWeight:   700,
                    color:        '#FFFFFF',
                    lineHeight:   1.3,
                    marginBottom: '0.55rem',
                  }}
                >
                  {d.title}
                </h3>

                {/* Short neon accent line under title */}
                <div style={{
                  width:        '36px',
                  height:       '2.5px',
                  background:   d.color,
                  boxShadow:    `0 0 8px ${d.color}, 0 0 18px ${d.outerGlow}`,
                  borderRadius: 9999,
                  marginBottom: '0.85rem',
                }} />

                <p
                  className="font-rem"
                  style={{
                    fontSize:   '0.88rem',
                    color:      'rgba(160,145,195,0.72)',
                    lineHeight: 1.75,
                  }}
                >
                  {d.body}
                </p>
              </div>

              {/* Subtle bottom-edge glow matching card color */}
              <div aria-hidden="true" style={{
                position:      'absolute',
                bottom:        0, left: 0, right: 0,
                height:        '70px',
                background:    `radial-gradient(ellipse 55% 100% at 50% 100%, ${d.farGlow} 0%, transparent 70%)`,
                pointerEvents: 'none',
              }} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. Audience — "Who PLEARN is for" — rebuilt to match reference image
//    Animated neon border (rotateBorder keyframe), glassmorphism tall cards,
//    square icon badge, dotted texture upper-right, CTA + circular arrow.
// ─────────────────────────────────────────────────────────────────────────────

const AUDIENCES = [
  {
    // ── Purple / Pink — Students
    color:       '#8926E7',
    dimBorder:   'rgba(137,38,231,0.50)',
    outerGlow:   'rgba(137,38,231,0.40)',
    farGlow:     'rgba(137,38,231,0.12)',
    cardBg:      'linear-gradient(145deg, rgba(80,18,140,0.34) 0%, rgba(10,4,22,0.97) 55%)',
    iconBg:      'rgba(60,8,115,0.92)',
    iconShadow:  '0 0 22px rgba(137,38,231,0.70), 0 4px 14px rgba(0,0,0,0.60)',
    accentLine:  '#8926E7',
    spinDuration:'6.5s',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#8926E7"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    label:    'Students & Young Adults',
    body:     'Build the financial skills your school never taught you. Complete missions, earn rewards, and start your financial journey on your own terms.',
    cta:      'Join the Beta',
    ctaHref:  '#waitlist',
  },
  {
    // ── Blue — Schools
    color:       '#469EFF',
    dimBorder:   'rgba(70,158,255,0.48)',
    outerGlow:   'rgba(70,158,255,0.35)',
    farGlow:     'rgba(70,158,255,0.10)',
    cardBg:      'linear-gradient(145deg, rgba(24,48,190,0.28) 0%, rgba(5,8,24,0.97) 55%)',
    iconBg:      'rgba(16,38,160,0.92)',
    iconShadow:  '0 0 22px rgba(70,158,255,0.65), 0 4px 14px rgba(0,0,0,0.60)',
    accentLine:  '#469EFF',
    spinDuration:'7.2s',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#469EFF"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="2" width="16" height="20" rx="2"/>
        <path d="M9 7h6M9 11h6M9 15h4"/>
      </svg>
    ),
    label:    'Schools & Youth Programs',
    body:     'A ready-to-deploy financial literacy curriculum your students will actually want to use. Measurable outcomes, engaging delivery, and zero extra workload for educators.',
    cta:      'Partner With Us',
    ctaHref:  'mailto:info@plearn.io?subject=School%20Partnership%20Enquiry',
  },
  {
    // ── Green — Banks & Partners
    color:       '#01DE5B',
    dimBorder:   'rgba(1,200,80,0.45)',
    outerGlow:   'rgba(1,200,80,0.32)',
    farGlow:     'rgba(1,200,80,0.09)',
    cardBg:      'linear-gradient(145deg, rgba(0,68,26,0.30) 0%, rgba(4,14,10,0.97) 55%)',
    iconBg:      'rgba(0,62,22,0.92)',
    iconShadow:  '0 0 22px rgba(1,222,91,0.65), 0 4px 14px rgba(0,0,0,0.60)',
    accentLine:  '#01DE5B',
    spinDuration:'7.8s',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#01DE5B"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
        <line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
    label:    'Banks, Fintechs & Partners',
    body:     'Engage your customers with meaningful, branded financial education experiences. PLEARN integrates real rewards into the learning journey — driving loyalty and financial wellness at scale.',
    cta:      'Start a Pilot',
    ctaHref:  'mailto:info@plearn.io?subject=PLEARN%20Pilot%20Partnership',
  },
]

// Dot grid reused for section bg — same as HowItWorks / BeliefsSection
const AUDIENCE_BG_GRID = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='0.75' fill='rgba(255%2C255%2C255%2C0.055)'/%3E%3C/svg%3E")`

// Denser dot grid for the in-card decorative upper-right pattern
const AUDIENCE_CARD_DOTS = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='10' cy='10' r='0.9' fill='rgba(255%2C255%2C255%2C0.09)'/%3E%3C/svg%3E")`

function AudienceSection() {
  const [ref, on] = useReveal()

  return (
    <section
      id="about-audience"
      ref={ref}
      aria-labelledby="audience-heading"
      className="relative overflow-hidden"
      style={{ padding: '5.5rem 1.25rem 7.5rem', background: '#080220' }}
    >
      {/* ── Section background ── */}

      {/* Dot grid texture */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: AUDIENCE_BG_GRID, backgroundRepeat: 'repeat' }} />

      {/* Top-edge blend */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-40 z-[2]"
        style={{ background: 'linear-gradient(to bottom, rgba(5,2,16,0.72) 0%, transparent 100%)' }} />

      {/* Atmospheric glow blobs — auto-hidden on mobile by blur-[1xx] CSS rule */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[110px]"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 8%, rgba(137,38,231,0.24) 0%, transparent 70%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[100px]"
        style={{ background: 'radial-gradient(ellipse 38% 55% at 5% 55%, rgba(137,38,231,0.14) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[100px]"
        style={{ background: 'radial-gradient(ellipse 38% 55% at 95% 55%, rgba(1,222,91,0.11) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 40% 38% at 85% 12%, rgba(70,158,255,0.13) 0%, transparent 68%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse 40% 35% at 15% 88%, rgba(137,38,231,0.10) 0%, transparent 65%)' }} />

      {/* P-coin — far left edge, partially off-screen */}
      <img src={COINS.purpleStyled} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden lg:block"
        style={{
          width: '500px', height: '500px',
          left: '-130px', top: '32%',
          objectFit: 'contain',
          opacity: 0.11,
          filter: 'blur(1px) drop-shadow(0 0 22px rgba(137,38,231,0.50)) drop-shadow(0 0 44px rgba(137,38,231,0.22))',
          animationDelay: '0s', animationDuration: '8.5s',
          zIndex: 0,
        }}
      />

      {/* P-coin — far right edge, partially off-screen */}
      <img src={COINS.blue} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden lg:block"
        style={{
          width: '420px', height: '420px',
          right: '-110px', top: '38%',
          objectFit: 'contain',
          opacity: 0.09,
          filter: 'blur(1.5px) drop-shadow(0 0 18px rgba(70,158,255,0.45)) drop-shadow(0 0 36px rgba(70,158,255,0.20))',
          animationDelay: '2.5s', animationDuration: '9s',
          zIndex: 0,
        }}
      />

      {/* ── Content ── */}
      <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>

        {/* ── Headline block — centered ── */}
        <div style={{ textAlign: 'center', marginBottom: '3rem', ...fx(on, 0) }}>

          {/* Label with dots on both sides — per reference */}
          <p className="section-tag" style={{ marginBottom: '1rem', justifyContent: 'center' }}>
            <span aria-hidden="true" style={{
              display: 'inline-block', width: 6, height: 6,
              borderRadius: '50%', background: '#8926E7',
              boxShadow: '0 0 6px rgba(137,38,231,0.85)',
              marginRight: 10, flexShrink: 0,
            }} />
            Who We Serve
            <span aria-hidden="true" style={{
              display: 'inline-block', width: 6, height: 6,
              borderRadius: '50%', background: '#8926E7',
              boxShadow: '0 0 6px rgba(137,38,231,0.85)',
              marginLeft: 10, flexShrink: 0,
            }} />
          </p>

          <h2
            id="audience-heading"
            className="font-karantina"
            style={{
              ...H2_SECTION,
              color: '#F4F0FF',
              textShadow: '0 0 60px rgba(137,38,231,0.20)',
            }}
          >
            Who PLEARN is for
            <span style={{ color: '#8926E7' }}>.</span>
          </h2>
        </div>

        {/* ── 3 tall vertical cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: '1.5rem', alignItems: 'stretch' }}>
          {AUDIENCES.map((a, i) => (
            /*
             * ANIMATED NEON BORDER TECHNIQUE (same as BeliefsSection):
             *  Layer 1 — Outer wrapper: padding:2px, always-on dim border bg
             *  Layer 2 — Rotating div (200%×200%): conic-gradient neon arc
             *  Layer 3 — Inner content div: actual card visuals, z-index:1
             *
             * Outer boxShadow provides the outer bloom / bottom glow effect.
             */
            <div
              key={a.label}
              style={{
                ...fx(on, 80 + i * 90),
                position:     'relative',
                padding:      '2px',
                borderRadius: '18px',
                overflow:     'hidden',
                background:   a.dimBorder,
                // Outer neon bloom + bottom glow
                boxShadow: [
                  `0 0 30px ${a.outerGlow}`,
                  `0 0 80px ${a.farGlow}`,
                  `0 24px 60px rgba(0,0,0,0.72)`,
                ].join(', '),
                display:       'flex',
                flexDirection: 'column',
              }}
            >
              {/* ── Rotating neon arc (rotateBorder keyframe in index.css) ── */}
              <div aria-hidden="true" style={{
                position:  'absolute',
                width:     '200%',
                height:    '200%',
                top:       '-50%',
                left:      '-50%',
                background: `conic-gradient(
                  from 0deg at 50% 50%,
                  transparent       0deg,
                  transparent      80deg,
                  ${a.color}33    120deg,
                  ${a.color}BB    165deg,
                  ${a.color}      180deg,
                  ${a.color}BB    195deg,
                  ${a.color}33    240deg,
                  transparent     280deg,
                  transparent     360deg
                )`,
                animation:     `rotateBorder ${a.spinDuration} linear infinite`,
                pointerEvents: 'none',
              }} />

              {/* ── Inner card content ── */}
              <div style={{
                position:      'relative',
                zIndex:        1,
                background:    a.cardBg,
                borderRadius:  '16px',
                padding:       '2rem 2rem 2rem',
                flex:          1,
                display:       'flex',
                flexDirection: 'column',
                overflow:      'hidden',
              }}>

                {/* Dotted decorative pattern — upper-right quadrant */}
                <div aria-hidden="true" style={{
                  position:          'absolute',
                  top:               0,
                  right:             0,
                  width:             '55%',
                  height:            '42%',
                  backgroundImage:   AUDIENCE_CARD_DOTS,
                  backgroundRepeat:  'repeat',
                  opacity:           0.60,
                  pointerEvents:     'none',
                }} />

                {/* ── Square icon badge — top-left ── */}
                <div style={{
                  width:          72,
                  height:         72,
                  borderRadius:   '14px',
                  background:     a.iconBg,
                  boxShadow:      a.iconShadow,
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  flexShrink:     0,
                  marginBottom:   '1.75rem',
                  position:       'relative',
                  zIndex:         2,
                }}>
                  {a.icon}
                </div>

                {/* ── Title ── */}
                <h3
                  className="font-rem"
                  style={{
                    fontSize:     'clamp(1.15rem, 2vw, 1.3rem)',
                    fontWeight:   700,
                    color:        '#FFFFFF',
                    lineHeight:   1.25,
                    marginBottom: '0.75rem',
                    position:     'relative',
                    zIndex:       2,
                  }}
                >
                  {a.label}
                </h3>

                {/* Short neon accent line — under title */}
                <div style={{
                  width:        '36px',
                  height:       '2.5px',
                  background:   a.accentLine,
                  boxShadow:    `0 0 8px ${a.accentLine}, 0 0 18px ${a.outerGlow}`,
                  borderRadius: 9999,
                  marginBottom: '1.25rem',
                  position:     'relative',
                  zIndex:       2,
                }} />

                {/* ── Body text ── */}
                <p
                  className="font-rem"
                  style={{
                    fontSize:   '0.90rem',
                    color:      'rgba(185,165,225,0.68)',
                    lineHeight: 1.75,
                    flex:       1,
                    position:   'relative',
                    zIndex:     2,
                  }}
                >
                  {a.body}
                </p>

                {/* ── CTA row — text left, circular arrow right ── */}
                <div style={{
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'space-between',
                  marginTop:      '2rem',
                  position:       'relative',
                  zIndex:         2,
                }}>
                  <a
                    href={a.ctaHref}
                    className="font-rem font-semibold"
                    style={{
                      fontSize:       '0.95rem',
                      color:          a.color,
                      textDecoration: 'none',
                      transition:     'opacity 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    {a.cta}
                  </a>

                  {/* Circular arrow button */}
                  <a
                    href={a.ctaHref}
                    aria-label={a.cta}
                    style={{
                      width:          38,
                      height:         38,
                      borderRadius:   '50%',
                      background:     a.color,
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      flexShrink:     0,
                      textDecoration: 'none',
                      boxShadow:      `0 0 14px ${a.outerGlow}, 0 4px 10px rgba(0,0,0,0.45)`,
                      transition:     'opacity 0.2s, transform 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(1.08)' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M4 10h12M11 5l5 5-5 5" stroke="#FFFFFF" strokeWidth="2.2"
                        strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>

                {/* Bottom inner glow — radial bloom at base */}
                <div aria-hidden="true" style={{
                  position:      'absolute',
                  bottom:        0,
                  left:          0,
                  right:         0,
                  height:        '90px',
                  background:    `radial-gradient(ellipse 60% 100% at 50% 100%, ${a.outerGlow} 0%, transparent 70%)`,
                  pointerEvents: 'none',
                }} />

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. Closing CTA — rebuilt to match reference image
//    Huge two-line headline, neon pill badge, sparkle divider,
//    filled gradient button + outlined button, edge coins, deep glow.
// ─────────────────────────────────────────────────────────────────────────────

const CTA_DOT_GRID = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='0.75' fill='rgba(255%2C255%2C255%2C0.050)'/%3E%3C/svg%3E")`

function AboutCTA() {
  const [ref, on] = useReveal(0.2)

  return (
    <section
      id="about-cta"
      ref={ref}
      aria-labelledby="about-cta-heading"
      className="relative overflow-hidden"
      style={{ padding: '8rem 1.25rem 9rem', background: '#06011A', textAlign: 'center' }}
    >
      {/* ── Background ── */}

      {/* Dot grid texture */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: CTA_DOT_GRID, backgroundRepeat: 'repeat' }} />

      {/* Deep purple bloom behind headline — the main glow in the reference */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[110px]"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(137,38,231,0.30) 0%, transparent 65%)' }} />
      {/* Pink edge accent — top-left */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 40% 45% at 12% 40%, rgba(239,0,189,0.12) 0%, transparent 65%)' }} />
      {/* Blue edge accent — top-right */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 40% 45% at 88% 40%, rgba(87,62,251,0.12) 0%, transparent 65%)' }} />
      {/* Top-edge blend */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-40 z-[2]"
        style={{ background: 'linear-gradient(to bottom, rgba(4,1,12,0.80) 0%, transparent 100%)' }} />

      {/* ── Edge coins — far left, partially off-screen ── */}
      <img src={COINS.purpleStyled} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden lg:block"
        style={{
          width: '540px', height: '540px',
          left: '-160px', top: '50%', transform: 'translateY(-50%)',
          objectFit: 'contain',
          opacity: 0.12,
          filter: 'blur(1px) drop-shadow(0 0 28px rgba(137,38,231,0.55)) drop-shadow(0 0 55px rgba(137,38,231,0.22))',
          animationDelay: '0s', animationDuration: '9s',
          zIndex: 0,
        }}
      />

      {/* ── Edge coins — far right, partially off-screen ── */}
      <img src={COINS.purple} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden lg:block"
        style={{
          width: '480px', height: '480px',
          right: '-140px', top: '50%', transform: 'translateY(-50%)',
          objectFit: 'contain',
          opacity: 0.10,
          filter: 'blur(1.5px) drop-shadow(0 0 24px rgba(87,62,251,0.50)) drop-shadow(0 0 48px rgba(137,38,231,0.20))',
          animationDelay: '3s', animationDuration: '8.5s',
          zIndex: 0,
        }}
      />

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '820px', margin: '0 auto' }}>

        <div style={fx(on, 0)}>
          {/* ── Neon pill badge — outlined, not filled ── */}
          <div style={{
            display:       'inline-flex',
            alignItems:    'center',
            gap:           8,
            padding:       '7px 20px',
            borderRadius:  9999,
            background:    'rgba(137,38,231,0.06)',
            border:        '1.5px solid rgba(137,38,231,0.55)',
            boxShadow:     '0 0 16px rgba(137,38,231,0.28), inset 0 0 12px rgba(137,38,231,0.06)',
            marginBottom:  '2.25rem',
          }}>
            <span aria-hidden="true" style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#8926E7',
              boxShadow: '0 0 8px rgba(137,38,231,0.95), 0 0 16px rgba(137,38,231,0.55)',
              display: 'inline-block',
              flexShrink: 0,
            }} />
            <span className="font-rem" style={{
              fontSize:      '0.75rem',
              color:         'rgba(200,165,255,0.90)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight:    700,
            }}>
              Now in Active Beta
            </span>
          </div>

          {/* ── Huge headline — two lines ── */}
          {/*
           * Line 1: "Ready to make" — white/light lavender
           * Line 2: "money skills stick?" — purple→blue gradient
           * The <br/> forces the two-line layout at all viewport widths.
           */}
          <h2
            id="about-cta-heading"
            className="font-karantina"
            style={{
              ...H2_CTA,
              marginBottom:  0,
              color:         '#F4F0FF',
              textShadow:    '0 0 80px rgba(137,38,231,0.22)',
            }}
          >
            Ready to make
            <br />
            <span style={{
              background:            'linear-gradient(90deg, #C860FF 0%, #8926E7 30%, #573EFB 65%, #469EFF 100%)',
              WebkitBackgroundClip:  'text',
              WebkitTextFillColor:   'transparent',
              backgroundClip:        'text',
            }}>
              money skills stick?
            </span>
          </h2>

          {/* ── Sparkle divider — glowing center point ── */}
          <div aria-hidden="true" style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            '10px',
            margin:         '1.75rem auto 1.5rem',
          }}>
            <div style={{
              height:     '1px',
              width:      'clamp(50px, 10vw, 100px)',
              background: 'linear-gradient(to right, transparent, rgba(137,38,231,0.65))',
            }} />
            {/* Central star point */}
            <div style={{
              width:        '8px',
              height:       '8px',
              borderRadius: '50%',
              background:   'rgba(210,170,255,0.98)',
              boxShadow: [
                '0 0 8px rgba(210,170,255,0.90)',
                '0 0 18px rgba(137,38,231,0.70)',
                '0 0 40px rgba(137,38,231,0.40)',
              ].join(', '),
            }} />
            <div style={{
              height:     '1px',
              width:      'clamp(50px, 10vw, 100px)',
              background: 'linear-gradient(to left, transparent, rgba(137,38,231,0.65))',
            }} />
          </div>

          {/* ── Subtext ── */}
          <p
            className="font-rem"
            style={{
              fontSize:     'clamp(0.95rem, 1.8vw, 1.05rem)',
              color:        'rgba(190,170,230,0.65)',
              lineHeight:   1.7,
              marginBottom: '3rem',
              maxWidth:     '520px',
              margin:       '0 auto 3rem',
            }}
          >
            Join the beta and be among the first to experience PLEARN.
          </p>
        </div>

        {/* ── CTA Buttons ── */}
        <div style={{
          ...fx(on, 150),
          display:        'flex',
          gap:            '1.1rem',
          justifyContent: 'center',
          flexWrap:       'wrap',
        }}>

          {/* Primary — filled pink→purple→blue gradient with ⚡ icon */}
          <a
            href={CTA.joinBeta}
            className="font-rem font-semibold"
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '0.6rem',
              padding:        '0.95rem 2.25rem',
              borderRadius:   '12px',
              background:     'linear-gradient(90deg, #EF00BD 0%, #8926E7 40%, #573EFB 75%, #5077F2 100%)',
              boxShadow: [
                '0 0 22px rgba(137,38,231,0.55)',
                '0 0 50px rgba(239,0,189,0.22)',
                '0 6px 22px rgba(0,0,0,0.50)',
              ].join(', '),
              color:          '#FFFFFF',
              fontSize:       '1rem',
              textDecoration: 'none',
              transition:     'opacity 0.2s, transform 0.2s',
              minWidth:       '190px',
              justifyContent: 'center',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            {/* Lightning bolt icon */}
            <svg width="17" height="17" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true">
              <path d="M13 2 3.09 14.27A1 1 0 0 0 4 16h7l-2 6 11.91-12.27A1 1 0 0 0 20 8h-7z"/>
            </svg>
            Join the Beta
          </a>

          {/* Secondary — dark outlined with neon border + handshake icon */}
          <a
            href="mailto:info@plearn.io?subject=PLEARN%20Pilot%20Partnership"
            className="font-rem font-semibold"
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '0.6rem',
              padding:        '0.95rem 2.25rem',
              borderRadius:   '12px',
              background:     'rgba(87,62,251,0.08)',
              border:         '1.5px solid rgba(137,38,231,0.50)',
              boxShadow: [
                '0 0 18px rgba(137,38,231,0.20)',
                'inset 0 0 12px rgba(137,38,231,0.05)',
                '0 6px 22px rgba(0,0,0,0.50)',
              ].join(', '),
              color:          '#FFFFFF',
              fontSize:       '1rem',
              textDecoration: 'none',
              transition:     'opacity 0.2s, border-color 0.2s, transform 0.2s',
              minWidth:       '190px',
              justifyContent: 'center',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.88'
              e.currentTarget.style.borderColor = 'rgba(137,38,231,0.80)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1'
              e.currentTarget.style.borderColor = 'rgba(137,38,231,0.50)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {/* Handshake icon */}
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
export default function AboutPage() {
  return (
    <>
      {/* Fixed dark gradient base */}
      <PageBackground />
      {/* Fixed floating coin atmosphere — sits above base, below all content */}
      <CoinBackground variant="about" />

      <a href="#about-main" className="skip-link">Skip to main content</a>

      <header style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
      </header>

      <main id="about-main" style={{ position: 'relative', zIndex: 1 }}>
        <AboutHero />
        <StorySection />
        <BeliefsSection />
        <DifferentiatorSection />
        <AudienceSection />
        <AboutCTA />
      </main>

      <Footer />
    </>
  )
}
