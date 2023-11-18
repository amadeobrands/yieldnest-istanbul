const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("DCA", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndTwoTokens() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    // Buy Token
    const FDAI = await ethers.getContractFactory("FDAI");
    const fdai = await FDAI.deploy();

    // Sell Token
    const FWETH = await ethers.getContractFactory("FWETH");
    const fweth = await FWETH.deploy();

    // DCA Contract
    const DCA = await ethers.getContractFactory("DCA");
    const dca = await DCA.deploy(fdai.target, fweth.target);

    return { owner, otherAccount, fdai, fweth, dca };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { dca, owner } = await loadFixture(deployContractAndTwoTokens);
      expect(await dca.owner()).to.equal(owner.address);
    });
  });

  describe("Operation", function () {
    it("Should should emit Buy when called by owner", async function () {
      const { dca } = await loadFixture(deployContractAndTwoTokens);
      expect(await dca.buy()).to.emit(dca, "Buy");
    });

    it("Should revert on buy if called by another account", async function () {
      const { dca, otherAccount } = await loadFixture(deployContractAndTwoTokens);
      await expect(dca.connect(otherAccount).buy()).to.be.revertedWith(
        "Not owner"
      );

    });
  });

});
