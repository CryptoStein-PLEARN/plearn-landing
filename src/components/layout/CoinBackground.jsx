// ─────────────────────────────────────────────────────────────────────────────
// CoinBackground — reusable floating P-coin atmosphere layer
//
// Renders as a fixed, full-viewport layer (z-index 0) that sits behind ALL
// page content. Coins are decorative only: pointer-events:none, very low
// opacity, subtly animated.
//
// Usage:
//   <CoinBackground variant="about" />      ← About page
//   <CoinBackground variant="waitlist" />   ← Waitlist page
//   <CoinBackground variant="default" />    ← Any future page
//
// Home page: already has its own per-section coin system — do NOT add this
// component there to avoid double-layering.
//
// Mobile rules:
//   - Coins with className containing "xl-only" or "lg-only" hide on mobile
//   - Coins with "sm-only" hide on phones (<640px)
//   - Coins with "always" show on all sizes — kept small (≤140px) for perf
//   - The global index.css rule slows animate-float to 10s on mobile
//   - The global index.css rule hides elements with blur-[1xx] aria-hidden on mobile
//     → we use blur-[2px]–blur-[3px] so mobile hiding rule does NOT fire here;
//       we want coins to be visible on mobile (just smaller/fewer)
//
// Performance:
//   - All assets are WebP (already converted project-wide)
//   - loading="lazy" on all coins (decorative, not LCP)
//   - will-change kept off — transform is GPU-composited via the float keyframe
// ─────────────────────────────────────────────────────────────────────────────

import { COINS } from '@/constants/assets'

// ── Single coin renderer ───────────────────────────────────────────────────────
// size       — pixel dimension (square)
// src        — coin asset path
// style      — positioning + any overrides
// mobileShow — 'always' | 'sm' | 'lg' | 'xl'
// delay      — animation-delay in seconds
// duration   — animation duration in seconds (default 7)
// blur       — CSS blur filter value (keep ≤ 3px so the mobile CSS rule doesn't kill it)
function Coin({ src, size, style: pos, mobileShow = 'lg', delay = 0, duration = 7, blur = '1px', opacity = 0.08 }) {
  const hideClass =
    mobileShow === 'always' ? '' :
    mobileShow === 'sm'     ? 'hidden sm:block' :
    mobileShow === 'lg'     ? 'hidden lg:block' :
    /* xl */                  'hidden xl:block'

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`pointer-events-none select-none absolute animate-float ${hideClass}`}
      style={{
        width:  size,
        height: size,
        objectFit: 'contain',
        opacity,
        filter: `blur(${blur}) drop-shadow(0 0 18px rgba(137,38,231,0.30))`,
        animationDelay:    `${delay}s`,
        animationDuration: `${duration}s`,
        ...pos,
      }}
    />
  )
}

