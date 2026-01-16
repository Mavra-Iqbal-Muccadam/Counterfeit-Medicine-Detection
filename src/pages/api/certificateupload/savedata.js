// import { supabase } from "../../../lib/supabaseClientservice";

// export default async function handler(req, res) {
//   console.log("🚀 API called: /api/certificateupload/savedata");

//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   try {
//     const {
//       name,
//       licenceNo,
//       email,
//       phone,
//       website,
//       dateOfIssue,
//       physicalAddress,
//       walletAddress,
//       certificationNumber,
//       certificationBytea, // Base64-encoded PDF
//     } = req.body;

//     console.log("📡 Received Request Body:", req.body);

//     if (!certificationBytea) {
//       console.error("❌ certificationBytea is missing.");
//       return res
//         .status(400)
//         .json({ message: "Missing certification file data" });
//     }

//     console.log("🔍 Converting Base64 to Binary...");
//     const binaryBuffer = Buffer.from(certificationBytea, "base64");

//     if (binaryBuffer.length === 0) {
//       console.error("❌ Binary conversion failed!");
//       return res.status(500).json({ message: "Binary conversion failed" });
//     }

//     console.log("📏 Binary Buffer Size:", binaryBuffer.length, "bytes");

//     const bucketName = "certification_pdf_storage";
//     const fileName = certificate_${Date.now()}.pdf;
//     const fileName = `certificate_${Date.now()}.pdf`;

//     console.log("📤 Uploading PDF to Supabase Storage...");
//     const { data: uploadData, error: uploadError } = await supabase.storage
//       .from(bucketName)
//       .upload(fileName, binaryBuffer, {
//         contentType: "application/pdf",
//       });

//     if (uploadError) {
//       console.error("❌ Error uploading PDF to storage:", uploadError);
//       return res
//         .status(500)
//         .json({ message: "Failed to upload PDF", error: uploadError });
//     }

//     console.log("✅ PDF uploaded successfully:", uploadData);

//     const { data: publicUrlData } = await supabase.storage
//       .from(bucketName)
//       .getPublicUrl(fileName);
//     const certificationUrl = publicUrlData?.publicUrl || null;

//     console.log("🔗 Certification Public URL:", certificationUrl);

//     console.log("📡 Saving data to database...");
//     const { data, error } = await supabase.from("manufacturers").insert([
//       {
//         name,
//         licence_no: licenceNo,
//         email,
//         phone,
//         website_url: website || null,
//         date_of_issue: dateOfIssue,
//         physical_address: physicalAddress,
//         wallet_address: walletAddress,
//         certification_no: certificationNumber,
//         certification_url: certificationUrl, // ✅ Store public URL
//         certification_bytea: new Uint8Array(binaryBuffer), // ✅ Store BYTEA data
//       },
//     ]);

//     if (error) {
//       console.error("❌ Error inserting data into DB:", error);
//       return res.status(500).json({ message: "Database error", error });
//     }

//     console.log("✅ Data saved successfully!", data);

//     return res
//       .status(200)
//       .json({ message: "Data saved successfully!", data, certificationUrl });
//   } catch (error) {
//     console.error("❌ Unexpected error:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// }

import { supabase } from "@/lib/supabaseClientservice";

export default async function handler(req, res) {
  console.log("🚀 API called: /api/certificateupload/savedata");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const {
      name,
      licenceNo,
      email,
      phone,
      website,
      dateOfIssue,
      physicalAddress,
      walletAddress,
      certificationNumber,
      certificationBytea, // Base64-encoded PDF
    } = req.body;

    console.log("📡 Received Request Body:", req.body);

    if (!certificationBytea) {
      console.error("❌ certificationBytea is missing.");
      return res
        .status(400)
        .json({ message: "Missing certification file data" });
    }

    console.log("🔍 Converting Base64 to Binary...");
    const binaryBuffer = Buffer.from(certificationBytea, "base64");

    if (binaryBuffer.length === 0) {
      console.error("❌ Binary conversion failed!");
      return res.status(500).json({ message: "Binary conversion failed" });
    }

    console.log("📏 Binary Buffer Size:", binaryBuffer.length, "bytes");

    const bucketName = "certification_pdf_storage";
    const fileName = `certificate_${Date.now()}.pdf`;

    console.log("📤 Uploading PDF to Supabase Storage...");
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, binaryBuffer, {
        contentType: "application/pdf",
      });

    if (uploadError) {
      console.error("❌ Error uploading PDF to storage:", uploadError);
      return res
        .status(500)
        .json({ message: "Failed to upload PDF", error: uploadError });
    }

    console.log("✅ PDF uploaded successfully:", uploadData);

    const { data: publicUrlData } = await supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);
    const certificationUrl = publicUrlData?.publicUrl || null;

    console.log("🔗 Certification Public URL:", certificationUrl);

    console.log("📡 Saving data to database...");
    const { data, error } = await supabase.from("manufacturers").insert([
      {
        name,
        licence_no: licenceNo,
        email,
        phone,
        website_url: website || null,
        date_of_issue: dateOfIssue,
        physical_address: physicalAddress,
        wallet_address: walletAddress,
        certification_no: certificationNumber,
        certification_url: certificationUrl, // ✅ Store only public URL
      },
    ]);

    if (error) {
      console.error("❌ Error inserting data into DB:", error);

      // Handle duplicate key error
      if (error.code === "23505") {
        return res.status(400).json({ message: "This user already exists." });
      }

      // Handle other database errors
      return res.status(500).json({ message: "Error registering user." });
    }

    console.log("✅ Data saved successfully!", data);

    return res
      .status(200)
      .json({ message: "Data saved successfully!", data, certificationUrl });
  } catch (error) {
    console.error("❌ Unexpected error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
