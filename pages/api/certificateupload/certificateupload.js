import { supabase } from "../../../lib/supabaseClient";
import formidable from "formidable";
import fs from "fs";
import pdfParse from "pdf-parse";
import Tesseract from "tesseract.js";


/**
 * Extracts text from a PDF, using OCR if needed.
 * @param {string} pdfPath - Path to the PDF file
 * @returns {Object} Extracted certification number and full text
 */
async function extractCertificationData(pdfPath) {
  try {
    // Read PDF as buffer and extract text
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    let fullText = data.text.trim();

    // If text extraction fails (e.g., scanned PDF), use Tesseract.js for OCR
    if (!fullText) {
      console.log("PDF appears to be scanned, using OCR...");
      const { data: ocrData } = await Tesseract.recognize(pdfPath, "eng");
      fullText = ocrData.text.trim();
    }

    console.log("Extracted PDF Text:", fullText);

    // Define regex patterns to find certification numbers
    const certPatterns = [
      /(?:Certificate\s*No|Certification\s*Number|Cert\s*No)[:\s-]*([A-Za-z0-9-]{7,15})/i,
      /(?:License\s*No|License\s*Number)[:\s-]*([A-Za-z0-9-]{7,15})/i
    ];

    let certificationNo = null;
    for (const pattern of certPatterns) {
      const match = fullText.match(pattern);
      if (match && match[1]) {
        certificationNo = match[1].trim();
        break;
      }
    }

    return {
      certificationNo: certificationNo || "Not Found",
      fullText: fullText,
    };
  } catch (error) {
    console.error("Error extracting data from PDF:", error);
    return null;
  }
}
/**
 * Uploads the certificate to Supabase Storage
 * @param {Object} file - Uploaded file object
 * @param {string} licenceNo - Licence number used for naming
 * @returns {string|null} Path of the uploaded file in storage
 */
async function uploadCertificate(file, licenceNo) {
  try {
    const fileStream = fs.createReadStream(file.filepath);
    console.log("Uploading file to Supabase Storage...");

    const { data, error } = await supabase.storage
      .from("certification_pdf_storage")
      .upload(`certificates/${licenceNo}.pdf`, fileStream, {
        cacheControl: "3600",
        upsert: true,
        duplex: "half",
      });

    if (error) {
      console.error("Upload Error:", error);
      throw error;
    }

    console.log("File uploaded successfully:", data.path);
    return data.path;
  } catch (error) {
    console.error("Upload Error:", error);
    return null;
  }
}

/**
 * API Handler for uploading certificates
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing the form:", err);
      return res.status(500).json({ message: "Error parsing the form" });
    }

    console.log("Parsed fields:", fields);
    console.log("Parsed files:", files);

    const { name, licenceNo, email, phone, physicalAddress, walletAddress, website } = fields;
    const file = files.certification?.[0];

    if (!name || !licenceNo || !email || !phone || !physicalAddress || !walletAddress || !file) {
      console.error("Missing required fields or file.");
      return res.status(400).json({ message: "Missing required fields or file" });
    }

    // Convert phone to an integer to prevent `BIGINT` errors
    const phoneNumber = parseInt(phone, 10);
    if (isNaN(phoneNumber)) {
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    // Step 1: Upload the file to Supabase Storage
    console.log("Starting file upload...");
    const filePath = await uploadCertificate(file, licenceNo);
    if (!filePath) {
      return res.status(500).json({ message: "Error uploading certificate" });
    }

    // Step 2: Extract certification data from the PDF
    console.log("Extracting certification details...");
    const extractedData = await extractCertificationData(file.filepath);
    if (!extractedData) {
      return res.status(400).json({ message: "Failed to extract certification details" });
    }

    const { certificationNo, fullText } = extractedData;

    // Step 3: Read file as binary for PostgreSQL storage
    let certificationBinary;
    try {
      certificationBinary = fs.readFileSync(file.filepath);
    } catch (error) {
      return res.status(500).json({ message: "Error reading PDF file" });
    }

    // Step 4: Get public URL for the uploaded file
    const { data: publicUrlData, error: urlError } = supabase.storage
      .from("certification_pdf_storage")
      .getPublicUrl(filePath);

    if (urlError) {
      return res.status(500).json({ message: "Error getting public URL" });
    }

    const certificationUrl = publicUrlData?.publicUrl || null;

    // Step 5: Save manufacturer data to PostgreSQL
    console.log("Inserting data into the manufacturers table...");
    const { error: dbError } = await supabase
      .from("manufacturers")
      .insert([{
        name,
        licence_no: licenceNo,
        email,
        website_url: website || null,
        phone: phoneNumber,
        physical_address: physicalAddress,
        wallet_address: walletAddress,
        certification_url: certificationUrl,
        certification_no: certificationNo,
        certification_text: fullText, // Stores full extracted text
        certification_bytea: certificationBinary,
      }]);

    if (dbError) {
      return res.status(500).json({ message: "Error saving data to the database" });
    }

    res.status(200).json({
      message: "File uploaded and data saved successfully",
      certificationNo,
      certificationUrl,
    });
  });
}
