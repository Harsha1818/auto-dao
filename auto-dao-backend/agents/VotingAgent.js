const promptVoting = (userInput) => {
  return `
You are a Voting Strategy Designer for DAOs. Based on: "${userInput}",

Design:
1. Snapshot strategy
2. Voting duration and grace period
3. Tiebreaker mechanism
4. Emergency override (yes/no)

Return as JSON.
  `;
};

module.exports = promptVoting;
