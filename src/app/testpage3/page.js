"use client";

import { useState } from 'react';

export default function MedicineForm() {
  const [medicine, setMedicine] = useState({
    certificate: [],
    name: '',
    medicineId: '',
    batchNumber: '',
    manufactureDate: '',
    expiryDate: '',
    excipients: [''], 
    types: [],
    excipientExpiryDate: '',
    description: '',
    files: [] // ✅ Medicine Image Upload
  });

  const [loading, setLoading] = useState(false);

  const medicineTypes = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Cream', 'Gel']; // ✅ Medicine types list

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("certification", file);

    try {
      const response = await fetch("/api/medicineregistration/autofill", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Upload result:", result);

      // ✅ Convert dosage_form to PascalCase
      const formattedDosage = result.extractedData.dosage_form
        ? result.extractedData.dosage_form
          .toLowerCase()
          .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize first letter
        : '';

      // ✅ Automatically check the corresponding checkbox if dosage_form matches
      const updatedTypes = medicineTypes.includes(formattedDosage) ? [formattedDosage] : [];

      // ✅ Auto-fill extracted data into state
      setMedicine((prev) => ({
        ...prev,
        name: result.extractedData.medicine_name || '',
        medicineId: result.extractedData.medicine_id || '',
        batchNumber: result.extractedData.batch_number || '',
        excipients: result.extractedData.excipients || [''],
        types: updatedTypes, // ✅ Auto-select medicine type checkbox
      }));

    } catch (error) {
      console.error("Upload error:", error);
    }

    setLoading(false);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setMedicine((prev) => ({ ...prev, files }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (type) => {
    setMedicine((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type]
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-200">
      <form className="bg-pink-300 p-6 rounded-lg shadow-lg w-96">
        
        {/* ✅ Auto-trigger API on file upload */}
        <label className="block mb-2 text-lg font-semibold">Upload Certificate</label>
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="w-full p-2 border" 
          accept="application/pdf"
        />
        {loading && <p className="text-blue-600">Processing...</p>}

        <label className="block mt-4 mb-2">Medicine Name *</label>
        <input type="text" name="name" className="w-full p-2 rounded" required value={medicine.name} onChange={handleChange} />

        <label className="block mt-4 mb-2">Medicine Id *</label>
        <input type="text" name="medicineId" className="w-full p-2 rounded" required value={medicine.medicineId} onChange={handleChange} />

        <label className="block mt-4 mb-2">Batch Number *</label>
        <input type="text" name="batchNumber" className="w-full p-2 rounded" required value={medicine.batchNumber} onChange={handleChange} />

        <label className="block mt-4 mb-2">Manufacture Date</label>
        <input type="date" name="manufactureDate" className="w-full p-2 rounded" onChange={handleChange} />

        <label className="block mt-4 mb-2">Expiry Date</label>
        <input type="date" name="expiryDate" className="w-full p-2 rounded" onChange={handleChange} />

        {/* ✅ Excipients Auto-fill */}
        <label className="block mt-4 mb-2 flex items-center justify-between">
          Excipients
        </label>

        {medicine.excipients.map((excipient, index) => (
          <div key={index} className="flex gap-2 items-center mt-2">
            <input
              type="text"
              className="w-full p-2 rounded"
              placeholder={`Excipient ${index + 1}`}
              value={excipient}
              onChange={(e) => {
                const newExcipients = [...medicine.excipients];
                newExcipients[index] = e.target.value;
                setMedicine((prev) => ({ ...prev, excipients: newExcipients }));
              }}
            />
          </div>
        ))}

        {/* ✅ Medicine Type Checkboxes (Auto-check) */}
        <label className="block mt-4 mb-2">Medicine Type</label>
        {medicineTypes.map((type) => (
          <div key={type} className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id={type} 
              checked={medicine.types.includes(type)} 
              onChange={() => handleCheckboxChange(type)}
            />
            <label htmlFor={type}>{type}</label>
          </div>
        ))}

        {/* ✅ Restored: Upload Medicine Image */}
        <label className="block mt-4 mb-2">Upload Medicine Image</label>
        <input 
          type="file" 
          multiple 
          onChange={handleImageUpload} 
          className="w-full p-2 border" 
          accept="image/*"
        />

        <label className="block mt-4 mb-2">Description</label>
        <textarea name="description" className="w-full p-2 rounded" rows="3" onChange={handleChange}></textarea>

        <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded">Submit</button>
      </form>
    </div>
  );
}
