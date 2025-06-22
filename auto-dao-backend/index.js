const express = require("express");
const cors = require("cors");
require("dotenv").config();

const tokenomicsPrompt = require("./agents/TokenomicsAgent");
const governancePrompt = require("./agents/GovernanceAgent");
const votingPrompt = require("./agents/VotingAgent");
const { queryLLM } = require("./utils/bedrockClient"); // ✅ FIXED

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());


app.post("/tokenomics", async (req, res) => {
  const prompt = tokenomicsPrompt(req.body.input);
  const result = await queryLLM(prompt);
  res.json(result);
});

const fs = require("fs");
const path = require("path");

app.post("/tokenomics", async (req, res) => {
  const prompt = tokenomicsPrompt(req.body.input);
  const result = await queryLLM(prompt);

  // Extract Solidity from markdown block
  const match = result.match(/```(?:solidity)?\n([\s\S]*?)```/i);
  const solidityCode = match ? match[1] : result;

  // Save to contracts folder
  const filePath = path.join(__dirname, "contracts", "Tokenomics.sol");
  fs.writeFileSync(filePath, solidityCode);

  res.json({ message: "Contract generated and saved!", contract: solidityCode });
});


app.post("/voting", async (req, res) => {
  const prompt = votingPrompt(req.body.input);
  const result = await queryLLM(prompt);
  res.json(result);
});

app.listen(3001, () => console.log("Backend running on port 3001"));

