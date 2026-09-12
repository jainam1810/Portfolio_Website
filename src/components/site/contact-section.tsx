import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'motion/react'
import { ArrowUpRight, Check, Copy, Pause, Play, Send } from 'lucide-react'
import { Section } from '@/components/site/section'
import { Reveal } from '@/components/anim'
import { site } from '@/data/site'
import { BrandGlyph } from '@/lib/icons'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const ROW =
  'group flex w-full items-center gap-4 bg-background px-5 py-4 text-left transition-colors duration-300 hover:bg-card'
const ROW_ICON =
  'size-4 text-muted-foreground transition-colors duration-300 group-hover:text-[var(--domain)]'
const ROW_ARROW =
  'size-3.5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--domain)]'

/**
 * A web page cannot trigger Android's app chooser - Intent.createChooser and
 * setPackage are native APIs - so wa.me just opens whichever WhatsApp the OS
 * picked, with no way back. This offers the choice in our own UI instead, which
 * behaves identically everywhere. Business is targeted through an intent URL,
 * which only Android understands, so it is only offered there.
 */
function WhatsAppRow({ href }: { href: string }) {
  const number = href.split('/').filter(Boolean).pop() ?? ''
  const isAndroid = typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent)
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`+${number}`)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const option =
    'flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted'

  return (
    <Popover>
      <PopoverTrigger className={ROW}>
        <BrandGlyph name="whatsapp" className={ROW_ICON} />
        <span className="text-sm font-medium text-foreground">WhatsApp</span>
        <ArrowUpRight className={cn(ROW_ARROW, 'ml-auto')} />
      </PopoverTrigger>

      <PopoverContent align="start" className="w-64 p-1.5">
        <p className="px-3 pt-2 pb-1.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
          Open with
        </p>

        <a href={href} target="_blank" rel="noopener noreferrer" className={option}>
          <BrandGlyph name="whatsapp" className="size-4 text-[var(--domain)]" />
          WhatsApp
        </a>

        {isAndroid && (
          <a
            href={`intent://send?phone=${number}#Intent;scheme=whatsapp;package=com.whatsapp.w4b;end`}
            className={option}
          >
            <BrandGlyph name="whatsapp" className="size-4 text-[var(--domain)]" />
            WhatsApp Business
          </a>
        )}

        <button onClick={copy} className={cn(option, 'font-sans')}>
          {copied ? (
            <Check className="size-4 text-[var(--domain)]" />
          ) : (
            <Copy className="size-4 text-muted-foreground" />
          )}
          {copied ? 'Number copied' : 'Copy number'}
        </button>
      </PopoverContent>
    </Popover>
  )
}

