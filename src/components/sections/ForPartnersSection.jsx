import { useEffect, useRef, useState } from 'react'
import { COINS } from '@/constants/assets'
import { CONTACT } from '@/constants/config'

const GRID = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='0.75' fill='rgba(255%2C255%2C255%2C0.055)'/%3E%3C/svg%3E")`

/**
 * ForPartnersSection — Stage 5 · Section 3
 * Redesigned to match reference image.
 *
 * Header: decorative section tag · split-gradient headline · ghost CTA
 * Cards: colored icon circles · label + accent line · strong all-side glow
 * Card pattern: outer wrapper (border + box-shadow, no overflow:hidden)
 *               inner div (overflow:hidden for bg gradient)
 */

// ── Card data ──────────────────────────────────────────────────────────────
const PARTNER_CARDS = [
  {
    id:          'schools',
    label:       'For Schools',
    title:       'Curriculum-friendly financial literacy.',
    body:        'Plug PLEARN missions into your financial education program. Students engage with real-life money scenarios in a format that actually holds their attention.',
    // Icon circle
    iconFill:    'radial-gradient(ellipse at center, rgba(200,50,255,0.32) 0%, rgba(137,38,231,0.14) 55%, #0E0820 100%)',
    iconBorder:  '#C832FF',
    iconGlow:    '0 0 0 3px rgba(200,50,255,0.18), 0 0 24px 4px rgba(200,50,255,0.65), 0 0 50px 8px rgba(137,38,231,0.35)',
    iconColor:   '#E080FF',
    // Label + accent
    labelClr:    '#C832FF',
    accentLine:  'linear-gradient(90deg, #EF00BD, #8926E7)',
    accentGlow:  '0 0 8px rgba(239,0,189,0.60)',
    // Card border + glow (all 4 sides)
    border:      'rgba(200,50,255,0.72)',
    borderHov:   'rgba(220,100,255,1.00)',
    outerGlow:   '0 0 0 1px rgba(180,40,240,0.22), 0 0 22px 4px rgba(180,40,240,0.55), 0 0 60px 10px rgba(137,38,231,0.30), 0 0 120px 18px rgba(87,62,251,0.14)',
    outerGlowH:  '0 0 0 1px rgba(200,60,255,0.40), 0 0 30px 6px rgba(200,60,255,0.72), 0 0 80px 14px rgba(137,38,231,0.42), 0 0 150px 24px rgba(87,62,251,0.20)',
    cardBg:      'radial-gradient(ellipse 110% 60% at 50% 0%, rgba(180,40,240,0.18) 0%, #0C0820 50%, #08051E 100%)',
    floorColor:  'rgba(200,50,255,0.36)',
    numClr:      'rgba(180,40,240,0.12)',
  },
  {
    id:          'banks',
    label:       'For Banks & Fintechs',
    title:       'Youth engagement through branded learning.',
    body:        'Reach young customers where they are. Co-branded missions and reward experiences build trust, loyalty, and financial confidence from day one.',
    iconFill:    'radial-gradient(ellipse at center, rgba(70,158,255,0.30) 0%, rgba(70,158,255,0.12) 55%, #08101E 100%)',
    iconBorder:  '#469EFF',
    iconGlow:    '0 0 0 3px rgba(70,158,255,0.18), 0 0 24px 4px rgba(70,158,255,0.65), 0 0 50px 8px rgba(80,119,242,0.32)',
    iconColor:   '#80C8FF',
    labelClr:    '#469EFF',
    accentLine:  'linear-gradient(90deg, #469EFF, #00CCAA)',
    accentGlow:  '0 0 8px rgba(70,158,255,0.55)',
    border:      'rgba(70,158,255,0.72)',
    borderHov:   'rgba(70,158,255,1.00)',
    outerGlow:   '0 0 0 1px rgba(70,158,255,0.22), 0 0 22px 4px rgba(70,158,255,0.55), 0 0 60px 10px rgba(80,119,242,0.28), 0 0 120px 18px rgba(80,119,242,0.12)',
    outerGlowH:  '0 0 0 1px rgba(70,158,255,0.40), 0 0 30px 6px rgba(70,158,255,0.72), 0 0 80px 14px rgba(80,119,242,0.40), 0 0 150px 24px rgba(80,119,242,0.18)',
    cardBg:      'radial-gradient(ellipse 110% 60% at 50% 0%, rgba(70,158,255,0.16) 0%, #090B20 50%, #06081A 100%)',
    floorColor:  'rgba(70,158,255,0.30)',
    numClr:      'rgba(70,158,255,0.12)',
  },
  {
    id:          'brands',
    label:       'For Brands & Reward Partners',
    title:       'Connect rewards to learning milestones.',
    body:        'List your vouchers, discounts, or perks inside the PLEARN rewards store. Reach a motivated audience of learners who earn the right to spend.',
    iconFill:    'radial-gradient(ellipse at center, rgba(254,89,52,0.30) 0%, rgba(254,89,52,0.12) 55%, #120808 100%)',
    iconBorder:  '#FE6A34',
    iconGlow:    '0 0 0 3px rgba(254,89,52,0.18), 0 0 24px 4px rgba(254,89,52,0.65), 0 0 50px 8px rgba(239,0,189,0.28)',
    iconColor:   '#FF9060',
    labelClr:    '#FE6A34',
    accentLine:  'linear-gradient(90deg, #FE5934, #EF00BD)',
    accentGlow:  '0 0 8px rgba(254,89,52,0.60)',
    border:      'rgba(254,89,52,0.72)',
    borderHov:   'rgba(255,120,60,1.00)',
    outerGlow:   '0 0 0 1px rgba(254,89,52,0.22), 0 0 22px 4px rgba(254,89,52,0.55), 0 0 60px 10px rgba(254,89,52,0.28), 0 0 120px 18px rgba(239,0,189,0.12)',
    outerGlowH:  '0 0 0 1px rgba(255,100,50,0.40), 0 0 30px 6px rgba(255,100,50,0.72), 0 0 80px 14px rgba(254,89,52,0.40), 0 0 150px 24px rgba(239,0,189,0.18)',
    cardBg:      'radial-gradient(ellipse 110% 60% at 50% 0%, rgba(254,89,52,0.16) 0%, #0D0820 50%, #0A0618 100%)',
    floorColor:  'rgba(254,89,52,0.34)',
    numClr:      'rgba(254,89,52,0.12)',
  },
]

