import type { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'quartermark',
    title: 'QuarterMark',
    year: '2026',
    primary: 'fin',
    domains: ['fin', 'ml', 'stack', 'sec'],
    featured: true,
    summary:
      'Private credit funds check their loan covenants by hand in Excel, about two analyst-weeks a quarter. QuarterMark reads the loan agreement, recalculates every covenant from the borrower’s own accounts, and flags a breach before the fund finds one.',
    impact:
      'The dashboard ranks the whole book worst-first, so the fund sees who is closest to the edge rather than a list of passes and fails. Every covenant keeps its headroom history, which turns a pass or fail into a direction: a borrower drifting toward its limit over four quarters reads differently from one sitting flat, even while both are still compliant. Between reporting dates, public filings are read daily, so a new charge or an overdue set of accounts surfaces in days instead of at the next quarterly pack.',
    writeUp: {
      label: 'Inside QuarterMark',
      title: 'Inside QuarterMark',
      body: [
        "Private credit funds lend across dozens of companies, and every loan carries rules buried in a 200-page agreement. Checking them is a quarterly job done by hand in Excel, roughly two analyst-weeks. QuarterMark does the checking and leaves the judgement to a person.",
        "The fund owns the rules, the borrower owns the numbers, and QuarterMark checks one against the other. It never accepts the ratio a borrower reports. It recalculates from the raw accounts using that contract's own definition of the terms, and shows the page every figure came from.",
        'The dashboard ranks the whole book worst-first, so the question becomes who is closest to the edge rather than who has already failed. Each covenant keeps its headroom history, which turns a state into a direction and lets a breach be seen coming rather than reported after the fact.',
        'Between reporting dates, public filings are read daily. Not for fresh accounts, which private companies file late and once a year, but for events: a new charge registered, a director resigning, accounts overdue, an insolvency notice.',
        'Nothing is final until a person approves it, and approving is a separate permission from editing. An approval records who signed it off, the exact figures, which version of the definition was in force, and every source page cited.',
        'Colour never carries meaning on its own. Compliance status always comes with an icon and a label as well, so it still reads for someone colour-blind or on a black and white printout. Light and dark both ship, with one restrained accent and two typefaces: one for display, one for interface and figures.',
        "Covenant monitoring is the way in, not the ceiling. Valuation, servicing, underwriting and fund accounting are already declared in the same registry, so each one is an addition rather than a rebuild - the platform is built to grow into everything a credit fund runs on. It sits on open standards throughout, so moving to a client's own cloud is a deployment change rather than a rewrite.",
      ],
    },
    stack: ['TypeScript', 'Next.js', 'React', 'PostgreSQL', 'Claude', 'S3'],
    links: [
      { label: 'GitHub', href: 'https://github.com/jainam1810/quartermark', kind: 'repo' },
    ],
  },
  {
    slug: 'globepay',
    title: 'GlobePay',
    year: '2026',
    primary: 'chain',
    domains: ['chain', 'sec', 'fin', 'stack'],
    status: 'Live',
    featured: true,
    summary:
      'Payroll for companies paying freelancers abroad. They hand over the list, GlobePay works out who gets what, and the client signs once. Everyone gets paid in USDC in a single transaction.',
    impact:
      "GlobePay is a non-custodial platform. It holds no funds and no keys, so USDC goes straight from the client's wallet to the freelancer's, and the database only records who got paid what. Clients can't see each other either, and that's checked in the API and again in Postgres. The AI reads their messy spreadsheet. Our approach is AI Generates, Code calculated, human approves",
    stack: [
      'Next.js',
      'TypeScript',
      'wagmi',
      'viem',
      'WalletConnect',
      'Safe',
      'Supabase',
      'PostgreSQL RLS',
      'TanStack Query',
      'Radix UI',
      'Motion',
    ],
    links: [
      { label: 'Live', href: 'https://globe-pay-five.vercel.app', kind: 'live' },
      { label: 'GitHub', href: 'https://github.com/jainam1810/GlobePay', kind: 'repo' },
      {
        label: 'Video',
        href: 'https://drive.google.com/file/d/1tEMTBMTIPN0Y8t-30ZrYDONQFpdBSAs1/view?usp=sharing',
        kind: 'demo',
      },
    ],
  },
  {
    slug: 'crossborderx',
    title: 'CrossBorderX',
    year: '2026',
    primary: 'chain',
    domains: ['chain', 'sec', 'fin', 'stack'],
    status: 'Dormant',
    featured: true,
    summary:
      'Sending money from the US to the UK without either person knowing crypto was involved. You pay in dollars, they receive pounds, and USDC on Solana quietly does the crossing in between.',
    impact:
      'Real USDC settlement on Solana, sitting behind an append-only double-entry ledger and a seven-step state machine that can resume where it left off. It worked. I shut it down anyway and wrote up why: the float you need to hold, the card fees, and the compliance load meant the numbers never added up.',
    stack: [
      'NestJS',
      'TypeScript',
      'Next.js',
      'Prisma',
      'PostgreSQL',
      'Supabase',
      'Solana',
      'USDC SPL',
      'Render',
      'Vercel',
    ],
    writeUp: {
      label: 'Why I shelved it?',
      title: 'Why I shelved CrossBorderX?',
      source: 'Originally posted on LinkedIn',
      sourceHref:
        'https://www.linkedin.com/posts/jainamvaria_github-jainam1810crossborderx-frontend-share-7469533357018779648-61Z5/',
      body: [
        'The idea: sending money abroad is slow and expensive. Banks take days and charge a fortune. So I built a platform where you send USD or GBP and your family overseas receives their local currency in about 30 seconds. Behind the scenes the money briefly becomes a stablecoin (USDC) to cross the border instantly. The user never sees crypto. It is invisible plumbing.',
        'The tech worked. Real settlement on Solana, a proper double-entry ledger, fully deployed. The flow was: sender pays USD, Stripe collects, Circle converts to USDC, Solana moves it US to UK, B2C2 converts to GBP, ClearBank pays out over Faster Payments.',
        'The money problem: to make transfers feel instant you need your own pool of cash to front payments while the slow bank transfer catches up. Roughly four to five times your daily volume, sitting idle. As a solo builder with no budget, impossible.',
        'The fees ate the margin: card payments cost around 3%, more than the whole transfer should cost. Bank transfers are cheap but slow, which puts you back on the cash-pool problem.',
        'Taxes killed key markets: India charges 1% tax on every crypto conversion. That alone matched my entire profit margin. Competitors on traditional rails do not pay it.',
        'I picked the wrong battles: on popular routes like US to UK and US to India, Wise and Remitly already do it for 0.5 to 0.8%. Stablecoins only win on hard, expensive routes such as parts of Africa and Latin America, and funded players like Bitso, LemFi and Felix Pago already own those.',
        'The real lesson: moving money across borders is already solved and cheap. The hard part is not better pipes, it is distribution. Owning the trust of a specific community. I had great pipes and no community.',
        'This is all based on my own research, so I could be wrong on some of it. I would happily start again if there is a way around these.',
      ],
    },
    links: [
      { label: 'Backend', href: 'https://github.com/jainam1810/crossborderx-api', kind: 'repo' },
      { label: 'Frontend', href: 'https://github.com/jainam1810/crossborderx-frontend', kind: 'repo' },
    ],
  },
  {
    slug: 'remitchain',
    title: 'RemitChain',
    year: '2026',
    primary: 'chain',
    domains: ['chain', 'sec', 'fin', 'stack'],
    featured: true,
    summary:
      "A Solidity contract for cross-border stablecoin transfers. It handles several currencies, pulls rates from Chainlink, and gives the money back if the recipient never claims it, so the sender isn't left out of pocket.",
    impact:
      'Fees drop from 6.2% to 0.3% across five currency pairs, and every step is visible on-chain.',
    writeUp: {
      label: 'vs CrossBorderX',
      title: 'RemitChain vs CrossBorderX',
      body: [
        'Both move money across borders using stablecoins. They solve it from opposite ends. Say you want to send 500 dollars from the US to your brother in the UK.',
        'On RemitChain you open MetaMask and deposit 500 USDC into the contract. Chainlink prices the pound at the live rate. Your brother connects his own wallet, claims the transfer, waits one minute, then withdraws the same value in a GBP stablecoin. If you pasted the wrong address, you can reverse it inside that minute and get your money back minus the 0.3% fee. He ends up holding a stablecoin and still has to cash it out somewhere.',
        'On CrossBorderX you pay the 500 dollars with a card. About thirty seconds later your brother has pounds sitting in his bank account. He installs nothing and never sees crypto. Behind the scenes Stripe takes the card payment, Circle turns it into USDC, Solana carries it across, B2C2 sells it for pounds and ClearBank pays him over Faster Payments.',
        'So RemitChain trusts the contract and asks both people to hold crypto. CrossBorderX trusts a chain of companies and asks the two people to hold nothing.',
        'That is also why one is much harder to run. RemitChain needs the contract deployed and nothing else. CrossBorderX needs a payment processor, a bank, licences, and a pool of its own cash to front payments while the slow transfers catch up. That last one is what stopped it.',
      ],
    },
    stack: ['Solidity', 'Ethereum', 'Hardhat', 'Remix', 'React', 'ethers.js', 'Chainlink'],
    links: [
      { label: 'GitHub', href: 'https://github.com/jainam1810/RemitChain', kind: 'repo' },
      {
        label: 'Video',
        href: 'https://drive.google.com/file/d/1DwVyKL0udW9F8XenC861UIqqlZJfwkZV/view?usp=sharing',
        kind: 'demo',
      },
    ],
  },
  {
    slug: 'suspicious-transactions',
    title: 'Suspicious Transaction Detector - Liminal',
    year: '2026',
    primary: 'sec',
    domains: ['sec', 'ml', 'fin', 'stack'],
    featured: true,
    summary:
      'A tool that flags transactions which look wrong. Written in Go on the Nim SDK for the Liminal Vibe Banking hackathon.',
    impact:
      "Transaction context streams to the model over WebSockets, but nothing gets written until a person approves it. The agent can suggest. It can't act on its own.",
    stack: ['Go', 'Claude', 'WebSockets', 'Nim Go SDK', 'React'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/jainam1810/liminal-nim-hackathon-tool-hackathon',
        kind: 'repo',
      },
      {
        label: 'Video',
        href: 'https://drive.google.com/file/d/1KvJ2GQn74eZPzK1ZJr6XbAjoyAwrSWVS/view?usp=sharing',
        kind: 'demo',
      },
    ],
  },
  {
    slug: 'financial-advisor',
    title: 'AI-Powered Financial Advisor',
    year: '2026',
    primary: 'ml',
    domains: ['ml', 'fin'],
    summary:
      "A personal finance dashboard built around what UK Open Banking actually gives you. Feed it your transactions and it tells you what's recurring, what's coming, and when you're about to run dry.",
    impact:
      'Picks out recurring payments at 85%+ accuracy and warns about a low balance 30 to 90 days before it happens.',
    stack: ['Python', 'Logistic Regression', 'TF-IDF', 'ARIMA', 'Streamlit'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/jainam1810/AI-Powered_Financial_Advisor',
        kind: 'repo',
      },
      {
        label: 'Video',
        href: 'https://drive.google.com/file/d/13m88EsBa5mc8n9E_KlV0PIOucQZqB_Rg/view',
        kind: 'demo',
      },
    ],
  },
  {
    slug: 'fraud-detection',
    title: 'Credit Card Fraud Detection',
    year: '2025',
    primary: 'ml',
    domains: ['ml', 'sec', 'fin'],
    summary:
      "Autoencoders to spot transactions that don't fit the usual pattern, and Restricted Boltzmann Machines to learn the messier structure underneath.",
    impact:
      '91% accuracy, with 35% fewer false alarms. That second number matters more than it sounds, because every false positive is a real customer getting blocked at a till.',
    stack: ['Python', 'TensorFlow', 'Scikit-learn', 'NumPy', 'Deep Learning'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/jainam1810/Credit-Card-Fraud-Detection',
        kind: 'repo',
      },
    ],
  },
  {
    slug: 'merkle-giftlist',
    title: 'Merkle GiftList',
    year: '2025',
    primary: 'sec',
    domains: ['sec', 'chain', 'stack'],
    summary:
      'Proving someone is on a list without storing the list. The server keeps one 32-byte Merkle root, and the client brings a short proof.',
    impact:
      '95% less storage, verification in under 100ms, and roughly half the gas.',
    stack: ['JavaScript', 'Node.js', 'Express.js', 'Merkle Trees', 'Blockchain'],
    links: [{ label: 'GitHub', href: 'https://github.com/jainam1810/Merkle-GiftList', kind: 'repo' }],
  },
  {
    slug: 'faucet-dapp',
    title: 'Faucet DApp',
    year: '2025',
    primary: 'chain',
    domains: ['chain', 'stack'],
    summary:
      'An Ethereum faucet in Solidity, Hardhat and React. Connect a wallet, pull test ETH out of the contract, get on with building.',
    impact:
      'Free test ETH means far less setup before you can start. Onboarding friction down 70%, testing costs down 90%.',
    stack: ['Solidity', 'Hardhat', 'React', 'JavaScript'],
    links: [
      { label: 'GitHub', href: 'https://github.com/jainam1810/faucet-dapp', kind: 'repo' },
      {
        label: 'Video',
        href: 'https://drive.google.com/file/d/1Ym9dTf-kELQWafDMGg2qVsjM03RKgblg/view?usp=drive_link',
        kind: 'demo',
      },
    ],
  },
  {
    slug: 'aqi-prediction',
    title: 'Air Quality Index Prediction',
    year: '2025',
    primary: 'ml',
    domains: ['ml'],
    summary:
      'Random Forest, Decision Tree and SVM trained on years of Mumbai pollution and weather data, with a map you can actually click around.',
    impact:
      '92% accuracy, answers in under 100ms, and checks itself against the live CPCB feed.',
    stack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Streamlit', 'Folium'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/jainam1810/Air_Quality_Index_Prediction',
        kind: 'repo',
      },
    ],
  },
]
