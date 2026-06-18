// ─────────────────────────────────────────────────────────────────────────────
// LoaderContext — global loader state for page transitions
//
// Usage:
//   import { useLoader } from '@/context/LoaderContext'
//   const { show, hide } = useLoader()
//
//   show()   // displays the PageLoader overlay
//   hide()   // fades it out
//
// The LoaderProvider is mounted at the App root so any component or route
// can trigger it without prop drilling.
// ─────────────────────────────────────────────────────────────────────────────

import { createContext, useCallback, useContext, useState } from 'react'
import PageLoader from '@/components/ui/PageLoader'

const LoaderCtx = createContext(null)

export function LoaderProvider({ children }) {
  const [visible,  setVisible]  = useState(false)
  const [message,  setMessage]  = useState('Preparing your mission')

  const show = useCallback((msg) => {
    if (msg) setMessage(msg)
    setVisible(true)
  }, [])

  const hide = useCallback(() => {
    setVisible(false)
  }, [])

  return (
    <LoaderCtx.Provider value={{ visible, show, hide }}>
      {children}
      {/* Loader renders at the provider level — always above every route */}
      <PageLoader visible={visible} message={message} />
    </LoaderCtx.Provider>
  )
}

export function useLoader() {
  const ctx = useContext(LoaderCtx)
  if (!ctx) throw new Error('useLoader must be used inside <LoaderProvider>')
  return ctx
}
