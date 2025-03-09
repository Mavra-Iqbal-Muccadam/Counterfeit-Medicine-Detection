"use client";
import React, { useState } from "react";
import { loginWithMetaMask } from "../blockchain/login"; // ✅ Import login function

const LoginPage = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const result = await loginWithMetaMask();
    setStatus(result);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Manufacturer Login</h1>

      <button
        className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-600 disabled:bg-gray-400"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Connecting..." : "Login with MetaMask"}
      </button>

      {status && (
        <div className={`mt-6 p-4 rounded-md text-lg ${status.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          <p>{status.message}</p>
          {status.success && <p><strong>Wallet:</strong> {status.wallet}</p>}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
