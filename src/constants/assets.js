// ─────────────────────────────────────────────────────────────────────────────
// PLEARN — Asset paths
// All files live in public/assets/ — served at these URL paths by Vite.
// Rename a file? Update only here; nothing else needs to change.
// ─────────────────────────────────────────────────────────────────────────────

export const LOGOS = {
  // Full logo: glossy P-coin above PLEARN 3D wordmark. Transparent bg. RGBA.
  // Source: Assets/UI/PLEARN---Main-Logo.png
  main: '/assets/logos/plearn-main-logo.png',

  // Wordmark only: PLEARN 3D text, no coin. Transparent bg. RGBA.
  // Source: Assets/UI/Module1UI/home screen/PLEARN---Logotype resized.png
  logotype: '/assets/logos/plearn-logotype.png',

  // Placeholder paths — add files to public/assets/logos/ when available
  badgeStamp:          '/assets/logos/badge-stamp.png',
  arrowBadgePurple:    '/assets/logos/arrow-badge-purple.png',
  arrowBadgePink:      '/assets/logos/arrow-badge-pink.png',
  playLearnEarnStack:  '/assets/logos/play-learn-earn-stack.png',
}

export const COINS = {
  // ── All confirmed — copied from Logo/ALL PLEARN ASSETS copy/PLEARN Graphics/
  // Flat purple P-coin (simpler linework). Source: Assets/UI/PLEARN---Coin-Monogram---FLAT.png
  purple:        '/assets/logos/pcoin-purple.png',

  // Styled P-coin series (COIN_01–05) — matching comic art style, RGBA, transparent bg
  orange:        '/assets/logos/pcoin-orange.png',   // COIN_01 — challenge missions
  green:         '/assets/logos/pcoin-green.png',    // COIN_02 — savings goals
  blue:          '/assets/logos/pcoin-blue.png',     // COIN_03 — knowledge quests
  purpleStyled:  '/assets/logos/pcoin-purple-styled.png', // COIN_04 — purple styled variant
  magenta:       '/assets/logos/pcoin-magenta.png',  // COIN_05 — streak bonuses

  // Aliases matching original design system names
  get indigo()  { return this.blue },
}

export const CHARACTERS = {
  // Source: Assets/UI/Character2DImgs/Alex.png
  alex: '/assets/characters/alex.png',
}

export const MOCKUPS = {
  // ⚠ Legacy frame assets — not used in current Hero
  phone:  '/assets/mockups/phone-mockup.png',
  laptop: '/assets/mockups/laptop-mockup.png',

  // ── Hero visual ──────────────────────────────────────────────────────────
  // Full right-side hero composition: laptop + mobile + game map + coins + rewards.
  // Drop your finished image at: public/assets/mockups/hero-game-preview.png
  // Recommended: transparent bg, RGBA, at least 1400×1100 px for retina sharpness.
  heroGamePreview: '/assets/mockups/hero-game-preview.png',
}

// ⚠ Add EIT Digital logo file to public/assets/logos/ and update path below.
export const PARTNER_LOGOS = {
  eitDigital: '/assets/logos/eit-digital-logo.png',
}
