"use client";
import { useState } from "react";
import { Container, Paper, Box, TextField, Button, FormControlLabel, Checkbox, CircularProgress, Typography } from '@mui/material';
import Image from "next/image";
import { SuccessMsgBox, ErrorMsgBox } from '../components/MsgBox';

const ManufacturerForm = () => {
  const resetForm = () => {
    setFormData({
      name: "",
      licenceNo: "",
      email: "",
      phone: "",
      website: "",
      dateOfIssue: "",
      physicalAddress: "",
      walletAddress: "",
      certificationNumber: "",
      certificationBytea: "",
    });
    setCertification(null);
    setFileUrl(null);
    setPrivacyChecked(false);
    setErrors({});
  };

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
  const [successMsg, setSuccessMsg] = useState({ open: false, message: '', routeButton: null });
  const [errorMsg, setErrorMsg] = useState({ open: false, message: '' });

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) return "Email is required.";
        if (!emailRegex.test(value)) return "Please enter a valid email address.";
        return "";
      case "phone":
        if (!value) return "Phone number is required.";
        if (!/^\d+$/.test(value)) return "Phone number should contain only numbers.";
        return "";
      case "walletAddress":
        const walletRegex = /^0x[a-fA-F0-9]{40}$/;
        if (!value) return "Wallet address is required.";
        if (!walletRegex.test(value)) return "Invalid wallet address! Please enter a valid Ethereum address.";
        return "";
      case "licenceNo":
        if (!value) return "Licence number is required.";
        return "";
      case "physicalAddress":
        if (!value) return "Physical address is required.";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));

    if (type === "checkbox") {
      setPrivacyChecked(checked);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setErrorMsg({ open: true, message: "❌ Please upload a valid PDF file." });
        return;
      }

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
            dateOfIssue: result.extractedData.date_of_issue || "",
            certificationBytea: result.certificationBytea || "",
          }));
        } else {
          setErrorMsg({ open: true, message: `❌ Error: ${result.message}` });
        }
      } catch (error) {
        setErrorMsg({ open: true, message: "❌ Error uploading certificate." });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    if (!privacyChecked) {
      setErrorMsg({ open: true, message: "❌ You must agree to the privacy policy." });
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
        setSuccessMsg({
          open: true,
          message: "✅ Your Application has been received!",
          routeButton: { path: "/manufacturerlogin", label: "Go to Login" },
        });
        resetForm(); // Reset the form fields
      } else {
        // Handle specific error messages from the API
        if (result.message === "This user already exists.") {
          setErrorMsg({ open: true, message: "❌ This user already exists." });
        } else {
          setErrorMsg({ open: true, message: "❌ Error registering user." });
        }
      }
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      setErrorMsg({ open: true, message: "❌ Error submitting form. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        overflow: "hidden",
        position: "fixed",
        width: "100vw",
        minHeight: "120vh",
        backgroundImage: "url('/final.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* Navbar */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "#f0f0f0",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          top: 0,
          zIndex: 1500, // Navbar z-index
          height: "60px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Typography variant="body1" sx={{ cursor: "pointer" }}>Home</Typography>
          <Typography variant="body1" sx={{ cursor: "pointer" }}>Contact Us</Typography>
          <Typography variant="body1" sx={{ cursor: "pointer" }}>About Us</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image src="/healthcare (1).png" alt="Logo" width={50} height={50} />
          <Typography variant="h6" sx={{ ml: 1 }}>
            MediCare
          </Typography>
        </Box>
      </Box>

      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 150px)",
          marginTop: "140px",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 3,
            width: "100%",
            maxWidth: "450px",
            maxHeight: "84vh",
            overflowY: "auto",
            borderRadius: 2,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Typography variant="h5" sx={{ textAlign:"center",fontWeight: "bold" }}>
              Manufacturer Registration
            </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent:"space-evenly",
              marginBottom: "15px",
              marginTop: "5px",
            }}
          >
            
            <Image
              src="/yar.jpg"
              alt="Manufacturer Registration"
              width={250}
              height={200}
              style={{
                objectFit: "cover",
              }}
            />
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>


            <TextField
              fullWidth
              margin="dense"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              required
            />

            {/* File Upload */}
            <Button fullWidth variant="contained" component="label" sx={{ mt: 2, mb: 2 }}>
              📄 Upload PDF
              <input type="file" id="pdfUpload" name="certification" accept="application/pdf" hidden onChange={handleFileUpload} />
            </Button>
            {fileUrl && (
              <Box sx={{ mt: 2, mb: 2 }}>
                <embed src={fileUrl} type="application/pdf" width="100%" height="300px" />
              </Box>
            )}

            <TextField
              fullWidth
              margin="normal"
              label="Manufacturer Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Date of Issue"
              name="dateOfIssue"
              type="date"
              value={formData.dateOfIssue}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={!!errors.dateOfIssue}
              helperText={errors.dateOfIssue}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Licence No."
              name="licenceNo"
              value={formData.licenceNo}
              onChange={handleChange}
              error={!!errors.licenceNo}
              helperText={errors.licenceNo}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Physical Address"
              name="physicalAddress"
              value={formData.physicalAddress}
              onChange={handleChange}
              error={!!errors.physicalAddress}
              helperText={errors.physicalAddress}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Website (Optional)"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Wallet Address"
              name="walletAddress"
              value={formData.walletAddress}
              onChange={handleChange}
              error={!!errors.walletAddress}
              helperText={errors.walletAddress}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Certification Number"
              name="certificationNumber"
              value={formData.certificationNumber}
              
            />

            {/* Privacy Policy Checkbox */}
            <FormControlLabel
              control={<Checkbox checked={privacyChecked} onChange={handleChange} name="privacyChecked" />}
              label="I accept the privacy policy."
              sx={{ mt: 2 }}
            />

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} fullWidth sx={{ mt: 2, mb: 2 }}>
              {isSubmitting ? <CircularProgress size={24} /> : "Register Manufacturer"}
            </Button>

            
          </Box>
        </Paper>
      </Container>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2000, // Higher than navbar's z-index
          pointerEvents: "none", // Allow clicks to pass through when closed
        }}
      >
        <SuccessMsgBox
          open={successMsg.open}
          onClose={() => setSuccessMsg({ ...successMsg, open: false })}
          message={successMsg.message}
          routeButton={successMsg.routeButton}
        />
        <ErrorMsgBox
          open={errorMsg.open}
          onClose={() => setErrorMsg({ ...errorMsg, open: false })}
          message={errorMsg.message}
        />
      </Box>
      
    </Box>
  );
};

export default ManufacturerForm;