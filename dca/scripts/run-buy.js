
const { parseEther } = ethers;
const hre = require("hardhat");
const { WXDAI, WETH } = require('./common');


const LATEST_ADDRESS = '0x6F6273039730AD3B3E04Da2924Dfd5f7F1a25ff4';

async function main() {

    const dca = await ethers.getContractAt('DCA', LATEST_ADDRESS);

    const wxdai = await ethers.getContractAt('IERC20', WXDAI);

    await wxdai.approve(LATEST_ADDRESS, parseEther('100'));

    console.log("running buy..");

    await dca.buy();
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
