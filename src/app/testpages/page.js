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
  
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });
  
    if (file) {
      form.append("certification", file);
    }
  
    try {
      // Upload file to IPFS and get the hash (Pinata or another service)
      const response = await fetch("/api/ipfs/uploadToIPFS", {
        method: "POST",
        body: form,
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload data to Pinata");
      }
  
      const data = await response.json();
      
      // Send IPFS hash and file name to blockchain
      const ipfsHash = data.metadataHash; // Replace with actual IPFS hash
      const fileName = file.name;
  
      const blockchainResponse = await fetch("/api/hash/storeIpfsHash", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ipfsHash, fileName }),
      });
  
      const blockchainData = await blockchainResponse.json();
  
      if (blockchainResponse.ok) {
        setResponseData({
          message: "Data stored on blockchain!",
          transactionHash: blockchainData.transactionHash,
        });
      } else {
        throw new Error("Failed to store hash on blockchain");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload data!");
    } finally {
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
        <select name="status" onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <input type="text" name="certifications" placeholder="Certifications (comma-separated)" onChange={handleChange} required />
        <input type="text" name="website_url" placeholder="Website URL" onChange={handleChange} required />

        <input type="file" accept="application/pdf" onChange={handleFileChange} required />
        <button type="submit" disabled={loading}>{loading ? "Uploading..." : "Submit"}</button>
      </form>

      {responseData && (
        <div>
          <h3>Data Stored on IPFS via Pinata!</h3>
          <p>Metadata: <a href={responseData.metadataHash} target="_blank">{responseData.metadataHash}</a></p>
          <p>PDF: <a href={responseData.pdfHash} target="_blank">{responseData.pdfHash}</a></p>
        </div>
      )}
    </div>
  );
}
