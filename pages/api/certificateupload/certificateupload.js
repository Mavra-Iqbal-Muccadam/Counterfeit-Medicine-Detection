import { supabase } from "../../../lib/supabaseClient";
import formidable from "formidable";
import fs from "fs";
import pdfParse from "pdf-parse";

// Disable bodyParser for file upload
export const config = {
  api: {
    bodyParser: false,
  },
};

async function extractCertificationNo(pdfPath) {
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);

    // Log the extracted text from the PDF
    console.log("Extracted PDF Text:", data.text); // Debugging line

    // Enhanced regex pattern to handle variations in the certification number format
    const certNumberPattern = /(?:Certificate\s*No|Certification\s*Number|Cert\s*No)[:\s-]*([A-Za-z0-9-]{7,15})/i;

    // Search for the pattern in the extracted text
    const match = data.text.match(certNumberPattern);

    if (match && match[1]) {
      const certificationNo = match[1].trim(); // Extract and clean the certification number
      console.log("Extracted Certification No:", certificationNo);
      return certificationNo;
    } else {
      console.log("No certification number found.");
      return null;
    }
  } catch (error) {
    console.error("Error extracting certification number:", error);
    return null;
  }
}


// Function to upload PDF to Supabase Storage
async function uploadCertificate(file, licenceNo) {
  try {
    const fileStream = fs.createReadStream(file.filepath);

    // Add the duplex option to the upload method for Node.js 18+
    const { data, error } = await supabase.storage
      .from("certification_pdf_storage")
      .upload(`certificates/${licenceNo}.pdf`, fileStream, {
        cacheControl: "3600",
        upsert: true,
        duplex: "half", // This is required for Node.js 18+ when using file streams
      });

    if (error) throw error;

    return data.path;
  } catch (error) {
    console.error("Upload Error:", error);
    return null;
  }
}


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: "Error parsing the form" });
    }

    const { name, licenceNo, email, phone, physicalAddress, walletAddress , website} = fields;
    const file = files.certification?.[0]; // Ensure file exists

    if (!name || !licenceNo || !email || !phone || !physicalAddress || !walletAddress || !file) {
      return res.status(400).json({ message: "Missing required fields or file" });
    }

    // ✅ Convert phone to an integer to prevent `BIGINT` errors
    const phoneNumber = parseInt(phone, 10);
    if (isNaN(phoneNumber)) {
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    // Step 1: Upload the file to Supabase Storage
    const filePath = await uploadCertificate(file, licenceNo);
    if (!filePath) {
      return res.status(500).json({ message: "Error uploading certificate" });
    }

    // Step 2: Extract the certification number from the PDF using regex
    const certificationNo = await extractCertificationNo(file.filepath);
    if (!certificationNo) {
      return res.status(400).json({ message: "Failed to extract certification number" });
    }

    // Step 3: Read file as binary for storing in PostgreSQL
    let certificationBinary = null;
    try {
      certificationBinary = fs.readFileSync(file.filepath);
    } catch (error) {
      console.error("Error reading file as binary:", error);
      return res.status(500).json({ message: "Error reading PDF file" });
    }

    // Step 4: Get public URL for the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from("certification_pdf_storage")
      .getPublicUrl(filePath);

    const certificationUrl = publicUrlData?.publicUrl || null;
    console.log("Public URL:", certificationUrl); // Debugging line

    
    // Step 5: Save manufacturer data to PostgreSQL
    const { error } = await supabase
      .from("manufacturers")
      .insert([{
        name,
        licence_no: licenceNo,
        email,
        website_url:website || null,
        phone: phoneNumber, // Ensure it's an integer
        physical_address: physicalAddress,
        wallet_address: walletAddress,
        certification_url: certificationUrl, // Ensure proper URL
        certification_no: certificationNo, // Store the extracted certification number
        certification_bytea: certificationBinary, // Store PDF as binary
      }]);

    if (error) {
      console.error("Database Insert Error:", error);
      return res.status(500).json({ message: "Error saving data to the database" });
    }

    res.status(200).json({ message: "File uploaded and data saved successfully" });
  });
}
