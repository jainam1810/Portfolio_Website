import { motion } from 'motion/react'
import { CalendarDays, MapPin } from 'lucide-react'
import { Section } from '@/components/site/section'
import { useDomainState } from '@/components/domain-context'
import { roles } from '@/data/experience'
import { domains } from '@/data/domains'
import type { DomainId, Role } from '@/data/types'
import { EASE_OUT } from '@/components/anim'
import { cn } from '@/lib/utils'

export function ExperienceSection() {
  const { active, matches } = useDomainState()
  const matchCount = roles.filter((r) => matches(r.domains)).length

  return (
    <Section
      id="experience"
      index="05"
      eyebrow="Where I've worked"
      title="Experience"
      lead="Trading desk. A clothing brand I started and ran. An Amazon warehouse. Research, and now building softwares. Pick a domain above and the relevant roles light up, but nothing disappears."
    >
      {active !== 'all' && (
        <p className="mb-6 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
          <span className="text-[var(--domain)]">{matchCount}</span> of {roles.length} roles fed into{' '}
          <span className="text-[var(--domain)]">{domains[active as DomainId].label}</span>
        </p>
      )}

      <div className="relative">
        {/* Spine */}
        <div className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-[var(--domain)]/60 via-border to-transparent md:left-[9px]" />

        <ol className="max-w-5xl space-y-4">
          {roles.map((role, i) => (
            <RoleRow
              key={`${role.company}-${role.title}`}
              role={role}
              index={i}
              filtering={active !== 'all'}
              matched={matches(role.domains)}
            />
          ))}
        </ol>
      </div>
    </Section>
  )
}

/**
 * While a domain is selected, matching roles gain an accent edge and a lit node.
 * Nothing is faded out: greying four of six cards reads as broken, and low
 * contrast is also a problem for screen readers, which cannot see "dimmed".
 */
function RoleRow({
  role,
  index,
  filtering,
  matched,
}: {
  role: Role
  index: number
  filtering: boolean
  matched: boolean
}) {
  const lit = !filtering || matched
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: Math.min(index * 0.05, 0.25), ease: EASE_OUT }}
      className="relative pl-8 transition-all duration-500 md:pl-12"
    >
      <span
        className={cn(
          'absolute top-7 left-0 size-3.5 rounded-full border-2 border-background transition-colors duration-500 md:size-[19px]',
          lit ? 'bg-[var(--domain)]' : 'bg-muted-foreground/60',
        )}
        style={lit ? { boxShadow: '0 0 0 4px color-mix(in oklch, var(--domain) 14%, transparent)' } : undefined}
      />

      <div
        className={cn(
          'hud-corner rounded-lg border bg-card/30 p-5 transition-colors duration-500 md:p-6',
          filtering && matched
            ? 'border-[color-mix(in_oklch,var(--domain)_45%,transparent)]'
            : 'border-border hover:border-[color-mix(in_oklch,var(--domain)_35%,transparent)]',
        )}
      >
        <div className="flex flex-wrap items-start gap-4">
          <img
            src={role.logo}
            alt=""
            className="size-11 shrink-0 rounded-md bg-white object-contain p-1"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-foreground md:text-base">{role.title}</h3>
            <p className="text-[13px] font-medium text-[var(--domain)]">{role.company}</p>
          </div>

          <div className="flex flex-col items-start gap-1 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase sm:items-end">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3" />
              {role.period}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3" />
              {role.location}
            </span>
          </div>
        </div>

        <ul className="mt-4 space-y-2">
          {role.points.map((point) => (
            <li
              key={point}
              className="relative pl-4 text-[13px] leading-[1.55] text-muted-foreground text-pretty"
            >
              <span className="absolute top-[0.55em] left-0 size-1 rounded-full bg-[var(--domain)]/70" />
              {point}
            </li>
          ))}
        </ul>

        {/* Tags and domain pills share one row from lg up. The widest role is
            five tags plus three pills, which needs about 5% more than the card
            gives it - so the type and the padding step down rather than the row
            wrapping a single pill onto a line of its own. */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5 lg:flex-nowrap lg:gap-1">
          {role.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-border/70 bg-background/40 px-2 py-1 font-mono text-[10px] whitespace-nowrap text-muted-foreground lg:px-1.5 lg:text-[9px]"
            >
              {tag}
            </span>
          ))}
          {role.domains.map((d) => (
            <span
              key={d}
              data-domain={d}
              className="rounded-full border border-[var(--domain)]/35 px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] whitespace-nowrap text-[var(--domain)] uppercase lg:px-1.5 lg:text-[8.5px] lg:tracking-[0.1em]"
            >
              {domains[d].label}
            </span>
          ))}
        </div>
      </div>
    </motion.li>
  )
}
