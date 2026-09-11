import { useState } from 'react'
import { HeartHandshake, IdCard, Trophy } from 'lucide-react'
import { Section } from '@/components/site/section'
import { Reveal } from '@/components/anim'
import { activities } from '@/data/misc'
import type { Activity } from '@/data/types'

const ICONS = {
  trophy: Trophy,
  hands: HeartHandshake,
  card: IdCard,
} as const

export function ActivitiesSection() {
  return (
    <Section
      id="activities"
      index="08"
      eyebrow="Outside the code"
      title="Extra-curricular Activities"
      lead="I captained my college cricket team to its first ever trophy. I have volunteered with BAPS since I was thirteen, and I help run events for the Business and Finance Society at Exeter."
    >
      <div className="grid gap-3 md:grid-cols-3">
        {activities.map((activity, i) => (
          <ActivityCard key={activity.org} activity={activity} delay={i * 0.08} />
        ))}
      </div>
    </Section>
  )
}

function ActivityCard({ activity, delay }: { activity: Activity; delay: number }) {
  const Icon = ICONS[activity.icon]
  // Falls back to the icon if the logo file has not been added yet.
  const [showLogo, setShowLogo] = useState(Boolean(activity.logo))

  return (
    <Reveal
      delay={delay}
      className="hud-corner flex flex-col rounded-lg border border-border bg-card/30 p-5 transition-colors duration-500 hover:border-[color-mix(in_oklch,var(--domain)_35%,transparent)]"
    >
      <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-md border border-[var(--domain)]/25 bg-[var(--domain)]/[0.07]">
        {showLogo && activity.logo ? (
          <img
            src={activity.logo}
            alt=""
            loading="lazy"
            onError={() => setShowLogo(false)}
            // A missing file is often served back as index.html with a 200, so
            // onError never fires. A decoded image with no width is the tell.
            onLoad={(e) => {
              if (e.currentTarget.naturalWidth === 0) setShowLogo(false)
            }}
            className="size-full object-contain p-0.5"
          />
        ) : (
          <Icon className="size-4 text-[var(--domain)]" />
        )}
      </span>

      <h3 className="mt-4 text-base font-semibold text-foreground">{activity.role}</h3>
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

      <div className="mt-auto flex flex-wrap gap-1.5 pt-4 lg:flex-nowrap">
        {activity.tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-border/70 px-2 py-1 font-mono text-[10px] whitespace-nowrap text-muted-foreground lg:px-1.5 lg:text-[9px]"
          >
            {tag}
          </span>
        ))}
      </div>
    </Reveal>
  )
}
