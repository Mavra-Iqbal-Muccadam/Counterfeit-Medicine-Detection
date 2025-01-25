// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ManufacturerRegistry {
    struct Manufacturer {
        string name;
        string licenseNumber;
        string physicalAddress;
        bool isApproved;
    }

    mapping(address => Manufacturer) public manufacturers;

    function registerManufacturer(
        string memory _name,
        string memory _licenseNumber,
        string memory _physicalAddress
    ) public {
        manufacturers[msg.sender] = Manufacturer({
            name: _name,
            licenseNumber: _licenseNumber,
            physicalAddress: _physicalAddress,
            isApproved: false
        });
    }

    function approveManufacturer(address _manufacturer) public {
        manufacturers[_manufacturer].isApproved = true;
    }

    function isManufacturerApproved(address _manufacturer) public view returns (bool) {
        return manufacturers[_manufacturer].isApproved;
    }
}
