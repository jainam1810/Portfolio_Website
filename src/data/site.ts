export const site = {
  name: 'Jainam Varia',
  initials: 'JV',
  /** The hero line: "I build systems that LEARN. SETTLE. HOLD." */
  heroLead: 'I build systems that',
  badge: 'Creating Something Big — Stay Tuned! 😉',
  role: 'B.Tech Computer Engineer · MSc Financial Technology',
  location: 'Exeter, United Kingdom',
  timezone: 'GMT +0',
  email: 'jainamvaria1010@gmail.com',

  /** Typewriter phrases, carried over verbatim from the previous site */
  taglines: [
    'AI/ML & Blockchain Enthusiast',
    'Financial Innovator',
    'Quantitative Thinker',
    'Expert in building solutions',
  ],

  intro:
    'MSc Financial Technology at the University of Exeter, with a B.Tech in Computer Engineering. I work where machine learning, decentralised settlement and application security meet — and I ship the whole thing, not just the interesting part.',

  about: [
    "I'm a 22-year-old tech enthusiast passionate about the intersection of finance and technology. Currently living in Exeter, United Kingdom, pursuing my Master of Science in Financial Technology at the University of Exeter, I bring a strong foundation in computer engineering from my B.Tech at K.J. Somaiya Institute of Technology.",
    "My journey combines technical expertise with financial acumen, positioning me to drive innovation in the rapidly evolving FinTech landscape. I'm committed to leveraging technology to solve complex financial challenges and create impactful solutions.",
    "With expertise spanning AI/ML, blockchain development, and quantitative analysis, I've developed projects ranging from forecasting and fraud detection systems to decentralized applications. I am actively exploring opportunities in AI/ML and blockchain-driven roles across the United Kingdom.",
  ],

  /** The paragraph that carries the most weight - set as a pull quote */
  creed:
    "But beyond the skills and projects, what defines me is resilience. I've failed in sports, in financial markets, in business, in studies and each time I rebuilt with zero conviction and zero confidence, bouncing back from places most people walk away from. You may find someone smarter than me but you will never find someone who is more hardworking than me.",

  contactBlurb:
    "Whether you have a project idea, want to collaborate on research, or just want to say hello — I'd love to hear from you. Currently based in Exeter, UK.",

  contactIntro:
    "I'm always open to discussing new opportunities, collaborations, or just having a chat about AI/ML, blockchain and building software that holds up.",

  cvs: [
    {
      label: 'AI/ML CV',
      note: 'Updated Jan 2026',
      href: 'https://drive.google.com/file/d/1yGlR7KL837Q-Iyi3Igc2dV9nhRr4udC_/view?usp=sharing',
    },
    {
      label: 'Blockchain CV',
      note: 'Updated Jan 2026',
      href: 'https://drive.google.com/file/d/1warqB-sx-OUkT_qfCYQF7qEgEWx7xak8/view?usp=sharing',
    },
  ],

  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jainamvaria/', icon: 'linkedin' },
    { label: 'GitHub', href: 'https://github.com/jainam1810', icon: 'github' },
    { label: 'Email', href: 'mailto:jainamvaria1010@gmail.com', icon: 'gmail' },
    { label: 'WhatsApp', href: 'https://wa.me/447544504854', icon: 'whatsapp' },
    { label: 'Instagram', href: 'https://www.instagram.com/jai_varia_19/', icon: 'instagram' },
  ] as const,

  /** Real, verifiable figures drawn from the CV */
  stats: [
    { value: 9, suffix: '', label: 'Projects shipped', note: 'AI/ML, blockchain & security' },
    { value: 6, suffix: '', label: 'Professional roles', note: 'Startups to corporates' },
    { value: 120, suffix: '+', label: 'Clients advised', note: 'Markets & investment' },
    { value: 1000, suffix: '+', label: 'Seminar attendees', note: 'Taught FX & markets' },
  ],

  voice: {
    quote: '"So no matter what, I promise you, If you need us, if you need me, I\'ll be there!"',
    src: '/Captain_audio.mp3',
  },

  emailjs: {
    serviceId: 'service_wvng7kc',
    templateId: 'template_033ifqk',
    publicKey: '4OnjEDlHEmzam9O6m',
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
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const
