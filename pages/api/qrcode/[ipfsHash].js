// ✅ Step 1: Updated Backend API (pages/api/qrcode/[ipfsHash].js)

import { supabase } from "../../../lib/supabaseClientanon";
import { ethers } from "ethers";
import MedicineNFT from "../../../artifacts/blockchain/contracts/medicine.sol/MedicineNFT.json";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MEDICINE_NFT_ADDRESS;
const ABI = MedicineNFT.abi;

export default async function handler(req, res) {
  const { ipfsHash } = req.query;

  try {
    const provider = new ethers.JsonRpcProvider(); // or use window.ethereum on frontend
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

    const isValid = await contract.verifyMedicineByQR(ipfsHash);
    if (!isValid) {
      return res.status(403).json({ message: "Hash is not valid or not accepted." });
    }

    // Get token ID from the mapping (assumes mapping exists)
    const tokenId = await contract.getTokenIdByIPFS(ipfsHash);

    const { data, error } = await supabase
      .from("sale_medicine")
      .select("*")
      .eq("medicine_id", tokenId)
      .single();

    if (error) {
      return res.status(404).json({ message: "Token exists but not found in DB", tokenId });
    }

    return res.status(200).json({ ...data, tokenId });
  } catch (err) {
    console.error("Error verifying hash:", err);
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
}
