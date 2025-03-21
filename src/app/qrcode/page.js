"use client";
import { useEffect, useState } from "react";

export default function QRCodePage() {
  const [qrPageLink, setQrPageLink] = useState("");
  const [receivedText, setReceivedText] = useState("");
  const [socket, setSocket] = useState(null);

  // Generate the link for the mobile device
  useEffect(() => {
    setQrPageLink(`${window.location.origin}/qrcode/scan`);
  }, []);

 // In QRCodePage component
useEffect(() => {
  const ws = new WebSocket("wss://b8bf-45-199-187-1.ngrok-free.app"); // Use the ngrok URL
  ws.onmessage = (event) => {
    setReceivedText(event.data); // Update received message
  };
  setSocket(ws);

  return () => ws.close(); // Cleanup socket on unmount
}, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>QR Code Scanner & Decoder</h1>

      {/* Display the link for the mobile device */}
      {qrPageLink && (
        <p>
          Open this link on your mobile: <a href={qrPageLink} target="_blank">{qrPageLink}</a>
        </p>
      )}

      {/* Display received QR code data */}
      {receivedText && (
        <div style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold", color: "green" }}>
          <p>📩 Received: {receivedText}</p>
        </div>
      )}
    </div>
  );
}