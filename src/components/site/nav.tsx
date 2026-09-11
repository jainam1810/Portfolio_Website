import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { Dialog, VisuallyHidden } from 'radix-ui'
import { ArrowUpRight, X } from 'lucide-react'
import { navItems, site } from '@/data/site'
import { useActiveSection, useScrollTo } from '@/hooks/use-portfolio'
import { DomainDots, DomainSwitch } from '@/components/site/domain-switch'
import { BrandGlyph } from '@/lib/icons'
import { EASE_OUT } from '@/components/anim'
import { cn } from '@/lib/utils'

const SECTION_IDS = navItems.map((n) => n.id)

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-[var(--domain)]"
    />
  )
}

export function Nav() {
  const [condensed, setCondensed] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)
  const scrollTo = useScrollTo()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => setCondensed(y > 40))

  const go = (id: string) => {
    setOpen(false)
    // Let the dialog finish unmounting before scrolling, so focus restore
    // does not fight the smooth scroll.
    window.setTimeout(() => scrollTo(id), 60)
  }

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[65] transition-all duration-500',
          condensed ? 'py-2.5' : 'py-5',
        )}
      >
        <div
          className={cn(
            'pointer-events-none absolute inset-x-0 top-0 -bottom-8 transition-opacity duration-500',
            condensed ? 'opacity-100' : 'opacity-0',
          )}
          // A gradient rather than a backdrop-filter: this bar is fixed, so a
          // blur here would be recomputed on every single scroll frame.
          style={{
            background:
              'linear-gradient(to bottom, var(--background) 0%, var(--background) 42%, color-mix(in oklch, var(--background) 72%, transparent) 68%, transparent 100%)',
          }}
        />

        <nav className="relative mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 md:px-10">
          <button
            onClick={() => go('home')}
            className="group flex items-center gap-2.5"
            aria-label="Back to top"
          >
            <span className="grid size-8 place-items-center rounded-md border border-border bg-background/60 font-display text-[13px] leading-none text-foreground transition-colors group-hover:border-[var(--domain)] group-hover:text-[var(--domain)]">
              {site.initials}
            </span>
            <span className="hidden font-mono text-[10px] leading-tight tracking-[0.18em] text-muted-foreground uppercase sm:block">
              Jainam
              <br />
              Varia
            </span>
          </button>

          <DomainSwitch className="hidden xl:inline-flex" />
          <DomainDots className="xl:hidden" />

          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase xl:block">
              {active}
            </span>
            <button
              onClick={() => setOpen(true)}
              className="group flex items-center gap-2 rounded-full border border-border bg-background/60 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors hover:border-[var(--domain)] hover:text-[var(--domain)]"
            >
              Menu
              <span className="flex flex-col gap-[3px]">
                <span className="block h-px w-3.5 bg-current transition-transform group-hover:translate-x-0.5" />
                <span className="block h-px w-2.5 bg-current transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <MenuOverlay open={open} onOpenChange={setOpen} onNavigate={go} active={active} />
      <SectionRail active={active} onNavigate={go} />
    </>
  )
}

function MenuOverlay({
  open,
  onOpenChange,
  onNavigate,
  active,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  onNavigate: (id: string) => void
  active: string
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="fixed inset-0 z-[80] bg-background/80 backdrop-blur-2xl"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild forceMount>
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="fixed inset-0 z-[85] flex flex-col overflow-hidden focus:outline-none"
              >
                <VisuallyHidden.Root>
                  <Dialog.Title>Site navigation</Dialog.Title>
                </VisuallyHidden.Root>

                <div className="mx-auto flex min-h-0 w-full max-w-[1440px] flex-1 flex-col px-5 py-5 md:px-10">
                  <div className="flex shrink-0 items-center justify-between gap-3">
                    {/* The switcher is wider than a phone. Let it scroll inside its
                        own track rather than pushing the close button off screen. */}
                    <div className="relative min-w-0 flex-1">
                      <div className="no-scrollbar -mx-1 overflow-x-auto px-1">
                        <DomainSwitch layoutId="domain-switch-menu" size="sm" />
                      </div>
                      {/* Fade on the trailing edge so it reads as scrollable */}
                      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent sm:hidden" />
                    </div>
                    <Dialog.Close asChild>
                      <button
                        aria-label="Close menu"
                        className="grid size-9 shrink-0 place-items-center rounded-full border border-border transition-colors hover:border-[var(--domain)] hover:text-[var(--domain)]"
                      >
                        <X className="size-4" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain py-10">
                    <ul className="m-auto w-full">
                      {navItems.map((item, i) => (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.06 + i * 0.045, duration: 0.5, ease: EASE_OUT }}
                          className="border-b border-border/60"
                        >
                          <button
                            onClick={() => onNavigate(item.id)}
                            className="group flex w-full items-baseline gap-4 py-3 text-left md:py-4"
                          >
                            <span className="w-8 shrink-0 font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span
                              className={cn(
                                'font-display display-md transition-colors duration-300',
                                active === item.id
                                  ? 'text-[var(--domain)]'
                                  : 'text-foreground/70 group-hover:text-foreground',
                              )}
                            >
                              {item.label}
                            </span>
                            <ArrowUpRight className="ml-auto size-5 shrink-0 -translate-x-2 self-center opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex shrink-0 flex-wrap items-center justify-between gap-4 border-t border-border pt-5"
                  >
                    <div className="flex gap-2">
                      {site.socials.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-[var(--domain)] hover:text-[var(--domain)]"
                        >
                          <BrandGlyph name={s.icon} className="size-3.5" />
                        </a>
                      ))}
                    </div>
                    <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                      {site.location}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}

/** Vertical tick rail on the right edge - a quiet HUD position indicator. */
function SectionRail({ active, onNavigate }: { active: string; onNavigate: (id: string) => void }) {
  const [visible, setVisible] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y > 400))

  return (
    <div
      className={cn(
        'fixed top-1/2 right-4 z-[60] hidden -translate-y-1/2 flex-col items-end gap-3 transition-opacity duration-500 xl:flex',
        visible ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      {navItems.map((item) => {
        const isActive = active === item.id
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="group flex items-center gap-2.5"
            aria-label={item.label}
          >
            <span
              className={cn(
                'font-mono text-[9px] tracking-[0.18em] uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                isActive && 'opacity-70',
              )}
            >
              {item.label}
            </span>
            <span
              className={cn(
                'block h-px transition-all duration-300',
                isActive
                  ? 'w-7 bg-[var(--domain)]'
                  : 'w-3.5 bg-muted-foreground/50 group-hover:w-5 group-hover:bg-foreground',
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
