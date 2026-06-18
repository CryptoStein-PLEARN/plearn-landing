import { useEffect, useRef } from 'react'
import { NAV_LINKS, CTA } from '@/constants/config'
import { LOGOS } from '@/constants/assets'
import Button from '@/components/ui/Button'

/**
 * MobileMenu — full-screen overlay nav for mobile.
 * Opens when hamburger is pressed.
 * Closes on: close button, Escape key, CTA click, nav link click.
 */
export default function MobileMenu({ open, onClose }) {
  const closeBtnRef = useRef(null)

  // Focus the close button when the menu opens
  useEffect(() => {
    if (open && closeBtnRef.current) closeBtnRef.current.focus()
  }, [open])

  // Close on Escape key
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-label="Navigation menu"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-bg-base flex flex-col lg:hidden"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-white/[0.06] flex-shrink-0">
        <a href="/" onClick={onClose} className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plearn-purple">
          <img
            src={LOGOS.main}
            alt="PLEARN"
            className="h-11 w-auto"
          />
        </a>

        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close navigation menu"
          className="p-2 rounded-lg text-text-muted hover:text-text-plearn hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plearn-purple"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 flex flex-col justify-center px-5" aria-label="Mobile navigation">
        <ul className="flex flex-col gap-1" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={onClose}
                className="flex items-center h-14 font-karantina text-2xl text-text-muted hover:text-text-plearn transition-colors duration-150"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom CTA */}
      <div className="px-5 pb-10 pt-4 border-t border-white/[0.06] flex-shrink-0">
        <Button
          href={CTA.joinBeta}
          variant="primary"
          className="w-full justify-center text-base py-4"
          onClick={onClose}
        >
          Join the Beta
        </Button>
        <p className="font-rem text-caption text-text-dim text-center mt-3">
          Now in active beta
        </p>
      </div>
    </div>
  )
}
