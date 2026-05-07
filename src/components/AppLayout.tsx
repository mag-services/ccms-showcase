import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderOpen,
  BarChart3,
  LogOut,
  Shield,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  User,
  Settings,
  Menu,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { useShowcaseAuth } from '../context/ShowcaseAuth'
import { useTheme } from '../context/ThemeContext'
import { RegisterCaseProvider } from '../context/RegisterCaseContext'
import { useClickOutside } from '../hooks/useClickOutside'

const inactive =
  'flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white'
const inactiveCollapsed =
  'flex cursor-pointer items-center justify-center rounded-lg px-2 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white'
const active = `${inactive} bg-teal-800 text-white ring-1 ring-teal-600/60`
const activeCollapsed = `${inactiveCollapsed} bg-teal-800 text-white ring-1 ring-teal-600/60`

const demoNotifications = [
  {
    id: '1',
    title: 'Panel report due in 3 days',
    detail: 'Serious misconduct — CCMS-2026-0044',
    time: '2h ago',
    unread: true,
  },
  {
    id: '2',
    title: 'New SMDR received',
    detail: 'PSC Form 6-1 · Ministry of Finance',
    time: 'Yesterday',
    unread: true,
  },
  {
    id: '3',
    title: 'Commission confirmation window',
    detail: '45-day deadline · 12 days remaining',
    time: 'May 5',
    unread: false,
  },
] as const

function NavIcon({
  to,
  icon: Icon,
  label,
  isActive,
  collapsed,
}: {
  to: string
  icon: typeof LayoutDashboard
  label: string
  isActive: boolean
  collapsed: boolean
}) {
  const ic = collapsed ? inactiveCollapsed : inactive
  const ac = collapsed ? activeCollapsed : active

  return (
    <NavLink to={to} title={collapsed ? label : undefined} className={isActive ? ac : ic}>
      <Icon className="size-4 shrink-0 opacity-90" aria-hidden />
      {!collapsed ? <span>{label}</span> : null}
    </NavLink>
  )
}

