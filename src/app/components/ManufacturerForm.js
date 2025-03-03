"use client";
import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import styles from "../styles/ManufacturerForm.module.css";
import Image from 'next/image';

const ManufacturerForm = () => {
  const [name, setName] = useState("");
  const [licenceNo, setLicenceNo] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [certification, setCertification] = useState(null);
  const [certificationNumber, setCertificationNumber] = useState("");
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  

  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (type === "checkbox") {
      setPrivacyChecked(checked);
    } else {
      switch (name) {
        case "name":
          setName(value);
          break;
        case "licenceNo":
          setLicenceNo(value);
          break;
        case "email":
          setEmail(value);
          break;
        case "phone":
          setPhone(value);
          break;
        case "dateOfIssue":
          setDateOfIssue(value);
          break;
        case "website":
          setWebsite(value);
          break;
          case "physicalAddress":
            setPhysicalAddress(value);
            break;          
        case "walletAddress":
          setWalletAddress(value);
          break;
        default:
          break;
      }
    }

    // Validation
    if (name === "licenceNo" || name === "phone") {
      if (!/^\d*$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: "❌ Only numbers are allowed!",
        }));
      }
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "❌ Please enter a valid email address!",
        }));
      }
    }
    if (name === "walletAddress") {
      const walletRegex = /^0x[a-fA-F0-9]{40}$/;
      if (!walletRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          walletAddress: "❌ Invalid wallet address! Please enter a valid Ethereum address.",
        }));
      }
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setCertification(file);
      setFileUrl(URL.createObjectURL(file));
  
      const formData = new FormData();
      formData.append("certification", file);
  
      try {
        const response = await fetch("/api/certificateupload/certificateupload", {
          method: "POST",
          body: formData,
        });
  
        const result = await response.json();
        if (response.ok) {
          setCertificationNumber(result.certificationNo); // Set extracted certification number
        } else {
          alert(`Error: ${result.message}`);
        }
      } catch (error) {
        console.error("Error uploading certificate:", error);
        alert("Error uploading certificate.");
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {};
    if (!name) formErrors.name = "Name is required!";
    if (!licenceNo) formErrors.licenceNo = "licenceNo number is required!";
    if (!email) formErrors.email = "Email is required!";
    if (!phone) formErrors.phone = "Phone number is required!";
    if (!walletAddress)
      formErrors.walletAddress = "Wallet address is required!";
    if (!privacyChecked)
      formErrors.privacyChecked = "You must accept the privacy policy!";
    if (!physicalAddress) 
      formErrors.physicalAddress = " Physical address is required!";
    if (!certification)
      formErrors.certification = "Please upload a certification file.";

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) return;

    // Prevent multiple submissions
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("licenceNo", licenceNo);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("dateOfIssue", dateOfIssue);
    formData.append("website", website);
    formData.append("physicalAddress", physicalAddress);
    formData.append("walletAddress", walletAddress);
    formData.append("certification", certification); 
    formData.append("certificationNumber",certificationNumber);

    try {
      const response = await fetch("/api/certificateupload/certificateupload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Your Application is Recieved and is under Review!");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      alert("Error fetching data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.heading}>Manufacturer Registration</h2>

      <label className={styles.label}>Email</label>
      <input
        className={styles.input}
        name="email"
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={handleChange}
      />
      {errors.email && <p className={styles.error}>{errors.email}</p>}

      
      {/* Single Upload Button */}
      <label className={styles.label}>Upload Certification (PDF)</label>
      <input
        type="file"
        id="pdfUpload"
        name="certification"
        accept="application/pdf"
        onChange={handleFileUpload}
        hidden
      />
      <button
        type="button"
        className={styles.uploadButton}
        onClick={() => document.getElementById("pdfUpload").click()}
      >
        📄 Upload PDF
      </button>
      {errors.certification && (
        <p className={styles.error}>{errors.certification}</p>
      )}
      {fileUrl && (
        <div className={styles.previewContainer}>
          <embed
            src={fileUrl}
            type="application/pdf"
            className={styles.pdfPreview}
          />
        </div>
      )}

      <label className={styles.label}>Manufacturer Name</label>
      <input
        className={styles.input}
        name="name"
        placeholder="Enter manufacturer name"
        value={name}
        onChange={handleChange}
        
      />
      {errors.name && <p className={styles.error}>{errors.name}</p>}

      <label className={styles.label}>Date of Issue</label>
      <input 
        className={styles.input} 
        name="dateOfIssue" 
        type="date" 
        value={dateOfIssue}
        placeholder="Enter date of issue" 
        onChange={handleChange} 
      />

      <label className={styles.label}>Licence No.</label>
      <input
        className={styles.input}
        name="licenceNo"
        placeholder="Enter licenceNo number"
        value={licenceNo}
        onChange={handleChange}
        
      />
      {errors.licenceNo && <p className={styles.error}>{errors.licenceNo}</p>}

    
      <label className={styles.label}>Phone Number</label>
      <input
        className={styles.input}
        name="phone"
        placeholder="Enter phone number"
        value={phone}
        onChange={handleChange}
        
      />
      {errors.phone && <p className={styles.error}>{errors.phone}</p>}

      <label className={styles.label}>Website (Optional)</label>
      <input
        className={styles.input}
        name="website"
        type="url"
        placeholder="Enter website URL"
        value={website}
        onChange={handleChange}
      />

      <label className={styles.label}>Address</label>
      <input
        className={styles.input}
        name="physicalAddress"
        placeholder="Enter address"
        value={physicalAddress}
        onChange={handleChange}
      />
      {errors.physicalAddress && <p className={styles.error}>{errors.physicalAddress}</p>}

      <label className={styles.label}>Wallet Address</label>
      <input
        className={styles.input}
        name="walletAddress"
        placeholder="Enter wallet address"
        value={walletAddress}
        onChange={handleChange}
        
      />
      {errors.walletAddress && <p className={styles.error}>{errors.walletAddress}</p>}

      

      <label className={styles.label}>Certification Number</label>
      <input
        className={styles.input}
        name="certificationNumber"
        value={certificationNumber}
        readOnly
      />

      <label className={styles.checkboxContainer}>
        <input
          type="checkbox"
          name="privacyChecked"
          onChange={handleChange}
          checked={privacyChecked}
          
        />
        I accept the privacy policy.
      </label>
      {errors.privacyChecked && (
        <p className={styles.error}>{errors.privacyChecked}</p>
      )}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Registering..." : "Register Manufacturer"}
      </button>
      <div className={styles.doctorAnimation}>
//         <Image src="/next.svg" alt="Doctor" width={100} height={100} />
//       </div>
    </form>
  );
};

export default ManufacturerForm;



