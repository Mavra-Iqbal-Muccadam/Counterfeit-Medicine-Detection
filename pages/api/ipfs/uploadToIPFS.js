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

    console.log("✅ JSON Uploaded to Pinata. IPFS Hash:", response.data.IpfsHash);
    return response.data.IpfsHash;
  } catch (error) {
    console.error("❌ Error Uploading JSON to Pinata:", error.response?.data || error.message);
    throw new Error("Failed to upload JSON to Pinata");
  }
}

// Function to fetch PDF from URL & upload it to Pinata
async function uploadPDFFromURLToPinata(pdfUrl) {
  try {
    console.log("📥 Downloading PDF from URL:", pdfUrl);

    // Fetch PDF from URL
    const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });

    // Convert response data to Buffer
    const pdfBuffer = Buffer.from(response.data);

    console.log("🚀 Uploading PDF to Pinata...");
    const formData = new FormData();
    formData.append("file", pdfBuffer, { filename: "certification.pdf" });

    formData.append("pinataMetadata", JSON.stringify({ name: "Certification Document" }));
    formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));

    const pinataResponse = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
      },
    });

    console.log("✅ PDF Uploaded to Pinata. IPFS Hash:", pinataResponse.data.IpfsHash);
    return pinataResponse.data.IpfsHash;
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
    const { fields } = await new Promise((resolve, reject) => {
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
      certification_url: fields.certification_url?.[0] || "", // New field for PDF URL
    };

    console.log("🔍 Final Manufacturer Data:", manufacturerData);

    // 🔍 Upload JSON Data to Pinata
    let jsonCid;
    try {
      jsonCid = await uploadJSONToPinata(manufacturerData);
      console.log("✅ JSON Metadata Uploaded to IPFS:", jsonCid);
    } catch (error) {
      console.error("❌ Failed to upload JSON to Pinata.");
      return res.status(500).json({ error: "Failed to upload JSON to IPFS" });
    }

    // 🔍 Fetch & Upload Certification PDF to Pinata
    let pdfCid = null;
    if (manufacturerData.certification_url) {
      try {
        console.log("📂 Fetching and Uploading PDF from URL...");
        pdfCid = await uploadPDFFromURLToPinata(manufacturerData.certification_url);
        console.log("✅ PDF Uploaded to IPFS:", pdfCid);
      } catch (error) {
        console.warn("⚠️ Failed to upload PDF, continuing without it.", error);
      }
    } else {
      console.log("ℹ️ No certification URL provided.");
    }

    console.log("🎉 Successfully stored manufacturer data on IPFS!");
    
    // Debug: Log final response before sending
    console.log("📤 [DEBUG] Sending Response to Frontend:", {
      ipfsHash: jsonCid,
      pdfHash: pdfCid || "No PDF uploaded",
    });

    return res.status(200).json({
      ipfsHash: jsonCid,  // Ensure this key exists
      pdfHash: pdfCid || "No PDF uploaded",
    });

  } catch (error) {
    console.error("❌ Unexpected Error in API Route:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
