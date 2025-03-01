import { ethers } from "ethers";
import "dotenv/config";

console.log("🛠 [DEBUG] Checking if ethers is loaded:", ethers);
console.log("🛠 [DEBUG] Checking if ethers functions exist:", {
  isAddress: ethers.isAddress,
  parseEther: ethers.parseEther,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    console.log("📥 [DEBUG] Received Blockchain Request Body:", req.body);

    const { ipfsHash, walletAddress, status } = req.body;

    console.log("🔍 ipfsHash:", `"${ipfsHash}"`);
    console.log("🔍 walletAddress:", `"${walletAddress}"`);
    console.log("🔍 status:", `"${status}"`);

    // ✅ Check if ethers.isAddress() is available
    if (!ethers.isAddress(walletAddress.trim())) {
      console.error("❌ [ERROR] Invalid Ethereum Wallet Address:", `"${walletAddress}"`);
      return res.status(400).json({ error: "Invalid Ethereum wallet address!" });
    }

    // Validate environment variables
    if (!process.env.BLOCKCHAIN_RPC_URL || !process.env.PRIVATE_KEY || !process.env.CONTRACT_ADDRESS) {
      console.error("❌ [ERROR] Missing Blockchain Environment Variables!");
      return res.status(500).json({ error: "Blockchain environment variables are not set correctly!" });
    }

    // Connect to the blockchain (Updated for ethers v6)
    const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const abi = [
      "function registerData(string ipfsHash, address walletAddress, string status) public",
    ];

    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);

    console.log("🚀 [DEBUG] Sending Transaction to Blockchain...");
    const tx = await contract.registerData(ipfsHash, walletAddress, status);
    
    console.log("⏳ [DEBUG] Waiting for transaction confirmation...");
    const receipt = await provider.waitForTransaction(tx.hash);

    console.log("✅ [SUCCESS] Transaction Hash:", receipt.hash);

    res.status(200).json({
      message: "Data registered successfully on the blockchain!",
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed.toString(),
    });

  } catch (error) {
    console.error("❌ [ERROR] Blockchain Transaction Failed:", error);

    if (error.code === "INSUFFICIENT_FUNDS") {
      return res.status(500).json({ error: "Insufficient funds for transaction!" });
    }
    if (error.code === "CALL_EXCEPTION") {
      return res.status(500).json({ error: "Smart contract execution failed!" });
    }

    res.status(500).json({ error: "Failed to register data on the blockchain." });
  }
}
