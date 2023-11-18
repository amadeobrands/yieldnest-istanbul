// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

// Uncomment this line to use console.log
import "hardhat/console.sol";

import "./IERC20.sol";
import "./SafeMath.sol";

interface IUniswapV2Router {
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);

    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
}


contract DCA {
    using SafeMath for uint256;

    address public owner;
    address public buyToken;
    address public sellToken;
	uint256 public sellAmount = 0.1 ether; // sell 0.1 wxDAI at a time


    // danger
    address constant public oneInch = 0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1;
    //address public oneInch;

    // GnosisChain 1inch
    // 0x1111111254EEB25477B68fb85Ed929f73A960582
    // GnosisChain wxDAI
    // 0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d
    // GnosisChain wETH
    // 0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1
    uint public lastTimeSwapped;

    event Buy(uint amount, uint when);

    constructor(address buya, address sella) {
        require(buya != address(0) && sella != address(0), "You must specify buy and sell tokens");
        owner = msg.sender;
        buyToken = buya;
        sellToken = sella;
        console.log("ChainId is %o", block.chainid);
    }

    function buy() public {
        //require(msg.sender == owner, "Not owner");
        if (block.timestamp - lastTimeSwapped < 20 seconds) {
            // Just do nothing if we are called too fast
            return;
        }

        // check balance of sell tokens
        IERC20 selltok = IERC20(sellToken);
        uint256 availableBal = selltok.balanceOf(owner);
        require(availableBal >= sellAmount, "insufficient sell token balance");
        // maybe pause it here

        // check allowance of sell tokens
        uint256 allowanceBal = selltok.allowance(owner, address(this));
        require(allowanceBal >= sellAmount, "insufficient sell token allowance");

        //swapOnOneInch(sellToken, buyToken, sellAmount, 0.00005 ether,  

        uint amountOut = swapSingleHopExactAmountIn(sellAmount, 0.00001 ether);

        lastTimeSwapped = block.timestamp;
        

        emit Buy(amountOut, block.timestamp);
    }

    //function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);
    //    require(block.timestamp >= unlockTime, "You can't withdraw yet");
    //    require(msg.sender == owner, "You aren't the owner");
    //    emit Withdrawal(address(this).balance, block.timestamp);
    //    owner.transfer(address(this).balance);
    //}


/// sushiswap
    address private constant UNISWAP_V2_ROUTER =
        0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506; // GnosisChain sushiswap router

    address private constant WETH = 0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1; // GnosisChain wETH
    address private constant DAI = 0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d; // GnosisChain wxDAI

    IUniswapV2Router private router = IUniswapV2Router(UNISWAP_V2_ROUTER);
    IERC20 private weth = IERC20(WETH);
    IERC20 private dai = IERC20(DAI);

    // Swap DAI to WETH
    function swapSingleHopExactAmountIn(
        uint amountIn,
        uint amountOutMin
    ) internal returns (uint amountOut) {
        dai.transferFrom(owner, address(this), amountIn);
        dai.approve(address(router), amountIn);

        address[] memory path;
        path = new address[](2);
        path[0] = DAI;
        path[1] = WETH;

        uint[] memory amounts = router.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            owner,
            block.timestamp
        );

        // amounts[0] = DAI amount, amounts[1] = WETH amount
        return amounts[1];
    }
/// sushiswap end


}
