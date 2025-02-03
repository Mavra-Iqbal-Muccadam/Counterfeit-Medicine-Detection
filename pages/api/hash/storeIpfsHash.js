import { ethers } from "ethers";

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const contractABI = [/* Copy ABI from Hardhat deployment */];

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { ipfsHash, fileName } = req.body;

  if (!ipfsHash || !fileName) return res.status(400).json({ error: "Missing parameters" });

  try {
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
    const signer = provider.getSigner(0);
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const tx = await contract.storeFile(ipfsHash, fileName);
    await tx.wait();

    return res.status(200).json({ message: "Hash stored on blockchain!", transactionHash: tx.hash });
  } catch (error) {
    console.error("Error storing hash:", error);
    return res.status(500).json({ error: "Failed to store hash" });
  }
}
