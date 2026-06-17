import { useEffect, useRef, useState } from 'react'
import { REWARDS } from '@/constants/copy'
import { CTA } from '@/constants/config'
import { COINS } from '@/constants/assets'
import Button from '@/components/ui/Button'
import SectionTag from '@/components/ui/SectionTag'

// Dot grid — shared visual language
const GRID = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='0.75' fill='rgba(255%2C255%2C255%2C0.055)'/%3E%3C/svg%3E")`

/**
 * RewardsSection — Stage 4 · Section 2
 *
 * Strong neon-border cards, sparkle particles around coins, floor glow.
 * The box-shadow lives on the OUTER wrapper (no overflow:hidden there) so
 * the glow is never clipped — this is what makes it visibly luminous.
 */

const REWARD_PILLARS = [
  {
    icon:        COINS.orange,
    title:       'Real Vouchers & Discounts',
    body:        'Redeem your P-coins for vouchers and discounts from our partner brands — perks that have real-world value.',
    topBar:      'linear-gradient(90deg, #FE5934, #EF00BD)',
    border:      'rgba(254,89,52,0.72)',
    borderHov:   'rgba(254,89,52,1.00)',
    // Shadow on outer wrapper — NOT clipped by overflow:hidden
    outerGlow:   '0 0 22px 3px rgba(254,89,52,0.55), 0 0 60px 8px rgba(254,89,52,0.30), 0 0 120px 16px rgba(254,89,52,0.14)',
    outerGlowHov:'0 0 28px 5px rgba(254,89,52,0.75), 0 0 80px 14px rgba(254,89,52,0.45), 0 0 160px 24px rgba(254,89,52,0.22)',
    cardBg:      'radial-gradient(ellipse 100% 55% at 50% 0%, rgba(254,89,52,0.16) 0%, #0C0820 52%, #090618 100%)',
    bottomGlow:  'radial-gradient(ellipse 85% 70% at 50% 100%, rgba(254,89,52,0.16) 0%, transparent 70%)',
    floorColor:  'rgba(254,89,52,0.40)',
    // Coin glow filter values
    coinBase:    'drop-shadow(0 0 10px rgba(254,89,52,0.80)) drop-shadow(0 0 24px rgba(239,0,189,0.50)) drop-shadow(0 0 5px rgba(255,180,120,0.60))',
    coinPeak:    'drop-shadow(0 0 18px rgba(254,89,52,1.00)) drop-shadow(0 0 40px rgba(239,0,189,0.70)) drop-shadow(0 0 8px rgba(255,200,150,0.80))',
    sparkleClr:  ['rgba(255,120,60,0.95)', 'rgba(255,200,80,0.85)', 'rgba(255,80,180,0.90)', 'rgba(255,150,60,0.80)', 'rgba(255,240,120,0.75)', 'rgba(255,60,120,0.85)'],
    coinDelay:   '0s',
    delay:       120,
  },
  {
    icon:        COINS.purpleStyled,
    title:       'Achievements & Badges',
    body:        "Unlock badges as you complete missions and hit milestones. Build a track record that shows how far you've come.",
    topBar:      'linear-gradient(90deg, #8926E7, #573EFB)',
    border:      'rgba(137,38,231,0.75)',
    borderHov:   'rgba(170,80,255,1.00)',
    outerGlow:   '0 0 22px 3px rgba(137,38,231,0.58), 0 0 60px 8px rgba(87,62,251,0.32), 0 0 120px 16px rgba(137,38,231,0.16)',
    outerGlowHov:'0 0 28px 5px rgba(170,80,255,0.78), 0 0 80px 14px rgba(87,62,251,0.48), 0 0 160px 24px rgba(137,38,231,0.24)',
    cardBg:      'radial-gradient(ellipse 100% 55% at 50% 0%, rgba(137,38,231,0.18) 0%, #0C0820 52%, #080520 100%)',
    bottomGlow:  'radial-gradient(ellipse 85% 70% at 50% 100%, rgba(137,38,231,0.14) 0%, transparent 70%)',
    floorColor:  'rgba(137,38,231,0.38)',
    coinBase:    'drop-shadow(0 0 10px rgba(137,38,231,0.85)) drop-shadow(0 0 24px rgba(87,62,251,0.55)) drop-shadow(0 0 5px rgba(200,150,255,0.60))',
    coinPeak:    'drop-shadow(0 0 18px rgba(170,80,255,1.00)) drop-shadow(0 0 40px rgba(87,62,251,0.75)) drop-shadow(0 0 8px rgba(220,180,255,0.80))',
    sparkleClr:  ['rgba(180,80,255,0.95)', 'rgba(140,100,255,0.85)', 'rgba(220,160,255,0.90)', 'rgba(100,60,255,0.80)', 'rgba(200,120,255,0.75)', 'rgba(160,80,240,0.85)'],
    coinDelay:   '0.5s',
    delay:       220,
  },
  {
    icon:        COINS.green,
    title:       'Exclusive Partner Perks',
    body:        'Access exclusive perks from financial and lifestyle brands — benefits you earn through learning, not spending.',
    topBar:      'linear-gradient(90deg, #01DE5B, #469EFF)',
    border:      'rgba(1,222,91,0.70)',
    borderHov:   'rgba(1,222,91,1.00)',
    outerGlow:   '0 0 22px 3px rgba(1,222,91,0.55), 0 0 60px 8px rgba(1,222,91,0.28), 0 0 120px 16px rgba(70,158,255,0.14)',
    outerGlowHov:'0 0 28px 5px rgba(1,222,91,0.75), 0 0 80px 14px rgba(1,222,91,0.42), 0 0 160px 24px rgba(70,158,255,0.22)',
    cardBg:      'radial-gradient(ellipse 100% 55% at 50% 0%, rgba(1,222,91,0.14) 0%, #09081E 52%, #060518 100%)',
    bottomGlow:  'radial-gradient(ellipse 85% 70% at 50% 100%, rgba(1,222,91,0.12) 0%, transparent 70%)',
    floorColor:  'rgba(1,222,91,0.35)',
    coinBase:    'drop-shadow(0 0 10px rgba(1,222,91,0.85)) drop-shadow(0 0 24px rgba(70,158,255,0.50)) drop-shadow(0 0 5px rgba(120,255,180,0.60))',
    coinPeak:    'drop-shadow(0 0 18px rgba(1,222,91,1.00)) drop-shadow(0 0 40px rgba(70,158,255,0.70)) drop-shadow(0 0 8px rgba(150,255,200,0.80))',
    sparkleClr:  ['rgba(1,222,91,0.95)', 'rgba(80,220,140,0.85)', 'rgba(120,255,180,0.90)', 'rgba(70,200,255,0.85)', 'rgba(1,200,80,0.80)', 'rgba(100,255,160,0.75)'],
    coinDelay:   '1s',
    delay:       320,
  },
]

