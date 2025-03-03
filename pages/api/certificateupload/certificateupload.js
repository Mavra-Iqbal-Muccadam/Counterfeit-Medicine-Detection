import formidable from "formidable";
import fs from "fs";
import pdfParse from "pdf-parse";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const config = {
  api: {
    bodyParser: false, // Required for file uploads
  },
};

export default async function handler(req, res) {
  console.log("🚀 API called: /api/certificateupload/uploadcertificate");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // 📥 Parse Uploaded File
    const form = formidable(); // ✅ Correct Formidable v3+ syntax

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    console.log("✅ Form parsed successfully!");
    const file = files.certification?.[0];

    if (!file) {
      console.error("❌ No file uploaded.");
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 📄 Extract Raw Text from PDF
    console.log("🔍 Extracting text from PDF...");
    const dataBuffer = fs.readFileSync(file.filepath);
    const pdfData = await pdfParse(dataBuffer);
    let extractedText = pdfData.text.trim();

    console.log("📜 Extracted Text (Preview):", extractedText.substring(0, 500), "...");

    if (!extractedText) {
      console.error("❌ Failed to extract text from PDF.");
      return res.status(400).json({ message: "Failed to extract text from PDF" });
    }

    // 🔥 Send Extracted Text to Qwen API for Structured Extraction
    console.log("📡 Sending extracted text to Qwen AI...");
    const qwenResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "qwen/qwen-2-7b-instruct:free",
        messages: [
          { 
            role: "system", 
            content: "You are an AI assistant trained to extract key details from a manufacturer certificate." 
          },
          {
            role: "user",
            content: `Extract the following details from this certificate in **valid JSON format** with keys in **snake_case**:
            - manufacturer_name
            - license_number
            - certificate_number
            - date_of_issue (format: MM/DD/YYYY)
            - address
        
            Return only the JSON object, **without markdown formatting**. Here is the extracted text:
            ${extractedText}`
          }
        ],
        
        max_tokens: 100,
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // ✅ Parse AI Response
    const structuredData = qwenResponse.data.choices[0]?.message?.content.trim();
    console.log("✅ Extracted Structured Data from Qwen:", structuredData);

    // 📤 Send JSON Response to Frontend
    return res.status(200).json(JSON.parse(structuredData));

  } catch (error) {
    console.error("❌ Unexpected error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
