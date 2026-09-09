import { useEffect, useRef, useState } from 'react'
import { WHAT_IS_PLEARN } from '@/constants/copy'
import { CTA } from '@/constants/config'
import { COINS } from '@/constants/assets'
import Button from '@/components/ui/Button'
import SectionTag from '@/components/ui/SectionTag'

// Dot grid — matches rest of page
const GRID = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='0.75' fill='rgba(255%2C255%2C255%2C0.055)'/%3E%3C/svg%3E")`

/**
 * WhatIsPlearnSection — Stage 3 · Section 1
 *
 * Neon enhancement: card border + box-shadow moved to OUTER wrapper (no overflow:hidden)
 * so the glow is not clipped. Inner div keeps overflow:hidden for background gradient only.
 * Glow values significantly boosted to match reference image.
 * Sparkle particles added around coins (reuses sparkle-twinkle/sparkle-drift keyframes).
 * Floor glow added beneath each card.
 */

// ─── Card visual config ────────────────────────────────────────────────────
const CARD_CONFIG = [
  {
    coin:         COINS.orange,
    coinDelay:    '0s',
    accentBar:    'linear-gradient(90deg, #FE5934, #EF00BD)',
    topBar:       'linear-gradient(90deg, #FE5934, #EF00BD)',
    border:       'rgba(254,89,52,0.80)',
    borderHov:    'rgba(254,89,52,1.00)',
    // Key fix: strong multi-layer glow — tight bloom + wide soft halo
    outerGlow:    '0 0 0 1px rgba(254,89,52,0.30), 0 0 22px 3px rgba(254,89,52,0.62), 0 0 60px 8px rgba(254,89,52,0.36), 0 0 120px 16px rgba(254,89,52,0.16)',
    outerGlowHov: '0 0 0 1px rgba(254,89,52,0.50), 0 0 28px 5px rgba(254,89,52,0.80), 0 0 80px 12px rgba(254,89,52,0.48), 0 0 140px 22px rgba(254,89,52,0.22)',
    cardBg:       'radial-gradient(ellipse 100% 55% at 50% 0%, rgba(254,89,52,0.18) 0%, #0C0820 52%, #090618 100%)',
    floorColor:   'rgba(254,89,52,0.38)',
    numClr:       'rgba(254,89,52,0.10)',
    sparkleClr:   ['rgba(255,120,60,0.95)', 'rgba(255,200,80,0.85)', 'rgba(239,0,189,0.75)', 'rgba(255,160,60,0.90)'],
  },
  {
    coin:         COINS.purpleStyled,
    coinDelay:    '0.55s',
    accentBar:    'linear-gradient(90deg, #8926E7, #573EFB)',
    topBar:       'linear-gradient(90deg, #8926E7, #573EFB)',
    border:       'rgba(137,38,231,0.80)',
    borderHov:    'rgba(170,80,255,1.00)',
    outerGlow:    '0 0 0 1px rgba(137,38,231,0.30), 0 0 22px 3px rgba(137,38,231,0.62), 0 0 60px 8px rgba(87,62,251,0.36), 0 0 120px 16px rgba(87,62,251,0.16)',
    outerGlowHov: '0 0 0 1px rgba(137,38,231,0.50), 0 0 28px 5px rgba(137,38,231,0.80), 0 0 80px 12px rgba(87,62,251,0.48), 0 0 140px 22px rgba(87,62,251,0.22)',
    cardBg:       'radial-gradient(ellipse 100% 55% at 50% 0%, rgba(137,38,231,0.18) 0%, #0C0820 52%, #080520 100%)',
    floorColor:   'rgba(137,38,231,0.34)',
    numClr:       'rgba(137,38,231,0.10)',
    sparkleClr:   ['rgba(200,80,255,0.95)', 'rgba(150,100,255,0.85)', 'rgba(239,0,189,0.80)', 'rgba(180,120,255,0.90)'],
  },
  {
    coin:         COINS.green,
    coinDelay:    '1.1s',
    accentBar:    'linear-gradient(90deg, #01DE5B, #469EFF)',
    topBar:       'linear-gradient(90deg, #01DE5B, #00CCAA)',
    border:       'rgba(1,222,91,0.76)',
    borderHov:    'rgba(1,222,91,1.00)',
    outerGlow:    '0 0 0 1px rgba(1,222,91,0.28), 0 0 22px 3px rgba(1,222,91,0.58), 0 0 60px 8px rgba(1,222,91,0.33), 0 0 120px 16px rgba(1,222,91,0.14)',
    outerGlowHov: '0 0 0 1px rgba(1,222,91,0.46), 0 0 28px 5px rgba(1,222,91,0.76), 0 0 80px 12px rgba(1,222,91,0.44), 0 0 140px 22px rgba(1,222,91,0.20)',
    cardBg:       'radial-gradient(ellipse 100% 55% at 50% 0%, rgba(1,222,91,0.15) 0%, #09081E 52%, #060518 100%)',
    floorColor:   'rgba(1,222,91,0.30)',
    numClr:       'rgba(1,222,91,0.10)',
    sparkleClr:   ['rgba(1,222,91,0.95)', 'rgba(70,220,140,0.85)', 'rgba(70,158,255,0.80)', 'rgba(0,200,120,0.90)'],
  },
]

