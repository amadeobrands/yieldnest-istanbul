require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY = "XXX";
const SEPOLIA_PRIVATE_KEY = "XXX";
// Above is for 0xf0DFc7C8D35D788D38a01277C1BFE51407F79Be5

/** @type import('hardhat/config').HardhatUserConfig */
//module.exports = {
//  solidity: "0.8.19",
//};

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    },
    gnosis: {
      url: `https://rpc.gnosischain.com`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
};
