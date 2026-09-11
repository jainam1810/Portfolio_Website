import { useState } from 'react'
import { GitHubCalendar } from 'react-github-calendar'
import 'react-activity-calendar/tooltips.css'
import { Section } from '@/components/site/section'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

/**
 * The GitHub contribution board, one year at a time like the profile page.
 *
 * `react-github-calendar` does the fetching and `react-activity-calendar`
 * underneath it ships the hover tooltips through floating-ui, so there is no
 * hand-rolled grid and no second tooltip dependency. The squares are themed
 * with color-mix on --domain, so the board re-colours with the rest of the site.
 *
 * This is its own section rather than a panel inside Projects on purpose.
 * useScrollAnchor lets the section you are reading move when it resizes, so
 * while this sat inside Projects, filtering by domain resized the grid above it
 * and carried the board off screen with no correction.
 */

/** First year with any contributions on the account. */
const START_YEAR = 2023
const THIS_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: THIS_YEAR - START_YEAR + 1 }, (_, i) => THIS_YEAR - i)

/** Five explicit levels, so the library passes them straight to `fill`. */
const LEVELS = [
  'oklch(1 0 0 / 6%)',
  'color-mix(in oklch, var(--domain) 28%, transparent)',
  'color-mix(in oklch, var(--domain) 50%, transparent)',
  'color-mix(in oklch, var(--domain) 74%, transparent)',
  'var(--domain)',
]

const dateLabel = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

/** `yyyy-MM-dd` through the Date constructor is read as UTC, which lands on the
    day before in any timezone behind it. Build the date from its parts instead. */
function formatDay(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return dateLabel.format(new Date(y, m - 1, d))
}

export function ContributionsSection() {
  const [year, setYear] = useState(THIS_YEAR)

  return (
    <Section
      id="contributions"
      index="04"
      eyebrow="Commit history"
      title="Contributions"
      lead="Every square is a day. Hover one to see how many commits it holds. This is the same board as my GitHub profile, pulled live."
      aside={
        <div className="no-scrollbar flex max-w-full gap-1 overflow-x-auto">
          {YEARS.map((y) => (
            <button
              key={y}
              onClick={() => setYear(y)}
              aria-pressed={year === y}
              className={cn(
                'shrink-0 rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.14em] transition-colors duration-300',
                year === y
                  ? 'border-[var(--domain)] bg-[var(--domain)]/10 text-[var(--domain)]'
                  : 'border-border text-muted-foreground hover:border-[var(--domain)]/50 hover:text-foreground',
              )}
            >
              {y}
            </button>
          ))}
        </div>
      }
    >
      <div className="hud-corner rounded-lg border border-border bg-card/30 p-5">
        {/* A full year is wider than a phone, so the board scrolls sideways
            rather than being squashed or cropped. */}
        <div className="no-scrollbar overflow-x-auto pb-1 text-muted-foreground">
          <GitHubCalendar
            username={site.githubUser}
            year={year}
            colorScheme="dark"
            theme={{ dark: LEVELS }}
            blockSize={11}
            blockMargin={3}
            blockRadius={2}
            fontSize={11}
            weekStart={0}
            showWeekdayLabels={['mon', 'wed', 'fri']}
            labels={{ totalCount: '{{count}} contributions in {{year}}' }}
            tooltips={{
              activity: {
                text: (activity) =>
                  `${activity.count === 0 ? 'No' : activity.count} contribution${
                    activity.count === 1 ? '' : 's'
                  } on ${formatDay(activity.date)}`,
              },
            }}
            errorMessage="Could not reach GitHub just now."
          />
        </div>
      </div>
    </Section>
  )
}
