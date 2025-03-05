import formidable from "formidable";
import fs from "fs";
import pdfParse from "pdf-parse";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  console.log("🚀 API called: /api/certificateupload/uploadcertificate");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const form = formidable();
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    console.log("✅ Form parsed successfully!");
    const file = files.certification?.[0];

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("🔍 Reading PDF file...");
    const dataBuffer = await fs.promises.readFile(file.filepath);
    console.log("📏 PDF file size:", dataBuffer.length, "bytes");

    console.log("🔍 Extracting text from PDF...");
    const pdfData = await pdfParse(dataBuffer);
    let extractedText = pdfData.text.trim();

    if (!extractedText) {
      return res.status(400).json({ message: "Failed to extract text from PDF" });
    }

    console.log("📡 Sending extracted text to Qwen AI...");
    const qwenResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "qwen/qwen-2-7b-instruct:free",
        messages: [
          {
            role: "system",
            content: "You are an AI assistant trained to extract key details from a manufacturer certificate.",
          },
          {
            role: "user",
            content: `Extract the following details in **valid JSON format**:
            - manufacturer_name
            - license_number
            - certificate_number
            - date_of_issue (YYYY-MM-DD)
            - address

            Return only the JSON object, **without markdown formatting**. Here is the extracted text:
            ${extractedText}`,
          },
        ],
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const structuredData = qwenResponse.data.choices[0]?.message?.content.trim();
    const cleanedJson = structuredData.replace(/```json|```/g, "").trim();
    const jsonData = JSON.parse(cleanedJson);

    // Fixing Date Format
    if (jsonData.date_of_issue) {
      const date = new Date(jsonData.date_of_issue);
      if (!isNaN(date.getTime())) {
        jsonData.date_of_issue = date.toISOString().split("T")[0]; // Convert to YYYY-MM-DD
      }
    }

    // Convert PDF to Base64
    const certificationBytea = dataBuffer.toString("base64");

    console.log("📡 Returning extracted data and Base64 PDF...");
    return res.status(200).json({
      message: "Certificate processed successfully",
      extractedData: jsonData,
      certificationBytea, // Send as Base64
    });

  } catch (error) {
    console.error("❌ Unexpected error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
