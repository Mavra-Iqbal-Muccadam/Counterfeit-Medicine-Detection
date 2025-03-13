const hre = require("hardhat");
const fs = require("fs");

async function main() {
    console.log("🚀 Deploying ManufacturerStorage contract to Sepolia...");

    // Get the contract factory
    const ManufacturerStorage = await hre.ethers.getContractFactory("ManufacturerStorage");

    // Deploy the contract to Sepolia
    const contract = await ManufacturerStorage.deploy();
    await contract.waitForDeployment(); // Ensures proper deployment

    const contractAddress = await contract.getAddress(); // Get contract address

    console.log(`✅ Contract deployed successfully at: ${contractAddress} on Sepolia`);

    // Save contract address to a JSON file
    const contractData = {
        contractAddress: contractAddress,
        network: "sepolia",
        timestamp: new Date().toISOString()
    };

    fs.writeFileSync("deployedAddress.json", JSON.stringify(contractData, null, 2));
    console.log("📄 Contract address saved to `deployedAddress.json`");
}

// Run the script and catch errors
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Deployment failed:", error);
        process.exit(1);
    });
