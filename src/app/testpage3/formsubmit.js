
import { insertMedicine } from '../../../lib/medicineregistration';
import { ethers } from "ethers"; // ✅ Import ethers v6



export const handleSubmit = async (e, medicine, setMedicine) => {
  e.preventDefault();
  console.log('Submitting medicine data:', medicine);

  const response = await insertMedicine(medicine);

  if (response.success) {
    alert('Medicine successfully added to the database!');
    
    // Reset form fields (except wallet address)
    setMedicine((prev) => ({
      ...prev,
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
      files: [],
      status: 'pending',
    }));
  } else {
    alert('Error adding medicine: ' + response.error);
  }
};




export const detectWallet = async (setMedicine) => {
  if (typeof window === "undefined") {
    console.warn("Window is undefined, running in a server-side environment.");
    return;
  }

  if (!window.ethereum) {
    console.warn("MetaMask not detected. Please install MetaMask.");
    return;
  }

  try {
    console.log("🔍 Detecting wallet...");

    // Request wallet access
    const provider = new ethers.BrowserProvider(window.ethereum); // ✅ Ethers v6
    const signer = await provider.getSigner();
    const walletAddress = await signer.getAddress(); // ✅ Get wallet address

    console.log("✅ Wallet Address Detected:", walletAddress);

    // Update state with wallet address
    setMedicine((prev) => ({
      ...prev,
      walletAddress, // ✅ Store detected wallet address
    }));
  } catch (error) {
    console.error("❌ Error detecting wallet:", error);
  }
};
