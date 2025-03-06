import { getManufacturerById } from "../../../lib/getmanufacturer"; // Fetch from DB
import { uploadJSONToPinata, uploadPDFFromURLToPinata } from "../../api/ipfs/uploadToIPFS"; // Upload to Pinata

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { manufacturer_id } = req.query;
  if (!manufacturer_id) {
    return res.status(400).json({ error: "Manufacturer ID is required" });
  }

  try {
    console.log(`🔍 Fetching Manufacturer ID: ${manufacturer_id} from database...`);

    // Step 1: Fetch manufacturer data from database
    const manufacturer = await getManufacturerById(manufacturer_id);

    if (!manufacturer) {
      return res.status(404).json({ error: "Manufacturer not found" });
    }

    console.log("✅ Manufacturer Data Fetched:", manufacturer);

    // Step 2: Upload Manufacturer Data to Pinata
    console.log("🚀 Uploading Manufacturer JSON to Pinata...");
    const jsonCID = await uploadJSONToPinata(manufacturer);
    console.log("✅ JSON Uploaded to Pinata. IPFS Hash:", jsonCID);

    // Step 3: Upload Certification PDF from URL (if exists)
    let pdfCID = null;
    if (manufacturer.certification_url) {
      console.log("📂 Fetching and Uploading PDF from URL...");
      pdfCID = await uploadPDFFromURLToPinata(manufacturer.certification_url);
      console.log("✅ PDF Uploaded to IPFS:", pdfCID);
    } else {
      console.log("ℹ️ No certification URL provided.");
    }

    // Step 4: Return the Manufacturer Data & IPFS CIDs
    return res.status(200).json({
      ...manufacturer,
      jsonCID, // IPFS CID for metadata
      pdfCID: pdfCID || "No PDF uploaded", // IPFS CID for PDF (if uploaded)
    });

  } catch (error) {
    console.error("❌ Unexpected Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
