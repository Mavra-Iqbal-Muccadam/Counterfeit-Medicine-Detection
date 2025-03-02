import { ethers } from "ethers";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const rawAbi = process.env.NEXT_PUBLIC_CONTRACT_ABI;

// console.log("Raw ABI from environment:", rawAbi);

let ABI;
try {
  ABI = JSON.parse(rawAbi);
  console.log("Parsed ABI:", ABI);
} catch (error) {
  console.error("Error parsing ABI JSON:", error);
  ABI = [];
}

export async function fetchAllManufacturers() {
  if (!window.ethereum) throw new Error("No Ethereum wallet detected");
  
  console.log("Connecting to Ethereum provider...");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  console.log("Provider initialized:", provider);

  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
  console.log("Contract initialized at:", CONTRACT_ADDRESS);
  console.log("Using ABI:", ABI);

  try {
    console.log("Fetching all manufacturers' data...");
    const [users, hashes, statuses] = await contract.getAllHashesWithStatus();
    console.log("Raw blockchain response:", { users, hashes, statuses });
    
    const approvedList = [], pendingList = [], rejectedList = [];

    for (let i = 0; i < users.length; i++) {
      const entry = { address: users[i], hash: hashes[i] };
      if (statuses[i] === 1) {
        approvedList.push(entry);
        console.log(`Approved: ${entry.address} - ${entry.hash}`);
      } else if (statuses[i] === 0) {
        pendingList.push(entry);
        console.log(`Pending: ${entry.address} - ${entry.hash}`);
      } else {
        rejectedList.push(entry);
        console.log(`Rejected: ${entry.address} - ${entry.hash}`);
      }
    }

    console.log("Processed data:", { approvedList, pendingList, rejectedList });
    return { approvedList, pendingList, rejectedList };
  } catch (error) {
    console.error("Error fetching manufacturers:", error);
    throw error;
  }
}
