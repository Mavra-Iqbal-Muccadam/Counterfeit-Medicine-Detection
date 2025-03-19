"use client";
import React, { useState, useEffect } from "react";
import { fetchManufacturer } from "../blockchain/fetchindivivualmanufacturer";

const ManufacturerPage = () => {
  const [wallet, setWallet] = useState("");
  const [manufacturer, setManufacturer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Auto-Detect MetaMask Wallet
  const detectMetaMaskWallet = async () => {
    if (!window.ethereum) {
      setError("❌ MetaMask is not installed!");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

      if (accounts.length > 0) {
        setWallet(accounts[0]); // ✅ Auto-detect wallet
        fetchManufacturerDetails(accounts[0]); // 🔹 Fetch manufacturer data
      } else {
        setError("❌ No MetaMask accounts found!");
      }
    } catch (error) {
      console.error("❌ MetaMask Connection Error:", error);
      setError("❌ Failed to connect MetaMask!");
    }
  };

  // ✅ Fetch Manufacturer Details
  const fetchManufacturerDetails = async (walletAddress) => {
    setLoading(true);
    setError(null);

    const result = await fetchManufacturer(walletAddress);

    if (result) {
      setManufacturer(result);
    } else {
      setManufacturer(null);
      setError("❌ Manufacturer not found in the system.");
    }

    setLoading(false);
  };

  // ✅ Auto-Detect Wallet on Page Load
  useEffect(() => {
    detectMetaMaskWallet();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Manufacturer Details</h1>

      {error && <p className="text-red-500">{error}</p>}
      
      {loading ? (
        <p className="text-blue-500">⏳ Fetching details...</p>
      ) : manufacturer ? (
        <div className="mt-4 p-4 border rounded-md">
          <p><strong>Wallet:</strong> {manufacturer.wallet}</p>
          <p><strong>Approved:</strong> {manufacturer.isApproved ? "✅ Approved" : "❌ Not Approved"}</p>
          <p><strong>PDF CID:</strong> <a href={`https://ipfs.io/ipfs/${manufacturer.pdfCID}`} target="_blank" className="text-blue-500">View PDF</a></p>

          {manufacturer.ipfsData ? (
            <div className="mt-2">
              <p><strong>Company Name:</strong> {manufacturer.ipfsData.name || "N/A"}</p>
              <p><strong>Location:</strong> {manufacturer.ipfsData.location || "N/A"}</p>
              <p><strong>Product:</strong> {manufacturer.ipfsData.product || "N/A"}</p>
              <p><strong>Website:</strong> <a href={manufacturer.ipfsData.website} target="_blank" className="text-blue-500">{manufacturer.ipfsData.website}</a></p>
            </div>
          ) : (
            <p className="text-red-500 mt-2">⚠ Unable to load IPFS data.</p>
          )}
        </div>
      ) : (
        <p className="text-gray-500">🔍 No manufacturer details found.</p>
      )}
    </div>
  );
};

export default ManufacturerPage;
