// ─────────────────────────────────────────────────────────────────────────────
// PageLoader — Fullscreen branded loading overlay
//
// Shows on initial page load and can be triggered for page transitions via
// LoaderContext (useLoader hook).
//
// Visual: neon spinning arc ring + floating P-coin + animated "mission" text
// Style:  matches site design system — dark bg, purple/pink/blue neon glow
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react'
import { COINS } from '@/constants/assets'

// ── Keyframes (injected once into <head>) ────────────────────────────────────
const KEYFRAMES = `
@keyframes pl-spin {
  to { transform: rotate(360deg); }
}
@keyframes pl-coin-bob {
  0%, 100% { transform: translateY(0px) scale(1.00); filter: drop-shadow(0 0 10px rgba(137,38,231,0.65)); }
  50%       { transform: translateY(-9px) scale(1.03); filter: drop-shadow(0 0 20px rgba(137,38,231,0.90)); }
}
@keyframes pl-fade-up {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
`

let _kfInjected = false
function ensureKeyframes() {
  if (_kfInjected || typeof document === 'undefined') return
  const s = document.createElement('style')
  s.setAttribute('data-plearn-loader', '')
  s.textContent = KEYFRAMES
  document.head.appendChild(s)
  _kfInjected = true
}

// ── Neon ring SVG ─────────────────────────────────────────────────────────────
// r=42 → circumference ≈ 263.9
// 3/4 arc dash = 197.9 | 1/4 gap = 65.97
function NeonRing() {
  return (
    <svg
      width="100" height="100"
      viewBox="0 0 100 100"
      aria-hidden="true"
      style={{ animation: 'pl-spin 1.5s linear infinite', display: 'block' }}
    >
      <defs>
        <linearGradient id="pl-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#EF00BD" stopOpacity="0.0" />
          <stop offset="35%"  stopColor="#8926E7" stopOpacity="0.9" />
          <stop offset="70%"  stopColor="#573EFB" stopOpacity="1.0" />
          <stop offset="100%" stopColor="#469EFF" stopOpacity="1.0" />
        </linearGradient>
      </defs>

      {/* Track ring */}
      <circle
        cx="50" cy="50" r="42"
        fill="none"
        stroke="rgba(137,38,231,0.10)"
        strokeWidth="3"
      />

      {/* Neon arc — 270° visible, 90° gap */}
      <circle
        cx="50" cy="50" r="42"
        fill="none"
        stroke="url(#pl-grad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="197.9 65.97"
        strokeDashoffset="0"
        style={{
          filter: 'drop-shadow(0 0 5px rgba(137,38,231,0.80)) drop-shadow(0 0 12px rgba(70,158,255,0.40))',
        }}
      />
    </svg>
  )
}

// ── Animated dots ("...", cycles 400ms per dot) ───────────────────────────────
function LoadingDots() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setCount(c => (c + 1) % 4), 400)
    return () => clearInterval(id)
  }, [])
  return <span aria-hidden="true">{'·'.repeat(count)}</span>
}

// ── PageLoader ────────────────────────────────────────────────────────────────
// Props:
//   visible {boolean} — controls whether the overlay is shown
//   message {string}  — optional loading text override
export default function PageLoader({ visible = true, message = 'Preparing your mission' }) {
  const [mounted, setMounted] = useState(false)  // tracks CSS display:flex state
  const [opacity, setOpacity] = useState(visible ? 1 : 0)
  const rafRef = useRef(null)

  useEffect(() => { ensureKeyframes() }, [])

  useEffect(() => {
    if (visible) {
      // Show: mount → next frame → fade in
      setMounted(true)
      rafRef.current = requestAnimationFrame(() => setOpacity(1))
    } else {
      // Hide: fade out → then unmount after transition completes
      setOpacity(0)
      const id = setTimeout(() => setMounted(false), 500)
      return () => clearTimeout(id)
    }
    return () => rafRef.current && cancelAnimationFrame(rafRef.current)
  }, [visible])

  if (!mounted) return null

  return (
    <div
      role="status"
      aria-label="Loading PLEARN"
      style={{
        position:       'fixed',
        inset:          0,
        zIndex:         9999,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        flexDirection:  'column',
        gap:            0,
        // Dark base + radial glow matching site atmosphere
        background:     '#0A0714',
        backgroundImage: [
          'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(137,38,231,0.16) 0%, transparent 65%)',
          'radial-gradient(ellipse 40% 35% at 30% 70%, rgba(87,62,251,0.08) 0%, transparent 60%)',
        ].join(', '),
        // Fade
        opacity,
        pointerEvents: opacity < 0.05 ? 'none' : 'all',
        transition:    'opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* ── Ring + coin ── */}
      <div
        aria-hidden="true"
        style={{
          position:     'relative',
          width:        100,
          height:       100,
          marginBottom: 28,
        }}
      >
        {/* Outer neon ring */}
        <NeonRing />

        {/* Floating P-coin centred inside the ring */}
        <img
          src={COINS.purple}
          alt=""
          aria-hidden="true"
          style={{
            position:   'absolute',
            top:        '50%',
            left:       '50%',
            transform:  'translate(-50%, -50%)',
            width:      52,
            height:     52,
            objectFit:  'contain',
            animation:  'pl-coin-bob 2.2s ease-in-out infinite',
          }}
        />
      </div>

      {/* ── Loading text ── */}
      <p
        style={{
          fontFamily:    '"REM Variable", sans-serif',
          fontSize:      '0.82rem',
          fontWeight:    500,
          color:         'rgba(190,170,230,0.72)',
          letterSpacing: '0.07em',
          userSelect:    'none',
          animation:     'pl-fade-up 0.5s ease both',
          animationDelay: '0.1s',
          opacity:       0,
          margin:        0,
        }}
      >
        {message}<LoadingDots />
      </p>
    </div>
  )
}
