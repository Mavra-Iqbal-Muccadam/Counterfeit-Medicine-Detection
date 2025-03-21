"use client";
import { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import Image from "next/image";
import { getManufacturerStatus, loginWithMetaMask } from "../testingblockchain/login-status-manufacture/check"; // Import blockchain functions
import { SuccessMsgBox, ErrorMsgBox, InfoMsgBox } from "../components/MsgBox"; // Import message box 

const ManufacturerLogin = () => {
    const [inputValue, setInputValue] = useState("");
    const [status, setStatus] = useState("");
    const [statusColor, setStatusColor] = useState("#ffffff");
    const [errorMessage, setErrorMessage] = useState("");
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const [metaMaskErrorMessage, setMetaMaskErrorMessage] = useState("");

    const handleInputChange = (event) => {
        const walletRegex = /^0x[a-fA-F0-9]{40}$/;
        const value = event.target.value;
        if (value && !walletRegex.test(value)) {
            setErrorMessage("Invalid Ethereum wallet address.");
            setErrorOpen(true);
        } else {
            setErrorMessage("");
        }
        setInputValue(value);
    };

    const handleSubmit = async () => {
        if (!inputValue) {
            setErrorMessage("Please enter a valid wallet address.");
            setErrorOpen(true);
            return;
        }
        setErrorMessage(""); // Clear error if input is valid

        setStatus("Processing...");
        setStatusColor("#FFC107");

        try {
            const status = await getManufacturerStatus(inputValue);
            if (status) {
                setStatus(status);
                setStatusColor(status === "Approved ✅" ? "#4CAF50" : status === "Rejected ❌" ? "#F44336" : "#FFC107");
                setSuccessOpen(true);
            } else {
                setErrorMessage("Failed to fetch status. Please try again.");
                setErrorOpen(true);
            }
        } catch (error) {
            console.error("Error fetching status:", error);
            setErrorMessage("An error occurred while fetching the status.");
            setErrorOpen(true);
        }
    };

    const handleMetaMaskLogin = async () => {
        const result = await loginWithMetaMask();
        if (result === "Login Successful ✅") {
            setStatus(result);
            setStatusColor("#4CAF50");
            setSuccessOpen(true);
        } else {
            setMetaMaskErrorMessage(result);
            setErrorOpen(true);
        }
    };

    const handleCloseSuccess = () => {
        setSuccessOpen(false);
    };

    const handleCloseError = () => {
        setErrorOpen(false);
    };

    const handleCloseInfo = () => {
        setInfoOpen(false);
    };

    return (
        <>
            {/* Background Video */}
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: -1,
                    overflow: "hidden"
                }}
            >
                <video autoPlay loop muted playsInline style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                }}>
                    <source src="/videos/video.mp4" type="video/mp4" />
                </video>
            </Box>

            {/* Message Boxes (Above Navbar) */}
            <Box sx={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 2000 }}>
                <SuccessMsgBox
                    open={successOpen}
                    onClose={handleCloseSuccess}
                    message={status}
                />
                <ErrorMsgBox
                    open={errorOpen}
                    onClose={handleCloseError}
                    message={errorMessage || metaMaskErrorMessage}
                />
                <InfoMsgBox
                    open={infoOpen}
                    onClose={handleCloseInfo}
                    message="This is an informational message."
                />
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
                    zIndex: 1500,
                    height: "60px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Typography variant="body1" sx={{ cursor: "pointer", color: "#ffffff" }}>Home</Typography>
                    <Typography variant="body1" sx={{ cursor: "pointer", color: "#ffffff" }}>Contact Us</Typography>
                    <Typography variant="body1" sx={{ cursor: "pointer", color: "#ffffff" }}>About Us</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Image src="/healthcare (1).png" alt="Logo" width={50} height={50} />
                    <Typography variant="h6" sx={{ ml: 1, color: "#ffffff" }}>MediCare</Typography>
                </Box>
            </Box>

            {/* Main Content */}
            <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", mt: "80px" }}>
                <Box sx={{
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
                    alignItems: "center"
                }}>
                    <Typography variant="h5" gutterBottom sx={{ color: "#ffffff", fontWeight: "bold" }}>
                        Check Your Status
                    </Typography>
                    <TextField
                        fullWidth
                        placeholder="Enter your wallet address"
                        variant="outlined"
                        value={inputValue}
                        onChange={handleInputChange}
                        error={!!errorMessage}
                        helperText={errorMessage}
                        sx={{ mb: 2, bgcolor: "rgba(255, 255, 255, 0.9)", borderRadius: "8px" }}
                    />

                    <Button variant="contained" onClick={handleSubmit} sx={{ mt: 1, width: "80%", borderRadius: "15px", fontSize: "0.85rem", padding: "6px" }}>
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
        padding: "6px", 
        display: "flex", 
        alignItems: "center",
        gap: 1
    }}
>
    
    Login With MetaMask
    <Image 
        src="/metamask.png" // Ensure this image is placed in the `public/` directory
        alt="MetaMask Logo" 
        width={24} 
        height={24} 
    />
</Button>

                </Box>
            </Container>
        </>
    );
};

export default ManufacturerLogin;