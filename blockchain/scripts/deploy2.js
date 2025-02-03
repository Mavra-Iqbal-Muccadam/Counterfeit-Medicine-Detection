const hre = require("hardhat");

async function main() {
  const IPFSStorage = await hre.ethers.getContractFactory("IPFSStorage");
  const contract = await IPFSStorage.deploy();
  await contract.deployed();

  console.log(`Contract deployed to: ${contract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
