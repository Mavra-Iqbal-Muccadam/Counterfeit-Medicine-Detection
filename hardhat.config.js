require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Ensure dotenv is required to load PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18", // Ensure you are using a valid Solidity version
  paths: {
    sources: "./blockchain/contracts",
    tests: "./blockchain/test",
    scripts: "./blockchain/scripts",
  },
  networks: {
    sepolia: {
      url: process.env.BLOCKCHAIN_RPC_URL, 
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
