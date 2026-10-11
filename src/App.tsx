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
import { ContributionsSection } from '@/components/site/contributions-section'
import { ExperienceSection } from '@/components/site/experience-section'
import { SkillsSection } from '@/components/site/skills-section'
import { EducationSection } from '@/components/site/education-section'
import { ActivitiesSection } from '@/components/site/activities-section'
import { ContactSection } from '@/components/site/contact-section'
import { Footer } from '@/components/site/footer'
import { BackToTop } from '@/components/site/back-to-top'
import { useKonami, useScrollAnchor } from '@/hooks/use-portfolio'
import { site } from '@/data/site'
import { EASE_OUT } from '@/components/anim'

/** Sections whose height changes when the domain filter changes. */
const RESIZING_SECTIONS = ['domains', 'projects', 'skills', 'experience'] as const

export default function App() {
  const [loading, setLoading] = useState(true)

  useKonami()
  useScrollAnchor(RESIZING_SECTIONS)

  // Hold the loader until the fonts are actually in, not just until a timer
  // fires. The hero headline is sized from Anton's own metrics, so painting it
  // in a fallback face wraps it wrongly and then snaps - and that fallback is a
  // different font on every operating system. Still capped, so a font that
  // never arrives cannot hold the page hostage.
  useEffect(() => {
    let settled = false
    const reveal = () => {
      if (settled) return
      settled = true
      setLoading(false)
    }

    const held = window.setTimeout(reveal, 2500)
    const wait = window.setTimeout(() => {
      const faces = document.fonts
        ? Promise.all([
            document.fonts.load('400 1rem Anton'),
            document.fonts.load('400 1rem "Geist Variable"'),
            document.fonts.load('400 1rem "JetBrains Mono Variable"'),
          ]).then(() => document.fonts.ready)
        : Promise.resolve()
      faces.then(reveal, reveal)
    }, 900)

    return () => {
      window.clearTimeout(held)
      window.clearTimeout(wait)
    }
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
            <ContributionsSection />
            <ExperienceSection />
            <SkillsSection />
            <EducationSection />
            <ActivitiesSection />
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
        {/* One line on every phone. The 0.3em tracking is what broke it: at 52
            characters that is ~468px of text in a ~350px screen, so it wrapped.
            The size is fluid and the tracking only opens up from sm, where
            there is room for it. nowrap guarantees the rest. */}
        <p className="mt-4 px-4 text-center font-mono text-[clamp(7px,2.1vw,10px)] tracking-[0.1em] whitespace-nowrap text-muted-foreground uppercase sm:tracking-[0.3em]">
          Models · Contracts · Products · Payments · Guardrails
        </p>
      </div>
    </motion.div>
  )
}
