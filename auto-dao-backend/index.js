const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { ethers } = require("ethers");
const tokenomicsPrompt = require("./prompts/tokenomicsPrompt");
const governancePrompt = require("./prompts/governancePrompt");
const votingPrompt = require("./prompts/votingPrompt");
const { queryLLM } = require("./utils/bedrockClient");

const AutoDAO_ABI = require("../artifacts/contracts/AutoDAO.sol/AutoDAO.json");
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace if redeployed

const app = express();
app.use(cors());
app.use(express.json());

const provider = new ethers.JsonRpcProvider("http://localhost:8545");

// ⚠️ Hardhat default account private key for local testing only
const signer = new ethers.Wallet(
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  provider
);

const dao = new ethers.Contract(contractAddress, AutoDAO_ABI.abi, signer);

// ✅ Event listener for ProposalAdded
dao.on("ProposalAdded", (proposalId, content, sender) => {
  console.log("📡 New Proposal Added:");
  console.log("🆔 ID:", proposalId.toString());
  console.log("📄 Content:", content);
  console.log("👤 Submitted by:", sender);
});

// 🔧 Shared helper for proposal generation and on-chain write
async function generateAndAddProposal(promptFunc, userInput) {
  const prompt = promptFunc(userInput);
  const llmResponse = await queryLLM(prompt);
  const proposalText = llmResponse[0]?.text || "No proposal generated";

  const tx = await dao.addProposal(proposalText);
  await tx.wait(); // Ensure it's mined before returning

  return proposalText;
}

// 📩 Tokenomics route
app.post("/tokenomics", async (req, res) => {
  try {
    const proposal = await generateAndAddProposal(tokenomicsPrompt, req.body.input);
    res.json({ success: true, proposal });
  } catch (err) {
    console.error("❌ Error in /tokenomics:", err);
    res.status(500).json({ success: false, error: "Failed to generate tokenomics proposal." });
  }
});

// 📩 Governance route
app.post("/governance", async (req, res) => {
  try {
    const proposal = await generateAndAddProposal(governancePrompt, req.body.input);
    res.json({ success: true, proposal });
  } catch (err) {
    console.error("❌ Error in /governance:", err);
    res.status(500).json({ success: false, error: "Failed to generate governance proposal." });
  }
});

// 📩 Voting strategy route
app.post("/voting", async (req, res) => {
  try {
    const proposal = await generateAndAddProposal(votingPrompt, req.body.input);
    res.json({ success: true, proposal });
  } catch (err) {
    console.error("❌ Error in /voting:", err);
    res.status(500).json({ success: false, error: "Failed to generate voting strategy proposal." });
  }
});

// 📤 GET all proposals
// 📤 Get all proposals from the contract
// 📤 Fetch all proposals from the smart contract
app.get("/proposals", async (req, res) => {
  try {
    const count = await dao.getProposalCount();
    const proposals = [];

    for (let i = 0; i < count; i++) {
      const [content, creator] = await dao.proposals(i);
      proposals.push({ id: i, content, creator });
    }

    res.json({ success: true, proposals });
  } catch (err) {
    console.error("❌ Error in /proposals:", err);
    res.status(500).json({ success: false, error: "Failed to fetch proposals." });
  }
});



// 🔍 GET single proposal by ID (optional)
app.get("/proposal/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const p = await dao.getProposal(id);
    res.json({
      success: true,
      proposal: {
        id: p[0].toString(),
        content: p[1],
        proposer: p[2],
      },
    });
  } catch (err) {
    console.error("❌ Error in /proposal/:id:", err);
    res.status(500).json({ success: false, error: "Could not fetch proposal." });
  }
});

// 🚀 Start server
app.listen(3001, () => {
  console.log("✅ Backend running on port 3001");
});
