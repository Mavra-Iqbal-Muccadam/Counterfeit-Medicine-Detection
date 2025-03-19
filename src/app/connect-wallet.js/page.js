"use client";

import { useState } from "react";
import { ethers } from "ethers";

export default function ManufacturerRegistrationForm({ walletAddress }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    licenseNumber: "",
    address: "",
  });

  const [status, setStatus] = useState("");

  const contractABI = [
    "function registerManufacturer(string _name, string _licenseNumber, string _physicalAddress) public",
    "function isManufacturerApproved(address _manufacturer) public view returns (bool)",
  ];

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!walletAddress) {
      alert("Please connect your wallet first!");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.registerManufacturer(
        formData.name,
        formData.licenseNumber,
        formData.address
      );

      setStatus("Transaction submitted. Waiting for confirmation...");
      await tx.wait();
      setStatus("Manufacturer registered successfully!");
    } catch (error) {
      console.error("Error during registration:", error);
      setStatus("An error occurred during registration.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div>
          <label>Business License Number</label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div>
          <label>Blockchain Wallet Address</label>
          <input type="text" value={walletAddress || ""} readOnly />
        </div>
        <button type="submit">Register</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}
