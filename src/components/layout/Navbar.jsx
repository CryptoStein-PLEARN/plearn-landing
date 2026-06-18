import { useState, useEffect, useCallback } from 'react'
import { NAV_LINKS, CTA } from '@/constants/config'
import { LOGOS } from '@/constants/assets'
import Button from '@/components/ui/Button'
import MobileMenu from './MobileMenu'

/**
 * Navbar — sticky, fixed top navigation.
 *
 * Behaviour:
 *  - Transparent on top of the page
 *  - bg-bg-surface + backdrop-blur after scrolling 20px
 *  - Bottom border appears on scroll
 *  - Mobile: shows logo + hamburger; desktop: logo + links + CTA
 */
export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  // Detect scroll position
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // run once on mount
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openMenu  = useCallback(() => setMenuOpen(true),  [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={[
          'fixed top-0 left-0 right-0 z-40',
          'transition-all duration-300',
          scrolled
            ? 'bg-bg-surface/95 backdrop-blur-md border-b border-white/[0.06]'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            {/* Uses the official PLEARN logo: glossy P-coin above the 3D wordmark.
                Transparent PNG — works on both dark and light backgrounds.
                Source: Assets/UI/PLEARN---Main-Logo.png (1000×1066, RGBA) */}
            <a
              href="/"
              aria-label="PLEARN — home"
              className="flex-shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plearn-purple focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
            >
              <img
                src={LOGOS.main}
                alt="PLEARN"
                className="h-11 w-auto"
              />
            </a>

            {/* ── Desktop links ── */}
            <ul
              className="hidden lg:flex items-center gap-8"
              role="list"
            >
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-rem text-nav font-medium text-text-muted hover:text-text-plearn transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* ── Desktop CTA ── */}
            <div className="hidden lg:flex">
              <Button href={CTA.joinBeta} variant="primary" size="sm">
                Join the Beta
              </Button>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              onClick={openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Open navigation menu"
              className="lg:hidden flex flex-col justify-center gap-[5px] p-2 rounded-lg hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plearn-purple"
            >
              <span className="w-5 h-0.5 bg-text-muted rounded-full block" />
              <span className="w-5 h-0.5 bg-text-muted rounded-full block" />
              <span className="w-3.5 h-0.5 bg-text-muted rounded-full block" />
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  )
}
