import { AnimatePresence, motion } from 'motion/react'
import { Section } from '@/components/site/section'
import { DomainSwitch } from '@/components/site/domain-switch'
import { useDomainState } from '@/components/domain-context'
import { skillGroups } from '@/data/misc'
import { EASE_OUT } from '@/components/anim'
import { BrandGlyph, hasBrandGlyph } from '@/lib/icons'
import { cn } from '@/lib/utils'

export function SkillsSection() {
  const { matches } = useDomainState()
  const visible = skillGroups.filter((g) => matches(g.domains))

  return (
    <Section
      id="skills"
      index="05"
      eyebrow="Toolkit"
      title="What I actually work with"
      lead="Listed honestly — these are the languages, models, protocols and defences I have used in projects or roles, not a keyword sweep."
      aside={<DomainSwitch className="hidden md:inline-flex" size="sm" layoutId="domain-switch-skills" />}
    >
      <motion.div layout className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((group, i) => (
            <motion.div
              key={group.name}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{
                duration: 0.5,
                delay: Math.min(i * 0.05, 0.2),
                ease: EASE_OUT,
                layout: { duration: 0.5, ease: EASE_OUT },
              }}
              data-domain={group.domains.length === 1 ? group.domains[0] : undefined}
              className="hud-corner group flex flex-col rounded-lg border border-border bg-card/30 p-5 transition-colors duration-500 hover:border-[color-mix(in_oklch,var(--domain)_35%,transparent)]"
            >
              <header className="mb-4 flex items-center gap-2.5">
                <span className="size-1.5 rounded-full bg-[var(--domain)]" />
                <h3 className="text-sm font-semibold text-foreground">{group.name}</h3>
                <span className="ml-auto font-mono text-[10px] text-muted-foreground tabular-nums">
                  {String(group.items.length).padStart(2, '0')}
                </span>
              </header>

              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className={cn(
                      'flex items-center gap-1.5 rounded border border-border/70 bg-background/40 px-2 py-1 font-mono text-[10.5px] text-muted-foreground transition-all duration-300',
                      'hover:-translate-y-0.5 hover:border-[var(--domain)]/50 hover:text-[var(--domain)]',
                    )}
                  >
                    {hasBrandGlyph(item) && <BrandGlyph name={item} className="size-2.5" />}
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}
