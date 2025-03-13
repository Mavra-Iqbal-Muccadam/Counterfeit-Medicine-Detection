import axios from "axios";
import FormData from "form-data";

const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;
const PINATA_JSON_URL = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
const PINATA_FILE_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS";

/**
 * Upload JSON Data to Pinata
 * @param {Object} jsonData - Manufacturer data
 * @returns {string} - IPFS CID
 */
export async function uploadJSONToPinata(jsonData) {
  try {
    console.log("🔍 Uploading JSON to Pinata...");

    const response = await axios.post(
      PINATA_JSON_URL,
      {
        pinataContent: jsonData,
        pinataMetadata: { name: jsonData.name || "Manufacturer Data" },
        pinataOptions: { cidVersion: 1 },
      },
      {
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
        },
      }
    );

    console.log("✅ JSON Uploaded. IPFS Hash:", response.data.IpfsHash);
    return response.data.IpfsHash;
  } catch (error) {
    console.error("❌ Error Uploading JSON to Pinata:", error.response?.data || error.message);
    throw new Error("Failed to upload JSON to Pinata");
  }
}

/**
 * Upload PDF from a URL to Pinata
 * @param {string} pdfUrl - URL of the certification PDF
 * @returns {string} - IPFS CID
 */
export async function uploadPDFFromURLToPinata(pdfUrl) {
  try {
    console.log("📥 Fetching PDF from URL:", pdfUrl);

    // Fetch PDF from URL
    const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });

    // Convert response data to Blob (for browser compatibility)
    const pdfBlob = new Blob([response.data], { type: "application/pdf" });

    console.log("🚀 Uploading PDF to Pinata...");
    const formData = new FormData();
    formData.append("file", pdfBlob, "certification.pdf"); // Use Blob instead of Buffer

    const pinataResponse = await axios.post(PINATA_FILE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      },
    });

    console.log("✅ PDF Uploaded. IPFS Hash:", pinataResponse.data.IpfsHash);
    return pinataResponse.data.IpfsHash;
  } catch (error) {
    console.error("❌ Error Uploading PDF to Pinata:", error.response?.data || error.message);
    throw new Error("Failed to upload PDF to Pinata");
  }
}
