/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  paths: {
    sources: "./blockchain/contracts", 
    tests: "./blockchain/test",       
    scripts: "./blockchain/scripts",  
},
networks: {
  hardhat: {}, // Local Hardhat network
},

};
