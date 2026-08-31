import { motion } from 'motion/react'
import { CalendarDays, MapPin } from 'lucide-react'
import { Section } from '@/components/site/section'
import { Reveal } from '@/components/anim'
import { languages, studies } from '@/data/misc'

export function EducationSection() {
  return (
    <Section
      id="education"
      index="06"
      eyebrow="Education"
      title="Education"
      lead="Two degrees, one in Mumbai and one in Exeter. I speak six languages, badly in one of them."
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

      <Reveal className="mt-16 mb-7 flex items-center gap-3">
        <span className="h-px w-8 bg-[var(--domain)]" />
        <h3 className="eyebrow text-muted-foreground">Languages</h3>
        <span className="h-px flex-1 bg-border" />
      </Reveal>

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
            <span className="text-sm font-semibold text-foreground">{language.name}</span>
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
