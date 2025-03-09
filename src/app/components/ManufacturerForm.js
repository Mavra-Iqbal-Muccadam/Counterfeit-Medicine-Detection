"use client";
import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Box,
  Container,
  CircularProgress,
  Paper,
} from "@mui/material";
import Image from "next/image";
import { SuccessMsgBox, ErrorMsgBox } from '../components/MsgBox';

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
  const [successMsg, setSuccessMsg] = useState({ open: false, message: '', routeButton: null });
  const [errorMsg, setErrorMsg] = useState({ open: false, message: '' });

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

    if (!formData.email || !formData.phone) {
      setErrorMsg({ open: true, message: "❌ Email and phone are required." });
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMsg({ open: true, message: "❌ Please enter a valid email address." });
      setIsSubmitting(false);
      return;
    }

    if (!/^\d+$/.test(formData.phone)) {
      setErrorMsg({ open: true, message: "❌ Phone number should contain only numbers." });
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
          routeButton: { path: "/userlogin", label: "Go to Login" },
        });
        resetForm();
      } else {
        setErrorMsg({ open: true, message: result.message || "❌ Error registering user." });
      }
    } catch (error) {
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
        minHeight: "120vh", // Increased height for full image visibility
        overflow: "hidden",
        backgroundImage: "url('/final.avif')",
        
        backgroundSize: "cover", // Prevents duplication, fits the screen
       

        backgroundPosition: " center", // Centers the image properly
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        
        backgroundSize: "100% 100%", // Ensures it stretches fully
        

        
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
          zIndex: 1500,
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
          minHeight: "calc(100vh - 80px)",
          marginTop: "50px",
          marginRight: "50px", 
          marginLeft:"50px",
          marginTop:"150px",
          
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 3,
    width: "100%",
    maxWidth: "400px",
    maxHeight: "80vh", // Limits height
    overflowY: "auto", // Enables internal scrolling
    borderRadius: 2,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(8px)",

          }}
        >
          <Image
            src="/yar.jpg"
            alt="Manufacturer Registration"
            width={300}
            height={150}
            style={{
              marginBottom: "10px",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: "auto",

            
              
            }}
          />
          <Box component="form" sx={{ mt: 2 }}>
            <TextField fullWidth margin="dense" label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
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
            <TextField fullWidth margin="normal" label="Manufacturer Name" name="name" value={formData.name} onChange={handleChange} />
            <TextField fullWidth margin="normal" label="Date of Issue" name="dateOfIssue" type="date" value={formData.dateOfIssue} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            <TextField fullWidth margin="normal" label="Licence No." name="licenceNo" value={formData.licenceNo} onChange={handleChange} />
            <TextField fullWidth margin="normal" label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Physical Address" name="physicalAddress" value={formData.physicalAddress} onChange={handleChange} />
            <TextField fullWidth margin="normal" label="Website (Optional)" name="website" value={formData.website} onChange={handleChange} />
            <TextField fullWidth margin="normal" label="Wallet Address" name="walletAddress" value={formData.walletAddress} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Certification Number" name="certificationNumber" value={formData.certificationNumber} InputProps={{ readOnly: true }} />

            

            {/* Privacy Policy Checkbox */}
            <FormControlLabel control={<Checkbox checked={privacyChecked} onChange={handleChange} name="privacyChecked" />} label="I accept the privacy policy." sx={{ mt: 2 }} />

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} fullWidth sx={{ mt: 2, mb: 2 }}>
              {isSubmitting ? <CircularProgress size={24} /> : "Register Manufacturer"}
            </Button>

            {/* Success and Error Message Boxes */}
            <SuccessMsgBox open={successMsg.open} onClose={() => setSuccessMsg({ ...successMsg, open: false })} message={successMsg.message} routeButton={successMsg.routeButton} />
            <ErrorMsgBox open={errorMsg.open} onClose={() => setErrorMsg({ ...errorMsg, open: false })} message={errorMsg.message} />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ManufacturerForm;
