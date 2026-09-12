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
    'limits, a real check on the email address rather than the loose one the\n' +
    'browser does, security headers (CSP, HSTS, no framing, no MIME sniffing), no\n' +
    'innerHTML, nothing saved in your browser, and no known package vulnerabilities.\n\n' +
    '%cI knew about the gap. I just did not think it was worth a subscription.\n' +
    'Please do not use up my 200 emails a month. It is the only contact form\n' +
    'I have. 🥺',
    BODY,
    WARN,
  )
  console.log('%cCode: https://github.com/jainam1810/Portfolio_Website', BODY)
}

/**
 * Registers the command, prints nothing.
 *
 * A greeting on every load would be noise for the people it is not for, and it
 * would announce the key to anyone who opened the console for an unrelated
 * reason. Whoever is actually auditing the form finds `note` sitting beside the
 * key in the bundle, and that tells them to run this.
 */
export function installConsoleNote() {
  window.jv = { security }
}
