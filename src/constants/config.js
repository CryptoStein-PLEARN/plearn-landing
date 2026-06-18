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
// Site pages: Home · About · Marketplace · Get in Touch · Waitlist
// Anchor links (#) point to Home page sections.
// Page links (/about etc.) activate once each page is built.
export const NAV_LINKS = [
  // Home-page anchor links — prefixed with / so they navigate correctly from other pages
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Missions',     href: '/#gameplay'      },
  { label: 'For Partners', href: '/#partners'      },
  // Page links — activate as each page is built
  { label: 'About',        href: '/about'          },
  // { label: 'Marketplace', href: '/marketplace' },
  // { label: 'Contact',     href: '/contact'     },
]

// ── Pages (full route list for router + footer) ────────────────────────────────
// status: 'live' | 'building' | 'planned'
export const PAGES = [
  { label: 'Home',              href: '/',            status: 'live'     },
  { label: 'About',             href: '/about',       status: 'building' },
  { label: 'Marketplace',       href: '/marketplace', status: 'planned'  },
  { label: 'Get in Touch',      href: '/contact',     status: 'planned'  },
  { label: 'Join the Waitlist', href: '/waitlist',    status: 'live'     },
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
// No Tokenomics — removed from site map entirely.
export const FOOTER_LINKS = [
  {
    group: 'Product',
    links: [
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Missions',     href: '#gameplay'     },
      { label: 'Rewards',      href: '#rewards'      },
      { label: 'Marketplace',  href: '/marketplace'  },   // activate when page is live
    ],
  },
  {
    group: 'Company',
    links: [
      { label: 'About',         href: '/about'                              },  // activate when live
      { label: 'For Partners',  href: '#partners'                           },
      { label: 'Get in Touch',  href: '/contact'                            },  // activate when live
      { label: 'Partner Email', href: CONTACT.partnerHref, external: true   },
    ],
  },
  {
    group: 'Join',
    links: [
      { label: 'Join the Waitlist', href: '/waitlist'                           },
      { label: 'Contact Us',        href: `mailto:${CONTACT.email}`, external: true },
    ],
  },
]

export const BETA = {
  label:     'Currently in Beta',
  backer:    '',
  microcopy: 'Now in active beta',
}
