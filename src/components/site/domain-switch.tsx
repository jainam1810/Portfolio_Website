import { motion } from 'motion/react'
import { useDomainState } from '@/components/domain-context'
import { domainList } from '@/data/domains'
import type { DomainFilter } from '@/data/types'
import { cn } from '@/lib/utils'

const OPTIONS: { id: DomainFilter; index: string; label: string }[] = [
  { id: 'all', index: '00', label: 'All' },
  ...domainList.map((d) => ({ id: d.id as DomainFilter, index: d.index, label: d.label })),
]

/**
 * The tri-domain switcher. Changing the selection re-themes the entire site
 * through the --domain custom property and filters projects, skills and roles.
 */
export function DomainSwitch({
  size = 'md',
  layoutId = 'domain-switch',
  className,
}: {
  size?: 'sm' | 'md'
  layoutId?: string
  className?: string
}) {
  const { active, setActive } = useDomainState()

  return (
    <div
      role="tablist"
      aria-label="Filter by domain"
      className={cn(
        'inline-flex w-max items-center gap-0.5 rounded-full border border-border/80 bg-background/90 p-1',
        className,
      )}
    >
      {OPTIONS.map((opt) => {
        const isActive = active === opt.id
        return (
          <button
            key={opt.id}
            role="tab"
            aria-selected={isActive}
            data-domain={opt.id}
            onClick={() => setActive(opt.id)}
            className={cn(
              'relative shrink-0 rounded-full font-mono whitespace-nowrap uppercase tracking-[0.14em] transition-colors duration-300',
              size === 'sm' ? 'px-2.5 py-1 text-[10px]' : 'px-3.5 py-1.5 text-[11px]',
              isActive ? 'text-background' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                className="absolute inset-0 rounded-full bg-[var(--domain)]"
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <span className={cn('tabular-nums', isActive ? 'opacity-60' : 'opacity-40')}>
                {opt.index}
              </span>
              {opt.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

/** A compact dot-only variant for tight spaces such as the mobile bar. */
export function DomainDots({ className }: { className?: string }) {
  const { active, setActive } = useDomainState()

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {OPTIONS.map((opt) => (
        <button
          key={opt.id}
          aria-label={opt.label}
          aria-pressed={active === opt.id}
          data-domain={opt.id}
          onClick={() => setActive(opt.id)}
          className={cn(
            'size-2 rounded-full transition-all duration-300',
            active === opt.id
              ? 'w-6 bg-[var(--domain)]'
              : 'bg-muted-foreground/40 hover:bg-muted-foreground',
          )}
        />
      ))}
    </div>
  )
}
