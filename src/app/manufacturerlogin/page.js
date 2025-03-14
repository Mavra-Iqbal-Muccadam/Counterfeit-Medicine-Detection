"use client";
import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Image from "next/image";
import { handleSubmit } from "../blockchain/handlestatussubmit";
import { loginWithMetaMask } from "../blockchain/login";
import { ErrorMsgBox } from "../components/MsgBox"; // Import the ErrorMsgBox component
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const ManufacturerLogin = () => {
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState("");
  const [statusColor, setStatusColor] = useState("#ffffff");
  const [metaMaskErrorModalOpen, setMetaMaskErrorModalOpen] = useState(false);
  const [metaMaskErrorMessage, setMetaMaskErrorMessage] = useState("");
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showWalletAddress, setShowWalletAddress] = useState(false); // State for toggling wallet address visibility

  const handleCloseMetaMaskErrorModal = () => {
    setMetaMaskErrorModalOpen(false);
  };

  const handleInputChange = (event) => {
    const walletRegex = /^0x[a-fA-F0-9]{40}$/;
    const value = event.target.value;
    setInputValue(value);

    // Validate wallet address
    if (value && !walletRegex.test(value)) {
      setErrorMessage(" ❌ Please enter a valid Ethereum wallet address.");
    } else {
      setErrorMessage(""); // Clear error message if valid
    }
  };

  const handleMetaMaskLogin = async () => {
    const result = await loginWithMetaMask();
    if (!result.success) {
      setMetaMaskErrorMessage(result.message); // Store error message
      setMetaMaskErrorModalOpen(true); // Open the modal
    }
  };

  const handleCloseStatusModal = () => {
    setStatusModalOpen(false);
  };

  const toggleWalletAddressVisibility = () => {
    setShowWalletAddress((prev) => !prev);
  };

  return (
    <>
      {/* MetaMask Error Message Box */}
      <ErrorMsgBox
        open={metaMaskErrorModalOpen}
        onClose={() => setMetaMaskErrorModalOpen(false)}
        message={metaMaskErrorMessage}
        sx={{ zIndex: 1100 }} // Ensure it appears above everything
      />

      {/* Background Video */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          overflow: "hidden",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/videos/video.mp4" type="video/mp4" />
        </video>
      </Box>

      {/* Navbar */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "#004b8d",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          top: 0,
          zIndex: 1000, // Lower than ErrorMsgBox
          height: "60px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Typography variant="body1" sx={{ cursor: "pointer", color: "#ffffff" }}>
            Home
          </Typography>
          <Typography variant="body1" sx={{ cursor: "pointer", color: "#ffffff" }}>
            Contact Us
          </Typography>
          <Typography variant="body1" sx={{ cursor: "pointer", color: "#ffffff" }}>
            About Us
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image src="/healthcare (1).png" alt="Logo" width={50} height={50} />
          <Typography variant="h6" sx={{ ml: 1, color: "#ffffff" }}>
            MediCare
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          mt: "80px",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: 5,
            borderRadius: 3,
            maxWidth: "450px",
            width: "100%",
            p: 4,
            bgcolor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(15px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ color: "#ffffff", fontWeight: "bold" }}>
            Check Your Status
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter your wallet address"
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
            type={showWalletAddress ? "text" : "password"} // Toggle between text and password
            sx={{ mb: 1, bgcolor: "rgba(255, 255, 255, 0.9)", borderRadius: "8px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleWalletAddressVisibility}>
                    {showWalletAddress ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* Separate Error Message */}
          {errorMessage && (
            <Typography
              sx={{
                color: "#ffffff",
                fontSize: "0.875rem",
                mt: 1,
                textAlign: "left",
                width: "100%", // Ensure it spans the full width
                pl: 1, // Add some padding to align with the TextField
              }}
            >
              {errorMessage}
            </Typography>
          )}

          <Button
            variant="contained"
            onClick={() =>
              handleSubmit(inputValue, setErrorMessage, setStatus, setStatusColor, setStatusModalOpen)
            }
            sx={{ mt: 2, width: "80%", borderRadius: "15px", fontSize: "0.85rem", padding: "6px" }}
          >
            Submit
          </Button>

          <Button
            variant="contained"
            onClick={handleMetaMaskLogin}
            sx={{
              mt: 2,
              width: "80%",
              borderRadius: "15px",
              fontSize: "0.85rem",
            //   padding: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center", // Space out text and icon
              gap:"10px",
            }}
          >
            Login With MetaMask
            <Image
              src="/metamask.png" // Path to the MetaMask fox icon
              alt="MetaMask Fox"
              width={24} // Adjust size as needed
              height={24}
            //   style={{ filter: "brightness(0) invert(1)" }} // Make the icon white
            />
          </Button>
        </Box>
      </Container>

      {/* Status Modal */}
      <Dialog
        open={statusModalOpen}
        onClose={handleCloseStatusModal}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "12px",
            padding: "20px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            width: "300px", // Slimmer width
            maxWidth: "90%", // Ensure it doesn't overflow on small screens
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: statusColor,
            padding: "0 0 10px 0", // Reduce padding
          }}
        >
          Status
        </DialogTitle>
        <DialogContent sx={{ padding: "10px 0" }}>
          <Typography
            sx={{
              color: statusColor,
              fontWeight: "bold",
              fontSize: "1.5rem",
              margin: "10px 0",
            }}
          >
            {status}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", padding: "10px 0" }}>
          <Button
            onClick={handleCloseStatusModal}
            variant="contained"
            sx={{
              bgcolor: statusColor,
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "6px 20px",
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManufacturerLogin;