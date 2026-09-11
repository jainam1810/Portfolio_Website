import { motion } from 'motion/react'
import { Counter, Reveal } from '@/components/anim'
import { Section } from '@/components/site/section'
import { site } from '@/data/site'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const SPECS = [
  { k: 'MSc', v: 'Financial Technology', note: 'University of Exeter' },
  { k: 'B.Tech', v: 'Computer Engineering', note: 'K.J. Somaiya Institute of Technology' },
  { k: '5', v: 'Core domains', note: 'Pick one to filter the site' },
  { k: 'UK', v: 'Exeter, Devon', note: 'Open to opportunities' },
]

export function About() {
  return (
    <Section
      id="about"
      index="01"
      eyebrow="About"
      title="Engineer who got into markets"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          {site.about.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="mb-4 text-sm leading-[1.7] text-muted-foreground text-pretty md:text-[15px]">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="lg:col-span-5">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {SPECS.map((spec, i) => (
              <Reveal
                key={spec.k}
                delay={i * 0.07}
                className="group relative bg-background p-5 transition-colors duration-500 hover:bg-card"
              >
                <div className="font-display text-xl text-[var(--domain)] md:text-2xl">
                  {spec.k}
                </div>
                <div className="mt-1.5 text-sm font-medium text-foreground">{spec.v}</div>
                <div className="mt-0.5 font-mono text-[9.5px] tracking-[0.04em] whitespace-nowrap text-muted-foreground uppercase">
                  {spec.note}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="hud-corner mt-3 flex items-center gap-3 rounded-lg border border-border px-5 py-4">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--domain)] opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-[var(--domain)]" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                Actively exploring opportunities in AI/ML, blockchain and cybersecurity across the UK
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      <Creed />
      <StatsBand />
    </Section>
  )
}

/** The resilience paragraph, set as the emotional centre of the page. */
function Creed() {
  return (
    <Reveal className="relative mt-20 md:mt-24">
      <div
        className="pointer-events-none absolute inset-x-0 -top-16 bottom-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 50%, color-mix(in oklch, var(--domain) 9%, transparent), transparent 70%)',
        }}
      />
      <div className="mx-auto max-w-4xl text-center">
        <span
          aria-hidden
          className="font-serif text-5xl leading-none text-[var(--domain)]/40 select-none md:text-6xl"
        >
          &ldquo;
        </span>
        <blockquote className="-mt-3 font-serif text-xl leading-[1.4] text-foreground italic text-balance sm:text-2xl md:text-[1.9rem]">
          {site.creed}
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-border" />
          <span className="font-mono text-[10px] tracking-[0.24em] text-muted-foreground uppercase">
            {site.name}
          </span>
          <span className="h-px w-10 bg-border" />
        </div>
      </div>
    </Reveal>
  )
}

function StatsBand() {
  return (
    <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:mt-24 md:grid-cols-4">
      {site.stats.map((stat, i) => {
        const tile = (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: i * 0.08, duration: 0.7 }}
          className="group relative bg-background p-5 transition-colors duration-500 hover:bg-card md:p-6"
        >
          <span className="absolute top-3 right-4 font-mono text-[9px] tracking-[0.2em] text-muted-foreground/60">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="font-display text-3xl text-foreground tabular-nums transition-colors duration-500 group-hover:text-[var(--domain)] md:text-4xl">
            <Counter value={stat.value} suffix={stat.suffix} />
          </div>
          <div className="mt-2 text-sm font-medium text-foreground">{stat.label}</div>
          <div className="mt-0.5 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
            {stat.note}
          </div>
        </motion.div>
        )

        // Only the tiles carrying a hint get a tooltip.
        return 'hint' in stat && stat.hint ? (
          <Tooltip key={stat.label}>
            <TooltipTrigger asChild>{tile}</TooltipTrigger>
            <TooltipContent side="top" className="max-w-64 text-center">
              {stat.hint}
            </TooltipContent>
          </Tooltip>
        ) : (
          tile
        )
      })}
    </div>
  )
}
