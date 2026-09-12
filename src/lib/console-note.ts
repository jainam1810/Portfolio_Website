/**
 * A note for whoever goes looking at the contact form.
 *
 * The EmailJS key is in the bundle. It has to be - EmailJS runs in the browser -
 * and the fix for that is their Allowed Domains setting, which sits behind a
 * paid plan. Rather than let a reviewer find the key and assume it was missed,
 * this explains what the gap is and what was done instead.
 *
 * It is deliberately opt-in. Printing the whole thing on load would announce
 * the key to anyone who opened the console for any reason, including people who
 * were never looking for it. The greeting says nothing about keys; only someone
 * who chooses to run jv.security() gets the detail, and by then they are already
 * reading the source.
 *
 * Every claim below is true of this codebase. If one stops being true, delete
 * the line rather than leaving it.
 */

const HEAD = 'color:#7dd3fc;font:600 13px system-ui'
const BODY = 'color:#a3a3a3;font:12px/1.6 ui-monospace,monospace'
const WARN = 'color:#fbbf24;font:12px/1.6 ui-monospace,monospace'

declare global {
  interface Window {
    jv?: { security: () => void }
  }
}

function security() {
  console.log('%cAbout the contact form 🙏', HEAD)
  console.log(
    '%cIt uses EmailJS, which runs in the browser, so its key ships with the page.\n' +
      'There is no way to hide it. If you copy it, the only thing you can do is send\n' +
      'my own contact form to my own inbox. You cannot email anyone else, and you\n' +
      'cannot read anything.\n\n' +
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

export function printConsoleNote() {
  window.jv = { security }
  // Says nothing about keys. Someone idly opening the console learns only that
  // a person built this; someone auditing the form has a thread to pull.
  console.log(
    '%cHello 👋  Reading the source?  %cjv.security()%c explains how the contact form is protected.',
    HEAD,
    'color:#fbbf24;font:600 12px ui-monospace,monospace',
    BODY,
  )
}
