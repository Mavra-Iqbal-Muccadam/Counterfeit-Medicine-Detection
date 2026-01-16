"use client";
import { ethers } from "ethers";
import ManufacturerStorage from "../../../blockchain/artifacts/contracts/manufacturerregistration.sol/ManufacturerStorage.json";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS; // ✅ Ensure this is set in your environment
const CONTRACT_ABI = ManufacturerStorage.abi;

export async function checkManufacturerStatus(walletAddress) {
  if (!walletAddress || !ethers.isAddress(walletAddress)) {
    return { success: false, message: "❌ Invalid wallet address provided!" };
  }

  try {
    // 🔹 Connect to the Ethereum provider via MetaMask
    if (typeof window === "undefined" || !window.ethereum) {
      throw new Error("MetaMask not available");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    console.log(
      "🔹 Checking manufacturer existence for address:",
      walletAddress
    );

    // 🔹 Connect to the contract
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    // 🔍 Check if the manufacturer exists
    const exists = await contract.checkManufacturerExists(walletAddress);
    console.log(`🔍 Manufacturer Exists? ${exists}`);

    if (exists) {
      return {
        success: true,
        message: "✅ Manufacturer is approved!",
        wallet: walletAddress,
      };
    } else {
      return { success: false, message: "❌ Manufacturer is not approved." };
    }
  } catch (error) {
    console.error("❌ Error checking manufacturer status:", error);
    return {
      success: false,
      message: "❌ Check failed. See console for details.",
    };
  }
}
