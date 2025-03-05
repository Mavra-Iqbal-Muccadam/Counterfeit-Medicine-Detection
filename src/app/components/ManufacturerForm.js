"use client";
import { useState } from "react";
import styles from "../styles/ManufacturerForm.module.css";
import Image from "next/image";

const ManufacturerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    licenceNo: "",
    email: "",
    phone: "",
    website: "",
    dateOfIssue: "",
    physicalAddress: "",
    walletAddress: "",
    certificationNumber: "",
    certificationBytea: "", // Base64 encoded certificate

  });

  const [certification, setCertification] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (type === "checkbox") {
      setPrivacyChecked(checked);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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
        console.log("✅ Extracted Data:", result.extractedData); // Print extracted data
  
        
        if (response.ok) {
          setFormData((prev) => ({
            ...prev,
            name: result.extractedData.manufacturer_name || "",
            licenceNo: result.extractedData.license_number || "",
            certificationNumber: result.extractedData.certificate_number || "",
            physicalAddress: result.extractedData.address || "",
            dateOfIssue: result.extractedData.date_of_issue || "", // Ensure it's correctly set
            certificationBytea: result.certificationBytea || "", // Store Base64 PDF

          }));
        } else {
          alert(`Error: ${result.message}`);
        }
      } catch (error) {
        console.error("❌ Error uploading certificate:", error);
        alert("Error uploading certificate.");
      }
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!privacyChecked) {
      alert("❌ You must agree to the privacy policy.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/certificateupload/savedata", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      if (response.ok) {
        alert("✅ Your Application has been received!");
      } else {
        alert(`❌ Error: ${result.message}`);
      }
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      alert("Error submitting form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.heading}>Manufacturer Registration</h2>

      <label className={styles.label}>Email</label>
      <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter email" className={styles.input} />
      {errors.email && <p className={styles.error}>{errors.email}</p>}

      {/* 📤 PDF Upload Section */}
      <label className={styles.label}>Upload Certification (PDF)</label>
      <input type="file" id="pdfUpload" name="certification" accept="application/pdf" onChange={handleFileUpload} hidden />
      <button type="button" className={styles.uploadButton} onClick={() => document.getElementById("pdfUpload").click()}>
        📄 Upload PDF
      </button>
      {errors.certification && <p className={styles.error}>{errors.certification}</p>}
      {fileUrl && <embed src={fileUrl} type="application/pdf" className={styles.pdfPreview} />}

      {/* 📝 Auto-Filled Fields */}
      <label className={styles.label}>Manufacturer Name</label>
      <input name="name" value={formData.name} onChange={handleChange} className={styles.input} />

      <label className={styles.label}>Date of Issue</label>
      <input name="dateOfIssue" type="date" value={formData.dateOfIssue} onChange={handleChange} className={styles.input} />
      {/* Date is no longer auto-filled; the user must enter it manually */}

      <label className={styles.label}>Licence No.</label>
      <input name="licenceNo" value={formData.licenceNo} onChange={handleChange} className={styles.input} />
      {errors.licenceNo && <p className={styles.error}>{errors.licenceNo}</p>}

      <label className={styles.label}>Phone Number</label>
      <input name="phone" value={formData.phone} onChange={handleChange} className={styles.input} />
      {errors.phone && <p className={styles.error}>{errors.phone}</p>}

      <label className={styles.label}>Physical Address</label>
      <input name="physicalAddress" value={formData.physicalAddress} onChange={handleChange} className={styles.input} />
      {errors.physicalAddress && <p className={styles.error}>{errors.physicalAddress}</p>}
      <label className={styles.label}>Website (Optional)</label>
      <input
        className={styles.input}
        name="website"
        type="url"
        placeholder="Enter website URL"
        value={formData.website}
        onChange={handleChange}
      />

      <label className={styles.label}>Wallet Address</label>
      <input name="walletAddress" value={formData.walletAddress} onChange={handleChange} className={styles.input} />
      {errors.walletAddress && <p className={styles.error}>{errors.walletAddress}</p>}

      <label className={styles.label}>Certification Number</label>
      <input name="certificationNumber" value={formData.certificationNumber} readOnly className={styles.input} />

      {/* ✅ Privacy Policy */}
      <label className={styles.checkboxContainer}>
        <input type="checkbox" name="privacyChecked" checked={privacyChecked} onChange={handleChange} />
        I accept the privacy policy.
      </label>
      {errors.privacyChecked && <p className={styles.error}>{errors.privacyChecked}</p>}

      {/* 🚀 Submit Button */}
      <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register Manufacturer"}
      </button>

      <div className={styles.doctorAnimation}>
        <Image src="/next.svg" alt="Doctor" width={100} height={100} />
      </div>
    </form>
  );
};

export default ManufacturerForm;
