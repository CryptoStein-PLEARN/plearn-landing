// ─────────────────────────────────────────────────────────────────────────────
// PLEARN — Asset paths
// All files live in public/assets/ — served at these URL paths by Vite.
// Rename a file? Update only here; nothing else needs to change.
//
// WebP versions are used for all images — browsers that don't support WebP
// (IE11, very old Safari) receive nothing, but PLEARN's target audience
// (Gen Z, modern browsers) is 100% WebP-capable.
// ─────────────────────────────────────────────────────────────────────────────

export const LOGOS = {
  // Full logo: glossy P-coin above PLEARN 3D wordmark. Transparent bg. RGBA.
  // Source: Assets/UI/PLEARN---Main-Logo.png
  main: '/assets/logos/plearn-main-logo.webp',

  // Wordmark only: PLEARN 3D text, no coin. Transparent bg. RGBA.
  // Source: Assets/UI/Module1UI/home screen/PLEARN---Logotype resized.png
  logotype: '/assets/logos/plearn-logotype.webp',

  // Placeholder paths — add files to public/assets/logos/ when available
  badgeStamp:          '/assets/logos/badge-stamp.png',
  arrowBadgePurple:    '/assets/logos/arrow-badge-purple.png',
  arrowBadgePink:      '/assets/logos/arrow-badge-pink.png',
  playLearnEarnStack:  '/assets/logos/play-learn-earn-stack.png',
}

export const COINS = {
  // ── All confirmed — copied from Logo/ALL PLEARN ASSETS copy/PLEARN Graphics/
  // Flat purple P-coin (simpler linework). Source: Assets/UI/PLEARN---Coin-Monogram---FLAT.png
  purple:        '/assets/logos/pcoin-purple.webp',

  // Styled P-coin series (COIN_01–05) — matching comic art style, RGBA, transparent bg
  orange:        '/assets/logos/pcoin-orange.webp',        // COIN_01 — challenge missions
  green:         '/assets/logos/pcoin-green.webp',         // COIN_02 — savings goals
  blue:          '/assets/logos/pcoin-blue.webp',          // COIN_03 — knowledge quests
  purpleStyled:  '/assets/logos/pcoin-purple-styled.webp', // COIN_04 — purple styled variant
  magenta:       '/assets/logos/pcoin-magenta.webp',       // COIN_05 — streak bonuses

  // Aliases matching original design system names
  get indigo()  { return this.blue },
}

export const CHARACTERS = {
  // Source: Assets/UI/Character2DImgs/Alex.png
  alex: '/assets/characters/alex.webp',
}

export const MOCKUPS = {
  // ⚠ Legacy frame assets — not used in current Hero
  phone:  '/assets/mockups/phone-mockup.png',
  laptop: '/assets/mockups/laptop-mockup.png',

  // ── Hero visual ──────────────────────────────────────────────────────────
  // Full right-side hero composition: laptop + mobile + game map + coins + rewards.
  // Drop your finished image at: public/assets/mockups/hero-game-preview.png
  // WebP version is served — 102KB vs 2.2MB original PNG.
  heroGamePreview: '/assets/mockups/hero-game-preview.webp',
}

// ⚠ Add EIT Digital logo file to public/assets/logos/ and update path below.
export const PARTNER_LOGOS = {
  eitDigital: '/assets/logos/eit-digital-logo.png',
}
