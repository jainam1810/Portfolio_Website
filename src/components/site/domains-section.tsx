import { AnimatePresence, motion } from 'motion/react'
import { Check } from 'lucide-react'
import { Section } from '@/components/site/section'
import { DomainSwitch } from '@/components/site/domain-switch'
import { useDomainState } from '@/components/domain-context'
import { domainList } from '@/data/domains'
import type { Domain } from '@/data/types'
import { EASE_OUT } from '@/components/anim'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

/**
 * The three pillars. With no domain selected all three sit side by side; select
 * one and it expands while the others collapse to vertical rails — so the
 * switcher in the nav has a visible, physical consequence.
 */
export function DomainsSection() {
  const { active } = useDomainState()

  return (
    <Section
      id="domains"
      index="02"
      eyebrow="Three domains, one discipline"
      title="Models, contracts and guardrails"
      lead="A model that scores the risk; a smart contract that settles the payment; and the guardrails that stop either being abused. I work across all three because in financial software they are not separable concerns — the interesting failures happen where they meet."
      aside={<DomainSwitch className="hidden md:inline-flex" size="sm" layoutId="domain-switch-section" />}
    >
      {/* Desktop: expanding panels */}
      <div className="hidden gap-3 lg:flex lg:min-h-[30rem]">
        {domainList.map((domain) => (
          <DesktopPanel key={domain.id} domain={domain} active={active} />
        ))}
      </div>

      {/* Mobile: every panel fully expanded, stacked */}
      <div className="flex flex-col gap-4 lg:hidden">
        {domainList.map((domain) => (
          <div
            key={domain.id}
            data-domain={domain.id}
            className="hud-corner rounded-lg border border-border bg-card/40 p-6"
          >
            <PanelHead domain={domain} />
            <PanelBody domain={domain} collapsible />
          </div>
        ))}
      </div>
    </Section>
  )
}

function DesktopPanel({ domain, active }: { domain: Domain; active: string }) {
  const isExpanded = active === domain.id
  const isAll = active === 'all'
  const isCollapsed = !isAll && !isExpanded

  return (
    <motion.div
      layout
      data-domain={domain.id}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      style={{ flexGrow: isExpanded ? 4 : isAll ? 1 : 0, flexBasis: isCollapsed ? '4.5rem' : 0 }}
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
            'radial-gradient(90% 60% at 0% 0%, color-mix(in oklch, var(--domain) 12%, transparent), transparent 70%)',
        }}
      />

      <AnimatePresence mode="wait" initial={false}>
        {isCollapsed ? (
          <motion.div
            key="rail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, delay: 0.12 }}
            className="relative flex h-full flex-col p-6 xl:p-8"
          >
            <PanelHead domain={domain} />
            <PanelBody domain={domain} compact={!isExpanded} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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

function PanelBody({
  domain,
  compact = false,
  collapsible = false,
}: {
  domain: Domain
  compact?: boolean
  /** Phones only: the full chip list is far too long to scroll past. */
  collapsible?: boolean
}) {
  // Every panel shows every group, on both desktop and mobile.
  const groups = domain.groups
  const proof = domain.proof

  const chips = (items: string[]) => (
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

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <p className="text-[13px] leading-[1.55] text-muted-foreground text-pretty">{domain.body}</p>

      {collapsible ? (
        <Accordion type="multiple" className="mt-5 border-t border-border">
          {groups.map((group) => (
            <AccordionItem key={group.name} value={group.name} className="border-b border-border">
              <AccordionTrigger className="items-center gap-3 py-3 hover:no-underline">
                <span className="eyebrow text-muted-foreground">{group.name}</span>
              </AccordionTrigger>
              <AccordionContent>{chips(group.items)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className={cn('mt-6 space-y-4', !compact && 'xl:grid xl:grid-cols-2 xl:gap-6 xl:space-y-0')}>
          {groups.map((group) => (
            <div key={group.name}>
              <p className="eyebrow mb-2 text-muted-foreground/80">{group.name}</p>
              {chips(group.items)}
            </div>
          ))}
        </div>
      )}

      <ul className="mt-auto space-y-2 border-t border-border pt-5">
        {proof.map((point) => (
          <li key={point} className="flex gap-2.5 text-[12.5px] leading-[1.5] text-foreground/80">
            <Check className="mt-0.5 size-3.5 shrink-0 text-[var(--domain)]" />
            <span className="text-pretty">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