// ── SVG icons ──────────────────────────────────────────────────────────────
function IconSchool({ color }) {
  return (
    <svg width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden="true"
      style={{ filter: `drop-shadow(0 0 8px ${color})` }}>
      <rect x="4" y="14" width="24" height="14" rx="1" stroke={color} strokeWidth="1.8" />
      <path d="M2 15 L16 4 L30 15" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="13" y="20" width="6" height="8" rx="1" stroke={color} strokeWidth="1.5" />
      <rect x="6" y="18" width="5" height="4" rx="0.5" stroke={color} strokeWidth="1.4" />
      <rect x="21" y="18" width="5" height="4" rx="0.5" stroke={color} strokeWidth="1.4" />
      <line x1="16" y1="4" x2="16" y2="0.8" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M16 1 L20 2.8 L16 4.2" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  )
}
function IconBank({ color }) {
  return (
    <svg width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden="true"
      style={{ filter: `drop-shadow(0 0 8px ${color})` }}>
      <rect x="5"  y="11" width="4" height="13" rx="0.5" stroke={color} strokeWidth="1.6" />
      <rect x="14" y="11" width="4" height="13" rx="0.5" stroke={color} strokeWidth="1.6" />
      <rect x="23" y="11" width="4" height="13" rx="0.5" stroke={color} strokeWidth="1.6" />
      <rect x="3"  y="24" width="26" height="3"  rx="1"  stroke={color} strokeWidth="1.6" />
      <rect x="3"  y="8.5" width="26" height="3" rx="0.5" stroke={color} strokeWidth="1.4" />
      <path d="M1 9 L16 2 L31 9" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="5" r="1.4" fill={color} opacity="0.80" />
    </svg>
  )
}
function IconGift({ color }) {
  return (
    <svg width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden="true"
      style={{ filter: `drop-shadow(0 0 8px ${color})` }}>
      <rect x="4"  y="14" width="24" height="14" rx="1.5" stroke={color} strokeWidth="1.8" />
      <rect x="3"  y="10" width="26" height="5"  rx="1"   stroke={color} strokeWidth="1.8" />
      <line x1="16" y1="10" x2="16" y2="28" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="3"  y1="12.5" x2="29" y2="12.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 10 Q10 6 11 3 Q12 1 14 3 Q15.5 5 16 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 10 Q22 6 21 3 Q20 1 18 3 Q16.5 5 16 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const ICONS = [IconSchool, IconBank, IconGift]

// ── Decorative section label ────────────────────────────────────────────────
function PartnerSectionTag() {
  return (
    <div className="flex items-center gap-3">
      {/* Left dash */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <div style={{ width: '1.8rem', height: '1px', background: 'rgba(180,100,255,0.55)' }} />
        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(180,100,255,0.80)' }} />
      </div>

      <span
        className="font-rem font-semibold uppercase"
        style={{ fontSize: '0.68rem', letterSpacing: '0.20em', color: '#B064FF' }}
      >
        For Partners
      </span>

      {/* Right dash */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(180,100,255,0.80)' }} />
        <div style={{ width: '1.8rem', height: '1px', background: 'rgba(180,100,255,0.55)' }} />
      </div>
    </div>
  )
}

// ── Partner card ───────────────────────────────────────────────────────────
function PartnerCard({ card, index, revealStyle }) {
  const [hovered, setHovered] = useState(false)
  const Icon = ICONS[index]

  return (
    <div
      style={{ ...revealStyle, position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Floor underglow */}
      <div aria-hidden="true" className="pointer-events-none absolute" style={{
        bottom: '-32px', left: '4%', right: '4%', height: '72px',
        background: `radial-gradient(ellipse 85% 100% at 50% 0%, ${card.floorColor} 0%, transparent 70%)`,
        filter: 'blur(18px)',
      }} />

      {/* OUTER wrapper — border + glow, NO overflow:hidden */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        borderRadius: '18px', cursor: 'default',
        border:    `1.5px solid ${hovered ? card.borderHov : card.border}`,
        boxShadow: hovered ? card.outerGlowH : card.outerGlow,
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}>
        {/* INNER card — overflow:hidden for bg gradient */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          borderRadius: '17px', overflow: 'hidden',
          background: card.cardBg, position: 'relative',
        }}>

          {/* Faint large watermark number — top right */}
          <span aria-hidden="true" className="pointer-events-none select-none absolute font-karantina leading-none"
            style={{
              fontSize: '7rem', top: '-0.5rem', right: '0.8rem',
              color: card.numClr, letterSpacing: '-0.02em', zIndex: 0,
            }}>
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Content */}
          <div className="relative flex flex-col gap-5 p-5 sm:p-8 pt-6 sm:pt-9" style={{ flex: 1, zIndex: 1 }}>

            {/* Icon circle */}
            <div style={{
              width: '88px', height: '88px', borderRadius: '50%',
              background: card.iconFill,
              border: `2.5px solid ${card.iconBorder}`,
              boxShadow: card.iconGlow,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              marginBottom: '0.25rem',
            }}>
              <Icon color={card.iconColor} />
            </div>

            {/* Label + accent line */}
            <div className="flex flex-col items-start gap-1.5">
              <span
                className="font-rem font-semibold uppercase"
                style={{ fontSize: '0.67rem', letterSpacing: '0.16em', color: card.labelClr }}
              >
                {card.label}
              </span>
              <div aria-hidden="true" style={{
                width: '2.2rem', height: '2.5px', borderRadius: '9999px',
                background: card.accentLine,
                boxShadow: card.accentGlow,
              }} />
            </div>

            {/* Title + body */}
            <div className="flex flex-col gap-2.5">
              <h3 className="font-karantina text-white leading-snug"
                style={{ fontSize: '1.45rem', letterSpacing: '-0.01em' }}>
                {card.title}
              </h3>
              <p className="font-rem text-body text-text-muted leading-relaxed">
                {card.body}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

// ── Section ────────────────────────────────────────────────────────────────
export default function ForPartnersSection() {
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
      id="partners"
      ref={ref}
      aria-label="For Schools and Partners"
      className="relative overflow-hidden py-section-sm lg:py-section"
      style={{ background: '#07021A' }}
    >
      {/* ── Dot grid ─────────────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: GRID, backgroundRepeat: 'repeat' }} />

      {/* ── Top-edge blend ───────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-36 z-[2]"
        style={{ background: 'linear-gradient(to bottom, rgba(4,1,14,0.70) 0%, transparent 100%)' }} />

      {/* ── Atmospheric blobs ─────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(137,38,231,0.22) 0%, transparent 68%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[110px]"
        style={{ background: 'radial-gradient(ellipse 40% 50% at 16% 70%, rgba(200,50,255,0.14) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[110px]"
        style={{ background: 'radial-gradient(ellipse 38% 50% at 50% 72%, rgba(70,158,255,0.12) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[110px]"
        style={{ background: 'radial-gradient(ellipse 40% 50% at 84% 70%, rgba(254,89,52,0.12) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 46% 38% at 90% 5%, rgba(87,62,251,0.18) 0%, transparent 68%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 42% 36% at 6% 92%, rgba(239,0,189,0.10) 0%, transparent 65%)' }} />

      {/* ── Floating P-coin watermarks ────────────────────────────────── */}
      <img loading="lazy" src={COINS.purpleStyled} alt="" aria-hidden="true"
        className="pointer-events-none select-none absolute animate-float hidden sm:block"
        style={{ width: '500px', height: '500px', left: '-90px', top: '52%',
          transform: 'translateY(-50%)', objectFit: 'contain', opacity: 0.11,
          filter: 'blur(1px) drop-shadow(0 0 20px rgba(137,38,231,0.55)) drop-shadow(0 0 40px rgba(87,62,251,0.28))',
          animationDelay: '0.5s', animationDuration: '7s', zIndex: 0 }} />
      <img loading="lazy" src={COINS.blue} alt="" aria-hidden="true"
        className="pointer-events-none select-none absolute animate-float hidden sm:block"
        style={{ width: '400px', height: '400px', right: '-75px', top: '45%',
          transform: 'translateY(-50%)', objectFit: 'contain', opacity: 0.09,
          filter: 'blur(1.5px) drop-shadow(0 0 16px rgba(70,158,255,0.50)) drop-shadow(0 0 34px rgba(70,158,255,0.25))',
          animationDelay: '2.2s', animationDuration: '8.5s', zIndex: 0 }} />
      <img loading="lazy" src={COINS.orange} alt="" aria-hidden="true"
        className="pointer-events-none select-none absolute animate-float"
        style={{ width: '200px', height: '200px', right: '6%', top: '8%',
          objectFit: 'contain', opacity: 0.07,
          filter: 'blur(2px) drop-shadow(0 0 12px rgba(254,89,52,0.38))',
          animationDelay: '4.2s', animationDuration: '9.5s', zIndex: 0 }} />

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="section-container relative z-10">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center gap-5 mb-10 lg:mb-16" style={reveal(0)}>

          {/* Decorative section tag */}
          <PartnerSectionTag />

          {/* Split-gradient headline */}
          <h2 className="font-karantina text-h2-sm lg:text-h2 leading-tight max-w-3xl">
            <span style={{ color: '#FFFFFF' }}>Bring financial literacy to<br />the </span>
            <span style={{
              background: 'linear-gradient(90deg, #C832FF 0%, #7B5FFF 38%, #469EFF 70%, #43FEF0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>next generation.</span>
          </h2>

          <p className="font-rem text-body-lg text-text-muted max-w-xl leading-relaxed">
            We're actively onboarding our first pilot partners. Whether you're building a more engaging financial education curriculum, looking to better connect with young customers, or running a program that deserves real impact tools — PLEARN is built for you.
          </p>

          {/* Ghost CTA button with arrow */}
          <div style={{ marginTop: '0.5rem' }}>
            <a
              href={CONTACT.partnerHref}
              className="inline-flex items-center gap-2 font-rem font-semibold transition-all duration-200"
              style={{
                fontSize: '0.95rem',
                padding: '0.85rem 2rem',
                borderRadius: '9999px',
                border: '1.5px solid rgba(137,38,231,0.60)',
                color: '#FFFFFF',
                background: 'rgba(137,38,231,0.10)',
                boxShadow: '0 0 18px rgba(137,38,231,0.18)',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(137,38,231,0.22)'
                e.currentTarget.style.borderColor = 'rgba(180,80,255,0.85)'
                e.currentTarget.style.boxShadow = '0 0 26px rgba(137,38,231,0.38)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(137,38,231,0.10)'
                e.currentTarget.style.borderColor = 'rgba(137,38,231,0.60)'
                e.currentTarget.style.boxShadow = '0 0 18px rgba(137,38,231,0.18)'
              }}
            >
              Partner for a Pilot
              <span aria-hidden="true" style={{ fontSize: '1.1rem', lineHeight: 1 }}>›</span>
            </a>
          </div>

        </div>

        {/* ── Partner cards ─────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-stretch gap-5" style={{ paddingBottom: '44px' }}>
          {PARTNER_CARDS.map((card, i) => (
            <PartnerCard
              key={card.id}
              card={card}
              index={i}
              revealStyle={reveal(140 + i * 120)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
