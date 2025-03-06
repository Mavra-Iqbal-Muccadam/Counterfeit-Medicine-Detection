import { ethers } from "ethers";
import ManufacturerIPFSStorageABI from "./ManufacturerIPFSStorage.json";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS; // Replace with actual deployed contract address
const contract = new ethers.Contract(contractAddress, ManufacturerIPFSStorageABI, signer);

export const storeCID = async (manufacturerId, cid) => {
  try {
    const tx = await contract.storeCID(manufacturerId, cid);
    await tx.wait(); // Wait for transaction confirmation
    console.log("CID stored successfully:", cid);
  } catch (error) {
    console.error("Error storing CID:", error);
  }
};

export const fetchCID = async (manufacturerId) => {
  try {
    const cid = await contract.getCID(manufacturerId);
    console.log("Fetched CID:", cid);
    return cid;
  } catch (error) {
    console.error("Error fetching CID:", error);
  }
};
