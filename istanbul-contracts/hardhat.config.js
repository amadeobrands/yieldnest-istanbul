require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");

const accounts = [process.env.PRIVATE_KEY_1];

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "gnosis",
  networks: {
    hardhat: {
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/<key>",
      accounts
    },

    gnosis: {
      url: "https://rpc.gnosischain.com",
      accounts
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
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
};
