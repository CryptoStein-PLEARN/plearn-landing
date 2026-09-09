import { LOGOS, COINS } from '@/constants/assets'
import { CONTACT, CTA, SOCIAL, BETA } from '@/constants/config'
import { FOOTER } from '@/constants/copy'

/**
 * Footer — redesigned to match reference image.
 *
 * Structure:
 *  1. Main panel — large rounded neon-bordered container, 4-column grid
 *  2. Bottom bar — separate smaller rounded container for legal/policy
 *
 * Col 1: Logo + tagline ("next generation." gradient) + description + EIT line
 * Col 2: Icon badge + NAVIGATE + underline + links + "Join the Beta →" button
 * Col 3: Icon badge + EXPLORE + underline + links
 * Col 4: Icon badge + GET IN TOUCH + underline + email + FOLLOW US + socials
 */

// ── Column icon badges ─────────────────────────────────────────────────────
function IconBadge({ children }) {
  return (
    <div style={{
      width: '44px', height: '44px', borderRadius: '10px', flexShrink: 0,
      background: 'rgba(137,38,231,0.12)',
      border: '1.5px solid rgba(137,38,231,0.45)',
      boxShadow: '0 0 14px rgba(137,38,231,0.20)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {children}
    </div>
  )
}

function NavIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="rgba(180,100,255,0.85)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  )
}

function ExploreIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="rgba(180,100,255,0.85)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <rect x="2" y="6" width="20" height="12" rx="3" />
      <circle cx="7.5" cy="12" r="1.5" fill="rgba(180,100,255,0.85)" stroke="none" />
      <line x1="11" y1="9" x2="11" y2="15" />
      <line x1="14" y1="10" x2="14" y2="14" />
      <line x1="17" y1="9" x2="17" y2="15" />
    </svg>
  )
}

function ContactIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="rgba(180,100,255,0.85)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2,4 12,13 22,4" />
    </svg>
  )
}

// ── Column heading (icon badge + title + neon accent line) ─────────────────
function ColHeading({ icon, title }) {
  return (
    <div className="flex flex-col gap-3" style={{ marginBottom: '1.6rem' }}>
      <IconBadge>{icon}</IconBadge>
      <span
        className="font-rem font-bold uppercase tracking-widest text-white"
        style={{ fontSize: '0.68rem', letterSpacing: '0.18em' }}
      >
        {title}
      </span>
      {/* Neon accent underline */}
      <div style={{
        width: '2.4rem', height: '1.5px',
        background: 'linear-gradient(90deg, rgba(137,38,231,0.90), rgba(70,158,255,0.60))',
        boxShadow: '0 0 8px rgba(137,38,231,0.45)',
        borderRadius: '9999px',
      }} />
    </div>
  )
}

// ── Footer nav link ────────────────────────────────────────────────────────
function FLink({ href = '#', children, external = false }) {
  const isExt = external || (href && (href.startsWith('http') || href.startsWith('mailto:')))
  return (
    <a
      href={href}
      className="font-rem transition-colors duration-200"
      style={{ fontSize: '0.88rem', color: 'rgba(180,160,220,0.72)', lineHeight: '1.4', display: 'block' }}
      {...(isExt ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
      onMouseLeave={e => e.currentTarget.style.color = 'rgba(180,160,220,0.72)'}
    >
      {children}
    </a>
  )
}

// ── 4-pointed sparkle ─────────────────────────────────────────────────────
function Sparkle({ size = 14, color = 'rgba(200,140,255,0.95)', style: extraStyle = {} }) {
  return (
    <div aria-hidden="true" className="pointer-events-none" style={{
      width: size, height: size, position: 'relative', flexShrink: 0, ...extraStyle,
    }}>
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '2px', height: '100%', borderRadius: '1px',
        background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
        boxShadow: `0 0 6px ${color}`,
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)',
        height: '2px', width: '100%', borderRadius: '1px',
        background: `linear-gradient(to right, transparent, ${color}, transparent)`,
        boxShadow: `0 0 6px ${color}`,
      }} />
    </div>
  )
}

