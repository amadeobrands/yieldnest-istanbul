// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.21 <0.9.0;

import { PRBTest } from "@prb/test/PRBTest.sol";
import { console2 } from "forge-std/console2.sol";
import { StdCheats } from "forge-std/StdCheats.sol";

import { AaveUI } from "../src/AaveUI.sol";

import { MockERC20 } from "../src/MockERC20.sol";

/// @dev If this is your first time with Forge, read this tutorial in the Foundry Book:
/// https://book.getfoundry.sh/forge/writing-tests
contract FooTest is PRBTest, StdCheats {
    AaveUI internal _aaveui;
    MockERC20 internal _eth;
    MockERC20 internal _gho;

    /// @dev A function invoked before each test case is run.
    function setUp() public virtual {
        // // dai address on goerli
        // IERC20 dai = IERC20(0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844);
        // // sdai address on goerli
        // IERC4626 sdai = IERC4626(0xD8134205b0328F5676aaeFb3B2a0DC15f4029d8C);

        _eth = new MockERC20("Ethereum", "ETH");
        _gho = new MockERC20("gho", "GHO");

        _aaveui = new AaveUI(
            _eth,
            _gho
        );
    }

    /// @dev Basic test. Run it with `forge test -vvv` to see the console log.
    function testFullFlow() external {
        // setup our deposit user
        address userDeposit = vm.addr(0x200);
        // give 100 eth
        vm.deal(userDeposit, 100 ether);
        // give user 1000 dai
        _eth.mint(userDeposit, 1000e18);

        // just print to make sure its working
        // console2.log(_sparkui.description());
        // console2.log(_sparkui.index());
        // console2.log(_sparkui.frens());

        vm.startPrank(userDeposit);

        console2.log(_aaveui.description());
        console2.log(_aaveui.index());

        assertEq(_aaveui.getMyEthBalance(), 1000e18);
        assertEq(_aaveui.getEthBalance(userDeposit), 1000e18);

        assertEq(_aaveui.getMyGhoBalance(), 0);
        assertEq(_aaveui.getGhoBalance(userDeposit), 0);

        uint256 amount = 1e18;
        _eth.approve(address(_aaveui), amount);
        _aaveui.supplyEth(amount);
        _aaveui.borrowGho(amount);

        assertEq(_aaveui.getMyEthBalance(), 999e18);
        assertEq(_aaveui.getMyGhoBalance(), amount);

        console2.log(_aaveui.index());

        vm.stopPrank();
    }
}
