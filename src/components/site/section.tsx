import { AccentRule, Reveal, WordReveal } from '@/components/anim'
import { cn } from '@/lib/utils'

/**
 * Consistent section shell: numbered eyebrow, oversized display heading,
 * optional lead paragraph and an optional right-hand slot for controls.
 */
export function Section({
  id,
  index,
  eyebrow,
  title,
  lead,
  aside,
  children,
  className,
  contentClassName,
}: {
  id?: string
  index: string
  eyebrow: string
  title: string
  lead?: string
  aside?: React.ReactNode
  children: React.ReactNode
  className?: string
  contentClassName?: string
}) {
  return (
    <section id={id} className={cn('defer-offscreen relative scroll-mt-24 py-20 md:py-24', className)}>
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-10 xl:pr-28">
        <header className="mb-10 md:mb-12">
          <Reveal className="flex items-center gap-3">
            <span className="font-mono text-[11px] tracking-[0.2em] text-[var(--domain)]">
              {index}
            </span>
            <AccentRule className="w-8" />
            <span className="eyebrow text-muted-foreground">{eyebrow}</span>
          </Reveal>

          <h2 className="font-display display-lg mt-5 max-w-4xl text-foreground">
            <WordReveal text={title} />
          </h2>

          {lead && (
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty">
                {lead}
              </p>
            </Reveal>
          )}

          {aside && (
            <Reveal delay={0.16} className="mt-7">
              {aside}
            </Reveal>
          )}
        </header>

        <div className={contentClassName}>{children}</div>
      </div>
    </section>
  )
}

