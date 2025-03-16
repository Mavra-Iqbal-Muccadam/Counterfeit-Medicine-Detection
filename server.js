const http = require("http");
const WebSocket = require("ws");

// Create an HTTP server
const server = http.createServer();

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("📡 New client connected");

  ws.on("message", (message) => {
    console.log("📩 Received:", message);

    // Broadcast message to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => console.log("❌ Client disconnected"));
});

// Start the server
server.listen(8081, () => {
  console.log("✅ WebSocket server running on ws://localhost:8081");
});