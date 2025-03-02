import { IncomingForm } from "formidable";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";

export const config = {
  api: {
    bodyParser: false, // Required for file uploads
  },
};

// Function to upload JSON data to Pinata
async function uploadJSONToPinata(jsonData) {
  try {
    console.log("🔍 Preparing JSON data for Pinata:", jsonData);
    
    const formData = new FormData();
    formData.append("file", Buffer.from(JSON.stringify(jsonData)), {
      filename: "metadata.json",
      contentType: "application/json",
    });

    formData.append("pinataMetadata", JSON.stringify({ name: jsonData.name || "Manufacturer Data" }));
    formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));

    console.log("🚀 Uploading JSON to Pinata...");
    const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
      },
    });

    console.log("📥 [DEBUG] Raw Pinata Response for JSON Upload:", response.data);

    console.log("✅ JSON Uploaded to Pinata. IPFS Hash:", response.data.IpfsHash);
    return response.data.IpfsHash;
  } catch (error) {
    console.error("❌ Error Uploading JSON to Pinata:", error.response?.data || error.message);
    throw new Error("Failed to upload JSON to Pinata");
  }
}

// Function to upload PDF file to Pinata
async function uploadPDFToPinata(fileBuffer) {
  try {
    console.log("🔍 Preparing PDF for Pinata...");

    const formData = new FormData();
    formData.append("file", fileBuffer, { filename: "certification.pdf" });

    formData.append("pinataMetadata", JSON.stringify({ name: "Certification Document" }));
    formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));

    console.log("🚀 Uploading PDF to Pinata...");
    const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
      },
    });

    console.log("📥 [DEBUG] Raw Pinata Response for PDF Upload:", response.data);

    console.log("✅ PDF Uploaded to Pinata. IPFS Hash:", response.data.IpfsHash);
    return response.data.IpfsHash;
  } catch (error) {
    console.error("❌ Error Uploading PDF to Pinata:", error.response?.data || error.message);
    throw new Error("Failed to upload PDF to Pinata");
  }
}

// API Route
export default async function handler(req, res) {
  console.log("⚡ Received request:", req.method, req.url);

  if (req.method !== "POST") {
    console.warn("⚠️ Invalid request method:", req.method);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    console.log("📥 Parsing form data...");
    const form = new IncomingForm({ keepExtensions: true, multiples: false });

    // 🔍 Parse FormData Properly
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error("❌ Error parsing form data:", err);
          reject(err);
        } else {
          console.log("✅ Form data parsed successfully:", fields);
          resolve({ fields, files });
        }
      });
    });

    // ✅ Manufacturer JSON Data (Ensure proper structure)
    const manufacturerData = {
      manufacturer_id: fields.manufacturer_id?.[0] || "",
      name: fields.name?.[0] || "",
      license_number: fields.license_number?.[0] || "",
      physical_address: fields.physical_address?.[0] || "",
      email: fields.email?.[0] || "",
      phone: fields.phone?.[0] || "",
      wallet_address: fields.wallet_address?.[0] || "",
      registration_date: fields.registration_date?.[0] || "",
      certifications: fields.certifications?.[0]?.trim() || "",
      website_url: fields.website_url?.[0] || "",
    };

    console.log("🔍 Final Manufacturer Data:", manufacturerData);

    // 🔍 Upload JSON Data to Pinata
    let jsonUrl;
    try {
      jsonUrl = await uploadJSONToPinata(manufacturerData);
      console.log("✅ JSON Metadata Uploaded to IPFS:", jsonUrl);
    } catch (error) {
      console.error("❌ Failed to upload JSON to Pinata.");
      return res.status(500).json({ error: "Failed to upload JSON to IPFS" });
    }

    // 🔍 Read & Upload PDF (if exists)
    let pdfUrl = null;
    if (files.certification?.[0]?.filepath) {
      try {
        console.log("📂 Reading PDF file:", files.certification[0].filepath);
        const pdfBuffer = fs.readFileSync(files.certification[0].filepath);
        pdfUrl = await uploadPDFToPinata(pdfBuffer);
        console.log("✅ PDF Uploaded to IPFS:", pdfUrl);
      } catch (error) {
        console.warn("⚠️ Failed to upload PDF, continuing without it.", error);
      }
    } else {
      console.log("ℹ️ No PDF file provided.");
    }

    console.log("🎉 Successfully stored manufacturer data on IPFS!");
    
    // Debug: Log final response before sending
    console.log("📤 [DEBUG] Sending Response to Frontend:", {
      ipfsHash: jsonUrl,
      pdfHash: pdfUrl || "No PDF uploaded",
    });

    return res.status(200).json({
      ipfsHash: jsonUrl,  // Ensure this key exists
      pdfHash: pdfUrl || "No PDF uploaded",
    });

  } catch (error) {
    console.error("❌ Unexpected Error in API Route:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