// ── Coin configurations per page variant ──────────────────────────────────────
//
// Coordinates use CSS positioning values (top/left/right/bottom as percentages
// or px). All are relative to the fixed viewport container.
//
// Design rationale per variant:
//   about    — editorial feel; coins lean toward edges, not centre; mix of purple
//              blue, orange, green to echo Home palette
//   waitlist — focused layout (centred form); coins frame the sides generously
//              but stay out of the form area (vertically ≥60% or top ≤25%)
//   default  — safe neutral arrangement for any future page; 3 coins only
// ─────────────────────────────────────────────────────────────────────────────
const VARIANTS = {

  about: [
    // ONE coin — far top-left, mostly off-screen.
    // Only the bottom-right tip is visible; never touches headline or card area.
    { src: COINS.purpleStyled, size: 300, pos: { left: '-150px', top: '-80px' },
      mobileShow: 'xl', delay: 0, duration: 9.5, blur: '3px', opacity: 0.045 },

    // ONE coin — far bottom-right, mostly off-screen.
    // Pushed 80px right and 50px below so it never overlaps card 3.
    { src: COINS.green, size: 200, pos: { right: '-80px', bottom: '-50px' },
      mobileShow: 'xl', delay: 3.0, duration: 8.8, blur: '2px', opacity: 0.04 },
  ],

  waitlist: [
    // Large purple — left side, upper third, desktop only
    { src: COINS.purpleStyled, size: 340, pos: { left: '-50px', top: '15%' },
      mobileShow: 'xl', delay: 0,   duration: 8.5, blur: '2px', opacity: 0.08 },

    // Orange — right side, upper third, tablet+
    { src: COINS.orange,       size: 240, pos: { right: '-20px', top: '22%' },
      mobileShow: 'lg', delay: 1.5, duration: 9.0, blur: '1.5px', opacity: 0.07 },

    // Blue — bottom-right, tablet+
    { src: COINS.blue,         size: 220, pos: { right: '4%', bottom: '12%' },
      mobileShow: 'lg', delay: 2.8, duration: 8.0, blur: '1px', opacity: 0.065 },

    // Green — bottom-left, sm+
    { src: COINS.green,        size: 160, pos: { left: '3%', bottom: '18%' },
      mobileShow: 'sm', delay: 1.0, duration: 7.5, blur: '0.5px', opacity: 0.06 },

    // Small purple — upper right, always (mobile-safe)
    { src: COINS.purple,       size: 90,  pos: { right: '8%', top: '8%' },
      mobileShow: 'always', delay: 3.5, duration: 8.8, blur: '0px', opacity: 0.07 },
  ],

  rewards: [
    // Purple — far top-left, mostly off-screen
    { src: COINS.purpleStyled, size: 280, pos: { left: '-80px', top: '8%' },
      mobileShow: 'xl', delay: 0,   duration: 9.5, blur: '2.5px', opacity: 0.045 },

    // Orange — far bottom-right, mostly off-screen
    { src: COINS.orange,       size: 220, pos: { right: '-60px', bottom: '8%' },
      mobileShow: 'xl', delay: 2.5, duration: 8.8, blur: '2px', opacity: 0.040 },
  ],

  partners: [
    // Subtle purple — far top-left, professional/editorial
    { src: COINS.purpleStyled, size: 240, pos: { left: '-70px', top: '8%' },
      mobileShow: 'xl', delay: 0,   duration: 10.0, blur: '2.5px', opacity: 0.038 },

    // Blue — far bottom-right
    { src: COINS.blue,         size: 180, pos: { right: '-50px', bottom: '10%' },
      mobileShow: 'xl', delay: 2.5, duration: 9.2,  blur: '2px',   opacity: 0.034 },
  ],

  missions: [
    // Purple — far top-left corner
    { src: COINS.purpleStyled, size: 260, pos: { left: '-75px', top: '6%' },
      mobileShow: 'xl', delay: 0,   duration: 9.5, blur: '2.5px', opacity: 0.042 },

    // Blue — far bottom-right corner
    { src: COINS.blue,         size: 200, pos: { right: '-55px', bottom: '6%' },
      mobileShow: 'xl', delay: 2.0, duration: 8.8, blur: '2px',   opacity: 0.038 },
  ],

  default: [
    // Purple — top-left, tablet+
    { src: COINS.purpleStyled, size: 280, pos: { left: '-30px', top: '12%' },
      mobileShow: 'lg', delay: 0,   duration: 8.0, blur: '1.5px', opacity: 0.07 },

    // Blue — right side mid, tablet+
    { src: COINS.blue,         size: 220, pos: { right: '-20px', top: '50%' },
      mobileShow: 'lg', delay: 2.0, duration: 9.0, blur: '1px', opacity: 0.065 },

    // Small orange — bottom-left, always
    { src: COINS.orange,       size: 110, pos: { left: '5%', bottom: '10%' },
      mobileShow: 'sm', delay: 1.2, duration: 7.5, blur: '0px', opacity: 0.06 },
  ],
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function CoinBackground({ variant = 'default' }) {
  const coins = VARIANTS[variant] ?? VARIANTS.default

  return (
    <div
      aria-hidden="true"
      style={{
        position:      'fixed',
        inset:         0,
        zIndex:        0,
        pointerEvents: 'none',
        overflow:      'hidden',
      }}
    >
      {coins.map((c, i) => (
        <Coin key={i} src={c.src} size={c.size} style={c.pos}
          mobileShow={c.mobileShow} delay={c.delay} duration={c.duration}
          blur={c.blur} opacity={c.opacity}
        />
      ))}
    </div>
  )
}
