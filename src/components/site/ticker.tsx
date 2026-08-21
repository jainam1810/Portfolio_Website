import { tickerTech } from '@/data/misc'
import { BrandGlyph } from '@/lib/icons'

/**
 * A slow technology ticker separating the hero from the page proper.
 *
 * Done in CSS rather than with a marquee library: the list is rendered twice
 * and translated by -50%, so the loop is seamless, honours prefers-reduced-
 * motion for free, and costs no JavaScript.
 */
export function Ticker() {
  return (
    <div className="relative border-y border-border/70 py-4">
      <div className="hud-grid pointer-events-none absolute inset-0 opacity-30" />

      <div className="fade-edges group relative overflow-hidden">
        <div
          className="flex w-max [animation:tickerScroll_58s_linear_infinite] group-hover:[animation-play-state:paused]"
          aria-hidden
        >
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0">
              {tickerTech.map((tech) => (
                <li
                  key={`${copy}-${tech}`}
                  className="group/item mx-5 inline-flex items-center gap-2 text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  <BrandGlyph
                    name={tech}
                    className="size-3.5 transition-transform duration-300 group-hover/item:scale-110"
                  />
                  <span className="font-mono text-[11px] tracking-[0.16em] whitespace-nowrap uppercase">
                    {tech}
                  </span>
                  <span className="ml-3 size-1 rounded-full bg-[var(--domain)]/40" />
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* The visible list is decorative; this keeps the content in the a11y tree once. */}
        <span className="sr-only">
          Technologies: {tickerTech.join(', ')}
        </span>
      </div>
    </div>
  )
}