export function ContactSection() {
  return (
    <Section
      id="contact"
      index="09"
      eyebrow="Say hello"
      title="Contact Me"
      lead={site.contactIntro}
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-6">
        {/* On phones the form leads; on desktop it sits on the right as before. */}
        <div className="order-2 flex flex-col lg:order-1">
          <Reveal>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
              {site.contactBlurb}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border">
            {site.socials.map((social) =>
              social.icon === 'whatsapp' ? (
                <WhatsAppRow key={social.label} href={social.href} />
              ) : (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ROW}
                >
                  <BrandGlyph name={social.icon} className={ROW_ICON} />
                  <span className="text-sm font-medium text-foreground">{social.label}</span>
                  <span className="ml-auto font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                    {social.label === 'Email' ? site.email : ''}
                  </span>
                  <ArrowUpRight className={ROW_ARROW} />
                </a>
              ),
            )}
          </Reveal>

          <VoiceNote />
        </div>

        <div className="order-1 lg:order-2">
          <ContactForm />
        </div>
      </div>
    </Section>
  )
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const lastSent = useRef(0)
  // A field no person can see or tab into. Bots fill every input they find.
  const trap = useRef<HTMLInputElement>(null)
  // Bots submit the instant they land. People have to read and type first.
  const opened = useRef(Date.now())

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return

    // Honeypot and time-to-submit. Both report success rather than an error:
    // telling a bot it failed only teaches it to try again differently. A
    // honeypot alone stops most of this traffic on a form this size, and the
    // timer catches the scripted submits that fill hidden fields anyway.
    const tooFast = Date.now() - opened.current < 3000
    if (trap.current?.value || tooFast) {
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      window.setTimeout(() => setStatus('idle'), 4000)
      return
    }

    // Whitespace-only input passes `required`, so it is rejected here.
    const name = form.name.trim()
    const email = form.email.trim()
    const message = form.message.trim()
    if (!name || !email || !message) return

    // One send every 20 seconds. This stops double taps and casual repeat
    // sending; it is not a security control, because the EmailJS key is public
    // by design and anyone can call their API directly. The real limit is the
    // per-template rate limit and the allowed-domain list in the EmailJS
    // dashboard, which have to be set there rather than here.
    const now = Date.now()
    if (now - lastSent.current < 20_000) {
      setStatus('error')
      window.setTimeout(() => setStatus('idle'), 4000)
      return
    }
    lastSent.current = now

    setStatus('sending')
    try {
      await emailjs.send(
        site.emailjs.serviceId,
        site.emailjs.templateId,
        { from_name: name, from_email: email, to_name: site.name, message },
        site.emailjs.publicKey,
      )

      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      window.setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
      window.setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const field = 'mt-1.5 border-border bg-background/60 focus-visible:border-[var(--domain)]'

  return (
    <Reveal delay={0.12} className="hud-corner relative rounded-lg border border-border bg-card/30 p-6 md:p-8">
      <h3 className="font-display display-sm text-foreground">Send a message</h3>
      <p className="mt-1.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
        Goes straight to my inbox
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {/* Off-screen rather than display:none or type=hidden, both of which
            bots learned to skip years ago. aria-hidden and tabIndex keep it
            away from screen readers and the keyboard. */}
        <input
          ref={trap}
          type="text"
          name="company-website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] size-0 opacity-0"
        />

        <div>
          <Label htmlFor="name" className="eyebrow text-muted-foreground">
            Your name
          </Label>
          <Input
            id="name"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Jane Doe"
            className={field}
          />
        </div>

        <div>
          <Label htmlFor="email" className="eyebrow text-muted-foreground">
            Your email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="jane@example.com"
            className={field}
          />
        </div>

        <div>
          <Label htmlFor="message" className="eyebrow text-muted-foreground">
            Your message
          </Label>
          <Textarea
            id="message"
            name="message"
            required
            maxLength={2000}
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Tell me about your idea..."
            className={cn(field, 'resize-y')}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-[var(--domain)] px-4 py-3 text-sm font-semibold text-background transition-all duration-300 hover:brightness-110 disabled:opacity-60"
        >
          <Send className="size-4" />
          {status === 'sending' ? 'Sending...' : 'Send message'}
        </button>

        {status !== 'idle' && status !== 'sending' && (
          <p
            className={cn(
              'text-center font-mono text-[11px] tracking-wide',
              status === 'sent' ? 'text-[var(--domain)]' : 'text-destructive',
            )}
          >
            {status === 'sent'
              ? "Got it. I'll get back to you soon."
              : "That didn't send. Try again, or just email me directly."}
          </p>
        )}
      </form>
    </Reveal>
  )
}

/** The Captain America voice note, kept from the previous site. */
function VoiceNote() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      audio.currentTime = 0
      setPlaying(false)
    } else {
      audio.currentTime = 0
      void audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    }
  }

  return (
    <Reveal delay={0.16} className="hud-corner mt-6 rounded-lg border border-border bg-card/30 p-6">
      <p className="font-serif text-base leading-snug text-foreground italic text-pretty">
        {site.voice.quote}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          onClick={toggle}
          className="inline-flex items-center gap-2.5 rounded-full border border-border px-4 py-2 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-300 hover:border-[var(--domain)] hover:text-[var(--domain)]"
        >
          {playing ? <Pause className="size-3" /> : <Play className="size-3" />}
          {playing ? 'Playing' : 'Play voice note'}
        </button>

        <div className="flex h-5 items-end gap-[3px]" aria-hidden>
          {[0.35, 0.7, 1, 0.55, 0.85, 0.4, 0.65].map((peak, i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-sm bg-[var(--domain)]"
              animate={playing ? { height: [4, 20 * peak, 6, 18 * peak, 4] } : { height: 4 }}
              transition={
                playing
                  ? { duration: 0.9 + i * 0.12, repeat: Infinity, ease: 'easeInOut' }
                  : { duration: 0.3 }
              }
            />
          ))}
        </div>
      </div>

      <audio
        ref={audioRef}
        src={site.voice.src}
        preload="auto"
        playsInline
        onEnded={() => setPlaying(false)}
      />

      <p className="mt-5 border-t border-border pt-4 font-mono text-[10px] tracking-[0.14em] text-muted-foreground/70 uppercase">
        <span className="hidden md:inline">{site.easterEgg.desktop}</span>
        <span className="md:hidden">{site.easterEgg.mobile}</span>
      </p>
    </Reveal>
  )
}
