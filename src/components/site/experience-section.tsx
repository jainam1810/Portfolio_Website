import { motion } from 'motion/react'
import { CalendarDays, MapPin } from 'lucide-react'
import { Section } from '@/components/site/section'
import { useDomainState } from '@/components/domain-context'
import { roles } from '@/data/experience'
import { domains } from '@/data/domains'
import type { Role } from '@/data/types'
import { EASE_OUT } from '@/components/anim'
import { cn } from '@/lib/utils'

export function ExperienceSection() {
  const { active, matches } = useDomainState()

  return (
    <Section
      id="experience"
      index="04"
      eyebrow="Six roles, four years"
      title="From trading floors to production code"
      lead="A career built sideways rather than straight up — markets, a clothing brand, a warehouse floor, research, and now shipping software. Filtering by domain highlights the roles that fed each one; nothing is hidden, because all of it counts."
    >
      <div className="relative">
        {/* Spine */}
        <div className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-[var(--domain)]/60 via-border to-transparent md:left-[9px]" />

        <ol className="max-w-5xl space-y-4">
          {roles.map((role, i) => (
            <RoleRow
              key={`${role.company}-${role.title}`}
              role={role}
              index={i}
              dimmed={active !== 'all' && !matches(role.domains)}
            />
          ))}
        </ol>
      </div>
    </Section>
  )
}

function RoleRow({ role, index, dimmed }: { role: Role; index: number; dimmed: boolean }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: Math.min(index * 0.05, 0.25), ease: EASE_OUT }}
      className={cn(
        'relative pl-8 transition-all duration-500 md:pl-12',
        dimmed && 'opacity-35 saturate-0',
      )}
    >
      <span
        className={cn(
          'absolute top-7 left-0 size-3.5 rounded-full border-2 border-background md:size-[19px]',
          dimmed ? 'bg-muted-foreground' : 'bg-[var(--domain)]',
        )}
        style={dimmed ? undefined : { boxShadow: '0 0 0 4px color-mix(in oklch, var(--domain) 14%, transparent)' }}
      />

      <div className="hud-corner rounded-lg border border-border bg-card/30 p-5 transition-colors duration-500 hover:border-[color-mix(in_oklch,var(--domain)_35%,transparent)] md:p-6">
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

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
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

        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {role.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-border/70 bg-background/40 px-2 py-1 font-mono text-[10px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {role.domains.map((d) => (
            <span
              key={d}
              data-domain={d}
              className="rounded-full border border-[var(--domain)]/35 px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] text-[var(--domain)] uppercase"
            >
              {domains[d].label}
            </span>
          ))}
        </div>
      </div>
    </motion.li>
  )
}
