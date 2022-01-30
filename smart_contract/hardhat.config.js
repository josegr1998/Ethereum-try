// https://eth-ropsten.alchemyapi.io/v2/gLeQw0VHvVwWlO-HUg185f8YVxD3YyWX

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/gLeQw0VHvVwWlO-HUg185f8YVxD3YyWX",
      accounts: [
        "c6f77a376264329f371b4f98780cd19f152fa97256b46c53cea1c921169a91d2",
      ],
    },
  },
};
