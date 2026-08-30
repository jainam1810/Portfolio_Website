import type { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'globepay',
    title: 'GlobePay',
    year: '2026',
    primary: 'chain',
    domains: ['chain', 'sec'],
    status: 'Live',
    featured: true,
    summary:
      'A non-custodial stablecoin payroll platform. Client companies hand over their freelancer lists, GlobePay prepares the payroll, and each client confirms with one wallet signature — every freelancer is then paid in USDC in a single transaction.',
    impact:
      'GlobePay never holds funds or private keys; USDC moves client wallet → freelancer wallet and the database stores only metadata. Tenant isolation is enforced twice — in every API route and again in Postgres row-level security. AI reads the messy freelancer list; all money maths, tax, FX and wallet validation is done in code, never by the model.',
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
    ],
  },
  {
    slug: 'crossborderx',
    title: 'CrossBorderX',
    year: '2026',
    primary: 'chain',
    domains: ['chain', 'sec'],
    status: 'Prototype',
    featured: true,
    summary:
      'A US→UK remittance platform that uses stablecoins as invisible settlement infrastructure. The sender pays in fiat, the recipient receives fiat, and USDC on Solana carries the value across the border in between — neither side ever touches crypto.',
    impact:
      'Real on-chain USDC settlement on Solana behind a double-entry, append-only ledger with reconciliation, a seven-step transaction orchestrator built as a state machine, and a deployed admin dashboard. Shipped with a written post-mortem: the technology worked, the unit economics did not — the float, the funding rail and the compliance burden are what killed it.',
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
    links: [
      { label: 'Live', href: 'https://crossborderx-frontend.vercel.app', kind: 'live' },
      { label: 'Backend', href: 'https://github.com/jainam1810/crossborderx-api', kind: 'repo' },
      { label: 'Frontend', href: 'https://github.com/jainam1810/crossborderx-frontend', kind: 'repo' },
    ],
  },
  {
    slug: 'remitchain',
    title: 'RemitChain',
    year: '2026',
    primary: 'chain',
    domains: ['chain', 'sec'],
    status: 'Shipped',
    featured: true,
    summary:
      'A Solidity smart contract enabling cross-border stablecoin transfers with multi-currency support, Chainlink oracle integration, and a two-phase claim system that protects the sender if a transfer is never claimed.',
    impact:
      'Reduces transfer fees from 6.2% to 0.3% across 5 currency pairs with full on-chain transparency.',
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
    title: 'Suspicious Transaction Detector',
    year: '2026',
    primary: 'sec',
    domains: ['sec', 'ml'],
    status: 'Shipped',
    featured: true,
    summary:
      'An AI-assisted tool that flags suspicious transactions, built in Go on the Nim SDK for the Liminal Vibe Banking Hackathon.',
    impact:
      'Streams transaction context to an LLM agent over WebSockets with a built-in confirmation flow, so no write operation executes without explicit approval — the human stays in the loop on every state change.',
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
    domains: ['ml'],
    status: 'Shipped',
    summary:
      'An AI-powered personal finance dashboard inspired by UK Open Banking, built with Streamlit, machine learning and time-series forecasting to turn raw transactions into intelligent financial insight.',
    impact:
      'Analyses transactions to forecast cashflow, detects recurring payments with 85%+ accuracy, and predicts low-balance risk 30–90 days ahead.',
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
    domains: ['ml', 'sec'],
    status: 'Shipped',
    summary:
      'Deep learning models using Autoencoders to detect anomalies and Restricted Boltzmann Machines to capture complex patterns in transaction data.',
    impact:
      'Achieves 91% accuracy and cuts false positives by 35%, reducing losses and protecting customer trust.',
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
    domains: ['sec', 'chain'],
    status: 'Shipped',
    summary:
      'A blockchain-based verification system using Merkle Trees — the server stores only the 32-byte Merkle root while clients prove membership with a compact cryptographic proof.',
    impact:
      'Merkle-root verification cuts storage by 95%, verifies in under 100ms, and cuts gas fees by roughly 50%.',
    stack: ['JavaScript', 'Node.js', 'Express.js', 'Merkle Trees', 'Blockchain'],
    links: [{ label: 'GitHub', href: 'https://github.com/jainam1810/Merkle-GiftList', kind: 'repo' }],
  },
  {
    slug: 'faucet-dapp',
    title: 'Faucet DApp',
    year: '2025',
    primary: 'chain',
    domains: ['chain'],
    status: 'Shipped',
    summary:
      'An Ethereum faucet built with Solidity, Hardhat and React. Users connect a wallet and withdraw test ETH straight from a smart contract.',
    impact:
      'Faucets provide free test ETH, reducing onboarding friction by 70% and testing costs by 90%.',
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
    status: 'Shipped',
    summary:
      'Random Forest, Decision Tree and SVM models trained on historical pollution and weather data, surfaced through an interactive geospatial AQI dashboard for Mumbai.',
    impact:
      'Achieves 92% accuracy with under 100ms response time, enabling real-time monitoring against the live CPCB feed.',
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
