import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, FolderGit2 } from 'lucide-react'
import { Section } from '@/components/site/section'
import { DomainSwitch } from '@/components/site/domain-switch'
import { useDomainState } from '@/components/domain-context'
import { projects } from '@/data/projects'
import { domains } from '@/data/domains'
import type { Project } from '@/data/types'
import { EASE_OUT } from '@/components/anim'
import { BrandGlyph } from '@/lib/icons'
import { cn } from '@/lib/utils'

export function ProjectsSection() {
  const { active, matches } = useDomainState()
  const visible = projects.filter((p) => matches(p.domains))

  return (
    <Section
      id="projects"
      index="03"
      eyebrow={`${visible.length} of ${projects.length} shown`}
      title="Things I have shipped"
      lead="Smart contracts, forecasting models, settlement infrastructure and the security work that holds them together. Every figure below is measured, and every repository is public."
      aside={<DomainSwitch className="hidden md:inline-flex" size="sm" layoutId="domain-switch-projects" />}
    >
      {/* Every card is the same width, and the clamped copy below keeps every
          card the same height too - so the grid stays a clean matrix. */}
      <motion.div layout className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </AnimatePresence>

        {active === 'all' && <GithubCard />}
      </motion.div>
    </Section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      layout
      data-domain={project.primary}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, ease: EASE_OUT, layout: { duration: 0.5, ease: EASE_OUT } }}
      className="hud-corner group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card/30 p-5 transition-colors duration-500 hover:border-[color-mix(in_oklch,var(--domain)_40%,transparent)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(80% 55% at 50% 0%, color-mix(in oklch, var(--domain) 10%, transparent), transparent 70%)',
        }}
      />

      {/* Row 1 - index / year / status */}
      <div className="relative flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="flex items-center gap-2 font-mono text-[9px] tracking-[0.14em] text-muted-foreground uppercase">
          {project.year}
          <span
            className={cn(
              'rounded-full border px-2 py-0.5',
              project.status === 'Live'
                ? 'border-[var(--domain)]/40 text-[var(--domain)]'
                : 'border-border',
            )}
          >
            {project.status}
          </span>
        </span>
      </div>

      {/* Cards stay uniform through the grid, not by truncating content:
          items in a row stretch to equal height and the links pin to the bottom. */}
      <h3 className="relative mt-3 font-display display-sm text-foreground transition-colors duration-500 group-hover:text-[var(--domain)]">
        {project.title}
      </h3>

      {/* Row 3 - domain tags */}
      <div className="relative mt-2 flex flex-wrap gap-1.5">
        {project.domains.map((d) => (
          <span
            key={d}
            data-domain={d}
            className="rounded-full border border-[var(--domain)]/35 px-2 py-0.5 font-mono text-[9px] tracking-[0.12em] text-[var(--domain)] uppercase"
          >
            {domains[d].label}
          </span>
        ))}
      </div>

      {/* Row 4 - summary, fixed at three lines */}
      <p className="relative mt-3 text-[13px] leading-[1.45] text-muted-foreground">
        {project.summary}
      </p>

      {/* Row 5 - result, fixed at four lines */}
      <div className="relative mt-3 rounded-md border border-[var(--domain)]/15 bg-[var(--domain)]/[0.06] p-3">
        <p className="eyebrow mb-1 text-[9px] text-[var(--domain)]">Result</p>
        <p className="text-[12.5px] leading-[1.45] text-foreground/85">
          {project.impact}
        </p>
      </div>

      {/* Row 6 - stack, capped to one row's worth */}
      <ul className="relative mt-3 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="flex items-center gap-1.5 rounded border border-border/70 px-1.5 py-0.5 font-mono text-[9.5px] text-muted-foreground"
          >
            <BrandGlyph name={tech} className="size-2.5" />
            {tech}
          </li>
        ))}
      </ul>

      {/* Row 7 - links, pinned to the bottom of every card */}
      <div className="relative mt-auto flex flex-wrap gap-1.5 pt-4">
        {project.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-[10px] tracking-wide transition-all duration-300',
              link.kind === 'live'
                ? 'bg-[var(--domain)] text-background hover:brightness-110'
                : 'border border-border text-muted-foreground hover:border-[var(--domain)] hover:text-[var(--domain)]',
            )}
          >
            {link.kind === 'repo' && <BrandGlyph name="github" className="size-2.5" />}
            {link.label}
            <ArrowUpRight className="size-2.5" />
          </a>
        ))}
      </div>
    </motion.article>
  )
}

function GithubCard() {
  return (
    <motion.a
      layout
      href="https://github.com/jainam1810"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: EASE_OUT }}
      className="hud-corner group relative flex h-full flex-col justify-between overflow-hidden rounded-lg border border-dashed border-border p-5 transition-colors duration-500 hover:border-[var(--domain)]"
    >
      <FolderGit2 className="size-5 text-muted-foreground transition-colors duration-500 group-hover:text-[var(--domain)]" />
      <div className="mt-6">
        <h3 className="font-display display-sm text-foreground">More on GitHub</h3>
        <p className="mt-2 text-[13px] leading-[1.45] text-muted-foreground">
          Experiments, hackathon builds and work in progress live in the repositories.
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wide text-[var(--domain)]">
          <BrandGlyph name="github" className="size-2.5" />
          github.com/jainam1810
          <ArrowUpRight className="size-2.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </motion.a>
  )
}
