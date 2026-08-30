import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { ArrowDown, Download } from 'lucide-react'
import { useRef, useState } from 'react'
import { site } from '@/data/site'
import { domainList } from '@/data/domains'
import { useDomainState } from '@/components/domain-context'
import { useScrollTo, useTypewriter } from '@/hooks/use-portfolio'
import { EASE_OUT } from '@/components/anim'
import { BrandGlyph } from '@/lib/icons'
import { cn } from '@/lib/utils'

/* Drop a transparent PNG at public/profile-cutout.png and the hero picks it up
   automatically; until then it falls back to the original photo. */
const CUTOUT = '/profile-cutout.png'
const FALLBACK_PHOTO = '/profile.jpg'

export function Hero({ ready = true }: { ready?: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const typed = useTypewriter(site.taglines)
  const scrollTo = useScrollTo()
  const { active } = useDomainState()

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
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(65% 55% at 62% 20%, color-mix(in oklch, var(--domain) 16%, transparent), transparent 70%)',
        }}
      />

      <Portrait y={portraitY} ready={ready} />

      {/* Left edge marker */}
      <span className="writing-vertical absolute top-1/2 left-4 hidden -translate-y-1/2 font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase xl:block">
        Portfolio — MMXXVI
      </span>

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

        {/* Each word names something that exists in a repository: models,
            smart contracts, and the guardrails around them. */}
        <h1 className="font-display display-xl text-foreground">
          <span className="flex flex-wrap items-baseline gap-x-[0.2em]">
            <Word text={site.heroLead} delay={0.1} ready={ready} />
            <Word
              text={`${domainList[0].word}.`}
              domain={domainList[0].id}
              delay={0.24}
              ready={ready}
              dimmed={active !== 'all' && active !== domainList[0].id}
            />
          </span>
          <span className="mt-1 flex flex-wrap items-baseline gap-x-[0.2em]">
            {domainList.slice(1).map((d, i) => (
              <Word
                key={d.id}
                text={`${d.word}.`}
                domain={d.id}
                delay={0.38 + i * 0.14}
                ready={ready}
                dimmed={active !== 'all' && active !== d.id}
              />
            ))}
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.5, duration: 0.7, ease: EASE_OUT }}
          className="mt-9 max-w-lg"
        >
          <p className="min-h-[1.7em] font-mono text-sm text-[var(--domain)]">
            {typed}
            <span className="ml-0.5 inline-block h-[1.05em] w-px translate-y-[0.15em] bg-[var(--domain)] [animation:caret_1s_step-end_infinite]" />
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
            {site.intro}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2.5">
            {/* Both CVs share one row on every width; each takes half a phone. */}
            <div className="flex gap-2.5">
              {site.cvs.map((cv, i) => (
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
                  <span className="flex min-w-0 flex-col leading-tight">
                    <span className="truncate">{cv.label}</span>
                    <span className="truncate font-mono text-[9px] tracking-[0.12em] uppercase opacity-60">
                      {cv.note}
                    </span>
                  </span>
                </a>
              ))}
            </div>

            <div className="flex gap-1.5 sm:ml-1">
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
          </div>

          <StatusStrip ready={ready} />
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

/** One word of the headline: fades and eases up to full size. */
function Word({
  text,
  domain,
  delay,
  ready,
  dimmed = false,
}: {
  text: string
  domain?: string
  delay: number
  ready: boolean
  dimmed?: boolean
}) {
  // Reduced motion still gets a fade - opacity is not motion. Previously this
  // disabled the entrance outright, which looked like nothing happening at all.
  const reduced = useReducedMotion()
  const from = reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }
  const to = reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }

  return (
    // Two layers on purpose: the outer one owns the entrance, the inner one owns
    // the dimmed state. Nested opacity multiplies, so neither fights the other.
    <motion.span
      className="inline-block"
      initial={from}
      animate={ready ? to : from}
      transition={{ duration: 0.85, delay, ease: EASE_OUT }}
    >
      <span
        data-domain={domain}
        className={cn(
          'inline-block transition-all duration-500',
          domain ? 'text-[var(--domain)]' : 'text-foreground',
          dimmed && 'opacity-25 blur-[1.5px]',
        )}
      >
        {text}
      </span>
    </motion.span>
  )
}

/**
 * The cut-out portrait, anchored bottom-right and sitting behind the headline
 * so the type crosses over it.
 */
function Portrait({ y, ready }: { y: MotionValue<string>; ready: boolean }) {
  // Flips to false if the cut-out is absent, so the hero never shows a broken image.
  const [cutout, setCutout] = useState(true)

  return (
    <motion.div
      style={{ y }}
      initial={{ opacity: 0, scale: 1.04 }}
      animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
      transition={{ duration: 1.3, delay: 0.2, ease: EASE_OUT }}
      className="pointer-events-none absolute right-0 bottom-0 z-10 h-[62%] w-[80%] origin-bottom-right opacity-35 sm:h-[74%] sm:w-[64%] sm:opacity-60 lg:h-[88%] lg:w-[46%] lg:opacity-100 xl:right-[3%] xl:w-[42%]"
    >
      <div
        className={cn('duotone-wrap relative size-full', !cutout && 'photo-vignette')}
        style={cutout ? ({ '--cutout': `url(${CUTOUT})` } as React.CSSProperties) : undefined}
      >
        <img
          src={cutout ? CUTOUT : FALLBACK_PHOTO}
          alt="Jainam Varia"
          onError={() => setCutout(false)}
          className={cn('size-full', cutout ? 'object-contain object-bottom' : 'object-cover')}
          style={cutout ? undefined : { objectPosition: '36% 22%' }}
          loading="eager"
          decoding="async"
        />
        <span className={cn('duotone-tint', cutout && 'cutout-mask')} />
        <span className={cn('duotone-glow', cutout && 'cutout-mask')} />
      </div>

      {/* Scrim: keeps the left-hand copy readable where it crosses the figure.
          A cut-out needs far less of it than a full rectangle does. */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-r from-background to-transparent',
          cutout ? 'via-background/55 lg:via-transparent' : 'via-background/75 lg:via-background/20',
        )}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-background to-transparent" />
    </motion.div>
  )
}

/** A live readout, in the spirit of an instrument panel. */
function StatusStrip({ ready }: { ready: boolean }) {
  const { active } = useDomainState()
  const focus =
    active === 'all'
      ? 'AI/ML · Blockchain · Security'
      : domainList.find((d) => d.id === active)?.title

  return (
    <motion.dl
      initial={{ opacity: 0, y: 14 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ delay: 0.68, duration: 0.7, ease: EASE_OUT }}
      className="hud-corner mt-8 flex flex-col gap-2 rounded-md border border-border bg-background/70 px-4 py-3 font-mono text-[10px] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2"
    >
      <div className="flex items-center gap-2 border-b border-border pb-2 text-[var(--domain)] sm:border-0 sm:pb-0">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-70" />
          <span className="relative inline-flex size-1.5 rounded-full bg-current" />
        </span>
        <span className="tracking-[0.18em] uppercase">Live</span>
      </div>

      {[
        ['Based', site.location],
        ['Focus', focus ?? ''],
      ].map(([k, v]) => (
        <div key={k} className="flex items-baseline justify-between gap-3 sm:justify-start sm:gap-2">
          <dt className="tracking-[0.14em] text-muted-foreground uppercase">{k}</dt>
          <dd className="text-right text-foreground/90 sm:text-left">{v}</dd>
        </div>
      ))}
    </motion.dl>
  )
}
