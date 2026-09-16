require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BLOCKCHAIN_RPC_URL: process.env.BLOCKCHAIN_RPC_URL,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
  },
  compiler: {
    styledComponents: true,
  },
  eslint: {
    // Lint errors won't fail the production build
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
