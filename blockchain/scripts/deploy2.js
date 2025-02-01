const hre = require("hardhat");

async function main() {
  const ManufacturerRegistry = await hre.ethers.getContractFactory("ManufacturerRegistry");
  const manufacturerRegistry = await ManufacturerRegistry.deploy();
  await manufacturerRegistry.waitForDeployment();

  console.log("ManufacturerRegistry deployed to:", await manufacturerRegistry.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
