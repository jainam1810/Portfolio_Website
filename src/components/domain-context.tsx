import { createContext, use, useEffect, useMemo, useState } from 'react'
import type { DomainFilter } from '@/data/types'

interface DomainState {
  active: DomainFilter
  setActive: (d: DomainFilter) => void
  /** True when no single domain is selected */
  isAll: boolean
  /** Whether an item tagged with these domains should be emphasised */
  matches: (domains: DomainFilter[] | readonly DomainFilter[]) => boolean
}

const DomainContext = createContext<DomainState | null>(null)

export function DomainProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<DomainFilter>('all')

  // Setting the attribute on <html> lets --domain animate once and every
  // descendant - including fixed chrome and portalled dialogs - inherit it.
  useEffect(() => {
    document.documentElement.dataset.domain = active
  }, [active])

  const value = useMemo<DomainState>(
    () => ({
      active,
      setActive,
      isAll: active === 'all',
      matches: (domains) => active === 'all' || domains.includes(active),
    }),
    [active],
  )

  return <DomainContext value={value}>{children}</DomainContext>
}

export function useDomainState() {
  const ctx = use(DomainContext)
  if (!ctx) throw new Error('useDomainState must be used inside <DomainProvider>')
  return ctx
}
