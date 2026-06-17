// ─────────────────────────────────────────────────────────────────────────────
// PLEARN — Site config
// One file to update email, links, and metadata. Never hardcode these inline.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  name:        'PLEARN',
  tagline:     'Play · Learn · Earn',
  description: 'Gamified financial literacy. Complete missions, make real money choices, earn rewards.',
  url:         'https://plearngame.com',
}

// ── Contact ──────────────────────────────────────────────────────────────────
// Q3: mailto for now — swap href value here to point to a form URL later.
export const CONTACT = {
  email:          'hello@plearngame.com',
  partnerSubject: 'PLEARN Pilot Partnership',
  get partnerHref() {
    return `mailto:${this.email}?subject=${encodeURIComponent(this.partnerSubject)}`
  },
}

// ── CTA links ─────────────────────────────────────────────────────────────────
// Q2: Waitlist is front-end only. '#waitlist' scrolls to FinalCTA section.
export const CTA = {
  joinBeta:        '#waitlist',
  exploreDemo:     '#',          // replace with demo URL when ready
  previewMissions: '#gameplay',
  joinWaitlist:    '#waitlist',
  get partnerPilot() { return CONTACT.partnerHref },
}

// ── Nav links ─────────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Missions',     href: '#gameplay'      },
  { label: 'For Partners', href: '#partners'      },
  { label: 'About',        href: '#'              },
]

// ── Social ────────────────────────────────────────────────────────────────────
export const SOCIAL = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn',  href: '#' },
  { label: 'TikTok',    href: '#' },
  { label: 'X',         href: '#' },
]

// ── Footer link groups ────────────────────────────────────────────────────────
export const FOOTER_LINKS = [
  {
    group: 'Product',
    links: [
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Missions',     href: '#gameplay'     },
      { label: 'Rewards',      href: '#rewards'      },
      { label: 'The Game',     href: '#'             },
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
      { label: 'About',   href: '#'                                       },
      { label: 'Careers', href: '#'                                       },
      { label: 'Press',   href: '#'                                       },
      { label: 'Contact', href: `mailto:${CONTACT.email}`, external: true },
    ],
  },
  {
    group: 'Legal',
    links: [
      { label: 'Privacy Policy',   href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy',    href: '#' },
    ],
  },
]

export const BETA = {
  label:     'Currently in Beta',
  backer:    'Built with support from EIT Digital',
  microcopy: 'Built with support from EIT Digital · Now in active beta',
}
