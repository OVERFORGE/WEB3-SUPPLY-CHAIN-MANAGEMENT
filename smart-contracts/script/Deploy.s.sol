// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/SupplyChain.sol";

contract DeploySupplyChain is Script {
    function run() external {
        vm.startBroadcast();

        SupplyChain supplyChain = new SupplyChain();

        vm.stopBroadcast();
    }
}