// ─── Sparkle particle (4-pointed cross) ───────────────────────────────────
// Reuses sparkle-twinkle / sparkle-drift keyframes from index.css
function Sparkle({ size, color, style: extraStyle, delay, dur, anim }) {
  const half = size / 2
  const thin = Math.max(1, size * 0.22)
  return (
    <div style={{
      position: 'absolute', width: `${size}px`, height: `${size}px`,
      animation: `${anim} ${dur} ${delay} ease-in-out infinite`,
      pointerEvents: 'none',
      ...extraStyle,
    }}>
      <div style={{
        position: 'absolute', left: `${half - thin / 2}px`, top: 0,
        width: `${thin}px`, height: `${size}px`,
        background: color, borderRadius: '9999px',
        boxShadow: `0 0 ${size + 2}px ${color}`,
      }} />
      <div style={{
        position: 'absolute', top: `${half - thin / 2}px`, left: 0,
        width: `${size}px`, height: `${thin}px`,
        background: color, borderRadius: '9999px',
        boxShadow: `0 0 ${size + 2}px ${color}`,
      }} />
    </div>
  )
}

const SPARKLE_DEFS = [
  { top: '-12px', left: '-8px',  size: 5, delay: '0.0s', dur: '2.2s', anim: 'sparkle-twinkle' },
  { top: '-8px',  left: '22px',  size: 3, delay: '0.5s', dur: '1.9s', anim: 'sparkle-drift'   },
  { top: '18px',  left: '-14px', size: 4, delay: '0.9s', dur: '2.6s', anim: 'sparkle-twinkle' },
  { top: '-4px',  right: '-10px',size: 6, delay: '1.4s', dur: '2.0s', anim: 'sparkle-drift'   },
  { top: '30px',  right: '-8px', size: 3, delay: '0.3s', dur: '2.4s', anim: 'sparkle-twinkle' },
  { bottom: '-6px',left: '14px', size: 4, delay: '1.8s', dur: '2.1s', anim: 'sparkle-drift'   },
  { bottom: '-8px',right: '20px',size: 3, delay: '0.7s', dur: '2.8s', anim: 'sparkle-twinkle' },
  { top: '50px',  left: '-6px',  size: 3, delay: '2.2s', dur: '1.8s', anim: 'sparkle-drift'   },
]

