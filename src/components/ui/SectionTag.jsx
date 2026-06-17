/**
 * SectionTag — pre-headline label shown above every section heading.
 * Renders the small uppercase label with a leading purple dot.
 *
 * Usage:  <SectionTag>How It Works</SectionTag>
 */
export default function SectionTag({ children, className = '' }) {
  return (
    <span className={`section-tag ${className}`}>
      <span
        className="w-1.5 h-1.5 rounded-full bg-plearn-purple flex-shrink-0"
        aria-hidden="true"
      />
      {children}
    </span>
  )
}
