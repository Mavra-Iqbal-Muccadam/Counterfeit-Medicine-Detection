import { ethers } from "ethers";
import "dotenv/config";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, licenseNumber, physicalAddress, walletAddress } = req.body;

    try {
      // Validate input fields
      if (!name || !licenseNumber || !physicalAddress || !walletAddress) {
        return res.status(400).json({ error: "All fields are required!" });
      }
      if (name.length < 3 || name.length > 50) {
        return res.status(400).json({ error: "Name must be between 3 and 50 characters!" });
      }
      if (!ethers.utils.isAddress(walletAddress)) {
        return res.status(400).json({ error: "Invalid Ethereum wallet address!" });
      }

      // Validate environment variables
      if (!process.env.BLOCKCHAIN_RPC_URL || !process.env.PRIVATE_KEY || !process.env.CONTRACT_ADDRESS) {
        return res.status(500).json({ error: "Blockchain environment variables are not set correctly!" });
      }

      // Connect to the blockchain
      const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
      const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
      const abi = [
        "function registerManufacturer(string name, string licenseNumber, string physicalAddress) public",
      ];
      const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);

      // Interact with the smart contract
      const tx = await contract.registerManufacturer(name, licenseNumber, physicalAddress);

      // Wait for the transaction to be mined
      const receipt = await tx.wait();

      // Send success response
      res.status(200).json({
        message: "Manufacturer registered successfully on the blockchain!",
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
      });
    } catch (error) {
      console.error("Error registering manufacturer:", error);

      // Handle common errors
      if (error.code === "INSUFFICIENT_FUNDS") {
        return res.status(500).json({ error: "Insufficient funds for transaction!" });
      }
      if (error.code === "CALL_EXCEPTION") {
        return res.status(500).json({ error: "Smart contract execution failed!" });
      }

      // Generic error
      res.status(500).json({ error: "Failed to register manufacturer on the blockchain." });
    }
  } else {
    // Handle non-POST requests
    res.status(405).json({ error: "Method not allowed. Use POST." });
  }
}
