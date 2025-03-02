"use client";

import { useState } from "react";
import ManufacturerRegistrationForm from "./manufacturerregistrationForm";
import ConnectWallet from "./connect-wallet";

export default function App() {
  const [walletAddress, setWalletAddress] = useState("");

  return (
    <div>
      <ConnectWallet setWalletAddress={setWalletAddress} />
      <ManufacturerRegistrationForm walletAddress={walletAddress} />
    </div>
  );
}
