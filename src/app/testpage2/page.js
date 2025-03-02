"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { connectMetaMask } from "../../../utils/handleconnection"; // Import fixed function

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const rawAbi = process.env.NEXT_PUBLIC_CONTRACT_ABI;
const PROVIDER_URL = process.env.NEXT_PUBLIC_BLOCKCHAIN_RPC_URL;

console.log("Raw ABI from environment:", rawAbi);

let ABI;
try {
  ABI = JSON.parse(rawAbi);
  console.log("Parsed ABI:", ABI);
} catch (error) {
  console.error("Error parsing ABI JSON:", error);
  ABI = [];
}

async function fetchAllManufacturers(provider) {
  if (!provider) {
    console.error("❌ Ethereum provider not available. Ensure MetaMask is connected.");
    return { approvedList: [], pendingList: [], rejectedList: [] };
  }

  console.log("Using Ethereum provider:", provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
  console.log("Contract initialized at:", CONTRACT_ADDRESS);

  try {
    console.log("Fetching all manufacturers' data...");
    const [users, hashes, statuses] = await contract.getAllHashesWithStatus();
    console.log("Raw blockchain response:", { users, hashes, statuses });

    const approvedList = [], pendingList = [], rejectedList = [];
    for (let i = 0; i < users.length; i++) {
      const entry = { address: users[i], hash: hashes[i] };
      if (statuses[i] === 1) approvedList.push(entry);
      else if (statuses[i] === 0) pendingList.push(entry);
      else rejectedList.push(entry);
    }

    console.log("Processed data:", { approvedList, pendingList, rejectedList });
    return { approvedList, pendingList, rejectedList };
  } catch (error) {
    console.error("Error fetching manufacturers:", error);
    return { approvedList: [], pendingList: [], rejectedList: [] };
  }
}

export default function ManufacturerIPFS() {
  const [approved, setApproved] = useState([]);
  const [pending, setPending] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    async function initializeConnection() {
      const ethereumProvider = await connectMetaMask();
      if (ethereumProvider) {
        setProvider(ethereumProvider);
        const { approvedList, pendingList, rejectedList } = await fetchAllManufacturers(ethereumProvider);
        setApproved(approvedList);
        setPending(pendingList);
        setRejected(rejectedList);
      }
    }
    initializeConnection();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <div>
        <h2>Approved</h2>
        {approved.map((item, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <p><strong>Address:</strong> {item.address}</p>
            <p><strong>IPFS Hash:</strong> <a href={`https://ipfs.io/ipfs/${item.hash}`} target="_blank" rel="noopener noreferrer">View</a></p>
          </div>
        ))}
      </div>

      <div>
        <h2>Pending</h2>
        {pending.map((item, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <p><strong>Address:</strong> {item.address}</p>
            <p><strong>IPFS Hash:</strong> <a href={`https://ipfs.io/ipfs/${item.hash}`} target="_blank" rel="noopener noreferrer">View</a></p>
          </div>
        ))}
      </div>

      <div>
        <h2>Rejected</h2>
        {rejected.map((item, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <p><strong>Address:</strong> {item.address}</p>
            <p><strong>IPFS Hash:</strong> <a href={`https://ipfs.io/ipfs/${item.hash}`} target="_blank" rel="noopener noreferrer">View</a></p>
          </div>
        ))}
      </div>
    </div>
  );
}
