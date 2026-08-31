import { AnimatePresence, motion } from 'motion/react'
import { Check } from 'lucide-react'
import { Section } from '@/components/site/section'
import { DomainSwitch } from '@/components/site/domain-switch'
import { useDomainState } from '@/components/domain-context'
import { domainList } from '@/data/domains'
import type { Domain } from '@/data/types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { EASE_OUT } from '@/components/anim'
import { cn } from '@/lib/utils'

/**
 * The three pillars.
 *
 * On desktop these are full-width bands stacked down the page rather than three
 * columns side by side. Security has far more to say than the other two, and in
 * a column layout that left the shorter cards half empty. Stacked, each band is
 * only as tall as it needs to be and there are no neighbouring columns left to
 * mismatch. Choosing a domain collapses the other two to slim bars.
 *
 * Mobile is deliberately unchanged: stacked cards, groups behind chevrons.
 */
export function DomainsSection() {
  const { active } = useDomainState()

  return (
    <Section
      id="domains"
      index="02"
      eyebrow="What I actually do"
      title="About Domains"
      lead="A model that spots the risk. A contract that moves the money. Checks that keep both safe. In financial software these are not three separate jobs."
      aside={<DomainSwitch className="hidden md:inline-flex" size="sm" layoutId="domain-switch-section" />}
    >
      {/* Desktop: stacked full-width bands when showing everything, and a row
          of one open band plus two vertical rails once a domain is picked.
          Motion's `layout` FLIPs between the two, which is the only way to
          animate a flex-direction change. */}
      <motion.div
        layout
        transition={{ layout: { duration: 0.55, ease: EASE_OUT } }}
        className={cn('hidden gap-3 lg:flex', active === 'all' ? 'flex-col' : 'flex-row')}
      >
        {domainList.map((domain) => (
          <DesktopBand key={domain.id} domain={domain} active={active} />
        ))}
      </motion.div>

      {/* Mobile: stacked cards, groups behind chevrons */}
      <div className="flex flex-col gap-4 lg:hidden">
        {domainList.map((domain) => (
          <div
            key={domain.id}
            data-domain={domain.id}
            className="hud-corner rounded-lg border border-border bg-card/40 p-6"
          >
            <PanelHead domain={domain} />
            <MobileBody domain={domain} />
          </div>
        ))}
      </div>
    </Section>
  )
}

/** Shared chip list. */
function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="rounded border border-border/80 bg-background/50 px-2 py-1 font-mono text-[10px] tracking-wide text-muted-foreground transition-colors duration-300 hover:border-[var(--domain)]/50 hover:text-[var(--domain)]"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

function PanelHead({ domain }: { domain: Domain }) {
  return (
    <header className="mb-5">
      <div className="flex items-center gap-2.5">
        <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--domain)]">
          {domain.index}
        </span>
        <span className="h-px flex-1 bg-border" />
        <span className="eyebrow text-muted-foreground">{domain.label}</span>
      </div>
      <h3 className="font-display display-md mt-4 text-foreground">{domain.title}</h3>
      <p className="mt-2 font-serif text-base text-[var(--domain)] italic">{domain.statement}</p>
    </header>
  )
}

function DesktopBand({ domain, active }: { domain: Domain; active: string }) {
  const isCollapsed = active !== 'all' && active !== domain.id

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.55, ease: EASE_OUT } }}
      data-domain={domain.id}
      // perspective is what makes the rotateX below read as depth rather than
      // a vertical squash.
      style={{
        perspective: '1400px',
        flexGrow: isCollapsed ? 0 : 1,
        flexBasis: isCollapsed ? '4.75rem' : 'auto',
      }}
      className={cn(
        'hud-corner relative min-w-0 overflow-hidden rounded-lg border transition-colors duration-500',
        isCollapsed
          ? 'border-border bg-background'
          : 'border-[color-mix(in_oklch,var(--domain)_28%,transparent)] bg-card/40',
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(60% 130% at 0% 0%, color-mix(in oklch, var(--domain) 11%, transparent), transparent 70%)',
        }}
      />

      <AnimatePresence mode="wait" initial={false}>
        {isCollapsed ? (
          <motion.div
            key="rail"
            initial={{ rotateX: -80, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 80, opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE_OUT }}
            style={{ transformOrigin: 'center center', backfaceVisibility: 'hidden' }}
            className="relative flex h-full flex-col items-center justify-between py-6"
          >
            <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--domain)]">
              {domain.index}
            </span>
            <span className="writing-vertical font-display text-lg tracking-wide text-muted-foreground">
              {domain.label}
            </span>
            <span className="size-1.5 rounded-full bg-[var(--domain)]" />
          </motion.div>
        ) : (
          <motion.div
            key="full"
            initial={{ rotateX: 80, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -80, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            style={{ transformOrigin: 'center center', backfaceVisibility: 'hidden' }}
            className="relative p-8"
          >
            <PanelHead domain={domain} />

            <p className="max-w-4xl text-[13px] leading-[1.55] text-muted-foreground text-pretty">
              {domain.body}
            </p>

            {/* auto-fit: three groups make three columns, four make four, so a
                band is never taller than it has to be. */}
            <div className="mt-7 grid gap-x-8 gap-y-6 grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]">
              {domain.groups.map((group) => (
                <div key={group.name}>
                  <p className="eyebrow mb-2.5 text-muted-foreground/80">{group.name}</p>
                  <Chips items={group.items} />
                </div>
              ))}
            </div>

            <ul className="mt-7 grid gap-x-8 gap-y-2.5 border-t border-border pt-5 grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]">
              {domain.proof.map((point) => (
                <li
                  key={point}
                  className="flex gap-2.5 text-[12.5px] leading-[1.5] text-foreground/80"
                >
                  <Check className="mt-0.5 size-3.5 shrink-0 text-[var(--domain)]" />
                  <span className="text-pretty">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/** Phones only: the full chip list is far too long to scroll past. */
function MobileBody({ domain }: { domain: Domain }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <p className="text-[13px] leading-[1.55] text-muted-foreground text-pretty">{domain.body}</p>

      <Accordion type="multiple" className="mt-5 border-t border-border">
        {domain.groups.map((group) => (
          <AccordionItem key={group.name} value={group.name} className="border-b border-border">
            <AccordionTrigger className="items-center gap-3 py-3 hover:no-underline">
              <span className="eyebrow text-muted-foreground">{group.name}</span>
            </AccordionTrigger>
            <AccordionContent>
              <Chips items={group.items} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <ul className="mt-6 space-y-2 border-t border-border pt-5">
        {domain.proof.map((point) => (
          <li key={point} className="flex gap-2.5 text-[12.5px] leading-[1.5] text-foreground/80">
            <Check className="mt-0.5 size-3.5 shrink-0 text-[var(--domain)]" />
            <span className="text-pretty">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