// Sparkle definitions — position offsets around the coin (80×80 area)
const SPARKLE_DEFS = [
  { top: '-14px', left: '-10px', size: 5, delay: '0.0s',  dur: '2.2s', anim: 'sparkle-twinkle' },
  { top: '-10px', left: '22px',  size: 3, delay: '0.5s',  dur: '1.9s', anim: 'sparkle-drift'   },
  { top: '6px',   left: '-18px', size: 4, delay: '0.9s',  dur: '2.4s', anim: 'sparkle-twinkle' },
  { top: '-18px', left: '50px',  size: 3, delay: '1.4s',  dur: '2.0s', anim: 'sparkle-drift'   },
  { top: '18px',  right: '-14px',size: 4, delay: '0.7s',  dur: '2.1s', anim: 'sparkle-twinkle' },
  { top: '-6px',  right: '-6px', size: 3, delay: '1.6s',  dur: '1.8s', anim: 'sparkle-drift'   },
  { bottom:'2px', left: '-12px', size: 4, delay: '0.3s',  dur: '2.3s', anim: 'sparkle-twinkle' },
  { top: '24px',  left: '72px',  size: 3, delay: '1.1s',  dur: '2.0s', anim: 'sparkle-drift'   },
]

/** 4-pointed star sparkle */
function Sparkle({ size, color, style: extraStyle, delay, dur, anim }) {
  const half = size / 2
  const thin = Math.max(1, size * 0.22)
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        animation: `${anim} ${dur} ${delay} ease-in-out infinite`,
        ...extraStyle,
      }}
    >
      {/* Vertical bar */}
      <div style={{
        position: 'absolute',
        left: `${half - thin / 2}px`, top: 0,
        width: `${thin}px`, height: `${size}px`,
        background: color,
        borderRadius: '9999px',
        boxShadow: `0 0 ${size + 2}px ${color}`,
      }} />
      {/* Horizontal bar */}
      <div style={{
        position: 'absolute',
        top: `${half - thin / 2}px`, left: 0,
        width: `${size}px`, height: `${thin}px`,
        background: color,
        borderRadius: '9999px',
        boxShadow: `0 0 ${size + 2}px ${color}`,
      }} />
    </div>
  )
}