function AppShellTopBar({
  onSidebarToggle,
  sidebarToggleAriaLabel,
  sidebarToggleAriaExpanded,
  desktopCollapsed,
}: {
  onSidebarToggle: () => void
  sidebarToggleAriaLabel: string
  sidebarToggleAriaExpanded: boolean
  desktopCollapsed: boolean
}) {
  const { theme, toggleTheme } = useTheme()
  const { signOut } = useShowcaseAuth()
  const [notifOpen, setNotifOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)

  const notifRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)

  useClickOutside(notifRef, () => setNotifOpen(false), notifOpen)
  useClickOutside(userRef, () => setUserOpen(false), userOpen)

  const unreadCount = demoNotifications.filter((n) => n.unread).length

  return (
    <header className="sticky top-0 z-[60] flex min-h-14 shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-3 py-2 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-slate-800 dark:bg-slate-900/95 dark:supports-[backdrop-filter]:bg-slate-900/80 sm:gap-4 sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onSidebarToggle}
          className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 lg:border-slate-200"
          aria-controls="app-sidebar"
          aria-expanded={sidebarToggleAriaExpanded}
          aria-label={sidebarToggleAriaLabel}
        >
          <Menu className="size-[18px] lg:hidden" aria-hidden />
          {desktopCollapsed ? (
            <ChevronsRight className="hidden size-[18px] lg:inline" aria-hidden />
          ) : (
            <ChevronsLeft className="hidden size-[18px] lg:inline" aria-hidden />
          )}
        </button>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold uppercase tracking-wider text-teal-800 dark:text-teal-400">
          Compliance Case Management System
        </p>
        <p className="truncate text-sm text-slate-600 dark:text-slate-400">
          Compliance Unit · Operational preview for stakeholders
        </p>
      </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <span className="hidden rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-950 ring-1 ring-amber-300 dark:bg-amber-950/40 dark:text-amber-100 dark:ring-amber-700 md:inline">
          Draft showcase
        </span>

        <button
          type="button"
          onClick={() => toggleTheme()}
          className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun className="size-[18px]" aria-hidden /> : <Moon className="size-[18px]" aria-hidden />}
        </button>

        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => {
              setNotifOpen((o) => !o)
              setUserOpen(false)
            }}
            className="relative flex size-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            aria-expanded={notifOpen}
            aria-haspopup="dialog"
            aria-label="Notifications"
          >
            <Bell className="size-[18px]" aria-hidden />
            {unreadCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-teal-600 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900">
                {unreadCount}
              </span>
            ) : null}
          </button>

          {notifOpen ? (
            <div
              className="absolute right-0 mt-2 w-[min(100vw-2rem,22rem)] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900"
              role="dialog"
              aria-label="Notifications"
            >
              <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Sample alerts — Phase 1 internal reminders</p>
              </div>
              <ul className="max-h-80 divide-y divide-slate-100 overflow-auto dark:divide-slate-800">
                {demoNotifications.map((n) => (
                  <li key={n.id}>
                    <button
                      type="button"
                      className="flex w-full cursor-pointer gap-3 px-4 py-3 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800/80"
                    >
                      <span
                        className={`mt-1.5 size-2 shrink-0 rounded-full ${n.unread ? 'bg-teal-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                        aria-hidden
                      />
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-slate-900 dark:text-slate-100">{n.title}</span>
                        <span className="block text-xs text-slate-600 dark:text-slate-400">{n.detail}</span>
                        <span className="mt-1 block text-[11px] text-slate-400">{n.time}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="border-t border-slate-100 px-4 py-2 dark:border-slate-800">
                <p className="text-center text-[11px] text-slate-400">Demo only · Email integration in a later phase</p>
              </div>
            </div>
          ) : null}
        </div>

        <div className="relative" ref={userRef}>
          <button
            type="button"
            onClick={() => {
              setUserOpen((o) => !o)
              setNotifOpen(false)
            }}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white py-1.5 pl-2 pr-2 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 sm:pl-2.5 sm:pr-3"
            aria-expanded={userOpen}
            aria-haspopup="menu"
            aria-label="User menu"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-white dark:bg-teal-600">
              HT
            </span>
            <span className="hidden min-w-0 flex-col text-left leading-tight sm:flex">
              <span className="truncate text-sm font-medium text-slate-900 dark:text-white">Herman Tevilili</span>
              <span className="truncate text-[11px] text-slate-500 dark:text-slate-400">IPDU · Showcase session</span>
            </span>
            <ChevronDown className="hidden size-4 shrink-0 text-slate-500 sm:block" aria-hidden />
          </button>

          {userOpen ? (
            <div
              className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl dark:border-slate-700 dark:bg-slate-900"
              role="menu"
            >
              <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800 sm:hidden">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">Herman Tevilili</p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">Principal Innovation &amp; Digital · IPDU</p>
              </div>
              <button
                type="button"
                disabled
                className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-slate-400 dark:text-slate-500"
                role="menuitem"
              >
                <User className="size-4 shrink-0" aria-hidden />
                Profile
              </button>
              <button
                type="button"
                disabled
                className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-slate-400 dark:text-slate-500"
                role="menuitem"
              >
                <Settings className="size-4 shrink-0" aria-hidden />
                Settings
              </button>
              <div className="my-1 border-t border-slate-100 dark:border-slate-800" />
              <button
                type="button"
                onClick={() => {
                  setUserOpen(false)
                  signOut()
                }}
                className="flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-left text-sm font-medium text-red-700 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                role="menuitem"
              >
                <LogOut className="size-4 shrink-0" aria-hidden />
                Sign out
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}

const SIDEBAR_COLLAPSED_KEY = 'ccms-sidebar-collapsed'

export function AppLayout() {
  const { signOut } = useShowcaseAuth()
  const path = useLocation().pathname

  const [isLg, setIsLg] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : false,
  )
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [desktopCollapsed, setDesktopCollapsed] = useState(() =>
    typeof window !== 'undefined' ? sessionStorage.getItem(SIDEBAR_COLLAPSED_KEY) === '1' : false,
  )

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const sync = () => setIsLg(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    setMobileSidebarOpen(false)
  }, [path])

  useEffect(() => {
    if (!mobileSidebarOpen) return
    if (window.matchMedia('(min-width: 1024px)').matches) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileSidebarOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [mobileSidebarOpen])

  const toggleSidebar = useCallback(() => {
    const large = window.matchMedia('(min-width: 1024px)').matches
    if (large) {
      setDesktopCollapsed((c) => {
        const next = !c
        sessionStorage.setItem(SIDEBAR_COLLAPSED_KEY, next ? '1' : '0')
        return next
      })
      setMobileSidebarOpen(false)
    } else {
      setMobileSidebarOpen((o) => !o)
    }
  }, [])

  const collapsedRail = desktopCollapsed && isLg

  const sidebarToggleAriaLabel = !isLg
    ? mobileSidebarOpen
      ? 'Close navigation menu'
      : 'Open navigation menu'
    : desktopCollapsed
      ? 'Expand sidebar'
      : 'Collapse sidebar'

  const sidebarToggleAriaExpanded = isLg ? !desktopCollapsed : mobileSidebarOpen

  const dashActive = path === '/dashboard' || path === '/'
  const casesQueueActive = path === '/cases' || path.startsWith('/cases/')
  const reportsActive = path.startsWith('/reports')

  return (
    <RegisterCaseProvider>
      <div className="flex min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        {mobileSidebarOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-[55] cursor-pointer bg-slate-950/50 backdrop-blur-[2px] lg:hidden"
            aria-label="Close navigation menu"
            onClick={() => setMobileSidebarOpen(false)}
          />
        ) : null}

        <aside
          id="app-sidebar"
          className={`fixed inset-y-0 left-0 z-[56] flex flex-col border-r border-slate-800/80 bg-slate-900 text-white shadow-xl transition-[transform,width,min-width] duration-200 ease-in-out dark:border-slate-800 lg:relative lg:z-auto lg:translate-x-0 ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } w-[min(18rem,100vw-2rem)] min-w-[min(18rem,100vw-2rem)] ${
            collapsedRail ? 'lg:w-[4.25rem] lg:min-w-[4.25rem]' : 'lg:w-64 lg:min-w-[16rem]'
          }`}
        >
          <div className={`border-b border-slate-700/80 shrink-0 ${collapsedRail ? 'px-2 py-4' : 'px-4 py-5'}`}>
            <div
              className={`flex gap-2 ${collapsedRail ? 'flex-col items-center justify-center text-center' : 'items-start'}`}
            >
              <Shield className={`size-8 shrink-0 text-teal-400 ${collapsedRail ? '' : 'mt-0.5'}`} aria-hidden />
              {!collapsedRail ? (
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-teal-300/90">
                    Office of the PSC
                  </p>
                  <p className="text-xs leading-snug text-slate-400">Innovation &amp; Policy Development Unit</p>
                  <p className="mt-2 font-semibold leading-tight text-white">CCMS Showcase</p>
                </div>
              ) : null}
            </div>
          </div>
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3" aria-label="Primary">
            <NavIcon
              to="/dashboard"
              icon={LayoutDashboard}
              label="Dashboard"
              isActive={dashActive}
              collapsed={collapsedRail}
            />
            <NavIcon
              to="/cases"
              icon={FolderOpen}
              label="Cases"
              isActive={casesQueueActive}
              collapsed={collapsedRail}
            />
            <NavIcon
              to="/reports"
              icon={BarChart3}
              label="Reports & alerts"
              isActive={reportsActive}
              collapsed={collapsedRail}
            />
          </nav>
          <div className="shrink-0 border-t border-slate-700 p-3">
            <button
              type="button"
              title={collapsedRail ? 'Exit showcase' : undefined}
              onClick={() => signOut()}
              className={`flex w-full cursor-pointer items-center rounded-lg text-sm font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white ${
                collapsedRail ? 'justify-center px-2 py-2.5' : 'gap-3 px-3 py-2.5'
              }`}
            >
              <LogOut className="size-4 shrink-0" aria-hidden />
              {!collapsedRail ? <span>Exit showcase</span> : null}
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col lg:min-h-screen">
          <AppShellTopBar
            onSidebarToggle={toggleSidebar}
            sidebarToggleAriaLabel={sidebarToggleAriaLabel}
            sidebarToggleAriaExpanded={sidebarToggleAriaExpanded}
            desktopCollapsed={desktopCollapsed}
          />
          <main className="flex-1 overflow-auto bg-slate-100 dark:bg-slate-950">
            <div className="p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </RegisterCaseProvider>
  )
}
