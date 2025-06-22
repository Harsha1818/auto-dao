const hre = require("hardhat");

async function main() {
  const AutoDAO = await hre.ethers.getContractFactory("AutoDAO");
  const dao = await AutoDAO.deploy();
  await dao.waitForDeployment();

  console.log("✅ AutoDAO deployed to:", await dao.getAddress());
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
