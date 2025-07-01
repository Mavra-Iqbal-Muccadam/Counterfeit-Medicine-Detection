# PharmaGuard 24/7 - Blockchain Anti-Counterfeit Medicine Platform  

![PharmaGuard Logo](https://via.placeholder.com/150x50?text=PharmaGuard)  

A decentralized solution to combat counterfeit medicines using blockchain, AI, and secure verification systems.  

## 🚀 Key Features  
- **Blockchain Authentication**: Tamper-proof medicine records on Ethereum  
- **Manufacturer Verification**: MetaMask-based onboarding with admin approval  
- **AI-Powered Detection**: Flags suspicious medicine entries using generative AI  
- **QR Code Verification**: Real-time authenticity checks for end-users  
- **Role-Based Access**: Secure permissions for Admins, Manufacturers, and Users  
- **E-Commerce Integration**: Secure payments via PayPro gateway  

## 🛠️ Tech Stack  
| Category        | Technologies Used |  
|-----------------|------------------|  
| **Frontend**    | Next.js, React, Tailwind CSS |  
| **Backend**     | Node.js, Express, JWT Authentication |  
| **Database**    | PostgreSQL, Supabase |  
| **Blockchain**  | Ethereum (Solidity), Hardhat, Ethers.js, IPFS |  
| **AI/ML**       | Microsoft Phi-4, Qwen 2.5, OpenAI 3.5 |  
| **Payment**     | PayPro Integration |  

## 📌 Project Highlights  
✔ **Decentralized Trust**: Immutable medicine records on blockchain  
✔ **AI Vigilance**: Automated anomaly detection for counterfeit prevention  
✔ **User-Friendly**: QR scanning for instant verification  
✔ **Secure Access**: Role-based permissions (Admin/Manufacturer/User)  
✔ **End-to-End Solution**: From verification to purchase  

## 📂 Repository Structure  
```
pharmaguard/  
├── client/          # Next.js frontend  
├── server/          # Node.js/Express backend  
├── contracts/       # Solidity smart contracts  
├── ipfs/            # Decentralized storage scripts  
├── ai-module/       # Anomaly detection models  
└── README.md  
```

## 🔧 Setup & Installation  
1. **Clone the repository**  
   ```bash
   git clone https://github.com/yourusername/pharmaguard.git
   cd pharmaguard
   ```

2. **Install dependencies**  
   ```bash
   # Frontend
   cd client && npm install
   # Backend 
   cd ../server && npm install
   # Blockchain
   cd ../contracts && npm install
   ```

3. **Configure environment variables**  
   Create `.env` files in each directory with:  
   - Database credentials (PostgreSQL/Supabase)  
   - Ethereum testnet keys (Alchemy/Sepolia)  
   - JWT secret keys  

4. **Run the system**  
   ```bash
   # Start frontend
   cd client && npm run dev
   # Start backend
   cd ../server && npm start
   # Deploy contracts
   cd ../contracts && npx hardhat deploy
   ```

## 🌐 Live Demo  
[![Demo Video](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://youtube.com/watch?v=VIDEO_ID)  




