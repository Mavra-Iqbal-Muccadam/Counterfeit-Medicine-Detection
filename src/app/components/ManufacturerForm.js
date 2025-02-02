"use client";
import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import styles from "../styles/ManufacturerForm.module.css";




const ManufacturerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    licenseNo: "",
    email: "",
    phone: "",
    website: "",
    certification: null,
    certificationNumber: "",
    privacyChecked: false,
  });

  const [errors, setErrors] = useState({});
  const [fileUrl, setFileUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newErrors = { ...errors };

    if (name === "licenseNo" || name === "phone") {
      if (!/^\d*$/.test(value)) {
        newErrors[name] = "❌ Only numbers are allowed!";
      } else {
        newErrors[name] = "";
      }
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    setErrors(newErrors);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFileUrl(URL.createObjectURL(file));
      setFormData({ ...formData, certification: file });
    } else {
      alert("Only PDF files are allowed!");
      setFileUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.certification) {
      alert("Please upload a certificate before submitting.");
      return;
    }

    alert("Your application is under review!");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.heading}>Manufacturer Registration</h2>

      <label className={styles.label}>Manufacturer Name</label>
      <input className={styles.input} name="name" placeholder="Enter manufacturer name" onChange={handleChange} required />

      <label className={styles.label}>License No.</label>
      <input className={styles.input} name="licenseNo" placeholder="Enter license number" onChange={handleChange} required />
      {errors.licenseNo && <p className={styles.error}>{errors.licenseNo}</p>}

      <label className={styles.label}>Email</label>
      <input className={styles.input} name="email" type="email" placeholder="Enter email" onChange={handleChange} required />

      <label className={styles.label}>Phone Number</label>
      <input className={styles.input} name="phone" placeholder="Enter phone number" onChange={handleChange} required />
      {errors.phone && <p className={styles.error}>{errors.phone}</p>}

      <label className={styles.label}>Website (Optional)</label>
      <input className={styles.input} name="website" type="url" placeholder="Enter website URL" onChange={handleChange} />

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
      <button type="button" className={styles.uploadButton} onClick={() => document.getElementById("pdfUpload").click()}>
        📄 Upload PDF
      </button>

      {/* Show PDF Preview */}
      {fileUrl && (
        <div className={styles.previewContainer}>
          <embed src={fileUrl} type="application/pdf" className={styles.pdfPreview} />
        </div>
      )}

      <label className={styles.label}>Certification Number</label>
      <input className={styles.input} name="certificationNumber" placeholder="Enter certification number" onChange={handleChange} required />

      <label className={styles.checkboxContainer}>
        <input type="checkbox" name="privacyChecked" onChange={handleChange} />
        I accept the privacy policy.
      </label>

      <button type="submit" className={styles.submitButton}>Register</button>
    </form>
  );
};

export default ManufacturerForm;