function CoinWithSparkles({ cfg }) {
  const [pulse, setPulse] = useState(false)
  useEffect(() => {
    const id = setInterval(() => setPulse(p => !p), 1800)
    return () => clearInterval(id)
  }, [])

  const baseFilter = `drop-shadow(0 0 8px ${cfg.sparkleClr[0]}) drop-shadow(0 0 20px ${cfg.sparkleClr[1]})`
  const peakFilter = `drop-shadow(0 0 14px ${cfg.sparkleClr[0]}) drop-shadow(0 0 34px ${cfg.sparkleClr[1]}) drop-shadow(0 0 52px ${cfg.sparkleClr[2]})`

  return (
    <div style={{ position: 'relative', width: '80px', height: '80px', flexShrink: 0 }}>
      {SPARKLE_DEFS.map((sp, i) => (
        <Sparkle
          key={i}
          size={sp.size}
          color={cfg.sparkleClr[i % cfg.sparkleClr.length]}
          delay={sp.delay}
          dur={sp.dur}
          anim={sp.anim}
          style={{ top: sp.top, left: sp.left, right: sp.right, bottom: sp.bottom }}
        />
      ))}
      <img
        src={cfg.coin}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="animate-float"
        style={{
          width: '80px', height: '80px', objectFit: 'contain',
          animationDelay: cfg.coinDelay,
          filter: pulse ? peakFilter : baseFilter,
          transition: 'filter 1.8s ease-in-out',
          position: 'relative', zIndex: 1,
        }}
      />
    </div>
  )
}


