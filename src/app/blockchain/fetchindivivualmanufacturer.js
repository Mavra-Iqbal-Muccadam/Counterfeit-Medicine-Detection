"use client";
import { ethers } from "ethers";
import ManufacturerNFTStorageABI from "../blockchain/abi/ManufacturerNFTStorageABI.json";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const CONTRACT_ABI = ManufacturerNFTStorageABI;

// ✅ Function to fetch JSON data from IPFS
async function fetchIPFSData(cid) {
  try {
    console.log(`🔹 Fetching IPFS data for CID: ${cid}`);
    const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
    if (!response.ok) throw new Error("Failed to fetch IPFS data");
    const data = await response.json(); // 🔹 Parse JSON from IPFS
    console.log(`✅ Successfully fetched IPFS data for ${cid}:`, data);
    return data;
  } catch (error) {
    console.error(`❌ Error fetching IPFS data for CID ${cid}:`, error);
    return null;
  }
}

// ✅ Main function to fetch manufacturer data
export async function fetchManufacturer(walletAddress) {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask not available");
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    console.log("🔍 Fetching manufacturer details for:", walletAddress);
    const manufacturer = await contract.getManufacturerDetails(walletAddress);

    if (manufacturer[2] === "0x0000000000000000000000000000000000000000") {
      console.warn("❌ Manufacturer not found!");
      return null;
    }

    // ✅ Fetch actual data from IPFS
    const ipfsData = await fetchIPFSData(manufacturer[0]);

    return {
      jsonCID: manufacturer[0],
      pdfCID: manufacturer[1],
      wallet: manufacturer[2],
      isApproved: manufacturer[3],
      ipfsData, // 🔹 Store extracted IPFS data
    };
  } catch (error) {
    console.error("❌ Error fetching manufacturer details:", error);
    return null;
  }
}
