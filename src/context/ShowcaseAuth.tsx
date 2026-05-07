import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type AuthCtx = {
  signedIn: boolean
  signIn: () => void
  signOut: () => void
}

const AuthContext = createContext<AuthCtx | null>(null)

export function ShowcaseAuthProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState(() =>
    typeof window !== 'undefined' ? sessionStorage.getItem('ccms-showcase-auth') === '1' : false,
  )

  const signIn = useCallback(() => {
    sessionStorage.setItem('ccms-showcase-auth', '1')
    setSignedIn(true)
  }, [])

  const signOut = useCallback(() => {
    sessionStorage.removeItem('ccms-showcase-auth')
    setSignedIn(false)
  }, [])

  const value = useMemo(() => ({ signedIn, signIn, signOut }), [signedIn, signIn, signOut])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useShowcaseAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useShowcaseAuth must be used within ShowcaseAuthProvider')
  return ctx
}
