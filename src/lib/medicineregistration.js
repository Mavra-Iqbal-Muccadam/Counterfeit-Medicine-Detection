import {supabase} from './supabaseClientanon';
export const insertMedicine = async (medicineData) => {
  try {
    console.log("🚀 Starting medicine data insertion...");

    // Upload PDF file to Supabase storage
    let pdfUrl = '';
    if (medicineData.certificate && medicineData.certificate.length > 0) {
      const pdfFile = medicineData.certificate[0];

      // Check if pdfFile is valid
      if (!pdfFile || !pdfFile.name) {
        throw new Error("Invalid PDF file. Please upload a valid PDF.");
      }

      const sanitizedPdfName = pdfFile.name.replace(/ /g, '_'); // Replace spaces with underscores
      console.log("📤 Uploading PDF to Supabase Storage...");

      const { data: pdfData, error: pdfError } = await supabase.storage
        .from('medicine_pdf_storage')
        .upload(`pdfs/${sanitizedPdfName}`, pdfFile);

      if (pdfError) {
        console.error('❌ Error uploading PDF:', pdfError);
        return { success: false, error: pdfError.message };
      }

      console.log("✅ PDF uploaded successfully:", pdfData);

      // Get public URL for the uploaded PDF
      const { data: pdfPublicUrlData } = await supabase.storage
        .from('medicine_pdf_storage')
        .getPublicUrl(pdfData.path);

      pdfUrl = pdfPublicUrlData?.publicUrl || '';
      console.log("🔗 PDF Public URL:", pdfUrl);
    } else {
      console.warn("⚠️ No PDF file found in medicineData.certificate");
      return { success: false, error: "Certificate PDF is required." };
    }

    // Upload image file to Supabase storage (optional, no validation)
    let imageUrl = '';
    if (medicineData.files && medicineData.files.length > 0) {
      const imageFile = medicineData.files[0];

      // No validation for image file type
      if (imageFile && imageFile.name) {
        const sanitizedImageName = imageFile.name.replace(/ /g, '_'); // Replace spaces with underscores
        console.log("📤 Uploading Image to Supabase Storage...");

        const { data: imageData, error: imageError } = await supabase.storage
          .from('medicine_image_storage')
          .upload(`images/${sanitizedImageName}`, imageFile);

        if (imageError) {
          console.error('❌ Error uploading image:', imageError);
          return { success: false, error: imageError.message };
        }

        console.log("✅ Image uploaded successfully:", imageData);

        // Get public URL for the uploaded image
        const { data: imagePublicUrlData } = await supabase.storage
          .from('medicine_image_storage')
          .getPublicUrl(imageData.path);

        imageUrl = imagePublicUrlData?.publicUrl || '';
        console.log("🔗 Image Public URL:", imageUrl);
      } else {
        console.warn("⚠️ Invalid image file. Skipping image upload.");
      }
    } else {
      console.warn("⚠️ No image file found in medicineData.files. Skipping image upload.");
    }

    // Insert data into the medicine table
    const formattedData = {
      certificate_pdf: pdfUrl,
      medicine_name: medicineData.name,
      medicine_id: medicineData.medicineId,
      batch_number: medicineData.batchNumber,
      manufacture_date: medicineData.manufactureDate,
      expiry_date: medicineData.expiryDate,
      medicine_type: medicineData.types,
      medicine_image: imageUrl,
      description: medicineData.description,
      wallet_address: medicineData.walletAddress,
      status: "pending",
      qr_hash: null,
      excipients: medicineData.excipients,
    };

    console.log("📡 Saving medicine data to database...");
    console.log("Formatted Data:", formattedData); // Log the data being inserted

    const { data, error } = await supabase.from('medicine').insert([formattedData]);

    if (error) {
      console.error('❌ Error inserting medicine:', error);
      return { success: false, error: error.message };
    }

    console.log("✅ Medicine inserted successfully:", data);
    return { success: true, data, pdfUrl, imageUrl };
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    return { success: false, error: err.message };
  }
};