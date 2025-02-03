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
  const formData = new FormData();
  formData.append("file", Buffer.from(JSON.stringify(jsonData)), {
    filename: "metadata.json",
    contentType: "application/json",
  });

  const metadata = JSON.stringify({ name: jsonData.name || "Manufacturer Data" });
  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({ cidVersion: 1 });
  formData.append("pinataOptions", options);

  const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
    headers: {
      "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      pinata_api_key: process.env.PINATA_API_KEY,
      pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
    },
  });

  return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
}

// Function to upload PDF file to Pinata
async function uploadPDFToPinata(fileBuffer) {
  const formData = new FormData();
  formData.append("file", fileBuffer, { filename: "certification.pdf" });

  const metadata = JSON.stringify({ name: "Certification Document" });
  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({ cidVersion: 1 });
  formData.append("pinataOptions", options);

  const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
    headers: {
      "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      pinata_api_key: process.env.PINATA_API_KEY,
      pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
    },
  });

  return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
}

// API Route
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const form = new IncomingForm({ keepExtensions: true, multiples: true });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    // Manufacturer JSON Data
    const manufacturerData = {
      manufacturer_id: fields.manufacturer_id?.[0] || "",
      name: fields.name?.[0] || "",
      license_number: fields.license_number?.[0] || "",
      physical_address: fields.physical_address?.[0] || "",
      email: fields.email?.[0] || "",
      phone: fields.phone?.[0] || "",
      wallet_address: fields.wallet_address?.[0] || "",
      registration_date: fields.registration_date?.[0] || "",
      status: fields.status?.[0] || "",
      certifications: fields.certifications ? JSON.parse(fields.certifications[0]) : [],
      website_url: fields.website_url?.[0] || "",
    };

    // Read PDF file (if provided)
    let pdfUrl = null;
    if (files.certification) {
      const pdfBuffer = fs.readFileSync(files.certification[0].filepath);
      pdfUrl = await uploadPDFToPinata(pdfBuffer);
    }

    // Upload JSON to Pinata
    const jsonUrl = await uploadJSONToPinata(manufacturerData);

    return res.status(200).json({
      message: "Data stored on IPFS via Pinata successfully!",
      metadataHash: jsonUrl,
      pdfHash: pdfUrl || "No PDF uploaded",
    });
  } catch (error) {
    console.error("Error Uploading to Pinata:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