// ── Social icons ───────────────────────────────────────────────────────────
function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}
function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <line x1="8" y1="11" x2="8" y2="17" />
      <line x1="8" y1="8" x2="8" y2="8.5" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M12 17 V13 C12 11.9 12.9 11 14 11 C15.1 11 16 11.9 16 13 V17" />
      <line x1="12" y1="11" x2="12" y2="17" />
    </svg>
  )
}
function IconTikTok() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.6 5.4A4.6 4.6 0 0 1 15 .8V5h-2.8v9.6a2.6 2.6 0 1 1-2.6-2.6c.23 0 .46.03.68.08V9.2A6.4 6.4 0 1 0 16 15.4V9.9A9.4 9.4 0 0 0 21.3 11V7.6a7 7 0 0 1-1.7-.2z" opacity="0.90"/>
    </svg>
  )
}
function IconX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.24 3h3.28l-7.17 8.2L22.8 21h-6.6l-5.18-6.77L4.64 21H1.35l7.67-8.77L1.2 3h6.77l4.67 6.12L18.24 3Zm-1.15 16.2h1.82L6.99 4.86H5.05l12.04 14.34Z" opacity="0.90"/>
    </svg>
  )
}

const SOCIAL_ICON_MAP = {
  Instagram: IconInstagram,
  LinkedIn:  IconLinkedIn,
  TikTok:    IconTikTok,
  X:         IconX,
}

