// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ManufacturerNFTStorage is ERC721URIStorage {
    enum Status { Pending, Approved, Rejected }
    
    struct Manufacturer {
        address wallet;
        string jsonCID;
        string pdfCID;
        Status status;
    }
    
    mapping(uint256 => Manufacturer) public manufacturerData;
    mapping(address => uint256) public walletToTokenId;
    uint256 private _tokenIdCounter;

    event ManufacturerStored(uint256 indexed tokenId, address indexed wallet, string jsonCID, string pdfCID, Status status);
    event ManufacturerStatusUpdated(uint256 indexed tokenId, Status newStatus);

    constructor() ERC721("ManufacturerNFT", "MNFT") {}

    function storeManufacturer(address _manufacturer, string memory _jsonCID, string memory _pdfCID) external {
        require(_manufacturer != address(0), "Invalid manufacturer address");
        require(bytes(_jsonCID).length > 0, "JSON CID cannot be empty");
        require(bytes(_pdfCID).length > 0, "PDF CID cannot be empty");
        require(walletToTokenId[_manufacturer] == 0, "Manufacturer already stored");
        
        uint256 tokenId = _tokenIdCounter + 1;
        _tokenIdCounter = tokenId;

        _mint(_manufacturer, tokenId);
        manufacturerData[tokenId] = Manufacturer(_manufacturer, _jsonCID, _pdfCID, Status.Pending);
        walletToTokenId[_manufacturer] = tokenId;
        
        emit ManufacturerStored(tokenId, _manufacturer, _jsonCID, _pdfCID, Status.Pending);
    }


    
    function updateManufacturerStatus(uint256 _tokenId, Status _newStatus) external {
    require(ownerOf(_tokenId) != address(0), "Token does not exist");
    manufacturerData[_tokenId].status = _newStatus;
    emit ManufacturerStatusUpdated(_tokenId, _newStatus);
}

    function getManufacturerDetails(address _manufacturer) external view returns (
        uint256 tokenId,
        string memory jsonCID,
        string memory pdfCID,
        Status status
    ) {
        require(walletToTokenId[_manufacturer] != 0, "Manufacturer not found");
        tokenId = walletToTokenId[_manufacturer];
        Manufacturer memory manufacturer = manufacturerData[tokenId];
        return (tokenId, manufacturer.jsonCID, manufacturer.pdfCID, manufacturer.status);
    }

    function getPendingManufacturers() external view returns (address[] memory) {
        uint256 count;
        for (uint256 i = 1; i <= _tokenIdCounter; i++) {
            if (manufacturerData[i].status == Status.Pending) {
                count++;
            }
        }
        address[] memory pendingManufacturers = new address[](count);
        uint256 index;
        for (uint256 i = 1; i <= _tokenIdCounter; i++) {
            if (manufacturerData[i].status == Status.Pending) {
                pendingManufacturers[index] = manufacturerData[i].wallet;
                index++;
            }
        }
        return pendingManufacturers;
    }

    function getApprovedManufacturers() external view returns (address[] memory) {
        uint256 count;
        for (uint256 i = 1; i <= _tokenIdCounter; i++) {
            if (manufacturerData[i].status == Status.Approved) {
                count++;
            }
        }
        address[] memory approvedManufacturers = new address[](count);
        uint256 index;
        for (uint256 i = 1; i <= _tokenIdCounter; i++) {
            if (manufacturerData[i].status == Status.Approved) {
                approvedManufacturers[index] = manufacturerData[i].wallet;
                index++;
            }
        }
        return approvedManufacturers;
    }

    function getRejectedManufacturers() external view returns (address[] memory) {
        uint256 count;
        for (uint256 i = 1; i <= _tokenIdCounter; i++) {
            if (manufacturerData[i].status == Status.Rejected) {
                count++;
            }
        }
        address[] memory rejectedManufacturers = new address[](count);
        uint256 index;
        for (uint256 i = 1; i <= _tokenIdCounter; i++) {
            if (manufacturerData[i].status == Status.Rejected) {
                rejectedManufacturers[index] = manufacturerData[i].wallet;
                index++;
            }
        }
        return rejectedManufacturers;
    }

    function getManufacturerStatus(address _manufacturer) external view returns (Status) {
        require(walletToTokenId[_manufacturer] != 0, "Manufacturer not found");
        uint256 tokenId = walletToTokenId[_manufacturer];
        return manufacturerData[tokenId].status;
    }

    function login(address _manufacturer) external view returns (bool) {
        require(walletToTokenId[_manufacturer] != 0, "Manufacturer not found");
        uint256 tokenId = walletToTokenId[_manufacturer];
        return manufacturerData[tokenId].status == Status.Approved;
    }

    function getIndividualManufacturer(address _manufacturer) external view returns (
        address wallet,
        string memory jsonCID,
        string memory pdfCID,
        Status status
    ) {
        require(walletToTokenId[_manufacturer] != 0, "Manufacturer not found");
        uint256 tokenId = walletToTokenId[_manufacturer];
        Manufacturer memory manufacturer = manufacturerData[tokenId];
        return (manufacturer.wallet, manufacturer.jsonCID, manufacturer.pdfCID, manufacturer.status);
    }
}
