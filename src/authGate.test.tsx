import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom'
import { ShowcaseAuthProvider } from './context/ShowcaseAuth'
import { Protected } from './App'

function TestHarness() {
  return (
    <MemoryRouter initialEntries={['/dashboard']}>
      <ShowcaseAuthProvider>
        <Routes>
          <Route path="/login" element={<h1>Login</h1>} />
          <Route
            element={
              <Protected>
                <Outlet />
              </Protected>
            }
          >
            <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          </Route>
        </Routes>
      </ShowcaseAuthProvider>
    </MemoryRouter>
  )
}

describe('Protected route gate', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('redirects to login when showcase session is absent', async () => {
    render(<TestHarness />)
    const heading = await screen.findByRole('heading', { level: 1, name: 'Login' })
    expect(heading.textContent).toBe('Login')
  })

  it('renders dashboard when showcase session flag is set', () => {
    sessionStorage.setItem('ccms-showcase-auth', '1')
    render(<TestHarness />)
    expect(screen.getByRole('heading', { level: 1, name: 'Dashboard' }).textContent).toBe('Dashboard')
  })
})
