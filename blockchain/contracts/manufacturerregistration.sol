// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ManufacturerIPFSStorage {
    address public admin;

    enum Status { Pending, Approved, Rejected }

    struct FileData {
        string ipfsHash;
        address owner;
        Status status;
    }

    mapping(address => FileData) private userFiles;
    string[] private allHashes;
    address[] private allUsers;

    event FileSubmitted(address indexed user, string ipfsHash);
    event FileApproved(address indexed user, string ipfsHash);
    event FileRejected(address indexed user, string ipfsHash);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender; // Set deployer as admin
    }

    /**
     * @dev Store IPFS hash for a given wallet address (Pending state).
     * @param _walletAddress The wallet address of the manufacturer.
     * @param _ipfsHash The IPFS hash to be stored.
     */
    function submitHash(address _walletAddress, string memory _ipfsHash) external {
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty");
        require(userFiles[_walletAddress].status == Status.Pending || userFiles[_walletAddress].status == Status.Rejected, "Already submitted");

        userFiles[_walletAddress] = FileData(_ipfsHash, _walletAddress, Status.Pending);
        allHashes.push(_ipfsHash); 
        allUsers.push(_walletAddress);
        emit FileSubmitted(_walletAddress, _ipfsHash);
    }

    /**
     * @dev Admin approves the manufacturer's IPFS hash.
     * @param _manufacturer The wallet address of the manufacturer.
     */
    function approveHash(address _manufacturer) external onlyAdmin {
        require(userFiles[_manufacturer].status == Status.Pending, "Hash is not pending approval");

        userFiles[_manufacturer].status = Status.Approved;
        emit FileApproved(_manufacturer, userFiles[_manufacturer].ipfsHash);
    }

    /**
     * @dev Admin rejects the manufacturer's IPFS hash.
     * @param _manufacturer The wallet address of the manufacturer.
     */
    function rejectHash(address _manufacturer) external onlyAdmin {
        require(userFiles[_manufacturer].status == Status.Pending, "Hash is not pending approval");

        userFiles[_manufacturer].status = Status.Rejected;
        emit FileRejected(_manufacturer, userFiles[_manufacturer].ipfsHash);
    }

    /**
     * @dev Retrieve the submitted IPFS hash and status for the caller.
     * @return ipfsHash and status (Pending/Approved/Rejected).
     */
    function getUserHashStatus() external view returns (string memory, Status) {
        require(bytes(userFiles[msg.sender].ipfsHash).length > 0, "No IPFS hash found for this user");
        return (userFiles[msg.sender].ipfsHash, userFiles[msg.sender].status);
    }

    /**
     * @dev Retrieve the submitted IPFS hash and status by wallet address.
     * @param _manufacturer The address of the manufacturer.
     * @return ipfsHash and status.
     */
    function getHashByAddress(address _manufacturer) external view returns (string memory, Status) {
        require(bytes(userFiles[_manufacturer].ipfsHash).length > 0, "No IPFS hash found for this address");
        return (userFiles[_manufacturer].ipfsHash, userFiles[_manufacturer].status);
    }

    /**
     * @dev Retrieve all stored hashes along with their statuses.
     * @return An array of all users and their IPFS hashes with statuses.
     */
    function getAllHashesWithStatus() external view returns (address[] memory, string[] memory, Status[] memory) {
        uint256 length = allUsers.length;
        Status[] memory statuses = new Status[](length);

        for (uint256 i = 0; i < length; i++) {
            statuses[i] = userFiles[allUsers[i]].status;
        }

        return (allUsers, allHashes, statuses);
    }

    /**
     * @dev Retrieve all approved IPFS hashes.
     * @return An array of all approved IPFS hashes.
     */
    function getApprovedHashes() external view returns (string[] memory) {
        uint256 approvedCount = 0;

        for (uint256 i = 0; i < allUsers.length; i++) {
            if (userFiles[allUsers[i]].status == Status.Approved) {
                approvedCount++;
            }
        }

        string[] memory approvedHashes = new string[](approvedCount);
        uint256 index = 0;

        for (uint256 i = 0; i < allUsers.length; i++) {
            if (userFiles[allUsers[i]].status == Status.Approved) {
                approvedHashes[index] = userFiles[allUsers[i]].ipfsHash;
                index++;
            }
        }

        return approvedHashes;
    }
}
