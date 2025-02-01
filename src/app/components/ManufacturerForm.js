"use client";
import React, { useState } from "react";
import InputField from "./InputField";  // ✅ Ensure correct import path
import Button from "./Button";  // ✅ Ensure correct import path


const ManufacturerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    licenseNo: "",
    email: "",
    phone: "",
    website: "",
    certification: null,
    privacyChecked: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.privacyChecked) {
      alert("You must accept the privacy policy to continue.");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await fetch("/api/register", { method: "POST", body: data });
      if (response.ok) {
        alert("Your application is under review.");
      } else {
        alert("Error submitting form. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please check your internet connection.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.heading}>Manufacturer Registration</h2>
      <InputField name="name" label="Manufacturer Name" onChange={handleChange} required />
      <InputField name="licenseNo" label="License No." onChange={handleChange} required />
      <InputField name="email" label="Email" type="email" onChange={handleChange} required />
      <InputField name="phone" label="Phone Number" type="tel" onChange={handleChange} required />
      <InputField name="website" label="Website (Optional)" type="url" onChange={handleChange} />

      <label className={styles.label}>Upload Certification (PDF)</label>
      <input type="file" name="certification" accept="application/pdf" onChange={handleChange} required />

      <label className={styles.checkbox}>
        <input type="checkbox" name="privacyChecked" onChange={handleChange} />
        I accept the privacy policy.
      </label>

      <Button text="Register" type="submit" className={styles.submitButton} />
    </form>
  );
};

export default ManufacturerForm;
