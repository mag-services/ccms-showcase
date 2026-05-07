import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

export type TourDensity = 'compact' | 'standard' | 'full'

const STORAGE_KEY = 'ccms-tour-density'

function readInitial(): TourDensity {
  if (typeof window === 'undefined') return 'standard'
  const v = sessionStorage.getItem(STORAGE_KEY)
  if (v === 'compact' || v === 'standard' || v === 'full') return v
  return 'standard'
}

type Ctx = {
  density: TourDensity
  setDensity: (d: TourDensity) => void
}

const TourDensityContext = createContext<Ctx | null>(null)

export function TourDensityProvider({ children }: { children: ReactNode }) {
  const [density, setDensityState] = useState<TourDensity>(readInitial)

  const setDensity = useCallback((d: TourDensity) => {
    sessionStorage.setItem(STORAGE_KEY, d)
    setDensityState(d)
  }, [])

  const value = useMemo(() => ({ density, setDensity }), [density, setDensity])

  return <TourDensityContext.Provider value={value}>{children}</TourDensityContext.Provider>
}

export function useTourDensity() {
  const ctx = useContext(TourDensityContext)
  if (!ctx) throw new Error('useTourDensity must be used within TourDensityProvider')
  return ctx
}
