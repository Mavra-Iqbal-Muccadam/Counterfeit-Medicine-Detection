require("dotenv").config(); 

module.exports = {
  env: {
    BLOCKCHAIN_RPC_URL: process.env.BLOCKCHAIN_RPC_URL,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
