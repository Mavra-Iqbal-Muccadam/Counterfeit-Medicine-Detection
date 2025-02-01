require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with the account:", deployer.address);

  const ManufacturerRegistry = await hre.ethers.getContractFactory("ManufacturerRegistry");

  // ✅ Correct way in Ethers v6
  const manufacturerRegistry = await ManufacturerRegistry.deploy();
  await manufacturerRegistry.waitForDeployment();  // ✅ Fix

  console.log("✅ ManufacturerRegistry deployed to:", await manufacturerRegistry.getAddress());
}

main().catch((error) => {
  console.error("🚨 Deployment failed:", error.message);
  process.exitCode = 1;
});
