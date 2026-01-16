"use client";
import { ethers } from "ethers";
import ManufacturerNFTStorageABI from "../blockchain/abi/ManufacturerNFTStorageABI.json";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS; // ✅ Ensure this is set in your environment
const CONTRACT_ABI = ManufacturerNFTStorageABI;

export async function loginWithMetaMask() {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask not available");
  }

  try {
    // 🔹 Request MetaMask wallet access (This ensures MetaMask opens)
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (!accounts.length) {
      return { success: false, message: "❌ MetaMask connection failed!" };
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const userAddress = accounts[0]; // 🔹 Use accounts[0] to ensure consistency

    console.log("🔹 Logged in with address:", userAddress);

    // 🔹 Connect to the contract
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    console.log("🔍 Checking if manufacturer exists on blockchain...");
    const exists = await contract.checkManufacturerExists(userAddress);
    console.log(`🔍 Manufacturer Exists? ${exists}`);

    if (exists) {
      return {
        success: true,
        message: "✅ Login successful!",
        wallet: userAddress,
      };
    } else {
      return { success: false, message: "❌ Login Failed" };
    }
  } catch (error) {
    console.error("❌ Error logging in with MetaMask:", error);
    return {
      success: false,
      message: "❌ Login failed. Check console for details.",
    };
  }
}
