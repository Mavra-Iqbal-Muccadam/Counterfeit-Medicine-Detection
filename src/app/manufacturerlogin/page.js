"use client";
import { useState, useEffect } from "react";
import { TextField, Button, Typography, Container, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";

const images = [
    "/pill1.jpg",
    "/pill2.jpg",
    "/pill3.jpg",
    "/pill4.jpg"
];

const ManufacturerLogin = () => {
    const [inputValue, setInputValue] = useState("");
    const [status, setStatus] = useState("");
    const [medicines, setMedicines] = useState([]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async () => {
        if (!inputValue) {
            setStatus("Please enter a wallet address.");
            return;
        }
        setStatus("pending");
        setTimeout(() => {
            const statuses = ["pending", "approved", "rejected"];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            setStatus(randomStatus);
        }, 1500);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setMedicines((prevMedicines) => [
                ...prevMedicines,
                {
                    id: Math.random(),
                    src: images[Math.floor(Math.random() * images.length)],
                    left: Math.random() * window.innerWidth,
                    animationDuration: Math.random() * 3 + 2 + "s"
                }
            ]);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Navbar */}
            <Box
                sx={{
                    width: "100%",
                    bgcolor: "#87CEFA", /* Light blue background */
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
                {/* Left Side: Menu Icon and Navigation Links */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{
                            backgroundColor: "#FFFFDD",
                            color: "#016A70",
                            borderRadius: "50%",
                            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ cursor: "pointer" }}>Home</Typography>
                    <Typography variant="body1" sx={{ cursor: "pointer" }}>Contact Us</Typography>
                    <Typography variant="body1" sx={{ cursor: "pointer" }}>About Us</Typography>
                </Box>
                
                {/* Right Side: Logo & Website Name */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Image src="/healthcare (1).png" alt="Logo" width={50} height={50} />
                    <Typography variant="h6" sx={{ ml: 1 }}>MediCare</Typography>
                </Box>
            </Box>
            
            {/* Falling Medicines Animation */}
            {medicines.map((med) => (
                <img
                    key={med.id}
                    src={med.src}
                    alt="Medicine"
                    style={{
                        position: "absolute",
                        width: "50px",
                        height: "50px",
                        left: `${med.left}px`,
                        top: "-100px",
                        animation: `fall ${med.animationDuration} linear forwards`
                    }}
                />
            ))}
            
            {/* Main Content */}
            <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", mt: "80px", bgcolor: "#87CEFA" /* Light blue background */ }}>
                <Box sx={{ display: "flex", boxShadow: 3, borderRadius: 2, overflow: "hidden", maxWidth: "700px", width: "100%", height: "400px" }}>
                    {/* Wallet Input and Status Checking Box with Transparent Background */}
                    <Box sx={{ flex: 1, p: 3, backgroundColor: "transparent", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Typography variant="h5" gutterBottom>
                            Check your status
                        </Typography>
                        <TextField
                            fullWidth
                            label="Enter your wallet address"
                            variant="outlined"
                            value={inputValue}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                        />
                        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 1 }}>
                            Submit
                        </Button>
                        {status && (
                            <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: "bold" }}>
                                Status: {status}
                            </Typography>
                        )}
                        <Button variant="contained" href="/userlogin" component="a" sx={{ mt: 2 }}>
                            Login
                        </Button>
                    </Box>
                    
                    {/* Login Box with Image */}
                    <Box sx={{ flex: 1, position: "relative" }}>
                        <Image src="/yr.jpg" alt="Login Illustration" layout="fill" objectFit="cover" />
                    </Box>
                </Box>
            </Container>
            
            {/* Falling Animation CSS */}
            <style>{`
                @keyframes fall {
                    0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
                }
            `}</style>
        </>
    );
};

export default ManufacturerLogin;