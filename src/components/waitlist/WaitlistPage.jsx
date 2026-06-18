// ─────────────────────────────────────────────────────────────────────────────
// WaitlistPage
//
// Standalone page at /waitlist — for direct link access.
// Uses the same WaitlistForm and the same gradient-border panel style as
// the modal and FinalCTASection, so the visual language stays consistent.
//
// After success, the "Continue exploring PLEARN ›" button (inside WaitlistForm)
// calls onClose which navigates home via window.location.href = '/'.
// ─────────────────────────────────────────────────────────────────────────────

import PageBackground from '@/components/layout/PageBackground'
import CoinBackground from '@/components/layout/CoinBackground'
import WaitlistForm   from '@/components/waitlist/WaitlistForm'
import { LOGOS }      from '@/constants/assets'

export default function WaitlistPage() {
  const goHome = () => { window.location.href = '/' }

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>

      {/* ── Shared background atmosphere ── */}
      <PageBackground />
      {/* ── Floating coin atmosphere ── */}
      <CoinBackground variant="waitlist" />

      {/* ── Minimal header ── */}
      <header style={{ position: 'relative', zIndex: 10, padding: '1.25rem 1.5rem' }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <a href="/" aria-label="Back to PLEARN home" style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', textDecoration: 'none' }}>
            <img
              src={LOGOS.main}
              alt="PLEARN logo"
              style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
            />
          </a>

          {/* Back link */}
          <button
            onClick={goHome}
            className="font-rem"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(200,180,240,0.65)', fontSize: '0.84rem',
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              padding: '0.4rem 0.75rem', borderRadius: '8px',
              transition: 'color 0.18s, background 0.18s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#FFFFFF'
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(200,180,240,0.65)'
              e.currentTarget.style.background = 'none'
            }}
          >
            <span aria-hidden="true">←</span>
            <span>Back to PLEARN</span>
          </button>
        </div>
      </header>

      {/* ── Centered page content ── */}
      <main
        id="main-content"
        style={{
          position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          minHeight: 'calc(100vh - 80px)',
          padding: '2rem 1.25rem 4rem',
        }}
      >

        {/* ── Gradient border panel ── */}
        <div style={{
          width: '100%', maxWidth: '516px',
          // Same gradient-border technique as FinalCTASection / WaitlistModal
          padding: '2px', borderRadius: '24px',
          background: 'linear-gradient(135deg, #5B3FE7 0%, #8926E7 20%, #C832FF 40%, #EF00BD 57%, #8926E7 74%, #5077F2 88%, #469EFF 100%)',
          boxShadow:
            '0 0 40px 6px rgba(137,38,231,0.45), ' +
            '0 0 80px 14px rgba(239,0,189,0.18), ' +
            '0 0 140px 24px rgba(87,62,251,0.12), ' +
            '0 24px 60px rgba(0,0,0,0.45)',
        }}>
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

            {/* ── Panel header ── */}
            <div style={{ padding: 'clamp(1.5rem, 4vw, 2.2rem) clamp(1rem, 4vw, 2rem) clamp(1rem, 3vw, 1.4rem)', textAlign: 'center' }}>
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
                <span className="font-rem font-bold uppercase" style={{
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

            {/* ── Form ── */}
            <WaitlistForm onClose={goHome} sourcePage="waitlist-page" />

          </div>
        </div>
      </main>
    </div>
  )
}
