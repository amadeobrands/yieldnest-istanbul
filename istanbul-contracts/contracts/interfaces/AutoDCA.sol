//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.0;


// This is the main building block for smart contracts.
contract AutoDCA {

    uint public lastTimeSwapped;
    constructor() {
    }

    function invest() external {
        lastTimeSwapped = block.timestamp;
    }
}