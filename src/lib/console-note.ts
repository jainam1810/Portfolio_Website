/**
 * A note for whoever opens the console.
 *
 * The EmailJS key is in the bundle. It has to be - EmailJS runs in the browser -
 * and the fix for that is their Allowed Domains setting, which sits behind a
 * paid plan. Rather than let a reviewer find the key and assume it was missed,
 * this says plainly what the gap is and what was done instead.
 *
 * Every claim below is true of this codebase. If one stops being true, delete
 * the line rather than leaving it.
 */

const HEAD = 'color:#7dd3fc;font:600 13px system-ui'
const BODY = 'color:#a3a3a3;font:12px/1.6 ui-monospace,monospace'
const WARN = 'color:#fbbf24;font:12px/1.6 ui-monospace,monospace'

export function printConsoleNote() {
  console.log('%cHello 👋 Maybe you found the EmailJS key.', HEAD)

  console.log(
    '%cIt is meant to be visible. EmailJS runs in the browser, so there is no way to\n' +
    'hide it. If you copy it, the only thing you can do is send my own contact form\n' +
    'to my own inbox. You cannot email anyone else, and you cannot read anything.\n\n' +
    'The proper fix is the EmailJS "Allowed Domains" setting, which locks the key to\n' +
    'this site. It is part of a paid plan, and I have not bought one for a personal\n' +
    'site.\n\n' +
    'So I did what I could for free: a hidden honeypot field, a 3 second wait before\n' +
    'the form can send, a 20 second gap between sends, trimmed input and length\n' +
    'limits, security headers (CSP, HSTS, no framing, no MIME sniffing), no\n' +
    'innerHTML, nothing saved in your browser, and no known package vulnerabilities.\n\n' +
    '%cI knew about the gap. I just did not think it was worth a subscription.\n' +
    'Please do not use up my 200 emails a month. It is the only contact form\n' +
    'I have. 🥺',
    BODY,
    WARN,
  )

  console.log('%cCode: https://github.com/jainam1810/Portfolio_Website', BODY)
}
