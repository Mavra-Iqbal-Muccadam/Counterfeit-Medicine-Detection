
"use client"; 
import React, { useState } from "react";
import DynamicButton from '../../../components/button.js';

const GlassmorphismLogin = () => {
  const [activeTab, setActiveTab] = useState("login");

  const containerStyle = {
    display: "flex",
    overflow: "hidden", 
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh", // Ensures it covers the full viewport height
    width: "100%",
    margin: "0", // Removes any default margin
    background: "#ebeef8",
    position: "relative", // Ensures correct positioning for child elements
  };

  const videoStyle = {
    position: "absolute",
    overflow: "hidden",
    left: "0",
    width: "50%",
    height: "95%",
    objectFit: "fill",
    zIndex: "1",
    marginRight:"auto",
  };

  const wrapperStyle = {
    overflow: "hidden",
    width: "30%",
    height: "90%",
    marginLeft: "auto", // Moves it to the right
    marginRight: "5%",  // Adjust as needed
    borderRadius: "8px",
    padding: "30px",
    textAlign: "center",
    border: "1.5rem solid rgba(31, 77, 177, 0.5)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    color: "#fff",
    position: "relative",
    zIndex: "1",
  };

  const inputStyle = {
    width: "100%",
    height: "40px",
    
    border: "none",
    outline: "none",
    fontSize: "16px",
    color: "#fff",
    borderBottom: "2px solid #ccc",
    margin: "15px 0",
  };

  const buttonStyle = {
   background: "#254798",
    color: "#000",
    fontWeight: "600",
    border: "none",
    padding: "12px 20px",
    cursor: "pointer",
    borderRadius: "3px",
    fontSize: "16px",
    transition: "0.3s ease",
    width: "100%",
    marginTop: "20px",
  };

  return (
    <div style={containerStyle}>
      <video autoPlay loop muted style={videoStyle}>
      <source src="/images/Blue Illustrative Clean Health Insurance Instagram Story.mp4" type="video/mp4" />
      </video>
      <div style={wrapperStyle}>
        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
          <button
            onClick={() => setActiveTab("login")}
            style={{ ...buttonStyle, background: activeTab === "login" ? "#fff" : "transparent", color: activeTab === "login" ? "#000" : "#fff" }}>
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            style={{ ...buttonStyle, background: activeTab === "signup" ? "#fff" : "transparent", color: activeTab === "signup" ? "#000" : "#fff" }}>
            Sign Up
          </button>
        </div>

        <form>
          <input type="text" placeholder="Enter your email" required style={inputStyle} />
          <input type="password" placeholder="Enter your password" required style={inputStyle} />
          <button type="submit" style={buttonStyle}>{activeTab === "login" ? "Log In" : "Sign Up"}</button>
        </form>
      </div>
    </div>
  );
};

export default GlassmorphismLogin;