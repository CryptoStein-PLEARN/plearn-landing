/**
 * PageBackground — global fixed base layer
 *
 * Provides only a consistent dark base gradient visible in any gaps between sections
 * (footer area, scroll overscroll, etc.). Each section handles its own full
 * atmospheric treatment using the HowItWorks visual language as the reference.
 */
export default function PageBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset:    0,
        zIndex:   0,
        pointerEvents: 'none',
        background: 'linear-gradient(160deg, #08021E 0%, #050115 40%, #040012 70%, #030010 100%)',
      }}
    />
  )
}
