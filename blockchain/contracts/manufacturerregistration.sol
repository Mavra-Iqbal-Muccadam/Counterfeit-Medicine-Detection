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
    mapping(address => bool) public isApprovedManufacturer; // New: Track approved manufacturers

    event ManufacturerApproved(address indexed manufacturer);
    event ManufacturerRemoved(address indexed manufacturer);
    event FileApproved(address indexed user, string ipfsHash);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyApprovedManufacturer() {
        require(isApprovedManufacturer[msg.sender], "Not an approved manufacturer");
        _;
    }

    constructor() {
        admin = msg.sender; // Set deployer as admin
    }

    /**
     * @dev Approve a manufacturer to submit IPFS hashes.
     * @param _manufacturer The address of the manufacturer to approve.
     */
    function approveManufacturer(address _manufacturer) external onlyAdmin {
        require(!isApprovedManufacturer[_manufacturer], "Manufacturer already approved");
        isApprovedManufacturer[_manufacturer] = true;
        approvedUsers.push(_manufacturer);
        emit ManufacturerApproved(_manufacturer);
    }

    /**
     * @dev Remove an approved manufacturer.
     * @param _manufacturer The address of the manufacturer to remove.
     */
    function removeManufacturer(address _manufacturer) external onlyAdmin {
        require(isApprovedManufacturer[_manufacturer], "Manufacturer not found");
        isApprovedManufacturer[_manufacturer] = false;
        emit ManufacturerRemoved(_manufacturer);
    }

    /**
     * @dev Store and approve an IPFS hash for a verified manufacturer.
     * @param _ipfsHash The IPFS hash to be stored.
     */
    function submitAndApproveHash(string memory _ipfsHash) external onlyApprovedManufacturer {
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty");
        require(bytes(userFiles[msg.sender].ipfsHash).length == 0, "Already submitted and approved");

        userFiles[msg.sender] = FileData(_ipfsHash, msg.sender);
        approvedHashes.push(_ipfsHash);

        emit FileApproved(msg.sender, _ipfsHash);
    }

    /**
     * @dev Retrieve the approved IPFS hash for the caller (manufacturer).
     * @return ipfsHash The stored IPFS hash.
     */
    function getUserHash() external view onlyApprovedManufacturer returns (string memory) {
        require(bytes(userFiles[msg.sender].ipfsHash).length > 0, "No approved IPFS hash found for this user");
        return userFiles[msg.sender].ipfsHash;
    }

    /**
     * @dev Retrieve the approved IPFS hash by wallet address (for verification).
     * @param _manufacturer The address of the manufacturer.
     * @return ipfsHash The stored IPFS hash.
     */
    function getHashByAddress(address _manufacturer) external view returns (string memory) {
        require(isApprovedManufacturer[_manufacturer], "Address not a registered manufacturer");
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
