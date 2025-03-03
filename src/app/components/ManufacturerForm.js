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
    dateOfIssue: "", // User will enter manually
    physicalAddress: "",
    walletAddress: "",
    certificationNumber: "",
  });

  const [certification, setCertification] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [privacyChecked, setPrivacyChecked] = useState(false);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (type === "checkbox") {
      setPrivacyChecked(checked);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
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
          console.log("✅ Extracted Data from API:", result);
          console.log("API Response Keys:", Object.keys(result));

          const formatDate = (dateString) => {
            const [day, month, year] = dateString.split("/");
            return `${year}-${month}-${day}`; 
          };

          // 📝 Correctly map API response keys to state
          setFormData((prev) => ({
            ...prev,
            name: result.manufacturer_name || "",
            licenceNo: result.license_number || "",
            certificationNumber: result.certificate_number || "",
            physicalAddress: result.address || "",
            dateOfIssue: result.date_of_issue ? formatDate(result.date_of_issue) : "", 
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

  // 📝 Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {};
    if (!formData.name) formErrors.name = "Name is required!";
    if (!formData.licenceNo) formErrors.licenceNo = "License Number is required!";
    if (!formData.email) formErrors.email = "Email is required!";
    if (!formData.phone) formErrors.phone = "Phone number is required!";
    if (!formData.walletAddress) formErrors.walletAddress = "Wallet address is required!";
    if (!formData.physicalAddress) formErrors.physicalAddress = "Physical address is required!";
    if (!certification) formErrors.certification = "Please upload a certification file.";
    if (!privacyChecked) formErrors.privacyChecked = "You must accept the privacy policy!";

    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    setIsSubmitting(true);

    const finalData = new FormData();
    Object.keys(formData).forEach((key) => finalData.append(key, formData[key]));
    finalData.append("certification", certification);

    try {
      console.log("📨 Submitting form...");
      const response = await fetch("/api/certificateupload/uploadcertificate", {
        method: "POST",
        body: finalData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("✅ Your Application has been received and is under review!");
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
