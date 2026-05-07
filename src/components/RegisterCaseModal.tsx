import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { RegisterCaseForm } from './RegisterCaseForm'
import { WorkflowGuideBanner } from './workflow/WorkflowGuideBanner'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { useRestoreFocus } from '../hooks/useRestoreFocus'

export function RegisterCaseModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null)

  useRestoreFocus(open)
  useFocusTrap(panelRef, open)

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-gray-950/60 px-3 py-6 backdrop-blur-sm sm:px-6 sm:py-10"
      role="presentation"
    >
      <button
        type="button"
        tabIndex={-1}
        className="fixed inset-0 cursor-default bg-transparent"
        aria-label="Close registration dialog"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-case-title"
        className="relative z-[101] mt-0 w-full max-w-6xl rounded-2xl border border-gray-200 bg-gray-100 shadow-2xl dark:border-gray-700 dark:bg-gray-950 sm:mt-4"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-4 border-b border-gray-200 bg-white px-5 py-4 dark:border-gray-800 dark:bg-gray-900 sm:px-6">
          <div className="min-w-0">
            <h2 id="register-case-title" className="text-lg font-bold text-gray-900 dark:text-white">
              Register new compliance case
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              FR-01 intake · FR-02 routing preview · FR-12 senior executive flag · sample form only (no save)
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg border border-gray-200 bg-white p-2 text-gray-600 shadow-sm transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            aria-label="Close"
          >
            <X className="size-5" aria-hidden />
          </button>
        </header>
        <div className="max-h-[min(78vh,calc(100dvh-10rem))] overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          <div className="mb-5">
            <WorkflowGuideBanner pageId="register-case" />
          </div>
          <RegisterCaseForm />
        </div>
      </div>
    </div>
  )
}
