import {
  siChainlink,
  siCplusplus,
  siDocker,
  siEthereum,
  siEthers,
  siExpress,
  siFigma,
  siGit,
  siGithub,
  siGmail,
  siGo,
  siInstagram,
  siJavascript,
  siJupyter,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siNotion,
  siNumpy,
  siOpenjdk,
  siPandas,
  siPostgresql,
  siPrisma,
  siPython,
  siPytorch,
  siR,
  siReact,
  siScikitlearn,
  siSolana,
  siSolidity,
  siStreamlit,
  siSupabase,
  siTensorflow,
  siTypescript,
  siWeb3dotjs,
  siWhatsapp,
} from 'simple-icons'
import { cn } from '@/lib/utils'

type SimpleIcon = { title: string; hex: string; path: string }

/**
 * simple-icons has dropped several trademarked marks (LinkedIn, AWS, Power BI,
 * Tableau...). Anything absent falls back to a monogram chip, which reads as a
 * deliberate part of the HUD rather than a missing asset.
 */
const BRANDS: Record<string, SimpleIcon> = {
  python: siPython,
  pytorch: siPytorch,
  tensorflow: siTensorflow,
  'scikit-learn': siScikitlearn,
  pandas: siPandas,
  numpy: siNumpy,
  solidity: siSolidity,
  ethereum: siEthereum,
  solana: siSolana,
  chainlink: siChainlink,
  'web3.js': siWeb3dotjs,
  'ethers.js': siEthers,
  typescript: siTypescript,
  javascript: siJavascript,
  react: siReact,
  'next.js': siNextdotjs,
  'node.js': siNodedotjs,
  nestjs: siNestjs,
  'nest.js': siNestjs,
  express: siExpress,
  'express.js': siExpress,
  go: siGo,
  golang: siGo,
  java: siOpenjdk,
  'c++': siCplusplus,
  r: siR,
  postgresql: siPostgresql,
  supabase: siSupabase,
  prisma: siPrisma,
  docker: siDocker,
  git: siGit,
  streamlit: siStreamlit,
  jupyter: siJupyter,
  figma: siFigma,
  notion: siNotion,
  github: siGithub,
  gmail: siGmail,
  whatsapp: siWhatsapp,
  instagram: siInstagram,
}

/** LinkedIn's mark is no longer distributed by simple-icons, so it lives here. */
const LINKEDIN_PATH =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z'

export function BrandGlyph({
  name,
  className,
  colored = false,
}: {
  name: string
  className?: string
  colored?: boolean
}) {
  const key = name.trim().toLowerCase()

  if (key === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={cn('size-4 fill-current', className)}>
        <path d={LINKEDIN_PATH} />
      </svg>
    )
  }

  const icon = BRANDS[key]
  if (!icon) {
    return (
      <span
        aria-hidden
        className={cn(
          'inline-grid size-4 place-items-center rounded-[3px] border border-current/40 font-mono text-[7px] leading-none tracking-tighter',
          className,
        )}
      >
        {name.replace(/[^a-zA-Z0-9]/g, '').slice(0, 2).toUpperCase()}
      </span>
    )
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn('size-4', className)}
      style={colored ? { fill: `#${icon.hex}` } : undefined}
      fill={colored ? undefined : 'currentColor'}
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  )
}

export function hasBrandGlyph(name: string) {
  const key = name.trim().toLowerCase()
  return key === 'linkedin' || key in BRANDS
}
