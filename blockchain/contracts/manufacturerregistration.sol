// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ManufacturerStorage {
    struct Manufacturer {
        string jsonCID;
        string pdfCID;
        address wallet;
        bool isApproved;
    }

    Manufacturer[] private approvedManufacturers;
    mapping(address => Manufacturer) private manufacturerToCID;

    // ✅ Declare event
    event ManufacturerStored(address indexed manufacturer, string jsonCID, string pdfCID);

    function storeManufacturer(address _manufacturer, string memory _jsonCID, string memory _pdfCID) external {
        require(_manufacturer != address(0), "Invalid manufacturer address");
        require(bytes(_jsonCID).length > 0, "JSON CID cannot be empty");
        require(bytes(_pdfCID).length > 0, "PDF CID cannot be empty");

        Manufacturer memory newManufacturer = Manufacturer(_jsonCID, _pdfCID, _manufacturer, true); // ✅ Auto-approved
        approvedManufacturers.push(newManufacturer);
        manufacturerToCID[_manufacturer] = newManufacturer;

        emit ManufacturerStored(_manufacturer, _jsonCID, _pdfCID); // ✅ Now correctly declared
    }

    function getAllApprovedManufacturers() external view returns (Manufacturer[] memory) {
        return approvedManufacturers;
    }

    function getManufacturerCIDs(address _manufacturer) external view returns (string memory jsonCID, string memory pdfCID) {
        Manufacturer memory manufacturer = manufacturerToCID[_manufacturer];
        require(bytes(manufacturer.jsonCID).length > 0, "No CID found for this manufacturer");

        return (manufacturer.jsonCID, manufacturer.pdfCID);
    }

   function checkManufacturerExists(address _manufacturer) external view returns (bool) {
    if (_manufacturer == address(0)) {
        return false; // ✅ Prevent checking invalid addresses
    }

    Manufacturer memory manufacturer = manufacturerToCID[_manufacturer];

    if (bytes(manufacturer.jsonCID).length == 0) {
        return false; // ✅ Explicitly return false instead of failing
    }

    return true;
}

  function getManufacturerDetails(address _manufacturer) external view returns (
    string memory jsonCID,
    string memory pdfCID,
    address wallet,
    bool isApproved
) {
    if (bytes(manufacturerToCID[_manufacturer].jsonCID).length == 0) {
        return ("", "", address(0), false); // ✅ Return empty values instead of failing
    }
    
    Manufacturer memory manufacturer = manufacturerToCID[_manufacturer];
    return (manufacturer.jsonCID, manufacturer.pdfCID, manufacturer.wallet, manufacturer.isApproved);
}
}
