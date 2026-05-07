import { type RefObject, useEffect } from 'react'

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return
    const onPointerDown = (e: PointerEvent) => {
      const el = ref.current
      if (!el || el.contains(e.target as Node)) return
      handler()
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [ref, handler, enabled])
}
