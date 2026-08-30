import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Tooltip } from 'radix-ui'
import { DomainProvider } from '@/components/domain-context'
import { Nav, ScrollProgress } from '@/components/site/nav'
import { Hero } from '@/components/site/hero'
import { Ticker } from '@/components/site/ticker'
import { About } from '@/components/site/about'
import { DomainsSection } from '@/components/site/domains-section'
import { ProjectsSection } from '@/components/site/projects-section'
import { ExperienceSection } from '@/components/site/experience-section'
import { SkillsSection } from '@/components/site/skills-section'
import { EducationSection } from '@/components/site/education-section'
import { ContactSection } from '@/components/site/contact-section'
import { Footer } from '@/components/site/footer'
import { BackToTop } from '@/components/site/back-to-top'
import { useKonami } from '@/hooks/use-portfolio'
import { site } from '@/data/site'
import { EASE_OUT } from '@/components/anim'

export default function App() {
  const [loading, setLoading] = useState(true)

  useKonami()

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <DomainProvider>
      <Tooltip.Provider delayDuration={200}>
        <>
          <AnimatePresence>{loading && <Loader />}</AnimatePresence>

          <div className="grain-overlay" aria-hidden />
          <ScrollProgress />
          <Nav />

          <main>
            <Hero ready={!loading} />
            <Ticker />
            <About />
            <DomainsSection />
            <ProjectsSection />
            <ExperienceSection />
            <SkillsSection />
            <EducationSection />
            <ContactSection />
          </main>

          <Footer />
          <BackToTop />
        </>
      </Tooltip.Provider>
    </DomainProvider>
  )
}

function Loader() {
  return (
    <motion.div
      exit={{ opacity: 0, filter: 'blur(6px)' }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
      className="fixed inset-0 z-[200] grid place-items-center bg-background"
    >
      <div className="flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="font-display text-5xl text-foreground"
        >
          {site.initials}
        </motion.span>
        <div className="mt-5 h-px w-40 overflow-hidden bg-border">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: EASE_OUT }}
            className="h-full origin-left bg-[var(--domain)]"
          />
        </div>
        <p className="mt-4 font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
          Models · Contracts · Guardrails
        </p>
      </div>
    </motion.div>
  )
}
