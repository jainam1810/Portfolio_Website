import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, FolderGit2, PlayCircle } from 'lucide-react'
import { Section } from '@/components/site/section'
import { DomainSwitch } from '@/components/site/domain-switch'
import { useDomainState } from '@/components/domain-context'
import { projects } from '@/data/projects'
import { site } from '@/data/site'
import { domains } from '@/data/domains'
import type { Project } from '@/data/types'
import { EASE_OUT } from '@/components/anim'
import { BrandGlyph } from '@/lib/icons'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

export function ProjectsSection() {
  const { matches } = useDomainState()
  const visible = projects.filter((p) => matches(p.domains))

  return (
    <Section
      id="projects"
      index="03"
      eyebrow={`${visible.length} of ${projects.length} shown`}
      title="Projects"
      lead="Some of these are polished. One of them I stopped on purpose and wrote up why. Every number below came out of the project and the code is public if you want to check."
      aside={<DomainSwitch className="hidden md:inline-flex" size="sm" layoutId="domain-switch-projects" />}
    >
      {/* Every card is the same width, and the clamped copy below keeps every
          card the same height too - so the grid stays a clean matrix. */}
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </AnimatePresence>

        {/* Always last, and always present. The grid leaves at least one free
            cell in every domain, so this fills it rather than sitting under the
            grid as a bar - and for AI/ML and Blockchain it completes the row. */}
        <GithubCard />
      </div>
    </Section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      // `layout` was off for a long time because filtering resized the domains
      // section above this one, and the scroll correction that followed left
      // Motion animating from a viewport position that was already stale. That
      // section is a fixed-height carousel now - measured at a constant 1225px
      // across all six states, with scrollY unmoved - so the cards can glide to
      // their new places. popLayout on the parent takes leaving cards out of
      // flow first, so the rest move once rather than twice.
      layout
      data-domain={project.primary}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{
        duration: 0.35,
        ease: EASE_OUT,
        layout: { duration: 0.45, ease: EASE_OUT },
      }}
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
          {project.status && (
            <span
              className={cn(
                'rounded-full border px-2 py-0.5',
                project.status === 'Live'
                  ? 'border-[var(--domain)]/40 text-[var(--domain)]'
                  : 'border-border text-muted-foreground',
              )}
            >
              {project.status}
            </span>
          )}
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
        {project.writeUp && <WriteUpDialog writeUp={project.writeUp} />}
        {project.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-[10px] tracking-wide transition-all duration-300',
              link.kind === 'live' &&
                'bg-[var(--domain)] text-background hover:brightness-110',
              // Deliberately not a hue: the accent cycles through five colours,
              // so any fixed one clashes with at least one domain. A bright
              // neutral separates Video from the muted GitHub link in all five.
              link.kind === 'demo' &&
                'border border-foreground/45 bg-foreground/[0.08] text-foreground hover:border-foreground hover:bg-foreground/15',
              link.kind === 'repo' &&
                'border border-border text-muted-foreground hover:border-[var(--domain)] hover:text-[var(--domain)]',
            )}
          >
            {link.kind === 'repo' && <BrandGlyph name="github" className="size-2.5" />}
            {link.kind === 'demo' && <PlayCircle className="size-3" />}
            {link.label}
            <ArrowUpRight className="size-2.5" />
          </a>
        ))}
      </div>
    </motion.article>
  )
}

