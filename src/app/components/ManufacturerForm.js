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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [certification, setCertification] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [certificationNumber, setCertificationNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setCertification(file);
    setFileUrl(URL.createObjectURL(file));
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordChecklist, setPasswordChecklist] = useState([
    "At least 8 characters",
    "At least one uppercase letter",
    "At least one lowercase letter",
    "At least one number",
    "At least one special character",
  ]);

  const validatePassword = (value) => {
    let checklist = [];
    if (value.length < 8) checklist.push("At least 8 characters");
    if (!/[A-Z]/.test(value)) checklist.push("At least one uppercase letter");
    if (!/[a-z]/.test(value)) checklist.push("At least one lowercase letter");
    if (!/\\d/.test(value)) checklist.push("At least one number");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) checklist.push("At least one special character");
    setPasswordChecklist(checklist);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newErrors = { ...errors };

    if (type === "checkbox") {
      setPrivacyChecked(checked);
    } else {
      switch (name) {
        case "name":
          setName(value);
          setErrors(newErrors);
          break;
        case "licenseNo":
          setLicenceNo(value);
          setErrors(newErrors);
          break;
        case "email":
          setEmail(value);
          setErrors(newErrors);
          break;
        case "password":
          setPassword(value);
          validatePassword(value);
          setErrors(newErrors);
          break;
        case "confirmPassword":
          setConfirmPassword(value);
          setErrors(newErrors);
          break;
        case "phone":
          setPhone(value);
          setErrors(newErrors);
          break;
        case "website":
          setWebsite(value);
          setErrors(newErrors);
          break;
        case "address":
          setPhysicalAddress(value);
          setErrors(newErrors);
          break;
        case "walletAddress":
          setWalletAddress(value);
          setErrors(newErrors);
          break;
        default:
          break;
      }
    }

    // Validation
    if (name === "licenseNo" || name === "phone" || name === "walletAddress") {
      if (!/^\\d+$/.test(value)) {
        newErrors[name] = "❌ Only numbers are allowed!";
      } else {
        newErrors[name] = "";
      }
      setErrors(newErrors);
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "❌ Please enter a valid email address!",
        }));
      }
    }
    if (name === "password") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*(),.?":{}|<>]|[^A-Za-z0-9])[A-Za-z\\d!@#$%^&*(),.?":{}|<>]{8,}$/;
      if (!passwordRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          password:
            "❌ Password must be at least 8 characters, include uppercase, lowercase, number, and special character!",
        }));
      }
    }

    if (name === "confirmPassword") {
      if (value !== password) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "❌ Passwords do not match!",
        }));
      }
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {};
    if (!name) formErrors.name = "Name is required!";
    if (!licenceNo) formErrors.licenseNo = "License number is required!";
    if (!email) formErrors.email = "Email is required!";
    if (!password) formErrors.password = "Password is required!";
    if (passwordChecklist.length > 0) formErrors.password = "Password does not meet the required criteria!";
    if (password !== confirmPassword) formErrors.confirmPassword = "Passwords do not match!";
    if (!phone) formErrors.phone = "Phone number is required!";
    if (!walletAddress)
      formErrors.walletAddress = "Wallet address is required!";
    if (!privacyChecked)
      formErrors.privacyChecked = "You must accept the privacy policy!";
    if (!certification) formErrors.certification = "Please upload a certification file.";

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      console.error("Form has errors:", formErrors);
      return;
    }

    // Prevent multiple submissions
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("licenceNo", licenceNo);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("website", website);
    formData.append("physicalAddress", physicalAddress);
    formData.append("walletAddress", walletAddress);
    formData.append("certification", certification);
    formData.append("dateOfIssue", dateOfIssue);
    formData.append("certificationNumber", certificationNumber);

    try {
      const response = await fetch("/api/certificateupload/certificateupload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Certificate uploaded and manufacturer details saved successfully!");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      alert("Error fetching data");
    } finally {
      setIsSubmitting(false);
    }

    alert("Your application is under review!");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.heading}>MANUFACTURER REGISTRATION</h2>

      <label className={styles.label}>Manufacturer Name</label>
      <input className={styles.input} name="name" placeholder="Enter manufacturer name" onChange={handleChange} required />

      <label className={styles.label}>License No.</label>
      <input className={styles.input} name="licenseNo" placeholder="Enter license number" onChange={handleChange} required />
      {errors.licenseNo && <p className={styles.error}>{errors.licenseNo}</p>}

      <label className={styles.label}>Email</label>
      <input
        className={styles.input}
        name="email"
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={handleChange}
        required
      />
      {errors.email && <p className={styles.error}>{errors.email}</p>}

      <label className={styles.label}>New Password</label>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter new password"
          value={password}
          onChange={handleChange}
          required
        />
        <button
          type="button"
          className={styles.togglePassword}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "🙈" : "👁️"}</button>
      </div>
      {errors.password && <p className={styles.error}>{errors.password}</p>}

      <label className={styles.label}>Confirm New Password</label>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Re-enter password"
          value={confirmPassword}
          onChange={handleChange}
          required
        />
        <button
          type="button"
          className={styles.togglePassword}
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? "🙈" : "👁️"}</button>
      </div>
      {errors.confirmPassword && (
        <p className={styles.error}>{errors.confirmPassword}</p>
      )}

      <label className={styles.label}>Phone Number</label>
      <input className={styles.input} name="phone" placeholder="Enter phone number" onChange={handleChange} required />
      {errors.phone && <p className={styles.error}>{errors.phone}</p>}

      <label className={styles.label}>Website (Optional)</label>
      <input className={styles.input} name="website" type="url" placeholder="Enter website URL" onChange={handleChange} />

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


      <label className={styles.label}>Date of Issue</label>
      <input className={styles.input} name="dateOfIssue" type="date" placeholder="Enter date of issue" onChange={handleChange} />

      <label className={styles.label}>Certification Number</label>
      <input className={styles.input} name="certificationNumber" placeholder="Enter certification number" onChange={handleChange} />

      <label className={styles.label}>Physical Address</label>
      <input className={styles.input} name="physicalAddress" placeholder="Enter physical address" onChange={handleChange} required />

      <label className={styles.checkboxContainer}>
        <input type="checkbox" name="privacyChecked" onChange={handleChange} />
        I accept the privacy policy.
      </label>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "REGISTER"}</button>
      <div className={styles.doctorAnimation}>
        <Image src="/next.svg" alt="Doctor" width={100} height={100} />
      </div>
    </form>
  );
};

export default ManufacturerForm;
