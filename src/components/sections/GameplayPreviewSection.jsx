import { useEffect, useRef, useState } from 'react'
import { GAMEPLAY } from '@/constants/copy'
import { CTA } from '@/constants/config'
import { COINS } from '@/constants/assets'
import SectionTag from '@/components/ui/SectionTag'

// Dot grid — shared visual language
const GRID = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='0.75' fill='rgba(255%2C255%2C255%2C0.055)'/%3E%3C/svg%3E")`

/**
 * GameplayPreviewSection — Stage 4 · Section 1
 *
 * Split layout: copy left, premium mission card right.
 * Card: animated electric neon border (blue/indigo/purple conic-gradient light trail),
 * angular futuristic frame with corner bracket accents.
 * Scroll-reveal via IntersectionObserver.
 */

const MISSION_EXAMPLE = {
  tag:      'Active Mission',
  title:    'Your First Paycheck',
  scenario: "You've just received your first salary. After rent, you still have money left over. What do you prioritise first?",
  choices:  [
    'Start building an emergency fund',
    'Clear your outstanding balance first',
    'Set a fixed monthly savings goal',
  ],
}

const MISSION_CHIPS = [
  { label: 'Budgeting',   icon: '💰' },
  { label: 'Saving',      icon: '🏦' },
  { label: 'Emergencies', icon: '⚡' },
  { label: 'Investing',   icon: '📈' },
]

/** Futuristic corner bracket accent — one per corner */
function CornerAccent({ t, r, b, l }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position:     'absolute',
        top:          t !== undefined ? `${t}px` : undefined,
        right:        r !== undefined ? `${r}px` : undefined,
        bottom:       b !== undefined ? `${b}px` : undefined,
        left:         l !== undefined ? `${l}px` : undefined,
        width:        '14px',
        height:       '14px',
        zIndex:       5,
        pointerEvents:'none',
        borderTop:    t !== undefined ? '2px solid rgba(110,90,255,0.90)' : undefined,
        borderBottom: b !== undefined ? '2px solid rgba(110,90,255,0.90)' : undefined,
        borderLeft:   l !== undefined ? '2px solid rgba(110,90,255,0.90)' : undefined,
        borderRight:  r !== undefined ? '2px solid rgba(110,90,255,0.90)' : undefined,
      }}
    />
  )
}

