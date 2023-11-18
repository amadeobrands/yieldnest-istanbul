// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.21 <0.9.0;

import { PRBTest } from "@prb/test/PRBTest.sol";
import { console2 } from "forge-std/console2.sol";
import { StdCheats } from "forge-std/StdCheats.sol";

import { SparkUI } from "../src/SparkUI.sol";

import { MockERC20 } from "../src/MockERC20.sol";
import { MockERC4626 } from "../src/MockERC4626.sol";

/// @dev If this is your first time with Forge, read this tutorial in the Foundry Book:
/// https://book.getfoundry.sh/forge/writing-tests
contract FooTest is PRBTest, StdCheats {
    SparkUI internal _sparkui;
    MockERC20 internal _dai;
    MockERC4626 internal _sdai;

    /// @dev A function invoked before each test case is run.
    function setUp() public virtual {
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
    }

    /// @dev Basic test. Run it with `forge test -vvv` to see the console log.
    function testFullFlow() external {
        // setup our deposit user
        address userDeposit = vm.addr(0x200);
        // give 100 eth
        vm.deal(userDeposit, 100 ether);
        // give user 1000 dai
        _dai.mint(userDeposit, 1000e18);

        // just print to make sure its working
        // console2.log(_sparkui.description());
        // console2.log(_sparkui.index());
        // console2.log(_sparkui.frens());

        vm.startPrank(userDeposit);

        console2.log(_sparkui.description());
        console2.log(_sparkui.index());

        assertEq(_sparkui.getMyDaiBalance(), 1000e18);
        assertEq(_sparkui.getDaiBalance(userDeposit), 1000e18);

        assertEq(_sparkui.getMySDaiBalance(), 0);
        assertEq(_sparkui.getSDaiBalance(userDeposit), 0);

        uint256 amount = 1e18;
        _dai.approve(address(_sparkui), amount);
        _sparkui.depositDai(amount);

        assertEq(_sparkui.getMySDaiBalance(), amount);
        assertEq(_sparkui.getMyDaiBalance(), 999e18);

        console2.log(_sparkui.index());

        vm.stopPrank();
    }
}
