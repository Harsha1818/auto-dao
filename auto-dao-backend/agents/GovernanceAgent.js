const governancePrompt = (input) => `
You are a smart contract expert. Based on the DAO description below, generate a Solidity contract that implements proposal creation, thresholds, quorum, and timelock logic.

DAO Description:
${input}

Requirements:
- Use SPDX and pragma statements.
- Follow best Solidity practices.
- Include comments.
- Use OpenZeppelin's Governor contracts if suitable.
- Output only the Solidity code in a Markdown code block.

Return only the Solidity code block.
`;

module.exports = governancePrompt;
