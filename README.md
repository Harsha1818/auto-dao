# 🧠 AutoDAO Engineer

AutoDAO Engineer is a generative multi-agent system to scaffold fully functional DAOs from plain English using LLMs + Chainlink Functions + IPFS.

## 🚀 Features

- Prompt-based DAO design (Tokenomics, Governance, Voting)
- LLM agent orchestration via AWS Bedrock (Claude 3 Sonnet)
- Smart contract scaffolding using Hardhat
- Modular contract structure for easy customization
- Future: IPFS + Chainlink Functions + Agent-to-Agent coordination

## 🧩 Tech Stack

- Backend: Node.js, Express, AWS Bedrock
- Frontend: React + Vite
- Smart Contracts: Solidity + Hardhat
- Dev Tools: GitHub CLI, dotenv, LangChain (TBD), Chainlink Functions

## 🛠️ Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/Harsha1818/auto-dao.git
   cd auto-dao
cd auto-dao-backend
npm install
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
node index.js
cd ../auto-dao-ui
npm install
npm run dev
I want a DAO that governs a decentralized ride-sharing protocol with a token cap and quadratic voting.
