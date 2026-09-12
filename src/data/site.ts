import type { DomainId } from './types'

export const site = {
  name: 'Jainam Varia',
  initials: 'JV',
  /** The hero line is "I build" plus a tail that swaps with the active domain.
      This is the tail shown when no single domain is selected. */
  heroLead: 'I build',
  heroLine: 'and ship software systems, end to end.',
  heroScale: { two: 0.09925, three: 0.13155 },
  badge: 'Creating Something Big — Stay Tuned!',
  role: 'B.Tech Computer Engineer · MSc Financial Technology',
  location: 'Exeter, United Kingdom',
  email: 'jainamvaria1010@gmail.com',
  githubUser: 'jainam1810',

  /** Typewriter phrases, carried over verbatim from the previous site */
  taglines: [
    'AI/ML & Blockchain Engineer',
    'Full-Stack Developer',
    'Financial Innovator',
    'Quantitative Thinker',
    'Expert in building solutions',
  ],

  intro:
    "MSc Financial Technology at the University of Exeter, with a B.Tech in Computer Engineering. I work across machine learning, blockchain, application security, fintech and full-stack. Most projects I take on need at least two of them, and I'd rather build the whole thing than just the part that demos well.",

  about: [
    "I'm a 22-year-old tech enthusiast passionate about the intersection of finance and technology. Currently living in Exeter, United Kingdom, having completed my Master of Science in Financial Technology at the University of Exeter, I bring a strong foundation in computer engineering from my B.Tech at K.J. Somaiya Institute of Technology.",
    "My journey combines technical expertise with financial acumen, positioning me to drive innovation in the rapidly evolving FinTech landscape. I'm committed to leveraging technology to solve complex financial challenges and create impactful solutions.",
    "With expertise spanning AI/ML, blockchain development, and quantitative analysis, I've developed projects ranging from forecasting and fraud detection systems to decentralized applications. I am actively exploring opportunities in AI/ML and blockchain-driven roles across the United Kingdom.",
  ],

  /** The paragraph that carries the most weight - set as a pull quote */
  creed:
    "But beyond the skills and projects, what defines me is resilience. I've failed in sports, in financial markets, in business, in studies and each time I rebuilt with zero conviction and zero confidence, bouncing back from places most people walk away from. You may find someone smarter than me but you will never find someone who is more hardworking than me.",

  contactBlurb:
    "Whether you have a project idea, want to collaborate on research, or just want to say hello — I'd love to hear from you. Currently based in Exeter, UK.",

  contactIntro:
    "Open to roles, freelance work, or just a chat about anything I've built here. I reply to everything.",

  /**
   * `domains` decides which CV is offered for the selected pillar. A pillar with
   * no file of its own falls back to the full picker rather than quietly handing
   * over the nearest CV - add an entry here and that pillar goes direct.
   */
  cvs: [
    {
      label: 'AI/ML CV',
      href: 'https://drive.google.com/file/d/1YN1GesHOC0njXz87UdHx5O9V3D1UP0el/view',
      domains: ['ml'],
    },
    {
      label: 'Blockchain CV',
      href: 'https://drive.google.com/file/d/1dWrPH6uzuGUB--8LNy2fl2mUY2SZOlam/view',
      domains: ['chain'],
    },
    {
      label: 'Full-Stack CV',
      href: 'https://drive.google.com/file/d/1llcvrkL61qqVjs9wRHli8fCi1qIzZYvj/view',
      domains: ['stack'],
    },
    {
      label: 'FinTech CV',
      href: 'https://drive.google.com/file/d/1XRx_wWazQGXaySNxUz361LQ7diRc6U6G/view',
      domains: ['fin'],
    },
  ] as { label: string; href: string; domains: DomainId[] }[],

  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jainamvaria/', icon: 'linkedin' },
    { label: 'GitHub', href: 'https://github.com/jainam1810', icon: 'github' },
    { label: 'Email', href: 'mailto:jainamvaria1010@gmail.com', icon: 'gmail' },
    { label: 'WhatsApp', href: 'https://wa.me/447544504854', icon: 'whatsapp' },
    { label: 'Instagram', href: 'https://www.instagram.com/jai_varia_19/', icon: 'instagram' },
  ] as const,

  /** Real, verifiable figures drawn from the CV */
  stats: [
    {
      value: 10,
      suffix: '+',
      label: 'Projects shipped',
      note: 'Nine personal, rest built at work',
      hint: 'The nine below are my own projects. The others were built at work and cannot be shared.',
    },
    { value: 6, suffix: '', label: 'Professional roles', note: 'A warehouse floor to a CTO' },
    { value: 120, suffix: '+', label: 'Clients advised', note: 'On forex and investing' },
    { value: 1000, suffix: '+', label: 'Seminar attendees', note: 'Seminars on how markets work' },
  ],

  voice: {
    quote: '"So no matter what, I promise you, If you need us, if you need me, I\'ll be there!"',
    src: '/Captain_audio.mp3',
  },


  /**
   * These ship with the page - EmailJS runs in the browser, so they have to.
   * `note` travels with them: a reviewer digging for the key in the Sources
   * panel finds it in the same search result, rather than in the console where
   * they were never looking. It is a plain string on a plain object, so the
   * minifier keeps it verbatim. Nothing reads it; it is there to be found.
   */
  emailjs: {
    serviceId: 'service_wvng7kc',
    templateId: 'template_033ifqk',
    publicKey: '4OnjEDlHEmzam9O6m',
    note: `
Hello 👋  Yes, this key is public, and it is meant to be.

EmailJS runs in the browser, so the key ships with the page. There is no way
to hide it. If you copy it, the only thing you can do is send my own contact
form to my own inbox. You cannot email anyone else, and you cannot read
anything.

The proper fix is the EmailJS "Allowed Domains" setting, which locks the key
to this site. It is part of a paid plan, and I have not bought one for a
personal site.

So I did what I could for free:
  a hidden honeypot field, and a 3 second wait before the form can send
  a 20 second gap between sends, trimmed input, and length limits
  a real check on the email address, not just the browser's loose one
  security headers: CSP, HSTS, no framing, no MIME sniffing
  no innerHTML, nothing saved in your browser, no known package vulnerabilities

I knew about the gap. I just did not think it was worth a subscription.
Please do not use up my 200 emails a month - it is the only contact form
I have. 🥺

Run jv.security() in the console for the same thing, formatted.
`,
  },

  easterEgg: {
    desktop: 'Press ↑ ↑ ↓ ↓ ← → ← → B A',
    mobile: 'Tap 7 times on screen in 1.5 seconds',
  },
}

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'domains', label: 'Domains' },
  { id: 'projects', label: 'Projects' },
  { id: 'contributions', label: 'Contributions' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'activities', label: 'Activities' },
  { id: 'contact', label: 'Contact' },
] as const