export default function GameplayPreviewSection() {
  const [visible, setVisible]   = useState(false)
  const ref                     = useRef(null)
  const borderRef               = useRef(null)  // drives --neon-angle on the card wrapper

  // Scroll-reveal
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

  // Neon border animation — rAF drives --neon-angle on the card element.
  // Custom properties set via element.style.setProperty() ARE inherited by
  // ::before / ::after, so this reliably updates both pseudo-elements every
  // frame without needing @property or CSS animation browser support.
  // Speed: 0.7°/frame @ 60fps ≈ 8.6 s per revolution — smooth and premium.
  useEffect(() => {
    const el = borderRef.current
    if (!el) return
    // Respect user's motion preference — skip the rAF loop entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frameId
    let angle = 0
    const tick = () => {
      angle = (angle + 0.7) % 360
      el.style.setProperty('--neon-angle', `${angle}deg`)
      frameId = requestAnimationFrame(tick)
    }
    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [])

  const reveal = (delayMs = 0) => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? 'translateY(0px)' : 'translateY(28px)',
    transition: `opacity 0.7s ease ${delayMs}ms, transform 0.65s ease ${delayMs}ms`,
  })

  return (
    <section
      id="gameplay"
      ref={ref}
      aria-label="Gameplay Preview"
      className="relative overflow-hidden py-section-sm lg:py-section"
      style={{ background: '#07031A' }}
    >
      {/* ── Dot grid texture ─────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: GRID, backgroundRepeat: 'repeat' }} />

      {/* ── Top-edge blend ───────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-36"
        style={{ background: 'linear-gradient(to bottom, rgba(5,2,16,0.65) 0%, transparent 100%)', zIndex: 2 }} />

      {/* ── Atmospheric glow blobs ───────────────────────────────────── */}

      {/* Deep indigo-purple — right column atmosphere behind card */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[110px]"
        style={{ background: 'radial-gradient(ellipse 55% 70% at 75% 52%, rgba(80,50,240,0.28) 0%, rgba(120,40,220,0.12) 52%, transparent 72%)' }} />

      {/* Electric blue upper-right */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[90px]"
        style={{ background: 'radial-gradient(ellipse 44% 38% at 95% 5%, rgba(40,20,180,0.30) 0%, transparent 65%)' }} />

      {/* Warm lower-left */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse 38% 32% at 4% 92%, rgba(254,89,52,0.07) 0%, transparent 65%)' }} />

      {/* Purple haze lower-right */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse 36% 30% at 94% 90%, rgba(100,40,220,0.10) 0%, transparent 65%)' }} />

      {/* ── Floating P-coin watermarks ────────────────────────────────── */}

      {/* Left — large purple coin, partially cropped at left edge */}
      <img src={COINS.purpleStyled} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden sm:block"
        style={{
          width: '500px', height: '500px', left: '-80px', top: '50%',
          transform: 'translateY(-50%)', objectFit: 'contain',
          opacity: 0.13,
          filter: 'blur(1px) drop-shadow(0 0 18px rgba(137,38,231,0.55)) drop-shadow(0 0 40px rgba(87,62,251,0.30))',
          animationDelay: '0.8s', animationDuration: '7s',
          zIndex: 0,
        }} />

      {/* Right — large blue coin, partially cropped at right edge */}
      <img src={COINS.blue} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden sm:block"
        style={{
          width: '380px', height: '380px', right: '-70px', bottom: '8%',
          objectFit: 'contain',
          opacity: 0.10,
          filter: 'blur(1.5px) drop-shadow(0 0 16px rgba(70,158,255,0.50)) drop-shadow(0 0 36px rgba(70,158,255,0.25))',
          animationDelay: '2.4s', animationDuration: '8s',
          zIndex: 0,
        }} />

      {/* Right-upper — small extra purple coin for depth */}
      <img src={COINS.purpleStyled} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float"
        style={{
          width: '200px', height: '200px', right: '2%', top: '10%',
          objectFit: 'contain',
          opacity: 0.07,
          filter: 'blur(2px) drop-shadow(0 0 12px rgba(137,38,231,0.40))',
          animationDelay: '4.0s', animationDuration: '9s',
          zIndex: 0,
        }} />

      {/* ── Perspective grid floor ────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0"
        style={{ height: '200px', overflow: 'hidden', zIndex: 1 }}
      >
        <div style={{
          position: 'absolute',
          bottom: 0, left: '-10%', right: '-10%',
          height: '300px',
          backgroundImage: [
            'linear-gradient(rgba(80,50,240,0.12) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(80,50,240,0.12) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '80px 50px',
          transform: 'perspective(400px) rotateX(55deg)',
          transformOrigin: 'top center',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.20) 0%, transparent 80%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.20) 0%, transparent 80%)',
        }} />
      </div>

      {/* ════════════════════ CONTENT ══════════════════════════════════ */}
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* ── Left: copy ────────────────────────────────────────────── */}
          <div className="flex flex-col gap-6 order-2 lg:order-1" style={reveal(0)}>

            <SectionTag>{GAMEPLAY.preTag}</SectionTag>

            {/* Two-tone headline: white first line, purple-gradient second */}
            <h2 className="font-karantina text-h2-sm lg:text-h2 leading-[1.0]">
              <span className="block" style={{ color: '#F4F0FF' }}>
                Your next mission
              </span>
              <span
                className="block"
                style={{
                  background:           'linear-gradient(90deg, #A78BFA 0%, #7C3AED 45%, #8B5CF6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor:  'transparent',
                  backgroundClip:       'text',
                }}
              >
                is waiting.
              </span>
            </h2>

            <p className="font-rem text-body-lg text-text-muted leading-relaxed max-w-lg">
              {GAMEPLAY.body}
            </p>

            <div className="flex flex-col gap-3">

              {/* Neon-outline CTA — matches reference: icon left, text, arrow right */}
              <div>
                <a
                  href={CTA.exploreDemo}
                  className="inline-flex items-center gap-3 font-rem font-semibold"
                  style={{
                    padding:        '13px 24px',
                    borderRadius:   '10px',
                    background:     'rgba(70,50,220,0.14)',
                    border:         '1.5px solid rgba(110,80,255,0.60)',
                    boxShadow:      '0 0 16px rgba(80,50,240,0.22), 0 0 40px rgba(80,50,240,0.08)',
                    color:          'white',
                    fontSize:       '1rem',
                    textDecoration: 'none',
                    transition:     'background 0.25s, border-color 0.25s, box-shadow 0.25s',
                    cursor:         'pointer',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background  = 'rgba(70,50,220,0.24)'
                    e.currentTarget.style.borderColor = 'rgba(110,80,255,0.90)'
                    e.currentTarget.style.boxShadow   = '0 0 26px rgba(80,50,240,0.34), 0 0 60px rgba(80,50,240,0.13)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background  = 'rgba(70,50,220,0.14)'
                    e.currentTarget.style.borderColor = 'rgba(110,80,255,0.60)'
                    e.currentTarget.style.boxShadow   = '0 0 16px rgba(80,50,240,0.22), 0 0 40px rgba(80,50,240,0.08)'
                  }}
                >
                  {/* Game-controller icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                    <rect x="2" y="6" width="20" height="13" rx="4" stroke="#A78BFA" strokeWidth="1.8" />
                    <line x1="8"   y1="12.5" x2="11"  y2="12.5" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="9.5" y1="11"   x2="9.5" y2="14"   stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="16"   cy="11"   r="1.2" fill="#A78BFA" />
                    <circle cx="14.5" cy="13.5" r="1.2" fill="#A78BFA" />
                  </svg>
                  <span>{GAMEPLAY.cta}</span>
                  <span style={{ color: '#A78BFA', fontSize: '1.3rem', lineHeight: 1, fontWeight: 400 }}>›</span>
                </a>
              </div>

              <p className="font-rem text-caption text-text-dim flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: '#573EFB' }} aria-hidden="true" />
                {GAMEPLAY.microcopy}
              </p>

            </div>
          </div>

          {/* ── Right: mission card ───────────────────────────────────── */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end" style={reveal(150)}>
            <div className="relative w-full max-w-[480px]">

              {/* Deep electric glow halo behind entire card */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute"
                style={{
                  inset:      '-18%',
                  filter:     'blur(55px)',
                  background: 'radial-gradient(ellipse 75% 68% at 50% 50%, rgba(70,50,240,0.42) 0%, rgba(100,40,220,0.16) 48%, transparent 70%)',
                  zIndex:     0,
                }}
              />

              {/* ══ NEON BORDER FRAME ════════════════════════════════════
                  CSS-powered via ::before (sharp neon line) + ::after (bloom).
                  @property --neon-angle drives a conic-gradient FROM angle so
                  only the gradient angle moves — not the element — giving a
                  clean sweep on a non-square card.
                  See index.css → .neon-card-border
              ═══════════════════════════════════════════════════════════ */}
              <div
                className="neon-card-border"
                ref={borderRef}
                style={{ position: 'relative', borderRadius: '12px', zIndex: 1 }}
              >
                {/* Ambient glow ring — always-on static halo */}
                <div
                  aria-hidden="true"
                  style={{
                    position:      'absolute',
                    inset:         0,
                    borderRadius:  '12px',
                    boxShadow:     [
                      '0 0 0 1px rgba(90,60,240,0.22)',
                      '0 0 22px rgba(70,45,220,0.28)',
                      '0 0 60px rgba(70,45,220,0.10)',
                    ].join(', '),
                    pointerEvents: 'none',
                    zIndex:        3,
                  }}
                />

                {/* Corner bracket accents — futuristic HUD frame */}
                <CornerAccent t={0} l={0} />
                <CornerAccent t={0} r={0} />
                <CornerAccent b={0} l={0} />
                <CornerAccent b={0} r={0} />

                {/* ── Card surface ── */}
                <div
                  style={{
                    position:     'relative',
                    zIndex:       0,
                    borderRadius: '10px',
                    overflow:     'hidden',
                    background:   'linear-gradient(160deg, #100C2E 0%, #0C0828 55%, #080522 100%)',
                  }}
                >

                  {/* Card header */}
                  <div style={{
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'space-between',
                    padding:        '14px 20px',
                    background:     'rgba(0,0,0,0.28)',
                    borderBottom:   '1px solid rgba(255,255,255,0.055)',
                  }}>
                    {/* Active Mission pill */}
                    <span style={{
                      display:       'inline-flex',
                      alignItems:    'center',
                      gap:           '6px',
                      padding:       '4px 13px',
                      borderRadius:  '20px',
                      background:    'rgba(100,60,240,0.22)',
                      border:        '1px solid rgba(110,70,255,0.45)',
                      fontSize:      '0.67rem',
                      fontWeight:    700,
                      color:         '#BBA8FF',
                      letterSpacing: '0.13em',
                      textTransform: 'uppercase',
                    }}>
                      <span aria-hidden="true" style={{
                        width: '5px', height: '5px', borderRadius: '50%',
                        background: '#7B5CF6', display: 'inline-block',
                        boxShadow: '0 0 6px rgba(123,92,246,0.8)',
                      }} />
                      {MISSION_EXAMPLE.tag}
                    </span>

                    {/* P-coins indicator */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                      <img
                        src={COINS.purpleStyled} alt="" aria-hidden="true"
                        style={{ width: '22px', height: '22px', objectFit: 'contain' }}
                      />
                      <span className="font-rem" style={{ fontSize: '0.83rem', color: '#9080BB', fontWeight: 600 }}>
                        +150 P-coins
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: '20px 20px 0' }}>

                    {/* Mission title row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                      {/* Hexagonal badge icon */}
                      <div style={{
                        width:          '44px',
                        height:         '44px',
                        flexShrink:     0,
                        clipPath:       'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
                        background:     'linear-gradient(135deg, #6040F0, #8855FF)',
                        display:        'flex',
                        alignItems:     'center',
                        justifyContent: 'center',
                        fontSize:       '1.15rem',
                      }}>
                        💼
                      </div>

                      <h3
                        className="font-karantina"
                        style={{ fontSize: '1.7rem', color: '#F0EAFF', lineHeight: 1.05, margin: 0 }}
                      >
                        {MISSION_EXAMPLE.title}
                      </h3>
                    </div>

                    {/* Divider */}
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '13px' }} />

                    {/* Scenario */}
                    <p
                      className="font-rem"
                      style={{
                        fontSize:     '0.88rem',
                        color:        'rgba(195,182,225,0.85)',
                        lineHeight:   1.65,
                        marginBottom: '16px',
                      }}
                    >
                      {MISSION_EXAMPLE.scenario}
                    </p>

                    {/* Choose label */}
                    <p
                      className="font-rem"
                      style={{
                        fontSize:      '0.66rem',
                        color:         'rgba(130,115,165,0.65)',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        fontWeight:    700,
                        marginBottom:  '9px',
                      }}
                    >
                      Choose your move:
                    </p>

                    {/* Choices — all three have › arrows */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '18px' }}>
                      {MISSION_EXAMPLE.choices.map((choice, i) => (
                        <div
                          key={i}
                          style={{
                            display:      'flex',
                            alignItems:   'center',
                            gap:          '10px',
                            padding:      '12px 14px',
                            borderRadius: '8px',
                            background: i === 0
                              ? 'linear-gradient(90deg, rgba(100,60,240,0.28), rgba(80,50,200,0.16))'
                              : 'rgba(255,255,255,0.035)',
                            border: `1px solid ${i === 0
                              ? 'rgba(110,70,255,0.55)'
                              : 'rgba(255,255,255,0.07)'}`,
                            boxShadow: i === 0
                              ? 'inset 0 0 20px rgba(100,60,240,0.07)'
                              : 'none',
                          }}
                        >
                          {/* Letter badge */}
                          <span style={{
                            width:          '26px',
                            height:         '26px',
                            borderRadius:   '50%',
                            flexShrink:     0,
                            display:        'flex',
                            alignItems:     'center',
                            justifyContent: 'center',
                            background: i === 0
                              ? 'rgba(100,60,240,0.55)'
                              : 'rgba(255,255,255,0.06)',
                            border: `1px solid ${i === 0
                              ? 'rgba(160,120,255,0.70)'
                              : 'rgba(255,255,255,0.10)'}`,
                            fontSize:  '0.65rem',
                            fontWeight: 700,
                            color:     i === 0 ? '#DDD0FF' : '#504868',
                          }}>
                            {String.fromCharCode(65 + i)}
                          </span>

                          {/* Choice text */}
                          <span
                            className="font-rem"
                            style={{
                              fontSize:   '0.875rem',
                              color:      i === 0 ? '#CDB8FF' : '#5E5278',
                              flex:       1,
                              lineHeight: 1.4,
                            }}
                          >
                            {choice}
                          </span>

                          {/* Arrow — all choices, A is brighter */}
                          <span style={{
                            color:      i === 0 ? '#9B7EFF' : 'rgba(90,70,140,0.45)',
                            fontSize:   '1.15rem',
                            flexShrink: 0,
                            fontWeight: i === 0 ? 600 : 400,
                          }}>
                            ›
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Progress bar */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span className="font-rem" style={{ fontSize: '0.78rem', color: 'rgba(130,115,165,0.65)' }}>
                          Mission progress
                        </span>
                        <span className="font-rem" style={{ fontSize: '0.78rem', color: '#7B5CF6', fontWeight: 700 }}>
                          1 / 3
                        </span>
                      </div>
                      <div style={{ width: '100%', height: '5px', borderRadius: '3px', background: 'rgba(255,255,255,0.07)' }}>
                        <div style={{
                          width:       visible ? '33%' : '0%',
                          height:      '100%',
                          borderRadius:'3px',
                          background:  'linear-gradient(90deg, #4030D0, #7B5CF6, #9B7EFF)',
                          transition:  'width 1.2s ease 700ms',
                          boxShadow:   '0 0 8px rgba(100,70,255,0.55)',
                        }} />
                      </div>
                    </div>

                  </div>

                  {/* Chips footer */}
                  <div style={{
                    display:   'flex',
                    flexWrap:  'wrap',
                    gap:       '7px',
                    padding:   '13px 20px 17px',
                    borderTop: '1px solid rgba(255,255,255,0.055)',
                  }}>
                    {MISSION_CHIPS.map(({ label, icon }) => (
                      <span
                        key={label}
                        className="font-rem"
                        style={{
                          display:     'inline-flex',
                          alignItems:  'center',
                          gap:         '5px',
                          padding:     '5px 11px',
                          borderRadius:'20px',
                          background:  'rgba(100,70,220,0.12)',
                          border:      '1px solid rgba(100,70,220,0.22)',
                          fontSize:    '0.76rem',
                          color:       '#8070A8',
                        }}
                      >
                        <span aria-hidden="true" style={{ fontSize: '0.8rem' }}>{icon}</span>
                        {label}
                      </span>
                    ))}
                  </div>

                </div>
                {/* ── End card surface ── */}

              </div>
              {/* ══ End neon border frame ══ */}

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
