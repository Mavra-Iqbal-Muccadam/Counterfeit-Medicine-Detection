"use client";
import { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function ScanPage() {
  const [decodedText, setDecodedText] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [socket, setSocket] = useState(null);

  // WebSocket connection to send data to the website
useEffect(() => {
  const ws = new WebSocket("wss://b8bf-45-199-187-1.ngrok-free.app"); // Use the ngrok URL
  setSocket(ws);

  return () => ws.close(); // Cleanup socket on unmount
}, []);

  // Function to start QR Code scanning
  const startScanner = () => {
    const scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });
    scanner.render(
      (decodedResult) => {
        setDecodedText(decodedResult);
        scanner.clear();
        // Send decoded data to the website via WebSocket
        if (socket) {
          socket.send(decodedResult);
        }
      },
      (error) => console.log(error)
    );
  };

  // Function to handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to decode uploaded image and send data to the website
  const decodeUploadedImage = async () => {
    if (uploadedImage) {
      const response = await fetch("/api/qrcode/decode-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: uploadedImage }),
      });
      const data = await response.json();
      setDecodedText(data.text);
      // Send decoded data to the website via WebSocket
      if (socket) {
        socket.send(data.text);
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Scan QR Code</h1>

      {/* Button to open camera for scanning */}
      <button onClick={startScanner} style={{ padding: "10px", marginBottom: "10px", fontSize: "16px" }}>
        Open Camera to Scan QR Code
      </button>

      {/* Camera container */}
      <div id="qr-reader" style={{ width: "300px", margin: "auto" }}></div>

      {/* Upload QR Code section */}
      <div style={{ marginTop: "20px" }}>
        <h2>Or Upload a QR Code Image</h2>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button onClick={decodeUploadedImage} style={{ padding: "10px", fontSize: "16px", marginTop: "10px" }}>
          Decode Uploaded QR Code
        </button>
      </div>

      {/* Display decoded data (optional, for mobile device) */}
      {decodedText && (
        <div style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold", color: "green" }}>
          <p>📩 Decoded Data: {decodedText}</p>
        </div>
      )}
    </div>
  );
}