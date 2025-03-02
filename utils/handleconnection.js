import { ethers } from "ethers";

export async function connectMetaMask() {
  if (typeof window === "undefined") {
    console.error("❌ MetaMask cannot be accessed on the server.");
    return null;
  }

  if (!window.ethereum) {
    console.error("❌ MetaMask is not installed.");
    return null;
  }

  try {
    console.log("🔄 Checking if MetaMask is unlocked...");
    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length > 0) {
      console.log("✅ MetaMask is already connected:", accounts[0]);
    } else {
      console.log("🔄 Requesting MetaMask connection...");
      await window.ethereum.request({ method: "eth_requestAccounts" });
    }

    // Wait for MetaMask to inject window.ethereum properly
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Ensure window.ethereum is available before using Web3Provider
    if (!window.ethereum) {
      throw new Error("Ethereum provider is still undefined after waiting.");
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log("✅ MetaMask connected with provider:", provider);

    return provider;
  } catch (error) {
    console.error("❌ MetaMask connection error:", error);
    return null;
  }
}
