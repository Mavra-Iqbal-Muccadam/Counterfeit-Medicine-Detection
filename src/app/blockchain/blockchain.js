import { ethers } from "ethers";
import ManufacturerStorage from "../../../blockchain/artifacts/contracts/manufacturerregistration.sol/ManufacturerStorage.json";

const contractABI = ManufacturerStorage.abi;
console.log("✅ ABI Loaded:", contractABI); // Debug ABI

export const storeManufacturerData = async (manufacturerWallet, jsonCID, pdfCID) => {
  try {
    if (!window.ethereum) throw new Error("MetaMask is required!");

    console.log("✅ MetaMask detected!");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(); // 🔹 Corrected for ethers v6

    console.log("🔹 Provider & Signer initialized.");

    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS; // ✅ Load contract address
    console.log(`🔹 Contract Address: ${contractAddress}`);

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    console.log("✅ Contract instance created successfully.");
    
    // Debugging: List available contract functions
    console.log("📜 Available Contract Functions:", Object.keys(contract));

    // 🔹 Print values being sent to blockchain
    console.log("📦 Preparing to store Manufacturer Data on Blockchain...");
    console.log("🔹 Manufacturer Wallet (Before Checksumming):", manufacturerWallet);
    console.log("🔹 JSON CID:", jsonCID);
    console.log("🔹 PDF CID:", pdfCID);

    // Validate Ethereum address
    const validAddress = ethers.getAddress(manufacturerWallet);
    console.log(`✅ Checksummed Manufacturer Address: ${validAddress}`);

    // Ensure function exists in ABI
    if (!contract.storeManufacturer) {
      throw new Error("⚠️ Contract method storeManufacturer not found!");
    }

    // 🔹 Final log before transaction
    console.log(`🚀 Sending transaction to storeManufacturer(${validAddress}, ${jsonCID}, ${pdfCID})`);

    const tx = await contract.storeManufacturer(validAddress, jsonCID, pdfCID);
    console.log("⏳ Transaction sent! Waiting for confirmation...", tx);
    const receipt = await tx.wait();

    console.log("✅ Manufacturer Data Stored Successfully on Blockchain!", receipt);

    return receipt; // Explicitly returning receipt

  } catch (error) {
    console.error("❌ Error storing manufacturer data:", error);
    if (error.reason) console.log("🔹 Revert Reason:", error.reason);
    if (error.data) console.log("🔹 Error Data:", error.data);
    return null;  // Gracefully return null
  }
};
