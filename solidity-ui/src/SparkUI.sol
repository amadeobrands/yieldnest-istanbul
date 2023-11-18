// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { ISolidityUI } from "./ISolidityUI.sol";

import { IERC20 } from "@openzeppelin/interfaces/IERC20.sol";
import { IERC4626 } from "@openzeppelin/interfaces/IERC4626.sol";
import { Strings } from "@openzeppelin/utils/Strings.sol";

import { console2 } from "forge-std/console2.sol";

contract SparkUI is ISolidityUI {
    IERC20 public dai;
    IERC4626 public sdai;

    constructor(IERC20 dai_, IERC4626 sdai_) {
        dai = dai_;
        sdai = sdai_;
        dai.approve(address(sdai), type(uint256).max);
    }

    function description() public pure returns (string memory) {
        return "Borrowing/Lending markets powered by Maker";
    }

    // Function to return a simple "Hello World" HTML page
    function index() public view returns (string memory) {
        return string(abi.encodePacked(
            '<h1> Welcome to Spark!</h1><br>',
            'My dai balance: ', Strings.toString(getMyDaiBalance()/1e18), '<br>',
            'My sdai balance: ', Strings.toString(getMySDaiBalance()/1e18), '<br>',
            '<a href="depositDai()">Deposit Dai</a>'
        ));
    }

    function getMyDaiBalance() public view returns (uint256 balance) {
        return getDaiBalance(msg.sender);
    }

    function getDaiBalance(address user) public view returns (uint256 balance) {
        return dai.balanceOf(user);
    }

    function getMySDaiBalance() public view returns (uint256 balance) {
        return getSDaiBalance(msg.sender);
    }

    function getSDaiBalance(address user) public view returns (uint256 balance) {
        return sdai.balanceOf(user);
    }

    function depositDai(uint256 amount) public {
        dai.transferFrom(msg.sender, address(this), amount);
        sdai.deposit(amount, msg.sender);
    }

    function frens() public pure returns (address[] memory) {
        address[] memory addresses = new address[](2);
        addresses[0] = address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);
        addresses[1] = address(0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2);
        return addresses;
    }
}
