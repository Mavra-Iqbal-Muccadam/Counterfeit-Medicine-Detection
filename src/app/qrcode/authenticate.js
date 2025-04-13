
import { ethers } from "ethers";
import MedicineNFT from "../../../artifacts/blockchain/contracts/medicine.sol/MedicineNFT.json";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MEDICINE_NFT_ADDRESS;
const ABI = MedicineNFT.abi;

export const verifyMedicineByQRAndFetchDetails = async (ipfsHash) => {
  try {
    const response = await fetch(`/api/qrcode/${ipfsHash}`);
    const result = await response.json();

    if (response.status === 200) {
      return {
        status: "success",
        medicine: {
          ...result,
          ipfsHash,
        }
      };
    }

    return { status: "not_in_db", tokenId: result.tokenId, ipfsHash };
  } catch (err) {
    return { status: "error", error: err.message };
  }
};
