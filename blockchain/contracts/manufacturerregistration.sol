// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IPFSStorage {
    struct FileRecord {
        string ipfsHash;
        string fileName;
        uint256 timestamp;
    }

    mapping(address => FileRecord[]) public userFiles;

    event FileStored(address indexed user, string ipfsHash, string fileName, uint256 timestamp);

    function storeFile(string memory _ipfsHash, string memory _fileName) public {
        userFiles[msg.sender].push(FileRecord(_ipfsHash, _fileName, block.timestamp));
        emit FileStored(msg.sender, _ipfsHash, _fileName, block.timestamp);
    }

    function getFiles(address _user) public view returns (FileRecord[] memory) {
        return userFiles[_user];
    }
}
