import { ethers } from "ethers";
import Web3Modal from "web3modal";

import factoryAbi from "./factoryAbi.json";
import ERC20Generator from "./ERC20Generator.json";
import ICOMarketplace from "./ICOMarketplace.json";

// MAINNET
export const ETHEREUM_ADDRESS = process.env.NEXT_PUBLIC_ETHEREUM_ADDRESS;
export const BINNANCE_ADDRESS = process.env.NEXT_PUBLIC_BINNANC;
export const BASE_ADDRESS = process.env.NEXT_PUBLIC_BASE_ADDRESS;
export const POLYGON_ADDRESS = process.env.NEXT_PUBLIC_POLYGON_ADDRESS;

// TESTNET
export const TEST_BASE_ADDRESS = process.env.NEXT_PUBLIC_BASE_ADDRESS;
export const TEST_POLYGON_ADDRESS = process.env.NEXT_PUBLIC_POLYGON_ADDRESS;
export const TEST_SEPOLIA_ADDRESS = process.env.NEXT_PUBLIC_SEPOLIA_ADDRESS;

//FACTORY MAINNET
export const ETHEREUM_FACTORY_ADDRESS =
  process.env.NEXT_PUBLIC_ETHEREUM_FACTORY_ADDRESS;

export const ERC20Generator_ABI = ERC20Generator.abi;
export const ERC20Generator_BYTECODE = ERC20Generator.bytecode;
export const FACTORY_ABI = factoryAbi;
export const ICOMARKETPLACE_ABI = ICOMarketplace.abi;

export let ICOMARKETPLACE_ADDRESS;
export const FACTORY_ADDRESS = ETHEREUM_FACTORY_ADDRESS;

//PINATA KEYS
export const PINATA_AIP_KEY = process.env.NEXT_PUBLIC_PINATA_AIP_KEY;
export const PINATA_SECRECT_KEY = process.env.NEXT_PUBLIC_PINATA_SECRECT_KEY;


// OTHER BLOCKCHAIN
export const CREATOR_FEE = process.env.NEXT_PUBLIC_TOKEN_CREATOR_FEE;
export const ADD_TOKEN_FEE = process.env.NEXT_PUBLIC_ADD_TOKEN;
export const ICO_FEE = process.env.NEXT_PUBLIC_ICO_FEE;
export const CREATOR_RECEIVER = process.env.NEXT_PUBLIC_OWNER_RECEIVER;

export const shortenAddress = (address) =>
  `${address?.slice(0, 5)}...${address?.slice(address.length - 4)}`;

export const web3Provider = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    return provider;
  } catch (error) {
    console.log(error);
  }
};

const fetchContract = (address, abi, signer) =>
  new ethers.Contract(address, abi, signer);

export const ICOMARKETPLACE_CONTARCT = async () => {
  try {
    const provider = await web3Provider();
    const signer = provider.getSigner();

    const networkObject = localStorage.getItem("ACTIVE_NETWORK");

    const network = networkObject ? JSON.parse(networkObject) : null;

    // ICOMARKETPLACE_ADDRESS =
    //   network.chainName == "Polygon Amoy" && TEST_POLYGON_ADDRESS != "ADDRESS"
    //     ? TEST_POLYGON_ADDRESS
    //     : network.chainName == "Sepolia"
    //     ? TEST_SEPOLIA_ADDRESS
    //     : "";
    //--COMPLET STATEMENT FOR ALL BLOCKCHAIN SETUP, ONLY ACTIVATE THE BLOCKCHAIN WHERE YOU HAVE DEPLOY YOUR CONTRACT
    //---
    ICOMARKETPLACE_ADDRESS =
      network.chainName == "Polygon Amoy" && TEST_POLYGON_ADDRESS != "ADDRESS"
        ? TEST_POLYGON_ADDRESS
        : network.chainName == "Sepolia" && TEST_SEPOLIA_ADDRESS != "ADDRESS"
        ? TEST_SEPOLIA_ADDRESS
        : network.chainName == "Base Sepolia" && TEST_BASE_ADDRESS != "ADDRESS"
        ? TEST_BASE_ADDRESS
        : network.chainName == "Ethereum" && ETHEREUM_ADDRESS != "ADDRESS"
        ? ETHEREUM_ADDRESS
        : network.chainName == "Polygon Mainnet" && POLYGON_ADDRESS != "ADDRESS"
        ? POLYGON_ADDRESS
        : network.chainName == "Binance Chain" && BINNANCE_ADDRESS != "ADDRESS"
        ? BINNANCE_ADDRESS
        : network.chainName == "Base Mainnet" && BASE_ADDRESS != "ADDRESS"
        ? BASE_ADDRESS
        : "";

    const contract = fetchContract(
      ICOMARKETPLACE_ADDRESS,
      ICOMARKETPLACE_ABI,
      signer
    );
    return contract;
  } catch (error) {
    console.log("Something went wrong while connecting with contract", error);
  }
};

