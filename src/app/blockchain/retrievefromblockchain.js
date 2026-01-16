"use client";
import { ethers } from "ethers";
import ManufacturerNFTStorageABI from "../blockchain/abi/ManufacturerNFTStorageABI.json";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS; // Replace with deployed contract address
const CONTRACT_ABI = ManufacturerNFTStorageABI;

// 🔹 Function to fetch JSON data from IPFS
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
    return null; // Return null if IPFS fetch fails
  }
}

// 🔹 Main function to get manufacturers and extract IPFS data
export async function getApprovedManufacturers() {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask not available");
  }

  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    console.log("📜 Available Contract Functions:", Object.keys(contract));

    // 🔹 Fetch manufacturers from blockchain
    console.log("🔍 Fetching approved manufacturers from blockchain...");
    const manufacturers = await contract.getAllApprovedManufacturers();
    console.log("✅ Raw Blockchain Data:", manufacturers);

    // 🔹 Fetch real data from IPFS for each manufacturer
    const enrichedManufacturers = await Promise.all(
      manufacturers.map(async (m, index) => {
        console.log(`🔹 Processing Manufacturer #${index + 1}`);
        console.log("🔹 Blockchain Data:", m);

        const ipfsData = await fetchIPFSData(m.jsonCID); // Fetch JSON data from IPFS
        return {
          jsonCID: m.jsonCID,
          pdfCID: m.pdfCID,
          wallet: m.wallet,
          isApproved: m.isApproved,
          ipfsData, // 🔹 Store extracted IPFS data
        };
      })
    );

    console.log("✅ Final Enriched Manufacturer Data:", enrichedManufacturers);
    return enrichedManufacturers;
  } catch (error) {
    console.error("❌ Error fetching manufacturers:", error);
    return [];
  }
}
