import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import emailjs from '@emailjs/browser'
import { ArrowUpRight, Pause, Play, Send } from 'lucide-react'
import { Section } from '@/components/site/section'
import { Reveal } from '@/components/anim'
import { site } from '@/data/site'
import { BrandGlyph } from '@/lib/icons'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function ContactSection() {
  return (
    <Section
      id="contact"
      index="07"
      eyebrow="Get in touch"
      title="Let's build something that holds"
      lead={site.contactIntro}
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-6">
        <div className="flex flex-col">
          <Reveal>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
              {site.contactBlurb}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border">
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-background px-5 py-4 transition-colors duration-300 hover:bg-card"
              >
                <BrandGlyph
                  name={social.icon}
                  className="size-4 text-muted-foreground transition-colors duration-300 group-hover:text-[var(--domain)]"
                />
                <span className="text-sm font-medium text-foreground">{social.label}</span>
                <span className="ml-auto font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                  {social.label === 'Email' ? site.email : ''}
                </span>
                <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--domain)]" />
              </a>
            ))}
          </Reveal>

          <VoiceNote />
        </div>

        <ContactForm />
      </div>
    </Section>
  )
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        site.emailjs.serviceId,
        site.emailjs.templateId,
        {
          from_name: form.name,
          from_email: form.email,
          to_name: site.name,
          message: form.message,
        },
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
    <Reveal delay={0.12} className="hud-corner rounded-lg border border-border bg-card/30 p-6 md:p-8">
      <h3 className="font-display display-sm text-foreground">Send a message</h3>
      <p className="mt-1.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
        Goes straight to my inbox
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <Label htmlFor="name" className="eyebrow text-muted-foreground">
            Your name
          </Label>
          <Input
            id="name"
            name="name"
            required
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
              ? 'Message sent successfully — I will get back to you soon.'
              : 'Failed to send. Please try again, or email me directly.'}
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
