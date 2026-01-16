"use client";
import { BrowserProvider, Contract } from "ethers";
import ManufacturerNFTStorageABI from "../../blockchain/abi/ManufacturerNFTStorageABI.json";
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MANUFACTURE_CONTRACT_ADDRESS;
const ManufacturerNFTABI = ManufacturerNFTStorageABI;

/**
 * ✅ Fetch Manufacturer Status
 * @param {string} walletAddress - The manufacturer's wallet address
 * @returns {string} - Manufacturer status (Pending, Approved, Rejected)
 */
export async function getManufacturerStatus(walletAddress) {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask not available");
  }

  try {
    const provider = new BrowserProvider(window.ethereum);
    const contract = new Contract(
      CONTRACT_ADDRESS,
      ManufacturerNFTABI,
      provider
    );

    console.log(`🔍 Checking status of ${walletAddress}...`);
    const statusEnum = await contract.getManufacturerStatus(walletAddress);

    // Convert Status Enum to Readable Format
    const statusMapping = ["Pending", "Approved ✅", "Rejected ❌"];
    return statusMapping[statusEnum];
  } catch (error) {
    console.error("❌ Error fetching status:", error);
    return null;
  }
}

/**
 * ✅ Login Manufacturer via MetaMask
 * @returns {string} - Login status
 */
export async function loginWithMetaMask() {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask not available");
  }

  try {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const userWallet = await signer.getAddress();

    console.log(`🔍 Logging in as ${userWallet}...`);
    const contract = new Contract(
      CONTRACT_ADDRESS,
      ManufacturerNFTABI,
      provider
    );

    const isApproved = await contract.login(userWallet);
    return isApproved
      ? "Login Successful ✅"
      : "Login Failed ❌ (Manufacturer Not Approved)";
  } catch (error) {
    console.error("❌ Error during login:", error);
    return "Login failed :❌ Manufacturer Not Approved";
  }
}
