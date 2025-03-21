import QRCode from "react-qr-code";
import { useEffect, useState } from "react";

const QRCodeGenerator = () => {
  const [socket, setSocket] = useState(null);
  const [receivedText, setReceivedText] = useState("");

  // In QRCodeGenerator component
useEffect(() => {
  const ws = new WebSocket("wss://b8bf-45-199-187-1.ngrok-free.app"); // Use the ngrok URL
  ws.onmessage = (event) => {
    setReceivedText(event.data); // Update received message
  };
  setSocket(ws);

  return () => ws.close(); // Cleanup socket on unmount
}, []);

  // URL to send QR-scanned data to WebSocket server
  const qrData = "ws://localhost:8081";

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>QR Code for Real-Time Data</h1>
      <p>Scan the QR code to send data to this computer:</p>

      <QRCode value={qrData} size={230} />

      <div
        style={{
          marginTop: "20px",
          fontSize: "18px",
          fontWeight: "bold",
          color: "green",
        }}
      >
        {receivedText && <p>📩 Received: {receivedText}</p>}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
