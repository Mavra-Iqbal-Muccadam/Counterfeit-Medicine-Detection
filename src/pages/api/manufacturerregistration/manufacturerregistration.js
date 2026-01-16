import { ethers } from "ethers";
import "dotenv/config";
import insertPendingManufacturer from "@/lib/insertpendingmanufacturer"; // Import insertion logic

console.log("🛠 [DEBUG] Checking if ethers is loaded:", ethers);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    console.log("📥 [DEBUG] Received Blockchain Request Body:", req.body);

    const { ipfsHash, walletAddress, license_number, status } = req.body;

    console.log("🔍 ipfsHash:", `"${ipfsHash}"`);
    console.log("🔍 walletAddress:", `"${walletAddress}"`);
    console.log("🔍 license_number:", `"${license_number}"`);
    console.log("🔍 status:", `"${status}"`);

    // ✅ Validate Ethereum Wallet Address
    if (!ethers.isAddress(walletAddress.trim())) {
      console.error(
        "❌ [ERROR] Invalid Ethereum Wallet Address:",
        `"${walletAddress}"`,
      );
      return res
        .status(400)
        .json({ error: "Invalid Ethereum wallet address!" });
    }

    // ✅ Validate Required Environment Variables
    if (
      !process.env.BLOCKCHAIN_RPC_URL ||
      !process.env.PRIVATE_KEY ||
      !process.env.CONTRACT_ADDRESS
    ) {
      console.error("❌ [ERROR] Missing Blockchain Environment Variables!");
      return res
        .status(500)
        .json({
          error: "Required blockchain environment variables are missing!",
        });
    }

    // ✅ Connect to Blockchain
    const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const abi = [
      "function registerData(string ipfsHash, address walletAddress, string status) public",
    ];

    const contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      abi,
      wallet,
    );

    console.log("🚀 [DEBUG] Sending Transaction to Blockchain...");
    const tx = await contract.registerData(ipfsHash, walletAddress, status);

    console.log("⏳ [DEBUG] Waiting for transaction confirmation...");
    const receipt = await provider.waitForTransaction(tx.hash);

    console.log("✅ [SUCCESS] Transaction Confirmed! Hash:", receipt.hash);

    // ✅ Insert Transaction Data into Database using imported function
    try {
      console.log("📡 [DEBUG] Inserting Transaction Data into Database...");

      const dbResponse = await insertPendingManufacturer({
        license_number,
        wallet_address: walletAddress,
        status,
        transaction_hash: receipt.hash,
      });

      if (!dbResponse.success) {
        console.error(
          "❌ [ERROR] Database Insertion Failed:",
          dbResponse.error,
        );
      } else {
        console.log(
          "✅ [SUCCESS] Data Successfully Inserted into Database:",
          dbResponse.data,
        );
      }
    } catch (dbError) {
      console.error("❌ [ERROR] Failed to Insert Data into Database:", dbError);
    }

    res.status(200).json({
      message:
        "Data registered successfully on the blockchain and stored in the database!",
      transactionHash: receipt.hash,
    });
  } catch (error) {
    console.error("❌ [ERROR] Blockchain Transaction Failed:", error);

    if (error.code === "INSUFFICIENT_FUNDS") {
      return res
        .status(500)
        .json({ error: "Insufficient funds for transaction!" });
    }
    if (error.code === "CALL_EXCEPTION") {
      return res
        .status(500)
        .json({ error: "Smart contract execution failed!" });
    }

    res
      .status(500)
      .json({ error: "Failed to register data on the blockchain." });
  }
}
