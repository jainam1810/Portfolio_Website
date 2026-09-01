import type { Domain, DomainId } from './types'

export const DOMAIN_IDS: DomainId[] = ['ml', 'chain', 'sec']

export const domains: Record<DomainId, Domain> = {
  ml: {
    id: 'ml',
    index: '01',
    label: 'AI / ML',
    word: 'Models',
    title: 'Machine Learning',
    statement: 'A model is only useful if it beats a simple rule.',
    body: 'I build models that work on real financial data. Forecasting what a balance does next month, reading the merchant text on a transaction to label it, catching card fraud, and flagging payments that look wrong. Most of the job is cleaning the data and testing it honestly. Picking the algorithm is the quick part.',
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
      'Spots recurring payments at 85%+ accuracy and warns about a low balance 30 to 90 days out',
      'Autoencoders and RBMs catch card fraud at 91% accuracy, with 35% fewer false alarms',
      'Air quality model hits 92% accuracy and answers in under 100ms',
    ],
  },

  chain: {
    id: 'chain',
    index: '02',
    label: 'Blockchain',
    word: 'Contracts',
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

  sec: {
    id: 'sec',
    index: '03',
    label: 'Security',
    word: 'Guardrails',
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

export const domainList = DOMAIN_IDS.map((id) => domains[id])
