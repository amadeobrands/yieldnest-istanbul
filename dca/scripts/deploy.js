// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
//
// GnosisChain 1inch
// 0x1111111254EEB25477B68fb85Ed929f73A960582
// GnosisChain wxDAI
// 0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d
// GnosisChain wETH
// 0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1
const hre = require("hardhat");

async function main() {

  if (hre.network.config.chainId === 31337) {
    console.log(`Deploying fake buy and sell tokens`);

    // Buy Token
    fdai = await hre.ethers.deployContract("FDAI");
    await fdai.waitForDeployment();
    // Sell Token
    fweth = await hre.ethers.deployContract("FWETH");
    await fweth.waitForDeployment();

    buyToken = fweth.target;
    sellToken = fdai.target;
  }
  else {
    buyToken  = "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1";
    sellToken = "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d";
  }

  // The main contract
  const dca = await hre.ethers.deployContract("DCA", [buyToken, sellToken]);
  await dca.waitForDeployment();

  console.log(`DCA deployed to ${dca.target} with buy ${buyToken} and sell ${sellToken}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
