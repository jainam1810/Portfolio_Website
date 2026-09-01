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

/**
 * True while a deliberate scroll (nav click, back-to-top) is in flight. Any
 * programmatic scroll cancels an in-progress smooth scroll, so useScrollAnchor
 * has to stay out of the way until it settles.
 */
let navigating = false

/**
 * Anchor navigation only. Uses the browser's own smooth scroll, so wheel and
 * trackpad scrolling keep the operating system's native speed and feel.
 */
export function useScrollTo() {
  return useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return

    navigating = true
    const done = () => {
      navigating = false
      window.removeEventListener('scrollend', done)
    }
    window.addEventListener('scrollend', done)
    // scrollend is not everywhere yet, so time out as well.
    window.setTimeout(done, 1500)

    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])
}

/**
 * Keeps what you are reading still when a section above it resizes.
 *
 * Changing domain resizes several sections at once, and the domains section
 * alone swings by about 900px. Deltas are attributed per section, not per
 * batch: several sections resize together, and bailing out because one of them
 * is the one being read would throw away the others - which is what moved the
 * page.
 */
export function useScrollAnchor(ids: readonly string[]) {
  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') return
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    let anchor: Element | null = null
    let adjusting = false
    const heights = new Map<Element, number>()

    const pick = () => {
      if (adjusting) return
      anchor = document.elementFromPoint(
        Math.round(window.innerWidth / 2),
        Math.round(window.innerHeight / 2),
      )
    }

    const observer = new ResizeObserver((entries) => {
      // Never scroll during deliberate navigation: it would abort the smooth
      // scroll and strand the page part-way.
      if (navigating) {
        for (const entry of entries) {
          heights.set(entry.target, entry.target.getBoundingClientRect().height)
        }
        return
      }
      if (!anchor || !anchor.isConnected) {
        for (const entry of entries) {
          heights.set(entry.target, entry.target.getBoundingClientRect().height)
        }
        pick()
        return
      }

      let shift = 0

      for (const entry of entries) {
        const rect = entry.target.getBoundingClientRect()
        const previous = heights.get(entry.target)
        heights.set(entry.target, rect.height)
        if (previous === undefined) continue

        // The section holding the anchor is the one being read; let it move.
        if (entry.target.contains(anchor)) continue

        // "Above" is decided by document order, not by screen position. By the
        // time this runs the anchor has already been pushed by the resize, so
        // comparing viewport tops blamed the wrong sections entirely.
        const anchorComesAfter =
          entry.target.compareDocumentPosition(anchor) & Node.DOCUMENT_POSITION_FOLLOWING
        if (!anchorComesAfter) continue

        shift += rect.height - previous
      }

      if (Math.abs(shift) > 1) {
        adjusting = true
        window.scrollBy(0, shift)
        requestAnimationFrame(() => {
          adjusting = false
        })
      }
    })

    pick()
    for (const el of sections) {
      heights.set(el, el.getBoundingClientRect().height)
      observer.observe(el)
    }
    window.addEventListener('scroll', pick, { passive: true })
    window.addEventListener('resize', pick)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', pick)
      window.removeEventListener('resize', pick)
    }
  }, [ids])
}