/** Keeps a long explanation on the page instead of sending people to LinkedIn. */
function WriteUpDialog({ writeUp }: { writeUp: NonNullable<Project['writeUp']> }) {
  return (
    <Dialog>
      <DialogTrigger className="inline-flex items-center gap-1.5 rounded-md border border-[var(--domain)]/40 px-2.5 py-1.5 font-mono text-[10px] tracking-wide text-[var(--domain)] transition-all duration-300 hover:bg-[var(--domain)]/10">
        {writeUp.label}
      </DialogTrigger>
      {/* The default dialog scrolls as one block, which slides the title under
          the top edge and reads as clipped. Header is pinned; only the body
          scrolls. */}
      <DialogContent className="flex max-h-[85dvh] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl">
        <DialogHeader className="shrink-0 border-b border-border px-6 pt-6 pb-4 pr-14">
          <DialogTitle className="font-display display-sm text-left text-foreground">
            {writeUp.title}
          </DialogTitle>
          {writeUp.source && (
            <DialogDescription asChild>
              {writeUp.sourceHref ? (
                <a
                  href={writeUp.sourceHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-1.5 text-left font-mono text-[10px] tracking-[0.14em] uppercase underline-offset-4 transition-colors hover:text-[var(--domain)] hover:underline"
                >
                  {writeUp.source}
                  <ArrowUpRight className="size-3" />
                </a>
              ) : (
                <span className="text-left font-mono text-[10px] tracking-[0.14em] uppercase">
                  {writeUp.source}
                </span>
              )}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-6 py-5">
          {writeUp.body.map((para) => (
            <p key={para.slice(0, 40)} className="text-[13px] leading-[1.6] text-muted-foreground">
              {para}
            </p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface Repo {
  name: string
  html_url: string
  language: string | null
  pushed_at: string
  owner: { avatar_url: string }
}

/** "3d", "2w", "5mo" - short enough to sit in a 10px column. */
function since(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000)
  if (days < 1) return 'today'
  if (days < 7) return `${days}d`
  if (days < 30) return `${Math.floor(days / 7)}w`
  if (days < 365) return `${Math.floor(days / 30)}mo`
  return `${Math.floor(days / 365)}y`
}

/**
 * The last cell of the grid: what is on GitHub that is not written up here.
 *
 * Repos are pulled live and the ones that already have a project card are
 * filtered out, so the card means what it says. The GitHub API allows 60
 * unauthenticated requests an hour per visitor and this costs one, and if it
 * fails the card simply renders without the list.
 */
function GithubCard() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [total, setTotal] = useState<number | null>(null)
  // The avatar rides along with the repo response, so it costs no extra request.
  const [avatar, setAvatar] = useState<string | null>(null)

  useEffect(() => {
    let live = true
    const shown = new Set(
      projects
        .flatMap((project) => project.links)
        .filter((link) => link.kind === 'repo')
        .map((link) => link.href.toLowerCase().replace(/\/+$/, '')),
    )

    // No referrer: GitHub does not need to know which page asked.
    fetch(`https://api.github.com/users/${site.githubUser}/repos?sort=pushed&per_page=100`, {
      referrerPolicy: 'no-referrer',
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((all: Repo[] | null) => {
        if (!live || !Array.isArray(all)) return
        setTotal(all.length)
        setRepos(all.filter((repo) => !shown.has(repo.html_url.toLowerCase())).slice(0, 4))
        const url = all[0]?.owner?.avatar_url
        if (url) setAvatar(`${url}&s=96`)
      })
      .catch(() => {})

    return () => {
      live = false
    }
  }, [])

  return (
    <motion.a
      href={`https://github.com/${site.githubUser}`}
      target="_blank"
      rel="noopener noreferrer"
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: EASE_OUT, layout: { duration: 0.45, ease: EASE_OUT } }}
      // Dashed rather than solid: it belongs to the grid but is not a project.
      className="hud-corner group relative flex h-full flex-col overflow-hidden rounded-lg border border-dashed border-border p-5 transition-colors duration-500 hover:border-[var(--domain)]"
    >
      <div className="flex items-start justify-between gap-3">
        {avatar ? (
          <img
            src={avatar}
            alt=""
            width={40}
            height={40}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            // A missing image is often served back as HTML with a 200, so onError
            // never fires. A decoded image with no width is the tell.
            onError={() => setAvatar(null)}
            onLoad={(e) => {
              if (e.currentTarget.naturalWidth === 0) setAvatar(null)
            }}
            className="size-10 rounded-full border border-border object-cover transition-colors duration-500 group-hover:border-[var(--domain)]"
          />
        ) : (
          <FolderGit2 className="size-5 text-muted-foreground transition-colors duration-500 group-hover:text-[var(--domain)]" />
        )}
        {total !== null && (
          <span className="font-mono text-[9px] tracking-[0.14em] text-muted-foreground uppercase">
            {total} repos
          </span>
        )}
      </div>

      <h3 className="mt-5 font-display display-sm text-foreground">More on GitHub</h3>
      <p className="mt-2 text-[13px] leading-[1.45] text-muted-foreground">
        Half-finished experiments, hackathon builds, and things I'm still poking at.
      </p>

      {repos.length > 0 && (
        <ul className="mt-5 space-y-2 border-t border-border pt-4">
          {repos.map((repo) => (
            <li
              key={repo.name}
              className="flex items-baseline gap-2 font-mono text-[10.5px] whitespace-nowrap"
            >
              <span className="min-w-0 truncate text-foreground/80">{repo.name}</span>
              <span className="ml-auto shrink-0 text-muted-foreground">
                {repo.language ?? '—'}
              </span>
              <span className="w-9 shrink-0 text-right text-muted-foreground/60">
                {since(repo.pushed_at)}
              </span>
            </li>
          ))}
        </ul>
      )}

      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-mono text-[10px] tracking-wide text-[var(--domain)]">
        <BrandGlyph name="github" className="size-2.5" />
        <span className="underline-offset-4 hover:underline">
          github.com/{site.githubUser}
        </span>
        <ArrowUpRight className="size-2.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </motion.a>
  )
}