// ── Component ──────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer
      id="footer"
      aria-label="Site footer"
      className="relative"
      style={{ padding: '0 1.25rem 2.5rem', background: 'transparent' }}
    >
      {/* ── Floating coin watermarks ──────────────────────────────────── */}
      <img src={COINS.purpleStyled} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden sm:block"
        style={{ width: '420px', height: '420px', left: '-40px', top: '18%',
          objectFit: 'contain', opacity: 0.11,
          filter: 'blur(1.5px) drop-shadow(0 0 20px rgba(137,38,231,0.45))',
          animationDelay: '0.6s', animationDuration: '8s', zIndex: 0 }} />
      <img src={COINS.blue} alt="" aria-hidden="true" loading="lazy"
        className="pointer-events-none select-none absolute animate-float hidden sm:block"
        style={{ width: '380px', height: '380px', right: '-40px', bottom: '12%',
          objectFit: 'contain', opacity: 0.09,
          filter: 'blur(2px) drop-shadow(0 0 16px rgba(70,158,255,0.38))',
          animationDelay: '3.2s', animationDuration: '9.5s', zIndex: 0 }} />

      {/* ── Main footer panel ─────────────────────────────────────────── */}
      <div className="relative z-10" style={{ maxWidth: '1280px', margin: '0 auto' }}>

        <div style={{
          borderRadius: '20px',
          border: '1.5px solid rgba(137,38,231,0.48)',
          boxShadow:
            '0 0 0 1px rgba(87,62,251,0.10), ' +
            '0 0 32px 5px rgba(137,38,231,0.28), ' +
            '0 0 80px 14px rgba(87,62,251,0.14), ' +
            'inset 0 0 60px rgba(137,38,231,0.05)',
          background: 'linear-gradient(160deg, rgba(14,8,36,0.97) 0%, rgba(8,5,22,0.98) 55%, rgba(6,3,20,0.98) 100%)',
          position: 'relative', overflow: 'hidden',
        }}>

          {/* Internal ambient blobs */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 55% 45% at 12% 82%, rgba(239,0,189,0.07) 0%, transparent 65%)' }} />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 50% 42% at 88% 18%, rgba(87,62,251,0.09) 0%, transparent 65%)' }} />

          {/* Bottom edge glow line */}
          <div aria-hidden="true" className="pointer-events-none absolute"
            style={{ bottom: 0, left: '5%', right: '5%', height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(137,38,231,0.60) 35%, rgba(70,158,255,0.50) 65%, transparent)',
              boxShadow: '0 0 14px 2px rgba(137,38,231,0.35)' }} />

          {/* 4-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1.1fr_1.1fr_1.2fr] gap-6 sm:gap-8 lg:gap-6 p-6 sm:p-8 lg:p-12">

            {/* ── Col 1: Brand ────────────────────────────────────────── */}
            <div className="flex flex-col gap-5">
              <a href="/" aria-label="PLEARN home">
                <img
                  src={LOGOS.main}
                  alt="PLEARN"
                  loading="lazy"
                  style={{ height: '60px', width: 'auto', objectFit: 'contain', objectPosition: 'left' }}
                />
              </a>

              <p className="font-rem font-semibold leading-snug" style={{ fontSize: '1.05rem', maxWidth: '290px' }}>
                <span style={{ color: '#FFFFFF' }}>Gamified financial literacy{' '}</span>
                <br />
                <span style={{ color: '#FFFFFF' }}>for the </span>
                <span style={{
                  background: 'linear-gradient(90deg, #C832FF 0%, #8926E7 40%, #5077F2 78%, #469EFF 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>next generation.</span>
              </p>

              <p className="font-rem leading-relaxed"
                style={{ fontSize: '0.83rem', color: 'rgba(180,160,220,0.62)', maxWidth: '290px' }}>
                PLEARN is a gamified financial literacy experience helping young people build real-world money skills through missions, choices, and rewards.
              </p>


            </div>

            {/* ── Col 2: Navigate ─────────────────────────────────────── */}
            <div className="flex flex-col">
              <ColHeading icon={<NavIcon />} title="Navigate" />

              <nav aria-label="Footer navigation" className="flex flex-col gap-3.5 flex-1">
                <FLink href="#how-it-works">How It Works</FLink>
                <FLink href="#gameplay">Missions</FLink>
                <FLink href="#partners">For Partners</FLink>
              </nav>

              {/* Join the Beta CTA button */}
              <div className="mt-8" style={{ position: 'relative', display: 'inline-block' }}>
                {/* Sparkle accent */}
                <Sparkle
                  size={16}
                  color="rgba(200,140,255,0.95)"
                  style={{ position: 'absolute', top: '-14px', right: '-4px', zIndex: 2 }}
                />
                <a
                  href={CTA.joinBeta}
                  className="font-rem font-semibold inline-flex items-center gap-2 transition-all duration-200"
                  style={{
                    fontSize: '0.88rem',
                    padding: '0.78rem 1.55rem',
                    borderRadius: '9px',
                    border: '1.5px solid rgba(137,38,231,0.65)',
                    color: '#FFFFFF',
                    background: 'rgba(137,38,231,0.08)',
                    boxShadow: '0 0 20px rgba(137,38,231,0.22), inset 0 0 10px rgba(137,38,231,0.06)',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(137,38,231,0.20)'
                    e.currentTarget.style.borderColor = 'rgba(180,80,255,0.85)'
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(137,38,231,0.45), inset 0 0 16px rgba(137,38,231,0.10)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(137,38,231,0.08)'
                    e.currentTarget.style.borderColor = 'rgba(137,38,231,0.65)'
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(137,38,231,0.22), inset 0 0 10px rgba(137,38,231,0.06)'
                  }}
                >
                  Join the Beta
                  <span aria-hidden="true" style={{ fontSize: '1rem', lineHeight: 1 }}>→</span>
                </a>
              </div>
            </div>

            {/* ── Col 3: Explore ──────────────────────────────────────── */}
            <div className="flex flex-col">
              <ColHeading icon={<ExploreIcon />} title="Explore" />

              <div className="flex flex-col gap-3.5">
                <FLink href="#what-is-plearn">What Is PLEARN?</FLink>
                <FLink href="#gameplay">Gameplay Preview</FLink>
                <FLink href="#rewards">Rewards</FLink>
                <FLink href="#progress">Your Journey</FLink>
                <FLink href="#partners">Schools &amp; Partners</FLink>
              </div>
            </div>

            {/* ── Col 4: Get in Touch ─────────────────────────────────── */}
            <div className="flex flex-col">
              <ColHeading icon={<ContactIcon />} title="Get in Touch" />

              <a
                href={`mailto:${CONTACT.email}`}
                className="font-rem transition-colors duration-200"
                style={{ fontSize: '0.87rem', color: 'rgba(180,160,220,0.78)', marginBottom: '1.25rem', display: 'block' }}
                onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(180,160,220,0.78)'}
              >
                {CONTACT.email}
              </a>

              {/* Social icon squares — only shown when SOCIAL accounts are live */}
              {SOCIAL.length > 0 && (
                <>
                  <div style={{
                    height: '1px', marginBottom: '1.25rem',
                    background: 'linear-gradient(90deg, rgba(137,38,231,0.32), rgba(255,255,255,0.05) 75%, transparent)',
                  }} />
                  <p className="font-rem font-bold uppercase"
                    style={{ fontSize: '0.65rem', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.82)', marginBottom: '0.85rem' }}>
                    Follow us
                  </p>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {SOCIAL.map(({ label, href }) => {
                      const Icon = SOCIAL_ICON_MAP[label]
                      if (!Icon) return null
                      return (
                        <a
                          key={label}
                          href={href}
                          aria-label={label}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center transition-all duration-200"
                          style={{
                            width: '40px', height: '40px', borderRadius: '9px',
                            background: 'rgba(137,38,231,0.09)',
                            border: '1.5px solid rgba(137,38,231,0.40)',
                            boxShadow: '0 0 10px rgba(137,38,231,0.10)',
                            color: 'rgba(180,140,230,0.78)',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(137,38,231,0.22)'
                            e.currentTarget.style.borderColor = 'rgba(180,80,255,0.75)'
                            e.currentTarget.style.boxShadow = '0 0 18px rgba(137,38,231,0.38)'
                            e.currentTarget.style.color = '#FFFFFF'
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(137,38,231,0.09)'
                            e.currentTarget.style.borderColor = 'rgba(137,38,231,0.40)'
                            e.currentTarget.style.boxShadow = '0 0 10px rgba(137,38,231,0.10)'
                            e.currentTarget.style.color = 'rgba(180,140,230,0.78)'
                          }}
                        >
                          <Icon />
                        </a>
                      )
                    })}
                  </div>
                </>
              )}
            </div>

          </div>
        </div>

        {/* ── Bottom legal bar ──────────────────────────────────────────── */}
        <div style={{
          marginTop: '0.65rem',
          borderRadius: '14px',
          border: '1px solid rgba(137,38,231,0.20)',
          background: 'rgba(8,4,22,0.88)',
          padding: '1.1rem 2rem',
        }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

            {/* Copyright + disclaimer */}
            <div className="flex flex-col gap-1">
              <p className="font-rem" style={{ fontSize: '0.82rem', color: 'rgba(200,180,240,0.78)' }}>
                © 2026{' '}
                <span style={{
                  background: 'linear-gradient(90deg, #C832FF, #8926E7)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  fontWeight: 700,
                }}>PLEARN</span>
                . All rights reserved.
              </p>
              <p className="font-rem" style={{ fontSize: '0.71rem', color: 'rgba(160,140,200,0.48)', maxWidth: '520px' }}>
                {FOOTER.disclaimer}
              </p>
            </div>

            {/* Legal links */}
            <p className="font-rem flex-shrink-0"
              style={{ fontSize: '0.74rem', color: 'rgba(160,140,200,0.40)', whiteSpace: 'nowrap' }}>
              <a href="/privacy-policy" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Privacy Policy</a>
              {' · '}Terms · Cookies — coming soon
            </p>

          </div>
        </div>

      </div>
    </footer>
  )
}
