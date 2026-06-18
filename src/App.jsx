// ─────────────────────────────────────────────────────────────────────────────
// PLEARN — App root
//
// Stage 1  — Scaffold + design tokens
// Stage 2  ✓ Navbar + HeroSection
// Stage 3  ✓ WhatIsPlearnSection + HowItWorksSection
// Stage 4  ✓ GameplayPreviewSection + RewardsSection
// Stage 5  ✓ ProgressJourneySection + CredibilitySection + ForPartnersSection
// Stage 6  ✓ FinalCTASection + Footer
// Stage 7  ✓ Beta / Waitlist flow (modal + /waitlist page)
// Stage 8  ✓ PageLoader — initial load + page transition support
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from 'react'

// ── Waitlist ─────────────────────────────────────────────────────────────────
import { WaitlistProvider, useWaitlist } from '@/context/WaitlistContext'
import WaitlistModal  from '@/components/waitlist/WaitlistModal'
import WaitlistPage   from '@/components/waitlist/WaitlistPage'

// ── Global background ────────────────────────────────────────────────────────
import PageBackground from '@/components/layout/PageBackground'

// ── Page loader ───────────────────────────────────────────────────────────────
import PageLoader from '@/components/ui/PageLoader'

// ── Stage 2 ✓ ───────────────────────────────────────────────────────────────
import Navbar      from '@/components/layout/Navbar'
import HeroSection from '@/components/sections/HeroSection'

// ── Stage 3 ✓ ───────────────────────────────────────────────────────────────
import WhatIsPlearnSection from '@/components/sections/WhatIsPlearnSection'
import HowItWorksSection   from '@/components/sections/HowItWorksSection'

// ── Stage 4 ✓ ───────────────────────────────────────────────────────────────
import GameplayPreviewSection from '@/components/sections/GameplayPreviewSection'
import RewardsSection         from '@/components/sections/RewardsSection'

// ── Stage 5 ✓ ───────────────────────────────────────────────────────────────
import ProgressJourneySection from '@/components/sections/ProgressJourneySection'
import CredibilitySection     from '@/components/sections/CredibilitySection'
import ForPartnersSection     from '@/components/sections/ForPartnersSection'

// ── Stage 6 ✓ ───────────────────────────────────────────────────────────────
import FinalCTASection from '@/components/sections/FinalCTASection'
import Footer          from '@/components/layout/Footer'

// ─────────────────────────────────────────────────────────────────────────────
// LandingPage
//
// Extracted so WaitlistProvider wraps it (for useWaitlist access).
// Registers a single global click interceptor that catches any
// <a href="#waitlist"> anywhere on the page — without modifying any
// existing component.
// ─────────────────────────────────────────────────────────────────────────────
function LandingPage() {
  const { openModal } = useWaitlist()

  useEffect(() => {
    // Global click interceptor — catches every "Join the Beta" anchor
    // regardless of which component renders it, now or in the future.
    const handleClick = (e) => {
      const anchor = e.target.closest('a[href="#waitlist"]')
      if (!anchor) return
      e.preventDefault()
      openModal(anchor)   // store trigger element for focus return
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [openModal])

  // If user lands directly on /#waitlist, open the modal immediately.
  // Also clears the hash so the browser doesn't scroll to id="waitlist" on
  // FinalCTASection at the same time as the modal opens.
  useEffect(() => {
    if (window.location.hash === '#waitlist') {
      // Replace hash in history without triggering a scroll
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
      const id = setTimeout(() => openModal(), 100)
      return () => clearTimeout(id)
    }
  }, [openModal])

  return (
    <>
      {/* ── Shared page atmosphere (fixed, behind everything) ── */}
      <PageBackground />

      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* ── Navigation ── */}
      <header style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
      </header>

      {/* ── Main content ── */}
      <main id="main-content" style={{ position: 'relative', zIndex: 1 }}>

        {/* Stage 2 ✓ */}
        <HeroSection />

        {/* Stage 3 ✓ */}
        <WhatIsPlearnSection />
        <HowItWorksSection />

        {/* Stage 4 ✓ */}
        <GameplayPreviewSection />
        <RewardsSection />

        {/* Stage 5 ✓ */}
        <ProgressJourneySection />
        <CredibilitySection />
        <ForPartnersSection />

        {/* Stage 6 ✓ */}
        <FinalCTASection />

      </main>

      {/* ── Footer ── */}
      <Footer />

      {/* ── Waitlist modal (portaled into document.body) ── */}
      <WaitlistModal />
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// App root — lightweight router
//
// No react-router-dom. Routing is handled by checking window.location.pathname.
// Vite's SPA fallback (appType: 'spa') covers dev server.
// public/_redirects covers Netlify production deployment.
//
// PageLoader lifecycle:
//   1. Mounts visible (covers any flash of unstyled content)
//   2. Waits for the later of: window 'load' event OR MIN_DISPLAY_MS
//   3. Fades out smoothly; the component unmounts after the CSS transition
// ─────────────────────────────────────────────────────────────────────────────

// Minimum time the loader stays on screen (ms).
// Long enough to feel intentional; short enough to not annoy.
const MIN_DISPLAY_MS = 700

export default function App() {
  const [loaderVisible, setLoaderVisible] = useState(true)

  useEffect(() => {
    const t0 = Date.now()

    const dismiss = () => {
      const elapsed   = Date.now() - t0
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed)
      setTimeout(() => setLoaderVisible(false), remaining)
    }

    if (document.readyState === 'complete') {
      dismiss()
    } else {
      window.addEventListener('load', dismiss, { once: true })
    }

    // Safeguard: always dismiss after 3 s even if 'load' never fires
    const safeId = setTimeout(() => setLoaderVisible(false), 3000)

    return () => {
      window.removeEventListener('load', dismiss)
      clearTimeout(safeId)
    }
  }, [])

  const isWaitlistPage = window.location.pathname === '/waitlist'

  return (
    <>
      {/* Loader renders above every route — z-9999 */}
      <PageLoader visible={loaderVisible} />

      {isWaitlistPage
        ? <WaitlistPage />
        : (
          <WaitlistProvider>
            <LandingPage />
          </WaitlistProvider>
        )
      }
    </>
  )
}
