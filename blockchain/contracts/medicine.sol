// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MedicineNFT is ERC721URIStorage {
    enum Status { Pending, Rejected, Accepted }

    struct Medicine {
        uint256 id;
        Status status;
        string manufacturerId;
        address wallet;
        string ipfsHash;
    }

    uint256 private _tokenIds;
    mapping(uint256 => Medicine) public medicines;
    mapping(address => uint256[]) private medicinesByWallet;

    address public admin; // ✅ Store the admin dynamically

    event MedicineMinted(uint256 indexed tokenId, address indexed owner, string manufacturerId, string ipfsHash);
    event StatusUpdated(uint256 indexed tokenId, Status newStatus);
    event AdminChanged(address indexed oldAdmin, address indexed newAdmin);

    constructor() ERC721("MedicineNFT", "MEDNFT") {
        admin = msg.sender; // ✅ Whoever deploys the contract becomes the admin
    }

    // ✅ Allow the admin to change the admin wallet
    function changeAdmin(address newAdmin) public {
        require(msg.sender == admin, "Only admin can change admin");
        require(newAdmin != address(0), "New admin cannot be zero address");

        emit AdminChanged(admin, newAdmin);
        admin = newAdmin;
    }

    // ✅ Mint a new Medicine NFT
    function mintMedicine(string memory _manufacturerId, string memory _ipfsHash) public returns (uint256) {
        _tokenIds++;
        uint256 newTokenId = _tokenIds;

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _ipfsHash);

        medicines[newTokenId] = Medicine({
            id: newTokenId,
            status: Status.Pending,
            manufacturerId: _manufacturerId,
            wallet: msg.sender,
            ipfsHash: _ipfsHash
        });

        medicinesByWallet[msg.sender].push(newTokenId);

        emit MedicineMinted(newTokenId, msg.sender, _manufacturerId, _ipfsHash);
        return newTokenId;
    }

    // ✅ Only the admin can update status
    function updateStatus(uint256 _tokenId, Status _newStatus) public {
        require(msg.sender == admin, "Only admin can update status");
        require(tokenExists(_tokenId), "Token does not exist");

        medicines[_tokenId].status = _newStatus;
        emit StatusUpdated(_tokenId, _newStatus);
    }

    function getPendingMedicines() public view returns (uint256[] memory) {
        return _filterMedicinesByStatus(Status.Pending);
    }

    function getRejectedMedicines() public view returns (uint256[] memory) {
        return _filterMedicinesByStatus(Status.Rejected);
    }

    function getApprovedMedicines() public view returns (uint256[] memory) {
        return _filterMedicinesByStatus(Status.Accepted);
    }

    function _filterMedicinesByStatus(Status _status) internal view returns (uint256[] memory) {
        uint256 count = 0;

        for (uint256 i = 1; i <= _tokenIds; i++) {
            if (medicines[i].status == _status) {
                count++;
            }
        }

        uint256[] memory matchingTokens = new uint256[](count);
        uint256 index = 0;

        for (uint256 i = 1; i <= _tokenIds; i++) {
            if (medicines[i].status == _status) {
                matchingTokens[index] = i;
                index++;
            }
        }

        return matchingTokens;
    }

    function getMedicinesByManufacturer(address _wallet) public view returns (uint256[] memory) {
        return medicinesByWallet[_wallet];
    }

    function getMedicinesByManufacturerAndStatus(address _wallet, Status _status) public view returns (uint256[] memory) {
        uint256[] storage allMedicines = medicinesByWallet[_wallet];
        uint256 count = 0;

        for (uint256 i = 0; i < allMedicines.length; i++) {
            if (medicines[allMedicines[i]].status == _status) {
                count++;
            }
        }

        uint256[] memory matchingMedicines = new uint256[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < allMedicines.length; i++) {
            if (medicines[allMedicines[i]].status == _status) {
                matchingMedicines[index] = allMedicines[i];
                index++;
            }
        }

        return matchingMedicines;
    }

    function tokenExists(uint256 _tokenId) public view returns (bool) {
        try this.ownerOf(_tokenId) returns (address owner) {
            return owner != address(0);
        } catch {
            return false;
        }
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
