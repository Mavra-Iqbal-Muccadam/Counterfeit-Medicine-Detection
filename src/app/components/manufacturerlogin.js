"use client";
import { useState } from "react";

const ManufacturerLogin = () => {
    const [inputValue, setInputValue] = useState("");
    const [status, setStatus] = useState(""); // ✅ Declare status state

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async () => {
        if (!inputValue) {
            alert("Please enter a wallet address.");
            return;
        }
    
        try {
            const response = await fetch("/api/check-status/check-status", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ walletAddress: inputValue }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                if (!data.status) {
                    setStatus("ID not found");
                } else {
                    setStatus(`Status: ${data.status}`);
                }
            } else {
                setStatus(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Error submitting wallet address:", error);
            setStatus("An error occurred. Please try again.");
        }
    };

    const handleLogin = () => {
        alert("Login clicked with wallet: " + inputValue);
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Check your status</h2>
            <input
                type="text"
                placeholder="Enter your wallet address"
                value={inputValue}
                onChange={handleInputChange}
                style={{ padding: "10px", marginBottom: "10px", width: "80%" }}
            />
            <br />
            <button onClick={handleSubmit} style={{ margin: "5px", padding: "10px" }}>
                Submit
            </button>
            {status && <div style={{ marginTop: "10px", fontWeight: "bold" }}>{status}</div>}
            <button onClick={handleLogin} style={{ margin: "5px", padding: "10px" }}>
                Login
            </button>
        </div>
    );
};

export default ManufacturerLogin;
