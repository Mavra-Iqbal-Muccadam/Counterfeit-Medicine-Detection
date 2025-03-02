// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ManufacturerIPFSStorage {
    address public admin;

    struct FileData {
        string ipfsHash;
        address owner;
    }

    mapping(address => FileData) private userFiles;
    string[] private approvedHashes;
    address[] private approvedUsers;

    event FileApproved(address indexed user, string ipfsHash);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender; // Set deployer as admin
    }

    /**
     * @dev Store and approve an IPFS hash for a given wallet address.
     * @param _walletAddress The wallet address of the manufacturer.
     * @param _ipfsHash The IPFS hash to be stored and approved.
     */
    function submitAndApproveHash(address _walletAddress, string memory _ipfsHash) external onlyAdmin {
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty");
        require(bytes(userFiles[_walletAddress].ipfsHash).length == 0, "Already submitted and approved");

        userFiles[_walletAddress] = FileData(_ipfsHash, _walletAddress);
        approvedHashes.push(_ipfsHash); 
        approvedUsers.push(_walletAddress);
        
        emit FileApproved(_walletAddress, _ipfsHash);
    }

    /**
     * @dev Retrieve the approved IPFS hash for the caller.
     * @return ipfsHash The stored IPFS hash.
     */
    function getUserHash() external view returns (string memory) {
        require(bytes(userFiles[msg.sender].ipfsHash).length > 0, "No approved IPFS hash found for this user");
        return userFiles[msg.sender].ipfsHash;
    }

    /**
     * @dev Retrieve the approved IPFS hash by wallet address.
     * @param _manufacturer The address of the manufacturer.
     * @return ipfsHash The stored IPFS hash.
     */
    function getHashByAddress(address _manufacturer) external view returns (string memory) {
        require(bytes(userFiles[_manufacturer].ipfsHash).length > 0, "No approved IPFS hash found for this address");
        return userFiles[_manufacturer].ipfsHash;
    }

    /**
     * @dev Retrieve all approved IPFS hashes.
     * @return An array of all approved IPFS hashes.
     */
    function getApprovedHashes() external view returns (string[] memory) {
        return approvedHashes;
    }
}
