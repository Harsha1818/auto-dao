const promptTokenomics = (userInput) => {
  return `
You are a DAO Tokenomics Expert. The user says: "${userInput}"

Generate:
1. Token type (utility/governance/hybrid)
2. Initial supply and distribution plan
3. Inflation/deflation model
4. Vesting schedule

Output as JSON.
  `;
};

module.exports = promptTokenomics;
const tokenomicsPrompt = (input) => `
You are a Solidity expert. Based on the DAO description below, generate a complete ERC20-based token smart contract implementing the tokenomics structure.

DAO Description:
${input}

Requirements:
- Use SPDX and pragma statements.
- Follow best Solidity practices.
- Include comments.
- Output only Solidity code in a Markdown code block.

Return only the Solidity code block.
`;

module.exports = tokenomicsPrompt;
