"use client";
import { useState } from "react";
import styles from "../styles/ManufacturerForm.module.css";

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
  const [certificationNumber, setCertificationNumber] = useState("");
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
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
    if (!/\d/.test(value)) checklist.push("At least one number");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) checklist.push("At least one special character");
    setPasswordChecklist(checklist);
  };

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
        case "licenseNo":
          setLicenceNo(value);
          break;
        case "email":
          setEmail(value);
          break;
        case "password":
          setPassword(value);
          validatePassword(value);
          break;
        case "confirmPassword":
          setConfirmPassword(value);
          break;
        case "phone":
          setPhone(value);
          break;
        case "website":
          setWebsite(value);
          break;
        case "address":
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
    if (name === "licenseNo" || name === "phone" || name === "walletAddress") {
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
    if (name === "password") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setCertification(file);
      setFileUrl(URL.createObjectURL(file));

      // Extract the certification number after uploading
      const formData = new FormData();
      formData.append("certification", file);

      try {
        const response = await fetch("/api/certificateupload/certificateupload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        if (response.ok) {
          setCertificationNumber(result.certificationNumber); // Set extracted certification number
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
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("website", website);
    formData.append("physicalAddress", physicalAddress);
    formData.append("walletAddress", walletAddress);
    formData.append("certification", certification);
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
      alert("Error fetching data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.heading}>Manufacturer Registration</h2>

      <label className={styles.label}>Manufacturer Name</label>
      <input
        className={styles.input}
        name="name"
        placeholder="Enter manufacturer name"
        value={name}
        onChange={handleChange}
        required
      />
      {errors.name && <p className={styles.error}>{errors.name}</p>}

      <label className={styles.label}>License No.</label>
      <input
        className={styles.input}
        name="licenseNo"
        placeholder="Enter license number"
        value={licenceNo}
        onChange={handleChange}
        required
      />
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

      {/* Password Field */}
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
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>
      {errors.password && <p className={styles.error}>{errors.password}</p>}

      {/* Confirm Password Field */}
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
          {showConfirmPassword ? "🙈" : "👁️"}
        </button>
      </div>
      {errors.confirmPassword && (
        <p className={styles.error}>{errors.confirmPassword}</p>
      )}

      <label className={styles.label}>Phone Number</label>
      <input
        className={styles.input}
        name="phone"
        placeholder="Enter phone number"
        value={phone}
        onChange={handleChange}
        required
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
        name="address"
        placeholder="Enter address"
        value={physicalAddress}
        onChange={handleChange}
      />

      <label className={styles.label}>Wallet Address</label>
      <input
        className={styles.input}
        name="walletAddress"
        placeholder="Enter wallet address"
        value={walletAddress}
        onChange={handleChange}
        required
      />
      {errors.walletAddress && (
        <p className={styles.error}>{errors.walletAddress}</p>
      )}

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
          required
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
        {isSubmitting ? "Submitting..." : "Submit Form"}
      </button>
    </form>
  );
};

export default ManufacturerForm;