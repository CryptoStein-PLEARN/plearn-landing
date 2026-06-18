// ─────────────────────────────────────────────────────────────────────────────
// PLEARN — Site config
// One file to update email, links, and metadata. Never hardcode these inline.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  name:        'PLEARN',
  tagline:     'Play · Learn · Earn',
  description: 'Gamified financial literacy. Complete missions, make real money choices, earn rewards.',
  url:         'https://plearngame.netlify.app',
}

// ── Contact ──────────────────────────────────────────────────────────────────
export const CONTACT = {
  email:          'info@plearn.io',
  partnerSubject: 'PLEARN Pilot Partnership',
  get partnerHref() {
    return `mailto:${this.email}?subject=${encodeURIComponent(this.partnerSubject)}`
  },
}

// ── CTA links ─────────────────────────────────────────────────────────────────
// joinBeta / joinWaitlist → opens the waitlist modal (intercepted by App.jsx click handler)
// exploreDemo → scrolls to the Gameplay section until a demo URL is available
export const CTA = {
  joinBeta:        '#waitlist',
  exploreDemo:     '#gameplay',   // TODO: replace with demo URL when ready
  previewMissions: '#gameplay',
  joinWaitlist:    '#waitlist',
  get partnerPilot() { return CONTACT.partnerHref },
}

// ── Nav links ─────────────────────────────────────────────────────────────────
// Only include links that go somewhere real. "About" removed until page exists.
export const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Missions',     href: '#gameplay'      },
  { label: 'For Partners', href: '#partners'      },
]

// ── Social ────────────────────────────────────────────────────────────────────
// Leave empty until official social accounts are live.
// The footer social section renders conditionally and will hide when this is [].
export const SOCIAL = [
  { label: 'Instagram', href: 'https://www.instagram.com/officialplearn/' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/officialplearn/' },
  { label: 'TikTok',    href: 'https://www.tiktok.com/@financialliteracy_' },
  { label: 'X',         href: 'https://x.com/OfficialPlearn' },
]

// ── Footer link groups ────────────────────────────────────────────────────────
// Not currently rendered by Footer (Footer uses its own hardcoded link structure).
// Kept here for future use when Footer is migrated to use this config.
export const FOOTER_LINKS = [
  {
    group: 'Product',
    links: [
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Missions',     href: '#gameplay'     },
      { label: 'Rewards',      href: '#rewards'      },
    ],
  },
  {
    group: 'Partners',
    links: [
      { label: 'For Schools',         href: '#partners'                   },
      { label: 'For Banks',           href: '#partners'                   },
      { label: 'For Youth Programs',  href: '#partners'                   },
      { label: 'Partner for a Pilot', href: CONTACT.partnerHref, external: true },
    ],
  },
  {
    group: 'Company',
    links: [
      { label: 'Contact', href: `mailto:${CONTACT.email}`, external: true },
    ],
  },
]

export const BETA = {
  label:     'Currently in Beta',
  backer:    '',
  microcopy: 'Now in active beta',
}
