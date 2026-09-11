import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { ArrowDown, Download } from 'lucide-react'
import { useRef } from 'react'
import { site } from '@/data/site'
import { HERO_STRIP, domainList, domains } from '@/data/domains'
import { useDomainState } from '@/components/domain-context'
import { useScrollTo, useTypewriter } from '@/hooks/use-portfolio'
import { EASE_OUT } from '@/components/anim'
import { BrandGlyph } from '@/lib/icons'
import { cn } from '@/lib/utils'

/* A transparent cut-out: the tint layers are clipped to its alpha and the
   figure sits on the page rather than inside a rectangle. */
const PORTRAIT = '/profile.png'

export function Hero({ ready = true }: { ready?: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const typed = useTypewriter(site.taglines)
  const scrollTo = useScrollTo()
  const { active } = useDomainState()
  const cvs = site.cvs.filter((cv) => active === 'all' || cv.domains.includes(active))

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '16%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  // The portrait drifts slower than the text, so the layers separate on scroll.
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '7%'])

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden pt-28 pb-16"
    >
      {/* Technical ground plane */}
      <div className="hud-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="hero-glow pointer-events-none absolute inset-0" />

      <Portrait y={portraitY} ready={ready} />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 mx-auto w-full max-w-[1440px] px-5 md:px-10 xl:pr-28"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mb-7 flex items-start gap-2.5 font-mono text-[10px] leading-relaxed tracking-[0.16em] text-muted-foreground uppercase sm:text-[11px] sm:tracking-[0.2em]"
        >
          <span className="relative mt-[0.5em] flex size-1.5 shrink-0">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--domain)] opacity-70" />
            <span className="relative inline-flex size-1.5 rounded-full bg-[var(--domain)]" />
          </span>
          {site.badge}
        </motion.p>

        {/* "I build" is constant; the tail is whatever domain is selected.
            Each domain sets its own type scale so its sentence fills the
            measure exactly - short headlines come out large, long ones small,
            and both span the same width. See .hero-headline in index.css. */}
        <Headline ready={ready} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.5, duration: 0.7, ease: EASE_OUT }}
          className="mt-5 max-w-lg"
        >
          <p className="min-h-[1.7em] font-mono text-sm text-[var(--domain)]">
            {typed}
            <span className="ml-0.5 inline-block h-[1.05em] w-px translate-y-[0.15em] bg-[var(--domain)] [animation:caret_1s_step-end_infinite]" />
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
            {site.intro}
          </p>

          {/* CVs, socials and the live readout are three stacked blocks with one
              shared gap, so the rhythm between them is identical. */}
          <div className="mt-7 flex flex-col items-start gap-5">
            {/* One CV per selected domain; every CV when nothing is selected.
                Both share one row on any width, each taking half a phone. */}
            <div className="flex gap-2.5">
              {cvs.map((cv, i) => (
                <a
                  key={cv.label}
                  href={cv.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'hud-corner group flex min-w-0 flex-1 items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-300 sm:flex-none sm:gap-2.5 sm:px-4',
                    i === 0
                      ? 'bg-[var(--domain)] text-background hover:brightness-110'
                      : 'border border-border bg-background/60 text-foreground hover:border-[var(--domain)] hover:text-[var(--domain)]',
                  )}
                >
                  <Download className="size-3.5 shrink-0" />
                  <span className="min-w-0 truncate">{cv.label}</span>
                </a>
              ))}
            </div>

            <div className="flex gap-1.5">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-9 place-items-center rounded-md border border-border bg-background/60 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--domain)] hover:text-[var(--domain)]"
                >
                  <BrandGlyph name={s.icon} className="size-3.5" />
                </a>
              ))}
            </div>

            <StatusStrip ready={ready} />
          </div>
        </motion.div>
      </motion.div>

      <button
        onClick={() => scrollTo('about')}
        className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-muted-foreground uppercase transition-colors hover:text-[var(--domain)] md:flex"
      >
        Scroll
        <motion.span
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="size-3.5" />
        </motion.span>
      </button>
    </section>
  )
}

/**
 * The headline. One shared entrance, then the tail cross-fades whenever the
 * domain changes. A fade rather than a slide: at this size a slide reads as the
 * whole page lurching.
 */
function Headline({ ready }: { ready: boolean }) {
  const { active } = useDomainState()
  const reduced = useReducedMotion()
  const { heroLine: tail, heroScale } = active === 'all' ? site : domains[active]

  const from = reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }
  const to = reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }

  return (
    <motion.h1
      initial={from}
      animate={ready ? to : from}
      transition={{ duration: 0.85, delay: 0.16, ease: EASE_OUT }}
      style={
        {
          '--hero-scale-2': heroScale.two,
          '--hero-scale-3': heroScale.three,
          '--hero-strip-2': HERO_STRIP.two,
          '--hero-strip-3': HERO_STRIP.three,
        } as React.CSSProperties
      }
      className="hero-headline font-display flex origin-left items-center text-foreground"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
          className="block w-full"
        >
          {site.heroLead} <span className="text-[var(--domain)]">{tail}</span>
        </motion.span>
      </AnimatePresence>
    </motion.h1>
  )
}

/**
 * The cut-out portrait, anchored bottom-right and sitting behind the headline
 * so the type crosses over it.
 */
function Portrait({ y, ready }: { y: MotionValue<string>; ready: boolean }) {
  return (
    <motion.div
      style={{ y }}
      initial={{ opacity: 0, scale: 1.04 }}
      animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
      transition={{ duration: 1.3, delay: 0.2, ease: EASE_OUT }}
      className="pointer-events-none absolute top-[34%] right-0 z-10 h-[32%] w-[80%] origin-bottom-right opacity-35 sm:top-[28%] sm:h-[44%] sm:w-[64%] sm:opacity-60 lg:top-auto lg:bottom-0 lg:h-[88%] lg:w-[46%] lg:opacity-100 xl:right-[3%] xl:w-[42%]"
    >
      <div
        className="duotone-wrap relative size-full"
        style={{ '--cutout': `url(${PORTRAIT})` } as React.CSSProperties}
      >
        <img
          src={PORTRAIT}
          alt="Jainam Varia"
          className="size-full object-contain object-bottom"
          loading="eager"
          decoding="async"
        />
        {/* Clipped to the cut-out's alpha, or they would paint a rectangle. */}
        <span className="duotone-tint cutout-mask" />
        <span className="duotone-glow cutout-mask" />
      </div>

      {/* Only phones need a scrim: there the figure sits behind the copy. */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/55 to-transparent lg:hidden" />
      <div className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-background to-transparent" />
    </motion.div>
  )
}

/** A live readout, in the spirit of an instrument panel. */
function StatusStrip({ ready }: { ready: boolean }) {
  const { active } = useDomainState()
  const focus =
    active === 'all'
      ? domainList.map((d) => d.label).join(' · ')
      : domains[active].title

  return (
    <motion.dl
      initial={{ opacity: 0, y: 14 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ delay: 0.68, duration: 0.7, ease: EASE_OUT }}
      // Two columns: labels size to the widest of them, values all start on the
      // same line. Same structure on a phone and on a desktop.
      className="hud-corner grid w-full max-w-md grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 rounded-md border border-border bg-background/70 px-4 py-3 font-mono text-[10px]"
    >

      <dt className="tracking-[0.14em] text-muted-foreground uppercase">Based</dt>
      <dd className="text-foreground/90">{site.location}</dd>

      <dt className="tracking-[0.14em] text-muted-foreground uppercase">Focus</dt>
      <dd className="text-foreground/90">{focus}</dd>
    </motion.dl>
  )
}