export const TOKEN_CONTARCT = async (TOKEN_ADDRESS) => {
  try {
    const provider = await web3Provider();
    const signer = provider.getSigner();

    const contract = fetchContract(TOKEN_ADDRESS, ERC20Generator_ABI, signer);
    return contract;
  } catch (error) {
    console.log("Something went wrong while connecting with contract", error);
  }
};

export const ERC20 = async (ADDRESS) => {
  try {
    const provider = await web3Provider();

    const newtork = await provider.getNetwork();

    const signer = provider.getSigner();
    const contract = fetchContract(ADDRESS, ERC20Generator_ABI, signer);

    //USER ADDRESS
    const userAddress = signer.getAddress();
    const balance = await contract.balanceOf(userAddress);

    const name = await contract.name();
    const symbol = await contract.symbol();
    const supply = await contract.totalSupply();
    const decimals = await contract.decimals();
    const address = await contract.address;

    const token = {
      address: address,
      name: name,
      symbol: symbol,
      decimals: decimals,
      supply: ethers.utils.formatEther(supply.toString()),
      balance: ethers.utils.formatEther(balance.toString()),
      chainId: newtork.chainId,
    };
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const ERC20_CONTRACT = async (CONTRACT_ADDRESS) => {
  try {
    const provider = await web3Provider();
    const signer = provider.getSigner();

    const contract = fetchContract(
      CONTRACT_ADDRESS,
      ERC20Generator_ABI,
      signer
    );
    return contract;
  } catch (error) {
    console.log("Something went wrong while connecting with contract", error);
  }
};

export const GET_POOL_ADDRESS = async (token_1, token_2, fee) => {
  try {
    const PROVIDER = await web3Provider();

    const factoryContract = new ethers.Contract(
      FACTORY_ADDRESS,
      FACTORY_ABI,
      PROVIDER
    );

    const poolAddress = await factoryContract.functions.getPool(
      token_1.address,
      token_2.address,
      Number(fee)
    );

    const poolHistory = {
      token_A: token_1,
      token_B: token_2,
      fee: fee,
      network: token_1.chainId,
      poolAddress: poolAddress,
    };

    const zeroAdd = "0x0000000000000000000000000000000000000000";

    if (poolAddress == zeroAdd) {
      console.log("Sorry there is no pool");
    } else {
      let poolArray = [];
      const poolLists = localStorage.getItem("poolHistory");
      if (poolLists) {
        poolArray = JSON.parse(localStorage.getItem("poolHistory"));
        poolArray.push(poolHistory);
        localStorage.setItem("poolHistory", JSON.stringify(poolArray));
      } else {
        poolArray.push(poolHistory);
        localStorage.setItem("poolHistory", JSON.stringify(poolArray));
      }

      console.log("Successfully Completed");
    }

    return poolAddress;
  } catch (error) {
    console.log(error);
  }
};

export const GET_BALANCE = async () => {
  try {
    const provider = await web3Provider();
    const signer = provider.getSigner();

    const maticBal = await signer.getBalance();
    return ethers.utils.formatEther(maticBal.toString());
  } catch (error) {
    console.log(error);
  }
};

export const CHECK_ACCOUNT_BALANCE = async (ADDRESS) => {
  try {
    const provider = await web3Provider();

    const maticBal = await provider.getBalance(ADDRESS);

    return ethers.utils.formatEther(maticBal.toString());
  } catch (error) {
    console.log(error);
  }
};
