require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const fs = require("fs");

// Load deployed contract address if available
let deployedAddress = "";
try {
    const data = fs.readFileSync("./deployedAddress.json", "utf8");
    deployedAddress = JSON.parse(data).contractAddress;
} catch (error) {
    console.log("⚠️ No deployed contract found. Run the deployment script first.");
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  paths: {
    sources: "./blockchain/contracts",
    tests: "./blockchain/test",
    scripts: "./blockchain/scripts",
  },
  networks: {
    hardhat: {}, // Local Hardhat network for development
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    // Uncomment this for Sepolia deployment
    // sepolia: {
    //   url: process.env.BLOCKCHAIN_RPC_URL || "", 
    //   accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    // }
  },
  contractAddress: deployedAddress, // Automatically fetch latest deployed contract address
};
