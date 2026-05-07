import type { ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ShowcaseAuthProvider, useShowcaseAuth } from './context/ShowcaseAuth'
import { AppLayout } from './components/AppLayout'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { CasesPage } from './pages/CasesPage'
import { CaseDetailPage } from './pages/CaseDetailPage'
import { ReportsPage } from './pages/ReportsPage'
import { OpenRegisterThenCases } from './components/OpenRegisterThenCases'

function Protected({ children }: { children: ReactNode }) {
  const { signedIn } = useShowcaseAuth()
  if (!signedIn) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <ShowcaseAuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            element={
              <Protected>
                <AppLayout />
              </Protected>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/cases" element={<CasesPage />} />
            <Route path="/cases/new" element={<OpenRegisterThenCases />} />
            <Route path="/cases/:id" element={<CaseDetailPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Route>
          <Route path="/brief" element={<Navigate to="/dashboard" replace />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </ShowcaseAuthProvider>
    </BrowserRouter>
  )
}