/** Coin + sparkle field */
function CoinWithSparkles({ pillar }) {
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setPulse(p => !p), 1800)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ position: 'relative', width: '80px', height: '80px', flexShrink: 0 }}>
      {/* Sparkles */}
      {SPARKLE_DEFS.map((sp, i) => {
        const color = pillar.sparkleClr[i % pillar.sparkleClr.length]
        const posStyle = {}
        if (sp.top    !== undefined) posStyle.top    = sp.top
        if (sp.bottom !== undefined) posStyle.bottom = sp.bottom
        if (sp.left   !== undefined) posStyle.left   = sp.left
        if (sp.right  !== undefined) posStyle.right  = sp.right
        return (
          <Sparkle
            key={i}
            size={sp.size}
            color={color}
            style={posStyle}
            delay={sp.delay}
            dur={sp.dur}
            anim={sp.anim}
          />
        )
      })}

      {/* Coin */}
      <img
        src={pillar.icon}
        alt=""
        aria-hidden="true"
        className="animate-float"
        style={{
          width: '80px',
          height: '80px',
          objectFit: 'contain',
          animationDelay: pillar.coinDelay,
          animationDuration: '3.2s',
          filter: pulse ? pillar.coinPeak : pillar.coinBase,
          transition: 'filter 1.8s ease-in-out',
          position: 'relative',
          zIndex: 1,
        }}
      />
    </div>
  )
}

