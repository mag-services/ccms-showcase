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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 px-4 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-700">
        <button
          type="button"
          onClick={() => toggleTheme()}
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-700 shadow-sm transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun className="size-[18px]" aria-hidden /> : <Moon className="size-[18px]" aria-hidden />}
        </button>
        <div className="mb-6 flex flex-col items-center text-center">
          <Shield className="size-12 text-blue-600 dark:text-blue-400" aria-hidden />
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
            Office of the Public Service Commission
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Innovation &amp; Policy Development Unit (IPDU)</p>
          <h1 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">CCMS Showcase</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Compliance Case Management System · front-end prototype only (no server).
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="user" className="block text-xs font-medium text-gray-700 dark:text-gray-300">
              Demo username
            </label>
            <input
              id="user"
              name="user"
              defaultValue="compliance.officer"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-blue-500/30 focus:ring-2 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-100"
            />
          </div>
          <div>
            <label htmlFor="pw" className="block text-xs font-medium text-gray-700 dark:text-gray-300">
              Demo password
            </label>
            <input
              id="pw"
              name="pw"
              type="password"
              defaultValue="showcase"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-blue-500/30 focus:ring-2 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-100"
            />
          </div>
          <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <input type="checkbox" defaultChecked className="rounded border-gray-400 text-blue-600" />
            Remember this device (demo only)
          </label>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-800"
          >
            Sign in to showcase
          </button>
        </form>
        <p className="mt-4 text-center text-[11px] text-gray-500 dark:text-gray-400">
          IPDU-SOP-001 Step 1 · Need Assessment Brief · May 2026 · Sample cases inside.
        </p>
      </div>
    </div>
  )
}
