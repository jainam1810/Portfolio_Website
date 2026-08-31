/**
 * Every piece of content on the site is typed here and authored in `src/data`.
 * Components never hard-code copy - they read from these structures, so the
 * three-domain filtering stays consistent everywhere.
 */

export type DomainId = 'ml' | 'chain' | 'sec'
export type DomainFilter = DomainId | 'all'

export interface Domain {
  id: DomainId
  index: string
  /** Short label used in the switcher */
  label: string
  /** The noun this domain contributes to the hero line - each maps to real work */
  word: string
  /** Full section title */
  title: string
  /** One-line positioning statement */
  statement: string
  /** Two or three sentences of substance */
  body: string
  /** Concrete capabilities, grouped */
  groups: { name: string; items: string[] }[]
  /** Proof points that link back to real work */
  proof: string[]
}

export interface Project {
  slug: string
  title: string
  year: string
  /** Primary domain determines the accent; `domains` drives filtering */
  primary: DomainId
  domains: DomainId[]
  /** Only shown when there is something worth saying. */
  status?: 'Live' | 'Dormant'
  summary: string
  /** The measurable or architectural result - the reason it matters */
  impact: string
  stack: string[]
  links: { label: string; href: string; kind: 'repo' | 'live' | 'demo' }[]
  /** Long-form write-up shown in a dialog rather than sending people away. */
  writeUp?: { label: string; title: string; body: string[]; source?: string; sourceHref?: string }
  /** Flagship projects get a larger cell in the grid */
  featured?: boolean
}

export interface Role {
  title: string
  company: string
  logo: string
  period: string
  location: string
  points: string[]
  tags: string[]
  domains: DomainId[]
}

export interface Study {
  degree: string
  school: string
  location: string
  period: string
  detail: string
  logo: string
}

export interface Activity {
  role: string
  org: string
  meta: string
  points: string[]
  tags: string[]
  /** Falls back to `icon` if the file is missing. */
  logo?: string
  icon: 'trophy' | 'hands' | 'card'
}

export interface Language {
  name: string
  level: string
  value: number
}

export interface SkillGroup {
  name: string
  domains: DomainId[]
  items: string[]
}