function PillarCard({ pillar, revealStyle }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{ ...revealStyle, position: 'relative' }}>

      {/* Floor underglow — sits below the card, wide soft spill */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom:   '-32px',
          left:     '4%',
          right:    '4%',
          height:   '72px',
          background: `radial-gradient(ellipse 80% 100% at 50% 0%, ${pillar.floorColor} 0%, transparent 70%)`,
          filter:   'blur(18px)',
          pointerEvents: 'none',
        }}
      />

      {/* ── OUTER wrapper: holds the border + box-shadow (NOT overflow:hidden)
           This is the key fix — shadow must live outside clipping context. ── */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position:     'relative',
          borderRadius: '16px',
          border:       `1.5px solid ${hovered ? pillar.borderHov : pillar.border}`,
          boxShadow:    hovered ? pillar.outerGlowHov : pillar.outerGlow,
          transition:   'border-color 0.3s ease, box-shadow 0.3s ease',
          cursor:       'default',
        }}
      >
        {/* ── INNER card: dark bg + content — overflow:hidden for clipping ── */}
        <div
          className="relative flex flex-col gap-6 p-7 overflow-hidden"
          style={{ borderRadius: '14px', background: pillar.cardBg }}
        >
          {/* Top accent bar */}
          <div
            aria-hidden="true"
            style={{
              position:     'absolute',
              top: 0, left: 0, right: 0,
              height:       '3px',
              borderRadius: '14px 14px 0 0',
              background:   pillar.topBar,
              boxShadow:    `0 0 12px 2px ${pillar.border}`,
            }}
          />

          {/* Bottom inner atmospheric glow */}
          <div
            aria-hidden="true"
            style={{
              position:     'absolute',
              inset:        0,
              borderRadius: '14px',
              background:   pillar.bottomGlow,
              pointerEvents:'none',
            }}
          />

          {/* Coin with sparkles */}
          <CoinWithSparkles pillar={pillar} />

          {/* Text */}
          <div className="relative flex flex-col gap-2" style={{ zIndex: 1 }}>
            <h3 className="font-karantina text-h3-sm text-white">{pillar.title}</h3>
            <p className="font-rem text-body text-text-muted leading-relaxed">{pillar.body}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RewardsSection() {
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
      id="rewards"
      ref={ref}
      aria-label="Rewards and P-Coins"
      className="relative overflow-hidden py-section"
      style={{ background: '#060220' }}
    >
      {/* ── Dot grid texture ─────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: GRID, backgroundRepeat: 'repeat' }} />

      {/* ── Top-edge blend ───────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-36"
        style={{ background: 'linear-gradient(to bottom, rgba(4,1,14,0.65) 0%, transparent 100%)', zIndex: 2 }} />

      {/* ── Atmospheric glow blobs ───────────────────────────────────── */}

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 52% 44% at 88% 10%, rgba(239,0,189,0.18) 0%, transparent 65%)' }} />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[110px]"
        style={{ background: 'radial-gradient(ellipse 68% 42% at 50% 0%, rgba(137,38,231,0.18) 0%, transparent 68%)' }} />

      {/* Per-card ambient cloud — orange left */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[80px]"
        style={{ background: 'radial-gradient(ellipse 36% 48% at 18% 72%, rgba(254,89,52,0.22) 0%, transparent 65%)' }} />

      {/* Per-card ambient cloud — purple centre */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[80px]"
        style={{ background: 'radial-gradient(ellipse 36% 48% at 50% 72%, rgba(87,62,251,0.24) 0%, transparent 65%)' }} />

      {/* Per-card ambient cloud — green right */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[80px]"
        style={{ background: 'radial-gradient(ellipse 36% 48% at 82% 72%, rgba(1,222,91,0.18) 0%, transparent 65%)' }} />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse 40% 34% at 5% 88%, rgba(1,222,91,0.09) 0%, transparent 65%)' }} />

      {/* ── Floating P-coin watermarks ────────────────────────────────── */}
      <img src={COINS.magenta} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float"
        style={{ width: '480px', height: '480px', left: '-85px', top: '45%',
          transform: 'translateY(-50%)', objectFit: 'contain',
          opacity: 0.12,
          filter: 'blur(1px) drop-shadow(0 0 18px rgba(239,0,189,0.55)) drop-shadow(0 0 38px rgba(239,0,189,0.28))',
          animationDelay: '1.0s', animationDuration: '6.5s', zIndex: 0 }} />
      <img src={COINS.green} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float"
        style={{ width: '370px', height: '370px', right: '-70px', top: '40%',
          transform: 'translateY(-50%)', objectFit: 'contain',
          opacity: 0.09,
          filter: 'blur(1.5px) drop-shadow(0 0 16px rgba(1,222,91,0.50)) drop-shadow(0 0 34px rgba(1,222,91,0.25))',
          animationDelay: '2.6s', animationDuration: '7.5s', zIndex: 0 }} />

      <div className="section-container relative z-10">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center gap-5 mb-14" style={reveal(0)}>

          <SectionTag>{REWARDS.preTag}</SectionTag>

          <h2 className="font-karantina text-h2-sm lg:text-h2 text-white leading-tight max-w-2xl">
            {REWARDS.headline}
          </h2>

          <p className="font-rem text-body-lg text-text-muted max-w-2xl leading-relaxed">
            {REWARDS.body}
          </p>

        </div>

        {/* ── Pillar cards ─────────────────────────────────────────────── */}
        {/* Extra padding on the grid so floor underglow doesn't get clipped */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20 pb-8">
          {REWARD_PILLARS.map((pillar) => (
            <PillarCard
              key={pillar.title}
              pillar={pillar}
              revealStyle={reveal(pillar.delay)}
            />
          ))}
        </div>

        {/* ── Disclaimer pill + CTA ─────────────────────────────────── */}
        <div className="flex flex-col items-center gap-5" style={reveal(440)}>

          <div
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full"
            style={{
              background: 'rgba(1,222,91,0.08)',
              border:     '1px solid rgba(1,222,91,0.22)',
              boxShadow:  '0 0 18px rgba(1,222,91,0.14)',
            }}
          >
            <img src={COINS.green} alt="" aria-hidden="true" className="w-4 h-4 object-contain" />
            <p className="font-rem text-caption text-text-muted">
              {REWARDS.sub}
            </p>
          </div>

          <Button href={CTA.joinWaitlist} variant="primary">
            {REWARDS.cta}
          </Button>

        </div>

      </div>
    </section>
  )
}
