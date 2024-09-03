import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-tracer";
import "xdeployer";

const Sepolia_RPC_URL = vars.get(
  "Sepolia_RPC_URL",
  "https://eth-sepolia.api.onfinality.io/public"
);
const Holesky_RPC_URL = vars.get(
  "Holesky_RPC_URL",
  "https://ethereum-holesky.blockpi.network/v1/rpc/public"
);
const Amoy_RPC_URL = vars.get(
  "Amoy_RPC_URL",
  "https://polygon-amoy.blockpi.network/v1/rpc/public	"
);

const PrivateKey = vars.get(
  "DEPLOYER_PRIVATE_KEY",
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"  // hardhat test account
);

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000000,
      },
    },
  },

  networks: {
    sepolia: {
      url: Sepolia_RPC_URL,
      accounts: [PrivateKey],
    },
    holesky: {
      url: Holesky_RPC_URL,
      accounts: [PrivateKey],
    },
    amoy: {
      url: Amoy_RPC_URL,
      accounts: [PrivateKey],
    },
  },

  xdeploy: {
    contract: "Counter",
    // constructorArgsPath: "", // optional; default value is `undefined`
    salt: "test",
    signer: PrivateKey,
    networks: ["sepolia", "holesky", "amoy"],
    rpcUrls: [Sepolia_RPC_URL, Holesky_RPC_URL, Amoy_RPC_URL],
    gasLimit: 1_500_000, // optional; default value is `1.5e6`
  },
};

export default config;
