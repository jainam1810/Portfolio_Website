import { useCallback, useEffect, useRef, useState } from 'react'
import { launchCricketFireworks } from '@/lib/cricket-fireworks'

/**
 * Cycles through phrases with realistic typing and deleting speeds.
 * Carried over from the previous site.
 */
export function useTypewriter(phrases: readonly string[], startDelay = 1200) {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(phrases[0] ?? '')
      return
    }

    let phraseIndex = 0
    let charIndex = 0
    let deleting = false
    let timeout: number

    const tick = () => {
      const current = phrases[phraseIndex]
      if (!deleting) {
        setTyped(current.substring(0, charIndex + 1))
        charIndex++
        if (charIndex === current.length) {
          deleting = true
          timeout = window.setTimeout(tick, 2000)
          return
        }
        timeout = window.setTimeout(tick, 60 + Math.random() * 40)
      } else {
        setTyped(current.substring(0, charIndex - 1))
        charIndex--
        if (charIndex === 0) {
          deleting = false
          phraseIndex = (phraseIndex + 1) % phrases.length
          timeout = window.setTimeout(tick, 500)
          return
        }
        timeout = window.setTimeout(tick, 30)
      }
    }

    const start = window.setTimeout(tick, startDelay)
    return () => {
      window.clearTimeout(start)
      window.clearTimeout(timeout)
    }
  }, [phrases, startDelay])

  return typed
}

/** Tracks which section is currently in the viewport, for nav highlighting. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])

  return active
}

/** Konami code on desktop, 7 taps within 1.5s on touch. */
export function useKonami(onTrigger: () => void = launchCricketFireworks) {
  const handler = useRef(onTrigger)
  handler.current = onTrigger

  useEffect(() => {
    const code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
    let position = 0

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === code[position]) {
        position++
        if (position === code.length) {
          position = 0
          handler.current()
        }
      } else {
        position = 0
      }
    }

    let taps: number[] = []
    const onTouch = () => {
      const now = Date.now()
      taps.push(now)
      taps = taps.filter((t) => now - t < 1500)
      if (taps.length >= 7) {
        taps = []
        handler.current()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('touchstart', onTouch, { passive: true })
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('touchstart', onTouch)
    }
  }, [])
}

/** Smooth-scrolls to a section id, going through Lenis when it is active. */
export function useScrollTo() {
  return useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: Element, o?: object) => void } }).lenis
    if (lenis) lenis.scrollTo(el, { offset: -8 })
    else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])
}
