const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("ERC20Basic", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployTokenFixture() {
    const totalSupply = 1_000_000;
    const tokenSymbol = 'ERC';
    const tokenName = 'ERC20Basic';
    const decimals = 18;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const ERC20Basic = await ethers.getContractFactory("ERC20Basic");
    const erc20basic = await ERC20Basic.deploy();

    return { erc20basic, totalSupply, tokenSymbol, tokenName, decimals, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should have symbol ERC", async function () {
      const { erc20basic, tokenSymbol } = await loadFixture(deployTokenFixture);

      expect(await erc20basic.symbol()).to.equal(tokenSymbol);
    });

    it("Should be named ERC20Basic", async function () {
      const { erc20basic, tokenName } = await loadFixture(deployTokenFixture);

      expect(await erc20basic.name()).to.equal(tokenName);
    });

    it("Have 18 decimals", async function () {
      const { erc20basic, decimals } = await loadFixture(deployTokenFixture);

      expect(await erc20basic.decimals()).to.equal(decimals);
    });
  });

});
