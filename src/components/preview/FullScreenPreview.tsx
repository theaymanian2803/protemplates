import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Loader2, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface FullScreenPreviewProps {
  url: string
  title: string
  open: boolean
  onClose: () => void
}

/*
  Lovable-style full-screen preview. Covers the entire window edge-to-edge with
  the template's demo site in an iframe. Minimal chrome: a floating close (×)
  top-right and a discreet "open in new tab" escape hatch top-left. Closes via ×,
  Escape, or a backdrop click; body scroll is locked while open. The iframe stays
  sandboxed (no top-navigation) so the embedded site can never take the parent
  page away.
*/

const FullScreenPreview = ({ url, title, open, onClose }: FullScreenPreviewProps) => {
  const [loaded, setLoaded] = useState(false)
  const loadTimer = useRef<number | undefined>(undefined)

  // Escape to close + lock body scroll while open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = original
    }
  }, [open, onClose])

  // reset the loading state each time the modal opens, with a safety timeout
  useEffect(() => {
    if (!open) return
    setLoaded(false)
    loadTimer.current = window.setTimeout(() => setLoaded(true), 8000)
    return () => {
      if (loadTimer.current !== undefined) clearTimeout(loadTimer.current)
    }
  }, [open, url])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-white"
          role="dialog"
          aria-modal="true"
          aria-label={`Aperçu en plein écran de ${title}`}
          onClick={onClose}>
          {/* inner layer stops the backdrop click from firing while the site is interactive */}
          <div className="absolute inset-0" onClick={(e) => e.stopPropagation()}>
            {!loaded && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">
                <Loader2 className="h-8 w-8 animate-spin text-[#e85a2d]" />
              </div>
            )}
            <motion.iframe
              initial={{ scale: 0.985, opacity: 0.4 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              src={url}
              title={`${title} — Aperçu en plein écran`}
              className="h-full w-full border-none bg-white"
              sandbox="allow-scripts allow-same-origin allow-forms"
              onLoad={() => setLoaded(true)}
            />
          </div>

          {/* open in new tab — discreet escape hatch */}
          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ouvrir dans un nouvel onglet"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-[#EAEAEA] bg-white/75 px-3 py-1.5 text-xs font-medium text-[#787774] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-colors hover:text-[#111111] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85a2d]/50">
            <ExternalLink className="h-3.5 w-3.5" />
            Nouvel onglet
          </motion.a>

          {/* close button — floating, top-right */}
          <motion.button
            type="button"
            autoFocus
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            aria-label="Fermer l'aperçu"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.2 }}
            className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#EAEAEA] bg-white/75 text-[#111111] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-all hover:scale-105 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85a2d]/50">
            <X className="h-5 w-5" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FullScreenPreview
