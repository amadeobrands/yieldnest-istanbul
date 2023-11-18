//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.0;


// This is the main building block for smart contracts.
contract AutoDCA {

    uint public lastTimeSwapped;

    uint public investmentCallCounter;
    constructor() {
    }

    function invest() external {
        lastTimeSwapped = block.timestamp;

        investmentCallCounter += 1;
    }

    function shouldInvest() external view returns (bool readyToInvest, bytes memory cdata) {

        // return false if not ready to invest
        // cdata is irrelevant when readyToInvest = false
        readyToInvest = block.timestamp - lastTimeSwapped > 20 seconds;

        cdata = abi.encodeWithSelector(AutoDCA(address(this)).invest.selector);
    }
}