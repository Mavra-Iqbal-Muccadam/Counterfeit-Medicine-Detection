"use client";
import React, { useState } from "react";
import { verifyMedicineByQRAndFetchDetails } from "./authenticate"; // custom combined logic
import jsQR from "jsqr";

export default function QRImageUploadPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [scanResult, setScanResult] = useState("");
  const [medicineDetails, setMedicineDetails] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const code = jsQR(imageData.data, canvas.width, canvas.height);

      if (code?.data) {
        setScanResult(code.data);

        const result = await verifyMedicineByQRAndFetchDetails(code.data);
        if (result.status === "success") {
          setStatusMsg("✅ Medicine is authentic and approved.");
          setMedicineDetails(result.medicine);
        } else {
          setStatusMsg("❌ Medicine not verified.");
        }
      } else {
        setStatusMsg("❌ QR code not detected.");
      }
    };

    setSelectedImage(img.src);
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Upload QR Code Image</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {selectedImage && <img src={selectedImage} alt="QR" className="w-64 my-4 border" />}

      {statusMsg && <p className="font-semibold mt-2">{statusMsg}</p>}

      {medicineDetails && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h2 className="text-lg font-bold mb-2">Medicine Info</h2>
          <p><strong>Name:</strong> {medicineDetails.name}</p>
          <p><strong>Token ID:</strong> {medicineDetails.tokenId}</p>
          <p><strong>IPFS:</strong> {medicineDetails.ipfsHash}</p>
          <p><strong>Status:</strong> {medicineDetails.status}</p>
        </div>
      )}
    </div>
  );
}
