const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory
  const ManufacturerRegistry = await ethers.getContractFactory("ManufacturerRegistry");

  // Deploy the contract
  const manufacturerRegistry = await ManufacturerRegistry.deploy();

  // Wait for the deployment to finish
  await manufacturerRegistry.deployed();

  console.log("ManufacturerRegistry deployed to:", manufacturerRegistry.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
