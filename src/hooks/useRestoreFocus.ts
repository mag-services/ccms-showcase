import { useEffect, useRef } from 'react'

/** Saves the focused element when `active` becomes true; restores when it becomes false. */
export function useRestoreFocus(active: boolean) {
  const saved = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (active) {
      saved.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    } else if (saved.current && typeof saved.current.focus === 'function') {
      saved.current.focus()
      saved.current = null
    }
  }, [active])
}
