import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { RegisterCaseModal } from '../components/RegisterCaseModal'

type RegisterCaseCtx = {
  registerOpen: boolean
  openRegister: () => void
  closeRegister: () => void
}

const RegisterCaseContext = createContext<RegisterCaseCtx | null>(null)

export function RegisterCaseProvider({ children }: { children: ReactNode }) {
  const [registerOpen, setRegisterOpen] = useState(false)

  const openRegister = useCallback(() => setRegisterOpen(true), [])
  const closeRegister = useCallback(() => setRegisterOpen(false), [])

  const value = useMemo(
    () => ({
      registerOpen,
      openRegister,
      closeRegister,
    }),
    [registerOpen, openRegister, closeRegister],
  )

  return (
    <RegisterCaseContext.Provider value={value}>
      {children}
      <RegisterCaseModal open={registerOpen} onClose={closeRegister} />
    </RegisterCaseContext.Provider>
  )
}

export function useRegisterCaseModal() {
  const ctx = useContext(RegisterCaseContext)
  if (!ctx) throw new Error('useRegisterCaseModal must be used within RegisterCaseProvider')
  return ctx
}
