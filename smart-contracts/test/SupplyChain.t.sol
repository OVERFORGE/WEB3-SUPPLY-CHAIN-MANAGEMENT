// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "src/SupplyChain.sol";


contract SupplyChainTest is Test {
    SupplyChain supplyChain;
    address owner;
    address manufacturer;
    address distributor;
    address retailer;

    function setUp() public{
        owner = makeAddr("owner");
        manufacturer = makeAddr("manufacturer");
        distributor = makeAddr("distributor");
        retailer = makeAddr("retailer");

        vm.prank(owner);
        supplyChain = new SupplyChain();        
        vm.prank(owner);
        supplyChain.assignManufacturer(manufacturer);
        vm.prank(owner);
        supplyChain.assignDistributer(distributor);
        vm.prank(owner);
        supplyChain.assignRetailer(retailer);
    }

    function testDeployment() public {
        assertEq(supplyChain.owner(), owner);
        assertTrue(supplyChain.hasRole(supplyChain.ADMIN_ROLE(), owner));
    }

    function testCreateProduct() public {
        string memory productName = "Laptop";
        uint256 productQuantity = 100;
        uint256 productPrice = 1000;
        string memory ipfsHash = "ipfs://hash";

        vm.prank(manufacturer);
        supplyChain.createProduct(productName,productQuantity,productPrice,ipfsHash);

        uint256 productId = 1;

        ( , string memory name, uint256 quantity, uint256 price, address currentOwner,, string[] memory locationHistory, uint256 createdAt ,bool isActive, ) = supplyChain.getProduct(productId);

        assertEq(name, productName);
        assertEq(quantity, productQuantity);
        assertEq(price, productPrice);
        assertEq(currentOwner, manufacturer);
        assertEq(locationHistory[0], "Manufactured");
        assertEq(isActive, true);
    }

    function testTransferProduct() public{
        vm.prank(manufacturer);

        supplyChain.createProduct("Phone", 10, 500, "ipfs://hash");

        uint256 productId = 1;

        vm.prank(manufacturer);
        supplyChain.transferProduct(productId,distributor,"Warehouse","");

        ( , string memory name, uint256 quantity, uint256 price, address currentOwner, address[] memory ownershipHistory, string[] memory locationHistory, ,bool isActive, ) = supplyChain.getProduct(productId);


        assertEq(name, "Phone");
        assertEq(quantity, 10);
        assertEq(price, 500);
        assertEq(currentOwner, distributor);
        assertEq(ownershipHistory.length ,2);
        assertEq(ownershipHistory[1],distributor);
        assertEq(locationHistory[1], "Warehouse");
        assertEq(isActive, true);


    }

    function testFailCreateProductAsNonManufacturer() public {
        vm.prank(distributor); 
        supplyChain.createProduct("Fake", 1, 1, "ipfs://fake");
    }


    function testProductCreatedEvent() public{
        vm.prank(manufacturer);
        vm.expectEmit(true,true,false,false);
        emit SupplyChain.ProductCreated(1,manufacturer);

        supplyChain.createProduct("Tablet", 20, 900, "ipfs://tablet");
    }
}