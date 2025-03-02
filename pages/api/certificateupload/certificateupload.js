import { supabase } from "../../../lib/supabaseClient";
import formidable from "formidable";

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
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const form = formidable({ multiple: false, maxFileSize: 200 * 1024 * 1024, uploadDir: "/tmp" }); // 200MB

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing the form:", err);
      return res.status(500).json({ message: "Error parsing the form" });
    }

    console.log("Parsed fields:", fields);
    console.log("Parsed files:", files);

    const { name, licenceNo, email, phone, physicalAddress, walletAddress, website, dateOfIssue, issuingAuthority, certificationNumber } = fields;
    const file = files.certification?.[0];

    if (!name || !licenceNo || !email || !phone || !physicalAddress || !walletAddress || !file || !dateOfIssue || !issuingAuthority || !certificationNumber) {
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

    // Step 2: Get public URL for the uploaded file
    const { data: publicUrlData, error: urlError } = supabase.storage
      .from("certification_pdf_storage")
      .getPublicUrl(filePath);

    if (urlError) {
      return res.status(500).json({ message: "Error getting public URL" });
    }

    const certificationUrl = publicUrlData?.publicUrl || null;

    // Step 3: Save manufacturer data to PostgreSQL
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
        date_of_issue: dateOfIssue,
        issuing_authority: issuingAuthority,
        certification_number: certificationNumber,
      }]);

    if (dbError) {
      return res.status(500).json({ message: "Error saving data to the database" });
    }

    res.status(200).json({
      message: "File uploaded and data saved successfully",
      certificationUrl,
    });
  });
}
