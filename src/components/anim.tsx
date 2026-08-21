import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'motion/react'
import type { Transition, Variants } from 'motion/react'
import { cn } from '@/lib/utils'

export const EASE_OUT: Transition['ease'] = [0.22, 1, 0.36, 1]

/** Fade-and-rise on first scroll into view. The workhorse of the page. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  as: As = 'div',
  amount = 0.2,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'section' | 'li' | 'article' | 'header' | 'span'
  amount?: number
}) {
  const reduced = useReducedMotion()
  const MotionTag = motion[As]

  return (
    <MotionTag
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.75, delay, ease: EASE_OUT }}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Splits a display heading into words and staggers them upward from behind a
 * mask - the effect that makes the oversized editorial type feel cinematic.
 */
export function WordReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.055,
}: {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  stagger?: number
}) {
  const reduced = useReducedMotion()
  const words = text.split(' ')

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }

  const word: Variants = {
    hidden: { y: '110%' },
    show: { y: '0%', transition: { duration: 0.9, ease: EASE_OUT } },
  }

  if (reduced) return <span className={className}>{text}</span>

  return (
    <motion.span
      className={cn('inline', className)}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
          <motion.span className={cn('inline-block', wordClassName)} variants={word}>
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/** Counts up to `value` the first time it scrolls into view. */
export function Counter({
  value,
  suffix = '',
  className,
  duration = 1.7,
}: {
  value: number
  suffix?: string
  className?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, duration, reduced])

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString('en-GB')}
      {suffix}
    </span>
  )
}

/** A thin animated rule that draws itself in - used as a section marker. */
export function AccentRule({ className }: { className?: string }) {
  return (
    <motion.span
      className={cn('block h-px w-14 origin-left bg-[var(--domain)]', className)}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
    />
  )
}
