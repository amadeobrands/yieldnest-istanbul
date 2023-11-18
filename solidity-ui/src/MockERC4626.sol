// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.0;

import {ERC20} from "@openzeppelin/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/interfaces/IERC20.sol";
import {ERC4626} from "@openzeppelin/token/ERC20/extensions/ERC4626.sol";

contract MockERC4626 is ERC4626 {
    // strandard erc 4626 constructor
    constructor(
        IERC20 _asset,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) ERC4626(IERC20(_asset)) {}

    function mint(address to, uint256 value) public virtual {
        _mint(to, value);
    }

    function burn(address from, uint256 value) public virtual {
        _burn(from, value);
    }
}
