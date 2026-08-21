import { site } from '@/data/site'
import { domainList } from '@/data/domains'
import { useDomainState } from '@/components/domain-context'
import { useScrollTo } from '@/hooks/use-portfolio'
import { BrandGlyph } from '@/lib/icons'

export function Footer() {
  const scrollTo = useScrollTo()
  const { setActive } = useDomainState()

  return (
    <footer className="relative overflow-hidden border-t border-border pt-16">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 100% at 50% 100%, color-mix(in oklch, var(--domain) 12%, transparent), transparent 70%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-10 xl:pr-28">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="eyebrow text-muted-foreground">Available for work</p>
            <button
              onClick={() => scrollTo('contact')}
              className="group mt-3 block text-left font-display display-lg text-foreground transition-colors duration-500 hover:text-[var(--domain)]"
            >
              Let&rsquo;s talk
              <span className="ml-3 inline-block transition-transform duration-500 group-hover:translate-x-2">
                &rarr;
              </span>
            </button>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 inline-block font-mono text-xs tracking-[0.12em] text-muted-foreground transition-colors hover:text-[var(--domain)]"
            >
              {site.email}
            </a>
          </div>

          <div className="flex gap-2">
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="grid size-10 place-items-center rounded-md border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--domain)] hover:text-[var(--domain)]"
              >
                <BrandGlyph name={social.icon} className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Oversized wordmark, cropped by the viewport edge */}
        <div className="fade-edges mt-16 select-none">
          <p className="stroke-text font-display text-center leading-[0.8] whitespace-nowrap [font-size:clamp(3.5rem,17vw,15rem)]">
            {site.name}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border py-6">
          <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
            © 2026 {site.name} — All rights reserved
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {domainList.map((domain) => (
              <button
                key={domain.id}
                data-domain={domain.id}
                onClick={() => setActive(domain.id)}
                className="rounded-full border border-border px-2.5 py-1 font-mono text-[9px] tracking-[0.16em] text-muted-foreground uppercase transition-colors duration-300 hover:border-[var(--domain)] hover:text-[var(--domain)]"
              >
                {domain.index} {domain.label}
              </button>
            ))}
          </div>

          <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
            Built in Exeter, UK
          </p>
        </div>
      </div>
    </footer>
  )
}
