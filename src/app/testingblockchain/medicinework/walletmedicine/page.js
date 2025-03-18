"use client";
import { useState, useEffect } from "react";
import { fetchMedicinesByManufacturerAndStatus } from "./fetch";
import { useWallet } from "./fetch"; // Import wallet detection hook

export default function MyMedicinesPage() {
  const { walletAddress, walletLoading } = useWallet(); // Detect wallet
  const [medicines, setMedicines] = useState({
    pending: [],
    accepted: [],
    rejected: []
  });
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Accepted, Rejected & Pending Medicines for the Wallet
  const fetchAllMedicines = async (address) => {
    if (!address) return;

    setLoading(true);
    console.log(`Fetching medicines for wallet: ${address}`);

    try {
      const medicineData = await fetchMedicinesByManufacturerAndStatus(address);

      console.log("✅ Medicines Retrieved & Categorized:", medicineData);

      if (medicineData) {
        setMedicines({
          pending: medicineData.pending || [],
          accepted: medicineData.accepted || [],
          rejected: medicineData.rejected || [],
        });
      }
    } catch (error) {
      console.error("❌ Error fetching medicines:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (walletAddress) {
      fetchAllMedicines(walletAddress);
    }
  }, [walletAddress]);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>My Medicines</h1>

      {walletLoading ? (
        <p>🔍 Detecting wallet...</p>
      ) : walletAddress ? (
        <p><strong>Connected Wallet:</strong> {walletAddress}</p>
      ) : (
        <p>❌ MetaMask not connected</p>
      )}

      <button 
        onClick={() => fetchAllMedicines(walletAddress)} 
        disabled={loading || !walletAddress} 
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", marginBottom: "20px" }}
      >
        {loading ? "Loading..." : "🔄 Refresh Medicines"}
      </button>

      {/* Render Pending, Accepted, and Rejected Medicines */}
      <MedicineList title="Pending Medicines" medicines={medicines.pending} color="orange" />
      <MedicineList title="Accepted Medicines" medicines={medicines.accepted} color="green" />
      <MedicineList title="Rejected Medicines" medicines={medicines.rejected} color="red" />
    </div>
  );
}

// ✅ Component to Display Medicines with All Details
const MedicineList = ({ title, medicines, color }) => (
  <div style={{ marginTop: "20px" }}>
    <h2 style={{ color }}>{title} ({medicines.length})</h2>
    {medicines.length > 0 ? (
      <ul style={{ listStyle: "none", padding: 0 }}>
        {medicines.map((medicine, index) => (
          <li key={index} style={{
            marginBottom: "20px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            textAlign: "left",
            maxWidth: "600px",
            margin: "auto",
            background: "#f9f9f9"
          }}>
            <h3>Token ID: {medicine.tokenId}</h3>
            <p><strong>Name:</strong> {medicine.name}</p>
            <p><strong>Medicine ID:</strong> {medicine.medicineId}</p>
            <p><strong>Batch Number:</strong> {medicine.batchNumber}</p>
            <p><strong>Description:</strong> {medicine.description}</p>
            <p><strong>Manufacturer:</strong> {medicine.manufacturer || "Unknown"}</p>
            <p><strong>Manufacture Date:</strong> {medicine.manufactureDate || "N/A"}</p>
            <p><strong>Expiry Date:</strong> {medicine.expiryDate || "N/A"}</p>
            <p><strong>Ingredients:</strong> {medicine.ingredients?.length > 0 ? medicine.ingredients.join(", ") : "No Ingredients Listed"}</p>
            <p><strong>Status:</strong> {medicine.status === 0 ? "Pending" : medicine.status === 1 ? "Rejected" : "Accepted"}</p>

            {/* Display Uploaded Files */}
            {medicine.uploadedFiles.length > 0 && (
              <div>
                <h4>Uploaded Files:</h4>
                {medicine.uploadedFiles.map((file, i) => (
                  <div key={i} style={{ marginBottom: "10px" }}>
                    <p><strong>File Name:</strong> {file.fileName}</p>
                    {file.mimeType?.includes("image") ? (
                      <img src={`https://ipfs.io/ipfs/${file.ipfsHash}`} 
                           alt={file.fileName} 
                           style={{ maxWidth: "100px", marginRight: "10px" }} />
                    ) : (
                      <a href={`https://ipfs.io/ipfs/${file.ipfsHash}`} 
                         target="_blank" 
                         rel="noopener noreferrer">
                        📄 View {file.fileName}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    ) : (
      <p>No {title.toLowerCase()} found.</p>
    )}
  </div>
);
