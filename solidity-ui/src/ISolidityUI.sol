// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

interface ISolidityUI {
    function description() external pure returns (string memory);

    function index() external returns (string memory);

    function frens() external pure returns (address[] memory);
}
