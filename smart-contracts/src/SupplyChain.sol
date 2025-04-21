// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-contracts/contracts/access/AccessControl.sol";

contract SupplyChain is ERC721, AccessControl {
    address public owner;
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MANUFACTURER_ROLE = keccak256("MANUFACTURER_ROLE");
    bytes32 public constant DISTRIBUTOR_ROLE = keccak256("DISTRIBUTOR_ROLE");
    bytes32 public constant RETAILER_ROLE = keccak256("RETAILER_ROLE");

    address[] public initialOwnership = new address[](1);  
    string[] public initialLocation = new string[](1);
    string[] public initialIpfsHash = new string[](1);
    uint256 public nextProductId = 1;
    event ProductCreated(uint256 indexed productId, address indexed manufacturer);


    struct Product{
        uint256 productId;
        string name;
        uint256 quantity;
        uint256 price;
        address currentOwner;
        address[] ownershipHistory;
        string[] locationHistory;
        uint256 createdAt;
        bool isActive;
        string[] ipfsHistory;
    }

    mapping(uint256 => Product) public productIdToProduct;

    constructor() ERC721("SupplyChainProduct", "SCP") {
        owner = msg.sender;
        _grantRole(ADMIN_ROLE , msg.sender);
    }

    function assignManufacturer(address account) public {
        require(msg.sender == owner , "Only owner can assign roles");
        _grantRole(MANUFACTURER_ROLE,account);
    }

    function assignDistributer(address account) public {
        require(msg.sender == owner , "Only owner can assign roles");
        _grantRole(DISTRIBUTOR_ROLE,account);
    }

    function assignRetailer(address account) public {
        require(msg.sender == owner , "Only owner can assign roles");
        _grantRole(RETAILER_ROLE,account);
    }


    function createProduct(string memory name, uint256 quantity, uint256 price, string memory ipfsHash) public onlyRole(MANUFACTURER_ROLE) {
    uint256 productId = nextProductId;
    nextProductId++;
    _safeMint(msg.sender, productId);

    initialOwnership[0] = msg.sender;
    initialLocation[0] = "Manufactured";
    initialIpfsHash[0] = ipfsHash;

    productIdToProduct[productId] = Product({
        productId: productId,
        name: name,
        quantity: quantity,
        price: price,
        currentOwner: msg.sender,
        ownershipHistory: initialOwnership,
        locationHistory: initialLocation,
        createdAt: block.timestamp,
        isActive: true,
        ipfsHistory: initialIpfsHash
    });
    emit ProductCreated(productId, msg.sender);
}

    function getProduct(uint256 productId) public view returns(
    uint256 id, 
    string memory name, 
    uint256 quantity, 
    uint256 price, 
    address currentOwner, 
    address[] memory ownershipHistory, 
    string[] memory locationHistory, 
    uint256 createdAt, 
    bool isActive,
    string[] memory ipfsHistory
) {
    Product memory product = productIdToProduct[productId];
    return (
        product.productId,
        product.name,
        product.quantity,
        product.price,
        product.currentOwner,
        product.ownershipHistory,
        product.locationHistory,
        product.createdAt,
        product.isActive,
        product.ipfsHistory 
    );
}



    function transferProduct(uint256 productId , address to , string memory newLocation ,string memory ipfsHash) public {
        Product storage product = productIdToProduct[productId];
        require(product.isActive,"Product is not active");
        require(product.currentOwner == msg.sender , "Only current owner can transfer");

        product.currentOwner = to;
        product.ownershipHistory.push(to);
        product.locationHistory.push(newLocation);
        product.ipfsHistory.push(ipfsHash);

        _transfer(msg.sender , to , productId);
    }




    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}