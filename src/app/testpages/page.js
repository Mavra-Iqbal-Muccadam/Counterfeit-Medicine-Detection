"use client"; // Client component for form handling

import { useState } from "react";

export default function UploadPage() {
  const [formData, setFormData] = useState({
    manufacturer_id: "",
    name: "",
    license_number: "",
    physical_address: "",
    email: "",
    phone: "",
    wallet_address: "",
    registration_date: "",
    status: "pending",
    certifications: "",
    website_url: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("🚀 [START] Uploading Data to IPFS...");

      // 1️⃣ Upload Data to IPFS
      const form = new FormData();
      Object.keys(formData).forEach((key) => form.append(key, formData[key]));

      if (file) {
        form.append("certification", file);
      }

      console.log("📤 [REQUEST] Sending data to IPFS...");
      const ipfsResponse = await fetch("/api/ipfs/uploadToIPFS", { method: "POST", body: form });
      const ipfsData = await ipfsResponse.json();

      if (!ipfsResponse.ok) {
        console.error("❌ [ERROR] Failed to upload data to IPFS. Response:", ipfsData);
        throw new Error("IPFS upload failed");
      }

      const ipfsHash = ipfsData.ipfsHash;
      console.log("✅ [SUCCESS] IPFS Hash received:", ipfsHash);

      // 2️⃣ Ensure ipfsHash is not undefined before making the blockchain request
      if (!ipfsHash) {
        console.error("❌ [ERROR] No IPFS hash received. Cannot proceed.");
        alert("Failed to upload data to IPFS. Please try again.");
        setLoading(false);
        return;
      }

      const blockchainPayload = {
        ipfsHash,
        walletAddress: formData.wallet_address,
        status: "pending",
      };
      
      console.log("📤 [DEBUG] Sending Blockchain Transaction with Data:", blockchainPayload);
      
      const blockchainResponse = await fetch("/api/manufacturerregistration/manufacturerregistration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blockchainPayload),
      });
      
      
      const blockchainData = await blockchainResponse.json();

      if (!blockchainResponse.ok) {
        console.error("❌ [ERROR] Blockchain transaction failed. Response:", blockchainData);
        throw new Error(blockchainData.error || "Blockchain transaction failed");
      }

      console.log("✅ [SUCCESS] Blockchain Transaction Successful! Tx Hash:", blockchainData.txHash);

      setResponseData({
        message: "Data stored on blockchain (Pending Approval)",
        transactionHash: blockchainData.txHash,
        ipfsHash: ipfsHash,
      });

    } catch (error) {
      console.error("❌ [ERROR] in handleSubmit:", error.message || error);
      alert(`Failed to upload data! ${error.message}`);
    } finally {
      console.log("⚡ [END] Upload process completed.");
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Upload Manufacturer Data & Certification</h2>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="manufacturer_id" placeholder="Manufacturer ID" onChange={handleChange} required />
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="text" name="license_number" placeholder="License Number" onChange={handleChange} required />
        <input type="text" name="physical_address" placeholder="Address" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
        <input type="text" name="wallet_address" placeholder="Wallet Address" onChange={handleChange} required />
        <input type="date" name="registration_date" onChange={handleChange} required />
        <input type="text" name="certifications" placeholder="Certifications" onChange={handleChange} required />
        <input type="text" name="website_url" placeholder="Website URL" onChange={handleChange} required />
        <input type="file" accept="application/pdf" onChange={handleFileChange} required />
        <button type="submit" disabled={loading}>{loading ? "Uploading..." : "Submit"}</button>
      </form>

      {responseData && (
        <div>
          <h3>Data Stored on IPFS via Pinata!</h3>
          <p>Metadata: <a href={responseData.metadataHash} target="_blank">{responseData.metadataHash}</a></p>
          <p>PDF: <a href={responseData.pdfHash} target="_blank">{responseData.pdfHash}</a></p>
          <p>Transaction: <a href={`https://etherscan.io/tx/${responseData.transactionHash}`} target="_blank">{responseData.transactionHash}</a></p>
        </div>
      )}
    </div>
  );
}
