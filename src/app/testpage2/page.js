"use client";
import React, { useState } from "react";
import { getApprovedManufacturers } from "../blockchain/retrievefromblockchain";

// 🔹 Function to fetch JSON data from IPFS
const fetchIPFSData = async (cid) => {
  try {
    const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
    if (!response.ok) throw new Error("Failed to fetch IPFS data");
    return await response.json(); // 🔹 Parse JSON data
  } catch (error) {
    console.error(`❌ Error fetching IPFS data for CID ${cid}:`, error);
    return null; // Return null if fetch fails
  }
};

const ChainPage = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchManufacturers = async () => {
    setLoading(true);
    const data = await getApprovedManufacturers();

    // 🔹 Fetch real data from IPFS for each manufacturer
    const enrichedManufacturers = await Promise.all(
      data.map(async (m) => {
        const ipfsData = await fetchIPFSData(m.jsonCID); // Fetch from IPFS
        return {
          ...m,
          ipfsData, // 🔹 Add extracted data
        };
      })
    );

    setManufacturers(enrichedManufacturers);
    setLoading(false);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Approved Manufacturers</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={fetchManufacturers}
        disabled={loading}
      >
        {loading ? "Fetching..." : "Fetch Manufacturers"}
      </button>

      <ul className="mt-4">
        {manufacturers.length > 0 ? (
          manufacturers.map((m, index) => (
            <li key={index} className="p-4 border rounded-md my-2 shadow">
              <p><strong>Wallet:</strong> {m.wallet}</p>
              <p><strong>JSON CID:</strong> {m.jsonCID}</p>
              <p><strong>PDF CID:</strong> <a href={`https://ipfs.io/ipfs/${m.pdfCID}`} target="_blank" className="text-blue-500">View PDF</a></p>
              <p><strong>Approved:</strong> {m.isApproved ? "✅" : "❌"}</p>
              
              {m.ipfsData ? (
                <div className="mt-2">
                  <p><strong>Company Name:</strong> {m.ipfsData.name || "N/A"}</p>
                  <p><strong>Location:</strong> {m.ipfsData.location || "N/A"}</p>
                  <p><strong>Product:</strong> {m.ipfsData.product || "N/A"}</p>
                  <p><strong>Website:</strong> <a href={m.ipfsData.website} target="_blank" className="text-blue-500">{m.ipfsData.website}</a></p>
                </div>
              ) : (
                <p className="text-red-500 mt-2">⚠ Unable to load IPFS data.</p>
              )}
            </li>
          ))
        ) : (
          <p>No approved manufacturers found.</p>
        )}
      </ul>
    </div>
  );
};

export default ChainPage;
