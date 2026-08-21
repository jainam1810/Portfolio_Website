import type { Domain, DomainId } from './types'

export const DOMAIN_IDS: DomainId[] = ['ml', 'chain', 'sec']

export const domains: Record<DomainId, Domain> = {
  ml: {
    id: 'ml',
    index: '01',
    label: 'AI / ML',
    word: 'Models',
    title: 'Intelligent Systems',
    statement: 'Models that earn their place in a product.',
    body: 'I build machine learning that has to survive contact with real data — forecasting cashflow, classifying transactions, detecting anomalies. The interesting part is rarely the model: it is the feature work, the honest evaluation, and knowing which decisions a model should never be trusted to make.',
    groups: [
      {
        name: 'Modelling',
        items: [
          'Linear Regression',
          'Logistic Regression',
          'SVM / SVR',
          'XGBoost',
          'Random Forest',
          'Gradient Boosting',
          'Decision Trees',
          'GMMs',
        ],
      },
      {
        name: 'Deep learning',
        items: ['Autoencoders', 'RBMs', 'CNNs', 'RNNs', 'LSTMs', 'LLMs', 'NLP'],
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
      'Cashflow forecasting and recurring-payment detection at 85%+ accuracy, predicting low-balance risk 30–90 days ahead',
      'Autoencoder + RBM fraud detection reaching 91% accuracy with 35% fewer false positives',
      'AQI forecasting at 92% accuracy with sub-100ms response time',
    ],
  },

  chain: {
    id: 'chain',
    index: '02',
    label: 'Blockchain',
    word: 'Contracts',
    title: 'Decentralised Settlement',
    statement: 'Chains are plumbing, not the product.',
    body: 'I write smart contracts and the infrastructure around them — but the work I care about hides the chain entirely. Fiat goes in, fiat comes out, and stablecoins move the value across the border in between. That means contracts, ledgers, reconciliation and orchestration have to be right together.',
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
      'RemitChain cuts cross-border transfer fees from 6.2% to 0.3% across 5 currency pairs, fully on-chain',
      'CrossBorderX settles real USDC on Solana behind a double-entry, append-only ledger with reconciliation',
      'GlobePay pays an entire freelancer roster in one transaction from a single client wallet signature',
    ],
  },

  sec: {
    id: 'sec',
    index: '03',
    label: 'Security',
    word: 'Guardrails',
    title: 'Secure by Design',
    statement: 'The properties that decide whether software survives production.',
    body: 'Not offensive security — I am not a Burp-and-Metasploit operator, and I do not claim to be. What I know is the application and protocol layer: where trust boundaries sit, how requests get abused, and what has to be true for a system to hold under load and under attack. On GlobePay that meant a custody guarantee the code is not allowed to break, tenant isolation enforced twice, and money maths the AI is never permitted to touch.',
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
          'DoS / DDoS defence',
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
      'Non-custodial by construction: GlobePay orchestrates USDC transfers but never holds funds or private keys',
      'Multi-tenant isolation enforced twice — in every API route and again in Postgres row-level security policies',
      'Merkle-root verification proves membership while storing only 32 bytes, cutting storage 95% and gas ~50%',
    ],
  },
}

export const domainList = DOMAIN_IDS.map((id) => domains[id])
