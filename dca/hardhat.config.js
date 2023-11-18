require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const ALCHEMY_API_KEY = "XXX";
const GNOSIS_PRIVATE_KEY = process.env.PRIVATE_KEY_1;
// Above is for 0xf0DFc7C8D35D788D38a01277C1BFE51407F79Be5
const GNOSSISSCAN_API_KEY = process.env.GNOSSISSCAN_API_KEY;


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
    // sepolia: {
    //   url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    //   accounts: [GNOSIS_PRIVATE_KEY]
    // },
    gnosis: {
      url: `https://rpc.gnosischain.com`,
      accounts: [GNOSIS_PRIVATE_KEY]
    }
  },
  etherscan: {
    customChains: [
      {
        network: "gnosis",
        chainId: 100,
        urls: {
          // 3) Select to what explorer verify the contracts
          // Gnosisscan
          apiURL: "https://api.gnosisscan.io/api",
          browserURL: "https://gnosisscan.io/",
        },
      },
    ],
    apiKey: {
      gnosis: "BQ7JKV6ZV2DJE8YJAXYHR94KW7M7YVVBY7"
    }
  },
};
