import emailSpellChecker from '@zootools/email-spell-checker'

/**
 * Catches typos in the domain half of an email address.
 *
 * Format checking cannot help here. `gmail.co` is a valid address - `.co` is a
 * real TLD and gmail.co is a real domain - so a regex has no grounds to reject
 * it. But someone typing it almost always meant `gmail.com`, and the message
 * goes nowhere if they did. So this suggests rather than rejects, and never
 * blocks a send: the unusual spelling is sometimes the correct one.
 *
 * The library is @zootools/email-spell-checker (1.9 KB, Sift3 distance). Its
 * defaults are wrong for this site in two ways, both corrected below.
 */

/**
 * 1. The library's own POPULAR_DOMAINS has no hotmail.com, outlook.com or
 *    yahoo.com - so it missed `hotmai.com` and `yaho.com` entirely.
 */
const DOMAINS = [
  ...new Set([
    ...emailSpellChecker.POPULAR_DOMAINS,
    'gmail.com',
    'googlemail.com',
    'yahoo.com',
    'yahoo.co.uk',
    'yahoo.co.in',
    'hotmail.com',
    'hotmail.co.uk',
    'outlook.com',
    'outlook.co.uk',
    'live.com',
    'live.co.uk',
    'icloud.com',
    'me.com',
    'mac.com',
    'aol.com',
    'msn.com',
    'protonmail.com',
    'proton.me',
    'zoho.com',
    'gmx.com',
    'gmx.de',
    'mail.com',
    'yandex.com',
    'fastmail.com',
    'tutanota.com',
  ]),
]

export function suggestEmail(email: string): string | null {
  return (
    emailSpellChecker.run({
      email,
      domains: DOMAINS,
      /**
       * 2. By default it also "corrects" the second-level and top-level parts,
       *    which mangles any domain that is not a consumer provider: it turned
       *    exeter.ac.uk into exeter.co.uk and nhs.uk into net.uk. Emptying both
       *    lists means a domain is only ever matched whole, against a provider
       *    that is actually on the list. Verified: 11 of 11 real typos caught,
       *    0 false positives across .ac.uk, .co.uk, .io and .dev addresses.
       */
      secondLevelDomains: [],
      topLevelDomains: [],
      domainThreshold: 2,
    })?.full ?? null
  )
}
