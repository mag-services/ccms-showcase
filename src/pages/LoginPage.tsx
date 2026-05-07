import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShowcaseAuth } from '../context/ShowcaseAuth'
import { useTheme } from '../context/ThemeContext'
import { Moon, Shield, Sun } from 'lucide-react'

export function LoginPage() {
  const { signIn } = useShowcaseAuth()
  const { theme, toggleTheme } = useTheme()
  const nav = useNavigate()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    signIn()
    nav('/dashboard', { replace: true })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 px-4 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
        <button
          type="button"
          onClick={() => toggleTheme()}
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun className="size-[18px]" aria-hidden /> : <Moon className="size-[18px]" aria-hidden />}
        </button>
        <div className="mb-6 flex flex-col items-center text-center">
          <Shield className="size-12 text-teal-600 dark:text-teal-400" aria-hidden />
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">
            Office of the Public Service Commission
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Innovation &amp; Policy Development Unit (IPDU)</p>
          <h1 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">CCMS Showcase</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Compliance Case Management System · front-end prototype only (no server).
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="user" className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              Demo username
            </label>
            <input
              id="user"
              name="user"
              defaultValue="compliance.officer"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-teal-500/30 focus:ring-2 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
          <div>
            <label htmlFor="pw" className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              Demo password
            </label>
            <input
              id="pw"
              name="pw"
              type="password"
              defaultValue="showcase"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-teal-500/30 focus:ring-2 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
          <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <input type="checkbox" defaultChecked className="rounded border-slate-400 text-teal-600" />
            Remember this device (demo only)
          </label>
          <button
            type="submit"
            className="w-full rounded-lg bg-teal-700 py-2.5 text-sm font-semibold text-white shadow hover:bg-teal-800"
          >
            Sign in to showcase
          </button>
        </form>
        <p className="mt-4 text-center text-[11px] text-slate-500 dark:text-slate-400">
          IPDU-SOP-001 Step 1 · Need Assessment Brief · May 2026 · Sample cases inside.
        </p>
      </div>
    </div>
  )
}
