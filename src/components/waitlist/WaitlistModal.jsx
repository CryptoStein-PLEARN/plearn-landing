// ─────────────────────────────────────────────────────────────────────────────
// WaitlistModal
//
// Full-screen dialog overlay. Rendered via React portal directly into
// document.body to avoid z-index stacking context issues.
//
// Accessibility:
//  • role="dialog" + aria-modal="true" + aria-label
//  • Focus trap (Tab / Shift+Tab cycles within the dialog)
//  • Escape key closes
//  • Body scroll locked while open
//  • Close button is first focusable element → receives focus on open
//  • Focus returns to the triggering element on close (via WaitlistContext)
// ─────────────────────────────────────────────────────────────────────────────

import { createPortal }   from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import { useWaitlist }    from '@/context/WaitlistContext'
import WaitlistForm       from '@/components/waitlist/WaitlistForm'

// ── Focus trap ────────────────────────────────────────────────────────────────
const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

function useFocusTrap(containerRef, active) {
  useEffect(() => {
    if (!active || !containerRef.current) return
    const handleTab = (e) => {
      if (e.key !== 'Tab') return
      const items = [...containerRef.current.querySelectorAll(FOCUSABLE)]
        .filter(el => el.offsetParent !== null)   // skip hidden
      if (!items.length) return
      const first = items[0]
      const last  = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [containerRef, active])
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function WaitlistModal() {
  const { isOpen, closeModal } = useWaitlist()
  const dialogRef  = useRef(null)
  const closeBtnRef = useRef(null)
  const [showHeader, setShowHeader] = useState(true)  // hidden after success

  useFocusTrap(dialogRef, isOpen)

  // Escape key
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => { if (e.key === 'Escape') closeModal() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, closeModal])

  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [isOpen])

  // Focus close button when modal opens; reset header when it re-opens
  useEffect(() => {
    if (isOpen) {
      setShowHeader(true)
      requestAnimationFrame(() => closeBtnRef.current?.focus())
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, overflowY: 'auto' }}>

      {/* ── Backdrop (visual only — blur + dark tint) ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(3,0,12,0.80)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      />

      {/* ── Centering wrapper — click outside dialog closes modal ── */}
      <div
        onClick={closeModal}
        style={{
          minHeight: '100%', display: 'flex',
          alignItems: 'flex-start', justifyContent: 'center',
          padding: 'clamp(1rem, 5vh, 3rem) 1.25rem clamp(1rem, 3vh, 2rem)',
        }}
      >

        {/* ── Dialog panel — stop propagation so clicks inside don't close ── */}
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Join the PLEARN beta waitlist"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative', width: '100%', maxWidth: '516px', zIndex: 1,
            // Gradient border wrapper (same technique as FinalCTASection)
            padding: '2px', borderRadius: '24px',
            background: 'linear-gradient(135deg, #5B3FE7 0%, #8926E7 20%, #C832FF 40%, #EF00BD 57%, #8926E7 74%, #5077F2 88%, #469EFF 100%)',
            boxShadow:
              '0 0 40px 6px rgba(137,38,231,0.55), ' +
              '0 0 80px 14px rgba(239,0,189,0.22), ' +
              '0 0 140px 24px rgba(87,62,251,0.16), ' +
              '0 24px 60px rgba(0,0,0,0.55)',
          }}
        >

          {/* ── Inner dark panel ── */}
          <div style={{
            borderRadius: '22px', overflow: 'hidden', position: 'relative',
            background:
              'radial-gradient(ellipse 110% 65% at 50% 0%, rgba(137,38,231,0.26) 0%, rgba(12,6,30,0.99) 50%, rgba(8,4,22,1) 100%)',
          }}>

            {/* Top inner glow */}
            <div aria-hidden="true" style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '130px', pointerEvents: 'none',
              background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(137,38,231,0.20) 0%, transparent 70%)',
            }} />

            {/* ── Close button (always top-right) ── */}
            <div style={{ position: 'absolute', top: '0.95rem', right: '0.95rem', zIndex: 10 }}>
              <button
                ref={closeBtnRef}
                onClick={closeModal}
                aria-label="Close waitlist form"
                className="font-rem"
                style={{
                  width: '34px', height: '34px', borderRadius: '8px', border: 'none',
                  background: 'rgba(255,255,255,0.07)',
                  color: 'rgba(200,180,240,0.65)',
                  cursor: 'pointer', fontSize: '1rem', lineHeight: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.18s, color 0.18s',
                  outline: 'none',
                }}
                onFocus={e  => { e.currentTarget.style.boxShadow = '0 0 0 2px rgba(137,38,231,0.70)' }}
                onBlur={e   => { e.currentTarget.style.boxShadow = 'none' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.14)'
                  e.currentTarget.style.color = '#FFFFFF'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.color = 'rgba(200,180,240,0.65)'
                }}
              >
                ✕
              </button>
            </div>

            {/* ── Modal header (hidden once success state shows) ── */}
            {showHeader && (
              <>
                <div style={{ padding: 'clamp(1.5rem, 4vw, 2.2rem) clamp(1rem, 4vw, 2rem) clamp(1rem, 3vw, 1.4rem)', textAlign: 'center', paddingRight: '3rem' }}>
                  {/* Beta label */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    marginBottom: '0.85rem',
                  }}>
                    <div style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: 'rgba(180,100,255,0.90)',
                      boxShadow: '0 0 8px rgba(180,100,255,0.80)',
                    }} />
                    <span className="font-rem font-bold uppercase tracking-widest" style={{
                      fontSize: '0.68rem', letterSpacing: '0.20em', color: 'rgba(200,160,255,0.85)',
                    }}>
                      Beta Access
                    </span>
                  </div>

                  {/* Title */}
                  <p className="font-karantina" style={{
                    fontSize: 'clamp(1.85rem, 5vw, 2.5rem)',
                    fontStyle: 'italic', lineHeight: 1.05, marginBottom: '0.55rem',
                  }}>
                    <span style={{ color: '#FFFFFF' }}>Join the </span>
                    <span style={{
                      background: 'linear-gradient(90deg, #EF00BD 0%, #C832FF 40%, #8926E7 70%, #5077F2 100%)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>
                      waitlist.
                    </span>
                  </p>

                  <p className="font-rem" style={{
                    fontSize: '0.86rem', color: 'rgba(200,185,230,0.65)', lineHeight: 1.6,
                  }}>
                    Be among the first to play PLEARN and earn real rewards.
                  </p>
                </div>

                {/* Divider */}
                <div style={{
                  height: '1px', margin: '0 2rem 0.2rem',
                  background: 'linear-gradient(90deg, transparent, rgba(137,38,231,0.35) 35%, rgba(70,158,255,0.25) 65%, transparent)',
                }} />
              </>
            )}

            {/* ── Form (renders success state internally when submitted) ── */}
            <WaitlistForm
              onClose={closeModal}
              onSuccess={() => setShowHeader(false)}
              sourcePage="modal"
            />

          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
