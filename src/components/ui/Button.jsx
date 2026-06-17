/**
 * Button — reusable CTA component.
 *
 * variant  : 'primary' | 'ghost' | 'partner' | 'outline-light'
 * size     : 'default' | 'sm'
 * href     : renders an <a> tag (external links get rel="noopener")
 * no href  : renders a <button>
 */
export default function Button({
  children,
  variant   = 'primary',
  size      = 'default',
  href,
  onClick,
  className = '',
  disabled  = false,
  ...props
}) {
  const variantClass = `btn-${variant}`

  const sizeClass = size === 'sm'
    ? 'px-5 py-2.5 text-sm'
    : ''

  const disabledClass = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : ''

  const allClasses = [variantClass, sizeClass, disabledClass, className]
    .filter(Boolean)
    .join(' ')

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:')
    return (
      <a
        href={disabled ? undefined : href}
        onClick={onClick}
        className={allClasses}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(disabled ? { 'aria-disabled': true, tabIndex: -1 } : {})}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={allClasses}
      {...props}
    >
      {children}
    </button>
  )
}
