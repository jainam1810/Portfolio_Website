/**
 * Regenerates the hero headline type scales in src/data.
 *
 * The headline has to fill the same strip whatever the domain: same width, same
 * height, with the type size doing the adapting. That cannot be done in CSS,
 * because CSS cannot measure text. So the widths are measured here, straight
 * out of the Anton font file, with the browser's greedy line breaking
 * simulated, and the results written back into the data files.
 *
 * For each headline and each row count n:
 *   scale = 1 / (narrowest measure, in em, that still breaks into exactly n rows)
 *           -> font-size as a fraction of the measure, so the longest row fills it
 *
 * Leading is the same for every domain, so the gap between the two rows never
 * changes. The block heights that fall out of that differ, so the headline box
 * reserves the tallest (HERO_STRIP) and centres shorter ones inside it.
 *
 * Run after changing any heroLine:  node scripts/hero-scales.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import opentype from 'opentype.js'

const FONT = 'node_modules/@fontsource/anton/files/anton-latin-400-normal.woff'
const TRACKING = -0.005 // letter-spacing on .font-display
const BASE_LEAD = 0.95 // line-height given to the largest type
const ROWS = { two: 2, three: 3 }

const font = opentype.parse(readFileSync(FONT).buffer)

const width = (text) =>
  [...text].reduce(
    (sum, ch) => sum + (font.charToGlyph(ch).advanceWidth || 0) / font.unitsPerEm + TRACKING,
    0,
  )

const SPACE = width(' ')

/** Greedy line breaking, the same way a browser wraps at a given measure. */
function rowCount(text, measure) {
  let rows = 1
  let line = null
  for (const word of text.toUpperCase().split(' ')) {
    const w = width(word)
    if (line === null) {
      line = w
    } else if (line + SPACE + w <= measure) {
      line += SPACE + w
    } else {
      rows++
      line = w
    }
  }
  return rows
}

/** Narrowest measure that still breaks into exactly `rows` rows. */
function scaleFor(text, rows) {
  const total = width(text.toUpperCase())
  for (let m = total / rows; m <= total; m += 0.005) {
    if (rowCount(text, m) === rows) return 1 / m
  }
  throw new Error(`no ${rows}-row measure for: ${text}`)
}

// --- read the headlines straight out of the data ------------------------------

const siteSrc = readFileSync('src/data/site.ts', 'utf8')
const domainsSrc = readFileSync('src/data/domains.ts', 'utf8')

const lines = { all: siteSrc.match(/\n {2}heroLine: '([^']*)'/)[1] }
for (const [, id, line] of domainsSrc.matchAll(
  /\n {2}(\w+): \{[\s\S]*?heroLine: '([^']*)'/g,
)) {
  lines[id] = line
}

const lead = siteSrc.match(/\n {2}heroLead: '([^']*)'/)[1]
const full = Object.fromEntries(Object.entries(lines).map(([k, v]) => [k, `${lead} ${v}`]))

// --- measure ------------------------------------------------------------------

const scales = {}
for (const [key, text] of Object.entries(full)) {
  scales[key] = {}
  for (const [name, n] of Object.entries(ROWS)) scales[key][name] = scaleFor(text, n)
}

const out = {}
const strip = {}
for (const [name, n] of Object.entries(ROWS)) {
  const max = Math.max(...Object.values(scales).map((s) => s[name]))
  strip[name] = +(n * BASE_LEAD * max).toFixed(4)
  for (const key of Object.keys(scales)) {
    out[key] ??= {}
    out[key][name] = +scales[key][name].toFixed(5)
  }
}

// --- write back ---------------------------------------------------------------

const literal = (o) => `{ two: ${o.two}, three: ${o.three} }`

writeFileSync(
  'src/data/site.ts',
  siteSrc.replace(/\n( {2})heroScale: \{[^}]*\},/, `\n$1heroScale: ${literal(out.all)},`),
  'utf8',
)

let next = domainsSrc
for (const [id, o] of Object.entries(out)) {
  if (id === 'all') continue
  next = next.replace(
    new RegExp(`(\\n {2}${id}: \\{[\\s\\S]*?\\n {4})heroScale: \\{[^}]*\\},`),
    `$1heroScale: ${literal(o)},`,
  )
}
next = next.replace(
  /export const HERO_STRIP = \{[^}]*\}/,
  `export const HERO_STRIP = { two: ${strip.two}, three: ${strip.three} }`,
)
writeFileSync('src/data/domains.ts', next, 'utf8')

// --- report -------------------------------------------------------------------

// Read the measure out of the stylesheet rather than repeating it here, so the
// report can never quote a width the page is not actually using.
const css = readFileSync('src/index.css', 'utf8')
const W = Number(css.match(/--hero-measure: min\(([\d.]+)rem/)[1]) * 16

console.log('measure', W + 'px   strip', strip)
console.log('\nkey        2-row font   3-row font')
for (const [key, o] of Object.entries(out)) {
  console.log(
    key.padEnd(10),
    (o.two * W).toFixed(0).padStart(7) + 'px',
    (o.three * W).toFixed(0).padStart(10) + 'px',
  )
}
console.log(
  '\nevery headline is',
  (strip.two * W).toFixed(0) + 'px tall by',
  W + 'px wide from sm up.',
)
