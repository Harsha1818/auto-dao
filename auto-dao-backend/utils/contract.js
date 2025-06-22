const { ethers } = require("ethers");
const AutoDAO_ABI = require("../../artifacts/contracts/AutoDAO.sol/AutoDAO.json");

// Update with your deployed contract address
const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const provider = new ethers.JsonRpcProvider("http://localhost:8545");

async function connectToDAO() {
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, AutoDAO_ABI.abi, signer);
  return contract;
}

module.exports = connectToDAO;
