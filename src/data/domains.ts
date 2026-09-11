import type { Domain, DomainId } from './types'

export const DOMAIN_IDS: DomainId[] = ['ml', 'chain', 'stack', 'fin', 'sec']

export const domains: Record<DomainId, Domain> = {
  ml: {
    id: 'ml',
    index: '01',
    label: 'AI / ML',
    heroLine: 'production-grade AI/ML systems that scale.',
    heroScale: { two: 0.09562, three: 0.10493 },
    title: 'AI & Machine Learning',
    statement: 'A model is only useful if it beats a simple rule.',
    body: "Two halves. The models: forecasting what a balance does next month, labelling a transaction from its merchant text, catching card fraud, flagging payments that look wrong. Then the AI features on top: a model that reads a messy spreadsheet, or scores a post against the rules. There the maths stays in code and the last word stays with a person. Most of the job either way is cleaning the data and testing it honestly. Picking the algorithm is the quick part.",
    groups: [
      {
        name: 'Modelling',
        items: [
          'Linear Regression',
          'Logistic Regression',
          'SVM',
          'SVR',
          'XGBoost',
          'Random Forest',
          'Gradient Boosting',
          'Decision Trees',
          'GMMs',
        ],
      },
      {
        name: 'Deep learning',
        items: ['Autoencoders', 'RBMs', 'CNNs', 'RNNs', 'LSTMs'],
      },
      {
        name: 'AI features',
        items: [
          'LLMs',
          'NLP',
          'Claude',
          'Gemini',
          'Prompt design',
          'LLM APIs',
          'RAG',
          'Embeddings',
          'Vector databases (pgvector)',
          'LangChain',
          'Hugging Face',
          'Text classification',
          'Document extraction',
        ],
      },
      {
        name: 'Toolchain',
        items: [
          'Python',
          'PyTorch',
          'TensorFlow',
          'Scikit-learn',
          'Pandas',
          'NumPy',
          'Matplotlib',
          'Streamlit',
          'R',
        ],
      },
    ],
    proof: [
      'Spots recurring payments at 85%+ accuracy and warns about a low balance 30 to 90 days out',
      'Autoencoders and RBMs catch card fraud at 91% accuracy, with 35% fewer false alarms',
      'Air quality model hits 92% accuracy and answers in under 100ms',
      "On GlobePay the AI reads the client's messy spreadsheet, code does the money maths, and a person approves",
    ],
  },

  chain: {
    id: 'chain',
    index: '02',
    label: 'Blockchain',
    heroLine: 'scalable, gas-optimised contracts.',
    heroScale: { two: 0.09848, three: 0.15362 },
    title: 'Blockchain Development',
    statement: 'People want the money to arrive. They should not have to learn what a wallet is.',
    body: 'I write smart contracts and the systems around them. Cross-border transfers priced by Chainlink, payroll that pays a whole team from one signature, a faucet that hands out test ETH, and Merkle proofs that check membership without storing the list. The contract is the easy part. The ledger, the retries and the reconciliation are the real work.',
    groups: [
      {
        name: 'Contracts',
        items: ['Solidity', 'Hardhat', 'Remix', 'Smart Contracts', 'DApps', 'ECDSA', 'Merkle Trees'],
      },
      {
        name: 'Networks & rails',
        items: ['Ethereum', 'Solana', 'USDC / stablecoins', 'Chainlink oracles', 'BSV'],
      },
      {
        name: 'Integration',
        items: ['ethers.js', 'Web3.js', 'viem', 'wagmi', 'WalletConnect', 'Safe', 'Hyperledger Fabric', 'Corda'],
      },
    ],
    proof: [
      'RemitChain took transfer fees from 6.2% down to 0.3% across five currency pairs',
      'CrossBorderX moves real USDC on Solana, with a double-entry ledger behind it that reconciles every transfer',
      'GlobePay pays a whole freelancer roster from one wallet signature',
    ],
  },

  stack: {
    id: 'stack',
    index: '03',
    label: 'Full-Stack',
    heroLine: 'both the frontend and the backend of an app.',
    heroScale: { two: 0.09374, three: 0.1341 },
    title: 'Full-Stack Development',
    statement: 'One person, from architecture and development to testing and deployment.',
    body: 'At Dizzy Otter I ship whole products for clients: the interface, the API behind it, the database, the AI features on top, and the security pass and bug fixes before anything goes out. My own projects work the same way. There is no hand-off, so nothing gets lost in one.',
    groups: [
      {
        name: 'Frontend',
        items: [
          'React',
          'Next.js',
          'TypeScript',
          'React Native',
          'SolidJS',
          'Tailwind CSS',
          'Bootstrap',
          'Vite',
        ],
      },
      {
        name: 'Backend',
        items: ['Node.js', 'Express.js', 'Nest.js', 'FastAPI', 'REST APIs', 'WebSockets', 'Zod', 'Golang'],
      },
      {
        name: 'Data',
        items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase', 'Prisma', 'Amazon DynamoDB'],
      },
      {
        name: 'Ship & run',
        items: ['Docker', 'GitHub Actions', 'Vercel', 'Netlify', 'Railway', 'AWS', 'Git', 'Postman'],
      },
    ],
    proof: [
      'At Dizzy Otter I build client products end to end, then do the security pass and bug fixes myself',
      "Built a backend that pulls an influencer's public posts, scores them with Gemini, and shows the result on a dashboard",
      'GlobePay, RemitChain and the Faucet DApp are mine end to end: React frontend, contract, and deploy',
    ],
  },

  fin: {
    id: 'fin',
    index: '04',
    label: 'FinTech',
    heroLine: 'robust, tamper-proof payment systems.',
    heroScale: { two: 0.08704, three: 0.13846 },
    title: 'Financial Technology',
    statement: 'Moving the money is the easy part. Making the numbers agree is not.',
    body: 'This is the part I studied for my MSc and the part most of my projects sit in. Two halves: getting money from one place to another, and deciding who is good for it. Sending a payment is one line of code. The ledger behind it, the retries, the reconciliation and the audit trail are the rest of the work.',
    groups: [
      {
        name: 'Payments & settlement',
        items: [
          'Cross-border transfers',
          'Double-entry ledgers',
          'Reconciliation',
          'Settlement',
          'FX rates via Chainlink',
          'Stablecoin payouts',
          'Payroll runs',
          'Idempotent transfers',
        ],
      },
      {
        name: 'Lending & risk',
        items: [
          'Loan risk scoring',
          'Credit risk models',
          'Fraud detection',
          'Operational risk',
          'Anomaly detection',
          'Audit trails',
        ],
      },
      {
        name: 'Money data',
        items: [
          'Balance forecasting',
          'Transaction categorisation',
          'Recurring payment detection',
          'Python',
          'Pandas',
          'PostgreSQL',
          'PowerBI',
        ],
      },
    ],
    proof: [
      'RemitChain took transfer fees from 6.2% down to 0.3% across five currency pairs',
      'CrossBorderX settles real USDC and reconciles every transfer against a double-entry ledger',
      'The KIFS loan ledger design projected 30-40% faster processing and 50% less manual work',
    ],
  },

  sec: {
    id: 'sec',
    index: '05',
    label: 'Security',
    heroLine: 'secure, abuse-proof application systems.',
    heroScale: { two: 0.09299, three: 0.11949 },
    title: 'Application Security',
    statement: 'Check every request. Trust nothing by default.',
    body: 'I work on the part of security that decides whether an app holds up. Who is allowed to call what, how requests get abused, and what happens when the same request arrives twice. On GlobePay that meant never holding funds or keys, checking clients in the API and again in the database, and keeping the AI away from the money maths.',
    groups: [
      {
        name: 'Web & protocol',
        items: [
          'Content Security Policy',
          'Input sanitisation',
          'Server-Side Template Injection',
          'Clipboard hijacking',
          'DNS',
          'Penetration testing',
        ],
      },
      {
        name: 'Identity & secrets',
        items: [
          'Authentication',
          'OAuth',
          'JWT',
          'Session & cookie handling',
          'Secret management',
          'Row-Level Security',
        ],
      },
      {
        name: 'Abuse & availability',
        items: [
          'DoS defence',
          'DDoS defence',
          'Replay attacks',
          'Idempotency',
          'Rate limiting — IP-based',
          'Rate limiting — identity-based',
          'Sliding window',
          'Token bucket',
          'Fault tolerance',
        ],
      },
      {
        name: 'Architecture',
        items: [
          'Client/server trust boundaries',
          'Non-custodial design',
          'Least privilege',
          'Cryptographic verification',
          'Audit trails',
          'Anomaly & fraud detection',
        ],
      },
    ],
    proof: [
      'GlobePay never touches your funds or your keys. It can only ask your wallet to sign.',
      'Clients cannot see each other. Checked in the API, then checked again in Postgres row-level security.',
      'A 32-byte Merkle root replaces the whole list. 95% less storage, roughly half the gas.',
    ],
  },
}

/** Height of the hero headline as a fraction of its measure, by row count.
    Written by scripts/hero-scales.mjs - do not edit by hand. */
export const HERO_STRIP = { two: 0.1886, three: 0.4378 }

export const domainList = DOMAIN_IDS.map((id) => domains[id])