// ─── Feature card ─────────────────────────────────────────────────────────
// Critical pattern: outer div has border + box-shadow (no overflow:hidden)
//                  inner div has overflow:hidden for bg gradient clipping
function FeatureCard({ feature, cfg, index, revealStyle }) {
  const [hovered, setHovered] = useState(false)
  const num = String(index + 1).padStart(2, '0')

  return (
    <div
      style={{ ...revealStyle, position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Floor underglow — bleeds below card */}
      <div aria-hidden="true" className="pointer-events-none absolute" style={{
        bottom: '-28px', left: '6%', right: '6%', height: '64px',
        background: `radial-gradient(ellipse 80% 100% at 50% 0%, ${cfg.floorColor} 0%, transparent 70%)`,
        filter: 'blur(16px)',
      }} />

      {/* OUTER wrapper — border + glow here (NO overflow:hidden), fills parent height */}
      <div style={{
        position: 'relative', borderRadius: '16px', cursor: 'default',
        flex: 1, display: 'flex', flexDirection: 'column',
        border:    `1.5px solid ${hovered ? cfg.borderHov : cfg.border}`,
        boxShadow: hovered ? cfg.outerGlowHov : cfg.outerGlow,
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}>
        {/* INNER card — overflow:hidden only here (for bg radial gradient), fills outer */}
        <div style={{
          borderRadius: '14px', overflow: 'hidden',
          background: cfg.cardBg, position: 'relative',
          flex: 1, display: 'flex', flexDirection: 'column',
        }}>
          {/* Top accent bar */}
          <div aria-hidden="true" style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
            borderRadius: '14px 14px 0 0', background: cfg.topBar,
            boxShadow: `0 0 8px 1px ${cfg.border}`,
          }} />

          {/* Watermark number */}
          <span aria-hidden="true" className="pointer-events-none select-none absolute font-karantina leading-none"
            style={{ fontSize: '6rem', top: '0.25rem', right: '1rem', color: cfg.numClr, letterSpacing: '-0.02em' }}>
            {num}
          </span>

          {/* Card content — flex-1 so it fills card height */}
          <div className="flex flex-col gap-5 p-5 sm:p-7 pt-6 sm:pt-8" style={{ position: 'relative', flex: 1 }}>

            {/* Coin with sparkles + accent bar */}
            <div className="flex flex-col items-start gap-3">
              <CoinWithSparkles cfg={cfg} />
              <div aria-hidden="true" className="rounded-full"
                style={{ width: '2.5rem', height: '3px', background: cfg.accentBar, marginTop: '0.25rem' }} />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-2">
              <h3 className="font-karantina text-h3-sm text-white leading-snug">{feature.title}</h3>
              <p className="font-rem text-body text-text-muted leading-relaxed">{feature.body}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────
export default function WhatIsPlearnSection() {
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
      id="what-is-plearn"
      ref={ref}
      aria-label="What is PLEARN"
      className="relative overflow-hidden py-section-sm lg:py-section"
      style={{ background: '#08041C' }}
    >
      {/* ── Dot grid texture ─────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: GRID, backgroundRepeat: 'repeat' }} />

      {/* ── Top-edge blend ───────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-36 z-[2]"
        style={{ background: 'linear-gradient(to bottom, rgba(3,1,12,0.70) 0%, transparent 100%)' }} />

      {/* ── Atmospheric glow blobs (unchanged) ──────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse 75% 50% at 50% -5%, rgba(137,38,231,0.22) 0%, transparent 68%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[110px]"
        style={{ background: 'radial-gradient(ellipse 40% 40% at 18% 78%, rgba(254,89,52,0.12) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[110px]"
        style={{ background: 'radial-gradient(ellipse 38% 40% at 50% 78%, rgba(87,62,251,0.10) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[110px]"
        style={{ background: 'radial-gradient(ellipse 40% 40% at 82% 78%, rgba(1,222,91,0.09) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 48% 40% at 92% 6%, rgba(45,25,160,0.20) 0%, transparent 68%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 42% 36% at 5% 94%, rgba(239,0,189,0.10) 0%, transparent 65%)' }} />

      {/* ── Floating P-coin watermarks (unchanged) ───────────────────── */}
      <img loading="lazy" src={COINS.orange} alt="" aria-hidden="true"
        className="pointer-events-none select-none absolute animate-float hidden sm:block"
        style={{ width: '480px', height: '480px', left: '-80px', top: '55%',
          transform: 'translateY(-50%)', objectFit: 'contain', opacity: 0.12,
          filter: 'blur(1px) drop-shadow(0 0 18px rgba(254,89,52,0.55)) drop-shadow(0 0 38px rgba(254,89,52,0.28))',
          animationDelay: '0.6s', animationDuration: '6.5s', zIndex: 0 }} />
      <img loading="lazy" src={COINS.green} alt="" aria-hidden="true"
        className="pointer-events-none select-none absolute animate-float hidden sm:block"
        style={{ width: '360px', height: '360px', right: '-70px', top: '60%',
          transform: 'translateY(-50%)', objectFit: 'contain', opacity: 0.09,
          filter: 'blur(1.5px) drop-shadow(0 0 16px rgba(1,222,91,0.50)) drop-shadow(0 0 34px rgba(1,222,91,0.25))',
          animationDelay: '2.1s', animationDuration: '7.5s', zIndex: 0 }} />
      <img loading="lazy" src={COINS.blue} alt="" aria-hidden="true"
        className="pointer-events-none select-none absolute animate-float"
        style={{ width: '200px', height: '200px', right: '3%', top: '8%', objectFit: 'contain', opacity: 0.07,
          filter: 'blur(2px) drop-shadow(0 0 12px rgba(70,158,255,0.40))',
          animationDelay: '4.2s', animationDuration: '9s', zIndex: 0 }} />

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="section-container relative z-10">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center gap-5 mb-10 lg:mb-16" style={reveal(0)}>

          <SectionTag>{WHAT_IS_PLEARN.preTag}</SectionTag>

          <h2
            className="font-karantina text-h2-sm lg:text-h2 leading-tight"
            style={{
              background:           'linear-gradient(135deg, #FFFFFF 0%, #E8D4FF 40%, #C084FF 70%, #EF00BD 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor:  'transparent',
              backgroundClip:       'text',
            }}
          >
            {WHAT_IS_PLEARN.headline}
          </h2>

          <div aria-hidden="true" className="rounded-full" style={{
            width: '5rem', height: '3px', marginTop: '-0.5rem',
            background: 'linear-gradient(90deg, #8926E7, #573EFB, #EF00BD)',
          }} />

          <p className="font-rem text-body-lg text-text-muted max-w-2xl leading-relaxed mt-1">
            {WHAT_IS_PLEARN.body}
          </p>

          <div style={{ marginTop: '0.25rem' }}>
            <Button href={CTA.previewMissions} variant="ghost" size="sm">
              {WHAT_IS_PLEARN.cta}
            </Button>
          </div>

        </div>

        {/* ── Feature cards ──────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-stretch gap-5" style={{ paddingBottom: '40px' }}>
          {WHAT_IS_PLEARN.features.map((feature, i) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              cfg={CARD_CONFIG[i]}
              index={i}
              revealStyle={reveal(160 + i * 120)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
