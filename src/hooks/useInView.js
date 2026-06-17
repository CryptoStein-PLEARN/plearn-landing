import { useEffect, useRef, useState } from 'react'

/**
 * Fires once when the element enters the viewport.
 * Used to trigger scroll-based animations without any library.
 *
 * @param {number} threshold  0–1, how much of the element must be visible
 * @returns [ref, inView]
 *
 * Usage:
 *   const [ref, inView] = useInView()
 *   <div ref={ref} className={inView ? 'animate-fade-up' : 'opacity-0'}>
 */
export function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') { setInView(true); return }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}
