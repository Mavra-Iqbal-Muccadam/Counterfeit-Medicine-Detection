"use client";

import { useState } from "react";
import ManufacturerRegistrationForm from "../manufacturerregistrationform/page";
import ConnectWallet from "../connect-wallet.js/page";

export default function App() {
  const [walletAddress, setWalletAddress] = useState("");

  return (
    <div>
      <ConnectWallet setWalletAddress={setWalletAddress} />
      <ManufacturerRegistrationForm walletAddress={walletAddress} />
    </div>
  );
}
