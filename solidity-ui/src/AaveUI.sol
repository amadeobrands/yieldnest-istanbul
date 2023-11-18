// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { ISolidityUI } from "./ISolidityUI.sol";

import { IERC20 } from "@openzeppelin/interfaces/IERC20.sol";
import { MockERC20 } from "../src/MockERC20.sol";
import { Strings } from "@openzeppelin/utils/Strings.sol";

import { console2 } from "forge-std/console2.sol";

contract AaveUI is ISolidityUI {
    IERC20 public eth;
    MockERC20 public gho;

    constructor(IERC20 eth_, MockERC20 gho_) {
        eth = eth_;
        gho = gho_;
    }

    function description() public pure returns (string memory) {
        return "Borrowing/Lending markets";
    }

    function index() public view returns (string memory) {
        return string(abi.encodePacked(
            '<h1> Welcome to Aave!</h1><br>',
            'My eth balance: ', Strings.toString(getMyEthBalance()/1e18), '<br>',
            'My gho balance: ', Strings.toString(getMyGhoBalance()/1e18), '<br>',
            'My health ratio balance: ', '0', '<br>',
            '<a href="supplyEth()">Supply Eth</a>'
            '<a href="borrowGho()">Borrow Gho</a>'
        ));
    }

    function getMyEthBalance() public view returns (uint256 balance) {
        return getEthBalance(msg.sender);
    }

    function getEthBalance(address user) public view returns (uint256 balance) {
        return eth.balanceOf(user);
    }

    function getMyGhoBalance() public view returns (uint256 balance) {
        return getGhoBalance(msg.sender);
    }

    function getGhoBalance(address user) public view returns (uint256 balance) {
        return gho.balanceOf(user);
    }

    function supplyEth(uint256 amount) public {
        eth.transferFrom(msg.sender, address(this), amount);
    }

    function borrowGho(uint256 amount) public {
        gho.mint(msg.sender, amount);
    }

    function frens() public pure returns (address[] memory) {
        address[] memory addresses = new address[](2);
        addresses[0] = address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);
        addresses[1] = address(0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2);
        return addresses;
    }
}
