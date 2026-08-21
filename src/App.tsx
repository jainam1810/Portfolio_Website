import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ReactLenis } from 'lenis/react'
import type { LenisRef } from 'lenis/react'
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
  const lenisRef = useRef<LenisRef>(null)

  useKonami()

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1500)
    return () => window.clearTimeout(timer)
  }, [])

  // Expose the instance so smooth-scroll navigation can route through Lenis.
  useEffect(() => {
    const w = window as unknown as { lenis?: unknown }
    w.lenis = lenisRef.current?.lenis
    return () => {
      delete w.lenis
    }
  }, [loading])

  return (
    <DomainProvider>
      <Tooltip.Provider delayDuration={200}>
        <ReactLenis root ref={lenisRef} options={{ lerp: 0.11, wheelMultiplier: 0.9 }}>
          <AnimatePresence>{loading && <Loader />}</AnimatePresence>

          <div className="grain-overlay" aria-hidden />
          <ScrollProgress />
          <Nav />

          <main>
            <Hero />
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
        </ReactLenis>
      </Tooltip.Provider>
    </DomainProvider>
  )
}

function Loader() {
  return (
    <motion.div
      exit={{ opacity: 0, filter: 'blur(6px)' }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
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
