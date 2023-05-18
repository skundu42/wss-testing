import dotenv from 'dotenv';
import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

dotenv.config();

const config: HardhatUserConfig = {

  networks: {
    mumbai: {
      url: "https://rpc.ankr.com/polygon_mumbai",
      accounts: [``]
      },
    sphinx: {
        url: "https://sphinx.shardeum.org/",
        accounts: [``]
        }
  },
  solidity: "0.8.18",
};

export default config;
