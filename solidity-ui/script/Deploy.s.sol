// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.21 <0.9.0;

import { IERC20 } from "@openzeppelin/token/ERC20/IERC20.sol";

import { MockERC20 } from "../src/MockERC20.sol";
import { MockERC4626 } from "../src/MockERC4626.sol";
import { SparkUI } from "../src/SparkUI.sol";

import { BaseScript } from "./Base.s.sol";

import "forge-std/console.sol";

/// @dev See the Solidity Scripting tutorial: https://book.getfoundry.sh/tutorials/solidity-scripting
contract Deploy is BaseScript {
    // SparkUI internal _sparkui;
    MockERC20 internal _dai;
    MockERC4626 internal _sdai;

    function run() public broadcast returns (SparkUI _sparkui) {
        // // dai address on goerli
        // IERC20 dai = IERC20(0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844);
        // // sdai address on goerli
        // IERC4626 sdai = IERC4626(0xD8134205b0328F5676aaeFb3B2a0DC15f4029d8C);

        _dai = new MockERC20("Dai", "DAI");
        _sdai = new MockERC4626(_dai, "sDai vault", "SDAI");

        _sparkui = new SparkUI(
            _dai,
            _sdai
        );

        // _dai.mint(address(_gateway), 100e18);
        // _sparkui.mint(address(_gateway), 100e18);
        // _gateway.approveTokens();
    }
}
