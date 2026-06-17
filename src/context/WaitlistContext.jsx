// ─────────────────────────────────────────────────────────────────────────────
// WaitlistContext
//
// Provides openModal / closeModal to any component in the tree.
// The trigger element is stored so focus returns to it when the modal closes
// (WCAG 2.1 success criterion 3.2.2 — focus management).
// ─────────────────────────────────────────────────────────────────────────────

import { createContext, useCallback, useContext, useRef, useState } from 'react'

const WaitlistContext = createContext({
  isOpen:     false,
  openModal:  () => {},
  closeModal: () => {},
})

export function WaitlistProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef(null)  // element that opened the modal

  const openModal = useCallback((triggerEl = null) => {
    triggerRef.current = triggerEl
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    // Return focus to the triggering element (if it's still in the DOM)
    requestAnimationFrame(() => {
      try {
        const el = triggerRef.current
        if (el && document.contains(el) && typeof el.focus === 'function') {
          el.focus()
        }
      } catch { /* ignore */ }
      triggerRef.current = null
    })
  }, [])

  return (
    <WaitlistContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </WaitlistContext.Provider>
  )
}

export function useWaitlist() {
  return useContext(WaitlistContext)
}
