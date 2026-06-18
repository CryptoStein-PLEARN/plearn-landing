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
// Stage 9  ✓ About page (/about) + multi-page routing foundation
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from 'react'

// ── Waitlist (global — wraps all pages) ───────────────────────────────────────
import { WaitlistProvider, useWaitlist } from '@/context/WaitlistContext'
import WaitlistModal from '@/components/waitlist/WaitlistModal'

// ── Pages ────────────────────────────────────────────────────────────────────
import WaitlistPage  from '@/components/waitlist/WaitlistPage'
import AboutPage     from '@/pages/AboutPage'
import RewardsPage   from '@/pages/RewardsPage'
import MissionsPage  from '@/pages/MissionsPage'

// ── Global background + loader ────────────────────────────────────────────────
import PageBackground from '@/components/layout/PageBackground'
import PageLoader     from '@/components/ui/PageLoader'

// ── Home page sections ────────────────────────────────────────────────────────
import Navbar      from '@/components/layout/Navbar'
import HeroSection from '@/components/sections/HeroSection'

import WhatIsPlearnSection from '@/components/sections/WhatIsPlearnSection'
import HowItWorksSection   from '@/components/sections/HowItWorksSection'

import GameplayPreviewSection from '@/components/sections/GameplayPreviewSection'
import RewardsSection         from '@/components/sections/RewardsSection'

import ProgressJourneySection from '@/components/sections/ProgressJourneySection'
import CredibilitySection     from '@/components/sections/CredibilitySection'
import ForPartnersSection     from '@/components/sections/ForPartnersSection'

import FinalCTASection from '@/components/sections/FinalCTASection'
import Footer          from '@/components/layout/Footer'

// ─────────────────────────────────────────────────────────────────────────────
// WaitlistGate
//
// Sits inside WaitlistProvider. Registers the global click interceptor that
// catches any <a href="#waitlist"> on ANY page, and renders WaitlistModal
// portaled into document.body.
//
// Extracted from LandingPage so it applies globally — About, Waitlist page, etc.
// ─────────────────────────────────────────────────────────────────────────────
function WaitlistGate({ children }) {
  const { openModal } = useWaitlist()

  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest('a[href="#waitlist"]')
      if (!anchor) return
      e.preventDefault()
      openModal(anchor)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [openModal])

  return (
    <>
      {children}
      <WaitlistModal />
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// LandingPage (Home)
// ─────────────────────────────────────────────────────────────────────────────
function LandingPage() {
  const { openModal } = useWaitlist()

  // If user lands directly on /#waitlist, open the modal immediately.
  useEffect(() => {
    if (window.location.hash === '#waitlist') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
      const id = setTimeout(() => openModal(), 100)
      return () => clearTimeout(id)
    }
  }, [openModal])

  return (
    <>
      <PageBackground />

      <a href="#main-content" className="skip-link">Skip to main content</a>

      <header style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
      </header>

      <main id="main-content" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />
        <WhatIsPlearnSection />
        <HowItWorksSection />
        <GameplayPreviewSection />
        <RewardsSection />
        <ProgressJourneySection />
        <CredibilitySection />
        <ForPartnersSection />
        <FinalCTASection />
      </main>

      <Footer />
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// App root — lightweight router
//
// Route table:
//   /           → LandingPage (Home)
//   /about      → AboutPage
//   /rewards    → RewardsPage
//   /waitlist   → WaitlistPage (standalone signup page)
//
// All routes share: WaitlistProvider + WaitlistGate (modal + interceptor)
// Future pages (Marketplace, Contact) follow the same pattern.
//
// No react-router-dom. Routing via window.location.pathname.
// SPA fallback: public/_redirects (Netlify) + vercel.json (Vercel).
// ─────────────────────────────────────────────────────────────────────────────

// Minimum time the loader stays on screen (ms).
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

    // Safeguard: always dismiss after 3 s
    const safeId = setTimeout(() => setLoaderVisible(false), 3000)

    return () => {
      window.removeEventListener('load', dismiss)
      clearTimeout(safeId)
    }
  }, [])

  const path = window.location.pathname

  // Route → page component
  const Page =
    path === '/about'    ? AboutPage    :
    path === '/rewards'  ? RewardsPage  :
    path === '/missions' ? MissionsPage :
    path === '/waitlist' ? WaitlistPage :
                           LandingPage

  return (
    <>
      {/* Loader sits above everything — z-9999 */}
      <PageLoader visible={loaderVisible} />

      {/* WaitlistProvider + global modal interceptor wrap ALL pages */}
      <WaitlistProvider>
        <WaitlistGate>
          <Page />
        </WaitlistGate>
      </WaitlistProvider>
    </>
  )
}
