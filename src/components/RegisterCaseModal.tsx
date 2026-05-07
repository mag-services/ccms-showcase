import { useEffect } from 'react'
import { X } from 'lucide-react'
import { RegisterCaseForm } from './RegisterCaseForm'

export function RegisterCaseModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-950/60 px-3 py-6 backdrop-blur-sm sm:px-6 sm:py-10"
      role="presentation"
    >
      <button
        type="button"
        className="fixed inset-0 cursor-default"
        aria-label="Close registration dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-case-title"
        className="relative z-[101] mt-0 w-full max-w-6xl rounded-2xl border border-slate-200 bg-slate-100 shadow-2xl dark:border-slate-700 dark:bg-slate-950 sm:mt-4"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900 sm:px-6">
          <div className="min-w-0">
            <h2 id="register-case-title" className="text-lg font-bold text-slate-900 dark:text-white">
              Register new compliance case
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              FR-01 intake · FR-02 routing preview · FR-12 senior executive flag · sample form only (no save)
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            aria-label="Close"
          >
            <X className="size-5" aria-hidden />
          </button>
        </header>
        <div className="max-h-[min(78vh,calc(100dvh-10rem))] overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          <RegisterCaseForm />
        </div>
      </div>
    </div>
  )
}
