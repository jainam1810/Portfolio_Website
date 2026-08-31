export const site = {
  name: 'Jainam Varia',
  initials: 'JV',
  /** The hero line: "I build systems that LEARN. SETTLE. HOLD." */
  heroLead: 'I build',
  badge: 'Creating Something Big — Stay Tuned!',
  role: 'B.Tech Computer Engineer · MSc Financial Technology',
  location: 'Exeter, United Kingdom',
  email: 'jainamvaria1010@gmail.com',

  /** Typewriter phrases, carried over verbatim from the previous site */
  taglines: [
    'AI/ML & Blockchain Enthusiast',
    'Financial Innovator',
    'Quantitative Thinker',
    'Expert in building solutions',
  ],

  intro:
    "MSc Financial Technology at the University of Exeter, with a B.Tech in Computer Engineering. I work in three areas: machine learning, blockchain settlement and application security. Most projects I take on need at least two of them, and I'd rather build the whole thing than just the part that demos well.",

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
    "Open to roles, freelance work, or just a chat about anything I've built here. I reply to everything.",

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
  { id: 'activities', label: 'Activities' },
  { id: 'contact', label: 'Contact' },
] as const
