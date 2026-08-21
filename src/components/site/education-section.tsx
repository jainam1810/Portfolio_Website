import { motion } from 'motion/react'
import { CalendarDays, HeartHandshake, IdCard, MapPin, Trophy } from 'lucide-react'
import { Section } from '@/components/site/section'
import { Reveal } from '@/components/anim'
import { activities, languages, studies } from '@/data/misc'
import type { Activity } from '@/data/types'

const ICONS = {
  trophy: Trophy,
  hands: HeartHandshake,
  card: IdCard,
} as const

export function EducationSection() {
  return (
    <Section
      id="education"
      index="06"
      eyebrow="Education, leadership & languages"
      title="The rest of the record"
      lead="Two degrees across India and the United Kingdom, a cricket captaincy, eight years of community work, and six languages."
    >
      <div className="grid gap-3 lg:grid-cols-2">
        {studies.map((study, i) => (
          <Reveal
            key={study.degree}
            delay={i * 0.08}
            className="hud-corner rounded-lg border border-border bg-card/30 p-6 transition-colors duration-500 hover:border-[color-mix(in_oklch,var(--domain)_35%,transparent)]"
          >
            <div className="flex items-start gap-4">
              <img
                src={study.logo}
                alt=""
                className="size-12 shrink-0 rounded-md object-contain"
                loading="lazy"
              />
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-foreground">{study.degree}</h3>
                <p className="text-sm font-medium text-[var(--domain)]">{study.school}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3" />
                {study.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-3" />
                {study.period}
              </span>
            </div>
            <p className="mt-3 text-[13px] leading-[1.55] text-muted-foreground text-pretty">
              {study.detail}
            </p>
          </Reveal>
        ))}
      </div>

      <SubHeading>Extra-curricular & volunteer</SubHeading>
      <div className="grid gap-3 md:grid-cols-3">
        {activities.map((activity, i) => (
          <ActivityCard key={activity.org} activity={activity} delay={i * 0.08} />
        ))}
      </div>

      <SubHeading>Languages</SubHeading>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {languages.map((language, i) => (
          <motion.div
            key={language.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: i * 0.05 }}
            className="hud-corner rounded-lg border border-border bg-card/30 p-4"
          >
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold text-foreground">{language.name}</span>
              <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                {language.value}
              </span>
            </div>
            <div className="mt-1 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
              {language.level}
            </div>
            <div className="mt-3 h-px w-full bg-border">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: language.value / 100 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="h-full origin-left bg-[var(--domain)]"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function SubHeading({ children }: { children: string }) {
  return (
    <Reveal className="mt-16 mb-7 flex items-center gap-3">
      <span className="h-px w-8 bg-[var(--domain)]" />
      <h3 className="eyebrow text-muted-foreground">{children}</h3>
      <span className="h-px flex-1 bg-border" />
    </Reveal>
  )
}

function ActivityCard({ activity, delay }: { activity: Activity; delay: number }) {
  const Icon = ICONS[activity.icon]

  return (
    <Reveal
      delay={delay}
      className="hud-corner flex flex-col rounded-lg border border-border bg-card/30 p-5 transition-colors duration-500 hover:border-[color-mix(in_oklch,var(--domain)_35%,transparent)]"
    >
      <span className="grid size-10 place-items-center rounded-md border border-[var(--domain)]/25 bg-[var(--domain)]/[0.07]">
        <Icon className="size-4 text-[var(--domain)]" />
      </span>
      <h4 className="mt-4 text-base font-semibold text-foreground">{activity.role}</h4>
      <p className="text-sm font-medium text-[var(--domain)]">{activity.org}</p>
      <p className="mt-0.5 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
        {activity.meta}
      </p>
      <ul className="mt-4 space-y-2">
        {activity.points.map((point) => (
          <li
            key={point}
            className="relative pl-4 text-[12.5px] leading-[1.5] text-muted-foreground text-pretty"
          >
            <span className="absolute top-[0.55em] left-0 size-1 rounded-full bg-[var(--domain)]/70" />
            {point}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
        {activity.tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-border/70 px-2 py-1 font-mono text-[10px] text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </Reveal>
  )
}
