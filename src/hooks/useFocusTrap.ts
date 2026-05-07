import { useEffect, type RefObject } from 'react'

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function isFocusableSurface(el: HTMLElement): boolean {
  if (el.closest('[aria-hidden="true"]')) return false
  const style = window.getComputedStyle(el)
  if (style.visibility === 'hidden' || style.display === 'none') return false
  return el.getClientRects().length > 0
}

function getFocusables(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(isFocusableSurface)
}

/** Keeps Tab cycling inside `containerRef` while `active`. */
export function useFocusTrap(containerRef: RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active) return
    const root = containerRef.current
    if (!root) return

    const nodes = getFocusables(root)
    if (nodes.length === 0) return

    const first = nodes[0]
    const last = nodes[nodes.length - 1]

    const t = window.setTimeout(() => first.focus(), 0)

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab' || nodes.length === 0) return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    root.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(t)
      root.removeEventListener('keydown', onKeyDown)
    }
  }, [active, containerRef])
}
